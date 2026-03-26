// IPL 2026 Player Dataset – 150 players
// imageUrl: ESPNCricinfo CDN (falls back to generated avatar in UI)
// cricId: ESPNCricinfo player ID for photo
// rating: 1-10 quality rating used for team ranking
// basePrice: in Lakhs

const players = [
  // ══════════════════ BATSMEN (BAT) ═════════════════════════════════════════
  { id:1,  name:"Virat Kohli",         role:"BAT", country:"India",        basePrice:200, iplTeam:"RCB",  emoji:"🏏", rating:10, cricId:253802 },
  { id:2,  name:"Rohit Sharma",        role:"BAT", country:"India",        basePrice:200, iplTeam:"MI",   emoji:"🏏", rating:10, cricId:34102  },
  { id:3,  name:"Shubman Gill",        role:"BAT", country:"India",        basePrice:175, iplTeam:"GT",   emoji:"🏏", rating:9,  cricId:1125353},
  { id:4,  name:"Yashasvi Jaiswal",    role:"BAT", country:"India",        basePrice:175, iplTeam:"RR",   emoji:"🏏", rating:9,  cricId:1070173},
  { id:5,  name:"Faf du Plessis",      role:"BAT", country:"South Africa", basePrice:100, iplTeam:"RCB",  emoji:"🏏", rating:7,  cricId:44828  },
  { id:6,  name:"David Warner",        role:"BAT", country:"Australia",    basePrice:100, iplTeam:"DC",   emoji:"🏏", rating:7,  cricId:219646 },
  { id:7,  name:"Ruturaj Gaikwad",     role:"BAT", country:"India",        basePrice:125, iplTeam:"CSK",  emoji:"🏏", rating:8,  cricId:1078680},
  { id:8,  name:"Devon Conway",        role:"BAT", country:"New Zealand",  basePrice:100, iplTeam:"CSK",  emoji:"🏏", rating:7,  cricId:821573 },
  { id:9,  name:"Travis Head",         role:"BAT", country:"Australia",    basePrice:175, iplTeam:"SRH",  emoji:"🏏", rating:9,  cricId:336381 },
  { id:10, name:"Abhishek Sharma",     role:"BAT", country:"India",        basePrice:100, iplTeam:"SRH",  emoji:"🏏", rating:7,  cricId:1175406},
  { id:11, name:"Rachin Ravindra",     role:"BAT", country:"New Zealand",  basePrice:100, iplTeam:"CSK",  emoji:"🏏", rating:7,  cricId:1175424},
  { id:12, name:"Tilak Varma",         role:"BAT", country:"India",        basePrice:75,  iplTeam:"MI",   emoji:"🏏", rating:7,  cricId:1175381},
  { id:13, name:"Rinku Singh",         role:"BAT", country:"India",        basePrice:75,  iplTeam:"KKR",  emoji:"🏏", rating:6,  cricId:1175351},
  { id:14, name:"Shreyas Iyer",        role:"BAT", country:"India",        basePrice:150, iplTeam:"PBKS", emoji:"🏏", rating:8,  cricId:642519 },
  { id:15, name:"Suryakumar Yadav",    role:"BAT", country:"India",        basePrice:200, iplTeam:"MI",   emoji:"🏏", rating:10, cricId:446507 },
  { id:16, name:"David Miller",        role:"BAT", country:"South Africa", basePrice:100, iplTeam:"GT",   emoji:"🏏", rating:7,  cricId:354143 },
  { id:17, name:"Rilee Rossouw",       role:"BAT", country:"South Africa", basePrice:75,  iplTeam:"PBKS", emoji:"🏏", rating:6,  cricId:322023 },
  { id:18, name:"Tim David",           role:"BAT", country:"Singapore",    basePrice:125, iplTeam:"MI",   emoji:"🏏", rating:8,  cricId:879267 },
  { id:19, name:"Aiden Markram",       role:"BAT", country:"South Africa", basePrice:100, iplTeam:"SRH",  emoji:"🏏", rating:7,  cricId:789089 },
  { id:20, name:"Rahul Tripathi",      role:"BAT", country:"India",        basePrice:50,  iplTeam:"SRH",  emoji:"🏏", rating:5,  cricId:661659 },
  { id:21, name:"Tristan Stubbs",      role:"BAT", country:"South Africa", basePrice:75,  iplTeam:"MI",   emoji:"🏏", rating:6,  cricId:1175499},
  { id:22, name:"Rovman Powell",       role:"BAT", country:"West Indies",  basePrice:75,  iplTeam:"DC",   emoji:"🏏", rating:6,  cricId:800241 },
  { id:23, name:"Sherfane Rutherford", role:"BAT", country:"West Indies",  basePrice:50,  iplTeam:"KKR",  emoji:"🏏", rating:5,  cricId:null   },
  { id:24, name:"Lendl Simmons",       role:"BAT", country:"West Indies",  basePrice:50,  iplTeam:"MI",   emoji:"🏏", rating:5,  cricId:null   },
  { id:25, name:"Devdutt Padikkal",    role:"BAT", country:"India",        basePrice:75,  iplTeam:"RR",   emoji:"🏏", rating:6,  cricId:null   },
  { id:26, name:"Finn Allen",          role:"BAT", country:"New Zealand",  basePrice:75,  iplTeam:"RCB",  emoji:"🏏", rating:6,  cricId:null   },
  { id:27, name:"Jake Fraser-McGurk",  role:"BAT", country:"Australia",    basePrice:75,  iplTeam:"DC",   emoji:"🏏", rating:7,  cricId:null   },
  { id:28, name:"Prithvi Shaw",        role:"BAT", country:"India",        basePrice:50,  iplTeam:"DC",   emoji:"🏏", rating:5,  cricId:null   },
  { id:29, name:"Manish Pandey",       role:"BAT", country:"India",        basePrice:50,  iplTeam:"KKR",  emoji:"🏏", rating:5,  cricId:null   },
  { id:30, name:"Wanidu Hasaranga",    role:"BAT", country:"Sri Lanka",    basePrice:75,  iplTeam:"RCB",  emoji:"🏏", rating:6,  cricId:null   },

  // ══════════════════ WICKET-KEEPERS (WK) ═══════════════════════════════════
  { id:31, name:"MS Dhoni",            role:"WK",  country:"India",        basePrice:200, iplTeam:"CSK",  emoji:"🧤", rating:10, cricId:28081  },
  { id:32, name:"Rishabh Pant",        role:"WK",  country:"India",        basePrice:200, iplTeam:"LSG",  emoji:"🧤", rating:10, cricId:931581 },
  { id:33, name:"Jos Buttler",         role:"WK",  country:"England",      basePrice:200, iplTeam:"GT",   emoji:"🧤", rating:10, cricId:308967 },
  { id:34, name:"KL Rahul",            role:"WK",  country:"India",        basePrice:175, iplTeam:"DC",   emoji:"🧤", rating:9,  cricId:422108 },
  { id:35, name:"Sanju Samson",        role:"WK",  country:"India",        basePrice:150, iplTeam:"RR",   emoji:"🧤", rating:8,  cricId:453854 },
  { id:36, name:"Ishan Kishan",        role:"WK",  country:"India",        basePrice:150, iplTeam:"MI",   emoji:"🧤", rating:8,  cricId:1079434},
  { id:37, name:"Dinesh Karthik",      role:"WK",  country:"India",        basePrice:100, iplTeam:"RCB",  emoji:"🧤", rating:7,  cricId:28822  },
  { id:38, name:"Jonny Bairstow",      role:"WK",  country:"England",      basePrice:100, iplTeam:"PBKS", emoji:"🧤", rating:7,  cricId:297433 },
  { id:39, name:"Heinrich Klaasen",    role:"WK",  country:"South Africa", basePrice:125, iplTeam:"SRH",  emoji:"🧤", rating:8,  cricId:784379 },
  { id:40, name:"Nicholas Pooran",     role:"WK",  country:"West Indies",  basePrice:150, iplTeam:"LSG",  emoji:"🧤", rating:8,  cricId:604304 },
  { id:41, name:"Quinton de Kock",     role:"WK",  country:"South Africa", basePrice:100, iplTeam:"LSG",  emoji:"🧤", rating:7,  cricId:548610 },
  { id:42, name:"Matthew Wade",        role:"WK",  country:"Australia",    basePrice:75,  iplTeam:"GT",   emoji:"🧤", rating:6,  cricId:311158 },
  { id:43, name:"Prabhsimran Singh",   role:"WK",  country:"India",        basePrice:75,  iplTeam:"PBKS", emoji:"🧤", rating:6,  cricId:1165381},
  { id:44, name:"Dhruv Jurel",         role:"WK",  country:"India",        basePrice:75,  iplTeam:"RR",   emoji:"🧤", rating:6,  cricId:1175386},
  { id:45, name:"Anuj Rawat",          role:"WK",  country:"India",        basePrice:50,  iplTeam:"RCB",  emoji:"🧤", rating:5,  cricId:null   },
  { id:46, name:"Wriddhiman Saha",     role:"WK",  country:"India",        basePrice:50,  iplTeam:"GT",   emoji:"🧤", rating:5,  cricId:null   },
  { id:47, name:"Phil Salt",           role:"WK",  country:"England",      basePrice:100, iplTeam:"KKR",  emoji:"🧤", rating:7,  cricId:null   },
  { id:48, name:"Ryan Rickelton",      role:"WK",  country:"South Africa", basePrice:75,  iplTeam:"MI",   emoji:"🧤", rating:6,  cricId:null   },

  // ══════════════════ ALL-ROUNDERS (AR) ═════════════════════════════════════
  { id:49, name:"Hardik Pandya",       role:"AR",  country:"India",        basePrice:200, iplTeam:"MI",   emoji:"⚡", rating:10, cricId:625371 },
  { id:50, name:"Ravindra Jadeja",     role:"AR",  country:"India",        basePrice:175, iplTeam:"CSK",  emoji:"⚡", rating:9,  cricId:234675 },
  { id:51, name:"Glenn Maxwell",       role:"AR",  country:"Australia",    basePrice:200, iplTeam:"RCB",  emoji:"⚡", rating:10, cricId:388401 },
  { id:52, name:"Andre Russell",       role:"AR",  country:"West Indies",  basePrice:200, iplTeam:"KKR",  emoji:"⚡", rating:10, cricId:239100 },
  { id:53, name:"Sunil Narine",        role:"AR",  country:"West Indies",  basePrice:175, iplTeam:"KKR",  emoji:"⚡", rating:9,  cricId:222842 },
  { id:54, name:"Axar Patel",          role:"AR",  country:"India",        basePrice:100, iplTeam:"DC",   emoji:"⚡", rating:7,  cricId:559192 },
  { id:55, name:"Washington Sundar",   role:"AR",  country:"India",        basePrice:75,  iplTeam:"SRH",  emoji:"⚡", rating:7,  cricId:789006 },
  { id:56, name:"Shivam Dube",         role:"AR",  country:"India",        basePrice:75,  iplTeam:"CSK",  emoji:"⚡", rating:6,  cricId:936371 },
  { id:57, name:"Marcus Stoinis",      role:"AR",  country:"Australia",    basePrice:100, iplTeam:"LSG",  emoji:"⚡", rating:7,  cricId:430085 },
  { id:58, name:"Liam Livingstone",    role:"AR",  country:"England",      basePrice:100, iplTeam:"PBKS", emoji:"⚡", rating:7,  cricId:662973 },
  { id:59, name:"Sam Curran",          role:"AR",  country:"England",      basePrice:100, iplTeam:"PBKS", emoji:"⚡", rating:7,  cricId:879117 },
  { id:60, name:"Cameron Green",       role:"AR",  country:"Australia",    basePrice:175, iplTeam:"MI",   emoji:"⚡", rating:8,  cricId:null   },
  { id:61, name:"Venkatesh Iyer",      role:"AR",  country:"India",        basePrice:100, iplTeam:"KKR",  emoji:"⚡", rating:7,  cricId:1175374},
  { id:62, name:"Riyan Parag",         role:"AR",  country:"India",        basePrice:75,  iplTeam:"RR",   emoji:"⚡", rating:7,  cricId:1175409},
  { id:63, name:"Nitish Kumar Reddy",  role:"AR",  country:"India",        basePrice:75,  iplTeam:"SRH",  emoji:"⚡", rating:7,  cricId:1175404},
  { id:64, name:"Shahbaz Ahmed",       role:"AR",  country:"India",        basePrice:50,  iplTeam:"RCB",  emoji:"⚡", rating:5,  cricId:null   },
  { id:65, name:"Deepak Hooda",        role:"AR",  country:"India",        basePrice:75,  iplTeam:"LSG",  emoji:"⚡", rating:6,  cricId:null   },
  { id:66, name:"Mitchell Marsh",      role:"AR",  country:"Australia",    basePrice:150, iplTeam:"DC",   emoji:"⚡", rating:8,  cricId:272450 },
  { id:67, name:"Kieron Pollard",      role:"AR",  country:"West Indies",  basePrice:150, iplTeam:"MI",   emoji:"⚡", rating:8,  cricId:null   },
  { id:68, name:"Kyle Mayers",         role:"AR",  country:"West Indies",  basePrice:75,  iplTeam:"LSG",  emoji:"⚡", rating:6,  cricId:804225 },
  { id:69, name:"Vijay Shankar",       role:"AR",  country:"India",        basePrice:50,  iplTeam:"GT",   emoji:"⚡", rating:5,  cricId:null   },
  { id:70, name:"Krunal Pandya",       role:"AR",  country:"India",        basePrice:75,  iplTeam:"LSG",  emoji:"⚡", rating:6,  cricId:625372 },
  { id:71, name:"Moeen Ali",           role:"AR",  country:"England",      basePrice:100, iplTeam:"CSK",  emoji:"⚡", rating:7,  cricId:234812 },
  { id:72, name:"Romario Shepherd",    role:"AR",  country:"West Indies",  basePrice:75,  iplTeam:"SRH",  emoji:"⚡", rating:6,  cricId:null   },
  { id:73, name:"Pooran Nicholas",     role:"AR",  country:"West Indies",  basePrice:50,  iplTeam:"LSG",  emoji:"⚡", rating:5,  cricId:null   },
  { id:74, name:"Shivam Mavi",         role:"AR",  country:"India",        basePrice:50,  iplTeam:"KKR",  emoji:"⚡", rating:5,  cricId:null   },
  { id:75, name:"Ramandeep Singh",     role:"AR",  country:"India",        basePrice:50,  iplTeam:"KKR",  emoji:"⚡", rating:5,  cricId:null   },
  { id:76, name:"Harpreet Brar",       role:"AR",  country:"India",        basePrice:50,  iplTeam:"PBKS", emoji:"⚡", rating:5,  cricId:null   },
  { id:77, name:"Odean Smith",         role:"AR",  country:"West Indies",  basePrice:50,  iplTeam:"PBKS", emoji:"⚡", rating:5,  cricId:null   },

  // ══════════════════ FAST BOWLERS (BWL) ════════════════════════════════════
  { id:78, name:"Jasprit Bumrah",       role:"BWL", country:"India",        basePrice:200, iplTeam:"MI",   emoji:"🎳", rating:10, cricId:625383 },
  { id:79, name:"Pat Cummins",          role:"BWL", country:"Australia",    basePrice:200, iplTeam:"SRH",  emoji:"🎳", rating:10, cricId:434352 },
  { id:80, name:"Mohammed Shami",       role:"BWL", country:"India",        basePrice:175, iplTeam:"GT",   emoji:"🎳", rating:9,  cricId:493773 },
  { id:81, name:"Kagiso Rabada",        role:"BWL", country:"South Africa", basePrice:200, iplTeam:"GT",   emoji:"🎳", rating:10, cricId:764195 },
  { id:82, name:"Rashid Khan",          role:"BWL", country:"Afghanistan",  basePrice:200, iplTeam:"GT",   emoji:"🎳", rating:10, cricId:793463 },
  { id:83, name:"Trent Boult",          role:"BWL", country:"New Zealand",  basePrice:150, iplTeam:"RR",   emoji:"🎳", rating:8,  cricId:345146 },
  { id:84, name:"Mohammed Siraj",       role:"BWL", country:"India",        basePrice:125, iplTeam:"RCB",  emoji:"🎳", rating:8,  cricId:669855 },
  { id:85, name:"Arshdeep Singh",       role:"BWL", country:"India",        basePrice:100, iplTeam:"PBKS", emoji:"🎳", rating:8,  cricId:null   },
  { id:86, name:"Yuzvendra Chahal",     role:"BWL", country:"India",        basePrice:100, iplTeam:"PBKS", emoji:"🎳", rating:8,  cricId:559235 },
  { id:87, name:"Bhuvneshwar Kumar",    role:"BWL", country:"India",        basePrice:100, iplTeam:"SRH",  emoji:"🎳", rating:7,  cricId:236779 },
  { id:88, name:"Josh Hazlewood",       role:"BWL", country:"Australia",    basePrice:150, iplTeam:"RCB",  emoji:"🎳", rating:8,  cricId:311158 },
  { id:89, name:"Anrich Nortje",        role:"BWL", country:"South Africa", basePrice:125, iplTeam:"DC",   emoji:"🎳", rating:8,  cricId:778090 },
  { id:90, name:"Marco Jansen",         role:"BWL", country:"South Africa", basePrice:100, iplTeam:"MI",   emoji:"🎳", rating:7,  cricId:1175440},
  { id:91, name:"Alzarri Joseph",       role:"BWL", country:"West Indies",  basePrice:100, iplTeam:"MI",   emoji:"🎳", rating:7,  cricId:800281 },
  { id:92, name:"Deepak Chahar",        role:"BWL", country:"India",        basePrice:100, iplTeam:"CSK",  emoji:"🎳", rating:7,  cricId:669869 },
  { id:93, name:"T Natarajan",          role:"BWL", country:"India",        basePrice:75,  iplTeam:"SRH",  emoji:"🎳", rating:6,  cricId:null   },
  { id:94, name:"Avesh Khan",           role:"BWL", country:"India",        basePrice:75,  iplTeam:"RR",   emoji:"🎳", rating:6,  cricId:null   },
  { id:95, name:"Kuldeep Yadav",        role:"BWL", country:"India",        basePrice:100, iplTeam:"DC",   emoji:"🎳", rating:8,  cricId:559215 },
  { id:96, name:"Ravichandran Ashwin",  role:"BWL", country:"India",        basePrice:100, iplTeam:"DC",   emoji:"🎳", rating:7,  cricId:26421  },
  { id:97, name:"Varun Chakaravarthy", role:"BWL", country:"India",        basePrice:100, iplTeam:"KKR",  emoji:"🎳", rating:7,  cricId:null   },
  { id:98, name:"Harshal Patel",        role:"BWL", country:"India",        basePrice:100, iplTeam:"PBKS", emoji:"🎳", rating:7,  cricId:469690 },
  { id:99, name:"Shardul Thakur",       role:"BWL", country:"India",        basePrice:75,  iplTeam:"KKR",  emoji:"🎳", rating:6,  cricId:559203 },
  { id:100,name:"Noor Ahmad",           role:"BWL", country:"Afghanistan",  basePrice:75,  iplTeam:"CSK",  emoji:"🎳", rating:6,  cricId:null   },
  { id:101,name:"Prasidh Krishna",      role:"BWL", country:"India",        basePrice:75,  iplTeam:"RR",   emoji:"🎳", rating:6,  cricId:null   },
  { id:102,name:"Mukesh Kumar",         role:"BWL", country:"India",        basePrice:50,  iplTeam:"DC",   emoji:"🎳", rating:5,  cricId:null   },
  { id:103,name:"Yash Dayal",           role:"BWL", country:"India",        basePrice:50,  iplTeam:"GT",   emoji:"🎳", rating:5,  cricId:null   },
  { id:104,name:"Mohit Sharma",         role:"BWL", country:"India",        basePrice:50,  iplTeam:"GT",   emoji:"🎳", rating:5,  cricId:null   },
  { id:105,name:"Sai Kishore",          role:"BWL", country:"India",        basePrice:50,  iplTeam:"GT",   emoji:"🎳", rating:5,  cricId:null   },
  { id:106,name:"Chris Jordan",         role:"BWL", country:"England",      basePrice:75,  iplTeam:"PBKS", emoji:"🎳", rating:6,  cricId:null   },
  { id:107,name:"Reece Topley",         role:"BWL", country:"England",      basePrice:75,  iplTeam:"RCB",  emoji:"🎳", rating:6,  cricId:null   },
  { id:108,name:"Luke Wood",            role:"BWL", country:"England",      basePrice:75,  iplTeam:"LSG",  emoji:"🎳", rating:6,  cricId:null   },
  { id:109,name:"Adam Zampa",           role:"BWL", country:"Australia",    basePrice:75,  iplTeam:"RCB",  emoji:"🎳", rating:6,  cricId:null   },
  { id:110,name:"Matthew Short",        role:"BWL", country:"Australia",    basePrice:50,  iplTeam:"DC",   emoji:"🎳", rating:5,  cricId:null   },
  { id:111,name:"Imran Tahir",          role:"BWL", country:"South Africa", basePrice:50,  iplTeam:"CSK",  emoji:"🎳", rating:5,  cricId:null   },
  { id:112,name:"Saqib Mahmood",        role:"BWL", country:"England",      basePrice:50,  iplTeam:"MI",   emoji:"🎳", rating:5,  cricId:null   },
  { id:113,name:"Khaleel Ahmed",        role:"BWL", country:"India",        basePrice:50,  iplTeam:"DC",   emoji:"🎳", rating:5,  cricId:null   },
  { id:114,name:"Navdeep Saini",        role:"BWL", country:"India",        basePrice:50,  iplTeam:"RCB",  emoji:"🎳", rating:5,  cricId:null   },
  { id:115,name:"Dushmantha Chameera",  role:"BWL", country:"Sri Lanka",    basePrice:75,  iplTeam:"LSG",  emoji:"🎳", rating:6,  cricId:null   },
  { id:116,name:"Gerald Coetzee",       role:"BWL", country:"South Africa", basePrice:100, iplTeam:"MI",   emoji:"🎳", rating:7,  cricId:null   },
  { id:117,name:"Mayank Markande",      role:"BWL", country:"India",        basePrice:50,  iplTeam:"MI",   emoji:"🎳", rating:5,  cricId:null   },
  { id:118,name:"Mohsin Khan",          role:"BWL", country:"India",        basePrice:50,  iplTeam:"LSG",  emoji:"🎳", rating:5,  cricId:null   },
  { id:119,name:"Akash Madhwal",        role:"BWL", country:"India",        basePrice:50,  iplTeam:"MI",   emoji:"🎳", rating:5,  cricId:null   },
  { id:120,name:"Sandeep Sharma",       role:"BWL", country:"India",        basePrice:50,  iplTeam:"RR",   emoji:"🎳", rating:5,  cricId:null   },
  { id:121,name:"R Sai Kishore",        role:"BWL", country:"India",        basePrice:50,  iplTeam:"GT",   emoji:"🎳", rating:5,  cricId:null   },
  { id:122,name:"Ravi Bishnoi",         role:"BWL", country:"India",        basePrice:75,  iplTeam:"LSG",  emoji:"🎳", rating:6,  cricId:null   },
  { id:123,name:"Karn Sharma",          role:"BWL", country:"India",        basePrice:50,  iplTeam:"CSK",  emoji:"🎳", rating:5,  cricId:null   },
  { id:124,name:"Ashok Sharma",         role:"BWL", country:"India",        basePrice:50,  iplTeam:"SRH",  emoji:"🎳", rating:5,  cricId:null   },

  // ══════════════════ MORE PREMIUM PLAYERS ══════════════════════════════════
  { id:125,name:"Ben Stokes",           role:"AR",  country:"England",      basePrice:200, iplTeam:"CSK",  emoji:"⚡", rating:10, cricId:308394 },
  { id:126,name:"Steve Smith",          role:"BAT", country:"Australia",    basePrice:100, iplTeam:"DC",   emoji:"🏏", rating:7,  cricId:267192 },
  { id:127,name:"Aaron Finch",          role:"BAT", country:"Australia",    basePrice:75,  iplTeam:"RCB",  emoji:"🏏", rating:6,  cricId:272450 },
  { id:128,name:"Mayank Agarwal",       role:"BAT", country:"India",        basePrice:75,  iplTeam:"LSG",  emoji:"🏏", rating:6,  cricId:null   },
  { id:129,name:"Mandeep Singh",        role:"BAT", country:"India",        basePrice:50,  iplTeam:"KKR",  emoji:"🏏", rating:5,  cricId:null   },
  { id:130,name:"Sarfaraz Khan",        role:"BAT", country:"India",        basePrice:75,  iplTeam:"RCB",  emoji:"🏏", rating:6,  cricId:null   },
  { id:131,name:"Karun Nair",           role:"BAT", country:"India",        basePrice:50,  iplTeam:"RCB",  emoji:"🏏", rating:5,  cricId:null   },
  { id:132,name:"Mahipal Lomror",       role:"BAT", country:"India",        basePrice:50,  iplTeam:"RCB",  emoji:"🏏", rating:5,  cricId:null   },
  { id:133,name:"Aryan Juyal",          role:"WK",  country:"India",        basePrice:50,  iplTeam:"SRH",  emoji:"🧤", rating:4,  cricId:null   },
  { id:134,name:"Naman Dhir",           role:"BAT", country:"India",        basePrice:50,  iplTeam:"MI",   emoji:"🏏", rating:5,  cricId:null   },
  { id:135,name:"Tom Moody",            role:"BAT", country:"Australia",    basePrice:50,  iplTeam:"SRH",  emoji:"🏏", rating:4,  cricId:null   },
  { id:136,name:"Rahmanullah Gurbaz",   role:"WK",  country:"Afghanistan",  basePrice:100, iplTeam:"KKR",  emoji:"🧤", rating:7,  cricId:null   },
  { id:137,name:"Azmatullah Omarzai",   role:"AR",  country:"Afghanistan",  basePrice:75,  iplTeam:"CSK",  emoji:"⚡", rating:6,  cricId:null   },
  { id:138,name:"Naveen ul Haq",        role:"BWL", country:"Afghanistan",  basePrice:75,  iplTeam:"LSG",  emoji:"🎳", rating:6,  cricId:null   },
  { id:139,name:"Mujeeb ur Rahman",     role:"BWL", country:"Afghanistan",  basePrice:75,  iplTeam:"PBKS", emoji:"🎳", rating:6,  cricId:null   },
  { id:140,name:"Fazalhaq Farooqi",     role:"BWL", country:"Afghanistan",  basePrice:75,  iplTeam:"GT",   emoji:"🎳", rating:6,  cricId:null   },
  { id:141,name:"Umran Malik",          role:"BWL", country:"India",        basePrice:75,  iplTeam:"SRH",  emoji:"🎳", rating:6,  cricId:null   },
  { id:142,name:"Akash Singh",          role:"BWL", country:"India",        basePrice:50,  iplTeam:"RR",   emoji:"🎳", rating:5,  cricId:null   },
  { id:143,name:"Tushar Deshpande",     role:"BWL", country:"India",        basePrice:50,  iplTeam:"CSK",  emoji:"🎳", rating:5,  cricId:null   },
  { id:144,name:"Matheus Nortje",       role:"BWL", country:"South Africa", basePrice:50,  iplTeam:"DC",   emoji:"🎳", rating:5,  cricId:null   },
  { id:145,name:"Shams Mulani",         role:"BWL", country:"India",        basePrice:50,  iplTeam:"MI",   emoji:"🎳", rating:5,  cricId:null   },
  { id:146,name:"Jaydev Unadkat",       role:"BWL", country:"India",        basePrice:75,  iplTeam:"RR",   emoji:"🎳", rating:6,  cricId:null   },
  { id:147,name:"Ishant Sharma",        role:"BWL", country:"India",        basePrice:50,  iplTeam:"DC",   emoji:"🎳", rating:5,  cricId:null   },
  { id:148,name:"Mitchell Starc",       role:"BWL", country:"Australia",    basePrice:200, iplTeam:"KKR",  emoji:"🎳", rating:10, cricId:311556 },
  { id:149,name:"Lockie Ferguson",      role:"BWL", country:"New Zealand",  basePrice:100, iplTeam:"GT",   emoji:"🎳", rating:7,  cricId:null   },
  { id:150,name:"Spencer Johnson",      role:"BWL", country:"Australia",    basePrice:75,  iplTeam:"GT",   emoji:"🎳", rating:6,  cricId:null   },
];

// Generate image URL: use ESPNCricinfo CDN if cricId known, else ui-avatars fallback
function getImageUrl(player) {
  if (player.cricId) {
    return `https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320/lsci/db/PICTURES/CMS/${player.cricId}/p${player.cricId}.png`;
  }
  const encoded = encodeURIComponent(player.name);
  const colors = { BAT:'3b82f6', BWL:'ef4444', WK:'f59e0b', AR:'10b981' };
  const bg = colors[player.role] || '6366f1';
  return `https://ui-avatars.com/api/?name=${encoded}&background=${bg}&color=fff&size=320&bold=true&font-size=0.38&rounded=true`;
}

// Attach imageUrl to each player object
players.forEach(p => { p.imageUrl = getImageUrl(p); });

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getPlayersByCategory(category) {
  if (category === 'ALL') return shuffle(players);
  const roleMap = { BAT: ['BAT'], BWL: ['BWL'], WK: ['WK'], AR: ['AR'] };
  const roles = roleMap[category] || [];
  return shuffle(players.filter(p => roles.includes(p.role)));
}

module.exports = { players, getPlayersByCategory };
