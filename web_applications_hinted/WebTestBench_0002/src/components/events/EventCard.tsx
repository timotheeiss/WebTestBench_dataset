import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event, EventCategory } from '@/data/events';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  /**
   * `data-semtag-id` of the collection this card is rendered in, used to scope
   * the card's hint ids so the same event can appear in two collections
   * without colliding. Hints are omitted when it is absent.
   */
  collectionId?: string;
}

const categoryLabels: Record<EventCategory, string> = {
  concert: 'Concert',
  conference: 'Conference',
  workshop: 'Workshop',
};

export function EventCard({ event, collectionId }: EventCardProps) {
  const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.price));
  const formattedDate = format(new Date(event.date), 'MMM d, yyyy');
  const itemId = collectionId ? `${collectionId}.item.${event.id}` : undefined;

  return (
    <Link
      to={`/event/${event.id}`}
      className="group block"
      data-semtag-id={itemId}
      data-semtag-role={itemId ? 'navigation' : undefined}
      data-semtag-target={itemId ? 'event.detail' : undefined}
    >
      <article className="bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border/50">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={event.category}>{categoryLabels[event.category]}</Badge>
          </div>
          {event.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-secondary">Featured</Badge>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{formattedDate}</span>
              <Clock className="h-4 w-4 text-primary ml-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span
              className="text-lg font-bold text-foreground"
              data-semtag-id={itemId ? `${itemId}.price` : undefined}
              data-semtag-role={itemId ? 'observable' : undefined}
              data-semtag-state={itemId ? 'event.price.from' : undefined}
            >
              From ${lowestPrice}
            </span>
            <span className="text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
              View Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
