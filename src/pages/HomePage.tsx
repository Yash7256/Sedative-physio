import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Star, Download, MessageCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { TestimonialsCarousel } from '../components/home/TestimonialsCarousel';

export function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Learn from industry leaders with hands-on experience and cutting-edge knowledge.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Download,
      title: 'Free Resources',
      description: 'Access comprehensive study materials, PDFs, and reference guides at no cost.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: MessageCircle,
      title: 'Active Community',
      description: 'Connect with peers, share experiences, and get answers from experts.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Award,
      title: 'Certified Learning',
      description: 'Earn recognized certifications to advance your professional career.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const stats = [
    { label: 'Active Learners', value: '12,500+', change: '+15% this month' },
    { label: 'Course Hours', value: '2,800+', change: 'New content weekly' },
    { label: 'Success Rate', value: '94%', change: 'Course completion' },
    { label: 'Expert Instructors', value: '150+', change: 'Industry professionals' },
  ];

  const recentBlogs = [
    {
      id: '1',
      title: 'Advanced Manual Therapy Techniques for Lower Back Pain',
      excerpt: 'Discover evidence-based manual therapy approaches that show significant improvement...',
      author: 'Dr. Sarah Mitchell',
      date: '2 days ago',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/4385547/pexels-photo-4385547.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Pain Management',
    },
    {
      id: '2',
      title: 'Sports Injury Prevention: A Comprehensive Guide',
      excerpt: 'Learn how to identify risk factors and implement prevention strategies for athletes...',
      author: 'Mike Johnson',
      date: '4 days ago',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Sports Physio',
    },
    {
      id: '3',
      title: 'Neuroplasticity in Stroke Rehabilitation',
      excerpt: 'Understanding how the brain adapts and recovers after stroke through targeted interventions...',
      author: 'Dr. Lisa Chen',
      date: '1 week ago',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3985357/pexels-photo-3985357.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Neurology',
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sedative Physio?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with expert knowledge 
              to deliver the most effective physiotherapy education experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our growing community of physiotherapy professionals continues to 
              achieve remarkable results with our educational platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                Latest Insights
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600"
              >
                Stay updated with the latest research and techniques
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/blogs"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{blog.author}</span>
                    <div className="flex items-center space-x-2">
                      <span>{blog.date}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Advance Your Career?
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join our community of physiotherapy professionals and start your 
              journey toward excellence today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors group"
              >
                <BookOpen className="w-5 h-5" />
                <span>Browse Courses</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Free Resources</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}