import { db } from "@/src/db/db";
import { generateCookie } from "@/src/utils/generateCookie";
import { compare } from "bcrypt";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";
import * as z from "zod"
    ;

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

const userSchema = z.object({
    email: z.string().min(1, "Email is required ").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "The password must have 8 characters ")
})


export async function POST(req: Request) {
    try {
        const token = req.headers.get('cookie')?.split('=')[1];
        if (token) {
            try {
                verify(token, SECRET_KEY);
                return NextResponse.json({ message: "User already logged in" }, { status: 200 });
            } catch (error) {
                console.log("Invalid token, proceeding to login");
            }
        }

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


        return NextResponse.json({
            message: "Login Successfully",
            cookie: generateCookie({ username: user.username, email: user.email })
        }, { status: 200 })



    } catch (error) {
        console.log("error in users ");
        return NextResponse.json({
            error: `error in api/users ${error}`,

        }, { status: 404 })
    }

}