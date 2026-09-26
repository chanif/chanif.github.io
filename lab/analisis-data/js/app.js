/**
 * Lab Detektif Data & Visualisasi Interaktif
 * Kurikulum Merdeka Fase D (SMP)
 * Author: Ach. Chanifuddin Fanani, S.Pd.
 * 
 * Standalone Engine: Runs smoothly both on file:/// protocol and HTTP/HTTPS (GitHub Pages)
 */

// ========================================================
// 1. DATASET SURVEI SISWA & ANOMALI DATA
// ========================================================
const INITIAL_STUDENTS = [
    { id: "S-01", nama: "Ahmad Rizky", kelas: "8A", gender: "L", jamBelajar: 3.5, screenTime: 2.0, jamTidur: 8.0, nilaiUjian: 92, ekskul: "Robotik", airPutih: 8 },
    { id: "S-02", nama: "Aulia Rahma", kelas: "8A", gender: "P", jamBelajar: 3.0, screenTime: 2.5, jamTidur: 7.5, nilaiUjian: 88, ekskul: "PMR", airPutih: 7 },
    { id: "S-03", nama: "Bagas Pratama", kelas: "8B", gender: "L", jamBelajar: 1.0, screenTime: 6.5, jamTidur: 5.5, nilaiUjian: 64, ekskul: "Futsal", airPutih: 5 },
    { id: "S-04", nama: "Cantika Putri", kelas: "7A", gender: "P", jamBelajar: 4.0, screenTime: 1.5, jamTidur: 8.5, nilaiUjian: 96, ekskul: "Desain Grafis", airPutih: 8 },
    { id: "S-05", nama: "Dimas Saputra", kelas: "8B", gender: "L", jamBelajar: 1.5, screenTime: 5.0, jamTidur: 6.0, nilaiUjian: 70, ekskul: "Futsal", airPutih: 6 },
    { id: "S-06", nama: "Dinda Kirana", kelas: "9A", gender: "P", jamBelajar: 4.5, screenTime: 2.0, jamTidur: 7.5, nilaiUjian: 98, ekskul: "Robotik", airPutih: 9 },
    { id: "S-07", nama: "Eko Prasetyo", kelas: "7B", gender: "L", jamBelajar: 2.0, screenTime: 4.0, jamTidur: 7.0, nilaiUjian: 78, ekskul: "Pramuka", airPutih: 6 },
    { id: "S-08", nama: "Fadhil Muhammad", kelas: "9B", gender: "L", jamBelajar: 1.5, screenTime: 6.0, jamTidur: 5.0, nilaiUjian: 68, ekskul: "Seni Musik", airPutih: 4 },
    { id: "S-09", nama: "Gita Permata", kelas: "7A", gender: "P", jamBelajar: 3.0, screenTime: 3.0, jamTidur: 7.5, nilaiUjian: 86, ekskul: "PMR", airPutih: 7 },
    { id: "S-10", nama: "Hafiz Maulana", kelas: "8A", gender: "L", jamBelajar: 2.5, screenTime: 3.5, jamTidur: 7.0, nilaiUjian: 82, ekskul: "Robotik", airPutih: 7 },
    { id: "S-11", nama: "Indah Cahyani", kelas: "9A", gender: "P", jamBelajar: 3.5, screenTime: 2.5, jamTidur: 8.0, nilaiUjian: 90, ekskul: "Desain Grafis", airPutih: 8 },
    { id: "S-12", nama: "Joko Susilo", kelas: "8B", gender: "L", jamBelajar: 0.8, screenTime: 7.0, jamTidur: 4.5, nilaiUjian: 58, ekskul: "Futsal", airPutih: 4 },
    { id: "S-13", nama: "Kartika Sari", kelas: "7B", gender: "P", jamBelajar: 2.8, screenTime: 3.0, jamTidur: 7.0, nilaiUjian: 84, ekskul: "Pramuka", airPutih: 6 },
    { id: "S-14", nama: "Lutfi Hakim", kelas: "9B", gender: "L", jamBelajar: 2.0, screenTime: 4.5, jamTidur: 6.5, nilaiUjian: 75, ekskul: "Seni Musik", airPutih: 5 },
    { id: "S-15", nama: "Mega Utami", kelas: "8A", gender: "P", jamBelajar: 3.2, screenTime: 2.0, jamTidur: 7.5, nilaiUjian: 89, ekskul: "PMR", airPutih: 7 },
    { id: "S-16", nama: "Naufal Ramadhan", kelas: "7A", gender: "L", jamBelajar: 3.8, screenTime: 1.8, jamTidur: 8.0, nilaiUjian: 94, ekskul: "Robotik", airPutih: 9 },
    { id: "S-17", nama: "Olivia Zahra", kelas: "9A", gender: "P", jamBelajar: 4.0, screenTime: 2.2, jamTidur: 7.5, nilaiUjian: 95, ekskul: "Desain Grafis", airPutih: 8 },
    { id: "S-18", nama: "Panji Wicaksono", kelas: "8B", gender: "L", jamBelajar: 1.2, screenTime: 5.5, jamTidur: 6.0, nilaiUjian: 66, ekskul: "Futsal", airPutih: 5 },
    { id: "S-19", nama: "Qori Amelia", kelas: "7B", gender: "P", jamBelajar: 2.5, screenTime: 3.5, jamTidur: 7.0, nilaiUjian: 80, ekskul: "Pramuka", airPutih: 6 },
    { id: "S-20", nama: "Randi Pangestu", kelas: "9B", gender: "L", jamBelajar: 1.8, screenTime: 5.0, jamTidur: 6.0, nilaiUjian: 72, ekskul: "Seni Musik", airPutih: 6 },
    { id: "S-21", nama: "Salsabila Firdaus", kelas: "8A", gender: "P", jamBelajar: 3.6, screenTime: 1.8, jamTidur: 8.0, nilaiUjian: 93, ekskul: "Robotik", airPutih: 8 },
    { id: "S-22", nama: "Taufik Hidayat", kelas: "8B", gender: "L", jamBelajar: 1.0, screenTime: 6.8, jamTidur: 5.0, nilaiUjian: 62, ekskul: "Futsal", airPutih: 5 },
    { id: "S-23", nama: "Ulya Farhana", kelas: "7A", gender: "P", jamBelajar: 3.4, screenTime: 2.5, jamTidur: 7.5, nilaiUjian: 91, ekskul: "PMR", airPutih: 7 },
    { id: "S-24", nama: "Vino Bastian", kelas: "7B", gender: "L", jamBelajar: 2.2, screenTime: 4.2, jamTidur: 6.5, nilaiUjian: 79, ekskul: "Pramuka", airPutih: 6 },
    { id: "S-25", nama: "Wulan Dari", kelas: "9A", gender: "P", jamBelajar: 4.2, screenTime: 1.5, jamTidur: 8.0, nilaiUjian: 97, ekskul: "Desain Grafis", airPutih: 9 },
    { id: "S-26", nama: "Yafi Gunawan", kelas: "9B", gender: "L", jamBelajar: 1.6, screenTime: 5.2, jamTidur: 6.0, nilaiUjian: 71, ekskul: "Seni Musik", airPutih: 5 },
    { id: "S-27", nama: "Zahra Azizah", kelas: "8A", gender: "P", jamBelajar: 3.1, screenTime: 2.6, jamTidur: 7.5, nilaiUjian: 87, ekskul: "Robotik", airPutih: 8 },
    { id: "S-28", nama: "Aldi Setiawan", kelas: "8B", gender: "L", jamBelajar: 1.4, screenTime: 5.8, jamTidur: 5.5, nilaiUjian: 67, ekskul: "Futsal", airPutih: 6 },
    { id: "S-29", nama: "Bella Safitri", kelas: "7A", gender: "P", jamBelajar: 3.3, screenTime: 2.4, jamTidur: 8.0, nilaiUjian: 89, ekskul: "PMR", airPutih: 7 },
    { id: "S-30", nama: "Chandra Wijaya", kelas: "7B", gender: "L", jamBelajar: 2.1, screenTime: 4.0, jamTidur: 7.0, nilaiUjian: 77, ekskul: "Pramuka", airPutih: 6 },
    { id: "S-31", nama: "Dian Anggraini", kelas: "9A", gender: "P", jamBelajar: 3.8, screenTime: 2.0, jamTidur: 8.0, nilaiUjian: 94, ekskul: "Desain Grafis", airPutih: 8 },
    { id: "S-32", nama: "Erick Firdaus", kelas: "9B", gender: "L", jamBelajar: 1.7, screenTime: 5.5, jamTidur: 6.0, nilaiUjian: 73, ekskul: "Seni Musik", airPutih: 5 },
    { id: "S-33", nama: "Fitri Handayani", kelas: "8A", gender: "P", jamBelajar: 2.9, screenTime: 3.0, jamTidur: 7.0, nilaiUjian: 85, ekskul: "Robotik", airPutih: 7 },
    { id: "S-34", nama: "Gilang Pratama", kelas: "8B", gender: "L", jamBelajar: 1.1, screenTime: 6.2, jamTidur: 5.2, nilaiUjian: 65, ekskul: "Futsal", airPutih: 5 },
    { id: "S-35", nama: "Hani Kurnia", kelas: "7A", gender: "P", jamBelajar: 3.7, screenTime: 1.9, jamTidur: 8.2, nilaiUjian: 93, ekskul: "PMR", airPutih: 8 },
    { id: "S-36", nama: "Irfan Hakim", kelas: "7B", gender: "L", jamBelajar: 2.3, screenTime: 3.8, jamTidur: 7.0, nilaiUjian: 81, ekskul: "Pramuka", airPutih: 7 },
    { id: "S-37", nama: "Jesika Iskandar", kelas: "9A", gender: "P", jamBelajar: 4.1, screenTime: 1.6, jamTidur: 8.0, nilaiUjian: 96, ekskul: "Desain Grafis", airPutih: 9 },
    { id: "S-38", nama: "Kevin Sanjaya", kelas: "9B", gender: "L", jamBelajar: 1.9, screenTime: 4.8, jamTidur: 6.2, nilaiUjian: 74, ekskul: "Seni Musik", airPutih: 6 },
    { id: "S-39", nama: "Larasati Dewi", kelas: "8A", gender: "P", jamBelajar: 3.0, screenTime: 2.8, jamTidur: 7.5, nilaiUjian: 86, ekskul: "Robotik", airPutih: 8 },
    { id: "S-40", nama: "Mario Teguh", kelas: "8B", gender: "L", jamBelajar: 0.9, screenTime: 7.2, jamTidur: 4.8, nilaiUjian: 60, ekskul: "Futsal", airPutih: 4 },
    { id: "S-41", nama: "Nadya Kusuma", kelas: "7A", gender: "P", jamBelajar: 3.5, screenTime: 2.1, jamTidur: 8.0, nilaiUjian: 91, ekskul: "PMR", airPutih: 8 },
    { id: "S-42", nama: "Oki Setiawan", kelas: "7B", gender: "L", jamBelajar: 2.4, screenTime: 3.6, jamTidur: 7.2, nilaiUjian: 82, ekskul: "Pramuka", airPutih: 7 },
    { id: "S-43", nama: "Putri Mayang", kelas: "9A", gender: "P", jamBelajar: 3.9, screenTime: 1.8, jamTidur: 8.0, nilaiUjian: 95, ekskul: "Desain Grafis", airPutih: 8 },
    { id: "S-44", nama: "Rahmat Hidayat", kelas: "9B", gender: "L", jamBelajar: 1.3, screenTime: 5.7, jamTidur: 5.8, nilaiUjian: 69, ekskul: "Seni Musik", airPutih: 5 },
    { id: "S-45", nama: "Silvia Ningsih", kelas: "8A", gender: "P", jamBelajar: 3.3, screenTime: 2.2, jamTidur: 7.8, nilaiUjian: 90, ekskul: "Robotik", airPutih: 8 },
    { id: "S-46", nama: "Teguh Wardana", kelas: "8B", gender: "L", jamBelajar: 1.2, screenTime: 6.4, jamTidur: 5.2, nilaiUjian: 63, ekskul: "Futsal", airPutih: 5 },
    { id: "S-47", nama: "Utari Rahayu", kelas: "7A", gender: "P", jamBelajar: 3.6, screenTime: 2.0, jamTidur: 8.2, nilaiUjian: 92, ekskul: "PMR", airPutih: 7 },
    { id: "S-48", nama: "Wahyu Nugroho", kelas: "7B", gender: "L", jamBelajar: 2.0, screenTime: 4.2, jamTidur: 6.8, nilaiUjian: 78, ekskul: "Pramuka", airPutih: 6 },
    { id: "S-49", nama: "Yuni Shara", kelas: "9A", gender: "P", jamBelajar: 4.3, screenTime: 1.7, jamTidur: 7.8, nilaiUjian: 97, ekskul: "Desain Grafis", airPutih: 9 },
    { id: "S-50", nama: "Zaki Mubarak", kelas: "9B", gender: "L", jamBelajar: 1.5, screenTime: 5.4, jamTidur: 6.0, nilaiUjian: 70, ekskul: "Seni Musik", airPutih: 5 },
    { id: "S-51", nama: "Alif Akbar", kelas: "8A", gender: "L", jamBelajar: 3.4, screenTime: 2.4, jamTidur: 7.8, nilaiUjian: 90, ekskul: "Robotik", airPutih: 8 },
    { id: "S-52", nama: "Bunga Citra", kelas: "8B", gender: "P", jamBelajar: 1.8, screenTime: 5.2, jamTidur: 6.2, nilaiUjian: 72, ekskul: "Futsal", airPutih: 6 },
    { id: "S-53", nama: "Candra Darmawan", kelas: "7A", gender: "L", jamBelajar: 3.2, screenTime: 2.8, jamTidur: 7.5, nilaiUjian: 88, ekskul: "PMR", airPutih: 7 },
    { id: "S-54", nama: "Dara Puspita", kelas: "7B", gender: "P", jamBelajar: 2.6, screenTime: 3.4, jamTidur: 7.0, nilaiUjian: 83, ekskul: "Pramuka", airPutih: 7 },
    { id: "S-55", nama: "Edi Santoso", kelas: "9A", gender: "L", jamBelajar: 3.7, screenTime: 2.3, jamTidur: 7.6, nilaiUjian: 93, ekskul: "Desain Grafis", airPutih: 8 },
    { id: "S-56", nama: "Fani Oktavia", kelas: "9B", gender: "P", jamBelajar: 1.4, screenTime: 6.1, jamTidur: 5.5, nilaiUjian: 66, ekskul: "Seni Musik", airPutih: 5 },
    { id: "S-57", nama: "Galih Rakasiwi", kelas: "8A", gender: "L", jamBelajar: 3.1, screenTime: 2.9, jamTidur: 7.4, nilaiUjian: 87, ekskul: "Robotik", airPutih: 8 },
    { id: "S-58", nama: "Helda Safira", kelas: "8B", gender: "P", jamBelajar: 1.1, screenTime: 6.6, jamTidur: 5.0, nilaiUjian: 61, ekskul: "Futsal", airPutih: 4 },
    { id: "S-59", nama: "Iqbal Ramli", kelas: "7A", gender: "L", jamBelajar: 3.9, screenTime: 1.7, jamTidur: 8.4, nilaiUjian: 95, ekskul: "PMR", airPutih: 9 },
    { id: "S-60", nama: "Jihan Fahira", kelas: "7B", gender: "P", jamBelajar: 2.7, screenTime: 3.2, jamTidur: 7.2, nilaiUjian: 84, ekskul: "Pramuka", airPutih: 7 }
];

const DIRTY_DATA_INJECTIONS = [
    { id: "S-03", field: "jamBelajar", oldValue: 1.0, dirtyValue: 48.0, reason: "Mustahil jam belajar 48 jam/hari (1 hari hanya 24 jam)!" },
    { id: "S-12", field: "nilaiUjian", oldValue: 58, dirtyValue: -25, reason: "Nilai ujian tidak mungkin bertanda negatif (-25)!" },
    { id: "S-40", field: "screenTime", oldValue: 7.2, dirtyValue: 99.0, reason: "Screen time 99 jam/hari merupakan kesalahan ketik (typo input data)!" }
];

const VARIABLE_METADATA = {
    jamBelajar: { label: "Jam Belajar Harian", unit: "Jam/Hari", type: "number", min: 0, max: 24, icon: "📚" },
    screenTime: { label: "Screen Time (HP / Game)", unit: "Jam/Hari", type: "number", min: 0, max: 24, icon: "📱" },
    jamTidur: { label: "Durasi Tidur Malam", unit: "Jam/Malam", type: "number", min: 0, max: 24, icon: "🌙" },
    nilaiUjian: { label: "Nilai Rata-rata Ujian", unit: "Poin (0-100)", type: "number", min: 0, max: 100, icon: "🎯" },
    airPutih: { label: "Konsumsi Air Putih", unit: "Gelas/Hari", type: "number", min: 0, max: 30, icon: "💧" },
    ekskul: { label: "Pilihan Ekstrakurikuler", unit: "Kategori", type: "category", icon: "🎨" },
    kelas: { label: "Kelas", unit: "Tingkat", type: "category", icon: "🏫" },
    gender: { label: "Jenis Kelamin", unit: "L/P", type: "category", icon: "👤" }
};

// ========================================================
// 2. CANVAS CHART ENGINE
// ========================================================
class ChartEngine {
    constructor(canvasId, tooltipId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext("2d");
        this.tooltip = document.getElementById(tooltipId);
        this.currentConfig = null;
        this.hitAreas = [];
        this.animationProgress = 1;
        this.animId = null;

        this.initEvents();
    }

    isDarkMode() {
        return document.documentElement.classList.contains("dark");
    }

    getThemeColors() {
        const isDark = this.isDarkMode();
        return {
            textColor: isDark ? "#94a3b8" : "#475569",
            titleColor: isDark ? "#f8fafc" : "#0f172a",
            gridColor: isDark ? "rgba(51, 65, 85, 0.4)" : "rgba(226, 232, 240, 0.8)",
            axisColor: isDark ? "#475569" : "#cbd5e1",
            bgCard: isDark ? "#1e293b" : "#ffffff",
            colors: [
                "#6366f1", // Indigo
                "#06b6d4", // Cyan
                "#10b981", // Emerald
                "#f59e0b", // Amber
                "#ec4899", // Pink
                "#8b5cf6", // Violet
                "#14b8a6", // Teal
                "#f97316"  // Orange
            ]
        };
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const w = rect.width || 600;
        const h = rect.height || 350;
        this.canvas.width = w * dpr;
        this.canvas.height = h * dpr;
        if (this.ctx.resetTransform) this.ctx.resetTransform();
        this.ctx.scale(dpr, dpr);
        this.width = w;
        this.height = h;
    }

    initEvents() {
        window.addEventListener("resize", () => {
            if (this.currentConfig) {
                this.render(this.currentConfig, false);
            }
        });

        this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
        this.canvas.addEventListener("mouseleave", () => this.hideTooltip());
    }

    handleMouseMove(e) {
        if (!this.hitAreas.length) return;
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        let hit = null;
        for (let i = this.hitAreas.length - 1; i >= 0; i--) {
            const h = this.hitAreas[i];
            if (h.type === "rect") {
                if (mouseX >= h.x && mouseX <= h.x + h.w && mouseY >= h.y && mouseY <= h.y + h.h) {
                    hit = h;
                    break;
                }
            } else if (h.type === "circle") {
                const dist = Math.hypot(mouseX - h.x, mouseY - h.y);
                if (dist <= (h.r + 5)) {
                    hit = h;
                    break;
                }
            } else if (h.type === "arc") {
                const dist = Math.hypot(mouseX - h.cx, mouseY - h.cy);
                let angle = Math.atan2(mouseY - h.cy, mouseX - h.cx);
                if (angle < 0) angle += Math.PI * 2;
                if (dist >= h.innerR && dist <= h.outerR && angle >= h.startAngle && angle <= h.endAngle) {
                    hit = h;
                    break;
                }
            }
        }

        if (hit && this.tooltip) {
            this.tooltip.innerHTML = hit.tooltipHtml;
            this.tooltip.classList.remove("opacity-0", "pointer-events-none");
            this.tooltip.classList.add("opacity-100");

            const ttWidth = this.tooltip.offsetWidth || 160;
            const ttHeight = this.tooltip.offsetHeight || 60;
            let left = e.clientX + 14;
            let top = e.clientY - ttHeight - 10;

            if (left + ttWidth > window.innerWidth - 20) {
                left = e.clientX - ttWidth - 14;
            }
            if (top < 10) {
                top = e.clientY + 14;
            }

            this.tooltip.style.left = `${left}px`;
            this.tooltip.style.top = `${top}px`;
        } else {
            this.hideTooltip();
        }
    }

    hideTooltip() {
        if (this.tooltip) {
            this.tooltip.classList.add("opacity-0", "pointer-events-none");
            this.tooltip.classList.remove("opacity-100");
        }
    }

    render(config, animate = true) {
        if (!config || !this.canvas) return;
        this.currentConfig = config;
        this.resize();
        if (this.animId) cancelAnimationFrame(this.animId);

        if (animate) {
            let start = null;
            const duration = 500;
            const step = (timestamp) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                this.animationProgress = Math.min(1, elapsed / duration);
                const t = 1 - Math.pow(1 - this.animationProgress, 3);

                this.draw(config, t);

                if (this.animationProgress < 1) {
                    this.animId = requestAnimationFrame(step);
                }
            };
            this.animId = requestAnimationFrame(step);
        } else {
            this.draw(config, 1);
        }
    }

    draw(config, progress = 1) {
        if (!this.width || !this.height) return;
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.hitAreas = [];

        switch (config.type) {
            case "bar":
                this.drawBarChart(config, progress);
                break;
            case "donut":
                this.drawDonutChart(config, progress);
                break;
            case "line":
                this.drawLineChart(config, progress);
                break;
            case "scatter":
                this.drawScatterPlot(config, progress);
                break;
        }
    }

    drawBarChart(config, progress) {
        const theme = this.getThemeColors();
        const padding = { top: 40, right: 30, bottom: 65, left: 60 };
        const chartW = this.width - padding.left - padding.right;
        const chartH = this.height - padding.top - padding.bottom;

        const { labels, data, xLabel, yLabel } = config;
        const maxVal = Math.max(...data, 1) * 1.15;

        const gridSteps = 5;
        this.ctx.strokeStyle = theme.gridColor;
        this.ctx.lineWidth = 1;
        this.ctx.font = "11px Inter, sans-serif";
        this.ctx.fillStyle = theme.textColor;
        this.ctx.textAlign = "right";

        for (let i = 0; i <= gridSteps; i++) {
            const val = (maxVal / gridSteps) * i;
            const y = padding.top + chartH - (i / gridSteps) * chartH;
            this.ctx.beginPath();
            this.ctx.moveTo(padding.left, y);
            this.ctx.lineTo(padding.left + chartW, y);
            this.ctx.stroke();

            this.ctx.fillText(val.toFixed(val < 10 && val % 1 !== 0 ? 1 : 0), padding.left - 10, y + 4);
        }

        const barGroupW = chartW / labels.length;
        const barW = Math.min(barGroupW * 0.65, 50);

        labels.forEach((lbl, i) => {
            const val = data[i];
            const currentH = ((val / maxVal) * chartH) * progress;
            const x = padding.left + i * barGroupW + (barGroupW - barW) / 2;
            const y = padding.top + chartH - currentH;

            const color = theme.colors[i % theme.colors.length];
            const grad = this.ctx.createLinearGradient(x, y, x, y + currentH);
            grad.addColorStop(0, color);
            grad.addColorStop(1, `${color}88`);

            this.ctx.fillStyle = grad;
            this.roundRect(x, y, barW, currentH, [6, 6, 0, 0], true, false);

            this.hitAreas.push({
                type: "rect",
                x,
                y,
                w: barW,
                h: currentH,
                tooltipHtml: `
                    <div class="font-bold text-xs text-indigo-400 mb-0.5">${lbl}</div>
                    <div class="text-sm font-extrabold text-white">${val.toFixed(1)} <span class="text-xs font-normal text-slate-300">${yLabel || ""}</span></div>
                `
            });

            this.ctx.fillStyle = theme.textColor;
            this.ctx.textAlign = "center";
            this.ctx.font = "11px Quicksand, sans-serif";

            let displayLbl = lbl;
            if (displayLbl.length > 9) displayLbl = displayLbl.substring(0, 8) + "..";
            this.ctx.fillText(displayLbl, x + barW / 2, padding.top + chartH + 20);
        });

        this.ctx.font = "bold 11px Quicksand, sans-serif";
        this.ctx.fillStyle = theme.titleColor;
        this.ctx.textAlign = "center";
        if (xLabel) {
            this.ctx.fillText(xLabel, padding.left + chartW / 2, this.height - 15);
        }
    }

    drawDonutChart(config, progress) {
        const theme = this.getThemeColors();
        const { labels, data, unit = "" } = config;
        const total = data.reduce((a, b) => a + b, 0) || 1;

        const cx = this.width * 0.42;
        const cy = this.height * 0.5;
        const outerR = Math.min(cx, cy) * 0.78;
        const innerR = outerR * 0.58;

        let currentAngle = -Math.PI / 2;

        data.forEach((val, i) => {
            const sliceAngle = ((val / total) * Math.PI * 2) * progress;
            const endAngle = currentAngle + sliceAngle;
            const color = theme.colors[i % theme.colors.length];

            this.ctx.beginPath();
            this.ctx.arc(cx, cy, outerR, currentAngle, endAngle);
            this.ctx.arc(cx, cy, innerR, endAngle, currentAngle, true);
            this.ctx.closePath();
            this.ctx.fillStyle = color;
            this.ctx.fill();

            this.hitAreas.push({
                type: "arc",
                cx,
                cy,
                outerR,
                innerR,
                startAngle: currentAngle < 0 ? currentAngle + Math.PI * 2 : currentAngle,
                endAngle: endAngle < 0 ? endAngle + Math.PI * 2 : endAngle,
                tooltipHtml: `
                    <div class="font-bold text-xs text-indigo-400 mb-0.5">${labels[i]}</div>
                    <div class="text-sm font-extrabold text-white">${val} ${unit}</div>
                    <div class="text-[11px] text-slate-300">(${((val / total) * 100).toFixed(1)}%)</div>
                `
            });

            currentAngle = endAngle;
        });

        this.ctx.fillStyle = theme.titleColor;
        this.ctx.font = "bold 18px Quicksand, sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(`${total}`, cx, cy - 8);
        this.ctx.font = "11px Inter, sans-serif";
        this.ctx.fillStyle = theme.textColor;
        this.ctx.fillText("Total Siswa", cx, cy + 12);

        const legendX = this.width * 0.72;
        let legendY = cy - (labels.length * 24) / 2;

        labels.forEach((lbl, i) => {
            const color = theme.colors[i % theme.colors.length];
            const val = data[i];
            const pct = ((val / total) * 100).toFixed(0);

            this.ctx.fillStyle = color;
            this.roundRect(legendX, legendY, 12, 12, 3, true, false);

            this.ctx.font = "11px Quicksand, sans-serif";
            this.ctx.fillStyle = theme.titleColor;
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "top";
            this.ctx.fillText(`${lbl} (${pct}%)`, legendX + 20, legendY);

            legendY += 24;
        });
    }

    drawLineChart(config, progress) {
        const theme = this.getThemeColors();
        const padding = { top: 40, right: 30, bottom: 65, left: 60 };
        const chartW = this.width - padding.left - padding.right;
        const chartH = this.height - padding.top - padding.bottom;

        const { labels, data, yLabel } = config;
        const maxVal = Math.max(...data, 1) * 1.15;
        const minVal = 0;

        const gridSteps = 5;
        this.ctx.strokeStyle = theme.gridColor;
        this.ctx.lineWidth = 1;
        this.ctx.font = "11px Inter, sans-serif";
        this.ctx.fillStyle = theme.textColor;
        this.ctx.textAlign = "right";

        for (let i = 0; i <= gridSteps; i++) {
            const val = (maxVal / gridSteps) * i;
            const y = padding.top + chartH - (i / gridSteps) * chartH;
            this.ctx.beginPath();
            this.ctx.moveTo(padding.left, y);
            this.ctx.lineTo(padding.left + chartW, y);
            this.ctx.stroke();

            this.ctx.fillText(val.toFixed(val < 10 && val % 1 !== 0 ? 1 : 0), padding.left - 10, y + 4);
        }

        const stepX = chartW / (data.length - 1 || 1);
        const points = data.map((val, i) => {
            const targetY = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
            const currentY = padding.top + chartH - ((padding.top + chartH - targetY) * progress);
            return {
                x: padding.left + i * stepX,
                y: currentY,
                val,
                label: labels[i]
            };
        });

        const grad = this.ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
        grad.addColorStop(0, "rgba(99, 102, 241, 0.35)");
        grad.addColorStop(1, "rgba(99, 102, 241, 0.0)");

        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, padding.top + chartH);
        points.forEach((pt) => this.ctx.lineTo(pt.x, pt.y));
        this.ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
        this.ctx.closePath();
        this.ctx.fillStyle = grad;
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#6366f1";
        this.ctx.lineWidth = 3;
        points.forEach((pt, i) => {
            if (i === 0) this.ctx.moveTo(pt.x, pt.y);
            else this.ctx.lineTo(pt.x, pt.y);
        });
        this.ctx.stroke();

        points.forEach((pt) => {
            this.ctx.beginPath();
            this.ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = "#ffffff";
            this.ctx.fill();
            this.ctx.strokeStyle = "#6366f1";
            this.ctx.lineWidth = 2.5;
            this.ctx.stroke();

            this.hitAreas.push({
                type: "circle",
                x: pt.x,
                y: pt.y,
                r: 6,
                tooltipHtml: `
                    <div class="font-bold text-xs text-indigo-400 mb-0.5">${pt.label}</div>
                    <div class="text-sm font-extrabold text-white">${pt.val.toFixed(1)} <span class="text-xs font-normal text-slate-300">${yLabel || ""}</span></div>
                `
            });
        });
    }

    drawScatterPlot(config, progress) {
        const theme = this.getThemeColors();
        const padding = { top: 40, right: 30, bottom: 65, left: 65 };
        const chartW = this.width - padding.left - padding.right;
        const chartH = this.height - padding.top - padding.bottom;

        const { rawData, xKey, yKey, xLabel, yLabel, xUnit, yUnit, showTrendline = true } = config;

        const xVals = rawData.map(d => Number(d[xKey]) || 0);
        const yVals = rawData.map(d => Number(d[yKey]) || 0);

        const xMin = Math.min(...xVals) * 0.9;
        const xMax = Math.max(...xVals) * 1.08;
        const yMin = Math.min(...yVals) * 0.9;
        const yMax = Math.max(...yVals) * 1.05;

        const gridSteps = 5;
        this.ctx.strokeStyle = theme.gridColor;
        this.ctx.lineWidth = 1;
        this.ctx.font = "11px Inter, sans-serif";
        this.ctx.fillStyle = theme.textColor;

        this.ctx.textAlign = "right";
        for (let i = 0; i <= gridSteps; i++) {
            const val = yMin + ((yMax - yMin) / gridSteps) * i;
            const y = padding.top + chartH - (i / gridSteps) * chartH;
            this.ctx.beginPath();
            this.ctx.moveTo(padding.left, y);
            this.ctx.lineTo(padding.left + chartW, y);
            this.ctx.stroke();

            this.ctx.fillText(val.toFixed(1), padding.left - 10, y + 4);
        }

        this.ctx.textAlign = "center";
        for (let i = 0; i <= gridSteps; i++) {
            const val = xMin + ((xMax - xMin) / gridSteps) * i;
            const x = padding.left + (i / gridSteps) * chartW;
            this.ctx.beginPath();
            this.ctx.moveTo(x, padding.top);
            this.ctx.lineTo(x, padding.top + chartH);
            this.ctx.stroke();

            this.ctx.fillText(val.toFixed(1), x, padding.top + chartH + 20);
        }

        this.ctx.font = "bold 11px Quicksand, sans-serif";
        this.ctx.fillStyle = theme.titleColor;
        this.ctx.textAlign = "center";
        this.ctx.fillText(`${xLabel} (${xUnit})`, padding.left + chartW / 2, this.height - 12);

        this.ctx.save();
        this.ctx.translate(18, padding.top + chartH / 2);
        this.ctx.rotate(-Math.PI / 2);
        this.ctx.fillText(`${yLabel} (${yUnit})`, 0, 0);
        this.ctx.restore();

        const n = rawData.length;
        const meanX = xVals.reduce((a, b) => a + b, 0) / n;
        const meanY = yVals.reduce((a, b) => a + b, 0) / n;

        let num = 0, denX = 0, denY = 0;
        for (let i = 0; i < n; i++) {
            const dx = xVals[i] - meanX;
            const dy = yVals[i] - meanY;
            num += dx * dy;
            denX += dx * dx;
            denY += dy * dy;
        }
        const pearsonR = (denX && denY) ? num / Math.sqrt(denX * denY) : 0;

        const slope = denX !== 0 ? num / denX : 0;
        const intercept = meanY - slope * meanX;

        if (showTrendline && n > 2) {
            const y1 = slope * xMin + intercept;
            const y2 = slope * xMax + intercept;

            const px1 = padding.left;
            const py1 = padding.top + chartH - ((y1 - yMin) / (yMax - yMin)) * chartH;
            const px2 = padding.left + chartW;
            const py2 = padding.top + chartH - ((y2 - yMin) / (yMax - yMin)) * chartH;

            this.ctx.save();
            this.ctx.strokeStyle = pearsonR > 0 ? "#10b981" : pearsonR < 0 ? "#ef4444" : "#6366f1";
            this.ctx.lineWidth = 2.5;
            this.ctx.setLineDash([6, 4]);
            this.ctx.beginPath();
            this.ctx.moveTo(px1, py1);
            this.ctx.lineTo(px1 + (px2 - px1) * progress, py1 + (py2 - py1) * progress);
            this.ctx.stroke();
            this.ctx.restore();
        }

        rawData.forEach((item) => {
            const vx = Number(item[xKey]) || 0;
            const vy = Number(item[yKey]) || 0;

            const targetX = padding.left + ((vx - xMin) / (xMax - xMin)) * chartW;
            const targetY = padding.top + chartH - ((vy - yMin) / (yMax - yMin)) * chartH;
            const currentY = padding.top + chartH - ((padding.top + chartH - targetY) * progress);

            this.ctx.beginPath();
            this.ctx.arc(targetX, currentY, 6, 0, Math.PI * 2);
            this.ctx.fillStyle = "#6366f1";
            this.ctx.shadowColor = "rgba(99, 102, 241, 0.4)";
            this.ctx.shadowBlur = 8;
            this.ctx.fill();
            this.ctx.strokeStyle = "#ffffff";
            this.ctx.lineWidth = 1.8;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;

            this.hitAreas.push({
                type: "circle",
                x: targetX,
                y: currentY,
                r: 7,
                tooltipHtml: `
                    <div class="flex items-center gap-1.5 mb-1">
                        <span class="font-extrabold text-xs text-white">${item.nama}</span>
                        <span class="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-semibold">${item.kelas}</span>
                    </div>
                    <div class="text-[11px] text-slate-300">${xLabel}: <strong class="text-white">${vx} ${xUnit}</strong></div>
                    <div class="text-[11px] text-slate-300">${yLabel}: <strong class="text-white">${vy} ${yUnit}</strong></div>
                `
            });
        });

        if (config.onStatsCalculated) {
            config.onStatsCalculated({
                pearsonR,
                slope,
                intercept,
                meanX,
                meanY,
                count: n
            });
        }
    }

    roundRect(x, y, w, h, radii, fill, stroke) {
        if (!Array.isArray(radii)) radii = [radii, radii, radii, radii];
        const [tl, tr, br, bl] = radii;

        this.ctx.beginPath();
        this.ctx.moveTo(x + tl, y);
        this.ctx.lineTo(x + w - tr, y);
        this.ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
        this.ctx.lineTo(x + w, y + h - br);
        this.ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
        this.ctx.lineTo(x + bl, y + h);
        this.ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
        this.ctx.lineTo(x, y + tl);
        this.ctx.quadraticCurveTo(x, y, x + tl, y);
        this.ctx.closePath();

        if (fill) this.ctx.fill();
        if (stroke) this.ctx.stroke();
    }
}

// ========================================================
// 3. SOUND SYNTHESIZER (WEB AUDIO API)
// ========================================================
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    playTone(freq, type = "sine", duration = 0.12, gainVal = 0.08) {
        if (!this.enabled) return;
        try {
            this.init();
            if (this.ctx && this.ctx.state === "suspended") {
                this.ctx.resume();
            }
            if (!this.ctx) return;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Audio policy fallback
        }
    }

    click() {
        this.playTone(587.33, "triangle", 0.06, 0.05);
    }

    tab() {
        this.playTone(659.25, "sine", 0.08, 0.06);
    }

    success() {
        if (!this.enabled) return;
        setTimeout(() => this.playTone(523.25, "triangle", 0.1, 0.07), 0);
        setTimeout(() => this.playTone(659.25, "triangle", 0.1, 0.07), 90);
        setTimeout(() => this.playTone(783.99, "triangle", 0.18, 0.08), 180);
    }

    warning() {
        if (!this.enabled) return;
        setTimeout(() => this.playTone(330, "sawtooth", 0.15, 0.06), 0);
        setTimeout(() => this.playTone(260, "sawtooth", 0.22, 0.08), 120);
    }
}

// ========================================================
// 4. MAIN APPLICATION STATE
// ========================================================
class AppState {
    constructor() {
        this.sound = new SoundManager();
        this.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
        this.filteredStudents = [...this.students];
        this.isDirtyMode = false;
        this.activeTab = "dataset";

        this.searchQuery = "";
        this.selectedKelas = "ALL";
        this.selectedEkskul = "ALL";
        this.sortCol = "id";
        this.sortDir = "asc";

        this.chartType = "bar";
        this.chartVarX = "ekskul";
        this.chartVarY = "nilaiUjian";

        this.corrVarX = "jamBelajar";
        this.corrVarY = "nilaiUjian";

        this.init();
    }

    init() {
        this.chartEngine = new ChartEngine("main-chart-canvas", "chart-tooltip");
        this.corrChartEngine = new ChartEngine("corr-chart-canvas", "chart-tooltip");

        this.bindEvents();
        this.renderTable();
        this.renderSummaryMetrics();
        this.renderVisualisasiControls();

        window.addEventListener("themeChanged", () => {
            if (this.chartEngine && this.chartEngine.currentConfig) {
                this.chartEngine.render(this.chartEngine.currentConfig, false);
            }
            if (this.corrChartEngine && this.corrChartEngine.currentConfig) {
                this.corrChartEngine.render(this.corrChartEngine.currentConfig, false);
            }
        });
    }

    bindEvents() {
        // Search & Filter
        const searchInput = document.getElementById("table-search");
        if (searchInput) {
            searchInput.addEventListener("input", (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.applyFilters();
            });
        }

        const filterKelas = document.getElementById("filter-kelas");
        if (filterKelas) {
            filterKelas.addEventListener("change", (e) => {
                this.selectedKelas = e.target.value;
                this.sound.click();
                this.applyFilters();
            });
        }

        const filterEkskul = document.getElementById("filter-ekskul");
        if (filterEkskul) {
            filterEkskul.addEventListener("change", (e) => {
                this.selectedEkskul = e.target.value;
                this.sound.click();
                this.applyFilters();
            });
        }

        // Dirty Data Buttons
        const btnInjectDirty = document.getElementById("btn-inject-dirty");
        if (btnInjectDirty) {
            btnInjectDirty.addEventListener("click", () => this.toggleDirtyData());
        }

        const btnCleanData = document.getElementById("btn-clean-data");
        if (btnCleanData) {
            btnCleanData.addEventListener("click", () => this.cleanDirtyData());
        }

        // Sound Toggle
        const soundToggle = document.getElementById("btn-sound-toggle");
        if (soundToggle) {
            soundToggle.addEventListener("click", () => {
                this.sound.enabled = !this.sound.enabled;
                soundToggle.innerHTML = this.sound.enabled ? "🔊 Suara: Nyala" : "🔇 Suara: Mati";
                soundToggle.classList.toggle("text-indigo-600", this.sound.enabled);
                soundToggle.classList.toggle("text-slate-400", !this.sound.enabled);
                if (this.sound.enabled) this.sound.click();
            });
        }

        // Table Sorting
        document.querySelectorAll("[data-sort]").forEach((th) => {
            th.addEventListener("click", () => {
                const col = th.getAttribute("data-sort");
                if (this.sortCol === col) {
                    this.sortDir = this.sortDir === "asc" ? "desc" : "asc";
                } else {
                    this.sortCol = col;
                    this.sortDir = "asc";
                }
                this.sound.click();
                this.applyFilters();
            });
        });

        // Misi Submit
        const btnSubmitMisi = document.getElementById("btn-submit-misi");
        if (btnSubmitMisi) {
            btnSubmitMisi.addEventListener("click", () => this.evaluateMisi());
        }
    }

    switchTab(tabName) {
        this.activeTab = tabName;
        this.sound.tab();

        document.querySelectorAll("[data-tab-target]").forEach((btn) => {
            const isCurrent = btn.getAttribute("data-tab-target") === tabName;
            btn.classList.toggle("bg-white", isCurrent);
            btn.classList.toggle("dark:bg-slate-800", isCurrent);
            btn.classList.toggle("text-indigo-600", isCurrent);
            btn.classList.toggle("dark:text-indigo-400", isCurrent);
            btn.classList.toggle("shadow-sm", isCurrent);
            btn.classList.toggle("text-slate-600", !isCurrent);
            btn.classList.toggle("dark:text-slate-300", !isCurrent);
        });

        document.querySelectorAll(".tab-panel").forEach((panel) => {
            panel.classList.toggle("hidden", panel.id !== `tab-${tabName}`);
        });

        if (tabName === "visualisasi") {
            setTimeout(() => {
                this.chartEngine.resize();
                this.renderChart();
            }, 60);
        } else if (tabName === "korelasi") {
            setTimeout(() => {
                this.corrChartEngine.resize();
                this.renderCorrelation();
            }, 60);
        }
    }

    setChartType(type) {
        this.chartType = type;
        this.sound.click();

        document.querySelectorAll("[data-chart-type]").forEach((b) => {
            const active = b.getAttribute("data-chart-type") === type;
            b.classList.toggle("bg-indigo-600", active);
            b.classList.toggle("text-white", active);
            b.classList.toggle("bg-slate-100", !active);
            b.classList.toggle("dark:bg-slate-800", !active);
            b.classList.toggle("text-slate-700", !active);
            b.classList.toggle("dark:text-slate-300", !active);
        });

        this.chartEngine.resize();
        this.renderChart();
    }

    applyFilters() {
        this.filteredStudents = this.students.filter((st) => {
            const matchesSearch = !this.searchQuery ||
                st.nama.toLowerCase().includes(this.searchQuery) ||
                st.id.toLowerCase().includes(this.searchQuery);

            const matchesKelas = this.selectedKelas === "ALL" || st.kelas === this.selectedKelas;
            const matchesEkskul = this.selectedEkskul === "ALL" || st.ekskul === this.selectedEkskul;

            return matchesSearch && matchesKelas && matchesEkskul;
        });

        this.filteredStudents.sort((a, b) => {
            let valA = a[this.sortCol];
            let valB = b[this.sortCol];

            if (typeof valA === "string") {
                return this.sortDir === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }
            return this.sortDir === "asc" ? valA - valB : valB - valA;
        });

        this.renderTable();
        this.renderSummaryMetrics();
        if (this.activeTab === "visualisasi") this.renderChart();
        if (this.activeTab === "korelasi") this.renderCorrelation();
    }

    renderTable() {
        const tbody = document.getElementById("table-body");
        if (!tbody) return;

        const countBadge = document.getElementById("filter-count-badge");
        if (countBadge) {
            countBadge.textContent = `${this.filteredStudents.length} dari ${this.students.length} siswa`;
        }

        if (this.filteredStudents.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-10 text-slate-400">
                        Tidak ada data siswa yang cocok dengan filter atau kata kunci.
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = this.filteredStudents.map((st) => {
            const isAnomaly = st.isDirty;
            const rowClass = isAnomaly
                ? "bg-rose-50/80 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 border-l-4 border-rose-500 font-semibold"
                : "hover:bg-slate-50 dark:hover:bg-slate-800/60 transition";

            return `
                <tr class="${rowClass} border-b border-slate-100 dark:border-slate-800 text-xs">
                    <td class="py-3 px-4 font-mono font-bold text-slate-500 dark:text-slate-400">
                        ${st.id}
                        ${isAnomaly ? '<span class="ml-1 text-xs" title="Anomali Terdeteksi!">⚠️</span>' : ''}
                    </td>
                    <td class="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">${st.nama}</td>
                    <td class="py-3 px-4">
                        <span class="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            ${st.kelas}
                        </span>
                    </td>
                    <td class="py-3 px-4 font-mono text-center ${st.jamBelajar > 24 ? 'text-rose-600 font-extrabold underline' : ''}">${st.jamBelajar} jam</td>
                    <td class="py-3 px-4 font-mono text-center ${st.screenTime > 24 ? 'text-rose-600 font-extrabold underline' : ''}">${st.screenTime} jam</td>
                    <td class="py-3 px-4 font-mono text-center">${st.jamTidur} jam</td>
                    <td class="py-3 px-4 font-mono text-center ${st.nilaiUjian < 0 ? 'text-rose-600 font-extrabold underline' : 'font-bold text-indigo-600 dark:text-indigo-400'}">${st.nilaiUjian}</td>
                    <td class="py-3 px-4">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                            ${st.ekskul}
                        </span>
                    </td>
                </tr>
            `;
        }).join("");
    }

    renderSummaryMetrics() {
        const total = this.filteredStudents.length;
        if (total === 0) return;

        const avgNilai = (this.filteredStudents.reduce((a, b) => a + Number(b.nilaiUjian), 0) / total).toFixed(1);
        const avgBelajar = (this.filteredStudents.reduce((a, b) => a + Number(b.jamBelajar), 0) / total).toFixed(1);
        const avgScreen = (this.filteredStudents.reduce((a, b) => a + Number(b.screenTime), 0) / total).toFixed(1);
        const avgTidur = (this.filteredStudents.reduce((a, b) => a + Number(b.jamTidur), 0) / total).toFixed(1);

        document.getElementById("stat-avg-nilai") && (document.getElementById("stat-avg-nilai").textContent = avgNilai);
        document.getElementById("stat-avg-belajar") && (document.getElementById("stat-avg-belajar").textContent = `${avgBelajar} jam`);
        document.getElementById("stat-avg-screen") && (document.getElementById("stat-avg-screen").textContent = `${avgScreen} jam`);
        document.getElementById("stat-avg-tidur") && (document.getElementById("stat-avg-tidur").textContent = `${avgTidur} jam`);
    }

    toggleDirtyData() {
        if (!this.isDirtyMode) {
            DIRTY_DATA_INJECTIONS.forEach(inj => {
                const target = this.students.find(s => s.id === inj.id);
                if (target) {
                    target[inj.field] = inj.dirtyValue;
                    target.isDirty = true;
                    target.dirtyReason = inj.reason;
                }
            });
            this.isDirtyMode = true;
            this.sound.warning();

            const alertBanner = document.getElementById("dirty-data-alert");
            if (alertBanner) alertBanner.classList.remove("hidden");

            const btnInject = document.getElementById("btn-inject-dirty");
            if (btnInject) btnInject.classList.add("hidden");

            const btnClean = document.getElementById("btn-clean-data");
            if (btnClean) btnClean.classList.remove("hidden");
        }
        this.applyFilters();
    }

    cleanDirtyData() {
        this.students = JSON.parse(JSON.stringify(INITIAL_STUDENTS));
        this.isDirtyMode = false;
        this.sound.success();

        const alertBanner = document.getElementById("dirty-data-alert");
        if (alertBanner) alertBanner.classList.add("hidden");

        const btnInject = document.getElementById("btn-inject-dirty");
        if (btnInject) btnInject.classList.remove("hidden");

        const btnClean = document.getElementById("btn-clean-data");
        if (btnClean) btnClean.classList.add("hidden");

        this.applyFilters();
    }

    renderVisualisasiControls() {
        const selectX = document.getElementById("select-chart-x");
        const selectY = document.getElementById("select-chart-y");

        if (selectX) {
            selectX.addEventListener("change", (e) => {
                this.chartVarX = e.target.value;
                this.sound.click();
                this.renderChart();
            });
        }

        if (selectY) {
            selectY.addEventListener("change", (e) => {
                this.chartVarY = e.target.value;
                this.sound.click();
                this.renderChart();
            });
        }
    }

    renderChart() {
        const metaX = VARIABLE_METADATA[this.chartVarX] || { label: this.chartVarX, unit: "" };
        const metaY = VARIABLE_METADATA[this.chartVarY] || { label: this.chartVarY, unit: "" };

        const titleEl = document.getElementById("chart-display-title");
        const descEl = document.getElementById("chart-display-desc");

        if (this.chartType === "donut") {
            const counts = {};
            this.filteredStudents.forEach((st) => {
                const key = st[this.chartVarX] || "Lainnya";
                counts[key] = (counts[key] || 0) + 1;
            });

            const labels = Object.keys(counts);
            const data = Object.values(counts);

            if (titleEl) titleEl.textContent = `Proporsi Distribusi: ${metaX.label}`;
            if (descEl) descEl.textContent = `Diagram lingkaran membagi data (${this.filteredStudents.length} siswa) ke dalam proporsi kategori.`;

            this.chartEngine.render({
                type: "donut",
                labels,
                data,
                unit: "siswa"
            });
            this.renderChartStatDetails(data, "Siswa per Kategori");

        } else if (this.chartType === "bar") {
            if (metaX.type === "category") {
                const groupSums = {};
                const groupCounts = {};

                this.filteredStudents.forEach((st) => {
                    const cat = st[this.chartVarX] || "N/A";
                    const numY = Number(st[this.chartVarY]) || 0;
                    groupSums[cat] = (groupSums[cat] || 0) + numY;
                    groupCounts[cat] = (groupCounts[cat] || 0) + 1;
                });

                const labels = Object.keys(groupSums);
                const data = labels.map((k) => (groupCounts[k] ? groupSums[k] / groupCounts[k] : 0));

                if (titleEl) titleEl.textContent = `Rata-rata ${metaY.label} Berdasarkan ${metaX.label}`;
                if (descEl) descEl.textContent = `Membandingkan besaran nilai ${metaY.label} di setiap kelompok ${metaX.label}.`;

                this.chartEngine.render({
                    type: "bar",
                    labels,
                    data,
                    xLabel: metaX.label,
                    yLabel: metaY.unit
                });
                this.renderChartStatDetails(data, metaY.unit);
            } else {
                const sorted = [...this.filteredStudents].sort((a, b) => a[this.chartVarX] - b[this.chartVarX]);
                const labels = sorted.map((s) => s.id);
                const data = sorted.map((s) => Number(s[this.chartVarY]) || 0);

                if (titleEl) titleEl.textContent = `Nilai ${metaY.label} Tiap Siswa (Urut Berdasarkan ${metaX.label})`;
                if (descEl) descEl.textContent = `Batang menunjukkan nilai tiap siswa yang diurutkan menurut ${metaX.label}.`;

                this.chartEngine.render({
                    type: "bar",
                    labels,
                    data,
                    xLabel: `Siswa (Urut ${metaX.label})`,
                    yLabel: metaY.unit
                });
                this.renderChartStatDetails(data, metaY.unit);
            }

        } else if (this.chartType === "line") {
            const sorted = [...this.filteredStudents].sort((a, b) => Number(a[this.chartVarX]) - Number(b[this.chartVarX]));
            const labels = sorted.map((s) => s[this.chartVarX]);
            const data = sorted.map((s) => Number(s[this.chartVarY]) || 0);

            if (titleEl) titleEl.textContent = `Tren Garis: ${metaY.label} seiring ${metaX.label}`;
            if (descEl) descEl.textContent = `Melihat tren kenaikan atau penurunan ${metaY.label}.`;

            this.chartEngine.render({
                type: "line",
                labels,
                data,
                yLabel: metaY.unit
            });
            this.renderChartStatDetails(data, metaY.unit);

        } else if (this.chartType === "scatter") {
            if (titleEl) titleEl.textContent = `Diagram Tebar: ${metaX.label} vs ${metaY.label}`;
            if (descEl) descEl.textContent = `Setiap titik mewakili 1 siswa untuk melihat apakah titik-titik membentuk pola atau garis tertentu.`;

            this.chartEngine.render({
                type: "scatter",
                rawData: this.filteredStudents,
                xKey: this.chartVarX,
                yKey: this.chartVarY,
                xLabel: metaX.label,
                yLabel: metaY.label,
                xUnit: metaX.unit,
                yUnit: metaY.unit,
                showTrendline: true
            });

            const yData = this.filteredStudents.map(s => Number(s[this.chartVarY]) || 0);
            this.renderChartStatDetails(yData, metaY.unit);
        }
    }

    renderChartStatDetails(numArray, unitStr) {
        if (!numArray.length) return;
        const sorted = [...numArray].sort((a, b) => a - b);
        const min = sorted[0];
        const max = sorted[sorted.length - 1];
        const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
        const median = sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)];

        document.getElementById("detail-stat-mean") && (document.getElementById("detail-stat-mean").textContent = `${mean.toFixed(1)} ${unitStr}`);
        document.getElementById("detail-stat-median") && (document.getElementById("detail-stat-median").textContent = `${median.toFixed(1)} ${unitStr}`);
        document.getElementById("detail-stat-min") && (document.getElementById("detail-stat-min").textContent = `${min.toFixed(1)} ${unitStr}`);
        document.getElementById("detail-stat-max") && (document.getElementById("detail-stat-max").textContent = `${max.toFixed(1)} ${unitStr}`);
        document.getElementById("detail-stat-range") && (document.getElementById("detail-stat-range").textContent = `${(max - min).toFixed(1)} ${unitStr}`);
    }

    setHypothesis(hypo) {
        if (hypo === "study-score") {
            this.corrVarX = "jamBelajar";
            this.corrVarY = "nilaiUjian";
        } else if (hypo === "screen-sleep") {
            this.corrVarX = "screenTime";
            this.corrVarY = "jamTidur";
        } else if (hypo === "water-score") {
            this.corrVarX = "airPutih";
            this.corrVarY = "nilaiUjian";
        }

        document.querySelectorAll("[data-hypo]").forEach((b) => {
            const active = b.getAttribute("data-hypo") === hypo;
            b.classList.toggle("border-indigo-600", active);
            b.classList.toggle("bg-indigo-50/70", active);
            b.classList.toggle("dark:bg-indigo-950/40", active);
            b.classList.toggle("ring-2", active);
            b.classList.toggle("ring-indigo-500/30", active);
        });

        this.renderCorrelation();
    }

    renderCorrelation() {
        const metaX = VARIABLE_METADATA[this.corrVarX] || { label: this.corrVarX, unit: "" };
        const metaY = VARIABLE_METADATA[this.corrVarY] || { label: this.corrVarY, unit: "" };

        this.corrChartEngine.render({
            type: "scatter",
            rawData: this.filteredStudents,
            xKey: this.corrVarX,
            yKey: this.corrVarY,
            xLabel: metaX.label,
            yLabel: metaY.label,
            xUnit: metaX.unit,
            yUnit: metaY.unit,
            showTrendline: true,
            onStatsCalculated: (stats) => this.updateCorrelationUI(stats, metaX, metaY)
        });
    }

    updateCorrelationUI(stats, metaX, metaY) {
        const { pearsonR, slope } = stats;
        const rVal = pearsonR.toFixed(2);

        const rValEl = document.getElementById("corr-r-val");
        const rBadgeEl = document.getElementById("corr-status-badge");
        const narrativeEl = document.getElementById("corr-narrative-text");
        const formulaEl = document.getElementById("corr-formula-preview");
        const meterFill = document.getElementById("corr-meter-fill");

        if (rValEl) rValEl.textContent = `r = ${rVal}`;

        const pct = ((pearsonR + 1) / 2) * 100;
        if (meterFill) {
            meterFill.style.left = `${Math.min(95, Math.max(5, pct))}%`;
        }

        let statusText = "";
        let badgeColor = "";
        let explanation = "";

        if (pearsonR >= 0.7) {
            statusText = "Korelasi Positif Kuat (Sejalan)";
            badgeColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300";
            explanation = `Saat <strong>${metaX.label}</strong> meningkat, <strong>${metaY.label}</strong> cenderung ikut <strong>meningkat secara signifikan</strong>. Garis tren miring ke atas (+). Siswa yang belajar lebih banyak memiliki nilai yang secara konsisten lebih tinggi.`;
        } else if (pearsonR >= 0.3) {
            statusText = "Korelasi Positif Sedang";
            badgeColor = "bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300";
            explanation = `Ada kecenderungan bahwa saat <strong>${metaX.label}</strong> bertambah, <strong>${metaY.label}</strong> juga bertambah, namun variasinya cukup lebar.`;
        } else if (pearsonR > -0.3 && pearsonR < 0.3) {
            statusText = "Tidak Ada Korelasi / Hubungan Sangat Lemah";
            badgeColor = "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
            explanation = `Titik-titik tersebar acak di grafik. <strong>Tidak ada hubungan nyata</strong> antara <strong>${metaX.label}</strong> dan <strong>${metaY.label}</strong>. Perubahan pada variabel pertama tidak mempengaruhi variabel kedua. Ini contoh penting bahwa tidak semua hal dalam survei saling berhubungan!`;
        } else if (pearsonR <= -0.7) {
            statusText = "Korelasi Negatif Kuat (Berlawanan Arah)";
            badgeColor = "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300";
            explanation = `Saat <strong>${metaX.label}</strong> bertambah tinggi, <strong>${metaY.label}</strong> cenderung <strong>turun drastis</strong>. Garis tren miring ke bawah (-). Misalnya: semakin larut bermain HP, waktu tidur malam siswa berkurang drastis.`;
        } else {
            statusText = "Korelasi Negatif Sedang";
            badgeColor = "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300";
            explanation = `Terdapat pola terbalik yang cukup terlihat antara <strong>${metaX.label}</strong> dan <strong>${metaY.label}</strong>.`;
        }

        if (rBadgeEl) {
            rBadgeEl.className = `px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${badgeColor}`;
            rBadgeEl.textContent = statusText;
        }

        if (narrativeEl) {
            narrativeEl.innerHTML = `
                <p class="leading-relaxed mb-3">${explanation}</p>
                <div class="p-3 bg-indigo-50/60 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 text-xs text-indigo-900 dark:text-indigo-200">
                    💡 <strong>Prinsip Emas Detektif Data:</strong> Ingat rumus penting <em>"Correlation is NOT Causation"</em> (Korelasi tidak selalu berarti Sebab-Akibat langsung). Bisa jadi ada faktor lain yang melatarbelakanginya!
                </div>
            `;
        }

        if (formulaEl) {
            formulaEl.textContent = `Model Garis Tren: Y = ${slope.toFixed(2)} * X + ${stats.intercept.toFixed(1)}`;
        }
    }

    evaluateMisi() {
        const q1 = document.querySelector('input[name="misi-q1"]:checked')?.value;
        const q2 = document.querySelector('input[name="misi-q2"]:checked')?.value;
        const q3 = document.querySelector('input[name="misi-q3"]:checked')?.value;

        if (!q1 || !q2 || !q3) {
            alert("Harap jawab semua 3 misi detektif sebelum mengirim jawaban!");
            this.sound.warning();
            return;
        }

        let score = 0;
        const feedback1 = document.getElementById("misi-feedback-1");
        const feedback2 = document.getElementById("misi-feedback-2");
        const feedback3 = document.getElementById("misi-feedback-3");

        if (q1 === "B") {
            score += 35;
            feedback1.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400 font-bold">✅ Benar!</span> Berdasarkan data korelasi negatif r = -0.65, screen time berlebih menggerus jam tidur yang berdampak pada performa belajar.`;
        } else {
            feedback1.innerHTML = `<span class="text-rose-600 dark:text-rose-400 font-bold">❌ Kurang Tepat.</span> Siswa dengan waktu HP di atas 6 jam konsisten memiliki jam tidur < 6 jam dan nilai rendah.`;
        }
        feedback1.classList.remove("hidden");

        if (q2 === "C") {
            score += 35;
            feedback2.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400 font-bold">✅ Benar!</span> Data cleaning adalah langkah wajib dalam sains data sebelum analisis dilakukan agar kesimpulan tidak bias.`;
        } else {
            feedback2.innerHTML = `<span class="text-rose-600 dark:text-rose-400 font-bold">❌ Kurang Tepat.</span> Data yang mustahil (48 jam/hari) merupakan anomali / outlier ekstrem yang harus dibersihkan lebih dulu.`;
        }
        feedback2.classList.remove("hidden");

        if (q3 === "A") {
            score += 30;
            feedback3.innerHTML = `<span class="text-emerald-600 dark:text-emerald-400 font-bold">✅ Benar!</span> Nilai r ≈ 0.05 menunjukkan tidak ada hubungan antara konsumsi air putih dan nilai ujian. Klaim viral adalah mitos belaka!`;
        } else {
            feedback3.innerHTML = `<span class="text-rose-600 dark:text-rose-400 font-bold">❌ Kurang Tepat.</span> Diagram tebar menunjukkan titik tersebar acak rata (r mendekati nol), membuktikan tidak ada korelasi nyata.`;
        }
        feedback3.classList.remove("hidden");

        const resultBox = document.getElementById("misi-result-box");
        const scoreBadge = document.getElementById("misi-final-score");
        if (scoreBadge) scoreBadge.textContent = `${score} / 100`;

        if (resultBox) resultBox.classList.remove("hidden");
        this.sound.success();
        resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// Inisialisasi otomatis
document.addEventListener("DOMContentLoaded", () => {
    window.dataLabApp = new AppState();
});
