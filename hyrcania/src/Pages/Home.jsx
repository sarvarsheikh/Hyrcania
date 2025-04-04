import EventCard from "@/components/EventCard/EventCard";
import DiscoveryIcon from "@/assets/DiscoveryIcon";
import Runner from "@/components/images/headerBg.jpg";
import persianText from "@/farsiHardCodeText";
import useEventDetail from "@/hooks/useEventDetail";
import { useState, useEffect } from "react";
 // Updated hook name

const Home = () => {
  const { eventData, loading, error, getEventDetail } = useEventDetail();

  // Fetch event details on component mount
  useEffect(() => {
    getEventDetail();
  }, [getEventDetail]);

  return (
    <div
      style={{ background: "#F6F5F2" }}
      className="relative overflow-auto min-h-screen"
    >
      {/* Hero Section */}
      <div>
        <img src={Runner} alt="a man running" className="w-full h-full object-cover" />
        <div className="absolute w-full h-[calc(100vh+80px)] inset-0 bg-gradient-to-l from-[#E6E2C3] via-[#88A47C] via-50% to-[#1C315E] opacity-50"></div>
        <div className="absolute top-96 left-[calc(50%-400px)] text-white text-8xl font-bold z-10">
          {persianText.home.title}
        </div>
      </div>

      {/* Discover Events Section */}
      <div className="flex flex-col items-center">
        <div className="flex flex-row self-end space-x-4 mr-20 pr-6 mt-10 items-center">
          <h1
            className="text-left text-3xl text-black-800"
            style={{
              color: "#212121",
              fontStyle: "normal",
              fontWeight: "600",
            }}
          >
            {persianText.home.discoverEvents}
          </h1>
          <DiscoveryIcon />
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {/* Handle Loading State */}
          {loading && <p>Loading events...</p>}

          {/* Handle Error State */}
          {error && <p>Error fetching events: {error.message}</p>}

          {/* Render Event Cards Dynamically */}
          {eventData.length > 0 ? (
            eventData.map((event, index) => (
              <a key={index} href={`/event/${event.id}`}>
                <EventCard title={event.title} location={event.location} />
              </a>
            ))
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;