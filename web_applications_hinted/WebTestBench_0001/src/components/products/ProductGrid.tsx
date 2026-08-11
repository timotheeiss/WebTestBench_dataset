import { Product } from '@/data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  /** data-semtag-id of this grid, e.g. 'products.grid'. Scopes the item ids. */
  collectionId?: string;
}

export const ProductGrid = ({
  products,
  emptyMessage = 'No products found.',
  collectionId,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p
          className="text-muted-foreground text-lg"
          {...(collectionId
            ? {
                'data-semtag-id': `${collectionId}.empty`,
                'data-semtag-role': 'observable',
                'data-semtag-state': 'empty',
              }
            : {})}
        >
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      {...(collectionId
        ? {
            'data-semtag-id': collectionId,
            'data-semtag-role': 'collection',
          }
        : {})}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} collectionId={collectionId} />
      ))}
    </div>
  );
};
