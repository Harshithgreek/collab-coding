# Deployment Guide for Collaborative Code Editor

## Important Note About GitHub Pages

GitHub Pages is designed for **static websites only** and cannot host the Node.js backend server. You have two options:

### Option 1: Deploy Client to GitHub Pages + Backend Elsewhere (Recommended)
- Deploy the React frontend to GitHub Pages
- Deploy the Node.js backend to a service like:
  - **Render** (free tier available)
  - **Railway** (free tier available)
  - **Heroku** (paid)
  - **Vercel** (for serverless functions)

### Option 2: Deploy Everything to a Full-Stack Platform
- **Render** - Can host both frontend and backend
- **Railway** - Can host both frontend and backend
- **Vercel** - Can host both with serverless functions

---

## Option 1: GitHub Pages (Frontend) + Render (Backend)

### Step 1: Prepare the Client for GitHub Pages

1. **Update the client's Vite config** to set the base path:

Edit `client/vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/collab-coding/', // Replace with your repo name
  server: {
    port: 5173,
    host: true
  }
})
```

2. **Update the Socket.IO connection** in the client to point to your backend URL:

Edit `client/src/components/CollaborativeEditor.jsx` and find the socket connection. Update it to:
```javascript
const socket = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:3000');
```

3. **Create a `.env` file** in the client directory:
```
VITE_SERVER_URL=https://your-backend-url.onrender.com
```

### Step 2: Build the Client

```bash
cd client
npm run build
```

This creates a `dist` folder with your static files.

### Step 3: Deploy Client to GitHub Pages

1. **Install gh-pages**:
```bash
npm install -D gh-pages
```

2. **Add deploy script** to `client/package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Deploy**:
```bash
npm run deploy
```

4. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/ (root)`
   - Save

### Step 4: Deploy Backend to Render

1. **Create a `render.yaml`** in the root directory:
```yaml
services:
  - type: web
    name: collab-coding-server
    env: node
    buildCommand: npm install --workspace=server
    startCommand: npm start --workspace=server
    envVars:
      - key: PORT
        value: 3000
      - key: NODE_ENV
        value: production
```

2. **Push to GitHub** and connect to Render:
   - Go to [render.com](https://render.com)
   - Sign up/Login with GitHub
   - New → Web Service
   - Connect your repository
   - Render will auto-detect the `render.yaml`

3. **Update CORS** in `server/server.js` to allow your GitHub Pages URL:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://yourusername.github.io', 'http://localhost:5173'],
  credentials: true
}));
```

---

## Option 2: Deploy Everything to Render

This is simpler if you want everything in one place.

1. **Create `render.yaml`** in root:
```yaml
services:
  # Backend
  - type: web
    name: collab-coding-server
    env: node
    buildCommand: npm install --workspace=server
    startCommand: npm start --workspace=server
    envVars:
      - key: PORT
        value: 3000
  
  # Frontend
  - type: web
    name: collab-coding-client
    env: static
    buildCommand: npm install --workspace=client && npm run build --workspace=client
    staticPublishPath: ./client/dist
    envVars:
      - key: VITE_SERVER_URL
        value: https://collab-coding-server.onrender.com
```

2. Push to GitHub and connect to Render as described above.

---

## Quick Start Commands

### For GitHub Pages + Render:

```bash
# 1. Build and deploy client to GitHub Pages
cd client
npm install -D gh-pages
npm run deploy

# 2. Push to GitHub (backend will auto-deploy on Render)
git add .
git commit -m "Deploy to production"
git push origin main
```

### For testing locally with production build:

```bash
# Build client
npm run build --workspace=client

# Preview the build
cd client
npx vite preview

# Run server
npm start --workspace=server
```

---

## Environment Variables Summary

### Client (.env in client folder):
```
VITE_SERVER_URL=https://your-backend-url.onrender.com
```

### Server (set in Render dashboard):
```
PORT=3000
NODE_ENV=production
ALLOWED_ORIGINS=https://yourusername.github.io,https://your-custom-domain.com
```

---

## Troubleshooting

1. **CORS errors**: Make sure your server allows requests from your GitHub Pages URL
2. **404 on refresh**: GitHub Pages doesn't support client-side routing by default. Add a `404.html` that redirects to `index.html`
3. **WebSocket connection fails**: Ensure your backend URL is correct and uses HTTPS
4. **Assets not loading**: Check the `base` path in `vite.config.js` matches your repo name

---

## Next Steps

1. Choose your deployment strategy (Option 1 or 2)
2. Update configuration files as needed
3. Deploy!
4. Test the live application
5. Set up custom domain (optional)

Need help with any of these steps? Let me know!
