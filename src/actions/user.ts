"use server";
import { prisma } from "../lib/db";
import { sendOTp } from "./mailer";

export async function signup(name: string, email: string) {
  try {
    const response = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    const mailResponse = await sendOTp(response);
    return {
      status: true,
      data: response,
      message: mailResponse?.message,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error while signing up",
    };
  }
}
