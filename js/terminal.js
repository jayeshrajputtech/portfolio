// Interactive DevOps Terminal HUD & Shell Emulator

import { PORTFOLIO_DATA } from './data.js';

export class DevOpsTerminal {
  constructor(containerId, inputId, outputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.output = document.getElementById(outputId);
    this.history = [];
    this.historyIndex = -1;

    this.commands = [
      'help', 'whoami', 'neofetch', 'kubectl', 'terraform', 'argocd', 
      'certifications', 'deepracer', 'facts', 'skills', 'experience',
      'resume', 'contact', 'clear', 'matrix', 'sl', 'cowsay', 'sudo', 'exit'
    ];

    this.init();
  }

  init() {
    if (!this.input) return;

    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

    // Welcome banner
    this.printOutput(`
<span class="text-emerald-400 font-bold">JayeshOS Cloud Control Plane (v2.5.0-lts)</span>
Type <span class="text-cyan-400 font-semibold">'help'</span> to see available commands or <span class="text-yellow-400 font-semibold">'neofetch'</span> for system specs.
Try <span class="text-cyan-400 font-semibold">'kubectl get pods'</span>, <span class="text-cyan-400 font-semibold">'terraform plan'</span>, or <span class="text-cyan-400 font-semibold">'facts'</span>.
`, false);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const cmd = this.input.value.trim();
      if (cmd) {
        this.history.push(cmd);
        this.historyIndex = this.history.length;
        this.executeCommand(cmd);
      } else {
        this.printOutput(`<div class="flex items-center gap-2"><span class="text-emerald-400">root@jayesh-control-plane:~$</span> <span></span></div>`, false);
      }
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = this.input.value.trim().toLowerCase();
      if (current) {
        const matches = this.commands.filter(c => c.startsWith(current));
        if (matches.length === 1) {
          this.input.value = matches[0] + ' ';
        } else if (matches.length > 1) {
          this.printOutput(`<span class="text-slate-400">${matches.join('  ')}</span>`, true);
        }
      }
    }
  }

  executeCommand(rawCmd) {
    const parts = rawCmd.split(' ');
    const base = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Echo command
    this.printOutput(`<div class="flex items-center gap-2 text-slate-300"><span class="text-emerald-400 font-mono font-semibold">root@jayesh-control-plane:~$</span> <span class="text-white font-mono">${this.escapeHtml(rawCmd)}</span></div>`, false);

    switch (base) {
      case 'help':
        this.printHelp();
        break;

      case 'whoami':
        this.printOutput(`
<div class="text-slate-200 space-y-1">
  <p><span class="text-cyan-400 font-bold">Jayesh Rajput</span> — DevOps & Cloud Infrastructure Engineer</p>
  <p class="text-slate-400">${PORTFOLIO_DATA.profile.summary}</p>
  <p class="text-emerald-400">Location: ${PORTFOLIO_DATA.profile.location} | Email: ${PORTFOLIO_DATA.profile.email}</p>
</div>`);
        break;

      case 'neofetch':
        this.printNeofetch();
        break;

      case 'kubectl':
        this.handleKubectl(args);
        break;

      case 'terraform':
        this.handleTerraform(args);
        break;

      case 'argocd':
        this.handleArgoCD(args);
        break;

      case 'certifications':
      case 'certs':
        this.printCertifications();
        break;

      case 'deepracer':
        this.printDeepRacer();
        break;

      case 'facts':
      case 'fortune':
        this.printFact();
        break;

      case 'skills':
        this.printSkills();
        break;

      case 'experience':
        this.printExperience();
        break;

      case 'resume':
      case 'cat':
        if (args[0] === 'resume.yaml' || args[0] === 'resume' || !args[0]) {
          this.printResume();
        } else {
          this.printOutput(`<span class="text-rose-400">cat: ${this.escapeHtml(args[0])}: No such file or directory</span>`);
        }
        break;

      case 'contact':
        this.printOutput(`
<div class="space-y-1 text-slate-200">
  <p><span class="text-cyan-400">Email:</span> ${PORTFOLIO_DATA.profile.email}</p>
  <p><span class="text-cyan-400">Phone:</span> ${PORTFOLIO_DATA.profile.phone}</p>
  <p><span class="text-cyan-400">GitHub:</span> ${PORTFOLIO_DATA.profile.links.github}</p>
  <p><span class="text-cyan-400">LinkedIn:</span> ${PORTFOLIO_DATA.profile.links.linkedin}</p>
</div>`);
        break;

      case 'matrix':
        if (window.toggleMatrixRain) {
          window.toggleMatrixRain();
          this.printOutput(`<span class="text-emerald-400">Toggled Matrix Rain mode (Ambient Background &harr; Bright Foreground).</span>`);
        } else {
          this.printOutput(`<span class="text-emerald-400">Wake up, Neo... Follow the white rabbit.</span>`);
        }
        break;

      case 'sl':
        this.printTrain();
        break;

      case 'cowsay':
        const message = args.length > 0 ? args.join(' ') : "Automate everything with Kubernetes & Terraform!";
        this.printCowsay(message);
        break;

      case 'sudo':
        this.printOutput(`<span class="text-rose-400">root@jayesh-control-plane is already in the sudoers file. This incident will be reported to Santa Claus. 🎅</span>`);
        break;

      case 'clear':
        this.output.innerHTML = '';
        break;

      case 'exit':
      case 'quit':
        if (window.toggleTerminalModal) {
          window.toggleTerminalModal(false);
        }
        this.printOutput(`<span class="text-slate-400">Terminal session detached. Press '` + '`' + `' to reconnect.</span>`);
        break;

      default:
        this.printOutput(`<span class="text-rose-400">zsh: command not found: ${this.escapeHtml(base)}. Type <span class="text-cyan-400 font-semibold">'help'</span> for a list of commands.</span>`);
        break;
    }

    this.container.scrollTop = this.container.scrollHeight;
  }

  printHelp() {
    this.printOutput(`
<div class="text-slate-300 font-mono text-sm leading-relaxed">
  <p class="text-cyan-400 font-bold mb-2">Available DevOps Commands:</p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
    <div><span class="text-emerald-400 font-bold">whoami</span> - Executive summary & mission</div>
    <div><span class="text-emerald-400 font-bold">neofetch</span> - System specs & telemetry</div>
    <div><span class="text-emerald-400 font-bold">kubectl [get pods|nodes]</span> - Query live cluster</div>
    <div><span class="text-emerald-400 font-bold">terraform plan</span> - Run simulated IaC plan</div>
    <div><span class="text-emerald-400 font-bold">argocd app list</span> - View GitOps sync state</div>
    <div><span class="text-emerald-400 font-bold">certifications</span> - View 5 verified cloud certs</div>
    <div><span class="text-emerald-400 font-bold">deepracer</span> - Rank 1 India AWS DeepRacer stats</div>
    <div><span class="text-emerald-400 font-bold">skills</span> - Breakdown of infrastructure tools</div>
    <div><span class="text-emerald-400 font-bold">experience</span> - Work history at ZS Associates & more</div>
    <div><span class="text-emerald-400 font-bold">facts</span> - Random Linux/Networking trivia</div>
    <div><span class="text-emerald-400 font-bold">resume</span> - Display raw YAML resume</div>
    <div><span class="text-emerald-400 font-bold">contact</span> - Reach out via email/phone/socials</div>
    <div><span class="text-emerald-400 font-bold">matrix</span> - Matrix code rain toggle</div>
    <div><span class="text-emerald-400 font-bold">sl</span> - Steam locomotive ASCII animation</div>
    <div><span class="text-emerald-400 font-bold">cowsay &lt;msg&gt;</span> - Mascot advice</div>
    <div><span class="text-emerald-400 font-bold">clear</span> - Clear the terminal screen</div>
  </div>
</div>`);
  }

  printNeofetch() {
    this.printOutput(`
<div class="flex flex-col md:flex-row gap-6 font-mono text-xs md:text-sm text-slate-300">
  <pre class="text-cyan-400 select-none">
       _=====_
      / _____ \\
     +.-'_____'-.+
    /   /     \\   \\
   /   /  AWS  \\   \\
  /   /  EKS   \\   \\
 /   +---------+   \\
+-------------------+
|  [KUBERNETES 1.30] |
+-------------------+
  </pre>
  <div class="space-y-1">
    <p><span class="text-emerald-400 font-bold">jayesh@control-plane-pune-01</span></p>
    <p class="text-slate-500">------------------------------------</p>
    <p><span class="text-cyan-400 font-semibold">OS:</span> Alpine Linux 3.20 (Container Optimized)</p>
    <p><span class="text-cyan-400 font-semibold">Host:</span> Amazon EKS Multi-Tenant Production Cluster</p>
    <p><span class="text-cyan-400 font-semibold">Kernel:</span> 6.8.0-aws-ebpf (Cilium Powered)</p>
    <p><span class="text-cyan-400 font-semibold">Uptime:</span> 99.995% (Zero Unplanned Downtime)</p>
    <p><span class="text-cyan-400 font-semibold">Shell:</span> zsh 5.9 (x86_64-alpine-linux-musl)</p>
    <p><span class="text-cyan-400 font-semibold">Packages:</span> Karpenter v0.37, ArgoCD v2.11, Helm v3.15, Wiz</p>
    <p><span class="text-cyan-400 font-semibold">Autoscaler:</span> Karpenter (25% Cost Reduction over CAS)</p>
    <p><span class="text-cyan-400 font-semibold">CPU:</span> AMD EPYC 7R13 (32 Cores) @ 3.600GHz</p>
    <p><span class="text-cyan-400 font-semibold">Memory:</span> 64.2 GiB / 128.0 GiB (50.1% allocated)</p>
    <div class="flex gap-2 pt-2">
      <span class="w-4 h-3 bg-red-500 rounded-sm"></span>
      <span class="w-4 h-3 bg-green-500 rounded-sm"></span>
      <span class="w-4 h-3 bg-yellow-500 rounded-sm"></span>
      <span class="w-4 h-3 bg-blue-500 rounded-sm"></span>
      <span class="w-4 h-3 bg-purple-500 rounded-sm"></span>
      <span class="w-4 h-3 bg-cyan-500 rounded-sm"></span>
    </div>
  </div>
</div>`);
  }

  handleKubectl(args) {
    const sub = args[0] ? args[0].toLowerCase() : '';
    const target = args[1] ? args[1].toLowerCase() : '';

    if (sub === 'get' && (target === 'pods' || target === 'po')) {
      this.printOutput(`
<div class="overflow-x-auto text-xs font-mono">
  <table class="w-full text-left">
    <thead>
      <tr class="text-slate-400 border-b border-slate-800">
        <th class="py-1 pr-4">NAMESPACE</th>
        <th class="py-1 pr-4">NAME</th>
        <th class="py-1 pr-4">READY</th>
        <th class="py-1 pr-4">STATUS</th>
        <th class="py-1 pr-4">RESTARTS</th>
        <th class="py-1">AGE</th>
      </tr>
    </thead>
    <tbody class="text-slate-200">
      <tr><td class="text-purple-400 pr-4">kube-system</td><td class="pr-4">cilium-agent-7x9qk</td><td class="pr-4">1/1</td><td class="text-emerald-400 pr-4">Running</td><td class="pr-4">0</td><td>42d</td></tr>
      <tr><td class="text-purple-400 pr-4">kube-system</td><td class="pr-4">karpenter-controller-58fbb-x8l2q</td><td class="pr-4">1/1</td><td class="text-emerald-400 pr-4">Running</td><td class="pr-4">0</td><td>42d</td></tr>
      <tr><td class="text-purple-400 pr-4">external-secrets</td><td class="pr-4">external-secrets-operator-86bd9-p9z8j</td><td class="pr-4">1/1</td><td class="text-emerald-400 pr-4">Running</td><td class="pr-4">0</td><td>42d</td></tr>
      <tr><td class="text-blue-400 pr-4">argocd</td><td class="pr-4">argocd-server-794c979d6f-7c6d5</td><td class="pr-4">1/1</td><td class="text-emerald-400 pr-4">Running</td><td class="pr-4">0</td><td>42d</td></tr>
      <tr><td class="text-amber-400 pr-4">production</td><td class="pr-4">microservice-billing-v2-5c9f56477b-kj68m</td><td class="pr-4">2/2</td><td class="text-emerald-400 pr-4">Running</td><td class="pr-4">0</td><td>14d</td></tr>
      <tr><td class="text-amber-400 pr-4">production</td><td class="pr-4">microservice-auth-v3-8475865bb4-8vh6m</td><td class="pr-4">2/2</td><td class="text-emerald-400 pr-4">Running</td><td class="pr-4">0</td><td>14d</td></tr>
      <tr><td class="text-amber-400 pr-4">production</td><td class="pr-4">microservice-analytics-v1-7c959779d8-9m2ql</td><td class="pr-4">2/2</td><td class="text-emerald-400 pr-4">Running</td><td class="pr-4">0</td><td>14d</td></tr>
    </tbody>
  </table>
  <p class="text-slate-500 mt-2">Showing 7 of 54 healthy pods across 6 namespaces.</p>
</div>`);
    } else if (sub === 'get' && (target === 'nodes' || target === 'no')) {
      this.printOutput(`
<div class="overflow-x-auto text-xs font-mono">
  <table class="w-full text-left">
    <thead>
      <tr class="text-slate-400 border-b border-slate-800">
        <th class="py-1 pr-4">NAME</th>
        <th class="py-1 pr-4">STATUS</th>
        <th class="py-1 pr-4">ROLES</th>
        <th class="py-1 pr-4">AGE</th>
        <th class="py-1 pr-4">VERSION</th>
        <th class="py-1">PROVISIONER</th>
      </tr>
    </thead>
    <tbody class="text-slate-200">
      <tr><td class="pr-4">ip-10-0-12-84.ec2.internal</td><td class="text-emerald-400 pr-4">Ready</td><td class="pr-4">&lt;none&gt;</td><td class="pr-4">3d</td><td class="pr-4">v1.30.2</td><td class="text-cyan-400">karpenter.sh/default</td></tr>
      <tr><td class="pr-4">ip-10-0-14-192.ec2.internal</td><td class="text-emerald-400 pr-4">Ready</td><td class="pr-4">&lt;none&gt;</td><td class="pr-4">5d</td><td class="pr-4">v1.30.2</td><td class="text-cyan-400">karpenter.sh/spot</td></tr>
      <tr><td class="pr-4">ip-10-0-15-21.ec2.internal</td><td class="text-emerald-400 pr-4">Ready</td><td class="pr-4">control-plane</td><td class="pr-4">42d</td><td class="pr-4">v1.30.2</td><td class="text-slate-400">aws-managed-control-plane</td></tr>
    </tbody>
  </table>
</div>`);
    } else {
      this.printOutput(`<span class="text-slate-300">Usage: kubectl [get pods | get nodes | logs &lt;pod&gt;]</span>`);
    }
  }

  handleTerraform(args) {
    this.printOutput(`
<div class="font-mono text-xs text-slate-300 space-y-1">
  <p class="text-emerald-400">module.eks_cluster.aws_eks_cluster.this: Refreshing state... [id=zs-prod-eks-01]</p>
  <p class="text-emerald-400">module.karpenter.helm_release.karpenter: Refreshing state... [id=karpenter]</p>
  <p class="text-emerald-400">module.cilium.helm_release.cilium_cni: Refreshing state... [id=cilium]</p>
  <p class="text-slate-400 mt-2">------------------------------------------------------------------------</p>
  <p class="text-cyan-400 font-bold">Terraform will perform the following actions:</p>
  <p class="text-green-400">  + module.external_secrets.aws_secretsmanager_secret.db_credentials</p>
  <p class="text-green-400">  + module.eks_cluster.aws_eks_node_group.spot_workers[0]</p>
  <p class="text-green-400">  + module.observability.aws_cloudwatch_metric_alarm.high_pod_cpu</p>
  <p class="text-slate-400 mt-2">------------------------------------------------------------------------</p>
  <p class="text-yellow-400 font-bold">Plan: 3 to add, 0 to change, 0 to destroy.</p>
  <p class="text-slate-500">Note: You didn't use the -out option to save this plan, so Terraform can't guarantee to take exactly these actions.</p>
</div>`);
  }

  handleArgoCD(args) {
    this.printOutput(`
<div class="overflow-x-auto text-xs font-mono">
  <table class="w-full text-left">
    <thead>
      <tr class="text-slate-400 border-b border-slate-800">
        <th class="py-1 pr-4">NAME</th>
        <th class="py-1 pr-4">CLUSTER</th>
        <th class="py-1 pr-4">NAMESPACE</th>
        <th class="py-1 pr-4">PROJECT</th>
        <th class="py-1 pr-4">STATUS</th>
        <th class="py-1">HEALTH</th>
      </tr>
    </thead>
    <tbody class="text-slate-200">
      <tr><td class="pr-4">ecommerce-portal</td><td class="pr-4">in-cluster</td><td class="pr-4">prod</td><td class="pr-4">default</td><td class="text-emerald-400 pr-4">Synced</td><td class="text-emerald-400">Healthy</td></tr>
      <tr><td class="pr-4">payment-gateway</td><td class="pr-4">in-cluster</td><td class="pr-4">prod</td><td class="pr-4">financial</td><td class="text-emerald-400 pr-4">Synced</td><td class="text-emerald-400">Healthy</td></tr>
      <tr><td class="pr-4">data-analytics-api</td><td class="pr-4">in-cluster</td><td class="pr-4">prod</td><td class="pr-4">biopharma</td><td class="text-emerald-400 pr-4">Synced</td><td class="text-emerald-400">Healthy</td></tr>
    </tbody>
  </table>
  <p class="text-emerald-400 mt-2">✔ All 30+ standardized microservice Helm releases in continuous synchronization.</p>
</div>`);
  }

  printCertifications() {
    let html = `<div class="space-y-2 text-xs font-mono"><p class="text-cyan-400 font-bold">Verified Cloud Certifications:</p>`;
    PORTFOLIO_DATA.certifications.forEach(c => {
      html += `<div class="border-l-2 border-emerald-400 pl-2">
        <p class="text-white font-semibold">${c.name}</p>
        <p class="text-slate-400">Issuer: ${c.issuer} | Code: ${c.code} | Validity: ${c.validity}</p>
      </div>`;
    });
    html += `</div>`;
    this.printOutput(html);
  }

  printDeepRacer() {
    this.printOutput(`
<div class="text-xs font-mono text-slate-200 space-y-1">
  <pre class="text-amber-400 select-none">
       ______
      /|_||_\\'\`.__
     (   _    _ _\\
     =\`-(_)--(_)-'  [AWS DeepRacer 2023]
  </pre>
  <p class="text-amber-400 font-bold">AWS DeepRacer Student League Qualifier 2023</p>
  <p class="text-emerald-400">🏆 1st Rank in India | 2nd in Asia Pacific | 4th Globally</p>
  <p class="text-slate-400">Autonomous driving RL model trained with Proximal Policy Optimization (PPO).</p>
</div>`);
  }

  printFact() {
    const facts = PORTFOLIO_DATA.devopsFacts;
    const random = facts[Math.floor(Math.random() * facts.length)];
    this.printOutput(`
<div class="p-3 bg-slate-900/80 border border-slate-800 rounded text-xs font-mono">
  <div class="flex items-center gap-2 mb-1">
    <span class="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800">${random.category}</span>
    <span class="text-slate-500">${random.tag}</span>
  </div>
  <p class="text-slate-200">${random.fact}</p>
</div>`);
  }

  printSkills() {
    this.printOutput(`
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
  <div class="p-2 border border-slate-800 rounded bg-slate-900/50">
    <p class="text-cyan-400 font-bold mb-1">Orchestration & Containers</p>
    <p class="text-slate-300">Kubernetes (EKS), Docker, Helm, ArgoCD, Karpenter, Cilium CNI, ECS Fargate</p>
  </div>
  <div class="p-2 border border-slate-800 rounded bg-slate-900/50">
    <p class="text-cyan-400 font-bold mb-1">Cloud Platforms</p>
    <p class="text-slate-300">AWS (EKS, EC2, IAM, S3, RDS, VPC, ALB, Karpenter, Lambda), GCP (GKE, VPC), Azure</p>
  </div>
  <div class="p-2 border border-slate-800 rounded bg-slate-900/50">
    <p class="text-cyan-400 font-bold mb-1">IaC & CI/CD</p>
    <p class="text-slate-300">Terraform, TeamCity, Bitbucket Pipelines, Jenkins, SonarQube, Trivy, Let's Encrypt</p>
  </div>
  <div class="p-2 border border-slate-800 rounded bg-slate-900/50">
    <p class="text-cyan-400 font-bold mb-1">Observability & Languages</p>
    <p class="text-slate-300">Splunk, CloudWatch, Python, Flask, Boto3, Bash, Linux Kernel, SQL</p>
  </div>
</div>`);
  }

  printExperience() {
    let html = `<div class="space-y-3 text-xs font-mono">`;
    PORTFOLIO_DATA.experience.forEach(exp => {
      html += `
      <div class="border-l-2 border-cyan-500 pl-3">
        <p class="text-cyan-400 font-bold">${exp.role} @ ${exp.company}</p>
        <p class="text-slate-500">${exp.period} | ${exp.location}</p>
        <p class="text-slate-300 mt-1">${exp.highlights[0]}</p>
      </div>`;
    });
    html += `</div>`;
    this.printOutput(html);
  }

  printResume() {
    this.printOutput(`
<pre class="text-xs font-mono text-emerald-400 leading-tight">
name: "Jayesh Rajput"
role: "DevOps Engineer / Cloud Administrator"
organization: "ZS Associates"
location: "Pune, MH, India"
core_metrics:
  - eks_clusters_managed: "50+ multi-tenant apps"
  - deployment_acceleration: "Hours -> Minutes via ArgoCD/GitOps"
  - cost_optimization: "25% reduced via Karpenter"
  - certifications_count: 5
  - deepracer_standing: "1st India / 4th Global"
status: "Available for high-impact DevOps/SRE roles"
</pre>`);
  }

  printCowsay(msg) {
    const border = '-'.repeat(msg.length + 2);
    this.printOutput(`
<pre class="text-xs font-mono text-amber-300 select-none">
  +${border}+
  | ${this.escapeHtml(msg)} |
  +${border}+
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
</pre>`);
  }

  printTrain() {
    this.printOutput(`
<pre class="text-xs font-mono text-emerald-400 select-none">
  ====        ________                ___________
_D _|  ===  _|[] [] []|_              (  Choo Cho  )
 (O)====(O)   (o)-----(o)             '-..______.-'
</pre>
<p class="text-slate-400 text-xs">Sl: All aboard the automated GitOps deployment train!</p>`);
  }

  printOutput(htmlContent, isCommandEcho = false) {
    const div = document.createElement('div');
    div.className = 'mb-2 leading-relaxed';
    div.innerHTML = htmlContent;
    this.output.appendChild(div);
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
