# 🚀 Meu Arsenal

Centralize e organize seus **prompts**, **templates**, **snippets de código**, **ferramentas** e **checklists** em um único lugar. Focado em **velocidade**, **busca rápida** e **copiar em 1 clique**.

![Meu Arsenal](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2d3748?style=flat-square&logo=prisma)

## ✨ Funcionalidades

- 🔐 **Autenticação** - Login seguro com sessão persistente
- 📚 **CRUD Completo** - Criar, editar, visualizar e excluir itens
- 🔍 **Busca Global** - Pesquise por título, conteúdo ou tags
- 🏷️ **Filtros** - Por tipo, categoria e stack
- 📋 **Copiar em 1 Clique** - Com contador de uso
- ⭐ **Favoritos** - Acesso rápido aos itens mais usados
- 🌙 **Tema Escuro** - Interface minimalista estilo dev tool
- 🐳 **Docker Ready** - Pronto para deploy em VPS

## 🛠️ Stack

| Tecnologia | Uso |
|------------|-----|
| **Next.js 14** | App Router, Server Components |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS** | Estilização |
| **Prisma** | ORM |
| **SQLite** | Banco de dados (dev) |
| **PostgreSQL** | Banco de dados (prod) |
| **NextAuth.js** | Autenticação |
| **Docker** | Containerização |

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Criar banco de dados e executar migrations
npx prisma migrate dev

# 4. (Opcional) Popular com dados de exemplo
npm run db:seed

# 5. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Credenciais Padrão

```
Email: admin@arsenal.dev
Senha: Arsenal@2024
```

## 📁 Estrutura do Projeto

```
arsenal/
├── app/
│   ├── (app)/              # Rotas autenticadas
│   │   ├── dashboard/      # Dashboard principal
│   │   └── items/          # CRUD de itens
│   ├── api/                # API Routes
│   │   ├── auth/           # NextAuth
│   │   └── items/          # CRUD API
│   ├── login/              # Página de login
│   ├── layout.tsx          # Layout raiz
│   └── page.tsx            # Redirect
├── components/             # Componentes React
├── lib/                    # Utilitários e configs
├── prisma/                 # Schema e migrations
├── Dockerfile              # Build de produção
└── docker-compose.yml      # Orquestração
```

## 🐳 Docker

### Desenvolvimento Local (SQLite)

```bash
docker-compose up -d
```

### Produção (PostgreSQL)

```bash
# Configurar variáveis de ambiente
export NEXTAUTH_URL="https://seu-dominio.com"
export NEXTAUTH_SECRET="gere-uma-chave-secreta"
export POSTGRES_PASSWORD="senha-segura"

# Subir containers
docker-compose -f docker-compose.prod.yml up -d
```

## 📝 Tipos de Item

| Tipo | Descrição | Emoji |
|------|-----------|-------|
| **Prompt** | Prompts para IA | 💬 |
| **Template** | Templates reutilizáveis | 📄 |
| **Snippet** | Trechos de código | 💻 |
| **Tool** | Links e notas de ferramentas | 🔧 |
| **Checklist** | Processos e checklists | ✅ |

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar produção
npm run lint         # Verificar linting
npm run db:generate  # Gerar Prisma Client
npm run db:migrate   # Executar migrations
npm run db:seed      # Popular banco com exemplos
npm run db:studio    # Abrir Prisma Studio
```

## 🔒 Variáveis de Ambiente

```env
# Banco de dados
DATABASE_URL="file:./dev.db"              # SQLite
# DATABASE_URL="postgresql://..."          # PostgreSQL

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta"

# Admin padrão
ADMIN_EMAIL="admin@arsenal.dev"
ADMIN_PASSWORD="Arsenal@2024"
```

## 🚀 Deploy em VPS

1. Clone o repositório na VPS
2. Configure as variáveis de ambiente
3. Execute com Docker Compose:

```bash
docker-compose -f docker-compose.prod.yml up -d --build
```

4. Configure um reverse proxy (Nginx/Caddy) para HTTPS

## 📄 Licença

MIT © 2024

---

Feito com ⚡ para desenvolvedores
