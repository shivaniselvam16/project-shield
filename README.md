🛡️ Project Shield – AI-Powered Security Dashboard
📌 Project Overview

Project Shield is a full-stack AI-powered cybersecurity monitoring system that detects, analyzes, and visualizes suspicious activities such as failed login attempts, port scans, and unusual system behavior in real time.

The system uses a Node.js backend, MongoDB Atlas database, and a web-based dashboard frontend deployed on cloud platforms.

🎯 Objective

    To build a centralized security monitoring dashboard that:

    Collects and stores security logs
    
    Detects suspicious activities using AI/ML logic
    
    Visualizes threats in real time
    
    Helps in understanding cyber attack patterns

🧠 Key Features
     🔐 User Authentication (Register/Login)
     🧾 Security Log Management
     ⚠️ Attack Detection Module (AI-based simulation)
     📊 Real-time Dashboard with Charts
     ☁️ Cloud     Deployment (Render + Vercel)
     🗄️ MongoDB Atlas Integration

    System Architecture

     Frontend (Vercel)
      ↓
     Backend API (Render - Node.js/Express)
      ↓
     MongoDB Atlas (Database)
      ↓
     AI/ML Module (Python - anomaly detection simulation)

   ⚙️ Tech Stack
     Frontend:
      HTML, CSS, JavaScript
      Chart.js
     Backend:
      Node.js
      Express.js
      JWT Authentication
      bcrypt.js
     Database:
      MongoDB Atlas
     AI/ML:
      Python
      Scikit-learn (concept/model)
      Pickle model (.pkl)
     Deployment:
      Render (Backend)
      Vercel (Frontend)

📁 Project Structure

project-shield/
 ├── backend/
 │    ├── server.js
 │    ├── models/
 │    ├── ml/
 │         ├── ml_service.py
 │         ├── train.py
 │         └── shield_model.pkl
 │
 ├── frontend/
 │    ├── index.html
 │    ├── dashboard.js
 │
 ├── README.md
 ├── .gitignore


 🚀 API Endpoints
 Authentication
  POST /register → Register user
  POST /login → Login user
 Logs
  GET /logs → Fetch logs
  POST /logs → Add log
 Detection
  POST /detect → AI-based threat detection


 📊 Dashboard Features
   Total Logs count
   Suspicious activity detection
   Pie chart visualization
   Live log feed
   Status indicator (SAFE / ATTACK)

 Deployment Links
 🌐 Frontend (Vercel): https://project-shield-kappa.vercel.app/
 ⚙️ Backend (Render): https://project-shield-1-tmre.onrender.com

HOW TO RUN LOCALLY
# Clone repo
git clone https://github.com/shivaniselvam16/project-shield.git

# Backend setup
cd backend
npm install
node server.js

# Frontend
open index.html

 🔐 Security Features
   Password hashing using bcrypt
   JWT-based authentication
   Input validation
   Basic threat simulation logic
 📌 Future Improvements
   Real-time WebSocket alerts
   Advanced ML-based anomaly detection
   Role-based access control (Admin/User)
   SIEM integration
   Live intrusion detection system
 👨‍💻 Author
   Shivani
   CFSS Global Internship 2026
 🏁 Conclusion
 Project Shield demonstrates a complete full-stack cybersecurity monitoring system integrating backend APIs, AI-based detection logic, and real-time visualization dashboard.