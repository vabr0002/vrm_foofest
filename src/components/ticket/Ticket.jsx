import React, { useState } from "react";
import useBookingStore from "@/stores/useBookingStore";

const Tickets = ({ onNext }) => {
  const tickets = useBookingStore((state) => state.tickets);
  const updateTickets = useBookingStore((state) => state.updateTickets);
  const totalTickets = useBookingStore((state) => state.getTotalTickets());

  const [errorMessage, setErrorMessage] = useState("");

  const handleQuantityChange = (id, quantity) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === id ? { ...ticket, quantity: Math.max(0, quantity) } : ticket
    );

    const newTotalTickets = updatedTickets.reduce(
      (total, ticket) => total + ticket.quantity,
      0
    );

    if (newTotalTickets > 10) {
      setErrorMessage("You can buy a maximum of 10 tickets.");
      return;
    }

    setErrorMessage("");
    updateTickets(updatedTickets);
  };

  const hasSelectedTickets = totalTickets > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-primary">Select Tickets</h2>

      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex justify-between items-center mb-4">
          <p className="text-lg">{ticket.title}</p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                handleQuantityChange(ticket.id, ticket.quantity - 1)
              }
              className="flex items-center justify-center border border-primary text-white rounded-full bg-primary hover:bg-transparent hover:text-primary text-lg transition focus:outline-none h-[32px] w-[32px] cursor-pointer"
              disabled={ticket.quantity <= 0}
            >
              -
            </button>

            <input
              type="number"
              value={ticket.quantity}
              onChange={(e) =>
                handleQuantityChange(
                  ticket.id,
                  parseInt(e.target.value, 10) || 0
                )
              }
              className="w-16 text-center border border-primary text-invert bg-inherit text-lg focus:outline-none focus:ring-0"
              min="0"
            />

            <button
              onClick={() =>
                handleQuantityChange(ticket.id, ticket.quantity + 1)
              }
              className="flex items-center justify-center bg-primary border border-primary text-white rounded-full hover:bg-transparent hover:text-primary text-lg transition focus:outline-none h-[32px] w-[32px] cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      ))}

      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}

      <hr className="border-primary my-6" />
      <div className="flex justify-end mt-4">
        <button
          onClick={onNext}
          className={`px-10 py-2 bg-primary border border-primary text-white rounded-full hover:bg-transparent hover:text-primary transition ${
            !hasSelectedTickets ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!hasSelectedTickets}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Tickets;
