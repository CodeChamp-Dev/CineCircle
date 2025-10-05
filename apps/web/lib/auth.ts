// Authentication utilities and types

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

export interface SignUpData {
  name: string
  email: string
  password: string
}

export interface SignInData {
  email: string
  password: string
}

// Token management
export const TOKEN_KEY = 'cinecircle_token'
export const REFRESH_TOKEN_KEY = 'cinecircle_refresh_token'
export const USER_KEY = 'cinecircle_user'

export const getStoredToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export const getStoredRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem(USER_KEY)
  if (!userStr) return null
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const setStoredAuth = (authData: AuthResponse): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, authData.token)
  localStorage.setItem(USER_KEY, JSON.stringify(authData.user))
  if (authData.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken)
  }
}

export const clearStoredAuth = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// JWT token validation (basic)
export const isTokenValid = (token: string): boolean => {
  try {
    // For mock tokens, just check if they exist and are not empty
    if (token.startsWith('mock-jwt-token-') || token.startsWith('refreshed-jwt-token-')) {
      return true
    }
    
    // For real JWT tokens, validate expiration
    const payload = JSON.parse(atob(token.split('.')[1]))
    const now = Math.floor(Date.now() / 1000)
    return payload.exp > now
  } catch {
    return false
  }
}

// API endpoints - using mock implementation for demo
// Replace with actual API calls when backend is ready
import { mockAuthApi } from './mock-auth'

export const authApi = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    return mockAuthApi.signUp(data)
  },

  async signIn(data: SignInData): Promise<AuthResponse> {
    return mockAuthApi.signIn(data)
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    return mockAuthApi.refreshToken(refreshToken)
  },

  async logout(): Promise<void> {
    return mockAuthApi.logout()
  },
}
