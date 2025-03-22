import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("got hit");
  const { sharedOtp, userId } = await req.json();
  // console.log("sharedOTP =========", sharedOtp);
  const otp = await redis.get(`otp:${userId}`);
  try {
    if (sharedOtp) {
      if (sharedOtp != otp) {
        return NextResponse.json(
          {
            status: false,
            message: "Invalid OTP!",
          },
          { status: 400 }
        );
      } else {
        await redis.del(`otp:${userId}`);
        return NextResponse.json(
          {
            status: true,
            message: "OTP verified!",
          },
          { status: 200 }
        );
      }
    } else {
      return NextResponse.json(
        {
          status: false,
          message: "Please Enter OTP!",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Error while verifying OTP",
      },
      { status: 500 }
    );
  }
}
