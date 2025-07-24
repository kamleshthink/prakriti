import axios, { AxiosInstance } from 'axios'
import { ApiResponse, LoginCredentials, RegisterData, AuthResponse, User } from '@/types'

class AuthService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth-token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          try {
            const refreshToken = localStorage.getItem('refresh-token')
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken)
              if (response.success && response.data) {
                const { token } = response.data as AuthResponse
                this.setAuthToken(token)
                originalRequest.headers.Authorization = `Bearer ${token}`
                return this.api(originalRequest)
              }
            }
          } catch (refreshError) {
            this.clearAuthToken()
            window.location.href = '/auth/login'
          }
        }
        
        return Promise.reject(error)
      }
    )
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.api.post('/auth/login', credentials)
      
      if (response.data.success && response.data.data) {
        const { token, refreshToken } = response.data.data
        this.setAuthToken(token)
        if (refreshToken) {
          localStorage.setItem('refresh-token', refreshToken)
        }
      }
      
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async register(data: RegisterData): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.api.post('/auth/register', data)
      
      if (response.data.success && response.data.data) {
        const { token, refreshToken } = response.data.data
        this.setAuthToken(token)
        if (refreshToken) {
          localStorage.setItem('refresh-token', refreshToken)
        }
      }
      
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.clearAuthToken()
    }
  }

  async verifyToken(): Promise<ApiResponse<User>> {
    try {
      const response = await this.api.get('/auth/me')
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.api.post('/auth/refresh', { refreshToken })
      
      if (response.data.success && response.data.data) {
        const { token, refreshToken: newRefreshToken } = response.data.data
        this.setAuthToken(token)
        if (newRefreshToken) {
          localStorage.setItem('refresh-token', newRefreshToken)
        }
      }
      
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post('/auth/reset-password', { token, password })
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await this.api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      })
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async googleAuth(token: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.api.post('/auth/google', { token })
      
      if (response.data.success && response.data.data) {
        const { token: authToken, refreshToken } = response.data.data
        this.setAuthToken(authToken)
        if (refreshToken) {
          localStorage.setItem('refresh-token', refreshToken)
        }
      }
      
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  async facebookAuth(token: string): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await this.api.post('/auth/facebook', { token })
      
      if (response.data.success && response.data.data) {
        const { token: authToken, refreshToken } = response.data.data
        this.setAuthToken(authToken)
        if (refreshToken) {
          localStorage.setItem('refresh-token', refreshToken)
        }
      }
      
      return response.data
    } catch (error: any) {
      throw this.handleError(error)
    }
  }

  setAuthToken(token: string): void {
    localStorage.setItem('auth-token', token)
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  clearAuthToken(): void {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('refresh-token')
    delete this.api.defaults.headers.common['Authorization']
  }

  getAuthToken(): string | null {
    return localStorage.getItem('auth-token')
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken()
  }

  private handleError(error: any): Error {
    if (error.response?.data?.error) {
      const apiError = error.response.data.error
      const errorMessage = apiError.message || 'An error occurred'
      const customError = new Error(errorMessage)
      ;(customError as any).code = apiError.code
      ;(customError as any).statusCode = apiError.statusCode
      ;(customError as any).details = apiError.details
      return customError
    }
    
    if (error.response?.data?.message) {
      return new Error(error.response.data.message)
    }
    
    if (error.message) {
      return new Error(error.message)
    }
    
    return new Error('An unexpected error occurred')
  }
}

export const authService = new AuthService()