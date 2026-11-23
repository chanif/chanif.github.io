import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * HOLO-RIG 3D // Lab Perakitan Komputer v2
 * Mesin 3D Interaktif berbasis Three.js + Web Audio API
 */

const COMPONENTS = window.PC_COMPONENTS || [];
const ASSEMBLY_STEPS = window.ASSEMBLY_STEPS || [];

// ============================================================================
// 1. WEB AUDIO SYNTHESIZER
// ============================================================================
class HoloAudio {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    ensure() {
        if (!this.enabled) return null;
        if (!this.ctx) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) this.ctx = new AC();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
        return this.ctx;
    }

    tone(freq, dur = 0.08, type = 'sine', gainVal = 0.08, delay = 0) {
        try {
            const ctx = this.ensure();
            if (!ctx) return;
            const now = ctx.currentTime + delay;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.012);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + dur + 0.02);
        } catch (_) {}
    }

    click() {
        this.tone(760, 0.055, 'triangle', 0.06);
    }

    detach() {
        this.tone(540, 0.09, 'sine', 0.07, 0);
        this.tone(360, 0.12, 'sine', 0.06, 0.05);
    }

    snapIn() {
        this.tone(340, 0.06, 'triangle', 0.08, 0);
        this.tone(680, 0.11, 'sine', 0.09, 0.04);
    }

    postBoot() {
        // Classic single POST beep followed by futuristic chord
        this.tone(920, 0.14, 'square', 0.055, 0.05);
        this.tone(523.25, 0.25, 'sine', 0.08, 0.28);
        this.tone(659.25, 0.25, 'sine', 0.08, 0.36);
        this.tone(783.99, 0.35, 'sine', 0.09, 0.44);
        this.tone(1046.5, 0.45, 'triangle', 0.08, 0.54);
    }
}

const sfx = new HoloAudio();

// ============================================================================
// 2. APPLICATION STATE
// ============================================================================
const state = {
    theme: localStorage.getItem('holorig_3d_theme') === 'light' ? 'light' : 'dark',
    mode: 'explore', // explore | explode | assembly | flow
    selectedId: 'motherboard',
    hoveredId: null,
    explodePct: 0, // 0..100
    explodeFocus: 'iso', // iso | mobo | explode
    autoRotate: false,
    showLabels: true,
    xray: false,
    showAirflow: false,
    showDataBus: false,
    soloMode: false,
    filterCategory: 'all',
    searchQuery: '',
    hiddenIds: new Set(),
    detachedIds: new Set(),
    assemblyStepIdx: 0, // 0..ASSEMBLY_STEPS.length
    assemblyCompleted: false,
    postBooted: true // fans spin in explore/explode/flow; in assembly spins upon completion
};

// Camera fly-to state
const camAnim = {
    active: false,
    targetPos: new THREE.Vector3(6.2, 2.7, 5.8),
    targetLook: new THREE.Vector3(-0.1, 0.15, -0.05)
};

// ============================================================================
// 3. THREE.JS SCENE SETUP
// ============================================================================
const canvas = document.getElementById('pc3d-canvas');
const viewportEl = canvas.parentElement;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#0a1224');
scene.fog = new THREE.FogExp2('#0a1224', 0.018);

const camera = new THREE.PerspectiveCamera(
    42,
    viewportEl.clientWidth / Math.max(1, viewportEl.clientHeight),
    0.1,
    100
);
camera.position.set(6.2, 2.7, 5.8);

const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance'
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(viewportEl.clientWidth, viewportEl.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.28;

// Procedural Studio Environment Map so metallic/glossy materials never crush to black
function setupStudioEnvironment() {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color('#1e293b');

    const panelGeo = new THREE.PlaneGeometry(12, 12);
    const makeLightPanel = (col, pos, rot) => {
        const m = new THREE.Mesh(panelGeo, new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide }));
        m.position.set(...pos);
        m.rotation.set(...rot);
        envScene.add(m);
    };
    makeLightPanel('#ffffff', [0, 8, 0], [Math.PI / 2, 0, 0]);
    makeLightPanel('#bae6fd', [8, 2, 6], [0, -Math.PI / 2, 0]);
    makeLightPanel('#e0e7ff', [-8, 3, -4], [0, Math.PI / 2, 0]);
    makeLightPanel('#38bdf8', [0, 2, 8], [0, Math.PI, 0]);
    makeLightPanel('#94a3b8', [0, -6, 0], [-Math.PI / 2, 0, 0]);

    const envRT = pmrem.fromScene(envScene, 0.04);
    scene.environment = envRT.texture;
    panelGeo.dispose();
    pmrem.dispose();
}
setupStudioEnvironment();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 1.35;
controls.maxDistance = 15.0;
controls.maxPolarAngle = Math.PI * 0.92;
controls.target.set(-0.1, 0.15, -0.05);

controls.addEventListener('start', () => {
    camAnim.active = false;
});

// Multi-directional Studio Lighting Rig (eliminates black shadows)
const ambientLight = new THREE.AmbientLight('#cbd5e1', 1.35);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight('#e0f2fe', '#334155', 1.25);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight('#ffffff', 2.4);
keyLight.position.set(6, 9, 7);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.near = 1;
keyLight.shadow.camera.far = 25;
const d = 5;
keyLight.shadow.camera.left = -d;
keyLight.shadow.camera.right = d;
keyLight.shadow.camera.top = d;
keyLight.shadow.camera.bottom = -d;
keyLight.shadow.bias = -0.0005;
scene.add(keyLight);

const frontFillLight = new THREE.DirectionalLight('#e0f2fe', 1.25);
frontFillLight.position.set(4, 1.5, 6);
scene.add(frontFillLight);

const bottomLeftFill = new THREE.DirectionalLight('#c4b5fd', 0.95);
bottomLeftFill.position.set(-5, -3, 6);
scene.add(bottomLeftFill);

const cyanRimLight = new THREE.DirectionalLight('#38bdf8', 1.2);
cyanRimLight.position.set(5, 2, -6);
scene.add(cyanRimLight);

const violetFillLight = new THREE.DirectionalLight('#a78bfa', 1.0);
violetFillLight.position.set(-6, 4, 4);
scene.add(violetFillLight);

const innerAccentLight = new THREE.PointLight('#38bdf8', 1.6, 8);
innerAccentLight.position.set(0.5, 0.7, 0.2);
scene.add(innerAccentLight);

// Holographic Studio Floor & Grid
const studioFloorGroup = new THREE.Group();
const gridHelper = new THREE.GridHelper(18, 36, '#00f0ff', '#1e293b');
gridHelper.position.y = -2.28;
gridHelper.material.opacity = 0.26;
gridHelper.material.transparent = true;
studioFloorGroup.add(gridHelper);

const lightGridHelper = new THREE.GridHelper(18, 36, '#0284c7', '#cbd5e1');
lightGridHelper.position.y = -2.28;
lightGridHelper.material.opacity = 0.42;
lightGridHelper.material.transparent = true;
lightGridHelper.visible = false;
studioFloorGroup.add(lightGridHelper);

const ringGeo = new THREE.RingGeometry(2.6, 2.66, 72);
ringGeo.rotateX(-Math.PI / 2);
const ringMat = new THREE.MeshBasicMaterial({
    color: '#00f0ff',
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide
});
const ringMesh = new THREE.Mesh(ringGeo, ringMat);
ringMesh.position.y = -2.27;
studioFloorGroup.add(ringMesh);

const outerRingGeo = new THREE.RingGeometry(3.45, 3.48, 72);
outerRingGeo.rotateX(-Math.PI / 2);
const outerRingMat = new THREE.MeshBasicMaterial({
    color: '#8b5cf6',
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide
});
const outerRingMesh = new THREE.Mesh(outerRingGeo, outerRingMat);
outerRingMesh.position.y = -2.27;
studioFloorGroup.add(outerRingMesh);

scene.add(studioFloorGroup);

// ============================================================================
// 4. PROCEDURAL CANVAS TEXTURES (PCB, CPU IHS, GPU, PSU, CHIPSET)
// ============================================================================
function createMoboTexture() {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1280;
    const ctx = c.getContext('2d');

    // Classic High-Contrast Emerald-Teal PCB
    const pcbGrad = ctx.createLinearGradient(0, 0, c.width, c.height);
    pcbGrad.addColorStop(0, '#0f5e4c');
    pcbGrad.addColorStop(0.5, '#0d4a3e');
    pcbGrad.addColorStop(1, '#09382f');
    ctx.fillStyle = pcbGrad;
    ctx.fillRect(0, 0, c.width, c.height);

    // Subtle woven fiberglass pattern
    ctx.strokeStyle = 'rgba(20, 184, 166, 0.16)';
    ctx.lineWidth = 1;
    for (let i = 0; i < c.width; i += 16) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, c.height);
        ctx.stroke();
    }
    for (let j = 0; j < c.height; j += 16) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(c.width, j);
        ctx.stroke();
    }

    // Copper PCB trace buses (CPU <-> RAM, CPU <-> PCIe, CPU <-> M.2, CPU <-> Chipset)
    const drawTraceBundle = (pts, color, count = 6, spread = 5) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        for (let k = 0; k < count; k++) {
            const off = (k - count / 2) * spread;
            ctx.beginPath();
            pts.forEach(([x, y], idx) => {
                if (idx === 0) ctx.moveTo(x + off, y + off * 0.4);
                else ctx.lineTo(x + off, y + off * 0.4);
            });
            ctx.stroke();
        }
    };

    // CPU to RAM horizontal buses
    drawTraceBundle([[460, 390], [580, 390], [640, 330], [720, 330]], 'rgba(56, 189, 248, 0.72)', 8, 7);
    drawTraceBundle([[460, 460], [600, 460], [650, 520], [720, 520]], 'rgba(251, 191, 36, 0.65)', 7, 7);

    // CPU to PCIe x16 & M.2 vertical buses
    drawTraceBundle([[430, 500], [430, 620], [480, 670], [480, 820]], 'rgba(196, 181, 253, 0.70)', 8, 8);
    // CPU to Chipset DMI bus
    drawTraceBundle([[490, 510], [610, 640], [750, 790], [770, 930]], 'rgba(103, 232, 249, 0.68)', 6, 6);
    // Audio isolation trace
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(140, 860);
    ctx.lineTo(140, 1230);
    ctx.stroke();

    // Silkscreen Labels & Mounting Rings
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText('HOLO-Z790 PRO ATX', 310, 1180);
    ctx.font = 'bold 15px "JetBrains Mono", monospace';
    ctx.fillStyle = '#a5f3fc';
    ctx.fillText('LGA1700_SOCKET', 360, 250);
    ctx.fillText('DIMM_A1 A2 B1 B2', 690, 190);
    ctx.fillText('M2_PCIE4_X4', 360, 635);
    ctx.fillText('PCIEX16_GEN4', 300, 785);
    ctx.fillText('PCH_CHIPSET', 710, 910);
    ctx.fillText('ATX_24P', 905, 520);
    ctx.fillText('CPU_EPS_8P', 65, 80);
    ctx.fillText('BAT_CR2032', 355, 955);
    ctx.fillText('SATA6G_1-4', 860, 1080);
    ctx.fillText('JFP1_PANEL', 680, 1225);

    // 9 Standoff Brass Screw Holes
    const holes = [
        [48, 48], [512, 48], [976, 48],
        [48, 620], [512, 620], [976, 620],
        [48, 1232], [512, 1232], [976, 1232]
    ];
    holes.forEach(([hx, hy]) => {
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(hx, hy, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#09382f';
        ctx.beginPath();
        ctx.arc(hx, hy, 6, 0, Math.PI * 2);
        ctx.fill();
    });

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
}

function createCpuTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 512, 512);
    g.addColorStop(0, '#cbd5e1');
    g.addColorStop(0.5, '#94a3b8');
    g.addColorStop(1, '#64748b');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 8;
    ctx.strokeRect(24, 24, 464, 464);

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 42px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('HOLO-CORE', 256, 200);
    ctx.font = 'bold 34px "JetBrains Mono", monospace';
    ctx.fillText('i9-14900K', 256, 252);
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillStyle = '#1e293b';
    ctx.fillText('LGA 1700 // 24 CORES', 256, 305);
    ctx.fillText('5.8 GHz MAX BOOST', 256, 338);

    // Pin 1 gold triangle
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(46, 466);
    ctx.lineTo(94, 466);
    ctx.lineTo(46, 418);
    ctx.closePath();
    ctx.fill();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

function createPsuLabelTexture() {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 256;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 492, 236);
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 48px "JetBrains Mono", monospace';
    ctx.fillText('850W', 36, 95);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px "Inter", sans-serif';
    ctx.fillText('80 PLUS GOLD', 180, 92);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px "JetBrains Mono", monospace';
    ctx.fillText('FULL MODULAR POWER SUPPLY', 36, 150);
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('+12V 70.8A  |  +5V 20A  |  +3.3V 20A', 36, 195);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

function createCmosTexture() {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(128, 128, 114, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText('+', 128, 86);
    ctx.font = 'bold 30px "JetBrains Mono", monospace';
    ctx.fillText('CR2032', 128, 138);
    ctx.font = 'bold 22px "JetBrains Mono", monospace';
    ctx.fillText('3V LITHIUM', 128, 178);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

// ============================================================================
// 5. COMPONENT MESH BUILDERS (16 DETAILED ARTICULATED GROUPS)
// ============================================================================
const componentEntries = new Map(); // id -> { data, group, homePos, explodePos, moboExplodePos, leaderLine, meshes, subAnim }
const animatedFans = []; // { mesh, axis, speed }
const rgbMaterials = []; // { mat, phaseOffset }
const clickableMeshes = [];

function registerMeshRecursive(group, componentId, edgeColor = '#94a3b8', edgeOpacity = 0.28) {
    const meshes = [];
    group.traverse((obj) => {
        if (obj.isMesh) meshes.push(obj);
    });

    const rgbSet = new Set(rgbMaterials.map(r => r.mat));
    const compMatMap = new Map();

    const isolateMat = (mat) => {
        if (!mat || rgbSet.has(mat) || mat.userData?.skipOrigSave) return mat;
        if (!compMatMap.has(mat)) {
            const cloned = mat.clone();
            // Ensure unhovered/unselected solid parts keep crisp visibility with a subtle surface lift
            if (cloned.emissive && cloned.emissive.getHex() === 0x000000) {
                if (cloned.map) {
                    cloned.emissive.set('#ffffff');
                    cloned.emissiveMap = cloned.map;
                    cloned.emissiveIntensity = 0.14;
                } else {
                    cloned.emissive.copy(cloned.color);
                    cloned.emissiveIntensity = 0.10;
                }
            }
            cloned.userData = {
                ...mat.userData,
                origMat: {
                    wireframe: cloned.wireframe,
                    transparent: cloned.transparent,
                    opacity: cloned.opacity,
                    emissiveHex: cloned.emissive ? cloned.emissive.getHex() : 0x000000,
                    emissiveIntensity: cloned.emissiveIntensity || 0
                }
            };
            compMatMap.set(mat, cloned);
        }
        return compMatMap.get(mat);
    };

    meshes.forEach((obj) => {
        obj.userData.componentId = componentId;
        obj.castShadow = true;
        obj.receiveShadow = true;

        if (Array.isArray(obj.material)) {
            obj.material = obj.material.map(isolateMat);
        } else if (obj.material) {
            obj.material = isolateMat(obj.material);
        }

        clickableMeshes.push(obj);

        // Crisp CAD outline edges so solid parts stay sharply defined
        if (obj.geometry && !obj.userData.skipEdges) {
            const edges = new THREE.EdgesGeometry(obj.geometry, 28);
            const lineMat = new THREE.LineBasicMaterial({
                color: obj.userData.edgeColor || edgeColor,
                transparent: true,
                opacity: obj.userData.edgeOpacity ?? edgeOpacity
            });
            const edgeLines = new THREE.LineSegments(edges, lineMat);
            edgeLines.raycast = () => {};
            obj.add(edgeLines);
        }
    });
}

function createFanAssembly(radius, depth, phaseOffset = 0, ringColor = '#00f0ff') {
    const fanGroup = new THREE.Group();

    // Outer Frame (Slate-Blue, clearly visible & solid)
    const frameMat = new THREE.MeshStandardMaterial({ color: '#334155', roughness: 0.42, metalness: 0.25 });
    const frameSize = radius * 2.24;
    const postThick = radius * 0.22;
    const barGeoH = new THREE.BoxGeometry(frameSize, postThick, depth);
    const barGeoV = new THREE.BoxGeometry(postThick, frameSize, depth);

    const topBar = new THREE.Mesh(barGeoH, frameMat);
    topBar.position.y = frameSize / 2 - postThick / 2;
    const botBar = new THREE.Mesh(barGeoH, frameMat);
    botBar.position.y = -frameSize / 2 + postThick / 2;
    const leftBar = new THREE.Mesh(barGeoV, frameMat);
    leftBar.position.x = -frameSize / 2 + postThick / 2;
    const rightBar = new THREE.Mesh(barGeoV, frameMat);
    rightBar.position.x = frameSize / 2 - postThick / 2;
    fanGroup.add(topBar, botBar, leftBar, rightBar);

    // Glowing ARGB Ring
    const ringGeoF = new THREE.TorusGeometry(radius * 0.96, radius * 0.06, 12, 36);
    const rgbMat = new THREE.MeshStandardMaterial({
        color: ringColor,
        emissive: ringColor,
        emissiveIntensity: 1.4,
        roughness: 0.2
    });
    rgbMaterials.push({ mat: rgbMat, phaseOffset });
    const ringMeshF = new THREE.Mesh(ringGeoF, rgbMat);
    ringMeshF.userData.skipEdges = true;
    fanGroup.add(ringMeshF);

    // Spinning Hub + 7 Solid Opaque Blades
    const rotor = new THREE.Group();
    const hub = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 0.28, radius * 0.28, depth * 0.65, 20),
        new THREE.MeshStandardMaterial({ color: '#475569', metalness: 0.35, roughness: 0.3 })
    );
    hub.rotation.x = Math.PI / 2;
    rotor.add(hub);

    const bladeGeo = new THREE.BoxGeometry(radius * 0.68, radius * 0.18, depth * 0.16);
    const bladeMat = new THREE.MeshStandardMaterial({
        color: '#e0f2fe',
        emissive: '#38bdf8',
        emissiveIntensity: 0.10,
        roughness: 0.28,
        metalness: 0.12
    });
    for (let i = 0; i < 7; i++) {
        const angle = (i / 7) * Math.PI * 2;
        const bPivot = new THREE.Group();
        bPivot.rotation.z = angle;
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.x = radius * 0.50;
        blade.rotation.x = 0.42;
        bPivot.add(blade);
        rotor.add(bPivot);
    }

    fanGroup.add(rotor);
    animatedFans.push({ mesh: rotor, axis: 'z', speed: 8.5 });
    return fanGroup;
}

function buildAllComponents() {
    const moboTex = createMoboTexture();
    const cpuTex = createCpuTexture();
    const psuTex = createPsuLabelTexture();
    const cmosTex = createCmosTexture();

    const slateChassis = new THREE.MeshStandardMaterial({ color: '#475569', metalness: 0.28, roughness: 0.42 });
    const gunmetal = new THREE.MeshStandardMaterial({ color: '#64748b', metalness: 0.35, roughness: 0.32 });
    const silverMetal = new THREE.MeshStandardMaterial({ color: '#e2e8f0', metalness: 0.42, roughness: 0.24 });
    const copperMat = new THREE.MeshStandardMaterial({ color: '#f97316', metalness: 0.45, roughness: 0.26 });
    const goldMat = new THREE.MeshStandardMaterial({ color: '#facc15', metalness: 0.45, roughness: 0.22 });
    const darkSlate = new THREE.MeshStandardMaterial({ color: '#334155', metalness: 0.20, roughness: 0.50 });
    const cobaltMat = new THREE.MeshStandardMaterial({ color: '#0284c7', metalness: 0.22, roughness: 0.40 });

    // ------------------------------------------------------------------------
    // 1. MOTHERBOARD ATX (home: [-0.52, 0.35, -0.25])
    // ------------------------------------------------------------------------
    const moboGroup = new THREE.Group();
    const moboBoard = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 3.05, 2.44),
        [
            new THREE.MeshStandardMaterial({ map: moboTex, roughness: 0.45, metalness: 0.12 }), // +X front
            new THREE.MeshStandardMaterial({ color: '#0f4c3f', roughness: 0.55, metalness: 0.12 }), // -X back
            new THREE.MeshStandardMaterial({ color: '#14b8a6', roughness: 0.45 }),
            new THREE.MeshStandardMaterial({ color: '#14b8a6', roughness: 0.45 }),
            new THREE.MeshStandardMaterial({ color: '#14b8a6', roughness: 0.45 }),
            new THREE.MeshStandardMaterial({ color: '#14b8a6', roughness: 0.45 })
        ]
    );
    moboBoard.userData.edgeColor = '#2dd4bf';
    moboBoard.userData.edgeOpacity = 0.65;
    moboGroup.add(moboBoard);

    // 4× DIMM Slots on PCB (Sky Blue & Slate alternation)
    for (let s = 0; s < 4; s++) {
        const slotColor = s % 2 === 1 ? '#0ea5e9' : '#475569';
        const dimmSlot = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 1.18, 0.045),
            new THREE.MeshStandardMaterial({ color: slotColor, roughness: 0.42 })
        );
        dimmSlot.position.set(0.06, 0.60, 0.44 + s * 0.095);
        moboGroup.add(dimmSlot);
    }

    // Reinforced PCIe x16 Slot + Secondary Cobalt Slots
    const pcie16 = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.09, 1.02), silverMetal);
    pcie16.position.set(0.07, -0.47, -0.22);
    moboGroup.add(pcie16);

    const pcie1 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.34), cobaltMat);
    pcie1.position.set(0.06, -0.78, -0.48);
    const pcieLower = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.08, 0.92), cobaltMat);
    pcieLower.position.set(0.06, -1.08, -0.22);
    moboGroup.add(pcie1, pcieLower);

    // M.2 Key-M Connector & Gold Standoff
    const m2Slot = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.19, 0.07), darkSlate);
    m2Slot.position.set(0.06, -0.11, -0.38);
    const m2Stand = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.07, 10), goldMat);
    m2Stand.rotation.z = Math.PI / 2;
    m2Stand.position.set(0.055, -0.11, 0.34);
    moboGroup.add(m2Slot, m2Stand);

    // VRM Electronic Stages on PCB (light-gray chokes & gold/silver capacitors underneath!)
    const chokeMat = new THREE.MeshStandardMaterial({ color: '#94a3b8', metalness: 0.25, roughness: 0.4 });
    for (let i = 0; i < 6; i++) {
        const choke = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 0.09), chokeMat);
        choke.position.set(0.06, 0.22 + i * 0.14, -0.60);
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.075, 12), goldMat);
        cap.rotation.z = Math.PI / 2;
        cap.position.set(0.065, 0.22 + i * 0.14, -0.49);
        moboGroup.add(choke, cap);
    }
    for (let j = 0; j < 5; j++) {
        const topChoke = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.09, 0.09), chokeMat);
        topChoke.position.set(0.06, 1.06, -0.42 + j * 0.14);
        const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.075, 12), goldMat);
        topCap.rotation.z = Math.PI / 2;
        topCap.position.set(0.065, 0.96, -0.42 + j * 0.14);
        moboGroup.add(topChoke, topCap);
    }

    // 4× SATA III Right-Angle Ports (Vibrant Orange/Amber)
    const sataPortMat = new THREE.MeshStandardMaterial({ color: '#f97316', roughness: 0.4 });
    for (let k = 0; k < 4; k++) {
        const sataPort = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.10, 0.14), sataPortMat);
        sataPort.position.set(0.07, -1.02 + Math.floor(k / 2) * 0.14, 1.12);
        moboGroup.add(sataPort);
    }

    // Gold Audio Capacitors in bottom-rear corner
    for (let a = 0; a < 4; a++) {
        const acap = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.08, 12), goldMat);
        acap.rotation.z = Math.PI / 2;
        acap.position.set(0.065, -0.82 - a * 0.13, -1.04);
        moboGroup.add(acap);
    }

    // ------------------------------------------------------------------------
    // 2. CPU SOCKET LGA 1700 & ILM (home: [-0.46, 0.95, -0.35])
    // ------------------------------------------------------------------------
    const socketGroup = new THREE.Group();
    const socketBase = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.56, 0.46), cobaltMat);
    socketGroup.add(socketBase);

    const pinBed = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, 0.40, 0.32),
        new THREE.MeshStandardMaterial({ color: '#facc15', metalness: 0.45, roughness: 0.28 })
    );
    pinBed.position.x = 0.02;
    socketGroup.add(pinBed);

    const ilmPivot = new THREE.Group();
    ilmPivot.position.set(0.04, 0.28, 0);
    const ilmFrame = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.52, 0.42), silverMetal);
    ilmFrame.position.y = -0.28;
    ilmPivot.add(ilmFrame);

    const leverArm = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.58, 10), silverMetal);
    leverArm.position.set(0.01, -0.28, 0.25);
    socketGroup.add(ilmPivot, leverArm);

    // ------------------------------------------------------------------------
    // 3. CPU PROCESSOR (home: [-0.41, 0.95, -0.35])
    // ------------------------------------------------------------------------
    const cpuGroup = new THREE.Group();
    const cpuSub = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, 0.44, 0.36),
        new THREE.MeshStandardMaterial({ color: '#10b981', roughness: 0.38, metalness: 0.15 })
    );
    const cpuGoldBack = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.40, 0.32), goldMat);
    cpuGoldBack.position.x = -0.012;
    const cpuIhs = new THREE.Mesh(
        new THREE.BoxGeometry(0.032, 0.38, 0.31),
        new THREE.MeshStandardMaterial({ map: cpuTex, metalness: 0.35, roughness: 0.24 })
    );
    cpuIhs.position.x = 0.022;
    cpuGroup.add(cpuSub, cpuGoldBack, cpuIhs);

    // ------------------------------------------------------------------------
    // 4. CPU COOLER TOWER + FAN (home: [-0.08, 0.95, -0.35])
    // ------------------------------------------------------------------------
    const coolerGroup = new THREE.Group();
    const coldplate = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.36, 0.34), copperMat);
    coldplate.position.x = -0.26;
    coolerGroup.add(coldplate);

    for (let p = 0; p < 4; p++) {
        const zOff = -0.13 + p * 0.086;
        const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.68, 12), copperMat);
        pipe.rotation.z = Math.PI / 2;
        pipe.position.set(0.06, 0.14, zOff);
        const pipeB = pipe.clone();
        pipeB.position.set(0.06, -0.14, zOff);
        coolerGroup.add(pipe, pipeB);
    }

    const finGeo = new THREE.BoxGeometry(0.014, 0.78, 0.46);
    for (let f = 0; f < 16; f++) {
        const fin = new THREE.Mesh(finGeo, silverMetal);
        fin.position.set(-0.14 + f * 0.036, 0, 0);
        coolerGroup.add(fin);
    }

    const topCap = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.035, 0.48),
        new THREE.MeshStandardMaterial({ color: '#0369a1', metalness: 0.25, roughness: 0.35 })
    );
    topCap.position.set(0.12, 0.40, 0);
    const capStripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.54, 0.04, 0.05),
        new THREE.MeshStandardMaterial({ color: '#00f0ff', emissive: '#00f0ff', emissiveIntensity: 1.5 })
    );
    capStripe.position.set(0.12, 0.405, 0);
    coolerGroup.add(topCap, capStripe);

    const cpuFan = createFanAssembly(0.32, 0.13, 0.5, '#00f0ff');
    cpuFan.position.set(0.12, 0, 0.31);
    coolerGroup.add(cpuFan);

    // ------------------------------------------------------------------------
    // 5. VRM & HEATSINK (home: [-0.36, 1.25, -0.68]) — Indigo-Blue Anodized
    // ------------------------------------------------------------------------
    const vrmGroup = new THREE.Group();
    const vrmMat = new THREE.MeshStandardMaterial({ color: '#4338ca', metalness: 0.32, roughness: 0.32 });
    const vrmLeftSink = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.92, 0.24), vrmMat);
    vrmLeftSink.position.set(0.0, -0.30, -0.22);
    const vrmLeftAccent = new THREE.Mesh(
        new THREE.BoxGeometry(0.23, 0.72, 0.04),
        new THREE.MeshStandardMaterial({ color: '#818cf8', emissive: '#6366f1', emissiveIntensity: 1.1 })
    );
    vrmLeftAccent.position.set(0.01, -0.30, -0.22);

    const vrmTopSink = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.24, 0.76), vrmMat);
    vrmTopSink.position.set(0.0, 0.32, 0.33);
    vrmGroup.add(vrmLeftSink, vrmLeftAccent, vrmTopSink);

    // ------------------------------------------------------------------------
    // 6. RAM DDR5 DUAL-CHANNEL (home: [-0.32, 0.95, 0.34]) — Emerald-Teal
    // ------------------------------------------------------------------------
    const ramGroup = new THREE.Group();
    const ramBodyMat = new THREE.MeshStandardMaterial({ color: '#059669', metalness: 0.28, roughness: 0.34 });
    [0.045, 0.235].forEach((zLocal, idx) => {
        const stick = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.28, 1.14, 0.042), ramBodyMat);
        const trim = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.14, 0.044), silverMetal);
        trim.position.x = 0.09;
        const rgbBar = new THREE.Mesh(
            new THREE.BoxGeometry(0.04, 1.12, 0.045),
            new THREE.MeshStandardMaterial({ color: '#10b981', emissive: '#10b981', emissiveIntensity: 1.3 })
        );
        rgbBar.position.x = 0.145;
        rgbMaterials.push({ mat: rgbBar.material, phaseOffset: 1.2 + idx * 0.6 });
        const goldPins = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.10, 0.02), goldMat);
        goldPins.position.x = -0.15;
        stick.add(body, trim, rgbBar, goldPins);
        stick.position.z = zLocal - 0.12;
        ramGroup.add(stick);
    });

    // ------------------------------------------------------------------------
    // 7. SSD NVMe M.2 (home: [-0.44, 0.24, -0.25]) — Amber-Gold Armor
    // ------------------------------------------------------------------------
    const nvmeGroup = new THREE.Group();
    const nvmePcb = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.18, 0.76),
        new THREE.MeshStandardMaterial({ color: '#10b981', roughness: 0.4 })
    );
    const nvmeCtrl = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.10, 0.10), darkSlate);
    nvmeCtrl.position.set(0.015, 0, -0.22);
    const nvmeNand1 = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.12, 0.16), darkSlate);
    nvmeNand1.position.set(0.015, 0, -0.02);
    const nvmeNand2 = nvmeNand1.clone();
    nvmeNand2.position.z = 0.18;
    const nvmeArmor = new THREE.Mesh(
        new THREE.BoxGeometry(0.055, 0.20, 0.74),
        new THREE.MeshStandardMaterial({ color: '#d97706', metalness: 0.35, roughness: 0.3 })
    );
    nvmeArmor.position.x = 0.055;
    const nvmeStripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.03, 0.64),
        new THREE.MeshStandardMaterial({ color: '#fbbf24', emissive: '#f59e0b', emissiveIntensity: 1.0 })
    );
    nvmeStripe.position.x = 0.06;
    nvmeGroup.add(nvmePcb, nvmeCtrl, nvmeNand1, nvmeNand2, nvmeArmor, nvmeStripe);

    // ------------------------------------------------------------------------
    // 8. CHIPSET PCH (home: [-0.36, -0.55, 0.42]) — Royal Violet
    // ------------------------------------------------------------------------
    const chipsetGroup = new THREE.Group();
    const pchDie = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.22), silverMetal);
    pchDie.position.x = -0.08;
    const pchHeatsink = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.56, 0.62),
        new THREE.MeshStandardMaterial({ color: '#6d28d9', metalness: 0.32, roughness: 0.30 })
    );
    const pchLed = new THREE.Mesh(
        new THREE.BoxGeometry(0.15, 0.05, 0.46),
        new THREE.MeshStandardMaterial({ color: '#8b5cf6', emissive: '#8b5cf6', emissiveIntensity: 1.3 })
    );
    pchLed.position.x = 0.01;
    rgbMaterials.push({ mat: pchLed.material, phaseOffset: 2.5 });
    chipsetGroup.add(pchDie, pchHeatsink, pchLed);

    // ------------------------------------------------------------------------
    // 9. CMOS BATTERY CR2032 & UEFI BIOS (home: [-0.45, -0.52, -0.38])
    // ------------------------------------------------------------------------
    const cmosGroup = new THREE.Group();
    const holder = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.04, 24), darkSlate);
    holder.rotation.z = Math.PI / 2;
    const coin = new THREE.Mesh(
        new THREE.CylinderGeometry(0.115, 0.115, 0.03, 24),
        new THREE.MeshStandardMaterial({ map: cmosTex, metalness: 0.42, roughness: 0.2 })
    );
    coin.rotation.z = Math.PI / 2;
    coin.position.x = 0.018;
    const biosChip = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.11, 0.09),
        new THREE.MeshStandardMaterial({ color: '#e11d48', roughness: 0.38 })
    );
    biosChip.position.set(0.0, -0.18, 0.16);
    cmosGroup.add(holder, coin, biosChip);

    // ------------------------------------------------------------------------
    // 10. REAR I/O PANEL (home: [-0.30, 0.90, -1.36]) — Brushed Silver
    // ------------------------------------------------------------------------
    const ioGroup = new THREE.Group();
    const ioShield = new THREE.Mesh(new THREE.BoxGeometry(0.36, 1.32, 0.04), silverMetal);
    ioShield.position.z = -0.10;
    const ioHousing = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.24, 0.24), gunmetal);
    ioGroup.add(ioShield, ioHousing);

    const portColors = ['#3b82f6', '#3b82f6', '#ef4444', '#facc15', '#10b981', '#ec4899', '#38bdf8'];
    portColors.forEach((col, idx) => {
        const port = new THREE.Mesh(
            new THREE.BoxGeometry(0.18, 0.11, 0.04),
            new THREE.MeshStandardMaterial({ color: col, metalness: 0.2, roughness: 0.35 })
        );
        port.position.set(0, 0.45 - idx * 0.15, -0.13);
        ioGroup.add(port);
    });

    // ------------------------------------------------------------------------
    // 11. POWER CONNECTORS 24-PIN ATX + 8-PIN EPS (home: [-0.42, 0.65, 0.85])
    // ------------------------------------------------------------------------
    const pwrConnGroup = new THREE.Group();
    const redPlugMat = new THREE.MeshStandardMaterial({ color: '#dc2626', roughness: 0.38, metalness: 0.18 });
    const atx24Socket = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.48, 0.10), darkSlate);
    const atx24Plug = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.46, 0.11), redPlugMat);
    atx24Plug.position.x = 0.08;
    const atxAccent = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.44, 0.115),
        new THREE.MeshStandardMaterial({ color: '#facc15', emissive: '#eab308', emissiveIntensity: 0.65 })
    );
    atxAccent.position.x = 0.14;

    const eps8Plug = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.18), redPlugMat);
    eps8Plug.position.set(0.05, 1.07, -1.97);
    const epsAccent = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.145, 0.185),
        new THREE.MeshStandardMaterial({ color: '#facc15', emissive: '#eab308', emissiveIntensity: 0.65 })
    );
    epsAccent.position.set(0.12, 1.07, -1.97);
    pwrConnGroup.add(atx24Socket, atx24Plug, atxAccent, eps8Plug, epsAccent);

    // ------------------------------------------------------------------------
    // 12. GPU / GRAPHICS CARD (home: [0.18, -0.12, -0.30]) — Purple & Silver
    // ------------------------------------------------------------------------
    const gpuGroup = new THREE.Group();
    const gpuShroud = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.34, 2.24),
        new THREE.MeshStandardMaterial({ color: '#4c1d95', metalness: 0.28, roughness: 0.35 })
    );
    const gpuBackplate = new THREE.Mesh(new THREE.BoxGeometry(0.97, 0.04, 2.26), silverMetal);
    gpuBackplate.position.y = 0.18;

    const gpuRgbStrip = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 0.07, 1.85),
        new THREE.MeshStandardMaterial({ color: '#a855f7', emissive: '#a855f7', emissiveIntensity: 1.5 })
    );
    gpuRgbStrip.position.set(0.475, 0.08, 0.05);
    rgbMaterials.push({ mat: gpuRgbStrip.material, phaseOffset: 3.1 });

    const gpuPcieEdge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.96), goldMat);
    gpuPcieEdge.position.set(-0.54, 0.0, -0.14);

    const gpuBracket = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.38, 0.04), silverMetal);
    gpuBracket.position.set(-0.02, 0.02, -1.14);

    const gpuPwrPort = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.10, 0.16), goldMat);
    gpuPwrPort.position.set(0.46, 0.14, 0.55);

    for (let gf = 0; gf < 3; gf++) {
        const gFan = createFanAssembly(0.28, 0.05, gf * 0.4, '#a855f7');
        gFan.rotation.x = Math.PI / 2;
        gFan.position.set(0.02, -0.18, -0.68 + gf * 0.68);
        gpuGroup.add(gFan);
    }
    gpuGroup.add(gpuShroud, gpuBackplate, gpuRgbStrip, gpuPcieEdge, gpuBracket, gpuPwrPort);

    // ------------------------------------------------------------------------
    // 13. CASE CHASSIS & TEMPERED GLASS (home: [0, 0, 0]) — Titanium Slate
    // ------------------------------------------------------------------------
    const caseGroup = new THREE.Group();
    const caseFrame = new THREE.Group();
    const caseMat = slateChassis;
    const meshMat = new THREE.MeshStandardMaterial({
        color: '#334155',
        metalness: 0.25,
        roughness: 0.45
    });

    const bottomPlate = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.08, 4.46), caseMat);
    bottomPlate.position.set(0.22, -2.06, 0.36);
    caseFrame.add(bottomPlate);

    [[-0.72, -1.65], [1.16, -1.65], [-0.72, 2.38], [1.16, 2.38]].forEach(([fx, fz]) => {
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.14, 16), silverMetal);
        foot.position.set(fx, -2.17, fz);
        caseFrame.add(foot);
    });

    const topFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.09, 4.46), caseMat);
    topFrameL.position.set(-0.70, 2.32, 0.36);
    const topFrameR = topFrameL.clone();
    topFrameR.position.x = 1.14;
    const topMesh = new THREE.Mesh(new THREE.BoxGeometry(1.50, 0.04, 3.80), meshMat);
    topMesh.position.set(0.22, 2.32, 0.36);
    caseFrame.add(topFrameL, topFrameR, topMesh);

    const backPostL = new THREE.Mesh(new THREE.BoxGeometry(0.28, 4.42, 0.10), caseMat);
    backPostL.position.set(-0.73, 0.13, -1.84);
    const backPostR = backPostL.clone();
    backPostR.position.x = 1.16;
    const backTopBar = new THREE.Mesh(new THREE.BoxGeometry(2.18, 0.25, 0.10), caseMat);
    backTopBar.position.set(0.22, 2.22, -1.84);
    caseFrame.add(backPostL, backPostR, backTopBar);

    const frontPostL = new THREE.Mesh(new THREE.BoxGeometry(0.22, 4.42, 0.18), caseMat);
    frontPostL.position.set(-0.76, 0.13, 2.50);
    const frontPostR = frontPostL.clone();
    frontPostR.position.x = 1.20;
    const frontMesh = new THREE.Mesh(new THREE.BoxGeometry(1.75, 4.18, 0.05), meshMat);
    frontMesh.position.set(0.22, 0.13, 2.56);
    caseFrame.add(frontPostL, frontPostR, frontMesh);

    const moboTray = new THREE.Mesh(new THREE.BoxGeometry(0.06, 4.38, 4.38), darkSlate);
    moboTray.position.set(-0.82, 0.13, 0.36);
    caseFrame.add(moboTray);

    const shroudTop = new THREE.Mesh(new THREE.BoxGeometry(1.98, 0.05, 4.20), gunmetal);
    shroudTop.position.set(0.18, -1.15, 0.34);
    const shroudSide = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.90, 4.20), gunmetal);
    shroudSide.position.set(1.16, -1.60, 0.34);
    const shroudTrim = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.04, 4.18),
        new THREE.MeshStandardMaterial({ color: '#0ea5e9', emissive: '#0284c7', emissiveIntensity: 0.7 })
    );
    shroudTrim.position.set(1.165, -1.15, 0.34);
    caseFrame.add(shroudTop, shroudSide, shroudTrim);

    const glassGroup = new THREE.Group();
    const glassPane = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 4.28, 4.30),
        new THREE.MeshPhysicalMaterial({
            color: '#7dd3fc',
            transparent: true,
            opacity: 0.16,
            roughness: 0.08,
            metalness: 0.1,
            reflectivity: 0.9
        })
    );
    glassPane.material.userData = { skipOrigSave: true };
    glassPane.userData.edgeColor = '#7dd3fc';
    glassPane.userData.edgeOpacity = 0.75;
    const glassTrim = new THREE.Mesh(
        new THREE.BoxGeometry(0.045, 4.32, 0.12),
        gunmetal
    );
    glassTrim.position.z = 2.12;
    const glassTrimBack = glassTrim.clone();
    glassTrimBack.position.z = -2.12;
    glassGroup.add(glassPane, glassTrim, glassTrimBack);
    glassGroup.position.set(1.28, 0.13, 0.36);

    caseGroup.add(caseFrame, glassGroup);

    // ------------------------------------------------------------------------
    // 14. POWER SUPPLY UNIT (PSU) (home: [-0.10, -1.68, -1.05])
    // ------------------------------------------------------------------------
    const psuGroup = new THREE.Group();
    const psuBox = new THREE.Mesh(
        new THREE.BoxGeometry(1.38, 0.80, 1.46),
        [
            new THREE.MeshStandardMaterial({ map: psuTex, roughness: 0.35 }),
            darkSlate,
            darkSlate,
            darkSlate,
            darkSlate,
            darkSlate
        ]
    );
    psuBox.userData.edgeColor = '#eab308';
    psuBox.userData.edgeOpacity = 0.55;
    psuGroup.add(psuBox);

    for (let m = 0; m < 4; m++) {
        const modPort = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.05), goldMat);
        modPort.position.set(-0.36 + m * 0.24, 0.12, 0.74);
        const modPort2 = modPort.clone();
        modPort2.position.y = -0.14;
        psuGroup.add(modPort, modPort2);
    }

    const acInlet = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.18, 0.06), silverMetal);
    acInlet.position.set(0.32, -0.16, -0.74);
    const psuSwitch = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.16, 0.06),
        new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.35 })
    );
    psuSwitch.position.set(0.04, -0.16, -0.74);
    const psuFan = createFanAssembly(0.34, 0.06, 4.2, '#eab308');
    psuFan.rotation.x = Math.PI / 2;
    psuFan.position.set(0, -0.40, 0);
    psuGroup.add(acInlet, psuSwitch, psuFan);

    // ------------------------------------------------------------------------
    // 15. STORAGE SATA (3.5" HDD + 2.5" SSD) (home: [-0.15, -1.65, 1.25])
    // ------------------------------------------------------------------------
    const sataGroup = new THREE.Group();
    const hddBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.24, 1.32), cobaltMat);
    const hddTop = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.04, 1.24), silverMetal);
    hddTop.position.y = 0.13;
    const hddPlatter = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.02, 24), gunmetal);
    hddPlatter.position.set(0, 0.155, -0.12);

    const sataSsd = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.10, 0.96),
        new THREE.MeshStandardMaterial({ color: '#ea580c', roughness: 0.36, metalness: 0.2 })
    );
    sataSsd.position.set(0.10, 0.32, -0.05);
    const sataSsdStripe = new THREE.Mesh(
        new THREE.BoxGeometry(0.70, 0.04, 0.72),
        new THREE.MeshStandardMaterial({ color: '#fb923c', emissive: '#f97316', emissiveIntensity: 0.65 })
    );
    sataSsdStripe.position.set(0.10, 0.35, -0.05);
    sataGroup.add(hddBody, hddTop, hddPlatter, sataSsd, sataSsdStripe);

    // ------------------------------------------------------------------------
    // 16. CASE FANS ARGB (3× Intake Front + 1× Exhaust Rear) (home: [0.18, 0.65, 0.25])
    // ------------------------------------------------------------------------
    const fansGroup = new THREE.Group();
    const frontFansSub = new THREE.Group();
    [-1.18, 0.02, 1.22].forEach((yOff, idx) => {
        const f = createFanAssembly(0.46, 0.16, idx * 0.5, '#00f0ff');
        f.position.set(0.0, yOff, 1.98);
        frontFansSub.add(f);
    });
    const rearFanSub = new THREE.Group();
    const rearFan = createFanAssembly(0.46, 0.16, 2.0, '#00f0ff');
    rearFan.position.set(0.0, 0.42, -1.94);
    rearFanSub.add(rearFan);
    fansGroup.add(frontFansSub, rearFanSub);

    // Map IDs -> Groups & SubAnim References
    const meshMap = {
        'motherboard': { group: moboGroup, subAnim: {} },
        'cpu-socket': { group: socketGroup, subAnim: { ilmPivot, leverArm } },
        'cpu': { group: cpuGroup, subAnim: {} },
        'cpu-cooler': { group: coolerGroup, subAnim: {} },
        'vrm-heatsink': { group: vrmGroup, subAnim: {} },
        'ram': { group: ramGroup, subAnim: {} },
        'ssd-nvme': { group: nvmeGroup, subAnim: {} },
        'chipset': { group: chipsetGroup, subAnim: {} },
        'cmos-bios': { group: cmosGroup, subAnim: {} },
        'io-panel': { group: ioGroup, subAnim: {} },
        'power-connectors': { group: pwrConnGroup, subAnim: {} },
        'gpu': { group: gpuGroup, subAnim: {} },
        'case-chassis': { group: caseGroup, subAnim: { glassGroup, caseFrame } },
        'psu': { group: psuGroup, subAnim: {} },
        'storage-sata': { group: sataGroup, subAnim: {} },
        'case-fans': { group: fansGroup, subAnim: { frontFansSub, rearFanSub } }
    };

    COMPONENTS.forEach((comp) => {
        const entry = meshMap[comp.id];
        if (!entry) return;
        const { group, subAnim } = entry;
        group.position.set(...comp.homePos);
        registerMeshRecursive(group, comp.id);
        scene.add(group);

        // Dashed 3D Leader Line connecting homePos -> currentPos
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...comp.homePos),
            new THREE.Vector3(...comp.homePos)
        ]);
        const lineMat = new THREE.LineDashedMaterial({
            color: comp.badgeColor || '#00f0ff',
            dashSize: 0.14,
            gapSize: 0.08,
            transparent: true,
            opacity: 0.72
        });
        const leaderLine = new THREE.Line(lineGeo, lineMat);
        leaderLine.visible = false;
        scene.add(leaderLine);

        componentEntries.set(comp.id, {
            data: comp,
            group,
            subAnim,
            homePos: new THREE.Vector3(...comp.homePos),
            explodeVec: new THREE.Vector3(...comp.explodeOffset),
            moboExplodeVec: new THREE.Vector3(...comp.moboExplodeOffset),
            labelLocal: new THREE.Vector3(...comp.labelLocal),
            leaderLine
        });
    });
}

// ============================================================================
// 6. AIRFLOW PARTICLES & MOTHERBOARD DATA BUS PULSES
// ============================================================================
const airflowGroup = new THREE.Group();
const airflowParticles = [];

function buildAirflowSystem() {
    const geo = new THREE.SphereGeometry(0.042, 8, 8);
    for (let i = 0; i < 84; i++) {
        const mat = new THREE.MeshBasicMaterial({
            color: '#00f0ff',
            transparent: true,
            opacity: 0.85
        });
        const p = new THREE.Mesh(geo, mat);
        const laneY = -0.7 + (i % 7) * 0.42;
        const laneX = -0.15 + ((i * 7) % 5) * 0.20;
        p.userData = {
            t: (i / 84) % 1,
            speed: 0.28 + (i % 4) * 0.05,
            laneY,
            laneX
        };
        airflowGroup.add(p);
        airflowParticles.push(p);
    }
    airflowGroup.visible = false;
    scene.add(airflowGroup);
}

const dataBusGroup = new THREE.Group();
const dataPulses = [];

function buildDataBusSystem() {
    const routes = [
        // CPU -> RAM
        { color: '#10b981', pts: [[-0.45, 0.95, -0.35], [-0.45, 0.95, 0.34]] },
        // CPU -> GPU (PCIe 4.0 x16)
        { color: '#a855f7', pts: [[-0.45, 0.95, -0.35], [-0.45, -0.12, -0.35], [0.18, -0.12, -0.30]] },
        // CPU -> NVMe M.2
        { color: '#f59e0b', pts: [[-0.45, 0.95, -0.35], [-0.45, 0.24, -0.25]] },
        // CPU -> Chipset PCH -> SATA
        { color: '#00f0ff', pts: [[-0.45, 0.95, -0.35], [-0.45, -0.55, 0.42], [-0.15, -1.65, 1.25]] },
        // PSU -> 24-Pin ATX & GPU Power
        { color: '#ef4444', pts: [[-0.10, -1.68, -1.05], [-0.42, 0.65, 0.85]] },
        { color: '#ef4444', pts: [[-0.10, -1.68, -1.05], [0.35, -0.12, 0.25]] }
    ];

    const pulseGeo = new THREE.SphereGeometry(0.048, 10, 10);
    routes.forEach((route) => {
        const vecs = route.pts.map(p => new THREE.Vector3(...p));
        const curve = new THREE.CatmullRomCurve3(vecs);

        const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.014, 6, false);
        const tubeMat = new THREE.MeshBasicMaterial({
            color: route.color,
            transparent: true,
            opacity: 0.38
        });
        dataBusGroup.add(new THREE.Mesh(tubeGeo, tubeMat));

        for (let k = 0; k < 3; k++) {
            const pMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
            const pulse = new THREE.Mesh(pulseGeo, pMat);
            const glowHalo = new THREE.Mesh(
                new THREE.SphereGeometry(0.085, 8, 8),
                new THREE.MeshBasicMaterial({ color: route.color, transparent: true, opacity: 0.48 })
            );
            pulse.add(glowHalo);
            pulse.userData = { curve, t: k / 3, speed: 0.42 };
            dataBusGroup.add(pulse);
            dataPulses.push(pulse);
        }
    });

    dataBusGroup.visible = false;
    scene.add(dataBusGroup);
}

// ============================================================================
// 7. SELECTION, CAMERA & UI SYNCHRONIZATION
// ============================================================================
function getComponentById(id) {
    return COMPONENTS.find(c => c.id === id);
}

function flyCameraTo(pos, look) {
    camAnim.targetPos.set(...pos);
    camAnim.targetLook.set(...look);
    camAnim.active = true;
}

function setCameraPreset(preset) {
    document.querySelectorAll('[data-cam]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cam === preset);
    });
    if (preset === 'iso') {
        flyCameraTo([6.2, 2.7, 5.8], [-0.1, 0.15, -0.05]);
    } else if (preset === 'mobo') {
        flyCameraTo([4.3, 0.85, 1.8], [-0.25, 0.42, -0.20]);
    } else if (preset === 'side') {
        flyCameraTo([7.4, 0.35, -0.1], [-0.3, 0.35, -0.1]);
    } else if (preset === 'top') {
        flyCameraTo([0.2, 8.2, 0.6], [-0.1, 0.1, 0.0]);
    } else if (preset === 'rear') {
        flyCameraTo([3.2, 1.4, -5.8], [-0.2, 0.2, -0.6]);
    }
}

function selectComponent(id, focusCam = true) {
    const comp = getComponentById(id);
    if (!comp) return;
    state.selectedId = id;

    // Update Outliner active row
    document.querySelectorAll('.outliner-item').forEach(el => {
        el.classList.toggle('active', el.dataset.id === id);
    });

    // Update 3D Pins active state
    document.querySelectorAll('.pin-3d').forEach(el => {
        el.classList.toggle('active', el.dataset.id === id);
    });

    // Populate Right Inspector
    const idx = COMPONENTS.findIndex(c => c.id === id);
    document.getElementById('insp-number').textContent = `#${String(comp.number).padStart(2, '0')}`;
    document.getElementById('insp-cat').textContent = comp.categoryLabel;
    document.getElementById('insp-icon').textContent = comp.icon;
    document.getElementById('insp-name').textContent = comp.name;
    document.getElementById('insp-slot').textContent = comp.slot;
    document.getElementById('insp-summary').textContent = comp.summary;
    document.getElementById('insp-analogy').textContent = comp.analogy;
    document.getElementById('insp-tip').textContent = comp.assemblyTip;
    document.getElementById('insp-counter').textContent = `${idx + 1} / ${COMPONENTS.length}`;

    // Subparts
    const spWrap = document.getElementById('insp-subparts');
    spWrap.innerHTML = comp.subParts.map(sp => `
        <div class="subpart-item">
            <div class="subpart-title">${sp.title}</div>
            <div class="subpart-detail">${sp.detail}</div>
        </div>
    `).join('');

    // Specs
    const specWrap = document.getElementById('insp-specs');
    specWrap.innerHTML = Object.entries(comp.specs).map(([k, v]) => `
        <div class="spec-row">
            <span class="spec-key">${k}</span>
            <span class="spec-val">${v}</span>
        </div>
    `).join('');

    // Connections (clickable chips)
    const connHtml = comp.connectedTo.map(cid => {
        const target = getComponentById(cid);
        if (!target) return '';
        return `<button class="conn-chip" data-jump-id="${target.id}">${target.icon} ${target.shortName}</button>`;
    }).join('');
    document.getElementById('insp-connections-quick').innerHTML = connHtml;
    document.getElementById('insp-connections-full').innerHTML = connHtml;

    // Real component photo at bottom of "Penjelasan" tab
    const photoCard = document.getElementById('insp-photo-card');
    const photoImg = document.getElementById('insp-real-photo');
    const photoCap = document.getElementById('insp-photo-caption');
    const photoCred = document.getElementById('insp-photo-credit');
    if (photoCard && photoImg) {
        if (comp.realPhoto) {
            photoImg.src = comp.realPhoto;
            photoImg.alt = `Foto asli ${comp.name}`;
            if (photoCap) photoCap.textContent = comp.photoCaption || '';
            if (photoCred) photoCred.textContent = comp.photoCredit || '';
            photoCard.classList.remove('hidden');
        } else {
            photoImg.removeAttribute('src');
            photoImg.alt = '';
            photoCard.classList.add('hidden');
        }
    }

    syncInspectorActionButtons();

    if (focusCam) {
        const entry = componentEntries.get(id);
        const curPos = entry ? entry.group.position : new THREE.Vector3(...comp.homePos);
        const delta = curPos.clone().sub(new THREE.Vector3(...comp.homePos));
        const target = [
            comp.camTarget[0] + delta.x,
            comp.camTarget[1] + delta.y,
            comp.camTarget[2] + delta.z
        ];
        const pos = [
            comp.camPos[0] + delta.x,
            comp.camPos[1] + delta.y,
            comp.camPos[2] + delta.z
        ];
        flyCameraTo(pos, target);
    }
}

function syncInspectorActionButtons() {
    const id = state.selectedId;
    const isDetached = state.detachedIds.has(id);
    const isHidden = state.hiddenIds.has(id);

    const btnDetach = document.getElementById('btn-insp-detach');
    btnDetach.classList.toggle('active', isDetached);
    document.getElementById('insp-detach-ico').textContent = isDetached ? '📥' : '⏏️';
    document.getElementById('insp-detach-txt').textContent = isDetached ? 'Pasang Slot' : 'Lepas Slot';

    const btnHide = document.getElementById('btn-insp-hide');
    btnHide.classList.toggle('active', isHidden);
    document.getElementById('insp-hide-ico').textContent = isHidden ? '🙈' : '👁️';
    document.getElementById('insp-hide-txt').textContent = isHidden ? 'Tampilkan' : 'Sembunyi';

    document.getElementById('btn-insp-solo').classList.toggle('active', state.soloMode);
    document.getElementById('toggle-solo').classList.toggle('active', state.soloMode);

    // Update visible count HUD
    const visCount = COMPONENTS.length - state.hiddenIds.size;
    document.getElementById('hud-visible-count').textContent = `${visCount}/${COMPONENTS.length}`;
}

function renderOutliner() {
    const list = document.getElementById('outliner-list');
    const q = state.searchQuery.trim().toLowerCase();

    const filtered = COMPONENTS.filter(c => {
        if (state.filterCategory !== 'all' && c.category !== state.filterCategory) return false;
        if (q && !c.name.toLowerCase().includes(q) && !c.slot.toLowerCase().includes(q) && !c.shortName.toLowerCase().includes(q)) {
            return false;
        }
        return true;
    });

    list.innerHTML = filtered.map(c => {
        const active = c.id === state.selectedId ? 'active' : '';
        const hidden = state.hiddenIds.has(c.id) ? 'is-hidden' : '';
        const detached = state.detachedIds.has(c.id) ? 'toggled' : '';
        const hideToggle = state.hiddenIds.has(c.id) ? 'toggled' : '';
        return `
            <div class="outliner-item ${active} ${hidden}" data-id="${c.id}" role="listitem">
                <span class="oi-num">${String(c.number).padStart(2, '0')}</span>
                <span class="oi-icon">${c.icon}</span>
                <div class="oi-meta">
                    <div class="oi-name">${c.shortName}</div>
                    <div class="oi-slot">${c.slot}</div>
                </div>
                <div class="oi-actions">
                    <button class="oi-btn ${detached}" data-act="detach" data-id="${c.id}" title="Lepas / Pasang dari Slot">⏏️</button>
                    <button class="oi-btn ${hideToggle}" data-act="hide" data-id="${c.id}" title="Tampilkan / Sembunyikan">👁️</button>
                </div>
            </div>
        `;
    }).join('');
}

function createPinElements() {
    const overlay = document.getElementById('labels-overlay');
    overlay.innerHTML = COMPONENTS.map(c => `
        <button class="pin-3d ${c.id === state.selectedId ? 'active' : ''}" data-id="${c.id}" title="${c.name}">
            <span class="pin-num">${c.number}</span>
            <span>${c.shortName}</span>
        </button>
    `).join('');

    overlay.querySelectorAll('.pin-3d').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            sfx.click();
            const id = btn.dataset.id;
            if (state.mode === 'assembly') {
                handleAssemblyClick(id);
            } else {
                selectComponent(id, true);
            }
        });
    });
}

// ============================================================================
// 8. MODE & BREAKDOWN CONTROLLERS
// ============================================================================
function setExplode(pct, focusMode = null) {
    state.explodePct = Math.max(0, Math.min(100, Number(pct)));
    if (focusMode) state.explodeFocus = focusMode;
    document.getElementById('explode-slider').value = state.explodePct;
    document.getElementById('explode-pct-badge').textContent = `${state.explodePct}%`;
    document.getElementById('hud-explode-val').textContent = `${state.explodePct}%`;

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.explode) === state.explodePct);
    });
}

function setMode(mode) {
    state.mode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    const modeLabels = {
        explore: 'MODE: EKSPLORASI 3D',
        explode: 'MODE: BREAKDOWN KOMPONEN',
        assembly: 'MODE: SIMULASI RAKIT BERTAHAP',
        flow: 'MODE: ALUR DATA & AIRFLOW'
    };
    document.getElementById('hud-mode-label').textContent = modeLabels[mode] || 'MODE: 3D';

    const asmBar = document.getElementById('assembly-bar');
    if (mode === 'assembly') {
        asmBar.classList.remove('hidden');
        startAssemblyMode();
    } else {
        asmBar.classList.add('hidden');
        state.postBooted = true;
    }

    if (mode === 'explore') {
        setExplode(0, 'iso');
        setCameraPreset('iso');
    } else if (mode === 'explode') {
        setExplode(72, 'mobo');
        setCameraPreset('mobo');
    } else if (mode === 'flow') {
        setExplode(35, 'iso');
        state.showAirflow = true;
        state.showDataBus = true;
        document.getElementById('toggle-airflow').classList.add('active');
        document.getElementById('toggle-databus').classList.add('active');
        setCameraPreset('iso');
    }
}

function getInstalledSetInAssembly() {
    const installed = new Set();
    for (let i = 0; i < state.assemblyStepIdx; i++) {
        const sid = ASSEMBLY_STEPS[i].targetId;
        installed.add(sid);
        if (sid === 'motherboard') {
            installed.add('vrm-heatsink');
            installed.add('chipset');
            installed.add('cmos-bios');
            installed.add('io-panel');
        } else if (sid === 'case-chassis') {
            installed.add('case-fans');
        } else if (sid === 'power-connectors') {
            installed.add('storage-sata');
        }
    }
    return installed;
}

function startAssemblyMode() {
    state.assemblyStepIdx = 0;
    state.assemblyCompleted = false;
    state.postBooted = false;
    state.soloMode = false;
    state.hiddenIds.clear();
    state.detachedIds.clear();
    setExplode(0, 'iso');
    document.getElementById('post-toast').classList.add('hidden');
    syncAssemblyUI();
    renderOutliner();
}

function syncAssemblyUI() {
    const dotsEl = document.getElementById('assembly-dots');
    dotsEl.innerHTML = ASSEMBLY_STEPS.map((st, idx) => {
        let cls = '';
        if (idx < state.assemblyStepIdx) cls = 'done';
        else if (idx === state.assemblyStepIdx && !state.assemblyCompleted) cls = 'current';
        return `<span class="asm-dot ${cls}"></span>`;
    }).join('');

    const installBtn = document.getElementById('btn-assembly-install');
    if (state.assemblyCompleted) {
        document.getElementById('assembly-step-badge').textContent = 'PERAKITAN SELESAI (10/10)';
        document.getElementById('assembly-title').textContent = 'PC Berhasil Dirakit & Menjalankan POST!';
        document.getElementById('assembly-desc').textContent = 'Seluruh komponen telah terpasang. Kipas menyala dan sistem siap dieksplorasi.';
        installBtn.style.display = 'none';
    } else {
        const cur = ASSEMBLY_STEPS[state.assemblyStepIdx];
        document.getElementById('assembly-step-badge').textContent = `LANGKAH ${cur.step} / ${ASSEMBLY_STEPS.length}`;
        document.getElementById('assembly-title').textContent = cur.title;
        document.getElementById('assembly-desc').textContent = cur.instruction;
        installBtn.style.display = 'inline-flex';
        selectComponent(cur.targetId, true);
    }
}

function advanceAssemblyStep() {
    if (state.assemblyCompleted) return;
    sfx.snapIn();
    state.assemblyStepIdx++;
    if (state.assemblyStepIdx >= ASSEMBLY_STEPS.length) {
        state.assemblyCompleted = true;
        state.postBooted = true;
        state.showAirflow = true;
        state.showDataBus = true;
        document.getElementById('toggle-airflow').classList.add('active');
        document.getElementById('toggle-databus').classList.add('active');
        setCameraPreset('iso');
        sfx.postBoot();
        document.getElementById('post-toast').classList.remove('hidden');
    }
    syncAssemblyUI();
}

function handleAssemblyClick(clickedId) {
    if (state.assemblyCompleted) {
        selectComponent(clickedId, true);
        return;
    }
    const cur = ASSEMBLY_STEPS[state.assemblyStepIdx];
    if (clickedId === cur.targetId) {
        advanceAssemblyStep();
    } else {
        selectComponent(clickedId, false);
    }
}

// ============================================================================
// 9. RAYCASTING (HOVER & CLICK ON 3D MESHES)
// ============================================================================
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let pointerDownPos = { x: 0, y: 0 };
const tooltip = document.getElementById('hover-tooltip');

renderer.domElement.addEventListener('pointerdown', (e) => {
    pointerDownPos = { x: e.clientX, y: e.clientY };
});

renderer.domElement.addEventListener('pointermove', (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickableMeshes, false);
    const visibleHit = hits.find(h => {
        let obj = h.object;
        while (obj) {
            if (!obj.visible) return false;
            obj = obj.parent;
        }
        return true;
    });

    if (visibleHit) {
        const cid = visibleHit.object.userData.componentId;
        state.hoveredId = cid;
        renderer.domElement.style.cursor = 'pointer';
        const comp = getComponentById(cid);
        if (comp) {
            document.getElementById('tt-title').textContent = `${comp.icon} ${comp.name}`;
            document.getElementById('tt-sub').textContent = `${comp.slot} • Klik untuk detail`;
            tooltip.style.left = `${Math.min(window.innerWidth - 250, e.clientX + 14)}px`;
            tooltip.style.top = `${Math.max(64, e.clientY - 46)}px`;
            tooltip.classList.remove('hidden');
        }
    } else {
        state.hoveredId = null;
        renderer.domElement.style.cursor = 'grab';
        tooltip.classList.add('hidden');
    }
});

renderer.domElement.addEventListener('pointerleave', () => {
    state.hoveredId = null;
    tooltip.classList.add('hidden');
});

renderer.domElement.addEventListener('pointerup', (e) => {
    const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    if (dist > 6) return; // Ignore camera orbit drags
    if (state.hoveredId) {
        sfx.click();
        if (state.mode === 'assembly') {
            handleAssemblyClick(state.hoveredId);
        } else {
            selectComponent(state.hoveredId, true);
        }
    }
});

// ============================================================================
// 10. ANIMATION & RENDER LOOP
// ============================================================================
const clock = new THREE.Clock();
const tmpVec = new THREE.Vector3();
const tempProj = new THREE.Vector3();

function updateMaterialsVisuals() {
    componentEntries.forEach((entry, id) => {
        const isSelected = id === state.selectedId;
        const isHovered = id === state.hoveredId;
        const isAsmTarget = state.mode === 'assembly' && !state.assemblyCompleted && ASSEMBLY_STEPS[state.assemblyStepIdx]?.targetId === id;

        entry.group.traverse((obj) => {
            if (!obj.isMesh || !obj.material) return;
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((mat) => {
                const orig = mat.userData?.origMat;
                if (!orig) return;

                if (state.xray) {
                    mat.wireframe = true;
                    mat.transparent = true;
                    mat.opacity = isSelected ? 0.95 : 0.45;
                } else {
                    mat.wireframe = orig.wireframe;
                    mat.transparent = orig.transparent;
                    mat.opacity = orig.opacity;
                }

                if (mat.emissive && !rgbMaterials.some(r => r.mat === mat)) {
                    if (isAsmTarget) {
                        mat.emissive.set('#00f0ff');
                        mat.emissiveIntensity = 0.45 + Math.sin(clock.elapsedTime * 5) * 0.25;
                    } else if (isSelected && state.mode !== 'assembly') {
                        mat.emissive.set('#00f0ff');
                        mat.emissiveIntensity = 0.22;
                    } else if (isHovered) {
                        mat.emissive.set('#38bdf8');
                        mat.emissiveIntensity = 0.30;
                    } else {
                        mat.emissive.setHex(orig.emissiveHex);
                        mat.emissiveIntensity = orig.emissiveIntensity;
                    }
                }
            });
        });
    });
}

function updateProjectedLabels() {
    const overlay = document.getElementById('labels-overlay');
    const w = viewportEl.clientWidth;
    const h = viewportEl.clientHeight;
    const pins = overlay.querySelectorAll('.pin-3d');

    pins.forEach((pin) => {
        const id = pin.dataset.id;
        const entry = componentEntries.get(id);
        if (!entry || !state.showLabels || !entry.group.visible) {
            pin.classList.add('hidden-pin');
            return;
        }
        tempProj.copy(entry.labelLocal).applyMatrix4(entry.group.matrixWorld);
        tempProj.project(camera);

        if (tempProj.z > 1 || tempProj.z < -1) {
            pin.classList.add('hidden-pin');
            return;
        }

        const x = (tempProj.x * 0.5 + 0.5) * w;
        const y = (-tempProj.y * 0.5 + 0.5) * h;

        if (x < 24 || x > w - 24 || y < 52 || y > h - 98) {
            pin.classList.add('hidden-pin');
            return;
        }

        pin.classList.remove('hidden-pin');
        pin.style.left = `${x}px`;
        pin.style.top = `${y}px`;
    });
}

function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;
    const tExplode = state.explodePct / 100;
    const installedSet = state.mode === 'assembly' ? getInstalledSetInAssembly() : null;
    const currentAsmTarget = (state.mode === 'assembly' && !state.assemblyCompleted)
        ? ASSEMBLY_STEPS[state.assemblyStepIdx]?.targetId
        : null;

    // 1. Update Component Visibility & Interpolated 3D Positions + Leader Lines
    componentEntries.forEach((entry, id) => {
        let visible = !state.hiddenIds.has(id);
        if (state.soloMode && id !== state.selectedId) visible = false;

        if (installedSet) {
            const isInstalled = installedSet.has(id);
            const isTarget = id === currentAsmTarget;
            visible = visible && (isInstalled || isTarget);
        }
        entry.group.visible = visible;

        // Target 3D position
        tmpVec.copy(entry.homePos);
        if (installedSet && id === currentAsmTarget && !installedSet.has(id)) {
            // Hovering above target slot ready to snap in
            tmpVec.addScaledVector(entry.moboExplodeVec, 0.85);
            tmpVec.y += Math.sin(elapsed * 4) * 0.06;
        } else {
            const expVec = state.explodeFocus === 'mobo' ? entry.moboExplodeVec : entry.explodeVec;
            tmpVec.addScaledVector(expVec, tExplode);
            if (state.detachedIds.has(id)) {
                tmpVec.addScaledVector(entry.moboExplodeVec, 0.95);
            }
        }

        entry.group.position.lerp(tmpVec, 0.12);

        // Sub-animations
        if (id === 'case-chassis' && entry.subAnim.glassGroup) {
            const glassSlide = Math.min(1, tExplode * 2.5);
            entry.subAnim.glassGroup.position.x = THREE.MathUtils.lerp(
                entry.subAnim.glassGroup.position.x,
                1.28 + glassSlide * 1.45,
                0.12
            );
            const glassMesh = entry.subAnim.glassGroup.children[0];
            if (glassMesh && glassMesh.material) {
                glassMesh.material.opacity = state.mode === 'assembly' && !state.assemblyCompleted
                    ? 0.05
                    : Math.max(0.05, 0.16 * (1 - glassSlide * 0.7));
            }
        }

        if (id === 'cpu-socket' && entry.subAnim.ilmPivot) {
            const shouldOpen = (state.mode === 'assembly' && state.assemblyStepIdx === 2) ||
                state.detachedIds.has('cpu') ||
                tExplode > 0.25;
            const targetRot = shouldOpen ? 1.15 : 0;
            entry.subAnim.ilmPivot.rotation.z = THREE.MathUtils.lerp(
                entry.subAnim.ilmPivot.rotation.z,
                targetRot,
                0.12
            );
        }

        if (id === 'case-fans' && entry.subAnim.frontFansSub) {
            const split = tExplode * 1.15 + (state.detachedIds.has('case-fans') ? 0.9 : 0);
            entry.subAnim.frontFansSub.position.z = THREE.MathUtils.lerp(entry.subAnim.frontFansSub.position.z, split, 0.12);
            entry.subAnim.rearFanSub.position.z = THREE.MathUtils.lerp(entry.subAnim.rearFanSub.position.z, -split, 0.12);
        }

        // Update 3D Leader Line
        const distFromHome = entry.group.position.distanceTo(entry.homePos);
        if (visible && distFromHome > 0.08 && id !== 'motherboard' && id !== 'case-chassis') {
            entry.leaderLine.visible = true;
            const posAttr = entry.leaderLine.geometry.attributes.position;
            posAttr.setXYZ(0, entry.homePos.x, entry.homePos.y, entry.homePos.z);
            posAttr.setXYZ(1, entry.group.position.x, entry.group.position.y, entry.group.position.z);
            posAttr.needsUpdate = true;
            entry.leaderLine.computeLineDistances();
        } else {
            entry.leaderLine.visible = false;
        }
    });

    // 2. Spin Fans & Cycle ARGB Glow
    const spinFactor = state.postBooted ? 1 : 0;
    if (spinFactor > 0) {
        animatedFans.forEach((f) => {
            f.mesh.rotation[f.axis] += f.speed * dt * spinFactor;
        });
        rgbMaterials.forEach((r) => {
            const hue = ((elapsed * 0.12) + r.phaseOffset * 0.15) % 1;
            r.mat.color.setHSL(hue, 0.9, 0.56);
            r.mat.emissive.setHSL(hue, 0.95, 0.45);
        });
    }

    // 3. Airflow Particle Stream
    airflowGroup.visible = state.showAirflow && !state.soloMode;
    if (airflowGroup.visible) {
        airflowParticles.forEach((p) => {
            p.userData.t = (p.userData.t + p.userData.speed * dt) % 1;
            const t = p.userData.t;
            // Travel from front intake (+2.45) to rear exhaust (-2.05)
            const z = THREE.MathUtils.lerp(2.45, -2.05, t);
            const y = p.userData.laneY + Math.sin(t * Math.PI * 2 + p.userData.laneX * 4) * 0.18;
            p.position.set(p.userData.laneX, y, z);
            // Color transitions from cool cyan intake to warm amber/orange exhaust
            if (t < 0.45) {
                p.material.color.set('#00f0ff');
            } else {
                p.material.color.lerpColors(
                    new THREE.Color('#00f0ff'),
                    new THREE.Color('#fb7185'),
                    (t - 0.45) / 0.55
                );
            }
            p.material.opacity = Math.sin(t * Math.PI) * 0.85;
        });
    }

    // 4. Data Bus Signal Pulses
    dataBusGroup.visible = state.showDataBus && !state.soloMode && state.explodePct < 45;
    if (dataBusGroup.visible) {
        dataPulses.forEach((pulse) => {
            pulse.userData.t = (pulse.userData.t + pulse.userData.speed * dt) % 1;
            pulse.position.copy(pulse.userData.curve.getPointAt(pulse.userData.t));
        });
    }

    // 5. Camera Smooth Fly-To & Auto-Rotate
    if (camAnim.active) {
        camera.position.lerp(camAnim.targetPos, 0.08);
        controls.target.lerp(camAnim.targetLook, 0.08);
        if (camera.position.distanceTo(camAnim.targetPos) < 0.03) {
            camAnim.active = false;
        }
    }
    controls.autoRotate = state.autoRotate;
    controls.autoRotateSpeed = 1.4;
    controls.update();

    updateMaterialsVisuals();
    renderer.render(scene, camera);
    updateProjectedLabels();
}

// ============================================================================
// 11. DOM EVENT LISTENERS & INITIALIZATION
// ============================================================================
function bindEvents() {
    // Resize handler
    window.addEventListener('resize', () => {
        const w = viewportEl.clientWidth;
        const h = Math.max(1, viewportEl.clientHeight);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });

    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sfx.click();
            setMode(btn.dataset.mode);
        });
    });

    // Outliner search & category filter
    document.getElementById('component-search').addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderOutliner();
    });
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            sfx.click();
            state.filterCategory = tab.dataset.filter;
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderOutliner();
        });
    });

    // Outliner row clicks & inline eye/detach buttons
    document.getElementById('outliner-list').addEventListener('click', (e) => {
        const btn = e.target.closest('[data-act]');
        if (btn) {
            e.stopPropagation();
            const act = btn.dataset.act;
            const id = btn.dataset.id;
            if (act === 'hide') {
                if (state.hiddenIds.has(id)) {
                    state.hiddenIds.delete(id);
                    sfx.click();
                } else {
                    state.hiddenIds.add(id);
                    sfx.detach();
                }
            } else if (act === 'detach') {
                if (state.detachedIds.has(id)) {
                    state.detachedIds.delete(id);
                    sfx.snapIn();
                } else {
                    state.detachedIds.add(id);
                    sfx.detach();
                    selectComponent(id, true);
                }
            }
            renderOutliner();
            syncInspectorActionButtons();
            return;
        }

        const item = e.target.closest('.outliner-item');
        if (item) {
            sfx.click();
            const id = item.dataset.id;
            if (state.mode === 'assembly') {
                handleAssemblyClick(id);
            } else {
                selectComponent(id, true);
            }
        }
    });

    // Show All & Dock All
    document.getElementById('btn-show-all').addEventListener('click', () => {
        sfx.click();
        state.hiddenIds.clear();
        state.soloMode = false;
        renderOutliner();
        syncInspectorActionButtons();
    });
    document.getElementById('btn-dock-all').addEventListener('click', () => {
        sfx.snapIn();
        state.detachedIds.clear();
        setExplode(0, 'iso');
        renderOutliner();
        syncInspectorActionButtons();
    });

    // Explode slider & presets
    document.getElementById('explode-slider').addEventListener('input', (e) => {
        setExplode(e.target.value, Number(e.target.value) >= 55 && Number(e.target.value) <= 85 ? 'mobo' : 'explode');
    });
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pct = Number(btn.dataset.explode);
            const focus = btn.dataset.focus || 'iso';
            if (pct > state.explodePct) sfx.detach();
            else sfx.snapIn();
            setExplode(pct, focus);
            if (focus === 'mobo') setCameraPreset('mobo');
            else if (pct === 0) setCameraPreset('iso');
            else if (pct === 100) flyCameraTo([7.8, 3.2, 7.2], [0.2, 0.1, 0.0]);
        });
    });

    // Camera preset buttons
    document.querySelectorAll('[data-cam]').forEach(btn => {
        btn.addEventListener('click', () => {
            sfx.click();
            setCameraPreset(btn.dataset.cam);
        });
    });

    // Visual Toggles
    document.getElementById('toggle-rotate').addEventListener('click', (e) => {
        sfx.click();
        state.autoRotate = !state.autoRotate;
        e.currentTarget.classList.toggle('active', state.autoRotate);
    });
    document.getElementById('toggle-labels').addEventListener('click', (e) => {
        sfx.click();
        state.showLabels = !state.showLabels;
        e.currentTarget.classList.toggle('active', state.showLabels);
    });
    document.getElementById('toggle-xray').addEventListener('click', (e) => {
        sfx.click();
        state.xray = !state.xray;
        e.currentTarget.classList.toggle('active', state.xray);
    });
    document.getElementById('toggle-airflow').addEventListener('click', (e) => {
        sfx.click();
        state.showAirflow = !state.showAirflow;
        e.currentTarget.classList.toggle('active', state.showAirflow);
    });
    document.getElementById('toggle-databus').addEventListener('click', (e) => {
        sfx.click();
        state.showDataBus = !state.showDataBus;
        e.currentTarget.classList.toggle('active', state.showDataBus);
    });
    document.getElementById('toggle-solo').addEventListener('click', () => {
        sfx.click();
        state.soloMode = !state.soloMode;
        syncInspectorActionButtons();
    });

    // Inspector quick actions
    document.getElementById('btn-insp-focus').addEventListener('click', () => {
        sfx.click();
        selectComponent(state.selectedId, true);
    });
    document.getElementById('btn-insp-solo').addEventListener('click', () => {
        sfx.click();
        state.soloMode = !state.soloMode;
        syncInspectorActionButtons();
    });
    document.getElementById('btn-insp-detach').addEventListener('click', () => {
        const id = state.selectedId;
        if (state.detachedIds.has(id)) {
            state.detachedIds.delete(id);
            sfx.snapIn();
        } else {
            state.detachedIds.add(id);
            sfx.detach();
        }
        renderOutliner();
        syncInspectorActionButtons();
    });
    document.getElementById('btn-insp-hide').addEventListener('click', () => {
        const id = state.selectedId;
        if (state.hiddenIds.has(id)) {
            state.hiddenIds.delete(id);
            sfx.click();
        } else {
            state.hiddenIds.add(id);
            sfx.detach();
        }
        renderOutliner();
        syncInspectorActionButtons();
    });

    // Inspector tabs
    document.querySelectorAll('.insp-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            sfx.click();
            const target = tab.dataset.tab;
            document.querySelectorAll('.insp-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.insp-tab-pane').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.querySelector(`.insp-tab-pane[data-pane="${target}"]`).classList.add('active');
        });
    });

    // Inspector connection jump chips
    document.getElementById('right-panel').addEventListener('click', (e) => {
        const chip = e.target.closest('[data-jump-id]');
        if (chip) {
            sfx.click();
            selectComponent(chip.dataset.jumpId, true);
        }
    });

    // Prev / Next Component
    document.getElementById('btn-prev-comp').addEventListener('click', () => {
        sfx.click();
        const idx = COMPONENTS.findIndex(c => c.id === state.selectedId);
        const prev = (idx - 1 + COMPONENTS.length) % COMPONENTS.length;
        selectComponent(COMPONENTS[prev].id, true);
    });
    document.getElementById('btn-next-comp').addEventListener('click', () => {
        sfx.click();
        const idx = COMPONENTS.findIndex(c => c.id === state.selectedId);
        const next = (idx + 1) % COMPONENTS.length;
        selectComponent(COMPONENTS[next].id, true);
    });

    // Guided Assembly buttons
    document.getElementById('btn-assembly-install').addEventListener('click', advanceAssemblyStep);
    document.getElementById('btn-assembly-reset').addEventListener('click', () => {
        sfx.click();
        startAssemblyMode();
    });
    document.getElementById('btn-close-post').addEventListener('click', () => {
        document.getElementById('post-toast').classList.add('hidden');
    });

    // Theme, Sound & Help Modal
    document.getElementById('btn-theme').addEventListener('click', () => {
        sfx.click();
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
    document.getElementById('btn-sound').addEventListener('click', (e) => {
        sfx.enabled = !sfx.enabled;
        e.currentTarget.classList.toggle('active', sfx.enabled);
        document.getElementById('sound-icon').textContent = sfx.enabled ? '🔊' : '🔇';
        if (sfx.enabled) sfx.click();
    });
    document.getElementById('btn-help').addEventListener('click', () => {
        sfx.click();
        document.getElementById('help-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-help').addEventListener('click', () => {
        document.getElementById('help-modal').classList.add('hidden');
    });
    document.getElementById('help-modal').addEventListener('click', (e) => {
        if (e.target.id === 'help-modal') {
            document.getElementById('help-modal').classList.add('hidden');
        }
    });

    // Real component photo lightbox triggers
    const photoTrigger = document.getElementById('insp-photo-trigger');
    const photoZoomBtn = document.getElementById('btn-insp-photo-zoom');
    const closePhotoBtn = document.getElementById('btn-close-photo-modal');
    const photoModal = document.getElementById('photo-modal');

    if (photoTrigger) {
        photoTrigger.addEventListener('click', () => { sfx.click(); openPhotoModal(); });
        photoTrigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                sfx.click();
                openPhotoModal();
            }
        });
    }
    if (photoZoomBtn) {
        photoZoomBtn.addEventListener('click', () => { sfx.click(); openPhotoModal(); });
    }
    if (closePhotoBtn) {
        closePhotoBtn.addEventListener('click', () => { sfx.click(); closePhotoModal(); });
    }
    if (photoModal) {
        photoModal.addEventListener('click', (e) => {
            if (e.target.id === 'photo-modal') closePhotoModal();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePhotoModal();
            document.getElementById('help-modal').classList.add('hidden');
        }
    });

    // Mobile side drawers
    document.getElementById('btn-toggle-outliner').addEventListener('click', () => {
        document.getElementById('left-panel').classList.toggle('open');
        document.getElementById('right-panel').classList.remove('open');
    });
    document.getElementById('btn-toggle-inspector').addEventListener('click', () => {
        document.getElementById('right-panel').classList.toggle('open');
        document.getElementById('left-panel').classList.remove('open');
    });
    document.querySelectorAll('[data-close-panel]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById(btn.dataset.closePanel).classList.remove('open');
        });
    });
}

function openPhotoModal() {
    const comp = getComponentById(state.selectedId);
    const modal = document.getElementById('photo-modal');
    if (!comp || !comp.realPhoto || !modal) return;

    const titleEl = document.getElementById('photo-modal-title');
    const subEl = document.getElementById('photo-modal-sub');
    const imgEl = document.getElementById('photo-modal-img');
    const capEl = document.getElementById('photo-modal-caption');
    const credEl = document.getElementById('photo-modal-credit');

    if (titleEl) titleEl.textContent = comp.name;
    if (subEl) subEl.textContent = comp.slot;
    if (imgEl) {
        imgEl.src = comp.realPhoto;
        imgEl.alt = `Foto asli ${comp.name}`;
    }
    if (capEl) capEl.textContent = comp.photoCaption || '';
    if (credEl) credEl.textContent = comp.photoCredit || '';

    modal.classList.remove('hidden');
}

function closePhotoModal() {
    const modal = document.getElementById('photo-modal');
    if (modal) modal.classList.add('hidden');
}

function applyTheme(theme) {
    const isLight = theme === 'light';
    state.theme = isLight ? 'light' : 'dark';
    try {
        localStorage.setItem('holorig_3d_theme', state.theme);
    } catch (_) {}

    document.body.classList.toggle('theme-light', isLight);

    const themeBtn = document.getElementById('btn-theme');
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.textContent = isLight ? '🌙' : '☀️';
    if (themeBtn) {
        themeBtn.title = isLight ? 'Ganti ke Mode Gelap' : 'Ganti ke Mode Terang';
        themeBtn.classList.toggle('active', isLight);
    }

    // Update Three.js studio backdrop, floor grid & lighting
    const bgHex = isLight ? '#eef2f7' : '#0a1224';
    scene.background.set(bgHex);
    scene.fog.color.set(bgHex);
    gridHelper.visible = !isLight;
    lightGridHelper.visible = isLight;
    ringMat.color.set(isLight ? '#0284c7' : '#00f0ff');
    ringMat.opacity = isLight ? 0.30 : 0.26;
    outerRingMat.color.set(isLight ? '#6366f1' : '#8b5cf6');
    outerRingMat.opacity = isLight ? 0.24 : 0.22;

    ambientLight.intensity = isLight ? 1.65 : 1.35;
    hemiLight.intensity = isLight ? 1.35 : 1.25;
    keyLight.intensity = isLight ? 2.6 : 2.4;
    frontFillLight.intensity = isLight ? 1.35 : 1.25;
}

function init() {
    buildAllComponents();
    buildAirflowSystem();
    buildDataBusSystem();
    createPinElements();
    renderOutliner();
    selectComponent('motherboard', false);
    applyTheme(state.theme);
    bindEvents();

    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => loader.remove(), 450);
    }, 350);

    animate();
}

init();
