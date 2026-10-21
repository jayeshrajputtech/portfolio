// Jayesh Rajput - Portfolio Data & Knowledge Base

export const PORTFOLIO_DATA = {
  profile: {
    name: "Jayesh Rajput",
    title: "DevOps & Cloud Infrastructure Engineer",
    tagline: "Architecting resilient multi-tenant Kubernetes clusters, automated GitOps pipelines, and cost-efficient cloud systems.",
    email: "contact.jayeshrajput@gmail.com",
    phone: "+91 8104059695",
    location: "Pune, Maharashtra, India",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      hashnode: "https://hashnode.com"
    },
    status: {
      clusterHealth: "100% HEALTHY",
      activePods: 54,
      gitOpsSync: "SYNCED (HEAD)",
      uptime: "99.995%",
      costOptimization: "25% Reduced via Karpenter"
    },
    summary: "Dynamic and results-driven DevOps Engineer with a strong focus on automation, Cloud Infrastructure Management, and Continuous Integration & Delivery (CI/CD) practices. Proven track record architecting multi-tenant EKS clusters for 50+ applications, slashing deployment times from hours to minutes with GitOps (ArgoCD/Helm), and achieving 25% cost reduction using Karpenter autoscaling."
  },

  experience: [
    {
      id: "zs-associates",
      role: "DevOps Engineer / Cloud Administrator",
      company: "ZS Associates",
      location: "Pune, MH",
      period: "February 2025 – Present",
      current: true,
      badge: "Current Role",
      highlights: [
        "Architected and implemented multi-tenant EKS clusters for 50+ applications by developing reusable Terraform modules automating the provisioning of all required AWS resources.",
        "Designed comprehensive CI/CD pipelines for EKS deployments using Bitbucket, TeamCity, ArgoCD, and Helm, reducing deployment time from hours to minutes.",
        "Built automated ECS Fargate deployment pipeline leveraging Bitbucket, AWS CodePipeline, ECR for container registry, and ECS for container orchestration with automated scaling.",
        "Established GitOps workflows with ArgoCD for automated Kubernetes application deployment across development, staging, and production environments.",
        "Created standardized Helm charts for 30+ microservices with automated manifest templating and versioning.",
        "Implemented secure secrets management on EKS by integrating AWS Secrets Manager with Kubernetes via External Secrets Operator, enabling seamless sync to Kubernetes Secrets and environment variables with zero security incidents.",
        "Enhanced EKS cluster security and networking by implementing Cilium for fine-grained network policies and pod-level IP management, ensuring controlled traffic flow and improved observability.",
        "Implemented NGINX Ingress Controller on EKS to manage HTTP/HTTPS routing via Kubernetes Ingress resources, enabling path-based and host-based routing with a single load balancer for efficient service exposure.",
        "Implemented Karpenter on EKS to replace Cluster Autoscaler, enabling faster and more cost-efficient node provisioning based on real-time pod requirements, improving scaling performance for dynamic workloads and reducing cloud compute costs by 25%.",
        "Optimized EKS storage and networking stack by configuring AWS EFS and EBS CSI Drivers for shared and dedicated persistent storage, while managing CoreDNS and Kube-Proxy to ensure reliable service discovery, internal routing, and load balancing across the cluster.",
        "Integrated Wiz security scanning across both EKS and ECS pipelines for automated vulnerability assessment and security compliance.",
        "Troubleshot and resolved complex Kubernetes issues including pod failures, networking problems, and resource optimization using kubectl and deep log analysis.",
        "Configured CloudWatch monitoring and alerting for ECS infrastructure with Splunk integration for application-level observability."
      ],
      stack: ["AWS EKS", "Terraform", "ArgoCD", "Karpenter", "Cilium CNI", "Helm", "External Secrets", "TeamCity", "Wiz Security", "Splunk", "AWS ECS Fargate"]
    },
    {
      id: "iqvia",
      role: "Tech Analyst",
      company: "IQVIA",
      location: "Pune, MH",
      period: "July 2024 – January 2025",
      current: false,
      badge: "Enterprise Data & Cloud",
      highlights: [
        "Supported enterprise Data Warehouse operations for emerging biopharma clients, delivering end-to-end ETL, MDM, and data operations workflows.",
        "Built and maintained automated ETL pipelines in Apache Airflow, improving workflow reliability and simplifying orchestration.",
        "Managed and executed daily/weekly/monthly ETL loads with strict SLAs, ensuring high data accuracy, completeness, and integrity.",
        "Leveraged AWS services for scalable data engineering workflows, including EC2, Lambda, S3, Redshift, and SQS/SNS.",
        "Monitored ETL workflows, performed RCAs (Root Cause Analyses) on failures, and resolved discrepancies to ensure uninterrupted data delivery.",
        "Optimized data transformation processes to reduce load times and improve pipeline efficiency."
      ],
      stack: ["Apache Airflow", "AWS Redshift", "AWS Lambda", "S3", "SQS/SNS", "Python", "SQL", "ETL/MDM"]
    },
    {
      id: "ignite-solutions",
      role: "DevOps Intern",
      company: "Ignite Solutions",
      location: "Remote",
      period: "January 2024 – June 2024",
      current: false,
      badge: "Internship",
      highlights: [
        "Advocated and implemented Blue/Green Deployment Strategy that reduced application deployment time from minutes to seconds.",
        "Deployed a monolithic Django backend application on AWS Lambda using Docker and Zappa.",
        "Configured Apache web server as a reverse proxy to serve user requests with SSL/TLS termination.",
        "Containerized applications using Docker by following container security and caching best practices."
      ],
      stack: ["Docker", "AWS Lambda", "Zappa", "Django", "Apache", "Blue/Green Deployment", "Python"]
    }
  ],

  projects: [
    {
      id: "gitops-devsecops-jenkins",
      title: "GitOps DevSecOps CI/CD with Jenkins & ArgoCD",
      period: "July 2024",
      description: "Production-grade automated CI/CD pipeline unifying GitOps synchronization with deep security scanning (SAST + Container vulnerability scanning).",
      metrics: "Zero-vulnerability deployment gate with automated Slack alerts",
      highlights: [
        "Configured Jenkins to automate build, test, and container packaging, enhancing code quality and eliminating manual operations.",
        "Managed Kubernetes continuous delivery with ArgoCD, ensuring absolute drift detection and sync between Git repositories and live clusters.",
        "Integrated SonarQube for static code analysis and Trivy for container image vulnerability scanning to catch CVEs pre-production.",
        "Secured Jenkins and SonarQube instances with NGINX reverse proxy and auto-renewing Let's Encrypt SSL/TLS certificates.",
        "Integrated real-time Slack webhooks for instant build, scan, and deployment failure notifications."
      ],
      stack: ["Jenkins", "ArgoCD", "Kubernetes", "Trivy", "SonarQube", "Docker", "NGINX", "Let's Encrypt", "Slack Webhooks"]
    },
    {
      id: "devsecops-java-cicd",
      title: "DevSecOps CI/CD for Java Web Application Deployment",
      period: "May 2024 – June 2024",
      description: "End-to-end automated deployment pipeline with enterprise artifact management and Kubernetes Role-Based Access Control (RBAC).",
      metrics: "Automated binary publishing and fine-grained K8s RBAC",
      highlights: [
        "Built comprehensive DevSecOps pipeline for Java web application compiling, testing, and container deployment.",
        "Orchestrated AWS infrastructure hosting Jenkins, SonarQube, and Sonatype Nexus repository manager in Docker containers.",
        "Configured Nexus artifact repository for Maven builds and container image registry.",
        "Created and secured Kubernetes Service Accounts, ClusterRoles, and RoleBindings for least-privilege deployment tokens."
      ],
      stack: ["Java/Maven", "Jenkins", "Nexus", "SonarQube", "Docker", "AWS", "Kubernetes RBAC"]
    },
    {
      id: "microservices-aws-architecture",
      title: "Microservices Architecture & Serverless CI/CD on AWS",
      period: "October 2023 – November 2023",
      description: "Deconstructed legacy monolith into decoupled microservices orchestrated via Application Load Balancer target routing and container autoscaling.",
      metrics: "High availability architecture with sub-minute deployment cycle",
      highlights: [
        "Split monolith into containerized microservices version-controlled and pushed to AWS Elastic Container Registry (ECR).",
        "Set up modular Git repositories for service source code alongside declarative infrastructure definitions.",
        "Engineered serverless container cluster providing on-demand elasticity and cost minimization.",
        "Configured AWS Application Load Balancer with path-based routing rules across multiple decoupled Target Groups."
      ],
      stack: ["AWS ECS", "ECR", "ALB", "Target Groups", "Docker", "Microservices", "CloudFormation/Terraform"]
    },
    {
      id: "ieee-publication",
      title: "Automated Table Detection Using R-CNN: A Cloud-Based Approach",
      period: "Published at IEEE PuneCon 2023",
      description: "Research paper on computer vision deep learning models (R-CNN and MobileNetV2) deployed on cloud infrastructure for high-accuracy document parsing.",
      metrics: "Published in IEEE Xplore digital library",
      highlights: [
        "Designed and trained region-based convolutional neural networks (R-CNN) combined with lightweight MobileNetV2 for table detection.",
        "Architected scalable cloud deployment pipeline to handle concurrent image inference requests with optimal compute utilization.",
        "Presented findings at the IEEE PuneCon 2023 International Conference."
      ],
      stack: ["Deep Learning", "R-CNN", "MobileNetV2", "Cloud Inference", "Python", "Computer Vision", "IEEE Xplore"]
    }
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate (SAA-C03)",
      issuer: "Amazon Web Services",
      validity: "Oct 2024 – Oct 2027",
      badgeColor: "from-amber-500 to-orange-600",
      code: "SAA-C03",
      skills: ["Multi-tier HA Architecture", "EKS & VPC Networking", "Cost Optimization", "Security & IAM"]
    },
    {
      name: "Google Cloud Certified Professional Cloud Architect",
      issuer: "Google Cloud",
      validity: "July 2024 – July 2026",
      badgeColor: "from-blue-500 to-indigo-600",
      code: "GCP-PCA",
      skills: ["Enterprise Cloud Architecture", "GKE & Hybrid Cloud", "IAM & Compliance", "Disaster Recovery"]
    },
    {
      name: "Google Cloud Certified Associate Cloud Engineer",
      issuer: "Google Cloud",
      validity: "May 2024 – May 2027",
      badgeColor: "from-sky-400 to-blue-600",
      code: "GCP-ACE",
      skills: ["GCP Compute Engine", "VPC & Cloud DNS", "IAM & Cloud Storage", "Cloud Monitoring"]
    },
    {
      name: "AWS Certified Cloud Practitioner (CLF-C01)",
      issuer: "Amazon Web Services",
      validity: "Oct 2022 – Oct 2027",
      badgeColor: "from-yellow-500 to-amber-600",
      code: "CLF-C01",
      skills: ["Cloud Concepts", "AWS Core Services", "Security & Shared Responsibility", "Billing & Pricing"]
    },
    {
      name: "Azure Fundamentals (AZ-900)",
      issuer: "Microsoft Azure",
      validity: "August 2022 (Lifetime)",
      badgeColor: "from-cyan-500 to-blue-500",
      code: "AZ-900",
      skills: ["Azure Cloud Concepts", "Azure Core Services", "Governance & Privacy"]
    }
  ],

  achievements: [
    {
      title: "Rank 1 in India | Rank 4 Globally | 2nd in APAC",
      subtitle: "AWS DeepRacer Student League Qualifier 2023",
      category: "Reinforcement Learning & Autonomous Vehicles",
      details: "Trained reinforcement learning models using Proximal Policy Optimization (PPO), optimizing reward functions and hyper-parameters to rank #1 nationally and #4 worldwide among thousands of competitors.",
      badge: "Global Finalist",
      icon: "trophy"
    },
    {
      title: "Bertelsmann Next Generation Tech Booster Scholarship 2024",
      subtitle: "Udacity Enterprise Security Track Nanodegree Program",
      category: "Cloud Security & Governance",
      details: "Selected among 5,000 global applicants for a fully sponsored nanodegree focusing on enterprise zero-trust architectures, infrastructure hardening, and automated DevSecOps compliance.",
      badge: "Top Global Winner",
      icon: "award"
    },
    {
      title: "First Runner-Up in Nirmaan Competition",
      subtitle: "Organized by Google Developer Student Club (GDSC) MIT AOE",
      category: "Product & UI/UX Design",
      details: "Engineered and prototyped an intuitive student finance mobile application UI using Figma, presenting the live product architecture and UX to industry judges.",
      badge: "Runner-Up",
      icon: "star"
    }
  ],

  education: {
    institution: "MIT Academy of Engineering, Pune",
    degree: "B.Tech in Electronics & Telecommunication (ECE)",
    minor: "Minor in Cloud Computing",
    cgpa: "8.71 / 10",
    period: "August 2020 – July 2024",
    roles: [
      "Third Year & Final Year Class Representative at MIT AOE Student Council",
      "Active Member of Student Association of the School of Electronics and Telecommunication"
    ]
  },

  skills: {
    containerAndOrchestration: [
      { name: "Kubernetes (EKS)", level: 95, icon: "k8s" },
      { name: "Docker", level: 95, icon: "docker" },
      { name: "ArgoCD (GitOps)", level: 92, icon: "argocd" },
      { name: "Helm Charts", level: 90, icon: "helm" },
      { name: "Karpenter Autoscaler", level: 94, icon: "karpenter" },
      { name: "Cilium CNI & eBPF", level: 88, icon: "cilium" },
      { name: "AWS ECS Fargate", level: 90, icon: "ecs" }
    ],
    infrastructureAsCode: [
      { name: "Terraform", level: 94, icon: "terraform" },
      { name: "CloudFormation", level: 82, icon: "cloudformation" },
      { name: "External Secrets Operator", level: 92, icon: "secrets" },
      { name: "NGINX Ingress Controller", level: 90, icon: "nginx" }
    ],
    ciCdAndDevSecOps: [
      { name: "TeamCity", level: 88, icon: "teamcity" },
      { name: "Bitbucket Pipelines", level: 90, icon: "bitbucket" },
      { name: "Jenkins", level: 90, icon: "jenkins" },
      { name: "Wiz Security", level: 86, icon: "wiz" },
      { name: "Trivy & SonarQube", level: 88, icon: "trivy" }
    ],
    cloudPlatforms: [
      { name: "AWS (EKS, EC2, IAM, S3, RDS, VPC, ALB, Karpenter, Lambda)", level: 96, icon: "aws" },
      { name: "Google Cloud Platform (GKE, VPC, IAM, Compute)", level: 88, icon: "gcp" },
      { name: "Microsoft Azure (Fundamentals)", level: 78, icon: "azure" }
    ],
    observabilityAndLinux: [
      { name: "Linux System Administration", level: 95, icon: "linux" },
      { name: "Splunk", level: 86, icon: "splunk" },
      { name: "AWS CloudWatch", level: 90, icon: "cloudwatch" },
      { name: "CoreDNS & Kube-Proxy", level: 88, icon: "dns" },
      { name: "Python / Boto3 / Flask", level: 90, icon: "python" },
      { name: "Bash & Shell Scripting", level: 95, icon: "bash" }
    ]
  },

  devopsFacts: [
    {
      category: "Networking",
      fact: "The ping command was written in 1983 by Mike Muuss, named after the sound sonar makes. He wrote it in an evening to diagnose abnormal network behavior.",
      tag: "RFC / History"
    },
    {
      category: "Linux Kernel",
      fact: "In Linux, /dev/null was invented in 1973 by Dennis Ritchie for Unix Version 4. Any byte sent into it disappears into the void, returning EOF immediately.",
      tag: "Kernel Internals"
    },
    {
      category: "Cloud / AWS",
      fact: "Karpenter launches right-sized EC2 instances directly to the EC2 Fleet API in 40–60 seconds, bypassing ASG (Auto Scaling Group) controller delays that took 4–7 minutes.",
      tag: "Karpenter Autoscaling"
    },
    {
      category: "Kubernetes",
      fact: "Kubernetes is named after the Greek word for 'helmsman' or 'pilot'. The abbreviation 'K8s' is a numeronym: the '8' represents the eight letters between 'K' and 's'.",
      tag: "K8s Trivia"
    },
    {
      category: "Networking",
      fact: "Traceroute works differently across OSes: Linux defaults to sending UDP packets to high ports (>33434), while Windows 'tracert' sends ICMP Echo Request packets.",
      tag: "Protocol Analysis"
    },
    {
      category: "Linux Kernel",
      fact: "In Linux, PID 1 is the 'init' or 'systemd' process. If PID 1 dies or exits without handling signals, the Linux kernel instantly panics and reboots the entire machine.",
      tag: "Operating Systems"
    },
    {
      category: "Security",
      fact: "Cilium uses eBPF (Extended Berkeley Packet Filter) to bypass iptables inside the Linux kernel, allowing O(1) packet filtering instead of O(N) sequential iptables rule traversal.",
      tag: "eBPF / Cilium"
    },
    {
      category: "Cloud",
      fact: "AWS Simple Storage Service (S3) was launched on March 14, 2006 (Pi Day). It was AWS's first publicly available cloud storage service.",
      tag: "AWS History"
    },
    {
      category: "Operating Systems",
      fact: "The famous fork bomb ':(){ :|:& };:' creates a bash function called ':' that pipes into itself in the background recursively until the process table is exhausted.",
      tag: "Linux Shell"
    },
    {
      category: "Networking",
      fact: "Port 443 was chosen for HTTPS by Kipp E. Hickman in 1994 while working at Netscape, simply requesting it from Jon Postel (the RFC editor and IANA administrator).",
      tag: "Network RFC"
    },
    {
      category: "GitOps",
      fact: "GitOps was coined by Alexis Richardson (CEO of Weaveworks) in 2017. The core philosophy: Git is the single source of truth for declared infrastructure and application state.",
      tag: "GitOps History"
    },
    {
      category: "Kubernetes",
      fact: "An emptyDir volume in Kubernetes is stored in the node's local filesystem (often /var/lib/kubelet). If you configure it with 'medium: Memory', it mounts a tmpfs (RAM disk)!",
      tag: "Storage Internals"
    },
    {
      category: "Networking",
      fact: "The default MTU (Maximum Transmission Unit) for standard Ethernet is 1500 bytes. In AWS VPCs, Jumbo Frames allow up to 9001 bytes to drastically reduce CPU packet overhead.",
      tag: "Network Performance"
    },
    {
      category: "Linux",
      fact: "The '/proc' directory in Linux does not consume any disk space! It is a pseudo-filesystem generated on the fly by the Linux kernel to expose system and process states.",
      tag: "VFS Architecture"
    },
    {
      category: "Cloud Security",
      fact: "The External Secrets Operator syncs secrets from AWS Secrets Manager into native Kubernetes Secrets, so developers never embed plaintext credentials in Helm values or Git.",
      tag: "DevSecOps"
    }
  ],

  agentScenarios: [
    {
      triggers: ["who are you", "who is jayesh", "about jayesh", "intro", "summary"],
      thought: "Recruiter asking for an executive overview of Jayesh Rajput's background and core value proposition.",
      toolCall: "get_profile_summary()",
      observation: "Loaded: Jayesh Rajput, DevOps Engineer at ZS Associates. Multi-tenant EKS, 25% cost optimization with Karpenter, GitOps, AWS/GCP dual certified architect.",
      response: `**Jayesh Rajput** is a Cloud & DevOps Engineer currently working at **ZS Associates** in Pune. 

He specializes in:
- **Kubernetes Architecture:** Multi-tenant EKS for 50+ enterprise applications.
- **GitOps & CI/CD:** Sub-minute automated pipelines using ArgoCD, Helm, TeamCity, and Bitbucket.
- **Cloud Cost Optimization:** Reduced EKS node costs by **25%** by migrating from Cluster Autoscaler to **Karpenter**.
- **DevSecOps:** Hardened environments with **Cilium eBPF**, External Secrets Operator, and **Wiz** vulnerability scanning.
- **Dual Cloud Certified:** AWS Certified Solutions Architect Associate + Google Cloud Certified Professional Cloud Architect.`
    },
    {
      triggers: ["karpenter", "cost reduction", "cost optimization", "savings", "cluster autoscaler"],
      thought: "User inquiring about Karpenter implementation and how Jayesh achieved 25% cost reduction at ZS Associates.",
      toolCall: "inspect_cluster_metric(metric='karpenter_cost_savings')",
      observation: "Found: Replaced Cluster Autoscaler on AWS EKS with Karpenter. Real-time pod bin-packing, spot instance orchestration, dynamic node termination.",
      response: `At **ZS Associates**, Jayesh spearheaded the transition from the legacy **Kubernetes Cluster Autoscaler** to **Karpenter** on Amazon EKS:

1. **Direct Fleet Provisioning:** Karpenter bypasses AWS Auto Scaling Groups (ASG) and communicates directly with the EC2 Fleet API, provisioning customized instances in ~45 seconds vs. 4-7 minutes.
2. **Consolidation & Bin-Packing:** When workloads scale down, Karpenter automatically consolidates remaining pods onto fewer, cheaper compute instances or terminates empty nodes immediately.
3. **Spot Instance Diversification:** Seamlessly leverages Spot instances for fault-tolerant microservices without interrupting stateful storage (EBS/EFS CSI).
4. **Measurable ROI:** Resulted in a verified **25% reduction in AWS compute expenditure** across multi-tenant clusters hosting 50+ apps.`
    },
    {
      triggers: ["certifications", "certs", "aws certified", "gcp certified", "solutions architect"],
      thought: "Recruiter checking verified cloud certifications and credentials.",
      toolCall: "query_certifications_registry()",
      observation: "5 active certifications: AWS Solutions Architect, GCP Professional Cloud Architect, GCP Associate, AWS Cloud Practitioner, Azure Fundamentals.",
      response: `Jayesh holds **5 industry-recognized cloud certifications**:

- 🏆 **AWS Certified Solutions Architect – Associate (SAA-C03)** *(Valid: Oct 2024 – Oct 2027)*
- 🌐 **Google Cloud Certified Professional Cloud Architect** *(Valid: July 2024 – July 2026)*
- ☁️ **Google Cloud Certified Associate Cloud Engineer** *(Valid: May 2024 – May 2027)*
- 📦 **AWS Certified Cloud Practitioner (CLF-C01)** *(Valid: Oct 2022 – Oct 2027)*
- 🔷 **Microsoft Certified: Azure Fundamentals (AZ-900)** *(Lifetime)*

This demonstrates rare tri-cloud breadth with specialized depth in **AWS** and **GCP** architecture.`
    },
    {
      triggers: ["deepracer", "aws deepracer", "machine learning", "ai", "rank"],
      thought: "User curious about the AWS DeepRacer achievement and AI/ML background.",
      toolCall: "fetch_deepracer_telemetry()",
      observation: "Querying AWS DeepRacer Student League 2023 Qualifier. Result: Rank 1 in India, Rank 2 in Asia-Pacific, Rank 4 Globally.",
      response: `Jayesh achieved **1st Rank in India, 2nd in Asia Pacific, and 4th Globally** in the **AWS DeepRacer Student League Qualifier 2023**!

🏎️ **How he did it:**
- Formulated custom reward functions in Python utilizing **Reinforcement Learning** with **Proximal Policy Optimization (PPO)**.
- Analyzed track waypoints, steering angle convergence, and throttle distributions to maximize lap velocity without spin-outs.
- Outperformed thousands of international student developers.

He also co-authored an IEEE-published research paper on deep learning computer vision: *"Automated Table Detection Using R-CNN: A Cloud-Based Approach"* at IEEE PuneCon 2023.`
    },
    {
      triggers: ["security", "devsecops", "cilium", "wiz", "secrets"],
      thought: "Assessing DevSecOps and Kubernetes security practices implemented by Jayesh.",
      toolCall: "audit_security_controls()",
      observation: "Active controls: External Secrets Operator (AWS Secrets Manager), Cilium L3/L4/L7 Network Policies, Wiz automated pipeline scans, Trivy & SonarQube gates.",
      response: `Jayesh takes security seriously at every layer of the infrastructure:

- **Zero-Secret Hardcoding:** Built seamless sync from **AWS Secrets Manager** to Kubernetes Secrets using the **External Secrets Operator** (ESO), ensuring zero credential leaks in git repos.
- **Micro-Segmentation with Cilium:** Enforced fine-grained pod-level network isolation and egress traffic lockdown via Cilium eBPF network policies.
- **Pipeline Vulnerability Scanning:** Integrated **Wiz** across EKS & ECS pipelines for continuous posture compliance, and **Trivy** + **SonarQube** in Jenkins for pre-commit static code analysis.
- **Bertelsmann Tech Booster Scholar:** Selected into the exclusive Udacity Enterprise Security Nanodegree Program.`
    },
    {
      triggers: ["hire", "recruiter", "why hire", "fit", "interview"],
      thought: "Recruiter asking why Jayesh Rajput is an outstanding candidate for Cloud/DevOps roles.",
      toolCall: "evaluate_candidate_fit()",
      observation: "Cross-referencing production track record, speed of execution, cost discipline, and self-driven innovation.",
      response: `Here is why **Jayesh Rajput** is an exceptional hire for high-growth engineering teams:

1. **Production-Hardened Scale:** He actively manages multi-tenant clusters running 50+ apps with high availability and automated GitOps.
2. **Business & Cost Awareness:** He doesn't just build infrastructure; he cuts cloud bills (e.g. 25% compute savings via Karpenter) while accelerating deployment speed from hours to minutes.
3. **DevSecOps by Default:** Deep security mindset spanning eBPF networking, Wiz scans, and zero-trust secrets management.
4. **Competitive Drive:** Proven by his #1 India / #4 Global standing in AWS DeepRacer and IEEE published research.`
    }
  ]
};
