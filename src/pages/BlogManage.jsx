import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';
import { collection, getDocs, orderBy, query, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, Eye, LogOut, Save, X } from 'lucide-react';
import { toast } from 'react-toastify';

const BlogManage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: ''
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const { logout } = useAuth();
  const navigate = useNavigate();

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
      toast.error('Failed to load blog posts');
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog.id);
    setEditForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      imageUrl: blog.imageUrl || ''
    });
  };

  const handleSaveEdit = async () => {
    if (!editForm.title || !editForm.excerpt || !editForm.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const blogRef = doc(db, 'blogs', editingBlog);
      await updateDoc(blogRef, {
        title: editForm.title,
        excerpt: editForm.excerpt,
        content: editForm.content,
        imageUrl: editForm.imageUrl
      });
      
      setEditingBlog(null);
      toast.success('Blog post updated successfully!');
      fetchBlogs(); // Refresh the list
    } catch (error) {
      toast.error('Failed to update blog post');
      console.error('Error updating blog:', error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteDoc(doc(db, 'blogs', blogId));
      setDeleteConfirm(null);
      toast.success('Blog post deleted successfully!');
      fetchBlogs(); // Refresh the list
    } catch (error) {
      toast.error('Failed to delete blog post');
      console.error('Error deleting blog:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-gray-900">Blog Management</h1>
              </div>
              <p className="text-gray-600 text-lg">Manage your blog posts - create, edit, and organize your content</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate('/admin/upload')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all transform hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                New Post
              </button>
              <button
                onClick={() => navigate('/blog')}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
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



        {/* Blog Posts */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Posts Yet</h3>
              <p className="text-gray-600 mb-6">Create your first blog post to get started!</p>
              <button
                onClick={() => navigate('/admin/upload')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl hover:from-teal-700 hover:to-teal-800 transition-all transform hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Create First Post
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                {editingBlog === blog.id ? (
                  // Edit Mode
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Edit className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Edit Post</h3>
                    </div>
                    <div className="grid gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Title</label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Excerpt</label>
                        <textarea
                          value={editForm.excerpt}
                          onChange={(e) => setEditForm({...editForm, excerpt: e.target.value})}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Image URL</label>
                        <input
                          type="url"
                          value={editForm.imageUrl}
                          onChange={(e) => setEditForm({...editForm, imageUrl: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Content</label>
                        <textarea
                          value={editForm.content}
                          onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                          rows="10"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
                        />
                      </div>
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={handleSaveEdit}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingBlog(null)}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all transform hover:scale-105 shadow-lg"
                        >
                          <X className="w-5 h-5" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex flex-col lg:flex-row">
                    {blog.imageUrl && (
                      <div className="lg:w-80 flex-shrink-0">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{blog.title}</h3>
                          <p className="text-gray-600 mb-4 text-lg leading-relaxed">{blog.excerpt}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Published on {formatDate(blog.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-6">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all transform hover:scale-105"
                            title="Edit Post"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(blog.id)}
                            className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all transform hover:scale-105"
                            title="Delete Post"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-gray-700 leading-relaxed">
                        <p>{blog.content.substring(0, 300)}...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManage;