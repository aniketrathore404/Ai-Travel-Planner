import React from 'react';

interface VisitAgainProps {
  onReset: () => void;
}

const VisitAgain: React.FC<VisitAgainProps> = ({ onReset }) => {
  return (
    <div className="text-center p-10 ui-card rounded-2xl animate-fade-in shadow-xl">
        <svg className="mx-auto h-20 w-20 text-sky-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m-2.25 9h4.5m-4.5 0a8.962 8.962 0 01-1.423-4.575M9.75 12a8.962 8.962 0 001.423-4.575m1.077 4.575a8.962 8.962 0 011.423 4.575M14.25 12a8.962 8.962 0 00-1.423 4.575M12 3v18" />
        </svg>

        <h2 className="mt-6 text-3xl font-bold text-sky-900">May the Winds Be in Your Favor</h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-lg">
            Your voyage plan is complete! We hope your journey is as smooth as glass. When you're ready to explore new horizons, we'll have your map ready.
        </p>
        <div className="mt-10">
            <button
              onClick={onReset}
              style={{backgroundColor: 'var(--deep-sea)'}}
              className="px-10 py-4 text-lg font-bold rounded-xl shadow-lg text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Plan New Voyage
            </button>
        </div>
    </div>
  );
};

export default VisitAgain;