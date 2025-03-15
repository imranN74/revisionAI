import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import OTPInput from "./OTPInput";
import { Button } from "./ui/button";

export default function OTPModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>One-Time Password</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-around">
              <OTPInput />
              <div className="py-2">
                Please enter the one-time password sent to your Email.
              </div>
              <Button className="cursor-pointer">Submit</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
