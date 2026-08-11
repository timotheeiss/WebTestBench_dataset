import { Category } from '@/data/products';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
  /** data-semtag-id for the category readout. Omitted => no hint is emitted. */
  semtagId?: string;
}

const categoryConfig: Record<Category, { label: string; className: string }> = {
  tech: { label: 'Tech', className: 'category-tag-tech' },
  home: { label: 'Home', className: 'category-tag-home' },
  fitness: { label: 'Fitness', className: 'category-tag-fitness' },
};

export const CategoryBadge = ({ category, size = 'md', semtagId }: CategoryBadgeProps) => {
  const config = categoryConfig[category];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      )}
      {...(semtagId
        ? {
            'data-semtag-id': semtagId,
            'data-semtag-role': 'observable',
            'data-semtag-state': 'product.category',
          }
        : {})}
    >
      {config.label}
    </span>
  );
};
