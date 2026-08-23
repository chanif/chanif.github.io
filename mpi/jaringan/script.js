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
  'rangkuman', 'referensi', 'pengembang', 'pj-penyunting'
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
  if (pageId === 'tarik-jawaban') initDragDrop();
  if (pageId === 'permainan') initSimulation('game');
  if (pageId === 'video') initVideo();
}

function navNext() {
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx === -1) return;
  if (idx < LINEAR_PAGES.length - 1) {
    goToPage(LINEAR_PAGES[idx + 1]);
  } else {
    goToPage('kutipan');
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
  { term: 'Header', def: 'Bagian paket berisi alamat pengirim, alamat tujuan, dan nomor urut', id: 'header' },
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
  initDragDrop();
}

function checkDragDrop() {
  const zones = document.querySelectorAll('#dd-definitions .dd-drop-zone');
  let allFilled = true;
  let allCorrect = true;

  zones.forEach(zone => {
    const placed = zone.querySelector('.dd-placed');
    if (!placed) {
      allFilled = false;
      return;
    }

    const isCorrect = placed.dataset.id === zone.dataset.id;
    if (!isCorrect) allCorrect = false;
    zone.classList.remove('correct', 'incorrect');
    zone.classList.add(isCorrect ? 'correct' : 'incorrect');
  });

  if (!allFilled) {
    alert('Silakan pasangkan semua istilah terlebih dahulu!');
  } else if (allCorrect) {
    spawnConfetti();
  }
}


// ==================== NETWORK SIMULATION ====================

let simState = {
  game: { selectedPath: null, attempts: 0, completed: false },
  eval: { selectedPath: null, attempts: 0, completed: false, firstAttemptCorrect: false }
};

function initSimulation(mode) {
  simState[mode] = { selectedPath: null, attempts: 0, completed: false, firstAttemptCorrect: false };
  const topoId = mode === 'eval' ? 'sim-topology-eval' : 'sim-topology';

  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));

  const sendBtn = document.getElementById(mode === 'eval' ? 'btn-send-eval' : 'btn-send-packet');
  if (sendBtn) sendBtn.disabled = true;

  const fb = document.getElementById(mode === 'eval' ? 'sim-feedback-eval' : 'sim-feedback');
  if (fb) fb.classList.remove('show');
}

function selectSimPath(path) {
  selectPath('game', path);
}

function selectEvalSimPath(path) {
  selectPath('eval', path);
}

function selectPath(mode, path) {
  if (simState[mode].completed) return;

  simState[mode].selectedPath = path;

  const topoId = mode === 'eval' ? 'sim-topology-eval' : 'sim-topology';
  const prefix = mode === 'eval' ? 'eval-' : '';

  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  const router = document.getElementById(`${prefix}router-${path}`);
  if (router) router.classList.add('selected');

  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));
  const pathLine = document.getElementById(`${prefix}path-${path}-line`);
  if (pathLine) pathLine.classList.add('active');

  const sendBtn = document.getElementById(mode === 'eval' ? 'btn-send-eval' : 'btn-send-packet');
  if (sendBtn) sendBtn.disabled = false;
}

function sendPacket(mode) {
  const state = simState[mode];
  if (!state.selectedPath || state.completed) return;

  state.attempts++;
  const path = state.selectedPath;
  const isCorrect = path === 'a' || path === 'c';

  const sendBtn = document.getElementById(mode === 'eval' ? 'btn-send-eval' : 'btn-send-packet');
  if (sendBtn) sendBtn.disabled = true;

  animatePacket(mode, path, isCorrect);
}

function animatePacket(mode, path, isCorrect) {
  const topoId = mode === 'eval' ? 'sim-topology-eval' : 'sim-topology';
  const topology = document.getElementById(topoId);

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
    showSimFeedback(mode, isCorrect);
  }, isCorrect ? 2000 : 1200);
}

function showSimFeedback(mode, isCorrect) {
  const state = simState[mode];
  const fbId = mode === 'eval' ? 'sim-feedback-eval' : 'sim-feedback';
  const cardId = mode === 'eval' ? 'sim-feedback-card-eval' : 'sim-feedback-card';

  const fb = document.getElementById(fbId);
  const card = document.getElementById(cardId);

  if (isCorrect) {
    state.completed = true;
    if (state.attempts === 1) state.firstAttemptCorrect = true;

    card.innerHTML = `
      <div class="fb-icon">✅</div>
      <div class="fb-title success">Luar Biasa! Sukses!</div>
      <div class="fb-text">Router berhasil menemukan rute alternatif yang aman. Semua paket data tiba di komputer penerima dan berhasil dirakit kembali menjadi foto yang utuh!</div>
      <div class="fb-actions">
        <button class="btn btn-success" onclick="closeSimFeedback('${mode}');${mode === 'game' ? 'navNext()' : ''}">Lanjut ▶</button>
      </div>
    `;

    spawnConfetti();

  } else {
    if (state.attempts === 1) {
      card.innerHTML = `
        <div class="fb-icon">⚠️</div>
        <div class="fb-title error">Rute Terputus (Request Time Out)</div>
        <div class="fb-text">Ups! Jalur B sedang mengalami server down. Perhatikan tanda peringatan ⚠️ pada router tersebut dan pilihlah jalur alternatif yang aman!</div>
        <div class="fb-actions">
          <button class="btn btn-warning" onclick="retrySimulation('${mode}')">🔄 Coba Lagi</button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="fb-icon">💡</div>
        <div class="fb-title error">Petunjuk Tambahan</div>
        <div class="fb-text">Paket data selalu mencari jalur lain jika terjadi hambatan. Jalur yang aman adalah <strong>Jalur A</strong> (biru) atau <strong>Jalur C</strong> (hijau) yang tidak memiliki tanda peringatan merah.</div>
        <div class="fb-actions">
          <button class="btn btn-warning" onclick="retrySimulation('${mode}')">🔄 Ulangi Simulasi</button>
          ${mode === 'game' ? '<button class="btn btn-secondary" onclick="closeSimFeedback(\'game\');goToPage(\'materi-1\')">📖 Kembali ke Materi</button>' : ''}
          <button class="btn btn-primary" onclick="closeSimFeedback('${mode}')">Tutup</button>
        </div>
      `;
    }
  }

  fb.classList.add('show');
}

function closeSimFeedback(mode) {
  const fbId = mode === 'eval' ? 'sim-feedback-eval' : 'sim-feedback';
  document.getElementById(fbId).classList.remove('show');
}

function retrySimulation(mode) {
  closeSimFeedback(mode);
  simState[mode].selectedPath = null;
  const topoId = mode === 'eval' ? 'sim-topology-eval' : 'sim-topology';
  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));
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
