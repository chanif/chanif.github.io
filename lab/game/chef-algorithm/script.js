/* ============================================================
   Chef Algorithm — Game Engine
   SPA Navigation + 4 Level Engines + Scoring + Audio
   ============================================================ */

// ==================== GLOBAL STATE ====================
const gameState = {
  levelsCompleted: [false, false, false, false],
  levelScores: [0, 0, 0, 0],
  levelStars: [0, 0, 0, 0],
  levelAttempts: [0, 0, 0, 0],
  totalScore: 0,
  currentBadge: null,
};

let currentPage = 'cover';

// ==================== SPA NAVIGATION ====================

const PAGE_INDEX_MAP = {
  'cover': 1, 'panduan': 2, 'menu-level': 3,
  'level-1': 4, 'recap-1': 5,
  'level-2': 6, 'recap-2': 7,
  'level-3': 8, 'recap-3': 9,
  'level-4': 10, 'recap-4': 11,
  'hasil': 12, 'pengembang': 13,
};

function goToPage(pageId) {
  const oldPage = document.querySelector('.page.active');
  const newPage = document.getElementById('page-' + pageId);
  if (!newPage) return;

  if (oldPage && oldPage.id !== 'page-' + pageId) {
    oldPage.classList.remove('active');
  }
  newPage.classList.add('active');
  currentPage = pageId;

  // Scroll content to top
  const box = newPage.querySelector('.content-box');
  if (box) box.scrollTop = 0;

  updateTestingIndicator(pageId);

  // Initialize pages on entry
  if (pageId === 'menu-level') renderLevelGrid();
  if (pageId === 'level-1') initLevel1();
  if (pageId === 'level-2') initLevel2();
  if (pageId === 'level-3') initLevel3();
  if (pageId === 'level-4') initLevel4();
  if (pageId === 'hasil') renderResults();
}

function updateTestingIndicator(pageId) {
  const cfg = window.GAME_CONFIG;
  const el = document.getElementById('testing-indicator');
  if (!el) return;
  if (!cfg || cfg.is_testing !== 1) { el.style.display = 'none'; return; }
  const num = PAGE_INDEX_MAP[pageId] || '?';
  el.textContent = `Halaman ${num} / 13`;
  el.style.display = 'block';
}

// ==================== ZOOM / FONT CONTROLS ====================
let currentZoom = 1.0;
let currentFontScale = 1.0;

function setZoom(z) {
  z = Math.max(0.7, Math.min(1.3, Math.round(z * 100) / 100));
  currentZoom = z;
  document.body.style.zoom = z;
  document.getElementById('zoom-val').textContent = Math.round(z * 100) + '%';
}
function zoomIn() { setZoom(currentZoom + 0.05); }
function zoomOut() { setZoom(currentZoom - 0.05); }
function resetZoom() { setZoom(1.0); }

function setFontScale(s) {
  s = Math.max(0.7, Math.min(1.5, Math.round(s * 100) / 100));
  currentFontScale = s;
  document.documentElement.style.setProperty('--font-scale', s);
  document.getElementById('font-val').textContent = Math.round(s * 100) + '%';
}
function fontIn() { setFontScale(currentFontScale + 0.05); }
function fontOut() { setFontScale(currentFontScale - 0.05); }
function resetFont() { setFontScale(1.0); }

// ==================== AUDIO ENGINE (Web Audio API) ====================
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', volume = 0.15) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function sfxClick() { playTone(800, 0.08, 'sine', 0.1); }
function sfxSuccess() {
  playTone(523, 0.12, 'sine', 0.12);
  setTimeout(() => playTone(659, 0.12, 'sine', 0.12), 100);
  setTimeout(() => playTone(784, 0.2, 'sine', 0.15), 200);
}
function sfxError() {
  playTone(200, 0.15, 'square', 0.1);
  setTimeout(() => playTone(150, 0.25, 'square', 0.08), 120);
}
function sfxStar() {
  playTone(880, 0.1, 'sine', 0.1);
  setTimeout(() => playTone(1100, 0.15, 'sine', 0.12), 80);
  setTimeout(() => playTone(1320, 0.3, 'sine', 0.15), 160);
}
function sfxDrop() { playTone(440, 0.06, 'sine', 0.08); }
function sfxTick() { playTone(1000, 0.03, 'sine', 0.05); }
function sfxCook() {
  // Sizzle-like noise burst
  try {
    const ctx = getAudioCtx();
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.05;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch (e) {}
}

// ==================== SCORING HELPERS ====================
function calcStars(attempts) {
  if (attempts <= 1) return 3;
  if (attempts <= 2) return 2;
  return 1;
}

function calcScore(stars) {
  return stars * 83 + (stars === 3 ? 1 : 0); // 249, 166, 83 → max ~250
}

function getBadge(totalScore) {
  const cfg = window.GAME_CONFIG;
  if (!cfg) return { name: 'Chef Pemula', emoji: '👨‍🍳' };
  const badges = cfg.scoring.badges;
  let badge = badges[0];
  for (const b of badges) {
    if (totalScore >= b.minScore) badge = b;
  }
  return badge;
}

function starsHTML(earned, max = 3) {
  let html = '';
  for (let i = 0; i < max; i++) {
    html += i < earned
      ? '<span class="star-earned">⭐</span>'
      : '<span class="star-empty">☆</span>';
  }
  return html;
}

function completeLevel(levelIdx, stars) {
  const score = calcScore(stars);
  gameState.levelsCompleted[levelIdx] = true;
  gameState.levelStars[levelIdx] = Math.max(gameState.levelStars[levelIdx], stars);
  gameState.levelScores[levelIdx] = Math.max(gameState.levelScores[levelIdx], score);
  gameState.totalScore = gameState.levelScores.reduce((a, b) => a + b, 0);
  gameState.currentBadge = getBadge(gameState.totalScore);
  sfxStar();
}

// ==================== INIT ON LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.GAME_CONFIG;
  if (!cfg) return;

  // Populate cover TP list
  const tpList = document.getElementById('cover-tp-list');
  if (tpList && cfg.objectives) {
    tpList.innerHTML = cfg.objectives.map(o => `<li>${o}</li>`).join('');
  }

  // Populate tutorial grid
  const tutGrid = document.getElementById('tutorial-grid');
  if (tutGrid && cfg.tutorial) {
    tutGrid.innerHTML = cfg.tutorial.steps.map(s => `
      <div class="tutorial-card">
        <div class="tc-icon">${s.icon}</div>
        <div class="tc-title">${s.title}</div>
        <div class="tc-desc">${s.desc}</div>
      </div>
    `).join('');
  }

  updateTestingIndicator('cover');
});

// ==================== LEVEL GRID ====================
function renderLevelGrid() {
  const cfg = window.GAME_CONFIG;
  if (!cfg) return;

  const levels = [
    { key: 'level1', page: 'level-1', idx: 0 },
    { key: 'level2', page: 'level-2', idx: 1 },
    { key: 'level3', page: 'level-3', idx: 2 },
    { key: 'level4', page: 'level-4', idx: 3 },
  ];

  const grid = document.getElementById('level-grid');
  if (!grid) return;

  grid.innerHTML = levels.map((lv, i) => {
    const data = cfg[lv.key];
    const unlocked = i === 0 || gameState.levelsCompleted[i - 1];
    const completed = gameState.levelsCompleted[i];
    const stars = gameState.levelStars[i];
    const cls = completed ? 'completed unlocked' : (unlocked ? 'unlocked' : 'locked');

    return `
      <div class="level-card ${cls}" ${unlocked ? `onclick="goToPage('${lv.page}')"` : ''}>
        <div class="lc-icon">${data.icon}</div>
        <div class="lc-title">${data.title}</div>
        <div class="lc-subtitle">${data.subtitle}</div>
        <div class="lc-stars">${starsHTML(stars)}</div>
      </div>
    `;
  }).join('');

  // Progress
  const completedCount = gameState.levelsCompleted.filter(Boolean).length;
  const pct = (completedCount / 4) * 100;
  document.getElementById('progress-bar-fill').style.width = pct + '%';
  document.getElementById('progress-label').textContent = `${completedCount} / 4 level selesai`;

  const badge = getBadge(gameState.totalScore);
  document.getElementById('badge-display').innerHTML = `${badge.emoji} ${badge.name}`;
}

// ==================== LEVEL 1: DRAG & DROP + CLICK-TO-PLACE SEQUENCE ====================
let l1State = { placed: [], attempts: 0, completed: false };

function initLevel1() {
  if (l1State.completed) return;
  const cfg = window.GAME_CONFIG.level1;
  document.getElementById('l1-title').textContent = cfg.title;
  document.getElementById('l1-briefing').textContent = cfg.briefing;
  l1State = { placed: [], attempts: 0, completed: false };
  document.getElementById('l1-attempts').textContent = 'Percobaan: 0';
  renderLevel1();
}

function clickToPlaceStep(stepId) {
  const cfg = window.GAME_CONFIG.level1;
  // Cari slot kosong pertama
  for (let i = 0; i < cfg.steps.length; i++) {
    if (!l1State.placed[i]) {
      placeStep(stepId, i);
      return;
    }
  }
}

function removeStepFromSlot(slotIdx) {
  if (!l1State.placed[slotIdx]) return;
  l1State.placed[slotIdx] = null;
  sfxClick();
  renderLevel1();
}

function moveStepUp(slotIdx) {
  if (slotIdx <= 0) return;
  const temp = l1State.placed[slotIdx];
  l1State.placed[slotIdx] = l1State.placed[slotIdx - 1];
  l1State.placed[slotIdx - 1] = temp;
  sfxClick();
  renderLevel1();
}

function moveStepDown(slotIdx) {
  const cfg = window.GAME_CONFIG.level1;
  if (slotIdx >= cfg.steps.length - 1) return;
  const temp = l1State.placed[slotIdx];
  l1State.placed[slotIdx] = l1State.placed[slotIdx + 1];
  l1State.placed[slotIdx + 1] = temp;
  sfxClick();
  renderLevel1();
}

function renderLevel1() {
  const cfg = window.GAME_CONFIG.level1;
  const dragZone = document.getElementById('l1-drag-zone');
  const dropZone = document.getElementById('l1-drop-zone');

  // Available steps (not yet placed)
  const placedIds = l1State.placed.filter(Boolean).map(p => p.id);
  const available = cfg.steps.filter(s => !placedIds.includes(s.id));

  dragZone.innerHTML = available.map(s => `
    <div class="step-card" draggable="true" data-step-id="${s.id}"
         onclick="clickToPlaceStep(${s.id})"
         ontouchstart="onTouchStartCard(event)" ontouchmove="onTouchMoveCard(event)" ontouchend="onTouchEndCard(event)"
         ondragstart="onDragStartCard(event)">
      <span class="sc-emoji">${s.emoji}</span>
      <span class="sc-text">${s.text}</span>
      <span class="sc-action-hint">+ Pasang</span>
    </div>
  `).join('');

  if (available.length === 0) {
    dragZone.innerHTML = `
      <div style="margin: auto; text-align: center; color: var(--c-success); font-weight: 700; font-size: 0.85rem; padding: 12px;">
        🎉 Semua langkah sudah dipasang ke resep!
      </div>
    `;
  }

  // Drop slots (Langkah 1 to 7)
  dropZone.innerHTML = '';
  for (let i = 0; i < cfg.steps.length; i++) {
    const placed = l1State.placed[i];
    if (placed) {
      const step = cfg.steps.find(s => s.id === placed.id);
      dropZone.innerHTML += `
        <div class="drop-slot filled" data-slot="${i}" onclick="removeStepFromSlot(${i})" title="Klik untuk membatalkan">
          <div class="slot-filled-card">
            <span class="slot-num-badge">${i + 1}</span>
            <span class="sc-emoji">${step.emoji}</span>
            <span class="sc-text">${step.text}</span>
            <div class="slot-actions">
              ${i > 0 ? `<button type="button" class="slot-btn" onclick="event.stopPropagation(); moveStepUp(${i})" title="Geser Naik">▲</button>` : ''}
              ${i < cfg.steps.length - 1 ? `<button type="button" class="slot-btn" onclick="event.stopPropagation(); moveStepDown(${i})" title="Geser Turun">▼</button>` : ''}
              <button type="button" class="slot-btn remove" onclick="event.stopPropagation(); removeStepFromSlot(${i})" title="Lepas ke Baki">✕</button>
            </div>
          </div>
        </div>`;
    } else {
      dropZone.innerHTML += `
        <div class="drop-slot" data-slot="${i}"
             ondragover="onDragOverSlot(event)" ondrop="onDropSlot(event)"
             ontouchenter="onTouchEnterSlot(event)">
          <span class="slot-num-badge" style="background:#CBD5E1; color:#64748B;">${i + 1}</span>
          <span style="margin-left: 6px;">Slot Langkah ke-${i + 1} (Kosong)</span>
        </div>`;
    }
  }

  // Check button: enabled only when all 7 slots are filled
  const checkBtn = document.getElementById('l1-check-btn');
  const filledCount = l1State.placed.filter(Boolean).length;
  checkBtn.disabled = filledCount < cfg.steps.length;
}

// Drag & Drop handlers
let draggedStepId = null;
let touchClone = null;
let touchSource = null;

function onDragStartCard(e) {
  draggedStepId = e.target.closest('.step-card').dataset.stepId;
  e.target.closest('.step-card').classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
  sfxClick();
}

function onDragOverSlot(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}

function onDropSlot(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (!draggedStepId) return;
  const slotIdx = parseInt(e.currentTarget.dataset.slot);
  placeStep(parseInt(draggedStepId), slotIdx);
  draggedStepId = null;
}

// Touch support
function onTouchStartCard(e) {
  const card = e.target.closest('.step-card');
  if (!card) return;
  draggedStepId = card.dataset.stepId;
  touchSource = card;

  const rect = card.getBoundingClientRect();
  touchClone = card.cloneNode(true);
  touchClone.style.position = 'fixed';
  touchClone.style.zIndex = '10000';
  touchClone.style.width = rect.width + 'px';
  touchClone.style.opacity = '0.9';
  touchClone.style.pointerEvents = 'none';
  touchClone.style.transform = 'scale(1.05)';
  touchClone.style.boxShadow = '0 10px 25px rgba(234, 88, 12, 0.35)';
  document.body.appendChild(touchClone);

  card.classList.add('dragging');
  sfxClick();

  const touch = e.touches[0];
  touchClone.style.left = (touch.clientX - rect.width / 2) + 'px';
  touchClone.style.top = (touch.clientY - 20) + 'px';
}

function onTouchMoveCard(e) {
  e.preventDefault();
  if (!touchClone) return;
  const touch = e.touches[0];
  const rect = touchClone.getBoundingClientRect();
  touchClone.style.left = (touch.clientX - rect.width / 2) + 'px';
  touchClone.style.top = (touch.clientY - 20) + 'px';

  document.querySelectorAll('.drop-slot').forEach(s => s.classList.remove('drag-over'));
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (el) {
    const slot = el.closest('.drop-slot');
    if (slot && !slot.classList.contains('filled')) slot.classList.add('drag-over');
  }
}

function onTouchEndCard(e) {
  if (touchClone) {
    touchClone.remove();
    touchClone = null;
  }
  if (touchSource) {
    touchSource.classList.remove('dragging');
    touchSource = null;
  }

  document.querySelectorAll('.drop-slot').forEach(s => s.classList.remove('drag-over'));

  if (!draggedStepId) return;

  const touch = e.changedTouches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (el) {
    const slot = el.closest('.drop-slot');
    if (slot && !slot.classList.contains('filled')) {
      const slotIdx = parseInt(slot.dataset.slot);
      placeStep(parseInt(draggedStepId), slotIdx);
    }
  }
  draggedStepId = null;
}

function placeStep(stepId, slotIdx) {
  l1State.placed[slotIdx] = { id: stepId };
  sfxDrop();
  renderLevel1();
}

function resetLevel1() {
  l1State.placed = [];
  sfxClick();
  renderLevel1();
}

function checkLevel1() {
  const cfg = window.GAME_CONFIG.level1;
  l1State.attempts++;
  document.getElementById('l1-attempts').textContent = `Percobaan: ${l1State.attempts}`;

  const correct = cfg.steps.every((step, i) => {
    return l1State.placed[i] && l1State.placed[i].id === step.id;
  });

  const dropSlots = document.querySelectorAll('#l1-drop-zone .drop-slot');

  if (correct) {
    l1State.completed = true;
    sfxSuccess();
    sfxCook();

    dropSlots.forEach(slot => slot.classList.add('correct-answer'));

    const stars = calcStars(l1State.attempts);
    gameState.levelAttempts[0] = l1State.attempts;
    completeLevel(0, stars);

    // Populate recap
    document.getElementById('recap-1-stars').innerHTML = starsHTML(stars);
    document.getElementById('recap-1-score').textContent = `Skor: ${gameState.levelScores[0]}`;
    document.getElementById('recap-1-pseudocode').textContent = cfg.pseudoCode;
    document.getElementById('recap-1-funfact').innerHTML = cfg.funFact;
    document.getElementById('recap-1-cptp').innerHTML = `
      <span class="cptp-label">Elemen CP:</span> ${cfg.cpTp.cp}<br>
      <span class="cptp-label">Tujuan Pembelajaran:</span> ${cfg.cpTp.tp}
    `;

    setTimeout(() => goToPage('recap-1'), 900);
  } else {
    sfxError();
    // Highlight correct vs wrong
    dropSlots.forEach((slot, i) => {
      const placed = l1State.placed[i];
      if (placed && placed.id === cfg.steps[i].id) {
        slot.classList.add('correct-answer');
      } else {
        slot.classList.add('wrong-answer');
        setTimeout(() => slot.classList.remove('wrong-answer'), 800);
      }
    });
  }
}

// ==================== LEVEL 2: IF-ELSE SCENARIOS ====================
let l2State = { scenarioIdx: 0, correctCount: 0, totalAttempts: 0, completed: false };

function initLevel2() {
  if (l2State.completed) return;
  const cfg = window.GAME_CONFIG.level2;
  document.getElementById('l2-title').textContent = cfg.title;
  document.getElementById('l2-briefing').textContent = cfg.briefing;
  l2State = { scenarioIdx: 0, correctCount: 0, totalAttempts: 0, completed: false };
  renderScenario();
}

function renderScenario() {
  const cfg = window.GAME_CONFIG.level2;
  const scenario = cfg.scenarios[l2State.scenarioIdx];
  if (!scenario) return;

  document.getElementById('l2-progress').textContent = `Skenario: ${l2State.scenarioIdx + 1} / ${cfg.scenarios.length}`;
  document.getElementById('l2-action-row').style.display = 'none';

  const guestImgHTML = scenario.guestImage
    ? `<img src="${scenario.guestImage}" alt="${scenario.guestLabel}" class="l2-guest-img">`
    : `<span class="sg-emoji" style="font-size: 3rem;">${scenario.guestEmoji}</span>`;

  const area = document.getElementById('l2-scenario-area');
  area.innerHTML = `
    <div class="l2-counter-layout">
      <!-- Left: Customer Profile -->
      <div class="l2-guest-card">
        ${guestImgHTML}
        <div class="l2-guest-name">${scenario.guestLabel}</div>
        <div class="l2-guest-bubble">
          💬 "${scenario.question}"
        </div>
      </div>

      <!-- Right: Decision Logic -->
      <div class="l2-decision-card">
        <div class="l2-flow-box">
          <div class="l2-condition-label">Kondisi Keputusan Algoritma:</div>
          <div class="l2-condition-code">JIKA (${scenario.condition})</div>
        </div>

        <div class="l2-options-grid" id="l2-options">
          ${scenario.options.map(o => `
            <button type="button" class="flow-option-btn" data-option-id="${o.id}" data-correct="${o.correct}" onclick="selectOption(this)">
              <span class="fo-emoji" style="font-size: 1.5rem;">${o.emoji}</span>
              <span>${o.text}</span>
            </button>
          `).join('')}
        </div>

        <div class="scenario-feedback" id="l2-feedback"></div>
      </div>
    </div>
  `;
}

function selectOption(btn) {
  const correct = btn.dataset.correct === 'true';
  const cfg = window.GAME_CONFIG.level2;
  const scenario = cfg.scenarios[l2State.scenarioIdx];
  l2State.totalAttempts++;

  // Disable all options
  document.querySelectorAll('.flow-option-btn').forEach(b => b.classList.add('disabled'));

  const feedback = document.getElementById('l2-feedback');
  if (correct) {
    btn.classList.add('selected-correct');
    l2State.correctCount++;
    feedback.className = 'scenario-feedback show correct';
    feedback.innerHTML = `✅ ${scenario.feedback_correct}`;
    sfxSuccess();
  } else {
    btn.classList.add('selected-wrong');
    feedback.className = 'scenario-feedback show wrong';
    feedback.innerHTML = `❌ ${scenario.feedback_wrong}`;

    // Show correct answer
    document.querySelectorAll('.flow-option-btn').forEach(b => {
      if (b.dataset.correct === 'true') {
        b.classList.add('selected-correct');
      }
    });
    sfxError();
  }

  // Show next button
  const actionRow = document.getElementById('l2-action-row');
  actionRow.style.display = 'flex';

  const nextBtn = document.getElementById('l2-next-btn');
  if (l2State.scenarioIdx >= cfg.scenarios.length - 1) {
    nextBtn.textContent = '🏁 Lihat Hasil';
    nextBtn.onclick = () => finishLevel2();
  } else {
    nextBtn.textContent = '▶ Skenario Berikutnya';
    nextBtn.onclick = () => nextScenario();
  }
}

function nextScenario() {
  l2State.scenarioIdx++;
  renderScenario();
  sfxClick();
}

function finishLevel2() {
  l2State.completed = true;
  const cfg = window.GAME_CONFIG.level2;
  const pct = l2State.correctCount / cfg.scenarios.length;
  const stars = pct >= 1 ? 3 : (pct >= 0.66 ? 2 : 1);
  gameState.levelAttempts[1] = l2State.totalAttempts;
  completeLevel(1, stars);

  // Combine all pseudo-codes
  const allPseudo = cfg.scenarios.map(s => s.pseudoCode).join('\n\n');
  document.getElementById('recap-2-stars').innerHTML = starsHTML(stars);
  document.getElementById('recap-2-score').textContent = `Skor: ${gameState.levelScores[1]} (${l2State.correctCount}/${cfg.scenarios.length} benar)`;
  document.getElementById('recap-2-pseudocode').textContent = allPseudo;
  document.getElementById('recap-2-funfact').innerHTML = cfg.funFact;
  document.getElementById('recap-2-cptp').innerHTML = `
    <span class="cptp-label">Elemen CP:</span> ${cfg.cpTp.cp}<br>
    <span class="cptp-label">Tujuan Pembelajaran:</span> ${cfg.cpTp.tp}
  `;

  goToPage('recap-2');
}

// ==================== LEVEL 3: LOOP BUILDER ====================
let l3State = { selectedCount: 10, running: false, completed: false };

function initLevel3() {
  if (l3State.completed) return;
  const cfg = window.GAME_CONFIG.level3;
  document.getElementById('l3-title').textContent = cfg.title;
  document.getElementById('l3-briefing').textContent = cfg.briefing;
  l3State = { selectedCount: cfg.defaultCount, running: false, completed: false };

  // Count selector
  const selector = document.getElementById('l3-count-selector');
  selector.innerHTML = cfg.countOptions.map(n => `
    <button class="loop-count-btn ${n === l3State.selectedCount ? 'active' : ''}" data-count="${n}" onclick="selectLoopCount(${n})">
      ${n}
    </button>
  `).join('');

  renderLoopManual();
  renderLoopCode();

  document.getElementById('l3-animation').style.display = 'none';
  document.getElementById('l3-savings').style.display = 'none';
  document.getElementById('l3-run-btn').disabled = false;
}

function selectLoopCount(n) {
  l3State.selectedCount = n;
  document.querySelectorAll('.loop-count-btn').forEach(b => {
    b.classList.toggle('active', parseInt(b.dataset.count) === n);
  });
  renderLoopManual();
  renderLoopCode();
  sfxClick();
}

function renderLoopManual() {
  const cfg = window.GAME_CONFIG.level3;
  const list = document.getElementById('l3-manual-list');
  let lines = [];
  for (let p = 1; p <= l3State.selectedCount; p++) {
    lines.push(`<div class="recipe-line highlight">// Porsi ${p}:</div>`);
    cfg.recipe.forEach(r => {
      lines.push(`<div class="recipe-line">  ${r}</div>`);
    });
  }
  list.innerHTML = lines.join('');
}

function renderLoopCode() {
  const preview = document.getElementById('l3-code-preview');
  preview.textContent = `ULANGI ${l3State.selectedCount} KALI\n  masak(nasi_goreng)\n  sajikan()`;
}

function runLoop() {
  if (l3State.running) return;
  l3State.running = true;
  document.getElementById('l3-run-btn').disabled = true;

  const total = l3State.selectedCount;
  const animEl = document.getElementById('l3-animation');
  const counterEl = document.getElementById('l3-counter');
  const fillEl = document.getElementById('l3-progress-fill');
  animEl.style.display = 'block';

  let current = 0;
  const interval = setInterval(() => {
    current++;
    counterEl.textContent = `Porsi ${current} / ${total}`;
    fillEl.style.width = (current / total * 100) + '%';
    sfxCook();

    // Highlight the corresponding manual line
    const lines = document.querySelectorAll('#l3-manual-list .recipe-line.highlight');
    lines.forEach(l => l.style.background = 'transparent');
    if (lines[current - 1]) {
      lines[current - 1].style.background = 'rgba(255,107,53,0.15)';
      lines[current - 1].scrollIntoView({ block: 'nearest' });
    }

    if (current >= total) {
      clearInterval(interval);
      finishLevel3();
    }
  }, 300);
}

function finishLevel3() {
  l3State.completed = true;
  sfxSuccess();

  const cfg = window.GAME_CONFIG.level3;
  const total = l3State.selectedCount;
  const manualLines = total * cfg.recipe.length;
  const loopLines = 3;
  const saved = manualLines - loopLines;

  // Show savings
  const savingsEl = document.getElementById('l3-savings');
  savingsEl.style.display = 'flex';
  document.getElementById('l3-lines-manual').textContent = manualLines;
  document.getElementById('l3-lines-loop').textContent = loopLines;
  document.getElementById('l3-lines-saved').textContent = saved;

  const stars = 3; // Loop is exploratory, always 3 stars
  completeLevel(2, stars);

  // Populate recap
  document.getElementById('recap-3-stars').innerHTML = starsHTML(stars);
  document.getElementById('recap-3-score').textContent = `Skor: ${gameState.levelScores[2]}`;
  document.getElementById('recap-3-pseudocode').textContent = cfg.pseudoCode;
  document.getElementById('recap-3-funfact').innerHTML = cfg.funFact;
  document.getElementById('recap-3-cptp').innerHTML = `
    <span class="cptp-label">Elemen CP:</span> ${cfg.cpTp.cp}<br>
    <span class="cptp-label">Tujuan Pembelajaran:</span> ${cfg.cpTp.tp}
  `;

  // Auto navigate after a delay
  setTimeout(() => goToPage('recap-3'), 1500);
}

// ==================== LEVEL 4: DECOMPOSITION + TIMER ====================
let l4State = { assignments: {}, timerInterval: null, timeLeft: 45, running: false, completed: false };

function initLevel4() {
  if (l4State.completed) return;
  const cfg = window.GAME_CONFIG.level4;
  document.getElementById('l4-title').textContent = cfg.title;
  document.getElementById('l4-briefing').textContent = cfg.briefing;
  l4State = { assignments: {}, timerInterval: null, timeLeft: cfg.timerSeconds, running: false, completed: false };

  // Init assignments map: assistantId -> [taskIds]
  cfg.assistants.forEach(a => l4State.assignments[a.id] = []);

  document.getElementById('l4-timer-section').style.display = 'none';
  document.getElementById('l4-parallel-anim').style.display = 'none';

  renderLevel4Tasks();
  renderLevel4Assistants();
  updateLevel4StartBtn();
}

function clickToAssignTask(taskId) {
  const cfg = window.GAME_CONFIG.level4;
  const task = cfg.tasks.find(t => t.id === taskId);
  if (!task) return;

  // Prioritaskan asisten yang cocok dengan jenis menu masakan
  let targetAssistantId = null;
  if (task.menu === 'nasi-goreng') targetAssistantId = 'chef-a';
  else if (task.menu === 'soto-ayam') targetAssistantId = 'chef-b';
  else if (task.menu === 'es-jeruk') targetAssistantId = 'chef-c';

  // Jika asisten yang cocok sudah penuh (2 tugas), cari asisten lain yang masih kosong
  if (l4State.assignments[targetAssistantId] && l4State.assignments[targetAssistantId].length >= 2) {
    const freeAssistant = cfg.assistants.find(a => (l4State.assignments[a.id] || []).length < 2);
    if (freeAssistant) targetAssistantId = freeAssistant.id;
  }

  if (targetAssistantId) {
    assignTask(taskId, targetAssistantId);
  }
}

function unassignTask(taskId, assistantId) {
  if (!l4State.assignments[assistantId]) return;
  l4State.assignments[assistantId] = l4State.assignments[assistantId].filter(id => id !== taskId);
  sfxClick();
  renderLevel4Tasks();
  renderLevel4Assistants();
  updateLevel4StartBtn();
}

function renderLevel4Tasks() {
  const cfg = window.GAME_CONFIG.level4;
  const pool = document.getElementById('l4-task-pool');
  const assignedIds = Object.values(l4State.assignments).flat();
  const available = cfg.tasks.filter(t => !assignedIds.includes(t.id));

  pool.innerHTML = available.map(t => `
    <div class="task-chip" draggable="true" data-task-id="${t.id}"
         onclick="clickToAssignTask('${t.id}')"
         ondragstart="onDragStartTask(event)"
         ontouchstart="onTouchStartTask(event)" ontouchmove="onTouchMoveTask(event)" ontouchend="onTouchEndTask(event)">
      <span class="tc-emoji">${t.emoji}</span>
      <span class="tc-text">${t.text}</span>
      <span class="sc-action-hint">+ Tugaskan</span>
    </div>
  `).join('');

  if (available.length === 0) {
    pool.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; color: var(--c-success); font-weight: 700; font-size: 0.85rem; padding: 6px;">
        🎉 Semua 6 tugas sudah dibagikan ke 3 asisten! Tekan tombol "Mulai Memasak Bersamaan" di bawah.
      </div>
    `;
  }
}

function renderLevel4Assistants() {
  const cfg = window.GAME_CONFIG.level4;
  const container = document.getElementById('l4-assistants');
  container.innerHTML = cfg.assistants.map(a => {
    const tasks = l4State.assignments[a.id] || [];
    const taskHTML = tasks.map(tid => {
      const t = cfg.tasks.find(x => x.id === tid);
      return `
        <div class="task-chip assigned">
          <span class="tc-emoji">${t.emoji}</span>
          <span class="tc-text" style="flex:1;">${t.text}</span>
          <button type="button" class="tc-remove" onclick="event.stopPropagation(); unassignTask('${t.id}', '${a.id}')" title="Kembalikan ke Baki">✕</button>
        </div>`;
    }).join('');

    const avatarHTML = a.image
      ? `<img src="${a.image}" alt="${a.name}" class="ac-avatar">`
      : `<span class="ac-emoji" style="font-size: 2rem;">${a.emoji}</span>`;

    return `
      <div class="assistant-card" data-assistant-id="${a.id}"
           ondragover="onDragOverAssistant(event)" ondrop="onDropAssistant(event)">
        <div class="ac-header">
          ${avatarHTML}
          <div class="ac-info">
            <h4 style="color:${a.color};">${a.name}</h4>
            <div class="ac-station">${a.station || 'Stasiun Dapur'}</div>
          </div>
        </div>
        <div class="ac-drop-area" data-assistant-id="${a.id}">
          ${tasks.length ? taskHTML : '<div class="ac-placeholder">Klik / Seret 2 tugas ke sini</div>'}
        </div>
      </div>
    `;
  }).join('');
}

// Drag for Level 4
let draggedTaskId = null;

function onDragStartTask(e) {
  draggedTaskId = e.target.closest('.task-chip').dataset.taskId;
  e.target.closest('.task-chip').classList.add('dragging');
  sfxClick();
}

function onDragOverAssistant(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
}

function onDropAssistant(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (!draggedTaskId) return;
  const assistantId = e.currentTarget.dataset.assistantId || e.currentTarget.closest('.assistant-card').dataset.assistantId;
  assignTask(draggedTaskId, assistantId);
  draggedTaskId = null;
}

function assignTask(taskId, assistantId) {
  if (!l4State.assignments[assistantId]) return;
  // Maksimal 2 tugas per asisten (6 tugas dibagi rata ke 3 asisten)
  if (l4State.assignments[assistantId].length >= 2) return;
  // Jangan duplikat
  if (l4State.assignments[assistantId].includes(taskId)) return;
  l4State.assignments[assistantId].push(taskId);
  sfxDrop();
  renderLevel4Tasks();
  renderLevel4Assistants();
  updateLevel4StartBtn();
}

// Touch for Level 4
let touchClone4 = null;
let touchSource4 = null;

function onTouchStartTask(e) {
  const chip = e.target.closest('.task-chip');
  if (!chip) return;
  draggedTaskId = chip.dataset.taskId;
  touchSource4 = chip;

  const rect = chip.getBoundingClientRect();
  touchClone4 = chip.cloneNode(true);
  touchClone4.style.position = 'fixed';
  touchClone4.style.zIndex = '10000';
  touchClone4.style.width = rect.width + 'px';
  touchClone4.style.opacity = '0.85';
  touchClone4.style.pointerEvents = 'none';
  document.body.appendChild(touchClone4);
  chip.classList.add('dragging');
  sfxClick();

  const touch = e.touches[0];
  touchClone4.style.left = (touch.clientX - rect.width / 2) + 'px';
  touchClone4.style.top = (touch.clientY - 20) + 'px';
}

function onTouchMoveTask(e) {
  e.preventDefault();
  if (!touchClone4) return;
  const touch = e.touches[0];
  const rect = touchClone4.getBoundingClientRect();
  touchClone4.style.left = (touch.clientX - rect.width / 2) + 'px';
  touchClone4.style.top = (touch.clientY - 20) + 'px';

  document.querySelectorAll('.assistant-card').forEach(c => c.classList.remove('drag-over'));
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (el) {
    const card = el.closest('.assistant-card');
    if (card) card.classList.add('drag-over');
  }
}

function onTouchEndTask(e) {
  if (touchClone4) { touchClone4.remove(); touchClone4 = null; }
  if (touchSource4) { touchSource4.classList.remove('dragging'); touchSource4 = null; }
  document.querySelectorAll('.assistant-card').forEach(c => c.classList.remove('drag-over'));

  if (!draggedTaskId) return;
  const touch = e.changedTouches[0];
  const el = document.elementFromPoint(touch.clientX, touch.clientY);
  if (el) {
    const card = el.closest('.assistant-card');
    if (card) {
      assignTask(draggedTaskId, card.dataset.assistantId);
    }
  }
  draggedTaskId = null;
}

function assignTask(taskId, assistantId) {
  if (!l4State.assignments[assistantId]) return;
  // Check max 2 tasks per assistant
  if (l4State.assignments[assistantId].length >= 3) return;
  // Check not already assigned
  if (l4State.assignments[assistantId].includes(taskId)) return;
  l4State.assignments[assistantId].push(taskId);
  sfxDrop();
  renderLevel4Tasks();
  renderLevel4Assistants();
  updateLevel4StartBtn();
}

function updateLevel4StartBtn() {
  const cfg = window.GAME_CONFIG.level4;
  const totalAssigned = Object.values(l4State.assignments).flat().length;
  const btn = document.getElementById('l4-start-btn');
  btn.disabled = totalAssigned < cfg.tasks.length;
}

function resetLevel4() {
  const cfg = window.GAME_CONFIG.level4;
  if (l4State.timerInterval) clearInterval(l4State.timerInterval);
  l4State.assignments = {};
  cfg.assistants.forEach(a => l4State.assignments[a.id] = []);
  l4State.timeLeft = cfg.timerSeconds;
  l4State.running = false;

  document.getElementById('l4-timer-section').style.display = 'none';
  document.getElementById('l4-parallel-anim').style.display = 'none';
  document.getElementById('l4-start-btn').textContent = '⚡ Mulai Memasak!';

  renderLevel4Tasks();
  renderLevel4Assistants();
  updateLevel4StartBtn();
}

function startLevel4Timer() {
  if (l4State.running) return;
  l4State.running = true;

  const cfg = window.GAME_CONFIG.level4;
  const timerSection = document.getElementById('l4-timer-section');
  const timerDisplay = document.getElementById('l4-timer');
  const timerFill = document.getElementById('l4-timer-fill');
  const parallelAnim = document.getElementById('l4-parallel-anim');
  const decompLayout = document.getElementById('l4-decomp-layout');

  timerSection.style.display = 'block';
  document.getElementById('l4-start-btn').disabled = true;

  // Show parallel animation, hide decomp
  decompLayout.style.display = 'none';

  // Build parallel tracks
  parallelAnim.style.display = 'flex';
  parallelAnim.innerHTML = cfg.assistants.map(a => {
    const tasks = l4State.assignments[a.id] || [];
    const taskNames = tasks.map(tid => cfg.tasks.find(t => t.id === tid)).map(t => t.text).join(', ');
    return `
      <div class="parallel-track">
        <div class="pt-emoji">${a.emoji}</div>
        <div class="pt-name" style="color:${a.color}">${a.name}</div>
        <div class="pt-task">${taskNames || '(kosong)'}</div>
        <div class="pt-bar">
          <div class="pt-bar-fill" style="width:0%; background:${a.color};" id="pt-fill-${a.id}"></div>
        </div>
      </div>
    `;
  }).join('');

  // Animate parallel work
  const totalDuration = cfg.timerSeconds * 1000;
  const workDuration = Math.min(totalDuration * 0.6, 8000); // work finishes in ~60% of time
  const startTime = Date.now();

  const workInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.min(100, (elapsed / workDuration) * 100);
    cfg.assistants.forEach(a => {
      const fill = document.getElementById('pt-fill-' + a.id);
      if (fill) fill.style.width = pct + '%';
    });
    if (pct >= 100) {
      clearInterval(workInterval);
      sfxCook();
    }
  }, 100);

  // Timer countdown
  l4State.timeLeft = cfg.timerSeconds;
  timerDisplay.textContent = formatTime(l4State.timeLeft);
  timerFill.style.width = '100%';

  l4State.timerInterval = setInterval(() => {
    l4State.timeLeft--;
    timerDisplay.textContent = formatTime(l4State.timeLeft);
    timerFill.style.width = (l4State.timeLeft / cfg.timerSeconds * 100) + '%';

    if (l4State.timeLeft <= 10) timerDisplay.classList.add('danger');
    if (l4State.timeLeft % 5 === 0) sfxTick();

    if (l4State.timeLeft <= 0) {
      clearInterval(l4State.timerInterval);
      finishLevel4(false);
    }
  }, 1000);

  // Auto complete when work finishes
  setTimeout(() => {
    if (!l4State.completed && l4State.running) {
      clearInterval(l4State.timerInterval);
      finishLevel4(true);
    }
  }, workDuration + 500);
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function finishLevel4(success) {
  l4State.completed = true;
  l4State.running = false;
  if (l4State.timerInterval) clearInterval(l4State.timerInterval);

  const cfg = window.GAME_CONFIG.level4;

  let stars;
  if (!success) {
    stars = 1;
  } else {
    const remaining = l4State.timeLeft;
    const pct = remaining / cfg.timerSeconds;
    stars = pct > 0.5 ? 3 : (pct > 0.2 ? 2 : 1);
  }

  completeLevel(3, stars);

  // Populate recap
  document.getElementById('recap-4-stars').innerHTML = starsHTML(stars);
  document.getElementById('recap-4-score').textContent = `Skor: ${gameState.levelScores[3]}`;
  document.getElementById('recap-4-pseudocode').textContent = cfg.pseudoCode;
  document.getElementById('recap-4-funfact').innerHTML = cfg.funFact;
  document.getElementById('recap-4-cptp').innerHTML = `
    <span class="cptp-label">Elemen CP:</span> ${cfg.cpTp.cp}<br>
    <span class="cptp-label">Tujuan Pembelajaran:</span> ${cfg.cpTp.tp}
  `;

  setTimeout(() => goToPage('recap-4'), 1500);
}

// ==================== RESULTS PAGE ====================
function renderResults() {
  const cfg = window.GAME_CONFIG;
  const badge = getBadge(gameState.totalScore);

  const emojiEl = document.getElementById('results-badge-emoji');
  if (emojiEl) emojiEl.textContent = badge.emoji;

  const nameEl = document.getElementById('results-badge-name');
  if (nameEl) nameEl.textContent = `${badge.emoji} ${badge.name}`;

  const scoreEl = document.getElementById('results-total-score');
  if (scoreEl) scoreEl.textContent = gameState.totalScore;

  const levels = [
    { key: 'level1', idx: 0 },
    { key: 'level2', idx: 1 },
    { key: 'level3', idx: 2 },
    { key: 'level4', idx: 3 },
  ];

  const grid = document.getElementById('results-levels');
  if (grid) {
    grid.innerHTML = levels.map(lv => {
      const data = cfg[lv.key];
      const stars = gameState.levelStars[lv.idx];
      const score = gameState.levelScores[lv.idx];
      return `
        <div class="rl-card">
          <div class="rl-title">${data.icon} ${data.title}</div>
          <div class="rl-stars">${starsHTML(stars)}</div>
          <div class="rl-score">Skor: ${score}</div>
        </div>
      `;
    }).join('');
  }
}
