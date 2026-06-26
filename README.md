# Teste Junior — Sistema de Cadastro de Participantes

Sistema fullstack para cadastro e gestão de participantes e times, com painel administrativo protegido por autenticação JWT. Desenvolvido como monorepo com NestJS, React e um pacote compartilhado de schemas de validação.


## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Funcionalidades](#funcionalidades)
- [Endpoints da API](#endpoints-da-api)
- [Como Rodar](#como-rodar)
  - [Com Docker (recomendado)](#com-docker-recomendado)
  - [Sem Docker](#sem-docker)
- [Decisões Técnicas](#decisões-técnicas)



## Sobre o Projeto

Sistema de gerenciamento de participantes e times com cadastro público e painel administrativo protegido. O monorepo compartilha schemas de validação Zod entre o frontend e o backend, garantindo consistência de dados em ambas as camadas sem duplicação de código.


## Tecnologias

| Camada         | Tecnologia                                      |
|----------------|-------------------------------------------------|
| Frontend       | React 19, Vite, TypeScript, Tailwind CSS v4     |
| Backend        | NestJS 11, TypeScript                           |
| Banco de Dados | PostgreSQL 16                                   |
| ORM            | Prisma 7                                        |
| Validação      | Zod (compartilhado entre frontend e backend)    |
| Autenticação   | JWT via cookie `httpOnly`                       |
| Infra          | Docker, Docker Compose, Nginx                   |
| Monorepo       | pnpm workspaces, Turborepo                      |



## Estrutura do Repositório

```
teste-junior/
├── apps/
│   ├── api/                        # Backend NestJS (porta 3333)
│   │   ├── src/
│   │   │   ├── auth/               # Módulo de autenticação (JWT + Passport)
│   │   │   ├── participants/       # Módulo de participantes (CRUD)
│   │   │   ├── teams/              # Módulo de times (CRUD)
│   │   │   ├── health/             # Health check endpoint
│   │   │   └── prisma/             # Módulo de acesso ao banco
│   │   ├── prisma/
│   │   │   ├── schema.prisma       # Modelos: Participant, Team, Adminsys
│   │   │   └── seed.ts             # Seed de dados iniciais
│   │   └── Dockerfile              # Multi-stage: deps → build → runtime
│   │
│   └── web/                        # Frontend React/Vite (porta 5173 dev / 80 prod)
│       ├── src/
│       │   ├── pages/
│       │   │   ├── public/         # Páginas públicas (cadastro)
│       │   │   └── admin/          # Login e painel administrativo
│       │   └── components/         # Componentes reutilizáveis
│       ├── nginx.conf              # Configuração do Nginx (SPA + try_files)
│       └── Dockerfile              # Multi-stage: deps → build (Vite) → runtime (Nginx)
│
├── packages/
│   └── shared/                     # Pacote interno compartilhado
│       └── src/
│           └── schemas/            # Schemas Zod validados em ambas as camadas
│
├── docker-compose.yaml             # Orquestra postgres + api + web
├── .env.example                    # Template de variáveis de ambiente
├── .env                            # Variáveis de ambiente (não versionado)
├── pnpm-workspace.yaml
└── turbo.json
```


## Funcionalidades

### Área Pública

- Cadastro de participantes com nome, CPF, e-mail, data de nascimento, telefone, time e observações
- Validação em tempo real com Zod + React Hook Form

### Painel Administrativo (`/admin`)

- Autenticação por e-mail e senha com JWT em cookie `httpOnly`
- Listagem de participantes com busca e paginação
- Gerenciamento de times: criação, edição e exclusão
- Visualização detalhada de cada participante


## Endpoints da API

### Participantes

| Método | Rota                    | Auth | Descrição                                              |
|--------|-------------------------|------|--------------------------------------------------------|
| `POST` | `/api/participants`     | Não  | Cadastra um novo participante (público)                |
| `GET`  | `/api/participants`     | JWT  | Lista participantes (`?search=`, `?page=`, `?limit=`) |
| `GET`  | `/api/participants/:id` | JWT  | Detalhes de um participante                            |

### Times

| Método   | Rota             | Auth | Descrição                         |
|----------|------------------|------|-----------------------------------|
| `GET`    | `/api/teams`     | Não  | Lista times (`?page=`, `?limit=`) |
| `POST`   | `/api/teams`     | JWT  | Cria um novo time                 |
| `PATCH`  | `/api/teams/:id` | JWT  | Atualiza dados de um time         |
| `DELETE` | `/api/teams/:id` | JWT  | Remove um time                    |

### Autenticação

| Método | Rota               | Auth | Descrição                                    |
|--------|--------------------|------|----------------------------------------------|
| `POST` | `/api/auth/login`  | Não  | Autentica e retorna JWT em cookie `httpOnly` |
| `POST` | `/api/auth/logout` | JWT  | Encerra sessão e limpa o cookie              |

### Sistema

| Método | Rota          | Descrição                                              |
|--------|---------------|--------------------------------------------------------|
| `GET`  | `/api/health` | Liveness check — monitoramento de saúde dos containers |


## Como Rodar

### Com Docker (recomendado)

**Pré-requisitos:** [Docker](https://docs.docker.com/get-docker/) e Docker Compose instalados.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd teste-junior

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env e preencha os valores reais (senhas, JWT_SECRET, etc.)

# 3. Suba todos os serviços
docker compose up --build
```

O Docker Compose sobe três serviços em ordem:

1. **database** — PostgreSQL (aguarda healthcheck antes de liberar os outros)
2. **api** — NestJS (executa `prisma migrate deploy` automaticamente ao iniciar)
3. **web** — React servido pelo Nginx na porta 5173

| Serviço  | URL                                            |
|----------|------------------------------------------------|
| Frontend | [http://localhost:5173](http://localhost:5173) |
| API      | [http://localhost:${PORT}/api](http://localhost:3331/api) |
| Health   | [http://localhost:${PORT}/api/health](http://localhost:3331/api/health) |

Para reconstruir um serviço específico sem derrubar os outros:

```bash
docker compose up --build web   # só o frontend
docker compose up --build api   # só o backend
```

Para parar e remover os containers:

```bash
docker compose down

# Para remover também o volume do banco (apaga todos os dados):
docker compose down -v
```

---

### Sem Docker

**Pré-requisitos:** [Node.js 22+](https://nodejs.org/), [pnpm 11+](https://pnpm.io/) e PostgreSQL rodando localmente.

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd teste-junior

# 2. Instale todas as dependências
pnpm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com seus valores reais

# 4. Execute as migrations no banco de dados
pnpm --filter @teste-junior/api exec prisma migrate deploy

# 5. Suba todos os serviços em modo desenvolvimento
pnpm dev
```

Ou em terminais separados para mais controle:

```bash
# Terminal 1 — Backend
pnpm --filter @teste-junior/api run dev

# Terminal 2 — Frontend (http://localhost:5173)
pnpm --filter @teste-junior/web run dev
```

> Em desenvolvimento, o frontend usa o servidor Vite com hot-reload. As chamadas à API passam diretamente pela `VITE_API_URL` definida no `.env`.


## Decisões Técnicas

### Monorepo com pnpm workspaces + Turborepo

Frontend, backend e o pacote `shared` coexistem no mesmo repositório. O Turborepo garante a ordem correta dos builds — o `shared` é compilado primeiro, depois `api` e `web` em paralelo — e aproveita cache entre execuções para evitar rebuilds desnecessários.

### Pacote `shared` com schemas Zod

Os schemas de validação vivem em `packages/shared` e são importados tanto pelo backend quanto pelo frontend. Isso cria uma única fonte de verdade: o mesmo schema que valida um campo no formulário React valida o body da requisição no NestJS, tornando impossível divergências de validação entre as duas camadas.

### JWT em cookie `httpOnly`

O token de autenticação é armazenado em um cookie `httpOnly`, inacessível via `document.cookie` ou JavaScript. Isso elimina a classe inteira de ataques XSS que roubam tokens de autenticação. O cookie é enviado automaticamente pelo navegador em cada requisição protegida.

### Docker multi-stage builds

Os Dockerfiles separam build e runtime em múltiplos estágios:

- **API:** `deps` (instala tudo) → `build` (compila TS e gera cliente Prisma) → `runtime` (apenas o necessário para rodar, sem devDependencies)
- **Web:** `deps` (instala dependências) → `build` (compila com Vite, embutindo `VITE_API_URL`) → `runtime` (Nginx com os arquivos estáticos)

O resultado são imagens enxutas sem código-fonte, devDependencies ou ferramentas de build no container final.

### Nginx para servir o frontend

Em produção, o React é uma SPA estática servida pelo Nginx. A configuração `try_files $uri $uri/ /index.html` garante que qualquer rota gerenciada pelo React Router seja redirecionada para o `index.html`, onde o roteamento client-side assume o controle — evitando erros 404 ao acessar URLs diretamente.

### Migrations automáticas na inicialização da API

O `CMD` do container da API executa `prisma migrate deploy` antes de iniciar o servidor NestJS. Isso garante que o schema do banco esteja sempre atualizado ao subir o ambiente, sem necessidade de intervenção manual.
