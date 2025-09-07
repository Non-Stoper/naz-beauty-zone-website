"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Sparkles } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, isAuthenticated } = useAdminAuth()

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/admin/dashboard"
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await login(email, password)

    if (result.success) {
      window.location.href = "/admin/dashboard"
    } else {
      setError(result.error || "Login failed")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/elegant-beauty-salon-interior-with-soft-pink-light.jpg')] bg-cover bg-center opacity-10"></div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-playfair text-rose-800">Admin Portal</CardTitle>
            <CardDescription className="text-rose-600 mt-2">Naz Beauty Zone Management</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-rose-700 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@nazbeautyzone.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-rose-200 focus:border-rose-400 focus:ring-rose-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-rose-700 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-rose-200 focus:border-rose-400 focus:ring-rose-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-400 hover:text-rose-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              {isLoading ? "Signing In..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-rose-500">Demo Credentials: admin@nazbeautyzone.com / nazadmin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
