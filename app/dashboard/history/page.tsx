"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import { Search, Trash2, Star, FileText, Mail, Clock, Filter } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useAuth } from "@clerk/nextjs"

export default function HistoryPage() {
  const { isSignedIn } = useAuth()
  const [history, setHistory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")

  useEffect(() => {
    fetchHistory()
  }, [typeFilter, search, sortBy, sortOrder])

  const fetchHistory = async () => {
    try {
      const params = new URLSearchParams({
        type: typeFilter,
        search,
        sortBy,
        sortOrder,
      })

      const response = await fetch(`/api/history?${params}`)
      const data = await response.json()

      if (data.success) {
        setHistory(data.data)
      }
    } catch (error) {
      toast.error("Failed to load history")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, type: "document" | "email") => {
    try {
      const response = await fetch(`/api/history?id=${id}&type=${type}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Deleted successfully")
        fetchHistory()
      }
    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  const handleFavorite = async (analysisId: string, type: "document" | "email") => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysisId, type }),
      })

      if (response.ok) {
        toast.success("Added to favorites")
      }
    } catch (error) {
      toast.error("Failed to add to favorites")
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  const allItems = [
    ...(history?.documents || []).map((doc: any) => ({ ...doc, itemType: "document" })),
    ...(history?.emails || []).map((email: any) => ({ ...email, itemType: "email" })),
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground">
            {isSignedIn ? "View your saved analyses" : "Your local history (Guest Mode)"}
          </p>
        </div>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="document">Documents</option>
                <option value="email">Emails</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="createdAt">Date</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="flex h-10 w-full md:w-48 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {allItems.length === 0 ? (
            <Card className="glass">
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No history yet</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            allItems.map((item: any) => (
              <Card key={item.id || item._id} className="glass">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {item.itemType === "document" ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <Mail className="h-5 w-5 text-primary" />
                        )}
                        <h3 className="font-semibold">
                          {item.fileName || item.subject || `${item.itemType} Analysis`}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {item.itemType}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.summary || item.category}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(item.createdAt).toLocaleString()}</span>
                        </div>
                        {item.itemType === "document" && item.readingTime && (
                          <span>{item.readingTime} min read</span>
                        )}
                        {item.itemType === "email" && item.priority && (
                          <Badge variant="secondary" className="text-xs">
                            {item.priority}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleFavorite(item.id || item._id, item.itemType)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item.id || item._id, item.itemType)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
