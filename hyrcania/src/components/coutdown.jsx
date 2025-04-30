import React, { useEffect, useState } from "react";
import moment from "jalali-moment";

const CountdownTimer = ({ targetJalaliDate }) => {
  const calculateTimeLeft = () => {
    const gregorianTarget = moment
      .from(targetJalaliDate, "fa", "YYYY/MM/DD HH:mm:ss")
      .locale("en")
      .format("YYYY-MM-DDTHH:mm:ss");
      
    const difference = +new Date(gregorianTarget) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return {};
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="rtl flex flex-col items-center justify-center w-full">
      {Object.keys(timeLeft).length > 0 ? (
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 text-gray-50">
          <div className="flex flex-col items-center">
            <div className=" rounded-lg p-3 md:p-4 w-24 md:w-32">
              <span className="text-2xl md:text-4xl lg:text-5xl font-extrabold block text-center">{timeLeft.days}</span>
            </div>
            <span className="text-sm md:text-base mt-1 text-gray-300">روز</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="rounded-lg p-3 md:p-4 w-24 md:w-32">
              <span className="text-2xl md:text-4xl lg:text-5xl font-extrabold block text-center">{timeLeft.hours}</span>
            </div>
            <span className="text-sm md:text-base mt-1 text-gray-300">ساعت</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="rounded-lg p-3 md:p-4 w-24 md:w-32">
              <span className="text-2xl md:text-4xl lg:text-5xl font-extrabold block text-center">{timeLeft.minutes}</span>
            </div>
            <span className="text-sm md:text-base mt-1 text-gray-300">دقیقه</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className=" rounded-lg p-3 md:p-4 w-24 md:w-32">
              <span className="text-2xl md:text-4xl lg:text-5xl font-extrabold block text-center">{timeLeft.seconds}</span>
            </div>
            <span className="text-sm md:text-base mt-1 text-gray-300">ثانیه</span>
          </div>
        </div>
      ) : (
        <div className=" p-5 rounded-lg">
          <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-50">🏁 ماراتن شروع شده است!</span>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;