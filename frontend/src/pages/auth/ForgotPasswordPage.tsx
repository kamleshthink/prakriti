import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ForgotPasswordPage = () => {
  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Reset Password
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your email to receive reset instructions
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            className="input w-full"
            placeholder="Enter your email"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn btn-primary btn-lg"
        >
          Send Reset Link
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/auth/login"
          className="text-sm text-pinterest-red hover:text-pinterest-red-dark"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage