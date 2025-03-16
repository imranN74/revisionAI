"use server";

import nodemailer from "nodemailer";
import { generateOTP } from "otp-agent";
import { otpMail } from "./mailContent";
import { prisma } from "../db";

const senderMail = process.env.MAIL_ID;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderMail,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendOTp(user: { email: string; id: string }) {
  const OTP = generateOTP({ length: 4 });
  const subject = otpMail.subject;
  const body = otpMail.mailBody.replace(/{{otp}}/g, OTP);
  try {
    const response = await transporter.sendMail({
      from: senderMail,
      to: user.email,
      subject,
      html: body,
    });

    if (response.accepted.length > 0) {
      await prisma.otp.create({
        data: {
          otp: Number(OTP),
          userId: user.id,
        },
      });
      return { status: true, message: "OTP sent successfully" };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error while signing up",
    };
  }
}
