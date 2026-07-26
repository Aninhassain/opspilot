export const APP_NAME = "OpsPilot AI"
export const APP_TAGLINE = "AI-Powered Business Operations Dashboard"

export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Document Summarizer",
    href: "/dashboard/document-summarizer",
    icon: "FileText",
  },
  {
    title: "Email Analyzer",
    href: "/dashboard/email-analyzer",
    icon: "Mail",
  },
  {
    title: "Document Search",
    href: "/dashboard/document-search",
    icon: "Search",
  },
  {
    title: "History",
    href: "/dashboard/history",
    icon: "History",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: "BarChart3",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "User",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "Settings",
  },
] as const

export const FEATURES = [
  {
    title: "AI Document Summarization",
    description: "Automatically summarize long documents with key points and action items",
    icon: "FileText",
  },
  {
    title: "Email Analysis",
    description: "Classify emails, detect sentiment, and generate suggested replies",
    icon: "Mail",
  },
  {
    title: "Smart Search",
    description: "Search through all your documents with intelligent filtering",
    icon: "Search",
  },
  {
    title: "Analytics Dashboard",
    description: "Track productivity metrics and AI usage analytics",
    icon: "BarChart3",
  },
  {
    title: "Workflow Automation",
    description: "Streamline business operations with AI-powered workflows",
    icon: "Zap",
  },
  {
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption",
    icon: "Shield",
  },
] as const

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small teams",
    features: [
      "100 AI requests/month",
      "5 team members",
      "Basic analytics",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 79,
    description: "For growing businesses",
    features: [
      "500 AI requests/month",
      "20 team members",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    description: "For large organizations",
    features: [
      "Unlimited AI requests",
      "Unlimited team members",
      "Custom analytics",
      "24/7 support",
      "Custom integrations",
      "SLA guarantee",
    ],
    popular: false,
  },
] as const

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "OpsPilot AI has transformed how we handle documents. The AI summarization saves us hours every week.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Operations Manager, ScaleUp",
    content: "The email analyzer is incredible. It's like having an extra team member who never sleeps.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "CTO, DataFlow Systems",
    content: "Best AI operations dashboard we've used. Clean interface, powerful features, great support.",
    avatar: "ER",
  },
] as const

export const DOCUMENT_TYPES = ["pdf", "txt", "docx", "doc"] as const

export const EMAIL_CATEGORIES = [
  "Work",
  "Personal",
  "Promotional",
  "Spam",
  "Urgent",
  "Newsletter",
] as const

export const PRIORITY_LEVELS = ["Low", "Medium", "High", "Critical"] as const

export const SENTIMENT_TYPES = ["Positive", "Neutral", "Negative"] as const
