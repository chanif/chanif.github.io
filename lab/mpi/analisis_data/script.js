/* ============================================================
   MPI Analisis Data — Mengungkap Cerita di Balik Angka
   Main Script (SPA Controller, Pipeline Animator, Data Lab & Quiz)
   ============================================================ */

// ==================== AUDIO STATE & CONFIG INTEGRATION ====================

let isAudioMuted = false;
try {
  isAudioMuted = localStorage.getItem('mpi_audio_muted') === '1';
} catch (e) {}

function updateAudioToggleUI() {
  const btn = document.getElementById('btn-audio-toggle');
  const iconEl = document.querySelector('#qc-row-audio .qc-label-icon');
  if (btn) {
    btn.textContent = isAudioMuted ? 'Suara: Senyap' : 'Suara: Aktif';
    btn.classList.toggle('muted', isAudioMuted);
  }
  if (iconEl) {
    iconEl.textContent = isAudioMuted ? '🔇' : '🔊';
  }
}

function toggleAudioMute() {
  isAudioMuted = !isAudioMuted;
  try {
    localStorage.setItem('mpi_audio_muted', isAudioMuted ? '1' : '0');
  } catch (e) {}
  updateAudioToggleUI();
  if (!isAudioMuted) playSynthSound('click');
}

function applyConfig() {
  const cfg = window.MPI_CONFIG;
  if (!cfg) return;

  const bgEl = document.getElementById('classroom-bg');
  if (bgEl && cfg.background) {
    if (cfg.background.image) {
      bgEl.style.backgroundImage = `url('${cfg.background.image}')`;
      bgEl.style.backgroundSize = cfg.background.size || 'cover';
      bgEl.style.backgroundPosition = cfg.background.position || 'center center';
    } else {
      bgEl.classList.add('use-svg');
    }

    let overlayColor = cfg.background.overlay_color;
    if (!overlayColor && cfg.background.overlay_opacity !== undefined) {
      overlayColor = `rgba(255, 255, 255, ${cfg.background.overlay_opacity})`;
    }
    if (overlayColor) {
      bgEl.style.setProperty('--bg-overlay', overlayColor);
    }
  }

  const leftLogo = document.getElementById('logo-kemendikdasmen-cover');
  if (leftLogo && cfg.logos && cfg.logos.header_left) {
    leftLogo.src = cfg.logos.header_left;
  }
  const rightLogo = document.getElementById('logo-sobat-cover');
  if (rightLogo && cfg.logos && cfg.logos.header_right) {
    rightLogo.src = cfg.logos.header_right;
  }

  if (cfg.logos && Array.isArray(cfg.logos.footer_logos) && cfg.logos.footer_logos.length > 0) {
    const kLogos = document.querySelectorAll('#kredit-logos img');
    cfg.logos.footer_logos.forEach((src, idx) => {
      if (kLogos[idx] && src) kLogos[idx].src = src;
    });
  }

  const devPhoto1 = document.querySelector('#dev-photo-1 img');
  if (devPhoto1 && cfg.assets && cfg.assets.dev_photo_1) {
    devPhoto1.src = cfg.assets.dev_photo_1;
  }

  updateTestingIndicator(currentPage);
  updateTopControls(currentPage);
  updateAudioToggleUI();
}

// ==================== ZOOM CONTROLS ENGINE ====================

function isTouchTabletDevice() {
  const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  const hasTouch = (navigator.maxTouchPoints > 0) || ('ontouchstart' in window);
  const ua = navigator.userAgent;
  const isTabletUA = /iPad|Tablet|SM-T|SM-X|Tab|Android(?!.*Mobile)/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  return (isCoarse || isTabletUA) && hasTouch;
}

function getOptimalZoom() {
  const isTablet = isTouchTabletDevice();
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isTabletShortLandscape = isTablet && (w >= 801 && h <= 720);

  if (!isTablet) {
    let saved = null;
    try { saved = localStorage.getItem('mpi_zoom_level'); } catch (e) {}
    if (saved === '0.67') {
      try {
        localStorage.removeItem('mpi_zoom_level');
      } catch (e) {}
      return 1.0;
    }
    return saved !== null ? (parseFloat(saved) || 1.0) : 1.0;
  }

  let saved = null;
  try { saved = localStorage.getItem('mpi_zoom_level'); } catch (e) {}
  if (saved !== null) return parseFloat(saved) || 1.0;
  return isTabletShortLandscape ? 0.67 : 1.0;
}

let currentZoom = getOptimalZoom();

function setAppZoom(zoomLevel) {
  zoomLevel = Math.round(zoomLevel * 100) / 100;
  if (zoomLevel < 0.50) zoomLevel = 0.50;
  if (zoomLevel > 1.30) zoomLevel = 1.30;
  currentZoom = zoomLevel;

  try {
    localStorage.setItem('mpi_zoom_level', currentZoom.toString());
  } catch (e) {}

  const zoomPct = Math.round(currentZoom * 100);
  document.body.style.zoom = currentZoom;
  document.documentElement.style.setProperty('--app-zoom', currentZoom);

  if (currentZoom < 1.0) {
    document.body.classList.add('zoom-sub-100');
    document.documentElement.classList.add('zoom-sub-100');
  } else {
    document.body.classList.remove('zoom-sub-100');
    document.documentElement.classList.remove('zoom-sub-100');
  }

  document.querySelectorAll('.zoom-level-text').forEach(el => {
    el.textContent = zoomPct + '%';
    el.title = 'Zoom: ' + zoomPct + '%. Klik untuk reset.';
  });

  setTimeout(() => {
    if (currentPage === 'tarik-jawaban') drawMatchP7Lines();
    const secC = document.getElementById('eval-section-C');
    if (secC && secC.classList.contains('active')) drawMatchLines();
  }, 100);
}

function zoomIn() {
  const next = Math.round((Math.ceil((currentZoom + 0.001) / 0.05) * 0.05) * 100) / 100;
  setAppZoom(next);
}

function zoomOut() {
  const next = Math.round((Math.floor((currentZoom - 0.001) / 0.05) * 0.05) * 100) / 100;
  setAppZoom(next);
}

function resetZoom() {
  const isTablet = isTouchTabletDevice();
  const defaultZoom = (isTablet && window.innerWidth >= 801 && window.innerHeight <= 720) ? 0.67 : 1.0;
  setAppZoom(defaultZoom);
}

// ==================== FONT SIZE CONTROLS ENGINE ====================

let currentFontScale = 1.0;
try {
  currentFontScale = parseFloat(localStorage.getItem('mpi_font_scale')) || 1.0;
} catch (e) {}

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

  document.querySelectorAll('.font-level-text').forEach(el => {
    el.textContent = `${fontPct}%`;
    el.title = fontPct === 100 ? 'Ukuran Teks Normal (100%)' : 'Klik untuk Reset Ukuran Teks (100%)';
  });

  setTimeout(() => {
    if (currentPage === 'tarik-jawaban') drawMatchP7Lines();
    const secC = document.getElementById('eval-section-C');
    if (secC && secC.classList.contains('active')) drawMatchLines();
  }, 60);
}

function fontIn() { setAppFontScale(currentFontScale + 0.05); }
function fontOut() { setAppFontScale(currentFontScale - 0.05); }
function resetFont() { setAppFontScale(1.0); }

// ==================== NAVIGATION (SPA) & VISITED TRACKER ====================

const MATERI_SUBPAGES = ['materi-1', 'tarik-jawaban', 'materi-2', 'video', 'materi-3', 'materi-4'];

let visitedMateriSet = new Set();
try {
  const rawVisited = localStorage.getItem('mpi_ad_visited');
  if (rawVisited) {
    JSON.parse(rawVisited).forEach(p => visitedMateriSet.add(p));
  }
} catch (e) {}

function markMateriVisited(pageId) {
  if (!MATERI_SUBPAGES.includes(pageId)) return;
  visitedMateriSet.add(pageId);
  try {
    localStorage.setItem('mpi_ad_visited', JSON.stringify([...visitedMateriSet]));
  } catch (e) {}
  refreshMateriDoneBadges();
}

function refreshMateriDoneBadges() {
  MATERI_SUBPAGES.forEach(pid => {
    const badge = document.getElementById('done-' + pid);
    if (badge) {
      badge.classList.toggle('show', visitedMateriSet.has(pid));
    }
  });
}

function updateTopControls(pageId) {
  const topControls = document.getElementById('top-controls-right');
  const btnMateri = document.getElementById('btn-top-materi');
  if (btnMateri) {
    btnMateri.style.display = MATERI_SUBPAGES.includes(pageId) ? 'inline-flex' : 'none';
  }
  if (topControls) {
    topControls.classList.toggle('on-cover', pageId === 'cover');
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
  'materi-4': 11,
  'permainan-intro': 12,
  'permainan': 13,
  'latihan-intro': 14,
  'latihan': 15,
  'rangkuman': 16,
  'referensi': 17,
  'prompt-ai': 18,
  'pengembang': 19,
  'kutipan': 20,
  'kredit': 21
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
  indicator.innerHTML = `<span>Halaman ${pageNum} / 21</span>`;
  indicator.style.display = 'block';
}

const LINEAR_PAGES = [
  'cover', 'menu', 'petunjuk', 'tujuan', 'materi-list',
  'materi-1', 'tarik-jawaban', 'materi-2', 'video', 'materi-3', 'materi-4',
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

  // Pause external videos or built-in animation when navigating
  document.querySelectorAll('video').forEach(v => { try { v.pause(); } catch (e) {} });
  if (pageId !== 'video') pauseAnimPlayer();

  updateTestingIndicator(pageId);
  updateTopControls(pageId);
  markMateriVisited(pageId);

  newPage.scrollTop = 0;
  newPage.querySelectorAll('.scrollable, .content-box, .intro-card-box').forEach(el => {
    el.scrollTop = 0;
  });

  updateGlobalNavButtons(pageId);

  if (pageId === 'materi-list') refreshMateriDoneBadges();
  if (pageId === 'tarik-jawaban') initMatchP7();
  if (pageId === 'video') initVideo();
  if (pageId === 'materi-3') toggleChartHonesty(honestyCurrentState);
  if (pageId === 'permainan') initDataGame();
  if (pageId === 'latihan') {
    const activeSec = document.querySelector('.eval-section.active');
    if (!activeSec || activeSec.id === 'eval-section-recap') {
      startEval();
    }
    const scrollHint = document.getElementById('eval-floating-scroll-hint');
    if (scrollHint) {
      const secA = document.getElementById('eval-section-A');
      scrollHint.classList.toggle('hidden', !(secA && secA.classList.contains('active')));
    }
  }
  if (pageId === 'rangkuman') loadRefleksi();
}

const PAGE_NAV_MAP = {
  'menu': { prevText: 'Cover / Beranda', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Petunjuk Penggunaan', nextSub: 'HALAMAN BERIKUTNYA' },
  'petunjuk': { prevText: 'Menu Utama', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Tujuan Pembelajaran', nextSub: 'HALAMAN BERIKUTNYA' },
  'tujuan': { prevText: 'Petunjuk Penggunaan', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Daftar Pilihan Materi', nextSub: 'HALAMAN BERIKUTNYA' },
  'materi-list': { prevText: 'Tujuan Pembelajaran', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Materi 1: Data &amp; Piramida DIKW', nextSub: 'HALAMAN BERIKUTNYA' },
  'materi-1': { prevText: 'Daftar Pilihan Materi', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Latihan: Menjodohkan Konsep Data', nextSub: 'HALAMAN BERIKUTNYA' },
  'tarik-jawaban': { prevText: 'Materi 1: Data &amp; Piramida DIKW', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Materi 2: Pengumpulan &amp; Spreadsheet', nextSub: 'HALAMAN BERIKUTNYA' },
  'materi-2': { prevText: 'Latihan: Menjodohkan Konsep Data', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Simulasi Alur Analisis Data', nextSub: 'HALAMAN BERIKUTNYA' },
  'video': { prevText: 'Materi 2: Pengumpulan &amp; Spreadsheet', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Materi 3: Visualisasi Data &amp; Grafik', nextSub: 'HALAMAN BERIKUTNYA' },
  'materi-3': { prevText: 'Simulasi Alur Analisis Data', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Materi 4: Interpretasi &amp; Bias Data', nextSub: 'HALAMAN BERIKUTNYA' },
  'materi-4': { prevText: 'Materi 3: Visualisasi Data &amp; Grafik', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Pengantar Laboratorium Detektif Data', nextSub: 'HALAMAN BERIKUTNYA' },
  'permainan-intro': { prevText: 'Materi 4: Interpretasi &amp; Bias Data', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Mulai Laboratorium Detektif Data', nextSub: 'HALAMAN BERIKUTNYA' },
  'permainan': { prevText: 'Pengantar Laboratorium', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Pengantar Latihan Evaluasi', nextSub: 'HALAMAN BERIKUTNYA' },
  'latihan-intro': { prevText: 'Laboratorium Detektif Data', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Mulai Latihan Evaluasi', nextSub: 'HALAMAN BERIKUTNYA' },
  'latihan': { prevText: 'Pengantar Latihan', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Rangkuman &amp; Refleksi', nextSub: 'HALAMAN BERIKUTNYA' },
  'rangkuman': { prevText: 'Latihan Evaluasi', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Referensi &amp; Daftar Pustaka', nextSub: 'HALAMAN BERIKUTNYA' },
  'referensi': { prevText: 'Rangkuman &amp; Refleksi', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Dokumentasi Prompt AI', nextSub: 'HALAMAN BERIKUTNYA' },
  'prompt-ai': { prevText: 'Referensi &amp; Daftar Pustaka', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Profil Pengembang', nextSub: 'HALAMAN BERIKUTNYA' },
  'pengembang': { prevText: 'Dokumentasi Prompt AI', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Motto / Kutipan Inspirasi', nextSub: 'HALAMAN BERIKUTNYA' },
  'kutipan': { prevText: 'Profil Pengembang', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Kredit Media &amp; Penutup', nextSub: 'HALAMAN BERIKUTNYA' },
  'kredit': { prevText: 'Motto', prevSub: 'HALAMAN SEBELUMNYA', nextText: 'Kembali ke Beranda 🏠', nextSub: 'SELESAI PEMBELAJARAN', isFinish: true }
};

function updateGlobalNavButtons(pageId) {
  if (pageId === 'cover') return;
  const navInfo = PAGE_NAV_MAP[pageId];
  if (!navInfo) return;
  const pageEl = document.getElementById('page-' + pageId);
  if (!pageEl) return;

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
    labelEl.innerHTML = `<span class="nml-sub">${navInfo.prevSub}</span><strong class="nml-main">${navInfo.prevText}</strong>`;
  }

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
    labelEl.innerHTML = `<span class="nml-sub">${navInfo.nextSub}</span><strong class="nml-main">${navInfo.nextText}</strong>`;
    labelEl.classList.toggle('finish', !!navInfo.isFinish);
  }
}

function navNext() {
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx !== -1 && idx < LINEAR_PAGES.length - 1) {
    goToPage(LINEAR_PAGES[idx + 1]);
  }
}

function navPrev() {
  const idx = LINEAR_PAGES.indexOf(currentPage);
  if (idx > 0) {
    goToPage(LINEAR_PAGES[idx - 1]);
  } else {
    goToPage('materi-list');
  }
}

// ==================== WEB AUDIO SYNTHESIZER ====================

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playSynthSound(type) {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'click' || type === 'step') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(type === 'step' ? 760 : 620, now);
      gain.gain.setValueAtTime(0.11, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'packet_arrive' || type === 'match') {
      [587.33, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.16, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.17);
      });
    } else if (type === 'error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.22);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'success' || type === 'level_complete') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.18, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.38);
      });
    } else if (type === 'victory') {
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.11);
        gain.gain.setValueAtTime(0.22, now + i * 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.11 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.11);
        osc.stop(now + i * 0.11 + 0.48);
      });
    }
  } catch (e) {}
}

// ==================== THEORY MINI-INTERACTIONS (PAGES 6, 8, 10) ====================

const DATA_DEMO_CASES = [
  '<strong>Kuantitatif Kontinu:</strong> Diperoleh dari alat ukur meteran dan nilainya dapat berupa pecahan desimal di antara dua bilangan bulat.',
  '<strong>Kuantitatif Diskrit:</strong> Diperoleh dengan menghitung/mencacah benda utuh dalam bilangan bulat (tidak mungkin meminjam 14,4 buah buku).',
  '<strong>Kualitatif Ordinal:</strong> Berupa kategori kata yang memiliki tingkatan atau urutan peringkat yang jelas (Kurang &lt; Cukup &lt; Puas).',
  '<strong>Kualitatif Nominal:</strong> Berupa kategori label pembeda yang setara tanpa tingkatan lebih tinggi atau lebih rendah (Biru tidak lebih tinggi dari Hijau).'
];

function selectDataDemo(idx) {
  playSynthSound('click');
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById('demo-chip-' + i);
    if (btn) btn.classList.toggle('active', i === idx);
  }
  const res = document.getElementById('data-demo-result');
  if (res && DATA_DEMO_CASES[idx]) {
    res.innerHTML = DATA_DEMO_CASES[idx];
  }
}

const MINI_FORMULA_CONFIG = {
  sum: { fx: '=SUM(B2:B5)', out: 'Hasil: 336', hl: ['ms-b2', 'ms-b3', 'ms-b4', 'ms-b5'] },
  avg: { fx: '=AVERAGE(B2:B5)', out: 'Hasil: 84', hl: ['ms-b2', 'ms-b3', 'ms-b4', 'ms-b5'] },
  max: { fx: '=MAX(B2:B5)', out: 'Hasil: 92 (Budi)', hl: ['ms-b3'] },
  min: { fx: '=MIN(B2:B5)', out: 'Hasil: 76 (Citra)', hl: ['ms-b4'] },
  countif: { fx: '=COUNTIF(B2:B5, ">=85")', out: 'Hasil: 2 siswa', hl: ['ms-b3', 'ms-b5'] }
};

function runMiniFormula(type) {
  playSynthSound('click');
  const cfg = MINI_FORMULA_CONFIG[type];
  if (!cfg) return;

  ['sum', 'avg', 'max', 'min', 'countif'].forEach(k => {
    const b = document.getElementById('mf-btn-' + k);
    if (b) b.classList.toggle('active', k === type);
  });

  const fxEl = document.getElementById('mini-fx-display');
  const outEl = document.getElementById('mini-formula-output');
  if (fxEl) fxEl.textContent = cfg.fx;
  if (outEl) outEl.textContent = cfg.out;

  ['ms-b2', 'ms-b3', 'ms-b4', 'ms-b5'].forEach(id => {
    const td = document.getElementById(id);
    if (td) td.classList.toggle('cell-hl', cfg.hl.includes(id));
  });
}

let honestyCurrentState = false;

function toggleChartHonesty(isHonest) {
  honestyCurrentState = !!isHonest;
  if (currentPage === 'materi-3') playSynthSound('click');

  const btnBad = document.getElementById('btn-honesty-false');
  const btnGood = document.getElementById('btn-honesty-true');
  if (btnBad) btnBad.className = 'honesty-btn' + (!isHonest ? ' active-bad' : '');
  if (btnGood) btnGood.className = 'honesty-btn' + (isHonest ? ' active-good' : '');

  const box = document.getElementById('honesty-svg-box');
  const cap = document.getElementById('honesty-caption');
  if (!box || !cap) return;

  if (!isHonest) {
    // Truncated Y axis 80..88: A=82 -> 25% height, B=86 -> 75% height!
    box.innerHTML = `
      <svg viewBox="0 0 360 145" width="100%" height="145" aria-label="Grafik Sumbu Y Terpotong 80 sampai 88">
        <text x="195" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#991b1b">Skor Rata-rata Kelas (Sumbu Y Mulai 80)</text>
        <line x1="50" y1="26" x2="50" y2="116" stroke="#64748b" stroke-width="2"/>
        <line x1="50" y1="116" x2="335" y2="116" stroke="#64748b" stroke-width="2"/>
        <line x1="50" y1="71" x2="335" y2="71" stroke="#e2e8f0" stroke-dasharray="4"/>
        <line x1="50" y1="26" x2="335" y2="26" stroke="#e2e8f0" stroke-dasharray="4"/>
        <text x="43" y="120" text-anchor="end" font-size="10.5" font-weight="700" fill="#dc2626">80</text>
        <text x="43" y="75" text-anchor="end" font-size="10.5" fill="#64748b">84</text>
        <text x="43" y="30" text-anchor="end" font-size="10.5" fill="#64748b">88</text>
        <rect x="105" y="93.5" width="60" height="22.5" rx="4" fill="#38bdf8"/>
        <text x="135" y="88" text-anchor="middle" font-size="11" font-weight="800" fill="#0369a1">82</text>
        <text x="135" y="133" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Kelas A</text>
        <rect x="225" y="48.5" width="60" height="67.5" rx="4" fill="#ef4444"/>
        <text x="255" y="43" text-anchor="middle" font-size="11" font-weight="800" fill="#b91c1c">86</text>
        <text x="255" y="133" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Kelas B</text>
      </svg>`;
    cap.innerHTML = '<strong style="color:#b91c1c;">Menyesatkan!</strong> Karena sumbu Y dimulai dari 80, Kelas B (86) terlihat <strong>3× lebih tinggi</strong> dari Kelas A (82), padahal selisih aslinya hanya 4 poin!';
  } else {
    // Honest Y axis 0..100: A=82 -> 82% of 90px, B=86 -> 86% of 90px
    box.innerHTML = `
      <svg viewBox="0 0 360 145" width="100%" height="145" aria-label="Grafik Sumbu Y Jujur 0 sampai 100">
        <text x="195" y="16" text-anchor="middle" font-size="11" font-weight="700" fill="#166534">Skor Rata-rata Kelas (Sumbu Y Jujur Mulai 0)</text>
        <line x1="50" y1="26" x2="50" y2="116" stroke="#64748b" stroke-width="2"/>
        <line x1="50" y1="116" x2="335" y2="116" stroke="#64748b" stroke-width="2"/>
        <line x1="50" y1="71" x2="335" y2="71" stroke="#e2e8f0" stroke-dasharray="4"/>
        <line x1="50" y1="26" x2="335" y2="26" stroke="#e2e8f0" stroke-dasharray="4"/>
        <text x="43" y="120" text-anchor="end" font-size="10.5" font-weight="700" fill="#16a34a">0</text>
        <text x="43" y="75" text-anchor="end" font-size="10.5" fill="#64748b">50</text>
        <text x="43" y="30" text-anchor="end" font-size="10.5" fill="#64748b">100</text>
        <rect x="105" y="42.2" width="60" height="73.8" rx="4" fill="#00ACC1"/>
        <text x="135" y="37" text-anchor="middle" font-size="11" font-weight="800" fill="#006064">82</text>
        <text x="135" y="133" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Kelas A</text>
        <rect x="225" y="38.6" width="60" height="77.4" rx="4" fill="#10b981"/>
        <text x="255" y="34" text-anchor="middle" font-size="11" font-weight="800" fill="#166534">86</text>
        <text x="255" y="133" text-anchor="middle" font-size="11" font-weight="700" fill="#334155">Kelas B</text>
      </svg>`;
    cap.innerHTML = '<strong style="color:#166534;">Jujur &amp; Proporsional!</strong> Dengan sumbu Y dimulai dari angka <code>0</code>, terlihat jelas bahwa kemampuan Kelas A dan Kelas B hampir setara.';
  }
}

// ==================== MENJODOHKAN ISTILAH (HALAMAN 7) ====================

const MATCH_P7_DATA = [
  { id: '1', term: 'Piramida DIKW', def: 'Alur perubahan Data mentah ➔ Informasi ➔ Pengetahuan ➔ Keputusan' },
  { id: '2', term: 'Kuantitatif Kontinu', def: 'Data angka hasil pengukuran yang dapat bernilai pecahan/desimal (misal tinggi badan)' },
  { id: '3', term: 'Kualitatif Ordinal', def: 'Data kategori yang memiliki tingkatan atau urutan peringkat yang jelas' },
  { id: '4', term: 'Fungsi =AVERAGE()', def: 'Rumus spreadsheet untuk menghitung nilai rata-rata dari sekumpulan sel angka' },
  { id: '5', term: 'Data Cleaning', def: 'Proses membersihkan duplikat, nilai aneh, dan sel kosong sebelum analisis' }
];

const MATCH_P7_THEMES = {
  '1': { color: '#0288d1', bg: '#e1f5fe', border: '#0288d1', label: '1' },
  '2': { color: '#7b1fa2', bg: '#f3e5f5', border: '#8e24aa', label: '2' },
  '3': { color: '#e65100', bg: '#fff3e0', border: '#fb8c00', label: '3' },
  '4': { color: '#2e7d32', bg: '#e8f5e9', border: '#43a047', label: '4' },
  '5': { color: '#c2185b', bg: '#fce4ec', border: '#d81b60', label: '5' }
};

let matchP7State = { selectedLeft: null, pairs: {} };
let shuffledRightP7 = null;

function initMatchP7() {
  const leftCol = document.getElementById('match-left-p7');
  const rightCol = document.getElementById('match-right-p7');
  if (!leftCol || !rightCol) return;

  leftCol.innerHTML = '';
  rightCol.innerHTML = '';

  if (!shuffledRightP7) {
    shuffledRightP7 = [...MATCH_P7_DATA].sort(() => Math.random() - 0.5);
  }

  MATCH_P7_DATA.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.id = `match-p7-left-${item.id}`;
    el.onclick = (e) => {
      if (e.target.closest('.match-unpair-btn')) {
        e.stopPropagation();
        unpairMatchP7(item.id);
        return;
      }
      onMatchP7Click('left', item.id);
    };
    leftCol.appendChild(el);
  });

  shuffledRightP7.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.id = `match-p7-right-${item.id}`;
    el.onclick = (e) => {
      if (e.target.closest('.match-unpair-btn')) {
        e.stopPropagation();
        const pairedLeft = Object.keys(matchP7State.pairs).find(k => matchP7State.pairs[k] === item.id);
        if (pairedLeft) unpairMatchP7(pairedLeft);
        return;
      }
      onMatchP7Click('right', item.id);
    };
    rightCol.appendChild(el);
  });

  renderMatchP7UI();
}

function renderMatchP7UI() {
  MATCH_P7_DATA.forEach(item => {
    const el = document.getElementById(`match-p7-left-${item.id}`);
    if (!el) return;
    const isSelected = matchP7State.selectedLeft === item.id;
    const pairedRight = matchP7State.pairs[item.id];
    const theme = MATCH_P7_THEMES[item.id];

    el.className = 'match-item' + (isSelected ? ' selected' : '') + (pairedRight ? ' matched' : '');
    if (pairedRight) {
      el.style.setProperty('--pair-color', theme.color);
      el.style.setProperty('--pair-bg', theme.bg);
      el.style.setProperty('--pair-border', theme.border);
      el.innerHTML = `
        <div class="match-item-content"><span><strong>${item.term}</strong></span></div>
        <span class="match-badge">🔗 #${theme.label} <span class="match-unpair-btn" title="Batalkan pasangan">✕</span></span>
        <span class="match-anchor-dot"></span>`;
    } else {
      el.removeAttribute('style');
      el.innerHTML = `<div class="match-item-content"><span><strong>${item.term}</strong></span></div><span class="match-anchor-dot"></span>`;
    }
  });

  if (shuffledRightP7) {
    shuffledRightP7.forEach(item => {
      const el = document.getElementById(`match-p7-right-${item.id}`);
      if (!el) return;
      const pairedLeft = Object.keys(matchP7State.pairs).find(k => matchP7State.pairs[k] === item.id);
      const theme = pairedLeft ? MATCH_P7_THEMES[pairedLeft] : null;

      el.className = 'match-item' + (pairedLeft ? ' matched' : '');
      if (pairedLeft && theme) {
        el.style.setProperty('--pair-color', theme.color);
        el.style.setProperty('--pair-bg', theme.bg);
        el.style.setProperty('--pair-border', theme.border);
        el.innerHTML = `
          <span class="match-anchor-dot"></span>
          <span class="match-badge">🔗 #${theme.label} <span class="match-unpair-btn" title="Batalkan pasangan">✕</span></span>
          <div class="match-item-content"><span>${item.def}</span></div>`;
      } else {
        el.removeAttribute('style');
        el.innerHTML = `<span class="match-anchor-dot"></span><div class="match-item-content"><span>${item.def}</span></div>`;
      }
    });
  }

  setTimeout(drawMatchP7Lines, 20);
}

function onMatchP7Click(side, id) {
  if (side === 'left') {
    if (matchP7State.pairs[id]) {
      delete matchP7State.pairs[id];
      matchP7State.selectedLeft = id;
      playSynthSound('click');
      renderMatchP7UI();
      return;
    }
    matchP7State.selectedLeft = (matchP7State.selectedLeft === id) ? null : id;
    playSynthSound('click');
    renderMatchP7UI();
  } else {
    if (matchP7State.selectedLeft !== null) {
      const leftId = matchP7State.selectedLeft;
      const existingLeft = Object.keys(matchP7State.pairs).find(k => matchP7State.pairs[k] === id);
      if (existingLeft && existingLeft !== leftId) delete matchP7State.pairs[existingLeft];
      matchP7State.pairs[leftId] = id;
      matchP7State.selectedLeft = null;
      playSynthSound('packet_arrive');
      renderMatchP7UI();
    } else {
      const pairedLeft = Object.keys(matchP7State.pairs).find(k => matchP7State.pairs[k] === id);
      if (pairedLeft) {
        delete matchP7State.pairs[pairedLeft];
        playSynthSound('click');
        renderMatchP7UI();
      }
    }
  }
}

function unpairMatchP7(leftId) {
  if (matchP7State.pairs[leftId]) {
    delete matchP7State.pairs[leftId];
    playSynthSound('click');
    renderMatchP7UI();
  }
}

function resetMatchP7() {
  matchP7State = { selectedLeft: null, pairs: {} };
  const scoreBox = document.getElementById('match-p7-score-box');
  if (scoreBox) scoreBox.style.display = 'none';
  playSynthSound('click');
  renderMatchP7UI();
}

function checkMatchP7() {
  const pairedCount = Object.keys(matchP7State.pairs).length;
  if (pairedCount === 0) {
    const scoreBox = document.getElementById('match-p7-score-box');
    const badge = document.getElementById('match-p7-score-badge');
    const text = document.getElementById('match-p7-score-text');
    if (scoreBox && badge && text) {
      scoreBox.style.display = 'flex';
      badge.textContent = '⚠️ Belum Ada';
      text.textContent = 'Hubungkan minimal satu pasangan kiri & kanan terlebih dahulu!';
    }
    playSynthSound('error');
    return;
  }

  let correct = 0;
  MATCH_P7_DATA.forEach(item => {
    if (matchP7State.pairs[item.id] === item.id) correct++;
  });

  const score = Math.round((correct / MATCH_P7_DATA.length) * 100);
  const scoreBox = document.getElementById('match-p7-score-box');
  const badge = document.getElementById('match-p7-score-badge');
  const text = document.getElementById('match-p7-score-text');

  if (scoreBox && badge && text) {
    scoreBox.style.display = 'flex';
    badge.textContent = `🏆 Skor: ${score}`;
    text.textContent = `${correct} dari ${MATCH_P7_DATA.length} Pasangan Benar! ${correct === MATCH_P7_DATA.length ? '🎉 Sempurna!' : 'Cek ulang pasangan yang kurang tepat.'}`;
  }

  if (score >= 80) {
    playSynthSound('success');
    spawnConfetti();
  } else {
    playSynthSound('click');
  }
}

function drawMatchP7Lines() {
  const container = document.getElementById('match-container-p7');
  const svg = document.getElementById('match-svg-layer-p7');
  if (!container || !svg) return;
  svg.innerHTML = '';
  const containerRect = container.getBoundingClientRect();
  if (containerRect.width === 0 || containerRect.height === 0) return;

  const scaleX = container.offsetWidth > 0 ? (containerRect.width / container.offsetWidth) : 1;
  const scaleY = container.offsetHeight > 0 ? (containerRect.height / container.offsetHeight) : 1;

  Object.entries(matchP7State.pairs).forEach(([leftId, rightId]) => {
    const leftEl = document.getElementById(`match-p7-left-${leftId}`);
    const rightEl = document.getElementById(`match-p7-right-${rightId}`);
    if (!leftEl || !rightEl) return;

    const lr = leftEl.getBoundingClientRect();
    const rr = rightEl.getBoundingClientRect();
    const x1 = (lr.right - containerRect.left) / scaleX;
    const y1 = (lr.top + lr.height / 2 - containerRect.top) / scaleY;
    const x2 = (rr.left - containerRect.left) / scaleX;
    const y2 = (rr.top + rr.height / 2 - containerRect.top) / scaleY;

    const theme = MATCH_P7_THEMES[leftId];
    const midX = (x1 + x2) / 2;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1},${y1} C ${midX},${y1} ${midX},${y2} ${x2},${y2}`);
    path.setAttribute('stroke', theme.border);
    path.setAttribute('stroke-width', '4');
    path.setAttribute('stroke-dasharray', '8 4');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

    [[x1, y1], [x2, y2]].forEach(([cx, cy]) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', cx);
      c.setAttribute('cy', cy);
      c.setAttribute('r', '5');
      c.setAttribute('fill', theme.color);
      svg.appendChild(c);
    });
  });
}

// ==================== PAGE 9: INTERACTIVE DATA PIPELINE ANIMATION PLAYER ====================

const ANIM_DURATION = 48;
let animTime = 0;
let animPlaying = false;
let animTimerId = null;

const ANIM_SEGMENTS = [
  {
    start: 0,
    end: 12,
    caption: '📥 <strong>Tahap 1 (Collect):</strong> Data mentah dikumpulkan dari kuesioner siswa &amp; transaksi harian kantin ke dalam tabel.'
  },
  {
    start: 12,
    end: 24,
    caption: '🧹 <strong>Tahap 2 (Clean &amp; Process):</strong> Baris duplikat dan angka aneh dibersihkan, lalu rumus <code>=SUM</code> &amp; <code>=AVERAGE</code> dijalankan.'
  },
  {
    start: 24,
    end: 36,
    caption: '📊 <strong>Tahap 3 (Visualize):</strong> Ringkasan angka diubah menjadi grafik batang bersumbu nol dan garis tren agar pola cepat terbaca.'
  },
  {
    start: 36,
    end: 48,
    caption: '💡 <strong>Tahap 4 (Insight):</strong> Analis menyimpulkan pola temuan menjadi keputusan cerdas: menambah stok menu sehat paling diminati!'
  }
];

function initVideo() {
  const cfg = window.MPI_CONFIG;
  const video = document.getElementById('main-video');
  const animWrap = document.getElementById('anim-player-wrap');
  const srcUrl = cfg && cfg.assets && cfg.assets.video_src ? cfg.assets.video_src.trim() : '';

  if (srcUrl && video) {
    const source = document.getElementById('main-video-source');
    if (source && source.getAttribute('src') !== srcUrl) {
      source.src = srcUrl;
      video.load();
    }
    video.style.display = 'block';
    if (animWrap) animWrap.style.display = 'none';
    return;
  }

  if (video) video.style.display = 'none';
  if (animWrap) animWrap.style.display = 'flex';
  renderAnimFrame();
}

function toggleAnimPlay() {
  if (animPlaying) {
    pauseAnimPlayer();
    playSynthSound('click');
  } else {
    if (animTime >= ANIM_DURATION) animTime = 0;
    animPlaying = true;
    playSynthSound('click');
    updateAnimPlayBtn();
    if (animTimerId) clearInterval(animTimerId);
    animTimerId = setInterval(() => {
      animTime += 0.12;
      if (animTime >= ANIM_DURATION) {
        animTime = ANIM_DURATION;
        pauseAnimPlayer();
        playSynthSound('success');
      }
      renderAnimFrame();
    }, 120);
  }
}

function pauseAnimPlayer() {
  animPlaying = false;
  if (animTimerId) {
    clearInterval(animTimerId);
    animTimerId = null;
  }
  updateAnimPlayBtn();
}

function restartAnim() {
  animTime = 0;
  pauseAnimPlayer();
  renderAnimFrame();
  toggleAnimPlay();
}

function seekAnimStep(stepIdx) {
  const seg = ANIM_SEGMENTS[stepIdx];
  if (!seg) return;
  animTime = seg.start + 0.1;
  playSynthSound('step');
  renderAnimFrame();
  if (!animPlaying) toggleAnimPlay();
}

function scrubAnimTimeline(e) {
  const bar = document.getElementById('anim-timeline');
  if (!bar) return;
  const rect = bar.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  animTime = ratio * ANIM_DURATION;
  playSynthSound('click');
  renderAnimFrame();
}

function updateAnimPlayBtn() {
  const btn = document.getElementById('btn-anim-play');
  if (btn) btn.textContent = animPlaying ? '⏸ Jeda' : '▶ Putar';
}

function formatMMSS(sec) {
  const s = Math.floor(sec);
  return '00:' + String(s).padStart(2, '0');
}

function renderAnimFrame() {
  const fill = document.getElementById('anim-timeline-fill');
  const timeLbl = document.getElementById('anim-time-label');
  const captionEl = document.getElementById('anim-caption');
  const stage = document.getElementById('anim-stage');

  if (fill) fill.style.width = ((animTime / ANIM_DURATION) * 100).toFixed(1) + '%';
  if (timeLbl) timeLbl.textContent = `${formatMMSS(animTime)} / 00:${ANIM_DURATION}`;

  let segIdx = Math.min(3, Math.floor(animTime / 12));
  if (animTime >= ANIM_DURATION) segIdx = 3;

  for (let i = 0; i < 4; i++) {
    const card = document.getElementById('anim-step-card-' + i);
    if (card) card.classList.toggle('active-step', i === segIdx);
  }
  if (captionEl) captionEl.innerHTML = ANIM_SEGMENTS[segIdx].caption;
  if (!stage) return;

  const p = Math.max(0, Math.min(1, (animTime - segIdx * 12) / 12));
  let svgHtml = '';

  if (segIdx === 0) {
    const xSlide = Math.round(140 * p);
    const pulse = (Math.sin(p * Math.PI * 4) * 0.15 + 0.85).toFixed(2);
    svgHtml = `
      <svg viewBox="0 0 480 230" aria-label="Animasi Tahap 1: Kumpulkan Data">
        <rect x="20" y="24" width="130" height="175" rx="14" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <text x="85" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="#38bdf8">SURVEI &amp; KANTIN</text>
        <rect x="34" y="64" width="102" height="28" rx="6" fill="#0f766e" opacity="${pulse}"/>
        <text x="85" y="82" text-anchor="middle" font-size="11" fill="#ffffff">Soto: 48 porsi</text>
        <rect x="34" y="102" width="102" height="28" rx="6" fill="#0284c7" opacity="${pulse}"/>
        <text x="85" y="120" text-anchor="middle" font-size="11" fill="#ffffff">Pecel: 30 porsi</text>
        <rect x="34" y="140" width="102" height="28" rx="6" fill="#ca8a04" opacity="${pulse}"/>
        <text x="85" y="158" text-anchor="middle" font-size="11" fill="#ffffff">Nilai: 150? (!)</text>

        <g transform="translate(${xSlide}, 0)">
          <circle cx="195" cy="80" r="8" fill="#38bdf8"/>
          <circle cx="205" cy="116" r="8" fill="#34d399"/>
          <circle cx="190" cy="152" r="8" fill="#fbbf24"/>
          <path d="M165,116 L225,116" stroke="#38bdf8" stroke-width="3" stroke-dasharray="6 4"/>
          <polygon points="225,110 238,116 225,122" fill="#38bdf8"/>
        </g>

        <rect x="315" y="24" width="145" height="175" rx="14" fill="#0f172a" stroke="#00ACC1" stroke-width="2.5"/>
        <text x="387" y="48" text-anchor="middle" font-size="12" font-weight="700" fill="#2dd4bf">TABEL MENTAH</text>
        <rect x="330" y="64" width="115" height="22" rx="4" fill="#1e293b"/>
        <rect x="330" y="94" width="115" height="22" rx="4" fill="#1e293b"/>
        <rect x="330" y="124" width="115" height="22" rx="4" fill="#3f1d28" stroke="#f87171" stroke-width="1"/>
        <rect x="330" y="154" width="115" height="22" rx="4" fill="#1e293b"/>
        <text x="387" y="139" text-anchor="middle" font-size="10.5" fill="#fca5a5">Data Kotor / Duplikat</text>
      </svg>`;
  } else if (segIdx === 1) {
    const sweepY = Math.round(52 + p * 125);
    const cleaned = p > 0.55;
    svgHtml = `
      <svg viewBox="0 0 480 230" aria-label="Animasi Tahap 2: Bersihkan dan Olah Spreadsheet">
        <rect x="30" y="22" width="245" height="182" rx="12" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <text x="152" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="#38bdf8">SPREADSHEET PEMBERSIHAN</text>
        <rect x="46" y="56" width="212" height="26" rx="5" fill="#0f766e"/>
        <text x="152" y="73" text-anchor="middle" font-size="11" fill="#ffffff">Senin · Soto · 35 porsi</text>
        <rect x="46" y="90" width="212" height="26" rx="5" fill="${cleaned ? '#0f766e' : '#7f1d1d'}"/>
        <text x="152" y="107" text-anchor="middle" font-size="11" fill="#ffffff">${cleaned ? '✓ Outlier Diperbaiki · 85' : '⚠️ Outlier Nilai: 150!'}</text>
        <rect x="46" y="124" width="212" height="26" rx="5" fill="${cleaned ? '#0f766e' : '#7f1d1d'}" opacity="${cleaned ? '0.45' : '1'}"/>
        <text x="152" y="141" text-anchor="middle" font-size="11" fill="#ffffff">${cleaned ? '✓ Duplikat Dihapus' : '⚠️ Baris Duplikat'}</text>
        <rect x="46" y="158" width="212" height="26" rx="5" fill="#0284c7"/>
        <text x="152" y="175" text-anchor="middle" font-size="11" fill="#ffffff">Rabu · Soto · 48 porsi</text>

        <line x1="38" y1="${sweepY}" x2="267" y2="${sweepY}" stroke="#2dd4bf" stroke-width="4" opacity="0.9"/>

        <rect x="295" y="42" width="160" height="140" rx="12" fill="#0f172a" stroke="#fbbf24" stroke-width="2"/>
        <text x="375" y="68" text-anchor="middle" font-size="12" font-weight="800" fill="#fbbf24">RUMUS OTOMATIS</text>
        <rect x="310" y="84" width="130" height="32" rx="6" fill="#1e293b"/>
        <text x="375" y="104" text-anchor="middle" font-size="11.5" font-family="monospace" fill="#38bdf8">=SUM ➔ ${Math.round(p * 205)}</text>
        <rect x="310" y="126" width="130" height="32" rx="6" fill="#1e293b"/>
        <text x="375" y="146" text-anchor="middle" font-size="11.5" font-family="monospace" fill="#34d399">=AVG ➔ ${Math.round(p * 41)}</text>
      </svg>`;
  } else if (segIdx === 2) {
    const h1 = Math.max(8, Math.round(p * 65));
    const h2 = Math.max(8, Math.round(p * 112));
    const h3 = Math.max(8, Math.round(p * 86));
    svgHtml = `
      <svg viewBox="0 0 480 230" aria-label="Animasi Tahap 3: Visualisasi Grafik Jujur">
        <rect x="35" y="20" width="410" height="186" rx="14" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <text x="240" y="42" text-anchor="middle" font-size="12" font-weight="700" fill="#fbbf24">GRAFIK PENJUALAN MENU KANTIN (SUMBU Y MULAI 0)</text>
        <line x1="85" y1="58" x2="85" y2="174" stroke="#94a3b8" stroke-width="2"/>
        <line x1="85" y1="174" x2="415" y2="174" stroke="#94a3b8" stroke-width="2"/>
        <text x="76" y="178" text-anchor="end" font-size="11" font-weight="800" fill="#34d399">0</text>
        <text x="76" y="120" text-anchor="end" font-size="11" fill="#94a3b8">50</text>
        <text x="76" y="64" text-anchor="end" font-size="11" fill="#94a3b8">100</text>

        <rect x="125" y="${174 - h1}" width="54" height="${h1}" rx="6" fill="#38bdf8"/>
        <text x="152" y="192" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e2e8f0">Pecel</text>

        <rect x="225" y="${174 - h2}" width="54" height="${h2}" rx="6" fill="#2dd4bf"/>
        <text x="252" y="192" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e2e8f0">Soto</text>

        <rect x="325" y="${174 - h3}" width="54" height="${h3}" rx="6" fill="#f97316"/>
        <text x="352" y="192" text-anchor="middle" font-size="11.5" font-weight="700" fill="#e2e8f0">Gado2</text>

        <polyline points="152,${170 - h1} 252,${170 - h2} 352,${170 - h3}" fill="none" stroke="#fbbf24" stroke-width="3" stroke-dasharray="5 3"/>
      </svg>`;
  } else {
    const glowR = (18 + Math.sin(p * Math.PI * 3) * 4).toFixed(1);
    svgHtml = `
      <svg viewBox="0 0 480 230" aria-label="Animasi Tahap 4: Interpretasi dan Keputusan Cerdas">
        <rect x="30" y="24" width="205" height="178" rx="14" fill="#1e293b" stroke="#2dd4bf" stroke-width="2"/>
        <line x1="58" y1="165" x2="215" y2="165" stroke="#94a3b8" stroke-width="2"/>
        <rect x="70" y="112" width="32" height="53" rx="4" fill="#38bdf8"/>
        <rect x="118" y="64" width="36" height="101" rx="4" fill="#2dd4bf" stroke="#fbbf24" stroke-width="2.5"/>
        <rect x="170" y="96" width="32" height="69" rx="4" fill="#f97316"/>
        <circle cx="136" cy="72" r="${glowR}" fill="none" stroke="#fbbf24" stroke-width="2.5"/>
        <text x="132" y="46" text-anchor="middle" font-size="11.5" font-weight="700" fill="#fbbf24">Puncak: Soto (+48)</text>

        <path d="M235,112 L272,112" stroke="#fbbf24" stroke-width="3.5"/>
        <polygon points="270,105 285,112 270,119" fill="#fbbf24"/>

        <rect x="290" y="34" width="165" height="158" rx="14" fill="#064e3b" stroke="#34d399" stroke-width="2.5"/>
        <text x="372" y="68" text-anchor="middle" font-size="28">💡</text>
        <text x="372" y="96" text-anchor="middle" font-size="12.5" font-weight="800" fill="#a7f3d0">KEPUTUSAN CERDAS</text>
        <text x="372" y="120" text-anchor="middle" font-size="11" fill="#ffffff">Tambah stok Soto 25%</text>
        <text x="372" y="138" text-anchor="middle" font-size="11" fill="#ffffff">tiap hari Rabu &amp; Jumat!</text>
        <rect x="322" y="154" width="100" height="22" rx="11" fill="#10b981"/>
        <text x="372" y="169" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">✓ Berbasis Bukti</text>
      </svg>`;
  }

  stage.innerHTML = svgHtml;
}

// ==================== PAGE 13: LABORATORIUM DETEKTIF DATA (4 MISI) ====================

let dataGame = {
  currentLevel: 1,
  unlockedLevel: 1,
  stars: { 1: 0, 2: 0, 3: 0, 4: 0 },

  // Misi 1: Klinik Data
  m1: {
    selectedId: null,
    rows: [
      { id: 'r1', no: 1, name: 'Alya', saku: '15000', score: '85', issue: null, fixed: true },
      { id: 'r2', no: 2, name: 'Bima', saku: '12000', score: '150', issue: 'outlier', fixed: false,
        title: 'Nilai Skor Di Luar Batas (Outlier: 150)',
        desc: 'Skor maksimal kuis adalah 100, namun nilai Bima tertulis 150 (kemungkinan salah ketik angka 1 di depan).',
        options: [
          { text: 'Biarkan saja 150 agar rata-rata kelas tampak tinggi', ok: false, msg: 'Membiarkan nilai mustahil akan merusak keakuratan rata-rata kelas!' },
          { text: 'Koreksi / tandai nilai menjadi valid (50) setelah verifikasi lembar kuis', ok: true, msg: 'Tepat! Nilai outlier hasil salah ketik harus diverifikasi dan dikoreksi.' },
          { text: 'Hapus seluruh siswa kelas VII dari survei', ok: false, msg: 'Jangan buang data teman lain yang sudah benar!' }
        ],
        fixedVal: { score: '50' }
      },
      { id: 'r3', no: 3, name: 'Citra', saku: '10000', score: '90', issue: null, fixed: true },
      { id: 'r4', no: 4, name: 'Citra', saku: '10000', score: '90', issue: 'dup', fixed: false,
        title: 'Baris Duplikat Identik (Citra Tercatat 2 Kali)',
        desc: 'Responden "Citra" dengan uang saku 10000 dan skor 90 masuk dua kali berturut-turut.',
        options: [
          { text: 'Hapus satu baris duplikat agar tidak dihitung ganda', ok: true, msg: 'Benar! Menghapus duplikat mencegah bias hitungan berlebih.' },
          { text: 'Ubah nama baris ke-4 menjadi nama guru', ok: false, msg: 'Mengubah data tanpa bukti adalah pemalsuan data!' },
          { text: 'Biarkan ganda supaya jumlah responden tampak banyak', ok: false, msg: 'Baris ganda membuat hasil persentase tidak valid.' }
        ],
        fixedVal: { removed: true }
      },
      { id: 'r5', no: 5, name: 'Deni', saku: '"Rp 5.000"', score: '78', issue: 'fmt', fixed: false,
        title: 'Format Teks di Kolom Angka ("Rp 5.000")',
        desc: 'Tanda kutip dan huruf "Rp" membuat spreadsheet menganggap sel ini teks sehingga rumus =AVERAGE() gagal.',
        options: [
          { text: 'Tambahkan emoji uang di samping angka', ok: false, msg: 'Emoji justru membuat spreadsheet makin tidak bisa menghitung sel!' },
          { text: 'Ubah menjadi angka numerik murni 5000 (gunakan Number Formatting)', ok: true, msg: 'Sip! Data numerik murni bisa langsung dihitung dengan rumus spreadsheet.' },
          { text: 'Kosongkan sel uang saku seluruh siswa', ok: false, msg: 'Menghapus semua data justru menghilangkan informasi berharga.' }
        ],
        fixedVal: { saku: '5000' }
      },
      { id: 'r6', no: 6, name: 'Eka', saku: '14000', score: '(kosong)', issue: 'empty', fixed: false,
        title: 'Sel Nilai Kosong (Missing Value)',
        desc: 'Nilai kuis Eka kosong karena belum terinput. Mengisinya asal dengan angka 0 akan menurunkan rata-rata secara keliru.',
        options: [
          { text: 'Isi angka acak 99 agar tabel penuh', ok: false, msg: 'Mengarang angka melanggar kejujuran analisis data!' },
          { text: 'Biarkan kosong (NULL) / tandai "Belum Mengisi" agar dikecualikan dari rata-rata', ok: true, msg: 'Tepat! Mengecualikan data kosong (atau konfirmasi ulang) menjaga keakuratan rata-rata.' },
          { text: 'Ganti nama Eka dengan angka 100', ok: false, msg: 'Kolom nama dan kolom nilai tidak boleh tertukar.' }
        ],
        fixedVal: { score: '— (Dikecualikan)' }
      }
    ]
  },

  // Misi 2: Lab Rumus Spreadsheet
  m2: {
    challengeIdx: 1,
    selectedFn: 'SUM',
    selectedArg: 'C2:C6',
    completed: { 1: false, 2: false, 3: false },
    sheetRows: [
      { row: 1, a: 'Hari', b: 'Menu', c: 'Porsi', d: 'Omzet', isHeader: true },
      { row: 2, a: 'Senin', b: 'Soto', c: '35', d: '175000' },
      { row: 3, a: 'Selasa', b: 'Gado2', c: '42', d: '210000' },
      { row: 4, a: 'Rabu', b: 'Soto', c: '48', d: '240000' },
      { row: 5, a: 'Kamis', b: 'Pecel', c: '30', d: '150000' },
      { row: 6, a: 'Jumat', b: 'Soto', c: '50', d: '250000' }
    ],
    challenges: [
      {
        id: 1,
        goal: '🎯 <strong>Target Tugas 1:</strong> Hitung jumlah total seluruh <strong>Porsi</strong> terjual dari Senin hingga Jumat!',
        reqFn: 'SUM',
        reqArg: 'C2:C6',
        expectedText: '= 205 porsi'
      },
      {
        id: 2,
        goal: '🎯 <strong>Target Tugas 2:</strong> Hitung <strong>rata-rata Omzet harian</strong> (kolom D) selama 5 hari!',
        reqFn: 'AVERAGE',
        reqArg: 'D2:D6',
        expectedText: '= Rp 205.000'
      },
      {
        id: 3,
        goal: '🎯 <strong>Target Tugas 3:</strong> Hitung berapa hari penjualan <strong>Porsi mencapai minimal 40 (&gt;=40)</strong>!',
        reqFn: 'COUNTIF',
        reqArg: 'C2:C6, ">=40"',
        expectedText: '= 3 hari'
      }
    ]
  },

  // Misi 3: Studio Pilih Grafik
  m3: {
    caseIdx: 1,
    completed: { 1: false, 2: false, 3: false },
    lastChoice: null,
    cases: [
      {
        id: 1,
        title: 'Perkembangan Jumlah Pengunjung Perpustakaan (Januari – Juni)',
        desc: 'Data: <code>Jan: 120, Feb: 145, Mar: 160, Apr: 155, Mei: 190, Jun: 210</code>.<br>Tujuan: Menunjukkan <strong>tren perubahan naik-turun dari bulan ke bulan</strong>.',
        correct: 'line',
        okMsg: 'Tepat! Line Chart adalah pilihan terbaik untuk menunjukkan tren perubahan seiring waktu.'
      },
      {
        id: 2,
        title: 'Persentase Pilihan 4 Klub Ekstrakurikuler Kelas VIII (Total 100%)',
        desc: 'Data: <code>Pramuka 40%, Futsal 25%, PMR 20%, Coding 15%</code>.<br>Tujuan: Memperlihatkan <strong>komposisi bagian dari keseluruhan 100% siswa</strong>.',
        correct: 'pie',
        okMsg: 'Betul! Pie Chart sangat jelas menampilkan proporsi 4 kategori terhadap 100% total.'
      },
      {
        id: 3,
        title: 'Perbandingan Nilai Rata-rata Kuis Antara Kelas 8A, 8B, 8C, &amp; 8D',
        desc: 'Data: <code>8A: 78, 8B: 86, 8C: 81, 8D: 89</code>.<br>Tujuan: <strong>Membandingkan capaian antar 4 kategori kelas</strong> secara berdampingan.',
        correct: 'bar',
        okMsg: 'Mantap! Bar Chart memudahkan perbandingan nilai antar beberapa kategori terpisah.'
      }
    ]
  },

  // Misi 4: Detektif Grafik & Bias
  m4: {
    selectedActions: []
  }
};

function initDataGame() {
  updateGameHUD();
  renderCurrentStageUI();
}

function updateGameHUD() {
  const totalStars = [1, 2, 3, 4].reduce((s, l) => s + (dataGame.stars[l] ? 1 : 0), 0);
  const starsEl = document.getElementById('game-total-stars');
  if (starsEl) starsEl.textContent = `⭐ ${totalStars}/4`;

  for (let lvl = 1; lvl <= 4; lvl++) {
    const tab = document.getElementById(`game-tab-${lvl}`);
    const tabStars = document.getElementById(`stars-lvl-${lvl}`);
    if (!tab) continue;
    tab.classList.remove('active', 'locked');
    if (lvl === dataGame.currentLevel) tab.classList.add('active');
    if (lvl > dataGame.unlockedLevel) {
      tab.classList.add('locked');
      if (tabStars) tabStars.textContent = '🔒';
    } else if (tabStars) {
      tabStars.textContent = dataGame.stars[lvl] ? '⭐ 1/1' : '⭐ 0/1';
    }
  }

  const statusEl = document.getElementById('game-status-badge');
  const accEl = document.getElementById('game-accuracy-badge');
  if (statusEl && accEl) {
    const lvl = dataGame.currentLevel;
    if (lvl === 1) {
      const fixedCnt = dataGame.m1.rows.filter(r => r.issue && r.fixed).length;
      const pct = 20 + fixedCnt * 20;
      statusEl.textContent = dataGame.stars[1] ? '🟢 Data Bersih' : '🟡 Audit Tabel';
      accEl.textContent = pct + '%';
    } else if (lvl === 2) {
      const doneCnt = Object.values(dataGame.m2.completed).filter(Boolean).length;
      statusEl.textContent = dataGame.stars[2] ? '🟢 Rumus Valid' : '🔵 Susun Rumus';
      accEl.textContent = `${doneCnt}/3 Tugas`;
    } else if (lvl === 3) {
      const doneCnt = Object.values(dataGame.m3.completed).filter(Boolean).length;
      statusEl.textContent = dataGame.stars[3] ? '🟢 Grafik Tepat' : '🎨 Pilih Grafik';
      accEl.textContent = `${doneCnt}/3 Kasus`;
    } else {
      statusEl.textContent = dataGame.stars[4] ? '🟢 Laporan Jujur' : '⚠️ Bias Terdeteksi';
      accEl.textContent = dataGame.stars[4] ? '100% Valid' : 'Butuh Audit';
    }
  }
}

function switchGameLevel(lvl) {
  if (lvl > dataGame.unlockedLevel) {
    playSynthSound('error');
    showGameModal({
      icon: '🔒',
      title: 'Misi Masih Terkunci',
      titleClass: 'error',
      text: `Selesaikan Misi ${lvl - 1} terlebih dahulu untuk membuka tantangan berikutnya!`,
      actions: [{ text: 'Mengerti', primary: true, onClick: closeGameModal }]
    });
    return;
  }
  dataGame.currentLevel = lvl;
  playSynthSound('click');
  updateGameHUD();
  renderCurrentStageUI();
}

function renderCurrentStageUI() {
  for (let i = 1; i <= 4; i++) {
    const panel = document.getElementById(`game-stage-panel-${i}`);
    if (panel) panel.style.display = (i === dataGame.currentLevel) ? 'block' : 'none';
  }

  const iconEl = document.getElementById('game-mission-icon');
  const descEl = document.getElementById('game-mission-desc');
  const lvl = dataGame.currentLevel;

  if (lvl === 1) {
    if (iconEl) iconEl.textContent = '🧹';
    if (descEl) descEl.innerHTML = '<strong>Misi 1 (Klinik Data):</strong> Klik 4 baris bermasalah bertanda merah pada tabel di kiri, lalu pilih tindakan pembersihan yang benar di kanan hingga kesehatan data 100%!';
    renderM1UI();
  } else if (lvl === 2) {
    if (iconEl) iconEl.textContent = '🧮';
    if (descEl) descEl.innerHTML = '<strong>Misi 2 (Lab Rumus Spreadsheet):</strong> Selesaikan 3 tugas analisis tabel Kantin Sehat dengan memadukan Fungsi dan Rentang Sel yang tepat!';
    renderM2UI();
  } else if (lvl === 3) {
    if (iconEl) iconEl.textContent = '🎨';
    if (descEl) descEl.innerHTML = '<strong>Misi 3 (Studio Pilih Grafik):</strong> Amati 3 skenario data sekolah dan pilih grafik yang paling tepat agar pesan data tersampaikan dengan jelas!';
    renderM3UI();
  } else if (lvl === 4) {
    if (iconEl) iconEl.textContent = '🕵️';
    if (descEl) descEl.innerHTML = '<strong>Misi 4 (Detektif Grafik &amp; Bias):</strong> Temukan 3 langkah audit ilmiah untuk memperbaiki grafik bersumbu terpotong, sampel bias, dan klaim sebab-akibat palsu!';
    renderM4UI();
  }
}

// --- Misi 1 Render & Actions ---
function renderM1UI() {
  const tbody = document.getElementById('m1-dirty-tbody');
  const inspector = document.getElementById('m1-inspector-body');
  const qPct = document.getElementById('m1-quality-pct');
  const qFill = document.getElementById('m1-quality-fill');
  const cntEl = document.getElementById('m1-cleaned-count');
  if (!tbody || !inspector) return;

  const fixedCount = dataGame.m1.rows.filter(r => r.issue && r.fixed).length;
  const pct = 20 + fixedCount * 20;
  if (qPct) {
    qPct.textContent = `${pct}% (${pct === 100 ? 'Siap Dianalisis ✅' : 'Masih Kotor ⚠️'})`;
    qPct.style.color = pct === 100 ? '#16a34a' : '#d97706';
  }
  if (qFill) qFill.style.width = pct + '%';
  if (cntEl) cntEl.textContent = `${fixedCount} / 4 Masalah Teratasi`;

  tbody.innerHTML = '';
  dataGame.m1.rows.forEach(r => {
    const tr = document.createElement('tr');
    const isDirty = r.issue && !r.fixed;
    const isRemoved = r.fixed && r.fixedVal && r.fixedVal.removed;
    tr.className = (isDirty ? 'dirty-row ' : '') + (dataGame.m1.selectedId === r.id ? 'selected-row ' : '') + (isRemoved ? 'removed-row' : '');
    if (r.issue) tr.onclick = () => selectDirtyRow(r.id);

    const statusBadge = !r.issue
      ? '<span class="fixed-badge">✓ Bersih</span>'
      : (r.fixed
        ? '<span class="fixed-badge">✓ Diperbaiki</span>'
        : '<span class="dirty-badge">⚠️ Periksa</span>');

    tr.innerHTML = `
      <td><strong>${r.no}</strong></td>
      <td>${r.name}</td>
      <td><code>${r.saku}</code></td>
      <td><code>${r.score}</code></td>
      <td>${statusBadge}</td>`;
    tbody.appendChild(tr);
  });

  const selRow = dataGame.m1.rows.find(r => r.id === dataGame.m1.selectedId);
  if (!selRow) {
    if (fixedCount === 4) {
      inspector.innerHTML = `
        <div style="text-align:center;margin:auto 0;">
          <div style="font-size:40px;margin-bottom:6px;">✨</div>
          <strong style="color:#166534;font-size:15px;">Semua Data Sudah Bersih &amp; Terstruktur!</strong>
          <p style="font-size:12.5px;color:#475569;margin-top:6px;">Kualitas data mencapai 100%. Lanjutkan ke Misi 2 untuk mengolah data memakai rumus spreadsheet!</p>
        </div>`;
    } else {
      inspector.innerHTML = `
        <div style="text-align:center;margin:auto 0;">
          <div style="font-size:38px;margin-bottom:6px;">👈</div>
          <strong style="color:#006064;font-size:14.5px;">Pilih Baris Bertanda ⚠️ Merah</strong>
          <p style="font-size:12.5px;color:#475569;margin-top:6px;">Klik salah satu baris bermasalah di tabel kiri untuk melihat diagnosa cacat data dan memilih perbaikannya.</p>
        </div>`;
    }
    return;
  }

  if (selRow.fixed) {
    inspector.innerHTML = `
      <div style="text-align:center;margin:auto 0;">
        <div style="font-size:36px;margin-bottom:6px;">✅</div>
        <strong style="color:#166534;font-size:14px;">Baris #${selRow.no} (${selRow.name}) Sudah Bersih!</strong>
        <p style="font-size:12.5px;color:#475569;margin-top:6px;">Silakan klik baris lain yang masih bertanda ⚠️ merah di sebelah kiri.</p>
      </div>`;
    return;
  }

  let btnsHtml = '';
  selRow.options.forEach((opt, idx) => {
    btnsHtml += `<button class="fix-option-btn" onclick="applyDataFix('${selRow.id}', ${idx})">${opt.text}</button>`;
  });

  inspector.innerHTML = `
    <div>
      <div style="font-size:12px;font-weight:800;color:#b91c1c;margin-bottom:3px;">BARIS #${selRow.no} (${selRow.name})</div>
      <div style="font-size:14px;font-weight:800;color:#0f172a;margin-bottom:4px;">${selRow.title}</div>
      <p style="font-size:12px;color:#475569;line-height:1.4;margin-bottom:8px;">${selRow.desc}</p>
    </div>
    <div>
      <div style="font-size:11.5px;font-weight:800;color:#006064;margin-bottom:5px;">Pilih tindakan pembersihan yang tepat:</div>
      <div class="fix-options-list">${btnsHtml}</div>
    </div>`;
}

function selectDirtyRow(rowId) {
  playSynthSound('click');
  dataGame.m1.selectedId = rowId;
  renderM1UI();
}

function applyDataFix(rowId, optIdx) {
  const row = dataGame.m1.rows.find(r => r.id === rowId);
  if (!row || !row.options[optIdx]) return;
  const opt = row.options[optIdx];

  if (!opt.ok) {
    playSynthSound('error');
    showGameModal({
      icon: '⚠️',
      title: 'Tindakan Kurang Tepat',
      titleClass: 'error',
      text: opt.msg,
      actions: [{ text: 'Coba Lagi', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  row.fixed = true;
  if (row.fixedVal && row.fixedVal.score) row.score = row.fixedVal.score;
  if (row.fixedVal && row.fixedVal.saku) row.saku = row.fixedVal.saku;

  const fixedCount = dataGame.m1.rows.filter(r => r.issue && r.fixed).length;
  updateGameHUD();
  renderM1UI();

  if (fixedCount === 4) {
    dataGame.stars[1] = 1;
    if (dataGame.unlockedLevel < 2) dataGame.unlockedLevel = 2;
    updateGameHUD();
    playSynthSound('level_complete');
    spawnConfetti();
    showGameModal({
      icon: '🧹',
      title: 'Misi 1 Tuntas! Data 100% Bersih!',
      titleClass: 'success',
      stars: '⭐ 1/1 Bintang Diraih',
      text: `${opt.msg}<br><br>Dataset kini bebas dari outlier, duplikat, format teks, dan nilai kosong. Misi 2: Lab Rumus Spreadsheet kini terbuka!`,
      actions: [
        { text: 'Lanjut ke Misi 2 ▶', primary: true, onClick: () => { closeGameModal(); switchGameLevel(2); } },
        { text: 'Tutup', primary: false, onClick: closeGameModal }
      ]
    });
  } else {
    playSynthSound('success');
  }
}

// --- Misi 2 Render & Actions ---
function renderM2UI() {
  const tbody = document.getElementById('m2-excel-tbody');
  const goalEl = document.getElementById('m2-challenge-goal');
  const progEl = document.getElementById('m2-progress-label');
  const fnBox = document.getElementById('m2-fn-chips');
  const rngBox = document.getElementById('m2-range-chips');
  const prevBar = document.getElementById('m2-formula-preview');
  const resBar = document.getElementById('m2-formula-result');
  if (!tbody) return;

  for (let i = 1; i <= 3; i++) {
    const b = document.getElementById('btn-fch-' + i);
    if (b) {
      b.classList.toggle('active', i === dataGame.m2.challengeIdx);
      b.classList.toggle('done', !!dataGame.m2.completed[i]);
    }
  }

  const ch = dataGame.m2.challenges.find(c => c.id === dataGame.m2.challengeIdx);
  if (goalEl && ch) goalEl.innerHTML = ch.goal;
  const doneCnt = Object.values(dataGame.m2.completed).filter(Boolean).length;
  if (progEl) progEl.textContent = `${doneCnt} / 3 Tugas Selesai`;

  const arg = dataGame.m2.selectedArg;
  const hlCol = arg.startsWith('D') ? 'd' : (arg.startsWith('B') ? 'b' : 'c');

  tbody.innerHTML = '';
  dataGame.m2.sheetRows.forEach(r => {
    const tr = document.createElement('tr');
    if (r.isHeader) {
      tr.innerHTML = `<td class="row-hdr">${r.row}</td><td><strong>${r.a}</strong></td><td><strong>${r.b}</strong></td><td><strong>${r.c}</strong></td><td><strong>${r.d}</strong></td>`;
    } else {
      tr.innerHTML = `
        <td class="row-hdr">${r.row}</td>
        <td>${r.a}</td>
        <td class="${hlCol === 'b' ? 'cell-range-hl' : ''}">${r.b}</td>
        <td class="${hlCol === 'c' ? 'cell-range-hl' : ''}" style="font-family:monospace;text-align:right;">${r.c}</td>
        <td class="${hlCol === 'd' ? 'cell-range-hl' : ''}" style="font-family:monospace;text-align:right;">${r.d}</td>`;
    }
    tbody.appendChild(tr);
  });

  if (fnBox) {
    const fns = ['SUM', 'AVERAGE', 'MAX', 'COUNTIF'];
    fnBox.innerHTML = fns.map(f => `<button class="formula-chip ${dataGame.m2.selectedFn === f ? 'selected' : ''}" onclick="pickFormulaFn('${f}')">${f}</button>`).join('');
  }
  if (rngBox) {
    const args = ['C2:C6', 'D2:D6', 'B2:B6', 'C2:C6, ">=40"'];
    rngBox.innerHTML = args.map(a => `<button class="formula-chip ${dataGame.m2.selectedArg === a ? 'selected' : ''}" onclick='pickFormulaRange(${JSON.stringify(a)})'>(${a})</button>`).join('');
  }

  const expr = `=${dataGame.m2.selectedFn}(${dataGame.m2.selectedArg})`;
  if (prevBar) prevBar.textContent = expr;
  if (resBar) resBar.textContent = computeM2Preview(dataGame.m2.selectedFn, dataGame.m2.selectedArg);
}

function computeM2Preview(fn, arg) {
  const cVals = [35, 42, 48, 30, 50];
  const dVals = [175000, 210000, 240000, 150000, 250000];
  if (arg === 'B2:B6') return fn === 'COUNTIF' ? '#SYNTAX!' : '= 0 (Teks)';
  if (fn === 'COUNTIF') {
    if (arg === 'C2:C6, ">=40"') return '= 3 hari';
    return '#KURANG SYARAT!';
  }
  if (arg === 'C2:C6, ">=40"') return '#ARGUMEN SALAH!';
  const arr = arg === 'D2:D6' ? dVals : cVals;
  if (fn === 'SUM') return arg === 'D2:D6' ? '= 1.025.000' : '= 205 porsi';
  if (fn === 'AVERAGE') return arg === 'D2:D6' ? '= Rp 205.000' : '= 41 porsi';
  if (fn === 'MAX') return arg === 'D2:D6' ? '= 250.000' : '= 50 porsi';
  return '= ' + arr.length;
}

function switchFormulaChallenge(idx) {
  playSynthSound('click');
  dataGame.m2.challengeIdx = idx;
  renderM2UI();
}

function pickFormulaFn(fn) {
  playSynthSound('click');
  dataGame.m2.selectedFn = fn;
  renderM2UI();
}

function pickFormulaRange(arg) {
  playSynthSound('click');
  dataGame.m2.selectedArg = arg;
  renderM2UI();
}

function verifyFormulaSolution() {
  const ch = dataGame.m2.challenges.find(c => c.id === dataGame.m2.challengeIdx);
  if (!ch) return;

  if (dataGame.m2.selectedFn === ch.reqFn && dataGame.m2.selectedArg === ch.reqArg) {
    dataGame.m2.completed[ch.id] = true;
    const doneCnt = Object.values(dataGame.m2.completed).filter(Boolean).length;
    updateGameHUD();
    renderM2UI();

    if (doneCnt === 3) {
      dataGame.stars[2] = 1;
      if (dataGame.unlockedLevel < 3) dataGame.unlockedLevel = 3;
      updateGameHUD();
      playSynthSound('level_complete');
      spawnConfetti();
      showGameModal({
        icon: '🧮',
        title: 'Misi 2 Tuntas! Ahli Rumus Spreadsheet!',
        titleClass: 'success',
        stars: '⭐ 1/1 Bintang Diraih',
        text: 'Ketiga rumus analisis penjualan (<code>SUM</code>, <code>AVERAGE</code>, dan <code>COUNTIF</code>) berhasil kamu susun tepat! Misi 3: Studio Pilih Grafik kini terbuka.',
        actions: [
          { text: 'Lanjut ke Misi 3 ▶', primary: true, onClick: () => { closeGameModal(); switchGameLevel(3); } },
          { text: 'Tutup', primary: false, onClick: closeGameModal }
        ]
      });
    } else {
      playSynthSound('success');
      const nextTodo = [1, 2, 3].find(k => !dataGame.m2.completed[k]);
      showGameModal({
        icon: '✅',
        title: `Tugas ${ch.id} Benar! (${ch.expectedText})`,
        titleClass: 'success',
        text: `Rumus <code>=${ch.reqFn}(${ch.reqArg})</code> tepat sekali! Masih ada ${3 - doneCnt} tugas rumus lagi untuk meraih bintang Misi 2.`,
        actions: [{
          text: `Lanjut Tugas ${nextTodo} ▶`,
          primary: true,
          onClick: () => { closeGameModal(); switchFormulaChallenge(nextTodo); }
        }]
      });
    }
  } else {
    playSynthSound('error');
    showGameModal({
      icon: '🔍',
      title: 'Rumus Belum Sesuai Target',
      titleClass: 'error',
      text: `Periksa kembali pilihan fungsi dan kolom target:<br><code>${ch.goal}</code>`,
      actions: [{ text: 'Perbaiki Rumus', primary: true, onClick: closeGameModal }]
    });
  }
}

// --- Misi 3 Render & Actions ---
function renderM3UI() {
  const caseBox = document.getElementById('m3-case-box');
  const progEl = document.getElementById('m3-progress-label');
  const previewEl = document.getElementById('m3-chart-preview');
  const badgeEl = document.getElementById('m3-preview-badge');
  const fbEl = document.getElementById('m3-case-feedback');

  for (let i = 1; i <= 3; i++) {
    const b = document.getElementById('btn-cch-' + i);
    if (b) {
      b.classList.toggle('active', i === dataGame.m3.caseIdx);
      b.classList.toggle('done', !!dataGame.m3.completed[i]);
    }
  }

  const c = dataGame.m3.cases.find(x => x.id === dataGame.m3.caseIdx);
  if (caseBox && c) caseBox.innerHTML = `<strong>${c.title}</strong><br>${c.desc}`;
  const doneCnt = Object.values(dataGame.m3.completed).filter(Boolean).length;
  if (progEl) progEl.textContent = `${doneCnt} / 3 Kasus Selesai`;

  ['bar', 'line', 'pie', 'scatter'].forEach(t => {
    const btn = document.getElementById('btn-ctype-' + t);
    if (!btn) return;
    btn.classList.remove('selected', 'correct', 'wrong');
    if (dataGame.m3.lastChoice === t) {
      btn.classList.add(c && t === c.correct ? 'correct' : 'wrong');
    } else if (c && dataGame.m3.completed[c.id] && t === c.correct) {
      btn.classList.add('correct');
    }
  });

  if (previewEl) {
    const renderType = dataGame.m3.lastChoice || (c && dataGame.m3.completed[c.id] ? c.correct : null);
    if (!renderType) {
      previewEl.innerHTML = `<div style="text-align:center;color:#64748b;"><div style="font-size:38px;margin-bottom:6px;">📊</div><div style="font-size:13px;font-weight:700;">Klik salah satu jenis grafik di kiri untuk menampilkannya secara langsung</div></div>`;
      if (badgeEl) badgeEl.textContent = 'Menunggu Pilihan';
      if (fbEl) fbEl.textContent = 'Pilih jenis grafik yang paling mudah dibaca untuk kasus di atas.';
    } else {
      previewEl.innerHTML = buildM3ChartSVG(renderType, c.id);
    }
  }
}

function buildM3ChartSVG(type, caseId) {
  if (type === 'line') {
    return `<svg viewBox="0 0 360 190" width="100%" height="180" aria-label="Pratinjau Line Chart">
      <line x1="40" y1="20" x2="40" y2="155" stroke="#64748b" stroke-width="2"/>
      <line x1="40" y1="155" x2="335" y2="155" stroke="#64748b" stroke-width="2"/>
      <text x="34" y="158" text-anchor="end" font-size="10" fill="#64748b">0</text>
      <text x="34" y="90" text-anchor="end" font-size="10" fill="#64748b">120</text>
      <text x="34" y="30" text-anchor="end" font-size="10" fill="#64748b">220</text>
      <polyline points="70,105 118,90 166,76 214,82 262,55 310,38" fill="none" stroke="#0288D1" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="70" cy="105" r="4.5" fill="#00ACC1"/><circle cx="118" cy="90" r="4.5" fill="#00ACC1"/>
      <circle cx="166" cy="76" r="4.5" fill="#00ACC1"/><circle cx="214" cy="82" r="4.5" fill="#00ACC1"/>
      <circle cx="262" cy="55" r="4.5" fill="#00ACC1"/><circle cx="310" cy="38" r="5" fill="#16a34a"/>
      <text x="70" y="172" text-anchor="middle" font-size="10" fill="#334155">Jan</text>
      <text x="118" y="172" text-anchor="middle" font-size="10" fill="#334155">Feb</text>
      <text x="166" y="172" text-anchor="middle" font-size="10" fill="#334155">Mar</text>
      <text x="214" y="172" text-anchor="middle" font-size="10" fill="#334155">Apr</text>
      <text x="262" y="172" text-anchor="middle" font-size="10" fill="#334155">Mei</text>
      <text x="310" y="172" text-anchor="middle" font-size="10" fill="#334155">Jun</text>
    </svg>`;
  }
  if (type === 'pie') {
    return `<svg viewBox="0 0 360 190" width="100%" height="180" aria-label="Pratinjau Pie Chart">
      <circle cx="120" cy="96" r="68" fill="#00ACC1"/>
      <path d="M120,96 L120,28 A68,68 0 0,1 184,74 Z" fill="#0288D1"/>
      <path d="M120,96 L184,74 A68,68 0 0,1 168,144 Z" fill="#f59e0b"/>
      <path d="M120,96 L168,144 A68,68 0 0,1 102,162 Z" fill="#8b5cf6"/>
      <rect x="218" y="42" width="12" height="12" rx="3" fill="#00ACC1"/><text x="236" y="52" font-size="11.5" font-weight="700" fill="#0f172a">Pramuka 40%</text>
      <rect x="218" y="68" width="12" height="12" rx="3" fill="#0288D1"/><text x="236" y="78" font-size="11.5" font-weight="700" fill="#0f172a">Futsal 25%</text>
      <rect x="218" y="94" width="12" height="12" rx="3" fill="#f59e0b"/><text x="236" y="104" font-size="11.5" font-weight="700" fill="#0f172a">PMR 20%</text>
      <rect x="218" y="120" width="12" height="12" rx="3" fill="#8b5cf6"/><text x="236" y="130" font-size="11.5" font-weight="700" fill="#0f172a">Coding 15%</text>
    </svg>`;
  }
  if (type === 'bar') {
    const lbls = caseId === 3 ? ['8A (78)', '8B (86)', '8C (81)', '8D (89)'] : ['Kat 1', 'Kat 2', 'Kat 3', 'Kat 4'];
    return `<svg viewBox="0 0 360 190" width="100%" height="180" aria-label="Pratinjau Bar Chart">
      <line x1="42" y1="20" x2="42" y2="154" stroke="#64748b" stroke-width="2"/>
      <line x1="42" y1="154" x2="335" y2="154" stroke="#64748b" stroke-width="2"/>
      <text x="35" y="158" text-anchor="end" font-size="10" fill="#64748b">0</text>
      <text x="35" y="90" text-anchor="end" font-size="10" fill="#64748b">50</text>
      <text x="35" y="28" text-anchor="end" font-size="10" fill="#64748b">100</text>
      <rect x="68" y="54" width="42" height="100" rx="5" fill="#38bdf8"/><text x="89" y="172" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">${lbls[0]}</text>
      <rect x="134" y="42" width="42" height="112" rx="5" fill="#00ACC1"/><text x="155" y="172" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">${lbls[1]}</text>
      <rect x="200" y="49" width="42" height="105" rx="5" fill="#f59e0b"/><text x="221" y="172" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">${lbls[2]}</text>
      <rect x="266" y="38" width="42" height="116" rx="5" fill="#10b981"/><text x="287" y="172" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">${lbls[3]}</text>
    </svg>`;
  }
  return `<svg viewBox="0 0 360 190" width="100%" height="180" aria-label="Pratinjau Scatter Plot">
    <line x1="42" y1="20" x2="42" y2="154" stroke="#64748b" stroke-width="2"/>
    <line x1="42" y1="154" x2="335" y2="154" stroke="#64748b" stroke-width="2"/>
    <circle cx="80" cy="128" r="5" fill="#7c3aed"/><circle cx="120" cy="108" r="5" fill="#7c3aed"/>
    <circle cx="165" cy="95" r="5" fill="#7c3aed"/><circle cx="215" cy="70" r="5" fill="#7c3aed"/>
    <circle cx="265" cy="54" r="5" fill="#7c3aed"/><circle cx="305" cy="40" r="5" fill="#7c3aed"/>
    <text x="190" y="175" text-anchor="middle" font-size="10.5" fill="#64748b">Diagram Pencar (2 Variabel Numerik)</text>
  </svg>`;
}

function switchChartCase(idx) {
  playSynthSound('click');
  dataGame.m3.caseIdx = idx;
  dataGame.m3.lastChoice = null;
  renderM3UI();
}

function chooseChartType(type) {
  const c = dataGame.m3.cases.find(x => x.id === dataGame.m3.caseIdx);
  if (!c) return;
  dataGame.m3.lastChoice = type;
  renderM3UI();

  const badgeEl = document.getElementById('m3-preview-badge');
  const fbEl = document.getElementById('m3-case-feedback');

  if (type === c.correct) {
    dataGame.m3.completed[c.id] = true;
    const doneCnt = Object.values(dataGame.m3.completed).filter(Boolean).length;
    updateGameHUD();
    renderM3UI();
    if (badgeEl) badgeEl.textContent = '✅ Pilihan Tepat!';
    if (fbEl) fbEl.innerHTML = `<span style="color:#166534;">${c.okMsg}</span>`;

    if (doneCnt === 3) {
      dataGame.stars[3] = 1;
      if (dataGame.unlockedLevel < 4) dataGame.unlockedLevel = 4;
      updateGameHUD();
      playSynthSound('level_complete');
      spawnConfetti();
      showGameModal({
        icon: '🎨',
        title: 'Misi 3 Tuntas! Desainer Visualisasi Hebat!',
        titleClass: 'success',
        stars: '⭐ 1/1 Bintang Diraih',
        text: 'Kamu mampu memilih <em>Line Chart</em>, <em>Pie Chart</em>, dan <em>Bar Chart</em> sesuai cerita datanya! Misi terakhir (Misi 4: Detektif Bias) kini terbuka.',
        actions: [
          { text: 'Lanjut ke Misi 4 ▶', primary: true, onClick: () => { closeGameModal(); switchGameLevel(4); } },
          { text: 'Tutup', primary: false, onClick: closeGameModal }
        ]
      });
    } else {
      playSynthSound('success');
    }
  } else {
    playSynthSound('error');
    if (badgeEl) badgeEl.textContent = '⚠️ Kurang Cocok';
    if (fbEl) fbEl.innerHTML = '<span style="color:#b91c1c;">Jenis grafik ini kurang cocok untuk tujuan kasus tersebut. Coba bandingkan fungsi masing-masing grafik!</span>';
  }
}

// --- Misi 4 Render & Actions ---
function renderM4UI() {
  const chartBox = document.getElementById('m4-audit-chart-box');
  const repAxis = document.getElementById('m4-rep-axis');
  const repSample = document.getElementById('m4-rep-sample');
  const repClaim = document.getElementById('m4-rep-claim');
  const solved = dataGame.stars[4] === 1;

  for (let i = 0; i < 6; i++) {
    const btn = document.getElementById('btn-m4-act-' + i);
    if (btn) btn.classList.toggle('selected', dataGame.m4.selectedActions.includes(i));
  }

  if (chartBox) {
    if (!solved) {
      chartBox.innerHTML = `
        <svg viewBox="0 0 320 155" width="100%" height="155" aria-label="Grafik Audit Bermasalah">
          <text x="170" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#dc2626">⚠️ Sumbu Terpotong (78–90) + Sampel n=5</text>
          <line x1="42" y1="26" x2="42" y2="128" stroke="#64748b" stroke-width="2"/>
          <line x1="42" y1="128" x2="300" y2="128" stroke="#64748b" stroke-width="2"/>
          <text x="35" y="131" text-anchor="end" font-size="10" font-weight="800" fill="#dc2626">78</text>
          <text x="35" y="80" text-anchor="end" font-size="10" fill="#64748b">84</text>
          <text x="35" y="32" text-anchor="end" font-size="10" fill="#64748b">90</text>
          <rect x="92" y="111" width="54" height="17" rx="4" fill="#94a3b8"/>
          <text x="119" y="106" text-anchor="middle" font-size="10.5" font-weight="700" fill="#475569">80</text>
          <text x="119" y="144" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">Cat Lama</text>
          <rect x="198" y="60" width="54" height="68" rx="4" fill="#ef4444"/>
          <text x="225" y="55" text-anchor="middle" font-size="10.5" font-weight="800" fill="#b91c1c">86</text>
          <text x="225" y="144" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">Cat Baru</text>
        </svg>`;
    } else {
      chartBox.innerHTML = `
        <svg viewBox="0 0 320 155" width="100%" height="155" aria-label="Grafik Audit Sudah Jujur">
          <text x="170" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="#166534">✅ Laporan Terkoreksi (Sumbu 0–100 + Sampel Acak)</text>
          <line x1="42" y1="26" x2="42" y2="128" stroke="#64748b" stroke-width="2"/>
          <line x1="42" y1="128" x2="300" y2="128" stroke="#64748b" stroke-width="2"/>
          <text x="35" y="131" text-anchor="end" font-size="10" font-weight="800" fill="#16a34a">0</text>
          <text x="35" y="80" text-anchor="end" font-size="10" fill="#64748b">50</text>
          <text x="35" y="32" text-anchor="end" font-size="10" fill="#64748b">100</text>
          <rect x="92" y="46" width="54" height="82" rx="4" fill="#38bdf8"/>
          <text x="119" y="41" text-anchor="middle" font-size="10.5" font-weight="800" fill="#0369a1">80</text>
          <text x="119" y="144" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">Sebelum</text>
          <rect x="198" y="40" width="54" height="88" rx="4" fill="#10b981"/>
          <text x="225" y="35" text-anchor="middle" font-size="10.5" font-weight="800" fill="#166534">86</text>
          <text x="225" y="144" text-anchor="middle" font-size="10.5" font-weight="700" fill="#334155">Sesudah</text>
        </svg>`;
    }
  }

  if (repAxis) {
    repAxis.textContent = solved ? 'Jujur (0 – 100) ✅' : 'Terpotong (78 – 90) ⚠️';
    repAxis.style.color = solved ? '#16a34a' : '#dc2626';
  }
  if (repSample) {
    repSample.textContent = solved ? 'Sampel Acak Semua Kelas ✅' : '5 Anggota Klub Literasi ⚠️';
    repSample.style.color = solved ? '#16a34a' : '#dc2626';
  }
  if (repClaim) {
    repClaim.textContent = solved ? 'Korelasi Diuji Ulang ✅' : 'Warna Cat Dinding (Kausalitas Palsu) ⚠️';
    repClaim.style.color = solved ? '#16a34a' : '#dc2626';
  }
}

function toggleAuditAction(idx) {
  playSynthSound('click');
  const pos = dataGame.m4.selectedActions.indexOf(idx);
  if (pos === -1) dataGame.m4.selectedActions.push(idx);
  else dataGame.m4.selectedActions.splice(pos, 1);

  const btn = document.getElementById('btn-m4-act-' + idx);
  if (btn) btn.classList.toggle('selected', dataGame.m4.selectedActions.includes(idx));
}

function executeAuditFix() {
  const chosen = [...dataGame.m4.selectedActions].sort((a, b) => a - b);
  const target = [0, 1, 2];
  const isCorrect = chosen.length === target.length && chosen.every((v, i) => v === target[i]);

  const fb = document.getElementById('m4-feedback-text');

  if (!isCorrect) {
    playSynthSound('error');
    if (fb) {
      fb.textContent = 'Belum tepat! Pastikan hanya mencentang 3 langkah audit ilmiah (tanpa manipulasi/cherry picking).';
      fb.style.color = '#dc2626';
    }
    showGameModal({
      icon: '🧐',
      title: 'Audit Masih Perlu Ketelitian',
      titleClass: 'error',
      text: 'Cermati kembali 3 masalah pada laporan: <strong>skala sumbu Y terpotong</strong>, <strong>sampel hanya 5 anak satu klub</strong>, dan <strong>klaim sebab-akibat palsu</strong>. Hindari tindakan kosmetik atau membuang data!',
      actions: [{ text: 'Periksa Lagi', primary: true, onClick: closeGameModal }]
    });
    return;
  }

  dataGame.stars[4] = 1;
  updateGameHUD();
  renderM4UI();
  if (fb) {
    fb.textContent = 'Audit berhasil! Laporan visual kini jujur dan mewakili populasi sekolah.';
    fb.style.color = '#16a34a';
  }
  playSynthSound('victory');
  spawnConfetti();
  showGameModal({
    icon: '🏆',
    title: 'SELAMAT! Detektif Data Sejati!',
    titleClass: 'victory',
    stars: '⭐ 4/4 Bintang Lab Terkumpul!',
    text: 'Kamu telah mengaudit grafik menyesatkan, mengatasi Selection Bias, dan meluruskan kesalahan kausalitas!<br><br>Yuk lanjut ke <strong>Latihan Evaluasi</strong> untuk menguji seluruh pemahamanmu.',
    actions: [
      { text: 'Ke Latihan Evaluasi ▶', primary: true, onClick: () => { closeGameModal(); goToPage('latihan-intro'); } },
      { text: 'Tetap di Lab', primary: false, onClick: closeGameModal }
    ]
  });
}

function resetCurrentGameLevel() {
  playSynthSound('click');
  const lvl = dataGame.currentLevel;
  if (lvl === 1) {
    dataGame.m1.selectedId = null;
    dataGame.m1.rows.forEach(r => {
      if (r.issue === 'outlier') { r.fixed = false; r.score = '150'; }
      if (r.issue === 'dup') { r.fixed = false; }
      if (r.issue === 'fmt') { r.fixed = false; r.saku = '"Rp 5.000"'; }
      if (r.issue === 'empty') { r.fixed = false; r.score = '(kosong)'; }
    });
    dataGame.stars[1] = 0;
  } else if (lvl === 2) {
    dataGame.m2.completed = { 1: false, 2: false, 3: false };
    dataGame.m2.challengeIdx = 1;
    dataGame.m2.selectedFn = 'SUM';
    dataGame.m2.selectedArg = 'C2:C6';
    dataGame.stars[2] = 0;
  } else if (lvl === 3) {
    dataGame.m3.completed = { 1: false, 2: false, 3: false };
    dataGame.m3.caseIdx = 1;
    dataGame.m3.lastChoice = null;
    dataGame.stars[3] = 0;
  } else if (lvl === 4) {
    dataGame.m4.selectedActions = [];
    dataGame.stars[4] = 0;
  }
  updateGameHUD();
  renderCurrentStageUI();
}

function showGameHint() {
  playSynthSound('click');
  const lvl = dataGame.currentLevel;
  const hints = {
    1: 'Klik 4 baris bertanda ⚠️ merah di tabel kiri: skor mustahil 150 (Bima), baris ganda Citra, teks "Rp 5.000" (Deni), dan sel kosong Eka.',
    2: 'Tugas 1: SUM(C2:C6). Tugas 2: AVERAGE(D2:D6). Tugas 3: COUNTIF(C2:C6, ">=40").',
    3: 'Tren waktu ➔ Line Chart. Proporsi 100% ➔ Pie Chart. Perbandingan antar kelas ➔ Bar Chart.',
    4: 'Pilih 3 langkah ilmiah: Sumbu Y dari nol (0–100), perluas sampel acak semua kelas, dan koreksi klaim kausalitas palsu.'
  };
  showGameModal({
    icon: '💡',
    title: `Bantuan Misi ${lvl}`,
    text: hints[lvl] || '',
    actions: [{ text: 'Siap Lanjut', primary: true, onClick: closeGameModal }]
  });
}

function showGameModal(config) {
  const modal = document.getElementById('game-modal');
  const card = document.getElementById('game-modal-card');
  if (!modal || !card) return;

  let actionsHTML = '';
  if (config.actions && config.actions.length > 0) {
    config.actions.forEach((act, idx) => {
      actionsHTML += `<button class="btn ${act.primary ? 'btn-primary' : 'btn-secondary'}" id="modal-act-${idx}" style="font-size:14px;padding:8px 18px;border-radius:8px;">${act.text}</button>`;
    });
  } else {
    actionsHTML = `<button class="btn btn-primary" onclick="closeGameModal()">Tutup</button>`;
  }

  card.innerHTML = `
    <div class="gm-icon" style="font-size:46px;margin-bottom:8px;">${config.icon || '🎯'}</div>
    <h3 class="gm-title ${config.titleClass || 'success'}" style="font-size:21px;margin-bottom:8px;">${config.title || ''}</h3>
    <p class="gm-text" style="font-size:14.5px;line-height:1.5;margin-bottom:14px;color:#334155;">${config.text || ''}</p>
    ${config.stars ? `<div class="gm-stars-row" style="font-size:17px;font-weight:800;color:#00ACC1;margin-bottom:14px;">${config.stars}</div>` : ''}
    <div class="gm-actions" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">${actionsHTML}</div>`;

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
  for (let i = 0; i < 65; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 1.3 + 's';
    piece.style.animationDuration = (2.0 + Math.random() * 1.8) + 's';
    piece.style.width = (8 + Math.random() * 8) + 'px';
    piece.style.height = (8 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4200);
  }
}

// ==================== EVALUATION (PAGE 15 — 25 POIN) ====================

const EVAL_ANSWERS = {
  A1: 'B', A2: 'C', A3: 'B', A4: 'B', A5: 'C',
  A6: 'B', A7: 'C', A8: 'C', A9: 'C', A10: 'B',
  B1: 'benar', B2: 'salah', B3: 'benar', B4: 'salah', B5: 'benar'
};

const EVAL_EXPLANATIONS = {
  A1: 'Data adalah angka/fakta mentah sebelum diberi konteks dan satuan.',
  A2: 'Berat badan (48,5 kg) diukur memakai timbangan dan dapat bernilai desimal (Kuantitatif Kontinu).',
  A3: 'COUNTIF(rentang, kriteria) menghitung jumlah sel yang memenuhi syarat >=80.',
  A4: 'Data kotor (duplikat/outlier mustahil) wajib dibersihkan dahulu (Data Cleaning).',
  A5: 'Line Chart paling efektif menggambarkan perubahan tren berurutan berdasarkan waktu.',
  A6: 'Memotong sumbu Y di atas nol membuat perbedaan kecil tampak berlipat ganda secara visual.',
  A7: 'Pada data terurut [70, 75, 80, 90, 95], nilai tengah (urutan ke-3) adalah 80.',
  A8: 'Korelasi tidak otomatis kausalitas; musim hujan memengaruhi kedua kejadian sekaligus.',
  A9: 'Memilih sampel hanya dari 1 klub kecil tidak mewakili 900 siswa (Selection Bias).',
  A10: 'Analis data wajib melindungi anonimitas responden dan menyampaikan temuan secara jujur.',
  B1: 'Benar — rumus spreadsheet selalu diawali tanda sama dengan (=).',
  B2: 'Salah — Pie Chart sebaiknya hanya memuat maksimal 5–6 kategori agar mudah dibaca.',
  B3: 'Benar — Median tidak ikut tertarik oleh satu nilai ekstrem yang sangat besar/kecil.',
  B4: 'Salah — Korelasi hanya menunjukkan keterkaitan pola, belum tentu sebab-akibat langsung.',
  B5: 'Benar — Data primer diambil sendiri langsung melalui survei, observasi, atau wawancara.'
};

const MATCH_LEFT_DATA = [
  { id: '1', text: 'Data Sekunder' },
  { id: '2', text: 'Modus' },
  { id: '3', text: 'Scatter Plot' },
  { id: '4', text: 'Confirmation Bias' },
  { id: '5', text: 'Fungsi =MIN()' }
];

const MATCH_RIGHT_DATA = [
  { id: 'a', text: 'Kecenderungan hanya mencari data yang sesuai dugaan awal pribadi' },
  { id: 'b', text: 'Data yang diperoleh dari arsip pihak lain, seperti laporan BPS atau WHO' },
  { id: 'c', text: 'Rumus spreadsheet untuk menemukan angka terkecil pada rentang sel' },
  { id: 'd', text: 'Nilai atau kategori yang paling sering muncul dalam kumpulan data' },
  { id: 'e', text: 'Diagram titik untuk mengamati korelasi antara dua variabel angka' }
];

const MATCH_ANSWERS = { '1': 'b', '2': 'd', '3': 'e', '4': 'a', '5': 'c' };

const SEQ_CORRECT_ORDER = [
  'Menentukan pertanyaan atau masalah nyata yang ingin dijawab dengan data',
  'Merancang instrumen & mengumpulkan data yang mewakili secara etis',
  'Membersihkan data kotor serta mengolahnya dengan rumus spreadsheet',
  'Membuat visualisasi grafik yang jujur dan menghitung statistik deskriptif',
  'Menginterpretasi temuan, mewaspadai bias, dan menyimpulkan keputusan'
];

const MATCH_PAIR_THEMES = {
  '1': { color: '#00838f', bg: '#e0f7fa', border: '#00acc1', label: '1' },
  '2': { color: '#e65100', bg: '#fff3e0', border: '#ff9800', label: '2' },
  '3': { color: '#6a1b9a', bg: '#f3e5f5', border: '#ab47bc', label: '3' },
  '4': { color: '#2e7d32', bg: '#e8f5e9', border: '#4caf50', label: '4' },
  '5': { color: '#c2185b', bg: '#fce4ec', border: '#e91e63', label: '5' }
};

let evalUserAnswers = {};
let matchState = { selectedLeft: null, pairs: {} };
let evalSectionInited = { C: false, D: false };
let currentShuffledRight = null;

function startEval() {
  evalUserAnswers = {};
  matchState = { selectedLeft: null, pairs: {} };
  evalSectionInited = { C: false, D: false };
  currentShuffledRight = null;

  document.querySelectorAll('#eval-section-A .mcq-option').forEach(o => o.classList.remove('selected'));
  document.querySelectorAll('#eval-section-B .tf-btn').forEach(b => b.classList.remove('selected-benar', 'selected-salah'));

  ['match-left', 'match-right', 'match-svg-layer', 'seq-list', 'recap-card'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });

  const recapSection = document.getElementById('eval-section-recap');
  if (recapSection) recapSection.classList.remove('active');
  document.querySelectorAll('.eval-progress .step').forEach(s => s.classList.remove('active', 'done'));

  nextEvalSection('A');
}

function nextEvalSection(sectionId) {
  playSynthSound('click');
  document.querySelectorAll('.eval-section').forEach(s => s.classList.remove('active'));
  const section = document.getElementById('eval-section-' + sectionId);
  if (section) section.classList.add('active');

  const steps = ['A', 'B', 'C', 'D'];
  document.querySelectorAll('.eval-progress .step').forEach(s => {
    s.classList.remove('active', 'done');
    const stepIdx = steps.indexOf(s.dataset.step);
    const currentIdx = steps.indexOf(sectionId);
    if (stepIdx < currentIdx) s.classList.add('done');
    if (stepIdx === currentIdx) s.classList.add('active');
  });

  if (sectionId === 'C') {
    if (!evalSectionInited.C) initMatchSection();
    else setTimeout(drawMatchLines, 50);
  }
  if (sectionId === 'D' && !evalSectionInited.D) initSeqSection();

  const evalBox = document.getElementById('eval-box');
  if (evalBox) {
    evalBox.scrollTop = 0;
    const scrollHint = document.getElementById('eval-floating-scroll-hint');
    if (scrollHint) scrollHint.classList.toggle('hidden', sectionId !== 'A');
  }
}

function scrollEvalBoxDown() {
  const evalBox = document.getElementById('eval-box');
  if (evalBox) evalBox.scrollBy({ top: 380, behavior: 'smooth' });
}

function selectMCQ(el) {
  playSynthSound('click');
  const q = el.closest('.mcq-question');
  q.querySelectorAll('.mcq-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  evalUserAnswers[q.dataset.q] = el.dataset.val;
}

function selectTF(el) {
  playSynthSound('click');
  const q = el.closest('.tf-question');
  q.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('selected-benar', 'selected-salah'));
  el.classList.add(el.dataset.val === 'benar' ? 'selected-benar' : 'selected-salah');
  evalUserAnswers[q.dataset.q] = el.dataset.val;
}

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
    el.onclick = (e) => {
      if (e.target.closest('.match-unpair-btn')) {
        e.stopPropagation();
        unpairMatchItem(item.id);
        return;
      }
      onMatchClick('left', item.id);
    };
    leftCol.appendChild(el);
  });

  currentShuffledRight.forEach(item => {
    const el = document.createElement('div');
    el.className = 'match-item';
    el.id = `match-right-${item.id}`;
    el.onclick = (e) => {
      if (e.target.closest('.match-unpair-btn')) {
        e.stopPropagation();
        const pairedLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === item.id);
        if (pairedLeft) unpairMatchItem(pairedLeft);
        return;
      }
      onMatchClick('right', item.id);
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
    const theme = MATCH_PAIR_THEMES[item.id];

    el.className = 'match-item' + (isSelected ? ' selected' : '') + (pairedRight ? ' matched' : '');
    if (pairedRight) {
      el.style.setProperty('--pair-color', theme.color);
      el.style.setProperty('--pair-bg', theme.bg);
      el.style.setProperty('--pair-border', theme.border);
      el.innerHTML = `<div class="match-item-content"><span>${item.id}. ${item.text}</span></div><span class="match-badge">🔗 #${theme.label} <span class="match-unpair-btn" title="Batalkan">✕</span></span><span class="match-anchor-dot"></span>`;
    } else {
      el.removeAttribute('style');
      el.innerHTML = `<div class="match-item-content"><span>${item.id}. ${item.text}</span></div><span class="match-anchor-dot"></span>`;
    }
  });

  if (currentShuffledRight) {
    currentShuffledRight.forEach(item => {
      const el = document.getElementById(`match-right-${item.id}`);
      if (!el) return;
      const pairedLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === item.id);
      const theme = pairedLeft ? MATCH_PAIR_THEMES[pairedLeft] : null;

      el.className = 'match-item' + (pairedLeft ? ' matched' : '');
      if (pairedLeft && theme) {
        el.style.setProperty('--pair-color', theme.color);
        el.style.setProperty('--pair-bg', theme.bg);
        el.style.setProperty('--pair-border', theme.border);
        el.innerHTML = `<span class="match-anchor-dot"></span><span class="match-badge">🔗 #${theme.label} <span class="match-unpair-btn" title="Batalkan">✕</span></span><div class="match-item-content"><span>${item.text}</span></div>`;
      } else {
        el.removeAttribute('style');
        el.innerHTML = `<span class="match-anchor-dot"></span><div class="match-item-content"><span>${item.text}</span></div>`;
      }
    });
  }

  setTimeout(drawMatchLines, 20);
}

function onMatchClick(side, id) {
  if (side === 'left') {
    if (matchState.pairs[id]) {
      delete matchState.pairs[id];
      matchState.selectedLeft = id;
      playSynthSound('click');
      renderMatchUI();
      return;
    }
    matchState.selectedLeft = (matchState.selectedLeft === id) ? null : id;
    playSynthSound('click');
    renderMatchUI();
  } else {
    if (matchState.selectedLeft !== null) {
      const leftId = matchState.selectedLeft;
      const existingLeft = Object.keys(matchState.pairs).find(k => matchState.pairs[k] === id);
      if (existingLeft && existingLeft !== leftId) delete matchState.pairs[existingLeft];
      matchState.pairs[leftId] = id;
      matchState.selectedLeft = null;
      playSynthSound('packet_arrive');
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

  const scaleX = container.offsetWidth > 0 ? (containerRect.width / container.offsetWidth) : 1;
  const scaleY = container.offsetHeight > 0 ? (containerRect.height / container.offsetHeight) : 1;

  Object.entries(matchState.pairs).forEach(([leftId, rightId]) => {
    const leftEl = document.getElementById(`match-left-${leftId}`);
    const rightEl = document.getElementById(`match-right-${rightId}`);
    if (!leftEl || !rightEl) return;

    const lr = leftEl.getBoundingClientRect();
    const rr = rightEl.getBoundingClientRect();
    const x1 = (lr.right - containerRect.left) / scaleX;
    const y1 = (lr.top + lr.height / 2 - containerRect.top) / scaleY;
    const x2 = (rr.left - containerRect.left) / scaleX;
    const y2 = (rr.top + rr.height / 2 - containerRect.top) / scaleY;

    const theme = MATCH_PAIR_THEMES[leftId];
    const midX = (x1 + x2) / 2;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1},${y1} C ${midX},${y1} ${midX},${y2} ${x2},${y2}`);
    path.setAttribute('stroke', theme.border);
    path.setAttribute('stroke-width', '4');
    path.setAttribute('stroke-dasharray', '8 4');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('fill', 'none');
    svg.appendChild(path);

    [[x1, y1], [x2, y2]].forEach(([cx, cy]) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', cx);
      c.setAttribute('cy', cy);
      c.setAttribute('r', '5');
      c.setAttribute('fill', theme.color);
      svg.appendChild(c);
    });
  });
}

// --- Bagian D: Drag & Drop Sequence ---
function initSeqSection() {
  evalSectionInited.D = true;
  const list = document.getElementById('seq-list');
  if (!list) return;
  list.innerHTML = '';

  const shuffled = SEQ_CORRECT_ORDER.map((text, i) => ({ text, correctIdx: i })).sort(() => Math.random() - 0.5);

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
function onSeqDragStart(e) { seqDragEl = e.currentTarget; e.currentTarget.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
function onSeqDragOver(e) { e.preventDefault(); }
function onSeqDragEnter(e) { e.preventDefault(); if (e.currentTarget !== seqDragEl) e.currentTarget.classList.add('over'); }
function onSeqDragLeave(e) { e.currentTarget.classList.remove('over'); }
function onSeqDrop(e) {
  e.preventDefault();
  const target = e.currentTarget;
  target.classList.remove('over');
  if (!seqDragEl || target === seqDragEl) return;
  const list = document.getElementById('seq-list');
  const items = [...list.children];
  if (items.indexOf(seqDragEl) < items.indexOf(target)) list.insertBefore(seqDragEl, target.nextSibling);
  else list.insertBefore(seqDragEl, target);
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
  const t = e.touches[0];
  seqTouchClone.style.left = (t.clientX - seqTouchEl.offsetWidth / 2) + 'px';
  seqTouchClone.style.top = (t.clientY - 25) + 'px';
  seqTouchEl.classList.add('dragging');
}
function onSeqTouchMove(e) {
  if (!seqTouchClone) return;
  e.preventDefault();
  const t = e.touches[0];
  seqTouchClone.style.left = (t.clientX - seqTouchClone.offsetWidth / 2) + 'px';
  seqTouchClone.style.top = (t.clientY - 25) + 'px';
  document.querySelectorAll('.seq-item').forEach(i => i.classList.remove('over'));
  const elem = document.elementFromPoint(t.clientX, t.clientY);
  if (elem) {
    const item = elem.closest('.seq-item');
    if (item && item !== seqTouchEl) item.classList.add('over');
  }
}
function onSeqTouchEnd(e) {
  if (!seqTouchClone || !seqTouchEl) return;
  const t = e.changedTouches[0];
  const elem = document.elementFromPoint(t.clientX, t.clientY);
  document.body.removeChild(seqTouchClone);
  seqTouchClone = null;
  seqTouchEl.classList.remove('dragging');
  if (elem) {
    const target = elem.closest('.seq-item');
    if (target && target !== seqTouchEl) {
      const list = document.getElementById('seq-list');
      const items = [...list.children];
      if (items.indexOf(seqTouchEl) < items.indexOf(target)) list.insertBefore(seqTouchEl, target.nextSibling);
      else list.insertBefore(seqTouchEl, target);
      updateSeqNumbers();
    }
  }
  document.querySelectorAll('.seq-item').forEach(i => i.classList.remove('over'));
  seqTouchEl = null;
}

function updateSeqNumbers() {
  document.querySelectorAll('#seq-list .seq-item').forEach((item, i) => {
    item.querySelector('.seq-num').textContent = i + 1;
  });
}

function submitEval() {
  const scores = { A: 0, B: 0, C: 0, D: 0 };
  const reviewRows = [];

  for (let i = 1; i <= 10; i++) {
    const k = 'A' + i;
    const ok = evalUserAnswers[k] === EVAL_ANSWERS[k];
    if (ok) scores.A++;
    reviewRows.push(`<div class="eval-review-item">${ok ? '✅' : '❌'} <strong>Soal ${k}:</strong> Kunci <code>${EVAL_ANSWERS[k]}</code> — ${EVAL_EXPLANATIONS[k]}</div>`);
  }

  for (let i = 1; i <= 5; i++) {
    const k = 'B' + i;
    const ok = evalUserAnswers[k] === EVAL_ANSWERS[k];
    if (ok) scores.B++;
    reviewRows.push(`<div class="eval-review-item">${ok ? '✅' : '❌'} <strong>Soal ${k}:</strong> Kunci <code>${EVAL_ANSWERS[k].toUpperCase()}</code> — ${EVAL_EXPLANATIONS[k]}</div>`);
  }

  for (const [left, right] of Object.entries(matchState.pairs)) {
    if (MATCH_ANSWERS[left] === right) scores.C++;
  }

  document.querySelectorAll('#seq-list .seq-item').forEach((item, i) => {
    if (parseInt(item.dataset.correctIdx, 10) === i) scores.D++;
  });

  const total = scores.A + scores.B + scores.C + scores.D;
  const maxTotal = 25;
  const percentage = Math.round((total / maxTotal) * 100);

  let msgClass, msgText;
  if (percentage >= 90) {
    msgClass = 'excellent';
    msgText = 'Luar biasa! Kamu benar-benar Ahli Analisis Data sejati! 🏆';
  } else if (percentage >= 60) {
    msgClass = 'good';
    msgText = 'Bagus! Beberapa konsep sudah kamu kuasai; buka pembahasan di bawah untuk menyempurnakan pemahamanmu.';
  } else {
    msgClass = 'tryagain';
    msgText = 'Yuk, pelajari lagi materi pembelajaran &amp; cek pembahasan di bawah sebelum mencoba evaluasi ulang!';
  }

  const recapCard = document.getElementById('recap-card');
  recapCard.innerHTML = `
    <div style="font-size:52px;margin-bottom:6px;">📊</div>
    <h2 style="font-family:var(--font-heading);font-size:28px;color:var(--teal-dark);margin-bottom:4px;">Hasil Rekap Evaluasi</h2>
    <div class="recap-score">${percentage}%</div>
    <p style="font-size:18px;color:var(--text-body);margin-bottom:10px;">Total Skor: <strong>${total}</strong> / ${maxTotal} Poin</p>
    <div class="recap-details">
      <span class="recap-badge a">Bagian A: ${scores.A}/10</span>
      <span class="recap-badge b">Bagian B: ${scores.B}/5</span>
      <span class="recap-badge c">Bagian C: ${scores.C}/5</span>
      <span class="recap-badge d">Bagian D: ${scores.D}/5</span>
    </div>
    <div class="recap-msg ${msgClass}">${msgText}</div>
    <div style="margin-top:20px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button class="btn btn-secondary" onclick="toggleEvalReview()">🔎 Lihat Pembahasan Singkat</button>
      <button class="btn btn-secondary" onclick="startEval()">🔄 Ulangi Latihan</button>
      <button class="btn btn-primary" onclick="goToPage('rangkuman')">📋 Ke Rangkuman</button>
    </div>
    <div class="eval-review-box" id="eval-review-box">${reviewRows.join('')}</div>`;

  document.querySelectorAll('.eval-section').forEach(s => s.classList.remove('active'));
  document.getElementById('eval-section-recap').classList.add('active');
  document.querySelectorAll('.eval-progress .step').forEach(s => s.classList.add('done'));

  if (percentage >= 60) {
    playSynthSound('victory');
    spawnConfetti();
  } else {
    playSynthSound('click');
  }
}

function toggleEvalReview() {
  playSynthSound('click');
  const box = document.getElementById('eval-review-box');
  if (box) box.classList.toggle('show');
}

// ==================== MOBILE TOUCH SWIPE NAVIGATION ====================

function initSwipeNavigation() {
  let startX = 0, startY = 0, startTime = 0;
  let tracking = false, directionLocked = false, isHorizontal = false;

  function isInteractive(el) {
    if (!el || !(el instanceof Element)) return false;
    if (['permainan', 'tarik-jawaban', 'latihan', 'video'].includes(currentPage)) return true;
    const modal = document.querySelector('.game-modal.show, #game-modal.show');
    if (modal && modal.contains(el)) return true;
    return !!el.closest('video, audio, canvas, input, textarea, select, button, .match-item, .seq-item, .mini-demo-box, .honesty-toggle-card, #page-permainan, [draggable="true"]');
  }

  document.addEventListener('touchstart', e => {
    if (e.touches.length !== 1 || isInteractive(e.target)) { tracking = false; return; }
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
    tracking = true;
    directionLocked = false;
    isHorizontal = false;
  }, { passive: true });

  document.addEventListener('touchmove', e => {
    if (!tracking || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    if (!directionLocked && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
      directionLocked = true;
      isHorizontal = Math.abs(dx) > Math.abs(dy);
    }
    if (directionLocked && isHorizontal && e.cancelable) e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', e => {
    if (!tracking) return;
    tracking = false;
    if (!directionLocked || !isHorizontal) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Date.now() - startTime > 2000 || Math.abs(dx) < 45) return;
    if (dx < 0) navNext();
    else navPrev();
  }, { passive: true });

  document.addEventListener('touchcancel', () => { tracking = false; }, { passive: true });
}

// ==================== REFLEKSI BELAJAR ====================

function simpanRefleksi() {
  const input = document.getElementById('refleksi-input');
  const status = document.getElementById('refleksi-status');
  if (!input) return;
  const val = input.value.trim();
  if (val.length === 0) {
    playSynthSound('error');
    if (status) {
      status.textContent = '⚠️ Tuliskan refleksimu dulu!';
      status.style.color = '#dc2626';
      status.style.display = 'block';
    }
    return;
  }
  try {
    localStorage.setItem('mpi_ad_refleksi', val);
  } catch (e) {}
  playSynthSound('success');
  if (status) {
    status.textContent = '✓ Refleksimu tersimpan!';
    status.style.color = '#16a34a';
    status.style.display = 'block';
    setTimeout(() => { status.style.display = 'none'; }, 3500);
  }
}

function loadRefleksi() {
  const input = document.getElementById('refleksi-input');
  if (!input) return;
  try {
    const saved = localStorage.getItem('mpi_ad_refleksi');
    if (saved && !input.value) input.value = saved;
  } catch (e) {}
}

function scrollToRefleksi() {
  playSynthSound('click');
  const target = document.querySelector('#page-rangkuman .refleksi-box') || document.getElementById('refleksi-input');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      const input = document.getElementById('refleksi-input');
      if (input) {
        input.focus();
        input.style.borderColor = 'var(--teal)';
        setTimeout(() => { input.style.borderColor = ''; }, 1500);
      }
    }, 450);
  }
}

// ==================== INITIALIZATION ====================

document.addEventListener('DOMContentLoaded', function() {
  applyConfig();
  setAppZoom(currentZoom);
  setAppFontScale(currentFontScale);
  refreshMateriDoneBadges();
  toggleChartHonesty(false);
  goToPage('cover');
  initSwipeNavigation();

  window.addEventListener('resize', () => {
    if (currentPage === 'tarik-jawaban') drawMatchP7Lines();
    const secC = document.getElementById('eval-section-C');
    if (secC && secC.classList.contains('active')) drawMatchLines();
  });

  const tarikBox = document.getElementById('content-tarik-jawaban');
  if (tarikBox) {
    tarikBox.addEventListener('scroll', () => {
      if (currentPage === 'tarik-jawaban') drawMatchP7Lines();
    });
  }

  const evalBox = document.getElementById('eval-box');
  if (evalBox) {
    evalBox.addEventListener('scroll', () => {
      const secC = document.getElementById('eval-section-C');
      if (secC && secC.classList.contains('active')) drawMatchLines();
      const scrollHint = document.getElementById('eval-floating-scroll-hint');
      if (scrollHint) {
        const secA = document.getElementById('eval-section-A');
        const isSecA = secA && secA.classList.contains('active');
        if (!isSecA || evalBox.scrollTop > 90 || (evalBox.scrollTop + evalBox.clientHeight >= evalBox.scrollHeight - 50)) {
          scrollHint.classList.add('hidden');
        } else {
          scrollHint.classList.remove('hidden');
        }
      }
    });
  }

  // Keyboard shortcuts (ArrowLeft / ArrowRight & Enter on menu/materi cards)
  document.addEventListener('keydown', e => {
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'textarea' || tag === 'input' || tag === 'select') return;

    if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.matches('[role="button"]')) {
      e.preventDefault();
      e.target.click();
      return;
    }

    const modal = document.getElementById('game-modal');
    if (modal && modal.classList.contains('show')) {
      if (e.key === 'Escape') closeGameModal();
      return;
    }

    if (e.key === 'ArrowRight') navNext();
    else if (e.key === 'ArrowLeft') navPrev();
  });

  // Compound nav click helper
  document.addEventListener('click', function(e) {
    const navTop = e.target.closest('.nav-top');
    if (navTop) {
      const btn = navTop.querySelector('.nav-circle');
      if (btn && e.target !== btn && !btn.contains(e.target)) btn.click();
    }
    const navMateri = e.target.closest('.nav-btn-materi');
    if (navMateri) {
      const btn = navMateri.querySelector('.nav-circle');
      if (btn && e.target !== btn && !btn.contains(e.target)) btn.click();
    }
    const leftCompound = e.target.closest('.nav-bottom.left.nav-materi-compound');
    if (leftCompound && e.target === leftCompound) navPrev();
    const rightCompound = e.target.closest('.nav-bottom.right.nav-materi-compound');
    if (rightCompound && e.target === rightCompound) navNext();
  });
});
