const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { getPlayersByCategory } = require('./data/players');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ─── In-memory store ────────────────────────────────────────────────────────
// rooms: { [roomId]: Room }
const rooms = {};

// ─── Room structure factory ──────────────────────────────────────────────────
function createRoom(hostSocketId, hostName, hostAvatar, settings) {
  const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
  return {
    roomId,
    hostSocketId,
    settings: {
      budget: settings.budget || 10000,          // e.g. 10000 = ₹100 Cr (in Lakhs)
      timerDuration: settings.timerDuration || 10,
      minIncrement: settings.minIncrement || 5,
      maxTeamSize: settings.maxTeamSize || 15,
      categories: settings.categories || ['ALL'], // ordered list: host picks
    },
    users: {
      [hostSocketId]: createUser(hostSocketId, hostName, hostAvatar, true)
    },
    auction: null,
    status: 'LOBBY', // LOBBY | AUCTION | ENDED
  };
}

function createUser(socketId, name, avatar, isHost = false) {
  return {
    socketId,
    name,
    avatar: avatar || '😎',
    isHost,
    budget: 0,        // set when auction starts
    team: [],
    ready: isHost,    // host always ready
    connected: true,
  };
}

// ─── Auction state factory ───────────────────────────────────────────────────
function createAuctionState(room) {
  const categoryQueue = [...room.settings.categories];
  const category = categoryQueue.shift();
  const players = getPlayersByCategory(category);
  return {
    categoryQueue,
    currentCategory: category,
    players,
    currentIndex: 0,
    phase: 'PLAYER_UP', // PLAYER_UP | BIDDING | SOLD | UNSOLD | ENDED
    currentPlayer: players[0] || null,
    currentBid: players[0] ? players[0].basePrice : 0,
    highestBidder: null, // socketId
    timerValue: room.settings.timerDuration,
    timerInterval: null,
    pendingBid: null,
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getRoomSafe(roomId) { return rooms[roomId]; }

function broadcastRoom(room) {
  const state = buildClientState(room);
  io.to(room.roomId).emit('room_state', state);
}

function buildClientState(room) {
  const users = Object.values(room.users).map(u => ({
    socketId: u.socketId,
    name: u.name,
    avatar: u.avatar,
    isHost: u.isHost,
    budget: u.budget,
    team: u.team,
    ready: u.ready,
    connected: u.connected,
    teamCount: u.team.length,
  }));
  const auc = room.auction;
  return {
    roomId: room.roomId,
    status: room.status,
    settings: room.settings,
    users,
    auction: auc ? {
      phase: auc.phase,
      currentCategory: auc.currentCategory,
      categoryQueue: auc.categoryQueue,
      currentPlayer: auc.currentPlayer,
      currentBid: auc.currentBid,
      highestBidder: auc.highestBidder,
      timerValue: auc.timerValue,
      playersRemaining: auc.players.length - auc.currentIndex,
    } : null,
  };
}

// ─── Timer management ────────────────────────────────────────────────────────
function startTimer(room) {
  const auc = room.auction;
  clearTimer(room);
  auc.timerValue = room.settings.timerDuration;

  auc.timerInterval = setInterval(() => {
    if (!rooms[room.roomId]) { clearTimer(room); return; }
    auc.timerValue--;
    io.to(room.roomId).emit('timer_tick', { value: auc.timerValue });

    if (auc.timerValue <= 0) {
      clearTimer(room);
      resolveCurrentPlayer(room);
    }
  }, 1000);
}

function clearTimer(room) {
  if (room.auction && room.auction.timerInterval) {
    clearInterval(room.auction.timerInterval);
    room.auction.timerInterval = null;
  }
}

// ─── Auction flow ────────────────────────────────────────────────────────────
function startAuction(room) {
  room.status = 'AUCTION';
  const budgetPerUser = room.settings.budget;
  Object.values(room.users).forEach(u => { u.budget = budgetPerUser; });

  room.auction = createAuctionState(room);
  if (!room.auction.currentPlayer) {
    endAuction(room);
    return;
  }
  emitPlayerUp(room);
  startTimer(room);
  broadcastRoom(room);
}

function emitPlayerUp(room) {
  const auc = room.auction;
  auc.phase = 'BIDDING';
  auc.currentBid = auc.currentPlayer.basePrice;
  auc.highestBidder = null;
  io.to(room.roomId).emit('player_up', {
    player: auc.currentPlayer,
    basePrice: auc.currentBid,
    timerDuration: room.settings.timerDuration,
  });
}

function resolveCurrentPlayer(room) {
  const auc = room.auction;
  auc.phase = auc.highestBidder ? 'SOLD' : 'UNSOLD';

  if (auc.highestBidder) {
    const winner = room.users[auc.highestBidder];
    if (winner) {
      winner.budget -= auc.currentBid;
      winner.team.push({ ...auc.currentPlayer, soldPrice: auc.currentBid });
    }
    io.to(room.roomId).emit('player_sold', {
      player: auc.currentPlayer,
      soldPrice: auc.currentBid,
      winnerId: auc.highestBidder,
      winnerName: winner ? winner.name : 'Unknown',
    });
  } else {
    io.to(room.roomId).emit('player_unsold', { player: auc.currentPlayer });
  }

  broadcastRoom(room);

  // Advance after 3 seconds
  setTimeout(() => {
    if (!rooms[room.roomId]) return;
    advancePlayer(room);
  }, 3000);
}

function advancePlayer(room) {
  const auc = room.auction;
  auc.currentIndex++;

  // Check if current category is exhausted
  if (auc.currentIndex >= auc.players.length) {
    // Try next category
    if (auc.categoryQueue.length > 0) {
      const nextCat = auc.categoryQueue.shift();
      auc.currentCategory = nextCat;
      auc.players = getPlayersByCategory(nextCat);
      auc.currentIndex = 0;
      io.to(room.roomId).emit('category_change', { category: nextCat });
    } else {
      endAuction(room);
      return;
    }
  }

  auc.currentPlayer = auc.players[auc.currentIndex] || null;
  if (!auc.currentPlayer) {
    endAuction(room);
    return;
  }

  emitPlayerUp(room);
  startTimer(room);
  broadcastRoom(room);
}

function endAuction(room) {
  clearTimer(room);
  room.status = 'ENDED';
  const results = Object.values(room.users).map(u => ({
    socketId: u.socketId,
    name: u.name,
    avatar: u.avatar,
    team: u.team,
    budgetSpent: room.settings.budget - u.budget,
    budgetLeft: u.budget,
  }));
  io.to(room.roomId).emit('auction_ended', { results });
  broadcastRoom(room);
}

// ─── Socket.io events ────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log(`[+] Connected: ${socket.id}`);

  // ── Create room ────────────────────────────────────────────────────
  socket.on('create_room', ({ name, avatar, settings }, cb) => {
    if (!name || !name.trim()) return cb({ error: 'Name required' });
    const room = createRoom(socket.id, name.trim(), avatar, settings || {});
    rooms[room.roomId] = room;
    socket.join(room.roomId);
    socket.data.roomId = room.roomId;
    socket.data.name = name.trim();
    console.log(`[ROOM] Created: ${room.roomId} by ${name}`);
    cb({ roomId: room.roomId, user: room.users[socket.id] });
    broadcastRoom(room);
  });

  // ── Join room ──────────────────────────────────────────────────────
  socket.on('join_room', ({ roomId, name, avatar }, cb) => {
    const room = getRoomSafe(roomId?.toUpperCase());
    if (!room) return cb({ error: 'Room not found' });
    if (room.status !== 'LOBBY') return cb({ error: 'Auction already started' });
    if (!name || !name.trim()) return cb({ error: 'Name required' });
    // Prevent duplicate names
    const nameTaken = Object.values(room.users).some(
      u => u.name.toLowerCase() === name.trim().toLowerCase() && u.connected
    );
    if (nameTaken) return cb({ error: 'Name already taken in this room' });

    const user = createUser(socket.id, name.trim(), avatar);
    room.users[socket.id] = user;
    socket.join(roomId.toUpperCase());
    socket.data.roomId = roomId.toUpperCase();
    socket.data.name = name.trim();
    console.log(`[ROOM] ${name} joined ${roomId}`);
    cb({ roomId: room.roomId, user });
    broadcastRoom(room);
    io.to(room.roomId).emit('user_joined', { name: user.name, avatar: user.avatar });
  });

  // ── Toggle ready ───────────────────────────────────────────────────
  socket.on('toggle_ready', () => {
    const room = getRoomSafe(socket.data.roomId);
    if (!room || room.status !== 'LOBBY') return;
    const user = room.users[socket.id];
    if (!user || user.isHost) return;
    user.ready = !user.ready;
    broadcastRoom(room);
  });

  // ── Start auction ──────────────────────────────────────────────────
  socket.on('start_auction', ({ categories }, cb) => {
    const room = getRoomSafe(socket.data.roomId);
    if (!room) return cb?.({ error: 'Room not found' });
    if (room.hostSocketId !== socket.id) return cb?.({ error: 'Only host can start' });
    if (room.status !== 'LOBBY') return cb?.({ error: 'Already started' });
    const connectedUsers = Object.values(room.users).filter(u => u.connected);
    if (connectedUsers.length < 2) return cb?.({ error: 'Need at least 2 players' });

    // Set category order from host
    if (categories && Array.isArray(categories) && categories.length > 0) {
      room.settings.categories = categories;
    }

    startAuction(room);
    cb?.({ success: true });
  });

  // ── Place bid ──────────────────────────────────────────────────────
  socket.on('place_bid', ({ amount }, cb) => {
    const room = getRoomSafe(socket.data.roomId);
    if (!room || room.status !== 'AUCTION') return cb?.({ error: 'No active auction' });
    const auc = room.auction;
    if (!auc || auc.phase !== 'BIDDING') return cb?.({ error: 'Not in bidding phase' });

    const user = room.users[socket.id];
    if (!user) return cb?.({ error: 'User not found' });

    // Validate bid
    const minBid = auc.currentBid + room.settings.minIncrement;
    if (typeof amount !== 'number' || amount < minBid) {
      return cb?.({ error: `Minimum bid is ₹${minBid}L` });
    }
    if (amount > user.budget) {
      return cb?.({ error: `Insufficient budget (₹${user.budget}L remaining)` });
    }
    if (user.team.length >= room.settings.maxTeamSize) {
      return cb?.({ error: `Team full (max ${room.settings.maxTeamSize} players)` });
    }

    // Accept bid
    auc.currentBid = amount;
    auc.highestBidder = socket.id;

    io.to(room.roomId).emit('bid_update', {
      amount,
      bidderId: socket.id,
      bidderName: user.name,
      bidderAvatar: user.avatar,
    });

    // Reset timer
    startTimer(room);
    broadcastRoom(room);
    cb?.({ success: true, newBid: amount });
  });

  // ── Host: add category to queue (mid-auction) ─────────────────────
  socket.on('add_category', ({ category }, cb) => {
    const room = getRoomSafe(socket.data.roomId);
    if (!room || room.hostSocketId !== socket.id) return cb?.({ error: 'Forbidden' });
    if (!room.auction) return cb?.({ error: 'No auction running' });
    const valid = ['BAT', 'BWL', 'WK', 'AR', 'ALL'];
    if (!valid.includes(category)) return cb?.({ error: 'Invalid category' });
    room.auction.categoryQueue.push(category);
    broadcastRoom(room);
    cb?.({ success: true });
  });

  // ── Host: skip current player ─────────────────────────────────────
  socket.on('skip_player', (cb) => {
    const room = getRoomSafe(socket.data.roomId);
    if (!room || room.hostSocketId !== socket.id) return cb?.({ error: 'Forbidden' });
    if (!room.auction || room.auction.phase !== 'BIDDING') return cb?.({ error: 'Nothing to skip' });
    clearTimer(room);
    io.to(room.roomId).emit('player_unsold', { player: room.auction.currentPlayer, skipped: true });
    broadcastRoom(room);
    setTimeout(() => {
      if (!rooms[room.roomId]) return;
      advancePlayer(room);
    }, 2000);
    cb?.({ success: true });
  });

  // ── Update room settings (host, lobby only) ───────────────────────
  socket.on('update_settings', ({ settings }, cb) => {
    const room = getRoomSafe(socket.data.roomId);
    if (!room || room.hostSocketId !== socket.id) return cb?.({ error: 'Forbidden' });
    if (room.status !== 'LOBBY') return cb?.({ error: 'Can only change settings in lobby' });
    if (settings.budget) room.settings.budget = settings.budget;
    if (settings.timerDuration) room.settings.timerDuration = settings.timerDuration;
    if (settings.minIncrement) room.settings.minIncrement = settings.minIncrement;
    if (settings.maxTeamSize) room.settings.maxTeamSize = settings.maxTeamSize;
    broadcastRoom(room);
    cb?.({ success: true });
  });

  // ── Disconnect ────────────────────────────────────────────────────
  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    const room = getRoomSafe(roomId);
    if (!room) return;
    const user = room.users[socket.id];
    if (user) {
      user.connected = false;
      console.log(`[-] Disconnected: ${user.name} from ${roomId}`);
      io.to(roomId).emit('user_left', { name: user.name });
    }

    // If host disconnects during lobby, transfer host
    if (room.hostSocketId === socket.id && room.status === 'LOBBY') {
      const newHost = Object.values(room.users).find(u => u.socketId !== socket.id && u.connected);
      if (newHost) {
        newHost.isHost = true;
        newHost.ready = true;
        room.hostSocketId = newHost.socketId;
        io.to(roomId).emit('host_changed', { newHostId: newHost.socketId, newHostName: newHost.name });
      }
    }

    broadcastRoom(room);

    // Clean up empty rooms after 5 min
    const connectedCount = Object.values(room.users).filter(u => u.connected).length;
    if (connectedCount === 0) {
      setTimeout(() => {
        const r = rooms[roomId];
        if (r && Object.values(r.users).filter(u => u.connected).length === 0) {
          clearTimer(r);
          delete rooms[roomId];
          console.log(`[ROOM] Cleaned up: ${roomId}`);
        }
      }, 5 * 60 * 1000);
    }
  });

  // ── Reconnect (rejoin room) ───────────────────────────────────────
  socket.on('rejoin_room', ({ roomId, name }, cb) => {
    const room = getRoomSafe(roomId?.toUpperCase());
    if (!room) return cb?.({ error: 'Room not found' });
    // Find existing user by name
    const existing = Object.values(room.users).find(
      u => u.name.toLowerCase() === name?.toLowerCase()
    );
    if (existing) {
      const oldSocketId = existing.socketId;
      existing.socketId = socket.id;
      existing.connected = true;
      // Update key in users map
      room.users[socket.id] = existing;
      delete room.users[oldSocketId];
      if (room.hostSocketId === oldSocketId) room.hostSocketId = socket.id;
      socket.join(room.roomId);
      socket.data.roomId = room.roomId;
      socket.data.name = existing.name;
      cb?.({ roomId: room.roomId, user: existing, rejoined: true });
      broadcastRoom(room);
    } else {
      cb?.({ error: 'User not found in room' });
    }
  });
});

// ─── REST endpoints ──────────────────────────────────────────────────────────
app.get('/api/room/:roomId', (req, res) => {
  const room = getRoomSafe(req.params.roomId?.toUpperCase());
  if (!room) return res.status(404).json({ error: 'Room not found' });
  res.json({ exists: true, status: room.status, userCount: Object.keys(room.users).length });
});

app.get('/api/room/:roomId/results', (req, res) => {
  const room = getRoomSafe(req.params.roomId?.toUpperCase());
  if (!room) return res.status(404).json({ error: 'Room not found' });
  if (room.status !== 'ENDED') return res.status(400).json({ error: 'Auction not ended yet' });
  const results = Object.values(room.users).map(u => ({
    socketId: u.socketId,
    name: u.name,
    avatar: u.avatar,
    team: u.team,
    budgetSpent: room.settings.budget - u.budget,
    budgetLeft: u.budget,
  }));
  res.json({ results, settings: room.settings });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🏏 IPL Auction server running on http://localhost:${PORT}`));
