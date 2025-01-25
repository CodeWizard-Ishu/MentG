import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
  selectedService: {
    name: string;
    price: number;
  } | null;
  selectedSlot: {
    date: Date;
    startTime: Date;
    endTime: Date;
  } | null;
  mentorDetails: {
    name: string;
  } | null;
  bookingDetails: {
    name: string;
    email: string;
    phone: string;
    sessionDetails: string;
  } | null;
  setSelectedService: (service: BookingState["selectedService"]) => void;
  setSelectedSlot: (slot: NonNullable<BookingState["selectedSlot"]>) => void;
  setMentorDetails: (mentor: BookingState["mentorDetails"]) => void;
  setBookingDetails: (details: BookingState["bookingDetails"]) => void;
  clearBooking: () => void;
}

const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      selectedService: null,
      selectedSlot: null,
      mentorDetails: null,
      bookingDetails: null,
      setSelectedService: (service) => set({ selectedService: service }),
      setSelectedSlot: (slot) =>
        set({
          selectedSlot: {
            date: slot.date,
            startTime: slot.startTime,
            endTime: slot.endTime,
          },
        }),
      setMentorDetails: (mentor) => set({ mentorDetails: mentor }),
      setBookingDetails: (details) => set({ bookingDetails: details }),
      clearBooking: () =>
        set({
          selectedService: null,
          selectedSlot: null,
          mentorDetails: null,
          bookingDetails: null,
        }),
    }),
    {
      name: "booking-store",
      // Add custom serialization/deserialization for Date objects
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const data = JSON.parse(str);
          if (data.state.selectedSlot) {
            data.state.selectedSlot.date = new Date(data.state.selectedSlot.date);
            data.state.selectedSlot.startTime = new Date(data.state.selectedSlot.startTime);
            data.state.selectedSlot.endTime = new Date(data.state.selectedSlot.endTime);
          }
          return data;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

export default useBookingStore;
