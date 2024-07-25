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

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const setEmail = (email: string) => {
    setLoginDetails({ ...loginDetails, email: email });
  };

  const setPassword = (password_value: string) => {
    setLoginDetails({ ...loginDetails, password: password_value });
  };

  const submitLoginDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting login details :", loginDetails);
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        loginDetails,
        { withCredentials: true }
      );
      console.log("logged in successfully:", response.data);
      if (response.data.authenticated) {
        router.push("/");
      } else {
        toast.toast({
          title: "Invalid login credentials",
          description: "Please check your email and password.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.toast({
        title: "Error logging in",
        description: "Please try again.",
      });
    }
  };

  return (
    <Card className="mx-auto w-fit self-center mt-20">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>Enter your information to login.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="post" onSubmit={submitLoginDetails}>
          <div className="grid gap-4 w-80">
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
                value={loginDetails.password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Do not have an account?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
