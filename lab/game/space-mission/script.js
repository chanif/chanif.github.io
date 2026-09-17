/* ============================================================
   Space Mission: Command Center — Game Engine
   SPA Navigation | Starfield | 4 Mission Engines | Audio | Scoring
   ============================================================ */

// ===================== GLOBAL STATE =====================
const gameState = {
  missionCompleted: [false, false, false, false],
  missionScores:    [0, 0, 0, 0],
  missionStars:     [0, 0, 0, 0],
  totalScore: 0,
  currentMission: 0,
  lastResultPage: '',
};

let currentPage = 'cover';

// ===================== SPA NAVIGATION =====================
function goToPage(pageId) {
  const oldEl = document.querySelector('.page.active');
  const newEl = document.getElementById('page-' + pageId);
  if (!newEl || oldEl === newEl) return;

  if (oldEl) oldEl.classList.remove('active', 'slide-in');
  newEl.classList.add('active', 'slide-in');
  currentPage = pageId;

  // Initialize on entry
  if (pageId === 'mission-select') renderMissionSelect();
  if (pageId === 'mission-1') initMission1();
  if (pageId === 'mission-2') initMission2();
  if (pageId === 'mission-3') initMission3();
  if (pageId === 'mission-4') initMission4();
  if (pageId === 'complete')  renderComplete();
}

function startMission(n) {
  const node = document.getElementById('mission-node-' + n);
  if (node && node.classList.contains('locked')) {
    playTone(200, 0.15, 'square', 0.1);
    node.style.animation = 'none';
    setTimeout(() => { node.style.animation = ''; }, 10);
    return;
  }
  goToPage('mission-' + n);
}

// ===================== STARFIELD =====================
function initStarfield() {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];
  for (let i = 0; i < 280; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Base gradient
    const grad = ctx.createRadialGradient(canvas.width*0.3, canvas.height*0.3, 0, canvas.width*0.5, canvas.height*0.5, canvas.width*0.8);
    grad.addColorStop(0, '#0A1628');
    grad.addColorStop(0.5, '#060C18');
    grad.addColorStop(1, '#030608');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Nebula glow
    const neb = ctx.createRadialGradient(canvas.width*0.15, canvas.height*0.25, 0, canvas.width*0.15, canvas.height*0.25, canvas.width*0.3);
    neb.addColorStop(0, 'rgba(124,58,237,0.06)');
    neb.addColorStop(1, 'transparent');
    ctx.fillStyle = neb;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const neb2 = ctx.createRadialGradient(canvas.width*0.85, canvas.height*0.7, 0, canvas.width*0.85, canvas.height*0.7, canvas.width*0.25);
    neb2.addColorStop(0, 'rgba(0,100,180,0.07)');
    neb2.addColorStop(1, 'transparent');
    ctx.fillStyle = neb2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars
    stars.forEach(s => {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 1) s.twinkleDir = -1;
      if (s.alpha <= 0.15) s.twinkleDir = 1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,230,255,${s.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();

  window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===================== AUDIO (Web Audio API) =====================
let audioCtx = null;
function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq, dur, type='sine', vol=0.12) {
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type; osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start(); osc.stop(ctx.currentTime + dur);
  } catch(e) {}
}
function sfxBeep()    { playTone(880, 0.1, 'square', 0.08); }
function sfxSuccess() { [523,659,784,1046].forEach((f,i) => setTimeout(()=>playTone(f,0.18,'sine',0.1), i*80)); }
function sfxFail()    { [300,250,200].forEach((f,i) => setTimeout(()=>playTone(f,0.2,'sawtooth',0.09), i*80)); }
function sfxClick()   { playTone(660, 0.06, 'sine', 0.07); }
function sfxAlarm()   { [440,220,440,220].forEach((f,i) => setTimeout(()=>playTone(f,0.15,'square',0.08), i*100)); }

// ===================== CONFETTI =====================
function spawnConfetti() {
  const colors = ['#00D4FF','#F59E0B','#7C3AED','#10B981','#EF4444','#F97316'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-particle';
      el.style.cssText = `left:${Math.random()*100}vw;background:${colors[Math.floor(Math.random()*colors.length)]};width:${Math.random()*10+5}px;height:${Math.random()*10+5}px;animation-duration:${Math.random()*2+1.5}s;animation-delay:0s;border-radius:${Math.random()>0.5?'50%':'2px'}`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }, i * 35);
  }
}

// ===================== RESULT OVERLAY =====================
let resultNextPage = '';
let resultRetryMission = 0;

function showResult(opts) {
  // opts: { success, icon, title, stars, score, sub, nextPage, retryMission }
  const overlay = document.getElementById('result-overlay');
  const card    = document.getElementById('result-card');
  document.getElementById('result-icon').textContent  = opts.icon;
  document.getElementById('result-title').textContent = opts.title;
  document.getElementById('result-stars').textContent = starsToEmoji(opts.stars);
  document.getElementById('result-score').textContent = `+${opts.score} pts`;
  document.getElementById('result-sub').innerHTML     = opts.sub || '';
  card.className = 'result-card ' + (opts.success ? 'success' : 'fail');
  overlay.classList.add('show');
  resultNextPage = opts.nextPage;
  resultRetryMission = opts.retryMission;
  if (opts.success) { sfxSuccess(); spawnConfetti(); }
  else { sfxFail(); }
}
function hideResult() {
  document.getElementById('result-overlay').classList.remove('show');
}
function proceedFromResult() {
  hideResult();
  if (resultNextPage) goToPage(resultNextPage);
}
function retryCurrentMission() {
  hideResult();
  if (resultRetryMission) goToPage('mission-' + resultRetryMission);
}

// ===================== SCORING =====================
function starsToEmoji(n) {
  return '⭐'.repeat(n) + '☆'.repeat(3 - n);
}
function calcStars(attempts) {
  if (attempts <= 1) return 3;
  if (attempts <= 2) return 2;
  return 1;
}
function calcScore(stars, base=300) {
  return base === 300 ? [300, 200, 100][3 - stars] : Math.round(base * (stars / 3));
}
function updateHudStars(hudId, stars) {
  const el = document.getElementById(hudId);
  if (el) el.textContent = starsToEmoji(stars);
}
function updateHudScore(hudId, score) {
  const el = document.getElementById(hudId);
  if (el) el.textContent = score;
}

function saveMissionResult(missionIndex, stars, score) {
  gameState.missionCompleted[missionIndex] = true;
  gameState.missionStars[missionIndex]     = stars;
  gameState.missionScores[missionIndex]    = score;
  gameState.totalScore = gameState.missionScores.reduce((a,b) => a+b, 0);
}

function getCurrentBadge() {
  const total = gameState.missionStars.reduce((a,b) => a+b, 0);
  const badges = GAME_CONFIG.badges;
  let badge = badges[0];
  for (const b of badges) { if (total >= b.min_stars) badge = b; }
  return badge;
}

// ===================== INIT COVER & BRIEFING =====================
function initCover() {
  const cfg = GAME_CONFIG;
  document.getElementById('cover-creator').textContent =
    `Kreator: ${cfg.creator} — ${cfg.school} · ${cfg.event}`;
  const list = document.getElementById('cover-tp-list');
  list.innerHTML = cfg.learning_objectives.map(o => `<li>${o}</li>`).join('');

  const cards = document.getElementById('briefing-cards');
  cards.innerHTML = cfg.briefing_cards.map(c => `
    <div class="briefing-card">
      <div class="briefing-card-icon">${c.icon}</div>
      <div class="briefing-card-title">${c.title}</div>
      <div class="briefing-card-desc">${c.desc}</div>
    </div>`).join('');
}

// ===================== MISSION SELECT =====================
function renderMissionSelect() {
  // Update node states
  for (let i = 1; i <= 4; i++) {
    const node = document.getElementById('mission-node-' + i);
    const starsEl = document.getElementById('node-stars-' + i);
    const completed = gameState.missionCompleted[i-1];
    const unlocked  = i === 1 || gameState.missionCompleted[i-2];

    node.classList.remove('locked','unlocked','completed');
    if (!unlocked) {
      node.classList.add('locked');
    } else {
      node.classList.add('unlocked');
      if (completed) node.classList.add('completed');
    }

    starsEl.textContent = completed ? starsToEmoji(gameState.missionStars[i-1]) : '';
  }

  // Progress bar
  const done = gameState.missionCompleted.filter(Boolean).length;
  document.getElementById('overall-progress-fill').style.width = (done / 4 * 100) + '%';
  document.getElementById('overall-progress-label').textContent = `${done} / 4 misi selesai`;
  const badge = getCurrentBadge();
  document.getElementById('current-badge-chip').textContent = badge.label;
  document.getElementById('current-badge-chip').style.color = badge.color;
  document.getElementById('current-badge-chip').style.borderColor = badge.color;
}

// ===================== RECAP RENDERER =====================
function renderRecap(missionNum) {
  const cfgMap = [GAME_CONFIG.mission1, GAME_CONFIG.mission2, GAME_CONFIG.mission3, GAME_CONFIG.mission4];
  const cfg = cfgMap[missionNum - 1];
  const stars = gameState.missionStars[missionNum - 1];
  const score = gameState.missionScores[missionNum - 1];

  document.getElementById(`recap-${missionNum}-stars`).innerHTML = starsToEmoji(stars);
  document.getElementById(`recap-${missionNum}-score`).textContent = `Skor Misi: ${score} pts`;
  document.getElementById(`recap-${missionNum}-code`).textContent = cfg.pseudocode;
  document.getElementById(`recap-${missionNum}-funfact`).innerHTML = cfg.funfact;
  document.getElementById(`recap-${missionNum}-cptp`).innerHTML = cfg.cp_tp;
}

// ===================== COMPLETE PAGE =====================
function renderComplete() {
  const badge = getCurrentBadge();
  document.getElementById('complete-badge-name').textContent = badge.label;
  document.getElementById('complete-badge-name').style.color = badge.color;
  document.getElementById('complete-total-score').textContent = gameState.totalScore;

  const grid = document.getElementById('complete-levels-grid');
  const names = ['Boot Sequence', 'Life Support', 'Solar Charging', 'Emergency Protocol'];
  grid.innerHTML = names.map((n, i) => `
    <div class="complete-level-item">
      <div class="complete-level-name">MISI 0${i+1}</div>
      <div class="complete-level-name" style="color:var(--c-text-muted);font-size:0.62rem;letter-spacing:0">${n}</div>
      <div class="complete-level-stars">${starsToEmoji(gameState.missionStars[i])}</div>
      <div class="complete-level-score">${gameState.missionScores[i]} pts</div>
    </div>`).join('');
}

// ================================================================
//  MISSION 1: BOOT SEQUENCE — Drag & Drop Ordering
// ================================================================
let m1State = {
  slots: Array(7).fill(null),
  attempts: 0,
  score: 0,
  stars: 0,
};
let m1DragId = null;

function initMission1() {
  const cfg = GAME_CONFIG.mission1;
  document.getElementById('m1-briefing').innerHTML = cfg.briefing;
  m1State = { slots: Array(7).fill(null), attempts: 0, score: 0, stars: 0 };
  renderMission1();
}

function renderMission1() {
  const cfg = GAME_CONFIG.mission1;
  const steps = [...cfg.steps];

  // Shuffle pool
  const shuffled = [...steps].sort(() => Math.random() - 0.5);
  const pool = document.getElementById('m1-pool');
  pool.innerHTML = shuffled.map(s => `
    <div class="system-card" id="m1-card-${s.id}"
      draggable="true"
      onclick="m1ClickCard('${s.id}')"
      ondragstart="m1DragStart('${s.id}')"
      ondragend="m1DragEnd()">
      <span class="system-card-icon">${s.icon}</span>
      <div class="system-card-info">
        <div class="system-card-label">${s.label}</div>
        <div class="system-card-desc">${s.desc}</div>
      </div>
    </div>`).join('');

  // Slots
  const slotsEl = document.getElementById('m1-slots');
  slotsEl.innerHTML = Array.from({length: 7}, (_, i) => `
    <div class="boot-slot" id="m1-slot-${i}"
      ondragover="event.preventDefault();m1SlotDragOver(${i})"
      ondragleave="m1SlotDragLeave(${i})"
      ondrop="m1Drop(${i})"
      onclick="m1SlotClick(${i})">
      <span class="slot-number">${i+1}.</span>
      <span class="slot-indicator"></span>
      <span class="slot-placeholder" id="m1-slot-text-${i}">Slot ${i+1}</span>
    </div>`).join('');

  updateM1CheckBtn();
  updateHudScore('m1-hud-score', 0);
  updateHudStars('m1-hud-stars', 0);
  document.getElementById('m1-hud-attempts').textContent = `Percobaan: 0`;
}

function m1DragStart(id) { m1DragId = id; sfxClick(); }
function m1DragEnd() { m1DragId = null; }

function m1SlotDragOver(i) {
  document.getElementById('m1-slot-' + i).classList.add('drag-over');
}
function m1SlotDragLeave(i) {
  document.getElementById('m1-slot-' + i).classList.remove('drag-over');
}
function m1Drop(i) {
  document.getElementById('m1-slot-' + i).classList.remove('drag-over');
  if (!m1DragId) return;
  placeCardInSlot(m1DragId, i);
  m1DragId = null;
}

let m1LastClickedCard = null;
function m1ClickCard(id) {
  sfxClick();
  // Find first empty slot
  const firstEmpty = m1State.slots.indexOf(null);
  if (firstEmpty === -1) return;
  placeCardInSlot(id, firstEmpty);
}
function m1SlotClick(i) {
  if (!m1State.slots[i]) return;
  sfxClick();
  removeCardFromSlot(i);
}

function placeCardInSlot(cardId, slotIndex) {
  // Check if card already placed elsewhere
  const existingSlot = m1State.slots.indexOf(cardId);
  if (existingSlot !== -1) m1State.slots[existingSlot] = null;

  m1State.slots[slotIndex] = cardId;
  refreshM1UI();
}
function removeCardFromSlot(i) {
  m1State.slots[i] = null;
  refreshM1UI();
}

function refreshM1UI() {
  const cfg = GAME_CONFIG.mission1;
  const placedIds = m1State.slots.filter(Boolean);

  // Pool cards
  cfg.steps.forEach(s => {
    const card = document.getElementById('m1-card-' + s.id);
    if (!card) return;
    if (placedIds.includes(s.id)) {
      card.style.display = 'none';
    } else {
      card.style.display = 'flex';
    }
  });

  // Slots
  m1State.slots.forEach((id, i) => {
    const slot = document.getElementById('m1-slot-' + i);
    const textEl = document.getElementById('m1-slot-text-' + i);
    slot.classList.remove('drag-over', 'error', 'success-light');
    if (id) {
      const step = cfg.steps.find(s => s.id === id);
      slot.classList.add('filled');
      textEl.innerHTML = `<span style="font-size:1rem">${step.icon}</span> <span style="font-size:0.78rem;font-weight:700;color:var(--c-text)">${step.label}</span>`;
    } else {
      slot.classList.remove('filled');
      textEl.innerHTML = `<span class="slot-placeholder">Slot ${i+1}</span>`;
    }
  });

  updateM1CheckBtn();
}

function updateM1CheckBtn() {
  const allFilled = m1State.slots.every(s => s !== null);
  document.getElementById('m1-check-btn').disabled = !allFilled;
}

function checkMission1() {
  const cfg = GAME_CONFIG.mission1;
  const correct = cfg.steps.map(s => s.id);
  let allCorrect = true;

  m1State.attempts++;
  document.getElementById('m1-hud-attempts').textContent = `Percobaan: ${m1State.attempts}`;

  m1State.slots.forEach((id, i) => {
    const slot = document.getElementById('m1-slot-' + i);
    slot.classList.remove('error','success-light');
    if (id !== correct[i]) allCorrect = false;
  });

  if (allCorrect) {
    // Animate boot sequence
    animateBootSuccess(() => {
      m1State.stars = calcStars(m1State.attempts);
      m1State.score = calcScore(m1State.stars);
      saveMissionResult(0, m1State.stars, m1State.score);
      updateHudStars('m1-hud-stars', m1State.stars);
      updateHudScore('m1-hud-score', m1State.score);
      setTimeout(() => {
        renderRecap(1);
        goToPage('recap-1');
      }, 400);
    });
  } else {
    playTone(200, 0.3, 'sawtooth', 0.08);
    // Highlight errors
    m1State.slots.forEach((id, i) => {
      const slot = document.getElementById('m1-slot-' + i);
      if (id !== correct[i]) slot.classList.add('error');
    });
    // Show hint after a moment
    setTimeout(() => {
      const wrongCount = m1State.slots.filter((id, i) => id !== correct[i]).length;
      document.getElementById('m1-briefing').innerHTML =
        `<span class="text-red">⚠️ ${wrongCount} posisi salah.</span> Urutkan kembali — sistem gagal boot jika urutan salah!`;
    }, 400);
  }
}

function animateBootSuccess(callback) {
  const slots = document.querySelectorAll('.boot-slot');
  slots.forEach((s, i) => {
    setTimeout(() => {
      s.classList.add('success-light');
      sfxBeep();
    }, i * 180);
  });
  setTimeout(callback, slots.length * 180 + 600);
}

function resetMission1() {
  sfxClick();
  initMission1();
}

// ================================================================
//  MISSION 2: LIFE SUPPORT — IF-ELSE Scenarios
// ================================================================
let m2State = {
  currentScenario: 0,
  wrongCount: 0,
  attempts: 0,
  score: 0,
};

function initMission2() {
  const cfg = GAME_CONFIG.mission2;
  document.getElementById('m2-briefing').innerHTML = cfg.briefing;
  m2State = { currentScenario: 0, wrongCount: 0, attempts: 0, score: 0 };
  renderScenario();
}

function renderScenario() {
  const cfg = GAME_CONFIG.mission2;
  const sc  = cfg.scenarios[m2State.currentScenario];
  const total = cfg.scenarios.length;

  document.getElementById('m2-hud-progress').textContent =
    `Skenario ${m2State.currentScenario + 1}/${total}`;
  document.getElementById('m2-action-row').style.display = 'none';

  const area = document.getElementById('m2-scenario-area');
  area.innerHTML = `
    <div class="sensor-panel">
      <div class="sensor-zone-header">
        <div class="sensor-zone-icon">${sc.zone_icon}</div>
        <div>
          <div class="sensor-zone-label">${sc.zone}</div>
          <div class="sensor-zone-sub">Laporan Sensor Masuk</div>
        </div>
      </div>
      <div class="sensor-reading">
        <div class="sensor-reading-label">${sc.reading_label}</div>
        <div class="sensor-reading-value ${sc.reading_color}">${sc.reading_value}</div>
        <div class="sensor-status-badge ${sc.reading_color}">
          <span>●</span> ${sc.reading_status}
        </div>
      </div>
      <div class="sensor-condition">
        <div class="sensor-condition-label">Kondisi Terdeteksi</div>
        <div class="sensor-condition-code">${sc.condition_display} → ???</div>
      </div>
      <div class="sensor-progress">${m2State.currentScenario + 1} dari ${total} skenario</div>
    </div>
    <div class="choice-panel">
      <div class="choice-panel-title">⚡ PILIH TINDAKAN YANG TEPAT:</div>
      ${sc.choices.map(c => `
        <button class="choice-btn" id="choice-${c.id}" onclick="selectChoice('${c.id}', ${c.correct})">
          ${c.label}
        </button>`).join('')}
      <div class="choice-feedback" id="m2-feedback"></div>
    </div>`;
}

function selectChoice(id, isCorrect) {
  const cfg = GAME_CONFIG.mission2;
  const sc  = cfg.scenarios[m2State.currentScenario];
  const choice = sc.choices.find(c => c.id === id);
  const feedbackEl = document.getElementById('m2-feedback');

  // Disable all buttons
  sc.choices.forEach(c => {
    const btn = document.getElementById('choice-' + c.id);
    if (btn) { btn.disabled = true; }
  });

  const btn = document.getElementById('choice-' + id);

  if (isCorrect) {
    sfxSuccess();
    btn.classList.add('correct');
    feedbackEl.className = 'choice-feedback correct-fb show';
    feedbackEl.textContent = choice.feedback;

    m2State.attempts++;
    const actionRow = document.getElementById('m2-action-row');
    const nextBtn   = document.getElementById('m2-next-btn');

    // Check if last scenario
    if (m2State.currentScenario >= cfg.scenarios.length - 1) {
      nextBtn.textContent = '✅ Selesaikan Misi';
      nextBtn.onclick = finishMission2;
    } else {
      nextBtn.textContent = '▶ Skenario Berikutnya';
      nextBtn.onclick = nextScenario;
    }
    actionRow.style.display = 'flex';
  } else {
    sfxFail();
    btn.classList.add('wrong');
    feedbackEl.className = 'choice-feedback wrong-fb show';
    feedbackEl.textContent = choice.feedback;
    m2State.wrongCount++;

    // Re-enable other buttons after delay
    setTimeout(() => {
      sc.choices.forEach(c => {
        const b = document.getElementById('choice-' + c.id);
        if (b && !b.classList.contains('wrong') && !b.classList.contains('correct')) {
          b.disabled = false;
        }
      });
      feedbackEl.className = 'choice-feedback';
    }, 1200);
  }
}

function nextScenario() {
  m2State.currentScenario++;
  renderScenario();
}

function finishMission2() {
  const totalScenarios = GAME_CONFIG.mission2.scenarios.length;
  const stars = m2State.wrongCount === 0 ? 3 : m2State.wrongCount <= 1 ? 2 : 1;
  const score = calcScore(stars);
  saveMissionResult(1, stars, score);
  updateHudStars('m2-hud-stars', stars);
  updateHudScore('m2-hud-score', score);
  renderRecap(2);
  setTimeout(() => goToPage('recap-2'), 200);
}

// ================================================================
//  MISSION 3: SOLAR CHARGING — Loop Builder
// ================================================================
let m3State = {
  selectedN: null,
  running: false,
  chargedCount: 0,
};

function initMission3() {
  const cfg = GAME_CONFIG.mission3;
  document.getElementById('m3-briefing').innerHTML = cfg.briefing;
  m3State = { selectedN: null, running: false, chargedCount: 0 };

  // Manual list (show first 6 lines + "...")
  const manList = document.getElementById('m3-manual-list');
  manList.innerHTML = cfg.manual_steps.map((s,i) =>
    `<div class="manual-line">${String(i+1).padStart(2,'0')}: ${s}</div>`
  ).join('') + `<div class="manual-line" style="color:var(--c-text-dim);font-style:italic">... dan seterusnya hingga pod_12</div>`;

  // Loop count buttons
  const sel = document.getElementById('m3-count-select');
  sel.innerHTML = cfg.loop_options.map(n =>
    `<button class="loop-count-btn" onclick="selectLoopCount(${n})" id="m3-btn-${n}">${n}</button>`
  ).join('');

  // Pod grid
  const grid = document.getElementById('m3-pod-grid');
  grid.innerHTML = Array.from({length: cfg.pod_count}, (_, i) => `
    <div class="pod-item" id="m3-pod-${i}">
      <span>🔋</span>
      <span class="pod-item-label">POD ${i+1}</span>
      <div class="pod-charging-bar"></div>
    </div>`).join('');

  document.getElementById('m3-comparison').style.display = 'none';
  document.getElementById('m3-run-btn').disabled = true;
  updateHudScore('m3-hud-score', 0);
}

function selectLoopCount(n) {
  if (m3State.running) return;
  m3State.selectedN = n;
  sfxClick();
  document.querySelectorAll('.loop-count-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('m3-btn-' + n).classList.add('active');

  // Reset pods first
  const cfg = GAME_CONFIG.mission3;
  for (let i = 0; i < cfg.pod_count; i++) {
    const pod = document.getElementById('m3-pod-' + i);
    if (pod) { pod.classList.remove('charged'); }
  }
  m3State.chargedCount = 0;

  document.getElementById('m3-run-btn').disabled = false;
  document.getElementById('m3-comparison').style.display = 'none';
}

function runLoopAnimation() {
  if (!m3State.selectedN || m3State.running) return;
  m3State.running = true;
  sfxClick();
  document.getElementById('m3-run-btn').disabled = true;
  document.querySelectorAll('.loop-count-btn').forEach(b => b.disabled = true);

  const n = m3State.selectedN;
  const cfg = GAME_CONFIG.mission3;

  // Reset all
  for (let i = 0; i < cfg.pod_count; i++) {
    const pod = document.getElementById('m3-pod-' + i);
    if (pod) pod.classList.remove('charged');
  }

  let i = 0;
  function chargeNext() {
    if (i >= n) {
      // Done
      m3State.running = false;
      const isCorrect = n === cfg.pod_count;
      const stars = isCorrect ? 3 : n >= cfg.pod_count * 0.8 ? 2 : 1;
      const score = calcScore(stars);
      saveMissionResult(2, stars, score);
      updateHudStars('m3-hud-stars', stars);
      updateHudScore('m3-hud-score', score);

      // Show comparison
      const manualLines = n * 3; // 3 lines per pod in manual
      document.getElementById('m3-lines-manual').textContent = manualLines;
      document.getElementById('m3-lines-saved').textContent = Math.max(0, manualLines - 3);
      document.getElementById('m3-comparison').style.display = 'flex';

      setTimeout(() => {
        renderRecap(3);
        goToPage('recap-3');
      }, isCorrect ? 1200 : 800);
      return;
    }
    const pod = document.getElementById('m3-pod-' + i);
    if (pod) {
      pod.classList.add('charged');
      sfxBeep();
    }
    i++;
    setTimeout(chargeNext, 280);
  }
  chargeNext();
}

function resetMission3() {
  sfxClick();
  initMission3();
}

// ================================================================
//  MISSION 4: EMERGENCY PROTOCOL — Task Decomposition + Timer
// ================================================================
let m4State = {
  teamTasks: { alfa: [], beta: [], gamma: [] },
  timerInterval: null,
  timeLeft: 45,
  started: false,
  attempts: 0,
};
let m4DragTaskId = null;

function initMission4() {
  const cfg = GAME_CONFIG.mission4;
  document.getElementById('m4-briefing-area') && (document.getElementById('m4-briefing-area').innerHTML = cfg.briefing);
  m4State = { teamTasks: { alfa: [], beta: [], gamma: [] }, timerInterval: null, timeLeft: cfg.timer_seconds, started: false, attempts: 0 };

  if (m4State.timerInterval) clearInterval(m4State.timerInterval);

  const alarm = document.getElementById('m4-alarm');
  alarm.style.display = 'flex';
  document.getElementById('m4-timer-bar-track').style.display = 'none';
  document.getElementById('m4-timer-display').textContent = formatTime(cfg.timer_seconds);
  document.getElementById('m4-timer-display').className = 'hud-score-value';
  document.getElementById('m4-parallel-overlay').classList.remove('show');
  document.getElementById('m4-start-btn').disabled = true;

  renderTeams();
  renderTaskPool();
  sfxAlarm();
}

function renderTeams() {
  const cfg = GAME_CONFIG.mission4;
  const row = document.getElementById('m4-teams-row');
  row.innerHTML = cfg.teams.map(t => `
    <div class="team-station" id="team-station-${t.id}"
      ondragover="event.preventDefault();m4StationDragOver('${t.id}')"
      ondragleave="m4StationDragLeave('${t.id}')"
      ondrop="m4Drop('${t.id}')">
      <div class="team-station-header">
        <span class="team-station-icon">${t.icon}</span>
        <div>
          <div class="team-station-name" style="color:${t.color}">${t.label}</div>
          <div class="team-station-role">${t.role}</div>
        </div>
        <span class="team-slot-count" id="team-count-${t.id}">0/3</span>
      </div>
      <div class="team-tasks" id="team-tasks-${t.id}">
        <div class="team-task-empty">Seret tugas ke sini</div>
      </div>
    </div>`).join('');
}

function renderTaskPool() {
  const cfg = GAME_CONFIG.mission4;
  const pool = document.getElementById('m4-task-pool');
  const allAssigned = [...m4State.teamTasks.alfa, ...m4State.teamTasks.beta, ...m4State.teamTasks.gamma];
  const remaining = cfg.tasks.filter(t => !allAssigned.includes(t.id));

  pool.innerHTML = remaining.map(t => `
    <div class="task-card" id="task-${t.id}"
      draggable="true"
      ondragstart="m4DragStart('${t.id}')"
      ondragend="m4DragEnd()"
      onclick="m4ClickTask('${t.id}')">
      <span class="task-card-icon">${t.icon}</span>
      <span>${t.label}</span>
    </div>`).join('');
}

function renderTeamTasks() {
  const cfg = GAME_CONFIG.mission4;
  cfg.teams.forEach(t => {
    const tasksEl = document.getElementById('team-tasks-' + t.id);
    const countEl = document.getElementById('team-count-' + t.id);
    const tasks = m4State.teamTasks[t.id];
    const station = document.getElementById('team-station-' + t.id);

    if (tasks.length === 0) {
      tasksEl.innerHTML = '<div class="team-task-empty">Seret tugas ke sini</div>';
    } else {
      tasksEl.innerHTML = tasks.map(id => {
        const task = cfg.tasks.find(tk => tk.id === id);
        return `<div class="task-card in-team" onclick="m4RemoveFromTeam('${t.id}','${id}')">
          <span class="task-card-icon">${task.icon}</span>
          <span>${task.label}</span>
        </div>`;
      }).join('');
    }

    countEl.textContent = `${tasks.length}/3`;
    countEl.className = tasks.length === 3 ? 'team-slot-count full' : 'team-slot-count';
  });

  // Check if all teams are full
  const allFull = cfg.teams.every(t => m4State.teamTasks[t.id].length === 3);
  document.getElementById('m4-start-btn').disabled = !allFull;
}

function m4DragStart(id) { m4DragTaskId = id; sfxClick(); }
function m4DragEnd() { m4DragTaskId = null; }
function m4StationDragOver(teamId) {
  document.getElementById('team-station-' + teamId).classList.add('drag-over');
}
function m4StationDragLeave(teamId) {
  document.getElementById('team-station-' + teamId).classList.remove('drag-over');
}
function m4Drop(teamId) {
  document.getElementById('team-station-' + teamId).classList.remove('drag-over');
  if (!m4DragTaskId) return;
  assignTaskToTeam(m4DragTaskId, teamId);
  m4DragTaskId = null;
}

let m4LastClickTeam = 0;
function m4ClickTask(id) {
  sfxClick();
  // Cycle through teams
  const teams = ['alfa', 'beta', 'gamma'];
  const t = teams[m4LastClickTeam % 3];
  if (m4State.teamTasks[t].length < 3) {
    assignTaskToTeam(id, t);
    m4LastClickTeam++;
  } else {
    m4LastClickTeam++;
    const t2 = teams[m4LastClickTeam % 3];
    if (m4State.teamTasks[t2].length < 3) assignTaskToTeam(id, t2);
  }
}

function assignTaskToTeam(taskId, teamId) {
  if (m4State.teamTasks[teamId].length >= 3) return;
  if (m4State.teamTasks[teamId].includes(taskId)) return;
  // Remove from other teams
  ['alfa','beta','gamma'].forEach(t => {
    m4State.teamTasks[t] = m4State.teamTasks[t].filter(id => id !== taskId);
  });
  m4State.teamTasks[teamId].push(taskId);
  sfxBeep();
  renderTaskPool();
  renderTeamTasks();
}

function m4RemoveFromTeam(teamId, taskId) {
  sfxClick();
  m4State.teamTasks[teamId] = m4State.teamTasks[teamId].filter(id => id !== taskId);
  renderTaskPool();
  renderTeamTasks();
}

function resetMission4() {
  sfxClick();
  if (m4State.timerInterval) clearInterval(m4State.timerInterval);
  initMission4();
}

function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function startEmergencyTimer() {
  const cfg = GAME_CONFIG.mission4;
  sfxAlarm();
  document.getElementById('m4-start-btn').disabled = true;
  document.getElementById('m4-alarm').style.display = 'none';
  document.getElementById('m4-timer-bar-track').style.display = 'block';

  // Show parallel animation overlay
  const overlay = document.getElementById('m4-parallel-overlay');
  overlay.classList.add('show');
  buildParallelTracks();

  m4State.timeLeft = cfg.timer_seconds;
  m4State.started = true;

  const fillEl  = document.getElementById('m4-timer-bar-fill');
  const dispEl  = document.getElementById('m4-countdown');
  const timerHud = document.getElementById('m4-timer-display');

  // Animate parallel tasks
  animateParallelTracks(() => {
    // All done — stop timer, show result
    clearInterval(m4State.timerInterval);
    const timeBonus = m4State.timeLeft;
    const stars = timeBonus > 30 ? 3 : timeBonus > 15 ? 2 : 1;
    const score = calcScore(stars);
    saveMissionResult(3, stars, score);
    updateHudStars('m4-hud-stars', stars);
    setTimeout(() => {
      overlay.classList.remove('show');
      renderRecap(4);
      goToPage('recap-4');
    }, 1000);
  });

  m4State.timerInterval = setInterval(() => {
    m4State.timeLeft--;
    dispEl.textContent   = formatTime(m4State.timeLeft);
    timerHud.textContent = formatTime(m4State.timeLeft);
    const pct = (m4State.timeLeft / cfg.timer_seconds) * 100;
    fillEl.style.width = pct + '%';
    if (m4State.timeLeft <= 10) dispEl.className = 'emergency-timer urgent';
    if (m4State.timeLeft <= 0) {
      clearInterval(m4State.timerInterval);
      overlay.classList.remove('show');
      sfxFail();
      // Still complete but with 1 star
      const score = 100;
      saveMissionResult(3, 1, score);
      renderRecap(4);
      goToPage('recap-4');
    }
  }, 1000);
}

function buildParallelTracks() {
  const cfg = GAME_CONFIG.mission4;
  const tracksEl = document.getElementById('m4-parallel-tracks');
  tracksEl.innerHTML = cfg.teams.map(t => `
    <div class="parallel-track">
      <div class="parallel-track-header">
        <span>${t.icon}</span>
        <span style="color:${t.color}">${t.label}</span>
        <span style="font-size:0.65rem;color:var(--c-text-muted);font-weight:400;font-family:var(--font-body)">${t.role}</span>
      </div>
      ${m4State.teamTasks[t.id].map((taskId, i) => {
        const task = cfg.tasks.find(tk => tk.id === taskId);
        return `<div class="parallel-track-item" id="pti-${t.id}-${i}">${task.icon} ${task.label}</div>`;
      }).join('')}
      <div class="parallel-track-progress">
        <div class="parallel-track-bar" id="ptb-${t.id}" style="width:0%"></div>
      </div>
    </div>`).join('');
}

function animateParallelTracks(onComplete) {
  const cfg = GAME_CONFIG.mission4;
  let finishedTeams = 0;

  cfg.teams.forEach(t => {
    const tasks = m4State.teamTasks[t.id];
    let taskIdx = 0;

    function processNext() {
      if (taskIdx >= tasks.length) {
        finishedTeams++;
        const bar = document.getElementById('ptb-' + t.id);
        if (bar) bar.style.width = '100%';
        sfxSuccess();
        if (finishedTeams === cfg.teams.length) {
          setTimeout(onComplete, 600);
        }
        return;
      }
      // Mark current task active
      if (taskIdx > 0) {
        const prev = document.getElementById(`pti-${t.id}-${taskIdx-1}`);
        if (prev) prev.className = 'parallel-track-item done';
      }
      const curr = document.getElementById(`pti-${t.id}-${taskIdx}`);
      if (curr) { curr.className = 'parallel-track-item active'; sfxBeep(); }

      const pct = ((taskIdx + 1) / tasks.length) * 100;
      const bar = document.getElementById('ptb-' + t.id);
      if (bar) bar.style.width = (pct * 0.9) + '%';

      taskIdx++;
      const delay = 800 + Math.random() * 400;
      setTimeout(processNext, delay);
    }

    // Start with stagger
    const stagger = Math.random() * 200;
    setTimeout(processNext, stagger);
  });
}

// ================================================================
//  ROTATE OVERLAY
// ================================================================
function checkOrientation() {
  const overlay = document.getElementById('rotate-overlay');
  if (window.innerHeight > window.innerWidth) {
    overlay.classList.add('show');
  } else {
    overlay.classList.remove('show');
  }
}

// ================================================================
//  INIT
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initCover();
  checkOrientation();
  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', () => setTimeout(checkOrientation, 200));
});
