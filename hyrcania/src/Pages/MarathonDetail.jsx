import routemap from "@/components/images/routemap.png";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import TicketCard from "@/assets/TicketCard";
<<<<<<< HEAD
import Runner from "@/assets/Runner";
import ticketImage from "@/components/images/ticket.jpeg";
import QR from "@/components/images//QR.png";
import { Separator } from "@radix-ui/react-select";
<<<<<<< HEAD

=======
=======
>>>>>>> 7de6aa18 (added Marathon register form)
>>>>>>> responsive
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
<<<<<<< HEAD
import { useLocation } from "react-router-dom";
function circleArea() {
=======
<<<<<<< HEAD
>>>>>>> responsive

}
const MarathonDetail = () => {
<<<<<<< HEAD
=======
=======
import { useLocation } from "react-router-dom";

const MarathonDetail = () => {
>>>>>>> responsive
  const location = useLocation();
  const obj = location.state;
  const event = obj.event;

<<<<<<< HEAD

=======
>>>>>>> 7de6aa18 (added Marathon register form)
>>>>>>> responsive
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
<<<<<<< HEAD
      <div className="relative w-full flex flex-col items-center  px-4">
<<<<<<< HEAD
        <div className="w-full max-w-5xl flex flex-col gap-4 text-right">
=======
        <div className="w-full max-w-5xl flex flex-col gap-4">
=======
      <div className="relative w-full flex flex-col items-center px-4 pt-4">
        <div className="w-full max-w-5xl flex flex-col gap-4 md:text-right">
>>>>>>> 7de6aa18 (added Marathon register form)
>>>>>>> responsive
          {/* Main Image */}
          <img
            className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-sm object-cover w-full"
            style={{ objectPosition: "60% 35%" }}
            src={event.banner_image}
            alt="image"
          />

          {/* Event Title & Description */}
<<<<<<< HEAD
          <h1 className="event-title font-bold text-4xl ml-auto text-right">{event.title}</h1>
          <p className="event-description text-wrap text-right ml-auto">{event.description}</p>

          {/* Marathon Details */}
          <div className="flex flex-row w-[450px] h-[120px] rounded-xl overflow-hidden shadow-lg self-end">
            <div className="basis-1/3 grid grid-cols-2 h-full bg-white place-content-center gap-y-3 pl-10 pr-2">
=======
<<<<<<< HEAD
          <h1 className="event-title">European Running Championships</h1>
          <p className="event-description text-wrap">
            On Saturday 12 and Sunday 13 April 2025, Brussels and Leuven will be
            the stage for the brand-new European Running Championships. For the
            first time, official European Championships open to all. You can run
            the race where elite runners will compete for a medal. A unique way
            to experience a top sporting event as an insider. In addition to the
            mythical 42.195 km, the half marathon and 10 km get their own
            European Championships.
          </p>

          {/* Marathon Details */}
          <div className="flex flex-row w-[450px] h-[120px] rounded-xl overflow-hidden shadow-lg">
            <div className="basis-1/3 grid grid-cols-2 h-full bg-white  place-content-center gap-y-3 pl-2 pr-20">
=======
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
>>>>>>> 7de6aa18 (added Marathon register form)
>>>>>>> responsive
              <LocateFixed className="text-black" />
              <h1 className="marathon-detail-card text-right">VENUE</h1>

              <CalendarClock className="text-black" />
              <h1 className="marathon-detail-card text-right">TIME</h1>

              <PersonStanding className="text-black" />
              <h1 className="marathon-detail-card text-right">MARATHON</h1>
            </div>

<<<<<<< HEAD
            <div className="basis-2/3 flex text-neutral-700 flex-col place-content-center gap-y-4 rounded-r-lg h-full bg-gray-100 pl-10 pr-2">
              <h1 className="marathon-detail-card">Lueven, Belgium</h1>
              <h1 className="marathon-detail-card">APR.12-15.2025 10:10.AM</h1>
              <h1 className="marathon-detail-card">Trail running - 5k , 10k</h1>
=======
<<<<<<< HEAD
            <div className="basis-2/3 flex text-neutral-700 flex-col place-content-center gap-y-4 rounded-r-lg h-full bg-gray-100 pl-2 pr-10">
              <h1 className="marathon-detail-card ">Lueven , Belgium</h1>
              <h1 className="marathon-detail-card ">
                APR.12-15.2025 10:10.AM
              </h1>
              <h1 className="marathon-detail-card ">
                Trail running - 5k , 10k
              </h1>
=======
            <div className="sm:basis-2/3 flex text-neutral-700 flex-col place-content-center gap-y-4 rounded-r-lg h-full bg-gray-100 px-4 sm:pl-10 sm:pr-2 py-2">
              <h1 className="marathon-detail-card">Lueven, Belgium</h1>
              <h1 className="marathon-detail-card">APR.12-15.2025 10:10.AM</h1>
              <h1 className="marathon-detail-card">Trail running - 5k , 10k</h1>
>>>>>>> 7de6aa18 (added Marathon register form)
>>>>>>> responsive
            </div>
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>

          {/* Route Details */}
<<<<<<< HEAD
          <h1 className="event-title ml-auto">Route Details</h1>
=======
<<<<<<< HEAD
          <h1 className="event-title">Route Details</h1>
=======
          <h1 className="event-title text-center md:text-right md:ml-auto">Route Details</h1>
>>>>>>> 7de6aa18 (added Marathon register form)
>>>>>>> responsive
          <img
            className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-sm object-cover w-full"
            style={{ objectPosition: "60% 35%" }}
            src={routemap}
            alt="route"
          />
<<<<<<< HEAD
          <div className="flex flex-col self-end">
=======
<<<<<<< HEAD
          <div className="flex flex-col">
=======
          <div className="flex flex-col self-center md:self-end">
>>>>>>> 7de6aa18 (added Marathon register form)
>>>>>>> responsive
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
<<<<<<< HEAD

          {/* Tickets Section */}
          <h1 className="event-title ml-auto">Tickets</h1>
          <div className="self-end">
=======
<<<<<<< HEAD
          <h1 className="event-title">Tickets</h1>
          <div>
=======

          {/* Tickets Section */}
          <h1 className="event-title text-center md:text-right md:ml-auto">Tickets</h1>
          <div className="self-center md:self-end w-full md:w-auto">
>>>>>>> 7de6aa18 (added Marathon register form)
>>>>>>> responsive
            <TicketCard />
            <TicketCard />
            <TicketCard />
          </div>
<<<<<<< HEAD

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

=======
<<<<<<< HEAD
          <h1 className="event-title">Frequently Asked Questions</h1>
          <div className="marathon-detail-fac text-black">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {" "}
                When does registration close?
              </AccordionTrigger>
              <AccordionContent>
                Registration closes on [insert date]. Early registration is
                recommended as spots are limited.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
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
=======

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