# 🐉 Pokémon Explorer 🐉

A complete application to explore Pokémon information! Consuming the public **PokeAPI**, developed with a **Node.js + TypeScript** backend and a **Vanilla HTML/CSS/JavaScript** frontend.

## 📖 About the Project

Pokémon Explorer allows you to:

- 🔍 Search for Pokémons by **ID** or **name**
- 📋 View complete details: types, abilities, height, weight
- 📱 Responsive and modern interface
- ⚡ Fast loading without unnecessary dependencies

## 🚀 Technologies Used

### Backend

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
- ![Axios](https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)

### Frontend

- ![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Others

- ![PokeAPI](https://img.shields.io/badge/PokeAPI-2d3748?style=for-the-badge)

## 🏗️ Architecture

```
teste-backend-rech/
├── backend/
│   ├── src/
│   │   ├── app.ts                 # Express configuration
│   │   ├── controllers/           # Route controllers
│   │   ├── services/              # Business logic
│   │   ├── routes/                # Route definitions
│   │   ├── middlewares/           # Custom middlewares
│   │   └── types/                 # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── index.html                 # HTML structure
│   ├── style.css                  # CSS styles
│   ├── app.js                     # Main logic
│   └── api.js                     # API communication
└── readme.md
```

## 🔧 Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- **Git** (to clone the repository)

## 🚦 How to Run

### Backend (Node.js + TypeScript)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file (optional, uses default values):

   ```bash
   PORT=3001
   POKEAPI_BASE_URL=https://pokeapi.co/api/v2
   POKEAPI_POKEMON_ENDPOINT=/pokemon
   ```

4. Run the server:

   ```bash
   npm run dev
   ```

5. Backend will be available at: **http://localhost:3001**

### Frontend (Vanilla HTML/CSS/JS)

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Start a simple HTTP server:

   ```bash
   # Node.js http-server (runs on http://localhost:8080)
   npx http-server
   ```

3. Access in your browser based on which server you used:
   - Python: **http://localhost:8000**
   - http-server: **http://localhost:8080**

## 🧪 Testing

### Running Unit Tests

The backend includes comprehensive unit tests using **Jest** with TypeScript support.

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Run all tests:

   ```bash
   npm test
   ```

3. Run tests in watch mode (auto-rerun on file changes):

   ```bash
   npm run test:watch
   ```

4. Generate coverage report:

   ```bash
   npm run test:coverage
   ```

### Test Structure

```
backend/src/tests/
├── unit/
│   ├── services/
│   │   └── pokemon.service.test.ts      # Service layer tests
│   ├── controllers/
│   │   └── pokemon.controller.test.ts   # Controller tests
│   ├── middlewares/
│   │   └── validatePokemonParams.test.ts # Middleware validation tests
│   └── integration.test.ts              # Integration tests
└── mocks/
    ├── express.mock.ts                  # Express mocks
    └── pokemonService.mock.ts           # Service mocks
```

## 🌐 API Endpoints

### List Pokémons (paginated)

```
GET /api/pokemon?limit=20&offset=0
```

**Response:** Array with 20 Pokémons

### Search Pokémon by ID

```
GET /api/pokemon/id/{id}
```

**Example:** `GET /api/pokemon/id/25` → Returns Pikachu

### Search Pokémon by Name

```
GET /api/pokemon/name/{name}
```

**Example:** `GET /api/pokemon/name/pikachu` → Returns Pikachu

## 📊 Returned Data

Each Pokémon contains:

```json
{
  "id": 25,
  "name": "pikachu",
  "height": 4,
  "weight": 60,
  "types": [
    {
      "type": {
        "name": "electric"
      }
    }
  ],
  "abilities": [
    {
      "ability": {
        "name": "static"
      },
      "is_hidden": false
    }
  ],
  "sprites": {
    "front_default": "..."
  }
}
```

## 🎨 Features

- ✅ Search by ID and name
- ✅ Responsive Pokémon grid
- ✅ Modal with complete details
- ✅ Efficient pagination
- ✅ Error handling
- ✅ Modern interface with gradient
- ✅ No external dependencies on frontend

## 📱 Responsiveness

The application is fully responsive:

- 🖥️ Desktop: 4-6 columns
- 💻 Tablet: 3-4 columns
- 📱 Mobile: 1-2 columns

## 🔒 Security

- Rate limiting on backend (100 req/15min)
- CORS enabled
- Cache headers configured
- Parameter validation

## � Deployment

### Backend - Vercel

The backend is deployed on **Vercel** as a serverless function.

**Live URL:** [https://poke-api-test-joao-rech.vercel.app/](https://poke-api-test-joao-rech.vercel.app/)

#### Deploy Steps:

1. Install Vercel CLI (optional):

   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:

   ```bash
   vercel login
   ```

3. Deploy from backend directory:
   ```bash
   cd backend
   vercel
   ```

#### Configuration Files:

- **`backend/vercel.json`** - Vercel configuration with environment variables
- **`backend/.vercelignore`** - Files to ignore in deployment (tests, coverage)
- **`backend/api/index.ts`** - Serverless function entry point

#### Environment Variables on Vercel:

The following environment variables are configured in `vercel.json`:

```json
{
  "NODE_ENV": "production",
  "API_BASE_PATH": "/api/v1",
  "CORS_ORIGIN": "*",
  "PORT": "3000",
  "POKEAPI_BASE_URL": "https://pokeapi.co/api/v2",
  "POKEAPI_POKEMON_ENDPOINT": "/pokemon",
  "DEFAULT_LIMIT": "20",
  "MAX_LIMIT": "100",
  "REJECT_UNAUTHORIZED": "false"
}
```

### Frontend - GitHub Pages

The frontend is deployed on **GitHub Pages** with automatic deployment via GitHub Actions.

**Live URL:** [https://thejoaorech.github.io/poke-api-test-joao-rech/](https://thejoaorech.github.io/poke-api-test-joao-rech/)

#### Deploy Steps:

1. The deployment is **automatic** via GitHub Actions
2. Every push to `main` branch with changes in `frontend/` triggers a new deploy
3. The workflow file is located at `.github/workflows/deploy-frontend.yml`

#### Manual Deployment:

You can also trigger deployment manually:

1. Go to repository **Actions** tab
2. Select **"Deploy Frontend to GitHub Pages"** workflow
3. Click **"Run workflow"** button
4. Select `main` branch and confirm

#### Configuration Files:

- **`.github/workflows/deploy-frontend.yml`** - GitHub Actions workflow for automatic deployment
- **`frontend/.nojekyll`** - Tells GitHub Pages to process all files

### API Endpoints (Production):

All backend endpoints are available at the base URL:

```
https://poke-api-test-joao-rech.vercel.app/api/v1/pokemon
```

**Examples:**

- List Pokémons: `GET /api/v1/pokemon?limit=20&offset=0`
- Get by ID: `GET /api/v1/pokemon/id/25`
- Get by Name: `GET /api/v1/pokemon/name/pikachu`
- API Docs: `GET /api-docs`

## �📝 Commit Structure

Following Conventional Commits standard:

```
feat: add search by ID feature
fix: resolve Pokemon list display
docs: update README
refactor: clean unused code
```

## 👨‍💻 Author

**João Rech**

- GitHub: [@TheJoaoRech](https://github.com/TheJoaoRech)

## 📄 License

This project is under the MIT license.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) - Pokémon data
- Open source community

---
