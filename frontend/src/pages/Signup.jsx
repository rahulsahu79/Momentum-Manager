import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Zod schema for validation
const signupSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
});

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        alert("Signup failed. Check console for details.");
        return;
      }

      const result = await response.json();
      console.log("Signup successful:", result);
      alert("Signup successful! You can now login.");
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      {/* App Title */}
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 tracking-tight">
        TodoApp
      </h1>

      {/* Signup Card */}
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-100">
        <CardHeader className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 mb-3 drop-shadow-md"
          />
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create Account
          </CardTitle>
          <p className="text-sm text-gray-500">
            Join us and start managing your tasks
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <Label className="font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <Label className="font-medium text-gray-700">Username</Label>
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

            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-medium text-gray-700">First Name</Label>
                <Input
                  type="text"
                  placeholder="First name"
                  {...register("firstName")}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="font-medium text-gray-700">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Last name"
                  {...register("lastName")}
                  className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <Label className="font-medium text-gray-700">Password</Label>
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

            {/* Mobile */}
            <div>
              <Label className="font-medium text-gray-700">Mobile Number</Label>
              <Input
                type="tel"
                placeholder="10-digit mobile"
                {...register("mobile")}
                className="mt-1 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-5">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
