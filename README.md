# AgentWall: The Core Defense Matrix for AI

**AgentWall** is a Zero-Trust Proxy and Adversarial Machine Learning (AML) Firewall built to protect next-generation autonomous AI agents. Powered by the **Microsoft AI Stack**, AgentWall intercepts, analyzes, and neutralizes prompt injections, agentic tool-call hijacking, and mathematical evasion attacks (FGSM) in real-time before they ever reach your core LLM.

## 📝 Project Description
As enterprises move beyond simple chatbots and deploy Autonomous AI Agents with access to internal APIs, the attack surface has fundamentally shifted. Traditional regex filters are mathematically bypassed by Adversarial Machine Learning, leaving agents vulnerable to zero-day data exfiltration.

AgentWall sits between your users and your Microsoft Azure OpenAI models, passing prompts through a rigorous evaluation pipeline:
1. **High-Speed Heuristics:** Instantly drops known payload signatures and base64 overrides.
2. **Contextual Density Scoring:** RAG poisoning and syntax fuzzing detection.
3. **Azure AI Intent Analysis:** Leverages **Azure AI Content Safety Prompt Shields** to evaluate the deep semantic intent of the payload.
4. **Adversarial Machine Learning (AML) Defense:** Simulates Autoencoder reconstruction errors to catch mathematically generated FGSM noise perturbations designed to evade AI filters.

## 🛠️ Microsoft AI Stack Integration
This solution strictly leverages the Microsoft AI ecosystem, fulfilling the hackathon requirement:
- **Azure OpenAI (GPT-4o)** for deep, contextual zero-day threat analysis.
- **Azure AI Content Safety** methodologies for identifying jailbreaks.
- Designed specifically to protect Azure-hosted enterprise agents.

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- An active Azure Subscription (for production deployment)

### Dependencies
The project relies on the following key open-source libraries and frameworks:
- React (UI Framework)
- Vite (Build Tool)
- Tailwind CSS (Styling)
- Lucide React (Icons)
*(All third-party libraries used are open-source and publicly available).*

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

3. **Start the Zero-Trust Command Center:**
   ```bash
   npm run dev
   ```

4. **Access the Dashboard:**
   Open `http://localhost:3000` in your browser. (Note: The default authentication token is `admin`).

---

## 📋 Hackathon Compliance & Disclosures

### Team Members
- **Kamal Patel** - Security Architect / Full Stack Engineer

### Development Timeline & Originality
In accordance with the hackathon rules, this project was started and substantially built entirely during the official hackathon period (May 5, 2026 – June 7, 2026). No pre-existing projects or prior submissions were used. The intellectual property of the code belongs to the team.

### AI Tools Disclosure
This project was developed with the assistance of Generative AI coding tools (e.g., GitHub Copilot, Anthropic models) to accelerate boilerplate UI generation, architectural scaffolding, and complex state management. However, the core adversarial ML logic, system architecture, and strategic threat modeling represent meaningful, original human creativity, judgment, and engineering.

### Data Privacy, Storage & Security Statement
- **Data Usage:** This prototype processes zero Real-World Personally Identifiable Information (PII). Any user data processed (e.g., simulated prompts) is synthetic.
- **Storage:** All API keys and settings are stored locally and ephemerally in the browser's `localStorage`. No data is transmitted to third-party marketing or tracking servers.
- **Logs:** Real-time threat feed logs are simulated/mocked for demonstration purposes and exist solely in the browser's memory during the session.
- **Secrets Management:** We ensure no secrets, credentials, or API keys are committed to source control in this public GitHub repository.

### Code of Conduct
Our team is committed to maintaining a respectful, inclusive, and professional environment, strictly adhering to the hackathon's Code of Conduct. We ensure fair play and avoid any form of plagiarism.

---

*Built for the Microsoft Build AI Hackathon 2026.*
