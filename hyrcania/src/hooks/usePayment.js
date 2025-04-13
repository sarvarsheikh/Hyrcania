import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://hyrcanianrun.liara.run/api";

export default function usePayment() {
  const navigate = useNavigate();

  async function handlePayment(event_signup_id, phone_number, sandbox, ticket_id) {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const parsedToken = JSON.parse(token);
      if (!parsedToken?.access_token) throw new Error("Invalid token");

      const response = await axios.post(
        `${BASE_URL}/payment/request/${ticket_id}/`,
        { event_signup_id, phone_number, sandbox },
        { headers: { Authorization: `JWT ${parsedToken.access_token}` } }
      );

      console.log("Payment Response:", response.data);

      if (response.data?.payment_url) {
        window.location.href = response.data.payment_url;
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Payment Error: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  }

  async function verifyPayment(redirectSuccess = "/payment", redirectFailure = "/payment") {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const parsedToken = JSON.parse(token);
      if (!parsedToken?.access_token) throw new Error("Invalid token");

      const searchParams = new URLSearchParams(window.location.search);
      const authority = searchParams.get("Authority");
      const status = searchParams.get("Status");

      if (!authority || !status) throw new Error("Missing Authority or Status parameters");

      if (status !== "OK") {
        navigate(redirectFailure);
        return { success: false, message: "Payment was not successful" };
      }

      const response = await axios.get(`${BASE_URL}/payment`, {
        params: { Authority: authority, Status: status },
        headers: { Authorization: `JWT ${parsedToken.access_token}` },
      });

      console.log("Verification Response:", response.data);

      if (response.data?.status === "success") {
        navigate(redirectSuccess);
      } else {
        navigate(redirectFailure);
      }

      return response.data;
    } catch (error) {
      console.error(`Verification Error: ${error.response?.data?.message || error.message}`);
      navigate(redirectFailure);
      throw error;
    }
  }

  // Return the functions as part of the hook
  return { handlePayment, verifyPayment };
}