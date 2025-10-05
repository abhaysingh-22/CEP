# EcoTravel - Sustainable Tourism Platform
## Simple Block Diagram for College Presentation

---

## 🛠️ **Technology Stack**

```mermaid
graph TB
    subgraph UI ["🎨 UI LAYER"]
        A1[React 18 + TypeScript]
        A2[Tailwind CSS + shadcn/ui]
        A3[Responsive Design]
    end
    
    subgraph API ["⚙️ API LAYER"]
        B1[OpenRouter + Claude AI]
        B2[Web Speech API]
        B3[React Query]
    end
    
    subgraph DB ["🗄️ DATABASE LAYER"]
        C1[Supabase Backend]
        C2[PostgreSQL Database]
        C3[Real-time Updates]
    end
    
    subgraph AUTH ["🔐 AUTHENTICATION"]
        D1[Supabase Auth]
        D2[JWT Tokens]
        D3[Session Management]
    end
    
    UI --> API
    API --> DB
    API --> AUTH
    
    style UI fill:#E8F5E8,stroke:#4CAF50,stroke-width:3px
    style API fill:#FFF3E0,stroke:#FF9800,stroke-width:3px
    style DB fill:#E1F5FE,stroke:#2196F3,stroke-width:3px
    style AUTH fill:#FFEBEE,stroke:#F44336,stroke-width:3px
```

---

## 📊 **Input & Output Flow**

```mermaid
flowchart LR
    subgraph INPUT ["📥 USER INPUT"]
        I1[🎤 Voice Commands]
        I2[💬 Text Messages]
        I3[📊 Travel Data]
        I4[🔐 Login Info]
    end
    
    subgraph PROCESSING ["⚙️ PROCESSING"]
        P1[🧠 AI Processing]
        P2[🧮 Carbon Calculation]
        P3[🔍 Data Analysis]
    end
    
    subgraph OUTPUT ["📤 USER OUTPUT"]
        O1[💬 AI Responses]
        O2[📊 Impact Reports]
        O3[🗺️ Eco Destinations]
        O4[📈 Analytics Charts]
    end
    
    INPUT --> PROCESSING
    PROCESSING --> OUTPUT
    
    style INPUT fill:#E8F5E8,stroke:#4CAF50
    style PROCESSING fill:#FFF8E1,stroke:#FFC107
    style OUTPUT fill:#F3E5F5,stroke:#9C27B0
```

---

## 🎯 **How to Use EcoTravel**

```mermaid
graph TD
    A[👤 Open EcoTravel Website] --> B{🔐 Login Required?}
    B -->|Yes| C[📝 Register/Login]
    B -->|No| D[🏠 Access Homepage]
    C --> D
    
    D --> E{🎯 Choose Feature}
    E -->|Chat| F[🤖 Use AI Chatbot]
    E -->|Calculate| G[🧮 Carbon Calculator]
    E -->|Explore| H[🗺️ Find Destinations]
    E -->|Community| I[👥 Join Community]
    
    F --> J[🎤 Voice or Text Input]
    G --> K[📊 Enter Travel Details]
    H --> L[🔍 Browse Eco Places]
    I --> M[📝 Share Experiences]
    
    J --> N[💬 Get AI Response]
    K --> O[📈 View Impact Report]
    L --> P[🏨 Find Green Hotels]
    M --> Q[🤝 Connect with Users]
    
    style A fill:#E8F5E8,stroke:#4CAF50
    style F,G,H,I fill:#FFF3E0,stroke:#FF9800
    style N,O,P,Q fill:#F3E5F5,stroke:#9C27B0
```

---

## 📋 **Technical Specifications**

### **Frontend Technologies**
| Component | Technology | Purpose |
|-----------|------------|---------|
| **Framework** | React 18 + TypeScript | Modern UI development |
| **Styling** | Tailwind CSS + shadcn/ui | Responsive design system |
| **Build Tool** | Vite | Fast development builds |
| **State** | React Query | API state management |
| **Routing** | React Router | Single page navigation |

### **Backend & APIs**
| Component | Technology | Purpose |
|-----------|------------|---------|
| **AI Service** | OpenRouter + Claude Sonnet | Natural language processing |
| **Database** | Supabase + PostgreSQL | Data storage & real-time sync |
| **Authentication** | Supabase Auth | User login & security |
| **Voice** | Web Speech API | Speech recognition/synthesis |
| **Charts** | Chart.js | Data visualization |

### **Key Features**
- 🤖 **AI Chatbot** - Voice & text interaction
- 🧮 **Carbon Calculator** - Travel impact assessment  
- 🗺️ **Destinations** - Eco-friendly travel spots
- 👥 **Community** - User experience sharing
- 📱 **Responsive** - Works on all devices
- 🔐 **Secure** - Protected user data

### **Performance Specs**
- ⚡ **Load Time** - Under 3 seconds
- 📱 **Mobile First** - Optimized for mobile devices  
- 🌐 **Cross Browser** - Chrome, Firefox, Safari, Edge
- 📶 **Offline Support** - Basic functionality without internet
- 🔄 **Real-time** - Live data updates via Supabase

---

## 🚀 **Deployment & Hosting**

```mermaid
graph LR
    A[💻 Local Development] --> B[📤 Git Push]
    B --> C[🔄 CI/CD Pipeline]
    C --> D[🌐 Vercel/Netlify]
    D --> E[👥 Live Users]
    
    style A fill:#E8F5E8,stroke:#4CAF50
    style C fill:#FFF8E1,stroke:#FFC107
    style D fill:#E1F5FE,stroke:#2196F3
    style E fill:#F3E5F5,stroke:#9C27B0
```

**Hosting Platform**: Vercel or Netlify  
**Domain**: Custom domain with HTTPS  
**CDN**: Global content delivery network  
**Monitoring**: Real-time performance tracking