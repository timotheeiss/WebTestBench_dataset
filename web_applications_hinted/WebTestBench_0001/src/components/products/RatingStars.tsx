import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  /** data-semtag-id for the rating readout. Omitted => no hint is emitted. */
  semtagId?: string;
}

export const RatingStars = ({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  semtagId
}: RatingStarsProps) => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div
      className="flex items-center gap-1"
      {...(semtagId
        ? {
            'data-semtag-id': semtagId,
            'data-semtag-role': 'observable',
            'data-semtag-state': 'product.rating',
          }
        : {})}
    >
      <div className="flex">
        {Array.from({ length: maxRating }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          
          return (
            <Star
              key={i}
              className={cn(
                sizeClasses[size],
                filled
                  ? 'fill-rating-gold text-rating-gold'
                  : partial
                  ? 'fill-rating-gold/50 text-rating-gold'
                  : 'fill-rating-empty text-rating-empty'
              )}
            />
          );
        })}
      </div>
      {showValue && (
        <span className={cn('font-medium text-foreground ml-1', textClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
