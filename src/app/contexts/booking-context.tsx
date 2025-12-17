'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface BookingContextType {
  newBookings: Date[];
  addBooking: (date: Date) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [newBookings, setNewBookings] = useState<Date[]>([]);

  const addBooking = useCallback((date: Date) => {
    setNewBookings(prev => [...prev, date]);
  }, []);

  return (
    <BookingContext.Provider value={{ newBookings, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
