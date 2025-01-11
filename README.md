# Zara.ai

Zara.ai is an innovative collaborative platform that integrates real-time chat, quizzes, AI-driven code generation, and file structure exploration. Designed for developers and teams, it combines modern web technologies with cutting-edge AI to streamline communication, coding, and project management.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Zara.ai provides a seamless environment for teams to collaborate on projects with features like real-time chat,  and AI-powered code insights. The platform leverages WebSockets for instant communication, Google Gemini for AI capabilities, and WebContainers for running code directly in the browser. Zara.ai is designed to enhance productivity and foster a collaborative coding experience.

---

## Features

- **Real-Time Communication**: Collaborate in project-specific chat rooms powered by Socket.io.
- **AI-Powered Code Assistance**: Generate code snippets, summaries, and explore project file structures using Google Gemini.
- **Browser-Based Code Execution**: Run and test code directly in the browser using WebContainers.
- **Project Management**: Create, edit, and manage project rooms with ease.
- **Secure and Scalable**: Built with a robust backend, ensuring secure communication and data handling.

---

## Tech Stack

### Frontend
- **React.js**: Component-based UI development.
- **React Syntax Highlighter**: Syntax highlighting for code snippets.
- **WebContainers**: Run code directly in the browser.
- **Tailwind CSS**: Modern and responsive styling.
- **ShadCn UI** : Modern look
- **ZOD**:For validation

### Backend
- **Node.js**
- **Express.js**
- **Socket.io**
- **MongoDB**
- **Mongoose**
- **Google Gemini**
- **Redis**

---

## Architecture

Zara.ai follows a modular architecture with clear separation between frontend, backend, and AI services. It utilizes WebSockets for real-time communication and integrates Google Gemini for AI-driven insights. MongoDB serves as the database for storing user and project data, while WebContainers enable browser-based code execution.

**Workflow**:
1. Users join project-specific rooms via the frontend.
2. Messages and data are exchanged in real-time using WebSockets.
3. AI-powered features like code generation are triggered via API calls to Google Gemini.
4. Browser-based code execution is facilitated through WebContainers.

---

## Installation

### Prerequisites
- Node.js >= 18.x
- MongoDB
- Google API Key for Gemini

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zara-ai.git
   cd zara-ai

2. install dependencies
   ```bash
   npm i
   ```

3. setup up your environmental variables by creating .env file:
   ```bash
   cp .env.example .env
   ```
4. Update the .env file:
``` makefile
PORT=8080
MONGO_DB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_gemini_api_key
```
5.Start the backend server
```bash
cd backend
npm start
```
6 Start the react frontend
``` bash
cd frontend
npm start
```



