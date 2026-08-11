import { Link } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { RatingStars } from './RatingStars';
import { CategoryBadge } from './CategoryBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  /**
   * data-semtag-id of the collection this card is rendered in, e.g. 'products.grid'.
   * The same product can appear in several collections on one page, so item ids
   * are scoped by it. Omitted => no hints are emitted rather than half-formed ones.
   */
  collectionId?: string;
}

export const ProductCard = ({ product, featured = false, collectionId }: ProductCardProps) => {
  const base = collectionId ? `${collectionId}.item.${product.slug}` : undefined;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <article
      className={cn(
        'group relative bg-card rounded-xl overflow-hidden border border-border/50 transition-all duration-300',
        'hover:border-border hover:shadow-lg',
        featured && 'md:col-span-2 md:row-span-2'
      )}
    >
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block overflow-hidden">
        <div className={cn('relative', featured ? 'aspect-[16/9]' : 'aspect-[4/3]')}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span
                className="inline-flex items-center gap-1 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-semibold"
                {...(base
                  ? {
                      'data-semtag-id': `${base}.featured`,
                      'data-semtag-role': 'observable',
                      'data-semtag-state': 'product.featured',
                    }
                  : {})}
              >
                <Star className="h-3 w-3 fill-current" />
                Featured
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CategoryBadge
            category={product.category}
            size="sm"
            semtagId={base ? `${base}.category` : undefined}
          />
          <span
            className="font-display font-bold text-lg text-foreground"
            {...(base
              ? {
                  'data-semtag-id': `${base}.price`,
                  'data-semtag-role': 'observable',
                  'data-semtag-state': 'product.price',
                }
              : {})}
          >
            {formatPrice(product.price)}
          </span>
        </div>

        <Link
          to={`/product/${product.slug}`}
          {...(base
            ? {
                'data-semtag-id': base,
                'data-semtag-role': 'navigation',
                'data-semtag-target': 'product.detail',
              }
            : {})}
        >
          <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <RatingStars
            rating={product.rating}
            size="sm"
            semtagId={base ? `${base}.rating` : undefined}
          />

          <Button
            variant="soft"
            size="sm"
            asChild
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              {...(base
                ? {
                    'data-semtag-id': `${base}.buy`,
                    'data-semtag-role': 'action',
                    'data-semtag-action': 'buy-product',
                  }
                : {})}
            >
              Buy Now
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
};
