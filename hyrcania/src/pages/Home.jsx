import EventCard from "@/components/EventCard/EventCard";
import DiscoveryIcon from "@/assets/DiscoveryIcon";

import useEventDetail from "@/hooks/useEventDetail";
import { useState, useEffect } from "react";

import '@/styles/global.css';
import React from "react";

import run from '/images/runner.png';
import SkeletonHomePage from "./SkeletonHomePage";

const Home = () => {
  const { eventData, loading, error, getEventDetail } = useEventDetail();

  // Fetch event details on component mount
  useEffect(() => {
    //localStorage.clear();
    getEventDetail();
  }, [getEventDetail]);

  return (
    <div className="min-h-screen">
      {loading ? (<SkeletonHomePage />) : (
        <div className="relative flex flex-col w-full min-h-screen">
          <div className="absolute inset-0 -z-10 w-full min-h-screen bg-white bg-[linear-gradient(to_right,#E2E2E2_1px,transparent_1px),linear-gradient(to_bottom,#E2E2E2_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
          <h1 className="zawya-font text-black text-[70px] sm:text-[120px] md:text-[150px] lg:text-[200px] xl:text-[300px] uppercase mr-2 mt-12 text-right">برای هیرکانی بدو</h1>

          <img
            src={run}
            alt="Running graphic"
            className="w-full h-auto px-2 md:px-2 lg:px-3 xl:px-4   "
          />

          <div className="w-full px-3 py-3 space-y-5">
            <div className="flex flex-row justify-end mr-2 space-x-3">
              <h1 className="dubai text-2xl md:text-3xl text-gray-800">
              مسابقات جلو رو
              </h1>
              <DiscoveryIcon />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end mb-12  w-full">
              {eventData && eventData.length > 0 ? (
                <div className="flex flex-col sm:flex-row-reverse flex-wrap justify-start w-full">
                  {eventData.map((event, index) => (
                    <div key={index} className="sm:ml-0 sm:mr-4 mb-4">
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-right w-full">
                  <h1 className="text-2xl md:text-3xl text-black-800">
                    متأسفیم، رویدادی موجود نیست.
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;