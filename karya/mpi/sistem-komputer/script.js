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
  'prompt-ai': 17,
  'pengembang': 18,
  'kutipan': 19,
  'kredit': 20
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
  indicator.innerHTML = `<span>Halaman ${pageNum} / 20</span>`;
  indicator.style.display = 'block';
}

const LINEAR_PAGES = [
  'cover', 'menu', 'petunjuk', 'tujuan', 'materi-list',
  'materi-1', 'tarik-jawaban', 'materi-2', 'video', 'materi-3',
  'permainan-intro', 'permainan', 'latihan-intro', 'latihan',
  'rangkuman', 'referensi', 'prompt-ai', 'pengembang', 'kutipan', 'kredit'
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
    nextText: 'Dokumentasi Prompt AI',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'prompt-ai': {
    prevText: 'Referensi & Daftar Pustaka',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Profil Pengembang',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'pengembang': {
    prevText: 'Dokumentasi Prompt AI',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Motto / Kutipan Inspirasi',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'kutipan': {
    prevText: 'Profil Pengembang',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Kredit Media & Penutup',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'kredit': {
    prevText: 'Motto',
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
  stars: { 1: 0, 2: 0, 3: 0, 4: 0 },

  // Misi 1: Rakit Komputer Spesifikasi & Kompatibilitas
  m1: {
    mounted: { cpu: null, ram: null, ssd: null, psu: null },
    powered: false
  },

  // Misi 2: Sakelar Biner 8-Bit (Bobot: 128, 64, 32, 16, 8, 4, 2, 1)
  m2: {
    bits: [0, 0, 0, 0, 0, 0, 0, 0],
    challengeIdx: 1,
    completed: { 1: false, 2: false, 3: false },
    challenges: [
      { id: 1, title: "Tantangan 1: Desimal 27", targetDec: 27, hint: "Aktifkan sakelar 16, 8, 2, dan 1 (16 + 8 + 2 + 1 = 27)" },
      { id: 2, title: "Tantangan 2: Huruf 'K' (Desimal 75)", targetDec: 75, hint: "Aktifkan sakelar 64, 8, 2, dan 1 (64 + 8 + 2 + 1 = 75)" },
      { id: 3, title: "Tantangan 3: Desimal 200", targetDec: 200, hint: "Aktifkan sakelar 128, 64, dan 8 (128 + 64 + 8 = 200)" }
    ]
  },

  // Misi 3: Kasus Teknisi 1 (SOP Hardware: Layar Gelap & Bunyi Beep)
  m3: {
    selectedActions: [],
    isBeeping: false,
    beepInterval: null
  },

  // Misi 4: Kasus Teknisi 2 (Paket Optimasi Kinerja: RAM 98% vs Storage)
  m4: {
    selectedActions: []
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
  const totalStars = (computerGame.stars[1] ? 1 : 0) + (computerGame.stars[2] ? 1 : 0) + (computerGame.stars[3] ? 1 : 0) + (computerGame.stars[4] ? 1 : 0);
  const starsEl = document.getElementById('game-total-stars');
  if (starsEl) starsEl.textContent = `⭐ ${totalStars}/4`;

  for (let lvl = 1; lvl <= 4; lvl++) {
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
      statusEl.textContent = computerGame.stars[3] ? '🟢 RAM Normal' : '🔴 Layar Blank';
      latencyEl.textContent = computerGame.stars[3] ? '⚡ Signal OK' : '🔊 Beep Code';
    } else if (computerGame.currentLevel === 4) {
      statusEl.textContent = computerGame.stars[4] ? '🟢 Kinerja Pulih' : '⚠️ RAM 98% (Lag)';
      latencyEl.textContent = computerGame.stars[4] ? '⚡ Optimal' : '⚠️ Bottleneck';
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

  // Hentikan beep jika keluar dari level 3
  if (computerGame.currentLevel === 3 && lvl !== 3) {
    stopBeepSound();
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
  const p4 = document.getElementById('game-stage-panel-4');
  const descEl = document.getElementById('game-mission-desc');
  const iconEl = document.getElementById('game-mission-icon');

  if (p1) p1.style.display = computerGame.currentLevel === 1 ? 'block' : 'none';
  if (p2) p2.style.display = computerGame.currentLevel === 2 ? 'block' : 'none';
  if (p3) p3.style.display = computerGame.currentLevel === 3 ? 'block' : 'none';
  if (p4) p4.style.display = computerGame.currentLevel === 4 ? 'block' : 'none';

  if (computerGame.currentLevel === 1) {
    if (iconEl) iconEl.textContent = '🔧';
    if (descEl) descEl.textContent = 'Misi 1: Pilih 4 komponen yang kompatibel (CPU, RAM, Storage, PSU) ke Motherboard, lalu uji nyala!';
    updateM1UI();
  } else if (computerGame.currentLevel === 2) {
    if (iconEl) iconEl.textContent = '💡';
    if (descEl) descEl.textContent = 'Misi 2: Atur sakelar 8-bit (1/0) agar kalkulasi menghasilkan nilai desimal / karakter yang diminta! (Dikerjakan 1 tantangan sudah dianggap selesai)';
    renderBinarySwitches();
    updateBinaryDisplay();
    updateBinaryChallengeButtonsUI();
  } else if (computerGame.currentLevel === 3) {
    if (iconEl) iconEl.textContent = '🛠️';
    if (descEl) descEl.textContent = 'Misi 3: Kasus Teknisi 1 — Analisis komputer blank dengan kode beep panjang berulang dan tentukan perbaikannya!';
    renderTroubleCase1UI();
  } else if (computerGame.currentLevel === 4) {
    if (iconEl) iconEl.textContent = '⚡';
    if (descEl) descEl.textContent = 'Misi 4: Kasus Teknisi 2 — Analisis grafik Task Manager saat sistem freeze, temukan bottleneck dan solusi multitasking!';
    renderTroubleCase2UI();
  }
}

// ==================== MISI 1: RAKIT MOTHERBOARD ENHANCED ====================

const M1_CATALOG = {
  cpu_good: { slot: 'cpu', name: 'CPU Multi-Core', tag: 'Soket LGA', isGood: true, img: 'assets/comp_cpu_good.jpg' },
  cpu_bad: { slot: 'cpu', name: 'CPU Jadul (Pin Patah)', tag: 'Cacat Fisik', isGood: false, img: 'assets/comp_cpu_bad.jpg', error: 'Pin prosessor patah/bengkok! Terjadi korsleting inisialisasi prosessor!' },
  ram_good: { slot: 'ram', name: 'RAM 16GB DDR4', tag: 'Slot DDR4', isGood: true, img: 'assets/comp_ram_good.jpg' },
  ram_bad: { slot: 'ram', name: 'RAM DDR1 Jadul', tag: 'Notch Salah', isGood: false, img: 'assets/comp_ram_bad.jpg', error: 'Posisi notch DDR1 tidak cocok dengan slot DDR4! Slot menolak modul jadul ini!' },
  ssd_good: { slot: 'ssd', name: 'SSD NVMe 512GB', tag: 'Slot M.2 PCIe', isGood: true, img: 'assets/comp_ssd_good.jpg' },
  floppy_bad: { slot: 'ssd', name: 'Disket Floppy 1.44MB', tag: 'Media Kuno', isGood: false, img: 'assets/comp_floppy_bad.jpg', error: 'Media disket tidak kompatibel dengan slot M.2 NVMe dan kapasitasnya terlalu kecil!' },
  psu_good: { slot: 'psu', name: 'PSU 550W 80+', tag: 'Daya Stabil', isGood: true, img: 'assets/comp_psu_good.jpg' },
  charger_bad: { slot: 'psu', name: 'Adaptor HP 10W', tag: 'Daya Lemah', isGood: false, img: 'assets/comp_charger_bad.jpg', error: 'Daya 10W terlalu kecil! Sirkuit motherboard membutuhkan catu daya ATX standar!' }
};

function selectOrMountComponent(itemKey) {
  const item = M1_CATALOG[itemKey];
  if (!item) return;

  // Jika item ini sudah terpasang di soketnya, lepas kembali
  if (computerGame.m1.mounted[item.slot] === itemKey) {
    computerGame.m1.mounted[item.slot] = null;
    computerGame.m1.powered = false;
    playSynthSound('click');
    updateM1UI();
    return;
  }

  // Pasang item ke soket yang sesuai
  computerGame.m1.mounted[item.slot] = itemKey;
  computerGame.m1.powered = false;
  playSynthSound('packet_arrive');
  updateM1UI();
}

function clickMotherboardSocket(slotType) {
  if (computerGame.m1.mounted[slotType]) {
    computerGame.m1.mounted[slotType] = null;
    computerGame.m1.powered = false;
    playSynthSound('click');
    updateM1UI();
  }
}

function updateM1UI() {
  let countMounted = 0;

  // Update Inventory Cards
  Object.keys(M1_CATALOG).forEach(key => {
    const item = M1_CATALOG[key];
    const isMounted = computerGame.m1.mounted[item.slot] === key;
    const cardEl = document.getElementById(`inv-${key}`);
    const statusEl = document.getElementById(`inv-${key}-status`);
    if (cardEl && statusEl) {
      if (isMounted) {
        cardEl.classList.add('mounted');
        statusEl.textContent = '✅ Terpasang di Soket';
        statusEl.style.color = '#0288d1';
        statusEl.style.fontWeight = '700';
      } else {
        cardEl.classList.remove('mounted');
        statusEl.textContent = 'Siap Pasang (Klik)';
        statusEl.style.color = '#64748b';
        statusEl.style.fontWeight = 'normal';
      }
    }
  });

  // Update 4 Sockets
  const slots = ['cpu', 'ram', 'ssd', 'psu'];
  slots.forEach(slot => {
    const mountedKey = computerGame.m1.mounted[slot];
    const socketEl = document.getElementById(`socket-${slot}`);
    if (!socketEl) return;

    if (mountedKey) {
      countMounted++;
      const item = M1_CATALOG[mountedKey];
      socketEl.className = `mb-socket-slot filled ${item.isGood ? '' : 'bad-comp'}`;
      socketEl.innerHTML = `
        <img src="${item.img}" class="socket-thumb-img" alt="${item.name}">
        <span style="color:#ffffff;font-weight:700;font-size:11.5px;line-height:1.2;">${item.name}</span>
        <span style="color:${item.isGood ? '#38bdf8' : '#f87171'};font-size:10px;margin-top:2px;">${item.isGood ? '✅ Terpasang (Klik lepas)' : '⚠️ Cek Kompatibilitas'}</span>
      `;
    } else {
      socketEl.className = 'mb-socket-slot';
      const defaultLabels = {
        cpu: 'Soket CPU LGA',
        ram: 'Slot RAM DDR4',
        ssd: 'Slot M.2 NVMe SSD',
        psu: 'Konektor Catu Daya ATX'
      };
      socketEl.innerHTML = `
        <span style="font-size:24px;">🔲</span>
        <span style="color:#e2e8f0;font-weight:700;font-size:12px;margin-top:2px;">${defaultLabels[slot]}</span>
        <span style="color:#94a3b8;font-size:10px;">Klik item di rak untuk pasang</span>
      `;
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
      powerBtn.style.boxShadow = '0 0 16px rgba(0, 172, 193, 0.7)';
      powerBtn.textContent = '⚡ TEKAN TOMBOL POWER (UJI NYALA)';
    } else {
      powerBtn.setAttribute('disabled', 'true');
      powerBtn.style.opacity = '0.5';
      powerBtn.style.boxShadow = 'none';
      powerBtn.textContent = `⚡ PASANG 4 KOMPONEN DULU (${countMounted}/4)`;
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

  playSynthSound('transmit');
  postScreen.innerHTML = `
    <div style="color:#38bdf8;">[POWER ON] Menyalakan arus listrik catu daya...</div>
    <div style="color:#f59e0b;">[BIOS POST] Memulai Power-On Self Test...</div>
  `;

  const m = computerGame.m1.mounted;
  const isAllGood = m.cpu === 'cpu_good' && m.ram === 'ram_good' && m.ssd === 'ssd_good' && m.psu === 'psu_good';

  setTimeout(() => {
    if (isAllGood) {
      computerGame.m1.powered = true;
      playSynthSound('success');
      spawnConfetti();

      postScreen.innerHTML += `
        <div style="color:#22c55e;">[CPU] Processor detected: Multi-Core LGA OK</div>
        <div style="color:#22c55e;">[RAM] 16384 MB DDR4 Dual-Channel OK</div>
        <div style="color:#22c55e;">[SSD] NVMe PCIe High-Speed Boot Sector OK</div>
        <div style="color:#22c55e;">[PSU] 550W 80+ Rail 12V Stable OK</div>
        <div style="color:#38bdf8;font-weight:bold;margin-top:4px;">[SUCCESS] POST 100% LULUS! OS LOADED! 🎉</div>
      `;
      postScreen.scrollTop = postScreen.scrollHeight;

      computerGame.stars[1] = 1;
      if (computerGame.unlockedLevel < 2) computerGame.unlockedLevel = 2;
      updateGameHUD();
      updateM1UI();

      showGameModal({
        icon: '🏆',
        title: 'Perakitan Komputer Berhasil!',
        text: 'Hebat sekali! Kamu memilih seluruh 4 komponen yang kompatibel dan berkualitas tinggi. Komputer lolos uji POST BIOS dan siap digunakan siswa lab!',
        stars: '⭐ Misi 1 Selesai!',
        actions: [
          { text: 'Lanjut ke Misi 2 (Sakelar Biner) ▶', primary: true, onClick: () => { closeGameModal(); switchGameLevel(2); } }
        ]
      });
    } else {
      computerGame.m1.powered = false;
      playSynthSound('error');

      // Ambil detail error komponen yang salah
      const errors = [];
      ['cpu', 'ram', 'ssd', 'psu'].forEach(slot => {
        const itemKey = m[slot];
        if (itemKey && !M1_CATALOG[itemKey].isGood) {
          errors.push(M1_CATALOG[itemKey].error);
        }
      });

      errors.forEach(err => {
        postScreen.innerHTML += `<div style="color:#ef4444;margin-top:2px;">[POST ERROR] ${err}</div>`;
      });
      postScreen.innerHTML += `<div style="color:#f59e0b;margin-top:4px;">[HALT] Sistem dihentikan. Ganti komponen yang salah dan uji kembali!</div>`;
      postScreen.scrollTop = postScreen.scrollHeight;

      updateM1UI();

      showGameModal({
        icon: '⚠️',
        title: 'Uji POST BIOS Gagal!',
        titleClass: 'error',
        text: `Ditemukan komponen yang tidak kompatibel atau rusak:<br><ul style="text-align:left;padding-left:20px;color:#b91c1c;margin-top:8px;">${errors.map(e => `<li>${e}</li>`).join('')}</ul><br>Lepas komponen tersebut dan pasang komponen yang sesuai spesifikasi!`,
        actions: [{ text: 'Perbaiki Komponen', primary: true, onClick: closeGameModal }]
      });
    }
  }, 900);
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

function updateBinaryChallengeButtonsUI() {
  const m2 = computerGame.m2;
  if (!m2) return;

  for (let i = 1; i <= 3; i++) {
    const btn = document.getElementById(`btn-bin-ch-${i}`);
    if (!btn) continue;
    const isDone = m2.completed && m2.completed[i];
    const isActive = m2.challengeIdx === i;

    let label = '';
    if (i === 1) label = 'Tantangan 1: 27';
    else if (i === 2) label = "Tantangan 2: 75 ('K')";
    else if (i === 3) label = 'Tantangan 3: 200';

    btn.textContent = isDone ? `${label} ✅` : label;
    if (isActive) {
      btn.classList.add('active');
      btn.style.background = '#00ACC1';
      btn.style.color = '#ffffff';
      btn.style.borderColor = '#00838f';
    } else {
      btn.classList.remove('active');
      btn.style.background = isDone ? '#e0f2fe' : '';
      btn.style.color = isDone ? '#0369a1' : '';
      btn.style.borderColor = isDone ? '#7dd3fc' : '';
    }
  }

  const statusEl = document.getElementById('bin-mission-status');
  if (statusEl) {
    const totalDone = Object.values(m2.completed || {}).filter(Boolean).length;
    if (totalDone > 0) {
      statusEl.innerHTML = `✅ <strong>Status: Misi 2 Tuntas!</strong> (${totalDone} dari 3 tantangan selesai dikerjakan — kamu bebas lanjut ke Misi 3 atau menyelesaikan tantangan lainnya).`;
      statusEl.style.color = '#059669';
    } else {
      statusEl.innerHTML = `💡 <em>Kerjakan 1 tantangan untuk menyelesaikan Misi 2 (Tersedia 3 tantangan).</em>`;
      statusEl.style.color = '#0288d1';
    }
  }
}

function switchBinaryChallenge(num) {
  computerGame.m2.challengeIdx = num;
  const challenge = computerGame.m2.challenges.find(c => c.id === num) || computerGame.m2.challenges[0];
  const titleEl = document.getElementById('bin-target-title');
  if (titleEl) titleEl.textContent = `${challenge.title}`;
  updateBinaryChallengeButtonsUI();
  playSynthSound('click');
}

function verifyBinarySolution() {
  const challenge = computerGame.m2.challenges.find(c => c.id === computerGame.m2.challengeIdx) || computerGame.m2.challenges[0];
  let sum = 0;
  BINARY_WEIGHTS.forEach((w, idx) => {
    if (computerGame.m2.bits[idx] === 1) sum += w;
  });

  if (sum === challenge.targetDec) {
    playSynthSound('success');
    spawnConfetti();

    // Catat tantangan ini selesai
    if (!computerGame.m2.completed) computerGame.m2.completed = {};
    computerGame.m2.completed[challenge.id] = true;

    // KETENTUAN USER: Dikerjakan 1 tantangan juga SUDAH DIANGGAP SELESAI
    computerGame.stars[2] = 1;
    if (computerGame.unlockedLevel < 3) computerGame.unlockedLevel = 3;
    updateGameHUD();
    updateBinaryChallengeButtonsUI();

    const totalDone = Object.values(computerGame.m2.completed).filter(Boolean).length;
    const actions = [];
    const nextUncompleted = [1, 2, 3].find(id => !computerGame.m2.completed[id]);

    if (nextUncompleted) {
      const nextChallenge = computerGame.m2.challenges.find(c => c.id === nextUncompleted);
      actions.push({
        text: `Coba ${nextChallenge.title} 🎯`,
        primary: true,
        onClick: () => {
          closeGameModal();
          switchBinaryChallenge(nextUncompleted);
        }
      });
      actions.push({
        text: 'Lanjut ke Misi 3 (Kasus 1: Layar Gelap) ▶',
        primary: false,
        onClick: () => {
          closeGameModal();
          switchGameLevel(3);
        }
      });

      showGameModal({
        icon: '🎉',
        title: 'Tepat Sekali! Kode Biner Valid!',
        text: `Kombinasi biner yang kamu susun berhasil menghasilkan nilai desimal <strong>${sum}</strong> (${challenge.title})!<br><br>🌟 <strong>Misi 2 sudah dianggap selesai</strong> (karena 1 tantangan berhasil dituntaskan &amp; Misi 3 telah terbuka).<br>Kamu bebas mencoba tantangan berikutnya atau langsung melanjutkan ke Misi 3!`,
        stars: `⭐ Misi 2 Tuntas (${totalDone}/3 Tantangan Diselesaikan)`,
        actions: actions
      });
    } else {
      actions.push({
        text: 'Lanjut ke Misi 3 (Kasus 1: Layar Gelap) ▶',
        primary: true,
        onClick: () => {
          closeGameModal();
          switchGameLevel(3);
        }
      });

      showGameModal({
        icon: '🏆',
        title: 'Luar Biasa! Semua 3 Tantangan Selesai!',
        text: `Kamu berhasil menuntaskan <strong>seluruh 3 tantangan biner</strong> (Desimal 27, Huruf 'K', dan Desimal 200) dengan sempurna! Pemahamanmu mengenai sakelar transistor dan bit digital sangat mengesankan!`,
        stars: '⭐⭐ Misi 2 Tuntas Sempurna (3/3)',
        actions: actions
      });
    }
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

// ==================== MISI 3: KASUS TEKNISI 1 (LAYAR GELAP & BEEP) ====================

let beepAudioInterval = null;

function toggleBeepSound() {
  if (computerGame.m3.isBeeping) {
    stopBeepSound();
  } else {
    startBeepSound();
  }
}

function startBeepSound() {
  computerGame.m3.isBeeping = true;
  const btn = document.getElementById('btn-play-beep');
  if (btn) {
    btn.innerHTML = '⏹️ Hentikan Bunyi Beep';
    btn.style.background = '#fecaca';
  }
  playMotherboardBeepPattern();
  if (beepAudioInterval) clearInterval(beepAudioInterval);
  beepAudioInterval = setInterval(playMotherboardBeepPattern, 1800);
}

function stopBeepSound() {
  computerGame.m3.isBeeping = false;
  if (beepAudioInterval) {
    clearInterval(beepAudioInterval);
    beepAudioInterval = null;
  }
  const btn = document.getElementById('btn-play-beep');
  if (btn) {
    btn.innerHTML = '🔊 Dengarkan Bunyi Beep Motherboard';
    btn.style.background = '#fee2e2';
  }
}

function playMotherboardBeepPattern() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, now + (i * 0.45));
      gain.gain.setValueAtTime(0.18, now + (i * 0.45));
      gain.gain.setValueAtTime(0.01, now + (i * 0.45) + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + (i * 0.45));
      osc.stop(now + (i * 0.45) + 0.34);
    }
  } catch (e) {}
}

function toggleTroubleAction(stage, actIdx) {
  const m = stage === 3 ? computerGame.m3 : computerGame.m4;
  if (!m.selectedActions) m.selectedActions = [];

  const foundIdx = m.selectedActions.indexOf(actIdx);
  if (foundIdx > -1) {
    m.selectedActions.splice(foundIdx, 1);
  } else {
    m.selectedActions.push(actIdx);
  }

  playSynthSound('click');

  if (stage === 3) {
    renderTroubleCase1UI();
  } else {
    renderTroubleCase2UI();
  }
}

function renderTroubleCase1UI() {
  const selected = computerGame.m3.selectedActions || [];
  for (let i = 0; i < 6; i++) {
    const card = document.getElementById(`btn-t3-act-${i}`);
    const chk = document.getElementById(`chk-t3-${i}`);
    const isSel = selected.includes(i);
    if (card) card.classList.toggle('selected', isSel);
    if (chk) chk.textContent = isSel ? '✓' : '';
  }

  const feedback = document.getElementById('t3-feedback-text');
  if (feedback) {
    if (selected.length === 0) {
      feedback.textContent = 'Centang tindakan yang tepat (Pilih beberapa), lalu jalankan SOP.';
      feedback.style.color = '#64748b';
    } else {
      feedback.textContent = `${selected.length} tindakan SOP dipilih. Klik 'Jalankan SOP Perbaikan Hardware'.`;
      feedback.style.color = '#0288d1';
    }
  }
}

function executeTroubleCase1() {
  const selected = computerGame.m3.selectedActions || [];
  if (selected.length === 0) {
    playSynthSound('error');
    showGameModal({
      icon: '💡',
      title: 'Pilih Prosedur SOP',
      text: 'Centang minimal beberapa tindakan SOP perbaikan perangkat keras terlebih dahulu!',
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  // Aksi 4: Heatsink CPU (Berbahaya)
  // Aksi 5: Format SSD (Salah Sasaran)
  const hasDangerCpu = selected.includes(4);
  const hasWrongFormat = selected.includes(5);
  const hasCleanRam = selected.includes(2);
  const hasReseatRam = selected.includes(3);
  const hasSafety = selected.includes(0);

  if (hasDangerCpu) {
    playSynthSound('error');
    showGameModal({
      icon: '⚠️',
      title: 'Tindakan Berbahaya Terdeteksi',
      titleClass: 'error',
      text: '<strong>Jangan mencopot heatsink pendingin CPU!</strong><br><br>Komputer mengalami masalah kegagalan inisialisasi RAM (bunyi Beep POST), bukan kelebihan panas CPU. Melepas pendingin prosesor tanpa alasan berisiko merusak pasta termal dan soket CPU!',
      actions: [{ text: 'Tinjau Ulang Prosedur', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  if (hasWrongFormat) {
    playSynthSound('error');
    showGameModal({
      icon: '❌',
      title: 'Tindakan Salah Sasaran',
      titleClass: 'error',
      text: '<strong>Memformat SSD atau instal ulang OS tidak menyelesaikan masalah!</strong><br><br>Komputer bahkan belum berhasil melewati tahap inisialisasi BIOS (*Power-On Self-Test*). Kerusakan ada pada kontak fisik RAM, bukan pada sistem operasi Windows atau data file!',
      actions: [{ text: 'Tinjau Ulang Prosedur', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  if (!hasCleanRam || !hasReseatRam) {
    playSynthSound('error');
    showGameModal({
      icon: '💡',
      title: 'Langkah Kunci Terlewat',
      text: 'Prosedur kamu belum menyertakan langkah inti penanganan modul RAM!<br><br><em>Petunjuk: Bunyi Beep panjang berulang mengindikasikan konektor pin RAM kotor/teroksidasi. Pastikan kamu memilih tindakan membersihkan pin emas RAM dan memasangnya kembali hingga terkunci rapat.</em>',
      actions: [{ text: 'Lengkapi Prosedur', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  // Sukses! Prosedur SOP tepat dan aman
  stopBeepSound();
  playSynthSound('success');
  spawnConfetti();
  computerGame.stars[3] = 1;
  if (computerGame.unlockedLevel < 4) computerGame.unlockedLevel = 4;
  updateGameHUD();

  const safetyNote = hasSafety ? 'Langkah keselamatan K3 mematikan arus listrik juga kamu jalankan dengan sangat disiplin!' : '';

  showGameModal({
    icon: '🎉',
    title: 'SOP Teknisi Berhasil Dijalankan!',
    text: `Luar biasa! Prosedur yang kamu susun 100% tepat dan profesional! ${safetyNote}<br><br>Setelah kotoran dan oksidasi pada pin emas RAM dibersihkan, modul terpasang kencang di slot DDR4. Saat tombol daya dinyalakan kembali, <strong>bunyi Beep motherboard langsung hilang dan layar monitor menampilkan BIOS secara normal</strong>!`,
    stars: '⭐ Misi 3 Selesai!',
    actions: [
      { text: 'Lanjut ke Misi 4 (Kasus 2: Optimasi Multitasking) ▶', primary: true, onClick: () => { closeGameModal(); switchGameLevel(4); } }
    ]
  });
}

// ==================== MISI 4: KASUS TEKNISI 2 (MEMORI PENUH & KINERJA) ====================

function renderTroubleCase2UI() {
  const selected = computerGame.m4.selectedActions || [];
  for (let i = 0; i < 6; i++) {
    const card = document.getElementById(`btn-t4-act-${i}`);
    const chk = document.getElementById(`chk-t4-${i}`);
    const isSel = selected.includes(i);
    if (card) card.classList.toggle('selected', isSel);
    if (chk) chk.textContent = isSel ? '✓' : '';
  }

  const feedback = document.getElementById('t4-feedback-text');
  if (feedback) {
    if (selected.length === 0) {
      feedback.textContent = 'Centang paket solusi yang tepat (Pilih beberapa), lalu terapkan.';
      feedback.style.color = '#64748b';
    } else {
      feedback.textContent = `${selected.length} langkah solusi dipilih. Klik 'Terapkan Paket Optimasi Kinerja'.`;
      feedback.style.color = '#0288d1';
    }
  }
}

function executeTroubleCase2() {
  const selected = computerGame.m4.selectedActions || [];
  if (selected.length === 0) {
    playSynthSound('error');
    showGameModal({
      icon: '💡',
      title: 'Pilih Paket Solusi',
      text: 'Centang minimal beberapa tindakan optimasi kinerja multitasking terlebih dahulu!',
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  const hasDeleteSsd = selected.includes(3);
  const hasBuyCpu = selected.includes(4);
  const hasBuyMonitor = selected.includes(5);
  const hasEndTask = selected.includes(0);
  const hasStartup = selected.includes(1);
  const hasUpgradeRam = selected.includes(2);

  if (hasDeleteSsd) {
    playSynthSound('error');
    showGameModal({
      icon: '❌',
      title: 'Tindakan Keliru & Berisiko',
      titleClass: 'error',
      text: '<strong>Menghapus dokumen di SSD adalah tindakan salah sasaran!</strong><br><br>Perhatikan data Task Manager: ruang kosong SSD (C:) masih <strong>320 GB Bebas</strong>. Yang kehabisan ruang adalah <strong>Memori Kerja RAM (98%)</strong>, bukan media penyimpanan data!',
      actions: [{ text: 'Tinjau Ulang Solusi', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  if (hasBuyCpu) {
    playSynthSound('error');
    showGameModal({
      icon: '💸',
      title: 'Pemborosan / Salah Sasaran',
      titleClass: 'error',
      text: '<strong>Mengganti CPU tidak akan mengatasi masalah ini!</strong><br><br>Penggunaan CPU saat ini hanya <strong>24% (sangat santai)</strong>. Prosesor tidak mengalami kelebihan beban (*bottleneck*). Yang macet adalah antrean memori kerja RAM!',
      actions: [{ text: 'Tinjau Ulang Solusi', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  if (hasBuyMonitor) {
    playSynthSound('error');
    showGameModal({
      icon: '📺',
      title: 'Solusi Tidak Berhubungan',
      titleClass: 'error',
      text: 'Monitor adalah peranti keluaran (*output visual*), bukan memori kerja komputer. Mengganti monitor tidak menambah kapasitas RAM.',
      actions: [{ text: 'Tinjau Ulang Solusi', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  // Harus memilih minimal 2 dari 3 solusi yang benar (End Task, Startup, Upgrade RAM)
  const correctCount = (hasEndTask ? 1 : 0) + (hasStartup ? 1 : 0) + (hasUpgradeRam ? 1 : 0);
  if (correctCount < 2) {
    playSynthSound('error');
    showGameModal({
      icon: '💡',
      title: 'Solusi Belum Lengkap',
      text: 'Pilihlah kombinasi solusi yang komprehensif! Setidaknya gabungkan solusi instan (*End Task*) dengan solusi jangka panjang (*Kelola Startup Apps* atau *Upgrade RAM Fisik*).',
      actions: [{ text: 'Lengkapi Pilihan', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  // Sukses! Animasi Task Manager pulih
  playSynthSound('victory');
  spawnConfetti();

  const ramBar = document.getElementById('t4-ram-bar');
  const ramVal = document.getElementById('t4-ram-val');
  const warnBanner = document.getElementById('t4-warning-banner');

  if (ramBar) {
    ramBar.style.width = '32%';
    ramBar.className = 'taskmgr-bar-fill safe';
  }
  if (ramVal) {
    ramVal.textContent = '32% (5.1 GB / 16 GB - Lancar Mulus)';
    ramVal.style.color = '#10b981';
  }
  if (warnBanner) {
    warnBanner.style.background = 'rgba(16, 185, 129, 0.18)';
    warnBanner.style.borderColor = '#10b981';
    warnBanner.style.color = '#6ee7b7';
    warnBanner.innerHTML = '<span>✅</span><span>Sistem Optimal: Ruang RAM Sangat Lega, Bebas Hambatan (No Lag)</span>';
  }

  computerGame.stars[4] = 1;
  updateGameHUD();

  showGameModal({
    icon: '🏆',
    title: 'Sempurna! Kamu Master Sistem Komputer!',
    titleClass: 'victory',
    stars: '⭐⭐⭐⭐ 4/4 BINTANG SEMPURNA!',
    text: 'Analisis kamu 100% tepat! Kombinasi menutup proses rakus memori di Task Manager dan merencanakan upgrade RAM melipatgandakan performa kerja komputer!<br><br>Beban RAM langsung turun drastis ke <strong>32% (Aman)</strong> dan komputer kembali berjalan sangat mulus!<br><br>Selamat! Kamu telah menuntaskan seluruh 4 tantangan sistem komputer dengan predikat Ahli Perangkat Keras!',
    actions: [
      { text: 'Lanjut ke Latihan Evaluasi 📝', primary: true, onClick: () => { closeGameModal(); goToPage('latihan-intro'); } }
    ]
  });
}

function resetCurrentGameLevel() {
  if (computerGame.currentLevel === 1) {
    computerGame.m1.mounted = { cpu: null, ram: null, ssd: null, psu: null };
    computerGame.m1.powered = false;
    const postScreen = document.getElementById('post-screen');
    if (postScreen) {
      postScreen.innerHTML = `<div>[BIOS v2.4] Standby...</div><div style="color:#64748b;">Pesanan Spek: PC Lab Sekolah Modern (LGA, DDR4, NVMe, PSU 500W+).</div><div style="color:#64748b;margin-top:4px;">Pasang 4 komponen di motherboard, lalu uji tombol power.</div>`;
    }
    updateM1UI();
  } else if (computerGame.currentLevel === 2) {
    computerGame.m2.bits = [0, 0, 0, 0, 0, 0, 0, 0];
    renderBinarySwitches();
    updateBinaryDisplay();
  } else if (computerGame.currentLevel === 3) {
    stopBeepSound();
    computerGame.m3.selectedActions = [];
    renderTroubleCase1UI();
  } else if (computerGame.currentLevel === 4) {
    computerGame.m4.selectedActions = [];
    renderTroubleCase2UI();
    const ramBar = document.getElementById('t4-ram-bar');
    const ramVal = document.getElementById('t4-ram-val');
    const warnBanner = document.getElementById('t4-warning-banner');
    if (ramBar) {
      ramBar.style.width = '98%';
      ramBar.className = 'taskmgr-bar-fill danger';
    }
    if (ramVal) {
      ramVal.textContent = '98% (15.7 GB / 16 GB Terpakai) ⚠️';
      ramVal.style.color = '#ef4444';
    }
    if (warnBanner) {
      warnBanner.style.background = 'rgba(239, 68, 68, 0.18)';
      warnBanner.style.borderColor = '#ef4444';
      warnBanner.style.color = '#fca5a5';
      warnBanner.innerHTML = '<span>⚠️</span><span>Notifikasi OS: "Out of Virtual Memory - Kinerja Sistem Terhenti (Freeze)"</span>';
    }
  }
  playSynthSound('click');
}

function showGameHint() {
  if (computerGame.currentLevel === 1) {
    showGameModal({
      icon: '💡',
      title: 'Bantuan Misi 1',
      text: 'Pilihlah 4 komponen yang modern dan sesuai spesifikasi motherboard: CPU Multi-Core Socket LGA, RAM DDR4, SSD M.2 NVMe, dan PSU 550W. Hati-hati dengan komponen jadul atau rusak seperti CPU pin bengkok, RAM DDR1, floppy disk, dan charger HP!',
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
  } else if (computerGame.currentLevel === 2) {
    const challenge = computerGame.m2.challenges.find(c => c.id === computerGame.m2.challengeIdx) || computerGame.m2.challenges[0];
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
      text: 'Ketika kipas PC menyala normal tetapi monitor gelap dan motherboard membunyikan Beep panjang berulang, penyebab utamanya hampir selalu adalah masalah kontak pada modul RAM yang kotor atau kurang kencang terpasang!',
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
  } else if (computerGame.currentLevel === 4) {
    showGameModal({
      icon: '💡',
      title: 'Bantuan Misi 4',
      text: 'Perhatikan Task Manager: CPU 24% dan SSD masih 320 GB bebas. Masalah utama (bottleneck) adalah RAM yang menyentuh 98% akibat terlalu banyak tab dan aplikasi terbuka bersamaan. Solusinya adalah membebaskan RAM atau menambah keping RAM!',
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
