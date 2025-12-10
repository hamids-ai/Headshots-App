# Professional Headshot AI App

Transform your photos into professional headshots using AI-powered image generation.

## 🚀 Quick Deploy (Recommended for Testing)

**Don't want to run locally? Deploy in 10 minutes:**

👉 **[See DEPLOY.md for step-by-step deployment guide](./DEPLOY.md)**

- Frontend: Vercel (Free)
- Backend: Render (Free)

## 🎯 Features

- **Upload Photos**: Drag & drop or click to upload
- **4 Professional Styles**:
  - Corporate Classic
  - Creative Professional
  - Executive Portrait
  - Authentically Creative Social Media
- **Side-by-Side Comparison**: Compare original vs AI-generated
- **Download**: Save your professional headshot

## 🏗️ Tech Stack

**Frontend:**
- React 18+ with Vite
- Tailwind CSS v3
- React Router
- Axios

**Backend:**
- Express
- Multer (file uploads)
- Sharp (image processing)
- Google Imagen 3 API (Milestone 2)

## 💻 Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Headshots-App
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cp .env.example .env  # Create your .env file
   # Edit .env with your configuration
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Run Backend** (Terminal 1)
   ```bash
   cd server
   npm run dev
   # Runs on http://localhost:5000
   ```

5. **Run Frontend** (Terminal 2)
   ```bash
   cd client
   npm run dev
   # Runs on http://localhost:5173
   ```

6. **Open** http://localhost:5173 in your browser

## 📁 Project Structure

```
Headshots-App/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context
│   │   ├── services/    # API client
│   │   └── utils/       # Helper functions
│   └── package.json
│
├── server/              # Express backend
│   ├── routes/          # API routes
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── services/        # Business logic
│   └── package.json
│
├── spec.md             # Project specification
├── DEPLOY.md           # Deployment guide
└── README.md           # This file
```

## 🎨 Current Status

### ✅ Milestone 1: Complete
- UI Setup and Frontend Foundation
- All components built and working
- Express backend with stubbed endpoints
- Mock headshot generation workflow

### 🔜 Milestone 2: Coming Next
- Google Gemini Nano Banana API integration
- Real AI headshot generation
- Style-specific prompt engineering

## 🧪 Testing

1. Upload a photo (JPG, PNG, or WebP)
2. Select a professional style
3. Click "Generate Professional Headshot"
4. View side-by-side comparison
5. Download your headshot

*Note: Currently uses mock data. Real AI generation in Milestone 2.*

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
GOOGLE_API_KEY=your_google_api_key
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

### Frontend (Vercel deployment)
```
VITE_API_URL=https://your-backend-url.com/api
```

## 📝 API Endpoints

- `POST /api/upload` - Upload image
- `POST /api/generate` - Generate headshot
- `GET /api/status/:jobId` - Check generation status
- `GET /api/download/:id` - Download generated image
- `GET /health` - Health check

## 🐛 Troubleshooting

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check CORS configuration in `server/server.js`

**File upload fails:**
- Check file size (max 10MB)
- Verify file format (JPG, PNG, WebP only)
- Ensure uploads directory exists

**Build errors:**
- Delete `node_modules` and reinstall
- Check Node version (18+ required)

## 📚 Documentation

- [Full Specification](./spec.md)
- [Deployment Guide](./DEPLOY.md)

## 🤝 Contributing

This is a personal project built with Claude Code. Feel free to fork and customize!

## 📄 License

MIT

---

**Built with ❤️ using React, Express, and AI**
