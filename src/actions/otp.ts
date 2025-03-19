import { prisma } from "../lib/db";

export async function getOtp(userId: string) {
  console.log("running");
  try {
    console.log("userDataaaaa", userId);
    const response = await prisma.otp.findFirst({
      where: { userId: userId, isActive: true, isVerified: false },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(response);
    return { status: true, data: response };
  } catch (error) {
    console.log(error);
    return { status: false, error: error };
  }
}

export async function handleOtp(userId: string, otp: number) {
  try {
    await prisma.$transaction([
      prisma.otp.updateMany({
        where: { userId: userId, otp: otp },
        data: { isActive: false, isVerified: true },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { isVerified: true },
      }),
    ]);

    return { status: true, message: "OTP Verified!" };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: "Something went wrong while OTP verification",
    };
  }
}
