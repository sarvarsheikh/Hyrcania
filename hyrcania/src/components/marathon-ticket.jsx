import React from "react";
import Runner from "@/components/images/ticket.jpg";

export default function MarathonTicket({ ticket }) {
  return (
    <div className="flex flex-col sm:flex-row max-w-md overflow-hidden rounded-lg shadow-lg bg-white">
      {/* Image - Full width on mobile, partial width on larger screens */}
      <div className="w-full sm:w-2/5 h-48 sm:h-auto relative border-2 border-blue-400 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg overflow-hidden">
        <img
          src={Runner}
          alt="Runner in red uniform"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content - Full width on mobile, partial width on larger screens */}
      <div className="w-full sm:w-3/5 p-4 sm:p-6 flex flex-col justify-between">
       

        {/* Event name - Smaller on mobile */}
        <h2 className="text-2xl sm:text-lg font-bold text-gray-700 leading-tight">
          {ticket.title}
        </h2>

        {/* Distance */}
        <p className="text-gray-600 text-xs sm:text-base mt-1 sm:mt-1 mb-3 sm:mb-3">
        {` ${ticket.distanc}km :مسافت`}
        </p>

        {/* Price - Slightly smaller on mobile */}
        <div className="mb-2 sm:mb-4">
          <span className="text-xl sm:text-xl font-bold text-gray-800">
           {`${ticket.price} IRR`} 
          </span>
        </div>

        {/* Date and time */}
        <p className="text-gray-700 text-sm sm:text-base mt-auto">{ticket.start_time}
        </p>
      </div>
    </div>
  );
}
