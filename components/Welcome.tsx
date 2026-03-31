import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="text-center p-12 ui-card rounded-[2.5rem] w-full max-w-3xl animate-fade-in mx-auto mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-yellow-200/40 rounded-full blur-3xl"></div>
        
        <div className="relative inline-block">
          <svg className="h-24 w-24 text-teal-600 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21a4.5 4.5 0 01-4.5-4.5V5a2 2 0 012-2h4a2 2 0 012 2v12a4.5 4.5 0 01-4.5 4.5zM17 21a4.5 4.5 0 004.5-4.5V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4.5 4.5 0 004.5 4.5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v15" />
          </svg>
        </div>

        <h2 className="mt-8 text-4xl sm:text-5xl font-bold text-gradient leading-tight px-4">
          AI plans your journey—just tell us where to go.
        </h2>
        <p className="mt-6 text-xl text-slate-600 leading-relaxed max-w-xl mx-auto font-light px-4">
          Tell us your destination and AI will plan the trip. Choose a destination, AI handles the journey. Your trip, planned perfectly by AI.
        </p>
        
        <div className="mt-12 flex flex-col items-center gap-6">
            <button
              onClick={onStart}
              className="px-10 py-5 text-lg font-bold rounded-2xl shadow-xl text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Start your trip
            </button>

            <div className="max-w-md p-4 bg-sky-50/50 rounded-2xl border border-sky-100 mt-4">
              <p className="text-sm text-sky-800 leading-relaxed">
                <span className="font-bold">Note:</span> This tool uses AI to give you ideas. It is not a human travel agent. Please double-check your flight times, prices, and bookings before you leave! 🐚
              </p>
            </div>
        </div>
    </div>
  );
};

export default Welcome;