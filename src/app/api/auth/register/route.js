import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req, res) {
  try {
    const { firstName, lastName, email, password } = await req.json()

    const hashed_password = await hash(password, 12)

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    })
    return NextResponse.json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}
