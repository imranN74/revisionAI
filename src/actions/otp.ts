import { prisma } from "../db";

export async function getOtp(userId: string) {
  try {
    console.log(userId);
    const response = await prisma.otp.findFirst({
      where: { userId: userId, isActive: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { status: true, data: response };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
}

export async function handleOtp(userId: string) {
  try {
    const response = await prisma.$transaction([
      prisma.otp.updateMany({
        where: { userId: userId },
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
