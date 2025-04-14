import routemap from "@/components/images/routemap.png";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import TicketCard from "@/assets/TicketCard";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LocateFixed, CalendarClock, PersonStanding, Users, ExternalLink, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import MarathonSignUpForm from "./MarathonSignUpForm";

const MarathonDetail = () => {
  const location = useLocation();
   const navigate = useNavigate();
  const obj = location.state;
  const event = obj.event;
  const [showNoTicketsDialog, setShowNoTicketsDialog] = useState(false);
  
  // Check if tickets are available
  const hasTickets = event?.tickets && event.tickets.length > 0;
  const token = localStorage.getItem("token");
  
  
  // Show no tickets dialog on component mount if no tickets
  useEffect(() => {
    if (!hasTickets) {
      setShowNoTicketsDialog(true);
    }
    if(!token){
      navigate("/auth")
    }
  }, [hasTickets]);

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
          <div className="flex flex-col md:items-end ">
            <h1 className="event-title font-bold text-2xl sm:text-3xl md:text-4xl text-center md:text-right">
              {event.title}
            </h1>
            <p className="event-description text-wrap text-center mt-5 md:text-right">
              {event.description}
            </p>
          </div>

          {/* Marathon Details */}
          <div
            className="w-full max-w-sm rounded-lg overflow-hidden shadow-md bg-white ml-auto"
            dir="rtl"
          >
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">مکان</span>
                    <LocateFixed size={16} className="text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {event.location}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">زمان</span>
                    <CalendarClock size={16} className="text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-700">
                    {event.event_date}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">دسته‌بندی</span>
                    <PersonStanding size={16} className="text-gray-500" />
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
            اطلاعات مسیر
          </h1>
          <img
            className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-sm object-cover w-full"
            style={{ objectPosition: "60% 35%" }}
            src={routemap}
            alt="route"
          />
          <div className="flex flex-col self-center md:self-end">
            <div>
              
            <span className="form-label"> :آدرس شروع</span><span className="toggle-option">{event.start_address}</span>
            </div>
            <div>
              
            <span className="form-label"> :آدرس پایان </span><span className="toggle-option">{event.finish_address}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>
          
          {/* Team Members Section */}
          {event.team && event.team.length > 0 && (
            <>
              <h1 className="event-title text-center md:text-right md:ml-auto">
                اعضای تیم اجرایی
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full m-auto" dir="rtl">
                {event.team.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col items-center "
                  >
                    {member.image ? (
                      <img 
                        src={member.image} 
                        alt={member.full_name} 
                        className="w-20 h-20 rounded-full object-cover mb-3"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                        <Users size={32} className="text-gray-400" />
                      </div>
                    )}
                    <h2 className="text-lg font-bold text-gray-800 text-center">
                      {member.full_name}
                    </h2>
                    <p className="text-sm text-gray-600 text-center">
                      {member.position}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Divider after Team Members */}
              <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>
            </>
          )}

          {/* Sponsors Section */}
          {event.sponsers && event.sponsers.length > 0 && (
            <>
              <h1 className="event-title text-center md:text-right md:ml-auto">
                اسپانسر ها
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full" dir="rtl">
                {event.sponsers.map((sponsor, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg"
                  >
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{sponsor.name}</h3>
                      <p className="text-gray-600 mb-4 text-right">{sponsor.description}</p>
                      {sponsor.social_link && (
                        <a
                          href={sponsor.social_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-start text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ExternalLink size={16} />
                          <span className="mr-2">مشاهده پروفایل</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Divider after Sponsors */}
              <div className="h-[0.5px] bg-gray-400 my-2 w-full"></div>
            </>
          )}

          {/* Sign Up Section */}
          <div className="flex flex-col items-center w-full my-20">
            <p className="text-lg font-semibold text-center text-neutral-700">
              ثبت نام برای مسابقه و انتخاب بلیط
            </p>
            {hasTickets ? (
              <Link
                to="/marathon"
                state={{ event }}
                className="transition duration-300 ease-in-out mt-8 mb-10"
              >
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full">
                  ثبت نام
                </button>
              </Link>
            ) : (
              <button 
                onClick={() => setShowNoTicketsDialog(true)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-full mt-8 mb-10"
              >
                ثبت نام
              </button>
            )}
          </div>
        </div>
      </div>

      {/* No Tickets Available Dialog */}
      <Dialog open={showNoTicketsDialog} onOpenChange={setShowNoTicketsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              بلیط در دسترس نیست
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
            <p className="text-center text-lg">
              متاسفانه در حال حاضر بلیطی برای این رویداد در دسترس نیست.
            </p>
            <p className="text-center text-gray-600 mt-2">
              لطفا بعدا مجددا تلاش کنید یا با برگزارکننده تماس بگیرید.
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={() => setShowNoTicketsDialog(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              باشه
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MarathonDetail;