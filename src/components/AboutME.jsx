const AboutME = () => {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white mb-3">
        <h1 className="text-4xl font-black text-center mb-6 border-b pb-2 text-teal-800">
          About Me
        </h1>
        
        <div className="relative">
          {/* Floated Image */}
          <img
            src="/hero.jpg"
            alt="Zobeda Khatun"
            className="float-left w-52 h-auto mr-6 mb-2 rounded-lg shadow-md"
          />
  
          {/* Newspaper-style Text */}
          <p className="text-gray-700 text-justify">
            Welcome to my website! I am <strong>Zobeda Khatun</strong>, a dedicated professional with a strong academic foundation in <strong>Food and Nutrition, Health Education, and Human Services</strong>. My journey in education began with a <strong>Bachelor’s and MPhil</strong> in Food and Nutrition from the <strong>University of Dhaka, Bangladesh</strong>, which provided me with an in-depth understanding of <strong>nutrition, wellness, and dietary sciences</strong>.
          </p>
  
          <p className="text-gray-700 text-justify mt-4">
            Continuing my passion for health and education, I earned a <strong>Master’s in Education, Health, and Human Services</strong> from <strong>Kent State University, Ohio, USA</strong>, and pursued <strong>27 credit hours toward a PhD</strong> in <strong>Health Education and Promotion</strong>. My academic and professional experiences have allowed me to develop expertise in <strong>public health, nutrition education, wellness promotion, and community engagement</strong>.
          </p>
  
          <p className="text-gray-700 text-justify mt-4">
            With my diverse academic background and passion for educating others, I am committed to providing <strong>reliable, research-backed information</strong> and <strong>practical advice</strong> to help individuals achieve their <strong>health goals</strong>. Whether it’s through <strong>nutrition guidance, promoting wellness</strong>, or <strong>sharing insights on holistic health</strong>, my mission is to <strong>inspire positive lifestyle changes</strong> that lead to long-term well-being.
          </p>
        </div>
      </div>
    );
  };
  
  export default AboutME;  