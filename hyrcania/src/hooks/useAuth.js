import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // Track OTP status

  async function handleSignUp({ phone_number }) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://hyrcanianrun.liara.run/api/generate-otp/",
        {
          phone_number: phone_number,
        }
      );

      toast.success("کد یک بار مصرف ارسال شد.");
      setOtpSent(true); // Now user can enter OTP
      setLoading(false);
      return true;
    } catch (error) {
      toast.error(
        "شماره تماس اشتباه است. مطمئن شوید که با 09 شروع شود و انگلیسی نوشته شده باشد.\n" +
        (error.response?.data?.message || error.message)
      );
      setOtpSent(false);
      setLoading(false);
      return false;
    }
  }

  async function verifyOtp({ phone_number, otp }) {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://hyrcanianrun.liara.run/api/verify-otp/",
        {
          phone_number: phone_number,
          otp: otp,
        }
      );
      console.log(response.status);

      if (response.status === 200) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);

        localStorage.setItem("token", JSON.stringify(response.data));
        localStorage.setItem("tokenExpiry", expiryDate.toISOString());
        toast.success("به هایرکانیا خوش آمدید!");
        setUser(response.data.user || { phone_number });
      }

      setLoading(false);
      return response;
    } catch (error) {
      // toast.error("کد یک بار مصرف اشتباه است");
      setError(error.response?.data || error.message);
      setLoading(false);
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return {
    user,
    loading,
    error,
    otpSent,
    handleSignUp,
    verifyOtp,
    logout,
  };
}