import axios from "axios";
import { useState } from "react";



export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleSignUp({ full_name, phone_number, password }) {
    setLoading(true);
    try {
        const res = axios.post("http://127.0.0.1:8000/auth/users/", {
            full_name,
            phone_number,
            password,
          });
          setLoading(false);
          return res;
        
    } catch (error) {
        setError(error);
        setLoading(false)
        
    }
    
  }

  function handleLogin({  phone_number, password }) {
    setLoading(true);
    try {
        const res = axios.post("http://127.0.0.1:8000/api/token/?", {
            phone_number,
            password,
          });
          setLoading(false);
          return res;
        
    } catch (error) {
        setError(error);
        setLoading(false)
        
    }
    
  }

  return { handleSignUp, handleLogin };
}
