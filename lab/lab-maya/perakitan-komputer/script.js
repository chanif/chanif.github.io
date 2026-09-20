/* ============================================================
   Lab Perakitan Komputer — Main Engine
   Inspirasi Standar Kemendikdasmen MTR_261 · Festival Biru Putih 2026
   Perakitan Komputer (Utama) + Bilangan Biner + Warna RGB + LKPD
   ============================================================ */

// ==================== GLOBAL STATE ====================
let currentTab = 'teori';
let playerName = '';
let playerSchool = '';
let audioEnabled = true;
let isDarkTheme = false;

const labState = {
  // Rakit PC state
  installed: {},          // { compId: true/false }
  slotOccupant: {},       // { slotId: compId }
  compSlot: {},           // { compId: slotId }
  currentExploration: 'free',
  
  // Binary state
  bits: [0, 0, 0, 0, 0, 0, 0, 0], // bit7..bit0
  binarySolved: {},
  
  // RGB state
  r: 0, g: 0, b: 0,
  rgbSolved: {},
  
  // LKPD state
  pgAnswers: {},          // { 0: selectedIdx, 1: selectedIdx, ... }
  bsAnswers: {},          // { 0: true/false, ... }
  matchPairs: {},         // { leftKey: { rightKey, leftElId, rightElId } }
  matchSelected: null,
  lkpdSubmitted: false,
};

// ==================== AUDIO SYNTHESIZER (WEB AUDIO API) ====================
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.15) {
  if (!audioEnabled) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function sfxClick() { playTone(800, 0.08, 'square', 0.05); }
function sfxSnap() { playTone(1200, 0.06, 'square', 0.08); playTone(1600, 0.04, 'sine', 0.05); }
function sfxToggle() { playTone(600, 0.05, 'square', 0.06); }
function sfxSuccess() {
  playTone(523, 0.15, 'sine', 0.1);
  setTimeout(() => playTone(659, 0.15, 'sine', 0.1), 120);
  setTimeout(() => playTone(784, 0.25, 'sine', 0.1), 240);
}
function sfxError() {
  playTone(200, 0.3, 'sawtooth', 0.08);
  setTimeout(() => playTone(180, 0.4, 'sawtooth', 0.06), 200);
}
function sfxBootChime() {
  playTone(523, 0.2, 'sine', 0.1);
  setTimeout(() => playTone(659, 0.2, 'sine', 0.1), 150);
  setTimeout(() => playTone(784, 0.3, 'sine', 0.12), 300);
  setTimeout(() => playTone(1047, 0.5, 'sine', 0.1), 500);
}
function sfxBeepPattern(pattern) {
  if (pattern === 'triple-short') {
    playTone(880, 0.15, 'square', 0.15);
    setTimeout(() => playTone(880, 0.15, 'square', 0.15), 250);
    setTimeout(() => playTone(880, 0.15, 'square', 0.15), 500);
  } else if (pattern === 'single-long') {
    playTone(440, 0.8, 'square', 0.12);
  }
}
function sfxSlider() { playTone(400 + Math.random() * 200, 0.03, 'sine', 0.03); }
function sfxVictoryMelody() {
  if (!audioEnabled) return;
  const notes = [
    { f: 523.25, d: 0.14 }, // C5
    { f: 659.25, d: 0.14 }, // E5
    { f: 783.99, d: 0.14 }, // G5
    { f: 1046.50, d: 0.32 }, // C6
    { f: 880.00, d: 0.16 }, // A5
    { f: 1046.50, d: 0.55 }, // C6
  ];
  let t = 0;
  notes.forEach(n => {
    setTimeout(() => playTone(n.f, n.d, 'triangle', 0.18), t);
    t += (n.d * 1000) + 35;
  });
}

// Confetti Particle Engine
let confettiAnimationId = null;
function launchConfetti() {
  const canvas = document.getElementById('celebration-confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#fbae3c', '#2fd9c4', '#4338ca', '#10b981', '#f43f5e', '#a855f7', '#fbbf24'];

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.4) - (canvas.height * 0.4),
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2.5,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8
    });
  }

  let startTime = Date.now();
  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const elapsed = Date.now() - startTime;

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    if (elapsed < 5500) {
      confettiAnimationId = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  draw();
}

function showBootCelebration() {
  const cfg = window.LAB_CONFIG;
  const modal = document.getElementById('modal-boot-celebration');
  if (!modal) return;

  const nameEl = document.getElementById('celeb-student-name');
  if (nameEl) {
    nameEl.textContent = 'Sobat Informatika';
  }

  const specsGrid = document.getElementById('celeb-specs-grid');
  if (specsGrid && cfg) {
    specsGrid.innerHTML = '';
    cfg.components.filter(c => !c.isDistractor).forEach(comp => {
      const card = document.createElement('div');
      card.className = 'celeb-spec-card';
      card.innerHTML = `
        <div class="celeb-spec-icon" style="background:${comp.color}22;border:2px solid ${comp.color};border-radius:10px;width:48px;height:48px;display:flex;align-items:center;justify-content:center;padding:5px;">
          <img src="${comp.svg}" alt="${comp.name}" style="max-width:100%;max-height:100%;object-fit:contain;">
        </div>
        <div class="celeb-spec-name">${comp.shortName}</div>
        <div class="celeb-spec-status" style="color:#10b981;">✓ Normal & Siap</div>
      `;
      specsGrid.appendChild(card);
    });
  }

  modal.style.display = 'flex';
  sfxVictoryMelody();
  launchConfetti();
}

function toggleAudio() {
  audioEnabled = !audioEnabled;
  const btn = document.getElementById('sound-btn');
  if (btn) {
    btn.innerHTML = audioEnabled ? '🔊 Suara' : '🔇 Bisu';
  }
  sfxToggle();
}

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
  const btn = document.getElementById('theme-btn');
  if (btn) {
    btn.innerHTML = isDarkTheme ? '☀️ Terang' : '🌙 Gelap';
  }
  sfxToggle();
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
}

function showModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'flex';
  sfxClick();
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
  sfxClick();
}

// ==================== WELCOME SCREEN LOGIC ====================

// Animasi partikel di welcome screen
function initWelcomeParticles() {
  const canvas = document.getElementById('welcome-particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const particles = [];
  const colors = ['#fbae3c', '#2fd9c4', '#6366f1', '#10b981', '#f43f5e'];
  for (let i = 0; i < 55; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.6 + 0.2,
    });
  }

  function drawParticles() {
    if (!document.getElementById('welcome-screen') ||
        document.getElementById('welcome-screen').style.display === 'none') return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

function startGame() {
  const welcome = document.getElementById('welcome-screen');
  if (welcome) {
    welcome.style.transition = 'opacity 0.5s ease';
    welcome.style.opacity = '0';
    setTimeout(() => {
      welcome.style.display = 'none';
    }, 500);
  }

  sfxBootChime();
  switchLabTab('teori');
}


// ==================== UNIFIED TAB NAVIGATION ====================
function switchLabTab(tabId) {
  currentTab = tabId;

  // 1. Update tab buttons
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`tab-btn-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');

  // 2. Update sub-panels
  document.querySelectorAll('.game-sub-panel').forEach(panel => {
    panel.classList.remove('active');
    panel.style.display = 'none';
  });
  const activePanel = document.getElementById(`sub-${tabId}`);
  if (activePanel) {
    activePanel.classList.add('active');
    activePanel.style.display = 'flex';
  }

  // 3. Lazy initializations
  if (tabId === 'teori') initTeori();
  if (tabId === 'prosedur') initProsedur();
  if (tabId === 'sim-rakit-pc') {
    initRakitPC();
    updateInstalledCount();
  }
  if (tabId === 'eksplorasi') {
    initBinary();
    initRGBMixer();
    initLogicGate();
  }
  if (tabId === 'lkpd') initLKPD();
  if (tabId === 'referensi') initReferensi();

  sfxClick();
}

// ==================== INIT: TEORI ====================
let teoriInitialized = false;
function initTeori() {
  if (teoriInitialized) return;
  teoriInitialized = true;
  const cfg = window.LAB_CONFIG;
  if (!cfg || !cfg.teori) return;

  const tabsContainer = document.getElementById('teori-tabs');
  const panelsContainer = document.getElementById('teori-panels');
  if (!tabsContainer || !panelsContainer) return;

  tabsContainer.innerHTML = '';
  panelsContainer.innerHTML = '';

  cfg.teori.tabs.forEach((tab, i) => {
    const btn = document.createElement('button');
    btn.className = 'teori-subtab-btn' + (i === 0 ? ' active' : '');
    btn.textContent = `${tab.icon} ${tab.title}`;
    btn.onclick = () => switchTeoriTab(tab.id);
    tabsContainer.appendChild(btn);

    const panel = document.createElement('div');
    panel.className = 'teori-panel' + (i === 0 ? ' active' : '');
    panel.id = 'teori-panel-' + tab.id;
    panel.style.display = (i === 0) ? 'block' : 'none';
    panel.innerHTML = tab.content;
    panelsContainer.appendChild(panel);
  });

  renderTeoriKomponenGrid();
}

function switchTeoriTab(tabId) {
  const cfg = window.LAB_CONFIG;
  document.querySelectorAll('.teori-subtab-btn').forEach((t, i) => {
    t.classList.toggle('active', cfg.teori.tabs[i].id === tabId);
  });
  document.querySelectorAll('.teori-panel').forEach(p => {
    const isActive = p.id === 'teori-panel-' + tabId;
    p.classList.toggle('active', isActive);
    p.style.display = isActive ? 'block' : 'none';
  });
  sfxClick();
}

function renderTeoriKomponenGrid() {
  const cfg = window.LAB_CONFIG;
  const grid = document.getElementById('teori-komponen-grid');
  if (!grid || !cfg) return;
  
  grid.innerHTML = '';
  cfg.components.forEach((comp, idx) => {
    const item = document.createElement('div');
    item.className = 'komponen-grid-item' + (idx === 0 ? ' selected' : '');
    item.id = 'teori-card-' + comp.id;
    item.innerHTML = `
      <div class="k-icon-wrap" style="border-color:${comp.color};">
        <img src="${comp.svg}" alt="${comp.name}" style="max-width:100%;max-height:100%;object-fit:contain;">
      </div>
      <span class="kname">${comp.name.split(' ')[0]}</span>
      <span class="krole" style="color:${comp.color};background:${comp.color}22;">${comp.role || 'Komponen Inti'}</span>
    `;
    item.onclick = (e) => {
      document.querySelectorAll('.komponen-grid-item').forEach(el => el.classList.remove('selected'));
      item.classList.add('selected');
      showTeoriKomponenDetail(comp);
    };
    grid.appendChild(item);
  });

  // Automatically show the first component's details
  if (cfg.components.length > 0) {
    showTeoriKomponenDetail(cfg.components[0]);
  }
}

function showTeoriKomponenDetail(comp) {
  const panel = document.getElementById('teori-komponen-detail');
  if (!panel) return;
  
  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:1vw;margin-bottom:0.6vw;">
      <div style="width:55px;height:55px;background:var(--card-sub-bg);border:2px solid ${comp.color};border-radius:10px;display:flex;align-items:center;justify-content:center;padding:5px;flex-shrink:0;">
        <img src="${comp.svg}" alt="${comp.name}" style="max-width:100%;max-height:100%;object-fit:contain;">
      </div>
      <div>
        <h4 style="color:${comp.color};font-size:1.1vw;margin-bottom:2px;">${comp.icon} ${comp.name}</h4>
        <span style="font-size:0.7vw;font-family:var(--font-mono);background:rgba(255,255,255,0.1);padding:2px 8px;border-radius:4px;color:var(--tab-active);font-weight:700;">${comp.techSpec || ''}</span>
      </div>
    </div>
    <p style="font-weight:700;margin-bottom:0.3vw;font-size:0.9vw;color:var(--text-heading);">${comp.description}</p>
    <div style="background:rgba(251,174,60,0.12);border-left:3px solid var(--comet-amber);padding:0.4vw 0.8vw;border-radius:4px;margin-bottom:0.4vw;font-size:0.82vw;">
      <strong>💡 Analogi Mudah:</strong> ${comp.analogy}
    </div>
    <p style="font-size:0.82vw;margin-top:0.3vw;color:var(--text-muted);line-height:1.5;">${comp.details}</p>
  `;
}

// ==================== INIT: PROSEDUR ====================
let prosedurInitialized = false;
function initProsedur() {
  if (prosedurInitialized) return;
  prosedurInitialized = true;
  const cfg = window.LAB_CONFIG;
  if (!cfg || !cfg.prosedur) return;

  const list = document.getElementById('prosedur-list');
  if (!list) return;
  list.innerHTML = '';

  cfg.prosedur.forEach(step => {
    const el = document.createElement('div');
    el.className = 'prosedur-step-card';
    el.innerHTML = `
      <div class="prosedur-step-num">${step.step}</div>
      <div style="flex:1;">
        <h4 style="margin-bottom:2px;">${step.icon} Langkah ${step.step}</h4>
        <p style="margin-bottom:0;color:var(--text-muted);">${step.text}</p>
      </div>
    `;
    list.appendChild(el);
  });
}

// ==================== SIMULASI: RAKIT PC (FOKUS UTAMA) ====================
let rakitInitialized = false;

function initRakitPC() {
  if (rakitInitialized) return;
  rakitInitialized = true;
  renderComponentShelf();
  setupDragDrop();
}

function renderComponentShelf() {
  const cfg = window.LAB_CONFIG;
  const shelf = document.getElementById('component-shelf');
  if (!shelf || !cfg) return;

  shelf.innerHTML = '';

  cfg.components.forEach(comp => {
    const isInstalled = !!labState.installed[comp.id];
    const card = document.createElement('div');
    card.className = `shelf-comp-card ${isInstalled ? 'installed' : ''}`;
    card.id = 'comp-' + comp.id;
    card.setAttribute('draggable', isInstalled ? 'false' : 'true');
    card.setAttribute('data-comp-id', comp.id);

    card.innerHTML = `
      <div class="comp-icon-box" title="${comp.name}">
        <img src="${comp.svg}" alt="${comp.name}" draggable="false">
      </div>
      <div class="comp-info-text">
        <div class="comp-title">${comp.name}</div>
        <div class="comp-spec-tag">${comp.techSpec || comp.shortName}</div>
        <span class="comp-status-pill" id="pill-status-${comp.id}">
          ${isInstalled ? '✓ Terpasang' : '✊ Tarik / Pasang'}
        </span>
      </div>
      <button class="comp-help-btn" onclick="event.stopPropagation();showComponentInfo('${comp.id}')" title="Detail Spesifikasi ${comp.name}">?</button>
    `;

    card.addEventListener('click', () => {
      if (labState.installed[comp.id]) return;
      clickToPlace(comp.id);
    });

    shelf.appendChild(card);
  });

  setupDragDrop();
}

// ==================== MISPLACED COMPONENT MODAL LOGIC ====================
let currentMisplacedCompId = null;

function showMisplacedModal(comp, slot, type) {
  currentMisplacedCompId = comp.id;
  const modal = document.getElementById('modal-misplaced-comp');
  if (!modal) return;

  const titleEl = document.getElementById('misplaced-modal-title');
  const subtitleEl = document.getElementById('misplaced-modal-subtitle');
  const imgEl = document.getElementById('misplaced-comp-img');
  const nameEl = document.getElementById('misplaced-comp-name');
  const badgeEl = document.getElementById('misplaced-slot-badge');
  const reasonBox = document.getElementById('misplaced-reason-box');
  const returnBtn = document.getElementById('btn-misplaced-return');

  if (imgEl) imgEl.src = comp.svg || '';
  if (nameEl) nameEl.textContent = comp.name;

  if (type === 'distractor') {
    if (titleEl) titleEl.textContent = '⚠️ Peringatan Komponen Pengecoh (Distractor)';
    if (subtitleEl) subtitleEl.textContent = 'Perangkat Tidak Memiliki Soket di Motherboard Ini';
    if (badgeEl) {
      badgeEl.textContent = '⚠️ Komponen Pengecoh';
      badgeEl.style.background = 'rgba(239, 68, 68, 0.15)';
      badgeEl.style.color = '#ef4444';
      badgeEl.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    }
    if (reasonBox) {
      reasonBox.innerHTML = `
        <p><strong>${comp.name}</strong> adalah komponen tambahan / kartu antarmuka legacy yang <strong>tidak kompatibel</strong> dengan tata letak soket motherboard modern ini.</p>
        <div style="margin-top:0.6vw;background:rgba(239,68,68,0.06);border-left:3px solid #ef4444;padding:8px 12px;border-radius:4px;font-size:0.85vw;line-height:1.5;">
          ${comp.errorMsg || 'Komponen ini sengaja disiapkan sebagai bahan evaluasi nalar kritis. Dalam perakitan komputer standar, kamu hanya memerlukan 5 komponen inti: CPU, RAM, SSD, GPU, dan PSU.'}
        </div>
      `;
    }
    if (returnBtn) {
      returnBtn.textContent = '↩️ Kembalikan ke Rak Komponen';
      returnBtn.onclick = () => {
        returnMisplacedComp();
      };
    }
  } else {
    const slotTitle = slot ? (slot.title || slot.getAttribute('data-accepts') || 'Soket') : 'Soket';
    const cfg = window.LAB_CONFIG;
    const correctSlot = comp.slotId ? document.getElementById(comp.slotId) : null;
    const correctSlotTitle = correctSlot ? (correctSlot.title || comp.slotId) : (comp.slotId || 'Soket yang sesuai');

    if (titleEl) titleEl.textContent = '⚠️ Peringatan Keselamatan Perangkat Keras';
    if (subtitleEl) subtitleEl.textContent = 'Komponen Salah Soket Pemasangan';
    if (badgeEl) {
      badgeEl.textContent = '⚠️ Salah Soket Pemasangan';
      badgeEl.style.background = 'rgba(239, 68, 68, 0.15)';
      badgeEl.style.color = '#ef4444';
      badgeEl.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    }
    if (reasonBox) {
      reasonBox.innerHTML = `
        <p>Kamu mencoba memasang <strong>${comp.name}</strong> ke dalam <strong>${slotTitle}</strong>.</p>
        <div style="margin-top:0.6vw;background:rgba(239,68,68,0.06);border-left:3px solid #ef4444;padding:8px 12px;border-radius:4px;font-size:0.85vw;line-height:1.5;">
          ${comp.errorMsg || `Soket <strong>${slotTitle}</strong> tidak kompatibel secara fisik dan pin elektrikal dengan ${comp.name}. Soket yang benar untuk komponen ini adalah <strong>${correctSlotTitle}</strong>.`}
        </div>
      `;
    }
    if (returnBtn) {
      returnBtn.textContent = '↩️ Lepas & Kembalikan ke Rak';
      returnBtn.onclick = () => {
        returnMisplacedComp();
      };
    }
  }

  showModal('modal-misplaced-comp');
}

function returnMisplacedComp() {
  if (currentMisplacedCompId) {
    removeComponent(currentMisplacedCompId);
  }
  closeModal('modal-misplaced-comp');
}

function clickToPlace(compId) {
  const cfg = window.LAB_CONFIG;
  const comp = cfg.components.find(c => c.id === compId);
  if (!comp || labState.installed[compId]) return;
  
  if (comp.isDistractor) {
    showMisplacedModal(comp, null, 'distractor');
    return;
  }
  
  if (comp.slotId) {
    placeComponent(compId, comp.slotId);
  }
}

function handleSlotClick(slotAccepts) {
  const slotEl = document.querySelector(`.mb-physical-slot[data-accepts="${slotAccepts}"]`);
  const slotId = slotEl ? slotEl.id : 'slot-' + slotAccepts;
  const occupantId = labState.slotOccupant ? labState.slotOccupant[slotId] : null;

  if (occupantId) {
    removeComponent(occupantId);
  } else {
    appendBootLog(`> [INFO] Soket ${slotEl?.title || slotAccepts} masih kosong. Tarik komponen dari rak ke sini.`);
  }
}

function placeComponent(compId, slotId) {
  const cfg = window.LAB_CONFIG;
  const comp = cfg.components.find(c => c.id === compId);
  const slot = document.getElementById(slotId);
  if (!comp || !slot) return;

  // Check if slot is already occupied
  if (labState.slotOccupant && labState.slotOccupant[slotId]) {
    const prevOccupant = labState.slotOccupant[slotId];
    if (prevOccupant === compId) return;
    sfxError();
    appendBootLog(`> ⚠️ [SOKET TERISI] Soket ini sudah terpasang komponen lain! Lepas dulu sebelum memasang baru.`);
    return;
  }

  // If component was installed in another slot, remove it from old slot first
  if (labState.installed[compId] && labState.compSlot && labState.compSlot[compId]) {
    removeComponent(compId);
  }

  const slotAccepts = slot.getAttribute('data-accepts');
  const isMatch = !comp.isDistractor && comp.id === slotAccepts;

  // Register in state
  labState.installed[compId] = true;
  labState.slotOccupant[slotId] = compId;
  labState.compSlot[compId] = slotId;

  // 1. Update slot visual
  slot.classList.add('filled');
  slot.classList.remove('slot-highlight-target', 'slot-dimmed', 'drag-over', 'drag-forbidden');

  // Remove any old misplaced badge
  slot.querySelector('.slot-misplaced-badge')?.remove();

  const targetContainer = slot.querySelector('.slot-installed-component');
  if (targetContainer) {
    targetContainer.innerHTML = `
      <img src="${comp.svg}" alt="${comp.name}" draggable="true" title="${comp.name} — Tarik keluar atau klik untuk melepas">
    `;
    setupSlotInstalledDrag(slot, compId);
  }

  if (isMatch) {
    slot.classList.remove('slot-misplaced');
    sfxSnap();
    appendBootLog(`> [OK] ${comp.name} terpasang sempurna pada ${slot.title || slotAccepts}! ⚡`);
  } else {
    // MISPLACED OR DISTRACTOR COMPONENT
    slot.classList.add('slot-misplaced');
    const badge = document.createElement('div');
    badge.className = 'slot-misplaced-badge';
    badge.textContent = comp.isDistractor ? '⚠️ TAK COCOK' : '⚠️ SALAH SOKET';
    slot.appendChild(badge);

    sfxError();
    appendBootLog(`> ⚠️ [PERINGATAN SOKET] KESALAHAN! ${comp.name} dipasang di ${slot.title || slotAccepts}! Komponen tidak kompatibel.`);
    
    // Safety Alert Modal
    setTimeout(() => {
      showMisplacedModal(comp, slot, comp.isDistractor ? 'distractor' : 'wrong-slot');
    }, 60);
  }

  // 2. Update shelf card
  const card = document.getElementById('comp-' + compId);
  if (card) {
    card.classList.add('installed');
    card.setAttribute('draggable', 'false');
  }
  const pill = document.getElementById('pill-status-' + compId);
  if (pill) {
    pill.textContent = isMatch ? '✓ Terpasang' : '⚠️ Salah Pasang';
    pill.style.background = isMatch ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)';
    pill.style.color = isMatch ? 'var(--accent-emerald)' : '#ef4444';
  }

  updateInstalledCount();
}

function removeComponent(compId) {
  const cfg = window.LAB_CONFIG;
  const comp = cfg.components.find(c => c.id === compId);
  if (!comp) return;

  const slotId = labState.compSlot ? labState.compSlot[compId] : (comp.slotId || null);

  labState.installed[compId] = false;
  if (slotId && labState.slotOccupant) {
    delete labState.slotOccupant[slotId];
  }
  if (labState.compSlot) {
    delete labState.compSlot[compId];
  }

  powerOffBoard();

  // Restore slot
  if (slotId) {
    const slot = document.getElementById(slotId);
    if (slot) {
      slot.classList.remove('filled', 'slot-misplaced', 'snap-bounce');
      slot.querySelector('.slot-misplaced-badge')?.remove();
      const targetContainer = slot.querySelector('.slot-installed-component');
      if (targetContainer) targetContainer.innerHTML = '';
    }
  }

  // Restore shelf card
  const card = document.getElementById('comp-' + compId);
  if (card) {
    card.classList.remove('installed');
    card.setAttribute('draggable', 'true');
  }
  const pill = document.getElementById('pill-status-' + compId);
  if (pill) {
    pill.textContent = '✊ Tarik / Pasang';
    pill.style.background = '';
    pill.style.color = '';
  }

  updateInstalledCount();
  sfxClick();
  appendBootLog(`> [HARDWARE] ${comp.name} dilepas dari motherboard. ↩`);
}

function autoAssemble() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;

  const currentCount = Object.values(labState.installed).filter(v => v).length;
  if (currentCount === 0) {
    showModal('modal-auto-rakit');
    return;
  }
  executeAutoAssemble();
}

function executeAutoAssemble() {
  closeModal('modal-auto-rakit');
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;

  // Remove any wrong or distractor components first
  Object.keys(labState.installed).forEach(id => {
    if (labState.installed[id]) removeComponent(id);
  });

  let delay = 0;
  // Only the 5 legitimate required components
  const required = cfg.components.filter(c => !c.isDistractor);
  required.forEach((comp) => {
    setTimeout(() => {
      placeComponent(comp.id, comp.slotId);
    }, delay);
    delay += 140;
  });

  setTimeout(() => {
    appendBootLog('> [AUTO] Semua 5 komponen inti selesai dirakit! Tekan POWER ON untuk uji boot.');
  }, delay + 50);
}

function updateInstalledCount() {
  const correctCount = ['cpu', 'ram', 'ssd', 'gpu', 'psu'].filter(id => {
    return labState.installed[id] && (
      (id === 'cpu' && labState.slotOccupant['slot-cpu'] === 'cpu') ||
      (id === 'ram' && labState.slotOccupant['slot-ram'] === 'ram') ||
      (id === 'ssd' && labState.slotOccupant['slot-storage'] === 'ssd') ||
      (id === 'gpu' && labState.slotOccupant['slot-gpu'] === 'gpu') ||
      (id === 'psu' && labState.slotOccupant['slot-psu'] === 'psu')
    );
  }).length;

  const totalInstalled = Object.values(labState.installed).filter(v => v).length;
  const el = document.getElementById('installed-count');
  if (el) el.textContent = correctCount;
  
  const pill = document.getElementById('mb-installed-pill');
  if (pill) {
    pill.innerHTML = `TERPASANG: <strong id="installed-count">${correctCount}</strong>/5`;
    if (correctCount === 5 && totalInstalled === 5) {
      pill.style.borderColor = 'var(--accent-emerald)';
      pill.style.color = '#a7f3d0';
    } else {
      pill.style.borderColor = '';
      pill.style.color = '';
    }
  }

  // Update Status Pill
  const powerPill = document.getElementById('mb-power-pill');
  if (powerPill && powerPill.textContent !== 'STATUS: RUNNING' && powerPill.textContent !== 'STATUS: POST TESTING...') {
    const hasError = document.querySelector('.mb-physical-slot.slot-misplaced');
    if (hasError) {
      powerPill.className = 'mb-telemetry-pill status-error';
      powerPill.textContent = 'STATUS: ⚠️ SOKET ERROR';
    } else {
      powerPill.className = 'mb-telemetry-pill';
      powerPill.textContent = 'STATUS: STANDBY';
    }
  }

  // Update Onboarding Hint visibility
  const hint = document.getElementById('rakit-onboarding-hint');
  if (hint) {
    if (totalInstalled === 0) {
      hint.style.display = 'flex';
      hint.style.opacity = '1';
    } else {
      hint.style.opacity = '0';
      setTimeout(() => { 
        const countNow = Object.values(labState.installed).filter(v => v).length;
        if (countNow > 0 && hint) hint.style.display = 'none'; 
      }, 250);
    }
  }
}

function appendBootLog(text) {
  const monitor = document.getElementById('monitor-content');
  if (!monitor) return;
  
  const line = document.createElement('div');
  line.textContent = text;
  line.style.marginTop = '2px';
  monitor.appendChild(line);
  
  const scrollContainer = document.getElementById('boot-monitor');
  if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

// ==================== TACTILE DRAG AND DROP ENGINE ====================
let currentDraggedCompId = null;
let currentDraggedFromSlot = null;

function setupDragDrop() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;

  // 1. Setup Shelf Cards (Drag to motherboard)
  document.querySelectorAll('.shelf-comp-card').forEach(card => {
    const compId = card.getAttribute('data-comp-id');
    const comp = cfg.components.find(c => c.id === compId);
    if (!comp) return;

    // Desktop Drag events
    card.ondragstart = (e) => {
      if (labState.installed[compId]) {
        e.preventDefault();
        return;
      }
      currentDraggedCompId = compId;
      currentDraggedFromSlot = null;
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', compId);
      e.dataTransfer.effectAllowed = 'copy';
      sfxClick();
    };

    card.ondragend = () => {
      card.classList.remove('dragging');
      clearSlotHighlights();
      currentDraggedCompId = null;
    };

    // Touch Drag support for mobile & tablets
    setupCardTouchDrag(card, comp);
  });

  // 2. Setup Motherboard Sockets (Drop target)
  document.querySelectorAll('.mb-physical-slot').forEach(slot => {
    slot.ondragover = (e) => {
      e.preventDefault();
      if (!currentDraggedCompId) return;
      e.dataTransfer.dropEffect = 'copy';
      slot.classList.add('drag-over');
    };

    slot.ondragleave = () => {
      slot.classList.remove('drag-over', 'drag-forbidden');
    };

    slot.ondrop = (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over', 'drag-forbidden');
      const droppedId = e.dataTransfer.getData('text/plain') || currentDraggedCompId;
      clearSlotHighlights();

      if (droppedId) {
        placeComponent(droppedId, slot.id);
        slot.classList.add('snap-bounce');
        setTimeout(() => slot.classList.remove('snap-bounce'), 450);
      }
      currentDraggedCompId = null;
    };

    const accepts = slot.getAttribute('data-accepts');
    setupSlotInstalledDrag(slot, accepts);
  });

  // 3. Setup Shelf / Workspace as Drop Target for Dismantling
  const shelfCol = document.querySelector('.rakit-shelf-col');
  if (shelfCol) {
    shelfCol.ondragover = (e) => {
      if (currentDraggedFromSlot) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        shelfCol.classList.add('shelf-drop-active');
      }
    };
    shelfCol.ondragleave = () => {
      shelfCol.classList.remove('shelf-drop-active');
    };
    shelfCol.ondrop = (e) => {
      e.preventDefault();
      shelfCol.classList.remove('shelf-drop-active');
      const data = e.dataTransfer.getData('text/plain') || '';
      if (data.startsWith('remove:') || currentDraggedFromSlot) {
        const compId = currentDraggedFromSlot || data.replace('remove:', '');
        if (labState.installed[compId]) {
          removeComponent(compId);
          appendBootLog(`> [HARDWARE] Komponen dilepas dan dikembalikan ke rak komponen ↩`);
        }
      }
      currentDraggedFromSlot = null;
      currentDraggedCompId = null;
    };
  }
}

function highlightTargetSlot(targetSlotId) {
  const targetSlot = document.getElementById(targetSlotId);
  if (targetSlot) {
    targetSlot.classList.add('slot-highlight-target');
  }
  document.querySelectorAll('.mb-physical-slot').forEach(s => {
    if (s.id !== targetSlotId && !s.classList.contains('filled')) {
      s.classList.add('slot-dimmed');
    }
  });
}

function clearSlotHighlights() {
  document.querySelectorAll('.mb-physical-slot').forEach(s => {
    s.classList.remove('slot-highlight-target', 'slot-dimmed', 'drag-over', 'drag-forbidden');
  });
  const shelfCol = document.querySelector('.rakit-shelf-col');
  if (shelfCol) shelfCol.classList.remove('shelf-drop-active');
}

function setupSlotInstalledDrag(slot, compId) {
  const container = slot.querySelector('.slot-installed-component');
  if (!container) return;

  container.setAttribute('draggable', 'true');
  container.ondragstart = (e) => {
    if (!labState.installed[compId]) {
      e.preventDefault();
      return;
    }
    currentDraggedFromSlot = compId;
    currentDraggedCompId = null;
    e.dataTransfer.setData('text/plain', 'remove:' + compId);
    e.dataTransfer.effectAllowed = 'move';

    const shelfCol = document.querySelector('.rakit-shelf-col');
    if (shelfCol) shelfCol.classList.add('shelf-drop-active');
    sfxClick();
  };

  container.ondragend = () => {
    const shelfCol = document.querySelector('.rakit-shelf-col');
    if (shelfCol) shelfCol.classList.remove('shelf-drop-active');
    currentDraggedFromSlot = null;
  };
}

// Mobile / Tablet Touch Drag Handler
function setupCardTouchDrag(card, comp) {
  let touchGhost = null;
  let activeTouchSlot = null;

  card.ontouchstart = (e) => {
    if (labState.installed[comp.id]) return;
    const touch = e.touches[0];
    currentDraggedCompId = comp.id;

    highlightTargetSlot(comp.slotId);

    touchGhost = document.createElement('div');
    touchGhost.className = 'touch-drag-ghost';
    touchGhost.innerHTML = `<img src="${comp.svg}" alt="${comp.name}">`;
    touchGhost.style.left = touch.clientX + 'px';
    touchGhost.style.top = touch.clientY + 'px';
    document.body.appendChild(touchGhost);
    sfxClick();
  };

  card.ontouchmove = (e) => {
    if (!touchGhost) return;
    e.preventDefault();
    const touch = e.touches[0];
    touchGhost.style.left = touch.clientX + 'px';
    touchGhost.style.top = touch.clientY + 'px';

    touchGhost.style.display = 'none';
    const elemUnder = document.elementFromPoint(touch.clientX, touch.clientY);
    touchGhost.style.display = 'block';

    const slotUnder = elemUnder ? elemUnder.closest('.mb-physical-slot') : null;
    if (slotUnder) {
      if (activeTouchSlot !== slotUnder) {
        if (activeTouchSlot) activeTouchSlot.classList.remove('drag-over');
        activeTouchSlot = slotUnder;
        activeTouchSlot.classList.add('drag-over');
      }
    } else {
      if (activeTouchSlot) {
        activeTouchSlot.classList.remove('drag-over');
        activeTouchSlot = null;
      }
    }
  };

  card.ontouchend = () => {
    if (touchGhost) {
      touchGhost.remove();
      touchGhost = null;
    }
    if (activeTouchSlot) {
      placeComponent(comp.id, activeTouchSlot.id);
      activeTouchSlot.classList.add('snap-bounce');
      setTimeout(() => activeTouchSlot?.classList.remove('snap-bounce'), 450);
    }
    clearSlotHighlights();
    currentDraggedCompId = null;
    activeTouchSlot = null;
  };
}

function clearPostLeds() {
  ['cpu', 'dram', 'vga', 'boot'].forEach(id => {
    const led = document.getElementById('live-led-' + id);
    if (led) led.className = 'led-dot led-' + id;
  });
}

function setPostLed(id, active) {
  const led = document.getElementById('live-led-' + id);
  if (led) {
    if (active) led.classList.add('active');
    else led.classList.remove('active');
  }
}

function powerOffBoard() {
  const panel = document.querySelector('.motherboard-panel');
  if (panel) panel.classList.remove('powered-on');
  
  const pill = document.getElementById('mb-power-pill');
  if (pill) {
    pill.textContent = 'STATUS: STANDBY';
  }

  const crtLed = document.getElementById('crt-power-led');
  if (crtLed) crtLed.style.background = '#555';

  clearPostLeds();
}

function testBoot() {
  const cfg = window.LAB_CONFIG;
  const monitor = document.getElementById('monitor-content');
  if (!monitor || !cfg) return;

  const installed = labState.installed;
  monitor.innerHTML = '';
  clearPostLeds();
  sfxClick();

  // 1. Check for ANY Misplaced Components or Distractors
  const misplacedErrors = [];
  const expectedSlots = {
    'slot-cpu': 'cpu',
    'slot-ram': 'ram',
    'slot-storage': 'ssd',
    'slot-gpu': 'gpu',
    'slot-psu': 'psu'
  };

  Object.entries(expectedSlots).forEach(([slotId, expectedId]) => {
    const occupant = labState.slotOccupant ? labState.slotOccupant[slotId] : null;
    if (occupant && occupant !== expectedId) {
      const comp = cfg.components.find(c => c.id === occupant);
      const slotEl = document.getElementById(slotId);
      const slotTitle = slotEl?.title || slotId;
      misplacedErrors.push(`- KESALAHAN SOKET: ${comp ? comp.name : occupant} terpasang di ${slotTitle}!`);
    }
  });

  if (labState.installed['ram_ddr2']) {
    misplacedErrors.push('- KOMPONEN TAK KOMPATIBEL: RAM DDR2 terpasang (Motherboard membutuhkan DDR4).');
  }
  if (labState.installed['hdd_ide']) {
    misplacedErrors.push('- KOMPONEN TAK KOMPATIBEL: Harddisk IDE 40-pin terpasang (Motherboard tidak mendukung IDE).');
  }
  if (labState.installed['cooler_fan']) {
    misplacedErrors.push('- KOMPONEN TAK KOMPATIBEL: Cooler Fan 120mm bukan komponen soket motherboard.');
  }

  if (misplacedErrors.length > 0) {
    powerOffBoard();
    const pill = document.getElementById('mb-power-pill');
    if (pill) {
      pill.className = 'mb-telemetry-pill status-error';
      pill.textContent = 'STATUS: 🔴 BOOT FAILED';
    }
    const lines = [
      '========================================',
      '❌ [POST CRITICAL FAILURE] BOOTING GAGAL!',
      '========================================',
      'Terdeteksi kesalahan fatal perangkat keras:',
      ...misplacedErrors,
      '',
      '⚠️ Komputer TIDAK BISA MENYALA demi keselamatan!',
      'Risiko korsleting dan kerusakan pin fisik.',
      '',
      'TINDAKAN PERBAIKAN:',
      '1. Lepas komponen yang salah dari motherboard.',
      '2. Pasang komponen yang benar pada soket yang sesuai.',
      '========================================'
    ];
    typeBootSequence(monitor, lines, 'error-text', () => sfxError());
    return;
  }

  // 2. PSU Check
  if (!installed['psu'] || (labState.slotOccupant && labState.slotOccupant['slot-psu'] !== 'psu')) {
    powerOffBoard();
    const pill = document.getElementById('mb-power-pill');
    if (pill) {
      pill.className = 'mb-telemetry-pill status-error';
      pill.textContent = 'STATUS: NO POWER';
    }
    const lines = [
      '⚡ [POWER SYSTEM FAILURE]',
      '❌ Catu daya (PSU) belum terpasang dengan benar!',
      '',
      'Arus listrik 24-Pin tidak mengalir ke motherboard.',
      'Pasang PSU terlebih dahulu untuk menyalakan komputer.'
    ];
    typeBootSequence(monitor, lines, 'error-text', () => sfxError());
    return;
  }

  // Power ON!
  const panel = document.querySelector('.motherboard-panel');
  if (panel) panel.classList.add('powered-on');

  const pill = document.getElementById('mb-power-pill');
  if (pill) {
    pill.className = 'mb-telemetry-pill';
    pill.textContent = 'STATUS: POST TESTING...';
  }

  const crtLed = document.getElementById('crt-power-led');
  if (crtLed) crtLed.style.background = '#00ff88';

  // Step 1: CPU
  setPostLed('cpu', true);
  setTimeout(() => {
    if (!installed['cpu']) {
      const scenario = cfg.bootScenarios.missingCPU;
      if (pill) {
        pill.className = 'mb-telemetry-pill status-error';
        pill.textContent = 'STATUS: NO CPU';
      }
      typeBootSequence(monitor, scenario.postSequence, 'error-text', () => sfxError());
      return;
    }
    
    // CPU Passed, check DRAM
    setPostLed('cpu', false);
    setPostLed('dram', true);
    
    setTimeout(() => {
      if (!installed['ram']) {
        const scenario = cfg.bootScenarios.missingRAM;
        if (pill) {
          pill.className = 'mb-telemetry-pill status-error';
          pill.textContent = 'STATUS: NO RAM';
        }
        typeBootSequence(monitor, scenario.postSequence, 'error-text', () => {
          sfxBeepPattern('triple-short');
        });
        return;
      }

      // DRAM Passed, check VGA (GPU)
      setPostLed('dram', false);
      setPostLed('vga', true);

      setTimeout(() => {
        if (!installed['gpu']) {
          const scenario = cfg.bootScenarios.missingGPU;
          if (pill) {
            pill.className = 'mb-telemetry-pill status-error';
            pill.textContent = 'STATUS: NO GPU';
          }
          typeBootSequence(monitor, scenario.postSequence, 'warn-text', () => {
            sfxBeepPattern('single-long');
          });
          return;
        }

        // VGA Passed, check Storage (BOOT)
        setPostLed('vga', false);
        setPostLed('boot', true);

        setTimeout(() => {
          if (!installed['ssd']) {
            const scenario = cfg.bootScenarios.missingSSD || cfg.bootScenarios.missingStorage;
            if (pill) {
              pill.className = 'mb-telemetry-pill status-error';
              pill.textContent = 'STATUS: NO STORAGE';
            }
            typeBootSequence(monitor, scenario.postSequence, 'warn-text', () => {
              sfxError();
            });
            return;
          }

          // ALL HARDWARE PASSED!
          setPostLed('boot', false);
          const bootLed = document.getElementById('live-led-boot');
          if (bootLed) bootLed.classList.add('active');

          if (pill) {
            pill.className = 'mb-telemetry-pill status-running';
            pill.textContent = 'STATUS: RUNNING';
          }

          const scenario = cfg.bootScenarios.allInstalled;
          typeBootSequence(monitor, scenario.postSequence, 'ok-text', () => {
            sfxBootChime();
            setTimeout(() => {
              showBootCelebration();
            }, 800);
          });
        }, 300);
      }, 300);
    }, 300);
  }, 350);
}

function typeBootSequence(monitor, lines, cssClass, onComplete) {
  monitor.innerHTML = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i >= lines.length) {
      clearInterval(timer);
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      cursor.textContent = '_';
      monitor.appendChild(cursor);
      if (onComplete) onComplete();
      return;
    }
    const line = lines[i];
    const div = document.createElement('div');
    if (line.includes('OK') || line.includes('passed') || line.includes('Welcome') || line.includes('BERHASIL')) {
      div.style.color = '#00ff88';
    } else if (line.includes('ERROR') || line.includes('FAILED') || line.includes('❌') || line.includes('CRITICAL')) {
      div.style.color = '#ff4444';
    } else if (line.includes('WARNING') || line.includes('⚠') || line.includes('BEEP')) {
      div.style.color = '#f59e0b';
    }
    div.textContent = line;
    monitor.appendChild(div);
    
    const scrollContainer = document.getElementById('boot-monitor');
    if (scrollContainer) scrollContainer.scrollTop = scrollContainer.scrollHeight;
    i++;
  }, 90);
}

function resetBuild() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;
  
  powerOffBoard();

  cfg.components.forEach(c => {
    if (labState.installed[c.id]) {
      removeComponent(c.id);
    }
  });
  labState.installed = {};
  
  const monitor = document.getElementById('monitor-content');
  if (monitor) {
    monitor.innerHTML = '<div>> [RESET] Semua komponen dilepas ke rak.</div><div>> SYSTEM STANDBY — Pasang komponen untuk memulai POST...</div><span class="cursor-blink">_</span>';
  }
  updateInstalledCount();
}

function showComponentInfo(compId) {
  const cfg = window.LAB_CONFIG;
  const comp = cfg.components.find(c => c.id === compId);
  if (!comp) return;

  const thumb = document.getElementById('info-popup-thumb');
  if (thumb) {
    thumb.innerHTML = `<img src="${comp.svg}" alt="${comp.name}" style="max-width:100%;max-height:100%;object-fit:contain;">`;
  }

  document.getElementById('info-popup-title').textContent = `${comp.icon} ${comp.name}`;
  const specEl = document.getElementById('info-popup-spec');
  if (specEl) specEl.textContent = comp.techSpec || comp.shortName;
  document.getElementById('info-popup-desc').textContent = comp.description;
  document.getElementById('info-popup-detail').textContent = comp.details;
  
  const fact = document.getElementById('info-popup-fact');
  if (comp.funFact) {
    fact.style.display = 'block';
    fact.innerHTML = `<strong>💡 Tahukah Kamu?</strong><p>${comp.funFact}</p>`;
  } else {
    fact.style.display = 'none';
  }

  const popup = document.getElementById('info-popup');
  const overlay = document.getElementById('info-popup-overlay');
  if (popup) popup.style.display = 'block';
  if (overlay) overlay.style.display = 'flex';
  sfxClick();
}

function closeInfoPopup() {
  const popup = document.getElementById('info-popup');
  const overlay = document.getElementById('info-popup-overlay');
  if (popup) popup.style.display = 'none';
  if (overlay) overlay.style.display = 'none';
}

// ==================== SIMULASI: SAKELAR BINER ====================
let binaryInitialized = false;

function initBinary() {
  if (binaryInitialized) return;
  binaryInitialized = true;
  renderBinarySwitches();
  renderBinaryChallenges();
  updateBinaryDisplay();
}

function renderBinarySwitches() {
  const container = document.getElementById('binary-switches');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 7; i >= 0; i--) {
    const weight = Math.pow(2, i);
    const col = document.createElement('div');
    col.className = 'binary-bit-col';
    col.id = 'bit-col-' + i;
    col.innerHTML = `
      <div class="bit-weight">2<sup>${i}</sup> = ${weight}</div>
      <div class="bit-bulb" id="bulb-${i}">0</div>
      <div class="bit-index">Bit ${i}</div>
    `;
    col.onclick = () => toggleBit(i);
    container.appendChild(col);
  }
}

function toggleBit(index) {
  labState.bits[index] = labState.bits[index] === 0 ? 1 : 0;
  const bulb = document.getElementById('bulb-' + index);
  if (bulb) {
    bulb.classList.toggle('on', labState.bits[index] === 1);
    bulb.textContent = labState.bits[index];
  }
  sfxToggle();
  updateBinaryDisplay();
}

// Binary Challenge Game State
let isBinaryGameActive = false;
let binaryGameTarget = 0;
let binaryGameScore = 0;
const binaryTargetsList = [13, 27, 42, 65, 77, 100, 105, 170, 204, 255];

function resetBinaryBits() {
  labState.bits = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= 7; i++) {
    const bulb = document.getElementById('bulb-' + i);
    if (bulb) {
      bulb.classList.remove('on');
      bulb.textContent = '0';
    }
  }
  sfxToggle();
  updateBinaryDisplay();
}

function toggleBinaryGameMode() {
  isBinaryGameActive = !isBinaryGameActive;
  const banner = document.getElementById('binary-game-banner');
  const btn = document.getElementById('btn-binary-game');
  
  if (isBinaryGameActive) {
    binaryGameScore = 0;
    if (banner) banner.style.display = 'flex';
    if (btn) {
      btn.textContent = '⏹ Selesaikan Tantangan';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      btn.style.color = '#ffffff';
    }
    nextBinaryTarget();
    sfxClick();
  } else {
    if (banner) banner.style.display = 'none';
    if (btn) {
      btn.textContent = '🎯 Mainkan Tantangan Tebak Biner';
      btn.style.background = '';
      btn.style.color = '';
    }
    resetBinaryBits();
  }
}

function nextBinaryTarget() {
  const available = binaryTargetsList.filter(n => n !== binaryGameTarget);
  binaryGameTarget = available[Math.floor(Math.random() * available.length)];
  
  const targetEl = document.getElementById('binary-game-target');
  const scoreEl = document.getElementById('binary-game-score');
  const feedbackEl = document.getElementById('binary-game-feedback');
  
  if (targetEl) targetEl.textContent = binaryGameTarget;
  if (scoreEl) scoreEl.textContent = binaryGameScore;
  if (feedbackEl) {
    feedbackEl.textContent = `Nyalakan kombinasi sakelar bit agar bernilai total desimal ${binaryGameTarget}!`;
    feedbackEl.style.color = 'var(--text-main)';
  }
  resetBinaryBits();
}

function updateBinaryDisplay() {
  let binStr = '';
  let decVal = 0;
  const parts = [];

  for (let i = 7; i >= 0; i--) {
    const bit = labState.bits[i];
    binStr += bit;
    if (bit === 1) {
      const weight = Math.pow(2, i);
      decVal += weight;
      parts.push(weight);
    }
  }

  const binEl = document.getElementById('bin-value');
  const decEl = document.getElementById('dec-value');
  const formulaEl = document.getElementById('calc-formula');

  if (binEl) binEl.textContent = binStr;
  if (decEl) decEl.textContent = decVal;
  if (formulaEl) {
    formulaEl.textContent = parts.length > 0 ? parts.join(' + ') + ' = ' + decVal : '= 0';
  }

  // Check Game Mode target match
  if (isBinaryGameActive) {
    const feedbackEl = document.getElementById('binary-game-feedback');
    if (decVal === binaryGameTarget) {
      binaryGameScore++;
      const scoreEl = document.getElementById('binary-game-score');
      if (scoreEl) scoreEl.textContent = binaryGameScore;
      
      sfxSuccess();
      if (feedbackEl) {
        feedbackEl.textContent = `🎉 TEPAT SEKALI! Nilai = ${binaryGameTarget}. Hebat!`;
        feedbackEl.style.color = 'var(--accent-emerald)';
      }
      
      if (binaryGameScore >= 3) {
        setTimeout(() => {
          if (feedbackEl) {
            feedbackEl.textContent = '🏆 LUAR BIASA! Kamu menuntaskan 3 tantangan biner berturut-turut!';
          }
          sfxVictoryMelody();
        }, 300);
      } else {
        setTimeout(() => {
          if (isBinaryGameActive) nextBinaryTarget();
        }, 1200);
      }
    }
  }

  checkBinaryChallenges(decVal);
}

function renderBinaryChallenges() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('binary-challenges');
  if (!container || !cfg) return;

  container.innerHTML = '';
  cfg.binaryChallenges.forEach((ch, i) => {
    const card = document.createElement('div');
    card.className = 'challenge-item-card' + (labState.binarySolved[i] ? ' solved' : '');
    card.id = 'bin-challenge-' + i;
    card.innerHTML = `
      <div class="challenge-num">${ch.target}</div>
      <div style="font-size:0.75vw;color:var(--text-muted);">${ch.hint || ch.desc || ''}</div>
      <div style="font-size:0.7vw;font-weight:700;margin-top:2px;" id="bin-status-${i}">
        ${labState.binarySolved[i] ? '✅ Selesai!' : 'Belum'}
      </div>
    `;
    container.appendChild(card);
  });
}

function checkBinaryChallenges(decVal) {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;

  cfg.binaryChallenges.forEach((ch, i) => {
    if (!labState.binarySolved[i] && decVal === ch.target) {
      labState.binarySolved[i] = true;
      const card = document.getElementById('bin-challenge-' + i);
      if (card) card.classList.add('solved');
      const status = document.getElementById('bin-status-' + i);
      if (status) {
        status.textContent = '✅ Selesai! 🎉';
        status.style.color = 'var(--accent-emerald)';
      }
      sfxSuccess();
    }
  });
}

// ==================== SIMULASI: WARNA RGB ====================
let rgbInitialized = false;
const savedPaletteColors = [null, null, null, null, null];

function initRGBMixer() {
  if (rgbInitialized) return;
  rgbInitialized = true;
  renderRGBChallenges();
  initRGBPalette();
  updateRGB();
}

function initRGBPalette() {
  const container = document.getElementById('rgb-palette-slots');
  if (!container) return;
  container.innerHTML = '';
  
  for (let i = 0; i < 5; i++) {
    const slot = document.createElement('div');
    const item = savedPaletteColors[i];
    slot.className = 'palette-slot' + (item ? ' filled' : '');
    slot.id = 'palette-slot-' + i;
    if (item) {
      slot.style.backgroundColor = item.rgb;
      slot.style.color = (item.r * 0.299 + item.g * 0.587 + item.b * 0.114) > 160 ? '#000000' : '#ffffff';
      slot.textContent = item.hex;
      slot.title = `Klik untuk memuat warna ${item.hex}`;
    } else {
      slot.textContent = `+ Slot ${i + 1}`;
      slot.title = 'Slot kosong — klik Simpan Warna untuk mengisi';
    }
    slot.onclick = () => loadPaletteColor(i);
    container.appendChild(slot);
  }
}

function saveCurrentColorToPalette() {
  const r = labState.r;
  const g = labState.g;
  const b = labState.b;
  const hex = document.getElementById('hex-code')?.textContent || '#000000';
  const rgb = `rgb(${r}, ${g}, ${b})`;
  
  let targetIdx = savedPaletteColors.findIndex(c => c === null);
  if (targetIdx === -1) targetIdx = 0; // rotate
  
  savedPaletteColors[targetIdx] = { r, g, b, hex, rgb };
  initRGBPalette();
  sfxSnap();
}

function loadPaletteColor(idx) {
  const item = savedPaletteColors[idx];
  if (!item) return;
  
  const sliderR = document.getElementById('slider-r');
  const sliderG = document.getElementById('slider-g');
  const sliderB = document.getElementById('slider-b');
  
  if (sliderR) sliderR.value = item.r;
  if (sliderG) sliderG.value = item.g;
  if (sliderB) sliderB.value = item.b;
  
  updateRGB();
  sfxSnap();
}

function updateRGB() {
  labState.r = parseInt(document.getElementById('slider-r')?.value || 0);
  labState.g = parseInt(document.getElementById('slider-g')?.value || 0);
  labState.b = parseInt(document.getElementById('slider-b')?.value || 0);

  document.getElementById('val-r').textContent = labState.r;
  document.getElementById('val-g').textContent = labState.g;
  document.getElementById('val-b').textContent = labState.b;

  const hexR = labState.r.toString(16).padStart(2, '0').toUpperCase();
  const hexG = labState.g.toString(16).padStart(2, '0').toUpperCase();
  const hexB = labState.b.toString(16).padStart(2, '0').toUpperCase();
  const hexCode = `#${hexR}${hexG}${hexB}`;
  const rgbCode = `rgb(${labState.r}, ${labState.g}, ${labState.b})`;

  const swatch = document.getElementById('rgb-preview');
  if (swatch) swatch.style.backgroundColor = rgbCode;

  document.getElementById('hex-code').textContent = hexCode;
  document.getElementById('rgb-code').textContent = rgbCode;

  // Subpixels
  const spR = document.getElementById('sp-r');
  const spG = document.getElementById('sp-g');
  const spB = document.getElementById('sp-b');
  if (spR) spR.style.height = (labState.r / 255 * 28 + 2) + 'px';
  if (spG) spG.style.height = (labState.g / 255 * 28 + 2) + 'px';
  if (spB) spB.style.height = (labState.b / 255 * 28 + 2) + 'px';

  checkRGBChallenges();
  sfxSlider();
}

function renderRGBChallenges() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('rgb-challenges');
  if (!container || !cfg) return;

  container.innerHTML = '';
  cfg.rgbChallenges.forEach((ch, i) => {
    const card = document.createElement('div');
    card.className = 'challenge-item-card' + (labState.rgbSolved[i] ? ' solved' : '');
    card.id = 'rgb-challenge-' + i;
    const targetColor = `rgb(${ch.targetR},${ch.targetG},${ch.targetB})`;
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.3vw;justify-content:center;">
        <span style="width:12px;height:12px;border-radius:3px;background:${targetColor};display:inline-block;border:1px solid #999;"></span>
        <strong style="font-size:0.8vw;">${ch.name}</strong>
      </div>
      <div style="font-size:0.68vw;color:var(--text-muted);">${ch.hint}</div>
      <div style="font-size:0.68vw;font-weight:700;margin-top:2px;" id="rgb-status-${i}">
        ${labState.rgbSolved[i] ? '✅ Cocok!' : 'Belum'}
      </div>
    `;
    container.appendChild(card);
  });
}

function checkRGBChallenges() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;

  cfg.rgbChallenges.forEach((ch, i) => {
    const tol = ch.tolerance;
    const match = Math.abs(labState.r - ch.targetR) <= tol &&
                  Math.abs(labState.g - ch.targetG) <= tol &&
                  Math.abs(labState.b - ch.targetB) <= tol;
    
    if (!labState.rgbSolved[i] && match) {
      labState.rgbSolved[i] = true;
      const card = document.getElementById('rgb-challenge-' + i);
      if (card) card.classList.add('solved');
      const status = document.getElementById('rgb-status-' + i);
      if (status) {
        status.textContent = '✅ Cocok! 🎉';
        status.style.color = 'var(--accent-emerald)';
      }
      sfxSuccess();
    }
  });
}

// ==================== LKPD & KUIS EVALUASI ====================
let lkpdInitialized = false;

function initLKPD() {
  if (lkpdInitialized) return;
  lkpdInitialized = true;
  renderPG();
  renderBS();
  renderMatch();
}

function showLkpdSection(secId) {
  document.querySelectorAll('.lkpd-section-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.lkpd-tab-btn').forEach(btn => btn.classList.remove('active'));

  const activeContent = document.getElementById(`lkpd-${secId}`);
  if (activeContent) activeContent.style.display = 'block';

  event.currentTarget.classList.add('active');
  sfxClick();
}

function renderPG() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('lkpd-pg');
  if (!container || !cfg) return;

  container.innerHTML = '<h4 style="margin-bottom:0.6vw;">Pilihan Ganda (5 Soal)</h4>';
  const letters = ['A', 'B', 'C', 'D'];

  cfg.lkpd.bagianA.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'lkpd-question-card';
    let optsHtml = '';
    q.options.forEach((opt, oi) => {
      optsHtml += `
        <label class="lkpd-option-label" id="pg-lbl-${qi}-${oi}" onclick="selectPG(${qi}, ${oi})">
          <input type="radio" name="pg-q-${qi}" value="${oi}">
          <span><strong>${letters[oi]}.</strong> ${opt}</span>
        </label>
      `;
    });

    card.innerHTML = `
      <div style="font-weight:700;font-size:0.95vw;margin-bottom:0.4vw;">${qi + 1}. ${q.question}</div>
      <div class="lkpd-options-list">${optsHtml}</div>
      <div id="pg-exp-${qi}" style="display:none;margin-top:0.4vw;font-size:0.8vw;padding:4px 8px;border-radius:4px;"></div>
    `;
    container.appendChild(card);
  });
}

function updateLkpdProgress() {
  const countA = Object.keys(labState.pgAnswers).length;
  const countB = Object.keys(labState.bsAnswers).length;
  const countC = Object.keys(labState.matchPairs).length;
  const total = countA + countB + countC;
  const el = document.getElementById('lkpd-answered-count');
  if (el) el.textContent = total;
}

function selectPG(qi, oi) {
  if (labState.lkpdSubmitted) return;
  labState.pgAnswers[qi] = oi;
  // Mark UI selected
  document.querySelectorAll(`[id^="pg-lbl-${qi}-"]`).forEach(lbl => lbl.classList.remove('selected'));
  document.getElementById(`pg-lbl-${qi}-${oi}`)?.classList.add('selected');
  updateLkpdProgress();
  sfxClick();
}

function renderBS() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('lkpd-bs');
  if (!container || !cfg) return;

  container.innerHTML = '<h4 style="margin-bottom:0.8vw;">Bagian B: Benar atau Salah (5 Soal)</h4>';

  cfg.lkpd.bagianB.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'lkpd-question-card lkpd-bs-card';
    card.innerHTML = `
      <div class="lkpd-bs-row">
        <div class="lkpd-bs-statement">${qi + 1}. ${q.statement}</div>
        <div class="lkpd-bs-actions">
          <button type="button" class="btn-bs-choice btn-bs-true" id="bs-btn-${qi}-true" onclick="selectBS(${qi}, true)">
            <span>✅</span> Benar
          </button>
          <button type="button" class="btn-bs-choice btn-bs-false" id="bs-btn-${qi}-false" onclick="selectBS(${qi}, false)">
            <span>❌</span> Salah
          </button>
        </div>
      </div>
      <div id="bs-exp-${qi}" class="lkpd-bs-exp" style="display:none;margin-top:0.5vw;font-size:0.82vw;padding:6px 10px;border-radius:6px;line-height:1.4;"></div>
    `;
    container.appendChild(card);
  });
}

function selectBS(qi, val) {
  if (labState.lkpdSubmitted) return;
  labState.bsAnswers[qi] = val;
  const btnTrue = document.getElementById(`bs-btn-${qi}-true`);
  const btnFalse = document.getElementById(`bs-btn-${qi}-false`);
  if (val === true) {
    btnTrue?.classList.add('selected');
    btnFalse?.classList.remove('selected');
  } else {
    btnFalse?.classList.add('selected');
    btnTrue?.classList.remove('selected');
  }
  updateLkpdProgress();
  sfxClick();
}

let matchLeftItems = [];
let matchRightItems = [];

function renderMatch() {
  const cfg = window.LAB_CONFIG;
  const leftCol = document.getElementById('match-left');
  const rightCol = document.getElementById('match-right');
  const svg = document.getElementById('match-svg-layer');
  if (!leftCol || !rightCol || !cfg) return;

  leftCol.innerHTML = '';
  rightCol.innerHTML = '';
  if (svg) svg.innerHTML = '';

  matchLeftItems = cfg.lkpd.bagianC.map((item, idx) => {
    const compData = cfg.components ? cfg.components.find(c => c.shortName === item.left || c.id === item.left.toLowerCase()) : null;
    return {
      id: 'l' + idx,
      key: item.left,
      label: item.left,
      icon: compData?.icon || '⚙️',
      role: compData?.role || 'Komponen Inti',
      color: item.color || '#00D4FF'
    };
  });

  // Shuffle right items consistently
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const shuffled = [...cfg.lkpd.bagianC].sort((a, b) => (b.right.length - a.right.length) || (a.left.charCodeAt(0) - b.left.charCodeAt(0)));
  matchRightItems = shuffled.map((item, idx) => ({
    id: 'r' + idx,
    originalKey: item.left,
    letter: letters[idx] || String.fromCharCode(65 + idx),
    label: item.right
  }));

  matchLeftItems.forEach((item, idx) => {
    const btn = document.createElement('button');
    btn.className = 'match-interactive-btn match-left-btn';
    btn.id = `match-btn-${item.id}`;
    btn.innerHTML = `
      <div class="match-left-content">
        <span class="match-badge match-badge-num">${idx + 1}</span>
        <span style="font-size:1.3vw;line-height:1;margin-right:2px;">${item.icon}</span>
        <div style="display:flex;flex-direction:column;line-height:1.2;">
          <span class="match-btn-text" style="font-weight:800;font-size:0.95vw;color:var(--text-heading);">${item.label}</span>
          <span style="font-size:0.72vw;color:var(--text-muted);font-weight:500;">${item.role}</span>
        </div>
      </div>
      <span class="match-port-dot" id="dot-${item.id}" title="Hubungkan kabel ke fungsi yang cocok"></span>
    `;
    btn.onclick = () => handleMatchLeftClick(item.key, item.id);
    leftCol.appendChild(btn);
  });

  matchRightItems.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'match-interactive-btn match-right-btn';
    btn.id = `match-btn-${item.id}`;
    btn.innerHTML = `
      <span class="match-port-dot" id="dot-${item.id}" title="Hubungkan kabel dari komponen"></span>
      <div class="match-right-content">
        <span class="match-badge match-badge-letter">${item.letter}</span>
        <span class="match-btn-text" style="font-size:0.84vw;line-height:1.45;color:var(--text-main);">${item.label}</span>
      </div>
    `;
    btn.onclick = () => handleMatchRightClick(item.originalKey, item.id);
    rightCol.appendChild(btn);
  });

  setTimeout(drawMatchLines, 80);
}

function resetMatchCables() {
  if (labState.lkpdSubmitted) return;
  labState.matchPairs = {};
  labState.matchSelected = null;
  drawMatchLines();
  updateLkpdProgress();
  sfxClick();
}

function handleMatchLeftClick(key, elId) {
  if (labState.lkpdSubmitted) return;

  // If this item is already paired, clicking it unpairs/disconnects it!
  if (labState.matchPairs[key]) {
    delete labState.matchPairs[key];
    drawMatchLines();
    updateLkpdProgress();
    sfxClick();
    return;
  }

  // If already selected, deselect
  if (labState.matchSelected && labState.matchSelected.key === key) {
    labState.matchSelected = null;
  } else {
    labState.matchSelected = { key, elId };
  }

  drawMatchLines();
  sfxClick();
}

function handleMatchRightClick(originalKey, elId) {
  if (labState.lkpdSubmitted) return;

  // If this right item is already connected to any left item, clicking it unpairs that connection!
  const connectedLeftKey = Object.keys(labState.matchPairs).find(k => labState.matchPairs[k].rightElId === elId);
  if (connectedLeftKey) {
    delete labState.matchPairs[connectedLeftKey];
    drawMatchLines();
    updateLkpdProgress();
    sfxClick();
    return;
  }

  // If a left item is selected, create connection rope!
  if (labState.matchSelected) {
    const leftKey = labState.matchSelected.key;
    const leftElId = labState.matchSelected.elId;

    labState.matchPairs[leftKey] = {
      rightKey: originalKey,
      leftElId: leftElId,
      rightElId: elId
    };

    labState.matchSelected = null;
    drawMatchLines();
    updateLkpdProgress();
    sfxSnap();
  }
}

function drawMatchLines() {
  const wrapper = document.getElementById('match-interactive-wrapper');
  const svg = document.getElementById('match-svg-layer');
  if (!wrapper || !svg) return;

  svg.innerHTML = '';
  const wrapperRect = wrapper.getBoundingClientRect();
  if (wrapperRect.width === 0 || wrapperRect.height === 0) return;

  // Reset button visual classes and dots
  document.querySelectorAll('.match-interactive-btn').forEach(btn => {
    btn.classList.remove('selected', 'matched');
    btn.style.borderColor = '';
  });
  document.querySelectorAll('.match-port-dot').forEach(dot => {
    dot.style.background = '';
    dot.style.boxShadow = '';
  });

  if (labState.matchSelected) {
    const selBtn = document.getElementById(`match-btn-${labState.matchSelected.elId}`);
    if (selBtn) selBtn.classList.add('selected');
  }

  Object.entries(labState.matchPairs).forEach(([leftKey, pair]) => {
    const leftBtn = document.getElementById(`match-btn-${pair.leftElId}`);
    const rightBtn = document.getElementById(`match-btn-${pair.rightElId}`);
    const leftDot = document.getElementById(`dot-${pair.leftElId}`);
    const rightDot = document.getElementById(`dot-${pair.rightElId}`);
    if (!leftDot || !rightDot) return;

    if (leftBtn) leftBtn.classList.add('matched');
    if (rightBtn) rightBtn.classList.add('matched');

    const leftDotRect = leftDot.getBoundingClientRect();
    const rightDotRect = rightDot.getBoundingClientRect();

    const x1 = leftDotRect.left + leftDotRect.width / 2 - wrapperRect.left;
    const y1 = leftDotRect.top + leftDotRect.height / 2 - wrapperRect.top;
    const x2 = rightDotRect.left + rightDotRect.width / 2 - wrapperRect.left;
    const y2 = rightDotRect.top + rightDotRect.height / 2 - wrapperRect.top;

    const itemConfig = window.LAB_CONFIG.lkpd.bagianC.find(c => c.left === leftKey);
    let color = itemConfig ? itemConfig.color : '#00D4FF';

    if (labState.lkpdSubmitted) {
      const isCorrect = pair.rightKey === leftKey;
      color = isCorrect ? '#10b981' : '#ef4444';
    }

    if (leftBtn) leftBtn.style.borderColor = color;
    if (rightBtn) rightBtn.style.borderColor = color;
    if (leftDot) {
      leftDot.style.background = color;
      leftDot.style.boxShadow = `0 0 10px ${color}`;
    }
    if (rightDot) {
      rightDot.style.background = color;
      rightDot.style.boxShadow = `0 0 10px ${color}`;
    }

    const midX = (x1 + x2) / 2;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1},${y1} C ${midX},${y1} ${midX},${y2} ${x2},${y2}`);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', labState.lkpdSubmitted ? '4.5' : '3.5');
    path.setAttribute('fill', 'none');
    path.classList.add('match-cable-line');
    svg.appendChild(path);

    const c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c1.setAttribute('cx', x1);
    c1.setAttribute('cy', y1);
    c1.setAttribute('r', '6');
    c1.setAttribute('fill', color);
    svg.appendChild(c1);

    const c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c2.setAttribute('cx', x2);
    c2.setAttribute('cy', y2);
    c2.setAttribute('r', '6');
    c2.setAttribute('fill', color);
    svg.appendChild(c2);
  });
}
window.addEventListener('resize', drawMatchLines);

function submitLKPD() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;
  labState.lkpdSubmitted = true;

  let scoreA = 0;
  cfg.lkpd.bagianA.forEach((q, i) => {
    const ans = labState.pgAnswers[i];
    const isCorrect = ans === q.correct;
    if (isCorrect) scoreA++;
    const exp = document.getElementById('pg-exp-' + i);
    if (exp) {
      exp.style.display = 'block';
      exp.style.background = isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
      exp.style.color = isCorrect ? 'var(--accent-emerald)' : '#ef4444';
      exp.textContent = (isCorrect ? '✅ Benar! ' : '❌ Salah. ') + q.explanation;
    }
  });

  let scoreB = 0;
  cfg.lkpd.bagianB.forEach((q, i) => {
    const ans = labState.bsAnswers[i];
    const isCorrect = ans === q.correct;
    if (isCorrect) scoreB++;
    const exp = document.getElementById('bs-exp-' + i);
    if (exp) {
      exp.style.display = 'block';
      exp.style.background = isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
      exp.style.color = isCorrect ? 'var(--accent-emerald)' : '#ef4444';
      exp.textContent = (isCorrect ? '✅ Benar! ' : '❌ Salah. ') + q.explanation;
    }
    const btnTrue = document.getElementById(`bs-btn-${i}-true`);
    const btnFalse = document.getElementById(`bs-btn-${i}-false`);
    if (btnTrue && btnFalse) {
      btnTrue.disabled = true;
      btnFalse.disabled = true;
      if (q.correct === true) {
        btnTrue.classList.add('bs-correct-key');
      } else {
        btnFalse.classList.add('bs-correct-key');
      }
    }
  });

  let scoreC = 0;
  cfg.lkpd.bagianC.forEach((item) => {
    const pair = labState.matchPairs[item.left];
    if (pair && pair.rightKey === item.left) scoreC++;
  });

  const total = scoreA + scoreB + scoreC;
  const percent = Math.round((total / 15) * 100);

  let predikat = '';
  let stars = '⭐';
  if (percent >= 85) {
    predikat = '🏆 Ahli Teknisi Komputer Cilik (Sangat Menguasai)';
    stars = '⭐⭐⭐';
  } else if (percent >= 70) {
    predikat = '⭐ Teknisi Berbakat (Pemahaman Sangat Baik)';
    stars = '⭐⭐';
  } else if (percent >= 50) {
    predikat = '💪 Calon Teknisi Hebat (Cukup Baik)';
    stars = '⭐';
  } else {
    predikat = '📖 Perlu Eksplorasi & Membaca Teori Lagi';
    stars = '📚';
  }

  const resBox = document.getElementById('lkpd-result-box');
  if (resBox) {
    resBox.style.display = 'block';
    const starsEl = document.getElementById('lkpd-stars');
    if (starsEl) starsEl.textContent = stars;
    document.getElementById('hasil-score').textContent = percent + '%';
    document.getElementById('hasil-predikat').textContent = predikat;
    document.getElementById('hasil-detail').textContent = `Rincian: Pilihan Ganda (${scoreA}/5) · Benar/Salah (${scoreB}/5) · Menjodohkan (${scoreC}/5)`;
    resBox.scrollIntoView({ behavior: 'smooth' });
  }

  drawMatchLines();

  if (percent >= 85) {
    sfxVictoryMelody();
    launchConfetti();
  } else if (percent >= 70) {
    sfxSuccess();
  } else {
    sfxError();
  }
}

function resetLKPD() {
  labState.pgAnswers = {};
  labState.bsAnswers = {};
  labState.matchPairs = {};
  labState.matchSelected = null;
  labState.lkpdSubmitted = false;

  const resBox = document.getElementById('lkpd-result-box');
  if (resBox) resBox.style.display = 'none';

  renderPG();
  renderBS();
  renderMatch();
  updateLkpdProgress();
  sfxClick();
}

// ==================== INIT: REFERENSI ====================
let refInitialized = false;
function initReferensi() {
  if (refInitialized) return;
  refInitialized = true;
}

// ==================== EKSPLORASI DIGITAL: SUB-TAB NAVIGATION ====================
function switchEksplorasiSubTab(subTabId) {
  // Update sub-tab buttons
  document.querySelectorAll('.eksplorasi-subtab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById('expl-tab-' + subTabId);
  if (activeBtn) activeBtn.classList.add('active');

  // Update sub-content panels
  document.querySelectorAll('.eksplorasi-sub-content').forEach(panel => {
    panel.classList.remove('active');
  });
  const activePanel = document.getElementById('expl-content-' + subTabId);
  if (activePanel) activePanel.classList.add('active');

  // Lazy init
  if (subTabId === 'binary') initBinary();
  if (subTabId === 'rgb') initRGBMixer();
  if (subTabId === 'logic') initLogicGate();

  sfxClick();
}

// ==================== SIMULASI: GERBANG LOGIKA ====================
let logicGateInitialized = false;
let currentGateType = 'AND';
let logicInputA = 0;
let logicInputB = 0;

function initLogicGate() {
  if (logicGateInitialized) return;
  logicGateInitialized = true;
  updateLogicGate();
}

function switchGateType(type) {
  currentGateType = type;
  document.querySelectorAll('.gate-type-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('gate-btn-' + type);
  if (activeBtn) activeBtn.classList.add('active');

  // Show/hide Input B for NOT gate
  const inputBWrap = document.getElementById('logic-input-b-wrap');
  if (inputBWrap) {
    inputBWrap.style.display = (type === 'NOT') ? 'none' : 'block';
  }

  updateLogicGate();
  sfxClick();
}

function toggleLogicInput(which) {
  if (which === 'A') {
    logicInputA = logicInputA === 0 ? 1 : 0;
    const btn = document.getElementById('logic-input-a');
    if (btn) {
      btn.textContent = logicInputA;
      btn.classList.toggle('on', logicInputA === 1);
    }
  } else {
    logicInputB = logicInputB === 0 ? 1 : 0;
    const btn = document.getElementById('logic-input-b');
    if (btn) {
      btn.textContent = logicInputB;
      btn.classList.toggle('on', logicInputB === 1);
    }
  }
  sfxToggle();
  updateLogicGate();
}

function updateLogicGate() {
  let output = 0;
  const a = logicInputA;
  const b = logicInputB;

  switch (currentGateType) {
    case 'AND': output = a & b; break;
    case 'OR': output = a | b; break;
    case 'NOT': output = a === 0 ? 1 : 0; break;
  }

  // Update gate symbol
  const symbol = document.getElementById('logic-gate-symbol');
  if (symbol) symbol.textContent = currentGateType;

  // Update output bulb
  const outputBulb = document.getElementById('logic-output');
  if (outputBulb) {
    outputBulb.textContent = output;
    outputBulb.classList.toggle('on', output === 1);
  }

  // Update explanation
  const explanations = {
    'AND': `<strong>AND (DAN):</strong> Output bernilai <strong>1</strong> hanya jika <em>kedua</em> input bernilai 1. Jika salah satu input 0, output pasti 0.<br>Analogi: Lampu menyala hanya jika saklar A <em>dan</em> saklar B keduanya dinyalakan.`,
    'OR': `<strong>OR (ATAU):</strong> Output bernilai <strong>1</strong> jika <em>salah satu atau kedua</em> input bernilai 1. Output 0 hanya jika semua input 0.<br>Analogi: Bel berbunyi jika tombol depan <em>atau</em> tombol belakang ditekan.`,
    'NOT': `<strong>NOT (BUKAN):</strong> Membalikkan nilai input. Jika input 0, output menjadi 1. Jika input 1, output menjadi 0.<br>Analogi: Sakelar pembalik — posisi ON menjadi OFF dan sebaliknya.`,
  };
  const expEl = document.getElementById('logic-explanation');
  if (expEl) expEl.innerHTML = explanations[currentGateType] || '';

  // Update truth table
  renderTruthTable();
}

function renderTruthTable() {
  const table = document.getElementById('logic-truth-table');
  if (!table) return;

  const a = logicInputA;
  const b = logicInputB;

  if (currentGateType === 'NOT') {
    let html = '<thead><tr><th>Input A</th><th>Output (NOT A)</th></tr></thead><tbody>';
    for (let i = 0; i <= 1; i++) {
      const out = i === 0 ? 1 : 0;
      const isActive = i === a;
      html += `<tr class="${isActive ? 'active-row' : ''}"><td>${i}</td><td>${out}</td></tr>`;
    }
    html += '</tbody>';
    table.innerHTML = html;
  } else {
    let html = `<thead><tr><th>A</th><th>B</th><th>Output (${currentGateType})</th></tr></thead><tbody>`;
    for (let i = 0; i <= 1; i++) {
      for (let j = 0; j <= 1; j++) {
        let out;
        if (currentGateType === 'AND') out = i & j;
        else out = i | j;
        const isActive = (i === a && j === b);
        html += `<tr class="${isActive ? 'active-row' : ''}"><td>${i}</td><td>${j}</td><td>${out}</td></tr>`;
      }
    }
    html += '</tbody>';
    table.innerHTML = html;
  }
}

// ==================== PRINT LKPD ====================
function printLKPD() {
  // Pastikan semua section LKPD visible sebelum cetak
  const sections = ['lkpd-pg', 'lkpd-bs', 'lkpd-match'];
  const origDisplays = {};
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      origDisplays[id] = el.style.display;
      el.style.display = 'block';
    }
  });

  // Beri waktu browser render, lalu print
  setTimeout(() => {
    window.print();
    // Kembalikan state asal setelah print dialog tutup
    setTimeout(() => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && origDisplays[id] !== undefined) {
          el.style.display = origDisplays[id];
        }
      });
    }, 500);
  }, 150);
}

// ==================== PENGEMBANG: SWITCH DEV QUOTE OPTIONS ====================
function switchDevQuote(opt) {
  const textEl = document.getElementById('dev-desc-text');
  if (!textEl) return;
  
  const quotes = {
    1: 'Media <strong>Lab Maya Perakitan Komputer</strong> hadir sebagai jembatan belajar interaktif bagi peserta didik SMP Fase D dalam memahami arsitektur komputer secara visual dan aplikatif. Melalui pengalaman <em>hands-on</em> merakit komponen motherboard ATX, bereksperimen dengan bilangan biner, logika gerbang digital, dan spektrum warna RGB, siswa diajak mengeksplorasi abstraksi komputasional secara nyata, menyenangkan, dan berorientasi pada penguatan nalar kritis.',
    2: 'Laboratorium virtual ini dikembangkan untuk menghadirkan pengalaman merakit perangkat keras dan menguji sistem komputer (<em>POST diagnostic</em>) tanpa keterbatasan fasilitas fisik laboratorium sekolah. Dirancang khusus agar peserta didik SMP Fase D dapat bereksperimen secara mandiri, berani mencoba (<em>trial and error</em>), serta menghubungkan perangkat keras dengan representasi data digital secara komprehensif.',
    3: 'Memadukan ketelitian logika perangkat keras (<em>hardware</em>) dan dinamika representasi data digital (<em>software</em>), <strong>Lab Maya Informatika</strong> mengajak generasi muda menyelami fondasi sistem komputasi modern. Media ini dirancang untuk menumbuhkan rasa ingin tahu, daya analisis kritis, serta penguasaan keterampilan berpikir komputasional menuju generasi Indonesia Emas 2045.'
  };

  if (quotes[opt]) {
    textEl.innerHTML = quotes[opt];
    document.querySelectorAll('.dev-opt-btn').forEach((btn, idx) => {
      btn.classList.toggle('active', idx + 1 === opt);
    });
    sfxClick();
  }
}

// ==================== INITIALIZATION ON LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
  initWelcomeParticles();
  initTeori();
  initRakitPC();
});
