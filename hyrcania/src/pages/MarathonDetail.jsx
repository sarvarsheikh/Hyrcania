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
import { LocateFixed, CalendarClock, Users, ExternalLink, AlertTriangle, Share2, Share, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import MarathonSignUpForm from "./MarathonSignUpForm";
import banner from '/images/banner.png';
import strip1 from '/images/strip1.png';
import strip2 from '/images/strip2.png';
import mapy from '/images/map.png';
import paper from '/images/paper.jpg';
import { Calendar, Clock, MapPin, PersonStanding } from "lucide-react";
import MinimalistRegistrationForm from "./MarathonSignUpForm";
import { gregorianToJalali } from "@/lib/jalali-utils";
import CountdownTimer from "@/components/coutdown";

// Social Media Link Card Component
const SocialMediaCard = ({ link, title, description, icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Choose icon based on prop or default to Share2
  const IconComponent = icon || Share2;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-neutral-900 border-2 ${isHovered ? 'border-[#c0ff00]' : 'border-neutral-700'} 
        rounded-lg p-4 transition-all duration-300 h-full flex flex-col`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className={`text-xl font-bold ${isHovered ? 'text-[#c0ff00]' : 'text-white'} transition-colors duration-300`}>
            {title || "پیوند مجازی"}
          </h3>
          <div className={`p-2 rounded-full ${isHovered ? 'bg-[#c0ff00] text-black' : 'bg-neutral-800 text-gray-400'} transition-all duration-300`}>
            <IconComponent size={20} />
          </div>
        </div>

        {description && (
          <p className="text-gray-400 mb-3 text-sm">{description}</p>
        )}

        <div className="mt-auto flex items-center text-sm">
          <ExternalLink size={16} className={`${isHovered ? 'text-[#c0ff00]' : 'text-gray-400'} mr-1`} />
          <span className={`${isHovered ? 'text-[#c0ff00]' : 'text-gray-400'} transition-colors duration-300`}>
            مشاهده لینک
          </span>
        </div>
      </div>
    </a>
  );
};

// Sponsor Card Component
const SponsorCard = ({ sponsor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={sponsor.social_link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`bg-neutral-900 border-2 ${isHovered ? 'border-[#c0ff00]' : 'border-neutral-700'} 
        rounded-lg p-6 transition-all duration-300 h-full flex flex-col`}>
        <div className="text-center mb-4">
          <h3 className={`text-xl font-bold ${isHovered ? 'text-[#c0ff00]' : 'text-white'} transition-colors duration-300`}>
            {sponsor.name}
          </h3>
        </div>

        <p className="text-gray-400 text-sm mb-4 text-center">
          {sponsor.description}
        </p>

        <div className="mt-auto flex items-center justify-center text-sm">
          <ExternalLink size={16} className={`${isHovered ? 'text-[#c0ff00]' : 'text-gray-400'} mr-1`} />
          <span className={`${isHovered ? 'text-[#c0ff00]' : 'text-gray-400'} transition-colors duration-300`}>
            مشاهده اسپانسر
          </span>
        </div>
      </div>
    </a>
  );
};

const MarathonDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const obj = location.state;
  const event = obj.event;
  console.log(event)
  const [gy, gm, gd] = event.event_date.split("-").map(Number);

  const eventDate = gregorianToJalali(gy, gm, gd);

  // Check if tickets are available
  const hasTickets = event?.tickets && event.tickets.length > 0;
  const date = `${eventDate.year}/${eventDate.month}/${eventDate.day} 08:00:00`

  // Show no tickets dialog on component mount if no tickets
  useEffect(() => {
    if (!hasTickets) {
      setShowNoTicketsDialog(true);
    }
  }, [hasTickets]);

  return (
    <main className="flex min-h-screen flex-col bg-neutral-800 text-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative w-full ">
          <img src={banner} alt="Race Shaft Trail 2025" fill priority className="object-cover" />
        </div>

        {/* Green Strip */}
        <div className="w-full  relative overflow-hidden">
          <img src={strip1} alt="Hyrcania" fill className="object-cover" />
        </div>
      </section>
      <section className="relative w-full bg-[url('/images/paper.jpg')] bg-contain bg-center md:bg-contain ">
        {/* Blue border top */}
        <div className="relative z-10 py-12 px-4 md:px-8 max-w-4xl mx-auto">
          {/* Green Description Header */}
          <div className="bg-[#c0ff00]  text-black text-center py-3 mb-8 max-w-xs mx-auto">
            <h2 className="text-xl font-bold">اطلاعات مسابقه</h2>
          </div>

          {/* Persian Text - Right-to-left */}
          <div className="text-white text-right" dir="rtl" lang="fa">
            <p className="leading-relaxed text-lg mt-4">
              {event.description}
            </p>
          </div>
        </div>

        {/* Blue border bottom */}
      </section>

      {/* Event Details Section */}
      <section className="py-12 px-4 md:px-8 bg-transparent z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Date */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#c0ff00] flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-[#c0ff00]" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wider">{`${eventDate.year}-${eventDate.month}-${eventDate.day}`}</h3>
          </div>

          {/* Time */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#c0ff00] flex items-center justify-center mb-4">
              <PersonStanding className="w-8 h-8 text-[#c0ff00]" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wider">{event.category.title}</h3>
          </div>

          {/* Race Type */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#c0ff00] flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-[#c0ff00]" />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wider">{event.location}</h3>
          </div>
        </div>
      </section>

      {/* Purple Strip */}
      <div className="w-full relative overflow-hidden">
        <img src={strip2} alt="Hyrcania" fill className="object-cover" />
      </div>

      {/* Map Section */}
      <section className="relative w-full ">
        <img src={event.route_image} alt="Race route map" className="object-fill" />
      </section>

      {/* Purple Strip Footer */}
      <div className="w-full  relative overflow-hidden">
        <img src={strip2} alt="Hyrcania" fill className="object-cover" />
      </div>

      {/* Team Section */}
      <section className="py-12 px-4 md:px-8 bg-transparent z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 zawya-font text-[#c0ff00]">اعضای اجرایی</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {event.team.map((teammate, index) => {
              return (<div
                key={index}
                className="flex flex-col items-center text-center  rounded-lg p-6">
                <img
                  src={teammate.image}
                  alt={teammate.full_name}
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <div className="text-xl font-semibold">{teammate.full_name}</div>
                <div className="text-sm text-gray-400">{teammate.position}</div>
              </div>)
            })}
          </div>
        </div>
      </section>

      <div className="w-full  relative overflow-hidden">
        <img src={strip2} alt="Hyrcania" fill className="object-cover" />
      </div>

      {/* Social Media Link Section */}
      <section className="py-12 px-4 md:px-8 bg-transparent z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 zawya-font text-[#c0ff00]">شبکه‌های اجتماعی</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Telegram Social Media Card */}
            <SocialMediaCard
              link={event.link_to_social_media}
              title="کانال تلگرام"
              description="برای اطلاع از آخرین اخبار مسابقه به کانال تلگرام ما بپیوندید"
              icon={MessageCircle}
            />

            {/* Instagram Social Media Card (example) */}
            <SocialMediaCard
              link="https://www.instagram.com/hyrcanian_run"
              title="اینستاگرام"
              description="تصاویر و ویدیوهای مسابقات را در اینستاگرام ما ببینید"
              icon={Share}
            />
          </div>
        </div>
      </section>

      <div className="w-full  relative overflow-hidden">
        <img src={strip2} alt="Hyrcania" fill className="object-cover" />
      </div>

      {/* Sponsors Section with Card Components */}
      <section className="py-12 px-4 md:px-8 bg-transparent z-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 zawya-font text-[#c0ff00]">اسپانسر های مسابقه</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {event.sponsers.map((sponsor, index) => (
              <SponsorCard key={index} sponsor={sponsor} />
            ))}
          </div>
        </div>
      </section>

      <div className="w-full  relative overflow-hidden">
        <img src={strip2} alt="Hyrcania" fill className="object-cover" />
      </div>

      {/* Registration CTA */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-3xl mx-auto ">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">ثبت نام برای مسابقه</h2>
          <div className="flex justify-center">
            <Link
              to="/marathon"
              state={{ event }}
              className="transition duration-300 ease-in-out mt-8 mb-10"
            >
              <button className="bg-[#D2FF72] hover:bg-[#1e1e1e] hover:text-[#D2FF72] text-[#1e1e1e] font-bold py-2 px-6 rounded-full">
                ثبت نام
              </button>
            </Link>
          </div>
        </div>
        <CountdownTimer targetJalaliDate={date} />
      </section>
    </main>
  );
};

export default MarathonDetail;