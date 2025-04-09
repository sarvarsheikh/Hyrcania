import routemap from "@/components/images/routemap.png";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import TicketCard from "@/assets/TicketCard";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LocateFixed, CalendarClock, PersonStanding } from "lucide-react";
import MarathonSignUpForm from "./MarathonSignUpForm";
import { Link } from "react-router-dom";

const MarathonDetail = () => {
  const location = useLocation();
  const obj = location.state;
  const event = obj.event;
  console.log(event);
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
          <div className="w-full max-w-sm rounded-lg overflow-hidden shadow-md bg-white">
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LocateFixed size={16} className="text-gray-500" />
                    <span className="text-sm font-medium">Venue</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    {event.location}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarClock size={16} className="text-gray-500" />
                    <span className="text-sm font-medium">Time</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    {event.event_date}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PersonStanding size={16} className="text-gray-500" />
                    <span className="text-sm font-medium">Category</span>
                  </div>
                  <span className="text-sm text-gray-700">
                    {event.category.title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>

          {/* Route Details */}
          <h1 className="event-title text-center md:text-right md:ml-auto">
            Route Details
          </h1>
          <img
            className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-sm object-cover w-full"
            style={{ objectPosition: "60% 35%" }}
            src={routemap}
            alt="route"
          />
          <div className="flex flex-col self-center md:self-end">
            <div>
              <span className="form-label"> START ADDRESS: </span>
              {console.log(event.start_address)}
              <span className="toggle-option">{event.start_address}</span>
            </div>
            <div>
              <span className="form-label"> FINISH ADDRESS: </span>
              <span className="toggle-option">{event.finish_address}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>

          {/* Tickets Section */}
          {/* <h1 className="event-title text-center md:text-right md:ml-auto">Tickets</h1>
          <div className="self-center md:self-end w-full md:w-auto">
            <TicketCard />
            <TicketCard />
            <TicketCard />
          </div> */}

          {/* Divider */}

          {/* FAQs Section */}
          {/* <h1 className="event-title text-center md:text-right md:ml-auto">Frequently Asked Questions</h1>
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
          </div> */}

          {/* Add padding at bottom for mobile */}
          <div className="flex flex-col items-center  w-full  my-20">
            <p className="text-lg font-semibold text-center  text-neutral-700 ">
              Do you want to sign up for this event?
            </p>
            <Link
              to="/marathon" // Adjust the route as needed
              state={{ event }} // Pass the event details if required
              className=" transition duration-300 ease-in-out  mt-8 mb-10"
            >
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full">
                sign up{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonDetail;
