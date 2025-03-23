"use server";
import { prisma } from "../lib/db";
import { sendOTp } from "./mailer";
import bcrypt from "bcrypt";

//_____SIGNUP FUNCTION___________
export async function signup(name: string, email: string) {
  try {
    const emailExists = await prisma.user.findFirst({
      where: { email: email, isActive: true },
    });
    if (emailExists) {
      return {
        status: false,
        message: "Email already exists!",
      };
    }
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

//______PASSWORD UPDATE_________
export async function updatePassword(
  userId: string | undefined,
  password: string
) {
  try {
    if (userId) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { id: userId },
        data: {
          password: hashedPassword,
        },
      });
      return {
        status: true,
        message: "Password created successfully",
      };
    } else {
      return {
        status: false,
        message: "User not found!, signup again",
      };
    }
  } catch (error) {
    return {
      status: false,
      message: "Something went wrong!",
    };
  }
}
