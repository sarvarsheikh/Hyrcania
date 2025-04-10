import axios from "axios";
import { useState } from "react";

export default function useEventSignUp(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function EventSignUp ({first_name,
    last_name, 
    age,
    phone_number,
    gender,
    id_number,
    state,
    T_Shirt_size,
    relativ_name,
    relativ_last_name,
    relativ_phone_number ,
    is_paid = false}){
        setLoading(true);
        try {
            const response = await axios.post("127.0.0.1:8000/tickets/3/signups/", {
                first_name : first_name,
                last_name : last_name, 
                age : age, 
                phone_number : phone_number,
                gender : gender,
                id_number : id_number,
                state : state,
                T_Shirt_size : T_Shirt_size,
                relativ_name : relativ_name,
                relativ_last_name : relativ_last_name,
                relativ_phone_number : relativ_phone_number, 
                is_paid : is_paid});
                console.log("API Test Response:", response.data);
              }
         catch (error) {
            
            return;
        }
    }
}