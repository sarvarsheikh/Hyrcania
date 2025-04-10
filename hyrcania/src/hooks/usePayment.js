export default function usePayment(){
    async function handlePayment(event_signup_id, phone_number, sandbox, ticket_id ){
        const response = await axios.post(
            `http://127.0.0.1:8000/payment/request/${ticket_id}`,
            {
              event_signup_id : event_signup_id,
              phone_number: phone_number, 
              sandbox : sandbox 
            },
            {
              headers: {
                Authorization: `Bearer ${token["access_token"]}`  // Changed to Bearer based on your JWT setup
              }
            }
          );

    }

    function verifyPayment(){

    }
    return {

    }
}