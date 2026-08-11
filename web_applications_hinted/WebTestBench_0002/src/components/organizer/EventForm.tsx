import { useState } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';
import { Event, EventCategory, TicketType } from '@/data/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventFormProps {
  event?: Event;
  onSave: (data: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

const categoryOptions: { value: EventCategory; label: string }[] = [
  { value: 'concert', label: 'Concert' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
];

const defaultTicket: Omit<TicketType, 'id'> = {
  name: '',
  price: 0,
  quantity: 100,
  description: '',
};

export function EventForm({ event, onSave, onCancel }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    category: event?.category || 'concert' as EventCategory,
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    image: event?.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop',
    organizerId: event?.organizerId || 'org1',
    featured: event?.featured || false,
  });

  const [tickets, setTickets] = useState<(TicketType | Omit<TicketType, 'id'> & { id?: string })[]>(
    event?.ticketTypes || [{ ...defaultTicket, id: `temp-${Date.now()}` }]
  );

  const addTicket = () => {
    setTickets([...tickets, { ...defaultTicket, id: `temp-${Date.now()}` }]);
  };

  const removeTicket = (index: number) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter((_, i) => i !== index));
    }
  };

  const updateTicket = (index: number, field: keyof TicketType, value: string | number) => {
    setTickets(
      tickets.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      ticketTypes: tickets.map((t, i) => ({
        ...t,
        id: t.id || `t-${Date.now()}-${i}`,
        price: Number(t.price),
        quantity: Number(t.quantity),
      })) as TicketType[],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
      data-semtag-id="event-form.panel"
      data-semtag-role="region"
    >
      {/* Basic Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter event title"
            data-semtag-id="event-form.title"
            data-semtag-role="input"
            data-semtag-state="event.title"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe your event..."
            data-semtag-id="event-form.description"
            data-semtag-role="input"
            data-semtag-state="event.description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value: EventCategory) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger
              data-semtag-id="event-form.category"
              data-semtag-role="select"
              data-semtag-state="event.category"
              data-semtag-options={categoryOptions
                .map((c) => `${c.value}|${c.label}`)
                .join(';')}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {categoryOptions.map((c) => (
                <SelectItem
                  key={c.value}
                  value={c.value}
                  data-semtag-id={`event-form.category.option.${c.value}`}
                  data-semtag-role="option"
                >
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Venue name, City"
            data-semtag-id="event-form.location"
            data-semtag-role="input"
            data-semtag-state="event.location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            data-semtag-id="event-form.date"
            data-semtag-role="input"
            data-semtag-state="event.date"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            required
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            data-semtag-id="event-form.time"
            data-semtag-role="input"
            data-semtag-state="event.time"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
            data-semtag-id="event-form.image"
            data-semtag-role="input"
            data-semtag-state="event.image"
          />
        </div>
      </div>

      {/* Ticket Types */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base">Ticket Types</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addTicket}
            data-semtag-id="event-form.add-ticket"
            data-semtag-role="action"
            data-semtag-action="add-ticket-type"
            data-semtag-controls="event-form.tickets"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Ticket
          </Button>
        </div>

        <div
          className="space-y-4"
          data-semtag-id="event-form.tickets"
          data-semtag-role="collection"
        >
          {tickets.map((ticket, index) => {
            // Keyed by the ticket's own id, never the array index. Every ticket
            // is created with one, but the type allows it to be absent, and a
            // half-formed hint is worse than none.
            const itemId = ticket.id ? `event-form.tickets.item.${ticket.id}` : undefined;
            const hint = (control: string, state: string) =>
              itemId
                ? {
                    'data-semtag-id': `${itemId}.${control}`,
                    'data-semtag-role': 'input',
                    'data-semtag-state': state,
                  }
                : {};

            return (
              <div
                key={ticket.id || index}
                className="grid gap-4 p-4 bg-muted/50 rounded-xl sm:grid-cols-4"
              >
                <div className="space-y-2 sm:col-span-2">
                  <Label>Ticket Name</Label>
                  <Input
                    required
                    value={ticket.name}
                    onChange={(e) => updateTicket(index, 'name', e.target.value)}
                    placeholder="e.g., General Admission"
                    data-semtag-id={itemId}
                    data-semtag-role={itemId ? 'input' : undefined}
                    data-semtag-state={itemId ? 'ticket.name' : undefined}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    required
                    min="0"
                    value={ticket.price}
                    onChange={(e) => updateTicket(index, 'price', e.target.value)}
                    {...hint('price', 'ticket.price')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      required
                      min="1"
                      value={ticket.quantity}
                      onChange={(e) => updateTicket(index, 'quantity', e.target.value)}
                      {...hint('quantity', 'ticket.quantity')}
                    />
                    {tickets.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTicket(index)}
                        className="text-destructive hover:text-destructive flex-shrink-0"
                        data-semtag-id={itemId ? `${itemId}.remove` : undefined}
                        data-semtag-role={itemId ? 'action' : undefined}
                        data-semtag-action={itemId ? 'remove-ticket-type' : undefined}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-2 sm:col-span-4">
                  <Label>Description (optional)</Label>
                  <Input
                    value={ticket.description || ''}
                    onChange={(e) => updateTicket(index, 'description', e.target.value)}
                    placeholder="Brief description of what's included"
                    {...hint('description', 'ticket.description')}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          data-semtag-id="event-form.cancel"
          data-semtag-role="action"
          data-semtag-action="cancel-event-form"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          variant="hero"
          className="flex-1"
          data-semtag-id="event-form.submit"
          data-semtag-role="action"
          data-semtag-action="save-event"
        >
          <Save className="h-4 w-4 mr-2" />
          {event ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  );
}
