import { motion } from 'framer-motion'

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="inline-block w-16 h-16 border-4 border-pinterest-red border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2
          className="mt-4 text-xl font-semibold text-gray-900 dark:text-white gradient-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading Prakriti...
        </motion.h2>
        <motion.p
          className="mt-2 text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Preparing your visual inspiration
        </motion.p>
      </div>
    </div>
  )
}

export default LoadingPage