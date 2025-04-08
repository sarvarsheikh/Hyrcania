import routemap from "@/components/images/routemap.png";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import TicketCard from "@/assets/TicketCard";
import { useLocation } from "react-router-dom";
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
} from "lucide-react";

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
        className="absolute top-0 left-0 w-full h-[250px] md:h-[350px] lg:h-[400px] overflow-hidden opacity-30"
        ratio={50 / 9}
      >
        <img
          className="w-full h-full object-cover"
          src={event.banner_image}
          alt="image"
        />
      </AspectRatio>

      {/* Main Content */}
      <div className="relative w-full flex flex-col items-center px-4 pt-4">
        <div className="w-full max-w-5xl flex flex-col gap-4 md:text-right">
          {/* Main Image */}
          <img
            className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-sm object-cover w-full"
            style={{ objectPosition: "60% 35%" }}
            src={event.banner_image}
            alt="image"
          />

          {/* Event Title & Description */}
          <div className="flex flex-col md:items-end">
            <h1 className="event-title font-bold text-2xl sm:text-3xl md:text-4xl text-center md:text-right">
              {event.title}
            </h1>
            <p className="event-description text-wrap text-center md:text-right">
              {event.description}
            </p>
          </div>

          {/* Marathon Details */}
          <div className="flex flex-col sm:flex-row w-full md:w-[450px] rounded-xl overflow-hidden shadow-lg self-center md:self-end">
            <div className="sm:basis-1/3 grid grid-cols-2 h-full bg-white place-content-center gap-y-3 px-4 sm:pl-10 sm:pr-2 py-2">
              <LocateFixed className="text-black" />
              <h1 className="marathon-detail-card text-right">VENUE</h1>

              <CalendarClock className="text-black" />
              <h1 className="marathon-detail-card text-right">TIME</h1>

              <PersonStanding className="text-black" />
              <h1 className="marathon-detail-card text-right">MARATHON</h1>
            </div>

            <div className="sm:basis-2/3 flex text-neutral-700 flex-col place-content-center gap-y-4 rounded-r-lg h-full bg-gray-100 px-4 sm:pl-10 sm:pr-2 py-2">
              <h1 className="marathon-detail-card">Lueven, Belgium</h1>
              <h1 className="marathon-detail-card">APR.12-15.2025 10:10.AM</h1>
              <h1 className="marathon-detail-card">Trail running - 5k , 10k</h1>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>

          {/* Route Details */}
          <h1 className="event-title text-center md:text-right md:ml-auto">Route Details</h1>
          <img
            className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-sm object-cover w-full"
            style={{ objectPosition: "60% 35%" }}
            src={routemap}
            alt="route"
          />
          <div className="flex flex-col self-center md:self-end">
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
          <h1 className="event-title text-center md:text-right md:ml-auto">Tickets</h1>
          <div className="self-center md:self-end w-full md:w-auto">
            <TicketCard />
            <TicketCard />
            <TicketCard />
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>

          {/* FAQs Section */}
          <h1 className="event-title text-center md:text-right md:ml-auto">Frequently Asked Questions</h1>
          <div className="marathon-detail-fac text-black self-center md:self-end w-full">
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
          
          {/* Add padding at bottom for mobile */}
          <div className="h-8 md:h-16"></div>

        </div>
      </div>
    </div>
  );
};

export default MarathonDetail;