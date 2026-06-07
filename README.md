<div align="center">
  <h1>🛡️ AgentWall: Zero-Trust Defense Matrix for Autonomous AI</h1>
  <p><strong>Enterprise-grade proxy and Adversarial Machine Learning (AML) firewall built to protect next-generation autonomous AI agents and LLMs.</strong></p>
  
  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /></a>
    <a href="https://azure.microsoft.com/"><img src="https://img.shields.io/badge/Azure_AI-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white" alt="Azure AI" /></a>
    <a href="https://openai.com/"><img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" /></a>
  </p>
  
  ![AgentWall Security Dashboard UI](./public/docs/dashboard.png)
</div>

---

## 🚨 The Challenge: The Autonomous Agent Attack Surface

As enterprises evolve from deploying simple conversational chatbots to **Autonomous AI Agents** equipped with tool-calling capabilities, API integrations, and internal database access, the attack surface has fundamentally shifted. Traditional defenses rely on static regex and keyword filtering, which are easily bypassed by modern adversarial techniques:

- **Mathematical Evasion (FGSM):** Attackers calculate noise perturbations that humans cannot perceive but force LLMs into unsafe states.
- **Agentic Tool-Call Hijacking:** Malicious payloads designed to trick the agent into executing unintended backend functions (e.g., `execute_tool("delete_db")`).
- **RAG Poisoning & Syntax Fuzzing:** Embedding high-density special characters or encoded payloads (Base64) to break prompt formatting.
- **Data Exfiltration:** Tricking the agent into revealing internal system prompts, API keys, or honeypot triggers.

## 🛡️ The Solution: AgentWall

**AgentWall** acts as a secure proxy layer sitting seamlessly between your users and your core LLM infrastructure (e.g., Azure OpenAI). It rigorously evaluates inbound prompts against a **4-Layer Core Defense Matrix**, instantly neutralizing prompt injections, evasions, and hijacking attempts *before* they consume expensive LLM compute or compromise your internal systems.

### 🧠 Complex System Design & Architecture

Our architecture guarantees minimal latency overhead by utilizing a waterfall approach. 90% of attacks are dropped instantly by lightweight edge heuristics, reserving deep compute AI evaluation only for sophisticated, evasive threats.

![AgentWall Architecture Diagram](./public/docs/architecture.png)

<br/>

```mermaid
graph TD
    Client((User / API Client)) --> |Inbound Prompt| Proxy[AgentWall Proxy]
    
    subgraph Core Defense Matrix
        Proxy --> L1[Layer 1: High-Speed Heuristics]
        L1 -->|Safe| L2[Layer 2: Contextual Analysis]
        L2 -->|Safe| L3[Layer 3: Deep Intent Analysis]
        L3 -->|Safe| L4[Layer 4: AML & Autoencoder Defense]
    end
    
    L1 -.->|Critical Threat| Block[Threat Neutralized]
    L2 -.->|Medium Threat| Block
    L3 -.->|Sophisticated Threat| Block
    L4 -.->|Mathematical Evasion| Block
    
    L4 -->|Passed All Layers| LLM[(Azure OpenAI / GPT-4o)]
    LLM -->|Clean Execution| Output[Safe Response]
    
    Block --> Logger[Real-time Security Dashboard & Logs]
```

### 🔐 The 4-Layer Core Defense Matrix

AgentWall's proprietary `SecurityEngine` breaks down threats through four rigorous validation stages:

#### Layer 1: Ultra-Fast Heuristics & Payload Decoders
The frontline defense designed for sub-millisecond execution.
- **Base64 & Obfuscation Decoding:** Unpacks encoded payloads (e.g., `SWdub3JlIHByZXZpb3Vz`) to evaluate the underlying text.
- **Direct System Overrides:** Instantly drops hardcoded jailbreaks ("ignore previous instructions", "act as a hacker").
- **Active Deception (Honeypots):** If a prompt attempts to exfiltrate credentials, Layer 1 automatically injects fake tracking tokens (e.g., `sk-honeypot-TR4CK1NG-KEY`) to trace the attacker without compromising real data.

#### Layer 2: Contextual Structure Analysis
Detects syntactical anomalies and fuzzing attacks.
- **Density Scoring:** Calculates the ratio of special characters and delimiters typical in RAG (Retrieval-Augmented Generation) poisoning or markdown exploitation. Prompts with abnormal structure are quarantined.

#### Layer 3: Azure AI Intent Analysis
Leverages **Azure AI Content Safety Prompt Shields** and specialized LLM evaluators to analyze the semantic intent.
- Evaluates if the prompt contains subtle manipulation, social engineering, or attempts to bypass ethical guardrails.
- Utilizes zero-temperature, strict JSON enforcement via GPT-4o to objectively score threat vectors.

#### Layer 4: Adversarial Machine Learning (AML) Defense
Protects against sophisticated, mathematically derived vulnerabilities.
- **Agentic Tool-Call Hijacking Prevention:** Scans for attempts to force the LLM to output specific function calls (e.g., `call_api`, `system()`).
- **FGSM Perturbation Detection:** Simulates Autoencoder reconstruction errors. High volumes of non-printable or perturbed characters designed to mathematically evade AI filters are caught here based on strict tolerance thresholds.

---

## 💻 Tech Stack & Dependencies

Built to complement and enhance the **Microsoft AI Ecosystem**, the technical stack comprises:

### Core Frameworks & Libraries
- **Next.js (v16.2.6) & React (v19.2.4):** Powering the Zero-Trust Command Center dashboard frontend and serving APIs using Next.js routes.
- **TypeScript (v5.x):** Used for strict type definitions across the Security Proxy Engine and UI components to minimize run-time exceptions.
- **Tailwind CSS & Lucide React:** Serving clean, reactive, dark-theme styling and modular icon configurations for the security operator HUD.
- **Recharts (v3.8.1):** Used to visualize prompt scanning telemetry, block rate performance, and live event monitoring streams.
- **OpenAI Node SDK (v6.39.1):** Interfacing with Azure OpenAI (GPT-4o) model endpoints to perform Layer 3 deep intent evaluations.

### Microsoft Integrations
- **Azure OpenAI (GPT-4o):** Serves as both the protected core model and the semantic classifier for Layer 3 security checks.
- **Azure AI Content Safety Principles:** Used to structure and score intent vectors for multi-turn jailbreaks and credential exfiltration defenses.

---

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Active Azure Subscription (for Layer 3 API Integration)

### Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/agentwall.git
   cd agentwall
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment variables:**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_azure_openai_key
   ```

4. **Start the Zero-Trust Command Center:**
   ```bash
   npm run dev
   ```

5. **Access the Dashboard:**
   Open `http://localhost:3000` in your browser. (Note: The default authentication token is `admin`).

---

## 📋 Hackathon Compliance & Disclosures

### Team Members & Roles
- **Kamal Patel** - *Security Architect & Lead Full-Stack Engineer*
  - Architected the 4-layer Waterfall Defense Matrix and developed the core Security Proxy Engine logic.
  - Implemented the Next.js telemetry APIs, interactive security sandbox simulation HUD, and threat graph dashboards.
- **Abhinav Kulkarni** - *Backend & Testing Engineer*
  - Constructed the backend simulation interfaces, managed environment endpoints, and benchmarked layer-specific evaluation latencies.
  - Authored the verification tests validating that Layer 1 & 2 edge mechanisms achieve their targeted sub-millisecond execution times.
- **Akanksha E Arundekar** - *Testing & Agent Integration Specialist*
  - Curated and integrated synthetic adversarial prompt libraries, verifying defense coverage against FGSM perturbations and tool injection templates.
  - Audited agent integrations to ensure proxy schema compatibility with third-party LLM tool orchestrators.

### Development Timeline & Originality
In accordance with the hackathon rules, this project was started and built entirely during the official hackathon period (May 5, 2026 – June 7, 2026). No pre-existing templates or prior submissions were utilized. All application security logic, simulated Autoencoder heuristics, and front-end HUD configurations represent original intellectual property of the team.

### AI Tools Disclosure
This project was developed with the assistance of generative AI coding assistants (e.g., Anthropic Claude models, GitHub Copilot) to accelerate boilerplate UI rendering, Tailwind structural configurations, and documentation drafting. All core security code blocks, AML logic parameters, and system waterfall pathways were architected, reviewed, and finalized by the human development team.

### Data Privacy, Storage & Security Statement
- **Data Usage:** This prototype processes zero Real-World Personally Identifiable Information (PII). Any user data processed (e.g., simulated prompts) is synthetic.
- **Storage:** All API keys and settings are stored locally and ephemerally in the browser's `localStorage` and server memory. No data is transmitted to third-party tracking servers.
- **Logs:** Real-time threat feed logs are simulated/mocked for demonstration purposes and exist solely in the browser's memory during the session.
- **Secrets Management:** We ensure no secrets, credentials, or API keys are committed to source control in this public GitHub repository.

### Code of Conduct
Our team is committed to maintaining a respectful, inclusive, and professional environment, strictly adhering to the hackathon's Code of Conduct. We ensure fair play and avoid any form of plagiarism.


---

<div align="center">
  <i>Built for the Microsoft Build AI Hackathon 2026.</i>
</div>
