"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { updatePassword } from "@/actions/user";

export default function ConfirmPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordMatched, setPasswordMatch] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useParams() as { userId: string };

  const router = useRouter();

  async function handleCreatePwdClick() {
    try {
      if (!password || !confirmPassword) {
        toast.error("Please enter password and confirm password!");
        setPasswordMatch(false);
      }
      if (password != confirmPassword) {
        setPasswordMatch(false);
      } else {
        setLoading(true);
        const data = await updatePassword(userId, password);
        console.log(data);
        toast.success(data?.message);
        setPasswordMatch(true);
        setLoading(false);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  type="password"
                  id="name"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Confirm Password</Label>
                <Input
                  type="password"
                  id="name"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={!passwordMatched ? "border border-red-500" : ""}
                />
              </div>
              <span>
                <p className="text-red-500">
                  {!passwordMatched ? "Password Mismatched!" : ""}
                </p>
              </span>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button disabled={loading} onClick={handleCreatePwdClick}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
