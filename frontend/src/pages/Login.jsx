import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Zod schema for validation
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Save tokens + user info
        localStorage.setItem("access", result.access);
        localStorage.setItem("refresh", result.refresh);
        localStorage.setItem("user", JSON.stringify(result.user));

        // Redirect to dashboard
        window.location.href = "/Dashboard";
      } else {
        setServerError(result.detail || "Login failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setServerError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      {/* App Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
        TodoApp
      </h1>

      {/* Login Card */}
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-100">
        <CardHeader className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 mb-3 drop-shadow-md"
          />
          <CardTitle className="text-2xl font-bold text-gray-800">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-gray-500">
            Login to continue managing your tasks
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <Label className="text-gray-700 font-medium">Username</Label>
              <Input
                type="text"
                placeholder="Enter username"
                {...register("username")}
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label className="text-gray-700 font-medium">Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                {...register("password")}
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <p className="text-red-600 text-sm text-center">{serverError}</p>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
