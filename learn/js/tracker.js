/**
 * ============================================================
 * Fanani Learning Platform — Client Tracker & API Connector
 * Hybrid sync: LocalStorage + Server MySQL (smpn2lmg.sch.id)
 * ============================================================
 */

const FananiTracker = (() => {
    const API_BASE_URL = 'https://smpn2lmg.sch.id/fanani_api'; // Host endpoint PHP server

    function getToken() {
        try {
            return localStorage.getItem('fanani_auth_token') || null;
        } catch (e) {
            return null;
        }
    }

    function getUser() {
        try {
            return JSON.parse(localStorage.getItem('fanani_user') || 'null');
        } catch (e) {
            return null;
        }
    }

    function getLocalProgress() {
        try {
            return JSON.parse(localStorage.getItem('fanani_learn_progress') || '{}');
        } catch (e) {
            return {};
        }
    }

    function setLocalProgress(topicId, isCompleted = true) {
        try {
            const prog = getLocalProgress();
            prog[topicId] = isCompleted;
            localStorage.setItem('fanani_learn_progress', JSON.stringify(prog));
        } catch (e) {}
    }

    // Record or sync completion status
    async function markCompleted(subject, topicId) {
        setLocalProgress(topicId, true);

        const token = getToken();
        if (!token) return { success: true, mode: 'local' };

        try {
            const res = await fetch(`${API_BASE_URL}/save_progress.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ subject, topic_id: topicId, status: 'completed' })
            });
            const data = await res.json();
            return { success: data.success, mode: 'server' };
        } catch (err) {
            console.warn('[Tracker] Offline fallback for progress:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    // Submit evaluation with score and answers (multi-attempt)
    async function submitEvaluation(payload) {
        // payload: { subject, topic_id, score_a, score_b, score_c, score_d, total_score, answers }
        const { subject, topic_id, total_score } = payload;

        // 1. Save locally to history
        try {
            const histKey = `eval_hist_${topic_id}`;
            const localHist = JSON.parse(localStorage.getItem(histKey) || '[]');
            const attemptNum = localHist.length + 1;
            const entry = {
                attempt_number: attemptNum,
                ...payload,
                created_at: new Date().toISOString()
            };
            localHist.push(entry);
            localStorage.setItem(histKey, JSON.stringify(localHist));

            if (total_score >= 70) {
                setLocalProgress(topic_id, true);
            }
        } catch (e) {}

        // 2. Sync to Server if authenticated
        const token = getToken();
        if (!token) return { success: true, mode: 'local' };

        try {
            const res = await fetch(`${API_BASE_URL}/submit_evaluation.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            return { success: data.success, mode: 'server', data };
        } catch (err) {
            console.warn('[Tracker] Offline fallback for evaluation:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    // Save reflection note
    async function saveReflection(subject, topic_id, reflection_text) {
        try {
            localStorage.setItem(`refl_${topic_id}`, reflection_text);
        } catch (e) {}

        const token = getToken();
        if (!token) return { success: true, mode: 'local' };

        try {
            const res = await fetch(`${API_BASE_URL}/save_reflection.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ subject, topic_id, reflection_text })
            });
            const data = await res.json();
            return { success: data.success, mode: 'server' };
        } catch (err) {
            console.warn('[Tracker] Offline fallback for reflection:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    // Fetch history from server or local
    async function getHistory(subject, topic_id) {
        const token = getToken();
        if (token) {
            try {
                const res = await fetch(`${API_BASE_URL}/get_topic_history.php?subject=${subject}&topic_id=${topic_id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    return data;
                }
            } catch (err) {}
        }

        // Fallback local
        const histKey = `eval_hist_${topic_id}`;
        const localHist = JSON.parse(localStorage.getItem(histKey) || '[]');
        const localRefl = localStorage.getItem(`refl_${topic_id}`) || null;
        const isComp = !!getLocalProgress()[topic_id];

        return {
            success: true,
            attempts: localHist,
            total_attempts: localHist.length,
            max_score: localHist.length ? Math.max(...localHist.map(h => h.total_score || 0)) : 0,
            reflection_text: localRefl,
            is_completed: isComp,
            mode: 'local'
        };
    }

    // Google Login API handler
    async function googleLogin(credential) {
        try {
            const res = await fetch(`${API_BASE_URL}/google_login.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential })
            });
            const data = await res.json();
            if (data.success && data.session_token) {
                localStorage.setItem('fanani_auth_token', data.session_token);
                return data;
            }
            return { success: false, error: data.error || 'Login failed' };
        } catch (err) {
            console.warn('[Tracker] Google login network fallback:', err);
            return { success: false, error: err.message };
        }
    }

    // Save profile API handler
    async function saveProfile(payload) {
        // payload: { full_name, kelas } or { name, kelas }
        const fullName = payload.full_name || payload.name;
        const kelas = payload.kelas;
        const token = getToken();

        if (!token) return { success: true, mode: 'local' };

        try {
            const res = await fetch(`${API_BASE_URL}/save_profile.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ full_name: fullName, kelas })
            });
            const data = await res.json();
            return data;
        } catch (err) {
            console.warn('[Tracker] Save profile network fallback:', err);
            return { success: true, mode: 'local_fallback' };
        }
    }

    return {
        getToken,
        getUser,
        markCompleted,
        submitEvaluation,
        saveReflection,
        getHistory,
        googleLogin,
        saveProfile
    };
})();

if (typeof window !== 'undefined') {
    window.FananiTracker = FananiTracker;
}
