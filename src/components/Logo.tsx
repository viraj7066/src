import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex items-center space-x-2 cursor-pointer">
        <img 
          src="https://3dnanocraft.in/wp-content/uploads/2024/03/1-300x169.png" 
          alt="Protoform Logo" 
          className="h-16 w-auto object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;