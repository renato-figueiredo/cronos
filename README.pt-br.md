# Cronos

Cronos é um sistema completo de gerenciamento de projetos e rastreamento de tempo, projetado para ajudar freelancers e empresas a organizar seu trabalho de forma eficiente.

## 🚀 Funcionalidades

### Funcionalidades Atuais
- **Arquitetura Backend**: Construído com Node.js, Express e TypeScript.
- **Banco de Dados**: PostgreSQL com Prisma ORM.
- **Containerização**: Suporte a Docker e Docker Compose.
- **Documentação**: API documentada com Swagger.

### Roadmap (Próximos Passos)
- [ ] **Autenticação**: Login seguro usando JWE e futura integração com Google OAuth.
- [ ] **Gerenciamento de Projetos**: Criar e gerenciar múltiplos projetos.
- [ ] **Rastreamento de Tarefas**: Gerenciamento detalhado de tarefas com prioridade e status.
- [ ] **Rastreamento de Tempo**: Cronômetro integrado (Play/Pause) para registro preciso de trabalho (ideal para PJ/Freelancers).
- [ ] **Integração com IA**: Futura assistência para organização de tarefas e insights.

## 🛠️ Tecnologias

- **Runtime**: Node.js
- **Linguagem**: TypeScript
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **DevOps**: Docker, Docker Compose

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (v18+)
- Docker & Docker Compose

### Começando

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/seuusuario/cronos.git
    cd cronos
    ```

2.  **Configurar Backend**
    ```bash
    cd backend
    cp .env.example .env
    # Edite o arquivo .env com suas credenciais de banco se necessário
    ```

3.  **Rodar com Docker (Recomendado)**
    ```bash
    docker-compose up --build
    ```

4.  **Rodar Localmente (Alternativa)**
    ```bash
    npm install
    npx prisma migrate dev
    npm run dev
    ```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

1.  Faça um Fork do projeto
2.  Crie sua branch de feature (`git checkout -b feature/MinhaFeatureIncrivel`)
3.  Faça o Commit de suas mudanças (`git commit -m 'Adiciona alguma Feature Incrível'`)
4.  Faça o Push para a branch (`git push origin feature/MinhaFeatureIncrivel`)
5.  Abra um Pull Request
