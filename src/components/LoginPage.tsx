'use client'
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
Link

const LoginPage = () => {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormdata(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata),
                credentials: 'include' // Include cookies in requests
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.error || 'Something went wrong');
            } else {
                setSuccessMessage(result.message || 'Login successful!');
                // Optionally redirect the user (e.g., to the dashboard or home page)
            }
        } catch (error) {
            setError('Network error, please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            placeholder="john@email.com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formdata.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
                <div className='text-center mt-4'>New to Spotifire?{" "} <Link href="/signup" className='hover:underline text-blue-500' >signup</Link> </div>

            </div>
        </div>
    );
};

export default LoginPage;
