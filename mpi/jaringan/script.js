/* ============================================================
   MPI Jaringan Komputer — Main Script
   SPA Navigation + Interactive Features + Dynamic Config
   ============================================================ */

// ==================== CONFIG INTEGRATION ====================

function applyConfig() {
  const cfg = window.MPI_CONFIG;
  if (!cfg) return;

  // Apply Background & Softening Overlay
  const bgEl = document.getElementById('classroom-bg');
  if (bgEl && cfg.background) {
    if (cfg.background.image) {
      bgEl.style.backgroundImage = `url('${cfg.background.image}')`;
      bgEl.style.backgroundSize = cfg.background.size || 'cover';
      bgEl.style.backgroundPosition = cfg.background.position || 'center center';
    } else {
      bgEl.classList.add('use-svg');
    }

    // Set overlay to soften background image
    let overlayColor = cfg.background.overlay_color;
    if (!overlayColor && cfg.background.overlay_opacity !== undefined) {
      overlayColor = `rgba(255, 255, 255, ${cfg.background.overlay_opacity})`;
    }
    if (overlayColor) {
      bgEl.style.setProperty('--bg-overlay', overlayColor);
    }
  }

  // Apply Logos if elements exist
  const leftLogo = document.getElementById('logo-kemendikdasmen-cover');
  if (leftLogo && cfg.logos && cfg.logos.header_left) {
    leftLogo.src = cfg.logos.header_left;
  }
  const rightLogo = document.getElementById('logo-sobat-cover');
  if (rightLogo && cfg.logos && cfg.logos.header_right) {
    rightLogo.src = cfg.logos.header_right;
  }

  // Footer Logos
  if (cfg.logos && cfg.logos.footer_logos && Array.isArray(cfg.logos.footer_logos)) {
    const footerContainer = document.getElementById('kredit-logos');
    if (footerContainer) {
      footerContainer.innerHTML = '';
      cfg.logos.footer_logos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Logo Institusi';
        footerContainer.appendChild(img);
      });
    }
  }

  // Apply Developer Photos if configured
  const devPhoto1 = document.querySelector('#dev-photo-1 img');
  if (devPhoto1 && cfg.assets && cfg.assets.dev_photo_1) {
    devPhoto1.src = cfg.assets.dev_photo_1;
  }
  const devPhoto2 = document.querySelector('#dev-photo-2 img');
  if (devPhoto2 && cfg.assets && cfg.assets.dev_photo_2) {
    devPhoto2.src = cfg.assets.dev_photo_2;
  }

  // Apply Testing Page Indicator
  updateTestingIndicator(currentPage);
}

// ==================== NAVIGATION (SPA) ====================

const PAGE_INDEX_MAP = {
  'cover': 1,
  'menu': 2,
  'petunjuk': 3,
  'tujuan': 4,
  'materi-list': 5,
  'materi-1': 6,
  'tarik-jawaban': 7,
  'video': 8,
  'materi-3': 9,
  'permainan-intro': 10,
  'permainan': 11,
  'latihan-intro': 12,
  'latihan': 13,
  'rangkuman': 14,
  'referensi': 15,
  'pengembang': 16,
  'pj-penyunting': 17,
  'kutipan': 18,
  'kredit': 19
};

function updateTestingIndicator(pageId) {
  const cfg = window.MPI_CONFIG;
  if (!cfg || (cfg.is_testing !== 1 && cfg.is_testing !== true)) {
    const el = document.getElementById('testing-page-indicator');
    if (el) el.style.display = 'none';
    return;
  }

  let indicator = document.getElementById('testing-page-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'testing-page-indicator';
    indicator.className = 'testing-page-indicator';
    document.body.appendChild(indicator);
  }

  const pageNum = PAGE_INDEX_MAP[pageId] || '?';
  indicator.innerHTML = `<span>Halaman ${pageNum} / 19</span>`;
  indicator.style.display = 'block';
}

const LINEAR_PAGES = [
  'materi-1', 'tarik-jawaban', 'video', 'materi-3',
  'permainan-intro', 'permainan', 'latihan-intro', 'latihan',
  'rangkuman', 'referensi', 'pengembang', 'pj-penyunting',
  'kutipan', 'kredit'
];

let currentPage = 'cover';

function goToPage(pageId) {
  const oldPage = document.querySelector('.page.active');
  const newPage = document.getElementById('page-' + pageId);
  if (!newPage) return;

  if (oldPage && oldPage.id !== 'page-' + pageId) {
    oldPage.classList.remove('active');
  }
  newPage.classList.add('active');
  currentPage = pageId;

  // Update Testing Page Indicator if is_testing is active
  updateTestingIndicator(pageId);

  // Reset scroll to top
  const scrollables = newPage.querySelectorAll('.scrollable');
  scrollables.forEach(el => el.scrollTop = 0);

  // Lazy initialize interactive modules on page entry
  if (pageId === 'materi-1') switchMateri1Tab(1);
  if (pageId === 'tarik-jawaban') initDragDrop();
  if (pageId === 'video') initVideo();
}

// ==================== MATERI 1 TABBED NAVIGATION ====================

function switchMateri1Tab(tabNum) {
  for (let i = 1; i <= 3; i++) {
    const btn = document.getElementById(`mtab1-btn-${i}`);
    const panel = document.getElementById(`mtab1-panel-${i}`);
    if (btn) {
      if (i === tabNum) btn.classList.add('active');
      else btn.classList.remove('active');
    }
    if (panel) {
      if (i === tabNum) panel.classList.add('active');
      else panel.classList.remove('active');
    }
  }
}

function navNext() {
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx === -1) return;
  if (idx < LINEAR_PAGES.length - 1) {
    goToPage(LINEAR_PAGES[idx + 1]);
  }
}

function navPrev() {
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx === -1) return;
  if (idx > 0) {
    goToPage(LINEAR_PAGES[idx - 1]);
  } else {
    goToPage('materi-list');
  }
}


// ==================== VIDEO ====================

function initVideo() {
  const video = document.getElementById('main-video');
  const fallback = document.getElementById('video-fallback');
  if (!video || !fallback) return;

  video.addEventListener('error', function() {
    video.style.display = 'none';
    fallback.style.display = 'block';
  }, { once: true });

  video.addEventListener('loadeddata', function() {
    fallback.style.display = 'none';
    video.style.display = 'block';
  }, { once: true });

  if (video.readyState === 0) {
    video.style.display = 'none';
    fallback.style.display = 'block';
  }
}


// ==================== DRAG & DROP (TARIK JAWABAN) ====================

const DD_DATA = [
  { term: 'Paket Data', def: 'Bagian kecil hasil pemecahan data asli yang dikirim melalui jaringan', id: 'paket-data' },
  { term: 'Payload', def: 'Bagian paket berisi potongan data/isi asli yang dikirim', id: 'payload' },
  { term: 'Router', def: 'Perangkat yang mengarahkan paket data ke rute tercepat/tersedia', id: 'router' },
  { term: 'Rute Dinamis', def: 'Kemampuan jaringan mencari jalur baru saat jalur utama terganggu', id: 'rute-dinamis' },
  { term: 'Packet Switching', def: 'Metode pengiriman data dengan memecahnya menjadi paket-paket kecil', id: 'packet-switching' },
];

let ddInitialized = false;

function initDragDrop() {
  if (ddInitialized) return;
  ddInitialized = true;

  const termsCol = document.getElementById('dd-terms');
  const defsCol = document.getElementById('dd-definitions');

  // Keep h3 header
  termsCol.innerHTML = '<h3>Istilah</h3>';
  defsCol.innerHTML = '<h3>Definisi</h3>';

  const shuffledTerms = [...DD_DATA].sort(() => Math.random() - 0.5);
  const shuffledDefs = [...DD_DATA].sort(() => Math.random() - 0.5);

  shuffledTerms.forEach(item => {
    const el = document.createElement('div');
    el.className = 'dd-item';
    el.draggable = true;
    el.dataset.id = item.id;
    el.textContent = item.term;
    el.addEventListener('dragstart', onDragStart);
    el.addEventListener('dragend', onDragEnd);
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    termsCol.appendChild(el);
  });

  shuffledDefs.forEach(item => {
    const zone = document.createElement('div');
    zone.className = 'dd-drop-zone';
    zone.dataset.id = item.id;
    zone.textContent = item.def;
    zone.addEventListener('dragover', onDragOver);
    zone.addEventListener('dragenter', onDragEnter);
    zone.addEventListener('dragleave', onDragLeave);
    zone.addEventListener('drop', onDrop);
    defsCol.appendChild(zone);
  });
}

let draggedItem = null;

function onDragStart(e) {
  draggedItem = e.target;
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', e.target.dataset.id);
}

function onDragEnd(e) {
  e.target.classList.remove('dragging');
  document.querySelectorAll('.dd-drop-zone').forEach(z => z.classList.remove('over'));
}

function onDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function onDragEnter(e) {
  e.preventDefault();
  e.currentTarget.classList.add('over');
}

function onDragLeave(e) {
  e.currentTarget.classList.remove('over');
}

function onDrop(e) {
  e.preventDefault();
  const zone = e.currentTarget;
  zone.classList.remove('over');

  if (!draggedItem) return;
  if (zone.classList.contains('filled')) return;

  const placed = document.createElement('span');
  placed.className = 'dd-placed';
  placed.textContent = draggedItem.textContent;
  placed.dataset.id = draggedItem.dataset.id;

  const defText = zone.textContent;
  zone.innerHTML = '';
  const defSpan = document.createElement('span');
  defSpan.style.cssText = 'display:block;font-size:16px;color:var(--text-body);margin-bottom:6px;line-height:1.4;';
  defSpan.textContent = defText;
  zone.appendChild(defSpan);
  zone.appendChild(placed);
  zone.classList.add('filled');

  draggedItem.style.display = 'none';
  draggedItem = null;
}

// Touch drag support
let touchDragEl = null;
let touchClone = null;

function onTouchStart(e) {
  touchDragEl = e.currentTarget;
  e.preventDefault();

  touchClone = touchDragEl.cloneNode(true);
  touchClone.style.position = 'fixed';
  touchClone.style.zIndex = '1000';
  touchClone.style.opacity = '0.85';
  touchClone.style.pointerEvents = 'none';
  touchClone.style.width = touchDragEl.offsetWidth + 'px';
  document.body.appendChild(touchClone);

  const touch = e.touches[0];
  touchClone.style.left = (touch.clientX - touchDragEl.offsetWidth / 2) + 'px';
  touchClone.style.top = (touch.clientY - 25) + 'px';
  touchDragEl.classList.add('dragging');
}

function onTouchMove(e) {
  if (!touchClone) return;
  e.preventDefault();
  const touch = e.touches[0];
  touchClone.style.left = (touch.clientX - touchClone.offsetWidth / 2) + 'px';
  touchClone.style.top = (touch.clientY - 25) + 'px';

  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  document.querySelectorAll('.dd-drop-zone').forEach(z => z.classList.remove('over'));
  if (elem) {
    const zone = elem.classList.contains('dd-drop-zone') ? elem : elem.closest('.dd-drop-zone');
    if (zone && !zone.classList.contains('filled')) zone.classList.add('over');
  }
}

function onTouchEnd(e) {
  if (!touchClone || !touchDragEl) return;

  const touch = e.changedTouches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);

  document.body.removeChild(touchClone);
  touchClone = null;
  touchDragEl.classList.remove('dragging');

  if (elem) {
    const zone = elem.classList.contains('dd-drop-zone') ? elem : elem.closest('.dd-drop-zone');
    if (zone && !zone.classList.contains('filled')) {
      draggedItem = touchDragEl;
      onDrop({ preventDefault: () => {}, currentTarget: zone });
    }
  }
  touchDragEl = null;
}

function resetDragDrop() {
  ddInitialized = false;
  const scoreBox = document.getElementById('dd-score-box');
  if (scoreBox) scoreBox.style.display = 'none';
  initDragDrop();
}

function checkDragDrop() {
  const zones = document.querySelectorAll('#dd-definitions .dd-drop-zone');
  let allFilled = true;
  let correctCount = 0;
  const total = zones.length;

  zones.forEach(zone => {
    const placed = zone.querySelector('.dd-placed');
    if (!placed) {
      allFilled = false;
      return;
    }

    const isCorrect = placed.dataset.id === zone.dataset.id;
    if (isCorrect) correctCount++;
    zone.classList.remove('correct', 'incorrect');
    zone.classList.add(isCorrect ? 'correct' : 'incorrect');
  });

  const scoreBox = document.getElementById('dd-score-box');
  const scoreBadge = document.getElementById('dd-score-badge');
  const scoreText = document.getElementById('dd-score-text');

  if (!allFilled) {
    alert('Silakan pasangkan semua istilah terlebih dahulu!');
    if (scoreBox) scoreBox.style.display = 'none';
    return;
  }

  const score = Math.round((correctCount / total) * 100);

  if (scoreBox && scoreBadge && scoreText) {
    scoreBadge.textContent = `🏆 Skor: ${score}`;
    if (correctCount === total) {
      scoreText.textContent = `Sempurna! ${correctCount} dari ${total} Pasangan Benar! 🎉`;
      spawnConfetti();
      playSynthSound('success');
    } else {
      scoreText.textContent = `${correctCount} dari ${total} Benar. Cek kotak berwarna merah dan perbaiki! 💡`;
      playSynthSound('error');
    }
    scoreBox.style.display = 'flex';
  }
}


// ==================== NETWORK SIMULATION ====================

// ==================== WEB AUDIO SYNTHESIZER (SOUND FX) ====================

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSynthSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'transmit') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'hop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'packet_arrive') {
      const notes = [587.33, 880];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (i * 0.06));
        gain.gain.setValueAtTime(0.2, now + (i * 0.06));
        gain.gain.linearRampToValueAtTime(0.01, now + (i * 0.06) + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + (i * 0.06));
        osc.stop(now + (i * 0.06) + 0.15);
      });
    } else if (type === 'error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'level_complete') {
      const chord = [523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (i * 0.09));
        gain.gain.setValueAtTime(0.25, now + (i * 0.09));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.09) + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + (i * 0.09));
        osc.stop(now + (i * 0.09) + 0.45);
      });
    } else if (type === 'victory') {
      const fanfares = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      fanfares.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (i * 0.12));
        gain.gain.setValueAtTime(0.3, now + (i * 0.12));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i * 0.12) + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + (i * 0.12));
        osc.stop(now + (i * 0.12) + 0.55);
      });
    }
  } catch (e) {
    // Audio optional / graceful fallback
  }
}


// ==================== PACKET COMMANDER GAME (PAGE 11) ====================

// ==================== PACKET COMMANDER GAME (PAGE 11) ====================

let gameEngine = {
  currentLevel: 1,
  unlockedLevel: 1,
  stars: { 1: 0, 2: 0, 3: 0 },
  isTransmitting: false,
  activeTimeouts: [],

  // Level 1 data
  lvl1: {
    selectedPath: null, // 'a' | 'b' | 'c'
    attempts: 0
  },

  // Level 2 data: packet route mapping (Default: All on Jalur A)
  lvl2: {
    p1: 'A',
    p2: 'A',
    p3: 'A',
    p4: 'A',
    attempts: 0
  },

  // Level 3 data: interactive mesh & per-packet routing (Default: All on Express -> Causes Overflow unless adjusted)
  lvl3: {
    p1: 1, // Express (35ms | Max 1)
    p2: 1, // Express (35ms | Max 1)
    p3: 1, // Express (35ms | Max 1)
    p4: 1, // Express (35ms | Max 1)
    arrivedPackets: [],
    selectedBufferPkt: null,
    assembledSlots: {},
    attempts: 0
  }
};

function clearGameTimers() {
  gameEngine.activeTimeouts.forEach(t => clearTimeout(t));
  gameEngine.activeTimeouts = [];
}

function initPacketCommanderGame() {
  clearGameTimers();
  updateHUD();
  renderGameLevel(gameEngine.currentLevel);
}

function updateHUD() {
  const totalStars = (gameEngine.stars[1] ? 1 : 0) + (gameEngine.stars[2] ? 1 : 0) + (gameEngine.stars[3] ? 1 : 0);
  const totalStarsEl = document.getElementById('game-total-stars');
  if (totalStarsEl) {
    totalStarsEl.textContent = `⭐ ${totalStars}/3`;
  }

  // Update tabs
  for (let lvl = 1; lvl <= 3; lvl++) {
    const tab = document.getElementById(`game-tab-${lvl}`);
    const starsEl = document.getElementById(`stars-lvl-${lvl}`);
    if (!tab || !starsEl) continue;

    tab.classList.remove('active', 'locked');
    if (lvl === gameEngine.currentLevel) {
      tab.classList.add('active');
    }

    if (lvl > gameEngine.unlockedLevel) {
      tab.classList.add('locked');
      starsEl.textContent = '🔒';
    } else {
      starsEl.textContent = gameEngine.stars[lvl] ? '⭐ 1/1' : '⭐ 0/1';
    }
  }
}

function switchGameLevel(lvl) {
  if (gameEngine.isTransmitting) return;
  if (lvl > gameEngine.unlockedLevel) {
    showGameModal({
      icon: '🔒',
      title: 'Misi Masih Terkunci',
      text: `Selesaikan Misi ${lvl - 1} terlebih dahulu untuk membuka tantangan ini!`,
      type: 'error',
      actions: [{ label: 'Mengerti', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
    return;
  }

  clearGameTimers();
  gameEngine.currentLevel = lvl;
  updateHUD();
  renderGameLevel(lvl);
}

function renderGameLevel(lvl) {
  const missionIcon = document.getElementById('game-mission-icon');
  const missionDesc = document.getElementById('game-mission-desc');
  const deckL2 = document.getElementById('game-deck-loadbalance');
  const deckL3 = document.getElementById('game-deck-mesh');
  const netStatus = document.getElementById('game-net-status');
  const latency = document.getElementById('game-latency');
  const transmitBtn = document.getElementById('btn-game-transmit');

  resetReassemblyScreen();
  clearGamePackets();

  if (transmitBtn) transmitBtn.disabled = false;

  if (lvl === 1) {
    if (missionIcon) missionIcon.textContent = '🚦';
    if (missionDesc) missionDesc.innerHTML = '<strong>Misi 1: Rute Alternatif</strong> — Jalur B mengalami <strong>Server Down ⚠️</strong>. Klik router pada <strong>Jalur A</strong> atau <strong>Jalur C</strong> yang aman, lalu kirim paket foto kucing!';
    if (deckL2) deckL2.style.display = 'none';
    if (deckL3) deckL3.style.display = 'none';
    if (netStatus) {
      netStatus.className = 'hud-val status-badge ready';
      netStatus.textContent = '🟢 Siap';
    }
    if (latency) latency.textContent = '⏱️ -- ms';

    renderLevel1Topology();

  } else if (lvl === 2) {
    if (missionIcon) missionIcon.textContent = '⚖️';
    if (missionDesc) missionDesc.innerHTML = '<strong>Misi 2: Bagi Beban (Load Balancing)</strong> — Jalur A &amp; B masing-masing hanya muat <strong>maksimal 2 paket</strong>. Bagi 4 paket foto secara seimbang agar jalur tidak macet (Buffer Overflow)!';
    if (deckL2) deckL2.style.display = 'block';
    if (deckL3) deckL3.style.display = 'none';
    if (latency) latency.textContent = '⏱️ -- ms';

    renderLevel2Topology();
    updateLoadBalancerDeckUI();

  } else if (lvl === 3) {
    if (missionIcon) missionIcon.textContent = '🌐';
    if (missionDesc) missionDesc.innerHTML = '<strong>Misi 3: Mesh Dinamis &amp; Reassembly</strong> — Atur rute tiap paket data foto, lalu <strong>rakit kembali foto kucing</strong> di Monitor Penerima sesuai nomor Header!';
    if (deckL2) deckL2.style.display = 'none';
    if (deckL3) deckL3.style.display = 'block';

    const configDeck = document.getElementById('mesh-config-deck');
    const inboxDeck = document.getElementById('mesh-inbox-deck');
    if (configDeck) configDeck.style.display = 'block';
    if (inboxDeck) inboxDeck.style.display = 'none';

    // Sync select elements in UI
    const s1 = document.getElementById('select-m-p1');
    const s2 = document.getElementById('select-m-p2');
    const s3 = document.getElementById('select-m-p3');
    const s4 = document.getElementById('select-m-p4');
    if (s1) s1.value = String(gameEngine.lvl3.p1 || 1);
    if (s2) s2.value = String(gameEngine.lvl3.p2 || 1);
    if (s3) s3.value = String(gameEngine.lvl3.p3 || 1);
    if (s4) s4.value = String(gameEngine.lvl3.p4 || 1);

    gameEngine.lvl3.arrivedPackets = [];
    gameEngine.lvl3.selectedBufferPkt = null;
    gameEngine.lvl3.assembledSlots = {};

    if (latency) latency.textContent = '⏱️ Dynamic ms';

    renderLevel3Topology();
  }
}

// -------------------- LEVEL 1: TOPOLOGY (SVG VECTOR) --------------------
function renderLevel1Topology() {
  const svg = document.getElementById('game-svg-layer');
  if (!svg) return;

  const sel = gameEngine.lvl1.selectedPath;

  svg.innerHTML = `
    <!-- Paths -->
    <path d="M 12,170 C 160,170 200,50 360,50 C 520,50 560,170 660,170 L 868,170" class="g-path ${sel === 'a' ? 'active' : ''}" id="g-path-a"/>
    <path d="M 12,170 L 360,170 L 660,170 L 868,170" class="g-path down ${sel === 'b' ? 'active' : ''}" id="g-path-b"/>
    <path d="M 12,170 C 160,170 200,290 360,290 C 520,290 560,170 660,170 L 868,170" class="g-path ${sel === 'c' ? 'active' : ''}" id="g-path-c"/>

    <!-- Left Connection Port -->
    <circle cx="12" cy="170" r="9" fill="#0288D1"/>

    <!-- Router A (Safe - Top) -->
    <g class="svg-node ${sel === 'a' ? 'selected' : ''}" onclick="selectGameRouter('a')" id="g-node-a">
      <rect x="321" y="16" width="78" height="68" rx="16" fill="#ffffff" stroke="#0288D1" stroke-width="2.5" class="svg-node-box"/>
      <text x="360" y="42" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="360" y="66" class="svg-node-text">Router A</text>
    </g>

    <!-- Router B (Down - Middle) -->
    <g class="svg-node down ${sel === 'b' ? 'selected' : ''}" onclick="selectGameRouter('b')" id="g-node-b">
      <rect x="321" y="136" width="78" height="68" rx="16" fill="#ffebee" stroke="#f44336" stroke-width="2.5" class="svg-node-box"/>
      <text x="360" y="162" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="384" y="146" font-size="20" text-anchor="middle" dominant-baseline="middle">⚠️</text>
      <text x="360" y="186" class="svg-node-text" fill="#c62828">Down</text>
    </g>

    <!-- Router C (Safe - Bottom) -->
    <g class="svg-node ${sel === 'c' ? 'selected' : ''}" onclick="selectGameRouter('c')" id="g-node-c">
      <rect x="321" y="256" width="78" height="68" rx="16" fill="#ffffff" stroke="#4caf50" stroke-width="2.5" class="svg-node-box"/>
      <text x="360" y="282" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="360" y="306" class="svg-node-text">Router C</text>
    </g>

    <!-- Gateway Router -->
    <g class="svg-node">
      <rect x="621" y="136" width="78" height="68" rx="16" fill="#ede7f6" stroke="#7e57c2" stroke-width="2.5" class="svg-node-box"/>
      <text x="660" y="162" font-size="28" text-anchor="middle" dominant-baseline="middle">🌐</text>
      <text x="660" y="186" class="svg-node-text">Gateway</text>
    </g>

    <!-- Right Connection Port -->
    <circle cx="868" cy="170" r="9" fill="#4caf50"/>
  `;
}

function selectGameRouter(path) {
  if (gameEngine.isTransmitting) return;

  gameEngine.lvl1.selectedPath = path;
  playSynthSound('hop');
  renderLevel1Topology();

  const netStatus = document.getElementById('game-net-status');
  if (netStatus) {
    if (path === 'b') {
      netStatus.className = 'hud-val status-badge error';
      netStatus.textContent = '⚠️ Jalur Rusak';
    } else {
      netStatus.className = 'hud-val status-badge ready';
      netStatus.textContent = `🟢 Rute ${path.toUpperCase()} Dipilih`;
    }
  }
}

// -------------------- LEVEL 2: TOPOLOGY (SVG VECTOR) --------------------
function renderLevel2Topology() {
  const svg = document.getElementById('game-svg-layer');
  if (!svg) return;

  svg.innerHTML = `
    <!-- Path A: Fiber (Top) -->
    <path d="M 12,170 C 180,170 240,60 440,60 C 640,60 700,170 868,170" class="g-path fast active" id="g-path-lvl2-a"/>
    <!-- Path B: Satelit (Bottom) -->
    <path d="M 12,170 C 180,170 240,280 440,280 C 640,280 700,170 868,170" class="g-path active" id="g-path-lvl2-b"/>

    <!-- Left Connection Port -->
    <circle cx="12" cy="170" r="9" fill="#0288D1"/>

    <!-- Router Alpha (Path A) -->
    <g class="svg-node selected" id="g-node-l2-a">
      <rect x="395" y="26" width="90" height="68" rx="16" fill="#ffffff" stroke="#00ACC1" stroke-width="2.5" class="svg-node-box" id="svg-box-l2-a"/>
      <text x="440" y="52" font-size="28" text-anchor="middle" dominant-baseline="middle">⚡</text>
      <text x="440" y="76" class="svg-node-text">Fiber (Maks 2)</text>
    </g>

    <!-- Router Beta (Path B) -->
    <g class="svg-node selected" id="g-node-l2-b">
      <rect x="395" y="246" width="90" height="68" rx="16" fill="#ffffff" stroke="#0288D1" stroke-width="2.5" class="svg-node-box" id="svg-box-l2-b"/>
      <text x="440" y="272" font-size="28" text-anchor="middle" dominant-baseline="middle">📡</text>
      <text x="440" y="296" class="svg-node-text">Satelit (Maks 2)</text>
    </g>

    <!-- Right Connection Port -->
    <circle cx="868" cy="170" r="9" fill="#4caf50"/>
  `;
}

function setPacketPath(pktNum, path) {
  if (gameEngine.isTransmitting) return;

  gameEngine.lvl2[`p${pktNum}`] = path;
  playSynthSound('hop');
  updateLoadBalancerDeckUI();
}

function updateLoadBalancerDeckUI() {
  for (let i = 1; i <= 4; i++) {
    const curPath = gameEngine.lvl2[`p${i}`];
    const btnA = document.getElementById(`btn-p${i}-a`);
    const btnB = document.getElementById(`btn-p${i}-b`);
    if (btnA && btnB) {
      if (curPath === 'A') {
        btnA.classList.add('active');
        btnB.classList.remove('active');
      } else {
        btnA.classList.remove('active');
        btnB.classList.add('active');
      }
    }
  }

  // Count load
  let countA = 0;
  let countB = 0;
  for (let i = 1; i <= 4; i++) {
    if (gameEngine.lvl2[`p${i}`] === 'A') countA++;
    else countB++;
  }

  const netStatus = document.getElementById('game-net-status');
  const boxA = document.getElementById('svg-box-l2-a');
  const boxB = document.getElementById('svg-box-l2-b');
  const pathA = document.getElementById('g-path-lvl2-a');
  const pathB = document.getElementById('g-path-lvl2-b');

  if (boxA) { boxA.setAttribute('fill', '#ffffff'); boxA.setAttribute('stroke', '#00ACC1'); }
  if (boxB) { boxB.setAttribute('fill', '#ffffff'); boxB.setAttribute('stroke', '#0288D1'); }
  if (pathA) pathA.classList.remove('congested');
  if (pathB) pathB.classList.remove('congested');

  if (countA > 2) {
    if (boxA) { boxA.setAttribute('fill', '#fff3e0'); boxA.setAttribute('stroke', '#ff9800'); }
    if (pathA) pathA.classList.add('congested');
    if (netStatus) {
      netStatus.className = 'hud-val status-badge warning';
      netStatus.textContent = `⚠️ Jalur A Overload (${countA}/2)`;
    }
  } else if (countB > 2) {
    if (boxB) { boxB.setAttribute('fill', '#fff3e0'); boxB.setAttribute('stroke', '#ff9800'); }
    if (pathB) pathB.classList.add('congested');
    if (netStatus) {
      netStatus.className = 'hud-val status-badge warning';
      netStatus.textContent = `⚠️ Jalur B Overload (${countB}/2)`;
    }
  } else {
    if (netStatus) {
      netStatus.className = 'hud-val status-badge ready';
      netStatus.textContent = `🟢 Beban Seimbang (2:2)`;
    }
  }
}

// -------------------- LEVEL 3: TOPOLOGY (SVG MESH & DYNAMIC ROUTES) --------------------
function renderLevel3Topology() {
  const svg = document.getElementById('game-svg-layer');
  if (!svg) return;

  const p1 = parseInt(gameEngine.lvl3.p1) || 2;
  const p2 = parseInt(gameEngine.lvl3.p2) || 3;
  const p3 = parseInt(gameEngine.lvl3.p3) || 1;
  const p4 = parseInt(gameEngine.lvl3.p4) || 4;

  const usedRoutes = new Set([p1, p2, p3, p4]);

  // Count how many use Path 1 (Express)
  let countPath1 = 0;
  [p1, p2, p3, p4].forEach(r => { if (r === 1) countPath1++; });
  const isExpressCongested = countPath1 > 1;

  svg.innerHTML = `
    <!-- Mesh Lines -->
    <!-- Path 1 (R1 -> R3): Express 35ms -->
    <path d="M 12,170 C 100,170 140,65 240,65 L 480,50 L 670,170 L 868,170" class="g-path ${isExpressCongested ? 'congested' : 'fast'} ${usedRoutes.has(1) ? 'active' : ''}" id="g-mesh-p1"/>
    <!-- Path 2 (R1 -> R4): Transit 75ms -->
    <path d="M 12,170 C 100,170 140,65 240,65 L 480,170 L 670,170 L 868,170" class="g-path ${usedRoutes.has(2) ? 'active' : ''}" id="g-mesh-p2"/>
    <!-- Path 3 (R2 -> R4): Cross Link 90ms -->
    <path d="M 12,170 C 100,170 140,275 240,275 L 480,170 L 670,170 L 868,170" class="g-path ${usedRoutes.has(3) ? 'active' : ''}" id="g-mesh-p3"/>
    <!-- Path 4 (R2 -> R5): Satelit 160ms -->
    <path d="M 12,170 C 100,170 140,275 240,275 L 480,290 L 670,170 L 868,170" class="g-path ${usedRoutes.has(4) ? 'active' : ''}" id="g-mesh-p4"/>

    <!-- Left Connection Port -->
    <circle cx="12" cy="170" r="9" fill="#0288D1"/>

    <!-- Layer 1 Routers -->
    <g class="svg-node selected" id="g-mesh-r1">
      <rect x="201" y="31" width="78" height="68" rx="16" fill="#ffffff" stroke="#00ACC1" stroke-width="2.5" class="svg-node-box"/>
      <text x="240" y="57" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="240" y="81" class="svg-node-text">Router 1</text>
    </g>

    <g class="svg-node selected" id="g-mesh-r2">
      <rect x="201" y="241" width="78" height="68" rx="16" fill="#ffffff" stroke="#0288D1" stroke-width="2.5" class="svg-node-box"/>
      <text x="240" y="267" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="240" y="291" class="svg-node-text">Router 2</text>
    </g>

    <!-- Layer 2 Routers -->
    <g class="svg-node ${isExpressCongested ? 'down' : (usedRoutes.has(1) ? 'selected' : '')}" id="g-mesh-r3">
      <rect x="441" y="16" width="78" height="68" rx="16" fill="${isExpressCongested ? '#fff3e0' : '#e8f5e9'}" stroke="${isExpressCongested ? '#ff9800' : '#4caf50'}" stroke-width="2.5" class="svg-node-box"/>
      <text x="480" y="42" font-size="28" text-anchor="middle" dominant-baseline="middle">⚡</text>
      <text x="480" y="66" class="svg-node-text">${isExpressCongested ? 'R3 (Padat!)' : 'R3 (Express)'}</text>
    </g>

    <g class="svg-node ${(usedRoutes.has(2) || usedRoutes.has(3)) ? 'selected' : ''}" id="g-mesh-r4">
      <rect x="441" y="136" width="78" height="68" rx="16" fill="#ffffff" stroke="#00ACC1" stroke-width="2.5" class="svg-node-box"/>
      <text x="480" y="162" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="480" y="186" class="svg-node-text">R4 (Transit)</text>
    </g>

    <g class="svg-node ${usedRoutes.has(4) ? 'selected' : ''}" id="g-mesh-r5">
      <rect x="441" y="256" width="78" height="68" rx="16" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2.5" class="svg-node-box"/>
      <text x="480" y="282" font-size="28" text-anchor="middle" dominant-baseline="middle">📡</text>
      <text x="480" y="306" class="svg-node-text">R5 (Satelit)</text>
    </g>

    <!-- Gateway Router Layer 3 -->
    <g class="svg-node selected">
      <rect x="631" y="136" width="78" height="68" rx="16" fill="#ede7f6" stroke="#7e57c2" stroke-width="2.5" class="svg-node-box"/>
      <text x="670" y="162" font-size="28" text-anchor="middle" dominant-baseline="middle">🌐</text>
      <text x="670" y="186" class="svg-node-text">Gateway</text>
    </g>

    <!-- Right Connection Port -->
    <circle cx="868" cy="170" r="9" fill="#4caf50"/>
  `;

  // Update Net Status
  const netStatus = document.getElementById('game-net-status');
  if (netStatus) {
    if (isExpressCongested) {
      netStatus.className = 'hud-val status-badge warning';
      netStatus.textContent = `⚠️ Jalur Express Padat (${countPath1}/1)`;
    } else {
      netStatus.className = 'hud-val status-badge ready';
      netStatus.textContent = `🟢 Topologi Mesh Terhubung`;
    }
  }
}

function updateMeshPacketRoute(pktNum, routeValue) {
  if (gameEngine.isTransmitting) return;

  gameEngine.lvl3[`p${pktNum}`] = parseInt(routeValue) || 1;
  playSynthSound('hop');
  renderLevel3Topology();
}

// -------------------- TRANSMISSION ENGINE --------------------

function resetReassemblyScreen() {
  const grid = document.getElementById('rx-puzzle-grid');
  if (grid) grid.classList.remove('complete');

  for (let s = 1; s <= 4; s++) {
    const slot = document.getElementById(`rx-slot-${s}`);
    if (slot) {
      slot.classList.remove('filled', 'target-highlight', 'shake-error');
      slot.innerHTML = `<span class="slot-badge">#${s}</span>`;
    }
  }

  const statusLabel = document.getElementById('rx-status-label');
  if (statusLabel) {
    statusLabel.className = 'rx-status';
    statusLabel.textContent = 'Menunggu 4 paket...';
  }
}

function handlePacketArrival(packetNum, slotNum) {
  playSynthSound('packet_arrive');
  const slot = document.getElementById(`rx-slot-${slotNum}`);
  if (slot) {
    slot.classList.add('filled');
    slot.innerHTML = '';
  }
  const statusLabel = document.getElementById('rx-status-label');
  if (statusLabel) {
    statusLabel.textContent = `📦 Paket #${packetNum} tiba di Kuadran #${slotNum}`;
  }
}

function launchGameTransmission() {
  if (gameEngine.isTransmitting) return;

  const lvl = gameEngine.currentLevel;
  const transmitBtn = document.getElementById('btn-game-transmit');
  if (transmitBtn) transmitBtn.disabled = true;

  gameEngine.isTransmitting = true;
  resetReassemblyScreen();
  clearGamePackets();

  playSynthSound('transmit');

  if (lvl === 1) {
    executeLevel1();
  } else if (lvl === 2) {
    executeLevel2();
  } else if (lvl === 3) {
    executeLevel3();
  }
}

function clearGamePackets() {
  const svg = document.getElementById('game-svg-layer');
  if (svg) {
    const packets = svg.querySelectorAll('.svg-packet-unit');
    packets.forEach(p => p.remove());
  }
}

// LEVEL 1 EXECUTION (REALISTIC PACKET DROP AT BROKEN ROUTER)
function executeLevel1() {
  const path = gameEngine.lvl1.selectedPath;
  const latencyEl = document.getElementById('game-latency');
  const netStatus = document.getElementById('game-net-status');

  if (!path) {
    gameEngine.isTransmitting = false;
    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = false;
    showGameModal({
      icon: '💡',
      title: 'Pilih Rute Terlebih Dahulu',
      text: 'Klik pada Router A atau Router C untuk memilih jalur transmisi yang aman sebelum mengirim foto!',
      type: 'error',
      actions: [{ label: 'Siap, Pilih Router', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
    return;
  }

  gameEngine.lvl1.attempts++;
  const isSafe = path === 'a' || path === 'c';
  const pathId = `g-path-${path}`;

  if (netStatus) {
    netStatus.className = 'hud-val status-badge ready';
    netStatus.textContent = isSafe ? '🚀 Mengirim Paket...' : '⚠️ Mengirim ke Jalur Rusak...';
  }

  const statusLabel = document.getElementById('rx-status-label');
  if (statusLabel) {
    statusLabel.textContent = isSafe ? 'Menerima transmisi paket data...' : 'Menunggu paket di komputer penerima...';
  }

  for (let i = 1; i <= 4; i++) {
    const t = setTimeout(() => {
      animatePacketAlongPathId(
        i,
        pathId,
        isSafe ? 1300 : 700,
        (reached) => {
          if (reached && isSafe) {
            handlePacketArrival(i, i);
          }
        },
        {
          maxProgress: isSafe ? 1 : 0.36, // Stops right at Router B (middle) when down!
          dropOnStop: !isSafe
        }
      );
    }, (i - 1) * 200);
    gameEngine.activeTimeouts.push(t);
  }

  const endTimer = setTimeout(() => {
    gameEngine.isTransmitting = false;
    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = false;

    if (isSafe) {
      if (latencyEl) latencyEl.textContent = '⏱️ 42 ms';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge ready';
        netStatus.textContent = '🟢 Sukses (4/4 Paket Tiba)';
      }
      gameEngine.stars[1] = 1;
      gameEngine.unlockedLevel = Math.max(gameEngine.unlockedLevel, 2);
      updateHUD();
      playSynthSound('level_complete');
      spawnConfetti();

      showGameModal({
        icon: '🎉',
        title: 'Misi 1 Berhasil!',
        text: 'Router berhasil menemukan rute alternatif yang aman. Keempat paket data foto kucing tiba dengan selamat dan tersusun rapi di komputer penerima!',
        stars: 1,
        type: 'success',
        actions: [
          { label: '🔄 Mainkan Lagi', cls: 'btn btn-secondary', onClick: 'closeGameModal();renderGameLevel(1)' },
          { label: '▶ Lanjut ke Misi 2 (Load Balancing)', cls: 'btn btn-success', onClick: 'closeGameModal();switchGameLevel(2)' }
        ]
      });
    } else {
      if (latencyEl) latencyEl.textContent = '⏱️ TIMEOUT (0 ms)';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge error';
        netStatus.textContent = '❌ 4 Paket Terputus (Drop)';
      }
      if (statusLabel) {
        statusLabel.className = 'rx-status';
        statusLabel.textContent = '❌ Tidak ada paket data yang sampai ke Penerima (0/4)!';
      }
      playSynthSound('error');

      showGameModal({
        icon: '⚠️',
        title: 'Paket Terputus di Router B (Server Down)',
        text: 'Paket data tidak bisa diteruskan dan hangus/gugur di Router B karena server mengalami kegagalan fungsi. Perhatikan ikon ⚠️ dan pilihlah Jalur A (Atas) atau Jalur C (Bawah) yang berstatus aman!',
        type: 'error',
        actions: [{ label: '🔄 Pilih Jalur yang Aman', cls: 'btn btn-warning', onClick: 'closeGameModal()' }]
      });
    }
  }, isSafe ? 2400 : 1800);

  gameEngine.activeTimeouts.push(endTimer);
}

// LEVEL 2 EXECUTION (REALISTIC BUFFER CAPACITY LIMIT & MIDWAY OVERFLOW DROP)
function executeLevel2() {
  gameEngine.lvl2.attempts++;
  const latencyEl = document.getElementById('game-latency');
  const netStatus = document.getElementById('game-net-status');

  let countA = 0;
  let countB = 0;
  for (let i = 1; i <= 4; i++) {
    if (gameEngine.lvl2[`p${i}`] === 'A') countA++;
    else countB++;
  }

  const isBalanced = (countA === 2 && countB === 2);

  let seqOnA = 0;
  let seqOnB = 0;
  let successCount = 0;

  for (let i = 1; i <= 4; i++) {
    const pathChoice = gameEngine.lvl2[`p${i}`];
    const isPathA = pathChoice === 'A';
    const pathId = isPathA ? 'g-path-lvl2-a' : 'g-path-lvl2-b';

    let orderOnThisPath = 0;
    if (isPathA) {
      seqOnA++;
      orderOnThisPath = seqOnA;
    } else {
      seqOnB++;
      orderOnThisPath = seqOnB;
    }

    // Limit is strictly 2 packets per path!
    const isAllowed = orderOnThisPath <= 2;

    const t = setTimeout(() => {
      animatePacketAlongPathId(
        i,
        pathId,
        isAllowed ? (isBalanced ? 1100 : 1300) : 900,
        (reached) => {
          if (reached && isAllowed) {
            successCount++;
            handlePacketArrival(i, i);
          }
        },
        {
          maxProgress: isAllowed ? 1 : 0.46, // Stops right at router middle when capacity exceeded!
          dropOnStop: !isAllowed
        }
      );
    }, (i - 1) * 160);

    gameEngine.activeTimeouts.push(t);
  }

  const endTimer = setTimeout(() => {
    gameEngine.isTransmitting = false;
    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = false;

    if (isBalanced) {
      if (latencyEl) latencyEl.textContent = '⏱️ 24 ms (Ultra Cepat!)';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge ready';
        netStatus.textContent = '🟢 Optimal (4/4 Paket Tiba)';
      }
      gameEngine.stars[2] = 1;
      gameEngine.unlockedLevel = Math.max(gameEngine.unlockedLevel, 3);
      updateHUD();
      playSynthSound('level_complete');
      spawnConfetti();

      showGameModal({
        icon: '⚡',
        title: 'Misi 2 Berhasil: Load Balanced!',
        text: 'Hebat! Dengan membagi beban 2 paket di Jalur A (Atas) dan 2 paket di Jalur B (Bawah), seluruh 4 paket data tiba serentak tanpa ada yang tertolak. Inilah keunggulan sistem <strong>Packet Switching</strong>!',
        stars: 2,
        type: 'success',
        actions: [
          { label: '🔄 Mainkan Lagi', cls: 'btn btn-secondary', onClick: 'closeGameModal();renderGameLevel(2)' },
          { label: '▶ Lanjut ke Misi 3 (Mesh Dinamis)', cls: 'btn btn-success', onClick: 'closeGameModal();switchGameLevel(3)' }
        ]
      });
    } else {
      const overloadedPath = countA > 2 ? 'A (Atas)' : 'B (Bawah)';
      const droppedCount = 4 - successCount;

      if (latencyEl) latencyEl.textContent = '⏱️ TIMEOUT (0 ms)';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge error';
        netStatus.textContent = `⚠️ ${droppedCount} Paket Dropped`;
      }
      const statusLabel = document.getElementById('rx-status-label');
      if (statusLabel) {
        statusLabel.className = 'rx-status';
        statusLabel.textContent = `⚠️ Hanya ${successCount} paket yang sampai. ${droppedCount} paket tertolak antrean!`;
      }
      playSynthSound('error');

      showGameModal({
        icon: '🚦',
        title: 'Kapasitas Jalur Terlampaui (Buffer Overflow)',
        text: `Jalur ${overloadedPath} hanya mampu menampung <strong>maksimal 2 paket</strong>. Paket ke-3 dan seterusnya otomatis ditolak (Packet Dropped) di tengah jalan sehingga foto di komputer penerima menjadi tidak lengkap (${successCount}/4). Bagilah 2 di Atas dan 2 di Bawah!`,
        type: 'error',
        actions: [{ label: '🔄 Bagi Beban 2:2', cls: 'btn btn-warning', onClick: 'closeGameModal()' }]
      });
    }
  }, 2200);

  gameEngine.activeTimeouts.push(endTimer);
}

// LEVEL 3 EXECUTION (REALISTIC DYNAMIC MESH ROUTING WITH CAPACITY LIMITS & REASSEMBLY)
function executeLevel3() {
  gameEngine.lvl3.attempts++;
  const latencyEl = document.getElementById('game-latency');
  const netStatus = document.getElementById('game-net-status');

  // Reset Level 3 buffer and reassembly state
  gameEngine.lvl3.arrivedPackets = [];
  gameEngine.lvl3.selectedBufferPkt = null;
  gameEngine.lvl3.assembledSlots = {};

  const p1 = parseInt(gameEngine.lvl3.p1) || 1;
  const p2 = parseInt(gameEngine.lvl3.p2) || 1;
  const p3 = parseInt(gameEngine.lvl3.p3) || 1;
  const p4 = parseInt(gameEngine.lvl3.p4) || 1;

  const routes = { 1: p1, 2: p2, 3: p3, 4: p4 };

  // Base specs & strict capacities:
  // 1: Express (35ms base, 800ms anim, maxCap: 1)
  // 2: Transit (75ms base, 1250ms anim, maxCap: 2)
  // 3: Cross Link (90ms base, 1450ms anim, maxCap: 2)
  // 4: Satelit (160ms base, 1950ms anim, maxCap: 2)
  const pathSpecs = {
    1: { id: 'g-mesh-p1', baseMs: 35, animMs: 800, name: 'Express', maxCap: 1, routerName: 'R3 (Express)' },
    2: { id: 'g-mesh-p2', baseMs: 75, animMs: 1250, name: 'Transit', maxCap: 2, routerName: 'R4 (Transit)' },
    3: { id: 'g-mesh-p3', baseMs: 90, animMs: 1450, name: 'Cross Link', maxCap: 2, routerName: 'R4 (Cross)' },
    4: { id: 'g-mesh-p4', baseMs: 160, animMs: 1950, name: 'Satelit', maxCap: 2, routerName: 'R5 (Satelit)' }
  };

  const pathUsage = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const packetJobs = [];

  for (let pktNum = 1; pktNum <= 4; pktNum++) {
    const routeChoice = routes[pktNum] || 2;
    const spec = pathSpecs[routeChoice] || pathSpecs[2];

    pathUsage[routeChoice] = (pathUsage[routeChoice] || 0) + 1;
    const isAllowed = pathUsage[routeChoice] <= spec.maxCap;

    packetJobs.push({
      pktNum,
      routeChoice,
      pathId: spec.id,
      pathName: spec.name,
      routerName: spec.routerName,
      realLatencyMs: spec.baseMs,
      animDuration: spec.animMs,
      isAllowed
    });
  }

  const maxLatency = Math.max(...packetJobs.filter(j => j.isAllowed).map(j => j.realLatencyMs), 0);

  if (netStatus) {
    netStatus.className = 'hud-val status-badge ready';
    netStatus.textContent = '⚡ Transmisi Paket Melintasi Mesh...';
  }

  // Hide Config Deck, Show Inbox Deck (ready for incoming packets)
  const configDeck = document.getElementById('mesh-config-deck');
  const inboxDeck = document.getElementById('mesh-inbox-deck');
  const inboxGrid = document.getElementById('mesh-inbox-grid');

  if (configDeck) configDeck.style.display = 'none';
  if (inboxDeck) inboxDeck.style.display = 'block';
  if (inboxGrid) inboxGrid.innerHTML = '';

  const statusLabel = document.getElementById('rx-status-label');
  if (statusLabel) {
    statusLabel.className = 'rx-status';
    statusLabel.textContent = 'Menunggu kedatangan paket di Buffer Penerima...';
  }

  // Dispatch all 4 packets along their routes
  packetJobs.forEach((job) => {
    animatePacketAlongPathId(
      job.pktNum,
      job.pathId,
      job.animDuration,
      (reached) => {
        if (reached && job.isAllowed) {
          playSynthSound('packet_arrive');
          gameEngine.lvl3.arrivedPackets.push(job);
          renderBufferArrivalCard(job);
        }
      },
      {
        maxProgress: job.isAllowed ? 1 : 0.54, // Drops right at router middle when capacity exceeded!
        dropOnStop: !job.isAllowed
      }
    );
  });

  const maxAnimDuration = Math.max(...packetJobs.map(j => j.animDuration));

  const completionTimer = setTimeout(() => {
    gameEngine.isTransmitting = false;
    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = true;

    const arrivedCount = gameEngine.lvl3.arrivedPackets.length;

    if (arrivedCount < 4) {
      // Overload failure!
      const droppedCount = 4 - arrivedCount;
      if (latencyEl) latencyEl.textContent = '⏱️ TIMEOUT (0 ms)';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge error';
        netStatus.textContent = `❌ ${droppedCount} Paket Dropped (Overflow)`;
      }
      if (statusLabel) {
        statusLabel.className = 'rx-status';
        statusLabel.textContent = `❌ Buffer Overflow! Hanya ${arrivedCount}/4 paket yang tiba. ${droppedCount} paket tertolak antrean di router!`;
      }
      playSynthSound('error');

      const isExpressOverloaded = pathUsage[1] > 1;
      showGameModal({
        icon: '🚦',
        title: 'Kapasitas Rute Mesh Terlampaui (Buffer Overflow)',
        text: isExpressOverloaded
          ? `Jalur <strong>Express (R1➔R3)</strong> hanya memiliki kapasitas sempit (<strong>maksimal 1 paket</strong>). Paket ke-2 dan seterusnya otomatis tertolak dan gugur di Router 3.<br><br>Atur variasi rute tiap paket (Express maks 1, Transit maks 2, Cross maks 2, Satelit maks 2) agar seluruh 4 paket tiba dengan lengkap!`
          : `Salah satu jalur melebihi <strong>kapasitas maksimal 2 paket</strong> sehingga paket lainnya tertolak di router!<br><br>Bagikan rute ke-4 paket secara bervariasi agar semua paket tiba dengan selamat.`,
        type: 'error',
        actions: [
          { label: '🔄 Atur Ulang Rute Mesh', cls: 'btn btn-warning', onClick: 'closeGameModal();renderGameLevel(3)' }
        ]
      });

    } else {
      // All 4 arrived successfully!
      if (latencyEl) latencyEl.textContent = `⏱️ ${maxLatency} ms (Optimal)`;
      if (netStatus) {
        netStatus.className = 'hud-val status-badge ready';
        netStatus.textContent = '🧩 Susun Paket ke Kuadran!';
      }
      if (statusLabel) {
        statusLabel.textContent = '📦 4 Paket telah tiba di Buffer Penerima! Klik kartu paket (atau klik Kuadran monitor) untuk merakit kembali foto kucing.';
      }
    }

  }, maxAnimDuration + 300);

  gameEngine.activeTimeouts.push(completionTimer);
}

// -------------------- INTERACTIVE DYNAMIC BUFFER & SLOT REASSEMBLY --------------------

function renderBufferArrivalCard(job) {
  const inboxGrid = document.getElementById('mesh-inbox-grid');
  if (!inboxGrid) return;

  const card = document.createElement('div');
  card.className = 'mesh-inbox-card';
  card.id = `inbox-card-pkt-${job.pktNum}`;
  card.onclick = () => placePacketToSlot(job.pktNum);

  const quadrantNames = { 1: 'Kiri-Atas', 2: 'Kanan-Atas', 3: 'Kiri-Bawah', 4: 'Kanan-Bawah' };

  card.innerHTML = `
    <div class="mic-thumb" data-slot="${job.pktNum}"></div>
    <div class="mic-info">
      <span class="mic-header-title">📦 Header ID: #${job.pktNum}</span>
      <span class="mic-arrival-tag">Rute: ${job.pathName} (${job.realLatencyMs}ms)</span>
    </div>
  `;

  inboxGrid.appendChild(card);
}

function placePacketToSlot(pktNum) {
  if (gameEngine.currentLevel !== 3) return;
  if (gameEngine.lvl3.assembledSlots[pktNum]) return; // already placed

  const arrivedJob = (gameEngine.lvl3.arrivedPackets || []).find(j => j.pktNum === pktNum);
  if (!arrivedJob) {
    playSynthSound('error');
    const statusLabel = document.getElementById('rx-status-label');
    if (statusLabel) {
      statusLabel.textContent = `❌ Paket #${pktNum} belum tiba atau tertolak di jalan!`;
    }
    return;
  }

  gameEngine.lvl3.assembledSlots[pktNum] = true;
  playSynthSound('packet_arrive');

  const slotEl = document.getElementById(`rx-slot-${pktNum}`);
  if (slotEl) {
    slotEl.classList.remove('target-highlight', 'shake-error');
    slotEl.classList.add('filled');
    slotEl.innerHTML = '';
  }

  const card = document.getElementById(`inbox-card-pkt-${pktNum}`);
  if (card) {
    card.classList.remove('selected');
    card.classList.add('processed');
    card.innerHTML = `
      <div class="mic-thumb" data-slot="${pktNum}"></div>
      <div class="mic-info">
        <span class="mic-header-title" style="color:#2e7d32;">✅ Terpasang di Kuadran #${pktNum}</span>
        <span class="mic-arrival-tag">Header #${pktNum} Terverifikasi</span>
      </div>
      <span style="color:#2e7d32; font-size:18px; font-weight:900; margin-left:auto;">✓</span>
    `;
  }

  const assembledCount = Object.keys(gameEngine.lvl3.assembledSlots).length;
  const statusLabel = document.getElementById('rx-status-label');

  if (assembledCount === 4) {
    if (statusLabel) {
      statusLabel.className = 'rx-status complete';
      statusLabel.textContent = '✨ Foto Kucing Berhasil Dirakit Sempurna 100%!';
    }

    const grid = document.getElementById('rx-puzzle-grid');
    if (grid) grid.classList.add('complete');

    gameEngine.stars[3] = 1;
    updateHUD();
    playSynthSound('victory');
    spawnConfetti();

    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = false;

    setTimeout(() => {
      showGameModal({
        icon: '👑',
        title: 'Selamat! Kamu Master Packet Commander!',
        text: 'Luar biasa! Konfigurasi rute mesh sangat optimal tanpa ada paket yang tertolak antrean, dan kamu berhasil merekonstruksi <strong>Header & Payload</strong> foto kucing dengan akurasi 100%!',
        stars: 3,
        type: 'victory',
        actions: [
          { label: '🔄 Mainkan Lagi Misi 3', cls: 'btn btn-secondary', onClick: 'closeGameModal();renderGameLevel(3)' },
          { label: '▶ Lanjut ke Latihan Evaluasi', cls: 'btn btn-success', onClick: 'closeGameModal();goToPage(\'latihan-intro\')' }
        ]
      });
    }, 500);

  } else {
    if (statusLabel) {
      statusLabel.textContent = `✅ Kuadran #${pktNum} terpasang (${assembledCount}/4)! Pasang paket lainnya...`;
    }
  }
}

function selectBufferPacket(pktNum) {
  placePacketToSlot(pktNum);
}

function clickReceiverSlot(slotNum) {
  if (gameEngine.currentLevel !== 3) return;
  placePacketToSlot(slotNum);
}

function autoAssembleAllBufferPackets() {
  if (gameEngine.currentLevel !== 3) return;
  const arrived = gameEngine.lvl3.arrivedPackets || [];
  if (arrived.length === 0) return;

  arrived.forEach((job, idx) => {
    setTimeout(() => {
      placePacketToSlot(job.pktNum);
    }, idx * 250);
  });
}

// -------------------- SVG PACKET ANIMATION (VECTOR MATH WITH DROP SIMULATION) --------------------

function animatePacketAlongPathId(packetNum, pathId, duration, onComplete, options = {}) {
  const { maxProgress = 1, dropOnStop = false } = options;
  const svg = document.getElementById('game-svg-layer');
  const path = document.getElementById(pathId);
  if (!svg || !path) {
    if (onComplete) onComplete(false);
    return;
  }

  const totalLength = path.getTotalLength();
  const colors = { 1: '#00ACC1', 2: '#0288D1', 3: '#7b1fa2', 4: '#e65100' };

  // Create SVG packet group inside the SVG
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', `svg-packet-unit pkt-${packetNum}`);

  const startPt = path.getPointAtLength(0);
  g.setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '-18');
  rect.setAttribute('y', '-18');
  rect.setAttribute('width', '36');
  rect.setAttribute('height', '36');
  rect.setAttribute('rx', '8');
  rect.setAttribute('fill', colors[packetNum] || '#00ACC1');
  rect.setAttribute('stroke', '#ffffff');
  rect.setAttribute('stroke-width', '2.5');
  rect.setAttribute('filter', 'drop-shadow(0 3px 8px rgba(0,0,0,0.38))');

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'central');
  text.setAttribute('fill', '#ffffff');
  text.setAttribute('font-family', 'var(--font-heading)');
  text.setAttribute('font-weight', '900');
  text.setAttribute('font-size', '16');
  text.textContent = packetNum;

  g.appendChild(rect);
  g.appendChild(text);
  svg.appendChild(g);

  const startTime = performance.now();

  function animFrame(now) {
    const elapsed = now - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);

    if (rawProgress >= maxProgress) {
      // Reached progress limit (e.g. stopped at broken router or buffer overflow!)
      const stopDist = maxProgress * totalLength;
      const pt = path.getPointAtLength(stopDist);
      g.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);

      if (dropOnStop || maxProgress < 1) {
        // Explode / Drop particle effect!
        rect.setAttribute('fill', '#d32f2f');
        rect.setAttribute('stroke', '#ffeb3b');
        rect.setAttribute('stroke-width', '3');
        text.textContent = '❌';
        playSynthSound('error');

        const fadeStart = performance.now();
        function fadeAnim(fadeNow) {
          const fadeElapsed = fadeNow - fadeStart;
          const fadeProgress = Math.min(fadeElapsed / 450, 1);
          g.style.opacity = String(1 - fadeProgress);
          g.setAttribute('transform', `translate(${pt.x}, ${pt.y - fadeProgress * 18}) scale(${1 + fadeProgress * 0.35})`);

          if (fadeProgress < 1) {
            requestAnimationFrame(fadeAnim);
          } else {
            g.remove();
            if (onComplete) onComplete(false); // Did not reach destination
          }
        }
        requestAnimationFrame(fadeAnim);
      } else {
        g.remove();
        if (onComplete) onComplete(true); // Safely reached destination!
      }
      return;
    }

    const currentDist = rawProgress * totalLength;
    const pt = path.getPointAtLength(currentDist);
    g.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
    requestAnimationFrame(animFrame);
  }

  requestAnimationFrame(animFrame);
}

function resetCurrentGameLevel() {
  if (gameEngine.isTransmitting) return;
  clearGameTimers();

  const lvl = gameEngine.currentLevel;
  if (lvl === 1) {
    gameEngine.lvl1.selectedPath = null;
  } else if (lvl === 2) {
    gameEngine.lvl2.p1 = 'A';
    gameEngine.lvl2.p2 = 'A';
    gameEngine.lvl2.p3 = 'A';
    gameEngine.lvl2.p4 = 'A';
  } else if (lvl === 3) {
    gameEngine.lvl3.p1 = 1;
    gameEngine.lvl3.p2 = 1;
    gameEngine.lvl3.p3 = 1;
    gameEngine.lvl3.p4 = 1;
    gameEngine.lvl3.arrivedPackets = [];
    gameEngine.lvl3.selectedBufferPkt = null;
    gameEngine.lvl3.assembledSlots = {};
  }

  resetReassemblyScreen();
  clearGamePackets();
  renderGameLevel(lvl);
}

function showGameHint() {
  const lvl = gameEngine.currentLevel;
  if (lvl === 1) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 1',
      text: 'Router B mengalami gangguan fisik/server down. Paket data di internet akan otomatis menghindari jalur bertanda ⚠️ dan memilih rute alternatif (Jalur A atau Jalur C).',
      type: 'success',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  } else if (lvl === 2) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 2',
      text: 'Setiap jalur hanya mampu membawa 2 paket data sekaligus. Bagilah: 2 paket melewati Jalur A (Atas) dan 2 paket melewati Jalur B (Bawah) agar pengiriman foto berlangsung cepat secara paralel.',
      type: 'success',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  } else if (lvl === 3) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 3',
      text: 'Tiap paket data melintasi rute mesh dan tiba di Buffer Penerima dengan waktu bervariasi. Klik kartu paket di Buffer untuk menginspeksi nomor Header, lalu klik Kuadran foto yang sesuai di Monitor Penerima!',
      type: 'success',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  }
}

// -------------------- GAME MODAL HELPER --------------------
function showGameModal(config) {
  const modal = document.getElementById('game-modal');
  const card = document.getElementById('game-modal-card');
  if (!modal || !card) return;

  let starsHtml = '';
  if (config.stars) {
    let starsStr = '';
    for (let i = 0; i < config.stars; i++) starsStr += '⭐';
    starsHtml = `<div class="gm-stars-row">${starsStr}</div>`;
  }

  let actionsHtml = '';
  if (config.actions && Array.isArray(config.actions)) {
    actionsHtml = config.actions.map(act => `
      <button class="${act.cls || 'btn btn-primary'}" onclick="${act.onClick}">${act.label}</button>
    `).join('');
  }

  card.innerHTML = `
    <div class="gm-icon">${config.icon || 'ℹ️'}</div>
    <div class="gm-title ${config.type || ''}">${config.title || ''}</div>
    ${starsHtml}
    <div class="gm-text">${config.text || ''}</div>
    <div class="gm-actions">${actionsHtml}</div>
  `;

  modal.classList.add('show');
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  if (modal) modal.classList.remove('show');
}


// ==================== EVALUATION SIMULATION (PAGE 13 - BAGIAN E) ====================

let evalSimState = {
  selectedPath: null,
  attempts: 0,
  completed: false,
  firstAttemptCorrect: false
};

function initEvalSimulation() {
  evalSimState = { selectedPath: null, attempts: 0, completed: false, firstAttemptCorrect: false };
  const topoId = 'sim-topology-eval';

  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));

  const sendBtn = document.getElementById('btn-send-eval');
  if (sendBtn) sendBtn.disabled = true;

  const fb = document.getElementById('sim-feedback-eval');
  if (fb) fb.classList.remove('show');
}

function selectEvalSimPath(path) {
  if (evalSimState.completed) return;

  evalSimState.selectedPath = path;
  const topoId = 'sim-topology-eval';
  const prefix = 'eval-';

  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  const router = document.getElementById(`${prefix}router-${path}`);
  if (router) router.classList.add('selected');

  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));
  const pathLine = document.getElementById(`${prefix}path-${path}-line`);
  if (pathLine) pathLine.classList.add('active');

  const sendBtn = document.getElementById('btn-send-eval');
  if (sendBtn) sendBtn.disabled = false;
}

function sendEvalPacket() {
  const state = evalSimState;
  if (!state.selectedPath || state.completed) return;

  state.attempts++;
  const path = state.selectedPath;
  const isCorrect = path === 'a' || path === 'c';

  const sendBtn = document.getElementById('btn-send-eval');
  if (sendBtn) sendBtn.disabled = true;

  const topology = document.getElementById('sim-topology-eval');

  for (let i = 0; i < 4; i++) {
    const packet = document.createElement('div');
    packet.className = 'packet';
    packet.textContent = (i + 1);
    packet.style.left = '100px';

    const yPositions = { a: 60 + (i * 4), b: 150 + (i * 4), c: 240 + (i * 4) };
    packet.style.top = yPositions[path] + 'px';
    topology.appendChild(packet);

    setTimeout(() => {
      packet.style.opacity = '1';
      packet.style.transition = `left ${isCorrect ? 1.5 : 0.8}s ease ${i * 0.14}s, top 0.3s ease`;
      packet.style.left = isCorrect ? '880px' : '470px';
    }, 40);

    setTimeout(() => {
      packet.remove();
    }, isCorrect ? 2400 : 1500);
  }

  setTimeout(() => {
    showEvalSimFeedback(isCorrect);
  }, isCorrect ? 2000 : 1200);
}

function showEvalSimFeedback(isCorrect) {
  const state = evalSimState;
  const fb = document.getElementById('sim-feedback-eval');
  const card = document.getElementById('sim-feedback-card-eval');

  if (isCorrect) {
    state.completed = true;
    if (state.attempts === 1) state.firstAttemptCorrect = true;

    card.innerHTML = `
      <div class="fb-icon">✅</div>
      <div class="fb-title success">Luar Biasa! Sukses!</div>
      <div class="fb-text">Router berhasil menemukan rute alternatif yang aman. Semua paket data tiba di komputer penerima dan berhasil dirakit kembali menjadi foto yang utuh!</div>
      <div class="fb-actions">
        <button class="btn btn-success" onclick="closeEvalSimFeedback()">Lanjut ke Hasil Evaluasi ▶</button>
      </div>
    `;

    spawnConfetti();

  } else {
    card.innerHTML = `
      <div class="fb-icon">⚠️</div>
      <div class="fb-title error">Rute Terputus (Request Time Out)</div>
      <div class="fb-text">Ups! Jalur B sedang mengalami server down. Pilihlah jalur alternatif yang aman (Jalur A atau C)!</div>
      <div class="fb-actions">
        <button class="btn btn-warning" onclick="retryEvalSimulation()">🔄 Coba Lagi</button>
      </div>
    `;
  }

  fb.classList.add('show');
}

function closeEvalSimFeedback() {
  const fb = document.getElementById('sim-feedback-eval');
  if (fb) fb.classList.remove('show');
}

function retryEvalSimulation() {
  closeEvalSimFeedback();
  evalSimState.selectedPath = null;
  const topoId = 'sim-topology-eval';
  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));
}

// Backward-compatible aliases for Evaluation Section E
const simState = {
  get eval() { return evalSimState; },
  set eval(v) { evalSimState = v; },
  get game() { return gameEngine.lvl1; }
};

function sendPacket(mode) {
  if (mode === 'eval') sendEvalPacket();
  else launchGameTransmission();
}

function selectSimPath(path) {
  selectGameRouter(path);
}

function initSimulation(mode) {
  if (mode === 'eval') initEvalSimulation();
  else initPacketCommanderGame();
}


// ==================== CONFETTI ====================

function spawnConfetti() {
  const colors = ['#00ACC1', '#4DD0E1', '#ff6f61', '#ffd54f', '#81c784', '#ba68c8', '#4fc3f7'];
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    piece.style.animationDuration = (2.2 + Math.random() * 2) + 's';
    piece.style.width = (8 + Math.random() * 8) + 'px';
    piece.style.height = (8 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 4500);
  }
}


// ==================== EVALUATION ====================

const EVAL_ANSWERS = {
  A1: 'B', A2: 'C', A3: 'B', A4: 'B', A5: 'C',
  B1: 'salah', B2: 'benar', B3: 'benar', B4: 'salah', B5: 'salah', B6: 'benar',
};

const MATCH_ANSWERS = {
  '1': 'b', '2': 'd', '3': 'e', '4': 'a', '5': 'c'
};

const SEQ_CORRECT_ORDER = [
  'Foto dipecah menjadi beberapa paket data kecil',
  'Setiap paket diberi header berisi alamat pengirim, alamat tujuan, dan nomor urut',
  'Paket-paket dikirim melalui jaringan lewat jalur yang bisa berbeda-beda',
  'Router mengarahkan setiap paket ke rute tercepat yang tersedia',
  'Jika satu rute rusak/macet, paket otomatis mencari rute alternatif',
  'Semua paket sampai di penerima dan disusun ulang sesuai nomor urut menjadi foto utuh'
];

let evalUserAnswers = {};
let matchState = { selectedLeft: null, pairs: {} };
let evalSectionInited = { C: false, D: false, E: false };

function startEval() {
  evalUserAnswers = {};
  matchState = { selectedLeft: null, pairs: {} };
  evalSectionInited = { C: false, D: false, E: false };
  nextEvalSection('A');
}

function nextEvalSection(sectionId) {
  document.querySelectorAll('.eval-section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById('eval-section-' + sectionId);
  if (section) section.classList.add('active');

  const steps = ['A', 'B', 'C', 'D', 'E'];
  document.querySelectorAll('.eval-progress .step').forEach(s => {
    s.classList.remove('active', 'done');
    const stepId = s.dataset.step;
    const stepIdx = steps.indexOf(stepId);
    const currentIdx = steps.indexOf(sectionId);
    if (stepIdx < currentIdx) s.classList.add('done');
    if (stepIdx === currentIdx) s.classList.add('active');
  });

  if (sectionId === 'C' && !evalSectionInited.C) initMatchSection();
  if (sectionId === 'D' && !evalSectionInited.D) initSeqSection();
  if (sectionId === 'E' && !evalSectionInited.E) {
    initSimulation('eval');
    evalSectionInited.E = true;
  }

  const evalBox = document.getElementById('eval-box');
  if (evalBox) evalBox.scrollTop = 0;
}

function selectMCQ(el) {
  const question = el.closest('.mcq-question');
  question.querySelectorAll('.mcq-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  evalUserAnswers[question.dataset.q] = el.dataset.val;
}

function selectTF(el) {
  const question = el.closest('.tf-question');
  question.querySelectorAll('.tf-btn').forEach(b => {
    b.classList.remove('selected-benar', 'selected-salah');
  });
  el.classList.add(el.dataset.val === 'benar' ? 'selected-benar' : 'selected-salah');
  evalUserAnswers[question.dataset.q] = el.dataset.val;
}

const MATCH_LEFT_DATA = [
  { id: '1', text: 'Paket Data' },
  { id: '2', text: 'Header' },
  { id: '3', text: 'Payload' },
  { id: '4', text: 'Router' },
  { id: '5', text: 'Rute Dinamis' }
];

const MATCH_RIGHT_DATA = [
  { id: 'a', text: 'Perangkat pengarah lalu lintas data ke rute tercepat' },
  { id: 'b', text: 'Bagian kecil hasil pemecahan data asli' },
  { id: 'c', text: 'Kemampuan jaringan mencari jalur baru saat ada gangguan' },
  { id: 'd', text: 'Bagian paket berisi alamat pengirim, tujuan, dan nomor urut' },
  { id: 'e', text: 'Potongan isi data asli yang dikirim di dalam paket' }
];

function initMatchSection() {
  evalSectionInited.C = true;
  const leftCol = document.getElementById('match-left');
  const rightCol = document.getElementById('match-right');
  leftCol.innerHTML = '';
  rightCol.innerHTML = '';

  const shuffledRight = [...MATCH_RIGHT_DATA].sort(() => Math.random() - 0.5);

  MATCH_LEFT_DATA.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.dataset.id = item.id;
    el.dataset.side = 'left';
    el.textContent = item.id + '. ' + item.text;
    el.onclick = () => onMatchClick('left', item.id, el);
    leftCol.appendChild(el);
  });

  shuffledRight.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.dataset.id = item.id;
    el.dataset.side = 'right';
    el.textContent = item.id + '. ' + item.text;
    el.onclick = () => onMatchClick('right', item.id, el);
    rightCol.appendChild(el);
  });
}

function onMatchClick(side, id, el) {
  if (el.classList.contains('matched')) return;

  if (side === 'left') {
    document.querySelectorAll('#match-left .match-item').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');
    matchState.selectedLeft = id;
  } else if (side === 'right' && matchState.selectedLeft !== null) {
    const leftId = matchState.selectedLeft;
    matchState.pairs[leftId] = id;

    const leftEl = document.querySelector(`#match-left .match-item[data-id="${leftId}"]`);
    if (leftEl) {
      leftEl.classList.remove('selected');
      leftEl.classList.add('matched');
    }
    el.classList.add('matched');
    matchState.selectedLeft = null;
  }
}

function initSeqSection() {
  evalSectionInited.D = true;
  const list = document.getElementById('seq-list');
  list.innerHTML = '';

  const shuffled = SEQ_CORRECT_ORDER.map((text, i) => ({ text, correctIdx: i }))
    .sort(() => Math.random() - 0.5);

  shuffled.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'seq-item';
    el.draggable = true;
    el.dataset.correctIdx = item.correctIdx;
    el.innerHTML = `<span class="seq-grip">⠿</span><span class="seq-num">${i + 1}</span><span>${item.text}</span>`;

    el.addEventListener('dragstart', onSeqDragStart);
    el.addEventListener('dragover', onSeqDragOver);
    el.addEventListener('dragenter', onSeqDragEnter);
    el.addEventListener('dragleave', onSeqDragLeave);
    el.addEventListener('drop', onSeqDrop);
    el.addEventListener('dragend', onSeqDragEnd);

    el.addEventListener('touchstart', onSeqTouchStart, { passive: false });
    el.addEventListener('touchmove', onSeqTouchMove, { passive: false });
    el.addEventListener('touchend', onSeqTouchEnd);

    list.appendChild(el);
  });
}

let seqDragEl = null;

function onSeqDragStart(e) {
  seqDragEl = e.currentTarget;
  e.currentTarget.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function onSeqDragOver(e) { e.preventDefault(); }

function onSeqDragEnter(e) {
  e.preventDefault();
  if (e.currentTarget !== seqDragEl) e.currentTarget.classList.add('over');
}

function onSeqDragLeave(e) { e.currentTarget.classList.remove('over'); }

function onSeqDrop(e) {
  e.preventDefault();
  const target = e.currentTarget;
  target.classList.remove('over');
  if (!seqDragEl || target === seqDragEl) return;

  const list = document.getElementById('seq-list');
  const items = [...list.children];
  const fromIdx = items.indexOf(seqDragEl);
  const toIdx = items.indexOf(target);

  if (fromIdx < toIdx) {
    list.insertBefore(seqDragEl, target.nextSibling);
  } else {
    list.insertBefore(seqDragEl, target);
  }

  updateSeqNumbers();
}

function onSeqDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  document.querySelectorAll('.seq-item').forEach(i => i.classList.remove('over'));
  seqDragEl = null;
}

let seqTouchEl = null;
let seqTouchClone = null;

function onSeqTouchStart(e) {
  seqTouchEl = e.currentTarget;
  e.preventDefault();
  seqTouchClone = seqTouchEl.cloneNode(true);
  seqTouchClone.style.position = 'fixed';
  seqTouchClone.style.zIndex = '1000';
  seqTouchClone.style.opacity = '0.85';
  seqTouchClone.style.pointerEvents = 'none';
  seqTouchClone.style.width = seqTouchEl.offsetWidth + 'px';
  document.body.appendChild(seqTouchClone);
  const touch = e.touches[0];
  seqTouchClone.style.left = (touch.clientX - seqTouchEl.offsetWidth / 2) + 'px';
  seqTouchClone.style.top = (touch.clientY - 25) + 'px';
  seqTouchEl.classList.add('dragging');
}

function onSeqTouchMove(e) {
  if (!seqTouchClone) return;
  e.preventDefault();
  const touch = e.touches[0];
  seqTouchClone.style.left = (touch.clientX - seqTouchClone.offsetWidth / 2) + 'px';
  seqTouchClone.style.top = (touch.clientY - 25) + 'px';

  document.querySelectorAll('.seq-item').forEach(i => i.classList.remove('over'));
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  if (elem) {
    const item = elem.closest('.seq-item');
    if (item && item !== seqTouchEl) item.classList.add('over');
  }
}

function onSeqTouchEnd(e) {
  if (!seqTouchClone || !seqTouchEl) return;
  const touch = e.changedTouches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);

  document.body.removeChild(seqTouchClone);
  seqTouchClone = null;
  seqTouchEl.classList.remove('dragging');

  if (elem) {
    const target = elem.closest('.seq-item');
    if (target && target !== seqTouchEl) {
      const list = document.getElementById('seq-list');
      const items = [...list.children];
      const fromIdx = items.indexOf(seqTouchEl);
      const toIdx = items.indexOf(target);
      if (fromIdx < toIdx) {
        list.insertBefore(seqTouchEl, target.nextSibling);
      } else {
        list.insertBefore(seqTouchEl, target);
      }
      updateSeqNumbers();
    }
  }

  document.querySelectorAll('.seq-item').forEach(i => i.classList.remove('over'));
  seqTouchEl = null;
}

function updateSeqNumbers() {
  const items = document.querySelectorAll('#seq-list .seq-item');
  items.forEach((item, i) => {
    item.querySelector('.seq-num').textContent = i + 1;
  });
}


// ==================== SUBMIT EVALUATION ====================

function submitEval() {
  const scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };

  for (let i = 1; i <= 5; i++) {
    const key = 'A' + i;
    if (evalUserAnswers[key] === EVAL_ANSWERS[key]) scores.A++;
  }

  for (let i = 1; i <= 6; i++) {
    const key = 'B' + i;
    if (evalUserAnswers[key] === EVAL_ANSWERS[key]) scores.B++;
  }

  for (const [left, right] of Object.entries(matchState.pairs)) {
    if (MATCH_ANSWERS[left] === right) scores.C++;
  }

  const seqItems = document.querySelectorAll('#seq-list .seq-item');
  let seqCorrect = true;
  seqItems.forEach((item, i) => {
    if (parseInt(item.dataset.correctIdx) !== i) seqCorrect = false;
  });
  if (seqCorrect) scores.D = 1;

  if (simState.eval.firstAttemptCorrect) scores.E = 1;

  const total = scores.A + scores.B + scores.C + scores.D + scores.E;
  const maxTotal = 18;
  const percentage = Math.round((total / maxTotal) * 100);

  let msgClass, msgText;
  if (percentage >= 90) {
    msgClass = 'excellent';
    msgText = 'Luar biasa! Kamu benar-benar Packet Explorer sejati! 🏆';
  } else if (percentage >= 60) {
    msgClass = 'good';
    msgText = 'Bagus! Beberapa konsep sudah kamu kuasai, coba ulangi bagian yang masih salah.';
  } else {
    msgClass = 'tryagain';
    msgText = 'Yuk, pelajari lagi materi pembelajaran sebelum mencoba evaluasi lagi!';
  }

  const recapCard = document.getElementById('recap-card');
  recapCard.innerHTML = `
    <div style="font-size:56px;margin-bottom:8px;">📊</div>
    <h2 style="font-family:var(--font-heading);font-size:28px;color:var(--teal-dark);margin-bottom:6px;">Hasil Rekap Evaluasi</h2>
    <div class="recap-score">${percentage}%</div>
    <p style="font-size:18px;color:var(--text-body);margin-bottom:12px;">Total Skor: <strong>${total}</strong> / ${maxTotal} Poin</p>

    <div class="recap-details">
      <span class="recap-badge a">Bagian A: ${scores.A}/5</span>
      <span class="recap-badge b">Bagian B: ${scores.B}/6</span>
      <span class="recap-badge c">Bagian C: ${scores.C}/5</span>
      <span class="recap-badge d">Bagian D: ${scores.D}/1</span>
      <span class="recap-badge e">Bagian E: ${scores.E}/1</span>
    </div>

    <div class="recap-msg ${msgClass}">${msgText}</div>

    <div style="margin-top:24px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
      <button class="btn btn-secondary" onclick="startEval();nextEvalSection('A')">🔄 Ulangi Latihan</button>
      <button class="btn btn-primary" onclick="goToPage('rangkuman')">📋 Ke Rangkuman</button>
    </div>
  `;

  document.querySelectorAll('.eval-section').forEach(s => s.classList.remove('active'));
  document.getElementById('eval-section-recap').classList.add('active');
  document.querySelectorAll('.eval-progress .step').forEach(s => s.classList.add('done'));

  if (percentage >= 60) spawnConfetti();
}


// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
  applyConfig();
  goToPage('cover');
});
