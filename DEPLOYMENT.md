# 🚀 Deployment Guide

## Frontend Deploy (GitHub Pages)

### Prerequisites

- Your repository on GitHub
- Frontend files in `/frontend` folder

### Steps

1. Go to your GitHub repository settings
2. Navigate to **Settings > Pages**
3. Set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/(root)` - You'll need to move frontend files to root OR use `/frontend` and configure accordingly

**Alternative - Using `/frontend` folder:**

1. In repository root, create `.nojekyll` file (tells GitHub Pages not to process with Jekyll)
2. Configure Pages to deploy from `/frontend` folder

Your frontend will be live at: `https://<username>.github.io/<repo-name>`

---

## Backend Deploy (Vercel)

### Prerequisites

- Vercel account (free at https://vercel.com)
- GitHub connected to Vercel

### Steps

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Configure:
   - **Framework**: Node.js
   - **Root Directory**: `./backend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Set Environment Variables (optional, defaults are configured in `vercel.json`):
   - `POKEAPI_BASE_URL`: `https://pokeapi.co/api/v2`
   - `NODE_ENV`: `production`
6. Click "Deploy"

Your backend will be live at: `https://<project-name>.vercel.app`

**API will be available at:** `https://<project-name>.vercel.app/api`

---

## Connecting Frontend to Deployed Backend

1. Open `frontend/api.js`
2. Update the base URL:

```javascript
const API_BASE_URL = "https://<your-vercel-project>.vercel.app/api";
```

3. Commit and push to GitHub
4. GitHub Pages will automatically redeploy with the new backend URL

---

## Testing the Deployment

### Frontend

- Visit `https://<username>.github.io/<repo-name>`
- Verify page loads and displays the Pokemon grid

### Backend

- Visit `https://<project-name>.vercel.app/api-docs` for Swagger UI
- Test API: `https://<project-name>.vercel.app/api/pokemon?limit=5`

---

## Automatic Redeployment

**GitHub Pages**: Redeploys automatically on every push to `main`

**Vercel**: Redeploys automatically on:

- Push to main branch
- Pull request creation (preview URL)
- Manual redeploy via dashboard

---

## Notes

- Backend uses serverless functions on Vercel
- Frontend is static hosting on GitHub Pages
- Both have free tiers perfect for showcasing
- Automatic HTTPS on both platforms
- API CORS is enabled for cross-origin requests
