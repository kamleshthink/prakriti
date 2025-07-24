import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  Bars3Icon,
  BellIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline'
import { useThemeStore } from '@/stores/themeStore'

interface HeaderProps {
  onMenuClick: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { theme, toggleTheme } = useThemeStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
          >
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-pinterest-red rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">P</span>
            </motion.div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Prakriti
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Explore
            </Link>
            <Link
              to="/create"
              className="px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Create
            </Link>
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for inspiration..."
                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pinterest-red focus:bg-white dark:focus:bg-gray-600 transition-all"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? (
              <SunIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            )}
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
          >
            <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-pinterest-red rounded-full"></span>
          </motion.button>

          {/* Messages */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ChatBubbleLeftIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </motion.button>

          {/* Create Button */}
          <Link to="/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <PlusIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </Link>

          {/* Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <UserCircleIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          </motion.button>
        </div>
      </div>
    </header>
  )
}

export default Header