import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Play, ArrowRight, Users, BookOpen, Award, Check } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[url('/src/assets/hero-pattern.svg')] bg-cover bg-center opacity-10"
          aria-hidden="true"
        />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent"
          style={{
            backgroundSize: '200% 200%',
          }}
          aria-hidden="true"
        />
        {/* Floating Elements - Optimized */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => {
            const size = Math.random() * 4 + 2;
            const delay = Math.random() * 5;
            const duration = 15 + Math.random() * 20;
            const x = 10 + Math.random() * 80;
            const y = 10 + Math.random() * 80;
            
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -100, 0],
                  opacity: [0, 0.8, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: delay,
                  ease: 'easeInOut',
                }}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${x}%`,
                  top: `${y}%`,
                  filter: 'blur(1px)',
                }}
                aria-hidden="true"
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-16 sm:pt-20 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900/30 text-blue-300 mb-6 border border-blue-800/50"
            >
              <span className="h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              Join 10,000+ healthcare professionals
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Master <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Physiotherapy</span> with Expert Guidance
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform your career with our comprehensive physiotherapy courses, designed by industry experts and trusted by healthcare professionals worldwide.
            </motion.p>

            {/* Search Bar */}
            <motion.form 
              onSubmit={handleSearch}
              className="mt-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 border-0 bg-white/5 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
                  placeholder="Search courses, resources..."
                  aria-label="Search courses and resources"
                />
                <button
                  type="submit"
                  className="absolute inset-y-1 right-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
                >
                  Search
                </button>
              </div>
            </motion.form>

            {/* Features List */}
            <motion.ul 
              className="mt-8 grid grid-cols-2 gap-3 text-left max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-400 mr-2 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
              >
                Explore Courses
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                to="/free-trial"
                className="inline-flex items-center justify-center px-6 py-4 border border-gray-700 text-base font-medium rounded-xl text-white bg-transparent hover:bg-white/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-gray-900"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Image/Illustration */}
          <motion.div 
            className="relative mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-1">
              <div className="aspect-w-16 aspect-h-9 w-full h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full filter blur-3xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <motion.div 
        ref={statsRef}
        className={`relative ${isScrolled ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6,
                  delay: statsInView ? 0.1 * index : 0,
                  type: 'spring',
                  stiffness: 100,
                  damping: 10
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-5 w-5 text-white" />
                </span>
                <div className="flex items-start">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-400">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-white mt-1">{stat.value}</p>
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