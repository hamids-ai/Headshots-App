# Deployment Guide - Professional Headshot AI App

## Overview
This guide will help you deploy your application so you can test it online:
- **Frontend (React)** → Vercel
- **Backend (Express)** → Render

---

## Part 1: Deploy Backend to Render (Free Tier)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (recommended for easy deployment)

### Step 2: Deploy Backend
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `hamids-ai/Headshots-App`
3. Configure the service:
   ```
   Name: headshots-backend
   Region: Choose closest to you
   Branch: claude/headshot-ai-spec-01SdRT6zdhXzmhHrGKx5Fq8J
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. Select **Free** plan

5. **Add Environment Variables** (click "Advanced"):
   ```
   NODE_ENV=production
   PORT=5000
   GOOGLE_API_KEY=your_google_api_key_here
   MAX_FILE_SIZE=10485760
   UPLOAD_DIR=./uploads
   ```

6. Click **"Create Web Service"**

7. Wait for deployment (2-5 minutes)

8. **Copy your backend URL** (will look like: `https://headshots-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel (Free Tier)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### Step 2: Deploy Frontend
1. Click **"Add New Project"**
2. Import your repository: `hamids-ai/Headshots-App`
3. Configure the project:
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://headshots-backend.onrender.com/api
     ```
     *(Replace with your actual Render backend URL from Part 1)*

5. Click **"Deploy"**

6. Wait for deployment (2-3 minutes)

7. **Your app is live!** Vercel will give you a URL like:
   `https://headshots-app-xyz.vercel.app`

---

## Part 3: Update Backend CORS

After getting your Vercel frontend URL, update the backend:

### Option A: Via Render Dashboard
1. Go to your Render service
2. Navigate to **Environment** tab
3. Add new environment variable:
   ```
   FRONTEND_URL=https://your-vercel-url.vercel.app
   ```
4. Service will auto-redeploy

### Option B: Update Code (Better for production)
1. Edit `server/server.js` in your repo
2. Update CORS configuration:
   ```javascript
   app.use(cors({
     origin: process.env.FRONTEND_URL || true,
     credentials: true,
   }));
   ```
3. Commit and push - Render will auto-deploy

---

## Testing Your Deployed App

1. **Open your Vercel URL** in a browser
2. **Upload a photo** - Try the drag & drop
3. **Select a style** - Choose from 4 options
4. **Generate** - Click the button
5. **View results** - See the comparison (mock data for now)

---

## Troubleshooting

### Frontend can't reach backend
- Check that `VITE_API_URL` in Vercel matches your Render URL
- Make sure Render backend is running (green status)
- Check browser console for CORS errors

### Backend not responding
- Check Render logs for errors
- Verify all environment variables are set
- Make sure the service is not sleeping (free tier sleeps after inactivity)

### Build failures
**Vercel:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`

**Render:**
- Check deployment logs
- Verify Node version compatibility

---

## Free Tier Limits

**Vercel:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

**Render:**
- 750 hours/month
- Service sleeps after 15 min inactivity
- Wakes up on first request (may take 30-60 seconds)

---

## Next Steps

Once deployed and tested:
1. ✅ Test all features with mock data
2. 🔜 Proceed to Milestone 2: Add Google Imagen 3 API
3. 🔜 Replace mock generation with real AI

---

## Quick Deploy Commands

If you prefer CLI deployment:

### Vercel CLI
```bash
cd client
npm install -g vercel
vercel
# Follow prompts, add VITE_API_URL env var
```

### Manual Build
```bash
# Build frontend locally
cd client
npm run build

# Build creates 'dist' folder - upload to any static host
```

---

## Support Links

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Your Repository: https://github.com/hamids-ai/Headshots-App

---

**Your app is ready to deploy! 🚀**
