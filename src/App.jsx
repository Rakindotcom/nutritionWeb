import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer.jsx'
import BMI from './pages/BMI.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'
import Exercise from './pages/Exercise.jsx'
import Nutrition from './pages/Nutrition.jsx'
import NotFound from './pages/NotFound.jsx'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/bmi' element={<BMI />} />
        <Route path='/exercise' element={<Exercise />} />
        <Route path='/nutrition' element={<Nutrition />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App