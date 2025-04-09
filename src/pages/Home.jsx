import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi';
import HeroSlider from '../components/HeroSlider';

const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data for easier management
  const faqs = [
    {
      question: "How do I get started?",
      answer: "Simply explore our Nutrition, Exercise, and BMI Calculator sections. Choose resources that fit your goals, and begin your journey with our structured guides."
    },
    {
      question: "Do I need to sign up to access resources?",
      answer: "Access most content freely. Sign up for personalized plans and community features."
    },
    {
      question: "Can I get one-on-one coaching?",
      answer: "Yes! Contact us to book sessions with expert coaches for personalized plans."
    }
  ];

  const testimonials = [
    { text: "Health Edu Journey helped me lose 10 pounds!", author: "Fauzia Sultana" },
    { text: "The community support and motivation tips are incredible!", author: "Sanjida Islam" }
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* Enhanced Hero Section */}
      <section className="text-center py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-teal-800 mb-6">
            Start Your Health Journey Today
          </h1>
          <p className="mt-4 text-gray-700 text-lg md:text-xl leading-relaxed">
            Achieve better health through personalized nutrition, fitness, and wellness guidance. 
            <span className="block mt-2">Begin your transformation with our expert resources.</span>
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/about" 
              className="flex items-center justify-center gap-2 bg-teal-800 text-white py-3 px-8 rounded-full hover:bg-teal-700 transition-all duration-300 text-lg shadow-lg hover:shadow-teal-200"
            >
              Get Started
              <FiArrowRight className="inline-block" />
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center justify-center gap-2 border-2 border-teal-800 text-teal-800 py-3 px-8 rounded-full hover:bg-gray-200 transition-all duration-300 text-lg font-semibold"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      <HeroSlider />

      {/* Improved FAQ Section */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-teal-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 text-center mb-8">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                onClick={() => toggleFAQ(index)}
                className="group bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                role="button"
                tabIndex="0"
                aria-expanded={openFAQ === index}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg md:text-xl font-semibold text-teal-800 group-hover:text-teal-700">
                    {faq.question}
                  </h3>
                  <span className="text-teal-800 ml-4">
                    {openFAQ === index ? (
                      <FiChevronUp size={24} />
                    ) : (
                      <FiChevronDown size={24} />
                    )}
                  </span>
                </div>
                {openFAQ === index && (
                  <p className="mt-4 text-gray-700 leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 text-center mb-8">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-xl border-2 hover:border-[maroon] transition-all duration-200"
              >
                <p className="text-gray-700 text-lg italic">"{testimonial.text}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-800 font-semibold">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <h4 className="text-teal-800 font-semibold">
                    {testimonial.author}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic CTA Section */}
      <section className="bg-teal-800 text-white py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for a Healthier You?
          </h2>
          <p className="text-lg md:text-xl text-teal-100 mb-8">
            Join thousands who've transformed their lives through our program
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center gap-3 bg-white text-teal-800 py-4 px-10 rounded-full hover:bg-teal-100 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            Begin Your Transformation
            <FiArrowRight className="inline-block" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;