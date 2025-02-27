import Runner from "@/components/images/headerBg.jpg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/hooks/useAuth";

// If using Next.js. For React Router, use "react-router-dom"

const LoginPage = () => {
  const { handleSignUp } = useAuth();
  const demoUser = {
    full_name: "John Doe",
    phone_number: "1234567890",
    password: "securePassword123",
  };

  handleSignUp(demoUser)
    .then((response) => {
      console.log("User signed up successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error signing up:", error.response?.data || error.message);
    });
  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        className="absolute top-0 right-0 w-full h-full object-cover opacity-25"
        src={Runner}
        alt="Background Image"
      />

      {/* Login Form */}
      <Card className="relative z-10 p-6 w-96 bg-white shadow-lg rounded-lg">
        <h2 className="header text-2xl font-semibold text-center mb-4">
          Login
        </h2>

        <form className="space-y-4">
          {/* Phone Number */}
          <div>
            <Label className="description" htmlFor="phone">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Username */}
          <div>
            <Label className="description" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label className="description" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label className="description" htmlFor="remember">
              Remember me
            </Label>
          </div>

          {/* Submit Button */}
          <Button className="w-full bg-[#41FF8D] text-black hover:bg-[#36D074]">
            Login
          </Button>
        </form>

        {/* Already Have an Account */}
        <p className="text-center mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <span className="text-[#299C57] hover:underline">Sign up</span>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
