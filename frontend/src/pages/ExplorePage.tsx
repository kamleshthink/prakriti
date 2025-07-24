import { useState } from 'react'
import { motion } from 'framer-motion'
import { FireIcon, TrendingUpIcon } from '@heroicons/react/24/outline'

const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All', icon: '🌟' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'architecture', name: 'Architecture', icon: '🏛️' },
    { id: 'fashion', name: 'Fashion', icon: '👗' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
  ]

  const trendingTopics = [
    'Minimalist Design',
    'Vintage Photography',
    'Modern Architecture',
    'Street Style',
    'Plant-Based Recipes',
    'Landscape Photography',
    'Interior Design',
    'Abstract Art'
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
          <FireIcon className="w-8 h-8 text-pinterest-red" />
          Explore <span className="gradient-text">Trending</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover what's popular right now. Explore trending ideas, categories, and creative inspiration from our community.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-pinterest-red text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUpIcon className="w-6 h-6 text-pinterest-red" />
            Trending Now
          </h2>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <motion.span
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-pinterest-red hover:text-white transition-colors cursor-pointer"
              >
                #{topic.replace(' ', '').toLowerCase()}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Featured Collections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 aspect-[4/3]">
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Collection {item}</h3>
                  <p className="text-sm opacity-90">{Math.floor(Math.random() * 500) + 100} pins</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Popular Creators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Creators</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((creator, index) => (
            <motion.div
              key={creator}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="text-center group cursor-pointer"
            >
              <div className="relative mb-3">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 group-hover:scale-105 transition-transform"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pinterest-red rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Creator {creator}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{Math.floor(Math.random() * 50) + 10}k followers</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default ExplorePage