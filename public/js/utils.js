// ─── Shared utility functions ────────────────────────────────────────────────
function showToast(msg, type = 'info', duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => t.remove(), duration);
}

function formatPrice(lakhs) {
  if (lakhs >= 100) return `₹${(lakhs/100).toFixed(lakhs%100===0?0:1)} Cr`;
  return `₹${lakhs}L`;
}

function roleName(role) {
  return { BAT: 'Batsman', BWL: 'Bowler', WK: 'Wicket-Keeper', AR: 'All-Rounder' }[role] || role;
}

function roleEmoji(role) {
  return { BAT: '🏏', BWL: '🎳', WK: '🧤', AR: '⚡' }[role] || '🏏';
}

function categoryLabel(cat) {
  return { BAT: 'Batsmen', BWL: 'Bowlers', WK: 'Wicket-Keepers', AR: 'All-Rounders', ALL: 'All Players' }[cat] || cat;
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!', 'success'));
}

function getSessionData() {
  return {
    roomId: sessionStorage.getItem('auc_roomId'),
    name: sessionStorage.getItem('auc_name'),
    avatar: sessionStorage.getItem('auc_avatar'),
  };
}
