import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  systemTheme: 'light' | 'dark'
  actualTheme: 'light' | 'dark'
}

interface ThemeActions {
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initializeTheme: () => void
  updateSystemTheme: () => void
}

type ThemeStore = ThemeState & ThemeActions

// Function to get system theme preference
const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Function to calculate actual theme based on preference and system
const calculateActualTheme = (theme: Theme, systemTheme: 'light' | 'dark'): 'light' | 'dark' => {
  if (theme === 'system') return systemTheme
  return theme
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'system',
      systemTheme: getSystemTheme(),
      actualTheme: calculateActualTheme('system', getSystemTheme()),

      // Actions
      setTheme: (theme: Theme) => {
        const { systemTheme } = get()
        const actualTheme = calculateActualTheme(theme, systemTheme)
        
        set({ 
          theme, 
          actualTheme 
        })

        // Apply theme to document
        if (actualTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      },

      toggleTheme: () => {
        const { theme } = get()
        
        if (theme === 'light') {
          get().setTheme('dark')
        } else if (theme === 'dark') {
          get().setTheme('light')
        } else {
          // If system, toggle to opposite of current system theme
          const systemTheme = getSystemTheme()
          get().setTheme(systemTheme === 'light' ? 'dark' : 'light')
        }
      },

      initializeTheme: () => {
        const { theme } = get()
        const systemTheme = getSystemTheme()
        const actualTheme = calculateActualTheme(theme, systemTheme)
        
        set({ 
          systemTheme, 
          actualTheme 
        })

        // Apply theme to document
        if (actualTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        // Listen for system theme changes
        if (typeof window !== 'undefined') {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          
          const handleChange = (e: MediaQueryListEvent) => {
            get().updateSystemTheme()
          }
          
          mediaQuery.addEventListener('change', handleChange)
          
          // Cleanup function would be needed in a real app
          // return () => mediaQuery.removeEventListener('change', handleChange)
        }
      },

      updateSystemTheme: () => {
        const { theme } = get()
        const systemTheme = getSystemTheme()
        const actualTheme = calculateActualTheme(theme, systemTheme)
        
        set({ 
          systemTheme, 
          actualTheme 
        })

        // Apply theme to document if using system theme
        if (theme === 'system') {
          if (actualTheme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: (state) => ({
        theme: state.theme,
      }),
    }
  )
)