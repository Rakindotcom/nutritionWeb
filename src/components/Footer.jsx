import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";  // Importing the necessary icons

const Footer = () => {
  const navItems = ["Home", "About", "Nutrition", "Exercise", "BMI", "Contact"];

  return (
    <footer className="bg-gray-700 text-white border-t-2 border-gray-600">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start">
            <img src="/healthedu.png" alt="HealthEduJourney Logo" className="h-12 w-auto mb-4" />
            <p className="font-bold text-lg text-center sm:text-left">
              Your Path to a Healthier Life
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link to={`/${item.toLowerCase()}`} className="text-white hover:text-gray-400 transition duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} className="text-white hover:text-gray-400 transition duration-200" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} className="text-white hover:text-gray-400 transition duration-200" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} className="text-white hover:text-gray-400 transition duration-200" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">
              <span className="font-bold">Email:</span> zobeda018@gmail.com
            </p>
            <p className="mb-2">
              <span className="font-bold">Phone:</span> +1 (669) 292-7682
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p>&copy; 2025 HealthEduJourney. All Rights Reserved.</p>
          <p>
            Developed By -{' '}
            <a href="https://www.linkedin.com/in/rakinalshahriar/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline hover:text-blue-300">
              Rakin al Shahriar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;