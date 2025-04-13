import React from 'react';

export default function TicketItem({ ticket }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="font-medium text-gray-900">{ticket.eventName}</div>
      <div className="text-sm text-gray-600">{ticket.location}</div>
      <div className="text-sm text-gray-600">{ticket.date}</div>
      <div className="flex items-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {ticket.status}
        </span>
      </div>
    </div>
  );
}