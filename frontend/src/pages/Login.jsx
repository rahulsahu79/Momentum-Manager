import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Validation schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("access", result.access);
        localStorage.setItem("refresh", result.refresh);
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.href = "/dashboard";
      } else {
        setServerError(result.detail || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setServerError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700 tracking-tight">TodoApp</h1>

      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/95 border border-gray-200 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-center p-6">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-3 drop-shadow-md" />
          <CardTitle className="text-2xl font-bold text-indigo-900">Welcome Back</CardTitle>
          <p className="text-sm text-gray-500 text-center">Login to continue managing your tasks</p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label className="text-gray-700 font-medium">Username</Label>
              <Input type="text" placeholder="Enter username" {...register("username")} className="mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-gray-900"/>
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div>
              <Label className="text-gray-700 font-medium">Password</Label>
              <Input type="password" placeholder="Enter password" {...register("password")} className="mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-gray-900"/>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}

            <Button type="submit" className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            Don’t have an account? <a href="/signup" className="text-indigo-600 font-medium hover:underline">Sign up</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
