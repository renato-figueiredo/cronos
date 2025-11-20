# Cronos

Cronos is a comprehensive project management and time tracking system designed to help freelancers and businesses organize their work efficiently.

## 🚀 Features

### Current Features
- **Backend Architecture**: Built with Node.js, Express, and TypeScript.
- **Database**: PostgreSQL with Prisma ORM.
- **Containerization**: Docker and Docker Compose support.

### Roadmap
- [ ] **Authentication**: Secure login using JWE and future Google OAuth integration.
- [ ] **Project Management**: Create and manage multiple projects.
- [ ] **Task Tracking**: Detailed task management with priority and status.
- [ ] **Time Tracking**: Built-in timer (Play/Pause) for precise work logging (ideal for PJ/Freelancers).
- [ ] **AI Integration**: Future assistance for task organization and insights.

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **DevOps**: Docker, Docker Compose

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose

### Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/cronos.git
    cd cronos
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    cp .env.example .env
    # Edit .env with your database credentials if needed
    ```

3.  **Run with Docker (Recommended)**
    ```bash
    docker-compose up --build
    ```

4.  **Run Locally (Alternative)**
    ```bash
    npm install
    npx prisma migrate dev
    npm run dev
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
