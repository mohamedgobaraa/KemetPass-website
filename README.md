# 🏺 KemetPass - EgGolden Paws is an innovative Egyptian cultural heritage and tourism platform that combines modern web technologies with ancient Egyptian history. Experience Egypt like never before through AR experiences, hieroglyphic translation, AI-powered chatbots, and interactive historical site exploration.ptian Heritage Experience

<div align="center">

<img src="https://raw.githubusercontent.com/mohamedgobaraa/KemetPass-website/main/backend/assets/logo.png" alt="KemetPass Logo" width="300" height="300">

<!-- Animated badges -->
[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=24&duration=3000&pause=1000&color=FFD700&center=true&vCenter=true&width=600&lines=Discover+Ancient+Egypt;Experience+AR+Tourism;Learn+Hieroglyphics;Explore+Historical+Sites)](https://git.io/typing-svg)

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Flask](https://img.shields.io/badge/Flask-3.1+-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

</div>

## 🌟 Overview

KemetPass is an innovative Egyptian cultural heritage and tourism platform that combines modern web technologies with ancient Egyptian history. Experience Egypt like never before through AR experiences, hieroglyphic translation, AI-powered chatbots, and interactive historical site exploration.

<details open>
<summary><h2>🎯 Key Features</h2></summary>

### 🔮 AR Experience
- **Unity-powered WebGL**: Immersive augmented reality experiences
- **Historical Reconstruction**: Virtual tours of ancient Egyptian sites
- **Interactive Elements**: Touch and explore ancient artifacts

### 🔤 Hieroglyphic Translator
- **AI-Powered Translation**: Convert hieroglyphics to modern text
- **Machine Learning Model**: Custom Egyptian hieroglyphic classification
- **Real-time Processing**: Upload images and get instant translations

### 🤖 Intelligent Chatbot
- **Google Gemini Integration**: AI-powered cultural assistant
- **Contextual Responses**: Smart answers about Egyptian history
- **Multi-language Support**: Arabic and English interface

### 📍 Location Services
- **Where Am I**: GPS-based historical site identification
- **Who Am I**: Image recognition for historical figures and artifacts
- **Know Me**: Personalized cultural recommendations

### 🌤️ Weather Integration
- **Real-time Weather**: Current conditions for Egyptian cities
- **Travel Planning**: Weather-based tourism recommendations
- **Historical Climate**: Ancient vs. modern weather patterns

### 🗺️ Trip Planner
- **Smart Itineraries**: AI-generated travel plans
- **Historical Routes**: Follow ancient trade paths
- **Cultural Events**: Local festivals and celebrations

</details>

## 🚀 Quick Start

<details>
<summary><h3>📋 Prerequisites</h3></summary>

- **Node.js** 18+ 
- **Python** 3.9+
- **Git**
- **Modern Browser** with WebGL support

</details>

### 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/mohamedgobaraa/KemetPass-website.git
cd KemetPass-website

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
```

### 🏃‍♂️ Running the Application

<details>
<summary><b>🎨 Frontend (React + Vite)</b></summary>

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Frontend will be available at:** `http://localhost:5173`

</details>

<details>
<summary><b>🔧 Backend (Flask)</b></summary>

```bash
cd backend

# Run Flask development server
python app.py
```

**Backend API will be available at:** `http://localhost:5000`

</details>

## 🏗️ Architecture

```mermaid
graph TB
    A[React Frontend] --> B[Flask Backend]
    B --> C[SQLite Database]
    B --> D[Google Gemini AI]
    B --> E[Computer Vision Models]
    A --> F[Unity WebGL AR]
    B --> G[Image Processing]
    
    subgraph "Frontend Stack"
        A1[React 18+]
        A2[TypeScript]
        A3[Tailwind CSS]
        A4[Shadcn/ui]
        A5[i18next]
    end
    
    subgraph "Backend Stack"
        B1[Flask 3.1+]
        B2[SQLAlchemy]
        B3[TensorFlow]
        B4[OpenCV]
        B5[Google AI]
    end
```

## 📁 Project Structure

```
kemetpass/
├── 🎨 src/                      # React frontend
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Application pages
│   ├── hooks/                   # Custom React hooks
│   ├── i18n/                    # Internationalization
│   └── lib/                     # Utility functions
├── 🔧 backend/                  # Flask backend
│   ├── routes/                  # API endpoints
│   ├── models/                  # Database models & ML models
│   ├── utils/                   # Helper functions
│   └── GoldenPaws/             # Unity WebGL build
├── 📦 package.json             # Frontend dependencies
└── 🐍 requirements.txt         # Backend dependencies
```

## 🎯 API Endpoints

<details>
<summary><h3>🔐 Authentication</h3></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | User registration |
| `POST` | `/auth/login` | User login |
| `GET` | `/auth/profile` | Get user profile |
| `PUT` | `/auth/profile` | Update profile |

</details>

<details>
<summary><h3>🔤 Features</h3></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/features/translate` | Hieroglyphic translation |
| `POST` | `/features/where-am-i` | Location identification |
| `POST` | `/features/who-am-i` | Image recognition |
| `POST` | `/features/chatbot` | AI chatbot interaction |

</details>

<details>
<summary><h3>🎮 Game & AR</h3></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/game/leaderboard` | Game leaderboard |
| `POST` | `/game/score` | Submit game score |
| `GET` | `/ar/` | AR experience |

</details>

## 🛡️ Technologies Used

<div align="center">

### Frontend Stack
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

### Backend Stack
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://tensorflow.org)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org)

### AI & ML
[![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google)
[![OpenCV](https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=OpenCV&logoColor=white)](https://opencv.org)

### Game Engine
[![Unity](https://img.shields.io/badge/Unity-100000?style=for-the-badge&logo=unity&logoColor=white)](https://unity.com)

</div>

## 🤝 Contributing

We welcome contributions to KemetPass! Here's how you can help:

<details>
<summary><h3>🔧 Development Setup</h3></summary>

1. **Fork** the repository
2. **Clone** your fork
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a pull request

```bash
git checkout -b feature/amazing-feature
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature
```

</details>

<details>
<summary><h3>📋 Contribution Guidelines</h3></summary>

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

</details>

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- **Ancient Egyptian Heritage** - For inspiring this project
- **Google AI** - For Gemini API integration
- **Unity Technologies** - For WebGL AR capabilities
- **Open Source Community** - For amazing libraries and tools

---

<div align="center">

### 📞 Contact & Support

[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:eng.mohamed.gobara@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohamedgobaraa/KemetPass-website)
[![Documentation](https://img.shields.io/badge/Docs-000000?style=for-the-badge&logo=gitbook&logoColor=white)](https://github.com/mohamedgobaraa/KemetPass-website#readme)

**Made with ❤️ for Egyptian Cultural Heritage**

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=mohamedgobaraa.KemetPass-website)

</div>

<!-- Animated footer -->
<div align="center">
  <img src="https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg" alt="Snake animation" />
</div>
