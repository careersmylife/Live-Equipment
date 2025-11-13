
import React from 'react';
import { TruckIcon } from './icons/TruckIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex items-center gap-4">
        <TruckIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">
          Port Equipment Monitoring Dashboard
        </h1>
      </div>
    </header>
  );
};

export default Header;
