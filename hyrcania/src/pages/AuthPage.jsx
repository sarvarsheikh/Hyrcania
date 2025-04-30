import Runner from "@/components/images/headerBg.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import useAuth from "@/hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define Zod validation schema
const loginSchema = z.object({
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
});

const signupSchema = loginSchema;

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleSignUp, verifyOtp, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const dialogTriggerRef = useRef(null);
  const timerRef = useRef(null);

  // Function to start countdown timer
  const startCountdown = () => {
    setCountdown(30);
    setCanResend(false);
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

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
      setPhoneNumber(data.phone_number);
      // Generate OTP
      await handleSignUp({ phone_number: data.phone_number });

      console.log("با موفقیت کد برای شماره شما ارسال شد");

      // Start countdown
      startCountdown();

      // Open the dialog
      if (dialogTriggerRef.current) {
        dialogTriggerRef.current.click();
      }
    } catch (error) {
      console.error("Error:", error);

      setError("root", { message: "نشد که کد رو ارسال کنیم" });
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    try {
      await handleSignUp({ phone_number: phoneNumber });
      console.log("با موفقیت دوباره ارسال کردیم کد ");
      startCountdown();
    } catch (error) {
      console.error("نشد که کد ارسال بشه دوباره", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await verifyOtp({
        phone_number: phoneNumber,
        otp: otpValue,
      });

      if (response.status === 200) {
        toast.success(" به هیرکانی خوش اومدی قهرمان ");
        setIsDialogOpen(false);

        navigate("/");
      }
     
    } catch (error) {
      // Let useAuth handle the toast error
      toast.error(`رمز یک‌بار مصرف نامعتبر یا منقضی شده است`);
      
      
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
          {isLogin ? "ورود" : "ورود"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              id="phone_number"
              type="tel"
              {...register("phone_number")}
              placeholder="شماره تلفن خود را وارد کنید "
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {errors.root && (
            <p className="text-red-500 text-sm text-center">
              {errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#41FF8D] text-black hover:bg-[#36D074] rounded-md py-2 font-medium"
          >
            {isLogin ? "ورود" : "ورود"}
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger
              className="hidden"
              ref={dialogTriggerRef}
            ></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-gray-900">
                  کد یک بار مصرف را وارد کنید
                </DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col items-center justify-center mt-4 space-y-5">
                    <p className="text-sm text-center text-gray-900">
                      با موفقیت کد ارسال شد{" "}
                      <span className="font-medium">{phoneNumber}</span>
                    </p>

                    <InputOTP
                      maxLength={6}
                      className="flex justify-center text-black"
                      value={otpValue}
                      onChange={setOtpValue}
                    >
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot index={0} className="text-black" />
                        <InputOTPSlot index={1} className="text-black" />
                        <InputOTPSlot index={2} className="text-black" />
                        <InputOTPSlot index={3} className="text-black" />
                        <InputOTPSlot index={4} className="text-black" />
                        <InputOTPSlot index={5} className="text-black" />
                      </InputOTPGroup>
                    </InputOTP>

                    <div className="text-sm text-center">
                      <span className="text-gray-500">کد رو نگرفتی </span>
                      <button
                        type="button"
                        className={`${
                          canResend
                            ? "text-[#41FF8D] hover:underline"
                            : "text-gray-400 cursor-not-allowed"
                        }`}
                        onClick={handleResendOtp}
                        disabled={!canResend}
                      >
                        ارسال کردن دوباره کد
                      </button>
                    </div>

                    <div className="flex items-center justify-center w-full">
                      <div className="h-[1px] bg-gray-200 w-full"></div>
                      <span className="px-2 text-xs text-gray-400">
                        {countdown > 0
                          ? `00:${countdown.toString().padStart(2, "0")}`
                          : "00:00"}
                      </span>
                      <div className="h-[1px] bg-gray-200 w-full"></div>
                    </div>

                    <Button
                      className="w-[200px] bg-[#41FF8D] text-black hover:bg-[#36D074] rounded-md py-2 font-medium"
                      type="button"
                      onClick={handleVerifyOtp}
                    >
                      {loading ? (
                        <div class="h-5 w-5 border-2 border-gray-800 border-t-green-500 rounded-full animate-spin-custom mx-auto"></div>
                      ) : (
                        "تایید کد"
                      )}
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
