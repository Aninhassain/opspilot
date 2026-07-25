"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import { Search, FileText, Calendar, Eye, Download } from "lucide-react"
import { useState } from "react"

const mockDocuments = [
  {
    id: "1",
    name: "Q4 Financial Report.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
    category: "Finance",
  },
  {
    id: "2",
    name: "Project Proposal.docx",
    type: "DOCX",
    size: "1.1 MB",
    uploadedAt: "2024-01-14",
    category: "Projects",
  },
  {
    id: "3",
    name: "Meeting Notes.txt",
    type: "TXT",
    size: "45 KB",
    uploadedAt: "2024-01-13",
    category: "Meetings",
  },
  {
    id: "4",
    name: "Employee Handbook.pdf",
    type: "PDF",
    size: "3.8 MB",
    uploadedAt: "2024-01-12",
    category: "HR",
  },
  {
    id: "5",
    name: "Marketing Strategy.docx",
    type: "DOCX",
    size: "1.5 MB",
    uploadedAt: "2024-01-11",
    category: "Marketing",
  },
  {
    id: "6",
    name: "Technical Specs.pdf",
    type: "PDF",
    size: "4.2 MB",
    uploadedAt: "2024-01-10",
    category: "Engineering",
  },
]

export default function DocumentSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [documents] = useState(mockDocuments)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "size") {
      return parseFloat(b.size) - parseFloat(a.size)
    }
    return 0
  })

  const categories = ["all", ...Array.from(new Set(documents.map((d) => d.category)))]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Document Search</h1>
          <p className="text-muted-foreground">Search and filter through your uploaded documents</p>
        </div>

        <Card className="glass">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="md:w-48"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="md:w-48"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="size">Sort by Size</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedDocuments.map((doc) => (
            <Card key={doc.id} className="glass hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">{doc.name}</CardTitle>
                      <CardDescription className="text-xs">{doc.type} • {doc.size}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {doc.uploadedAt}
                  </span>
                  <Badge variant="secondary">{doc.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedDocuments.length === 0 && (
          <Card className="glass">
            <CardContent className="py-12 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No documents found matching your search</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
