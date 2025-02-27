import Runner from "@/components/images/headerBg.jpg";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

const LoginPage = () => {
  const { handleSignUp, handleLogin } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    password: "",
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin(formData)
        .then((res) => console.log("Login Success", res))
        .catch((err) => console.error("Login Error", err));
    } else {
      handleSignUp(formData)
        .then((res) => console.log("Signup Success", res))
        .catch((err) => console.error("Signup Error", err));
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

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isLogin && (
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Remember me</Label>
            </div>
          )}

          <Button className="w-full bg-[#41FF8D] text-black hover:bg-[#36D074]">
            {isLogin ? "Login" : "Signup"}
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
          <span
            className="text-[#299C57] hover:underline cursor-pointer"
            onClick={toggleForm}
          >
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </Card>
    </div>
  );
};

export default LoginPage;
