import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Validation schema
const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  username: z.string().min(1, "Username is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().min(10, "Mobile number must be 10 digits"),
});

export default function SignupPage() {
  const [serverError, setServerError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = "/login";
      } else {
        setServerError(result.detail || "Signup failed. Try again.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setServerError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-extrabold mb-6 text-indigo-700 text-center tracking-tight drop-shadow-lg">
          TodoApp
        </h1>

        <Card className="shadow-2xl rounded-2xl bg-white/95 border border-gray-200 backdrop-blur-sm">
          <CardHeader className="flex flex-col items-center p-6">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-3 drop-shadow-md" />
            <CardTitle className="text-2xl font-bold text-indigo-900">Create Account</CardTitle>
            <p className="text-sm text-gray-500 text-center">
              Join us and start managing your tasks
            </p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <Label className="font-medium text-gray-700">Email</Label>
                <Input type="email" placeholder="Enter your email" {...register("email")} className="mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-gray-900"/>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Label className="font-medium text-gray-700">Username</Label>
                <Input type="text" placeholder="Enter username" {...register("username")} className="mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-gray-900"/>
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="font-medium text-gray-700">First Name</Label>
                  <Input type="text" placeholder="First name" {...register("firstName")} className="mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-gray-900"/>
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label className="font-medium text-gray-700">Last Name</Label>
                  <Input type="text" placeholder="Last name" {...register("lastName")} className="mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-gray-900"/>
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <Label className="font-medium text-gray-700">Password</Label>
                <Input type="password" placeholder="Enter password" {...register("password")} className="mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-gray-900"/>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <Label className="font-medium text-gray-700">Mobile Number</Label>
                <Input type="tel" placeholder="10-digit mobile" {...register("mobile")} className="mt-1 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-gray-900"/>
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
              </div>

              {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}

              <Button type="submit" className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account? <a href="/login" className="text-indigo-600 font-medium hover:underline">Login</a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
