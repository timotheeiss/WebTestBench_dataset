import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Heart } from 'lucide-react';
import { useEvents } from '@/context/EventContext';
import { EventCategory } from '@/data/events';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TicketSelector } from '@/components/events/TicketSelector';
import { CheckoutForm } from '@/components/events/CheckoutForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const categoryLabels: Record<EventCategory, string> = {
  concert: 'Concert',
  conference: 'Conference',
  workshop: 'Workshop',
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useEvents();
  const event = getEventById(id || '');

  const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleTicketChange = (ticketId: string, quantity: number) => {
    setSelectedTickets((prev) => ({ ...prev, [ticketId]: quantity }));
  };

  const totalAmount = useMemo(() => {
    if (!event) return 0;
    return Object.entries(selectedTickets).reduce((sum, [ticketId, qty]) => {
      const ticket = event.ticketTypes.find((t) => t.id === ticketId);
      return sum + (ticket?.price || 0) * qty;
    }, 0);
  }, [event, selectedTickets]);

  const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied!',
        description: 'Event link has been copied to clipboard.',
      });
    } catch {
      toast({
        title: 'Share this event',
        description: window.location.href,
      });
    }
  };

  if (!event) {
    return (
      <div
        className="container py-16 text-center"
        data-semtag-id="event.not-found"
        data-semtag-role="region"
      >
        <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild variant="hero">
          <Link
            to="/"
            data-semtag-id="event.not-found.browse"
            data-semtag-role="navigation"
            data-semtag-target="events.page"
          >
            Browse Events
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-4 left-4">
          <Button asChild variant="secondary" size="sm" className="backdrop-blur-sm">
            <Link
              to="/"
              data-semtag-id="event.back"
              data-semtag-role="navigation"
              data-semtag-target="events.page"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="backdrop-blur-sm"
            onClick={handleShare}
            data-semtag-id="event.share"
            data-semtag-role="action"
            data-semtag-action="share-event"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="backdrop-blur-sm"
            data-semtag-id="event.favorite"
            data-semtag-role="action"
            data-semtag-action="favorite-event"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="container -mt-20 relative z-10 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
              <Badge
                variant={event.category}
                className="mb-4"
                data-semtag-id="event.category"
                data-semtag-role="observable"
                data-semtag-state="event.category"
              >
                {categoryLabels[event.category]}
              </Badge>
              <h1
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                data-semtag-id="event.title"
                data-semtag-role="observable"
                data-semtag-state="event.title"
              >
                {event.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span
                    data-semtag-id="event.date"
                    data-semtag-role="observable"
                    data-semtag-state="event.date"
                  >
                    {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span
                    data-semtag-id="event.time"
                    data-semtag-role="observable"
                    data-semtag-state="event.time"
                  >
                    {event.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span
                    data-semtag-id="event.location"
                    data-semtag-role="observable"
                    data-semtag-state="event.location"
                  >
                    {event.location}
                  </span>
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-foreground mb-3">About this event</h3>
                <p
                  className="text-muted-foreground leading-relaxed"
                  data-semtag-id="event.description"
                  data-semtag-role="observable"
                  data-semtag-state="event.description"
                >
                  {event.description}
                </p>
              </div>
            </div>

            {/* Tickets Section (visible on mobile) */}
            <div
              className="lg:hidden bg-card rounded-2xl p-6 shadow-card border border-border"
              data-semtag-id="tickets.panel.mobile"
              data-semtag-role="region"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Select Tickets</h3>
              <TicketSelector
                tickets={event.ticketTypes}
                selectedTickets={selectedTickets}
                onTicketChange={handleTicketChange}
                collectionId="tickets.mobile"
              />

              {totalTickets > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="text-muted-foreground"
                      data-semtag-id="cart.count.mobile"
                      data-semtag-role="observable"
                      data-semtag-state="cart.count"
                    >
                      Total ({totalTickets} tickets)
                    </span>
                    <span
                      className="text-2xl font-bold text-foreground"
                      data-semtag-id="cart.total.mobile"
                      data-semtag-role="observable"
                      data-semtag-state="cart.total"
                    >
                      ${totalAmount}
                    </span>
                  </div>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsCheckoutOpen(true)}
                    data-semtag-id="cart.checkout.mobile"
                    data-semtag-role="action"
                    data-semtag-action="open-checkout"
                  >
                    Continue to Checkout
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Ticket Sidebar (desktop) */}
          <div className="hidden lg:block">
            <div
              className="sticky top-24 bg-card rounded-2xl p-6 shadow-card border border-border"
              data-semtag-id="tickets.panel"
              data-semtag-role="region"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">Select Tickets</h3>
              <TicketSelector
                tickets={event.ticketTypes}
                selectedTickets={selectedTickets}
                onTicketChange={handleTicketChange}
                collectionId="tickets"
              />

              {totalTickets > 0 && (
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="text-muted-foreground"
                      data-semtag-id="cart.count"
                      data-semtag-role="observable"
                      data-semtag-state="cart.count"
                    >
                      Total ({totalTickets} tickets)
                    </span>
                    <span
                      className="text-2xl font-bold text-foreground"
                      data-semtag-id="cart.total"
                      data-semtag-role="observable"
                      data-semtag-state="cart.total"
                    >
                      ${totalAmount}
                    </span>
                  </div>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => setIsCheckoutOpen(true)}
                    data-semtag-id="cart.checkout"
                    data-semtag-role="action"
                    data-semtag-action="open-checkout"
                  >
                    Continue to Checkout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Dialog */}
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-lg bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl">Complete Your Reservation</DialogTitle>
          </DialogHeader>
          <CheckoutForm
            event={event}
            selectedTickets={selectedTickets}
            onClose={() => {
              setIsCheckoutOpen(false);
              setSelectedTickets({});
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetail;
