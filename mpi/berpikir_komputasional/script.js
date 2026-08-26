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

  // Stop all playing videos and audios when navigating to any page
  document.querySelectorAll('video').forEach(v => {
    try {
      v.pause();
    } catch (e) {}
  });
  document.querySelectorAll('audio').forEach(a => {
    try {
      a.pause();
    } catch (e) {}
  });

  // Lazy initialize interactive modules on page entry
  if (pageId === 'materi-1') switchMateri1Tab(1);
  if (pageId === 'tarik-jawaban') initSmartHomeActivity();
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
  if (currentPage === 'materi-1') {
    const currentStepIndex = MATERI1_STEPS.findIndex(s => s.tab === currentMateri1Tab && s.step === currentMateri1Step);
    if (currentStepIndex !== -1 && currentStepIndex < MATERI1_STEPS.length - 1) {
      const nextStepInfo = MATERI1_STEPS[currentStepIndex + 1];
      if (nextStepInfo.tab !== currentMateri1Tab) {
        switchMateri1Tab(nextStepInfo.tab);
      }
      switchMateri1Step(nextStepInfo.tab, nextStepInfo.step);
    } else {
      goToPage('video');
    }
    return;
  }
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx >= 0 && idx < LINEAR_PAGES.length - 1) {
    goToPage(LINEAR_PAGES[idx + 1]);
  }
}

function navPrev() {
  if (currentPage === 'materi-1') {
    const currentStepIndex = MATERI1_STEPS.findIndex(s => s.tab === currentMateri1Tab && s.step === currentMateri1Step);
    if (currentStepIndex > 0) {
      const prevStepInfo = MATERI1_STEPS[currentStepIndex - 1];
      if (prevStepInfo.tab !== currentMateri1Tab) {
        switchMateri1Tab(prevStepInfo.tab);
      }
      switchMateri1Step(prevStepInfo.tab, prevStepInfo.step);
    } else {
      goToPage('petunjuk');
    }
    return;
  }
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx > 0) {
    goToPage(LINEAR_PAGES[idx - 1]);
  }
}

// ==================== MATERI 1 GUIDED STEPPER NAVIGATION (OPSI 2) ====================
let currentMateri1Tab = 1;
let currentMateri1Step = 1;
let activeMateriSteps = { 1: 1, 2: 1, 3: 1, 4: 1 };

const MATERI1_STEPS = [
  {
    tab: 1,
    step: 1,
    prevText: 'Petunjuk',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Penerapan di Rumah Cerdas (IoT)',
    nextSub: 'LANGKAH BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 1,
    step: 2,
    prevText: 'Konsep Dasar Dekomposisi',
    prevSub: 'LANGKAH SEBELUMNYA',
    nextText: 'Fondasi 2: Abstraksi',
    nextSub: 'FONDASI BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 2,
    step: 1,
    prevText: 'Penerapan Dekomposisi IoT',
    prevSub: 'LANGKAH SEBELUMNYA',
    nextText: 'Penerapan di Rumah Cerdas (IoT)',
    nextSub: 'LANGKAH BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 2,
    step: 2,
    prevText: 'Konsep Dasar Abstraksi',
    prevSub: 'LANGKAH SEBELUMNYA',
    nextText: 'Fondasi 3: Pengenalan Pola',
    nextSub: 'FONDASI BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 3,
    step: 1,
    prevText: 'Penerapan Abstraksi IoT',
    prevSub: 'LANGKAH SEBELUMNYA',
    nextText: 'Penerapan di Rumah Cerdas (IoT)',
    nextSub: 'LANGKAH BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 3,
    step: 2,
    prevText: 'Konsep Dasar Pengenalan Pola',
    prevSub: 'LANGKAH SEBELUMNYA',
    nextText: 'Fondasi 4: Algoritma & Logika',
    nextSub: 'FONDASI BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 4,
    step: 1,
    prevText: 'Penerapan Pengenalan Pola IoT',
    prevSub: 'LANGKAH SEBELUMNYA',
    nextText: 'Penerapan di Rumah Cerdas (IoT)',
    nextSub: 'LANGKAH BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 4,
    step: 2,
    prevText: 'Konsep Dasar Algoritma',
    prevSub: 'LANGKAH SEBELUMNYA',
    nextText: 'Video Pembelajaran 🎬',
    nextSub: 'SELESAI MATERI',
    isFinish: true
  }
];

function updateMateri1Nav() {
  const currentStepIndex = MATERI1_STEPS.findIndex(s => s.tab === currentMateri1Tab && s.step === currentMateri1Step);
  if (currentStepIndex === -1) return;

  const currentInfo = MATERI1_STEPS[currentStepIndex];

  const prevTextEl = document.getElementById('materi1-prev-text');
  const prevLabelEl = document.getElementById('materi1-prev-label');
  const nextTextEl = document.getElementById('materi1-next-text');
  const nextLabelEl = document.getElementById('materi1-next-label');

  if (prevTextEl) prevTextEl.textContent = currentInfo.prevText;
  if (prevLabelEl) {
    const sub = prevLabelEl.querySelector('.nml-sub');
    if (sub) sub.textContent = currentInfo.prevSub;
  }

  if (nextTextEl) nextTextEl.textContent = currentInfo.nextText;
  if (nextLabelEl) {
    const sub = nextLabelEl.querySelector('.nml-sub');
    if (sub) sub.textContent = currentInfo.nextSub;
    if (currentInfo.isFinish) {
      nextLabelEl.classList.add('finish');
    } else {
      nextLabelEl.classList.remove('finish');
    }
  }
}

function switchMateri1Tab(tabNum) {
  currentMateri1Tab = tabNum;
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
  // Default to step 1 on tab switch
  switchMateri1Step(tabNum, 1);
  playSynthSound('click');
}

function switchMateri1Step(tabNum, stepNum) {
  currentMateri1Tab = tabNum;
  currentMateri1Step = stepNum;
  activeMateriSteps[tabNum] = stepNum;
  for (let s = 1; s <= 2; s++) {
    const stepBtn = document.getElementById(`mstep-${tabNum}-btn-${s}`);
    const stepPanel = document.getElementById(`mstep-${tabNum}-panel-${s}`);
    if (stepBtn) {
      if (s === stepNum) stepBtn.classList.add('active');
      else stepBtn.classList.remove('active');
    }
    if (stepPanel) {
      if (s === stepNum) stepPanel.classList.add('active');
      else stepPanel.classList.remove('active');
    }
  }

  // Smooth scroll reset to top
  const box = document.getElementById('content-materi-1');
  if (box) box.scrollTop = 0;

  updateMateri1Nav();
  playSynthSound('click');
}

// Backward compatibility alias
function switchMateri1SubTab(tabNum, subTabNum) {
  switchMateri1Step(tabNum, subTabNum);
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

    if (type === 'click' || type === 'btn') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'success' || type === 'device_on' || type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'device_off' || type === 'reset') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'alarm' || type === 'error' || type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.setValueAtTime(150, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'victory' || type === 'win') {
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

// ============================================================
// AKTIVITAS: RANCANG RUMAH CERDAS (PAGE 8)
// Visual Drag & Drop Komponen Sensor + Aktuator ke Ruangan
// ============================================================

const COMPONENT_DATA = {
  'sensor-cahaya': { name: 'Sensor Cahaya', icon: '📡', type: 'sensor' },
  'sensor-suhu': { name: 'Sensor Suhu', icon: '🌡️', type: 'sensor' },
  'sensor-gerak': { name: 'Sensor Gerak', icon: '🚶', type: 'sensor' },
  'sensor-gas': { name: 'Sensor Gas', icon: '💨', type: 'sensor' },
  'lampu-led': { name: 'Lampu LED', icon: '💡', type: 'actuator' },
  'kipas-angin': { name: 'Kipas Angin', icon: '🌀', type: 'actuator' },
  'alarm-buzzer': { name: 'Alarm / Buzzer', icon: '🔔', type: 'actuator' },
  'ventilasi': { name: 'Ventilasi Otomatis', icon: '🪟', type: 'actuator' }
};

// Expected components per room:
const ROOM_CORRECT_COMPONENTS = {
  'kamar-tidur': {
    sensors: ['sensor-cahaya'],
    actuators: ['lampu-led']
  },
  'ruang-tamu': {
    sensors: ['sensor-suhu', 'sensor-gerak'],
    actuators: ['kipas-angin']
  },
  'teras': {
    sensors: ['sensor-gerak'],
    actuators: ['alarm-buzzer']
  },
  'dapur': {
    sensors: ['sensor-gas'],
    actuators: ['alarm-buzzer', 'ventilasi']
  }
};

let currentDraggedComponent = null;
let currentDraggedType = null;
let touchDraggedElement = null;

function initSmartHomeActivity() {
  const chips = document.querySelectorAll('.component-chip');
  chips.forEach(chip => {
    chip.addEventListener('dragstart', onChipDragStart);
    chip.addEventListener('dragend', onChipDragEnd);
    chip.addEventListener('touchstart', onChipTouchStart, { passive: false });
    chip.addEventListener('touchmove', onChipTouchMove, { passive: false });
    chip.addEventListener('touchend', onChipTouchEnd);
  });

  const slots = document.querySelectorAll('.room-slot');
  slots.forEach(slot => {
    slot.addEventListener('dragover', onSlotDragOver);
    slot.addEventListener('dragenter', onSlotDragEnter);
    slot.addEventListener('dragleave', onSlotDragLeave);
    slot.addEventListener('drop', onSlotDrop);
  });

  resetSmartHomeActivity();
}

function onChipDragStart(e) {
  currentDraggedComponent = e.currentTarget.dataset.component;
  currentDraggedType = e.currentTarget.dataset.type;
  e.currentTarget.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'copy';
  e.dataTransfer.setData('text/plain', currentDraggedComponent);
  playSynthSound('click');
}

function onChipDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  document.querySelectorAll('.room-slot').forEach(s => s.classList.remove('drag-over'));
  currentDraggedComponent = null;
  currentDraggedType = null;
}

function onSlotDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
}

function onSlotDragEnter(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  if (!slot.classList.contains('filled')) {
    slot.classList.add('drag-over');
  }
}

function onSlotDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function onSlotDrop(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  slot.classList.remove('drag-over');

  const compKey = currentDraggedComponent || e.dataTransfer.getData('text/plain');
  if (!compKey || !COMPONENT_DATA[compKey]) return;

  const comp = COMPONENT_DATA[compKey];
  const slotType = slot.dataset.slotType;

  // Type check: sensor to sensor slot, actuator to actuator slot
  if (comp.type !== slotType) {
    playSynthSound('error');
    return;
  }

  fillSlot(slot, compKey);
  playSynthSound('device_on');
}

// Touch event handlers for mobile/tablets
function onChipTouchStart(e) {
  const chip = e.currentTarget;
  currentDraggedComponent = chip.dataset.component;
  currentDraggedType = chip.dataset.type;
  chip.classList.add('dragging');

  touchDraggedElement = chip.cloneNode(true);
  touchDraggedElement.style.position = 'fixed';
  touchDraggedElement.style.zIndex = '1000';
  touchDraggedElement.style.opacity = '0.85';
  touchDraggedElement.style.pointerEvents = 'none';
  touchDraggedElement.style.width = chip.offsetWidth + 'px';
  document.body.appendChild(touchDraggedElement);

  const touch = e.touches[0];
  touchDraggedElement.style.left = (touch.clientX - chip.offsetWidth / 2) + 'px';
  touchDraggedElement.style.top = (touch.clientY - 25) + 'px';
  playSynthSound('click');
}

function onChipTouchMove(e) {
  if (!touchDraggedElement) return;
  e.preventDefault();
  const touch = e.touches[0];
  touchDraggedElement.style.left = (touch.clientX - touchDraggedElement.offsetWidth / 2) + 'px';
  touchDraggedElement.style.top = (touch.clientY - 25) + 'px';

  document.querySelectorAll('.room-slot').forEach(s => s.classList.remove('drag-over'));
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target) {
    const slot = target.closest('.room-slot');
    if (slot && !slot.classList.contains('filled')) {
      slot.classList.add('drag-over');
    }
  }
}

function onChipTouchEnd(e) {
  if (!touchDraggedElement) return;
  const touch = e.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);

  document.body.removeChild(touchDraggedElement);
  touchDraggedElement = null;

  document.querySelectorAll('.component-chip').forEach(c => c.classList.remove('dragging'));
  document.querySelectorAll('.room-slot').forEach(s => s.classList.remove('drag-over'));

  if (target) {
    const slot = target.closest('.room-slot');
    if (slot && currentDraggedComponent) {
      const comp = COMPONENT_DATA[currentDraggedComponent];
      if (comp && comp.type === slot.dataset.slotType) {
        fillSlot(slot, currentDraggedComponent);
        playSynthSound('device_on');
      } else {
        playSynthSound('error');
      }
    }
  }

  currentDraggedComponent = null;
  currentDraggedType = null;
}

function fillSlot(slot, compKey) {
  const comp = COMPONENT_DATA[compKey];
  slot.classList.add('filled');
  slot.dataset.assigned = compKey;
  slot.innerHTML = `
    <div class="slot-filled-chip">
      <span>${comp.icon}</span>
      <span>${comp.name}</span>
      <span class="slot-remove" onclick="clearSlot(this.closest('.room-slot'))" title="Hapus">✕</span>
    </div>
  `;
}

function clearSlot(slot) {
  if (!slot) return;
  slot.classList.remove('filled', 'wrong');
  delete slot.dataset.assigned;
  const isSensor = slot.dataset.slotType === 'sensor';
  slot.innerHTML = `<span class="slot-label">${isSensor ? '📡 Seret Sensor ke sini' : '⚡ Seret Aktuator ke sini'}</span>`;
  playSynthSound('click');
}

function resetSmartHomeActivity() {
  document.querySelectorAll('.room-slot').forEach(slot => {
    clearSlot(slot);
  });
  const scoreBox = document.getElementById('dd-score-box');
  if (scoreBox) scoreBox.style.display = 'none';
  playSynthSound('reset');
}

function checkSmartHomeActivity() {
  const rooms = document.querySelectorAll('.room-card');
  let totalSlots = 0;
  let correctCount = 0;

  rooms.forEach(room => {
    const roomKey = room.dataset.room;
    const expected = ROOM_CORRECT_COMPONENTS[roomKey];
    if (!expected) return;

    const sensorSlots = room.querySelectorAll('.room-slot[data-slot-type="sensor"]');
    const actuatorSlots = room.querySelectorAll('.room-slot[data-slot-type="actuator"]');

    // Check sensors in this room
    const assignedSensors = [];
    sensorSlots.forEach(slot => {
      totalSlots++;
      const assigned = slot.dataset.assigned;
      slot.classList.remove('wrong');
      if (assigned) assignedSensors.push({ slot, key: assigned });
    });

    const expectedSensors = [...expected.sensors];
    assignedSensors.forEach(item => {
      const idx = expectedSensors.indexOf(item.key);
      if (idx !== -1) {
        correctCount++;
        expectedSensors.splice(idx, 1);
      } else {
        item.slot.classList.add('wrong');
      }
    });

    // Check actuators in this room
    const assignedActuators = [];
    actuatorSlots.forEach(slot => {
      totalSlots++;
      const assigned = slot.dataset.assigned;
      slot.classList.remove('wrong');
      if (assigned) assignedActuators.push({ slot, key: assigned });
    });

    const expectedActuators = [...expected.actuators];
    assignedActuators.forEach(item => {
      const idx = expectedActuators.indexOf(item.key);
      if (idx !== -1) {
        correctCount++;
        expectedActuators.splice(idx, 1);
      } else {
        item.slot.classList.add('wrong');
      }
    });
  });

  const scoreBox = document.getElementById('dd-score-box');
  const badge = document.getElementById('dd-score-badge');
  const text = document.getElementById('dd-score-text');

  if (scoreBox && badge && text) {
    scoreBox.style.display = 'flex';
    badge.textContent = `Skor: ${Math.round((correctCount / totalSlots) * 100)}`;
    text.textContent = `${correctCount} dari ${totalSlots} Komponen Terpasang Tepat! ${correctCount === totalSlots ? '🎉 Sempurna!' : 'Perbaiki komponen yang bertanda merah!'}`;
  }

  if (correctCount === totalSlots) {
    playSynthSound('victory');
    spawnConfetti();
  } else {
    playSynthSound('wrong');
  }
}

// ============================================================
// PERMAINAN: TANTANGAN BERPIKIR KOMPUTASIONAL (4 TAHAP)
// 1. Dekomposisi  2. Abstraksi  3. Pengenalan Pola  4. Algoritma
// ============================================================

let ctGame = {
  currentStage: 1,
  stars: { 1: 0, 2: 0, 3: 0, 4: 0 },
  stagesInited: { 1: false, 2: false, 3: false, 4: false }
};

// Data for Stage 1: Dekomposisi
const DECOMP_ITEMS = [
  { id: 'd1', text: 'Sensor Cahaya (LDR)', icon: '📡', category: 'input' },
  { id: 'd2', text: 'Sensor Suhu', icon: '🌡️', category: 'input' },
  { id: 'd3', text: 'Sensor Gerak (PIR)', icon: '🚶', category: 'input' },
  { id: 'd4', text: 'Komputer Mini (Mikrokontroler)', icon: '🧠', category: 'proses' },
  { id: 'd5', text: 'Lampu LED Teras', icon: '💡', category: 'output' },
  { id: 'd6', text: 'Kipas Angin', icon: '🌀', category: 'output' },
  { id: 'd7', text: 'Sirine Alarm', icon: '🔔', category: 'output' }
];

// Data for Stage 2: Abstraksi
const ABSTRACTION_CARDS = [
  { id: 'a1', text: 'Tingkat Cahaya Ruangan (Lux)', icon: '☀️', important: true },
  { id: 'a2', text: 'Status Siang / Malam', icon: '🌙', important: true },
  { id: 'a3', text: 'Status Lampu (Nyala / Mati)', icon: '💡', important: true },
  { id: 'a4', text: 'Warna Cat Tembok Kamar', icon: '🎨', important: false },
  { id: 'a5', text: 'Merk & Ukuran Kasur', icon: '🛏️', important: false },
  { id: 'a6', text: 'Motif Gorden Jendela', icon: '🪟', important: false },
  { id: 'a7', text: 'Poster di Dinding', icon: '🖼️', important: false },
  { id: 'a8', text: 'Jumlah Sepatu di Rak', icon: '👟', important: false }
];

// Data for Stage 4: Algoritma
const ALGO_CHALLENGES = [
  {
    id: 'c1',
    title: '1. Lampu Otomatis (Logika Tunggal)',
    prefix: 'JIKA',
    suffix: 'MAKA',
    slots: [
      { id: 'c1-s1', expected: 'cahaya-gelap', label: 'Syarat Sensor' },
      { id: 'c1-s2', expected: 'nyalakan-lampu', label: 'Aksi Aktuator' }
    ],
    blocks: [
      { id: 'cahaya-gelap', text: 'Sensor Cahaya = Gelap' },
      { id: 'nyalakan-lampu', text: 'Nyalakan Lampu' },
      { id: 'matikan-kipas', text: 'Matikan Kipas' }
    ]
  },
  {
    id: 'c2',
    title: '2. Kipas Angin Hemat Energi (Logika Majemuk)',
    prefix: 'JIKA',
    suffix: 'MAKA',
    slots: [
      { id: 'c2-s1', expected: 'suhu-panas', label: 'Syarat 1' },
      { id: 'c2-s2', expected: 'dan-ada-orang', label: 'Syarat 2' },
      { id: 'c2-s3', expected: 'putar-kipas', label: 'Aksi' }
    ],
    blocks: [
      { id: 'suhu-panas', text: 'Suhu > 30°C' },
      { id: 'dan-ada-orang', text: 'DAN Ada Orang' },
      { id: 'putar-kipas', text: 'Putar Kipas Angin' },
      { id: 'pintu-tutup', text: 'Pintu Tertutup' }
    ]
  },
  {
    id: 'c3',
    title: '3. Alarm Keamanan (Logika Percabangan)',
    prefix: 'JIKA',
    suffix: 'MAKA',
    slots: [
      { id: 'c3-s1', expected: 'pintu-buka-tanpa-kartu', label: 'Syarat' },
      { id: 'c3-s2', expected: 'bunyikan-alarm', label: 'Aksi' },
      { id: 'c3-s3', expected: 'buka-pintu-aman', label: 'Aksi Jika Tidak' }
    ],
    blocks: [
      { id: 'pintu-buka-tanpa-kartu', text: 'Pintu Terbuka Tanpa Kartu Sah' },
      { id: 'bunyikan-alarm', text: 'Bunyikan Alarm' },
      { id: 'buka-pintu-aman', text: 'JIKA TIDAK: Buka Pintu Aman' },
      { id: 'kamera-mati', text: 'Matikan Kamera' }
    ]
  }
];

function initSmartHomeGame() {
  updateGameHUD();
  loadGameStage(ctGame.currentStage);
}

function switchGameStage(stage) {
  if (stage > 1 && ctGame.stars[stage - 1] === 0) {
    playSynthSound('error');
    showGameModal({
      icon: '🔒',
      title: 'Tahap Terkunci',
      text: `Selesaikan Tantangan Tahap ${stage - 1} terlebih dahulu untuk membuka tahap ini!`,
      type: 'warning',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
    return;
  }
  ctGame.currentStage = stage;
  updateGameHUD();
  loadGameStage(stage);
  playSynthSound('click');
}

function updateGameHUD() {
  const stage = ctGame.currentStage;
  const totalStars = Object.values(ctGame.stars).reduce((a, b) => a + b, 0);

  const starTotalEl = document.getElementById('hud-total-stars');
  if (starTotalEl) starTotalEl.textContent = `⭐ ${totalStars}/4`;

  for (let i = 1; i <= 4; i++) {
    const tab = document.getElementById(`tab-stage-${i}`);
    if (tab) {
      tab.className = 'game-tab-btn';
      if (i === stage) tab.classList.add('active');
      if (i > 1 && ctGame.stars[i - 1] === 0) {
        tab.classList.add('locked');
      } else {
        const starEl = document.getElementById(`star-stage-${i}`) || document.getElementById(`lock-stage-${i}`);
        if (starEl) {
          starEl.className = 'tab-star';
          starEl.textContent = `⭐ ${ctGame.stars[i]}/1`;
        }
      }
    }
  }

  // Update instruction callout
  const callout = document.getElementById('game-instruction-text');
  if (callout) {
    const instructions = {
      1: '<strong>Tahap 1: Dekomposisi</strong> — Seret setiap komponen ke kategori yang tepat: INPUT (Sensor), PROSES (Otak), atau OUTPUT (Aktuator)!',
      2: '<strong>Tahap 2: Abstraksi</strong> — Klik kartu untuk menentukan mana data PENTING dan mana data TIDAK PENTING untuk merancang lampu kamar otomatis!',
      3: '<strong>Tahap 3: Pengenalan Pola</strong> — Amati grafik sensor cahaya 24 jam, lalu jawab pertanyaan mengenai siklus perulangannya!',
      4: '<strong>Tahap 4: Algoritma</strong> — Susun blok-blok logika ke urutan slot yang benar untuk 3 aturan otomasi rumah cerdas!'
    };
    callout.innerHTML = `<span class="callout-icon">💡</span><span class="callout-text">${instructions[stage]}</span>`;
  }
}

function loadGameStage(stage) {
  document.querySelectorAll('.game-stage-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`game-stage-${stage}`);
  if (panel) panel.classList.add('active');

  if (stage === 1 && !ctGame.stagesInited[1]) initStage1();
  if (stage === 2 && !ctGame.stagesInited[2]) initStage2();
  if (stage === 3 && !ctGame.stagesInited[3]) initStage3();
  if (stage === 4 && !ctGame.stagesInited[4]) initStage4();
}

// ---------- STAGE 1: DEKOMPOSISI ----------
let draggedDecompItem = null;

function initStage1() {
  ctGame.stagesInited[1] = true;
  const itemsContainer = document.getElementById('decomp-items');
  const catDrops = document.querySelectorAll('.decomp-cat-drop');
  if (!itemsContainer) return;

  itemsContainer.innerHTML = '';
  catDrops.forEach(d => d.innerHTML = '');

  const shuffled = [...DECOMP_ITEMS].sort(() => Math.random() - 0.5);
  shuffled.forEach(item => {
    const el = document.createElement('div');
    el.className = 'decomp-item';
    el.draggable = true;
    el.id = `decomp-item-${item.id}`;
    el.dataset.id = item.id;
    el.dataset.category = item.category;
    el.innerHTML = `<span class="di-icon">${item.icon}</span> <span>${item.text}</span>`;

    el.addEventListener('dragstart', onDecompDragStart);
    el.addEventListener('dragend', onDecompDragEnd);
    el.addEventListener('touchstart', onDecompTouchStart, { passive: false });
    el.addEventListener('touchmove', onDecompTouchMove, { passive: false });
    el.addEventListener('touchend', onDecompTouchEnd);

    itemsContainer.appendChild(el);
  });

  document.querySelectorAll('.decomp-category').forEach(cat => {
    cat.addEventListener('dragover', (e) => e.preventDefault());
    cat.addEventListener('dragenter', (e) => {
      e.preventDefault();
      cat.classList.add('drag-over');
    });
    cat.addEventListener('dragleave', () => cat.classList.remove('drag-over'));
    cat.addEventListener('drop', (e) => {
      e.preventDefault();
      cat.classList.remove('drag-over');
      if (draggedDecompItem) {
        const dropZone = cat.querySelector('.decomp-cat-drop');
        dropZone.appendChild(draggedDecompItem);
        playSynthSound('click');
      }
    });
  });
}

function onDecompDragStart(e) {
  draggedDecompItem = e.currentTarget;
  e.currentTarget.classList.add('dragging');
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.id);
  playSynthSound('click');
}

function onDecompDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  draggedDecompItem = null;
}

let decompTouchClone = null;
let decompTouchEl = null;

function onDecompTouchStart(e) {
  decompTouchEl = e.currentTarget;
  e.preventDefault();
  decompTouchClone = decompTouchEl.cloneNode(true);
  decompTouchClone.style.position = 'fixed';
  decompTouchClone.style.zIndex = '1000';
  decompTouchClone.style.opacity = '0.85';
  decompTouchClone.style.pointerEvents = 'none';
  decompTouchClone.style.width = decompTouchEl.offsetWidth + 'px';
  document.body.appendChild(decompTouchClone);

  const touch = e.touches[0];
  decompTouchClone.style.left = (touch.clientX - decompTouchEl.offsetWidth / 2) + 'px';
  decompTouchClone.style.top = (touch.clientY - 25) + 'px';
  decompTouchEl.classList.add('dragging');
  playSynthSound('click');
}

function onDecompTouchMove(e) {
  if (!decompTouchClone) return;
  e.preventDefault();
  const touch = e.touches[0];
  decompTouchClone.style.left = (touch.clientX - decompTouchClone.offsetWidth / 2) + 'px';
  decompTouchClone.style.top = (touch.clientY - 25) + 'px';

  document.querySelectorAll('.decomp-category').forEach(c => c.classList.remove('drag-over'));
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  if (elem) {
    const cat = elem.closest('.decomp-category');
    if (cat) cat.classList.add('drag-over');
  }
}

function onDecompTouchEnd(e) {
  if (!decompTouchClone || !decompTouchEl) return;
  const touch = e.changedTouches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);

  document.body.removeChild(decompTouchClone);
  decompTouchClone = null;
  decompTouchEl.classList.remove('dragging');

  if (elem) {
    const cat = elem.closest('.decomp-category');
    if (cat) {
      const dropZone = cat.querySelector('.decomp-cat-drop');
      dropZone.appendChild(decompTouchEl);
      playSynthSound('click');
    }
  }

  document.querySelectorAll('.decomp-category').forEach(c => c.classList.remove('drag-over'));
  decompTouchEl = null;
}

function checkStage1() {
  const items = document.querySelectorAll('.decomp-cat-drop .decomp-item');
  let correct = 0;
  let total = DECOMP_ITEMS.length;

  items.forEach(el => {
    const parentCat = el.closest('.decomp-category').dataset.category;
    const itemCat = el.dataset.category;
    el.classList.remove('wrong');
    if (parentCat === itemCat) {
      correct++;
    } else {
      el.classList.add('wrong');
    }
  });

  if (correct === total) {
    ctGame.stars[1] = 1;
    updateGameHUD();
    playSynthSound('victory');
    spawnConfetti();
    showGameModal({
      icon: '🎉',
      title: 'Tahap 1 Berhasil!',
      text: 'Hebat! Kamu berhasil memecah sistem rumah cerdas ke dalam Sensor, Otak, dan Aktuator secara tepat!',
      type: 'success',
      actions: [
        { label: 'Lanjut ke Tahap 2 (Abstraksi) ▶', cls: 'btn btn-success', onClick: 'closeGameModal(); switchGameStage(2);' }
      ]
    });
  } else {
    playSynthSound('error');
    showGameModal({
      icon: '⚠️',
      title: 'Belum Tepat',
      text: `Kamu menempatkan ${correct} dari ${total} komponen dengan benar. Periksa kembali komponen yang bertanda merah!`,
      type: 'warning',
      actions: [{ label: 'Coba Lagi', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  }
}

// ---------- STAGE 2: ABSTRAKSI ----------
function initStage2() {
  ctGame.stagesInited[2] = true;
  const container = document.getElementById('abstraction-cards');
  if (!container) return;
  container.innerHTML = '';

  const shuffled = [...ABSTRACTION_CARDS].sort(() => Math.random() - 0.5);
  shuffled.forEach(card => {
    const el = document.createElement('div');
    el.className = 'abstraction-card';
    el.id = `ac-card-${card.id}`;
    el.dataset.id = card.id;
    el.dataset.important = card.important ? 'true' : 'false';
    el.dataset.state = 'none'; // 'none', 'important', 'not-important'

    el.innerHTML = `
      <span class="ac-icon">${card.icon}</span>
      <span class="ac-text">${card.text}</span>
    `;

    el.onclick = () => toggleAbstractionCard(el);
    container.appendChild(el);
  });
}

function toggleAbstractionCard(el) {
  const currentState = el.dataset.state;
  el.classList.remove('selected-important', 'selected-not-important');

  if (currentState === 'none') {
    el.dataset.state = 'important';
    el.classList.add('selected-important');
  } else if (currentState === 'important') {
    el.dataset.state = 'not-important';
    el.classList.add('selected-not-important');
  } else {
    el.dataset.state = 'none';
  }

  playSynthSound('click');
}

function checkStage2() {
  const cards = document.querySelectorAll('.abstraction-card');
  let correct = 0;
  let total = cards.length;

  cards.forEach(card => {
    const shouldBeImportant = card.dataset.important === 'true';
    const userState = card.dataset.state;
    card.classList.remove('correct-answer', 'wrong-answer');

    if ((shouldBeImportant && userState === 'important') || (!shouldBeImportant && userState === 'not-important')) {
      correct++;
      card.classList.add('correct-answer');
    } else {
      card.classList.add('wrong-answer');
    }
  });

  if (correct === total) {
    ctGame.stars[2] = 1;
    updateGameHUD();
    playSynthSound('victory');
    spawnConfetti();
    showGameModal({
      icon: '🌟',
      title: 'Tahap 2 Berhasil!',
      text: 'Luar biasa! Kamu bisa membedakan data yang penting dan mengabaikan yang tidak relevan dengan sempurna!',
      type: 'success',
      actions: [
        { label: 'Lanjut ke Tahap 3 (Pengenalan Pola) ▶', cls: 'btn btn-success', onClick: 'closeGameModal(); switchGameStage(3);' }
      ]
    });
  } else {
    playSynthSound('error');
    showGameModal({
      icon: '⚠️',
      title: 'Belum Tepat',
      text: `Kamu mengklasifikasikan ${correct} dari ${total} data dengan benar. Perbaiki kartu yang bertanda merah!`,
      type: 'warning',
      actions: [{ label: 'Coba Lagi', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  }
}

// ---------- STAGE 3: PENGENALAN POLA ----------
function initStage3() {
  ctGame.stagesInited[3] = true;
  drawPatternTimeline();
}

function drawPatternTimeline() {
  const container = document.getElementById('pattern-timeline');
  if (!container) return;

  container.innerHTML = '<canvas id="pattern-canvas" width="700" height="170"></canvas>';
  const canvas = document.getElementById('pattern-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Background
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, w, h);

  // Night/Day zones
  // 0-5.5h = Night
  const x530 = (5.5 / 24) * (w - 80) + 50;
  const x1730 = (17.5 / 24) * (w - 80) + 50;

  // Night 1
  ctx.fillStyle = 'rgba(30, 41, 59, 0.08)';
  ctx.fillRect(50, 20, x530 - 50, h - 50);

  // Day
  ctx.fillStyle = 'rgba(255, 235, 59, 0.15)';
  ctx.fillRect(x530, 20, x1730 - x530, h - 50);

  // Night 2
  ctx.fillStyle = 'rgba(30, 41, 59, 0.08)';
  ctx.fillRect(x1730, 20, w - 30 - x1730, h - 50);

  // Axes
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(50, 20);
  ctx.lineTo(50, h - 30);
  ctx.lineTo(w - 30, h - 30);
  ctx.stroke();

  // Y Labels (Lux)
  ctx.fillStyle = '#64748b';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('800 Lux (Terang)', 45, 35);
  ctx.fillText('200 Lux (Ambang)', 45, 95);
  ctx.fillText('0 Lux (Gelap)', 45, h - 35);

  // 200 Lux Threshold Line
  ctx.strokeStyle = '#ef4444';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(50, 95);
  ctx.lineTo(w - 30, 95);
  ctx.stroke();
  ctx.setLineDash([]);

  // Time Labels
  ctx.textAlign = 'center';
  const times = ['00:00', '05:30 (Fajar)', '12:00', '17:30 (Senja)', '24:00'];
  const xPos = [50, x530, (12 / 24) * (w - 80) + 50, x1730, w - 30];

  times.forEach((t, i) => {
    ctx.fillText(t, xPos[i], h - 12);
  });

  // Light curve
  ctx.strokeStyle = '#0288D1';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(50, h - 40); // 00:00 (dark)
  ctx.lineTo(x530 - 20, h - 40); // 04:30
  ctx.quadraticCurveTo(x530, h - 40, x530 + 30, 40); // sunrise curve
  ctx.lineTo(x1730 - 30, 35); // noon to afternoon
  ctx.quadraticCurveTo(x1730, 35, x1730 + 30, h - 40); // sunset curve
  ctx.lineTo(w - 30, h - 40); // midnight
  ctx.stroke();

  // Dots at key transitions
  ctx.fillStyle = '#e65100';
  ctx.beginPath();
  ctx.arc(x530, 95, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x1730, 95, 5, 0, Math.PI * 2);
  ctx.fill();
}

function checkStage3() {
  const fajar = document.getElementById('pattern-q-fajar').value;
  const senja = document.getElementById('pattern-q-senja').value;
  const berulang = document.getElementById('pattern-q-berulang').value;

  const qFajarEl = document.getElementById('pattern-q-fajar');
  const qSenjaEl = document.getElementById('pattern-q-senja');
  const qBerulangEl = document.getElementById('pattern-q-berulang');

  qFajarEl.className = 'pattern-select ' + (fajar === '05:30' ? 'correct' : 'wrong');
  qSenjaEl.className = 'pattern-select ' + (senja === '17:30' ? 'correct' : 'wrong');
  qBerulangEl.className = 'pattern-select ' + (berulang === 'ya' ? 'correct' : 'wrong');

  if (fajar === '05:30' && senja === '17:30' && berulang === 'ya') {
    ctGame.stars[3] = 1;
    updateGameHUD();
    playSynthSound('victory');
    spawnConfetti();
    showGameModal({
      icon: '📈',
      title: 'Tahap 3 Berhasil!',
      text: 'Keren! Kamu mengenali pola siklus siang-malam berulang dan waktu pergantiannya secara tepat!',
      type: 'success',
      actions: [
        { label: 'Lanjut ke Tahap 4 (Algoritma) ▶', cls: 'btn btn-success', onClick: 'closeGameModal(); switchGameStage(4);' }
      ]
    });
  } else {
    playSynthSound('error');
    showGameModal({
      icon: '⚠️',
      title: 'Jawaban Belum Tepat',
      text: 'Perhatikan grafik baik-baik pada garis putus-putus merah (200 Lux) untuk waktu fajar dan senja!',
      type: 'warning',
      actions: [{ label: 'Coba Lagi', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  }
}

// ---------- STAGE 4: ALGORITMA ----------
let draggedAlgoBlock = null;

function initStage4() {
  ctGame.stagesInited[4] = true;
  const container = document.getElementById('algo-challenges');
  if (!container) return;
  container.innerHTML = '';

  ALGO_CHALLENGES.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'algo-challenge';
    card.id = `algo-ch-${ch.id}`;

    let slotsHtml = `<span class="algo-static">${ch.prefix}</span>`;
    ch.slots.forEach(slot => {
      slotsHtml += `<div class="algo-slot" id="slot-${slot.id}" data-expected="${slot.expected}" data-label="${slot.label}">${slot.label}</div>`;
    });

    let blocksHtml = '<div class="algo-blocks">';
    const shuffledBlocks = [...ch.blocks].sort(() => Math.random() - 0.5);
    shuffledBlocks.forEach(b => {
      blocksHtml += `<div class="algo-block" id="block-${b.id}" draggable="true" data-id="${b.id}">${b.text}</div>`;
    });
    blocksHtml += '</div>';

    card.innerHTML = `
      <div class="algo-challenge-title">${ch.title}</div>
      <div class="algo-slots">${slotsHtml}</div>
      ${blocksHtml}
    `;

    container.appendChild(card);
  });

  // Attach drag and click events to all blocks and slots
  document.querySelectorAll('.algo-block').forEach(b => {
    b.addEventListener('dragstart', onAlgoDragStart);
    b.addEventListener('dragend', onAlgoDragEnd);
    b.addEventListener('touchstart', onAlgoTouchStart, { passive: false });
    b.addEventListener('touchmove', onAlgoTouchMove, { passive: false });
    b.addEventListener('touchend', onAlgoTouchEnd);
    b.addEventListener('click', onAlgoBlockClick);
  });

  document.querySelectorAll('.algo-slot').forEach(s => {
    s.addEventListener('dragover', (e) => e.preventDefault());
    s.addEventListener('dragenter', (e) => {
      e.preventDefault();
      s.classList.add('drag-over');
    });
    s.addEventListener('dragleave', () => s.classList.remove('drag-over'));
    s.addEventListener('drop', onAlgoSlotDrop);
    s.addEventListener('click', () => clearAlgoSlot(s));
  });
}

function onAlgoBlockClick(e) {
  const block = e.currentTarget;
  if (block.classList.contains('used')) return;
  const challengeCard = block.closest('.algo-challenge');
  if (!challengeCard) return;
  const emptySlot = challengeCard.querySelector('.algo-slot:not(.filled)');
  if (emptySlot) {
    fillAlgoSlot(emptySlot, block);
    playSynthSound('click');
  }
}

function onAlgoDragStart(e) {
  draggedAlgoBlock = e.currentTarget;
  e.currentTarget.classList.add('dragging');
  e.dataTransfer.setData('text/plain', e.currentTarget.dataset.id);
  playSynthSound('click');
}

function onAlgoDragEnd(e) {
  e.currentTarget.classList.remove('dragging');
  draggedAlgoBlock = null;
}

function onAlgoSlotDrop(e) {
  e.preventDefault();
  const slot = e.currentTarget;
  slot.classList.remove('drag-over');

  if (!draggedAlgoBlock) return;

  fillAlgoSlot(slot, draggedAlgoBlock);
  playSynthSound('click');
}

let algoTouchClone = null;
let algoTouchEl = null;

function onAlgoTouchStart(e) {
  algoTouchEl = e.currentTarget;
  if (algoTouchEl.classList.contains('used')) return;

  e.preventDefault();
  algoTouchClone = algoTouchEl.cloneNode(true);
  algoTouchClone.style.position = 'fixed';
  algoTouchClone.style.zIndex = '1000';
  algoTouchClone.style.opacity = '0.85';
  algoTouchClone.style.pointerEvents = 'none';
  algoTouchClone.style.width = algoTouchEl.offsetWidth + 'px';
  document.body.appendChild(algoTouchClone);

  const touch = e.touches[0];
  algoTouchClone.style.left = (touch.clientX - algoTouchEl.offsetWidth / 2) + 'px';
  algoTouchClone.style.top = (touch.clientY - 25) + 'px';
  algoTouchEl.classList.add('dragging');
  playSynthSound('click');
}

function onAlgoTouchMove(e) {
  if (!algoTouchClone) return;
  e.preventDefault();
  const touch = e.touches[0];
  algoTouchClone.style.left = (touch.clientX - algoTouchClone.offsetWidth / 2) + 'px';
  algoTouchClone.style.top = (touch.clientY - 25) + 'px';

  document.querySelectorAll('.algo-slot').forEach(s => s.classList.remove('drag-over'));
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);
  if (elem) {
    const slot = elem.closest('.algo-slot');
    if (slot) slot.classList.add('drag-over');
  }
}

function onAlgoTouchEnd(e) {
  if (!algoTouchClone || !algoTouchEl) return;
  const touch = e.changedTouches[0];
  const elem = document.elementFromPoint(touch.clientX, touch.clientY);

  document.body.removeChild(algoTouchClone);
  algoTouchClone = null;
  algoTouchEl.classList.remove('dragging');

  if (elem) {
    const slot = elem.closest('.algo-slot');
    if (slot) {
      fillAlgoSlot(slot, algoTouchEl);
      playSynthSound('click');
    }
  }

  document.querySelectorAll('.algo-slot').forEach(s => s.classList.remove('drag-over'));
  algoTouchEl = null;
}

function fillAlgoSlot(slot, block) {
  // If slot already had a block, release old block
  if (slot.dataset.assignedBlock) {
    const oldBlock = document.getElementById(`block-${slot.dataset.assignedBlock}`);
    if (oldBlock) oldBlock.classList.remove('used');
  }

  slot.classList.add('filled');
  slot.dataset.assignedBlock = block.dataset.id;
  slot.textContent = block.textContent;
  block.classList.add('used');
}

function clearAlgoSlot(slot) {
  if (!slot.classList.contains('filled')) return;
  const assignedId = slot.dataset.assignedBlock;
  if (assignedId) {
    const block = document.getElementById(`block-${assignedId}`);
    if (block) block.classList.remove('used');
  }
  slot.classList.remove('filled', 'correct', 'wrong');
  delete slot.dataset.assignedBlock;
  slot.textContent = slot.dataset.label;
  playSynthSound('click');
}

function checkStage4() {
  const slots = document.querySelectorAll('.algo-slot');
  let correct = 0;
  let total = slots.length;

  slots.forEach(slot => {
    const expected = slot.dataset.expected;
    const assigned = slot.dataset.assignedBlock;
    slot.classList.remove('correct', 'wrong');

    if (assigned === expected) {
      correct++;
      slot.classList.add('correct');
    } else {
      slot.classList.add('wrong');
    }
  });

  if (correct === total) {
    ctGame.stars[4] = 1;
    updateGameHUD();
    playSynthSound('victory');
    spawnConfetti();

    showGameModal({
      icon: '🏆',
      title: 'Selamat! Semua Tahap Selesai!',
      text: 'Luar biasa, Arsitek Rumah Cerdas! Kamu telah menguasai 4 Fondasi Berpikir Komputasional dengan bintang sempurna ⭐ 4/4!',
      type: 'success',
      actions: [
        { label: 'Lanjut ke Latihan Evaluasi ▶', cls: 'btn btn-primary', onClick: "closeGameModal(); goToPage('latihan-intro');" }
      ]
    });
  } else {
    playSynthSound('error');
    showGameModal({
      icon: '⚠️',
      title: 'Urutan Logika Belum Tepat',
      text: `Kamu menyusun ${correct} dari ${total} blok logika dengan benar. Periksa kembali blok yang bertanda merah!`,
      type: 'warning',
      actions: [{ label: 'Coba Lagi', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  }
}

// Global stage reset & check dispatchers
function resetCurrentGameStage() {
  const stage = ctGame.currentStage;
  playSynthSound('reset');
  if (stage === 1) initStage1();
  if (stage === 2) initStage2();
  if (stage === 3) {
    document.getElementById('pattern-q-fajar').value = '';
    document.getElementById('pattern-q-senja').value = '';
    document.getElementById('pattern-q-berulang').value = '';
    document.querySelectorAll('.pattern-select').forEach(s => s.className = 'pattern-select');
  }
  if (stage === 4) initStage4();
}

function checkCurrentGameStage() {
  const stage = ctGame.currentStage;
  if (stage === 1) checkStage1();
  if (stage === 2) checkStage2();
  if (stage === 3) checkStage3();
  if (stage === 4) checkStage4();
}

function showGameModal(config) {
  const modal = document.getElementById('game-modal');
  const card = document.getElementById('game-modal-card');
  if (!modal || !card) return;

  card.innerHTML = `
    <div class="gm-icon">${config.icon || 'ℹ️'}</div>
    <div class="gm-title ${config.type || ''}">${config.title || ''}</div>
    <div class="gm-text">${config.text || ''}</div>
    <div class="gm-actions" id="gm-actions-container"></div>
  `;

  const actionsContainer = card.querySelector('#gm-actions-container');
  if (config.actions && actionsContainer) {
    config.actions.forEach(a => {
      const btn = document.createElement('button');
      btn.className = a.cls || 'btn btn-primary';
      btn.textContent = a.label;
      if (typeof a.onClick === 'function') {
        btn.addEventListener('click', a.onClick);
      } else if (typeof a.onClick === 'string') {
        btn.addEventListener('click', () => {
          try {
            new Function(a.onClick)();
          } catch (err) {
            console.error('Error executing modal action:', err);
          }
        });
      }
      actionsContainer.appendChild(btn);
    });
  }

  modal.classList.add('show');
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  if (modal) modal.classList.remove('show');
}

// ============================================================
// LATIHAN EVALUASI (PAGE 13) — 18 POIN
// ============================================================

const EVAL_ANSWERS = {
  A1: 'B', A2: 'C', A3: 'B', A4: 'B', A5: 'C',
  B1: 'salah', B2: 'benar', B3: 'benar', B4: 'salah', B5: 'benar', B6: 'benar'
};

const MATCH_ANSWERS = {
  '1': 'b', '2': 'd', '3': 'a', '4': 'e', '5': 'c'
};

const MATCH_LEFT_DATA = [
  { id: '1', text: 'Sensor Cahaya' },
  { id: '2', text: 'Komputer Mini (Mikrokontroler)' },
  { id: '3', text: 'Aktuator (Relay / Penggerak)' },
  { id: '4', text: 'Logika JIKA - MAKA' },
  { id: '5', text: 'Abstraksi Data' }
];

const MATCH_RIGHT_DATA = [
  { id: 'a', text: 'Saklar otomatis yang menghubungkan listrik ke perangkat fisik' },
  { id: 'b', text: 'Membaca tingkat terang/gelap di sekitar ruangan (seperti mata)' },
  { id: 'c', text: 'Menyaring data penting yang dibutuhkan dan membuang detail non-relevan' },
  { id: 'd', text: 'Otak kecil yang memproses data dan menjalankan aturan logika' },
  { id: 'e', text: 'Aturan terstruktur untuk mengambil keputusan otomatis berdasarkan kondisi' }
];

const MATCH_PAIR_THEMES = {
  '1': { color: '#00838f', bg: '#e0f7fa', border: '#00acc1', label: '1' },
  '2': { color: '#e65100', bg: '#fff3e0', border: '#ff9800', label: '2' },
  '3': { color: '#6a1b9a', bg: '#f3e5f5', border: '#ab47bc', label: '3' },
  '4': { color: '#2e7d32', bg: '#e8f5e9', border: '#4caf50', label: '4' },
  '5': { color: '#c2185b', bg: '#fce4ec', border: '#e91e63', label: '5' }
};

const SEQ_CORRECT_ORDER = [
  'Sensor Cahaya merasakan tingkat terang/gelap di sekitar teras rumah.',
  'Data pembacaan cahaya dikirim ke komputer mini (mikrokontroler).',
  'Komputer mini mengecek aturan logika: apakah saat ini gelap?',
  'Jika gelap, komputer mini mengirim perintah "nyalakan" ke saklar otomatis (relay).',
  'Saklar otomatis menghubungkan aliran listrik ke lampu teras.',
  'Lampu teras menyala otomatis menerangi halaman rumah di malam hari.'
];

let evalUserAnswers = {};
let matchState = { selectedLeft: null, pairs: {} };
let evalSectionInited = { C: false, D: false, E: false };
let evalRuleSelected = null;
let currentShuffledRight = null;

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

function selectTF(btn) {
  const question = btn.closest('.tf-question');
  question.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('selected-benar', 'selected-salah'));
  const val = btn.dataset.val;
  if (val === 'benar') btn.classList.add('selected-benar');
  else btn.classList.add('selected-salah');
  evalUserAnswers[question.dataset.q] = val;
  playSynthSound('click');
}

// ---------- BAGIAN C: MENJODOHKAN ----------
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
    msgText = 'Luar biasa! Kamu adalah Arsitek Berpikir Komputasional sejati! 🏆';
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
