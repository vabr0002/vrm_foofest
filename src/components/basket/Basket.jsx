import React, { useEffect, useState } from "react";
import useBookingStore from "@/stores/useBookingStore";
import { getCurrentTheme } from "@/utils/themeSwitcher"; // Import getCurrentTheme

const Basket = () => {
  const tickets = useBookingStore((state) => state.tickets);
  const campingSelection = useBookingStore((state) => state.campingSelection);
  const totalTents = useBookingStore((state) => state.getTotalTents());
  const totalTickets = useBookingStore((state) => state.getTotalTickets());

  const ticketTotal = tickets.reduce(
    (total, ticket) => total + ticket.price * ticket.quantity,
    0
  );

  const tentTotal =
    campingSelection.tents.twoPerson * 299 +
    campingSelection.tents.threePerson * 399;

  const greenCampingPrice = campingSelection.greenCamping ? 249 : 0;
  const bookingFee = 99;
  const total = ticketTotal + tentTotal + greenCampingPrice + bookingFee;

  // Get the current theme directly from the utility function
  const [theme, setTheme] = useState(getCurrentTheme());

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(getCurrentTheme()); // Update the theme when it changes globally
    };

    // Listen to the custom event to detect theme change
    window.addEventListener("themeChange", handleThemeChange);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  // Dynamically set text color based on theme
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const borderColor = "border-primary"; // Always use primary border color
  const headingColor = "text-primary"; // Always use primary text color for h3

  return (
    <div
      className={`sticky top-16 border ${borderColor} p-4 rounded-xl bg-transparent`}
    >
      {totalTickets > 0 && (
        <>
          <h3 className={`font-bold text-lg ${headingColor} mb-2`}>Tickets</h3>
          <div className="mb-4">
            {tickets.map(
              (ticket) =>
                ticket.quantity > 0 && (
                  <div key={ticket.id} className="flex justify-between mb-2">
                    <p className={textColor}>{ticket.title}</p>
                    <p className={textColor}>
                      {ticket.quantity} x {ticket.price} DKK
                    </p>
                  </div>
                )
            )}
            <hr className="my-4" />
          </div>
        </>
      )}

      {(campingSelection.area || totalTents > 0) && (
        <>
          <h3 className={`font-bold text-lg ${headingColor} mb-2`}>Camping</h3>

          {campingSelection.area && (
            <div className="flex justify-between items-center">
              <p className={textColor}>Area:</p>
              <p className={textColor}>{campingSelection.area}</p>
            </div>
          )}

          {campingSelection.tents.twoPerson > 0 && (
            <div className="flex justify-between mb-2">
              <p className={textColor}>
                2 person tent x {campingSelection.tents.twoPerson}
              </p>
              <p className={textColor}>
                {campingSelection.tents.twoPerson * 299} DKK
              </p>
            </div>
          )}
          {campingSelection.tents.threePerson > 0 && (
            <div className="flex justify-between mb-2">
              <p className={textColor}>
                3 person tent x {campingSelection.tents.threePerson}
              </p>
              <p className={textColor}>
                {campingSelection.tents.threePerson * 399} DKK
              </p>
            </div>
          )}
          {campingSelection.tents.ownTent > 0 && (
            <div className="flex justify-between mb-2">
              <p className={textColor}>
                Own Tent x {campingSelection.tents.ownTent}
              </p>
              <p className={textColor}>0 DKK</p> {/* Gratis telt */}
            </div>
          )}

          <hr className="my-4" />
        </>
      )}

      {/* Oversigt */}
      <h3 className={`font-bold text-lg ${headingColor} mb-2`}>Overview</h3>
      {tickets.some((ticket) => ticket.quantity > 0) && (
        <div className="flex justify-between mb-2">
          <p className={textColor}>Tickets x {totalTickets}</p>
          <p className={textColor}>{ticketTotal} DKK</p>
        </div>
      )}
      {totalTents > 0 && (
        <div className="flex justify-between mb-2">
          <p className={textColor}>Tents x {totalTents}</p>
          <p className={textColor}>{tentTotal} DKK</p>
        </div>
      )}
      {campingSelection.greenCamping && (
        <div className="flex justify-between mb-2">
          <p className={textColor}>Green camping</p>
          <p className={textColor}>{greenCampingPrice} DKK</p>
        </div>
      )}
      <div className="flex justify-between mb-2">
        <p className={textColor}>Booking fee</p>
        <p className={textColor}>{bookingFee} DKK</p>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between text-lg font-bold">
        <p className={textColor}>TOTAL:</p>
        <p className={textColor}>{total} DKK</p>
      </div>
    </div>
  );
};

export default Basket;
