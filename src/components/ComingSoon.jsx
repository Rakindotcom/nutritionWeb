// ComingSoon.jsx
import { motion } from "framer-motion";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-800 to-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 text-center max-w-xl shadow-xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🚧 Coming Soon
        </h1>
        <p className="text-gray-200 text-lg md:text-xl mb-6">
          We're working hard to bring you something amazing.
        </p>
        <div className="animate-pulse text-white text-sm tracking-wide uppercase">
          Stay tuned!
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;