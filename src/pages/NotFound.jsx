// pages/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-teal-900 to-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center text-white"
      >
        <h1 className="text-9xl font-extrabold tracking-widest text-white select-none mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500">
            404
          </span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-light mb-6">Page not found</h2>
        <p className="text-gray-300 mb-8">
          The page you’re looking for doesn’t exist. Check the link and try again.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-white text-teal-900 font-semibold rounded-full hover:bg-gray-200 transition"
        >
          Take me home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
