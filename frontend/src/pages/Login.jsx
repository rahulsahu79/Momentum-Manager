import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Zod schema for validation
const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data) => {
        console.log("Login Data:", data);
        // Later: send this to Django API
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader className="flex flex-col items-center">
                    <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-2" />
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Welcome Back
                    </CardTitle>
                    <p className="text-sm text-gray-500">Login to your account</p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Login Button */}
                        <Button type="submit" className="w-full mt-2">
                            Login
                        </Button>
                    </form>

                    {/* Signup link */}
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Don’t have an account?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
