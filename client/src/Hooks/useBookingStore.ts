import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
  selectedService: {
    name: string;
    price: number;
    description: string;
  } | null;
  selectedSlot: {
    date: string;
    startTime: string;
    endTime: string;
  } | null;
  mentorDetails: {
    id: string;
    name: string;
    profilePicture: string;
  } | null;
  bookingDetails: {
    name: string;
    email: string;
    phone: string;
    sessionDetails: string;
  } | null;
  setSelectedService: (service: BookingState["selectedService"]) => void;
  setSelectedSlot: (
    slot: Omit<NonNullable<BookingState["selectedSlot"]>, "date"> & {
      date: Date;
    }
  ) => void;
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
            ...slot,
            date: slot.date.toISOString(),
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
    }
  )
);

export default useBookingStore;
