import { motion } from 'framer-motion'
import { CloudArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline'

const CreatePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create a <span className="gradient-text">Pin</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your inspiration with the world
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft p-8"
      >
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-pinterest-red transition-colors cursor-pointer">
          <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Drag and drop or click to upload
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            We recommend using high quality .jpg files less than 20MB
          </p>
          <button className="btn btn-primary btn-lg">
            <PhotoIcon className="w-5 h-5 mr-2" />
            Choose Files
          </button>
        </div>

        {/* Form Fields */}
        <div className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              className="input w-full"
              placeholder="Add a title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              className="input w-full resize-none"
              placeholder="Tell everyone what your Pin is about"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Board
              </label>
              <select className="input w-full">
                <option>Choose a board</option>
                <option>My Ideas</option>
                <option>Inspiration</option>
                <option>Design</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                className="input w-full"
                placeholder="Add tags separated by commas"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="btn btn-secondary btn-lg">
              Save as Draft
            </button>
            <button className="btn btn-primary btn-lg">
              Publish Pin
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CreatePage