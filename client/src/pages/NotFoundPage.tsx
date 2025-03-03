import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Floating animation for the illustration
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Numbers that will float around randomly
  const floatingNumbers = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center p-4">
      <motion.div 
        className="container max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex flex-col lg:flex-row">
          {/* Content */}
          <motion.div 
            className="w-full lg:w-1/2 p-8 lg:p-16"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <span className="px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                404 Error
              </span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="mt-6 text-4xl font-bold text-gray-900 dark:text-white"
            >
              Page not found
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-gray-600 dark:text-gray-400"
            >
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              Don't worry, it happens to the best of us.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <motion.button 
                className="flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium transition-all hover:bg-gray-100 dark:hover:bg-gray-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </motion.button>
              
              <motion.button 
                className="flex items-center justify-center px-6 py-3 bg-indigo-600 rounded-lg text-white font-medium transition-all hover:bg-indigo-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Illustration */}
          <motion.div 
            className="w-full lg:w-1/2 p-8 lg:p-16 flex items-center justify-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Floating numbers background */}
            {floatingNumbers.map((num, index) => (
              <motion.div
                key={index}
                className="absolute text-3xl font-bold text-gray-200 dark:text-gray-700 select-none opacity-70"
                initial={{ 
                  x: Math.random() * 400 - 200, 
                  y: Math.random() * 400 - 200,
                  opacity: 0.3
                }}
                animate={{ 
                  x: Math.random() * 400 - 200, 
                  y: Math.random() * 400 - 200,
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 10 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {num % 4 === 0 ? '4' : num % 4 === 1 ? '0' : '4'}
              </motion.div>
            ))}

            {/* Main 404 illustration */}
            <motion.div
              className="relative z-10 text-center"
              animate={floatingAnimation}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 5, 0, -5, 0] }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.5,
                  rotate: {
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                  404
                </div>
              </motion.div>
              
              <motion.div
                className="w-64 h-64 bg-indigo-100 dark:bg-indigo-900/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              
              <motion.div
                className="mt-4 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-xl text-gray-600 dark:text-gray-400">
                  Lost in the digital space
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <motion.div 
        className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        © {new Date().getFullYear()} MentG | All rights reserved
      </motion.div>
    </div>
  );
};

export default NotFound;