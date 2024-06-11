import { RegisterUserCredentials } from "@/app/signUp/page";
import { db } from "@/config/db";
import { error } from "console";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

// Definindo o schema de validação fora do handler para reutilização

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, confirmPassword, password } =
      (await request.json()) as RegisterUserCredentials;

    const userExists = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "Usuário para o email informado já existe!" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Senhas não combinam!" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: passwordHash,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
