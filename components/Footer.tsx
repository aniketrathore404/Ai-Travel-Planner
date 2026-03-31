import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="mt-20 py-10 text-center">
            <div className="container mx-auto px-4">
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="#" className="text-sky-900/60 hover:text-sky-900 transition-colors"><span className="sr-only">Social</span> 🌊</a>
                    <a href="#" className="text-sky-900/60 hover:text-sky-900 transition-colors">🏝️</a>
                    <a href="#" className="text-sky-900/60 hover:text-sky-900 transition-colors">🚢</a>
                </div>
                <p className="text-sky-950/40 text-sm font-medium">
                    &copy; {new Date().getFullYear()} Ocean Voyager AI. Crafted for adventurous souls.
                </p>
            </div>
        </footer>
    );
};

export default Footer;