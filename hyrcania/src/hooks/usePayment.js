import axios from "axios";

export default function usePayment() {
  async function handlePayment(event_signup_id, phone_number, sandbox, ticket_id) {
    try {
      const token = localStorage.getItem("token");
      const parsedToken = JSON.parse(token);
      const response = await axios.post(
        `http://127.0.0.1:8000/payment/request/${ticket_id}/`,
        {
          event_signup_id: event_signup_id,
          phone_number: phone_number,
          sandbox: sandbox
        },
        {
          headers: {
            Authorization: `JWT ${parsedToken.access_token}`
          }
        }
      );
      console.log("Payment Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
      throw error;
    }
  }

  async function verifyPayment(payment_id) {
    // Implement verification logic when needed
  }

  return {
    handlePayment,
    verifyPayment
  };
}