"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserButton } from "@clerk/nextjs"

export function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          <UserButton afterSignOutUrl="/">
            <UserButton.MenuItems>
              <UserButton.Link href="/dashboard/profile">Profile</UserButton.Link>
              <UserButton.Link href="/dashboard/history">History</UserButton.Link>
              <UserButton.Link href="/dashboard/settings">Settings</UserButton.Link>
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  )
}
