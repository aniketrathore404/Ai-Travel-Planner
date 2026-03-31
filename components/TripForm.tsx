import React, { useState, useEffect, useRef } from 'react';
import type { TripDetails } from '../types';
import { getPlaceSuggestions } from '../services/geminiService';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

interface TripFormProps {
  onSubmit: (details: TripDetails) => void;
  isLoading: boolean;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [error, setError] = useState('');

  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<'from' | 'to' | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const debouncedFrom = useDebounce(from, 300);
  const debouncedTo = useDebounce(to, 300);
  const formRef = useRef<HTMLFormElement>(null);
  const suggestionsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (activeInput === 'from' && debouncedFrom.length > 2) {
        try {
          const suggestions = await getPlaceSuggestions(debouncedFrom);
          if (activeInput === 'from') {
            setFromSuggestions(suggestions);
            setHighlightedIndex(-1);
          }
        } catch (e) {
          console.error("Failed to fetch suggestions:", e);
        }
      } else {
        setFromSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedFrom, activeInput]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (activeInput === 'to' && debouncedTo.length > 2) {
        try {
          const suggestions = await getPlaceSuggestions(debouncedTo);
          if (activeInput === 'to') {
            setToSuggestions(suggestions);
            setHighlightedIndex(-1);
          }
        } catch (e) {
          console.error("Failed to fetch suggestions:", e);
        }
      } else {
        setToSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [debouncedTo, activeInput]);

  useEffect(() => {
    if (highlightedIndex < 0 || !suggestionsListRef.current) return;
    const list = suggestionsListRef.current;
    const highlightedItem = list.children[highlightedIndex] as HTMLLIElement;
    if (highlightedItem) {
      highlightedItem.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setActiveInput(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: string, field: 'from' | 'to') => {
    if (field === 'from') setFrom(suggestion);
    else setTo(suggestion);
    setActiveInput(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: 'from' | 'to') => {
    const suggestions = field === 'from' ? fromSuggestions : toSuggestions;
    if (!suggestions.length && e.key !== 'Escape') return;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            setHighlightedIndex(prev => (prev + 1) % suggestions.length);
            break;
        case 'ArrowUp':
            e.preventDefault();
            setHighlightedIndex(prev => (prev - 1 + suggestions.length) % suggestions.length);
            break;
        case 'Enter':
            if (highlightedIndex > -1) {
                e.preventDefault();
                handleSuggestionClick(suggestions[highlightedIndex], field);
            }
            break;
        case 'Escape':
            setActiveInput(null);
            break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !budget || !days) {
      setError('All fields are required.');
      return;
    }
    setError('');
    onSubmit({ from, to, budget, days });
  };
  
  const renderSuggestions = (suggestions: string[], field: 'from' | 'to') => {
    return (
      <ul
        ref={suggestionsListRef}
        id={`${field}-suggestions-listbox`}
        className="absolute z-10 w-full bg-white border border-sky-100 rounded-lg mt-1 shadow-xl max-h-60 overflow-auto"
        role="listbox"
      >
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            id={`${field}-suggestion-${index}`}
            onMouseDown={() => handleSuggestionClick(suggestion, field)}
            className={`px-4 py-2 cursor-pointer text-slate-700 hover:bg-sky-50 ${index === highlightedIndex ? 'bg-sky-100' : ''}`}
            role="option"
            aria-selected={index === highlightedIndex}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <label htmlFor="from" className="block text-sm font-medium text-sky-900 mb-1">
            Departing From
          </label>
          <input
            type="text"
            id="from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onFocus={() => setActiveInput('from')}
            onKeyDown={(e) => handleKeyDown(e, 'from')}
            placeholder="e.g., London, UK"
            className="w-full px-4 py-3 bg-white/50 border border-sky-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder-slate-400 transition-all"
            autoComplete="off"
          />
          {activeInput === 'from' && fromSuggestions.length > 0 && renderSuggestions(fromSuggestions, 'from')}
        </div>
        <div className="relative">
          <label htmlFor="to" className="block text-sm font-medium text-sky-900 mb-1">
            Destination
          </label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            onFocus={() => setActiveInput('to')}
            onKeyDown={(e) => handleKeyDown(e, 'to')}
            placeholder="e.g., Maldives"
            className="w-full px-4 py-3 bg-white/50 border border-sky-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder-slate-400 transition-all"
            autoComplete="off"
          />
          {activeInput === 'to' && toSuggestions.length > 0 && renderSuggestions(toSuggestions, 'to')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-sky-900 mb-1">
            Budget (INR)
          </label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g., 75000"
            className="w-full px-4 py-3 bg-white/50 border border-sky-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder-slate-400 transition-all"
          />
        </div>
        <div>
          <label htmlFor="days" className="block text-sm font-medium text-sky-900 mb-1">
            Days
          </label>
          <input
            type="number"
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="e.g., 5"
            className="w-full px-4 py-3 bg-white/50 border border-sky-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-slate-900 placeholder-slate-400 transition-all"
          />
        </div>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full group relative flex justify-center items-center px-6 py-5 border border-transparent text-xl font-bold rounded-2xl shadow-xl transition-all duration-300 transform active:scale-[0.98] ${
            isLoading 
              ? 'bg-slate-300 cursor-not-allowed text-white' 
              : 'bg-gradient-to-r from-sky-600 via-sky-500 to-teal-500 text-white hover:shadow-sky-200/50 hover:scale-[1.02] active:shadow-inner'
          }`}
        >
          {isLoading ? (
             <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Planning Trip...
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Generate your Plan</span>
              <svg className="w-6 h-6 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          )}
          {!isLoading && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          )}
        </button>
      </div>
    </form>
  );
};

export default TripForm;