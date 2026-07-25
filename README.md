# OpsPilot AI

**AI-Powered Business Operations Dashboard**

A modern enterprise SaaS application that helps businesses automate document processing, email classification, AI summarization, analytics, and workflow management using Google's Gemini AI.

![OpsPilot AI](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

## 🚀 Features

- **AI Document Summarizer**: Automatically summarize long documents with key points, action items, and keywords
- **Email Analyzer**: Classify emails, detect sentiment, generate suggested replies, and spam detection
- **Document Search**: Search and filter through uploaded documents with intelligent sorting
- **Analytics Dashboard**: Track productivity metrics, AI usage, and response times with beautiful charts
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

4. Add your Gemini API key to `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
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
| `GEMINI_API_KEY` | Google Gemini API key for AI features | Yes |
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
- **Document Summarizer**: Upload/paste text for AI summarization
- **Email Analyzer**: Paste emails for classification and sentiment analysis
- **Document Search**: Search and filter uploaded documents
- **Reports**: Analytics charts and metrics
- **Settings**: Profile, theme, notifications, API configuration

## 🔐 Security

- API keys are stored in environment variables
- No sensitive data is exposed to the client
- Secure API routes with proper error handling
- Input validation on all endpoints

## 🚀 Deployment

### Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

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

### POST `/api/summarize`
Summarizes text using Gemini AI.

**Request:**
```json
{
  "text": "Your document text here..."
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
    "estimatedReadingTime": 5
  }
}
```

### POST `/api/email`
Analyzes email content using Gemini AI.

**Request:**
```json
{
  "email": "Your email content here..."
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
    "actionItems": ["Action 1"]
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

## 🔮 Future Improvements

- [ ] Real database integration (PostgreSQL/Supabase)
- [ ] User authentication with NextAuth.js
- [ ] File upload with drag and drop
- [ ] Real-time notifications
- [ ] Advanced analytics with time filters
- [ ] Export to PDF/Word
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] API rate limiting
- [ ] Advanced spam detection with ML

## 📞 Support

For support, email support@opspilot.ai or open an issue on GitHub.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Google Gemini](https://ai.google.dev/) - AI API
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Vercel](https://vercel.com/) - Hosting platform
