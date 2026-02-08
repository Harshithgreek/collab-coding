# Integration Guide: Collaborative Code Editor Feature

## Project Context
- **Main Project**: Your partner's frontend (deployed on GitHub Pages)
- **Your Feature**: Collaborative Code Editor (needs to be integrated)
- **Goal**: Click "Collab" button → Access your collaborative editor

---

## Recommended Approach: Feature Integration

### Architecture Overview
```
Main Project (GitHub Pages)
├── Home Page (Partner's work)
├── Other Features
└── /collab route → Your Collaborative Editor
    └── Connects to Backend Server (Render/Railway)
```

---

## Step-by-Step Integration

### Step 1: Prepare Your Feature for Integration

Your collaborative editor needs to be **router-ready** so it can be accessed via a route in their project.

**Create a wrapper component** that exports your feature:

Create `client/src/CollabEditorFeature.jsx`:
```javascript
import React from 'react';
import CollaborativeEditor from './components/CollaborativeEditor';

// Export as a feature component
export default function CollabEditorFeature() {
  return <CollaborativeEditor />;
}
```

### Step 2: Package Your Feature

You have two options:

#### Option A: Direct Integration (Recommended)
Copy your feature files directly into their project:

**Files to share with your partner:**
```
src/
├── components/
│   ├── CollaborativeEditor.jsx
│   ├── CollaborativeEditor.css
│   ├── FileExplorer.jsx
│   ├── FileExplorer.css
│   ├── FileTabs.jsx
│   ├── FileTabs.css
│   ├── RoomSelector.jsx
│   ├── RoomSelector.css
│   └── [all other component files]
└── CollabEditorFeature.jsx (wrapper)
```

**Dependencies to add to their package.json:**
```json
{
  "dependencies": {
    "socket.io-client": "^4.7.2",
    "@monaco-editor/react": "^4.6.0",
    "monaco-editor": "^0.45.0"
  }
}
```

#### Option B: Separate Deployment
Deploy your feature separately and use iframe or redirect.

---

### Step 3: Add Routing in Main Project

Your partner needs to add a route for your feature in their main project.

**If using React Router** (in their `App.jsx` or routing file):
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CollabEditorFeature from './CollabEditorFeature';
import HomePage from './HomePage'; // Their existing page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collab" element={<CollabEditorFeature />} />
        {/* Other routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

**Their "Collab" button:**
```javascript
import { Link } from 'react-router-dom';

<Link to="/collab">
  <button>Start Collaborating</button>
</Link>
```

---

### Step 4: Configure Backend Connection

Update your Socket.IO connection to work in production.

**In `CollaborativeEditor.jsx`**, find the socket connection and update:
```javascript
import { io } from 'socket.io-client';

// Use environment variable for backend URL
const SOCKET_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';
const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});
```

**Create `.env` file in their project root:**
```env
# Development
VITE_SERVER_URL=http://localhost:3000

# Production (they'll update this after backend deployment)
# VITE_SERVER_URL=https://your-backend.onrender.com
```

---

### Step 5: Deploy Backend Server

Your backend (Socket.IO server) needs to be deployed separately since GitHub Pages can't host it.

**Recommended: Render (Free Tier)**

1. **Prepare `server/` folder** with these files:
   - `server.js` (your existing server)
   - `package.json` (server dependencies)

2. **Update CORS in `server/server.js`:**
```javascript
const cors = require('cors');

// Allow requests from GitHub Pages
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://yourusername.github.io', // Update with actual GitHub Pages URL
  'https://your-custom-domain.com'  // If they have a custom domain
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

3. **Deploy to Render:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub
   - New → Web Service
   - Connect your repository
   - Settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start` or `node server.js`
     - **Environment**: Node
   - Add environment variable: `PORT=3000`

4. **Get your backend URL** (e.g., `https://collab-editor-server.onrender.com`)

5. **Update the `.env` file** in the main project:
```env
VITE_SERVER_URL=https://collab-editor-server.onrender.com
```

---

### Step 6: Test Integration Locally

Before deploying, test the integration:

1. **Run your backend:**
```bash
cd server
npm install
npm start
```

2. **In their project**, add your feature and run:
```bash
npm install socket.io-client @monaco-editor/react monaco-editor
npm run dev
```

3. **Test the flow:**
   - Navigate to home page
   - Click "Collab" button
   - Should navigate to `/collab` route
   - Your collaborative editor should load
   - Should connect to backend (check browser console)

---

### Step 7: Deploy to GitHub Pages

Once everything works locally:

1. **Build the combined project:**
```bash
npm run build
```

2. **Deploy to GitHub Pages:**
```bash
npm run deploy
```

Or if they're using GitHub Actions, push to main branch and it will auto-deploy.

---

## Alternative: Separate Deployment (If Integration is Complex)

If integrating into their codebase is too complex, deploy separately:

### Your Deployment:
- **Frontend**: Deploy to GitHub Pages or Vercel
- **Backend**: Deploy to Render

### Their Integration:
```javascript
// Simple redirect button
<a href="https://yourusername.github.io/collab-editor" target="_blank">
  <button>Start Collaborating</button>
</a>
```

Or use an iframe:
```javascript
<iframe 
  src="https://yourusername.github.io/collab-editor"
  width="100%"
  height="100vh"
  frameBorder="0"
/>
```

---

## Checklist for Integration

- [ ] Share your component files with partner
- [ ] Partner adds dependencies to their `package.json`
- [ ] Add route for `/collab` in their routing setup
- [ ] Update Socket.IO connection to use environment variable
- [ ] Deploy backend to Render
- [ ] Update `.env` with production backend URL
- [ ] Test locally with their project
- [ ] Deploy combined project to GitHub Pages
- [ ] Test production deployment

---

## Files to Share with Your Partner

Create a ZIP or share these folders:
```
collaborative-editor-feature/
├── components/
│   └── [all your component files]
├── CollabEditorFeature.jsx
├── dependencies.txt (list of npm packages needed)
└── integration-instructions.md (simplified version of this guide)
```

---

## Need Help?

Common issues:
1. **CORS errors**: Update allowed origins in backend
2. **Socket connection fails**: Check backend URL in `.env`
3. **Routing issues**: Ensure React Router is properly configured
4. **Build errors**: Make sure all dependencies are installed

Let me know which approach you'd like to take and I can help you prepare the files!
