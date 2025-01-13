import { create } from "zustand";
import {
  reserveSpot,
  fullfillReservation,
  getCampingAreas
} from "../lib/database";

// Default værdier for billetter og camping
const defaultTickets = [
  { id: 1, title: "Foo - Ticket", price: 799, quantity: 0 },
  { id: 2, title: "VIP - Ticket", price: 1299, quantity: 0 }
];

const defaultCampingSelection = {
  area: null,
  tents: { twoPerson: 0, threePerson: 0, ownTent: 0 },
  greenCamping: false,
  areas: []
};

const useBookingStore = create((set, get) => ({
  /* Tickets Management */
  tickets: [...defaultTickets],

  getTotalTickets: () =>
    get().tickets.reduce((total, ticket) => total + ticket.quantity, 0),

  updateTickets: (updatedTickets) => {
    set((state) => {
      const totalTickets = updatedTickets.reduce(
        (total, ticket) => total + ticket.quantity,
        0
      );

      let updatedTents = { ...state.campingSelection.tents };

      while (
        updatedTents.twoPerson +
          updatedTents.threePerson +
          updatedTents.ownTent >
        totalTickets
      ) {
        if (updatedTents.ownTent > 0) {
          updatedTents.ownTent -= 1;
        } else if (updatedTents.threePerson > 0) {
          updatedTents.threePerson -= 1;
        } else if (updatedTents.twoPerson > 0) {
          updatedTents.twoPerson -= 1;
        }
      }

      return {
        ...state,
        tickets: updatedTickets,
        campingSelection: {
          ...state.campingSelection,
          tents: updatedTents
        }
      };
    });
  },

  /* Camping Management */
  campingSelection: { ...defaultCampingSelection },

  getTotalTents: () =>
    Object.values(get().campingSelection.tents).reduce(
      (total, count) => total + count,
      0
    ),

  updateCampingSelection: (updatedCamping) =>
    set((state) => ({
      campingSelection: {
        ...state.campingSelection,
        ...updatedCamping
      }
    })),

  fetchCampingAreas: async () => {
    try {
      const areas = await getCampingAreas();
      const formattedAreas = areas.map((area) => ({
        area: area.name || area.area,
        available: area.available
      }));
      set((state) => ({
        campingSelection: {
          ...state.campingSelection,
          areas: formattedAreas
        }
      }));
    } catch (error) {
      console.error("Fejl ved hentning af campingområder:", error);
    }
  },

  /* Reservation Management */
  reservationId: null,

  getReservationId: () => get().reservationId,

  setReservationId: (id) => set({ reservationId: id }),

  createReservation: async (area, totalTents) => {
    try {
      const { id, timeout } = await reserveSpot(area, totalTents);
      set({
        reservationId: id,
        timer: timeout / 1000,
        timerActive: true
      });
      return id;
    } catch (error) {
      console.error("Fejl ved oprettelse af reservation:", error);
      return null;
    }
  },

  completeReservation: async () => {
    const { reservationId } = get();
    if (!reservationId) {
      console.error("Ingen reservations-ID fundet.");
      return null;
    }

    try {
      const response = await fullfillReservation(reservationId);
      set({ reservationId: response.id || reservationId });
      set({ timer: 0, timerActive: false });
      return response;
    } catch (error) {
      console.error("Fejl ved fuldførelse af reservation:", error);
      return null;
    }
  },

  /* Timer Management */
  timer: 0,
  timerActive: false,

  setTimer: (time) => set({ timer: time, timerActive: true }),

  decrementTimer: () =>
    set((state) => ({
      timer: Math.max(state.timer - 1, 0),
      timerActive: state.timer > 1
    })),

  stopTimer: () => set({ timer: 0, timerActive: false }),

  /* Reset Management */
  resetBasket: () =>
    set({
      tickets: [...defaultTickets],
      campingSelection: { ...defaultCampingSelection }
    }),

  resetBooking: () =>
    set({
      tickets: [...defaultTickets],
      campingSelection: { ...defaultCampingSelection },
      timer: 0,
      timerActive: false,
      reservationId: null
    })
}));

export default useBookingStore;
