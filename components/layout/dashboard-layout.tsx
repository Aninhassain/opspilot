"use client"

import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardNavbar } from "./dashboard-navbar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 lg:pl-64">
        <DashboardNavbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
