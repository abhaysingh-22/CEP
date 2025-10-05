# 🌿 EcoTravel - Sustainable Tourism & Climate Solutions

A comprehensive web application for sustainable tourism, carbon footprint calculation, and eco-friendly travel planning. Built with modern web technologies and featuring voice-enabled AI chatbot assistance.

## 🚀 Live Demo

**Production URL**: https://ecotravel-omega.vercel.app/

## ✨ Features

### Core Functionality
- 🌍 **Sustainable Tourism Hub** - Comprehensive guide to eco-friendly travel
- 🧮 **Carbon Footprint Calculator** - Calculate and track your travel impact
- 📍 **Green Destinations** - Discover eco-certified travel destinations
- 📝 **Travel Notes** - Personal note-taking with tags and search
- 📊 **Impact Data & Analytics** - Visual climate change and tourism data
- 📰 **Latest News** - Stay updated with sustainable tourism trends
- 👥 **Community Features** - Connect with eco-conscious travelers

### AI-Powered Features
- 🤖 **EcoBot AI Assistant** - Google Gemini-powered chatbot
- 🎙️ **Voice Commands** - Speech-to-text and text-to-speech integration
- 💬 **Natural Conversations** - Context-aware responses about eco-travel

### User Experience
- 🔐 **Authentication** - Secure login/signup with Supabase
- 🌙 **Dark/Light Mode** - Responsive theme switching
- 📱 **Mobile-First Design** - Optimized for all devices
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS
- ⚡ **Fast Performance** - Optimized loading and caching

## 🛠️ How to Edit This Code

### Development Options

**Option 1: Local Development**

**Prerequisites:** Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```bash
# Clone the repository
git clone https://github.com/abhaysingh-22/CEP.git

# Navigate to project directory
cd CEP

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys (Supabase, Google Gemini, etc.)

# Start development server
npm run dev
```

The development server will start at `http://localhost:8080`

**Option 2: GitHub Codespaces**

- Click the "Code" button → "Codespaces" → "New codespace"
- Edit files directly in the browser-based VS Code environment
- All dependencies are pre-installed and ready to use

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Framer Motion** - Smooth animations and transitions

### Backend & Services
- **Supabase** - Database, authentication, and real-time features
- **OpenRouter + Claude Sonnet** - Advanced AI chatbot with voice capabilities
- **Web Speech API** - Voice recognition and text-to-speech

### Key Libraries
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form handling with validation
- **Lucide React** - Beautiful icon library
- **Recharts** - Data visualization components

## 🚀 Deployment

### Production Deployment

The project includes configurations for multiple platforms:

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

**Supported Platforms:**
- ✅ **Netlify** - Automatic SPA routing with `_redirects`
- ✅ **Vercel** - Configured with `vercel.json`
- ✅ **GitHub Pages** - SPA routing with custom scripts
- ✅ **Apache** - Includes `.htaccess` configuration
- ✅ **Any Static Host** - Generic SPA support

### Environment Variables

Create a `.env.local` file with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 📁 Project Structure

```
CEP/
├── public/                 # Static assets
│   ├── favicon.svg        # Custom eco-themed favicon
│   ├── manifest.json      # PWA manifest
│   ├── _redirects         # Netlify SPA routing
│   ├── vercel.json        # Vercel configuration
│   └── 404.html           # GitHub Pages fallback
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Chatbot.tsx   # AI chatbot with voice
│   │   └── Navigation.tsx # Responsive navigation
│   ├── pages/            # Route components
│   ├── contexts/         # React contexts (Auth, Theme)
│   ├── services/         # API services (OpenRouter AI)
│   ├── integrations/     # Third-party integrations
│   └── lib/              # Utility functions
├── DEPLOYMENT.md          # Detailed deployment guide
└── package.json
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run lint            # Run ESLint

# Building
npm run build           # Production build
npm run build:dev       # Development build
npm run build:gh-pages  # GitHub Pages build
npm run preview         # Preview production build

# Testing
npm run serve           # Serve production build locally
```

## 🌍 Browser Support

- ✅ Chrome 88+ (Full voice support)
- ✅ Safari 14+ (Full voice support)  
- ✅ Firefox 85+ (Limited voice support)
- ✅ Edge 88+ (Full voice support)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: https://ecotravel-omega.vercel.app/
- **GitHub Repository**: https://github.com/abhaysingh-22/CEP
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

## 📞 Support

For questions and support:
- Open an issue on GitHub
- Check the deployment guide for common issues

---

**Built with ❤️ for sustainable tourism and environmental awareness** 🌿
