// Live Chaos Engineering & Incident Response Simulator
// Allows recruiters to trigger real Kubernetes incidents and watch autonomous remediation

export class ChaosSimulator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeIncident = null;
    this.isRemediating = false;

    this.incidents = {
      crashloop: {
        id: "crashloop",
        title: "CrashLoopBackOff: External Secrets Sync Failure",
        target: "payment-service-v3",
        namespace: "production",
        severity: "CRITICAL",
        description: "Payment microservice failing to start. External Secrets Operator failed to retrieve DB credentials from AWS Secrets Manager due to IRSA IAM role token expiry.",
        logs: [
          "[ERROR] 01:14:02.102 payment-service-v3: Unable to connect to postgresql-prod.rds.aws:5432",
          "[FATAL] 01:14:02.103 payment-service-v3: EnvVar DB_PASSWORD missing or empty string",
          "[WARN]  01:14:02.210 external-secrets-controller: SecretStore/aws-secretsmanager sync failed: AccessDeniedException: sts:AssumeRoleWithWebIdentity",
          "[FAIL]  01:14:02.340 kubelet: Container payment-service-v3 failed liveness probe, restarting...",
          "[STATE] 01:14:02.345 kubelet: Back-off 40s restarting failed container=payment-service-v3 pod=payment-service-v3-8475865bb4-8vh6m"
        ],
        remediationAction: "Renew IRSA IAM Role & Force ESO Resync",
        remediationSteps: [
          "Verifying AWS Secrets Manager IAM trust policy with OIDC provider...",
          "Refreshing ServiceAccount token via External Secrets Operator...",
          "Kubernetes Secret 'payment-db-secret' synced successfully from AWS Secrets Manager.",
          "Performing rolling rollout restart: deployment/payment-service-v3...",
          "Pod payment-service-v3-8475865bb4-9w4km passed liveness & readiness probes (200 OK)."
        ]
      },
      karpenter_spike: {
        id: "karpenter_spike",
        title: "High CPU Spike: 20 Pods Pending (Insufficient Capacity)",
        target: "order-processor-hpa",
        namespace: "production",
        severity: "WARNING",
        description: "Simulated traffic spike from flash sale. CPU utilization reached 96%. Horizontal Pod Autoscaler requested 20 additional replicas, exceeding node group capacity.",
        logs: [
          "[WARN]  01:14:15.012 hpa-controller: order-processor-hpa target metric cpu at 96% (target 70%)",
          "[INFO]  01:14:15.050 hpa-controller: Scaling up deployment order-processor from 4 to 20 replicas",
          "[ERROR] 01:14:15.110 default-scheduler: 0/3 nodes available: 3 Insufficient cpu, 16 pods pending",
          "[INFO]  01:14:15.120 karpenter: Found 16 unschedulable pods with constraints: arch=amd64, capacity-type=spot",
          "[INFO]  01:14:15.140 karpenter: Simulating binpacking: selecting 1x c6i.4xlarge (Spot - 72% discount)"
        ],
        remediationAction: "Trigger Karpenter Rapid Spot Node Provisioning",
        remediationSteps: [
          "Karpenter calling EC2 Fleet API directly (bypassing slow ASG lifecycle hooks)...",
          "Instance i-087263b65ef3c4 (c6i.4xlarge Spot) launched in us-east-1a in 38 seconds.",
          "Node joined EKS cluster, kubelet registered, Cilium CNI allocated pod IP pool.",
          "All 16 pending pods scheduled and transitioned to 'Running' in parallel.",
          "Cluster CPU load re-balanced to 44%. Cost optimization sustained at 25%."
        ]
      },
      wiz_security: {
        id: "wiz_security",
        title: "Wiz & Cilium Alert: Unauthorized Egress & Privilege Escalation Attempt",
        target: "untrusted-addon-worker",
        namespace: "staging",
        severity: "HIGH",
        description: "Wiz runtime sensor and Cilium eBPF detected an unauthorized raw socket connection to an external IP outside the allowed egress CIDR.",
        logs: [
          "[ALERT] 01:14:30.400 wiz-runtime-sensor: Process 'sh' attempting unauthorized outbound TCP connect to 198.51.100.24:4444",
          "[SEC]   01:14:30.410 cilium-ebpf-monitor: Policy violation: egress traffic blocked by default-deny L3 rule",
          "[WARN]  01:14:30.412 cilium-agent: Dropped 14 SYN packets from pod untrusted-addon-worker-578d8-kj2",
          "[AUDIT] 01:14:30.450 splunk-forwarder: Ingested high-severity security event into SOC index",
          "[INFO]  01:14:30.500 security-agent: Recommended immediate pod quarantine and network isolation"
        ],
        remediationAction: "Enforce Cilium Network Quarantine & Drain Pod",
        remediationSteps: [
          "Applying strict CiliumNetworkPolicy: label-selector match 'quarantine=true' with zero egress...",
          "Terminating compromised container PID and capturing memory dump for RCA...",
          "Triggering Wiz remediation pipeline to flag base image in AWS ECR registry...",
          "Incident ticket auto-logged in Splunk with full eBPF packet capture.",
          "Zero data leakage confirmed. Cluster security posture restored."
        ]
      }
    };

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl backdrop-blur-xl">
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2">
              <span class="p-1 rounded bg-rose-950 text-rose-400 border border-rose-800 text-xs font-mono">CHAOS OPS</span>
              <h3 class="text-base md:text-lg font-bold text-white">Live Production Incident & Self-Healing Simulator</h3>
            </div>
            <p class="text-xs text-slate-400 mt-1">Test Jayesh's automated GitOps, Karpenter, and Cilium eBPF remediation workflows</p>
          </div>

          <!-- Overall Cluster Status Pill -->
          <div id="chaos-cluster-badge" class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-mono">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span id="chaos-cluster-status">STATUS: ALL 54 PODS HEALTHY</span>
          </div>
        </div>

        <!-- Incident Selector Buttons -->
        <div class="py-4">
          <p class="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">Trigger Simulated Infrastructure Incident:</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button class="chaos-trigger-btn p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-rose-900/40 hover:border-rose-500 text-left transition-all group" data-incident="crashloop">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-rose-400 group-hover:text-rose-300">💥 CrashLoopBackOff</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-900">CRITICAL</span>
              </div>
              <p class="text-[11px] text-slate-400 line-clamp-2">External Secrets Operator & AWS Secrets Manager sync mismatch</p>
            </button>

            <button class="chaos-trigger-btn p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-amber-900/40 hover:border-amber-500 text-left transition-all group" data-incident="karpenter_spike">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-amber-400 group-hover:text-amber-300">⚡ High CPU Spike</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-900">SCALING</span>
              </div>
              <p class="text-[11px] text-slate-400 line-clamp-2">Flash traffic spike: 20 pending pods require rapid Karpenter spot scaling</p>
            </button>

            <button class="chaos-trigger-btn p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-blue-900/40 hover:border-blue-500 text-left transition-all group" data-incident="wiz_security">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-blue-400 group-hover:text-blue-300">🛡️ Wiz & eBPF Alert</span>
                <span class="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-900">SECURITY</span>
              </div>
              <p class="text-[11px] text-slate-400 line-clamp-2">Cilium eBPF intercepts unauthorized egress socket communication</p>
            </button>
          </div>
        </div>

        <!-- Incident Display & Log Stream -->
        <div id="chaos-incident-view" class="p-4 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-3">
          <div class="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-slate-500"></span>
              <span>LIVE CLUSTER TELEMETRY & LOG STREAM (/var/log/k8s-events.log)</span>
            </span>
            <span id="chaos-timestamp" class="text-[11px] text-slate-500">READY</span>
          </div>

          <div id="chaos-log-console" class="h-40 overflow-y-auto space-y-1.5 text-slate-400 leading-relaxed font-mono">
            <p class="text-slate-500 italic">// Select any incident above to simulate real production failure modes.</p>
            <p class="text-emerald-400/80">system-health: 0 alerts active. CoreDNS latency: 1.2ms. Cilium eBPF maps: synchronized.</p>
          </div>

          <!-- Remediation Action Bar (shown when incident is active) -->
          <div id="chaos-action-panel" class="hidden pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span class="text-rose-400 font-bold" id="chaos-action-title">Incident Active</span>
            </div>
            <button id="chaos-remediate-btn" class="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span id="chaos-remediate-label">Execute Autonomous Remediation</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const triggerButtons = this.container.querySelectorAll('.chaos-trigger-btn');
    const remediateBtn = document.getElementById('chaos-remediate-btn');

    triggerButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const incidentKey = btn.getAttribute('data-incident');
        this.triggerIncident(incidentKey);
      });
    });

    if (remediateBtn) {
      remediateBtn.addEventListener('click', () => {
        this.executeRemediation();
      });
    }
  }

  async triggerIncident(key) {
    if (this.isRemediating) return;

    const incident = this.incidents[key];
    if (!incident) return;

    this.activeIncident = incident;

    const badge = document.getElementById('chaos-cluster-badge');
    const badgeStatus = document.getElementById('chaos-cluster-status');
    const logConsole = document.getElementById('chaos-log-console');
    const actionPanel = document.getElementById('chaos-action-panel');
    const remediateLabel = document.getElementById('chaos-remediate-label');
    const timestamp = document.getElementById('chaos-timestamp');

    // Update Status Badge to Alert State
    if (badge && badgeStatus) {
      badge.className = "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-950/90 border border-rose-800 text-rose-300 text-xs font-mono animate-bounce";
      badgeStatus.textContent = `ALERT: ${incident.title.split(':')[0].toUpperCase()}`;
    }

    if (actionPanel) actionPanel.classList.remove('hidden');
    if (remediateLabel) remediateLabel.textContent = incident.remediationAction;
    if (timestamp) timestamp.textContent = new Date().toLocaleTimeString();

    // Stream Incident Logs
    logConsole.innerHTML = '';
    for (const log of incident.logs) {
      const line = document.createElement('p');
      if (log.includes('[ERROR]') || log.includes('[FAIL]') || log.includes('[FATAL]')) {
        line.className = 'text-rose-400 font-semibold';
      } else if (log.includes('[WARN]') || log.includes('[ALERT]')) {
        line.className = 'text-amber-400';
      } else {
        line.className = 'text-slate-300';
      }
      line.textContent = log;
      logConsole.appendChild(line);
      logConsole.scrollTop = logConsole.scrollHeight;
      await this.sleep(180);
    }
  }

  async executeRemediation() {
    if (!this.activeIncident || this.isRemediating) return;
    this.isRemediating = true;

    const remediateBtn = document.getElementById('chaos-remediate-btn');
    const logConsole = document.getElementById('chaos-log-console');
    const badge = document.getElementById('chaos-cluster-badge');
    const badgeStatus = document.getElementById('chaos-cluster-status');
    const actionPanel = document.getElementById('chaos-action-panel');

    if (remediateBtn) {
      remediateBtn.disabled = true;
      remediateBtn.innerHTML = `
        <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>Remediating Cluster...</span>
      `;
    }

    // Append separator
    const sep = document.createElement('div');
    sep.className = 'my-2 border-t border-slate-700/80';
    logConsole.appendChild(sep);

    // Stream Remediation steps
    for (const step of this.activeIncident.remediationSteps) {
      await this.sleep(450);
      const line = document.createElement('p');
      line.className = 'text-emerald-400 flex items-center gap-2';
      line.innerHTML = `<span class="text-cyan-400">⚡</span> <span>${step}</span>`;
      logConsole.appendChild(line);
      logConsole.scrollTop = logConsole.scrollHeight;
    }

    await this.sleep(600);

    // Restore Healthy State
    if (badge && badgeStatus) {
      badge.className = "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs font-mono";
      badgeStatus.textContent = "STATUS: RESOLVED & 100% HEALTHY";
    }

    const finalSuccess = document.createElement('p');
    finalSuccess.className = 'text-emerald-300 font-bold mt-2 bg-emerald-950/50 p-2 rounded border border-emerald-800';
    finalSuccess.textContent = `✔ INCIDENT RESOLVED: Cluster restored. Zero data loss. 99.995% uptime SLA preserved.`;
    logConsole.appendChild(finalSuccess);
    logConsole.scrollTop = logConsole.scrollHeight;

    if (actionPanel) {
      setTimeout(() => {
        actionPanel.classList.add('hidden');
        if (remediateBtn) {
          remediateBtn.disabled = false;
        }
        this.isRemediating = false;
        this.activeIncident = null;
      }, 2500);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
