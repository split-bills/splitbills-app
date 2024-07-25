"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    console.log("Checking if authenticated");
    axios
      .get("http://localhost:8080/auth/check", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.authenticated) {
          console.log("Already authenticated!");
          router.push("/");
        } else {
          console.log("Not authenticated");
        }
      });
  }, [router]);

  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const setFirstName = (first_name: string) => {
    setSignUpDetails({ ...signUpDetails, firstName: first_name });
  };

  const setLastName = (last_name: string) => {
    setSignUpDetails({ ...signUpDetails, lastName: last_name });
  };

  const setEmail = (email: string) => {
    setSignUpDetails({ ...signUpDetails, email: email });
  };

  const setCurrentPassword = (password_value: string) => {
    setSignUpDetails({ ...signUpDetails, password: password_value });
  };

  const setConfirmPassword = (password_value: string) => {
    setSignUpDetails({ ...signUpDetails, confirm_password: password_value });
  };

  const submitSignUpDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(signUpDetails);
    if (signUpDetails.password !== signUpDetails.confirm_password) {
      toast.toast({
        title: "Passwords do not match",
        description: "Please check your password and try again.",
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        signUpDetails
      );
      console.log("Signed up successfully:", response.data);
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.toast({
        title: "Error creating account",
        description: "Please try again.",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm self-center m-16">
      <CardHeader>
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription>
          Enter your information to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="post" onSubmit={submitSignUpDetails}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="John"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                id="current_password"
                value={signUpDetails.password}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Confirm Password</Label>
              <PasswordInput
                id="confirm_password"
                value={signUpDetails.confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="confirm-password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
