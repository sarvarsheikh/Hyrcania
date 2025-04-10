import axios from "axios";
import { useState } from "react";


function useEventSignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const parsedToken = JSON.parse(token)
    async function eventSignUp(ticket_id, userDetail) {
        console.log(userDetail);
        console.log(`JWT ${parsedToken["access_token"]}`);
        console.log("Into eventSignUp hook");
        setLoading(true);
        try {
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
                    Authorization: `Bearer ${parsedToken.access_token}`  // Changed to Bearer based on your JWT setup
                  }
                }
              );
            console.log("API Test Response:", response.data);
        }
        catch (error) {
            console.error("API Test Error:", error.response?.data || error.message);


        }
    }
    return { eventSignUp };
}
export default useEventSignUp;