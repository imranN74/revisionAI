import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  const { sharedOtp, userId } = await req.json();
  const otp = redis.get(`otp:${userId}`);
  try {
    if (sharedOtp != otp) {
      NextResponse.json(
        {
          status: false,
          message: "Invalid OTP!",
        },
        { status: 400 }
      );
    } else {
      NextResponse.json(
        {
          status: true,
          message: "OTP verified!",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    NextResponse.json(
      {
        status: false,
        message: "Error while verifying OTP",
      },
      { status: 500 }
    );
  }
}
