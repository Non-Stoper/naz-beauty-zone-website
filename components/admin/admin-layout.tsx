"use client"

import type React from "react"

import { useState } from "react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LayoutDashboard, Calendar, ImageIcon, Users, Settings, LogOut, Menu, X, Sparkles } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export const AdminLayout = ({ children, currentPage = "dashboard" }: AdminLayoutProps) => {
  const { user, logout } = useAdminAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    window.location.href = "/admin"
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, current: currentPage === "dashboard" },
    { name: "Appointments", href: "/admin/appointments", icon: Calendar, current: currentPage === "appointments" },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon, current: currentPage === "gallery" },
    { name: "Customers", href: "/admin/customers", icon: Users, current: currentPage === "customers" },
    { name: "Settings", href: "/admin/settings", icon: Settings, current: currentPage === "settings" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-rose-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-playfair font-bold text-rose-800">Naz Beauty</h1>
              <p className="text-xs text-rose-600">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-rose-400 hover:text-rose-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? "bg-rose-100 text-rose-700 border-r-2 border-rose-500"
                      : "text-gray-600 hover:bg-rose-50 hover:text-rose-700"
                  }`}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 ${item.current ? "text-rose-500" : "text-gray-400 group-hover:text-rose-500"}`}
                  />
                  {item.name}
                </a>
              )
            })}
          </div>
        </nav>

        {/* User info and logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-rose-200">
          <Card className="p-3 bg-rose-50 border-rose-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-rose-800">{user?.name}</p>
                <p className="text-xs text-rose-600">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-100"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-rose-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-rose-400 hover:text-rose-600 hover:bg-rose-50"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-playfair font-bold text-rose-800">Admin Panel</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
