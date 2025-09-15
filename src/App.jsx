import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer.jsx'
import BMI from './pages/BMI.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Exercise from './pages/Exercise.jsx'
import Nutrition from './pages/Nutrition.jsx'
import Blog from './pages/Blog.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import UploadBlog from './pages/UploadBlog.jsx'
import BlogManage from './pages/BlogManage.jsx'
import NotFound from './pages/NotFound.jsx'

const App = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/bmi' element={<BMI />} />
        <Route path='/exercise' element={<Exercise />} />
        <Route path='/nutrition' element={<Nutrition />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/upload' element={
          <ProtectedRoute>
            <UploadBlog />
          </ProtectedRoute>
        } />
        <Route path='/admin/manage' element={
          <ProtectedRoute>
            <BlogManage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  )
}

export default App