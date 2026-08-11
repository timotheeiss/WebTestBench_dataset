import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Mail, Phone, User, Check } from 'lucide-react';
import { Event, TicketType } from '@/data/events';
import { useEvents } from '@/context/EventContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface CheckoutFormProps {
  event: Event;
  selectedTickets: Record<string, number>;
  onClose: () => void;
}

export function CheckoutForm({ event, selectedTickets, onClose }: CheckoutFormProps) {
  const navigate = useNavigate();
  const { addReservation } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const tickets = Object.entries(selectedTickets)
    .filter(([_, qty]) => qty > 0)
    .map(([ticketId, quantity]) => {
      const ticket = event.ticketTypes.find((t) => t.id === ticketId)!;
      return { ticket, quantity };
    });

  const totalAmount = tickets.reduce(
    (sum, { ticket, quantity }) => sum + ticket.price * quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      addReservation({
        eventId: event.id,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        tickets: tickets.map(({ ticket, quantity }) => ({
          ticketTypeId: ticket.id,
          quantity,
        })),
        totalAmount,
      });

      toast({
        title: 'Reservation Confirmed!',
        description: `Your tickets for ${event.title} have been reserved.`,
      });

      setIsSubmitting(false);
      onClose();
      navigate('/');
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      data-semtag-id="checkout.form"
      data-semtag-role="region"
    >
      {/* Order Summary */}
      <div
        className="bg-muted/50 rounded-xl p-4 space-y-3"
        data-semtag-id="checkout.summary"
        data-semtag-role="collection"
      >
        <h4 className="font-semibold text-foreground">Order Summary</h4>
        {tickets.map(({ ticket, quantity }) => (
          <div key={ticket.id} className="flex justify-between text-sm">
            <span
              className="text-muted-foreground"
              data-semtag-id={`checkout.summary.item.${ticket.id}`}
              data-semtag-role="observable"
              data-semtag-state="checkout.line.label"
            >
              {ticket.name} × {quantity}
            </span>
            <span
              className="font-medium"
              data-semtag-id={`checkout.summary.item.${ticket.id}.amount`}
              data-semtag-role="observable"
              data-semtag-state="checkout.line.amount"
            >
              ${ticket.price * quantity}
            </span>
          </div>
        ))}
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-semibold">Total</span>
          <span
            className="text-xl font-bold text-primary"
            data-semtag-id="checkout.total"
            data-semtag-role="observable"
            data-semtag-state="cart.total"
          >
            ${totalAmount}
          </span>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Your Information</h4>
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              className="pl-10"
              data-semtag-id="checkout.name"
              data-semtag-role="input"
              data-semtag-state="checkout.customer.name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              className="pl-10"
              data-semtag-id="checkout.email"
              data-semtag-role="input"
              data-semtag-state="checkout.customer.email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="555-0123"
              className="pl-10"
              data-semtag-id="checkout.phone"
              data-semtag-role="input"
              data-semtag-state="checkout.customer.phone"
            />
          </div>
        </div>
      </div>

      {/* Payment Notice */}
      <div className="flex items-start gap-3 p-4 bg-accent/10 rounded-xl text-sm">
        <CreditCard className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          This is a demo checkout. No actual payment will be processed. Your reservation will be confirmed immediately.
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
          disabled={isSubmitting}
          data-semtag-id="checkout.cancel"
          data-semtag-role="action"
          data-semtag-action="cancel-checkout"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="hero"
          className="flex-1"
          disabled={isSubmitting}
          data-semtag-id="checkout.submit"
          data-semtag-role="action"
          data-semtag-action="submit-reservation"
        >
          {isSubmitting ? (
            <>
              <span className="animate-pulse">Processing...</span>
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Confirm Reservation
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
