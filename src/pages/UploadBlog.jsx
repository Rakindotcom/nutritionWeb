import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { Upload, LogOut, Eye } from 'lucide-react';
import { toast } from 'react-toastify';

const UploadBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');

  const [imagePreview, setImagePreview] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const { logout } = useAuth();
  const navigate = useNavigate();



  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !excerpt) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setUploadProgress('Starting upload...');

      console.log('Starting upload process...');

      // Use the image URL provided by user (Firebase Storage requires paid plan)
      let finalImageUrl = imageUrl;

      // Add blog post to Firestore
      setUploadProgress('Saving blog post...');
      console.log('Saving blog post to database...');
      try {
        const docRef = await addDoc(collection(db, 'blogs'), {
          title,
          content,
          excerpt,
          imageUrl: finalImageUrl,
          createdAt: serverTimestamp(),
          published: true
        });
        console.log('Blog post saved successfully with ID:', docRef.id);
      } catch (dbError) {
        console.error('Database save failed:', dbError);
        throw new Error(`Database save failed: ${dbError.message}`);
      }

      toast.success('Blog post uploaded successfully!');
      setTitle('');
      setContent('');
      setExcerpt('');
      setImageUrl('');
      setImagePreview('');

      // Redirect to blog page after 2 seconds
      setTimeout(() => {
        navigate('/blog');
      }, 2000);

    } catch (error) {
      const errorMessage = error.message || 'Failed to upload blog post. Please try again.';
      toast.error(errorMessage);
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-teal-600" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Create New Post</h1>
              </div>
              <p className="text-gray-600 text-lg">Share your knowledge and inspire others on their health journey</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/admin/manage')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
              >
                <Eye className="w-5 h-5" />
                Manage Posts
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all transform hover:scale-105 shadow-lg"
              >
                <Eye className="w-5 h-5" />
                View Blog
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>



        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3">
                Blog Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-lg"
                placeholder="Enter an engaging blog title"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-3">
                Excerpt *
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows="4"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
                placeholder="Write a compelling excerpt that summarizes your post..."
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-3">
                Featured Image URL
              </label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg (optional)"
              />
              {imagePreview && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-700 mb-3">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-80 mx-auto rounded-xl object-cover shadow-lg"
                    onError={() => setImagePreview('')}
                  />
                </div>
              )}
              <div className="mt-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-blue-800">Image Upload Note</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Firebase Storage requires a paid plan. Use free image hosting services like Unsplash, Pexels, or your own hosting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-3">
                Blog Content *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="16"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all font-mono text-sm leading-relaxed"
                placeholder="Write your blog content here... You can use markdown formatting for better structure."
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                Tip: Use clear headings, bullet points, and short paragraphs for better readability.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all transform shadow-lg ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 hover:scale-105 hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{uploadProgress || 'Publishing...'}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Publish Blog Post</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadBlog;