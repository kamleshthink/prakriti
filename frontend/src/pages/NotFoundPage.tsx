import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HomeIcon } from '@heroicons/react/24/outline'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-pinterest-red text-white rounded-full font-medium hover:bg-pinterest-red-dark transition-colors"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage