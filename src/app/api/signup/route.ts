import { db } from "@/src/db/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod"
import { generateCookie } from "@/src/utils/generateCookie";

const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(10),
    email: z.string().min(1, "Email is required ").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, "The password must have 8 characters ")
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, email, password } = userSchema.parse(body);

        const userExistByEmail = await db.user.findUnique({
            where: { email: email }
        })

        if (userExistByEmail) {
            return NextResponse.json({ msg: "Email already exist" }, { status: 409 })
        }

        const userExistByUsername = await db.user.findUnique({
            where: { username: username }
        })
        if (userExistByUsername) {
            return NextResponse.json({ msg: "Username already exist" }, { status: 409 })
        }

        const hashPassword = await hash(password, 10);


        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        })

        // generateCookie({ username: newUser.username, email: newUser.email });

        // exclude the password from the response
        // const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json({
            user: newUser,
            message: "User created successfully",
            cookie: generateCookie({ username: newUser.username, email: newUser.email })

        }, { status: 201 })



    } catch (error) {
        console.log("error in users ", error);
        return NextResponse.json({
            error: `error in api/users ${error}`,

        }, { status: 404 })
    }
}