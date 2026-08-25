/**
 * ============================================================
 * MPI BERPIKIR KOMPUTASIONAL: ALGORITMA DI BALIK RUMAH CERDAS (IoT)
 * Single Page Application (SPA) Logic & Engine
 * SMP Negeri 2 Lamongan — Informatika Kelas IX Fase D
 * ============================================================
 */

// ==================== GLOBAL APP STATE ====================
let currentPage = 'cover';

const PAGE_INDEX_MAP = {
  'cover': 1,
  'menu': 2,
  'petunjuk': 3,
  'tujuan': 4,
  'materi-list': 5,
  'materi-1': 6,
  'video': 7,
  'tarik-jawaban': 8,
  'permainan-intro': 9,
  'permainan': 10,
  'latihan-intro': 11,
  'latihan': 12,
  'rangkuman': 13,
  'referensi': 14,
  'pengembang': 15,
  'pj-penyunting': 16,
  'kutipan': 17,
  'kredit': 18
};

const LINEAR_PAGES = [
  'cover', 'menu', 'petunjuk', 'tujuan', 'materi-list',
  'materi-1', 'video', 'tarik-jawaban',
  'permainan-intro', 'permainan',
  'latihan-intro', 'latihan',
  'rangkuman', 'referensi', 'pengembang', 'pj-penyunting', 'kutipan', 'kredit'
];

// ==================== CONFIG LOADER ====================
function applyConfig() {
  const cfg = window.MPI_CONFIG;
  if (!cfg) return;

  // Background
  const bgEl = document.getElementById('classroom-bg');
  if (bgEl && cfg.background) {
    if (cfg.background.image) {
      bgEl.style.backgroundImage = `url("${cfg.background.image}")`;
      bgEl.style.backgroundSize = cfg.background.size || 'cover';
      bgEl.style.backgroundPosition = cfg.background.position || 'center center';
    }
  }

  // Logos
  if (cfg.logos) {
    const lKem = document.getElementById('logo-kemendikdasmen-cover');
    if (lKem && cfg.logos.header_left) lKem.src = cfg.logos.header_left;
    const lSob = document.getElementById('logo-sobat-cover');
    if (lSob && cfg.logos.header_right) lSob.src = cfg.logos.header_right;
  }
}

function updateTestingIndicator(pageId) {
  const cfg = window.MPI_CONFIG;
  let indicator = document.getElementById('testing-page-indicator');

  if (!cfg || cfg.is_testing !== 1) {
    if (indicator) indicator.remove();
    return;
  }

  const pageNum = PAGE_INDEX_MAP[pageId] || 1;
  const totalPages = Object.keys(PAGE_INDEX_MAP).length;

  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'testing-page-indicator';
    indicator.className = 'testing-page-indicator';
    document.body.appendChild(indicator);
  }

  indicator.innerHTML = `Halaman ${pageNum} / ${totalPages}`;
}

// ==================== NAVIGATION ENGINE ====================
function goToPage(pageId) {
  const oldPage = document.querySelector('.page.active');
  const newPage = document.getElementById('page-' + pageId);
  if (!newPage) return;

  if (oldPage && oldPage.id !== 'page-' + pageId) {
    oldPage.classList.remove('active');
  }
  newPage.classList.add('active');
  currentPage = pageId;

  updateTestingIndicator(pageId);

  // Reset scroll to top
  const scrollables = newPage.querySelectorAll('.scrollable');
  scrollables.forEach(el => el.scrollTop = 0);

  // Lazy initialize interactive modules on page entry
  if (pageId === 'materi-1') switchMateri1Tab(1);
  if (pageId === 'tarik-jawaban') initDragDrop();
  if (pageId === 'video') initVideo();
  if (pageId === 'permainan') initSmartHomeGame();
  if (pageId === 'latihan') {
    const activeSec = document.querySelector('.eval-section.active');
    if (!activeSec || activeSec.id === 'eval-section-recap') {
      startEval();
    }
  }
}

function navNext() {
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx >= 0 && idx < LINEAR_PAGES.length - 1) {
    goToPage(LINEAR_PAGES[idx + 1]);
  }
}

function navPrev() {
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx > 0) {
    goToPage(LINEAR_PAGES[idx - 1]);
  }
}

// ==================== MATERI 1 TABBED NAVIGATION ====================
function switchMateri1Tab(tabNum) {
  for (let i = 1; i <= 4; i++) {
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

// ==================== VIDEO MODULE ====================
function initVideo() {
  const v = document.getElementById('main-video');
  if (v) {
    v.currentTime = 0;
  }
}

// ==================== WEB AUDIO SYNTHESIZER (100% OFFLINE) ====================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
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
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success' || type === 'device_on') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'device_off') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'alarm') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(440, now + 0.1);
      osc.frequency.setValueAtTime(880, now + 0.2);
      osc.frequency.setValueAtTime(440, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.setValueAtTime(140, now + 0.12);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'victory') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + i * 0.1);
        g.gain.setValueAtTime(0.25, now + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.28);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now + i * 0.1);
        o.stop(now + i * 0.1 + 0.28);
      });
    }
  } catch (err) {
    // Audio context fallback gracefully
  }
}

// ==================== AKTIVITAS TARIK JAWABAN (PAGE 8) ====================
const DRAG_ITEMS_DATA = [
  { id: 'item-1', text: 'Dekomposisi', matchId: 'zone-1' },
  { id: 'item-2', text: 'Abstraksi', matchId: 'zone-2' },
  { id: 'item-3', text: 'Pengenalan Pola', matchId: 'zone-3' },
  { id: 'item-4', text: 'Algoritma', matchId: 'zone-4' },
  { id: 'item-5', text: 'Sensor (Input)', matchId: 'zone-5' },
  { id: 'item-6', text: 'Aktuator (Output)', matchId: 'zone-6' }
];

const DROP_ZONES_DATA = [
  { id: 'zone-1', text: 'Memecah sistem rumah cerdas menjadi Sensor, Mikrokontroler, dan Aktuator' },
  { id: 'zone-2', text: 'Fokus pada data kondisi esensial (gelap/terang) & abaikan detail non-relevan' },
  { id: 'zone-3', text: 'Mengenali siklus berulang (siang-malam) untuk memicu jadwal otomatis' },
  { id: 'zone-4', text: 'Urutan langkah logis & aturan kondisional (IF-THEN) untuk mengambil keputusan' },
  { id: 'zone-5', text: 'Perangkat pendeteksi kondisi fisik lingkungan (cahaya, suhu, gerakan)' },
  { id: 'zone-6', text: 'Perangkat pelaksana tindakan fisik (lampu menyala, kipas berputar, sirine)' }
];

let currentDragEl = null;
let currentTouchClone = null;

function initDragDrop() {
  const dragContainer = document.getElementById('drag-items');
  const dropContainer = document.getElementById('drop-zones');
  if (!dragContainer || !dropContainer) return;

  dragContainer.innerHTML = '';
  dropContainer.innerHTML = '';

  const shuffledItems = [...DRAG_ITEMS_DATA].sort(() => Math.random() - 0.5);

  shuffledItems.forEach(item => {
    const el = document.createElement('div');
    el.className = 'drag-card';
    el.id = item.id;
    el.draggable = true;
    el.dataset.matchId = item.matchId;
    el.textContent = item.text;

    el.addEventListener('dragstart', onCardDragStart);
    el.addEventListener('dragend', onCardDragEnd);
    el.addEventListener('touchstart', onCardTouchStart, { passive: false });
    el.addEventListener('touchmove', onCardTouchMove, { passive: false });
    el.addEventListener('touchend', onCardTouchEnd);

    dragContainer.appendChild(el);
  });

  DROP_ZONES_DATA.forEach(zone => {
    const zEl = document.createElement('div');
    zEl.className = 'drop-slot';
    zEl.id = zone.id;
    zEl.innerHTML = `<div class="slot-text">${zone.text}</div><div class="slot-target">Tarik Istilah ke Sini</div>`;

    zEl.addEventListener('dragover', (e) => e.preventDefault());
    zEl.addEventListener('dragenter', (e) => {
      e.preventDefault();
      zEl.classList.add('over');
    });
    zEl.addEventListener('dragleave', () => zEl.classList.remove('over'));
    zEl.addEventListener('drop', (e) => {
      e.preventDefault();
      zEl.classList.remove('over');
      if (currentDragEl) {
        dropCardToSlot(currentDragEl, zEl);
      }
    });

    dropContainer.appendChild(zEl);
  });

  const scoreBadge = document.getElementById('tj-score-badge');
  if (scoreBadge) scoreBadge.textContent = 'Skor: 0 / 6';
}

function onCardDragStart(e) {
  currentDragEl = e.currentTarget;
  e.currentTarget.classList.add('dragging');
  playSynthSound('click');
}

function onCardDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  currentDragEl = null;
}

function onCardTouchStart(e) {
  currentDragEl = e.currentTarget;
  e.preventDefault();
  currentTouchClone = currentDragEl.cloneNode(true);
  currentTouchClone.style.position = 'fixed';
  currentTouchClone.style.zIndex = '1000';
  currentTouchClone.style.opacity = '0.85';
  currentTouchClone.style.pointerEvents = 'none';
  currentTouchClone.style.width = currentDragEl.offsetWidth + 'px';
  document.body.appendChild(currentTouchClone);

  const touch = e.touches[0];
  currentTouchClone.style.left = (touch.clientX - currentDragEl.offsetWidth / 2) + 'px';
  currentTouchClone.style.top = (touch.clientY - 25) + 'px';
  currentDragEl.classList.add('dragging');
  playSynthSound('click');
}

function onCardTouchMove(e) {
  if (!currentTouchClone) return;
  e.preventDefault();
  const touch = e.touches[0];
  currentTouchClone.style.left = (touch.clientX - currentTouchClone.offsetWidth / 2) + 'px';
  currentTouchClone.style.top = (touch.clientY - 25) + 'px';

  document.querySelectorAll('.drop-slot').forEach(s => s.classList.remove('over'));
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  if (elem) {
    const slot = elem.closest('.drop-slot');
    if (slot) slot.classList.add('over');
  }
}

function onCardTouchEnd(e) {
  if (!currentTouchClone || !currentDragEl) return;
  const touch = e.changedTouches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);

  document.body.removeChild(currentTouchClone);
  currentTouchClone = null;
  currentDragEl.classList.remove('dragging');

  if (elem) {
    const slot = elem.closest('.drop-slot');
    if (slot) {
      dropCardToSlot(currentDragEl, slot);
    }
  }
  document.querySelectorAll('.drop-slot').forEach(s => s.classList.remove('over'));
  currentDragEl = null;
}

function dropCardToSlot(cardEl, slotEl) {
  const existingCard = slotEl.querySelector('.drag-card');
  if (existingCard) {
    document.getElementById('drag-items').appendChild(existingCard);
  }

  const targetBox = slotEl.querySelector('.slot-target');
  if (targetBox) {
    targetBox.textContent = '';
    targetBox.appendChild(cardEl);
  } else {
    slotEl.appendChild(cardEl);
  }

  playSynthSound('device_on');
}

function checkDragDrop() {
  let correctCount = 0;
  DROP_ZONES_DATA.forEach(zone => {
    const slotEl = document.getElementById(zone.id);
    if (!slotEl) return;
    const placedCard = slotEl.querySelector('.drag-card');
    slotEl.classList.remove('correct', 'incorrect');

    if (placedCard) {
      if (placedCard.dataset.matchId === zone.id) {
        slotEl.classList.add('correct');
        correctCount++;
      } else {
        slotEl.classList.add('incorrect');
      }
    }
  });

  const scoreBadge = document.getElementById('tj-score-badge');
  if (scoreBadge) {
    scoreBadge.textContent = `Skor: ${correctCount} / 6`;
  }

  if (correctCount === 6) {
    playSynthSound('victory');
    spawnConfetti();
  } else if (correctCount > 0) {
    playSynthSound('success');
  } else {
    playSynthSound('error');
  }
}

function resetDragDrop() {
  initDragDrop();
  playSynthSound('click');
}

// ==================== PERMAINAN: SMART HOME IOT LAB (PAGE 11) ====================
let smartHomeGame = {
  currentLevel: 1,
  stars: { 1: 0, 2: 0, 3: 0 },
  sensors: {
    lightLux: 100, // 0 - 1000 (< 200 = Gelap)
    tempC: 32, // 20 - 40 (> 30 = Panas)
    hasMotion: true, // true / false
    doorOpen: true, // true / false
    rfidValid: false // true / false
  },
  rules: {
    lvl1: { condition: 'dark', action: 'lamp_on' },
    lvl2: { condition: 'hot_and_motion', action: 'fan_on' },
    lvl3: { condition: 'door_open_no_rfid', action: 'alarm_on' }
  }
};

function initSmartHomeGame() {
  updateGameHUD();
  renderGameMission(smartHomeGame.currentLevel);
}

function switchGameLevel(lvl) {
  if (lvl > 1 && smartHomeGame.stars[lvl - 1] === 0) {
    playSynthSound('error');
    return;
  }
  smartHomeGame.currentLevel = lvl;
  updateGameHUD();
  renderGameMission(lvl);
  playSynthSound('click');
}

function updateGameHUD() {
  const lvl = smartHomeGame.currentLevel;
  const totalStars = Object.values(smartHomeGame.stars).reduce((a, b) => a + b, 0);

  const starTotalEl = document.getElementById('hud-total-stars');
  if (starTotalEl) starTotalEl.textContent = `⭐ ${totalStars}/3`;

  for (let i = 1; i <= 3; i++) {
    const tab = document.getElementById(`tab-lvl-${i}`);
    if (tab) {
      tab.className = 'game-tab-btn';
      if (i === lvl) tab.classList.add('active');
      if (i > 1 && smartHomeGame.stars[i - 1] === 0) {
        tab.classList.add('locked');
      } else {
        const starSpan = tab.querySelector('.tab-star') || tab.querySelector('.tab-lock');
        if (starSpan) {
          starSpan.className = 'tab-star';
          starSpan.textContent = `⭐ ${smartHomeGame.stars[i]}/1`;
        }
      }
    }
  }
}

function renderGameMission(lvl) {
  const inputsContainer = document.getElementById('sensor-controls-container');
  const houseStage = document.getElementById('house-visual-container');
  const rulesContainer = document.getElementById('logic-builder-container');
  const calloutText = document.getElementById('game-instruction-text');
  const statusLabel = document.getElementById('hud-path-status');
  const latencyVal = document.getElementById('hud-latency-val');

  if (statusLabel) statusLabel.textContent = '● Siap Diuji';

  if (lvl === 1) {
    if (latencyVal) latencyVal.textContent = `💡 Cahaya: ${smartHomeGame.sensors.lightLux} Lux`;
    if (calloutText) {
      calloutText.innerHTML = `
        <span class="callout-icon">💡</span>
        <span class="callout-text"><strong>Misi 1: Lampu Otomatis</strong> — Buat aturan algoritma agar lampu kamar tidur otomatis MENYALA saat sensor LDR mendeteksi kondisi GELAP (&lt; 200 Lux), dan MATI saat TERANG.</span>
      `;
    }

    // Controls
    inputsContainer.innerHTML = `
      <div class="sensor-control-card">
        <label class="sensor-label">🔆 Sensor Cahaya LDR: <strong id="val-lux">${smartHomeGame.sensors.lightLux} Lux (${smartHomeGame.sensors.lightLux < 200 ? 'GELAP' : 'TERANG'})</strong></label>
        <input type="range" min="0" max="800" value="${smartHomeGame.sensors.lightLux}" step="20" class="game-slider" id="slider-lux" oninput="onSensorChange('lux', this.value)">
        <div class="slider-ticks"><span>🌑 0 Lux (Gelap)</span><span>☀️ 800 Lux (Terang)</span></div>
      </div>
    `;

    // House Visual
    houseStage.innerHTML = `
      <div class="room-box" id="room-bedroom">
        <div class="room-title">🛏️ Kamar Tidur</div>
        <div class="appliance-lamp" id="appliance-lamp">
          <div class="lamp-bulb">💡</div>
          <div class="lamp-glow" id="lamp-glow"></div>
          <div class="lamp-status" id="lamp-status">Status: PADAM</div>
        </div>
      </div>
    `;

    // Rule Builder
    rulesContainer.innerHTML = `
      <div class="rule-block-row">
        <span class="rule-keyword">JIKA (IF)</span>
        <select class="rule-select" id="rule-lvl1-cond" onchange="smartHomeGame.rules.lvl1.condition = this.value">
          <option value="dark" ${smartHomeGame.rules.lvl1.condition === 'dark' ? 'selected' : ''}>Cahaya &lt; 200 Lux (Gelap)</option>
          <option value="bright" ${smartHomeGame.rules.lvl1.condition === 'bright' ? 'selected' : ''}>Cahaya &gt;= 200 Lux (Terang)</option>
        </select>
      </div>
      <div class="rule-block-row">
        <span class="rule-keyword">MAKA (THEN)</span>
        <select class="rule-select" id="rule-lvl1-act" onchange="smartHomeGame.rules.lvl1.action = this.value">
          <option value="lamp_on" ${smartHomeGame.rules.lvl1.action === 'lamp_on' ? 'selected' : ''}>Nyalakan Lampu Kamar</option>
          <option value="lamp_off" ${smartHomeGame.rules.lvl1.action === 'lamp_off' ? 'selected' : ''}>Matikan Lampu Kamar</option>
        </select>
      </div>
      <div class="rule-block-row">
        <span class="rule-keyword">JIKA TIDAK (ELSE)</span>
        <span class="rule-fixed-text">Matikan Lampu Kamar</span>
      </div>
    `;

  } else if (lvl === 2) {
    if (latencyVal) latencyVal.textContent = `🌡️ ${smartHomeGame.sensors.tempC}°C | 🚶 ${smartHomeGame.sensors.hasMotion ? 'Ada Orang' : 'Kosong'}`;
    if (calloutText) {
      calloutText.innerHTML = `
        <span class="callout-icon">❄️</span>
        <span class="callout-text"><strong>Misi 2: Kipas Angin Cerdas</strong> — Susun aturan IF-AND-THEN agar kipas angin menyala HANYA jika suhu ruangan PANAS (&gt; 30°C) DAN sensor PIR mendeteksi ada orang di ruang keluarga.</span>
      `;
    }

    // Controls
    inputsContainer.innerHTML = `
      <div class="sensor-control-card">
        <label class="sensor-label">🌡️ Sensor Suhu DHT11: <strong id="val-temp">${smartHomeGame.sensors.tempC}°C (${smartHomeGame.sensors.tempC > 30 ? 'PANAS' : 'SEJUK'})</strong></label>
        <input type="range" min="20" max="40" value="${smartHomeGame.sensors.tempC}" step="1" class="game-slider" id="slider-temp" oninput="onSensorChange('temp', this.value)">
        <div class="slider-ticks"><span>❄️ 20°C</span><span>🔥 40°C</span></div>
      </div>
      <div class="sensor-control-card">
        <label class="sensor-label">🚶 Sensor Gerak PIR:</label>
        <button class="btn ${smartHomeGame.sensors.hasMotion ? 'btn-success' : 'btn-secondary'}" onclick="onSensorChange('motion', !smartHomeGame.sensors.hasMotion)" id="btn-motion-toggle">
          ${smartHomeGame.sensors.hasMotion ? '🟢 Ada Orang di Ruangan' : '⚪ Ruangan Kosong'}
        </button>
      </div>
    `;

    // House Visual
    houseStage.innerHTML = `
      <div class="room-box" id="room-living">
        <div class="room-title">🛋️ Ruang Keluarga</div>
        <div class="appliance-fan" id="appliance-fan">
          <div class="fan-blade" id="fan-blade">🌀</div>
          <div class="fan-status" id="fan-status">Kipas: MATI</div>
        </div>
      </div>
    `;

    // Rule Builder
    rulesContainer.innerHTML = `
      <div class="rule-block-row">
        <span class="rule-keyword">JIKA (IF)</span>
        <select class="rule-select" id="rule-lvl2-cond" onchange="smartHomeGame.rules.lvl2.condition = this.value">
          <option value="hot_and_motion" ${smartHomeGame.rules.lvl2.condition === 'hot_and_motion' ? 'selected' : ''}>Suhu &gt; 30°C DAN Ada Gerakan</option>
          <option value="hot_only" ${smartHomeGame.rules.lvl2.condition === 'hot_only' ? 'selected' : ''}>Suhu &gt; 30°C Saja (Tanpa Gerak)</option>
          <option value="motion_only" ${smartHomeGame.rules.lvl2.condition === 'motion_only' ? 'selected' : ''}>Ada Gerakan Saja (Berapapun Suhu)</option>
        </select>
      </div>
      <div class="rule-block-row">
        <span class="rule-keyword">MAKA (THEN)</span>
        <select class="rule-select" id="rule-lvl2-act" onchange="smartHomeGame.rules.lvl2.action = this.value">
          <option value="fan_on" ${smartHomeGame.rules.lvl2.action === 'fan_on' ? 'selected' : ''}>Putar Kipas Angin</option>
          <option value="fan_off" ${smartHomeGame.rules.lvl2.action === 'fan_off' ? 'selected' : ''}>Matikan Kipas Angin</option>
        </select>
      </div>
    `;

  } else if (lvl === 3) {
    if (latencyVal) latencyVal.textContent = `🚨 Pintu: ${smartHomeGame.sensors.doorOpen ? 'Terbuka' : 'Tertutup'} | RFID: ${smartHomeGame.sensors.rfidValid ? 'Valid' : 'Tidak'}`;
    if (calloutText) {
      calloutText.innerHTML = `
        <span class="callout-icon">🚨</span>
        <span class="callout-text"><strong>Misi 3: Sistem Keamanan Cerdas</strong> — Susun aturan keamanan: jika pintu terbuka TANPA kartu kunci RFID yang sah, bunyikan sirine alarm darurat dan kirim sinyal bahaya!</span>
      `;
    }

    // Controls
    inputsContainer.innerHTML = `
      <div class="sensor-control-card">
        <label class="sensor-label">🚪 Sensor Pintu Magnet:</label>
        <button class="btn ${smartHomeGame.sensors.doorOpen ? 'btn-danger' : 'btn-success'}" onclick="onSensorChange('door', !smartHomeGame.sensors.doorOpen)" id="btn-door-toggle">
          ${smartHomeGame.sensors.doorOpen ? '🔓 Pintu Terbuka' : '🔒 Pintu Tertutup Rapat'}
        </button>
      </div>
      <div class="sensor-control-card">
        <label class="sensor-label">🪪 Kartu Kunci RFID:</label>
        <button class="btn ${smartHomeGame.sensors.rfidValid ? 'btn-success' : 'btn-secondary'}" onclick="onSensorChange('rfid', !smartHomeGame.sensors.rfidValid)" id="btn-rfid-toggle">
          ${smartHomeGame.sensors.rfidValid ? '✅ Kartu Dikenali (Akses Sah)' : '❌ Tanpa Kartu (Akses Ilegal)'}
        </button>
      </div>
    `;

    // House Visual
    houseStage.innerHTML = `
      <div class="room-box" id="room-porch">
        <div class="room-title">🏡 Teras &amp; Pintu Masuk</div>
        <div class="appliance-alarm" id="appliance-alarm">
          <div class="alarm-siren" id="alarm-siren">🚨</div>
          <div class="alarm-status" id="alarm-status">Status: AMAN</div>
        </div>
      </div>
    `;

    // Rule Builder
    rulesContainer.innerHTML = `
      <div class="rule-block-row">
        <span class="rule-keyword">JIKA (IF)</span>
        <select class="rule-select" id="rule-lvl3-cond" onchange="smartHomeGame.rules.lvl3.condition = this.value">
          <option value="door_open_no_rfid" ${smartHomeGame.rules.lvl3.condition === 'door_open_no_rfid' ? 'selected' : ''}>Pintu Terbuka TANPA Kartu RFID</option>
          <option value="door_open_with_rfid" ${smartHomeGame.rules.lvl3.condition === 'door_open_with_rfid' ? 'selected' : ''}>Pintu Terbuka DENGAN Kartu RFID</option>
          <option value="always" ${smartHomeGame.rules.lvl3.condition === 'always' ? 'selected' : ''}>Kapanpun Pintu Terbuka</option>
        </select>
      </div>
      <div class="rule-block-row">
        <span class="rule-keyword">MAKA (THEN)</span>
        <select class="rule-select" id="rule-lvl3-act" onchange="smartHomeGame.rules.lvl3.action = this.value">
          <option value="alarm_on" ${smartHomeGame.rules.lvl3.action === 'alarm_on' ? 'selected' : ''}>Bunyikan Sirine &amp; Kirim Peringatan</option>
          <option value="alarm_off" ${smartHomeGame.rules.lvl3.action === 'alarm_off' ? 'selected' : ''}>Buka Kunci Normal (Tanpa Alarm)</option>
        </select>
      </div>
    `;
  }
}

function onSensorChange(type, val) {
  if (type === 'lux') {
    smartHomeGame.sensors.lightLux = parseInt(val);
    const label = document.getElementById('val-lux');
    if (label) label.textContent = `${val} Lux (${val < 200 ? 'GELAP' : 'TERANG'})`;
  } else if (type === 'temp') {
    smartHomeGame.sensors.tempC = parseInt(val);
    const label = document.getElementById('val-temp');
    if (label) label.textContent = `${val}°C (${val > 30 ? 'PANAS' : 'SEJUK'})`;
  } else if (type === 'motion') {
    smartHomeGame.sensors.hasMotion = val;
    renderGameMission(2);
  } else if (type === 'door') {
    smartHomeGame.sensors.doorOpen = val;
    renderGameMission(3);
  } else if (type === 'rfid') {
    smartHomeGame.sensors.rfidValid = val;
    renderGameMission(3);
  }
  playSynthSound('click');
}

function launchGameSimulation() {
  const lvl = smartHomeGame.currentLevel;
  const statusLabel = document.getElementById('hud-path-status');

  if (lvl === 1) {
    const isDark = smartHomeGame.sensors.lightLux < 200;
    const ruleMatch = smartHomeGame.rules.lvl1.condition === 'dark' && smartHomeGame.rules.lvl1.action === 'lamp_on';

    const lampBulb = document.getElementById('appliance-lamp');
    const lampGlow = document.getElementById('lamp-glow');
    const lampStatus = document.getElementById('lamp-status');

    if (ruleMatch && isDark) {
      if (lampBulb) lampBulb.classList.add('active');
      if (lampGlow) lampGlow.classList.add('glow');
      if (lampStatus) lampStatus.textContent = 'Status: MENYALA (Otomatis)';
      if (statusLabel) statusLabel.textContent = '✅ Berhasil!';

      smartHomeGame.stars[1] = 1;
      updateGameHUD();
      playSynthSound('device_on');
      spawnConfetti();

      setTimeout(() => {
        showGameModal({
          icon: '🌟',
          title: 'Misi 1 Berhasil!',
          text: 'Aturan logikamu tepat! Saat ruangan gelap (&lt; 200 Lux), mikrokontroler otomatis menyalakan lampu kamar. Dekomposisi &amp; Algoritma berjalan sempurna!',
          type: 'victory',
          actions: [
            { label: '▶ Lanjut ke Misi 2', cls: 'btn btn-primary', onClick: 'closeGameModal();switchGameLevel(2)' }
          ]
        });
      }, 500);

    } else if (ruleMatch && !isDark) {
      if (lampBulb) lampBulb.classList.remove('active');
      if (lampGlow) lampGlow.classList.remove('glow');
      if (lampStatus) lampStatus.textContent = 'Status: PADAM (Ruangan Terang)';
      if (statusLabel) statusLabel.textContent = '💡 Geser slider ke Gelap untuk tes';
      playSynthSound('device_off');

      showGameModal({
        icon: 'ℹ️',
        title: 'Kondisi Belum Terpenuhi',
        text: 'Aturan logikamu sudah benar (IF Gelap -&gt; Lampu Menyala). Namun saat ini sensor membaca ruangan masih <strong>TERANG</strong>. Geser slider cahaya ke arah GELAP (&lt; 200 Lux) untuk menguji!',
        type: 'info',
        actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
      });

    } else {
      playSynthSound('error');
      showGameModal({
        icon: '⚠️',
        title: 'Logika Kurang Tepat',
        text: 'Lampu kamar seharusnya menyala ketika kondisi <strong>GELAP (&lt; 200 Lux)</strong> untuk membantu penghuni melihat, bukan saat terang.',
        type: 'error',
        actions: [{ label: 'Coba Lagi', cls: 'btn btn-warning', onClick: 'closeGameModal()' }]
      });
    }

  } else if (lvl === 2) {
    const isHot = smartHomeGame.sensors.tempC > 30;
    const hasPerson = smartHomeGame.sensors.hasMotion;
    const ruleMatch = smartHomeGame.rules.lvl2.condition === 'hot_and_motion' && smartHomeGame.rules.lvl2.action === 'fan_on';

    const fanBlade = document.getElementById('fan-blade');
    const fanStatus = document.getElementById('fan-status');

    if (ruleMatch && isHot && hasPerson) {
      if (fanBlade) fanBlade.classList.add('spinning');
      if (fanStatus) fanStatus.textContent = 'Kipas: BERPUTAR KENCANG';
      if (statusLabel) statusLabel.textContent = '✅ Berhasil!';

      smartHomeGame.stars[2] = 1;
      updateGameHUD();
      playSynthSound('device_on');
      spawnConfetti();

      setTimeout(() => {
        showGameModal({
          icon: '❄️',
          title: 'Misi 2 Berhasil!',
          text: 'Hebat! Logika majemuk (IF-AND-THEN) berhasil menghemat energi. Kipas angin hanya berputar jika suhu panas DAN ada orang di ruangan!',
          type: 'victory',
          actions: [
            { label: '▶ Lanjut ke Misi 3', cls: 'btn btn-primary', onClick: 'closeGameModal();switchGameLevel(3)' }
          ]
        });
      }, 500);

    } else if (ruleMatch && (!isHot || !hasPerson)) {
      if (fanBlade) fanBlade.classList.remove('spinning');
      if (fanStatus) fanStatus.textContent = 'Kipas: MATI (Hemat Energi)';
      playSynthSound('device_off');

      showGameModal({
        icon: 'ℹ️',
        title: 'Kondisi Belum Lengkap',
        text: `Aturan logikamu sudah benar! Namun saat ini ${!isHot ? 'suhu masih sejuk (&lt; 30°C)' : 'ruangan kosong'}. Pastikan suhu &gt; 30°C DAN ada orang untuk menguji!`,
        type: 'info',
        actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
      });

    } else {
      playSynthSound('error');
      showGameModal({
        icon: '⚠️',
        title: 'Aturan Kurang Efisien',
        text: 'Gunakan logika majemuk: <strong>Suhu &gt; 30°C DAN Ada Gerakan</strong> agar kipas tidak berputar sia-sia di ruangan kosong.',
        type: 'error',
        actions: [{ label: 'Koreksi Logika', cls: 'btn btn-warning', onClick: 'closeGameModal()' }]
      });
    }

  } else if (lvl === 3) {
    const isDoorOpen = smartHomeGame.sensors.doorOpen;
    const isIllegal = isDoorOpen && !smartHomeGame.sensors.rfidValid;
    const ruleMatch = smartHomeGame.rules.lvl3.condition === 'door_open_no_rfid' && smartHomeGame.rules.lvl3.action === 'alarm_on';

    const siren = document.getElementById('alarm-siren');
    const alarmStatus = document.getElementById('alarm-status');

    if (ruleMatch && isIllegal) {
      if (siren) siren.classList.add('alarming');
      if (alarmStatus) alarmStatus.textContent = '🚨 BAHAYA: AKSES ILEGAL DETECTED!';
      if (statusLabel) statusLabel.textContent = '✅ Alarm Aktif!';

      smartHomeGame.stars[3] = 1;
      updateGameHUD();
      playSynthSound('alarm');
      spawnConfetti();

      setTimeout(() => {
        showGameModal({
          icon: '👑',
          title: 'Selamat! Master Smart Home Architect!',
          text: 'Luar biasa! Kamu berhasil merancang seluruh sistem otomasi rumah pintar dengan menerapkan 4 Fondasi Berpikir Komputasional secara nyata!',
          type: 'victory',
          actions: [
            { label: '🔄 Mainkan Lagi Misi', cls: 'btn btn-secondary', onClick: 'closeGameModal();switchGameLevel(1)' },
            { label: '▶ Lanjut ke Latihan Evaluasi', cls: 'btn btn-success', onClick: 'closeGameModal();goToPage(\'latihan-intro\')' }
          ]
        });
      }, 500);

    } else {
      playSynthSound('error');
      showGameModal({
        icon: '💡',
        title: 'Uji Keamanan',
        text: 'Pastikan aturan diset: <strong>JIKA Pintu Terbuka TANPA Kartu RFID -> MAKA Bunyikan Sirine</strong>, lalu pastikan tombol Pintu Terbuka dan Kartu Ilegal aktif.',
        type: 'info',
        actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
      });
    }
  }
}

function resetCurrentGameLevel() {
  renderGameMission(smartHomeGame.currentLevel);
  playSynthSound('click');
}

function showGameHint() {
  const lvl = smartHomeGame.currentLevel;
  if (lvl === 1) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 1',
      text: 'Sensor LDR membaca nilai cahaya. Pilih aturan: JIKA Cahaya &lt; 200 Lux (Gelap) MAKA Nyalakan Lampu Kamar.',
      type: 'info',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  } else if (lvl === 2) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 2',
      text: 'Gunakan logika IF-AND-THEN. Syarat kipas menyala: Suhu &gt; 30°C DAN ada gerakan orang.',
      type: 'info',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  } else if (lvl === 3) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 3',
      text: 'Sirine harus berbunyi jika pintu terbuka tanpa verifikasi kartu kunci RFID yang sah.',
      type: 'info',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  }
}

function showGameModal(config) {
  const modal = document.getElementById('game-modal');
  const card = document.getElementById('game-modal-card');
  if (!modal || !card) return;

  let actionsHtml = '';
  if (config.actions) {
    actionsHtml = config.actions.map(a =>
      `<button class="${a.cls || 'btn btn-primary'}" onclick="${a.onClick}">${a.label}</button>`
    ).join('');
  }

  card.innerHTML = `
    <div class="gm-icon">${config.icon || 'ℹ️'}</div>
    <div class="gm-title ${config.type || ''}">${config.title || ''}</div>
    <div class="gm-text">${config.text || ''}</div>
    <div class="gm-actions">${actionsHtml}</div>
  `;

  modal.classList.add('show');
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  if (modal) modal.classList.remove('show');
}

// ==================== LATIHAN EVALUASI (PAGE 13) ====================
const EVAL_ANSWERS = {
  A1: 'B', A2: 'C', A3: 'B', A4: 'B', A5: 'C',
  B1: 'salah', B2: 'benar', B3: 'benar', B4: 'salah', B5: 'benar', B6: 'benar',
};

const MATCH_ANSWERS = {
  '1': 'b', '2': 'd', '3': 'a', '4': 'e', '5': 'c'
};

const SEQ_CORRECT_ORDER = [
  'Sensor LDR mengukur intensitas cahaya di sekitar teras rumah',
  'Data analog cahaya dikirimkan ke pin input mikrokontroler',
  'Mikrokontroler mengevaluasi aturan logika algoritma: apakah kondisi gelap?',
  'Jika kondisi gelap terpenuhi, mikrokontroler mengirim sinyal aktif ke relay',
  'Relay mengalirkan arus listrik menuju lampu teras rumah',
  'Lampu teras menyala secara otomatis dan aman menerangi malam'
];

let evalUserAnswers = {};
let matchState = { selectedLeft: null, pairs: {} };
let evalSectionInited = { C: false, D: false, E: false };
let evalRuleSelected = null;

function startEval() {
  evalUserAnswers = {};
  matchState = { selectedLeft: null, pairs: {} };
  evalSectionInited = { C: false, D: false, E: false };
  evalRuleSelected = null;
  currentShuffledRight = null;

  // 1. Reset Bagian A
  document.querySelectorAll('#eval-section-A .mcq-option').forEach(o => {
    o.classList.remove('selected');
  });

  // 2. Reset Bagian B
  document.querySelectorAll('#eval-section-B .tf-btn').forEach(b => {
    b.classList.remove('selected-benar', 'selected-salah');
  });

  // 3. Reset Bagian C
  const leftCol = document.getElementById('match-left');
  const rightCol = document.getElementById('match-right');
  const svg = document.getElementById('match-svg-layer');
  if (leftCol) leftCol.innerHTML = '';
  if (rightCol) rightCol.innerHTML = '';
  if (svg) svg.innerHTML = '';

  // 4. Reset Bagian D
  const seqList = document.getElementById('seq-list');
  if (seqList) seqList.innerHTML = '';

  // 5. Reset Bagian E
  document.querySelectorAll('.rule-option-card').forEach(c => c.classList.remove('selected'));
  const sendBtn = document.getElementById('btn-send-eval');
  if (sendBtn) sendBtn.disabled = true;
  const fb = document.getElementById('sim-feedback-eval');
  if (fb) fb.classList.remove('show');

  // 6. Reset Halaman Rekap & Progress Steps
  const recapCard = document.getElementById('recap-card');
  if (recapCard) recapCard.innerHTML = '';
  const recapSection = document.getElementById('eval-section-recap');
  if (recapSection) recapSection.classList.remove('active');

  document.querySelectorAll('.eval-progress .step').forEach(s => {
    s.classList.remove('active', 'done');
  });

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

  if (sectionId === 'C') {
    if (!evalSectionInited.C) {
      initMatchSection();
    } else {
      setTimeout(drawMatchLines, 50);
    }
  }
  if (sectionId === 'D' && !evalSectionInited.D) initSeqSection();

  const evalBox = document.getElementById('eval-box');
  if (evalBox) evalBox.scrollTop = 0;
}

function selectMCQ(el) {
  const question = el.closest('.mcq-question');
  question.querySelectorAll('.mcq-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  evalUserAnswers[question.dataset.q] = el.dataset.val;
  playSynthSound('click');
}

function selectTF(el) {
  const question = el.closest('.tf-question');
  question.querySelectorAll('.tf-btn').forEach(b => {
    b.classList.remove('selected-benar', 'selected-salah');
  });
  el.classList.add(el.dataset.val === 'benar' ? 'selected-benar' : 'selected-salah');
  evalUserAnswers[question.dataset.q] = el.dataset.val;
  playSynthSound('click');
}

// ---------- BAGIAN C: MENJODOHKAN ----------
const MATCH_LEFT_DATA = [
  { id: '1', text: 'Sensor LDR' },
  { id: '2', text: 'Mikrokontroler ESP32' },
  { id: '3', text: 'Aktuator Relay' },
  { id: '4', text: 'Logika IF-THEN' },
  { id: '5', text: 'Abstraksi Data' }
];

const MATCH_RIGHT_DATA = [
  { id: 'a', text: 'Pemicu saklar listrik untuk menyalakan/mematikan alat fisik' },
  { id: 'b', text: 'Membaca intensitas cahaya gelap/terang di sekitar ruangan' },
  { id: 'c', text: 'Hanya fokus pada status esensial sensor dan abaikan detail fisik' },
  { id: 'd', text: 'Otak komputer mini yang mengeksekusi instruksi program' },
  { id: 'e', text: 'Struktur aturan pengambilan keputusan berdasarkan kondisi' }
];

const MATCH_PAIR_THEMES = {
  '1': { color: '#00838f', bg: '#e0f7fa', border: '#00acc1', label: '1' },
  '2': { color: '#e65100', bg: '#fff3e0', border: '#ff9800', label: '2' },
  '3': { color: '#6a1b9a', bg: '#f3e5f5', border: '#ab47bc', label: '3' },
  '4': { color: '#2e7d32', bg: '#e8f5e9', border: '#4caf50', label: '4' },
  '5': { color: '#c2185b', bg: '#fce4ec', border: '#e91e63', label: '5' }
};

let currentShuffledRight = null;

function initMatchSection() {
  evalSectionInited.C = true;
  const leftCol = document.getElementById('match-left');
  const rightCol = document.getElementById('match-right');
  if (!leftCol || !rightCol) return;
  leftCol.innerHTML = '';
  rightCol.innerHTML = '';

  if (!currentShuffledRight) {
    currentShuffledRight = [...MATCH_RIGHT_DATA].sort(() => Math.random() - 0.5);
  }

  MATCH_LEFT_DATA.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.id = `match-left-${item.id}`;
    el.dataset.id = item.id;
    el.dataset.side = 'left';
    el.onclick = (e) => {
      if (e.target.closest('.match-unpair-btn')) {
        e.stopPropagation();
        unpairMatchItem(item.id);
        return;
      }
      onMatchClick('left', item.id, el);
    };
    leftCol.appendChild(el);
  });

  currentShuffledRight.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.id = `match-right-${item.id}`;
    el.dataset.id = item.id;
    el.dataset.side = 'right';
    el.onclick = (e) => {
      if (e.target.closest('.match-unpair-btn')) {
        e.stopPropagation();
        const pairedLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === item.id);
        if (pairedLeft) unpairMatchItem(pairedLeft);
        return;
      }
      onMatchClick('right', item.id, el);
    };
    rightCol.appendChild(el);
  });

  renderMatchUI();
}

function renderMatchUI() {
  MATCH_LEFT_DATA.forEach(item => {
    const el = document.getElementById(`match-left-${item.id}`);
    if (!el) return;
    const isSelected = matchState.selectedLeft === item.id;
    const pairedRight = matchState.pairs[item.id];
    const theme = MATCH_PAIR_THEMES[item.id] || MATCH_PAIR_THEMES['1'];

    el.className = 'match-item' + (isSelected ? ' selected' : '') + (pairedRight ? ' matched' : '');
    if (pairedRight) {
      el.style.setProperty('--pair-color', theme.color);
      el.style.setProperty('--pair-bg', theme.bg);
      el.style.setProperty('--pair-border', theme.border);
      el.innerHTML = `
        <div class="match-item-content">
          <span>${item.id}. ${item.text}</span>
        </div>
        <span class="match-badge">🔗 #${theme.label} <span class="match-unpair-btn" title="Batalkan pasangan">✕</span></span>
        <span class="match-anchor-dot"></span>
      `;
    } else {
      el.removeAttribute('style');
      el.innerHTML = `
        <div class="match-item-content">
          <span>${item.id}. ${item.text}</span>
        </div>
        <span class="match-anchor-dot"></span>
      `;
    }
  });

  if (currentShuffledRight) {
    currentShuffledRight.forEach(item => {
      const el = document.getElementById(`match-right-${item.id}`);
      if (!el) return;
      const pairedLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === item.id);
      const theme = pairedLeft ? (MATCH_PAIR_THEMES[pairedLeft] || MATCH_PAIR_THEMES['1']) : null;

      el.className = 'match-item' + (pairedLeft ? ' matched' : '');
      if (pairedLeft && theme) {
        el.style.setProperty('--pair-color', theme.color);
        el.style.setProperty('--pair-bg', theme.bg);
        el.style.setProperty('--pair-border', theme.border);
        el.innerHTML = `
          <span class="match-anchor-dot"></span>
          <span class="match-badge">🔗 #${theme.label} <span class="match-unpair-btn" title="Batalkan pasangan">✕</span></span>
          <div class="match-item-content">
            <span>${item.id}. ${item.text}</span>
          </div>
        `;
      } else {
        el.removeAttribute('style');
        el.innerHTML = `
          <span class="match-anchor-dot"></span>
          <div class="match-item-content">
            <span>${item.id}. ${item.text}</span>
          </div>
        `;
      }
    });
  }

  setTimeout(drawMatchLines, 20);
}

function onMatchClick(side, id, el) {
  if (side === 'left') {
    if (matchState.pairs[id]) {
      delete matchState.pairs[id];
      matchState.selectedLeft = id;
      playSynthSound('click');
      renderMatchUI();
      return;
    }

    if (matchState.selectedLeft === id) {
      matchState.selectedLeft = null;
      playSynthSound('click');
      renderMatchUI();
      return;
    }

    matchState.selectedLeft = id;
    playSynthSound('click');
    renderMatchUI();

  } else if (side === 'right') {
    if (matchState.selectedLeft !== null) {
      const leftId = matchState.selectedLeft;
      const existingLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === id);
      if (existingLeft && existingLeft !== leftId) {
        delete matchState.pairs[existingLeft];
      }

      matchState.pairs[leftId] = id;
      matchState.selectedLeft = null;
      playSynthSound('device_on');
      renderMatchUI();

    } else {
      const pairedLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === id);
      if (pairedLeft) {
        delete matchState.pairs[pairedLeft];
        playSynthSound('click');
        renderMatchUI();
      }
    }
  }
}

function unpairMatchItem(leftId) {
  if (matchState.pairs[leftId]) {
    delete matchState.pairs[leftId];
    playSynthSound('click');
    renderMatchUI();
  }
}

function resetMatchPairs() {
  matchState = { selectedLeft: null, pairs: {} };
  playSynthSound('click');
  renderMatchUI();
}

function drawMatchLines() {
  const container = document.getElementById('match-container');
  const svg = document.getElementById('match-svg-layer');
  if (!container || !svg) return;

  svg.innerHTML = '';
  const containerRect = container.getBoundingClientRect();
  if (containerRect.width === 0 || containerRect.height === 0) return;

  Object.entries(matchState.pairs).forEach(([leftId, rightId]) => {
    const leftEl = document.getElementById(`match-left-${leftId}`);
    const rightEl = document.getElementById(`match-right-${rightId}`);
    if (!leftEl || !rightEl) return;

    const leftRect = leftEl.getBoundingClientRect();
    const rightRect = rightEl.getBoundingClientRect();

    const x1 = leftRect.right - containerRect.left;
    const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
    const x2 = rightRect.left - containerRect.left;
    const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

    const theme = MATCH_PAIR_THEMES[leftId] || MATCH_PAIR_THEMES['1'];
    const midX = (x1 + x2) / 2;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1},${y1} C ${midX},${y1} ${midX},${y2} ${x2},${y2}`);
    path.setAttribute('stroke', theme.border);
    path.setAttribute('stroke-width', '4');
    path.setAttribute('stroke-dasharray', '8 4');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

    const c1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c1.setAttribute('cx', x1);
    c1.setAttribute('cy', y1);
    c1.setAttribute('r', '5');
    c1.setAttribute('fill', theme.color);
    svg.appendChild(c1);

    const c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c2.setAttribute('cx', x2);
    c2.setAttribute('cy', y2);
    c2.setAttribute('r', '5');
    c2.setAttribute('fill', theme.color);
    svg.appendChild(c2);
  });
}

// ---------- BAGIAN D: MENGURUTKAN ----------
function initSeqSection() {
  evalSectionInited.D = true;
  const list = document.getElementById('seq-list');
  if (!list) return;
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
    el.addEventListener('dragover', (e) => e.preventDefault());
    el.addEventListener('dragenter', (e) => {
      e.preventDefault();
      if (e.currentTarget !== seqDragEl) e.currentTarget.classList.add('over');
    });
    el.addEventListener('dragleave', (e) => e.currentTarget.classList.remove('over'));
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
  playSynthSound('click');
}

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
  playSynthSound('click');
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
  playSynthSound('click');
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
      playSynthSound('click');
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

// ---------- BAGIAN E: SIMULASI PRAKTIK EVALUASI ----------
function selectEvalRule(ruleId) {
  evalRuleSelected = ruleId;
  document.querySelectorAll('.rule-option-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById(`eval-rule-${ruleId}`);
  if (card) card.classList.add('selected');

  const sendBtn = document.getElementById('btn-send-eval');
  if (sendBtn) sendBtn.disabled = false;
  playSynthSound('click');
}

let evalSimAttemptCount = 0;
let evalSimFirstAttemptCorrect = false;

function testEvalRule() {
  if (!evalRuleSelected) return;
  evalSimAttemptCount++;

  const isCorrect = evalRuleSelected === 'b';
  if (isCorrect && evalSimAttemptCount === 1) {
    evalSimFirstAttemptCorrect = true;
  }

  const fb = document.getElementById('sim-feedback-eval');
  const card = document.getElementById('sim-feedback-card-eval');

  if (isCorrect) {
    playSynthSound('success');
    spawnConfetti();
    card.innerHTML = `
      <div class="fb-icon">🌟</div>
      <div class="fb-title success">Luar Biasa! Logika Sempurna!</div>
      <div class="fb-text">Aturan B (IF Gelap DAN Ada Gerakan -&gt; Lampu Menyala) adalah solusi paling hemat energi dan efektif untuk rumah cerdas.</div>
      <div class="fb-actions">
        <button class="btn btn-success" onclick="closeEvalSimFeedback()">Tutup Umpan Balik ▶</button>
      </div>
    `;
  } else {
    playSynthSound('error');
    card.innerHTML = `
      <div class="fb-icon">⚠️</div>
      <div class="fb-title error">Pilihan Kurang Tepat</div>
      <div class="fb-text">Aturan ini belum optimal atau boros energi. Pilihlah aturan yang menggunakan sensor lingkungan secara adaptif!</div>
      <div class="fb-actions">
        <button class="btn btn-warning" onclick="closeEvalSimFeedback()">🔄 Coba Pilih Ulang</button>
      </div>
    `;
  }

  if (fb) fb.classList.add('show');
}

function closeEvalSimFeedback() {
  const fb = document.getElementById('sim-feedback-eval');
  if (fb) fb.classList.remove('show');
}

// ---------- SUBMIT EVALUATION RECAP ----------
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
  if (seqCorrect && seqItems.length === 6) scores.D = 1;

  if (evalSimFirstAttemptCorrect || evalRuleSelected === 'b') scores.E = 1;

  const total = scores.A + scores.B + scores.C + scores.D + scores.E;
  const maxTotal = 18;
  const percentage = Math.round((total / maxTotal) * 100);

  let msgClass, msgText;
  if (percentage >= 90) {
    msgClass = 'excellent';
    msgText = 'Luar biasa! Kamu adalah Smart Home Architect sejati! 🏆';
  } else if (percentage >= 60) {
    msgClass = 'good';
    msgText = 'Bagus! Pemahaman berpikir komputasionalmu sudah baik, yuk pelajari lagi bagian yang keliru.';
  } else {
    msgClass = 'tryagain';
    msgText = 'Mari pelajari kembali materi 4 Fondasi Berpikir Komputasional sebelum mencoba lagi!';
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
      <button class="btn btn-secondary" onclick="startEval()">🔄 Ulangi Latihan</button>
      <button class="btn btn-primary" onclick="goToPage('rangkuman')">📋 Ke Rangkuman</button>
    </div>
  `;

  document.querySelectorAll('.eval-section').forEach(s => s.classList.remove('active'));
  document.getElementById('eval-section-recap').classList.add('active');
  document.querySelectorAll('.eval-progress .step').forEach(s => s.classList.add('done'));

  if (percentage >= 60) {
    playSynthSound('victory');
    spawnConfetti();
  }
}

// ==================== ANIMASI CONFETTI ====================
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

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
  applyConfig();
  goToPage('cover');

  window.addEventListener('resize', () => {
    const secC = document.getElementById('eval-section-C');
    if (secC && secC.classList.contains('active')) {
      drawMatchLines();
    }
  });

  const evalBox = document.getElementById('eval-box');
  if (evalBox) {
    evalBox.addEventListener('scroll', () => {
      const secC = document.getElementById('eval-section-C');
      if (secC && secC.classList.contains('active')) {
        drawMatchLines();
      }
    });
  }
});


// ==================== DRAG & DROP (TARIK JAWABAN) ====================

const DD_DATA = [
  { term: 'Dekomposisi', def: 'Memecah sistem rumah cerdas menjadi Sensor (Input), Mikrokontroler (Proses), dan Aktuator (Output)', id: 'dekomposisi' },
  { term: 'Abstraksi', def: 'Hanya fokus pada data tingkat cahaya (terang/gelap) dan mengabaikan warna cat tembok kamar', id: 'abstraksi' },
  { term: 'Pengenalan Pola', def: 'Mengenali siklus matahari terbenam pukul 18.00 untuk menjadwalkan lampu otomatis secara teratur', id: 'pola' },
  { term: 'Algoritma', def: 'Menyusun aturan logika terstruktur: JIKA sensor gelap MAKA nyalakan lampu, JIKA terang MAKA matikan', id: 'algoritma' },
  { term: 'Sensor (Input)', def: 'Alat pencari tahu yang membaca besaran fisik lingkungan (cahaya, suhu, gerakan)', id: 'sensor' },
  { term: 'Aktuator (Output)', def: 'Perangkat pelaksana fisik nyata (lampu menyala, kipas berputar, sirine berbunyi)', id: 'aktuator' }
];

let ddInitialized = false;

function initDragDrop() {
  const termsCol = document.getElementById('dd-terms');
  const defsCol = document.getElementById('dd-definitions');
  const scoreBox = document.getElementById('dd-score-box');
  if (!termsCol || !defsCol) return;

  if (scoreBox) scoreBox.style.display = 'none';

  termsCol.innerHTML = '<h3>🧩 Kartu Istilah</h3>';
  defsCol.innerHTML = '<h3>🎯 Definisi & Penerapan</h3>';

  const shuffledTerms = [...DD_DATA].sort(() => Math.random() - 0.5);
  const shuffledDefs = [...DD_DATA].sort(() => Math.random() - 0.5);

  shuffledTerms.forEach(item => {
    const el = document.createElement('div');
    el.className = 'dd-item';
    el.draggable = true;
    el.dataset.id = item.id;
    el.innerHTML = `<span class="dd-grip">⠿</span> <span class="dd-term-text">${item.term}</span>`;
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
    zone.innerHTML = `
      <div class="dd-def-desc">${item.def}</div>
      <div class="dd-slot" data-slot-id="${item.id}">
        <span class="dd-placeholder">Tarik istilah ke sini...</span>
      </div>
    `;
    zone.addEventListener('dragover', onDragOver);
    zone.addEventListener('dragenter', onDragEnter);
    zone.addEventListener('dragleave', onDragLeave);
    zone.addEventListener('drop', onDrop);
    defsCol.appendChild(zone);
  });
}

let draggedItem = null;
let touchElement = null;

function onDragStart(e) {
  draggedItem = e.target.closest('.dd-item');
  if (!draggedItem) return;
  draggedItem.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', draggedItem.dataset.id);
  playSynthSound('btn');
}

function onDragEnd(e) {
  if (draggedItem) draggedItem.classList.remove('dragging');
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

  const slot = zone.querySelector('.dd-slot');
  if (!slot) return;

  // If slot already has an item, move it back to terms
  const existingItem = slot.querySelector('.dd-item');
  if (existingItem) {
    document.getElementById('dd-terms').appendChild(existingItem);
  }

  // Hide placeholder, place item inside slot
  const placeholder = slot.querySelector('.dd-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  slot.appendChild(draggedItem);
  draggedItem.classList.remove('dragging');
  playSynthSound('correct');
}

// Touch support for mobile/tablets
function onTouchStart(e) {
  touchElement = e.target.closest('.dd-item');
  if (!touchElement) return;
  touchElement.classList.add('dragging');
}

function onTouchMove(e) {
  if (!touchElement) return;
  e.preventDefault();
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  document.querySelectorAll('.dd-drop-zone').forEach(z => z.classList.remove('over'));
  if (target) {
    const zone = target.closest('.dd-drop-zone');
    if (zone) zone.classList.add('over');
  }
}

function onTouchEnd(e) {
  if (!touchElement) return;
  touchElement.classList.remove('dragging');
  const touch = e.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  document.querySelectorAll('.dd-drop-zone').forEach(z => z.classList.remove('over'));

  if (target) {
    const zone = target.closest('.dd-drop-zone');
    if (zone) {
      const slot = zone.querySelector('.dd-slot');
      if (slot) {
        const existing = slot.querySelector('.dd-item');
        if (existing) document.getElementById('dd-terms').appendChild(existing);
        const placeholder = slot.querySelector('.dd-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        slot.appendChild(touchElement);
        playSynthSound('correct');
      }
    }
  }
  touchElement = null;
}

function resetDragDrop() {
  playSynthSound('reset');
  initDragDrop();
}

function checkDragDrop() {
  const zones = document.querySelectorAll('.dd-drop-zone');
  let score = 0;
  let total = zones.length;

  zones.forEach(zone => {
    const expectedId = zone.dataset.id;
    const item = zone.querySelector('.dd-item');
    zone.classList.remove('correct', 'wrong');

    if (item && item.dataset.id === expectedId) {
      score++;
      zone.classList.add('correct');
    } else if (item) {
      zone.classList.add('wrong');
    }
  });

  const scoreBox = document.getElementById('dd-score-box');
  const badge = document.getElementById('dd-score-badge');
  const text = document.getElementById('dd-score-text');

  if (scoreBox && badge && text) {
    scoreBox.style.display = 'flex';
    badge.textContent = `Skor: ${Math.round((score / total) * 100)}`;
    text.textContent = `${score} dari ${total} Pasangan Benar! ${score === total ? '🎉 Sempurna!' : 'Coba perbaiki yang salah!'}`;
  }

  if (score === total) {
    playSynthSound('win');
  } else {
    playSynthSound('wrong');
  }
}
