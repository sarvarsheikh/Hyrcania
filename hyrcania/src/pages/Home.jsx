import EventCard from "@/components/EventCard/EventCard";
import DiscoveryIcon from "@/assets/DiscoveryIcon";
import Runner from "@/components/images/headerBg.png";
import persianText from "@/farsiHardCodeText";
import useEventDetail from "@/hooks/useEventDetail";
import { useState, useEffect } from "react";
import Link from "antd/es/typography/Link";
import { getRandomInt } from "@/lib/getRandomNumber";
import quoteList from "@/lib/quote-list";
import '@/styles/global.css';



const Home = () => {
  const { eventData, loading, error, getEventDetail } = useEventDetail();
  const [random_Number, setRandom_Number] = useState(0);

  // Fetch event details on component mount
  useEffect(() => {


    setRandom_Number(getRandomInt(0, quoteList.length - 1));


    //localStorage.clear();

    getEventDetail();
  }, [getEventDetail]);

  return (
    <div
      style={{ background: "#F6F5F2" }}
      className="relative overflow-auto min-h-screen"
    >
      {/* Hero Section - Responsive with fluid design */}
      <div className="relative h-screen w-full">
        <img
          src={Runner}
          alt="a man running"
          className="w-full h-full object-cover absolute inset-0 "
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#333333] via-[#1a1a1a] via-50% to-[#000000] opacity-75"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-white text-center z-10">
          <h1 className="zawya-font text-3xl md:text-4xl lg:text-8xl font-bold w-full max-w-4xl mx-auto">
            {persianText.home.title}
          </h1>
          <div className="flex flex-col space-x-3 mt-8">
            <p className="text-xs md:text-xs  lg:text-lg">
              {quoteList[random_Number]["quote"]}
            </p>
            <p className="text-xs md:text-xs lg:text-lg text-right">
              {quoteList[random_Number]["author"]}
            </p>
          </div>
        </div>
      </div>

      {/* Discover Events Section - Responsive layout */}
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-row justify-center md:justify-end w-full mt-8 md:mt-10 items-center space-x-2 md:space-x-4 md:pr-6">
          <h1
            className="text-2xl md:text-3xl text-black-800"
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

        {/* Event Cards Grid - Responsive with automatic columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 w-full">
          {/* Handle Loading State */}
          {loading && (
            <div className="col-span-full flex justify-center py-12">
              <p className="text-lg">لطفا صبر کنید</p>
            </div>
          )}

          {/* Handle Error State */}
          {error && (
            <div className="col-span-full text-red-500 py-8">
              <p>به مشکل خوردیم {error.message}</p>
            </div>
          )}

          {/* Render Event Cards Dynamically */}
          {!loading && !error && eventData.length > 0
            ? eventData.map((event, index) => (
              <Link
                key={index}
                to="/blog"
                state={{ event }}
                className="transition-transform hover:scale-105 duration-300"
              >
                <EventCard event={event} />
              </Link>
            ))
            : !loading &&
            !error && (
              <div className="col-span-full text-center py-8">
                <p className="text-lg">هیچ مسابقه ای نیست که نشون بدیم </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
