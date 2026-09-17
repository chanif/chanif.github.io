/* ============================================================
   Lab Perakitan Komputer — Main Engine
   SPA Navigation + 3 Simulasi + LKPD + Audio Synthesizer
   ============================================================ */

// ==================== GLOBAL STATE ====================
let currentPage = 'cover';
const visitedPages = new Set(['cover']);

const labState = {
  // Rakit PC state
  installed: {}, // { cpu: true, ram: true, ... }
  currentExploration: 'free',
  
  // Binary state
  bits: [0, 0, 0, 0, 0, 0, 0, 0], // bit7..bit0
  binarySolved: {},
  
  // RGB state
  r: 0, g: 0, b: 0,
  rgbSolved: {},
  
  // LKPD state
  pgAnswers: {},    // { 0: selectedIdx, 1: selectedIdx, ... }
  bsAnswers: {},    // { 0: true/false, ... }
  matchPairs: {},   // { leftId: rightId, ... }
  matchSelected: null, // current left selection
  lkpdSubmitted: false,
};

// ==================== AUDIO SYNTHESIZER ====================
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
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function sfxClick() { playTone(800, 0.08, 'square', 0.06); }
function sfxSnap() { playTone(1200, 0.06, 'square', 0.08); playTone(1600, 0.04, 'sine', 0.05); }
function sfxToggle() { playTone(600, 0.05, 'square', 0.07); }
function sfxSuccess() {
  playTone(523, 0.15, 'sine', 0.12);
  setTimeout(() => playTone(659, 0.15, 'sine', 0.12), 120);
  setTimeout(() => playTone(784, 0.25, 'sine', 0.12), 240);
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
function sfxSlider() { playTone(400 + Math.random() * 200, 0.03, 'sine', 0.04); }

// ==================== SPA NAVIGATION ====================
const PAGE_INDEX = {};

function goToPage(pageId) {
  const cfg = window.LAB_CONFIG;
  if (cfg) {
    cfg.pages.forEach((p, i) => PAGE_INDEX[p] = i + 1);
  }
  
  const oldPage = document.querySelector('.page.active');
  const newPage = document.getElementById('page-' + pageId);
  if (!newPage) return;

  if (oldPage && oldPage.id !== 'page-' + pageId) {
    oldPage.classList.remove('active');
  }
  newPage.classList.add('active');
  currentPage = pageId;
  visitedPages.add(pageId);

  updateTestingIndicator(pageId);
  updateProgressDots();

  // Lazy init
  if (pageId === 'teori') initTeori();
  if (pageId === 'prosedur') initProsedur();
  if (pageId === 'sim-rakit-pc') initRakitPC();
  if (pageId === 'sim-binary') initBinary();
  if (pageId === 'sim-rgb') initRGBMixer();
  if (pageId === 'lkpd') initLKPD();
  if (pageId === 'referensi') initReferensi();
  
  sfxClick();
}

function updateTestingIndicator(pageId) {
  const cfg = window.LAB_CONFIG;
  const el = document.getElementById('testing-indicator');
  if (!el) return;
  if (!cfg || cfg.is_testing !== 1) { el.style.display = 'none'; return; }
  const num = PAGE_INDEX[pageId] || '?';
  const label = (cfg.pageLabels && cfg.pageLabels[pageId]) || pageId;
  el.textContent = `[TEST] Hal. ${num} — ${label}`;
  el.style.display = 'block';
}

function updateProgressDots() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;
  const dots = cfg.progressDots || [];
  // Update all progress dot containers
  document.querySelectorAll('[id^="progress-dots-"]').forEach(container => {
    if (container.children.length === 0) {
      dots.forEach(d => {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        dot.setAttribute('data-label', d.label);
        dot.setAttribute('data-page', d.id);
        dot.onclick = () => goToPage(d.id);
        container.appendChild(dot);
      });
    }
    // Update states
    container.querySelectorAll('.progress-dot').forEach(dot => {
      const pid = dot.getAttribute('data-page');
      dot.classList.remove('active', 'visited');
      // Check if current page matches or is a sub-page
      if (pid === currentPage || 
          (pid === 'simulasi-menu' && ['sim-rakit-pc', 'sim-binary', 'sim-rgb'].includes(currentPage)) ||
          (pid === 'lkpd' && currentPage === 'lkpd-hasil')) {
        dot.classList.add('active');
      } else if (visitedPages.has(pid)) {
        dot.classList.add('visited');
      }
    });
  });
}

// ==================== INIT: TEORI ====================
let teoriInitialized = false;
function initTeori() {
  if (teoriInitialized) return;
  teoriInitialized = true;
  const cfg = window.LAB_CONFIG;
  if (!cfg || !cfg.teori) return;

  const pemantik = document.getElementById('teori-pemantik');
  if (pemantik) pemantik.textContent = cfg.teori.pemantik;

  const tabsContainer = document.getElementById('teori-tabs');
  const panelsContainer = document.getElementById('teori-panels');
  if (!tabsContainer || !panelsContainer) return;

  cfg.teori.tabs.forEach((tab, i) => {
    // Tab button
    const btn = document.createElement('button');
    btn.className = 'teori-tab' + (i === 0 ? ' active' : '');
    btn.textContent = `${tab.icon} ${tab.title}`;
    btn.onclick = () => switchTeoriTab(tab.id);
    tabsContainer.appendChild(btn);

    // Panel
    const panel = document.createElement('div');
    panel.className = 'teori-panel' + (i === 0 ? ' active' : '');
    panel.id = 'teori-panel-' + tab.id;
    panel.innerHTML = tab.content;
    panelsContainer.appendChild(panel);
  });

  // Render komponen grid in teori
  renderTeoriKomponenGrid();
}

function switchTeoriTab(tabId) {
  document.querySelectorAll('.teori-tab').forEach((t, i) => {
    const cfg = window.LAB_CONFIG;
    t.classList.toggle('active', cfg.teori.tabs[i].id === tabId);
  });
  document.querySelectorAll('.teori-panel').forEach(p => {
    p.classList.toggle('active', p.id === 'teori-panel-' + tabId);
  });
  const label = document.getElementById('teori-current-tab-label');
  const cfg = window.LAB_CONFIG;
  const tab = cfg.teori.tabs.find(t => t.id === tabId);
  if (label && tab) label.textContent = tab.title;
}

function renderTeoriKomponenGrid() {
  const cfg = window.LAB_CONFIG;
  const grid = document.getElementById('teori-komponen-grid');
  if (!grid || !cfg) return;
  
  grid.innerHTML = '';
  cfg.components.forEach(comp => {
    const item = document.createElement('div');
    item.className = 'komponen-grid-item';
    item.innerHTML = `<span class="kicon">${comp.icon}</span><span class="kname">${comp.shortName}</span>`;
    item.onclick = () => showTeoriKomponenDetail(comp);
    grid.appendChild(item);
  });
}

function showTeoriKomponenDetail(comp) {
  const panel = document.getElementById('teori-komponen-detail');
  if (!panel) return;
  
  document.querySelectorAll('.komponen-grid-item').forEach(el => el.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
  
  panel.innerHTML = `
    <h4 style="color:${comp.color}">${comp.icon} ${comp.name}</h4>
    <p style="font-weight:600;margin-bottom:0.3em;">${comp.description}</p>
    <p style="color:var(--c-text-muted);">💡 Analogi: ${comp.analogy}</p>
    <p style="font-size:0.82em;margin-top:0.3em;">${comp.details}</p>
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
    el.className = 'prosedur-step';
    el.innerHTML = `
      <div class="prosedur-num">${step.step}</div>
      <div class="prosedur-icon">${step.icon}</div>
      <div class="prosedur-text">${step.text}</div>
    `;
    list.appendChild(el);
  });
}

// ==================== SIMULASI: RAKIT PC ====================
let rakitInitialized = false;

function initRakitPC() {
  if (rakitInitialized) return;
  rakitInitialized = true;
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;

  renderComponentShelf();
  renderExplorationTabs();
  setupDragDrop();
}

function renderComponentShelf() {
  const cfg = window.LAB_CONFIG;
  const shelf = document.getElementById('component-shelf');
  if (!shelf || !cfg) return;

  // Keep title, clear rest
  const title = shelf.querySelector('.shelf-title');
  shelf.innerHTML = '';
  if (title) shelf.appendChild(title);

  cfg.components.forEach(comp => {
    const card = document.createElement('div');
    card.className = 'component-card';
    card.id = 'comp-' + comp.id;
    card.setAttribute('draggable', 'true');
    card.setAttribute('data-comp-id', comp.id);

    if (labState.installed[comp.id]) {
      card.classList.add('placed');
    }

    card.innerHTML = `
      <span class="comp-icon">${comp.icon}</span>
      <div class="comp-info">
        <div class="comp-name">${comp.shortName}</div>
        <div class="comp-desc">${comp.description}</div>
      </div>
      <button class="comp-info-btn" onclick="event.stopPropagation();showComponentInfo('${comp.id}')">?</button>
    `;

    // Click to place
    card.addEventListener('click', () => {
      if (labState.installed[comp.id]) return;
      clickToPlace(comp.id);
    });

    shelf.appendChild(card);
  });
}

function clickToPlace(compId) {
  const cfg = window.LAB_CONFIG;
  const comp = cfg.components.find(c => c.id === compId);
  if (!comp) return;

  const slot = document.getElementById(comp.slotId);
  if (!slot || labState.installed[compId]) return;

  placeComponent(compId, comp.slotId);
}

function placeComponent(compId, slotId) {
  const cfg = window.LAB_CONFIG;
  const comp = cfg.components.find(c => c.id === compId);
  if (!comp) return;

  labState.installed[compId] = true;

  // Update slot visual
  const slot = document.getElementById(slotId);
  if (slot) {
    slot.classList.add('filled');
    slot.innerHTML = `
      <span class="slot-component" onclick="removeComponent('${compId}')" title="Klik untuk melepas">
        ${comp.icon} ${comp.shortName} ✓
      </span>
      <span class="slot-label" style="font-size:0.55em;">Klik untuk melepas</span>
    `;
  }

  // Update shelf card
  const card = document.getElementById('comp-' + compId);
  if (card) card.classList.add('placed');

  updateInstalledCount();
  sfxSnap();
  appendBootLog(`> ${comp.shortName} terpasang ✅`);
}

function removeComponent(compId) {
  const cfg = window.LAB_CONFIG;
  const comp = cfg.components.find(c => c.id === compId);
  if (!comp) return;

  labState.installed[compId] = false;

  // Restore slot
  const slot = document.getElementById(comp.slotId);
  if (slot) {
    slot.classList.remove('filled');
    const accepts = slot.getAttribute('data-accepts') || compId;
    const slotLabels = { cpu: '⬡ CPU Socket', ram: '▬ RAM Slot', gpu: '▭ PCIe / GPU', ssd: '◻ Storage M.2', psu: '⚡ Power (PSU)' };
    const label = slotLabels[accepts] || accepts;
    slot.innerHTML = `<span class="slot-icon">${label.split(' ')[0]}</span><span class="slot-label">${label.substring(2)}</span>`;
  }

  // Restore shelf card
  const card = document.getElementById('comp-' + compId);
  if (card) card.classList.remove('placed');

  updateInstalledCount();
  appendBootLog(`> ${comp.shortName} dilepas ↩`);
}

function updateInstalledCount() {
  const count = Object.values(labState.installed).filter(v => v).length;
  const el = document.getElementById('installed-count');
  if (el) el.textContent = count;
}

function appendBootLog(text) {
  const monitor = document.getElementById('boot-monitor');
  if (!monitor) return;
  monitor.innerHTML += '\n' + text;
  monitor.scrollTop = monitor.scrollHeight;
}

function renderExplorationTabs() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('exploration-tabs');
  if (!container || !cfg) return;

  Object.values(cfg.explorationPresets).forEach(preset => {
    const tab = document.createElement('button');
    tab.className = 'exploration-tab' + (preset.id === labState.currentExploration ? ' active' : '');
    tab.textContent = `${preset.icon} ${preset.name}`;
    tab.onclick = () => switchExploration(preset.id);
    container.appendChild(tab);
  });
}

function switchExploration(presetId) {
  labState.currentExploration = presetId;
  document.querySelectorAll('.exploration-tab').forEach(tab => {
    tab.classList.toggle('active', tab.textContent.includes(window.LAB_CONFIG.explorationPresets[presetId].icon));
  });
  const preset = window.LAB_CONFIG.explorationPresets[presetId];
  if (preset.recommendation) {
    const monitor = document.getElementById('boot-monitor');
    if (monitor) {
      monitor.innerHTML = `<span class="ok-text">> Mode: ${preset.name}</span>\n<span class="warn-text">> ${preset.description}</span>\n> ${preset.recommendation}`;
    }
  }
}

function setupDragDrop() {
  // Drag start on component cards
  document.querySelectorAll('.component-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      const compId = card.getAttribute('data-comp-id');
      if (labState.installed[compId]) { e.preventDefault(); return; }
      e.dataTransfer.setData('text/plain', compId);
      card.classList.add('dragging');
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  });

  // Drop targets on slots
  document.querySelectorAll('.mb-slot').forEach(slot => {
    const accepts = slot.getAttribute('data-accepts');
    if (!accepts) return;

    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      slot.classList.add('drag-over');
    });
    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });
    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      const compId = e.dataTransfer.getData('text/plain');
      if (compId === accepts && !labState.installed[compId]) {
        placeComponent(compId, slot.id);
      }
    });
  });
}

// POWER button — test boot
function testBoot() {
  const cfg = window.LAB_CONFIG;
  const monitor = document.getElementById('boot-monitor');
  if (!monitor || !cfg) return;

  const installed = labState.installed;
  const missing = cfg.components.filter(c => !installed[c.id]);

  monitor.innerHTML = '';

  if (missing.length === 0) {
    // All installed — boot success!
    const scenario = cfg.bootScenarios.allInstalled;
    typeBootSequence(monitor, scenario.postSequence, 'ok-text', () => {
      sfxBootChime();
    });
  } else if (missing.length === 1) {
    // Single missing
    const key = 'missing' + missing[0].id.charAt(0).toUpperCase() + missing[0].id.slice(1);
    const scenario = cfg.bootScenarios[key] || cfg.bootScenarios.multipleMissing;
    const cssClass = scenario.type === 'critical' ? 'error-text' : 'warn-text';
    typeBootSequence(monitor, scenario.postSequence, cssClass, () => {
      if (scenario.beepPattern && scenario.beepPattern !== 'none') {
        sfxBeepPattern(scenario.beepPattern);
      } else {
        sfxError();
      }
    });
  } else {
    // Multiple missing
    const lines = [
      '❌ MULTIPLE ERRORS DETECTED',
      '',
      `${missing.length} komponen belum terpasang:`,
    ];
    missing.forEach(c => {
      lines.push(`  ✗ ${c.shortName} — ${c.description}`);
    });
    lines.push('', 'Pasang semua komponen, lalu tekan POWER lagi.');
    typeBootSequence(monitor, lines, 'error-text', () => sfxError());
  }
}

function typeBootSequence(monitor, lines, cssClass, onComplete) {
  monitor.innerHTML = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i >= lines.length) {
      clearInterval(timer);
      monitor.innerHTML += '\n<span class="cursor-blink">_</span>';
      if (onComplete) onComplete();
      return;
    }
    const line = lines[i];
    const span = document.createElement('span');
    span.className = line.includes('OK') ? 'ok-text' : (line.includes('ERROR') || line.includes('FAILED') || line.includes('❌') || line.includes('✗') ? 'error-text' : (line.includes('WARNING') || line.includes('⚠') ? 'warn-text' : ''));
    span.textContent = line;
    monitor.appendChild(span);
    monitor.appendChild(document.createTextNode('\n'));
    monitor.scrollTop = monitor.scrollHeight;
    i++;
  }, 120);
}

function resetBuild() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;
  
  // Clear all installed
  cfg.components.forEach(c => {
    if (labState.installed[c.id]) {
      removeComponent(c.id);
    }
  });
  labState.installed = {};
  
  // Clear monitor
  const monitor = document.getElementById('boot-monitor');
  if (monitor) {
    monitor.innerHTML = '<span class="ok-text">> Semua komponen direset.</span>\n<span class="ok-text">> Menunggu komponen...</span>\n<span class="cursor-blink">_</span>';
  }
  updateInstalledCount();
}

// Component info popup
function showComponentInfo(compId) {
  const cfg = window.LAB_CONFIG;
  const comp = cfg.components.find(c => c.id === compId);
  if (!comp) return;

  document.getElementById('info-popup-title').textContent = `${comp.icon} ${comp.name}`;
  document.getElementById('info-popup-desc').textContent = comp.description;
  document.getElementById('info-popup-detail').textContent = comp.details;
  
  const fact = document.getElementById('info-popup-fact');
  if (comp.funFact) {
    fact.style.display = 'block';
    fact.innerHTML = `<strong>💡 Tahukah Kamu?</strong><p>${comp.funFact}</p>`;
  } else {
    fact.style.display = 'none';
  }

  document.getElementById('info-popup').classList.add('show');
  document.getElementById('info-popup-overlay').classList.add('show');
}

function closeInfoPopup() {
  document.getElementById('info-popup').classList.remove('show');
  document.getElementById('info-popup-overlay').classList.remove('show');
}

// ==================== SIMULASI: BINARY SWITCH ====================
let binaryInitialized = false;

function initBinary() {
  if (binaryInitialized) return;
  binaryInitialized = true;
  
  const container = document.getElementById('binary-switches');
  if (!container) return;
  container.innerHTML = '';
  
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  weights.forEach((w, i) => {
    const bit = document.createElement('div');
    bit.className = 'binary-bit';
    bit.onclick = () => toggleBit(i);
    bit.innerHTML = `
      <span class="bit-weight">${w}</span>
      <div class="bit-led" id="led-${i}">${labState.bits[i]}</div>
      <span class="bit-index">Bit ${7 - i}</span>
    `;
    container.appendChild(bit);
  });

  renderBinaryChallenges();
  updateBinaryDisplay();
}

function toggleBit(index) {
  labState.bits[index] = labState.bits[index] ? 0 : 1;
  const led = document.getElementById('led-' + index);
  if (led) {
    led.classList.toggle('on', labState.bits[index] === 1);
    led.textContent = labState.bits[index];
  }
  sfxToggle();
  updateBinaryDisplay();
  checkBinaryChallenges();
}

function updateBinaryDisplay() {
  const binStr = labState.bits.join('');
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  let decVal = 0;
  const parts = [];
  labState.bits.forEach((b, i) => {
    if (b) {
      decVal += weights[i];
      parts.push(weights[i]);
    }
  });

  document.getElementById('bin-value').textContent = binStr;
  document.getElementById('dec-value').textContent = decVal;
  document.getElementById('calc-formula').textContent = parts.length > 0 ? `${parts.join(' + ')} = ${decVal}` : '= 0';
}

function renderBinaryChallenges() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('binary-challenges');
  if (!container || !cfg) return;
  container.innerHTML = '';

  cfg.binaryChallenges.forEach((ch, i) => {
    const card = document.createElement('div');
    card.className = 'challenge-card' + (labState.binarySolved[i] ? ' solved' : '');
    card.id = 'bin-challenge-' + i;
    card.innerHTML = `
      <div style="font-size:0.68em;color:var(--c-text-dim);">Tantangan ${i + 1}</div>
      <div class="challenge-target">${labState.binarySolved[i] ? '✅' : ''} Buat angka ${ch.target}!</div>
      <div class="challenge-hint">${ch.hint}</div>
      <div class="challenge-status" id="bin-status-${i}" style="color:${labState.binarySolved[i] ? 'var(--c-success)' : 'var(--c-text-dim)'};">
        ${labState.binarySolved[i] ? 'Terpecahkan!' : 'Belum selesai'}
      </div>
    `;
    container.appendChild(card);
  });
}

function checkBinaryChallenges() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;
  const weights = [128, 64, 32, 16, 8, 4, 2, 1];
  let decVal = 0;
  labState.bits.forEach((b, i) => { if (b) decVal += weights[i]; });

  cfg.binaryChallenges.forEach((ch, i) => {
    if (!labState.binarySolved[i] && decVal === ch.target) {
      labState.binarySolved[i] = true;
      const card = document.getElementById('bin-challenge-' + i);
      if (card) {
        card.classList.add('solved');
        card.querySelector('.challenge-target').textContent = `✅ ${ch.target}`;
      }
      const status = document.getElementById('bin-status-' + i);
      if (status) {
        status.textContent = 'Terpecahkan! 🎉';
        status.style.color = 'var(--c-success)';
      }
      sfxSuccess();
      spawnConfetti();
    }
  });
}

// ==================== SIMULASI: RGB MIXER ====================
let rgbInitialized = false;

function initRGBMixer() {
  if (rgbInitialized) return;
  rgbInitialized = true;
  renderRGBChallenges();
  updateRGB();
}

function updateRGB() {
  const r = parseInt(document.getElementById('slider-r').value);
  const g = parseInt(document.getElementById('slider-g').value);
  const b = parseInt(document.getElementById('slider-b').value);
  labState.r = r; labState.g = g; labState.b = b;

  document.getElementById('val-r').textContent = r;
  document.getElementById('val-g').textContent = g;
  document.getElementById('val-b').textContent = b;

  const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0').toUpperCase()).join('');
  document.getElementById('rgb-preview').style.background = `rgb(${r},${g},${b})`;
  document.getElementById('hex-code').textContent = hex;
  document.getElementById('rgb-code').textContent = `rgb(${r}, ${g}, ${b})`;

  // Sub-pixel visualizer
  const maxH = 80;
  document.getElementById('sp-r').style.height = (r / 255 * maxH) + 'px';
  document.getElementById('sp-g').style.height = (g / 255 * maxH) + 'px';
  document.getElementById('sp-b').style.height = (b / 255 * maxH) + 'px';

  checkRGBChallenges();
}

function renderRGBChallenges() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('rgb-challenges');
  if (!container || !cfg) return;
  container.innerHTML = '';

  cfg.rgbChallenges.forEach((ch, i) => {
    const card = document.createElement('div');
    card.className = 'challenge-card' + (labState.rgbSolved[i] ? ' solved' : '');
    card.id = 'rgb-challenge-' + i;
    const targetColor = `rgb(${ch.targetR},${ch.targetG},${ch.targetB})`;
    card.innerHTML = `
      <div style="display:flex;align-items:center;gap:0.4em;justify-content:center;">
        <div style="width:18px;height:18px;border-radius:4px;background:${targetColor};border:1px solid rgba(255,255,255,0.2);"></div>
        <span class="challenge-target" style="font-size:0.9em;">${ch.name}</span>
      </div>
      <div class="challenge-hint" style="margin-top:0.2em;">${ch.hint}</div>
      <div class="challenge-status" id="rgb-status-${i}" style="color:${labState.rgbSolved[i] ? 'var(--c-success)' : 'var(--c-text-dim)'};">
        ${labState.rgbSolved[i] ? '✅ Cocok!' : 'Belum cocok'}
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
      if (status) { status.textContent = '✅ Cocok! 🎉'; status.style.color = 'var(--c-success)'; }
      sfxSuccess();
      spawnConfetti();
    }
  });
}

// ==================== LKPD ====================
let lkpdInitialized = false;

function initLKPD() {
  if (lkpdInitialized) return;
  lkpdInitialized = true;
  const cfg = window.LAB_CONFIG;
  if (!cfg || !cfg.lkpd) return;

  renderPG();
  renderBS();
  renderMatch();
}

function showLkpdSection(section) {
  document.querySelectorAll('.lkpd-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.lkpd-section-tab').forEach(t => t.classList.remove('active'));
  
  const sectionMap = { pg: 'lkpd-pg', bs: 'lkpd-bs', match: 'lkpd-match' };
  const el = document.getElementById(sectionMap[section]);
  if (el) el.classList.add('active');

  document.querySelectorAll('.lkpd-section-tab').forEach(t => {
    if ((section === 'pg' && t.textContent.includes('Pilihan')) ||
        (section === 'bs' && t.textContent.includes('Benar')) ||
        (section === 'match' && t.textContent.includes('Menjodohkan'))) {
      t.classList.add('active');
    }
  });
  sfxClick();
}

// Bagian A: Pilihan Ganda
function renderPG() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('lkpd-pg');
  if (!container) return;
  container.innerHTML = '<h3 style="margin-bottom:0.5em;">Bagian A: Pilihan Ganda (5 Soal)</h3>';

  cfg.lkpd.bagianA.forEach((q, qi) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'pg-question';
    qDiv.id = 'pg-q-' + qi;
    let optsHtml = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, oi) => {
      optsHtml += `
        <div class="pg-option" id="pg-opt-${qi}-${oi}" onclick="selectPG(${qi}, ${oi})">
          <span class="opt-letter">${letters[oi]}</span>
          <span>${opt}</span>
        </div>`;
    });
    qDiv.innerHTML = `
      <div class="pg-q-text"><span class="pg-q-num">${qi + 1}.</span> ${q.question}</div>
      <div class="pg-options">${optsHtml}</div>
      <div class="pg-explanation" id="pg-exp-${qi}"></div>
    `;
    container.appendChild(qDiv);
  });
}

function selectPG(qi, oi) {
  if (labState.lkpdSubmitted) return;
  labState.pgAnswers[qi] = oi;
  
  // Visual update
  const cfg = window.LAB_CONFIG;
  cfg.lkpd.bagianA[qi].options.forEach((_, j) => {
    const opt = document.getElementById(`pg-opt-${qi}-${j}`);
    if (opt) {
      opt.classList.remove('selected');
      if (j === oi) opt.classList.add('selected');
    }
  });
  sfxClick();
}

// Bagian B: Benar/Salah
function renderBS() {
  const cfg = window.LAB_CONFIG;
  const container = document.getElementById('lkpd-bs');
  if (!container) return;
  container.innerHTML = '<h3 style="margin-bottom:0.5em;">Bagian B: Benar atau Salah (5 Soal)</h3>';

  cfg.lkpd.bagianB.forEach((q, qi) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'bs-question';
    qDiv.id = 'bs-q-' + qi;
    qDiv.innerHTML = `
      <div class="bs-statement"><span class="pg-q-num">${qi + 1}.</span> ${q.statement}</div>
      <div class="bs-buttons">
        <button class="bs-btn" id="bs-btn-${qi}-true" onclick="selectBS(${qi}, true)">✅ Benar</button>
        <button class="bs-btn" id="bs-btn-${qi}-false" onclick="selectBS(${qi}, false)">❌ Salah</button>
      </div>
      <div class="pg-explanation" id="bs-exp-${qi}"></div>
    `;
    container.appendChild(qDiv);
  });
}

function selectBS(qi, answer) {
  if (labState.lkpdSubmitted) return;
  labState.bsAnswers[qi] = answer;
  
  document.getElementById(`bs-btn-${qi}-true`).classList.toggle('selected-true', answer === true);
  document.getElementById(`bs-btn-${qi}-false`).classList.toggle('selected-false', answer === false);
  document.getElementById(`bs-btn-${qi}-true`).classList.remove('selected-false');
  document.getElementById(`bs-btn-${qi}-false`).classList.remove('selected-true');
  sfxClick();
}

// Bagian C: Menjodohkan
function renderMatch() {
  const cfg = window.LAB_CONFIG;
  const leftContainer = document.getElementById('match-left');
  const rightContainer = document.getElementById('match-right');
  if (!leftContainer || !rightContainer) return;

  leftContainer.innerHTML = '<div style="font-size:0.72em;font-weight:700;color:var(--c-primary);text-align:center;padding:0.3em;">Komponen</div>';
  rightContainer.innerHTML = '<div style="font-size:0.72em;font-weight:700;color:var(--c-primary);text-align:center;padding:0.3em;">Fungsi</div>';

  // Shuffle right side
  const shuffledRight = [...cfg.lkpd.bagianC].sort(() => Math.random() - 0.5);

  cfg.lkpd.bagianC.forEach((item, i) => {
    const leftItem = document.createElement('div');
    leftItem.className = 'match-item';
    leftItem.id = 'match-left-' + i;
    leftItem.textContent = item.left;
    leftItem.style.borderLeftColor = item.color;
    leftItem.style.borderLeftWidth = '3px';
    leftItem.onclick = () => selectMatchLeft(i);
    leftContainer.appendChild(leftItem);
  });

  shuffledRight.forEach((item, i) => {
    const rightItem = document.createElement('div');
    rightItem.className = 'match-item';
    rightItem.id = 'match-right-' + i;
    rightItem.textContent = item.right;
    rightItem.setAttribute('data-original-left', item.left);
    rightItem.onclick = () => selectMatchRight(i);
    rightContainer.appendChild(rightItem);
  });
}

function selectMatchLeft(index) {
  if (labState.lkpdSubmitted) return;
  // Check if already paired
  const cfg = window.LAB_CONFIG;
  const leftKey = cfg.lkpd.bagianC[index].left;
  if (labState.matchPairs[leftKey]) return; // Already paired

  document.querySelectorAll('.match-left .match-item').forEach(el => el.classList.remove('selected'));
  document.getElementById('match-left-' + index).classList.add('selected');
  labState.matchSelected = index;
  sfxClick();
}

function selectMatchRight(index) {
  if (labState.lkpdSubmitted) return;
  if (labState.matchSelected === null) return;

  const cfg = window.LAB_CONFIG;
  const leftIndex = labState.matchSelected;
  const leftKey = cfg.lkpd.bagianC[leftIndex].left;
  const rightEl = document.getElementById('match-right-' + index);
  const rightText = rightEl.getAttribute('data-original-left');

  // Check if right is already paired
  const alreadyPairedRight = Object.values(labState.matchPairs).includes(index);
  if (alreadyPairedRight) return;

  // Pair them
  labState.matchPairs[leftKey] = { rightIndex: index, rightOriginalLeft: rightText };

  // Visual
  document.getElementById('match-left-' + leftIndex).classList.add('paired');
  document.getElementById('match-left-' + leftIndex).classList.remove('selected');
  rightEl.classList.add('paired');

  // Color the pair
  const color = cfg.lkpd.bagianC[leftIndex].color;
  document.getElementById('match-left-' + leftIndex).style.borderColor = color;
  document.getElementById('match-left-' + leftIndex).style.background = color + '15';
  rightEl.style.borderColor = color;
  rightEl.style.background = color + '15';

  labState.matchSelected = null;
  sfxSnap();
}

// Submit LKPD
function submitLKPD() {
  const cfg = window.LAB_CONFIG;
  if (!cfg) return;
  labState.lkpdSubmitted = true;

  // Score Bagian A (PG)
  let scoreA = 0;
  cfg.lkpd.bagianA.forEach((q, i) => {
    const selected = labState.pgAnswers[i];
    const isCorrect = selected === q.correct;
    if (isCorrect) scoreA++;

    // Show feedback
    if (selected !== undefined) {
      const selEl = document.getElementById(`pg-opt-${i}-${selected}`);
      if (selEl) selEl.classList.add(isCorrect ? 'correct' : 'wrong');
    }
    const correctEl = document.getElementById(`pg-opt-${i}-${q.correct}`);
    if (correctEl) correctEl.classList.add('correct');

    const exp = document.getElementById(`pg-exp-${i}`);
    if (exp) {
      exp.className = 'pg-explanation show ' + (isCorrect ? 'correct-exp' : 'wrong-exp');
      exp.textContent = (isCorrect ? '✅ Benar! ' : '❌ Salah. ') + q.explanation;
    }
  });

  // Score Bagian B (BS)
  let scoreB = 0;
  cfg.lkpd.bagianB.forEach((q, i) => {
    const answer = labState.bsAnswers[i];
    const isCorrect = answer === q.correct;
    if (isCorrect) scoreB++;

    const exp = document.getElementById(`bs-exp-${i}`);
    if (exp) {
      exp.className = 'pg-explanation show ' + (isCorrect ? 'correct-exp' : 'wrong-exp');
      exp.textContent = (isCorrect ? '✅ Benar! ' : '❌ Salah. ') + q.explanation;
    }
  });

  // Score Bagian C (Match)
  let scoreC = 0;
  cfg.lkpd.bagianC.forEach((item) => {
    const pair = labState.matchPairs[item.left];
    if (pair && pair.rightOriginalLeft === item.left) {
      scoreC++;
    }
  });

  const total = scoreA + scoreB + scoreC;
  const maxScore = 15;
  const percent = Math.round((total / maxScore) * 100);

  // Predikat
  let predikat = '';
  let predikatColor = '';
  if (percent >= 90) { predikat = '🏆 Luar Biasa!'; predikatColor = 'var(--c-success)'; }
  else if (percent >= 70) { predikat = '⭐ Hebat!'; predikatColor = 'var(--c-primary)'; }
  else if (percent >= 50) { predikat = '💪 Cukup Baik'; predikatColor = 'var(--c-warning)'; }
  else { predikat = '📖 Perlu Belajar Lagi'; predikatColor = 'var(--c-error)'; }

  // Update results page
  document.getElementById('hasil-score').textContent = percent + '%';
  document.getElementById('hasil-predikat').textContent = predikat;
  document.getElementById('hasil-predikat').style.color = predikatColor;
  document.getElementById('score-a').textContent = scoreA + '/5';
  document.getElementById('score-b').textContent = scoreB + '/5';
  document.getElementById('score-c').textContent = scoreC + '/5';

  if (percent >= 70) sfxSuccess(); else sfxError();
  goToPage('lkpd-hasil');
}

// ==================== INIT: REFERENSI ====================
let refInitialized = false;
function initReferensi() {
  if (refInitialized) return;
  refInitialized = true;
  const cfg = window.LAB_CONFIG;
  const list = document.getElementById('ref-list');
  if (!list || !cfg || !cfg.references) return;
  list.innerHTML = '';
  
  cfg.references.forEach(ref => {
    const item = document.createElement('div');
    item.className = 'ref-item';
    item.innerHTML = `<span class="ref-type">${ref.type}</span><span class="ref-text">${ref.text}</span>`;
    list.appendChild(item);
  });
}

// ==================== CONFETTI ====================
function spawnConfetti() {
  const colors = ['#00D4FF', '#10B981', '#F59E0B', '#7C3AED', '#EF4444', '#FF6B35'];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-10px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.width = (4 + Math.random() * 8) + 'px';
    piece.style.height = (4 + Math.random() * 8) + 'px';
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

// ==================== INIT ON LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.LAB_CONFIG;
  if (cfg) {
    cfg.pages.forEach((p, i) => PAGE_INDEX[p] = i + 1);
  }
  updateTestingIndicator('cover');
  updateProgressDots();
});
