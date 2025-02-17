import marathonImage1 from "@/components/images/marathon.jpeg";
import marathonImage from "@/components/images/headerBg.jpg";
import routemap from "@/components/images/routemap.png";
import star from "@/components/images/star.png";
import player from "@/components/images/player.png";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Location from "@/assets/Location";
import Timing from "@/assets/Timing";
import TicketCard from "@/assets/TicketCard";
import Runner from "@/assets/Runner";
import ticketImage from "@/components/images/ticket.jpeg";
import QR from "@/components/images//QR.png";
import { Separator } from "@radix-ui/react-select";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  LocateFixed,
  CalendarClock,
  PersonStanding,
  Ticket,
} from "lucide-react";
import { useLocation } from "react-router-dom";
function circleArea() {

}
const MarathonDetail = () => {
  const location = useLocation();
  const obj = location.state;
  const event = obj.event;


  return (
    <div
      data-oid="vj90wec"
      className="relative bg-white min-h-screen overflow-auto"
    >
      {/* Background Image */}
      <AspectRatio
        className="absolute top-0 left-0 w-full h-[400px] overflow-hidden opacity-30"
        ratio={50 / 9}
      >
        <img
          className="w-full h-full object-cover"
          src={event.banner_image}
          alt="image"
        />
      </AspectRatio>

      {/* Main Content */}
      <div className="relative w-full flex flex-col items-center  px-4">
        <div className="w-full max-w-5xl flex flex-col gap-4 text-right">
          {/* Main Image */}
          <img
            className="h-[350px] rounded-sm object-cover w-full"
            style={{ objectPosition: "60% 35%" }}
            src={event.banner_image}
            alt="image"
          />

          {/* Event Title & Description */}
          <h1 className="event-title font-bold text-4xl ml-auto text-right">{event.title}</h1>
          <p className="event-description text-wrap text-right ml-auto">{event.description}</p>

          {/* Marathon Details */}
          <div className="flex flex-row w-[450px] h-[120px] rounded-xl overflow-hidden shadow-lg self-end">
            <div className="basis-1/3 grid grid-cols-2 h-full bg-white place-content-center gap-y-3 pl-10 pr-2">
              <LocateFixed className="text-black" />
              <h1 className="marathon-detail-card text-right">VENUE</h1>

              <CalendarClock className="text-black" />
              <h1 className="marathon-detail-card text-right">TIME</h1>

              <PersonStanding className="text-black" />
              <h1 className="marathon-detail-card text-right">MARATHON</h1>
            </div>

            <div className="basis-2/3 flex text-neutral-700 flex-col place-content-center gap-y-4 rounded-r-lg h-full bg-gray-100 pl-10 pr-2">
              <h1 className="marathon-detail-card">Lueven, Belgium</h1>
              <h1 className="marathon-detail-card">APR.12-15.2025 10:10.AM</h1>
              <h1 className="marathon-detail-card">Trail running - 5k , 10k</h1>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>

          {/* Route Details */}
          <h1 className="event-title ml-auto">Route Details</h1>
          <img
            className="h-[350px] rounded-sm object-cover w-full"
            style={{ objectPosition: "60% 35%" }}
            src={routemap}
            alt="route"
          />
          <div className="flex flex-col self-end">
            <div>
              <span className="form-label"> START ADDRESS: </span>
              <span className="toggle-option">Royal Palace of Brussels</span>
            </div>
            <div>
              <span className="form-label"> FINISH ADDRESS: </span>
              <span className="toggle-option">Leuven, Belgium</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>

          {/* Tickets Section */}
          <h1 className="event-title ml-auto">Tickets</h1>
          <div className="self-end">
            <TicketCard />
            <TicketCard />
            <TicketCard />
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>

          {/* FAQs Section */}
          <h1 className="event-title ml-auto">Frequently Asked Questions</h1>
          <div className="marathon-detail-fac text-black self-end w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>When does registration close?</AccordionTrigger>
                <AccordionContent>
                  Registration closes on [insert date]. Early registration is
                  recommended as spots are limited.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MarathonDetail;
