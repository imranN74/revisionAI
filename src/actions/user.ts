"use server";
import { prisma } from "../db";
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
  } catch (e) {
    console.log(e);
    return {
      status: false,
      message: "Error while signing up",
    };
  }
}
