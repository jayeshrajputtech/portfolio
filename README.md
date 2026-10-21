# Jayesh Rajput — DevOps & Cloud Infrastructure Portfolio Website

A static portfolio website engineered for **Jayesh Rajput**, DevOps Engineer at **ZS Associates**, showcasing cloud-native infrastructure, multi-tenant Kubernetes architecture, GitOps continuous delivery, and cloud cost optimization.

Built with a production **Control Plane / Cloud Ops** aesthetic, interactive DevOps Terminal HUD, an autonomous **Agentic AI Copilot ("KubeAgent")**, a live **Chaos Engineering & Incident Response Simulator**, and Linux/Networking easter eggs.

---

## 🚀 Key Features

### 1. 🤖 Agentic AI Copilot ("KubeAgent")
- **Multi-Step Autonomous Reasoning Pipeline**: Visualizes `Thought` ➔ `Action (Tool Call)` ➔ `Observation` ➔ `Synthesis`.
- **Pre-configured Recruiter Questions**: Instant answers with telemetry citations covering Karpenter 25% cost reduction, multi-tenant EKS architecture, Wiz security scanning, and AWS DeepRacer #1 rank.
- **Custom Question Querying**: Synthesizes custom queries dynamically using the local knowledge engine, with an optional field to plug in a live **Gemini API key** for unbounded LLM inference.

### 2. 💥 Live Incident Response & Self-Healing Chaos Simulator
- Test real production failure modes:
  - **CrashLoopBackOff**: External Secrets Operator IRSA IAM token timeout.
  - **High CPU Scaling Spike**: 20 pending pods scheduled via rapid Karpenter Spot provisioning.
  - **Wiz Security & Cilium eBPF Alert**: Unauthorized socket traffic intercepted and quarantined.
- Displays streaming `/var/log/k8s-events.log` output and allows visitors to trigger **Autonomous Remediation** to watch the cluster self-heal.

### 3. 💻 Interactive DevOps Terminal HUD
- Press **`` ` `` (backtick)** or click the **TERMINAL** button to toggle the full-screen HUD.
- Features command history (`↑` / `↓`), tab auto-completion, and custom DevOps commands:
  - `kubectl get pods -A` / `kubectl get nodes`
  - `terraform plan`
  - `argocd app list`
  - `neofetch`
  - `deepracer`
  - `certifications`
  - `facts` / `fortune`
  - `matrix`
  - `sl` / `cowsay` / `sudo`

### 4. 🎮 Linux, Cloud & Networking Easter Eggs
- **Konami Code**: Press `↑ ↑ ↓ ↓ ← → ← → B A` on your keyboard anywhere on the page to unlock **Root Access** and Matrix digital rain.
- **Linux/Networking Fact Ticker**: Rotates curated technical facts (e.g. Mike Muuss & ping, Linux `/dev/null` origin, eBPF vs iptables, BGP routing, MTU Jumbo frames).
- **Sound FX Engine**: Synthesized mechanical keystrokes and system chimes via the Web Audio API (toggleable, muted by default).
- **Interactive Cloud Architecture Topology**: Clickable nodes for AWS ALB, Ingress NGINX, Cilium eBPF, EKS Microservices, Karpenter, and External Secrets.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla ES6+ Modules, Tailwind CSS, Lucide Icons, HTML5 Canvas.
- **Zero Build Tools Required**: Pure static architecture that runs instantly in any browser.
- **Sound**: Native Web Audio API oscillator synthesis (no external audio assets).

---

## 🏃 Quick Start (Local Preview)

Run any static file server from the root of this folder:

```bash
# Option 1: Python 3
python3 -m http.server 8000

# Option 2: Node.js (npx serve)
npx serve .

# Option 3: VS Code Live Server
# Right click index.html and select "Open with Live Server"
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

---

---

## 🌐 Deployment Guides

### ⚡ Cloudflare Pages (Recommended)

#### Why your build failed with `npx @cloudflare/next-on-pages@1`:
Cloudflare Pages defaulted your project's **Framework preset** to **Next.js**, which attempted to run the Next.js adapter (`npx @cloudflare/next-on-pages@1`) and failed with an npm dependency resolution error (`ERESOLVE`). 

Because this portfolio is a **pure high-performance static website** (Vanilla HTML5, CSS3, ES6 modules), **it does not require any build step or node package manager!**

#### The Fix in Cloudflare Dashboard:
1. Log into your **Cloudflare Dashboard** ➔ **Workers & Pages**.
2. Click on your project (`jayeshrajput`).
3. Go to **Settings** ➔ **Builds & deployments**.
4. Scroll down to **Build configurations** and click **Edit configurations**.
5. Set the following values:
   - **Framework preset**: `None` *(Important: change from Next.js to None)*
   - **Build command**: *(Leave completely blank/empty — clear whatever is currently in there)*
   - **Build output directory**: `/` (or `.` or leave empty)
   - **Root directory**: `/` (or leave empty)
6. Click **Save**.
7. Navigate to the **Deployments** tab, find your latest commit (`f3fd3db Portfolio redesigned`), click the three dots (`...`), and select **Retry deployment** (or push any new commit).
8. The deployment will finish in ~5 seconds! 🚀

---

### 🌿 About the `cf-pages` branch vs `main`:

**Do you need to push to the `cf-pages` branch?**

- **If Cloudflare Pages is set to watch `main`**:
  - Notice in your build log: `HEAD is now at f3fd3db Portfolio redesigned`.
  - This indicates Cloudflare Pages is already watching and pulling from the branch where you committed the new portfolio!
  - **You do NOT need to push to `cf-pages`** if Cloudflare is already connected to `main`.
  
- **How to verify which branch is Production in Cloudflare Pages**:
  1. Go to **Settings** ➔ **Builds & deployments** ➔ **Branch control**.
  2. Check **Production branch**.
  3. If **Production branch** is set to `main` (or `master`), all pushes to `main` will automatically deploy live.
  4. If **Production branch** is currently set to `cf-pages`:
     - **Option A (Recommended)**: Change the Production branch in Cloudflare to `main`.
     - **Option B**: If you want to keep `cf-pages` as your production branch, simply merge your latest code from `main` into `cf-pages`:
       ```bash
       git checkout cf-pages
       git merge main
       git push origin cf-pages
       ```
     - Once updated, Cloudflare Pages will auto-deploy the latest code.

---

### GitHub Pages
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** ➔ **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your portfolio will be live at `https://<your-username>.github.io/portfolio/`.

### Vercel / Netlify
- Drag and drop this folder directly into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) with framework preset set to **"Other" / "Static HTML"** (zero build command).

---

## 📄 Profile Reference

- **Name**: Jayesh Rajput
- **Current Role**: DevOps Engineer / Cloud Administrator at ZS Associates (Pune, MH)
- **Email**: contact.jayeshrajput@gmail.com
- **Phone**: +91 8104059695
- **Certifications**: AWS Certified Solutions Architect, GCP Professional Cloud Architect, GCP Associate Cloud Engineer, AWS Cloud Practitioner, Azure Fundamentals.
- **DeepRacer**: 1st in India | 2nd in APAC | 4th Globally (AWS DeepRacer Student League 2023).
