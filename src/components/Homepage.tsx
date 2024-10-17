'use client';
import React from 'react';

const Homepage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <header className="w-full py-6">
                <div className="text-center">
                    <h1 className="text-5xl font-bold tracking-wide">SPOTIFIRE</h1>
                    <p className="text-lg mt-4 font-light">Create, share, and manage Spotify music queues effortlessly</p>
                </div>
            </header>

            <main className="flex flex-col items-center space-y-8 mt-12">
                <button className="bg-white text-blue-500 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300">
                    Create a Room
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-500 font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300">
                    Join a Room
                </button>
            </main>

            <footer className="absolute bottom-4 text-center text-sm text-white/70">
                <p>&copy; 2024 Spotifire. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
