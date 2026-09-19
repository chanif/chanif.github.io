/* ============================================================
   Algorithm Kingdom — Game Engine v2.0 (OVERHAULED)
   SPA Navigation | Procedural Medieval Audio & SFX | 4 Mission Engines
   Author: Ach. Chanifuddin Fanani, S.Pd. — SMPN 2 Lamongan
   ============================================================ */

// ===================== GLOBAL STATE =====================
const gameState = {
  completed: [false, false, false, false],
  scores:    [0, 0, 0, 0],
  stars:     [0, 0, 0, 0],
  attempts:  [0, 0, 0, 0],
  totalScore: 0,
  currentMission: 1,
  lastResultPage: '',
  audioEnabled: false,
};

const STORAGE_KEY = 'algoKingdomSave_v3';

function loadSaveData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (Array.isArray(data.completed) && data.completed.length === 4) {
        gameState.completed = data.completed;
        gameState.scores    = data.scores || [0, 0, 0, 0];
        gameState.stars     = data.stars  || [0, 0, 0, 0];
        gameState.attempts  = data.attempts || [0, 0, 0, 0];
        calcTotalScore();
      }
    }
  } catch (e) {
    console.warn('Could not load save data:', e);
  }
}

function saveGameData() {
  try {
    calcTotalScore();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      completed: gameState.completed,
      scores: gameState.scores,
      stars: gameState.stars,
      attempts: gameState.attempts,
    }));
  } catch (e) {
    console.warn('Could not save data:', e);
  }
}

function calcTotalScore() {
  gameState.totalScore = gameState.scores.reduce(function(a, b) { return a + b; }, 0);
}

function resetEntireGame() {
  showCustomModal({
    icon: '🔄',
    title: 'Ulang Kerajaan?',
    body: 'Apakah Yang Mulia ingin mengulang pembangunan kerajaan dari awal? Seluruh pencapaian dan bangunan akan direset.',
    buttons: [
      { label: '❌ Batal', style: 'ghost', action: null },
      {
        label: '🔄 Ya, Reset Semuanya', style: 'danger', action: function() {
          localStorage.removeItem(STORAGE_KEY);
          gameState.completed = [false, false, false, false];
          gameState.scores    = [0, 0, 0, 0];
          gameState.stars     = [0, 0, 0, 0];
          gameState.attempts  = [0, 0, 0, 0];
          gameState.totalScore = 0;
          goToPage('map');
        }
      },
    ]
  });
}

// ===================== TOAST NOTIFICATION SYSTEM =====================
function showToast(msg, type, duration) {
  type = type || 'info';
  duration = duration || 2800;
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = msg;
  container.appendChild(toast);
  requestAnimationFrame(function() { toast.classList.add('show'); });
  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 400);
  }, duration);
}

// ===================== CUSTOM MODAL SYSTEM =====================
function showCustomModal(opts) {
  const overlay = document.getElementById('custom-modal-overlay');
  if (!overlay) return;
  document.getElementById('custom-modal-icon').textContent = opts.icon || '❓';
  document.getElementById('custom-modal-title').textContent = opts.title || '';
  document.getElementById('custom-modal-body').innerHTML = opts.body || '';
  const btnsEl = document.getElementById('custom-modal-btns');
  btnsEl.innerHTML = '';
  (opts.buttons || []).forEach(function(btn) {
    const b = document.createElement('button');
    b.className = 'btn btn-' + (btn.style || 'ghost');
    b.innerHTML = btn.label;
    b.onclick = function() {
      hideCustomModal();
      if (btn.action) btn.action();
    };
    btnsEl.appendChild(b);
  });
  overlay.classList.add('show');
}

function hideCustomModal() {
  const overlay = document.getElementById('custom-modal-overlay');
  if (overlay) overlay.classList.remove('show');
}

// ===================== SPA NAVIGATION =====================
let currentPage = 'cover';

function goToPage(pageId) {
  const oldEl = document.querySelector('.page.active');
  const newEl = document.getElementById('page-' + pageId);
  if (!newEl || oldEl === newEl) return;
  if (oldEl) oldEl.classList.remove('active', 'slide-in');
  newEl.classList.add('active', 'slide-in');
  currentPage = pageId;
  if (pageId === 'cover')    renderCover();
  if (pageId === 'briefing') renderBriefing();
  if (pageId === 'map')      renderMap();
  if (pageId === 'mission-1') initMission1();
  if (pageId === 'recap-1')   renderRecap(1);
  if (pageId === 'mission-2') initMission2();
  if (pageId === 'recap-2')   renderRecap(2);
  if (pageId === 'mission-3') initMission3();
  if (pageId === 'recap-3')   renderRecap(3);
  if (pageId === 'mission-4') initMission4();
  if (pageId === 'recap-4')   renderRecap(4);
  if (pageId === 'complete')  renderComplete();
  window.scrollTo(0, 0);
}

function startMission(n) {
  const isUnlocked = (n === 1) || gameState.completed[n - 2];
  if (!isUnlocked) {
    sfxFail();
    const node = document.getElementById('mission-node-' + n);
    if (node) {
      node.style.animation = 'shake 0.35s ease';
      setTimeout(function() { node.style.animation = ''; }, 400);
    }
    showToast('🔒 Selesaikan misi sebelumnya terlebih dahulu!', 'warn');
    return;
  }
  gameState.currentMission = n;
  sfxClick();
  goToPage('mission-' + n);
}

// ============================================================
// AUDIO ENGINE
// ============================================================
let audioCtx = null;
let bgmInterval = null;
let bgmStep = 0;

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playTone(freq, dur, type, vol) {
  type = type || 'sine'; vol = vol || 0.12;
  try {
    const ctx = getAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.start(); osc.stop(ctx.currentTime + dur);
  } catch (e) {}
}

function sfxClick()   { playTone(659.25, 0.07, 'sine', 0.1); }
function sfxHammer()  { playTone(110, 0.16, 'triangle', 0.2); setTimeout(function() { playTone(220, 0.1, 'sine', 0.12); }, 35); }
function sfxCollapse(){ [120, 95, 80, 65, 50].forEach(function(f, i) { setTimeout(function() { playTone(f, 0.35, 'sawtooth', 0.18); }, i * 90); }); setTimeout(function() { playTone(70, 0.4, 'square', 0.15); }, 250); }
function sfxCoin()    { playTone(987.77, 0.08, 'sine', 0.12); setTimeout(function() { playTone(1318.51, 0.16, 'sine', 0.1); }, 60); }
function sfxSuccess() { [523.25, 659.25, 783.99, 1046.50].forEach(function(f, i) { setTimeout(function() { playTone(f, 0.24, 'triangle', 0.15); }, i * 90); }); }
function sfxFail()    { [220, 185, 146].forEach(function(f, i) { setTimeout(function() { playTone(f, 0.22, 'sawtooth', 0.12); }, i * 80); }); }
function sfxAlarm()   { [440, 220, 440, 220, 520].forEach(function(f, i) { setTimeout(function() { playTone(f, 0.14, 'square', 0.1); }, i * 110); }); }
function sfxWater()   { [300, 450, 280, 520].forEach(function(f, i) { setTimeout(function() { playTone(f, 0.15, 'sine', 0.1); }, i * 70); }); }
function sfxCombo()   { [659.25, 783.99, 987.77, 1174.66].forEach(function(f, i) { setTimeout(function() { playTone(f, 0.18, 'sine', 0.13); }, i * 70); }); }

function startBGM() {
  if (bgmInterval) clearInterval(bgmInterval);
  const scale = [293.66, 349.23, 440.00, 523.25, 587.33, 523.25, 440.00, 349.23, 329.63, 392.00, 440.00, 493.88, 440.00, 392.00, 349.23, 293.66];
  bgmStep = 0;
  bgmInterval = setInterval(function() {
    if (!gameState.audioEnabled) return;
    const freq = scale[bgmStep % scale.length];
    playTone(freq, 0.45, 'sine', 0.045);
    if (bgmStep % 4 === 0) { const bass = (bgmStep % 8 === 0) ? 146.83 : 174.61; playTone(bass, 0.6, 'triangle', 0.05); }
    bgmStep++;
  }, 480);
}

function stopBGM() { if (bgmInterval) { clearInterval(bgmInterval); bgmInterval = null; } }

function toggleAudio() {
  gameState.audioEnabled = !gameState.audioEnabled;
  const pill = document.getElementById('global-audio-pill');
  const text = document.getElementById('audio-pill-text');
  const icon = document.getElementById('audio-pill-icon');
  if (gameState.audioEnabled) {
    getAudio(); startBGM();
    if (pill) pill.classList.add('playing');
    if (text) text.textContent = 'BGM: ON';
    if (icon) icon.textContent = '🔊';
    sfxSuccess();
  } else {
    stopBGM();
    if (pill) pill.classList.remove('playing');
    if (text) text.textContent = 'BGM: OFF';
    if (icon) icon.textContent = '🔇';
  }
}

// ===================== AMBIENT PARTICLES =====================
function initAmbientParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  const particles = [];
  const colors = ['rgba(245, 158, 11, ', 'rgba(217, 119, 6, ', 'rgba(239, 68, 68, ', 'rgba(232, 213, 176, '];
  for (let i = 0; i < 55; i++) {
    particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 2 + 0.6, colorPrefix: colors[Math.floor(Math.random() * colors.length)], alpha: Math.random() * 0.6 + 0.2, speedY: Math.random() * 0.45 + 0.15, wobbleSpeed: Math.random() * 0.02 + 0.008, wobbleAmp: Math.random() * 0.8 + 0.3, angle: Math.random() * Math.PI * 2 });
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function(p) {
      p.y -= p.speedY; p.angle += p.wobbleSpeed; p.x += Math.sin(p.angle) * p.wobbleAmp;
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.colorPrefix + p.alpha + ')';
      ctx.shadowBlur = 8; ctx.shadowColor = 'rgba(245, 158, 11, 0.4)'; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ===================== CONFETTI =====================
function spawnConfetti() {
  const colors = ['#F59E0B', '#D97706', '#10B981', '#3B82F6', '#EF4444', '#FFF8E7'];
  for (let i = 0; i < 60; i++) {
    setTimeout(function() {
      const el = document.createElement('div');
      el.className = 'confetti-particle';
      const size = Math.random() * 10 + 6;
      el.style.left = (Math.random() * 100) + 'vw';
      el.style.width = size + 'px'; el.style.height = size + 'px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = (Math.random() * 2 + 1.8) + 's';
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(el);
      setTimeout(function() { el.remove(); }, 4000);
    }, i * 35);
  }
}

// ===================== RESULT OVERLAY =====================
let resultNextPage = '';
let resultRetryMission = 0;

function showResult(opts) {
  const overlay = document.getElementById('result-overlay');
  const card    = document.getElementById('result-card');
  if (!overlay || !card) return;
  document.getElementById('result-icon').textContent  = opts.icon;
  document.getElementById('result-title').textContent = opts.title;
  document.getElementById('result-stars').textContent = starsToEmoji(opts.stars);
  document.getElementById('result-score').textContent = '+' + opts.score + ' Poin';
  document.getElementById('result-sub').innerHTML     = opts.sub || '';
  card.className = 'result-card ' + (opts.success ? 'success' : 'fail');
  overlay.classList.add('show');
  resultNextPage = opts.nextPage;
  resultRetryMission = opts.retryMission;
  if (opts.success) { sfxSuccess(); spawnConfetti(); } else { sfxFail(); }
}

function hideResult() { const overlay = document.getElementById('result-overlay'); if (overlay) overlay.classList.remove('show'); }
function proceedFromResult() { hideResult(); if (resultNextPage) goToPage(resultNextPage); }
function retryCurrentMission() { hideResult(); if (resultRetryMission) goToPage('mission-' + resultRetryMission); }

function starsToEmoji(stars) {
  let s = '';
  for (let i = 0; i < 3; i++) { s += i < stars ? '⭐' : '☆'; }
  return s;
}

function getBadge(starsCount) {
  const badges = GAME_CONFIG.badges;
  let current = badges[0];
  for (let b of badges) { if (starsCount >= b.min_stars) current = b; }
  return current;
}

// ===================== RENDER COVER & BRIEFING =====================
function renderCover() {
  const tpList = document.getElementById('cover-tp-list');
  if (tpList && tpList.children.length === 0) {
    GAME_CONFIG.learning_objectives.forEach(function(obj) {
      const li = document.createElement('li'); li.innerHTML = obj; tpList.appendChild(li);
    });
  }
}

function renderBriefing() {
  const container = document.getElementById('briefing-cards-container');
  if (container && container.children.length === 0) {
    GAME_CONFIG.briefing_cards.forEach(function(c) {
      const card = document.createElement('div');
      card.className = 'briefing-card';
      card.innerHTML = '<div class="briefing-card-icon">' + c.icon + '</div><div class="briefing-card-title">' + c.title + '</div><div class="briefing-card-desc">' + c.desc + '</div>';
      container.appendChild(card);
    });
  }
}

// ===================== RENDER KINGDOM MAP (RPG Pins) =====================
function renderMap() {
  calcTotalScore();
  for (let i = 1; i <= 4; i++) {
    const nodeEl  = document.getElementById('mission-node-' + i);
    const starsEl = document.getElementById('node-stars-' + i);
    const isUnlocked = (i === 1) || gameState.completed[i - 2];
    const isDone     = gameState.completed[i - 1];
    if (nodeEl) {
      nodeEl.className = 'rpg-pin-node';
      if (isDone)          nodeEl.classList.add('completed', 'unlocked');
      else if (isUnlocked) nodeEl.classList.add('unlocked');
      else                 nodeEl.classList.add('locked');
    }
    if (starsEl) starsEl.textContent = isDone ? starsToEmoji(gameState.stars[i - 1]) : '☆☆☆';
  }

  const pathIds = ['map-path-1-2', 'map-path-2-3', 'map-path-3-4'];
  pathIds.forEach(function(id, idx) {
    const pathEl = document.getElementById(id);
    if (pathEl) pathEl.style.opacity = gameState.completed[idx] ? '1' : '0';
  });

  const buildings = [{id:'b-castle',idx:0},{id:'b-shield',idx:1},{id:'b-farm',idx:2},{id:'b-council',idx:3}];
  buildings.forEach(function(b) {
    const el = document.getElementById(b.id);
    if (el) { if (gameState.completed[b.idx]) el.classList.add('built'); else el.classList.remove('built'); }
  });

  const completedCount = gameState.completed.filter(Boolean).length;
  const totalStars     = gameState.stars.reduce(function(a, b) { return a + b; }, 0);
  const fillEl  = document.getElementById('map-progress-fill');
  const textEl  = document.getElementById('map-progress-text');
  const badgeEl = document.getElementById('map-badge-chip');
  if (fillEl) fillEl.style.width = ((completedCount / 4) * 100) + '%';
  if (textEl) textEl.textContent = completedCount + ' / 4 Wilayah Selesai • ' + totalStars + ' ⭐ • Total Skor: ' + gameState.totalScore;
  if (badgeEl) {
    const currentBadge = getBadge(totalStars);
    badgeEl.textContent = currentBadge.label;
    badgeEl.style.borderColor = currentBadge.color;
    badgeEl.style.color = currentBadge.color;
  }
}

// ============================================================
// LEVEL 1: BANGUN KASTIL (SEKUENSIAL + TIMER + DISTRACTOR + COMBO)
// ============================================================
let m1_slots_data  = new Array(7).fill(null);
let m1_pool_data   = [];
let m1_dragged_id  = null;
let m1_is_running  = false;
let m1_timer_sec   = 90;
let m1_timer_interval = null;
let m1_combo       = 0;

function initMission1() {
  m1_slots_data = new Array(7).fill(null);
  m1_is_running = false;
  m1_combo      = 0;
  if (m1_timer_interval) { clearInterval(m1_timer_interval); m1_timer_interval = null; }
  m1_timer_sec = GAME_CONFIG.mission1.timer_seconds || 90;
  const correct     = GAME_CONFIG.mission1.steps.slice();
  const distractors = GAME_CONFIG.mission1.use_distractors ? (GAME_CONFIG.mission1.distractors || []).slice() : [];
  m1_pool_data = correct.concat(distractors).sort(function() { return Math.random() - 0.5; });
  resetStageLayers();
  setInspectorComment('"Pilih 7 langkah yang benar dari 9 kartu di kiri, susun urutannya dengan tepat!"');
  updateMission1HUD();
  updateM1TimerDisplay();
  renderMission1Pool();
  renderMission1Slots();
  updateM1ComboDisplay();
  m1_timer_interval = setInterval(tickM1Timer, 1000);
}

function tickM1Timer() {
  if (m1_timer_sec > 0) {
    m1_timer_sec--;
    updateM1TimerDisplay();
    if (m1_timer_sec <= 20) {
      const wrap = document.getElementById('m1-timer-wrap');
      if (wrap) wrap.classList.add('urgent');
      if (m1_timer_sec % 2 === 0) sfxAlarm();
    }
  } else {
    clearInterval(m1_timer_interval); m1_timer_interval = null;
    if (!m1_is_running) {
      sfxFail();
      showToast('⏰ Waktu habis! Kastil gagal dibangun!', 'danger', 3500);
      gameState.attempts[0]++;
      updateMission1HUD();
      setTimeout(function() { initMission1(); }, 1500);
    }
  }
}

function updateM1TimerDisplay() {
  const el = document.getElementById('m1-timer-display');
  if (!el) return;
  const m = Math.floor(m1_timer_sec / 60).toString().padStart(2, '0');
  const s = (m1_timer_sec % 60).toString().padStart(2, '0');
  el.textContent = m + ':' + s;
  const wrap = document.getElementById('m1-timer-wrap');
  if (wrap) { if (m1_timer_sec <= 20) wrap.classList.add('urgent'); else wrap.classList.remove('urgent'); }
}

function updateM1ComboDisplay() {
  const wrap = document.getElementById('m1-combo-wrap');
  const valEl = document.getElementById('m1-combo-val');
  if (!wrap || !valEl) return;
  if (m1_combo >= 2) {
    wrap.style.display = 'flex';
    valEl.textContent = 'x' + m1_combo;
    wrap.className = 'm1-combo-wrap' + (m1_combo >= 4 ? ' combo-fire' : '');
  } else {
    wrap.style.display = 'none';
  }
}

function updateMission1HUD() {
  const attemptsEl = document.getElementById('m1-attempts');
  const scoreEl    = document.getElementById('m1-hud-score');
  const starsEl    = document.getElementById('m1-hud-stars');
  const attempts = gameState.attempts[0];
  const timeBonus = m1_timer_sec > 60 ? 50 : m1_timer_sec > 30 ? 20 : 0;
  const estScore = Math.max(100, 300 - (attempts * 40) + timeBonus);
  const estStars = attempts === 0 ? 3 : attempts <= 2 ? 2 : 1;
  if (attemptsEl) attemptsEl.textContent = 'Percobaan: ' + attempts;
  if (scoreEl)    scoreEl.textContent    = estScore;
  if (starsEl)    starsEl.textContent    = starsToEmoji(estStars);
}

function resetStageLayers() {
  ['survey','foundation','walls','roof','tower','gate','flag'].forEach(function(l) {
    const el = document.getElementById('layer-' + l);
    if (el) el.classList.remove('active');
  });
  const collapseEl = document.getElementById('m1-collapse-overlay');
  if (collapseEl) collapseEl.classList.remove('active');
  const statusEl = document.getElementById('m1-stage-status');
  if (statusEl) statusEl.textContent = 'Status: Menunggu Rancangan';
}

function updateStagePreview() {
  ['survey','foundation','walls','roof','tower','gate','flag'].forEach(function(l) {
    const el = document.getElementById('layer-' + l);
    if (el) {
      if (m1_slots_data.indexOf(l) !== -1) el.classList.add('active');
      else el.classList.remove('active');
    }
  });
  const filledCount = m1_slots_data.filter(Boolean).length;
  const statusEl = document.getElementById('m1-stage-status');
  if (statusEl) statusEl.textContent = filledCount === 7 ? 'Status: Siap Diuji!' : 'Status: ' + filledCount + ' / 7 Langkah Terpasang';
}

function setInspectorComment(text) {
  const el = document.getElementById('m1-inspector-text');
  if (el) el.textContent = text;
}

function renderMission1Pool() {
  const poolEl = document.getElementById('m1-pool');
  if (!poolEl) return;
  poolEl.innerHTML = '';
  const correctIds = GAME_CONFIG.mission1.steps.map(function(s) { return s.id; });
  m1_pool_data.forEach(function(step) {
    const isDistractor = correctIds.indexOf(step.id) === -1;
    const card = document.createElement('div');
    card.className = 'step-card' + (isDistractor ? ' distractor-card' : '');
    card.draggable = true;
    card.dataset.id = step.id;
    card.innerHTML = '<div class="step-card-icon">' + step.icon + '</div><div class="step-card-info"><div class="step-card-label">' + step.label + (isDistractor ? ' <span class="distractor-tag">⚠️JEBAKAN?</span>' : '') + '</div><div class="step-card-desc">' + step.desc + '</div></div>';
    card.onclick = function() { if (m1_is_running) return; sfxClick(); placeInFirstEmptySlot(step.id); };
    card.ondragstart = function(e) { if (m1_is_running) return; m1_dragged_id = step.id; card.classList.add('dragging'); e.dataTransfer.setData('text/plain', step.id); };
    card.ondragend = function() { card.classList.remove('dragging'); };
    poolEl.appendChild(card);
  });
}

function renderMission1Slots() {
  const slotsEl = document.getElementById('m1-slots');
  if (!slotsEl) return;
  slotsEl.innerHTML = '';
  const allSteps = GAME_CONFIG.mission1.steps.concat(GAME_CONFIG.mission1.distractors || []);
  for (let i = 0; i < 7; i++) {
    const slot = document.createElement('div');
    slot.className = 'build-slot';
    slot.dataset.index = i;
    const stepId   = m1_slots_data[i];
    const stepData = stepId ? allSteps.find(function(s) { return s.id === stepId; }) : null;
    if (stepData) {
      slot.classList.add('filled');
      slot.innerHTML = '<div class="slot-number">' + (i+1) + '.</div><div class="slot-indicator"></div><div class="step-card-icon">' + stepData.icon + '</div><div class="step-card-info"><div class="step-card-label">' + stepData.label + '</div><div class="step-card-desc">' + stepData.desc + '</div></div><span style="font-size:0.75rem;color:var(--c-text-dim);cursor:pointer;margin-left:auto;" title="Kembalikan">✕</span>';
      slot.onclick = function() { if (m1_is_running) return; sfxClick(); returnFromSlotToPool(i); };
    } else {
      slot.innerHTML = '<div class="slot-number">' + (i+1) + '.</div><div class="slot-indicator"></div><div class="slot-placeholder">Langkah #' + (i+1) + ': Tarik atau klik kartu dari kiri</div>';
    }
    slot.ondragover  = function(e) { if (m1_is_running) return; e.preventDefault(); slot.classList.add('drag-over'); };
    slot.ondragleave = function() { slot.classList.remove('drag-over'); };
    slot.ondrop = function(e) {
      if (m1_is_running) return;
      e.preventDefault(); slot.classList.remove('drag-over');
      const did = e.dataTransfer.getData('text/plain') || m1_dragged_id;
      if (did) dropIntoSlot(did, i);
    };
    slotsEl.appendChild(slot);
  }
}

function placeInFirstEmptySlot(stepId) {
  const emptyIdx = m1_slots_data.indexOf(null);
  if (emptyIdx === -1) return;
  m1_pool_data = m1_pool_data.filter(function(s) { return s.id !== stepId; });
  m1_slots_data[emptyIdx] = stepId;
  sfxHammer(); updateStagePreview(); renderMission1Pool(); renderMission1Slots();
}

function returnFromSlotToPool(slotIdx) {
  const stepId = m1_slots_data[slotIdx];
  if (!stepId) return;
  const allSteps = GAME_CONFIG.mission1.steps.concat(GAME_CONFIG.mission1.distractors || []);
  const stepData = allSteps.find(function(s) { return s.id === stepId; });
  if (stepData) m1_pool_data.push(stepData);
  m1_slots_data[slotIdx] = null;
  updateStagePreview(); renderMission1Pool(); renderMission1Slots();
}

function dropIntoSlot(stepId, slotIdx) {
  const allSteps = GAME_CONFIG.mission1.steps.concat(GAME_CONFIG.mission1.distractors || []);
  if (m1_slots_data[slotIdx]) {
    const ex = allSteps.find(function(s) { return s.id === m1_slots_data[slotIdx]; });
    if (ex) m1_pool_data.push(ex);
  }
  m1_pool_data = m1_pool_data.filter(function(s) { return s.id !== stepId; });
  const oldSlotIdx = m1_slots_data.indexOf(stepId);
  if (oldSlotIdx !== -1 && oldSlotIdx !== slotIdx) m1_slots_data[oldSlotIdx] = null;
  m1_slots_data[slotIdx] = stepId;
  sfxHammer(); updateStagePreview(); renderMission1Pool(); renderMission1Slots();
}

function resetMission1() {
  if (m1_is_running) return;
  sfxClick();
  if (m1_timer_interval) { clearInterval(m1_timer_interval); m1_timer_interval = null; }
  initMission1();
}

function checkMission1() {
  if (m1_is_running) return;
  const unfilled = m1_slots_data.some(function(id) { return id === null; });
  if (unfilled) { sfxFail(); showToast('⚠️ Yang Mulia, seluruh 7 slot harus terisi terlebih dahulu!', 'warn'); return; }

  m1_is_running = true;
  if (m1_timer_interval) { clearInterval(m1_timer_interval); m1_timer_interval = null; }
  const submitBtn = document.getElementById('m1-submit-btn');
  if (submitBtn) submitBtn.disabled = true;

  const correctOrder  = GAME_CONFIG.mission1.steps.map(function(s) { return s.id; });
  const distractorIds = (GAME_CONFIG.mission1.distractors || []).map(function(s) { return s.id; });
  const slotsEl       = document.getElementById('m1-slots');
  let currentStep = 0;
  m1_combo = 0;
  resetStageLayers();

  const stepInterval = setInterval(function() {
    if (currentStep < 7) {
      const stepId = m1_slots_data[currentStep];
      const slotEl = slotsEl ? slotsEl.children[currentStep] : null;

      if (distractorIds.indexOf(stepId) !== -1) {
        clearInterval(stepInterval); m1_is_running = false;
        if (submitBtn) submitBtn.disabled = false;
        if (slotEl) slotEl.classList.add('error');
        sfxFail();
        const collapseEl = document.getElementById('m1-collapse-overlay');
        if (collapseEl) collapseEl.classList.add('active');
        setInspectorComment('"🚨 JEBAKAN DITEMUKAN! Kartu ini adalah sabotase konstruksi! Keluarkan dari urutan!"');
        m1_combo = 0; updateM1ComboDisplay();
        gameState.attempts[0]++; updateMission1HUD();
        showToast('💥 Kartu JEBAKAN ditemukan! Keluarkan dari urutan!', 'danger', 3000);
        setTimeout(function() { if (collapseEl) collapseEl.classList.remove('active'); updateStagePreview(); }, 2200);
        setTimeout(function() { m1_timer_sec = GAME_CONFIG.mission1.timer_seconds || 90; m1_timer_interval = setInterval(tickM1Timer, 1000); updateM1TimerDisplay(); }, 2300);
        return;
      }

      const foundIdx = m1_slots_data.indexOf('foundation');
      const wallIdx  = m1_slots_data.indexOf('walls');
      let isStepValid = (stepId === correctOrder[currentStep]);
      if (stepId === 'walls' && (foundIdx === -1 || foundIdx > currentStep)) isStepValid = false;
      if (stepId === 'roof'  && (wallIdx  === -1 || wallIdx  > currentStep)) isStepValid = false;

      if (isStepValid) {
        if (slotEl) { slotEl.classList.remove('error'); slotEl.classList.add('success-light'); }
        const layerEl = document.getElementById('layer-' + stepId);
        if (layerEl) layerEl.classList.add('active');
        sfxHammer(); m1_combo++;
        if (m1_combo >= 3) { sfxCombo(); showToast('🔥 COMBO x' + m1_combo + '! Pembangunan berjalan mulus!', 'success', 1500); }
        updateM1ComboDisplay();
        setInspectorComment('"Langkah ' + (currentStep + 1) + ' (' + stepId + ') dieksekusi dengan presisi!"');
        currentStep++;
      } else {
        clearInterval(stepInterval); m1_is_running = false;
        if (submitBtn) submitBtn.disabled = false;
        if (slotEl) slotEl.classList.add('error');
        sfxCollapse();
        const collapseEl = document.getElementById('m1-collapse-overlay');
        if (collapseEl) collapseEl.classList.add('active');
        let reason = 'Urutan tidak berurutan!';
        if (stepId === 'roof'  && currentStep < 3) reason = 'Bagaimana mungkin memasang atap sebelum dinding berdiri?';
        else if (stepId === 'walls' && foundIdx > currentStep) reason = 'Dinding batu tidak bisa berdiri tanpa fondasi galian!';
        else if (stepId === 'flag'  && currentStep < 6) reason = 'Tiang bendera tidak bisa dikibarkan jika kastil belum berdiri!';
        else reason = 'Langkah "' + stepId + '" dipanggil terlalu dini!';
        setInspectorComment('"🚨 KASTIL RUNTUH! ' + reason + '"');
        m1_combo = 0; updateM1ComboDisplay();
        gameState.attempts[0]++; updateMission1HUD();
        showToast('💥 KASTIL RUNTUH! Urutan langkah salah!', 'danger', 3000);
        setTimeout(function() { if (collapseEl) collapseEl.classList.remove('active'); updateStagePreview(); }, 2200);
        setTimeout(function() { m1_timer_sec = GAME_CONFIG.mission1.timer_seconds || 90; m1_timer_interval = setInterval(tickM1Timer, 1000); updateM1TimerDisplay(); }, 2300);
      }
    } else {
      clearInterval(stepInterval); m1_is_running = false;
      if (submitBtn) submitBtn.disabled = false;
      const attempts = gameState.attempts[0];
      const timeBonus = m1_timer_sec > 60 ? 50 : m1_timer_sec > 30 ? 20 : 0;
      const score = Math.max(100, 300 - (attempts * 40) + timeBonus);
      const stars = attempts === 0 ? 3 : attempts <= 2 ? 2 : 1;
      gameState.completed[0] = true; gameState.scores[0] = score; gameState.stars[0] = stars;
      saveGameData();
      setInspectorComment('"🏆 LUAR BIASA! Seluruh 7 langkah sekuensial dieksekusi sempurna. Kastil berdiri megah!"');
      setTimeout(function() {
        showResult({ success: true, icon: '🏰', title: 'Kastil Utama Berdiri Megah!', stars: stars, score: score, sub: 'Urutan sekuensial dieksekusi dengan presisi!' + (timeBonus > 0 ? ' <strong>+' + timeBonus + ' BONUS WAKTU!</strong>' : ''), nextPage: 'recap-1', retryMission: 1 });
      }, 700);
    }
  }, 450);
}

// ============================================================
// LEVEL 2: KEBIJAKAN KERAJAAN (IF-ELSE + TIMER PER SKENARIO)
// ============================================================
let m2_case_idx = 0;
let m2_vitals = { water: 60, security: 55, gold: 70, morale: 65 };
let m2_scene_timer_sec = 25;
let m2_scene_timer_interval = null;
let m2_choice_locked = false;

function initMission2() {
  m2_case_idx = 0;
  m2_vitals = Object.assign({}, GAME_CONFIG.mission2.initial_vitals);
  m2_choice_locked = false;
  if (m2_scene_timer_interval) { clearInterval(m2_scene_timer_interval); m2_scene_timer_interval = null; }
  updateMission2HUD(); updateVitalsDisplay(); renderMission2Case();
}

function updateMission2HUD() {
  const attemptsEl = document.getElementById('m2-attempts');
  const scoreEl    = document.getElementById('m2-hud-score');
  const starsEl    = document.getElementById('m2-hud-stars');
  const attempts = gameState.attempts[1];
  const estScore = Math.max(100, 300 - (attempts * 30));
  const estStars = attempts === 0 ? 3 : attempts <= 2 ? 2 : 1;
  if (attemptsEl) attemptsEl.textContent = 'Percobaan: ' + attempts;
  if (scoreEl)    scoreEl.textContent    = estScore;
  if (starsEl)    starsEl.textContent    = starsToEmoji(estStars);
}

function updateVitalsDisplay() {
  ['water', 'security', 'gold', 'morale'].forEach(function(k) {
    const val = Math.min(100, Math.max(0, m2_vitals[k]));
    const fillEl = document.getElementById('vital-fill-' + k);
    const valEl  = document.getElementById('vital-val-' + k);
    if (fillEl) { fillEl.style.width = val + '%'; fillEl.style.transition = 'width 0.6s ease'; }
    if (valEl)  valEl.textContent = k === 'gold' ? val + ' G' : val + '%';
  });
}

function startM2SceneTimer() {
  if (m2_scene_timer_interval) { clearInterval(m2_scene_timer_interval); m2_scene_timer_interval = null; }
  m2_scene_timer_sec = GAME_CONFIG.mission2.scenario_timer_seconds || 25;
  updateM2TimerDisplay();
  m2_scene_timer_interval = setInterval(function() {
    m2_scene_timer_sec--;
    updateM2TimerDisplay();
    if (m2_scene_timer_sec <= 5 && m2_scene_timer_sec > 0) sfxAlarm();
    if (m2_scene_timer_sec <= 0) {
      clearInterval(m2_scene_timer_interval); m2_scene_timer_interval = null;
      if (!m2_choice_locked) {
        const scenario = GAME_CONFIG.mission2.scenarios[m2_case_idx];
        if (scenario) {
          const worstChoice = scenario.choices.find(function(c) { return !c.correct; }) || scenario.choices[scenario.choices.length - 1];
          showToast('⏰ Waktu habis! Keputusan terburuk otomatis dipilih!', 'danger', 3000);
          handlePolicyChoice(worstChoice, null);
        }
      }
    }
  }, 1000);
}

function updateM2TimerDisplay() {
  const el = document.getElementById('m2-timer-display');
  if (!el) return;
  const m = Math.floor(m2_scene_timer_sec / 60).toString().padStart(2, '0');
  const s = (m2_scene_timer_sec % 60).toString().padStart(2, '0');
  el.textContent = m + ':' + s;
  const wrap = document.getElementById('m2-timer-wrap');
  if (wrap) { if (m2_scene_timer_sec <= 8) wrap.classList.add('urgent'); else wrap.classList.remove('urgent'); }
}

function renderMission2Case() {
  const scenario = GAME_CONFIG.mission2.scenarios[m2_case_idx];
  if (!scenario) return;
  m2_choice_locked = false;
  const messengerImg = document.getElementById('m2-messenger-avatar');
  if (messengerImg) messengerImg.src = scenario.messenger;
  document.getElementById('m2-zone-label').textContent    = scenario.zone;
  document.getElementById('m2-case-title').textContent    = scenario.title;
  document.getElementById('m2-reading-label').textContent  = scenario.reading_label;
  const readingValEl  = document.getElementById('m2-reading-value');
  const statusBadgeEl = document.getElementById('m2-status-badge');
  readingValEl.textContent = scenario.reading_value;
  readingValEl.className   = 'policy-reading-value ' + scenario.reading_color;
  statusBadgeEl.textContent = scenario.reading_status;
  statusBadgeEl.className   = 'policy-status-badge ' + scenario.reading_color;
  document.getElementById('m2-condition-code').textContent = scenario.condition_display;
  document.getElementById('m2-progress-text').textContent  = 'Kasus ' + (m2_case_idx + 1) + ' dari 3';
  const feedbackEl = document.getElementById('m2-feedback');
  const nextBtn    = document.getElementById('m2-next-case-btn');
  feedbackEl.className = 'choice-feedback'; feedbackEl.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';
  const choicesCont = document.getElementById('m2-choices');
  choicesCont.innerHTML = '';
  scenario.choices.forEach(function(ch) {
    const btn = document.createElement('button');
    btn.className = 'choice-btn'; btn.innerHTML = ch.label;
    btn.onclick = function() { handlePolicyChoice(ch, btn); };
    choicesCont.appendChild(btn);
  });
  startM2SceneTimer();
}

function handlePolicyChoice(choice, clickedBtn) {
  if (m2_choice_locked) return;
  m2_choice_locked = true;
  if (m2_scene_timer_interval) { clearInterval(m2_scene_timer_interval); m2_scene_timer_interval = null; }
  const allBtns    = document.querySelectorAll('#m2-choices .choice-btn');
  const feedbackEl = document.getElementById('m2-feedback');
  const nextBtn    = document.getElementById('m2-next-case-btn');
  allBtns.forEach(function(b) { b.disabled = true; });
  feedbackEl.style.display = 'block'; feedbackEl.innerHTML = choice.feedback;
  if (choice.effects) {
    Object.keys(choice.effects).forEach(function(k) { m2_vitals[k] = (m2_vitals[k] || 50) + choice.effects[k]; });
    updateVitalsDisplay();
  }
  if (choice.correct) {
    if (clickedBtn) clickedBtn.classList.add('correct');
    feedbackEl.className = 'choice-feedback show correct-fb'; sfxSuccess();
    if (nextBtn) { nextBtn.style.display = 'inline-flex'; nextBtn.textContent = (m2_case_idx === 2) ? '🏆 Selesaikan Kebijakan' : 'Lanjutkan Kasus Berikutnya ▶'; }
  } else {
    if (clickedBtn) clickedBtn.classList.add('wrong');
    feedbackEl.className = 'choice-feedback show wrong-fb'; sfxFail();
    gameState.attempts[1]++; updateMission2HUD();
    showToast('❌ Keputusan keliru! Pilar kerajaan melemah!', 'danger', 2500);
    setTimeout(function() {
      allBtns.forEach(function(b) { b.disabled = false; b.classList.remove('wrong'); });
      feedbackEl.style.display = 'none'; m2_choice_locked = false; startM2SceneTimer();
    }, 2000);
  }
}

function nextPolicyCase() {
  if (m2_scene_timer_interval) { clearInterval(m2_scene_timer_interval); m2_scene_timer_interval = null; }
  m2_case_idx++;
  if (m2_case_idx < 3) { sfxClick(); renderMission2Case(); }
  else {
    const attempts = gameState.attempts[1];
    const score = Math.max(100, 300 - (attempts * 30));
    const stars = attempts === 0 ? 3 : attempts <= 2 ? 2 : 1;
    gameState.completed[1] = true; gameState.scores[1] = score; gameState.stars[1] = stars;
    saveGameData();
    showResult({ success: true, icon: '🛡️', title: 'Kebijakan Rakyat Ditegakkan!', stars: stars, score: score, sub: 'Seluruh masalah diselesaikan dengan logika IF-ELSE yang tepat!', nextPage: 'recap-2', retryMission: 2 });
  }
}

// ============================================================
// LEVEL 3: PANEN RAYA (LOOP + KAPASITAS GEROBAK + MINI-GAME KLIK)
// ============================================================
let m3_selected_loop   = 4;
let m3_speed           = 1500;
let m3_is_running      = false;
let m3_total_harvested = 0;
let m3_current_run     = 1;
let m3_total_runs      = 3;
let m3_click_timeout   = null;
let m3_waiting_village = null;
let m3_run_skipped     = 0;

function initMission3() {
  m3_selected_loop    = 4;
  m3_speed            = 1500;
  m3_is_running       = false;
  m3_total_harvested  = 0;
  m3_current_run      = 1;
  m3_total_runs       = Math.ceil(12 / (GAME_CONFIG.mission3.cart_capacity || 5));
  m3_run_skipped      = 0;
  m3_waiting_village  = null;
  if (m3_click_timeout) { clearTimeout(m3_click_timeout); m3_click_timeout = null; }
  updateMission3HUD(); renderMission3ManualList(); renderMission3LoopButtons(); renderMission3SpeedSelector(); renderMission3Villages(); updateSiloFill(0); updateM3RunStatus();
  const runBtn = document.getElementById('m3-run-btn');
  const nextRunBtn = document.getElementById('m3-next-run-btn');
  if (runBtn) { runBtn.disabled = false; runBtn.style.display = 'inline-flex'; }
  if (nextRunBtn) nextRunBtn.style.display = 'none';
}

function updateM3RunStatus() {
  const currentEl   = document.getElementById('m3-run-current');
  const totalEl     = document.getElementById('m3-runs-total');
  const harvestedEl = document.getElementById('m3-harvested-count');
  if (currentEl)   currentEl.textContent = m3_current_run;
  if (totalEl)     totalEl.textContent   = m3_total_runs;
  if (harvestedEl) harvestedEl.textContent = m3_total_harvested;
}

function updateMission3HUD() {
  const attemptsEl = document.getElementById('m3-attempts');
  const scoreEl    = document.getElementById('m3-hud-score');
  const starsEl    = document.getElementById('m3-hud-stars');
  const attempts = gameState.attempts[2];
  const estScore = Math.max(100, 300 - (attempts * 30));
  const estStars = attempts === 0 ? 3 : attempts <= 1 ? 2 : 1;
  if (attemptsEl) attemptsEl.textContent = 'Percobaan: ' + attempts;
  if (scoreEl)    scoreEl.textContent    = estScore;
  if (starsEl)    starsEl.textContent    = starsToEmoji(estStars);
}

function renderMission3ManualList() {
  const listEl = document.getElementById('m3-manual-list');
  if (!listEl) return;
  listEl.innerHTML = '';
  for (let i = 1; i <= 12; i++) {
    ['datangi_dusun', 'timbang_angkut_gandum', 'simpan_ke_lumbung'].forEach(function(fn, j) {
      const line = document.createElement('div');
      line.className = 'manual-line';
      line.textContent = (i * 3 - (2 - j)) + '. ' + fn + '("Dusun ' + i + '")';
      listEl.appendChild(line);
    });
  }
}

function renderMission3LoopButtons() {
  const btnCont = document.getElementById('m3-loop-buttons');
  if (!btnCont) return;
  btnCont.innerHTML = '';
  GAME_CONFIG.mission3.loop_options.forEach(function(count) {
    const btn = document.createElement('button');
    btn.className = 'loop-count-btn' + (count === m3_selected_loop ? ' active' : '');
    btn.textContent = count;
    btn.onclick = function() {
      if (m3_is_running) return;
      sfxClick(); m3_selected_loop = count;
      document.querySelectorAll('.loop-count-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
    };
    btnCont.appendChild(btn);
  });
}

function renderMission3SpeedSelector() {
  const selCont = document.getElementById('m3-speed-selector');
  if (!selCont) return;
  selCont.innerHTML = '';
  GAME_CONFIG.mission3.speed_options.forEach(function(s) {
    const btn = document.createElement('button');
    btn.className = 'speed-btn' + (s.val === m3_speed ? ' active' : '');
    btn.textContent = s.label;
    btn.onclick = function() {
      if (m3_is_running) return;
      sfxClick(); m3_speed = s.val;
      document.querySelectorAll('.speed-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
    };
    selCont.appendChild(btn);
  });
}

function renderMission3Villages() {
  const grid = document.getElementById('m3-villages');
  if (!grid) return;
  grid.innerHTML = '';
  GAME_CONFIG.mission3.villages.forEach(function(v) {
    const item = document.createElement('div');
    item.className = 'village-item';
    item.id = 'village-item-' + v.id;
    item.innerHTML = '<span class="village-emoji">🌾</span><span class="village-item-label">' + v.name + '</span><div class="village-collect-bar"></div>';
    grid.appendChild(item);
  });
}

function updateSiloFill(count) {
  const fillEl = document.getElementById('m3-silo-fill');
  const valEl  = document.getElementById('m3-silo-val');
  if (fillEl) fillEl.style.height = ((count / 12) * 100) + '%';
  if (valEl)  valEl.textContent = count + ' / 12 Desa';
}

function resetMission3() {
  if (m3_is_running) return;
  sfxClick();
  if (m3_click_timeout) { clearTimeout(m3_click_timeout); m3_click_timeout = null; }
  initMission3();
}

function runLoopHarvest() {
  if (m3_is_running) return;
  const cart_capacity = GAME_CONFIG.mission3.cart_capacity || 5;
  const startVillage  = (m3_current_run - 1) * cart_capacity + 1;
  const maxEnd        = Math.min(startVillage + cart_capacity - 1, 12);

  if (startVillage > 12) { showToast('✅ Semua desa sudah dipanen!', 'success', 2000); return; }
  if (m3_selected_loop > cart_capacity) {
    showToast('⚠️ Loop ' + m3_selected_loop + ' melebihi kapasitas gerobak (' + cart_capacity + ')! Maksimal ' + cart_capacity + '.', 'warn', 3000);
    return;
  }

  m3_is_running = true;
  const runBtn = document.getElementById('m3-run-btn');
  if (runBtn) runBtn.disabled = true;
  const endPreview = Math.min(startVillage + m3_selected_loop - 1, maxEnd);
  showToast('🚜 Ronde ' + m3_current_run + ': Gerobak menuju Dusun ' + startVillage + '–' + endPreview + '!', 'info', 2000);

  var currentVillage = startVillage;

  function visitNext() {
    var endVillage = Math.min(startVillage + m3_selected_loop - 1, maxEnd);
    if (currentVillage > endVillage || currentVillage > 12) {
      m3_is_running = false;
      if (runBtn) runBtn.disabled = false;
      updateM3RunStatus();
      if (m3_total_harvested >= 12) {
        const attempts = gameState.attempts[2];
        const score = Math.max(100, 300 - (m3_run_skipped * 15) - (attempts * 30));
        const stars = m3_run_skipped === 0 ? 3 : m3_run_skipped <= 2 ? 2 : 1;
        gameState.completed[2] = true; gameState.scores[2] = score; gameState.stars[2] = stars;
        saveGameData();
        showResult({ success: true, icon: '🌾', title: 'Panen Raya Berhasil!', stars: stars, score: score, sub: 'Dengan ' + m3_current_run + ' ronde loop, semua 12 desa dipanen!' + (m3_run_skipped > 0 ? ' (' + m3_run_skipped + ' terlewat)' : ' <strong>Sempurna!</strong>'), nextPage: 'recap-3', retryMission: 3 });
      } else {
        const nextRunBtn = document.getElementById('m3-next-run-btn');
        if (m3_current_run < m3_total_runs) {
          if (nextRunBtn) nextRunBtn.style.display = 'inline-flex';
          showToast('✅ Ronde ' + m3_current_run + ' selesai! ' + m3_total_harvested + '/12 desa. Lanjut ronde berikutnya!', 'success', 3000);
        } else {
          sfxFail(); gameState.attempts[2]++; updateMission3HUD();
          showToast('❌ Semua ronde habis! Hanya ' + m3_total_harvested + '/12 dipanen. Atur ulang!', 'danger', 4000);
          setTimeout(function() { initMission3(); }, 2000);
        }
      }
      return;
    }

    const vEl = document.getElementById('village-item-' + currentVillage);
    if (!vEl || vEl.classList.contains('collected') || vEl.classList.contains('missed')) {
      currentVillage++;
      setTimeout(visitNext, m3_speed * 0.3);
      return;
    }

    m3_waiting_village = currentVillage;
    if (vEl) vEl.classList.add('blinking');
    sfxWater();

    var capturedVid = currentVillage;
    function clickHandler() {
      if (m3_waiting_village === capturedVid) {
        if (m3_click_timeout) { clearTimeout(m3_click_timeout); m3_click_timeout = null; }
        harvestVillageSuccess(capturedVid);
        currentVillage++;
        setTimeout(visitNext, m3_speed * 0.5);
      }
    }
    if (vEl) vEl.addEventListener('click', clickHandler, { once: true });

    m3_click_timeout = setTimeout(function() {
      m3_click_timeout = null;
      if (m3_waiting_village === capturedVid) {
        if (vEl) vEl.removeEventListener('click', clickHandler);
        harvestVillageMiss(capturedVid);
        currentVillage++;
        setTimeout(visitNext, m3_speed * 0.4);
      }
    }, 2000);
  }

  visitNext();
}

function harvestVillageSuccess(vid) {
  m3_waiting_village = null;
  const vEl = document.getElementById('village-item-' + vid);
  if (vEl) { vEl.classList.remove('blinking'); vEl.classList.add('collected'); }
  m3_total_harvested++; sfxCoin(); updateSiloFill(m3_total_harvested); updateM3RunStatus();
  const village = GAME_CONFIG.mission3.villages[vid - 1];
  showToast('🌾 Dusun ' + vid + ' dipanen! (+' + (village ? village.yield : 40) + ' karung)', 'success', 1000);
}

function harvestVillageMiss(vid) {
  m3_waiting_village = null;
  const vEl = document.getElementById('village-item-' + vid);
  if (vEl) { vEl.classList.remove('blinking'); vEl.classList.add('missed'); }
  m3_run_skipped++; sfxFail();
  showToast('⏰ Dusun ' + vid + ' terlewat! Terlambat klik!', 'danger', 1500);
}

function nextHarvestRun() {
  const nextRunBtn = document.getElementById('m3-next-run-btn');
  if (nextRunBtn) nextRunBtn.style.display = 'none';
  m3_current_run++;
  updateM3RunStatus(); renderMission3LoopButtons(); sfxClick();
  showToast('🚜 Ronde ' + m3_current_run + ' dimulai! Atur loop dan jalankan!', 'info', 2000);
}

// ============================================================
// LEVEL 4: KRISIS KERAJAAN (DEKOMPOSISI — NO MORE prompt/alert!)
// ============================================================
let m4_timer_sec = 45;
let m4_timer_interval = null;
let m4_minister_assignments = { water: [], health: [], defense: [] };
let m4_dragged_task_id = null;

function initMission4() {
  m4_minister_assignments = { water: [], health: [], defense: [] };
  m4_timer_sec = GAME_CONFIG.mission4.timer_seconds;
  clearInterval(m4_timer_interval);
  m4_timer_interval = setInterval(tickMission4Timer, 1000);
  document.getElementById('m4-workspace').style.display = 'grid';
  document.getElementById('m4-parallel-sim').style.display = 'none';
  const runBtn = document.getElementById('m4-run-btn');
  if (runBtn) runBtn.disabled = false;
  updateMission4HUD(); updateMission4TimerDisplay(); renderMission4TaskPool(); renderMission4Ministers();
}

function updateMission4HUD() {
  const attemptsEl = document.getElementById('m4-attempts');
  const scoreEl    = document.getElementById('m4-hud-score');
  const starsEl    = document.getElementById('m4-hud-stars');
  const attempts = gameState.attempts[3];
  const estScore = Math.max(100, 300 - (attempts * 30));
  const estStars = attempts === 0 ? 3 : attempts <= 1 ? 2 : 1;
  if (attemptsEl) attemptsEl.textContent = 'Percobaan: ' + attempts;
  if (scoreEl)    scoreEl.textContent    = estScore;
  if (starsEl)    starsEl.textContent    = starsToEmoji(estStars);
}

function tickMission4Timer() {
  if (m4_timer_sec > 0) {
    m4_timer_sec--; updateMission4TimerDisplay();
    if (m4_timer_sec <= 10) sfxAlarm();
  } else {
    clearInterval(m4_timer_interval); sfxCollapse();
    showToast('⏰ WAKTU HABIS! Bencana menghancurkan kerajaan!', 'danger', 4000);
    showCustomModal({ icon: '⏰', title: 'Waktu Habis!', body: 'Bencana menimpa kerajaan sebelum menteri bergerak! Bertindak lebih cepat!', buttons: [{ label: '🔄 Atur Ulang Strategi', style: 'primary', action: function() { resetMission4(); } }] });
  }
}

function updateMission4TimerDisplay() {
  const timerEl = document.getElementById('m4-timer');
  const barEl   = document.getElementById('m4-timer-bar');
  if (!timerEl || !barEl) return;
  const m = Math.floor(m4_timer_sec / 60).toString().padStart(2, '0');
  const s = (m4_timer_sec % 60).toString().padStart(2, '0');
  timerEl.textContent = m + ':' + s;
  if (m4_timer_sec <= 15) timerEl.classList.add('urgent'); else timerEl.classList.remove('urgent');
  barEl.style.width = ((m4_timer_sec / GAME_CONFIG.mission4.timer_seconds) * 100) + '%';
}

function renderMission4TaskPool() {
  const poolEl = document.getElementById('m4-task-pool');
  if (!poolEl) return;
  poolEl.innerHTML = '';
  const assignedIds = m4_minister_assignments.water.concat(m4_minister_assignments.health).concat(m4_minister_assignments.defense);
  const poolTasks = GAME_CONFIG.mission4.tasks.filter(function(t) { return assignedIds.indexOf(t.id) === -1; });
  poolTasks.forEach(function(task) {
    const card = document.createElement('div');
    card.className = 'task-card'; card.draggable = true; card.dataset.id = task.id;
    card.innerHTML = '<span class="task-card-icon">' + task.icon + '</span><span style="flex:1;">' + task.label + '</span><span class="task-tip-badge">' + task.tip + '</span>';
    card.onclick = function() { showMinisterPickerModal(task); };
    card.ondragstart = function(e) { m4_dragged_task_id = task.id; card.classList.add('dragging'); e.dataTransfer.setData('text/plain', task.id); };
    card.ondragend = function() { card.classList.remove('dragging'); };
    poolEl.appendChild(card);
  });
}

function showMinisterPickerModal(task) {
  sfxClick();
  var buttons = GAME_CONFIG.mission4.teams.map(function(team) {
    return { label: team.icon + ' ' + team.label, style: 'ghost', action: function() { assignTaskToMinister(task.id, team.id); } };
  });
  buttons.push({ label: '✕ Batal', style: 'ghost', action: null });
  showCustomModal({ icon: task.icon, title: 'Tugaskan: ' + task.label, body: '<p style="color:var(--c-text-dim);font-size:0.85rem;">' + task.tip + ' — Pilih menteri yang tepat:</p>', buttons: buttons });
}

function renderMission4Ministers() {
  ['water', 'health', 'defense'].forEach(function(cat) {
    const countEl = document.getElementById('count-' + cat);
    const tasksEl = document.getElementById('tasks-' + cat);
    const list = m4_minister_assignments[cat];
    if (countEl) { countEl.textContent = list.length + ' / 3'; if (list.length === 3) countEl.classList.add('full'); else countEl.classList.remove('full'); }
    if (tasksEl) {
      tasksEl.innerHTML = '';
      if (list.length === 0) { tasksEl.innerHTML = '<div class="minister-task-empty">Tarik / Klik tugas ke sini</div>'; }
      else {
        list.forEach(function(taskId) {
          const task = GAME_CONFIG.mission4.tasks.find(function(t) { return t.id === taskId; });
          if (!task) return;
          const card = document.createElement('div');
          card.className = 'task-card in-team';
          card.innerHTML = '<span class="task-card-icon">' + task.icon + '</span><span>' + task.label + '</span><span style="margin-left:auto;color:var(--c-text-dim);cursor:pointer;" title="Kembalikan">✕</span>';
          card.onclick = function() {
            sfxClick();
            m4_minister_assignments[cat] = m4_minister_assignments[cat].filter(function(id) { return id !== taskId; });
            renderMission4TaskPool(); renderMission4Ministers();
          };
          tasksEl.appendChild(card);
        });
      }
    }
  });
}

function allowDrop(e) { e.preventDefault(); }

function handleTaskDrop(e, category) {
  e.preventDefault();
  const taskId = e.dataTransfer.getData('text/plain') || m4_dragged_task_id;
  if (taskId) assignTaskToMinister(taskId, category);
}

function assignTaskToMinister(taskId, category) {
  if (m4_minister_assignments[category].length >= 3) {
    sfxFail(); showToast('⚠️ Menteri ini sudah penuh! Kapasitas 3 tugas per menteri.', 'warn', 3000); return;
  }
  ['water', 'health', 'defense'].forEach(function(cat) {
    m4_minister_assignments[cat] = m4_minister_assignments[cat].filter(function(id) { return id !== taskId; });
  });
  m4_minister_assignments[category].push(taskId);
  sfxHammer(); renderMission4TaskPool(); renderMission4Ministers();
}

function resetMission4() { sfxClick(); initMission4(); }

function checkMission4() {
  const totalAssigned = m4_minister_assignments.water.length + m4_minister_assignments.health.length + m4_minister_assignments.defense.length;
  if (totalAssigned < 9) { sfxFail(); showToast('⚠️ Seluruh 9 tugas harus dibagi ke 3 menteri (masing-masing tepat 3)!', 'warn', 3500); return; }
  var allCorrect = true; var wrongTasks = [];
  ['water', 'health', 'defense'].forEach(function(cat) {
    m4_minister_assignments[cat].forEach(function(taskId) {
      const task = GAME_CONFIG.mission4.tasks.find(function(t) { return t.id === taskId; });
      if (task.category !== cat) { allCorrect = false; wrongTasks.push(task.label); }
    });
  });
  if (allCorrect) {
    clearInterval(m4_timer_interval); sfxSuccess(); runParallelSimulation();
  } else {
    gameState.attempts[3]++; updateMission4HUD(); sfxFail();
    showCustomModal({ icon: '❌', title: 'Dekomposisi Salah!', body: '<p>Tugas salah didelegasikan:</p><ul style="text-align:left;margin:8px 0;padding-left:18px;">' + wrongTasks.map(function(t) { return '<li>' + t + '</li>'; }).join('') + '</ul><p style="color:var(--c-text-dim);font-size:0.85rem;">Pengairan→tata air, Kesehatan→wabah, Pertahanan→militer.</p>', buttons: [{ label: '🔄 Periksa Ulang', style: 'primary', action: null }] });
  }
}

function runParallelSimulation() {
  document.getElementById('m4-workspace').style.display = 'none';
  const simWrap = document.getElementById('m4-parallel-sim');
  simWrap.style.display = 'grid';
  const runBtn = document.getElementById('m4-run-btn');
  if (runBtn) runBtn.disabled = true;
  ['water', 'health', 'defense'].forEach(function(cat) {
    const itemsCont = document.getElementById('sim-items-' + cat);
    itemsCont.innerHTML = '';
    m4_minister_assignments[cat].forEach(function(taskId, idx) {
      const task = GAME_CONFIG.mission4.tasks.find(function(t) { return t.id === taskId; });
      const div = document.createElement('div');
      div.className = 'parallel-track-item active'; div.id = 'sim-item-' + taskId;
      div.textContent = task.icon + ' ' + task.label; div.style.animationDelay = (idx * 0.2) + 's';
      itemsCont.appendChild(div);
    });
  });
  let step = 0;
  const simInterval = setInterval(function() {
    step++;
    ['water', 'health', 'defense'].forEach(function(cat) {
      const bar = document.getElementById('sim-bar-' + cat);
      if (bar) bar.style.width = Math.min(100, step * 33.33) + '%';
    });
    sfxCoin();
    ['water', 'health', 'defense'].forEach(function(cat) {
      const taskId = m4_minister_assignments[cat][step - 1];
      if (taskId) { const el = document.getElementById('sim-item-' + taskId); if (el) el.className = 'parallel-track-item executing'; }
    });
    if (step >= 3) {
      clearInterval(simInterval);
      document.querySelectorAll('.parallel-track-item').forEach(function(el) { el.className = 'parallel-track-item done'; });
      setTimeout(function() {
        const attempts = gameState.attempts[3];
        const timeBonus = m4_timer_sec > 30 ? 30 : 0;
        const score = Math.max(100, 300 - (attempts * 30) + timeBonus);
        const stars = attempts === 0 ? 3 : attempts <= 1 ? 2 : 1;
        gameState.completed[3] = true; gameState.scores[3] = score; gameState.stars[3] = stars;
        saveGameData();
        showResult({ success: true, icon: '🏛️', title: 'Krisis Kerajaan Teratasi!', stars: stars, score: score, sub: '9 tugas didekomposisi ke 3 menteri, dieksekusi paralel — 3x lebih cepat!' + (timeBonus > 0 ? ' <strong>+BONUS KECEPATAN!</strong>' : ''), nextPage: 'recap-4', retryMission: 4 });
      }, 700);
    }
  }, 700);
}

// ============================================================
// RECAP & COMPLETE
// ============================================================
function renderRecap(lvl) {
  const cfg = GAME_CONFIG['mission' + lvl];
  if (!cfg) return;
  const stars = gameState.stars[lvl - 1];
  const score = gameState.scores[lvl - 1];
  const titleEl = document.getElementById('recap' + lvl + '-title');
  const starsEl = document.getElementById('recap' + lvl + '-stars');
  const scoreEl = document.getElementById('recap' + lvl + '-score');
  const codeEl  = document.getElementById('recap' + lvl + '-pseudocode');
  const factEl  = document.getElementById('recap' + lvl + '-funfact');
  const cptpEl  = document.getElementById('recap' + lvl + '-cptp');
  if (titleEl) titleEl.textContent = 'Wilayah ' + lvl + ': ' + cfg.title + ' Berhasil!';
  if (starsEl) starsEl.textContent = starsToEmoji(stars);
  if (scoreEl) scoreEl.textContent = '+' + score + ' Poin Kerajaan';
  if (codeEl)  codeEl.textContent  = cfg.pseudocode;
  if (factEl)  factEl.innerHTML    = cfg.funfact;
  if (cptpEl)  cptpEl.innerHTML    = cfg.cp_tp;
}

function renderComplete() {
  calcTotalScore();
  const totalStars = gameState.stars.reduce(function(a, b) { return a + b; }, 0);
  const finalScoreEl = document.getElementById('complete-final-score');
  const rankTitleEl  = document.getElementById('complete-rank-title');
  if (finalScoreEl) finalScoreEl.textContent = gameState.totalScore;
  if (rankTitleEl) { const badge = getBadge(totalStars); rankTitleEl.textContent = 'PENOBATAN: ' + badge.label.toUpperCase(); rankTitleEl.style.color = badge.color; }
  for (let i = 1; i <= 4; i++) {
    const sEl = document.getElementById('c-stars-' + i);
    const pEl = document.getElementById('c-score-' + i);
    if (sEl) sEl.textContent = starsToEmoji(gameState.stars[i - 1]);
    if (pEl) pEl.textContent = gameState.scores[i - 1] + ' pts';
  }
  sfxSuccess(); spawnConfetti();
}

// ===================== INITIALIZATION =====================
window.addEventListener('DOMContentLoaded', function() {
  loadSaveData();
  initAmbientParticles();
  renderCover();
});
