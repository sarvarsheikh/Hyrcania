import Runner from "@/components/images/headerBg.jpg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define Zod validation schema
const loginSchema = z.object({
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
});

const LoginPage = () => {
  const { handleSignUp, handleLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        await handleLogin(data);
        console.log("Login Success");
      } else {
        await handleSignUp(data);
        console.log("Signup Success");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("root", { message: "Authentication failed!" });
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        className="absolute top-0 right-0 w-full h-full object-cover opacity-25"
        src={Runner}
        alt="Background Image"
      />

      {/* Form Card */}
      <Card className="relative z-10 p-6 w-96 bg-white shadow-lg rounded-lg">
        <h2 className="header text-2xl font-semibold text-center mb-4">
          {isLogin ? "Login" : "Signup"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input id="full_name" {...register("full_name")} placeholder="Enter your full name" />
              {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
            </div>
          )}

          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input id="phone_number" type="tel" {...register("phone_number")} placeholder="Enter your phone number" />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} placeholder="Enter your password" />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {isLogin && (
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
          )}

          {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}

          <Button className="w-full bg-[#41FF8D] text-black hover:bg-[#36D074]">
            {isLogin ? "Login" : "Signup"}
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-[#299C57] hover:underline cursor-pointer" onClick={toggleForm}>
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
