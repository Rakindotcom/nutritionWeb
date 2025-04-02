import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Contact from './pages/Contact.jsx'

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </>
  )
}

export default App