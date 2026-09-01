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
  'video': 7,
  'tarik-jawaban': 8,
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
  'cover', 'menu', 'petunjuk', 'tujuan', 'materi-list',
  'materi-1', 'video', 'tarik-jawaban', 'materi-3',
  'permainan-intro', 'permainan', 'latihan-intro', 'latihan',
  'rangkuman', 'referensi', 'pengembang', 'pj-penyunting',
  'kutipan', 'kredit'
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
  if (pageId === 'materi-1') switchMateri1Tab(1);
  if (pageId === 'tarik-jawaban') initDragDrop();
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
    nextText: 'Materi 1: Konsep Jaringan & Router',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'video': {
    prevText: 'Materi 1: Konsep Jaringan & Router',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Aktivitas: Menjodohkan Istilah',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'tarik-jawaban': {
    prevText: 'Video Pembelajaran',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Materi 2: Keunggulan Packet Switching',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'materi-3': {
    prevText: 'Aktivitas Menjodohkan Istilah',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Pengantar Packet Commander Game',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'permainan-intro': {
    prevText: 'Materi 2: Packet Switching',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Mulai Packet Commander Game',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'permainan': {
    prevText: 'Pengantar Game',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Pengantar Latihan Evaluasi',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'latihan-intro': {
    prevText: 'Packet Commander Game',
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
    nextText: 'Penanggung Jawab & Tim',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'pj-penyunting': {
    prevText: 'Profil Pengembang',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Motto',
    nextSub: 'HALAMAN BERIKUTNYA'
  },
  'kutipan': {
    prevText: 'Penanggung Jawab & Tim',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: 'Kredit Media & Hak Cipta',
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
  if (pageId === 'materi-1') {
    updateMateri1Nav();
    return;
  }

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

// ==================== MATERI 1 TABBED NAVIGATION ====================
let currentMateri1Tab = 1;

const MATERI1_TABS = [
  {
    tab: 1,
    prevText: 'Daftar Materi',
    prevSub: 'HALAMAN SEBELUMNYA',
    nextText: '2. Router & Cara Kerja',
    nextSub: 'TAB BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 2,
    prevText: '1. Paket Data & Anatomi',
    prevSub: 'TAB SEBELUMNYA',
    nextText: '3. Rute Dinamis & Reassembly',
    nextSub: 'TAB BERIKUTNYA',
    isFinish: false
  },
  {
    tab: 3,
    prevText: '2. Router & Cara Kerja',
    prevSub: 'TAB SEBELUMNYA',
    nextText: 'Video: Perjalanan Paket Data 🎬',
    nextSub: 'SELESAI MATERI',
    isFinish: true
  }
];

function updateMateri1Nav() {
  const info = MATERI1_TABS.find(t => t.tab === currentMateri1Tab);
  if (!info) return;

  const prevTextEl = document.getElementById('materi1-prev-text');
  const prevLabelEl = document.getElementById('materi1-prev-label');
  const nextTextEl = document.getElementById('materi1-next-text');
  const nextLabelEl = document.getElementById('materi1-next-label');

  if (prevTextEl) prevTextEl.textContent = info.prevText;
  if (prevLabelEl) {
    const sub = prevLabelEl.querySelector('.nml-sub');
    if (sub) sub.textContent = info.prevSub;
  }

  if (nextTextEl) nextTextEl.textContent = info.nextText;
  if (nextLabelEl) {
    const sub = nextLabelEl.querySelector('.nml-sub');
    if (sub) sub.textContent = info.nextSub;
    if (info.isFinish) {
      nextLabelEl.classList.add('finish');
    } else {
      nextLabelEl.classList.remove('finish');
    }
  }
}

function switchMateri1Tab(tabNum) {
  currentMateri1Tab = tabNum;
  for (let i = 1; i <= 3; i++) {
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

  // Reset scroll to top
  const box = document.querySelector('#page-materi-1 .content-box');
  if (box) box.scrollTop = 0;

  updateMateri1Nav();
}

function navNext() {
  if (currentPage === 'materi-1') {
    if (currentMateri1Tab < 3) {
      switchMateri1Tab(currentMateri1Tab + 1);
    } else {
      goToPage('video');
    }
    return;
  }
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx === -1) return;
  if (idx < LINEAR_PAGES.length - 1) {
    goToPage(LINEAR_PAGES[idx + 1]);
  }
}

function navPrev() {
  if (currentPage === 'materi-1') {
    if (currentMateri1Tab > 1) {
      switchMateri1Tab(currentMateri1Tab - 1);
    } else {
      goToPage('materi-list');
    }
    return;
  }
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
  { id: '1', term: 'Paket Data', def: 'Bagian kecil hasil pemecahan data asli yang dikirim melalui jaringan' },
  { id: '2', term: 'Payload', def: 'Bagian paket berisi potongan data/isi asli yang dikirim' },
  { id: '3', term: 'Router', def: 'Perangkat yang mengarahkan paket data ke rute tercepat/tersedia' },
  { id: '4', term: 'Rute Dinamis', def: 'Kemampuan jaringan mencari jalur baru saat jalur utama terganggu' },
  { id: '5', term: 'Packet Switching', def: 'Metode pengiriman data dengan memecahnya menjadi paket-paket kecil' },
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


// ==================== PACKET COMMANDER GAME (PAGE 11) ====================

// ==================== PACKET COMMANDER GAME (PAGE 11) ====================

let gameEngine = {
  currentLevel: 1,
  unlockedLevel: 1,
  stars: { 1: 0, 2: 0, 3: 0 },
  isTransmitting: false,
  activeTimeouts: [],

  // Level 1 data
  lvl1: {
    selectedPath: null, // 'a' | 'b' | 'c'
    attempts: 0
  },

  // Level 2 data: packet route mapping (Default: All on Jalur A)
  lvl2: {
    p1: 'A',
    p2: 'A',
    p3: 'A',
    p4: 'A',
    attempts: 0
  },

  // Level 3 data: interactive mesh & per-packet routing (Default: All on Express -> Causes Overflow unless adjusted)
  lvl3: {
    p1: 1, // Express (35ms | Max 1)
    p2: 1, // Express (35ms | Max 1)
    p3: 1, // Express (35ms | Max 1)
    p4: 1, // Express (35ms | Max 1)
    arrivedPackets: [],
    selectedBufferPkt: null,
    assembledSlots: {},
    attempts: 0
  }
};

function clearGameTimers() {
  gameEngine.activeTimeouts.forEach(t => clearTimeout(t));
  gameEngine.activeTimeouts = [];
}

function initPacketCommanderGame() {
  clearGameTimers();
  updateHUD();
  renderGameLevel(gameEngine.currentLevel);
}

function updateHUD() {
  const totalStars = (gameEngine.stars[1] ? 1 : 0) + (gameEngine.stars[2] ? 1 : 0) + (gameEngine.stars[3] ? 1 : 0);
  const totalStarsEl = document.getElementById('game-total-stars');
  if (totalStarsEl) {
    totalStarsEl.textContent = `⭐ ${totalStars}/3`;
  }

  // Update tabs
  for (let lvl = 1; lvl <= 3; lvl++) {
    const tab = document.getElementById(`game-tab-${lvl}`);
    const starsEl = document.getElementById(`stars-lvl-${lvl}`);
    if (!tab || !starsEl) continue;

    tab.classList.remove('active', 'locked');
    if (lvl === gameEngine.currentLevel) {
      tab.classList.add('active');
    }

    if (lvl > gameEngine.unlockedLevel) {
      tab.classList.add('locked');
      starsEl.textContent = '🔒';
    } else {
      starsEl.textContent = gameEngine.stars[lvl] ? '⭐ 1/1' : '⭐ 0/1';
    }
  }
}

function switchGameLevel(lvl) {
  if (gameEngine.isTransmitting) return;
  if (lvl > gameEngine.unlockedLevel) {
    showGameModal({
      icon: '🔒',
      title: 'Misi Masih Terkunci',
      text: `Selesaikan Misi ${lvl - 1} terlebih dahulu untuk membuka tantangan ini!`,
      type: 'error',
      actions: [{ label: 'Mengerti', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
    return;
  }

  clearGameTimers();
  gameEngine.currentLevel = lvl;
  updateHUD();
  renderGameLevel(lvl);
}

function renderGameLevel(lvl) {
  const missionIcon = document.getElementById('game-mission-icon');
  const missionDesc = document.getElementById('game-mission-desc');
  const deckL2 = document.getElementById('game-deck-loadbalance');
  const deckL3 = document.getElementById('game-deck-mesh');
  const netStatus = document.getElementById('game-net-status');
  const latency = document.getElementById('game-latency');
  const transmitBtn = document.getElementById('btn-game-transmit');

  resetReassemblyScreen();
  clearGamePackets();

  if (transmitBtn) transmitBtn.disabled = false;

  if (lvl === 1) {
    if (missionIcon) missionIcon.textContent = '🚦';
    if (missionDesc) missionDesc.innerHTML = '<strong>Misi 1: Rute Alternatif</strong> — Jalur B mengalami <strong>Server Down ⚠️</strong>. Klik router pada <strong>Jalur A</strong> atau <strong>Jalur C</strong> yang aman, lalu kirim paket foto kucing!';
    if (deckL2) deckL2.style.display = 'none';
    if (deckL3) deckL3.style.display = 'none';
    if (netStatus) {
      netStatus.className = 'hud-val status-badge ready';
      netStatus.textContent = '🟢 Siap';
    }
    if (latency) latency.textContent = '⏱️ -- ms';

    renderLevel1Topology();

  } else if (lvl === 2) {
    if (missionIcon) missionIcon.textContent = '⚖️';
    if (missionDesc) missionDesc.innerHTML = '<strong>Misi 2: Bagi Beban (Load Balancing)</strong> — Jalur A &amp; B masing-masing hanya muat <strong>maksimal 2 paket</strong>. Bagi 4 paket foto secara seimbang agar jalur tidak macet (Buffer Overflow)!';
    if (deckL2) deckL2.style.display = 'block';
    if (deckL3) deckL3.style.display = 'none';
    if (latency) latency.textContent = '⏱️ -- ms';

    renderLevel2Topology();
    updateLoadBalancerDeckUI();

  } else if (lvl === 3) {
    if (missionIcon) missionIcon.textContent = '🌐';
    if (missionDesc) missionDesc.innerHTML = '<strong>Misi 3: Mesh Dinamis &amp; Reassembly</strong> — Atur rute tiap paket data foto, lalu <strong>rakit kembali foto kucing</strong> di Monitor Penerima sesuai nomor Header!';
    if (deckL2) deckL2.style.display = 'none';
    if (deckL3) deckL3.style.display = 'block';

    const configDeck = document.getElementById('mesh-config-deck');
    const inboxDeck = document.getElementById('mesh-inbox-deck');
    if (configDeck) configDeck.style.display = 'block';
    if (inboxDeck) inboxDeck.style.display = 'none';

    // Sync select elements in UI
    const s1 = document.getElementById('select-m-p1');
    const s2 = document.getElementById('select-m-p2');
    const s3 = document.getElementById('select-m-p3');
    const s4 = document.getElementById('select-m-p4');
    if (s1) s1.value = String(gameEngine.lvl3.p1 || 1);
    if (s2) s2.value = String(gameEngine.lvl3.p2 || 1);
    if (s3) s3.value = String(gameEngine.lvl3.p3 || 1);
    if (s4) s4.value = String(gameEngine.lvl3.p4 || 1);

    gameEngine.lvl3.arrivedPackets = [];
    gameEngine.lvl3.selectedBufferPkt = null;
    gameEngine.lvl3.assembledSlots = {};

    if (latency) latency.textContent = '⏱️ Dynamic ms';

    renderLevel3Topology();
  }
}

// -------------------- LEVEL 1: TOPOLOGY (SVG VECTOR) --------------------
function renderLevel1Topology() {
  const svg = document.getElementById('game-svg-layer');
  if (!svg) return;

  const sel = gameEngine.lvl1.selectedPath;

  svg.innerHTML = `
    <!-- Paths -->
    <path d="M 12,170 C 160,170 200,50 360,50 C 520,50 560,170 660,170 L 868,170" class="g-path ${sel === 'a' ? 'active' : ''}" id="g-path-a"/>
    <path d="M 12,170 L 360,170 L 660,170 L 868,170" class="g-path down ${sel === 'b' ? 'active' : ''}" id="g-path-b"/>
    <path d="M 12,170 C 160,170 200,290 360,290 C 520,290 560,170 660,170 L 868,170" class="g-path ${sel === 'c' ? 'active' : ''}" id="g-path-c"/>

    <!-- Left Connection Port -->
    <circle cx="12" cy="170" r="9" fill="#0288D1"/>

    <!-- Router A (Safe - Top) -->
    <g class="svg-node ${sel === 'a' ? 'selected' : ''}" onclick="selectGameRouter('a')" id="g-node-a">
      <rect x="321" y="16" width="78" height="68" rx="16" fill="#ffffff" stroke="#0288D1" stroke-width="2.5" class="svg-node-box"/>
      <text x="360" y="42" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="360" y="66" class="svg-node-text">Router A</text>
    </g>

    <!-- Router B (Down - Middle) -->
    <g class="svg-node down ${sel === 'b' ? 'selected' : ''}" onclick="selectGameRouter('b')" id="g-node-b">
      <rect x="321" y="136" width="78" height="68" rx="16" fill="#ffebee" stroke="#f44336" stroke-width="2.5" class="svg-node-box"/>
      <text x="360" y="162" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="384" y="146" font-size="20" text-anchor="middle" dominant-baseline="middle">⚠️</text>
      <text x="360" y="186" class="svg-node-text" fill="#c62828">Down</text>
    </g>

    <!-- Router C (Safe - Bottom) -->
    <g class="svg-node ${sel === 'c' ? 'selected' : ''}" onclick="selectGameRouter('c')" id="g-node-c">
      <rect x="321" y="256" width="78" height="68" rx="16" fill="#ffffff" stroke="#4caf50" stroke-width="2.5" class="svg-node-box"/>
      <text x="360" y="282" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="360" y="306" class="svg-node-text">Router C</text>
    </g>

    <!-- Gateway Router -->
    <g class="svg-node">
      <rect x="621" y="136" width="78" height="68" rx="16" fill="#ede7f6" stroke="#7e57c2" stroke-width="2.5" class="svg-node-box"/>
      <text x="660" y="162" font-size="28" text-anchor="middle" dominant-baseline="middle">🌐</text>
      <text x="660" y="186" class="svg-node-text">Gateway</text>
    </g>

    <!-- Right Connection Port -->
    <circle cx="868" cy="170" r="9" fill="#4caf50"/>
  `;
}

function selectGameRouter(path) {
  if (gameEngine.isTransmitting) return;

  gameEngine.lvl1.selectedPath = path;
  playSynthSound('hop');
  renderLevel1Topology();

  const netStatus = document.getElementById('game-net-status');
  if (netStatus) {
    if (path === 'b') {
      netStatus.className = 'hud-val status-badge error';
      netStatus.textContent = '⚠️ Jalur Rusak';
    } else {
      netStatus.className = 'hud-val status-badge ready';
      netStatus.textContent = `🟢 Rute ${path.toUpperCase()} Dipilih`;
    }
  }
}

// -------------------- LEVEL 2: TOPOLOGY (SVG VECTOR) --------------------
function renderLevel2Topology() {
  const svg = document.getElementById('game-svg-layer');
  if (!svg) return;

  svg.innerHTML = `
    <!-- Path A: Fiber (Top) -->
    <path d="M 12,170 C 180,170 240,60 440,60 C 640,60 700,170 868,170" class="g-path fast active" id="g-path-lvl2-a"/>
    <!-- Path B: Satelit (Bottom) -->
    <path d="M 12,170 C 180,170 240,280 440,280 C 640,280 700,170 868,170" class="g-path active" id="g-path-lvl2-b"/>

    <!-- Left Connection Port -->
    <circle cx="12" cy="170" r="9" fill="#0288D1"/>

    <!-- Router Alpha (Path A) -->
    <g class="svg-node selected" id="g-node-l2-a">
      <rect x="395" y="26" width="90" height="68" rx="16" fill="#ffffff" stroke="#00ACC1" stroke-width="2.5" class="svg-node-box" id="svg-box-l2-a"/>
      <text x="440" y="52" font-size="28" text-anchor="middle" dominant-baseline="middle">⚡</text>
      <text x="440" y="76" class="svg-node-text">Fiber (Maks 2)</text>
    </g>

    <!-- Router Beta (Path B) -->
    <g class="svg-node selected" id="g-node-l2-b">
      <rect x="395" y="246" width="90" height="68" rx="16" fill="#ffffff" stroke="#0288D1" stroke-width="2.5" class="svg-node-box" id="svg-box-l2-b"/>
      <text x="440" y="272" font-size="28" text-anchor="middle" dominant-baseline="middle">📡</text>
      <text x="440" y="296" class="svg-node-text">Satelit (Maks 2)</text>
    </g>

    <!-- Right Connection Port -->
    <circle cx="868" cy="170" r="9" fill="#4caf50"/>
  `;
}

function setPacketPath(pktNum, path) {
  if (gameEngine.isTransmitting) return;

  gameEngine.lvl2[`p${pktNum}`] = path;
  playSynthSound('hop');
  updateLoadBalancerDeckUI();
}

function updateLoadBalancerDeckUI() {
  for (let i = 1; i <= 4; i++) {
    const curPath = gameEngine.lvl2[`p${i}`];
    const btnA = document.getElementById(`btn-p${i}-a`);
    const btnB = document.getElementById(`btn-p${i}-b`);
    if (btnA && btnB) {
      if (curPath === 'A') {
        btnA.classList.add('active');
        btnB.classList.remove('active');
      } else {
        btnA.classList.remove('active');
        btnB.classList.add('active');
      }
    }
  }

  // Count load
  let countA = 0;
  let countB = 0;
  for (let i = 1; i <= 4; i++) {
    if (gameEngine.lvl2[`p${i}`] === 'A') countA++;
    else countB++;
  }

  const netStatus = document.getElementById('game-net-status');
  const boxA = document.getElementById('svg-box-l2-a');
  const boxB = document.getElementById('svg-box-l2-b');
  const pathA = document.getElementById('g-path-lvl2-a');
  const pathB = document.getElementById('g-path-lvl2-b');

  if (boxA) { boxA.setAttribute('fill', '#ffffff'); boxA.setAttribute('stroke', '#00ACC1'); }
  if (boxB) { boxB.setAttribute('fill', '#ffffff'); boxB.setAttribute('stroke', '#0288D1'); }
  if (pathA) pathA.classList.remove('congested');
  if (pathB) pathB.classList.remove('congested');

  if (countA > 2) {
    if (boxA) { boxA.setAttribute('fill', '#fff3e0'); boxA.setAttribute('stroke', '#ff9800'); }
    if (pathA) pathA.classList.add('congested');
    if (netStatus) {
      netStatus.className = 'hud-val status-badge warning';
      netStatus.textContent = `⚠️ Jalur A Overload (${countA}/2)`;
    }
  } else if (countB > 2) {
    if (boxB) { boxB.setAttribute('fill', '#fff3e0'); boxB.setAttribute('stroke', '#ff9800'); }
    if (pathB) pathB.classList.add('congested');
    if (netStatus) {
      netStatus.className = 'hud-val status-badge warning';
      netStatus.textContent = `⚠️ Jalur B Overload (${countB}/2)`;
    }
  } else {
    if (netStatus) {
      netStatus.className = 'hud-val status-badge ready';
      netStatus.textContent = `🟢 Beban Seimbang (2:2)`;
    }
  }
}

// -------------------- LEVEL 3: TOPOLOGY (SVG MESH & DYNAMIC ROUTES) --------------------
function renderLevel3Topology() {
  const svg = document.getElementById('game-svg-layer');
  if (!svg) return;

  const p1 = parseInt(gameEngine.lvl3.p1) || 2;
  const p2 = parseInt(gameEngine.lvl3.p2) || 3;
  const p3 = parseInt(gameEngine.lvl3.p3) || 1;
  const p4 = parseInt(gameEngine.lvl3.p4) || 4;

  const usedRoutes = new Set([p1, p2, p3, p4]);

  // Count how many use Path 1 (Express)
  let countPath1 = 0;
  [p1, p2, p3, p4].forEach(r => { if (r === 1) countPath1++; });
  const isExpressCongested = countPath1 > 1;

  svg.innerHTML = `
    <!-- Mesh Lines -->
    <!-- Path 1 (R1 -> R3): Express 35ms -->
    <path d="M 12,170 C 100,170 140,65 240,65 L 480,50 L 670,170 L 868,170" class="g-path ${isExpressCongested ? 'congested' : 'fast'} ${usedRoutes.has(1) ? 'active' : ''}" id="g-mesh-p1"/>
    <!-- Path 2 (R1 -> R4): Transit 75ms -->
    <path d="M 12,170 C 100,170 140,65 240,65 L 480,170 L 670,170 L 868,170" class="g-path ${usedRoutes.has(2) ? 'active' : ''}" id="g-mesh-p2"/>
    <!-- Path 3 (R2 -> R4): Cross Link 90ms -->
    <path d="M 12,170 C 100,170 140,275 240,275 L 480,170 L 670,170 L 868,170" class="g-path ${usedRoutes.has(3) ? 'active' : ''}" id="g-mesh-p3"/>
    <!-- Path 4 (R2 -> R5): Satelit 160ms -->
    <path d="M 12,170 C 100,170 140,275 240,275 L 480,290 L 670,170 L 868,170" class="g-path ${usedRoutes.has(4) ? 'active' : ''}" id="g-mesh-p4"/>

    <!-- Left Connection Port -->
    <circle cx="12" cy="170" r="9" fill="#0288D1"/>

    <!-- Layer 1 Routers -->
    <g class="svg-node selected" id="g-mesh-r1">
      <rect x="201" y="31" width="78" height="68" rx="16" fill="#ffffff" stroke="#00ACC1" stroke-width="2.5" class="svg-node-box"/>
      <text x="240" y="57" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="240" y="81" class="svg-node-text">Router 1</text>
    </g>

    <g class="svg-node selected" id="g-mesh-r2">
      <rect x="201" y="241" width="78" height="68" rx="16" fill="#ffffff" stroke="#0288D1" stroke-width="2.5" class="svg-node-box"/>
      <text x="240" y="267" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="240" y="291" class="svg-node-text">Router 2</text>
    </g>

    <!-- Layer 2 Routers -->
    <g class="svg-node ${isExpressCongested ? 'down' : (usedRoutes.has(1) ? 'selected' : '')}" id="g-mesh-r3">
      <rect x="441" y="16" width="78" height="68" rx="16" fill="${isExpressCongested ? '#fff3e0' : '#e8f5e9'}" stroke="${isExpressCongested ? '#ff9800' : '#4caf50'}" stroke-width="2.5" class="svg-node-box"/>
      <text x="480" y="42" font-size="28" text-anchor="middle" dominant-baseline="middle">⚡</text>
      <text x="480" y="66" class="svg-node-text">${isExpressCongested ? 'R3 (Padat!)' : 'R3 (Express)'}</text>
    </g>

    <g class="svg-node ${(usedRoutes.has(2) || usedRoutes.has(3)) ? 'selected' : ''}" id="g-mesh-r4">
      <rect x="441" y="136" width="78" height="68" rx="16" fill="#ffffff" stroke="#00ACC1" stroke-width="2.5" class="svg-node-box"/>
      <text x="480" y="162" font-size="28" text-anchor="middle" dominant-baseline="middle">🚦</text>
      <text x="480" y="186" class="svg-node-text">R4 (Transit)</text>
    </g>

    <g class="svg-node ${usedRoutes.has(4) ? 'selected' : ''}" id="g-mesh-r5">
      <rect x="441" y="256" width="78" height="68" rx="16" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2.5" class="svg-node-box"/>
      <text x="480" y="282" font-size="28" text-anchor="middle" dominant-baseline="middle">📡</text>
      <text x="480" y="306" class="svg-node-text">R5 (Satelit)</text>
    </g>

    <!-- Gateway Router Layer 3 -->
    <g class="svg-node selected">
      <rect x="631" y="136" width="78" height="68" rx="16" fill="#ede7f6" stroke="#7e57c2" stroke-width="2.5" class="svg-node-box"/>
      <text x="670" y="162" font-size="28" text-anchor="middle" dominant-baseline="middle">🌐</text>
      <text x="670" y="186" class="svg-node-text">Gateway</text>
    </g>

    <!-- Right Connection Port -->
    <circle cx="868" cy="170" r="9" fill="#4caf50"/>
  `;

  // Update Net Status
  const netStatus = document.getElementById('game-net-status');
  if (netStatus) {
    if (isExpressCongested) {
      netStatus.className = 'hud-val status-badge warning';
      netStatus.textContent = `⚠️ Jalur Express Padat (${countPath1}/1)`;
    } else {
      netStatus.className = 'hud-val status-badge ready';
      netStatus.textContent = `🟢 Topologi Mesh Terhubung`;
    }
  }
}

function updateMeshPacketRoute(pktNum, routeValue) {
  if (gameEngine.isTransmitting) return;

  gameEngine.lvl3[`p${pktNum}`] = parseInt(routeValue) || 1;
  playSynthSound('hop');
  renderLevel3Topology();
}

// -------------------- TRANSMISSION ENGINE --------------------

function resetReassemblyScreen() {
  const grid = document.getElementById('rx-puzzle-grid');
  if (grid) grid.classList.remove('complete');

  for (let s = 1; s <= 4; s++) {
    const slot = document.getElementById(`rx-slot-${s}`);
    if (slot) {
      slot.classList.remove('filled', 'target-highlight', 'shake-error');
      slot.innerHTML = `<span class="slot-badge">#${s}</span>`;
    }
  }

  const statusLabel = document.getElementById('rx-status-label');
  if (statusLabel) {
    statusLabel.className = 'rx-status';
    statusLabel.textContent = 'Menunggu 4 paket...';
  }
}

function handlePacketArrival(packetNum, slotNum) {
  playSynthSound('packet_arrive');
  const slot = document.getElementById(`rx-slot-${slotNum}`);
  if (slot) {
    slot.classList.add('filled');
    slot.innerHTML = '';
  }
  const statusLabel = document.getElementById('rx-status-label');
  if (statusLabel) {
    statusLabel.textContent = `📦 Paket #${packetNum} tiba di Kuadran #${slotNum}`;
  }
}

function launchGameTransmission() {
  if (gameEngine.isTransmitting) return;

  const lvl = gameEngine.currentLevel;
  const transmitBtn = document.getElementById('btn-game-transmit');
  if (transmitBtn) transmitBtn.disabled = true;

  gameEngine.isTransmitting = true;
  resetReassemblyScreen();
  clearGamePackets();

  playSynthSound('transmit');

  if (lvl === 1) {
    executeLevel1();
  } else if (lvl === 2) {
    executeLevel2();
  } else if (lvl === 3) {
    executeLevel3();
  }
}

function clearGamePackets() {
  const svg = document.getElementById('game-svg-layer');
  if (svg) {
    const packets = svg.querySelectorAll('.svg-packet-unit');
    packets.forEach(p => p.remove());
  }
}

// LEVEL 1 EXECUTION (REALISTIC PACKET DROP AT BROKEN ROUTER)
function executeLevel1() {
  const path = gameEngine.lvl1.selectedPath;
  const latencyEl = document.getElementById('game-latency');
  const netStatus = document.getElementById('game-net-status');

  if (!path) {
    gameEngine.isTransmitting = false;
    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = false;
    showGameModal({
      icon: '💡',
      title: 'Pilih Rute Terlebih Dahulu',
      text: 'Klik pada Router A atau Router C untuk memilih jalur transmisi yang aman sebelum mengirim foto!',
      type: 'error',
      actions: [{ label: 'Siap, Pilih Router', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
    return;
  }

  gameEngine.lvl1.attempts++;
  const isSafe = path === 'a' || path === 'c';
  const pathId = `g-path-${path}`;

  if (netStatus) {
    netStatus.className = 'hud-val status-badge ready';
    netStatus.textContent = isSafe ? '🚀 Mengirim Paket...' : '⚠️ Mengirim ke Jalur Rusak...';
  }

  const statusLabel = document.getElementById('rx-status-label');
  if (statusLabel) {
    statusLabel.textContent = isSafe ? 'Menerima transmisi paket data...' : 'Menunggu paket di komputer penerima...';
  }

  for (let i = 1; i <= 4; i++) {
    const t = setTimeout(() => {
      animatePacketAlongPathId(
        i,
        pathId,
        isSafe ? 1300 : 700,
        (reached) => {
          if (reached && isSafe) {
            handlePacketArrival(i, i);
          }
        },
        {
          maxProgress: isSafe ? 1 : 0.36, // Stops right at Router B (middle) when down!
          dropOnStop: !isSafe
        }
      );
    }, (i - 1) * 200);
    gameEngine.activeTimeouts.push(t);
  }

  const endTimer = setTimeout(() => {
    gameEngine.isTransmitting = false;
    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = false;

    if (isSafe) {
      if (latencyEl) latencyEl.textContent = '⏱️ 42 ms';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge ready';
        netStatus.textContent = '🟢 Sukses (4/4 Paket Tiba)';
      }
      gameEngine.stars[1] = 1;
      gameEngine.unlockedLevel = Math.max(gameEngine.unlockedLevel, 2);
      updateHUD();
      playSynthSound('level_complete');
      spawnConfetti();

      showGameModal({
        icon: '🎉',
        title: 'Misi 1 Berhasil!',
        text: 'Router berhasil menemukan rute alternatif yang aman. Keempat paket data foto kucing tiba dengan selamat dan tersusun rapi di komputer penerima!',
        stars: 1,
        type: 'success',
        actions: [
          { label: '🔄 Mainkan Lagi', cls: 'btn btn-secondary', onClick: 'closeGameModal();renderGameLevel(1)' },
          { label: '▶ Lanjut ke Misi 2 (Load Balancing)', cls: 'btn btn-success', onClick: 'closeGameModal();switchGameLevel(2)' }
        ]
      });
    } else {
      if (latencyEl) latencyEl.textContent = '⏱️ TIMEOUT (0 ms)';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge error';
        netStatus.textContent = '❌ 4 Paket Terputus (Drop)';
      }
      if (statusLabel) {
        statusLabel.className = 'rx-status';
        statusLabel.textContent = '❌ Tidak ada paket data yang sampai ke Penerima (0/4)!';
      }
      playSynthSound('error');

      showGameModal({
        icon: '⚠️',
        title: 'Paket Terputus di Router B (Server Down)',
        text: 'Paket data tidak bisa diteruskan dan hangus/gugur di Router B karena server mengalami kegagalan fungsi. Perhatikan ikon ⚠️ dan pilihlah Jalur A (Atas) atau Jalur C (Bawah) yang berstatus aman!',
        type: 'error',
        actions: [{ label: '🔄 Pilih Jalur yang Aman', cls: 'btn btn-warning', onClick: 'closeGameModal()' }]
      });
    }
  }, isSafe ? 2400 : 1800);

  gameEngine.activeTimeouts.push(endTimer);
}

// LEVEL 2 EXECUTION (REALISTIC BUFFER CAPACITY LIMIT & MIDWAY OVERFLOW DROP)
function executeLevel2() {
  gameEngine.lvl2.attempts++;
  const latencyEl = document.getElementById('game-latency');
  const netStatus = document.getElementById('game-net-status');

  let countA = 0;
  let countB = 0;
  for (let i = 1; i <= 4; i++) {
    if (gameEngine.lvl2[`p${i}`] === 'A') countA++;
    else countB++;
  }

  const isBalanced = (countA === 2 && countB === 2);

  let seqOnA = 0;
  let seqOnB = 0;
  let successCount = 0;

  for (let i = 1; i <= 4; i++) {
    const pathChoice = gameEngine.lvl2[`p${i}`];
    const isPathA = pathChoice === 'A';
    const pathId = isPathA ? 'g-path-lvl2-a' : 'g-path-lvl2-b';

    let orderOnThisPath = 0;
    if (isPathA) {
      seqOnA++;
      orderOnThisPath = seqOnA;
    } else {
      seqOnB++;
      orderOnThisPath = seqOnB;
    }

    // Limit is strictly 2 packets per path!
    const isAllowed = orderOnThisPath <= 2;

    const t = setTimeout(() => {
      animatePacketAlongPathId(
        i,
        pathId,
        isAllowed ? (isBalanced ? 1100 : 1300) : 900,
        (reached) => {
          if (reached && isAllowed) {
            successCount++;
            handlePacketArrival(i, i);
          }
        },
        {
          maxProgress: isAllowed ? 1 : 0.46, // Stops right at router middle when capacity exceeded!
          dropOnStop: !isAllowed
        }
      );
    }, (i - 1) * 160);

    gameEngine.activeTimeouts.push(t);
  }

  const endTimer = setTimeout(() => {
    gameEngine.isTransmitting = false;
    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = false;

    if (isBalanced) {
      if (latencyEl) latencyEl.textContent = '⏱️ 24 ms (Ultra Cepat!)';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge ready';
        netStatus.textContent = '🟢 Optimal (4/4 Paket Tiba)';
      }
      gameEngine.stars[2] = 1;
      gameEngine.unlockedLevel = Math.max(gameEngine.unlockedLevel, 3);
      updateHUD();
      playSynthSound('level_complete');
      spawnConfetti();

      showGameModal({
        icon: '⚡',
        title: 'Misi 2 Berhasil: Load Balanced!',
        text: 'Hebat! Dengan membagi beban 2 paket di Jalur A (Atas) dan 2 paket di Jalur B (Bawah), seluruh 4 paket data tiba serentak tanpa ada yang tertolak. Inilah keunggulan sistem <strong>Packet Switching</strong>!',
        stars: 2,
        type: 'success',
        actions: [
          { label: '🔄 Mainkan Lagi', cls: 'btn btn-secondary', onClick: 'closeGameModal();renderGameLevel(2)' },
          { label: '▶ Lanjut ke Misi 3 (Mesh Dinamis)', cls: 'btn btn-success', onClick: 'closeGameModal();switchGameLevel(3)' }
        ]
      });
    } else {
      const overloadedPath = countA > 2 ? 'A (Atas)' : 'B (Bawah)';
      const droppedCount = 4 - successCount;

      if (latencyEl) latencyEl.textContent = '⏱️ TIMEOUT (0 ms)';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge error';
        netStatus.textContent = `⚠️ ${droppedCount} Paket Dropped`;
      }
      const statusLabel = document.getElementById('rx-status-label');
      if (statusLabel) {
        statusLabel.className = 'rx-status';
        statusLabel.textContent = `⚠️ Hanya ${successCount} paket yang sampai. ${droppedCount} paket tertolak antrean!`;
      }
      playSynthSound('error');

      showGameModal({
        icon: '🚦',
        title: 'Kapasitas Jalur Terlampaui (Buffer Overflow)',
        text: `Jalur ${overloadedPath} hanya mampu menampung <strong>maksimal 2 paket</strong>. Paket ke-3 dan seterusnya otomatis ditolak (Packet Dropped) di tengah jalan sehingga foto di komputer penerima menjadi tidak lengkap (${successCount}/4). Bagilah 2 di Atas dan 2 di Bawah!`,
        type: 'error',
        actions: [{ label: '🔄 Bagi Beban 2:2', cls: 'btn btn-warning', onClick: 'closeGameModal()' }]
      });
    }
  }, 2200);

  gameEngine.activeTimeouts.push(endTimer);
}

// LEVEL 3 EXECUTION (REALISTIC DYNAMIC MESH ROUTING WITH CAPACITY LIMITS & REASSEMBLY)
function executeLevel3() {
  gameEngine.lvl3.attempts++;
  const latencyEl = document.getElementById('game-latency');
  const netStatus = document.getElementById('game-net-status');

  // Reset Level 3 buffer and reassembly state
  gameEngine.lvl3.arrivedPackets = [];
  gameEngine.lvl3.selectedBufferPkt = null;
  gameEngine.lvl3.assembledSlots = {};

  const p1 = parseInt(gameEngine.lvl3.p1) || 1;
  const p2 = parseInt(gameEngine.lvl3.p2) || 1;
  const p3 = parseInt(gameEngine.lvl3.p3) || 1;
  const p4 = parseInt(gameEngine.lvl3.p4) || 1;

  const routes = { 1: p1, 2: p2, 3: p3, 4: p4 };

  // Base specs & strict capacities:
  // 1: Express (35ms base, 800ms anim, maxCap: 1)
  // 2: Transit (75ms base, 1250ms anim, maxCap: 2)
  // 3: Cross Link (90ms base, 1450ms anim, maxCap: 2)
  // 4: Satelit (160ms base, 1950ms anim, maxCap: 2)
  const pathSpecs = {
    1: { id: 'g-mesh-p1', baseMs: 35, animMs: 800, name: 'Express', maxCap: 1, routerName: 'R3 (Express)' },
    2: { id: 'g-mesh-p2', baseMs: 75, animMs: 1250, name: 'Transit', maxCap: 2, routerName: 'R4 (Transit)' },
    3: { id: 'g-mesh-p3', baseMs: 90, animMs: 1450, name: 'Cross Link', maxCap: 2, routerName: 'R4 (Cross)' },
    4: { id: 'g-mesh-p4', baseMs: 160, animMs: 1950, name: 'Satelit', maxCap: 2, routerName: 'R5 (Satelit)' }
  };

  const pathUsage = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const packetJobs = [];

  for (let pktNum = 1; pktNum <= 4; pktNum++) {
    const routeChoice = routes[pktNum] || 2;
    const spec = pathSpecs[routeChoice] || pathSpecs[2];

    pathUsage[routeChoice] = (pathUsage[routeChoice] || 0) + 1;
    const isAllowed = pathUsage[routeChoice] <= spec.maxCap;

    packetJobs.push({
      pktNum,
      routeChoice,
      pathId: spec.id,
      pathName: spec.name,
      routerName: spec.routerName,
      realLatencyMs: spec.baseMs,
      animDuration: spec.animMs,
      isAllowed
    });
  }

  const maxLatency = Math.max(...packetJobs.filter(j => j.isAllowed).map(j => j.realLatencyMs), 0);

  if (netStatus) {
    netStatus.className = 'hud-val status-badge ready';
    netStatus.textContent = '⚡ Transmisi Paket Melintasi Mesh...';
  }

  // Hide Config Deck, Show Inbox Deck (ready for incoming packets)
  const configDeck = document.getElementById('mesh-config-deck');
  const inboxDeck = document.getElementById('mesh-inbox-deck');
  const inboxGrid = document.getElementById('mesh-inbox-grid');

  if (configDeck) configDeck.style.display = 'none';
  if (inboxDeck) inboxDeck.style.display = 'block';
  if (inboxGrid) inboxGrid.innerHTML = '';

  const statusLabel = document.getElementById('rx-status-label');
  if (statusLabel) {
    statusLabel.className = 'rx-status';
    statusLabel.textContent = 'Menunggu kedatangan paket di Buffer Penerima...';
  }

  // Dispatch all 4 packets along their routes
  packetJobs.forEach((job) => {
    animatePacketAlongPathId(
      job.pktNum,
      job.pathId,
      job.animDuration,
      (reached) => {
        if (reached && job.isAllowed) {
          playSynthSound('packet_arrive');
          gameEngine.lvl3.arrivedPackets.push(job);
          renderBufferArrivalCard(job);
        }
      },
      {
        maxProgress: job.isAllowed ? 1 : 0.54, // Drops right at router middle when capacity exceeded!
        dropOnStop: !job.isAllowed
      }
    );
  });

  const maxAnimDuration = Math.max(...packetJobs.map(j => j.animDuration));

  const completionTimer = setTimeout(() => {
    gameEngine.isTransmitting = false;
    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = true;

    const arrivedCount = gameEngine.lvl3.arrivedPackets.length;

    if (arrivedCount < 4) {
      // Overload failure!
      const droppedCount = 4 - arrivedCount;
      if (latencyEl) latencyEl.textContent = '⏱️ TIMEOUT (0 ms)';
      if (netStatus) {
        netStatus.className = 'hud-val status-badge error';
        netStatus.textContent = `❌ ${droppedCount} Paket Dropped (Overflow)`;
      }
      if (statusLabel) {
        statusLabel.className = 'rx-status';
        statusLabel.textContent = `❌ Buffer Overflow! Hanya ${arrivedCount}/4 paket yang tiba. ${droppedCount} paket tertolak antrean di router!`;
      }
      playSynthSound('error');

      const isExpressOverloaded = pathUsage[1] > 1;
      showGameModal({
        icon: '🚦',
        title: 'Kapasitas Rute Mesh Terlampaui (Buffer Overflow)',
        text: isExpressOverloaded
          ? `Jalur <strong>Express (R1➔R3)</strong> hanya memiliki kapasitas sempit (<strong>maksimal 1 paket</strong>). Paket ke-2 dan seterusnya otomatis tertolak dan gugur di Router 3.<br><br>Atur variasi rute tiap paket (Express maks 1, Transit maks 2, Cross maks 2, Satelit maks 2) agar seluruh 4 paket tiba dengan lengkap!`
          : `Salah satu jalur melebihi <strong>kapasitas maksimal 2 paket</strong> sehingga paket lainnya tertolak di router!<br><br>Bagikan rute ke-4 paket secara bervariasi agar semua paket tiba dengan selamat.`,
        type: 'error',
        actions: [
          { label: '🔄 Atur Ulang Rute Mesh', cls: 'btn btn-warning', onClick: 'closeGameModal();renderGameLevel(3)' }
        ]
      });

    } else {
      // All 4 arrived successfully!
      if (latencyEl) latencyEl.textContent = `⏱️ ${maxLatency} ms (Optimal)`;
      if (netStatus) {
        netStatus.className = 'hud-val status-badge ready';
        netStatus.textContent = '🧩 Susun Paket ke Kuadran!';
      }
      if (statusLabel) {
        statusLabel.textContent = '📦 4 Paket telah tiba di Buffer Penerima! Klik kartu paket (atau klik Kuadran monitor) untuk merakit kembali foto kucing.';
      }
    }

  }, maxAnimDuration + 300);

  gameEngine.activeTimeouts.push(completionTimer);
}

// -------------------- INTERACTIVE DYNAMIC BUFFER & SLOT REASSEMBLY --------------------

function renderBufferArrivalCard(job) {
  const inboxGrid = document.getElementById('mesh-inbox-grid');
  if (!inboxGrid) return;

  const card = document.createElement('div');
  card.className = 'mesh-inbox-card';
  card.id = `inbox-card-pkt-${job.pktNum}`;
  card.onclick = () => placePacketToSlot(job.pktNum);

  const quadrantNames = { 1: 'Kiri-Atas', 2: 'Kanan-Atas', 3: 'Kiri-Bawah', 4: 'Kanan-Bawah' };

  card.innerHTML = `
    <div class="mic-thumb" data-slot="${job.pktNum}"></div>
    <div class="mic-info">
      <span class="mic-header-title">📦 Header ID: #${job.pktNum}</span>
      <span class="mic-arrival-tag">Rute: ${job.pathName} (${job.realLatencyMs}ms)</span>
    </div>
  `;

  inboxGrid.appendChild(card);
}

function placePacketToSlot(pktNum) {
  if (gameEngine.currentLevel !== 3) return;
  if (gameEngine.lvl3.assembledSlots[pktNum]) return; // already placed

  const arrivedJob = (gameEngine.lvl3.arrivedPackets || []).find(j => j.pktNum === pktNum);
  if (!arrivedJob) {
    playSynthSound('error');
    const statusLabel = document.getElementById('rx-status-label');
    if (statusLabel) {
      statusLabel.textContent = `❌ Paket #${pktNum} belum tiba atau tertolak di jalan!`;
    }
    return;
  }

  gameEngine.lvl3.assembledSlots[pktNum] = true;
  playSynthSound('packet_arrive');

  const slotEl = document.getElementById(`rx-slot-${pktNum}`);
  if (slotEl) {
    slotEl.classList.remove('target-highlight', 'shake-error');
    slotEl.classList.add('filled');
    slotEl.innerHTML = '';
  }

  const card = document.getElementById(`inbox-card-pkt-${pktNum}`);
  if (card) {
    card.classList.remove('selected');
    card.classList.add('processed');
    card.innerHTML = `
      <div class="mic-thumb" data-slot="${pktNum}"></div>
      <div class="mic-info">
        <span class="mic-header-title" style="color:#2e7d32;">✅ Terpasang di Kuadran #${pktNum}</span>
        <span class="mic-arrival-tag">Header #${pktNum} Terverifikasi</span>
      </div>
      <span style="color:#2e7d32; font-size:18px; font-weight:900; margin-left:auto;">✓</span>
    `;
  }

  const assembledCount = Object.keys(gameEngine.lvl3.assembledSlots).length;
  const statusLabel = document.getElementById('rx-status-label');

  if (assembledCount === 4) {
    if (statusLabel) {
      statusLabel.className = 'rx-status complete';
      statusLabel.textContent = '✨ Foto Kucing Berhasil Dirakit Sempurna 100%!';
    }

    const grid = document.getElementById('rx-puzzle-grid');
    if (grid) grid.classList.add('complete');

    gameEngine.stars[3] = 1;
    updateHUD();
    playSynthSound('victory');
    spawnConfetti();

    const transmitBtn = document.getElementById('btn-game-transmit');
    if (transmitBtn) transmitBtn.disabled = false;

    setTimeout(() => {
      showGameModal({
        icon: '👑',
        title: 'Selamat! Kamu Master Packet Commander!',
        text: 'Luar biasa! Konfigurasi rute mesh sangat optimal tanpa ada paket yang tertolak antrean, dan kamu berhasil merekonstruksi <strong>Header & Payload</strong> foto kucing dengan akurasi 100%!',
        stars: 3,
        type: 'victory',
        actions: [
          { label: '🔄 Mainkan Lagi Misi 3', cls: 'btn btn-secondary', onClick: 'closeGameModal();renderGameLevel(3)' },
          { label: '▶ Lanjut ke Latihan Evaluasi', cls: 'btn btn-success', onClick: 'closeGameModal();goToPage(\'latihan-intro\')' }
        ]
      });
    }, 500);

  } else {
    if (statusLabel) {
      statusLabel.textContent = `✅ Kuadran #${pktNum} terpasang (${assembledCount}/4)! Pasang paket lainnya...`;
    }
  }
}

function selectBufferPacket(pktNum) {
  placePacketToSlot(pktNum);
}

function clickReceiverSlot(slotNum) {
  if (gameEngine.currentLevel !== 3) return;
  placePacketToSlot(slotNum);
}

function autoAssembleAllBufferPackets() {
  if (gameEngine.currentLevel !== 3) return;
  const arrived = gameEngine.lvl3.arrivedPackets || [];
  if (arrived.length === 0) return;

  arrived.forEach((job, idx) => {
    setTimeout(() => {
      placePacketToSlot(job.pktNum);
    }, idx * 250);
  });
}

// -------------------- SVG PACKET ANIMATION (VECTOR MATH WITH DROP SIMULATION) --------------------

function animatePacketAlongPathId(packetNum, pathId, duration, onComplete, options = {}) {
  const { maxProgress = 1, dropOnStop = false } = options;
  const svg = document.getElementById('game-svg-layer');
  const path = document.getElementById(pathId);
  if (!svg || !path) {
    if (onComplete) onComplete(false);
    return;
  }

  const totalLength = path.getTotalLength();
  const colors = { 1: '#00ACC1', 2: '#0288D1', 3: '#7b1fa2', 4: '#e65100' };

  // Create SVG packet group inside the SVG
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', `svg-packet-unit pkt-${packetNum}`);

  const startPt = path.getPointAtLength(0);
  g.setAttribute('transform', `translate(${startPt.x}, ${startPt.y})`);

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '-18');
  rect.setAttribute('y', '-18');
  rect.setAttribute('width', '36');
  rect.setAttribute('height', '36');
  rect.setAttribute('rx', '8');
  rect.setAttribute('fill', colors[packetNum] || '#00ACC1');
  rect.setAttribute('stroke', '#ffffff');
  rect.setAttribute('stroke-width', '2.5');
  rect.setAttribute('filter', 'drop-shadow(0 3px 8px rgba(0,0,0,0.38))');

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'central');
  text.setAttribute('fill', '#ffffff');
  text.setAttribute('font-family', 'var(--font-heading)');
  text.setAttribute('font-weight', '900');
  text.setAttribute('font-size', '16');
  text.textContent = packetNum;

  g.appendChild(rect);
  g.appendChild(text);
  svg.appendChild(g);

  const startTime = performance.now();

  function animFrame(now) {
    const elapsed = now - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);

    if (rawProgress >= maxProgress) {
      // Reached progress limit (e.g. stopped at broken router or buffer overflow!)
      const stopDist = maxProgress * totalLength;
      const pt = path.getPointAtLength(stopDist);
      g.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);

      if (dropOnStop || maxProgress < 1) {
        // Explode / Drop particle effect!
        rect.setAttribute('fill', '#d32f2f');
        rect.setAttribute('stroke', '#ffeb3b');
        rect.setAttribute('stroke-width', '3');
        text.textContent = '❌';
        playSynthSound('error');

        const fadeStart = performance.now();
        function fadeAnim(fadeNow) {
          const fadeElapsed = fadeNow - fadeStart;
          const fadeProgress = Math.min(fadeElapsed / 450, 1);
          g.style.opacity = String(1 - fadeProgress);
          g.setAttribute('transform', `translate(${pt.x}, ${pt.y - fadeProgress * 18}) scale(${1 + fadeProgress * 0.35})`);

          if (fadeProgress < 1) {
            requestAnimationFrame(fadeAnim);
          } else {
            g.remove();
            if (onComplete) onComplete(false); // Did not reach destination
          }
        }
        requestAnimationFrame(fadeAnim);
      } else {
        g.remove();
        if (onComplete) onComplete(true); // Safely reached destination!
      }
      return;
    }

    const currentDist = rawProgress * totalLength;
    const pt = path.getPointAtLength(currentDist);
    g.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
    requestAnimationFrame(animFrame);
  }

  requestAnimationFrame(animFrame);
}

function resetCurrentGameLevel() {
  if (gameEngine.isTransmitting) return;
  clearGameTimers();

  const lvl = gameEngine.currentLevel;
  if (lvl === 1) {
    gameEngine.lvl1.selectedPath = null;
  } else if (lvl === 2) {
    gameEngine.lvl2.p1 = 'A';
    gameEngine.lvl2.p2 = 'A';
    gameEngine.lvl2.p3 = 'A';
    gameEngine.lvl2.p4 = 'A';
  } else if (lvl === 3) {
    gameEngine.lvl3.p1 = 1;
    gameEngine.lvl3.p2 = 1;
    gameEngine.lvl3.p3 = 1;
    gameEngine.lvl3.p4 = 1;
    gameEngine.lvl3.arrivedPackets = [];
    gameEngine.lvl3.selectedBufferPkt = null;
    gameEngine.lvl3.assembledSlots = {};
  }

  resetReassemblyScreen();
  clearGamePackets();
  renderGameLevel(lvl);
}

function showGameHint() {
  const lvl = gameEngine.currentLevel;
  if (lvl === 1) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 1',
      text: 'Router B mengalami gangguan fisik/server down. Paket data di internet akan otomatis menghindari jalur bertanda ⚠️ dan memilih rute alternatif (Jalur A atau Jalur C).',
      type: 'success',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  } else if (lvl === 2) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 2',
      text: 'Setiap jalur hanya mampu membawa 2 paket data sekaligus. Bagilah: 2 paket melewati Jalur A (Atas) dan 2 paket melewati Jalur B (Bawah) agar pengiriman foto berlangsung cepat secara paralel.',
      type: 'success',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  } else if (lvl === 3) {
    showGameModal({
      icon: '💡',
      title: 'Petunjuk Misi 3',
      text: 'Tiap paket data melintasi rute mesh dan tiba di Buffer Penerima dengan waktu bervariasi. Klik kartu paket di Buffer untuk menginspeksi nomor Header, lalu klik Kuadran foto yang sesuai di Monitor Penerima!',
      type: 'success',
      actions: [{ label: 'Paham', cls: 'btn btn-primary', onClick: 'closeGameModal()' }]
    });
  }
}

// -------------------- GAME MODAL HELPER --------------------
function showGameModal(config) {
  const modal = document.getElementById('game-modal');
  const card = document.getElementById('game-modal-card');
  if (!modal || !card) return;

  let starsHtml = '';
  if (config.stars) {
    let starsStr = '';
    for (let i = 0; i < config.stars; i++) starsStr += '⭐';
    starsHtml = `<div class="gm-stars-row">${starsStr}</div>`;
  }

  let actionsHtml = '';
  if (config.actions && Array.isArray(config.actions)) {
    actionsHtml = config.actions.map(act => `
      <button class="${act.cls || 'btn btn-primary'}" onclick="${act.onClick}">${act.label}</button>
    `).join('');
  }

  card.innerHTML = `
    <div class="gm-icon">${config.icon || 'ℹ️'}</div>
    <div class="gm-title ${config.type || ''}">${config.title || ''}</div>
    ${starsHtml}
    <div class="gm-text">${config.text || ''}</div>
    <div class="gm-actions">${actionsHtml}</div>
  `;

  modal.classList.add('show');
}

function closeGameModal() {
  const modal = document.getElementById('game-modal');
  if (modal) modal.classList.remove('show');
}


// ==================== EVALUATION SIMULATION (PAGE 13 - BAGIAN E) ====================

let evalSimState = {
  selectedPath: null,
  attempts: 0,
  completed: false,
  firstAttemptCorrect: false
};

function initEvalSimulation() {
  evalSimState = { selectedPath: null, attempts: 0, completed: false, firstAttemptCorrect: false };
  const topoId = 'sim-topology-eval';

  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));

  const sendBtn = document.getElementById('btn-send-eval');
  if (sendBtn) sendBtn.disabled = true;

  const fb = document.getElementById('sim-feedback-eval');
  if (fb) fb.classList.remove('show');
}

function selectEvalSimPath(path) {
  if (evalSimState.completed) return;

  evalSimState.selectedPath = path;
  const topoId = 'sim-topology-eval';
  const prefix = 'eval-';

  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  const router = document.getElementById(`${prefix}router-${path}`);
  if (router) router.classList.add('selected');

  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));
  const pathLine = document.getElementById(`${prefix}path-${path}-line`);
  if (pathLine) pathLine.classList.add('active');

  const sendBtn = document.getElementById('btn-send-eval');
  if (sendBtn) sendBtn.disabled = false;
}

function sendEvalPacket() {
  const state = evalSimState;
  if (!state.selectedPath || state.completed) return;

  state.attempts++;
  const path = state.selectedPath;
  const isCorrect = path === 'a' || path === 'c';

  const sendBtn = document.getElementById('btn-send-eval');
  if (sendBtn) sendBtn.disabled = true;

  const topology = document.getElementById('sim-topology-eval');

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
    showEvalSimFeedback(isCorrect);
  }, isCorrect ? 2000 : 1200);
}

function showEvalSimFeedback(isCorrect) {
  const state = evalSimState;
  const fb = document.getElementById('sim-feedback-eval');
  const card = document.getElementById('sim-feedback-card-eval');

  if (isCorrect) {
    state.completed = true;
    if (state.attempts === 1) state.firstAttemptCorrect = true;

    card.innerHTML = `
      <div class="fb-icon">✅</div>
      <div class="fb-title success">Luar Biasa! Sukses!</div>
      <div class="fb-text">Router berhasil menemukan rute alternatif yang aman. Semua paket data tiba di komputer penerima dan berhasil dirakit kembali menjadi foto yang utuh!</div>
      <div class="fb-actions">
        <button class="btn btn-success" onclick="closeEvalSimFeedback()">Lanjut ke Hasil Evaluasi ▶</button>
      </div>
    `;

    spawnConfetti();

  } else {
    card.innerHTML = `
      <div class="fb-icon">⚠️</div>
      <div class="fb-title error">Rute Terputus (Request Time Out)</div>
      <div class="fb-text">Ups! Jalur B sedang mengalami server down. Pilihlah jalur alternatif yang aman (Jalur A atau C)!</div>
      <div class="fb-actions">
        <button class="btn btn-warning" onclick="retryEvalSimulation()">🔄 Coba Lagi</button>
      </div>
    `;
  }

  fb.classList.add('show');
}

function closeEvalSimFeedback() {
  const fb = document.getElementById('sim-feedback-eval');
  if (fb) fb.classList.remove('show');
}

function retryEvalSimulation() {
  closeEvalSimFeedback();
  evalSimState.selectedPath = null;
  const topoId = 'sim-topology-eval';
  document.querySelectorAll(`#${topoId} .sim-router`).forEach(r => r.classList.remove('selected'));
  document.querySelectorAll(`#${topoId} .sim-path`).forEach(p => p.classList.remove('active'));
}

// Backward-compatible aliases for Evaluation Section E
const simState = {
  get eval() { return evalSimState; },
  set eval(v) { evalSimState = v; },
  get game() { return gameEngine.lvl1; }
};

function sendPacket(mode) {
  if (mode === 'eval') sendEvalPacket();
  else launchGameTransmission();
}

function selectSimPath(path) {
  selectGameRouter(path);
}

function initSimulation(mode) {
  if (mode === 'eval') initEvalSimulation();
  else initPacketCommanderGame();
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
  B1: 'salah', B2: 'benar', B3: 'benar', B4: 'salah', B5: 'benar',
};

const MATCH_ANSWERS = {
  '1': 'b', '2': 'd', '3': 'e', '4': 'a', '5': 'c'
};

const SEQ_CORRECT_ORDER = [
  'Foto dipecah menjadi beberapa paket data kecil',
  'Setiap paket diberi header berisi alamat pengirim, tujuan, dan nomor urut',
  'Paket dikirim melalui jaringan dan diarahkan oleh router ke rute terbaik',
  'Jika satu rute mengalami gangguan, paket otomatis mencari rute alternatif',
  'Semua paket sampai di penerima dan disusun kembali sesuai nomor urut menjadi foto utuh'
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


// ==================== SWIPE GESTURE NAVIGATION ====================

function initSwipeNavigation() {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let isSwiping = false;

  const minSwipeDistance = 50; // px minimum horizontal distance
  const maxSwipeTime = 800; // ms maximum gesture duration

  function shouldIgnoreSwipe(target) {
    if (!target || !(target instanceof Element)) return false;

    // Check if open modal is active
    const activeModal = document.querySelector('.game-modal.show, #game-modal.show');
    if (activeModal && activeModal.contains(target)) return true;

    // Ignore interactive UI elements with their own dragging/swiping/drawing/typing
    const interactiveSelector = [
      'input',
      'textarea',
      'select',
      'button',
      'video',
      'audio',
      'canvas',
      '.video-container',
      '.video-controls',
      '.match-p8-item',
      '.match-item',
      '.match-col',
      '.match-column',
      '#game-canvas',
      '.game-canvas',
      '.game-controls',
      '.packet-btn',
      '.route-btn',
      '.node-item',
      '.router-node',
      '.seq-item',
      '.qc-panel',
      '#quick-controls-panel',
      '.no-swipe',
      '[data-no-swipe="true"]'
    ].join(', ');

    return !!target.closest(interactiveSelector);
  }

  document.addEventListener('touchstart', function(e) {
    if (e.touches.length !== 1) {
      isSwiping = false;
      return;
    }

    if (shouldIgnoreSwipe(e.target)) {
      isSwiping = false;
      return;
    }

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    isSwiping = true;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    if (!isSwiping || e.changedTouches.length === 0) return;
    isSwiping = false;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndTime = Date.now();

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const deltaTime = touchEndTime - touchStartTime;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Validate swipe: sufficient distance, timely gesture, predominantly horizontal
    if (deltaTime <= maxSwipeTime && absX >= minSwipeDistance && absX > absY * 1.3) {
      if (deltaX < 0) {
        // Swiped left (finger moved right -> left): navigate to NEXT page
        navNext();
      } else {
        // Swiped right (finger moved left -> right): navigate to PREVIOUS page
        navPrev();
      }
    }
  }, { passive: true });
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
