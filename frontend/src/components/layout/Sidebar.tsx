import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  HomeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: MagnifyingGlassIcon, label: 'Explore', path: '/explore' },
    { icon: PlusIcon, label: 'Create', path: '/create' },
    { icon: BellIcon, label: 'Notifications', path: '/notifications' },
    { icon: ChatBubbleLeftIcon, label: 'Messages', path: '/messages' },
    { icon: UserIcon, label: 'Profile', path: '/profile/me' },
    { icon: Cog6ToothIcon, label: 'Settings', path: '/settings' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed left-0 top-0 z-50 w-80 h-full bg-white dark:bg-gray-800 shadow-xl lg:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pinterest-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold gradient-text">Prakriti</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; 2024 Prakriti</p>
              <p>Visual Inspiration Platform</p>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default Sidebar