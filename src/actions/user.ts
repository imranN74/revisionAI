"use server";
import { prisma } from "../db";

export async function signup(name: string, email: string) {
  try {
    const response = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    return {
      message: "OTP sent successfully",
      data: response,
      status: true,
    };
  } catch (e) {
    console.log(e);
    return {
      message: "Error while signing up",
      status: false,
    };
  }
}
