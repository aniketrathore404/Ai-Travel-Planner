import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-16 ui-card rounded-3xl animate-fade-in max-w-xl mx-auto">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-32 w-32 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin"></div>
        <svg className="h-12 w-12 text-teal-500 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m-2.25 9h4.5m-4.5 0a8.962 8.962 0 01-1.423-4.575M9.75 12a8.962 8.962 0 001.423-4.575m1.077 4.575a8.962 8.962 0 011.423 4.575M14.25 12a8.962 8.962 0 00-1.423 4.575M12 3v18" />
        </svg>
      </div>
      <h3 className="mt-12 text-3xl font-bold text-sky-900 tracking-tight">Charting New Horizons...</h3>
      <p className="mt-4 text-slate-500 text-center max-w-sm font-light">
        Our AI captain is mapping out your destination. High tide is bringing the perfect plan.
      </p>
    </div>
  );
};

export default LoadingSpinner;