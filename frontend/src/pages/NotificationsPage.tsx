import { motion } from 'framer-motion'

const NotificationsPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay updated with your activity
        </p>
      </motion.div>
    </div>
  )
}

export default NotificationsPage