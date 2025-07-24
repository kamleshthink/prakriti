import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-pinterest-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <span className="text-3xl font-bold gradient-text">Prakriti</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your visual inspiration platform
          </p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8"
        >
          <Outlet />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          <p>&copy; 2024 Prakriti. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout