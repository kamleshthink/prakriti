import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types'
import { authService } from '@/services/authService'
import toast from 'react-hot-toast'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  updateUser: (user: Partial<User>) => void
  clearAuth: () => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        try {
          set({ isLoading: true })
          
          const response = await authService.login(credentials)
          
          if (response.success && response.data) {
            const { user, token, refreshToken } = response.data as AuthResponse
            
            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            })
            
            // Set token in axios defaults
            authService.setAuthToken(token)
            
            toast.success(`Welcome back, ${user.displayName}!`)
          } else {
            throw new Error(response.message || 'Login failed')
          }
        } catch (error: any) {
          set({ isLoading: false })
          toast.error(error.message || 'Login failed')
          throw error
        }
      },

      register: async (data: RegisterData) => {
        try {
          set({ isLoading: true })
          
          const response = await authService.register(data)
          
          if (response.success && response.data) {
            const { user, token, refreshToken } = response.data as AuthResponse
            
            set({
              user,
              token,
              refreshToken,
              isAuthenticated: true,
              isLoading: false,
            })
            
            // Set token in axios defaults
            authService.setAuthToken(token)
            
            toast.success(`Welcome to Prakriti, ${user.displayName}!`)
          } else {
            throw new Error(response.message || 'Registration failed')
          }
        } catch (error: any) {
          set({ isLoading: false })
          toast.error(error.message || 'Registration failed')
          throw error
        }
      },

      logout: () => {
        try {
          // Call logout API
          authService.logout()
          
          // Clear state
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
          })
          
          // Clear token from axios defaults
          authService.clearAuthToken()
          
          toast.success('Logged out successfully')
        } catch (error: any) {
          console.error('Logout error:', error)
          // Clear state anyway
          get().clearAuth()
        }
      },

      checkAuth: async () => {
        const { token, refreshToken } = get()
        
        if (!token) {
          set({ isLoading: false })
          return
        }
        
        try {
          set({ isLoading: true })
          
          // Set token in axios defaults
          authService.setAuthToken(token)
          
          // Verify token with server
          const response = await authService.verifyToken()
          
          if (response.success && response.data) {
            set({
              user: response.data as User,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            // Token is invalid, try to refresh
            if (refreshToken) {
              await get().refreshAuth()
            } else {
              get().clearAuth()
            }
          }
        } catch (error: any) {
          console.error('Auth check error:', error)
          
          // Try to refresh token if available
          if (refreshToken) {
            try {
              await get().refreshAuth()
            } catch (refreshError) {
              get().clearAuth()
            }
          } else {
            get().clearAuth()
          }
        }
      },

      refreshAuth: async () => {
        const { refreshToken } = get()
        
        if (!refreshToken) {
          get().clearAuth()
          return
        }
        
        try {
          const response = await authService.refreshToken(refreshToken)
          
          if (response.success && response.data) {
            const { user, token, refreshToken: newRefreshToken } = response.data as AuthResponse
            
            set({
              user,
              token,
              refreshToken: newRefreshToken,
              isAuthenticated: true,
              isLoading: false,
            })
            
            // Set new token in axios defaults
            authService.setAuthToken(token)
          } else {
            get().clearAuth()
          }
        } catch (error) {
          console.error('Token refresh error:', error)
          get().clearAuth()
        }
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get()
        if (user) {
          set({
            user: { ...user, ...userData },
          })
        }
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        })
        
        authService.clearAuthToken()
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)