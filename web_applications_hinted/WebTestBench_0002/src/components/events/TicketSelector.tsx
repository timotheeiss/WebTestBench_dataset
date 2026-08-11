import { Minus, Plus } from 'lucide-react';
import { TicketType } from '@/data/events';
import { Button } from '@/components/ui/button';

interface TicketSelectorProps {
  tickets: TicketType[];
  selectedTickets: Record<string, number>;
  onTicketChange: (ticketId: string, quantity: number) => void;
  /**
   * `data-semtag-id` of this selector's collection container. The page renders
   * one selector per responsive layout, so each call site passes its own
   * prefix to keep hint ids unique. Hints are omitted when it is absent.
   */
  collectionId?: string;
}

export function TicketSelector({
  tickets,
  selectedTickets,
  onTicketChange,
  collectionId,
}: TicketSelectorProps) {
  return (
    <div
      className="space-y-4"
      data-semtag-id={collectionId}
      data-semtag-role={collectionId ? 'collection' : undefined}
    >
      {tickets.map((ticket) => {
        const quantity = selectedTickets[ticket.id] || 0;
        const isAvailable = ticket.quantity > 0;
        const maxQuantity = Math.min(ticket.quantity, 10);
        const itemId = collectionId ? `${collectionId}.item.${ticket.id}` : undefined;

        return (
          <div
            key={ticket.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border ${
              isAvailable ? 'border-border bg-card' : 'border-border/50 bg-muted/50'
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4
                  className="font-semibold text-foreground"
                  data-semtag-id={itemId}
                  data-semtag-role={itemId ? 'observable' : undefined}
                  data-semtag-state={itemId ? 'ticket.name' : undefined}
                >
                  {ticket.name}
                </h4>
                <span
                  className="text-lg font-bold text-primary"
                  data-semtag-id={itemId ? `${itemId}.price` : undefined}
                  data-semtag-role={itemId ? 'observable' : undefined}
                  data-semtag-state={itemId ? 'ticket.price' : undefined}
                >
                  ${ticket.price}
                </span>
              </div>
              {ticket.description && (
                <p className="text-sm text-muted-foreground">{ticket.description}</p>
              )}
              <p
                className="text-xs text-muted-foreground mt-1"
                data-semtag-id={itemId ? `${itemId}.availability` : undefined}
                data-semtag-role={itemId ? 'observable' : undefined}
                data-semtag-state={itemId ? 'ticket.availability' : undefined}
              >
                {isAvailable ? `${ticket.quantity} tickets available` : 'Sold out'}
              </p>
            </div>

            {isAvailable ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onTicketChange(ticket.id, Math.max(0, quantity - 1))}
                  disabled={quantity === 0}
                  className="h-10 w-10"
                  data-semtag-id={itemId ? `${itemId}.decrease` : undefined}
                  data-semtag-role={itemId ? 'action' : undefined}
                  data-semtag-action={itemId ? 'decrease-ticket-quantity' : undefined}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span
                  className="w-8 text-center font-semibold text-lg"
                  data-semtag-id={itemId ? `${itemId}.quantity` : undefined}
                  data-semtag-role={itemId ? 'observable' : undefined}
                  data-semtag-state={itemId ? 'ticket.selected.quantity' : undefined}
                >
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onTicketChange(ticket.id, Math.min(maxQuantity, quantity + 1))}
                  disabled={quantity >= maxQuantity}
                  className="h-10 w-10"
                  data-semtag-id={itemId ? `${itemId}.increase` : undefined}
                  data-semtag-role={itemId ? 'action' : undefined}
                  data-semtag-action={itemId ? 'increase-ticket-quantity' : undefined}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <span className="text-sm font-medium text-muted-foreground px-4 py-2 bg-muted rounded-lg">
                Sold Out
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
