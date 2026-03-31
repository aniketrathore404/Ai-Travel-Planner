import React from 'react';
import PlannerApp from './components/PlannerApp';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <PlannerApp />
      </main>
      <Footer />
    </div>
  );
};

export default App;