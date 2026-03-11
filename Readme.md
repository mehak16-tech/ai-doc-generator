# RepoDoc AI – GitHub README Generator

RepoDoc AI is an AI-powered tool that automatically generates professional **README.md files for GitHub repositories** using repository metadata and AI.

It helps developers quickly create structured documentation by simply providing a GitHub repository URL.

## Features

- Generate README from any GitHub repository
- AI-powered documentation generation
- Markdown preview of generated README
- Copy README to clipboard
- Download README.md file
- User authentication (Signup / Login)
- JWT-based protected APIs
- Save generated READMEs in database
- View previously generated README history
- Clean modern UI built with Tailwind CSS

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- React Markdown
- Axios

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt password hashing

### Database
- MongoDB Atlas
- Mongoose

### APIs
- GitHub API
- Gemini AI API

## Project Structure

RepoDoc-AI
│
├── client                 # React Frontend
│   ├── pages
│   ├── components
│   └── api
│
├── server                 # Node.js Backend
│   ├── models
│   ├── middleware
│   └── routes
│
└── README.md

## How It Works

1. User signs up or logs in.
2. User enters a GitHub repository URL.
3. Backend fetches repository data using the GitHub API.
4. AI generates a professional README using repository metadata.
5. Generated README is displayed in Markdown preview.
6. User can copy, download, or view it later in history.

## Installation

### Clone the Repository

git clone https://github.com/mehak16-tech/ai-doc-generator.git

### Backend Setup
cd server
npm install

Create .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key

Run backend server:

node server.js

### Frontend Setup

cd client
npm install
npm run dev

Frontend runs at:

http://localhost:5173

## API Endpoints

### Authentication
POST /signup
POST /login

### AI Generator

POST /generate-readme

### History

GET /history

## Screenshots

(Add screenshots after deployment)

### Login Page

![Login Screenshot](screenshots/login.png)

### Dashboard

![Dashboard Screenshot](screenshots/dashboard.png)

### Generated README Preview

![Preview Screenshot](screenshots/readme-preview.png)

---

## Future Improvements

- Custom README templates
- README editing before download
- AI suggestions for badges and project structure
- GitHub repository import directly from account
- Dark mode UI

## Deployment

Recommended deployment stack:

Frontend → Vercel  
Backend → Render  
Database → MongoDB Atlas

## Author

Developed by Mehak

## License

This project is licensed under the MIT License.
