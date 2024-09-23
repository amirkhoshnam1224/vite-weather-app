import React from 'react';

const Footer = () => {
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
        <li>React.js with Redux Toolkit</li>
          <li>Tailwind CSS for styling</li>
          <li>OpenWeatherMap API for weather data</li>
          <li>Vite.js for fast development</li>
          <li>React Testing Library</li>
          <li>Jest and Cypress for testing</li>
          <li>Airbnb ESLint configuration</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
