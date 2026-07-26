# OpsPilot AI

**AI-Powered Business Operations Dashboard**

A modern enterprise SaaS application that helps businesses automate document processing, email classification, AI summarization, analytics, and workflow management using Google's Gemini AI.

![OpsPilot AI](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## 🚀 Features

- **AI Document Summarizer**: Automatically summarize long documents with key points, action items, keywords, tone detection, language detection, reading time, copy/download/share features
- **Email Analyzer**: Classify emails, detect sentiment, generate suggested replies, spam detection, and action items extraction
- **Document Search**: Search and filter through uploaded documents with intelligent sorting
- **Analytics Dashboard**: Track productivity metrics, AI usage, and response times with beautiful charts
- **History & Favorites**: View and manage your analysis history with search, filter, sort, delete, and favorite functionality
- **User Profile**: View account details, statistics, and manage your profile
- **Guest Mode**: Try all features instantly without creating an account (data stored locally)
- **Authentication**: Sign in with Google for persistent data storage and cross-device sync
- **Settings Management**: Customize themes, notifications, and API configuration
- **Modern UI**: Glassmorphism design with dark mode support, smooth animations, and responsive layout

## 🏗️ Architecture

This project follows clean architecture principles with scalable enterprise structure:

```
opspilot/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Dashboard modules
├── components/            # Reusable React components
│   ├── common/           # Shared components
│   ├── layout/           # Layout components
│   └── ui/               # Base UI components
├── features/             # Feature-specific modules
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── services/             # External service integrations
├── types/                # TypeScript type definitions
├── utils/                # Helper utilities
├── constants/            # Application constants
├── providers/            # Context providers
└── styles/               # Global styles
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui patterns
- **State Management**: Zustand
- **Authentication**: NextAuth.js (Google OAuth)
- **Database**: MongoDB Atlas with Mongoose
- **Validation**: Zod
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Theme**: next-themes
- **AI**: Google Gemini API
- **Notifications**: Sonner
- **Tables**: TanStack Table

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/opspilot.git
cd opspilot
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your environment variables to `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/opspilot?retryWrites=true&w=majority
NEXTAUTH_SECRET=your_nextauth_secret_here
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string | Yes (for authenticated mode) |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js session encryption | Yes (for authentication) |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | Yes (for authentication) |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | Yes (for authentication) |
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |
| `GEMINI_MODEL` | Custom Gemini model name | No (defaults to gemini-2.5-flash) |
| `NEXT_PUBLIC_APP_URL` | Application URL for production | No |

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Pages & Modules

### Landing Page
- Hero section with CTA
- Feature showcase
- Testimonials
- Pricing plans
- Footer with links

### Authentication
- Login page
- Sign up page
- Forgot password

### Dashboard
- **Overview**: Statistics cards, recent activities, productivity metrics
- **Document Summarizer**: Upload/paste text for AI summarization with enhanced features
- **Email Analyzer**: Paste emails for classification and sentiment analysis
- **Document Search**: Search and filter uploaded documents
- **History**: View and manage analysis history (documents & emails)
- **Profile**: View account details, statistics, and manage profile
- **Reports**: Analytics charts and metrics
- **Settings**: Profile, theme, notifications, API configuration

## 🔐 Authentication & Guest Mode

### Guest Mode
- **No account required**: Try all AI features instantly
- **Local storage**: Data stored in browser localStorage
- **Full access**: Document Summarizer, Email Analyzer, Dashboard, Reports
- **Limitations**: No persistent history, no cross-device sync, no favorites

### Authenticated Mode
- **Google OAuth**: Sign in with Google account
- **MongoDB storage**: Persistent data storage in MongoDB Atlas
- **Cross-device sync**: Access your data from any device
- **Full features**: History, favorites, profile, settings
- **Automatic user creation**: Users created automatically on first sign-in

### Protected Routes
The following routes require authentication:
- `/dashboard/profile`
- `/dashboard/history`
- `/dashboard/favorites`
- `/dashboard/settings`

All other routes (including AI features) work in both guest and authenticated modes.

## 🔐 Security

- API keys are stored in environment variables
- No sensitive data is exposed to the client
- Secure API routes with proper error handling
- Input validation on all endpoints

## 🚀 Deployment

### Vercel via CI/CD Pipeline

This project uses GitHub Actions for automatic deployment to Vercel.

#### Step 1: Get Vercel Credentials

**A. Create Vercel Account:**
1. Go to https://vercel.com/signup
2. Sign up with your GitHub account

**B. Get Vercel Token:**
1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Name it "GitHub Actions"
4. Copy the token (save it securely)

**C. Import Project to Vercel:**
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repo: `Aninhassain/opspilot`
4. Configure build settings (Next.js auto-detected)
5. Click "Deploy"

**D. Get Project ID:**
1. After deployment, go to Project Settings
2. Copy the Project ID from the General tab

**E. Get Organization ID:**
1. In Vercel dashboard, go to Settings
2. Copy your Organization ID from the URL or settings

#### Step 2: Add GitHub Secrets

1. Go to your GitHub repo: https://github.com/Aninhassain/opspilot
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `VERCEL_TOKEN`: Your Vercel token from Step 1B
   - `VERCEL_ORG_ID`: Your organization ID from Step 1E
   - `VERCEL_PROJECT_ID`: Your project ID from Step 1D

#### Step 3: Add Environment Variables to Vercel

1. In your Vercel project, go to Settings → Environment Variables
2. Add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NEXTAUTH_SECRET`: Generate a random secret (use: `openssl rand -base64 32`)
   - `AUTH_GOOGLE_ID`: Your Google OAuth client ID
   - `AUTH_GOOGLE_SECRET`: Your Google OAuth client secret
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `GEMINI_MODEL`: `gemini-2.5-flash` (or your preferred model)
   - `NEXT_PUBLIC_APP_URL`: Your production URL (e.g., https://your-app.vercel.app)

#### Step 4: Deploy

Push to the main branch to trigger automatic deployment:

```bash
git add .
git commit -m "Update for deployment"
git push origin main
```

The GitHub Actions workflow will:
- Run linting and type checking
- Build the project
- Automatically deploy to Vercel production

### Manual Vercel Deployment

If you prefer manual deployment:

1. Push code to GitHub
2. Go to Vercel dashboard
3. Click "Deploy" on your project
4. Vercel will automatically deploy the latest commit

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔄 CI/CD

The project includes a GitHub Actions workflow that:

- Runs on every push to main/develop branches
- Installs dependencies
- Runs linter
- Performs type checking
- Builds the project
- Automatically deploys to Vercel on main branch

Required GitHub Secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## 📝 API Routes

### POST `/api/document`
Summarizes text using Gemini AI and saves to MongoDB (authenticated) or localStorage (guest).

**Request:**
```json
{
  "text": "Your document text here...",
  "fileName": "document.txt" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "Concise summary...",
    "keyPoints": ["Point 1", "Point 2"],
    "actionItems": ["Action 1"],
    "keywords": ["keyword1", "keyword2"],
    "readingTime": 5,
    "tone": "Professional",
    "language": "English",
    "id": "document_id",
    "isGuest": true (for guest mode)
  }
}
```

### POST `/api/email`
Analyzes email content using Gemini AI and saves to MongoDB (authenticated) or localStorage (guest).

**Request:**
```json
{
  "email": "Your email content here...",
  "subject": "Email subject" (optional)
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "category": "Work",
    "priority": "High",
    "sentiment": "Neutral",
    "suggestedReply": "Suggested reply...",
    "spamDetection": {
      "isSpam": false,
      "confidence": 95
    },
    "actionItems": ["Action 1"],
    "id": "email_id",
    "isGuest": true (for guest mode)
  }
}
```

### GET `/api/history`
Fetches analysis history (documents and emails) with search, filter, and sort options.

**Query Parameters:**
- `type`: "document" | "email" | "all" (default: "all")
- `search`: Search query string
- `sortBy`: Field to sort by (default: "createdAt")
- `sortOrder`: "asc" | "desc" (default: "desc")

**Response:**
```json
{
  "success": true,
  "data": {
    "documents": [...],
    "emails": [...]
  }
}
```

### DELETE `/api/history`
Deletes an analysis from history.

**Query Parameters:**
- `id`: Analysis ID
- `type`: "document" | "email"

### POST `/api/favorites`
Adds an analysis to favorites.

**Request:**
```json
{
  "analysisId": "analysis_id",
  "type": "document" | "email"
}
```

### GET `/api/favorites`
Fetches user's favorite analyses.

### DELETE `/api/favorites`
Removes an analysis from favorites.

**Query Parameters:**
- `analysisId`: Analysis ID

### GET `/api/profile`
Fetches user profile and statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "image": "avatar_url",
      "provider": "google",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "stats": {
      "documentsProcessed": 42,
      "emailsAnalyzed": 156,
      "favorites": 23
    }
  }
}
```

## 🎨 Design System

The application uses a modern design inspired by Linear, Vercel, and Stripe:

- **Dark mode by default**
- **Glassmorphism effects**
- **Rounded cards and buttons**
- **Professional typography**
- **Smooth animations with Framer Motion**
- **Responsive on all devices**
- **Loading skeletons and empty states**

## 🧪 Testing

```bash
npm run lint
npm run build
```

## � Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## �️ Database Schema

### User Model
```typescript
{
  name: string
  email: string (unique)
  image?: string
  provider: "google" | "github" | "credentials"
  createdAt: Date
}
```

### DocumentAnalysis Model
```typescript
{
  userId: string
  fileName?: string
  originalText: string
  summary: string
  keyPoints: string[]
  actionItems: string[]
  keywords: string[]
  readingTime: number
  tone: string
  language: string
  createdAt: Date
}
```

### EmailAnalysis Model
```typescript
{
  userId: string
  subject?: string
  emailContent: string
  category: string
  priority: string
  sentiment: string
  suggestedReply: string
  spamProbability: number
  isSpam: boolean
  actionItems: string[]
  createdAt: Date
}
```

### Favorite Model
```typescript
{
  userId: string
  analysisId: string
  type: "document" | "email"
  createdAt: Date
}
```

## 🔮 Future Improvements

- [ ] File upload with drag and drop
- [ ] Real-time notifications
- [ ] Advanced analytics with time filters
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] API rate limiting
- [ ] Advanced spam detection with ML
- [ ] Team collaboration features
- [ ] Export to PDF/Word
- [ ] Email integration (Gmail, Outlook)

## 📞 Support

For support, email support@opspilot.ai or open an issue on GitHub.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Google Gemini](https://ai.google.dev/) - AI API
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel](https://vercel.com/) - Hosting platform
