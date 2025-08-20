import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Star, Users, ArrowRight } from 'lucide-react';

type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  image: string;
  category: string;
};

const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Physical Therapy',
    description: 'Learn the fundamentals of physical therapy and rehabilitation techniques.',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    students: 1245,
    duration: '8 weeks',
    level: 'Beginner',
    image: 'https://source.unsplash.com/random/400x300/?physiotherapy',
    category: 'Physical Therapy'
  },
  {
    id: '2',
    title: 'Advanced Rehabilitation Techniques',
    description: 'Master advanced rehabilitation methods for sports injuries and post-surgery recovery.',
    instructor: 'Dr. Michael Chen',
    rating: 4.9,
    students: 892,
    duration: '10 weeks',
    level: 'Advanced',
    image: 'https://source.unsplash.com/random/400x300/?rehabilitation',
    category: 'Rehabilitation'
  },
  {
    id: '3',
    title: 'Pain Management Fundamentals',
    description: 'Understand and manage chronic pain through evidence-based physical therapy techniques.',
    instructor: 'Dr. Emily Wilson',
    rating: 4.7,
    students: 1560,
    duration: '6 weeks',
    level: 'Intermediate',
    image: 'https://source.unsplash.com/random/400x300/?pain,management',
    category: 'Pain Management'
  },
  {
    id: '4',
    title: 'Pediatric Physical Therapy',
    description: 'Specialized techniques for treating children with developmental disorders.',
    instructor: 'Dr. Robert Taylor',
    rating: 4.9,
    students: 745,
    duration: '8 weeks',
    level: 'Intermediate',
    image: 'https://source.unsplash.com/random/400x300/?pediatric,therapy',
    category: 'Pediatrics'
  }
];

const CourseCard = ({ course }: { course: Course }) => (
  <motion.div 
    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="h-48 bg-gray-200 overflow-hidden">
      <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {course.category}
        </span>
        <div className="flex items-center text-yellow-500">
          <Star className="w-4 h-4 fill-current" />
          <span className="ml-1 text-sm text-gray-700">{course.rating}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {course.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 h-16 line-clamp-3">
        {course.description}
      </p>
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Users className="w-4 h-4 mr-1" />
        <span className="mr-4">{course.students.toLocaleString()} students</span>
        <Clock className="w-4 h-4 mr-1" />
        <span>{course.duration}</span>
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
        <Link 
          to={`/course/${course.id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          View Details <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  </motion.div>
);

export const CoursesPage = () => {
  const categories = ['All', 'Physical Therapy', 'Rehabilitation', 'Pain Management', 'Pediatrics'];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Development Courses</h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover a wide range of courses designed to help you master new skills and advance your career.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for courses..."
                className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/3">
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                id="level"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 border rounded-l-lg bg-blue-600 text-white">
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`px-4 py-2 border-t border-b ${
                  num === 1 ? 'bg-blue-100 text-blue-700' : 'bg-white'
                }`}
              >
                {num}
              </button>
            ))}
            <button className="px-4 py-2 border rounded-r-lg bg-white hover:bg-gray-50">
              Next
            </button>
          </nav>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already advancing their careers with our courses.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Get Started for Free
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
