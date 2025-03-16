"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OTPInput from "./OTPInput";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { handleOtp, getOtp } from "@/actions/otp";

export default function OTPModal({
  open,
  setOpen,
  userId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
}) {
  const [otp, setOtp] = useState<string>("");

  async function handleOtpVerification() {
    const { data } = await getOtp(userId);
    console.log("data", data);
    if (data && data.otp === Number(otp)) {
      const otpResponse = await handleOtp(data?.id);
      toast.success(otpResponse?.message);
    } else {
      toast.error("Invalid OTP!");
    }
    setOtp("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>One-Time Password</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-around">
              <OTPInput otp={otp} setOtp={setOtp} />
              <div className="py-2">
                Please enter the one-time password sent to your Email.
              </div>
              <Button
                className="cursor-pointer"
                onClick={handleOtpVerification}
              >
                Submit
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
