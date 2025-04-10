import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useEvent() {
    const fetchEvents = async () => {
        const response = await axios.get("http://192.168.1.10:8000/events/");
        return response.data;
    };

    const { data: events, error, isLoading: loading } = useQuery({
        queryKey: ["events"],
        queryFn: fetchEvents,
    });

    return { loading, error, events };
}

export default useEvent;
