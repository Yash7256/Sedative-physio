import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Users, BookOpen, Award } from 'lucide-react';

export function HeroSection() {
  const stats = [
    { icon: Users, label: 'Active Learners', value: '10,000+' },
    { icon: BookOpen, label: 'Expert Courses', value: '150+' },
    { icon: Award, label: 'Certifications', value: '50+' },
  ];

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"
          style={{
            backgroundSize: '200% 200%',
          }}
        />
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-600/20 rounded-full px-4 py-2 mb-6 border border-blue-400/30"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-300">
                New Course Series Available
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Master Modern
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {' '}Physiotherapy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Join thousands of professionals advancing their careers with 
              evidence-based courses, expert insights, and cutting-edge techniques 
              in physiotherapy and rehabilitation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                to="/courses"
                className="group inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/25"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group inline-flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                >
                  <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Visual */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Interactive Learning</h3>
                      <p className="text-gray-400 text-sm">Hands-on exercises and simulations</p>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ['0%', '75%'] }}
                      transition={{ duration: 2, delay: 1 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {['Anatomy', 'Biomechanics', 'Rehabilitation', 'Assessment'].map((topic, i) => (
                      <motion.div
                        key={topic}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1 }}
                        className="bg-white/5 rounded-lg p-3 text-center border border-white/10"
                      >
                        <div className="text-white font-medium text-sm">{topic}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl" />
              
              {/* Floating Cards */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-4 -right-4 w-24 h-32 bg-gradient-to-br from-green-400/20 to-green-600/20 backdrop-blur-sm rounded-lg border border-green-400/30 p-3"
              >
                <div className="text-green-400 text-sm font-semibold mb-2">Progress</div>
                <div className="text-white text-xl font-bold">89%</div>
              </motion.div>
              
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, -5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 w-28 h-20 bg-gradient-to-br from-orange-400/20 to-orange-600/20 backdrop-blur-sm rounded-lg border border-orange-400/30 p-3"
              >
                <div className="text-orange-400 text-xs font-semibold mb-1">Certification</div>
                <div className="text-white text-sm font-bold">Available</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}