// Jayesh Rajput - Portfolio Application Orchestration

import { PORTFOLIO_DATA } from './data.js';
import { DevOpsTerminal } from './terminal.js';
import { KubeAgent } from './agent.js';
import { ChaosSimulator } from './chaos.js';
import { EasterEggsManager } from './easter-eggs.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Components
  const terminal = new DevOpsTerminal('terminal-container', 'terminal-input', 'terminal-output');
  const agent = new KubeAgent('kubeagent-container');
  const chaos = new ChaosSimulator('chaos-simulator-container');
  const easterEggs = new EasterEggsManager();

  // Expose helpers to window for terminal interaction
  window.toggleMatrixRain = () => easterEggs.toggleMatrixRain();
  window.toggleTerminalModal = (force) => toggleTerminalHUD(force);

  // Initialize Lucide icons if available
  if (window.lucide) {
    try { window.lucide.createIcons(); } catch (e) {}
  }

  // 2. Render Dynamic Sections
  renderExperience();
  renderProjects();
  renderCertifications();
  renderAchievements();
  renderSkills();
  setupTerminalHUD();
  setupInteractiveTopology();
  setupActionButtons();
});

// Render Work Experience Timeline
function renderExperience() {
  const container = document.getElementById('experience-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.experience.map((exp, idx) => `
    <div class="relative pl-6 md:pl-10 pb-10 border-l-2 ${exp.current ? 'border-cyan-500' : 'border-slate-800'} last:pb-0 group">
      <!-- Timeline Node Marker -->
      <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full ${exp.current ? 'bg-cyan-400 ring-4 ring-cyan-500/20' : 'bg-slate-700 ring-4 ring-slate-900'} group-hover:scale-125 transition-transform"></div>

      <!-- Experience Card -->
      <div class="bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 md:p-6 backdrop-blur-md transition-all shadow-xl group-hover:shadow-cyan-500/5">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-lg md:text-xl font-bold text-white tracking-wide">${exp.role}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${exp.current ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-800 text-slate-300 border border-slate-700'}">${exp.badge}</span>
            </div>
            <p class="text-sm font-semibold text-cyan-400 mt-0.5 flex items-center gap-2">
              <span>🏢 ${exp.company}</span>
              <span class="text-slate-600">•</span>
              <span class="text-slate-400 font-normal">📍 ${exp.location}</span>
            </p>
          </div>
          <span class="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300">${exp.period}</span>
        </div>

        <!-- Highlights List -->
        <ul class="space-y-2 mt-4 text-xs md:text-sm text-slate-300 leading-relaxed">
          ${exp.highlights.map(h => `
            <li class="flex items-start gap-2.5">
              <span class="text-cyan-400 mt-1 flex-shrink-0 text-xs">▹</span>
              <span>${highlightKeywords(h)}</span>
            </li>
          `).join('')}
        </ul>

        <!-- Tech Stack Pills -->
        <div class="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
          ${exp.stack.map(s => `
            <span class="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 hover:text-cyan-400 hover:border-cyan-800 transition-colors">${s}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Render Key Projects
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.projects.map(proj => `
    <div class="bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-6 backdrop-blur-md transition-all shadow-xl hover:-translate-y-1 flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">${proj.period}</span>
          <span class="text-xs text-emerald-400 font-mono flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Production Grade</span>
          </span>
        </div>
        <h4 class="text-base md:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">${proj.title}</h4>
        <p class="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">${proj.description}</p>

        <!-- Metric Highlight Callout -->
        <div class="my-4 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-900/60 text-xs text-cyan-300 font-mono flex items-center gap-2">
          <span class="text-sm">⚡</span>
          <span>${proj.metrics}</span>
        </div>

        <ul class="space-y-1.5 text-xs text-slate-400">
          ${proj.highlights.slice(0, 3).map(h => `
            <li class="flex items-start gap-2">
              <span class="text-cyan-400 mt-0.5">▪</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
        ${proj.stack.map(st => `
          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400">${st}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Render Certifications
function renderCertifications() {
  const container = document.getElementById('certifications-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.certifications.map(cert => `
    <div class="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all backdrop-blur-md shadow-xl flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">${cert.code}</span>
          <span class="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>VERIFIED ACTIVE</span>
          </span>
        </div>
        <h4 class="text-sm md:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">${cert.name}</h4>
        <p class="text-xs text-slate-400 mt-1">${cert.issuer}</p>
        <p class="text-[11px] font-mono text-slate-500 mt-2">Validity: ${cert.validity}</p>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
        ${cert.skills.map(sk => `
          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400">${sk}</span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Render Achievements & DeepRacer Highlight
function renderAchievements() {
  const container = document.getElementById('achievements-container');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.achievements.map((ach, i) => `
    <div class="p-5 md:p-6 rounded-2xl bg-slate-900/80 border ${i === 0 ? 'border-amber-500/50 shadow-amber-500/10' : 'border-slate-800'} shadow-xl backdrop-blur-md flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-2xl">${i === 0 ? '🏆' : (i === 1 ? '🛡️' : '🎨')}</span>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${i === 0 ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-slate-800 text-slate-300 border border-slate-700'}">${ach.badge}</span>
        </div>
        <h4 class="text-base font-bold text-white">${ach.title}</h4>
        <p class="text-xs font-semibold text-cyan-400 mt-1">${ach.subtitle}</p>
        <p class="text-xs text-slate-400 mt-3 leading-relaxed">${ach.details}</p>
      </div>
      <div class="mt-4 pt-3 border-t border-slate-800/80">
        <span class="text-[10px] font-mono text-slate-500 uppercase">${ach.category}</span>
      </div>
    </div>
  `).join('');
}

// Render Skills Grouped
function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const categories = [
    { title: "Container & Kubernetes Orchestration", items: PORTFOLIO_DATA.skills.containerAndOrchestration },
    { title: "Infrastructure as Code & Security", items: PORTFOLIO_DATA.skills.infrastructureAsCode },
    { title: "CI/CD & DevSecOps Automation", items: PORTFOLIO_DATA.skills.ciCdAndDevSecOps },
    { title: "Cloud Platforms (AWS & GCP)", items: PORTFOLIO_DATA.skills.cloudPlatforms },
    { title: "Observability & Linux Systems", items: PORTFOLIO_DATA.skills.observabilityAndLinux }
  ];

  container.innerHTML = categories.map(cat => `
    <div class="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-xl">
      <h4 class="text-sm font-bold text-cyan-400 mb-4 font-mono uppercase tracking-wide flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
        <span>${cat.title}</span>
      </h4>
      <div class="space-y-3">
        ${cat.items.map(skill => `
          <div>
            <div class="flex items-center justify-between text-xs font-mono mb-1">
              <span class="text-slate-300 font-semibold">${skill.name}</span>
              <span class="text-slate-500">${skill.level}%</span>
            </div>
            <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000" style="width: ${skill.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// Interactive Cloud Architecture Topology
function setupInteractiveTopology() {
  const nodes = document.querySelectorAll('.topo-node');
  const inspectTitle = document.getElementById('topo-inspect-title');
  const inspectDesc = document.getElementById('topo-inspect-desc');
  const inspectMeta = document.getElementById('topo-inspect-meta');

  const topologyData = {
    alb: {
      title: "AWS Application Load Balancer (ALB)",
      desc: "Handles incoming public HTTP/HTTPS traffic with ACM SSL/TLS termination. Routes traffic via path and host routing directly to target groups backed by Ingress-NGINX.",
      meta: "AWS ALB | Multi-AZ | SSL Offloading | 99.99% SLA"
    },
    ingress: {
      title: "NGINX Ingress Controller",
      desc: "Controls HTTP/HTTPS routing inside the EKS cluster. Consolidates multiple microservice backends behind a single public endpoint with automated Let's Encrypt certificates.",
      meta: "K8s Ingress API | Path Routing | Custom Headers | Rate Limiting"
    },
    cilium: {
      title: "Cilium CNI & eBPF Security Layer",
      desc: "Replaces traditional iptables packet routing with Linux kernel eBPF bytecode. Enforces fine-grained L3/L4/L7 network policies, pod IP management, and real-time observability.",
      meta: "Kernel eBPF | Micro-segmentation | Zero Packet Drop | Observability"
    },
    karpenter: {
      title: "Karpenter High-Speed Autoscaler",
      desc: "Direct-to-fleet EC2 node provisioning engine. Evaluates pending pods and launches right-sized Spot and On-Demand instances in 40 seconds. Reduced cluster costs by 25%.",
      meta: "EC2 Fleet API | Spot Diversification | Bin-packing | 25% Cost Saved"
    },
    secrets: {
      title: "External Secrets Operator (ESO)",
      desc: "Pulls sensitive credentials dynamically from AWS Secrets Manager into native Kubernetes Secrets via IRSA without persisting sensitive keys in Git or Helm values.",
      meta: "AWS Secrets Manager | IRSA / OIDC | Zero Secret Drift"
    },
    argocd: {
      title: "ArgoCD GitOps Continuous Delivery",
      desc: "Continuously reconciles declared Git state with live Kubernetes state across Dev, Staging, and Production. Ensures 100% auditable deployments with instant rollbacks.",
      meta: "Git Single Source of Truth | Automated Sync | 30+ Microservices"
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('ring-2', 'ring-cyan-400', 'bg-cyan-950/60'));
      node.classList.add('ring-2', 'ring-cyan-400', 'bg-cyan-950/60');

      const key = node.getAttribute('data-topo');
      const data = topologyData[key];
      if (data && inspectTitle && inspectDesc && inspectMeta) {
        inspectTitle.textContent = data.title;
        inspectDesc.textContent = data.desc;
        inspectMeta.textContent = data.meta;
      }
    });
  });
}

// Terminal HUD Toggle
function setupTerminalHUD() {
  const toggleBtn = document.getElementById('open-terminal-btn');
  const closeBtn = document.getElementById('close-terminal-btn');
  const modal = document.getElementById('terminal-modal');
  const terminalInput = document.getElementById('terminal-input');

  const toggle = (force) => {
    if (!modal) return;
    const isHidden = modal.classList.contains('hidden');
    const targetState = force !== undefined ? !force : isHidden;

    if (targetState) {
      modal.classList.remove('hidden');
      if (terminalInput) setTimeout(() => terminalInput.focus(), 100);
    } else {
      modal.classList.add('hidden');
    }
  };

  window.toggleTerminalHUD = toggle;

  if (toggleBtn) toggleBtn.addEventListener('click', () => toggle(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));

  // Global hotkeys: backtick (`) and Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggle(false);
    } else if (e.key === '`') {
      // If focused in terminal input, close it
      if (document.activeElement === terminalInput) {
        e.preventDefault();
        toggle(false);
      } else if (!['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        toggle();
      }
    }
  });

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      toggle(false);
    }
  });
}

// Action Buttons: Copy Email, Resume Download
function setupActionButtons() {
  const copyBtn = document.getElementById('copy-email-btn');
  const resumeBtn = document.getElementById('download-resume-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email).then(() => {
        showToast("Email copied to clipboard: contact.jayeshrajput@gmail.com");
      });
    });
  }

  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      // Trigger a printable / downloadable version or open terminal resume
      window.toggleTerminalHUD(true);
      const terminalInput = document.getElementById('terminal-input');
      if (terminalInput) {
        terminalInput.value = 'cat resume.yaml';
        terminalInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }
    });
  }
}

// Helper: Show Toast Notification
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500 text-white font-mono text-xs shadow-2xl flex items-center gap-2 animate-bounce';
  toast.innerHTML = `<span class="text-cyan-400">✔</span> <span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// Highlight DevOps Keywords
function highlightKeywords(str) {
  const keywords = [
    'EKS', 'Terraform', 'ArgoCD', 'Helm', 'Karpenter', 'Cilium', 'NGINX Ingress',
    'External Secrets Operator', 'ECS Fargate', 'Wiz', 'Splunk', 'CloudWatch',
    '25%', '50+', '30+', 'Airflow', 'Redshift', 'Docker', 'Blue/Green'
  ];

  let result = str;
  keywords.forEach(kw => {
    const reg = new RegExp(`\\b(${kw})\\b`, 'g');
    result = result.replace(reg, '<strong class="text-white font-semibold">$1</strong>');
  });
  return result;
}
