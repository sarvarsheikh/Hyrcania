import TicketItem from "./TicketItem";


export default function TicketList() {
  // Define the Ticket type inline
  // This would typically come from an API or database
  const tickets = [
    {
      id: "1",
      eventName: "Mt. Bachelor",
      location: "Central Park, New York City",
      date: "March 15-18, 2024",
      status: "paid",
    },
    // You can add more tickets here if needed
  ]
  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
