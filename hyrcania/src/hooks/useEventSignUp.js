import axios from "axios";
import { useState } from "react";
import usePayment from "./usePayment";
import { toast } from "react-hot-toast";

function useEventSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [duplicateSignup, setDuplicateSignup] = useState(false);
  const { handlePayment } = usePayment();
  
  const API_URL = "https://hyrcanianrun.liara.run/api";

  async function refreshAccessToken(refreshToken) {
    try {
      const response = await axios.post(
        `${API_URL}/token/refresh/`,
        { refresh: refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      return response.data;
    } catch (error) {
      throw new Error("Failed to refresh authentication token");
    }
  }

  async function eventSignUp(ticket_id, userDetail) {
    setLoading(true);
    setError(null);
    setDuplicateSignup(false);

    try {
      // Get and validate token
      const token = localStorage.getItem("token");
      console.log(token)
      
      const parsedToken = JSON.parse(token);
      if (!parsedToken.refresh_token) {
        throw new Error("Invalid authentication token");
      }

      // Refresh token
      const tokenData = await refreshAccessToken(parsedToken.refresh_token);
      
      // Submit signup
      const response = await axios.post(
        `${API_URL}/tickets/${ticket_id}/signups/`,
        userDetail,
        {
          headers: {
            Authorization: `JWT ${tokenData.access}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Save new tokens
      localStorage.setItem(
        "token", 
        JSON.stringify({
          access_token: tokenData.access,
          refresh_token: parsedToken.refresh_token
        })
      );

      // Process payment
      await handlePayment(response.data.id, userDetail.phone_number, true, ticket_id);
      return response.data;
    } catch (error) {
      // Simplified error handling
      let errorMessage = "An error occurred during signup";
      
      if (error.response?.data?.detail === "You have already signed up for this ticket.") {
        errorMessage = "شما قبلا برای این بلیت ثبت‌نام کرده‌اید";
        setDuplicateSignup(true);
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
        
        // Clear token if authentication issues
        if (errorMessage.includes("log in") || errorMessage.includes("token")) {
          localStorage.removeItem("token");
        }
      }

      setError(errorMessage);
      toast.error("خروج از حساب کاربری");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { eventSignUp, loading, error, duplicateSignup };
}

export default useEventSignUp;