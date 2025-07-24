import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon, BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

// Sample data for demo
const samplePins = [
  {
    id: 1,
    title: 'Beautiful Mountain Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    author: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    likes: 234,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 2,
    title: 'Modern Interior Design',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop',
    author: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    likes: 156,
    isLiked: true,
    isSaved: false,
  },
  {
    id: 3,
    title: 'Delicious Food Photography',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=550&fit=crop',
    author: 'Chef Mike',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    likes: 89,
    isLiked: false,
    isSaved: true,
  },
  {
    id: 4,
    title: 'Abstract Art Composition',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=700&fit=crop',
    author: 'Artist Anna',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    likes: 312,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 5,
    title: 'Urban Street Photography',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=450&fit=crop',
    author: 'Photo Pro',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
    likes: 187,
    isLiked: true,
    isSaved: true,
  },
  {
    id: 6,
    title: 'Nature Close-up',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
    author: 'Nature Lover',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
    likes: 95,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 7,
    title: 'Fashion Photography',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=650&fit=crop',
    author: 'Fashion Guru',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face',
    likes: 445,
    isLiked: false,
    isSaved: false,
  },
  {
    id: 8,
    title: 'Minimalist Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=500&fit=crop',
    author: 'Architect Pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    likes: 278,
    isLiked: true,
    isSaved: false,
  },
]

const HomePage = () => {
  const [pins, setPins] = useState(samplePins)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const toggleLike = (pinId: number) => {
    setPins(pins.map(pin => 
      pin.id === pinId 
        ? { 
            ...pin, 
            isLiked: !pin.isLiked,
            likes: pin.isLiked ? pin.likes - 1 : pin.likes + 1
          }
        : pin
    ))
  }

  const toggleSave = (pinId: number) => {
    setPins(pins.map(pin => 
      pin.id === pinId 
        ? { ...pin, isSaved: !pin.isSaved }
        : pin
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <motion.div
            className="inline-block w-8 h-8 border-2 border-pinterest-red border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading inspiration...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to <span className="gradient-text">Prakriti</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover millions of ideas for your next project. Get inspired by beautiful images, 
          creative designs, and amazing photography from our community.
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="masonry-grid">
        {pins.map((pin, index) => (
          <motion.div
            key={pin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="pin-card group"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay with actions */}
              <div className="pin-overlay">
                <div className="flex items-center space-x-2">
                  <img
                    src={pin.avatar}
                    alt={pin.author}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="text-white font-medium text-sm">{pin.author}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleLike(pin.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    {pin.isLiked ? (
                      <HeartSolidIcon className="w-5 h-5 text-pinterest-red" />
                    ) : (
                      <HeartIcon className="w-5 h-5 text-gray-700" />
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleSave(pin.id)}
                    className={`p-2 rounded-full shadow-md hover:shadow-lg transition-all ${
                      pin.isSaved 
                        ? 'bg-pinterest-red text-white' 
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    <BookmarkIcon className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ShareIcon className="w-5 h-5 text-gray-700" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 truncate-2">
                {pin.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{pin.likes} likes</span>
                <span>2 days ago</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <button className="px-8 py-3 bg-pinterest-red text-white rounded-full font-medium hover:bg-pinterest-red-dark transition-colors">
          Load More Pins
        </button>
      </motion.div>
    </div>
  )
}

export default HomePage