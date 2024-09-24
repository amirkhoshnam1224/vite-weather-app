import React from 'react';
const Footer = () => {
  const technologies = [
    'React.js with Redux Toolkit',
    'Tailwind CSS for styling',
    'OpenWeatherMap API for weather data',
    'Vite.js for fast development',
    'React Testing Library',
    'Jest and Cypress for testing',
    'Airbnb ESLint configuration',
  ];
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="container mx-auto text-center">
        <p className="text-sm">Weather App © 2024</p>
        <p className="text-sm">Created by Amir Khoshnam</p>
        <p className="text-sm">
          <a 
            href="https://github.com/amirkhoshnam1224" 
            className="text-blue-400 hover:text-blue-300 transition duration-200 hover:underline" 
            target="_blank" 
            rel="noopener noreferrer">
            GitHub: amirkhoshnam1224
          </a>
        </p>
        <p className="text-sm mt-4">Technologies used in this project:</p>
        <ul className="list-none text-sm space-y-1">
          {technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
