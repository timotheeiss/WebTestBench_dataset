import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Event, EventCategory } from '@/data/events';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface FeaturedEventsProps {
  events: Event[];
}

const categoryLabels: Record<EventCategory, string> = {
  concert: 'Concert',
  conference: 'Conference',
  workshop: 'Workshop',
};

export function FeaturedEvents({ events }: FeaturedEventsProps) {
  if (events.length === 0) return null;

  const mainEvent = events[0];
  const sideEvents = events.slice(1, 3);

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Featured Events</h2>
        <Link
          to="/"
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          data-semtag-id="home.featured.view-all"
          data-semtag-role="navigation"
          data-semtag-target="events.page"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div
        className="grid lg:grid-cols-2 gap-6"
        data-semtag-id="home.featured"
        data-semtag-role="collection"
      >
        {/* Main Featured Event */}
        <Link
          to={`/event/${mainEvent.id}`}
          className="group block lg:row-span-2"
          data-semtag-id={`home.featured.item.${mainEvent.id}`}
          data-semtag-role="navigation"
          data-semtag-target="event.detail"
        >
          <article className="relative h-full min-h-[400px] rounded-2xl overflow-hidden">
            <img
              src={mainEvent.image}
              alt={mainEvent.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-deep/90 via-slate-deep/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <Badge variant={mainEvent.category} className="w-fit mb-3">
                {categoryLabels[mainEvent.category]}
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3 group-hover:text-coral-light transition-colors">
                {mainEvent.title}
              </h3>
              <p className="text-primary-foreground/80 mb-4 line-clamp-2 max-w-lg">
                {mainEvent.description}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(new Date(mainEvent.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{mainEvent.location}</span>
                </div>
              </div>
            </div>
          </article>
        </Link>

        {/* Side Featured Events */}
        <div className="grid gap-6">
          {sideEvents.map((event) => (
            <Link
              key={event.id}
              to={`/event/${event.id}`}
              className="group block"
              data-semtag-id={`home.featured.item.${event.id}`}
              data-semtag-role="navigation"
              data-semtag-target="event.detail"
            >
              <article className="flex gap-4 bg-card rounded-xl overflow-hidden shadow-card card-hover border border-border/50">
                <div className="relative w-40 md:w-48 flex-shrink-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 py-4 pr-4">
                  <Badge variant={event.category} className="mb-2">
                    {categoryLabels[event.category]}
                  </Badge>
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>{format(new Date(event.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
