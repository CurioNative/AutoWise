# 🚗 Autonomous Vehicle Health Intelligence Platform - AutoWise

### Agentic AI–Driven Predictive Maintenance & Manufacturing Feedback System

> **Demo Application | EY Techathon 6.0 – Round 2 Submission**

---

## 📌 Overview

This project demonstrates an **Agentic AI–powered Vehicle Health Intelligence Platform** that shifts vehicle maintenance from a **reactive** model to a **predictive and autonomous** one.

The system continuously analyzes vehicle telematics data, predicts potential mechanical failures, automatically schedules service appointments, notifies customers, and feeds root-cause insights back to manufacturing teams for continuous quality improvement.

This repository contains a **Next.js-based demo application** showcasing the **end-to-end intelligence flow**, agent orchestration, and stakeholder dashboards.

---

## 🎯 Problem Statement

Traditional vehicle maintenance systems operate **after failures occur**, resulting in:

* Unplanned breakdowns and safety risks
* High repair costs and customer dissatisfaction
* Poor service center workload utilization
* No real-time feedback loop to manufacturing teams

There is a clear need for an **autonomous, intelligent system** that can predict failures early and act without manual intervention.

---

## 💡 Solution Summary

Our solution introduces a **Hybrid Agentic AI System** that:

* Predicts component failures using ML models
* Coordinates autonomous decisions via AI agents
* Auto-schedules service appointments
* Communicates proactively with vehicle owners
* Generates RCA/CAPA insights for manufacturers

The demo simulates this complete workflow through a **single unified web application**.

---

## 🧠 Agentic AI Architecture (Conceptual)

### Master Agent (Orchestrator)

Coordinates the complete lifecycle and assigns tasks to worker agents.

### Worker Agents

* **Data Analysis Agent** – Monitors incoming telematics data
* **Diagnosis Agent** – Predicts failure probability & severity
* **Scheduling Agent** – Auto-books optimal service slots
* **Customer Agent** – Sends alerts via chat/voice interface
* **RCA Agent** – Identifies recurring fault patterns
* **Manufacturing Insights Agent** – Generates CAPA-ready reports
* **Security Agent (UEBA)** – Monitors anomalous agent behavior

> In this demo, agent behavior is **simulated through controlled workflows** to demonstrate orchestration logic clearly.

---

## 🖥️ Demo Application Features

### 👤 Customer View

* Vehicle Health Score Dashboard
* Predicted Failure Alerts with confidence levels
* AI-generated service recommendations
* Simulated chat-based customer notifications

### 🏭 Service Center View

* Predictive service booking calendar
* Vehicle issue summary per appointment
* Load-aware scheduling visualization

### 🏗️ Manufacturing / OEM View

* Component-level failure trends
* Recurring fault heatmaps
* Root Cause Analysis (RCA) insights
* Feedback loop for design improvement

---

## 🧪 Demo Flow (Recommended for Judges)

1. Simulate incoming vehicle telemetry
2. View predicted failure on dashboard
3. Observe autonomous service scheduling
4. Show customer notification trigger
5. Display manufacturing insight analytics

⏱️ **Ideal demo duration:** 2–3 minutes

---

## 🛠️ Tech Stack

| Layer                        | Technology                            |
| ---------------------------- | ------------------------------------- |
| Frontend                     | Next.js (React)                       |
| UI Styling                   | Tailwind CSS                          |
| State Management             | React Hooks / Context                 |
| Backend (Simulated)          | API Routes (Next.js)                  |
| AI / ML (Conceptual)         | scikit-learn, pandas (offline models) |
| Agent Framework (Conceptual) | LangGraph / CrewAI                    |
| Database (Demo)              | Mock JSON / In-memory                 |
| Charts & Visualization       | Chart.js / Recharts                   |

---

## 📂 Project Structure

```
├── app/
│   ├── dashboard/
│   ├── service-center/
│   ├── manufacturing/
│   └── api/
├── components/
├── data/
│   └── sample-telematics.json
├── public/
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 18
* npm or yarn

### Installation

```bash
git clone https://github.com/your-org/vehicle-health-ai-demo.git
cd vehicle-health-ai-demo
npm install
```

### Run the Demo

```bash
npm run dev
```

Open:
👉 `http://localhost:3000`

---

## 📊 Data & Assumptions

* Telematics data is **synthetic**, inspired by public datasets
* Failure predictions are **simulated for demo purposes**
* Agent decisions are rule-driven to clearly explain logic
* Focus is on **system intelligence & workflow**, not raw accuracy

---

## 🔐 Security Considerations (Demo Scope)

* Role-based dashboard segregation
* Simulated UEBA monitoring
* No real vehicle or user data used

---

## 📈 Impact Metrics (Projected)

* 30–40% reduction in unplanned downtime
* 20–25% fewer breakdown incidents
* 15–20% improvement in customer satisfaction
* Faster manufacturing defect resolution cycles

---

## 🔮 Future Enhancements

* Real-time IoT integration
* LLM-powered conversational assistant
* EV-specific predictive models
* Fleet-level analytics
* SaaS deployment for OEMs

---

## 👥 Team

**Team Name:** *CurioNative* <br/>
**Institution:** *ST. Thomas Institute For Science & Technology, Trivandrum, Kerala*

> Built for **EY Techathon 6.0 – Round 2 Submission**

---

<div align="center">
  Created with ❤️ CurioNative<br/>
  © 2025 CurioNative. All rights reserved.
</div>


