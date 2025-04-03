import React from 'react'
import AboutME from '../components/AboutME'
import Vision from '../components/Vision'
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
    <AboutME />
    <Vision />
    <div className="bg-white text-gray-900 p-6 md:p-10 text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        Get Involved – Join the <span className="text-teal-800">Health Edu Journey</span> Community!
      </h2>
      <p className="mb-4 px-4 text-sm md:text-base text-justify-last-center font-medium text-gray-700">
        At Health Edu Journey, we believe that wellness is a shared experience. Whether you're looking to improve your nutrition, 
        build a fitness routine, or simply stay motivated on your health journey, we want you to be part of our growing community!
      </p>
      <Link 
        to="/contact" 
        className="bg-teal-800 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition duration-300 inline-block"
      >
        Contact Us
      </Link>
    </div>
    </>
  )
}

export default About