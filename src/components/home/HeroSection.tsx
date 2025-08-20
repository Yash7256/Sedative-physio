import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Users, BookOpen, Award, Check, Play } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { icon: Users, label: 'Active Learners', value: '10,000+', delay: 0.1 },
    { icon: BookOpen, label: 'Expert Courses', value: '150+', delay: 0.3 },
    { icon: Award, label: 'Certifications', value: '50+', delay: 0.5 },
  ];

  const features = [
    'Expert-Led Courses',
    'Hands-On Learning',
    'Flexible Scheduling',
    'Certification Ready'
  ];

  // Memoized handlers for performance
  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    // Add slight delay for better UX
    setTimeout(() => {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearching(false);
    }, 300);
  }, [searchQuery, navigate, isSearching]);

  const handleInputChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Animation variants for better organization
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('/src/assets/hero-pattern.svg')] bg-cover bg-center opacity-10"
          aria-hidden="true"
        />
        
        {/* Improved gradient animation */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)',
              'linear-gradient(225deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
          aria-hidden="true"
        />

        {/* Optimized floating elements with better performance */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => {
            const size = Math.random() * 6 + 3;
            const delay = Math.random() * 3;
            const duration = 12 + Math.random() * 8;
            const x = 15 + Math.random() * 70;
            const y = 15 + Math.random() * 70;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 backdrop-blur-sm"
                animate={{
                  x: [0, Math.random() * 200 - 100, 0],
                  y: [0, Math.random() * -150, 0],
                  opacity: [0, 0.6, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: "easeInOut",
                }}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${x}%`,
                  top: `${y}%`,
                  filter: 'blur(0.5px)',
                }}
                aria-hidden="true"
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-16 sm:pt-20 lg:pt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mx-auto text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full text-xs xs:text-sm font-medium bg-blue-900/30 text-blue-300 mb-4 sm:mb-6 border border-blue-800/50 hover:bg-blue-900/40 transition-all duration-300"
          >
            <span className="h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Join 10,000+ healthcare professionals
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight px-2 sm:px-0"
          >
            Master{' '}
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              Physiotherapy
            </motion.span>{' '}
            with Expert Guidance
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="mt-4 sm:mt-6 text-sm xs:text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            Transform your career with our comprehensive physiotherapy courses, designed by industry experts and trusted by healthcare professionals worldwide.
          </motion.p>

          {/* Enhanced Search Bar */}
          <motion.form 
            variants={itemVariants}
            onSubmit={handleSearch}
            className="mt-6 sm:mt-8 w-full max-w-2xl mx-auto px-2 sm:px-0"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors duration-200 ${
                  searchQuery ? 'text-blue-400' : 'text-gray-400'
                }`} aria-hidden="true" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                className="block w-full pl-12 pr-20 py-3 sm:py-4 text-sm sm:text-base border-0 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:bg-white/10 transition-all duration-200 h-12 sm:h-auto group-hover:bg-white/10"
                placeholder="Search courses, specializations, resources..."
                aria-label="Search courses and resources"
                disabled={isSearching}
              />
              <button
                type="submit"
                disabled={!searchQuery.trim() || isSearching}
                className="absolute inset-y-1 right-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm sm:text-base font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
              >
                {isSearching ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </motion.form>

          {/* Enhanced Feature Pills */}
          <motion.div 
            variants={itemVariants}
            className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 px-2 sm:px-0"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <Check className="w-3 h-3 text-green-400 mr-1" />
                {feature}
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0"
          >
            <Link
              to="/courses"
              className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border border-transparent text-sm sm:text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
            >
              Explore Courses
              <ArrowRight className="ml-2 -mr-1 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
            </Link>
            <Link
              to="/free-trial"
              className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border border-gray-600 text-sm sm:text-base font-medium rounded-xl text-white bg-transparent hover:bg-white/10 hover:border-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-900 backdrop-blur-sm"
            >
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              Start Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Stats Section */}
      <motion.div 
        ref={statsRef}
        className={`relative transition-all duration-500 ${
          isScrolled ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full text-center cursor-default"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8,
                  delay: statsInView ? 0.15 * index : 0,
                  type: 'spring',
                  stiffness: 100,
                  damping: 12
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </motion.div>
                  <div>
                    <p className="text-xs xs:text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </p>
                    <motion.p 
                      className="text-base sm:text-lg md:text-2xl font-bold text-white mt-0.5 sm:mt-1"
                      initial={{ scale: 0 }}
                      animate={statsInView ? { scale: 1 } : {}}
                      transition={{ delay: statsInView ? 0.3 + index * 0.1 : 0, type: 'spring' }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}