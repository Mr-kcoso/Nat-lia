/* Helper UI for fita pages — typing feedback, success/error animations, encouragements */
const FitasUI = (function () {
    const encouragements = [
        'Você está perto!',
        'O arquivo quase abriu...',
        'Boa tentativa — continue.',
        'Quase lá, não desista.'
    ];

    function init() {
        // attach typing feedback to any #resposta on the page
        const input = document.getElementById('resposta');
        if (input) {
            input.classList.add('fita-input');
            input.addEventListener('input', (e) => {
                e.target.classList.add('typing');
                clearTimeout(e.target._typingTimeout);
                e.target._typingTimeout = setTimeout(() => e.target.classList.remove('typing'), 700);
            });
            input.addEventListener('focus', () => input.classList.add('focused'));
            input.addEventListener('blur', () => input.classList.remove('focused'));
        }

        // style send buttons
        const btns = Array.from(document.querySelectorAll('button'));
        btns.forEach(b => {
            if (b.textContent && b.textContent.trim().toUpperCase() === 'ENVIAR') {
                b.classList.add('fita-btn');
                b.addEventListener('click', () => {
                    b.classList.add('sending');
                    setTimeout(() => b.classList.remove('sending'), 350);
                });
            }
        });
    }

    function showEncouragement() {
        const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
        const el = document.createElement('div');
        el.className = 'fita-encourage';
        el.textContent = msg;
        document.body.appendChild(el);
        requestAnimationFrame(() => el.classList.add('visible'));
        setTimeout(() => { el.classList.remove('visible'); setTimeout(() => { try{ document.body.removeChild(el); }catch(e){} }, 260); }, 2000);
    }

    function showSuccess(opts = {}) {
        const overlay = document.createElement('div');
        overlay.className = 'fita-success-overlay persistent';
        const closeBtn = `<button class="close-btn" aria-label="Fechar">FECHAR</button>`;
        overlay.innerHTML = `${closeBtn}<div class="success-box"><h1>${opts.title || 'MEMÓRIA RECUPERADA'}</h1><p class="percent">${opts.percent || ''}</p><div class="success-text">${opts.html || ''}</div></div>`;
        document.body.appendChild(overlay);
        // animate in
        requestAnimationFrame(() => overlay.classList.add('show'));

        const removeOverlay = () => {
            overlay.classList.remove('show');
            setTimeout(() => {
                try { document.body.removeChild(overlay); } catch (e) {}
                if (typeof opts.onComplete === 'function') opts.onComplete();
            }, 260);
        };

        // close button handler
        const btn = overlay.querySelector('.close-btn');
        if (btn) btn.addEventListener('click', removeOverlay);

        // if autoDismiss true or timeout provided, auto remove after timeout
        if (opts.autoDismiss || opts.timeout) {
            const t = typeof opts.timeout === 'number' ? opts.timeout : 2500;
            setTimeout(removeOverlay, t);
        }

        // allow ESC to close
        const escHandler = (ev) => { if (ev.key === 'Escape') removeOverlay(); };
        document.addEventListener('keydown', escHandler, { once: true });
    }

    function showError(message) {
        const feedback = document.getElementById('fita-feedback');
        if (feedback) {
            feedback.innerHTML = `<div class="error-glitch">${message}</div>`;
            feedback.classList.add('glitch-active');
            setTimeout(() => feedback.classList.remove('glitch-active'), 1600);
        } else {
            // fallback
            console.warn('[FitasUI] erro:', message);
        }
        const inp = document.getElementById('resposta');
        if (inp) {
            inp.classList.add('shake');
            setTimeout(() => inp.classList.remove('shake'), 650);
        }
    }

    return { init, showEncouragement, showSuccess, showError };
})();

// auto-init for pages that include this script
document.addEventListener('DOMContentLoaded', () => { try { FitasUI.init(); } catch(e){} });
