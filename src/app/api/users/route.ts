import { db } from "@/src/db/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const { username, email, password } = body;

        if (!emailRegex.test(email)) {
            return NextResponse.json({
                message: "Email format is wrong"
            })
        }

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

        // exclude the password from the response
        const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json({
            user: rest,
            message: "User created successfully"
        }, { status: 201 })


    } catch (error) {
        console.log("error in users ", error);
        return NextResponse.json({
            error: "error in api/users"
        }, { status: 404 })
    }

}