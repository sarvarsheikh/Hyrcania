import axios from "axios";
import { useState } from "react";
import usePayment from "./usePayment";
import { toast } from "react-hot-toast";

function useEventSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handlePayment } = usePayment();

  async function eventSignUp(ticket_id, userDetail) {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        const error = new Error("Please log in to continue");
        error.code = "AUTH_REQUIRED";
        throw error;
      }

      const parsedToken = JSON.parse(token);
      if (!parsedToken.access_token) {
        const error = new Error("Invalid authentication token");
        error.code = "INVALID_TOKEN";
        throw error;
      }

      // Check token expiration
      const tokenData = JSON.parse(atob(parsedToken.access_token.split('.')[1]));
      if (tokenData.exp * 1000 < Date.now()) {
        const error = new Error("Your session has expired. Please log in again");
        error.code = "TOKEN_EXPIRED";
        throw error;
      }

      const response = await axios.post(
        `https://hyrcanianrun.liara.run/api/tickets/${ticket_id}/signups/`,
        {
          first_name: userDetail.first_name,
          last_name: userDetail.last_name,
          age: userDetail.age,
          phone_number: userDetail.phone_number,
          gender: userDetail.gender,
          id_number: userDetail.id_number,
          state: userDetail.state,
          T_Shirt_size: userDetail.T_Shirt_size,
          relativ_name: userDetail.relativ_name,
          relativ_last_name: userDetail.relativ_last_name,
          relativ_phone_number: userDetail.relativ_phone_number,
          is_paid: userDetail.is_paid
        },
        {
          headers: {
            Authorization: `JWT ${parsedToken.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data || !response.data.id) {
        throw new Error("Invalid response from signup endpoint");
      }

      await handlePayment(response.data.id, userDetail.phone_number, true, ticket_id);
      return response.data;
    } catch (error) {
      let errorMessage = "An error occurred during signup";
      
      if (error.code === "AUTH_REQUIRED") {
        errorMessage = error.message;
      } else if (error.code === "INVALID_TOKEN" || error.code === "TOKEN_EXPIRED") {
        // Clear invalid/expired token
        localStorage.removeItem("token");
        errorMessage = error.message;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { eventSignUp, loading, error };
}

export default useEventSignUp;