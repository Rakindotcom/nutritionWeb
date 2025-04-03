import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Contact from './pages/Contact.jsx'
import Footer from './components/Footer.jsx'
import BMI from './pages/BMI.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/bmi' element={<BMI />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App