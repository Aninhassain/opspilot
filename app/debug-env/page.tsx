export default function DebugEnvPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="space-y-2">
        <p>NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? "✅ Set" : "❌ Missing"}</p>
        <p>AUTH_GOOGLE_ID: {process.env.AUTH_GOOGLE_ID ? "✅ Set" : "❌ Missing"}</p>
        <p>AUTH_GOOGLE_SECRET: {process.env.AUTH_GOOGLE_SECRET ? "✅ Set" : "❌ Missing"}</p>
        <p>MONGODB_URI: {process.env.MONGODB_URI ? "✅ Set" : "❌ Missing"}</p>
        <p>GEMINI_API_KEY: {process.env.GEMINI_API_KEY ? "✅ Set" : "❌ Missing"}</p>
      </div>
    </div>
  )
}
