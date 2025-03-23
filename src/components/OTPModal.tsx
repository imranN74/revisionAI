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
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/actions/otp";

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
  const [verified, setVerified] = useState(false);
  const router = useRouter();

  async function handleOtpVerification() {
    const data = await verifyOtp(otp, userId);
    if (!otp) {
      toast.error("Please enter OTP!");
    } else {
      if (data.status) {
        router.push(`/confirm-password/${userId}`);
        toast.success(data.message);
        setVerified(true);
      } else {
        toast.error(data.message);
        setVerified(true);
      }
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
                disabled={verified}
              >
                {verified ? "Verifying..." : "Submit"}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
