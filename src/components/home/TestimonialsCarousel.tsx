import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Testimonial {
  id: string;
  name: string;
  avatar_url: string | null;
  rating: number;
  text: string;
  position: string | null;
}

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const fetchTestimonials = async () => {
    try {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .eq('featured', true)
        .order('created_at', { ascending: false });
      
      if (data) {
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8" />
              <div className="h-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of physiotherapy professionals who have transformed 
            their practice with our comprehensive education platform.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-blue-200" />
              
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  {testimonials[currentIndex].avatar_url ? (
                    <img
                      src={testimonials[currentIndex].avatar_url}
                      alt={testimonials[currentIndex].name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    "{testimonials[currentIndex].text}"
                  </blockquote>
                  
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    {testimonials[currentIndex].position && (
                      <div className="text-blue-600 font-medium">
                        {testimonials[currentIndex].position}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Auto-scrolling testimonials strip */}
        <div className="mt-16 overflow-hidden">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex space-x-8 w-max"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {testimonial.avatar_url ? (
                    <img
                      src={testimonial.avatar_url}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    {testimonial.position && (
                      <div className="text-sm text-gray-600">{testimonial.position}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-700 text-sm line-clamp-3">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}