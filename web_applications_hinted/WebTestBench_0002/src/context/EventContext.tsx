import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, Reservation, initialEvents, initialReservations } from '@/data/events';

interface EventContextType {
  events: Event[];
  reservations: Reservation[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt'>) => void;
  getEventById: (id: string) => Event | undefined;
  getReservationsByEventId: (eventId: string) => Reservation[];
  getEventsByOrganizer: (organizerId: string) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: `event-${Date.now()}`,
    };
    setEvents((prev) => [...prev, newEvent]);
  };

  const updateEvent = (id: string, eventUpdate: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === id ? { ...event, ...eventUpdate } : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const addReservation = (reservation: Omit<Reservation, 'id' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setReservations((prev) => [...prev, newReservation]);

    // Update ticket quantities
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id === reservation.eventId) {
          return {
            ...event,
            ticketTypes: event.ticketTypes.map((ticket) => {
              const reservedTicket = reservation.tickets.find(
                (t) => t.ticketTypeId === ticket.id
              );
              if (reservedTicket) {
                return {
                  ...ticket,
                  quantity: ticket.quantity - reservedTicket.quantity,
                };
              }
              return ticket;
            }),
          };
        }
        return event;
      })
    );
  };

  const getEventById = (id: string) => events.find((event) => event.id === id);

  const getReservationsByEventId = (eventId: string) =>
    reservations.filter((res) => res.eventId === eventId);

  const getEventsByOrganizer = (organizerId: string) =>
    events.filter((event) => event.organizerId === organizerId);

  return (
    <EventContext.Provider
      value={{
        events,
        reservations,
        addEvent,
        updateEvent,
        deleteEvent,
        addReservation,
        getEventById,
        getReservationsByEventId,
        getEventsByOrganizer,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
