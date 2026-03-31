import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/30 backdrop-blur-xl border-b border-sky-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center group cursor-pointer">
          <div className="p-2 bg-sky-100 rounded-xl mr-3 group-hover:bg-sky-200 transition-colors duration-300">
            <svg className="h-7 w-7 text-sky-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5V21M12 5C10 5 8 7 8 9M12 5C14 5 16 7 16 9M5 12H19M7 12C7 15.3137 9.68629 18 13 18C16.3137 18 19 15.3137 19 12M5 12C5 8.68629 7.68629 6 11 6" />
              <circle cx="12" cy="5" r="1.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gradient">
            AI Travel Planner
          </h1>
        </div>
        {/* Navigation links removed */}
      </div>
    </header>
  );
};

export default Header;