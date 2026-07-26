"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, FileText, Mail, Star, Calendar, LogOut, Shield } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useSession } from "@/hooks/use-session"
import { signIn, signOut } from "@/auth/lib/react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/profile")
      const data = await response.json()

      if (data.success) {
        setProfile(data.data)
      }
    } catch (error) {
      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = () => {
    signIn("google")
  }

  const handleLogout = () => {
    signOut()
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

  const isGuest = !session?.user

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            {isGuest ? "Guest Mode - Sign in to save your work permanently" : "Manage your account and preferences"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass md:col-span-1">
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                  {profile?.user?.image ? (
                    <img
                      src={profile.user.image}
                      alt={profile.user.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-primary" />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{profile?.user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile?.user?.email || "Guest User"}</p>
                  <Badge variant={isGuest ? "secondary" : "default"} className="mt-2">
                    {isGuest ? "Guest" : profile?.user?.provider || "User"}
                  </Badge>
                </div>
              </div>

              {isGuest ? (
                <Button onClick={handleLogin} className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Sign in to Save Work
                </Button>
              ) : (
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              )}
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Your activity overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>Documents Processed</span>
                    </div>
                    <div className="text-3xl font-bold">{profile?.stats?.documentsProcessed || 0}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>Emails Analyzed</span>
                    </div>
                    <div className="text-3xl font-bold">{profile?.stats?.emailsAnalyzed || 0}</div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span>Favorites</span>
                    </div>
                    <div className="text-3xl font-bold">{profile?.stats?.favorites || 0}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {profile?.user?.createdAt && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Joined:</span>
                      <span className="font-medium">
                        {new Date(profile.user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isGuest && (
              <Card className="glass border-yellow-500/50 bg-yellow-500/5">
                <CardHeader>
                  <CardTitle className="text-yellow-700 dark:text-yellow-400">Guest Mode</CardTitle>
                  <CardDescription className="text-yellow-600/80 dark:text-yellow-400/80">
                    Your data is stored locally in your browser
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-700/80 dark:text-yellow-400/80">
                    Sign in to save your work permanently, access your history from any device, and sync your data across sessions.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
