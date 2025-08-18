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
    mobile: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
});

export default function SignUpPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (data) => {
        console.log("Signup Data:", data);
        // Later: send this to Django
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow-lg rounded-2xl">
                <CardHeader className="flex flex-col items-center">
                    <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-2" />
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Create Account
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div>
                            <Label>Email</Label>
                            <Input type="email" placeholder="Enter email" {...register("email")} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Username */}
                        <div>
                            <Label>Username</Label>
                            <Input type="text" placeholder="Enter username" {...register("username")} />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>

                        {/* First & Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label>First Name</Label>
                                <Input type="text" placeholder="First name" {...register("firstName")} />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                <Input type="text" placeholder="Last name" {...register("lastName")} />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <Label>Password</Label>
                            <Input type="password" placeholder="Enter password" {...register("password")} />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <Label>Mobile Number</Label>
                            <Input type="tel" placeholder="Enter 10-digit mobile" {...register("mobile")} />
                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                        </div>

                        {/* Sign Up Button */}
                        <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Sign Up"}
                        </Button>
                    </form>

                    {/* Login link */}
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
