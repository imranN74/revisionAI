"use server";

import nodemailer from "nodemailer";
import { generateOTP } from "otp-agent";
import { otpMail } from "./mailContent";
import redis from "@/lib/redis";

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
      const redisOtpKey = `otp:${user.id}`;
      redis.set(redisOtpKey, OTP, "EX", 300);
      return { status: true, message: "OTP sent successfully" };
    }
  } catch (error) {
    return {
      status: false,
      message: "Error while signing up",
    };
  }
}
