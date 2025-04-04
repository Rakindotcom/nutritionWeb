import React, { useState } from 'react';

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [idealWeight, setIdealWeight] = useState('');

  const calculateBMI = () => {
    let heightInMeters;

    if (heightUnit === 'cm') {
      heightInMeters = height / 100;
    } else {
      const totalHeightInInches = parseInt(heightFeet, 10) * 12 + parseInt(heightInches, 10);
      heightInMeters = totalHeightInInches * 0.0254;
    }

    let weightInKg = weightUnit === 'kg' ? weight : weight * 0.453592;

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }

    // Calculate Ideal Weight Range
    const minWeight = 18.5 * (heightInMeters ** 2);
    const maxWeight = 24.9 * (heightInMeters ** 2);
    setIdealWeight(`Your ideal weight is between ${minWeight.toFixed(1)} kg and ${maxWeight.toFixed(1)} kg.`);
  };

  // Handle Inches Input
  const handleInchesChange = (value) => {
    let inches = parseInt(value, 10);
    if (inches < 0) inches = 0; // Prevent negative values
    if (inches >= 12) {
      setHeightFeet((prevFeet) => (prevFeet ? parseInt(prevFeet, 10) + Math.floor(inches / 12) : Math.floor(inches / 12)));
      setHeightInches(inches % 12);
    } else {
      setHeightInches(inches);
    }
  };

  // Handle Preventing Negative Inputs
  const handleNumberInput = (value, setter) => {
    if (value < 0) {
      setter(0); // Reset to 0 if negative
    } else {
      setter(value);
    }
  };

  return (
    <div className="max-w-lg mx-auto mb-4">
      {/* Teal Background Box */}
      <div className="p-6 bg-teal-800 shadow-lg rounded-2xl">
        <h2 className="text-4xl text-center font-extrabold text-white mb-6">
          BMI Calculator
        </h2>

        <div className="space-y-6">
          {/* Weight Input */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <label className="block text-sm font-medium text-gray-800">Weight:</label>
            <div className="flex flex-wrap sm:flex-nowrap sm:space-x-4 mt-2">
              <input
                type="number"
                value={weight}
                onChange={(e) => handleNumberInput(e.target.value, setWeight)}
                className="w-full p-3 border border-black rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500"
                placeholder="Enter weight"
                min="0"
              />
              <select
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                className="w-full sm:w-auto p-3 border border-black rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 mt-2 sm:mt-0"
              >
                <option value="kg">kg</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>

          {/* Height Input */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <label className="block text-sm font-medium text-gray-800">Height:</label>
            <div className="flex flex-wrap sm:flex-nowrap sm:space-x-4 mt-2">
              {heightUnit === 'cm' ? (
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleNumberInput(e.target.value, setHeight)}
                  className="w-full p-3 border border-black rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter height in cm"
                  min="0"
                />
              ) : (
                <>
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => handleNumberInput(e.target.value, setHeightFeet)}
                    className="w-full p-3 border border-black rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500"
                    placeholder="Feet"
                    min="0"
                  />
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => handleInchesChange(e.target.value)}
                    className="w-full p-3 border border-black rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 mt-2 sm:mt-0"
                    placeholder="Inches"
                    min="0"
                  />
                </>
              )}
              <select
                value={heightUnit}
                onChange={(e) => {
                  setHeightUnit(e.target.value);
                  setHeight('');
                  setHeightFeet('');
                  setHeightInches('');
                }}
                className="w-full sm:w-auto p-3 border border-black rounded-md text-gray-700 focus:ring-2 focus:ring-teal-500 mt-2 sm:mt-0"
              >
                <option value="cm">cm</option>
                <option value="ft">ft/inches</option>
              </select>
            </div>
          </div>

          {/* Calculate BMI Button */}
          <button
            onClick={calculateBMI}
            className="w-full py-3 bg-blue-900 text-white rounded-md text-xl font-semibold hover:bg-blue-950 transition duration-300"
          >
            Calculate BMI
          </button>
        </div>
      </div>

      {/* BMI & Ideal Weight Display Outside the Box */}
      {bmi && (
        <div className="mt-8 text-center">
          <h3 className="text-3xl font-semibold text-black">Your BMI: {bmi}</h3>
          <p className="mt-2 text-xl text-gray-800">Category: {category}</p>
        </div>
      )}

      {idealWeight && (
        <div className="mt-2 text-center">
          <p className="font-semibold text-[maroon]">* {idealWeight}</p>
        </div>
      )}
    </div>
  );
};

export default BMI;