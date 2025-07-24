import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const RegisterPage = () => {
  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Join Prakriti
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create your account to start exploring
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            <input
              type="text"
              className="input w-full"
              placeholder="First name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            <input
              type="text"
              className="input w-full"
              placeholder="Last name"
              required
            />
          </div>
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            className="input w-full"
            placeholder="Create a password"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full btn btn-primary btn-lg"
        >
          Create Account
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="text-pinterest-red hover:text-pinterest-red-dark font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage