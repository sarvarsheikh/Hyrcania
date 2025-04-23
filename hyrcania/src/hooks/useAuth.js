import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSignUp({ phone_number }) {
    setLoading(true);
    try {
      const testPhoneNumber = "09919510956"; // Use the number from your screenshot

      const response = await axios.post(
        "https://hyrcanianrun.liara.run/api/generate-otp/",
        {
          phone_number: phone_number,
        }
      );


      // You can add this to automatically fill the phone number field for testing
    } catch (error) {

      toast.error(
        "شماره تماس شما اشتباه بود \\nمطمئن باشید که به انگلیسی و به شکل 09 باشد" + (error.response?.data?.message || error.message)
      );
    }
  }

  async function verifyOtp({ phone_number, otp }) {
    setLoading(true);
    try {
      // Make sure otp is being sent as a string, not an object or array
      const response = await axios.post(
        "https://hyrcanianrun.liara.run/api/verify-otp/",
        {
          phone_number: phone_number,
          otp: otp,
        }
      );

      if (response.status === 200) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);

        // Store token in localStorage
        localStorage.setItem("token", JSON.stringify(response.data));
        localStorage.setItem("tokenExpiry", expiryDate.toISOString());
        toast.success("Welcome to Hyrcania!");
        // Set user state
        setUser(response.data.user || { phone_number });
      }

      setLoading(false);
      return response;
    } catch (error) {
      toast.error(
        "کد یک بار مصرف اشتباه است",
        error.response?.data || error.message
      );
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
    handleSignUp,
    verifyOtp,
    logout,
  };
}
