import { db } from "@/src/db/db";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod"
import { sign } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

const userSchema = z.object({
    email: z.string().min(1, "Email is required ").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "The password must have 8 characters ")
})


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = userSchema.parse(body);

        const user = await db.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return NextResponse.json({
                error: "Invalid email "
            }, { status: 401 })
        }

        const passwordCheck = await compare(password, user.password);
        console.log(user.password);

        if (!passwordCheck) {
            return NextResponse.json({
                error: "Invalid password"
            }, { status: 401 })
        }

        const token = sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });


        return NextResponse.json({
            message: "Login Successfully"
        }, { status: 200 })



    } catch (error) {
        console.log("error in users ");
        return NextResponse.json({
            error: `error in api/users ${error}`,

        }, { status: 404 })
    }

}