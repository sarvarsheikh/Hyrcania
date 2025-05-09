import axios from "axios";
import { useState, useCallback } from "react";

export default function useEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventData, setEventData] = useState([]);

  const getEventDetail = useCallback(async (url = "https://hyrcanianrun.liara.run/api/events/") => {
    setLoading(true);
    try {
      const res = await axios.get(url);


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