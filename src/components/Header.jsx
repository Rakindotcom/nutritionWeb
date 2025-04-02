import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Closes the mobile menu when a nav link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navItems = ["Home", "About", "Nutrition", "Exercise", "BMI", "Donate", "Contact"];

  return (
    <header className="bg-white py-4 mb-5">
      <div className="flex items-center justify-between sm:justify-around px-6 mb-4 pb-2 border-b-2 border-gray-300">
        <img src="healthedu.png" alt="HealthEduJourney Logo" className="h-10 w-auto" />
        <p className="font-bold text-xl text-[maroon] hidden sm:block">
          Your Path to a Healthier Life
        </p>
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <nav className="max-w-6xl mx-auto border-b-2 pb-2 border-gray-500">
        <ul
          className={`bg-[#fcfbfc] rounded-lg text-center ${
            isOpen
              ? "flex flex-col justify-between p-4"
              : "hidden sm:flex sm:flex-row sm:justify-around"
          }`}
        >
          {navItems.map((item, index) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            return (
              <li key={index} className="relative">
                <Link
                  to={path}
                  onClick={handleLinkClick}
                  className="block py-4 px-7 transition-all duration-300 cursor-pointer bg-gray-100 text-gray-800 font-semibold rounded-lg text-center hover:bg-green-500 hover:text-white"
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;