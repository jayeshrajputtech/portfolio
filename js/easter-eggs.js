// Easter Eggs: Konami Code, Ambient Background Matrix Rain, Web Audio Synthesizer, Linux Trivia Ticker

import { PORTFOLIO_DATA } from './data.js';

export class EasterEggsManager {
  constructor() {
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    this.konamiIndex = 0;
    this.matrixMode = 'ambient'; // 'ambient' (subtle background) or 'foreground' (bright on top)
    this.soundEnabled = false;
    this.audioCtx = null;
    this.matrixCanvas = document.getElementById('matrix-canvas');
    this.matrixInterval = null;
    
    this.init();
  }

  init() {
    this.setupBackgroundMatrix();
    this.setupFactTicker();
    this.bindKonami();
    this.setupAudio();
  }

  setupBackgroundMatrix() {
    if (!this.matrixCanvas) return;
    this.matrixCanvas.classList.remove('hidden');
    this.matrixCanvas.classList.remove('matrix-foreground');
    this.matrixCanvas.classList.add('matrix-ambient');
    this.matrixMode = 'ambient';
    this.startMatrix(this.matrixCanvas);
  }

  setupAudio() {
    const toggleSoundBtn = document.getElementById('sound-toggle-btn');
    if (toggleSoundBtn) {
      toggleSoundBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        if (this.soundEnabled && !this.audioCtx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.audioCtx = new AudioContext();
        }
        toggleSoundBtn.innerHTML = this.soundEnabled 
          ? `<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg><span class="hidden sm:inline text-xs font-mono text-emerald-400">FX: ON</span>`
          : `<svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg><span class="hidden sm:inline text-xs font-mono text-slate-400">FX: OFF</span>`;
        
        if (this.soundEnabled) {
          this.playBeep(600, 0.08, 'triangle');
        }
      });
    }

    const terminalInput = document.getElementById('terminal-input');
    if (terminalInput) {
      terminalInput.addEventListener('keydown', () => {
        if (this.soundEnabled) {
          this.playKeyClick();
        }
      });
    }
  }

  playBeep(freq = 440, duration = 0.1, type = 'sine') {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (err) {
      console.warn("AudioContext error:", err);
    }
  }

  playKeyClick() {
    this.playBeep(180 + Math.random() * 80, 0.03, 'triangle');
  }

  playSuccessChime() {
    if (!this.soundEnabled) return;
    this.playBeep(523.25, 0.12, 'sine');
    setTimeout(() => this.playBeep(659.25, 0.18, 'sine'), 120);
    setTimeout(() => this.playBeep(783.99, 0.25, 'sine'), 240);
  }

  bindKonami() {
    window.addEventListener('keydown', (e) => {
      if (e.key === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;
        if (this.konamiIndex === this.konamiCode.length) {
          this.activateKonamiEasterEgg();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }

  activateKonamiEasterEgg() {
    this.playSuccessChime();
    
    // Switch Matrix Rain to BRIGHT FOREGROUND on top of text
    this.setMatrixMode('foreground');
    
    // Show Achievement Alert
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in';
    modal.innerHTML = `
      <div class="max-w-md w-full bg-slate-900 border-2 border-emerald-400 rounded-2xl p-6 text-center shadow-2xl shadow-emerald-500/30 relative z-50">
        <div class="text-4xl mb-3">👾 🔓 ⚡</div>
        <h3 class="text-xl font-bold text-emerald-400 font-mono tracking-wider">ROOT ACCESS UNLOCKED!</h3>
        <p class="text-xs text-slate-300 mt-2 font-mono">
          Konami Code Recognized: <span class="text-cyan-400">↑ ↑ ↓ ↓ ← → ← → B A</span>
        </p>
        <p class="text-xs text-slate-300 mt-3 leading-relaxed">
          You've unlocked secret DevOps root privileges! Matrix digital rain intensified directly onto foreground. Cluster chaos immunity granted.
        </p>
        <div class="mt-5 flex justify-center gap-3">
          <button id="close-konami-btn" class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs transition-colors shadow-lg shadow-emerald-500/30">
            ACKNOWLEDGE & RESUME AMBIENT MODE
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeModal = () => {
      modal.remove();
      // Revert smoothly back to ambient subtle background
      this.setMatrixMode('ambient');
    };

    document.getElementById('close-konami-btn').addEventListener('click', closeModal);

    // Auto-revert after 15 seconds if not closed
    setTimeout(() => {
      if (document.body.contains(modal)) {
        closeModal();
      }
    }, 15000);
  }

  setMatrixMode(mode) {
    if (!this.matrixCanvas) return;
    this.matrixMode = mode;
    if (mode === 'foreground') {
      this.matrixCanvas.classList.remove('matrix-ambient');
      this.matrixCanvas.classList.add('matrix-foreground');
    } else {
      this.matrixCanvas.classList.remove('matrix-foreground');
      this.matrixCanvas.classList.add('matrix-ambient');
    }
  }

  toggleMatrixRain() {
    if (this.matrixMode === 'ambient') {
      this.setMatrixMode('foreground');
    } else {
      this.setMatrixMode('ambient');
    }
  }

  setupFactTicker() {
    const scrollContainer = document.getElementById('fact-ticker-scroll');
    const textEl = document.getElementById('fact-ticker-text');
    const pillEl = document.getElementById('fact-category-pill');
    const nextFactBtn = document.getElementById('next-fact-btn');
    if (!scrollContainer || !textEl) return;

    let currentIndex = 0;
    const facts = PORTFOLIO_DATA.devopsFacts;

    const renderFact = (idx) => {
      const f = facts[idx];
      if (pillEl) pillEl.textContent = f.category.toUpperCase();
      textEl.textContent = f.fact;
      scrollContainer.scrollLeft = 0;
      scrollContainer.setAttribute('title', `[${f.category}] ${f.fact} (Horizontal scroll or drag to read full fact)`);

      // Add gentle auto-scroll if text overflows container
      setTimeout(() => {
        if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
          this.triggerSmoothAutoScroll(scrollContainer);
        }
      }, 1000);
    };

    renderFact(currentIndex);

    // Mouse drag-to-scroll support
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });

    window.addEventListener('mouseup', () => { isDown = false; });
    scrollContainer.addEventListener('mouseleave', () => { isDown = false; });

    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Mouse wheel horizontal scroll support
    scrollContainer.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    if (nextFactBtn) {
      nextFactBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % facts.length;
        renderFact(currentIndex);
        this.playBeep(450, 0.05, 'sine');
      });
    }

    // Auto rotate every 15 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % facts.length;
      renderFact(currentIndex);
    }, 15000);
  }

  triggerSmoothAutoScroll(container) {
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    // Slow auto-nudge so user sees there's more content, then returns
    let step = 0;
    const scrollTimer = setInterval(() => {
      if (step < maxScroll) {
        step += 1;
        container.scrollLeft = step;
      } else {
        clearInterval(scrollTimer);
      }
    }, 40);

    // Cancel auto-scroll if user interacts
    const stopAuto = () => clearInterval(scrollTimer);
    container.addEventListener('mousedown', stopAuto, { once: true });
    container.addEventListener('wheel', stopAuto, { once: true });
  }

  startMatrix(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEF01K8sAWSTERRAFORMEKSCILIUM';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }

    if (this.matrixInterval) clearInterval(this.matrixInterval);

    this.matrixInterval = setInterval(() => {
      // Fade trail
      ctx.fillStyle = 'rgba(9, 13, 22, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF66';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 45);

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}
