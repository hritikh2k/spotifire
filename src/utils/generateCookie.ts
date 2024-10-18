
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

interface UserPayload {
    username: string;
    email: string;
}

export function generateCookie(user: UserPayload) {

    const token = sign({ username: user.username, email: user.email }, SECRET_KEY, {
        expiresIn: '15d', // Token expiry (7 days)
    });

    // Create a response and set the token as a cookie
    const response = NextResponse.json({ message: 'Cookie generated' });

    response.cookies.set('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        maxAge: 15 * 24 * 60 * 60, // Cookie expires in 7 days
        path: '/' // Cookie is accessible across the entire app
    });

    return response;
}
