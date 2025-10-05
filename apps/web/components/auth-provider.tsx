"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, AuthResponse, SignUpData, SignInData, getStoredToken, getStoredUser, setStoredAuth, clearStoredAuth, isTokenValid, authApi } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signUp: (data: SignUpData) => Promise<void>
  signIn: (data: SignInData) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = !!user

  const clearError = () => setError(null)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        console.log('AuthProvider: Initializing auth state')
        const token = getStoredToken()
        const storedUser = getStoredUser()
        
        console.log('AuthProvider: Found token:', !!token)
        console.log('AuthProvider: Found user:', !!storedUser)

        if (token && storedUser && isTokenValid(token)) {
          console.log('AuthProvider: Valid token found, setting user')
          setUser(storedUser)
        } else {
          console.log('AuthProvider: Invalid or missing token, clearing storage')
          // Token is invalid or expired, clear storage
          clearStoredAuth()
        }
      } catch (err) {
        console.error('Auth initialization error:', err)
        clearStoredAuth()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signUp = async (data: SignUpData) => {
    try {
      setError(null)
      setIsLoading(true)
      
      const authResponse = await authApi.signUp(data)
      setStoredAuth(authResponse)
      setUser(authResponse.user)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Sign up failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (data: SignInData) => {
    try {
      setError(null)
      setIsLoading(true)
      
      console.log('AuthProvider: Starting sign in process')
      const authResponse = await authApi.signIn(data)
      console.log('AuthProvider: Sign in successful, storing auth data')
      setStoredAuth(authResponse)
      setUser(authResponse.user)
      console.log('AuthProvider: User state updated')
    } catch (err) {
      console.error('AuthProvider: Sign in error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Sign in failed'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      clearStoredAuth()
      setUser(null)
      setError(null)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    signUp,
    signIn,
    logout,
    error,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
