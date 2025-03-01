import axios from "axios";
import { useState, useCallback } from "react";

export default function useEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventData, setEventData] = useState([]);

  const getEventDetail = useCallback(async (url = "http://127.0.0.1:8000/events/") => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      console.log("Events fetched:", res.data);

      if (Array.isArray(res.data)) {
        setEventData(res.data);
      } else {
        throw new Error("Invalid data structure: Expected an array");
      }

      setError(null);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { eventData, loading, error, getEventDetail };
}