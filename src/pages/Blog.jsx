import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Calendar, Clock, User, X } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const blogData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBlogs(blogData);
    } catch (error) {
      setError('Failed to load blog posts');
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Health & Nutrition
            <span className="block text-teal-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover evidence-based insights, practical tips, and the latest research 
            on nutrition, wellness, and healthy living from our expert team.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Posts Yet</h3>
              <p className="text-gray-600">We're working on bringing you amazing content. Check back soon!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border-2 border-black"
              >
                {/* 5:4 Image */}
                {blog.imageUrl && (
                  <div className="relative overflow-hidden aspect-[5/4]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-teal-600" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-600" />
                      <span>{getReadingTime(blog.content)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3 flex-grow">
                    {blog.excerpt}
                  </p>

                  {/* Read More Button */}
                  <button 
                    onClick={() => setSelectedBlog(blog)}
                    className="inline-flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-full font-semibold hover:bg-teal-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg w-fit"
                  >
                    Read Full Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Blog Overlay Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl animate-slideUp">
            {/* Close Button */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-gray-900 pr-8">{selectedBlog.title}</h3>
              <button
                onClick={() => setSelectedBlog(null)}
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
              {/* Featured Image */}
              {selectedBlog.imageUrl && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img
                    src={selectedBlog.imageUrl}
                    alt={selectedBlog.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>{formatDate(selectedBlog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>{getReadingTime(selectedBlog.content)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-600" />
                  <span>HealthEdu Team</span>
                </div>
              </div>

              {/* Excerpt */}
              {selectedBlog.excerpt && (
                <div className="mb-6">
                  <p className="text-lg text-gray-700 italic leading-relaxed">
                    {selectedBlog.excerpt}
                  </p>
                </div>
              )}

              {/* Full Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selectedBlog.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;