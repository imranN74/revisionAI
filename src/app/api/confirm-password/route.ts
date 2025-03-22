import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { password, userId } = await req.json();
  //   console.log(`password-${password}/userIid-${userId}`);
  try {
    if (userId) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json(
        {
          status: true,
          message: "Password created successfully",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "User not found!, signup again",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
