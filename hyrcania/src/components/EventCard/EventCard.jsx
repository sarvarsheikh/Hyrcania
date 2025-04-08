import { Card } from "@/components/ui/card";
import { LocateFixed } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import Arrow from "@/assets/Arrow";
import { useNavigate } from "react-router-dom";
import formateDate from "@/helper/formateDate";

const EventCard = (props) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate("/blog", {
          state: {
            event: props.event,
          },
        });
      }}
      className="bg-clip-border p-4 sm:p-6 rounded-2xl w-full max-w-[402px] h-auto aspect-[16/10] relative bg-violet-500 overflow-hidden mx-auto sm:mx-4 my-4 sm:my-6 cursor-pointer transition-transform hover:scale-[1.02]"
    >
      {/* Noise filter */}
      <svg
        className="absolute top-0 left-0 z-5"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gray-950 opacity-50"></div>

      {/* Banner image */}
      <img
        src="/gradients/Gradient1.png"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80 hover:opacity-20 z-10 transition-all duration-300 ease-in-out"
        data-oid="i0__a-d"
      ></img>
      <img
        src="/images/event.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt={props.event.title}
      />

      {/* Event details at the bottom */}
      <div className="absolute bottom-0 left-0 z-30 w-full">
        <div className="flex flex-col m-3 sm:m-5 space-y-1">
          <h1
            className="text-xl sm:text-2xl md:text-3xl text-white line-clamp-2"
            style={{
              fontStyle: "normal",
              fontWeight: "700",
            }}
          >
            {props.event.title}
          </h1>
          
          <div className="flex flex-row items-center space-x-2">
            <LocateFixed className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            <h6
              style={{
                fontStyle: "normal",
                fontWeight: "400",
                fontFamily: "'Noto Sans', sans-serif",
              }}
              className="text-xs sm:text-sm text-white truncate"
            >
              {location}
            </h6>
          </div>
          
          <h6
            style={{
              fontStyle: "normal",
              fontWeight: "400",
            }}
            className="text-xs sm:text-sm text-white"
          >
            March 15-18 , 2024
          </h6>
        </div>
      </div>

      {/* Arrow icon at the top right */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30">
        <Arrow className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
    </Card>
  );
};

export default EventCard;