import { Heart, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Venue, priceRanges, locationTypes } from "@/data/venues";
import { cn } from "@/lib/utils";

interface VenueCardProps {
  venue: Venue;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  /**
   * data-semtag-id of the collection this card is rendered in, e.g. "venues.grid".
   * Scopes the card's semantic ids so the same venue stays unique across collections.
   */
  collectionId: string;
}

export function VenueCard({ venue, isFavorite, onToggleFavorite, collectionId }: VenueCardProps) {
  const priceLabel = priceRanges.find(p => p.value === venue.priceRange)?.label || venue.priceRange;
  const typeLabel = locationTypes.find(t => t.value === venue.locationType)?.label || venue.locationType;
  const semtagId = `${collectionId}.item.${venue.id}`;

  return (
    <Card className="hover-lift overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-card/80 hover:bg-card backdrop-blur-sm"
          onClick={() => onToggleFavorite(venue.id)}
          data-semtag-id={`${semtagId}.favorite`}
          data-semtag-role="toggle"
          data-semtag-action="toggle-favorite-venue"
          data-semtag-state={isFavorite ? "favorited" : "unfavorited"}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-all",
              isFavorite ? "fill-primary text-primary scale-110" : "text-muted-foreground"
            )}
          />
        </Button>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <Badge
            variant="blush"
            data-semtag-id={`${semtagId}.type`}
            data-semtag-role="observable"
            data-semtag-state="venue.locationType"
          >
            {typeLabel}
          </Badge>
          <Badge
            variant="gold"
            data-semtag-id={`${semtagId}.price`}
            data-semtag-role="observable"
            data-semtag-state="venue.priceRange"
          >
            {priceLabel}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle
          className="text-lg line-clamp-1"
          data-semtag-id={semtagId}
          data-semtag-role="observable"
          data-semtag-state="venue.name"
        >
          {venue.name}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span
            className="flex items-center gap-1"
            data-semtag-id={`${semtagId}.location`}
            data-semtag-role="observable"
            data-semtag-state="venue.location"
          >
            <MapPin className="h-3.5 w-3.5" />
            {venue.location}
          </span>
          <span
            className="flex items-center gap-1"
            data-semtag-id={`${semtagId}.rating`}
            data-semtag-role="observable"
            data-semtag-state="venue.rating"
          >
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {venue.rating}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">{venue.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span
          className="text-sm text-muted-foreground"
          data-semtag-id={`${semtagId}.capacity`}
          data-semtag-role="observable"
          data-semtag-state="venue.capacity"
        >
          Up to {venue.capacity} guests
        </span>
        <Button
          variant="outline"
          size="sm"
          data-semtag-id={`${semtagId}.details`}
          data-semtag-role="action"
          data-semtag-action="view-venue-details"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
