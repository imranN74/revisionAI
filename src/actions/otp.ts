"use server";

import redis from "@/lib/redis";

export async function verifyOtp(sharedOtp: string, userId: string) {
  const otp = await redis.get(`otp:${userId}`);
  try {
    if (sharedOtp) {
      if (sharedOtp != otp) {
        return {
          status: false,
          message: "Invalid OTP!",
        };
      } else {
        await redis.del(`otp:${userId}`);
        return {
          status: true,
          message: "OTP verified!",
        };
      }
    } else {
      return {
        status: false,
        message: "Please Enter OTP!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Error while verifying OTP",
    };
  }
}
