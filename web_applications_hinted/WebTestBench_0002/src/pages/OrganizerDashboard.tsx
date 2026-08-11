import { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Calendar, Users, DollarSign, Edit, Trash2, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { useEvents } from '@/context/EventContext';
import { Event, EventCategory } from '@/data/events';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventForm } from '@/components/organizer/EventForm';
import { ReservationList } from '@/components/organizer/ReservationList';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const categoryLabels: Record<EventCategory, string> = {
  concert: 'Concert',
  conference: 'Conference',
  workshop: 'Workshop',
};

const ORGANIZER_ID = 'org1';

const OrganizerDashboard = () => {
  const { events, reservations, addEvent, updateEvent, deleteEvent, getReservationsByEventId } = useEvents();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const organizerEvents = events.filter((e) => e.organizerId === ORGANIZER_ID);
  
  const stats = {
    totalEvents: organizerEvents.length,
    totalReservations: reservations.filter((r) =>
      organizerEvents.some((e) => e.id === r.eventId)
    ).length,
    totalRevenue: reservations
      .filter((r) => organizerEvents.some((e) => e.id === r.eventId))
      .reduce((sum, r) => sum + r.totalAmount, 0),
  };

  const handleSave = (data: Omit<Event, 'id'>) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, data);
      toast({
        title: 'Event updated',
        description: 'Your event has been updated successfully.',
      });
    } else {
      addEvent({ ...data, organizerId: ORGANIZER_ID });
      toast({
        title: 'Event created',
        description: 'Your new event has been created successfully.',
      });
    }
    setIsFormOpen(false);
    setEditingEvent(undefined);
  };

  const handleDelete = (event: Event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      deleteEvent(event.id);
      toast({
        title: 'Event deleted',
        description: 'The event has been removed.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organizer Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your events and reservations</p>
          </div>
          <Button
            variant="hero"
            onClick={() => setIsFormOpen(true)}
            data-semtag-id="organizer.create-event"
            data-semtag-role="action"
            data-semtag-action="create-event"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Stats */}
        <div
          className="grid gap-4 sm:grid-cols-3 mb-8"
          data-semtag-id="organizer.stats"
          data-semtag-role="region"
        >
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Events</p>
                <p
                  className="text-2xl font-bold text-foreground"
                  data-semtag-id="organizer.stats.events"
                  data-semtag-role="observable"
                  data-semtag-state="stats.events.total"
                >
                  {stats.totalEvents}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reservations</p>
                <p
                  className="text-2xl font-bold text-foreground"
                  data-semtag-id="organizer.stats.reservations"
                  data-semtag-role="observable"
                  data-semtag-state="stats.reservations.total"
                >
                  {stats.totalReservations}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-teal/10">
                <DollarSign className="h-6 w-6 text-teal" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p
                  className="text-2xl font-bold text-foreground"
                  data-semtag-id="organizer.stats.revenue"
                  data-semtag-role="observable"
                  data-semtag-state="stats.revenue.total"
                >
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Your Events</h2>
          
          {organizerEvents.length === 0 ? (
            <div
              className="text-center py-16 bg-card rounded-2xl border border-border"
              data-semtag-id="organizer.events.empty"
              data-semtag-role="region"
            >
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No events yet</h3>
              <p className="text-muted-foreground mb-6">Create your first event to get started.</p>
              <Button
                variant="hero"
                onClick={() => setIsFormOpen(true)}
                data-semtag-id="organizer.events.empty.create"
                data-semtag-role="action"
                data-semtag-action="create-event"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Event
              </Button>
            </div>
          ) : (
            <div
              className="space-y-4"
              data-semtag-id="organizer.events"
              data-semtag-role="collection"
            >
              {organizerEvents.map((event) => {
                const eventReservations = getReservationsByEventId(event.id);
                const isExpanded = expandedEvent === event.id;
                const itemId = `organizer.events.item.${event.id}`;
                // Sibling namespace, not nested under `itemId`: a descendant id
                // reusing the outer `.item.` prefix would be folded as a control
                // of this row and break both collections' folding.
                const reservationsId = `organizer.reservations.${event.id}`;

                return (
                  <div key={event.id} className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Event Image */}
                        <div className="w-full md:w-40 h-32 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <Badge variant={event.category} className="mb-2">
                                {categoryLabels[event.category]}
                              </Badge>
                              <h3
                                className="text-lg font-semibold text-foreground"
                                data-semtag-id={itemId}
                                data-semtag-role="observable"
                                data-semtag-state="event.title"
                              >
                                {event.title}
                              </h3>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(event)}
                                data-semtag-id={`${itemId}.edit`}
                                data-semtag-role="action"
                                data-semtag-action="edit-event"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDelete(event)}
                                data-semtag-id={`${itemId}.delete`}
                                data-semtag-role="action"
                                data-semtag-action="delete-event"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                            <span>{format(new Date(event.date), 'MMM d, yyyy')} at {event.time}</span>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm">
                            <span
                              className="text-muted-foreground"
                              data-semtag-id={`${itemId}.reservations-count`}
                              data-semtag-role="observable"
                              data-semtag-state="event.reservations.count"
                            >
                              <strong className="text-foreground">{eventReservations.length}</strong> reservations
                            </span>
                            <span
                              className="text-muted-foreground"
                              data-semtag-id={`${itemId}.revenue`}
                              data-semtag-role="observable"
                              data-semtag-state="event.revenue"
                            >
                              <strong className="text-foreground">
                                ${eventReservations.reduce((sum, r) => sum + r.totalAmount, 0)}
                              </strong>{' '}
                              revenue
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Toggle Reservations */}
                      <button
                        onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                        className="flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:underline"
                        data-semtag-id={`${itemId}.toggle-reservations`}
                        data-semtag-role="toggle"
                        data-semtag-action="toggle-reservations"
                        data-semtag-state={isExpanded ? 'open' : 'closed'}
                        data-semtag-controls={reservationsId}
                      >
                        <Eye className="h-4 w-4" />
                        {isExpanded ? 'Hide' : 'View'} Reservations
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Reservations Panel */}
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-300 ease-in-out',
                        isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="border-t border-border bg-muted/30 p-4 md:p-6">
                        <ReservationList
                          reservations={eventReservations}
                          event={event}
                          collectionId={reservationsId}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Event Form Dialog */}
      <Dialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingEvent(undefined);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </DialogTitle>
          </DialogHeader>
          <EventForm
            event={editingEvent}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingEvent(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizerDashboard;
