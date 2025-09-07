export interface AdminUser {
  email: string
  name: string
  role: "admin"
}

export const ADMIN_CREDENTIALS = {
  email: "admin@nazbeautyzone.com",
  password: "nazadmin123",
  name: "Admin User",
}

export const authenticateAdmin = (email: string, password: string): AdminUser | null => {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return {
      email: ADMIN_CREDENTIALS.email,
      name: ADMIN_CREDENTIALS.name,
      role: "admin",
    }
  }
  return null
}

export const setAuthToken = (user: AdminUser): void => {
  const authData = {
    user,
    timestamp: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  }
  localStorage.setItem("adminAuth", JSON.stringify(authData))
}

export const getAuthToken = (): AdminUser | null => {
  try {
    const authData = localStorage.getItem("adminAuth")
    if (!authData) return null

    const parsed = JSON.parse(authData)

    // Check if token is expired
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem("adminAuth")
      return null
    }

    return parsed.user
  } catch {
    return null
  }
}

export const clearAuthToken = (): void => {
  localStorage.removeItem("adminAuth")
  localStorage.removeItem("adminAuthenticated") // Remove old auth method
}

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null
}
