// Mock API endpoints for authentication
// In a real application, these would connect to your backend API

export const mockAuthApi = {
  async signUp(data: { name: string; email: string; password: string }) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (data.email === 'test@example.com') {
      throw new Error('Email already exists')
    }
    
    // Mock successful signup
    return {
      user: {
        id: '1',
        name: data.name,
        email: data.email,
        avatar: undefined
      },
      token: 'mock-jwt-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now()
    }
  },

  async signIn(data: { email: string; password: string }) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (data.email === 'test@example.com' && data.password === 'password123') {
      return {
        user: {
          id: '1',
          name: 'Test User',
          email: data.email,
          avatar: undefined
        },
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now()
      }
    }
    
    throw new Error('Invalid email or password')
  },

  async refreshToken(refreshToken: string) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      token: 'refreshed-jwt-token-' + Date.now()
    }
  },

  async logout() {
    await new Promise(resolve => setTimeout(resolve, 300))
    // Mock successful logout
  }
}
