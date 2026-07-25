"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Download, Clock, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function DocumentSummarizerPage() {
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<any>(null)

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to summarize")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      
      if (data.success) {
        setSummary(data.data)
        toast.success("Document summarized successfully")
      } else {
        toast.error(data.error || "Failed to summarize document")
      }
    } catch (error) {
      toast.error("An error occurred while summarizing")
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    if (!summary) return
    
    const content = `
Summary:
${summary.summary}

Key Points:
${summary.keyPoints.map((p: string) => `- ${p}`).join("\n")}

Action Items:
${summary.actionItems.map((a: string) => `- ${a}`).join("\n")}

Keywords:
${summary.keywords.join(", ")}

Estimated Reading Time: ${summary.estimatedReadingTime} minutes
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "summary.txt"
    a.click()
    URL.revokeObjectURL(url)
    toast.success("Summary exported successfully")
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Document Summarizer</h1>
          <p className="text-muted-foreground">Upload documents or paste text to generate AI-powered summaries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Input</CardTitle>
              <CardDescription>Enter your document text below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Document Text</Label>
                <Textarea
                  id="text"
                  placeholder="Paste your document text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={12}
                  className="resize-none"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
                <Button 
                  onClick={handleSummarize} 
                  disabled={loading || !text.trim()}
                  className="flex-1"
                >
                  {loading ? "Processing..." : "Summarize"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>AI-generated summary and insights</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                </div>
              ) : summary ? (
                <div className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Summary</Label>
                    <p className="text-sm text-muted-foreground">{summary.summary}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Key Points</Label>
                    <div className="space-y-2">
                      {summary.keyPoints.map((point: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Action Items</Label>
                    <div className="space-y-2">
                      {summary.actionItems.map((item: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Badge variant="outline" className="mt-0.5">{index + 1}</Badge>
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Keywords</Label>
                    <div className="flex flex-wrap gap-2">
                      {summary.keywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="secondary">{keyword}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
                    <Clock className="h-4 w-4" />
                    <span>Estimated reading time: {summary.estimatedReadingTime} minutes</span>
                  </div>

                  <Button onClick={handleExport} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Summary
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mb-4 opacity-50" />
                  <p>Enter text and click summarize to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
