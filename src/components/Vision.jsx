import React from 'react';

const Vision = () => {
  return (
    <div className="bg-teal-800 mt-6 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Our Vision & Mission</h2>
        <div className="space-y-8">
          {/* Mission Statement */}
          <div className="bg-teal-900 px-3 md:px-6 py-6 rounded-lg shadow-lg border">
            <h3 className="text-3xl font-semibold mb-2 text-amber-300">Mission Statement</h3>
            <p className="text-lg text-justify-last-center">
              At Health Edu Journey, oour mission is to empower individuals and communities by providing evidence-based knowledge, practical tools, and personalized guidance in the areas of health, wellness, and nutrition. We aim to inspire positive lifestyle changes, promote lifelong learning, and encourage holistic well-being through education, engagement, and expert insights.
            </p>
          </div>

          {/* Vision Statement */}
          <div className="bg-teal-900 px-3 md:px-6 py-6 rounded-lg shadow-lg border">
            <h3 className="text-3xl text-amber-300 font-semibold mb-2">Vision Statement</h3>
            <p className="text-lg text-justify-last-center">
            Our vision is to be a trusted, globally recognized platform that bridges the gap between scientific research and everyday health practices. We strive to create a healthier world where individuals make informed choices about their nutrition, wellness, and overall health, fostering a balanced, thriving, and sustainable lifestyle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;