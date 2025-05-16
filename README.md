# Suna - Plataforma de Análise de Dados

Suna é uma plataforma moderna para análise de dados, construída com React, Next.js e Firebase.

## 🚀 Tecnologias

- React
- Next.js
- TypeScript
- Firebase (Autenticação)
- Tailwind CSS
- Radix UI

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn
- Conta no Firebase

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/suna.git
cd suna
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 🌟 Funcionalidades

- Autenticação com Firebase
- Gerenciamento de perfil de usuário
- Interface moderna e responsiva
- Componentes reutilizáveis
- Temas claro/escuro

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9f54dd7a-6a0f-4b47-aaff-c6a0d2a96d23

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9f54dd7a-6a0f-4b47-aaff-c6a0d2a96d23) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9f54dd7a-6a0f-4b47-aaff-c6a0d2a96d23) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Configuração do Ambiente

Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configurações do Ambiente
VITE_APP_ENV=development
VITE_APP_NAME=SmartCont Automations Hub

# URLs da API
VITE_API_URL=http://localhost:3000
VITE_API_URL_PRODUCTION=https://api.seu-dominio.com

# Configurações de Autenticação
VITE_AUTH_CLIENT_ID=seu_client_id
VITE_AUTH_CLIENT_SECRET=seu_client_secret

# Configurações de Analytics (opcional)
VITE_GA_TRACKING_ID=seu_tracking_id
```

2. Substitua os valores conforme necessário para seu ambiente.

3. Para produção, configure estas variáveis diretamente no painel do seu serviço de hospedagem.

## Build e Deploy

O projeto suporta diferentes ambientes de build:

```bash
# Desenvolvimento
npm run build:dev

# Staging
npm run build:staging

# Produção
npm run build:prod
```

Cada ambiente de build usa suas próprias variáveis de ambiente. Certifique-se de configurar as variáveis apropriadas para cada ambiente.

### Otimizações de Build

O build de produção inclui:
- Minificação de código
- Code splitting otimizado
- Chunking de dependências
- Sourcemaps apenas em desenvolvimento
- Otimização de assets

## Deploy no Vercel

O projeto está configurado para deploy automático no Vercel. Siga os passos abaixo:

1. **Criar conta no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Crie uma conta gratuita (pode usar GitHub, GitLab ou email)

2. **Conectar com o repositório**
   - No painel do Vercel, clique em "New Project"
   - Selecione seu repositório do GitHub
   - O Vercel detectará automaticamente que é um projeto Vite

3. **Configurar variáveis de ambiente**
   - No painel do projeto no Vercel, vá em "Settings" > "Environment Variables"
   - Adicione as variáveis necessárias:
     ```
     VITE_APP_ENV=production
     VITE_API_URL_PRODUCTION=https://api.seu-dominio.com
     VITE_AUTH_CLIENT_ID=seu_client_id
     VITE_AUTH_CLIENT_SECRET=seu_client_secret
     ```

4. **Deploy automático**
   - O Vercel fará deploy automático a cada push na branch main
   - Você pode configurar branches específicas para deploy em "Settings" > "Git"

5. **Configurar domínio personalizado**
   - No painel do projeto, vá em "Settings" > "Domains"
   - Adicione seu domínio personalizado
   - Siga as instruções de DNS fornecidas pelo Vercel

### Benefícios do Vercel
- Deploy automático
- SSL gratuito
- CDN global
- Preview deployments para cada PR
- Analytics de performance
- Integração com GitHub/GitLab
