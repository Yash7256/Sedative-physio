import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Download, MessageCircle, Award, TrendingUp, Clock, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState({
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHours: 0,
    certificates: 0,
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch course enrollments
      const { data: enrollmentsData } = await supabase
        .from('course_enrollments')
        .select(`
          *,
          courses (
            title,
            featured_image,
            duration_hours
          )
        `)
        .eq('user_id', user?.id);

      if (enrollmentsData) {
        setEnrollments(enrollmentsData);
        
        // Calculate stats
        const completed = enrollmentsData.filter(e => e.completed).length;
        const inProgress = enrollmentsData.filter(e => !e.completed).length;
        const totalHours = enrollmentsData.reduce((acc, e) => acc + (e.courses?.duration_hours || 0), 0);
        
        setStats({
          coursesCompleted: completed,
          coursesInProgress: inProgress,
          totalHours,
          certificates: completed,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Redirect if not authenticated
  if (!loading && !user) {
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const quickStats = [
    { 
      icon: BookOpen, 
      label: 'Courses in Progress', 
      value: stats.coursesInProgress,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      icon: Award, 
      label: 'Completed Courses', 
      value: stats.coursesCompleted,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name || 'Student'}!
          </h1>
          <p className="text-gray-600">
            Continue your physiotherapy learning journey
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bg} rounded-xl p-6 border border-gray-100`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Continue Learning
                </h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>

              {enrollments.filter(e => !e.completed).length > 0 ? (
                <div className="space-y-4">
                  {enrollments.filter(e => !e.completed).slice(0, 3).map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <img
                        src={enrollment.courses?.featured_image || 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=150'}
                        alt={enrollment.courses?.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {enrollment.courses?.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${enrollment.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {enrollment.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">No courses in progress</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                    Browse Courses
                  </button>
                </div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[
                  { type: 'completed', text: 'Completed module: Advanced Manual Therapy', time: '2 hours ago' },
                  { type: 'started', text: 'Started course: Sports Injury Assessment', time: '1 day ago' },
                  { type: 'downloaded', text: 'Downloaded resource: Anatomy Reference Guide', time: '3 days ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === 'completed' ? 'bg-green-100' :
                      activity.type === 'started' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {activity.type === 'completed' && <Award className="w-4 h-4 text-green-600" />}
                      {activity.type === 'started' && <BookOpen className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'downloaded' && <Download className="w-4 h-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.text}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Learning Goals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Learning Goals
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Complete 5 courses</span>
                  <span className="text-sm font-medium text-blue-600">3/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full w-3/5" />
                </div>
              </div>
            </motion.div>

            {/* Recommended */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended for You
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Advanced Orthopedic Assessment',
                    category: 'Orthopedics',
                    duration: '6 hours',
                    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=150',
                  },
                  {
                    title: 'Neurological Rehabilitation Techniques',
                    category: 'Neurology',
                    duration: '8 hours',
                    image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=150',
                  },
                ].map((course, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {course.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {course.category} • {course.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Download Resources</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Join Discussion</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}