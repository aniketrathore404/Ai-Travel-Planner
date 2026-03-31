import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Log entry requires both email and key.');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <div className="w-full max-w-md animate-fade-in mx-auto mt-12">
      <div className="ui-card p-10 rounded-[2rem]">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-sky-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-sky-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Log in to your voyage deck.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-sky-900 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="captain@oceanvoyager.com"
              className="w-full px-4 py-3 bg-white/50 border border-sky-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-900 placeholder-slate-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-sky-900 mb-2 ml-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/50 border border-sky-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-slate-900 placeholder-slate-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-sky-900 text-white font-bold rounded-xl shadow-lg hover:bg-sky-950 transform active:scale-95 transition-all duration-200"
          >
            Sign In
          </button>
          <p className="text-sm text-center text-slate-500">
            Need a cabin?{' '}
            <a href="#" className="font-bold text-coral hover:underline">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;