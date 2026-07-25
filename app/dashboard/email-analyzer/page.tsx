"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Mail, AlertTriangle, CheckCircle2, TrendingUp, Trash2, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function EmailAnalyzerPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!email.trim()) {
      toast.error("Please enter an email to analyze")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      
      if (data.success) {
        setAnalysis(data.data)
        toast.success("Email analyzed successfully")
      } else {
        toast.error(data.error || "Failed to analyze email")
      }
    } catch (error) {
      toast.error("An error occurred while analyzing")
    } finally {
      setLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive"
      case "High": return "destructive"
      case "Medium": return "default"
      case "Low": return "secondary"
      default: return "secondary"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive": return "default"
      case "Negative": return "destructive"
      case "Neutral": return "secondary"
      default: return "secondary"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Email Analyzer</h1>
          <p className="text-muted-foreground">Analyze emails with AI-powered classification and sentiment analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Paste your email content below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Content</Label>
                <Textarea
                  id="email"
                  placeholder="Paste your email content here..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
              </div>
              
              <Button 
                onClick={handleAnalyze} 
                disabled={loading || !email.trim()}
                className="w-full"
              >
                {loading ? "Analyzing..." : "Analyze Email"}
              </Button>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>AI-powered email insights</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                </div>
              ) : analysis ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Category</Label>
                      <Badge variant="outline" className="text-base px-3 py-1">
                        {analysis.category}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Priority</Label>
                      <Badge variant={getPriorityColor(analysis.priority) as any} className="text-base px-3 py-1">
                        {analysis.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sentiment</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSentimentColor(analysis.sentiment) as any} className="text-base px-3 py-1">
                        {analysis.sentiment}
                      </Badge>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Spam Detection</Label>
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${analysis.spamDetection.isSpam ? "bg-destructive/10" : "bg-primary/10"}`}>
                      {analysis.spamDetection.isSpam ? (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {analysis.spamDetection.isSpam ? "Likely Spam" : "Not Spam"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Confidence: {analysis.spamDetection.confidence}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Suggested Reply</Label>
                    <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                      {analysis.suggestedReply}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Action Items</Label>
                    <div className="space-y-2">
                      {analysis.actionItems.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" className="flex-1">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Mark as Spam
                    </Button>
                    <Button className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Use Reply
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                  <Mail className="h-12 w-12 mb-4 opacity-50" />
                  <p>Enter email content and click analyze to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
