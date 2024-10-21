'use client'

import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link'

const SignupPage = () => {
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const [formdata, setFormdata] = useState({
        username: '',
        email: '',
        password: ''
    })

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormdata(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formdata),
                credentials: 'include' // Include cookies in requests
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.msg || result.error || 'Something went wrong');
            } else {
                setSuccessMessage('Successfully signed up!');
                // Optionally redirect the user (e.g., to the login page)
            }
        } catch (error) {
            setError('Network error, please try again later.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="john"
                            onChange={handleChange}
                            value={formdata.username}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@email.com"
                            onChange={handleChange}
                            value={formdata.email}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password"
                            onChange={handleChange}
                            value={formdata.password}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </form>
                <div className='text-center mt-4'>Already have an account?{" "} <Link href="/login" className='hover:underline text-blue-500' >login</Link> </div>
            </div>

        </div>
    )
}

export default SignupPage
