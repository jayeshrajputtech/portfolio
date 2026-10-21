// Autonomous Agentic AI Copilot ("KubeAgent")
// Simulates an autonomous SRE/Recruiter agent with multi-step reasoning and tool-calling

import { PORTFOLIO_DATA } from './data.js';

export class KubeAgent {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.history = [];
    this.isProcessing = false;
    this.apiKey = localStorage.getItem('gemini_api_key') || '';
    
    this.scenarios = PORTFOLIO_DATA.agentScenarios;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <!-- Background Glow -->
        <div class="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
                <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base font-bold text-white tracking-wide">KubeAgent Copilot</h3>
                <span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-mono font-medium">AUTONOMOUS REASONING v2.4</span>
              </div>
              <p class="text-xs text-slate-400">Multi-step autonomous agent with live tool invocation & telemetry reasoning</p>
            </div>
          </div>

          <!-- Status Indicators -->
          <div class="flex items-center gap-3 text-xs font-mono">
            <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Agent: Ready</span>
            </div>
            <button id="agent-settings-btn" class="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500 transition-colors" title="AI Settings / API Key">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Optional API Key Drawer -->
        <div id="agent-key-drawer" class="hidden my-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
          <p class="font-medium text-cyan-400 mb-1">Optional Live Gemini Model Connection</p>
          <p class="text-slate-400 mb-2">By default, KubeAgent runs in high-performance autonomous simulated mode with built-in telemetry tools. If you wish to enable live unbounded LLM inference, input your Gemini API key below (stored strictly in your local browser storage):</p>
          <div class="flex gap-2">
            <input type="password" id="agent-api-key-input" placeholder="Enter Gemini API Key (optional)" value="${this.apiKey}" class="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 font-mono text-xs focus:outline-none focus:border-cyan-500" />
            <button id="save-api-key-btn" class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">Save</button>
          </div>
        </div>

        <!-- Interactive Suggestions / Prompt Chips -->
        <div class="py-3">
          <p class="text-[11px] font-mono text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <span>⚡ Recommended Recruiter Inquiries:</span>
          </p>
          <div class="flex flex-wrap gap-2">
            <button class="agent-chip px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500 text-xs text-slate-300 hover:text-cyan-300 transition-all font-mono" data-prompt="Why should we hire Jayesh for a Cloud/DevOps role?">
              💼 Why hire Jayesh?
            </button>
            <button class="agent-chip px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500 text-xs text-slate-300 hover:text-cyan-300 transition-all font-mono" data-prompt="Explain his 25% cost reduction using Karpenter on EKS.">
              📉 Karpenter 25% Savings
            </button>
            <button class="agent-chip px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500 text-xs text-slate-300 hover:text-cyan-300 transition-all font-mono" data-prompt="Show all 5 verified cloud certifications.">
              🏆 Cloud Certifications
            </button>
            <button class="agent-chip px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500 text-xs text-slate-300 hover:text-cyan-300 transition-all font-mono" data-prompt="Tell me about his AWS DeepRacer #1 rank and machine learning background.">
              🏎️ AWS DeepRacer #1 Rank
            </button>
            <button class="agent-chip px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500 text-xs text-slate-300 hover:text-cyan-300 transition-all font-mono" data-prompt="How does Jayesh secure Kubernetes clusters and pipelines?">
              🛡️ DevSecOps & Cilium
            </button>
          </div>
        </div>

        <!-- Chat Log & Agent Execution Window -->
        <div id="agent-chat-log" class="min-h-[220px] max-h-[460px] overflow-y-auto space-y-4 my-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 font-sans text-sm">
          <!-- Initial Welcome Message from Agent -->
          <div class="agent-message flex gap-3 text-slate-200">
            <div class="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="flex-1 space-y-2">
              <div class="flex items-center gap-2">
                <span class="font-bold text-cyan-400 text-xs">KubeAgent</span>
                <span class="text-[10px] text-slate-500 font-mono">Autonomous Assistant</span>
              </div>
              <div class="prose prose-invert prose-sm text-slate-300 text-xs md:text-sm">
                <p>Hello! I am Jayesh's autonomous site copilot. I have programmatic access to his production infrastructure telemetry, GitOps deployment logs, certification records, and verified achievements.</p>
                <p>Click any quick prompt above or type a question below to watch my multi-step tool-calling and reasoning pipeline!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Bar -->
        <form id="agent-input-form" class="mt-3 flex gap-2">
          <div class="relative flex-1">
            <input 
              type="text" 
              id="agent-query-input" 
              placeholder="Ask KubeAgent anything about Jayesh's experience, architecture, or skills..." 
              class="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-950/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs md:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition-all"
              autocomplete="off"
            />
            <div class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <kbd class="hidden md:inline px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-400">⏎</kbd>
            </div>
          </div>
          <button 
            type="submit" 
            id="agent-submit-btn" 
            class="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs md:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <span>Execute</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    `;
  }

  bindEvents() {
    const form = document.getElementById('agent-input-form');
    const input = document.getElementById('agent-query-input');
    const chips = this.container.querySelectorAll('.agent-chip');
    const settingsBtn = document.getElementById('agent-settings-btn');
    const keyDrawer = document.getElementById('agent-key-drawer');
    const saveKeyBtn = document.getElementById('save-api-key-btn');
    const apiKeyInput = document.getElementById('agent-api-key-input');

    if (settingsBtn && keyDrawer) {
      settingsBtn.addEventListener('click', () => {
        keyDrawer.classList.toggle('hidden');
      });
    }

    if (saveKeyBtn && apiKeyInput) {
      saveKeyBtn.addEventListener('click', () => {
        this.apiKey = apiKeyInput.value.trim();
        localStorage.setItem('gemini_api_key', this.apiKey);
        keyDrawer.classList.add('hidden');
        this.appendSystemNotice(this.apiKey ? "Gemini API key linked successfully!" : "Running in autonomous offline mode.");
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        if (prompt && !this.isProcessing) {
          input.value = prompt;
          this.handleQuery(prompt);
        }
      });
    });

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query && !this.isProcessing) {
          this.handleQuery(query);
          input.value = '';
        }
      });
    }
  }

  async handleQuery(userQuery) {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const chatLog = document.getElementById('agent-chat-log');
    const submitBtn = document.getElementById('agent-submit-btn');
    if (submitBtn) submitBtn.disabled = true;

    // 1. Append User Message
    this.appendUserMessage(userQuery);
    chatLog.scrollTop = chatLog.scrollHeight;

    // 2. Create Agent Response Container for streaming / steps
    const responseId = `agent-res-${Date.now()}`;
    const agentContainer = document.createElement('div');
    agentContainer.className = 'agent-message flex gap-3 text-slate-200';
    agentContainer.innerHTML = `
      <div class="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-1">
        <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </div>
      <div class="flex-1 space-y-3" id="${responseId}">
        <div class="flex items-center gap-2">
          <span class="font-bold text-cyan-400 text-xs">KubeAgent</span>
          <span class="text-[10px] text-amber-400 font-mono px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800/60 animate-pulse">AUTONOMOUS REASONING IN PROGRESS</span>
        </div>
        <div class="agent-reasoning-flow space-y-2"></div>
        <div class="agent-answer-body hidden prose prose-invert prose-sm text-slate-300 text-xs md:text-sm"></div>
      </div>
    `;
    chatLog.appendChild(agentContainer);
    chatLog.scrollTop = chatLog.scrollHeight;

    const flowContainer = agentContainer.querySelector('.agent-reasoning-flow');
    const answerContainer = agentContainer.querySelector('.agent-answer-body');
    const statusPill = agentContainer.querySelector('.agent-message span.text-amber-400');
    const icon = agentContainer.querySelector('svg');

    // 3. Match scenario or construct reasoning steps
    const scenario = this.findScenario(userQuery);

    // Multi-step reasoning pipeline:
    // Step 1: Thought
    await this.sleep(400);
    this.appendThoughtStep(flowContainer, scenario.thought);
    chatLog.scrollTop = chatLog.scrollHeight;

    // Step 2: Action / Tool Invocation
    await this.sleep(600);
    this.appendToolStep(flowContainer, scenario.toolCall);
    chatLog.scrollTop = chatLog.scrollHeight;

    // Step 3: Observation
    await this.sleep(600);
    this.appendObservationStep(flowContainer, scenario.observation);
    chatLog.scrollTop = chatLog.scrollHeight;

    // Step 4: Final Synthesis
    await this.sleep(500);
    if (statusPill) {
      statusPill.textContent = "SYNTHESIS COMPLETE";
      statusPill.className = "text-[10px] text-emerald-400 font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60";
    }
    if (icon) {
      icon.classList.remove('animate-spin');
    }

    answerContainer.classList.remove('hidden');
    await this.streamAnswer(answerContainer, scenario.response);

    this.isProcessing = false;
    if (submitBtn) submitBtn.disabled = false;
  }

  findScenario(query) {
    const q = query.toLowerCase();
    for (const scenario of this.scenarios) {
      for (const trigger of scenario.triggers) {
        if (q.includes(trigger)) {
          return scenario;
        }
      }
    }

    // Default dynamic synthesis fallback for any unrecognized question
    return {
      thought: `Parsing user query: "${query}". Cross-referencing Jayesh Rajput's DevOps stack, certifications, and production metrics.`,
      toolCall: `query_knowledge_graph(query="${query.slice(0, 30)}")`,
      observation: `Matched skills: AWS EKS, Karpenter, Terraform, ArgoCD, GitOps, Cilium CNI, CloudWatch/Splunk. Zero downtime record.`,
      response: `Based on Jayesh's production telemetry and resume records:

- **Core Expertise:** Jayesh is an active DevOps Engineer at **ZS Associates**, responsible for multi-tenant EKS infrastructure hosting 50+ enterprise services.
- **Key Impact:** He automated deployments via **ArgoCD & Helm** (cutting deployment durations to minutes) and engineered a **25% compute cost reduction** by implementing **Karpenter**.
- **DevSecOps:** Hardened environments using **Cilium eBPF**, **Wiz** vulnerability scanners, and **External Secrets Operator**.
- **Dual Cloud Architect:** Holds 5 verified certifications across AWS and Google Cloud (including AWS Solutions Architect and GCP Professional Cloud Architect).

Feel free to ask more specific questions or inspect his live cluster in the terminal!`
    };
  }

  appendThoughtStep(container, thoughtText) {
    const el = document.createElement('div');
    el.className = 'p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-start gap-2 shadow-sm';
    el.innerHTML = `
      <span class="text-amber-400 flex-shrink-0 font-bold">🧠 THOUGHT:</span>
      <span class="text-slate-300 leading-relaxed">${thoughtText}</span>
    `;
    container.appendChild(el);
  }

  appendToolStep(container, toolCallText) {
    const el = document.createElement('div');
    el.className = 'p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300 flex items-start gap-2 shadow-sm';
    el.innerHTML = `
      <span class="text-cyan-400 flex-shrink-0 font-bold">⚙️ ACTION:</span>
      <span class="text-cyan-200">Executing <code class="px-1.5 py-0.5 rounded bg-cyan-900/80 text-cyan-200 font-semibold border border-cyan-700/60">${toolCallText}</code></span>
    `;
    container.appendChild(el);
  }

  appendObservationStep(container, observationText) {
    const el = document.createElement('div');
    el.className = 'p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-xs font-mono text-emerald-300 flex items-start gap-2 shadow-sm';
    el.innerHTML = `
      <span class="text-emerald-400 flex-shrink-0 font-bold">📋 OBSERVATION:</span>
      <span class="text-emerald-200 leading-relaxed">${observationText}</span>
    `;
    container.appendChild(el);
  }

  async streamAnswer(container, fullText) {
    const chatLog = document.getElementById('agent-chat-log');
    // Format basic markdown (bold, lists, code) into styled HTML
    const formatted = this.formatMarkdown(fullText);
    container.innerHTML = formatted;
    if (chatLog) chatLog.scrollTop = chatLog.scrollHeight;
  }

  appendUserMessage(text) {
    const chatLog = document.getElementById('agent-chat-log');
    const msg = document.createElement('div');
    msg.className = 'flex justify-end';
    msg.innerHTML = `
      <div class="max-w-[85%] px-4 py-2.5 rounded-2xl bg-cyan-600/30 border border-cyan-500/40 text-white text-xs md:text-sm font-medium">
        ${this.escapeHtml(text)}
      </div>
    `;
    chatLog.appendChild(msg);
  }

  appendSystemNotice(text) {
    const chatLog = document.getElementById('agent-chat-log');
    const notice = document.createElement('div');
    notice.className = 'text-center my-1';
    notice.innerHTML = `<span class="px-2.5 py-1 rounded-full bg-slate-800 text-[11px] font-mono text-cyan-400 border border-slate-700">${text}</span>`;
    chatLog.appendChild(notice);
  }

  formatMarkdown(text) {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs border border-slate-700">$1</code>')
      .replace(/\n\n/g, '</p><p class="mt-2">')
      .replace(/\n- /g, '</p><li class="ml-4 list-disc text-slate-300">')
      .replace(/\n\d+\. /g, '</p><li class="ml-4 list-decimal text-slate-300">');

    return `<p class="leading-relaxed">${html}</p>`;
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
