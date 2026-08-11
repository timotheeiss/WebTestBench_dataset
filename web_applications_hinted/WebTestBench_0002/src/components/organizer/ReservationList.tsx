import { format } from 'date-fns';
import { Mail, Phone, User, Ticket } from 'lucide-react';
import { Reservation, Event } from '@/data/events';

interface ReservationListProps {
  reservations: Reservation[];
  event: Event;
  /**
   * `data-semtag-id` of this list's collection container. The dashboard renders
   * one list per event, so each call site passes its own prefix to keep hint
   * ids unique. Hints are omitted when it is absent.
   */
  collectionId?: string;
}

export function ReservationList({ reservations, event, collectionId }: ReservationListProps) {
  if (reservations.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p
          data-semtag-id={collectionId ? `${collectionId}.empty` : undefined}
          data-semtag-role={collectionId ? 'observable' : undefined}
          data-semtag-state={collectionId ? 'event.reservations.empty' : undefined}
        >
          No reservations yet for this event.
        </p>
      </div>
    );
  }

  return (
    <div
      className="space-y-4"
      data-semtag-id={collectionId}
      data-semtag-role={collectionId ? 'collection' : undefined}
    >
      {reservations.map((reservation) => {
        const ticketDetails = reservation.tickets.map((t) => {
          const ticketType = event.ticketTypes.find((tt) => tt.id === t.ticketTypeId);
          return { ...t, name: ticketType?.name || 'Unknown Ticket' };
        });
        const itemId = collectionId ? `${collectionId}.item.${reservation.id}` : undefined;

        return (
          <div
            key={reservation.id}
            className="p-4 bg-card rounded-xl border border-border"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span
                    className="font-semibold text-foreground"
                    data-semtag-id={itemId}
                    data-semtag-role={itemId ? 'observable' : undefined}
                    data-semtag-state={itemId ? 'reservation.customer.name' : undefined}
                  >
                    {reservation.customerName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span
                    data-semtag-id={itemId ? `${itemId}.email` : undefined}
                    data-semtag-role={itemId ? 'observable' : undefined}
                    data-semtag-state={itemId ? 'reservation.customer.email' : undefined}
                  >
                    {reservation.customerEmail}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <span
                    data-semtag-id={itemId ? `${itemId}.phone` : undefined}
                    data-semtag-role={itemId ? 'observable' : undefined}
                    data-semtag-state={itemId ? 'reservation.customer.phone' : undefined}
                  >
                    {reservation.customerPhone}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div
                  className="text-lg font-bold text-primary"
                  data-semtag-id={itemId ? `${itemId}.amount` : undefined}
                  data-semtag-role={itemId ? 'observable' : undefined}
                  data-semtag-state={itemId ? 'reservation.total' : undefined}
                >
                  ${reservation.totalAmount}
                </div>
                <div
                  className="text-xs text-muted-foreground"
                  data-semtag-id={itemId ? `${itemId}.created` : undefined}
                  data-semtag-role={itemId ? 'observable' : undefined}
                  data-semtag-state={itemId ? 'reservation.created' : undefined}
                >
                  {format(new Date(reservation.createdAt), 'MMM d, yyyy h:mm a')}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-foreground">Tickets</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ticketDetails.map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-sm"
                    data-semtag-id={itemId ? `${itemId}.ticket-${t.ticketTypeId}` : undefined}
                    data-semtag-role={itemId ? 'observable' : undefined}
                    data-semtag-state={itemId ? 'reservation.ticket' : undefined}
                  >
                    {t.name} × {t.quantity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
