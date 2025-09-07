"use client"

import { useState, useEffect } from "react"
import { type AdminUser, getAuthToken, clearAuthToken, setAuthToken, authenticateAdmin } from "@/lib/auth"

export const useAdminAuth = () => {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const authUser = getAuthToken()
      setUser(authUser)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const authUser = authenticateAdmin(email, password)

      if (authUser) {
        setAuthToken(authUser)
        setUser(authUser)
        return { success: true }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      return { success: false, error: "Authentication failed" }
    }
  }

  const logout = () => {
    clearAuthToken()
    setUser(null)
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  }
}
