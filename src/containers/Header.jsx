import React from 'react';

const Header = () => {
  return (
    <header className=" bg-gradient-to-r from-blue-500 to-green-500 text-white  ">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold tracking-wide pt-6">React App</h1>
        <p className="text-sm mt-1">Your real-time weather forecast at your fingertips</p>
      </div>
    </header>
  );
};

export default Header;
