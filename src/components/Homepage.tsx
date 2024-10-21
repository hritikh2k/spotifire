'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Homepage = () => {
    const router = useRouter();
    function handleSignup() {
        router.push("/signup");
    }
    function handleSubmit() {
        console.log("afsf");
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <div className="absolute top-0 right-10 m-4">
                <button className='bg-blue-600 rounded-full py-3 px-6 font-bold hover:text-blue-600 hover:bg-white'
                    onClick={handleSignup}>
                    Sign up
                </button>
            </div>
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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="RoomId">Room ID</label>
                    <input type="text" />
                </form>


            </main>

            <footer className="absolute bottom-4 text-center text-sm text-white/70">
                <p>&copy; 2024 Spotifire. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;
