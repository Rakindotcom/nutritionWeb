import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // For dropdown icons

const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index); // Toggle the clicked FAQ
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 md:px-12">
        <h1 className="text-3xl md:text-5xl font-bold text-teal-800">
          Welcome to Health Edu Journey
        </h1>
        <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
          Your partner in achieving better health, nutrition, fitness, and overall wellness. Whether you're just starting out or looking to take your health journey to the next level, we’ve got the tools, tips, and support you need.
        </p>
        <Link 
          to="/about" 
          className="mt-6 inline-block bg-teal-800 text-white py-3 px-8 rounded-full hover:bg-teal-700 transition duration-300 text-lg"
        >
          Learn More About Us
        </Link>
      </section>

      {/* FAQ Section with Dropdown */}
      <section className="py-12 px-6 md:px-12 text-left">
        <h2 className="text-2xl md:text-3xl font-semibold text-teal-800">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-gray-700 text-lg">
          Here are answers to some of the most common questions we get. If you have any other questions, feel free to contact us!
        </p>
        <div className="mt-8 max-w-4xl mx-auto">
          <div 
            onClick={() => toggleFAQ(0)} 
            className="bg-gray-100 p-6 mb-4 rounded-lg shadow-md cursor-pointer"
          >
            <div className="w-full text-left text-xl font-semibold text-teal-800 flex items-center justify-between">
              <span>1. How do I get started?</span>
              <span>
                {openFAQ === 0 ? (
                  <FiChevronUp className="text-teal-800" />
                ) : (
                  <FiChevronDown className="text-teal-800" />
                )}
              </span>
            </div>
            {openFAQ === 0 && (
              <p className="text-gray-700 mt-2 text-justify">
                Simply explore the sections on our website like Nutrition, Exercise, and BMI Calculator. Choose the resources that best fit your goals, and begin your journey! We provide structured guides to ensure you don’t feel overwhelmed as you start.
              </p>
            )}
          </div>

          <div 
            onClick={() => toggleFAQ(1)} 
            className="bg-gray-100 p-6 mb-4 rounded-lg shadow-md cursor-pointer"
          >
            <div className="w-full text-left text-xl font-semibold text-teal-800 flex items-center justify-between">
              <span>2. Do I need to sign up to access the resources?</span>
              <span>
                {openFAQ === 1 ? (
                  <FiChevronUp className="text-teal-800" />
                ) : (
                  <FiChevronDown className="text-teal-800" />
                )}
              </span>
            </div>
            {openFAQ === 1 && (
              <p className="text-gray-700 mt-2 text-justify">
                No! You can access most of our content freely. If you’d like personalized plans or to connect with our community, you can sign up for free to unlock additional features and access exclusive content.
              </p>
            )}
          </div>

          <div 
            onClick={() => toggleFAQ(2)} 
            className="bg-gray-100 p-6 mb-4 rounded-lg shadow-md cursor-pointer"
          >
            <div className="w-full text-left text-xl font-semibold text-teal-800 flex items-center justify-between">
              <span>3. Can I get one-on-one coaching?</span>
              <span>
                {openFAQ === 2 ? (
                  <FiChevronUp className="text-teal-800" />
                ) : (
                  <FiChevronDown className="text-teal-800" />
                )}
              </span>
            </div>
            {openFAQ === 2 && (
              <p className="text-gray-700 mt-2 text-justify">
                Yes, we offer personalized coaching and consultations. Reach out to us through the Contact page for more information about booking a session with our expert coaches. We will work with you to set goals and build a personalized plan.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <section className="py-12 px-6 md:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-teal-800">
          What Our Members Are Saying
        </h2>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full sm:w-80">
            <p className="text-gray-700">"Health Edu Journey has been a game-changer for me. The workout guides are so easy to follow, and the meal plans helped me lose 10 pounds!"</p>
            <h4 className="mt-4 text-teal-800 font-semibold">- Sarah M.</h4>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full sm:w-80">
            <p className="text-gray-700">"I love the community support. The tips on how to stay motivated and consistent have been incredible!"</p>
            <h4 className="mt-4 text-teal-800 font-semibold">- James T.</h4>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-800 text-white text-center py-12 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-semibold">
          Ready to Take Control of Your Health?
        </h2>
        <p className="mt-3 text-lg max-w-2xl mx-auto">
          Join us today and start your personalized health journey. Whether you're looking for better nutrition, fitness, or overall wellness, we’re here to guide you!
        </p>
        <Link 
          to="/contact" 
          className="mt-6 inline-block bg-white text-teal-800 py-3 px-8 rounded-full hover:bg-teal-700 hover:text-white transition duration-300 text-lg"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;