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
  if (cfg.logos && Array.isArray(cfg.logos.footer_logos) && cfg.logos.footer_logos.length > 0) {
    const kLogos = document.querySelectorAll('#kredit-logos img');
    cfg.logos.footer_logos.forEach((src, idx) => {
      if (kLogos[idx] && src) kLogos[idx].src = src;
    });
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

  // Apply Video Source if configured
  const mainVideo = document.getElementById('main-video');
  if (mainVideo && cfg.assets && cfg.assets.video_src) {
    const videoSource = document.getElementById('main-video-source') || mainVideo.querySelector('source');
    if (videoSource) {
      if (videoSource.getAttribute('src') !== cfg.assets.video_src) {
        videoSource.src = cfg.assets.video_src;
        mainVideo.load();
      }
    } else if (mainVideo.getAttribute('src') !== cfg.assets.video_src) {
      mainVideo.src = cfg.assets.video_src;
      mainVideo.load();
    }
  }

  // Apply Testing Page Indicator
  updateTestingIndicator(currentPage);
  updateTopControls(currentPage);
}

// ==================== ZOOM CONTROLS ENGINE ====================
let currentZoom = parseFloat(localStorage.getItem('mpi_zoom_level')) || 1.0;

function setAppZoom(zoomLevel) {
  zoomLevel = Math.round(zoomLevel * 100) / 100;
  if (zoomLevel < 0.70) zoomLevel = 0.70;
  if (zoomLevel > 1.30) zoomLevel = 1.30;
  currentZoom = zoomLevel;

  try {
    localStorage.setItem('mpi_zoom_level', currentZoom.toString());
  } catch (e) {}

  const zoomPct = Math.round(currentZoom * 100);

  // Apply zoom natively to body (Chrome, Edge, Safari, Opera, modern Firefox)
  document.body.style.zoom = currentZoom;
  document.documentElement.style.setProperty('--app-zoom', currentZoom);

  // Toggle class for dynamic width expansion when zoom < 100%
  if (currentZoom < 1.0) {
    document.body.classList.add('zoom-sub-100');
    document.documentElement.classList.add('zoom-sub-100');
  } else {
    document.body.classList.remove('zoom-sub-100');
    document.documentElement.classList.remove('zoom-sub-100');
  }

  // Update UI indicators
  const zoomTexts = document.querySelectorAll('.zoom-level-text');
  zoomTexts.forEach(el => {
    el.textContent = `${zoomPct}%`;
    el.title = zoomPct === 100 ? 'Zoom Normal (100%)' : 'Klik untuk Reset Zoom ke 100%';
  });

  // Re-draw dynamic lines after zoom change
  setTimeout(() => {
    if (typeof drawMatchP8Lines === 'function' && currentPage === 'tarik-jawaban') {
      drawMatchP8Lines();
    }
    const secC = document.getElementById('eval-section-C');
    if (secC && secC.classList.contains('active') && typeof drawMatchLines === 'function') {
      drawMatchLines();
    }
  }, 100);
}

function zoomIn() {
  setAppZoom(currentZoom + 0.05);
}

function zoomOut() {
  setAppZoom(currentZoom - 0.05);
}

function resetZoom() {
  setAppZoom(1.0);
}

// ==================== FONT SIZE CONTROLS ENGINE ====================
let currentFontScale = parseFloat(localStorage.getItem('mpi_font_scale')) || 1.0;

function setAppFontScale(scale) {
  scale = Math.round(scale * 100) / 100;
  if (scale < 0.70) scale = 0.70;
  if (scale > 1.50) scale = 1.50;
  currentFontScale = scale;

  try {
    localStorage.setItem('mpi_font_scale', currentFontScale.toString());
  } catch (e) {}

  const fontPct = Math.round(currentFontScale * 100);
  document.documentElement.style.setProperty('--font-scale', currentFontScale);

  const fontTexts = document.querySelectorAll('.font-level-text');
  fontTexts.forEach(el => {
    el.textContent = `${fontPct}%`;
    el.title = fontPct === 100 ? 'Ukuran Teks Normal (100%)' : 'Klik untuk Reset Ukuran Teks (100%)';
  });

  // Re-draw dynamic lines if text size changes card heights
  setTimeout(() => {
    if (typeof drawMatchP8Lines === 'function' && currentPage === 'tarik-jawaban') {
      drawMatchP8Lines();
    }
    const secC = document.getElementById('eval-section-C');
    if (secC && secC.classList.contains('active') && typeof drawMatchLines === 'function') {
      drawMatchLines();
    }
  }, 60);
}

function fontIn() {
  setAppFontScale(currentFontScale + 0.05);
}

function fontOut() {
  setAppFontScale(currentFontScale - 0.05);
}

function resetFont() {
  setAppFontScale(1.0);
}

// ==================== NAVIGATION (SPA) ====================

const MATERI_SUBPAGES = ['materi-1', 'video', 'tarik-jawaban', 'materi-3'];

function updateTopControls(pageId) {
  const topControls = document.getElementById('top-controls-right');
  const btnMateri = document.getElementById('btn-top-materi');

  if (btnMateri) {
    if (MATERI_SUBPAGES.includes(pageId)) {
      btnMateri.style.display = 'inline-flex';
    } else {
      btnMateri.style.display = 'none';
    }
  }

  if (topControls) {
    if (pageId === 'cover') {
      topControls.classList.add('on-cover');
    } else {
      topControls.classList.remove('on-cover');
    }
  }
}

const PAGE_INDEX_MAP = {
  'cover': 1,
  'menu': 2,
  'petunjuk': 3,
  'tujuan': 4,
  'materi-list': 5,
  'materi-1': 6,
  'tarik-jawaban': 7,
  'materi-2': 8,
  'video': 9,
  'materi-3': 10,
  'permainan-intro': 11,
  'permainan': 12,
  'latihan-intro': 13,
  'latihan': 14,
  'rangkuman': 15,
  'referensi': 16,
  'pengembang': 17,
  'kredit': 18
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
  indicator.innerHTML = `<span>Halaman ${pageNum} / 18</span>`;
  indicator.style.display = 'block';
}

const LINEAR_PAGES = [
  'cover', 'menu', 'petunjuk', 'tujuan', 'materi-list',
  'materi-1', 'tarik-jawaban', 'materi-2', 'video', 'materi-3',
  'permainan-intro', 'permainan', 'latihan-intro', 'latihan',
  'rangkuman', 'referensi', 'pengembang', 'kredit'
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

  // Update Testing Page Indicator if is_testing is active
  updateTestingIndicator(pageId);
  updateTopControls(pageId);

  // Reset scroll to top
  const scrollables = newPage.querySelectorAll('.scrollable');
  scrollables.forEach(el => el.scrollTop = 0);

  // Update global compound navigation labels across all pages
  updateGlobalNavButtons(pageId);

  // Lazy initialize interactive modules on page entry
  if (pageId === 'tarik-jawaban') initMatchP8();
  if (pageId === 'video') initVideo();
  if (pageId === 'permainan') initPacketCommanderGame();
  if (pageId === 'latihan') {
    const activeSec = document.querySelector('.eval-section.active');
    if (!activeSec || activeSec.id === 'eval-section-recap') {
      startEval();
    }
  }
}

// ==================== GLOBAL COMPOUND NAVIGATION MAP ====================
const JARINGAN_PAGE_NAV_MAP = {
  'menu': {
    prevText: 'Cover / Beranda',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Petunjuk Penggunaan',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'petunjuk': {
    prevText: 'Menu Utama',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Tujuan Pembelajaran',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'tujuan': {
    prevText: 'Petunjuk Penggunaan',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Daftar Pilihan Materi',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'materi-list': {
    prevText: 'Tujuan Pembelajaran',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Materi 1: Anatomi Hardware',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'materi-1': {
    prevText: 'Daftar Pilihan Materi',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Latihan: Menjodohkan Hardware',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'tarik-jawaban': {
    prevText: 'Materi 1: Anatomi Hardware',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Materi 2: Otak Komputer & Alur Data',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'materi-2': {
    prevText: 'Latihan: Menjodohkan Hardware',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Video: Simulasi Siklus CPU',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'video': {
    prevText: 'Materi 2: Otak Komputer & Alur Data',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Materi 3: Sistem Operasi & Kolaborasi',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'materi-3': {
    prevText: 'Video: Simulasi Siklus CPU',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Pengantar Simulator Komputer',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'permainan-intro': {
    prevText: 'Materi 3: Sistem Operasi & Kolaborasi',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Mulai Simulator Komputer',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'permainan': {
    prevText: 'Pengantar Simulator',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Pengantar Latihan Evaluasi',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'latihan-intro': {
    prevText: 'Simulator Sistem Komputer',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Mulai Latihan Evaluasi',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'latihan': {
    prevText: 'Pengantar Latihan',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Rangkuman & Refleksi',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'rangkuman': {
    prevText: 'Latihan Evaluasi',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Referensi & Daftar Pustaka',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'referensi': {
    prevText: 'Rangkuman & Refleksi',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Profil Pengembang',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'pengembang': {
    prevText: 'Referensi & Daftar Pustaka',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Kredit Media & Penutup',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'kredit': {
    prevText: 'Profil Pengembang',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Kembali ke Beranda 🏠',
    nextSub: 'SELESAI PEMBELAJARAN',
    isFinish: true
  }
};

function updateGlobalNavButtons(pageId) {
  if (pageId === 'cover') return;

  const navInfo = JARINGAN_PAGE_NAV_MAP[pageId];
  if (!navInfo) return;

  const pageEl = document.getElementById('page-' + pageId);
  if (!pageEl) return;

  // Left Nav Button & Label
  const leftNav = pageEl.querySelector('.nav-bottom.left');
  if (leftNav && navInfo.prevText) {
    leftNav.classList.add('nav-materi-compound');
    let labelEl = leftNav.querySelector('.nav-materi-label');
    if (!labelEl) {
      labelEl = document.createElement('div');
      labelEl.className = 'nav-materi-label left';
      labelEl.onclick = () => navPrev();
      leftNav.appendChild(labelEl);
    }
    labelEl.innerHTML = `
      <span class="nml-sub">${navInfo.prevSub || 'HALAMAN SEBELUMNYA'}</span>
      <strong class="nml-main">${navInfo.prevText}</strong>
    `;
  }

  // Right Nav Button & Label
  const rightNav = pageEl.querySelector('.nav-bottom.right');
  if (rightNav && navInfo.nextText) {
    rightNav.classList.add('nav-materi-compound');
    let labelEl = rightNav.querySelector('.nav-materi-label');
    if (!labelEl) {
      labelEl = document.createElement('div');
      labelEl.className = 'nav-materi-label right';
      labelEl.onclick = () => navNext();
      rightNav.insertBefore(labelEl, rightNav.firstChild);
    }
    labelEl.innerHTML = `
      <span class="nml-sub">${navInfo.nextSub || 'HALAMAN BERIKUTNYA'}</span>
      <strong class="nml-main">${navInfo.nextText}</strong>
    `;
    if (navInfo.isFinish) {
      labelEl.classList.add('finish');
    } else {
      labelEl.classList.remove('finish');
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

let videoInitialized = false;

function initVideo() {
  const video = document.getElementById('main-video');
  const fallback = document.getElementById('video-fallback');
  if (!video) return;

  const cfg = window.MPI_CONFIG;
  if (cfg && cfg.assets && cfg.assets.video_src) {
    const source = document.getElementById('main-video-source') || video.querySelector('source');
    if (source && source.getAttribute('src') !== cfg.assets.video_src) {
      source.src = cfg.assets.video_src;
      video.load();
    } else if (!source && video.getAttribute('src') !== cfg.assets.video_src) {
      video.src = cfg.assets.video_src;
      video.load();
    }
  }

  const source = video.querySelector('source');
  const currentSrc = source ? (source.getAttribute('src') || source.src) : (video.getAttribute('src') || video.src);

  if (!currentSrc || currentSrc.trim() === '') {
    video.style.display = 'none';
    if (fallback) fallback.style.display = 'block';
    return;
  }

  if (!videoInitialized) {
    videoInitialized = true;

    const onVideoError = function() {
      video.style.display = 'none';
      if (fallback) fallback.style.display = 'block';
    };

    const onVideoSuccess = function() {
      video.style.display = 'block';
      if (fallback) fallback.style.display = 'none';
    };

    video.addEventListener('error', onVideoError);
    if (source) {
      source.addEventListener('error', onVideoError);
    }
    video.addEventListener('loadeddata', onVideoSuccess);
    video.addEventListener('canplay', onVideoSuccess);
    video.addEventListener('loadedmetadata', onVideoSuccess);
  }

  video.style.display = 'block';
  if (fallback) fallback.style.display = 'none';
}


// ==================== MENJODOHKAN ISTILAH (HALAMAN 8) ====================

const MATCH_P8_DATA = [
  { id: '1', term: 'CPU (Processor)', def: 'Otak pemroses instruksi utama komputer (berisi ALU dan Control Unit)' },
  { id: '2', term: 'RAM (Memori Utama)', def: 'Memori kerja berkecepatan tinggi yang menyimpan data sementara (volatil)' },
  { id: '3', term: 'SSD / Penyimpanan', def: 'Media penyimpanan data, program, dan OS secara permanen (non-volatil)' },
  { id: '4', term: 'Motherboard', def: 'Papan sirkuit utama tempat seluruh komponen hardware saling terhubung' },
  { id: '5', term: 'Perangkat I/O', def: 'Perangkat masukan & keluaran (seperti Keyboard, Mouse, dan Monitor)' },
];

const MATCH_P8_THEMES = {
  '1': { color: '#0288d1', bg: '#e1f5fe', border: '#0288d1', label: '1' },
  '2': { color: '#7b1fa2', bg: '#f3e5f5', border: '#8e24aa', label: '2' },
  '3': { color: '#e65100', bg: '#fff3e0', border: '#fb8c00', label: '3' },
  '4': { color: '#2e7d32', bg: '#e8f5e9', border: '#43a047', label: '4' },
  '5': { color: '#c2185b', bg: '#fce4ec', border: '#d81b60', label: '5' },
};

let matchP8State = {
  selectedLeft: null,
  pairs: {} // { leftId: rightId }
};
let shuffledRightP8 = null;

function initMatchP8() {
  const leftCol = document.getElementById('match-left-p8');
  const rightCol = document.getElementById('match-right-p8');
  if (!leftCol || !rightCol) return;

  leftCol.innerHTML = '';
  rightCol.innerHTML = '';

  if (!shuffledRightP8) {
    shuffledRightP8 = [...MATCH_P8_DATA].sort(() => Math.random() - 0.5);
  }

  MATCH_P8_DATA.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.id = `match-p8-left-${item.id}`;
    el.dataset.id = item.id;
    el.dataset.side = 'left';
    el.onclick = (e) => {
      if (e.target.closest('.match-unpair-btn')) {
        e.stopPropagation();
        unpairMatchP8(item.id);
        return;
      }
      onMatchP8Click('left', item.id);
    };
    leftCol.appendChild(el);
  });

  shuffledRightP8.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.id = `match-p8-right-${item.id}`;
    el.dataset.id = item.id;
    el.dataset.side = 'right';
    el.onclick = (e) => {
      if (e.target.closest('.match-unpair-btn')) {
        e.stopPropagation();
        const pairedLeft = Object.keys(matchP8State.pairs).find(k => matchP8State.pairs[k] === item.id);
        if (pairedLeft) unpairMatchP8(pairedLeft);
        return;
      }
      onMatchP8Click('right', item.id);
    };
    rightCol.appendChild(el);
  });

  renderMatchP8UI();
}

function renderMatchP8UI() {
  MATCH_P8_DATA.forEach(item => {
    const el = document.getElementById(`match-p8-left-${item.id}`);
    if (!el) return;
    const isSelected = matchP8State.selectedLeft === item.id;
    const pairedRight = matchP8State.pairs[item.id];
    const theme = MATCH_P8_THEMES[item.id] || MATCH_P8_THEMES['1'];

    el.className = 'match-item' + (isSelected ? ' selected' : '') + (pairedRight ? ' matched' : '');
    if (pairedRight) {
      el.style.setProperty('--pair-color', theme.color);
      el.style.setProperty('--pair-bg', theme.bg);
      el.style.setProperty('--pair-border', theme.border);
      el.innerHTML = `
        <div class="match-item-content">
          <span><strong>${item.term}</strong></span>
        </div>
        <span class="match-badge">🔗 #${theme.label} <span class="match-unpair-btn" title="Batalkan pasangan">✕</span></span>
        <span class="match-anchor-dot"></span>
      `;
    } else {
      el.removeAttribute('style');
      el.innerHTML = `
        <div class="match-item-content">
          <span><strong>${item.term}</strong></span>
        </div>
        <span class="match-anchor-dot"></span>
      `;
    }
  });

  if (shuffledRightP8) {
    shuffledRightP8.forEach(item => {
      const el = document.getElementById(`match-p8-right-${item.id}`);
      if (!el) return;
      const pairedLeft = Object.keys(matchP8State.pairs).find(k => matchP8State.pairs[k] === item.id);
      const theme = pairedLeft ? (MATCH_P8_THEMES[pairedLeft] || MATCH_P8_THEMES['1']) : null;

      el.className = 'match-item' + (pairedLeft ? ' matched' : '');
      if (pairedLeft && theme) {
        el.style.setProperty('--pair-color', theme.color);
        el.style.setProperty('--pair-bg', theme.bg);
        el.style.setProperty('--pair-border', theme.border);
        el.innerHTML = `
          <span class="match-anchor-dot"></span>
          <span class="match-badge">🔗 #${theme.label} <span class="match-unpair-btn" title="Batalkan pasangan">✕</span></span>
          <div class="match-item-content">
            <span>${item.def}</span>
          </div>
        `;
      } else {
        el.removeAttribute('style');
        el.innerHTML = `
          <span class="match-anchor-dot"></span>
          <div class="match-item-content">
            <span>${item.def}</span>
          </div>
        `;
      }
    });
  }

  setTimeout(drawMatchP8Lines, 20);
}

function onMatchP8Click(side, id) {
  if (side === 'left') {
    if (matchP8State.pairs[id]) {
      delete matchP8State.pairs[id];
      matchP8State.selectedLeft = id;
      playSynthSound('click');
      renderMatchP8UI();
      return;
    }
    if (matchP8State.selectedLeft === id) {
      matchP8State.selectedLeft = null;
      playSynthSound('click');
      renderMatchP8UI();
      return;
    }
    matchP8State.selectedLeft = id;
    playSynthSound('click');
    renderMatchP8UI();
  } else if (side === 'right') {
    if (matchP8State.selectedLeft !== null) {
      const leftId = matchP8State.selectedLeft;
      const existingLeft = Object.keys(matchP8State.pairs).find(k => matchP8State.pairs[k] === id);
      if (existingLeft && existingLeft !== leftId) {
        delete matchP8State.pairs[existingLeft];
      }
      matchP8State.pairs[leftId] = id;
      matchP8State.selectedLeft = null;
      playSynthSound('packet_arrive');
      renderMatchP8UI();
    } else {
      const pairedLeft = Object.keys(matchP8State.pairs).find(k => matchP8State.pairs[k] === id);
      if (pairedLeft) {
        delete matchP8State.pairs[pairedLeft];
        playSynthSound('click');
        renderMatchP8UI();
      }
    }
  }
}

function unpairMatchP8(leftId) {
  if (matchP8State.pairs[leftId]) {
    delete matchP8State.pairs[leftId];
    playSynthSound('click');
    renderMatchP8UI();
  }
}

function resetMatchP8() {
  matchP8State = { selectedLeft: null, pairs: {} };
  const scoreBox = document.getElementById('match-p8-score-box');
  if (scoreBox) scoreBox.style.display = 'none';
  playSynthSound('click');
  renderMatchP8UI();
}

function checkMatchP8() {
  const pairedCount = Object.keys(matchP8State.pairs).length;
  if (pairedCount === 0) {
    alert('Silakan hubungkan minimal satu pasangan terlebih dahulu!');
    return;
  }

  let correct = 0;
  MATCH_P8_DATA.forEach(item => {
    if (matchP8State.pairs[item.id] === item.id) {
      correct++;
    }
  });

  const score = Math.round((correct / MATCH_P8_DATA.length) * 100);
  const scoreBox = document.getElementById('match-p8-score-box');
  const badge = document.getElementById('match-p8-score-badge');
  const text = document.getElementById('match-p8-score-text');

  if (scoreBox && badge && text) {
    scoreBox.style.display = 'flex';
    badge.textContent = `🏆 Skor: ${score}`;
    text.textContent = `${correct} dari ${MATCH_P8_DATA.length} Pasangan Benar! ${correct === MATCH_P8_DATA.length ? '🎉 Luar Biasa!' : 'Semangat Belajar!'}`;
  }

  if (score >= 80) {
    playSynthSound('success');
    spawnConfetti();
  } else {
    playSynthSound('click');
  }
}

function drawMatchP8Lines() {
  const container = document.getElementById('match-container-p8');
  const svg = document.getElementById('match-svg-layer-p8');
  if (!container || !svg) return;

  svg.innerHTML = '';
  const containerRect = container.getBoundingClientRect();
  if (containerRect.width === 0 || containerRect.height === 0) return;

  const scaleX = (containerRect.width > 0 && container.offsetWidth > 0) ? (containerRect.width / container.offsetWidth) : 1;
  const scaleY = (containerRect.height > 0 && container.offsetHeight > 0) ? (containerRect.height / container.offsetHeight) : 1;

  Object.entries(matchP8State.pairs).forEach(([leftId, rightId]) => {
    const leftEl = document.getElementById(`match-p8-left-${leftId}`);
    const rightEl = document.getElementById(`match-p8-right-${rightId}`);
    if (!leftEl || !rightEl) return;

    const leftRect = leftEl.getBoundingClientRect();
    const rightRect = rightEl.getBoundingClientRect();

    const x1 = (leftRect.right - containerRect.left) / scaleX;
    const y1 = (leftRect.top + leftRect.height / 2 - containerRect.top) / scaleY;
    const x2 = (rightRect.left - containerRect.left) / scaleX;
    const y2 = (rightRect.top + rightRect.height / 2 - containerRect.top) / scaleY;

    const theme = MATCH_P8_THEMES[leftId] || MATCH_P8_THEMES['1'];
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

// Aliases for compatibility
function initDragDrop() { initMatchP8(); }
function resetDragDrop() { resetMatchP8(); }
function checkDragDrop() { checkMatchP8(); }


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


// ==================== SIMULATOR SISTEM KOMPUTER GAME (PAGE 11) ====================

let computerGame = {
  currentLevel: 1,
  unlockedLevel: 1,
  stars: { 1: 0, 2: 0, 3: 0 },

  // Misi 1: Rakit Motherboard
  m1: {
    mounted: { cpu: false, ram: false, ssd: false, psu: false },
    selected: null,
    powered: false
  },

  // Misi 2: Sakelar Biner 8-Bit (Bobot: 128, 64, 32, 16, 8, 4, 2, 1)
  m2: {
    bits: [0, 0, 0, 0, 0, 0, 0, 0],
    challengeIdx: 2, // Default: Tantangan 2 (65 = 'A')
    challenges: [
      { id: 1, title: "Bentuk Angka Desimal 42", targetDec: 42, targetChar: "*", hint: "Aktifkan sakelar 32, 8, dan 2 (32 + 8 + 2 = 42)" },
      { id: 2, title: "Bentuk Huruf 'A' (Desimal 65)", targetDec: 65, targetChar: "A", hint: "Aktifkan sakelar 64 dan 1 (64 + 1 = 65)" },
      { id: 3, title: "Bentuk Angka Desimal 155", targetDec: 155, targetChar: "›", hint: "Aktifkan sakelar 128, 16, 8, 2, dan 1 (128 + 16 + 8 + 2 + 1 = 155)" }
    ]
  },

  // Misi 3: Siklus Mesin CPU
  m3: {
    step: 0, // 0: Idle, 1: Fetch, 2: Decode, 3: Execute, 4: Store
    autoTimer: null
  }
};

function initComputerGame() {
  updateGameHUD();
  renderCurrentStageUI();
}

function initPacketCommanderGame() {
  initComputerGame();
}

function updateGameHUD() {
  const totalStars = (computerGame.stars[1] ? 1 : 0) + (computerGame.stars[2] ? 1 : 0) + (computerGame.stars[3] ? 1 : 0);
  const starsEl = document.getElementById('game-total-stars');
  if (starsEl) starsEl.textContent = `⭐ ${totalStars}/3`;

  for (let lvl = 1; lvl <= 3; lvl++) {
    const tab = document.getElementById(`game-tab-${lvl}`);
    const tabStars = document.getElementById(`stars-lvl-${lvl}`);
    if (!tab) continue;

    tab.classList.remove('active', 'locked');
    if (lvl === computerGame.currentLevel) tab.classList.add('active');

    if (lvl > computerGame.unlockedLevel) {
      tab.classList.add('locked');
      if (tabStars) tabStars.textContent = '🔒';
    } else {
      if (tabStars) tabStars.textContent = computerGame.stars[lvl] ? '⭐ 1/1' : '⭐ 0/1';
    }
  }

  // Update Status & Diagnostik Badge
  const statusEl = document.getElementById('game-net-status');
  const latencyEl = document.getElementById('game-latency');
  if (statusEl && latencyEl) {
    if (computerGame.currentLevel === 1) {
      statusEl.textContent = computerGame.m1.powered ? '🟢 Sistem Aktif' : '🟡 Menunggu Rakit';
      latencyEl.textContent = computerGame.m1.powered ? '⚡ POST OK' : '⚡ Standby';
    } else if (computerGame.currentLevel === 2) {
      statusEl.textContent = computerGame.stars[2] ? '🟢 Biner Valid' : '🔵 Mode Input';
      latencyEl.textContent = '⏱️ Real-time';
    } else if (computerGame.currentLevel === 3) {
      statusEl.textContent = computerGame.m3.step === 4 ? '🟢 Siklus Sukses' : '🟣 CPU Ready';
      latencyEl.textContent = computerGame.m3.step > 0 ? `Tahap ${computerGame.m3.step}/4` : '⚡ Standby';
    }
  }
}

function switchGameLevel(lvl) {
  if (lvl > computerGame.unlockedLevel) {
    showGameModal({
      icon: '🔒',
      title: 'Misi Masih Terkunci',
      text: `Selesaikan Misi ${lvl - 1} terlebih dahulu untuk membuka tantangan berikutnya!`,
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
    playSynthSound('error');
    return;
  }

  computerGame.currentLevel = lvl;
  playSynthSound('click');
  updateGameHUD();
  renderCurrentStageUI();
}

function renderCurrentStageUI() {
  const p1 = document.getElementById('game-stage-panel-1');
  const p2 = document.getElementById('game-stage-panel-2');
  const p3 = document.getElementById('game-stage-panel-3');
  const descEl = document.getElementById('game-mission-desc');
  const iconEl = document.getElementById('game-mission-icon');

  if (p1) p1.style.display = computerGame.currentLevel === 1 ? 'block' : 'none';
  if (p2) p2.style.display = computerGame.currentLevel === 2 ? 'block' : 'none';
  if (p3) p3.style.display = computerGame.currentLevel === 3 ? 'block' : 'none';

  if (computerGame.currentLevel === 1) {
    if (iconEl) iconEl.textContent = '🔧';
    if (descEl) descEl.textContent = 'Misi 1: Pasang CPU, RAM, SSD, dan PSU ke Motherboard, lalu tekan tombol Power On!';
    updateM1UI();
  } else if (computerGame.currentLevel === 2) {
    if (iconEl) iconEl.textContent = '💡';
    if (descEl) descEl.textContent = 'Misi 2: Atur sakelar 8-bit (1/0) agar menghasilkan nilai desimal / karakter target yang diminta!';
    renderBinarySwitches();
    updateBinaryDisplay();
  } else if (computerGame.currentLevel === 3) {
    if (iconEl) iconEl.textContent = '⚡';
    if (descEl) descEl.textContent = 'Misi 3: Jalankan Siklus Mesin CPU untuk memproses instruksi ADD R1, R2 (15 + 25 = 40)!';
    renderCpuStepUI();
  }
}

// ==================== MISI 1: RAKIT MOTHERBOARD ====================

const M1_COMPONENTS = {
  cpu: { name: 'CPU Processor', socket: 'socket-cpu', icon: '🧠', color: '#00ACC1' },
  ram: { name: 'RAM 16 GB DDR4', socket: 'socket-ram', icon: '⚡', color: '#0288D1' },
  ssd: { name: 'SSD NVMe 512GB', socket: 'socket-ssd', icon: '💾', color: '#7B1FA2' },
  psu: { name: 'Power Supply 550W', socket: 'socket-psu', icon: '🔌', color: '#E65100' }
};

function selectOrMountComponent(compKey) {
  if (computerGame.m1.mounted[compKey]) {
    computerGame.m1.mounted[compKey] = false;
    computerGame.m1.powered = false;
    computerGame.m1.selected = null;
    playSynthSound('click');
    updateM1UI();
    return;
  }

  computerGame.m1.mounted[compKey] = true;
  computerGame.m1.selected = null;
  playSynthSound('packet_arrive');
  updateM1UI();
}

function clickMotherboardSocket(socketType) {
  if (computerGame.m1.mounted[socketType]) {
    computerGame.m1.mounted[socketType] = false;
    computerGame.m1.powered = false;
    playSynthSound('click');
    updateM1UI();
    return;
  }

  computerGame.m1.mounted[socketType] = true;
  playSynthSound('packet_arrive');
  updateM1UI();
}

function updateM1UI() {
  let countMounted = 0;

  Object.keys(M1_COMPONENTS).forEach(key => {
    const isMounted = computerGame.m1.mounted[key];
    if (isMounted) countMounted++;

    const invEl = document.getElementById(`inv-${key}`);
    const invStatus = document.getElementById(`inv-${key}-status`);
    if (invEl && invStatus) {
      if (isMounted) {
        invEl.style.background = '#e0f2fe';
        invEl.style.borderColor = '#0288d1';
        invStatus.textContent = '✅ Terpasang di Soket';
        invStatus.style.color = '#0288d1';
        invStatus.style.fontWeight = '700';
      } else {
        invEl.style.background = '#fff';
        invEl.style.borderColor = M1_COMPONENTS[key].color;
        invStatus.textContent = 'Belum Terpasang (Klik)';
        invStatus.style.color = '#64748b';
        invStatus.style.fontWeight = 'normal';
      }
    }

    const socketEl = document.getElementById(`socket-${key}`);
    const socketIcon = document.getElementById(`socket-${key}-icon`);
    const socketDesc = document.getElementById(`socket-${key}-desc`);
    if (socketEl && socketIcon && socketDesc) {
      if (isMounted) {
        socketEl.style.background = 'rgba(2, 136, 209, 0.2)';
        socketEl.style.borderStyle = 'solid';
        socketEl.style.borderColor = '#38bdf8';
        socketIcon.textContent = M1_COMPONENTS[key].icon;
        socketDesc.textContent = '✅ Terkunci Kuat (Klik lepas)';
        socketDesc.style.color = '#38bdf8';
      } else {
        socketEl.style.background = 'rgba(255, 255, 255, 0.06)';
        socketEl.style.borderStyle = 'dashed';
        socketEl.style.borderColor = M1_COMPONENTS[key].color;
        socketIcon.textContent = '🔲';
        socketDesc.textContent = `Klik untuk memasang ${key.toUpperCase()}`;
        socketDesc.style.color = '#94a3b8';
      }
    }
  });

  const progressEl = document.getElementById('mb-progress-text');
  if (progressEl) {
    progressEl.textContent = `Terpasang: ${countMounted} dari 4 Komponen`;
  }

  const powerBtn = document.getElementById('btn-power-on');
  const powerLed = document.getElementById('mb-power-led');

  if (powerBtn && powerLed) {
    if (countMounted === 4) {
      powerBtn.removeAttribute('disabled');
      powerBtn.style.opacity = '1';
      powerBtn.style.boxShadow = '0 0 16px rgba(0, 172, 193, 0.6)';
      powerBtn.textContent = computerGame.m1.powered ? '⚡ KOMPUTER NYALA (RESTART)' : '⚡ TEKAN TOMBOL POWER (UJI NYALA)';
    } else {
      powerBtn.setAttribute('disabled', 'true');
      powerBtn.style.opacity = '0.5';
      powerBtn.style.boxShadow = 'none';
      powerBtn.textContent = '⚡ PASANG SEMUA KOMPONEN DULU';
    }

    if (computerGame.m1.powered) {
      powerLed.innerHTML = '● Daya Aktif (Power ON)';
      powerLed.style.color = '#22c55e';
    } else {
      powerLed.innerHTML = '● Daya Mati';
      powerLed.style.color = '#ef4444';
    }
  }
}

function testPowerOnPC() {
  const postScreen = document.getElementById('post-screen');
  if (!postScreen) return;

  computerGame.m1.powered = true;
  playSynthSound('transmit');

  postScreen.innerHTML = `
    <div style="color:#38bdf8;">[POWER ON] Aliran daya dari PSU stabil...</div>
    <div style="color:#f59e0b;">[BIOS POST] Memeriksa perangkat keras...</div>
  `;

  setTimeout(() => {
    playSynthSound('packet_arrive');
    postScreen.innerHTML += `
      <div>[CPU] Processor detected: Multi-core OK</div>
      <div>[RAM] 16384 MB Dual-Channel OK</div>
      <div>[SSD] NVMe Storage Boot Sector detected</div>
    `;
    postScreen.scrollTop = postScreen.scrollHeight;
  }, 700);

  setTimeout(() => {
    playSynthSound('success');
    spawnConfetti();
    postScreen.innerHTML += `
      <div style="color:#22c55e;font-weight:bold;margin-top:4px;">[SUCCESS] BOOTING SELESAI! OS LOADED! 🎉</div>
      <div style="color:#a855f7;">Komputer siap digunakan siswa!</div>
    `;
    postScreen.scrollTop = postScreen.scrollHeight;

    computerGame.stars[1] = 1;
    if (computerGame.unlockedLevel < 2) computerGame.unlockedLevel = 2;
    updateGameHUD();
    updateM1UI();

    showGameModal({
      icon: '🏆',
      title: 'Perakitan Komputer Berhasil!',
      text: 'Luar biasa! Kamu berhasil merakit seluruh komponen esensial (CPU, RAM, SSD, dan PSU). Komputer lulus uji POST BIOS dan siap digunakan!',
      stars: '⭐ Misi 1 Selesai!',
      actions: [
        { text: 'Lanjut ke Misi 2 (Sakelar Biner) ▶', primary: true, onClick: () => { closeGameModal(); switchGameLevel(2); } }
      ]
    });
  }, 1600);
}

// ==================== MISI 2: SAKELAR BINER 8-BIT ====================

const BINARY_WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];

function renderBinarySwitches() {
  const row = document.getElementById('binary-switches-row');
  if (!row) return;

  row.innerHTML = '';
  BINARY_WEIGHTS.forEach((weight, idx) => {
    const isOn = computerGame.m2.bits[idx] === 1;
    const col = document.createElement('div');
    col.className = 'binary-bit-col';
    col.style.cssText = `
      background: ${isOn ? '#e0f7fa' : '#f8fafc'};
      border: 2px solid ${isOn ? '#00ACC1' : '#cbd5e1'};
      border-radius: 12px;
      padding: 10px 4px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    `;
    col.onclick = () => toggleBit(idx);

    col.innerHTML = `
      <div style="font-size:26px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${isOn ? '💡' : '⚫'}</div>
      <div style="font-size:18px;font-weight:800;color:${isOn ? '#006064' : '#64748b'};margin:4px 0;">${isOn ? '1' : '0'}</div>
      <div style="font-size:11px;font-weight:700;color:${isOn ? '#00838f' : '#94a3b8'};background:${isOn ? '#b2ebf2' : '#e2e8f0'};padding:2px 4px;border-radius:6px;">Bobot ${weight}</div>
      <button style="margin-top:6px;font-size:11px;padding:3px 8px;border-radius:6px;border:none;background:${isOn ? '#00ACC1' : '#cbd5e1'};color:#fff;font-weight:700;cursor:pointer;">
        ${isOn ? 'ON' : 'OFF'}
      </button>
    `;

    row.appendChild(col);
  });
}

function toggleBit(idx) {
  computerGame.m2.bits[idx] = computerGame.m2.bits[idx] === 1 ? 0 : 1;
  playSynthSound('click');
  renderBinarySwitches();
  updateBinaryDisplay();
}

function updateBinaryDisplay() {
  let sum = 0;
  const terms = [];

  BINARY_WEIGHTS.forEach((w, idx) => {
    if (computerGame.m2.bits[idx] === 1) {
      sum += w;
      terms.push(w);
    }
  });

  const formulaEl = document.getElementById('bin-calc-formula');
  const decValEl = document.getElementById('bin-decimal-value');
  const asciiValEl = document.getElementById('bin-ascii-value');

  if (formulaEl) {
    formulaEl.innerHTML = terms.length > 0 
      ? `Kalkulasi: ${terms.join(' + ')} = <strong>${sum}</strong>`
      : `Kalkulasi: Semua sakelar OFF = <strong>0</strong>`;
  }

  if (decValEl) decValEl.textContent = sum;
  if (asciiValEl) {
    if (sum >= 32 && sum <= 126) {
      asciiValEl.textContent = `'${String.fromCharCode(sum)}'`;
    } else if (sum === 0) {
      asciiValEl.textContent = '[NUL]';
    } else {
      asciiValEl.textContent = `[Kode #${sum}]`;
    }
  }
}

function switchBinaryChallenge(num) {
  computerGame.m2.challengeIdx = num;
  const challenge = computerGame.m2.challenges.find(c => c.id === num) || computerGame.m2.challenges[1];
  const titleEl = document.getElementById('bin-target-title');
  if (titleEl) titleEl.textContent = challenge.title;
  playSynthSound('click');
}

function verifyBinarySolution() {
  const challenge = computerGame.m2.challenges.find(c => c.id === computerGame.m2.challengeIdx) || computerGame.m2.challenges[1];
  let sum = 0;
  BINARY_WEIGHTS.forEach((w, idx) => {
    if (computerGame.m2.bits[idx] === 1) sum += w;
  });

  if (sum === challenge.targetDec) {
    playSynthSound('success');
    spawnConfetti();
    computerGame.stars[2] = 1;
    if (computerGame.unlockedLevel < 3) computerGame.unlockedLevel = 3;
    updateGameHUD();

    showGameModal({
      icon: '🎉',
      title: 'Tepat Sekali! Kode Biner Valid!',
      text: `Kombinasi biner yang kamu susun berhasil menghasilkan nilai desimal <strong>${sum}</strong> (${challenge.title})! Kamu memahami prinsip transistor dan bit digital!`,
      stars: '⭐ Misi 2 Selesai!',
      actions: [
        { text: 'Lanjut ke Misi 3 (Siklus CPU) ▶', primary: true, onClick: () => { closeGameModal(); switchGameLevel(3); } }
      ]
    });
  } else {
    playSynthSound('error');
    showGameModal({
      icon: '💡',
      title: 'Belum Sesuai',
      text: `Nilai biner saat ini adalah <strong>${sum}</strong>, sedangkan target adalah <strong>${challenge.targetDec}</strong>.<br><br><em>Petunjuk: ${challenge.hint}</em>`,
      actions: [{ text: 'Coba Lagi', primary: true, onClick: closeGameModal }]
    });
  }
}

// ==================== MISI 3: SIKLUS MESIN CPU ====================

const CPU_STAGES = [
  { id: 'fetch', label: 'FETCH (Ambil)', desc: 'Control Unit (CU) mengambil instruksi "ADD R1, R2" dari alamat memori RAM.' },
  { id: 'decode', label: 'DECODE (Terjemahkan)', desc: 'CU menerjemahkan kode instruksi: Opcode ADD (Penjumlahan) dengan angka 15 dan 25.' },
  { id: 'execute', label: 'EXECUTE (Hitung)', desc: 'Arithmetic Logic Unit (ALU) mengeksekusi perhitungan: 15 + 25 = 40 secepat kilat.' },
  { id: 'store', label: 'STORE (Simpan)', desc: 'Hasil perhitungan 40 disimpan kembali ke register memori RAM dan ditampilkan ke Monitor!' }
];

function renderCpuStepUI() {
  const currentStep = computerGame.m3.step;
  const descBanner = document.getElementById('cpu-cycle-desc');

  CPU_STAGES.forEach((stage, idx) => {
    const stepNum = idx + 1;
    const box = document.getElementById(`cpu-stage-${stage.id}`);
    const tag = document.getElementById(`status-tag-${stage.id}`);
    if (!box || !tag) return;

    if (currentStep === stepNum) {
      box.style.background = '#e0f7fa';
      box.style.borderColor = '#00ACC1';
      box.style.transform = 'scale(1.04)';
      tag.style.background = '#00ACC1';
      tag.style.color = '#fff';
      tag.textContent = 'Sedang Berjalan ⚡';
    } else if (currentStep > stepNum) {
      box.style.background = '#f0fdf4';
      box.style.borderColor = '#22c55e';
      box.style.transform = 'scale(1.0)';
      tag.style.background = '#dcfce7';
      tag.style.color = '#15803d';
      tag.textContent = 'Selesai ✅';
    } else {
      box.style.background = '#f8fafc';
      box.style.borderColor = '#cbd5e1';
      box.style.transform = 'scale(1.0)';
      tag.style.background = '#e2e8f0';
      tag.style.color = '#64748b';
      tag.textContent = 'Menunggu';
    }
  });

  if (descBanner) {
    if (currentStep === 0) {
      descBanner.innerHTML = 'Klik <strong>"Langkah Berikutnya"</strong> atau <strong>"Jalankan Otomatis"</strong> untuk memulai siklus instruksi CPU!';
    } else {
      const activeStage = CPU_STAGES[currentStep - 1];
      descBanner.innerHTML = `<strong>Tahap ${currentStep}: ${activeStage.label}</strong> — ${activeStage.desc}`;
    }
  }
}

function stepCpuCycle() {
  if (computerGame.m3.step >= 4) {
    resetCpuCycle();
    return;
  }

  computerGame.m3.step++;
  playSynthSound('hop');
  renderCpuStepUI();
  updateGameHUD();

  if (computerGame.m3.step === 4) {
    setTimeout(() => {
      playSynthSound('victory');
      spawnConfetti();
      computerGame.stars[3] = 1;
      updateGameHUD();

      showGameModal({
        icon: '🏆',
        title: 'Selamat! Kamu Teknisi Komputer Sejati!',
        text: 'Luar biasa! Kamu telah menuntaskan seluruh 3 Misi: Merakit Komputer, Memecahkan Kode Biner, dan Mengamati Siklus Mesin CPU secara detail!',
        stars: '⭐⭐⭐ SEMPURNA 3/3 BINTANG!',
        actions: [
          { text: 'Lanjut ke Latihan Evaluasi 📝', primary: true, onClick: () => { closeGameModal(); goToPage('latihan-intro'); } }
        ]
      });
    }, 600);
  }
}

function autoRunCpuCycle() {
  resetCpuCycle();
  let step = 0;
  const interval = setInterval(() => {
    step++;
    if (step <= 4) {
      stepCpuCycle();
    } else {
      clearInterval(interval);
    }
  }, 900);
}

function resetCpuCycle() {
  computerGame.m3.step = 0;
  renderCpuStepUI();
  updateGameHUD();
}

function resetCurrentGameLevel() {
  if (computerGame.currentLevel === 1) {
    computerGame.m1.mounted = { cpu: false, ram: false, ssd: false, psu: false };
    computerGame.m1.powered = false;
    const postScreen = document.getElementById('post-screen');
    if (postScreen) {
      postScreen.innerHTML = `<div>[BIOS v2.4] Standby...</div><div style="color:#64748b;">Menunggu semua komponen terpasang di motherboard...</div>`;
    }
    updateM1UI();
  } else if (computerGame.currentLevel === 2) {
    computerGame.m2.bits = [0, 0, 0, 0, 0, 0, 0, 0];
    renderBinarySwitches();
    updateBinaryDisplay();
  } else if (computerGame.currentLevel === 3) {
    resetCpuCycle();
  }
  playSynthSound('click');
}

function showGameHint() {
  if (computerGame.currentLevel === 1) {
    showGameModal({
      icon: '💡',
      title: 'Bantuan Misi 1',
      text: 'Klik setiap kartu komponen di rak kiri (CPU, RAM, SSD, PSU) atau klik langsung kotak soket bergaris putus-putus pada motherboard. Setelah keempatnya terpasang, tombol POWER akan menyala!',
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
  } else if (computerGame.currentLevel === 2) {
    const challenge = computerGame.m2.challenges.find(c => c.id === computerGame.m2.challengeIdx) || computerGame.m2.challenges[1];
    showGameModal({
      icon: '💡',
      title: 'Bantuan Misi 2',
      text: `Target: <strong>${challenge.targetDec}</strong>.<br><br>Petunjuk perhitungan: ${challenge.hint}`,
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
  } else if (computerGame.currentLevel === 3) {
    showGameModal({
      icon: '💡',
      title: 'Bantuan Misi 3',
      text: 'Klik tombol "Langkah Berikutnya" untuk mengamati setiap perpindahan data dari RAM ke CU, ALU, dan Monitor, atau klik "Jalankan Otomatis" untuk animasi penuh!',
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
  }
}

function showGameModal(config) {
  const modal = document.getElementById('game-modal');
  const card = document.getElementById('game-modal-card');
  if (!modal || !card) return;

  let actionsHTML = '';
  if (config.actions && config.actions.length > 0) {
    config.actions.forEach((act, idx) => {
      actionsHTML += `
        <button class="btn ${act.primary ? 'btn-primary' : 'btn-secondary'}" id="modal-act-${idx}" style="font-size:14px;padding:8px 18px;border-radius:8px;">
          ${act.text}
        </button>
      `;
    });
  } else {
    actionsHTML = `<button class="btn btn-primary" onclick="closeGameModal()">Tutup</button>`;
  }

  card.innerHTML = `
    <div class="gm-icon" style="font-size:48px;margin-bottom:8px;">${config.icon || '🎯'}</div>
    <h3 class="gm-title ${config.titleClass || 'success'}" style="font-size:22px;margin-bottom:8px;">${config.title || ''}</h3>
    <p class="gm-text" style="font-size:15px;line-height:1.5;margin-bottom:14px;color:#334155;">${config.text || ''}</p>
    ${config.stars ? `<div class="gm-stars-row" style="font-size:18px;font-weight:800;color:#00ACC1;margin-bottom:14px;">${config.stars}</div>` : ''}
    <div class="gm-actions" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
      ${actionsHTML}
    </div>
  `;

  if (config.actions && config.actions.length > 0) {
    config.actions.forEach((act, idx) => {
      const btn = document.getElementById(`modal-act-${idx}`);
      if (btn && act.onClick) btn.onclick = act.onClick;
    });
  }

  modal.classList.add('show');
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  if (modal) modal.classList.remove('show');
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
  B1: 'benar', B2: 'salah', B3: 'benar', B4: 'salah', B5: 'benar',
};

const MATCH_ANSWERS = {
  '1': 'b', '2': 'd', '3': 'e', '4': 'a', '5': 'c'
};

const SEQ_CORRECT_ORDER = [
  'Tombol daya ditekan, Power Supply mengalirkan arus listrik ke motherboard',
  'BIOS/UEFI pada ROM melakukan Power-On Self Test (POST) memeriksa kesiapan hardware',
  'CPU memuat program bootloader sistem operasi dari media penyimpanan sekunder (SSD)',
  'Berkas inti Sistem Operasi (OS Kernel) disalin dan dimuat ke dalam memori kerja RAM',
  'Layar Desktop Sistem Operasi tampil dan komputer siap menerima input dari pengguna'
];

let evalUserAnswers = {};
let matchState = { selectedLeft: null, pairs: {} };
let evalSectionInited = { C: false, D: false };

function startEval() {
  evalUserAnswers = {};
  matchState = { selectedLeft: null, pairs: {} };
  evalSectionInited = { C: false, D: false };
  currentShuffledRight = null;

  // 1. Reset Bagian A (Pilihan Ganda): Hapus semua pilihan yang terpilih
  document.querySelectorAll('#eval-section-A .mcq-option').forEach(o => {
    o.classList.remove('selected');
  });

  // 2. Reset Bagian B (Benar / Salah): Hapus semua tombol yang terpilih
  document.querySelectorAll('#eval-section-B .tf-btn').forEach(b => {
    b.classList.remove('selected-benar', 'selected-salah');
  });

  // 3. Reset Bagian C (Menjodohkan): Kosongkan kontainer dan render ulang fresh
  const leftCol = document.getElementById('match-left');
  const rightCol = document.getElementById('match-right');
  const svg = document.getElementById('match-svg-layer');
  if (leftCol) leftCol.innerHTML = '';
  if (rightCol) rightCol.innerHTML = '';
  if (svg) svg.innerHTML = '';

  // 4. Reset Bagian D (Mengurutkan): Kosongkan urutan dan render ulang fresh
  const seqList = document.getElementById('seq-list');
  if (seqList) seqList.innerHTML = '';

  // 5. Reset Halaman Rekap & Progress Steps
  const recapCard = document.getElementById('recap-card');
  if (recapCard) recapCard.innerHTML = '';
  const recapSection = document.getElementById('eval-section-recap');
  if (recapSection) recapSection.classList.remove('active');

  document.querySelectorAll('.eval-progress .step').forEach(s => {
    s.classList.remove('active', 'done');
  });

  // 6. Mulai kembali dari Bagian A
  nextEvalSection('A');
}

function nextEvalSection(sectionId) {
  document.querySelectorAll('.eval-section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById('eval-section-' + sectionId);
  if (section) section.classList.add('active');

  const steps = ['A', 'B', 'C', 'D'];
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
  { id: '1', text: 'CPU (Central Processing Unit)' },
  { id: '2', text: 'ALU (Arithmetic Logic Unit)' },
  { id: '3', text: 'RAM (Random Access Memory)' },
  { id: '4', text: 'ROM / BIOS' },
  { id: '5', text: 'Sistem Operasi (OS)' }
];

const MATCH_RIGHT_DATA = [
  { id: 'a', text: 'Memori baca-saja yang menyimpan instruksi booting awal komputer' },
  { id: 'b', text: 'Otak utama komputer pengendali seluruh pemrosesan instruksi' },
  { id: 'c', text: 'Perangkat lunak pengendali seluruh sumber daya hardware dan aplikasi' },
  { id: 'd', text: 'Komponen CPU yang khusus melakukan kalkulasi aritmatika dan logika' },
  { id: 'e', text: 'Memori utama tempat program yang sedang berjalan disimpan sementara' }
];

const MATCH_PAIR_THEMES = {
  '1': { color: '#00838f', bg: '#e0f7fa', border: '#00acc1', num: 1, label: '1' },
  '2': { color: '#e65100', bg: '#fff3e0', border: '#ff9800', num: 2, label: '2' },
  '3': { color: '#6a1b9a', bg: '#f3e5f5', border: '#ab47bc', num: 3, label: '3' },
  '4': { color: '#2e7d32', bg: '#e8f5e9', border: '#4caf50', num: 4, label: '4' },
  '5': { color: '#c2185b', bg: '#fce4ec', border: '#e91e63', num: 5, label: '5' }
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
  // 1. Render Left items
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

  // 2. Render Right items
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

  // 3. Draw dynamic connecting SVG lines
  setTimeout(drawMatchLines, 20);
}

function onMatchClick(side, id, el) {
  if (side === 'left') {
    if (matchState.pairs[id]) {
      // User clicked an already matched left item -> unpair it and make it selected to allow quick correction
      delete matchState.pairs[id];
      matchState.selectedLeft = id;
      playSynthSound('click');
      renderMatchUI();
      return;
    }

    if (matchState.selectedLeft === id) {
      // Toggle off / cancel selection
      matchState.selectedLeft = null;
      playSynthSound('click');
      renderMatchUI();
      return;
    }

    // Select this left item
    matchState.selectedLeft = id;
    playSynthSound('click');
    renderMatchUI();

  } else if (side === 'right') {
    if (matchState.selectedLeft !== null) {
      const leftId = matchState.selectedLeft;

      // If right item was already paired with another left item, unpair that other left item
      const existingLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === id);
      if (existingLeft && existingLeft !== leftId) {
        delete matchState.pairs[existingLeft];
      }

      // Pair selected left with this right
      matchState.pairs[leftId] = id;
      matchState.selectedLeft = null;
      playSynthSound('packet_arrive');
      renderMatchUI();

    } else {
      // User clicked a right item without any left item selected
      const pairedLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === id);
      if (pairedLeft) {
        // Unpair this match
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

  const scaleX = (containerRect.width > 0 && container.offsetWidth > 0) ? (containerRect.width / container.offsetWidth) : 1;
  const scaleY = (containerRect.height > 0 && container.offsetHeight > 0) ? (containerRect.height / container.offsetHeight) : 1;

  Object.entries(matchState.pairs).forEach(([leftId, rightId]) => {
    const leftEl = document.getElementById(`match-left-${leftId}`);
    const rightEl = document.getElementById(`match-right-${rightId}`);
    if (!leftEl || !rightEl) return;

    const leftRect = leftEl.getBoundingClientRect();
    const rightRect = rightEl.getBoundingClientRect();

    const x1 = (leftRect.right - containerRect.left) / scaleX;
    const y1 = (leftRect.top + leftRect.height / 2 - containerRect.top) / scaleY;
    const x2 = (rightRect.left - containerRect.left) / scaleX;
    const y2 = (rightRect.top + rightRect.height / 2 - containerRect.top) / scaleY;

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

    // Endpoint dots
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
  const scores = { A: 0, B: 0, C: 0, D: 0 };

  for (let i = 1; i <= 5; i++) {
    const key = 'A' + i;
    if (evalUserAnswers[key] === EVAL_ANSWERS[key]) scores.A++;
  }

  for (let i = 1; i <= 5; i++) {
    const key = 'B' + i;
    if (evalUserAnswers[key] === EVAL_ANSWERS[key]) scores.B++;
  }

  for (const [left, right] of Object.entries(matchState.pairs)) {
    if (MATCH_ANSWERS[left] === right) scores.C++;
  }

  const seqItems = document.querySelectorAll('#seq-list .seq-item');
  seqItems.forEach((item, i) => {
    if (parseInt(item.dataset.correctIdx) === i) scores.D++;
  });

  const total = scores.A + scores.B + scores.C + scores.D;
  const maxTotal = 20;
  const percentage = Math.round((total / maxTotal) * 100);

  let msgClass, msgText;
  if (percentage >= 90) {
    msgClass = 'excellent';
    msgText = 'Luar biasa! Kamu benar-benar Ahli Sistem Komputer sejati! 🏆';
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
      <span class="recap-badge b">Bagian B: ${scores.B}/5</span>
      <span class="recap-badge c">Bagian C: ${scores.C}/5</span>
      <span class="recap-badge d">Bagian D: ${scores.D}/5</span>
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


// ==================== MOBILE & DESKTOP SWIPE NAVIGATION ====================

function initSwipeNavigation() {
  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let tracking = false;
  let directionLocked = false; // once locked, won't change
  let isHorizontal = false;
  let isMouse = false;

  const MIN_DISTANCE = 40;  // px — minimum swipe distance
  const MAX_TIME = 900;     // ms — maximum allowed swipe duration
  const LOCK_THRESHOLD = 8; // px — distance to lock direction

  // Elements that should NOT trigger page swipe
  function isInteractive(el) {
    if (!el || !(el instanceof Element)) return false;

    // Active modal overlay
    const modal = document.querySelector('.game-modal.show, #game-modal.show');
    if (modal && modal.contains(el)) return true;

    return !!el.closest([
      'video', 'audio', 'canvas', 'input', 'textarea', 'select',
      '.match-p8-item', '.match-item', '.match-col', '.match-column',
      '.seq-item', '.node-item', '.router-node',
      '.game-canvas', '#game-canvas', '.game-controls',
      '.packet-btn', '.route-btn',
      '.video-container', '.video-controls',
      '.qc-panel', '#quick-controls-panel',
      '.no-swipe', '[data-no-swipe]'
    ].join(','));
  }

  // --- TOUCH EVENTS (Mobile & Tablet) ---
  document.addEventListener('touchstart', function(e) {
    if (e.touches.length !== 1) return;
    if (isInteractive(e.target)) { tracking = false; return; }

    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    startTime = Date.now();
    tracking = true;
    directionLocked = false;
    isHorizontal = false;
    isMouse = false;
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    if (!tracking || isMouse || e.touches.length !== 1) return;

    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);

    // Lock direction once finger has moved enough
    if (!directionLocked && (ax > LOCK_THRESHOLD || ay > LOCK_THRESHOLD)) {
      directionLocked = true;
      isHorizontal = ax > ay;
    }

    // If horizontal, prevent browser scroll/navigation
    if (directionLocked && isHorizontal && e.cancelable) {
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('touchend', function(e) {
    if (!tracking || isMouse) return;
    tracking = false;

    // Only act on horizontal swipes
    if (!directionLocked || !isHorizontal) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - startX;
    const elapsed = Date.now() - startTime;

    if (elapsed > 2000) return;
    if (Math.abs(dx) < MIN_DISTANCE) return;

    if (dx < 0) {
      navNext();  // swipe left → next
    } else {
      navPrev();  // swipe right → prev
    }
  }, { passive: true });

  document.addEventListener('touchcancel', function() {
    tracking = false;
  }, { passive: true });

  // --- MOUSE DRAG EVENTS (Desktop testing & touch-screen emulators) ---
  document.addEventListener('mousedown', function(e) {
    if (e.button !== 0) return;
    if (isInteractive(e.target)) { tracking = false; return; }

    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    tracking = true;
    directionLocked = false;
    isHorizontal = false;
    isMouse = true;
  });

  document.addEventListener('mousemove', function(e) {
    if (!tracking || !isMouse) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const ax = Math.abs(dx);
    const ay = Math.abs(dy);

    if (!directionLocked && (ax > LOCK_THRESHOLD || ay > LOCK_THRESHOLD)) {
      directionLocked = true;
      isHorizontal = ax > ay;
    }

    if (directionLocked && isHorizontal && e.cancelable) {
      e.preventDefault();
    }
  });

  document.addEventListener('mouseup', function(e) {
    if (!tracking || !isMouse) return;
    tracking = false;

    if (!directionLocked || !isHorizontal) return;

    const dx = e.clientX - startX;
    const elapsed = Date.now() - startTime;

    if (elapsed > 5000) return;
    if (Math.abs(dx) < MIN_DISTANCE) return;

    if (dx < 0) {
      navNext();  // drag left → next
    } else {
      navPrev();  // drag right → prev
    }
  });

  document.addEventListener('dragstart', function(e) {
    if (tracking && isMouse && directionLocked && isHorizontal) {
      e.preventDefault();
    }
  });
}


// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
  applyConfig();
  setAppZoom(currentZoom);
  setAppFontScale(currentFontScale);
  goToPage('cover');
  initSwipeNavigation();

  window.addEventListener('resize', () => {
    if (currentPage === 'tarik-jawaban') {
      drawMatchP8Lines();
    }
    const secC = document.getElementById('eval-section-C');
    if (secC && secC.classList.contains('active')) {
      drawMatchLines();
    }
  });

  const tarikBox = document.getElementById('content-tarik-jawaban');
  if (tarikBox) {
    tarikBox.addEventListener('scroll', () => {
      if (currentPage === 'tarik-jawaban') {
        drawMatchP8Lines();
      }
    });
  }

  const evalBox = document.getElementById('eval-box');
  if (evalBox) {
    evalBox.addEventListener('scroll', () => {
      const secC = document.getElementById('eval-section-C');
      if (secC && secC.classList.contains('active')) {
        drawMatchLines();
      }
    });
  }

  // Unified click handler for top & bottom compound navigations
  document.addEventListener('click', function(e) {
    const navTop = e.target.closest('.nav-top');
    if (navTop) {
      const btn = navTop.querySelector('.nav-circle');
      if (btn && e.target !== btn && !btn.contains(e.target)) {
        btn.click();
      }
    }

    const navMateri = e.target.closest('.nav-btn-materi');
    if (navMateri) {
      const btn = navMateri.querySelector('.nav-circle');
      if (btn && e.target !== btn && !btn.contains(e.target)) {
        btn.click();
      }
    }

    const leftCompound = e.target.closest('.nav-bottom.left.nav-materi-compound');
    if (leftCompound && e.target === leftCompound) {
      const arrow = leftCompound.querySelector('.nav-arrow');
      if (arrow) arrow.click();
      else navPrev();
    }

    const rightCompound = e.target.closest('.nav-bottom.right.nav-materi-compound');
    if (rightCompound && e.target === rightCompound) {
      const arrow = rightCompound.querySelector('.nav-arrow');
      if (arrow) arrow.click();
      else navNext();
    }
  });
});
