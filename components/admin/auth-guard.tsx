"use client"

import type React from "react"

import { useEffect } from "react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

export const AuthGuard = ({ children, redirectTo = "/admin" }: AuthGuardProps) => {
  const { isAuthenticated, isLoading } = useAdminAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.href = redirectTo
    }
  }, [isAuthenticated, isLoading, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-rose-200">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-rose-500" />
            <p className="text-rose-700">Checking authentication...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}
