import React, { useEffect, useState } from "react";
import moment from "jalali-moment";
import { jalaliToGregorian } from "@/lib/jalali-utils";

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
    <div className="text-5xl font-extrabold text-center text-gray-50 rtl">
      {Object.keys(timeLeft).length > 0 ? (
        <>
          <span className="mx-4"> ثانیه {timeLeft.seconds}</span>
          <span className="mx-4"> دقیقه {timeLeft.minutes}</span>
          <span className="mx-4"> ساعت {timeLeft.hours} </span>
          <span className="mx-4"> روز {timeLeft.days}</span>
        </>
      ) : (
        <span>🏁 ماراتن شروع شده است!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
