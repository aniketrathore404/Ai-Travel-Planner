import React, { useState, useCallback } from 'react';
import { TripDetails } from '../types';
import { generateItinerary } from '../services/geminiService';
import TripForm from './TripForm';
import ItineraryDisplay from './ItineraryDisplay';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import Welcome from './Welcome';
import VisitAgain from './VisitAgain';

const PlannerApp: React.FC = () => {
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPlanner, setShowPlanner] = useState<boolean>(false);

  const handleFormSubmit = useCallback(async (details: TripDetails) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const result = await generateItinerary(details.from, details.to, details.budget, details.days);
      if (result.trim() === 'Error: Invalid location. Please write a correct location.') {
          setError('The current charts do not recognize this location. Please enter a valid port of call.');
      } else if (result.startsWith('Error:')) {
          setError(result.replace(/^Error: /, ''));
      } else {
          setItinerary(result);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected storm hit our servers.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartPlanning = useCallback(() => {
    setShowPlanner(true);
  }, []);

  const handleReset = useCallback(() => {
    setItinerary(null);
    setError(null);
    setShowPlanner(false);
  }, []);

  const handleReturnToWelcome = useCallback(() => {
    setShowPlanner(false);
  }, []);

  return (
    <>
      {!showPlanner ? (
        <Welcome onStart={handleStartPlanning} />
      ) : (
        <div className="w-full max-w-4xl animate-fade-in">
          <section id="planner" className="ui-card p-6 sm:p-10 rounded-2xl shadow-xl">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-sky-900 mb-2">Chart Your Course</h2>
                <p className="text-slate-500">Define your destination and resources to begin.</p>
              </div>
              <button
                onClick={handleReturnToWelcome}
                className="p-3 rounded-xl text-slate-400 hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200"
                aria-label="Return to shore"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
              </button>
            </div>
            <TripForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </section>

          <section id="results" className="mt-10">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {itinerary && <ItineraryDisplay content={itinerary} />}
          </section>
          
          {itinerary && !isLoading && (
            <section className="mt-12">
              <VisitAgain onReset={handleReset} />
            </section>
          )}
        </div>
      )}
    </>
  );
};

export default PlannerApp;