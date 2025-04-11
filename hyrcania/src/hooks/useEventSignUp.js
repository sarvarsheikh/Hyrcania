import axios from "axios";
import { useState } from "react";
import usePayment from "./usePayment";

function useEventSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handlePayment } = usePayment();

  async function eventSignUp(ticket_id, userDetail) {
    console.log(userDetail);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const parsedToken = JSON.parse(token);
      console.log(`JWT ${parsedToken["access_token"]}`);
      console.log("Into eventSignUp hook");

      const response = await axios.post(
        `http://127.0.0.1:8000/tickets/${ticket_id}/signups/`,
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
            Authorization: `JWT ${parsedToken.access_token}`
          }
        }
      );

      console.log("API Test Response:", response.data);

      // Now properly call the handlePayment function
      await handlePayment(response.data.id, userDetail.phone_number, true, ticket_id);

      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("API Test Error:", error.response?.data || error.message);
      setError(error.response?.data || error.message);
      setLoading(false);
      throw error;
    }
  }

  return { eventSignUp, loading, error };
}

export default useEventSignUp;