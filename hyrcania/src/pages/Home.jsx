import EventCard from "@/components/EventCard/EventCard";
import DiscoveryIcon from "@/assets/DiscoveryIcon";

import useEventDetail from "@/hooks/useEventDetail";
import { useState, useRef, useLayoutEffect, useEffect } from "react";

import "@/styles/global.css";
import React from "react";

import run from "/images/runner.png";
import SkeletonHomePage from "./SkeletonHomePage";
import { WordRotate } from "@/components/magicui/word-rotate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
const Home = () => {
  const { eventData, loading, error, getEventDetail } = useEventDetail();
  const maskRef = useRef();
  const imgRef = useRef();

  // Fetch event details on component mount
  useEffect(() => {
    //localStorage.clear();
    getEventDetail();
  }, [getEventDetail]);


  useGSAP(() => {
    // Fix 1: Use the ref instead of a string selector
    // Fix 2: Add proper animation parameters
    // gsap.fromTo(maskRef.current,
    //   {
    //     width: "100%", // Fix 3: Add units to width
    //   },
    //   {
    //     width: 0,
    //     duration: 1,
    //     ease: "expo.out",
    //     delay: 0.5
    //   }
    // );
    let tl = gsap.timeline();
    gsap.fromTo(maskRef.current,
      {
        width: "100%", // Fix 3: Add units to width
        scale: 0.9,
      },
      {
        width: 0,
        scale: 1,
        duration: 1,
        ease: "expo.out",
        delay: 0.1
      }
    );

    gsap.fromTo(imgRef.current,
      {

        scale: 0.9,
      },
      {

        scale: 1,
        duration: 1,
        ease: "slow(0.1,0.7,true)",
        delay: 0.1
      }
    );
  }, null);

  return (
    <div className="min-h-screen">
      {loading ? (
        <SkeletonHomePage />
      ) : (
        <div className="bg-white  relative flex flex-col w-full min-h-screen">
          <div className="flex flex-row ml-auto gap-x-4  zawya-font text-black text-[70px] sm:text-[120px] md:text-[150px] lg:text-[200px] xl:text-[250px] uppercase mr-2 mt-12 text-right">
            <WordRotate words={[" خودت بدو ", "هیرکانی بدو "]} />
            <span> برای </span>
          </div>
          <div>
            <div className="image-container px-2">
              <div className="w-full h-full relative">
                <img
                  src={run}
                  ref={imgRef}
                  alt="Running graphic"
                  className="runner-image px-2 md:px-2 lg:px-3 xl:px-4"
                />
                <div ref={maskRef} className="image-mask"></div> {/* Fix 4: Add the ref back */}
              </div>
            </div>
          </div>

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
