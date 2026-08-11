import { useState, useMemo } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { useEvents } from '@/context/EventContext';
import { EventCategory } from '@/data/events';
import { EventCard } from '@/components/events/EventCard';
import { EventFilters } from '@/components/events/EventFilters';
import { FeaturedEvents } from '@/components/events/FeaturedEvents';

const Index = () => {
  const { events } = useEvents();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');
  const [selectedDate, setSelectedDate] = useState('');

  const featuredEvents = useMemo(() => 
    events.filter((e) => e.featured), 
    [events]
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && event.category !== selectedCategory) {
        return false;
      }

      // Date filter
      if (selectedDate && event.date !== selectedDate) {
        return false;
      }

      // Only show upcoming events
      return new Date(event.date) >= new Date();
    });
  }, [events, searchQuery, selectedCategory, selectedDate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-coral-light via-background to-teal-light opacity-60" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Discover Amazing Events
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Find Your Next
              <span className="text-gradient"> Unforgettable </span>
              Experience
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse concerts, conferences, and workshops happening near you. 
              Book your tickets and create memories that last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container pb-16">
        {/* Featured Events */}
        {featuredEvents.length > 0 && <FeaturedEvents events={featuredEvents} />}

        {/* Filters */}
        <div className="mb-8">
          <EventFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        {/* Events Grid */}
        <div className="mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2
            className="text-xl font-semibold text-foreground"
            data-semtag-id="events.count"
            data-semtag-role="observable"
            data-semtag-state="events.count"
          >
            {searchQuery || selectedCategory !== 'all' || selectedDate
              ? `${filteredEvents.length} events found`
              : 'All Upcoming Events'}
          </h2>
        </div>

        {filteredEvents.length > 0 ? (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            data-semtag-id="events.grid"
            data-semtag-role="collection"
          >
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <EventCard event={event} collectionId="events.grid" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 bg-card rounded-2xl border border-border"
            data-semtag-id="events.empty"
            data-semtag-role="region"
          >
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
