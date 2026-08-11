import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EventCategory } from '@/data/events';
import { cn } from '@/lib/utils';

interface EventFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: EventCategory | 'all';
  onCategoryChange: (category: EventCategory | 'all') => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

const categories: { value: EventCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Events' },
  { value: 'concert', label: 'Concerts' },
  { value: 'conference', label: 'Conferences' },
  { value: 'workshop', label: 'Workshops' },
];

export function EventFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDate,
  onDateChange,
}: EventFiltersProps) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedDate !== '';

  const clearFilters = () => {
    onCategoryChange('all');
    onDateChange('');
    onSearchChange('');
  };

  return (
    <div className="space-y-4" data-semtag-id="filters.panel" data-semtag-role="region">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search events by name or location..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-12 text-base bg-card border-border/50"
          data-semtag-id="filters.search"
          data-semtag-role="input"
          data-semtag-state="search.query"
          data-semtag-controls="events.grid"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            data-semtag-id="filters.search.clear"
            data-semtag-role="action"
            data-semtag-action="clear-search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filter by:</span>
        </div>

        {/* Category Pills */}
        <div
          className="flex flex-wrap gap-2"
          data-semtag-id="filters.category"
          data-semtag-role="collection"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              data-semtag-id={`filters.category.item.${cat.value}`}
              data-semtag-role="toggle"
              data-semtag-action="filter-by-category"
              data-semtag-state={selectedCategory === cat.value ? 'selected' : 'unselected'}
              data-semtag-controls="events.grid"
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                selectedCategory === cat.value
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-auto h-10 bg-card border-border/50"
            data-semtag-id="filters.date"
            data-semtag-role="input"
            data-semtag-state="filters.date"
            data-semtag-controls="events.grid"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
            data-semtag-id="filters.clear"
            data-semtag-role="action"
            data-semtag-action="clear-filters"
            data-semtag-controls="events.grid"
          >
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
