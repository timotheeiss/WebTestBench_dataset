import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterOption {
  value: string;
  label: string;
}

interface SearchAndFilterProps {
  /** Semantic id namespace for this instance, e.g. "venues.filters". */
  semtagPrefix: string;
  /** data-semtag-id of the region these controls drive, e.g. "venues.grid". */
  semtagControls: string;
  /** Semantic state key the search box edits, e.g. "venues.search.query". */
  semtagSearchState: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterGroups: {
    /** Semantic id segment for this group, e.g. "locationType". */
    semtagKey: string;
    label: string;
    options: FilterOption[];
    selectedValue: string | null;
    onSelect: (value: string | null) => void;
  }[];
}

export function SearchAndFilter({
  semtagPrefix,
  semtagControls,
  semtagSearchState,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterGroups,
}: SearchAndFilterProps) {
  const hasActiveFilters = filterGroups.some(g => g.selectedValue !== null);

  const clearAllFilters = () => {
    filterGroups.forEach(g => g.onSelect(null));
    onSearchChange("");
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-10 bg-card"
          data-semtag-id={`${semtagPrefix}.search`}
          data-semtag-role="input"
          data-semtag-state={semtagSearchState}
          data-semtag-controls={semtagControls}
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => onSearchChange("")}
            data-semtag-id={`${semtagPrefix}.search.clear`}
            data-semtag-role="action"
            data-semtag-action="clear-search"
            data-semtag-controls={semtagControls}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Groups */}
      <div className="space-y-3">
        {filterGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">{group.label}</span>
            <div
              className="flex flex-wrap gap-2"
              data-semtag-id={`${semtagPrefix}.${group.semtagKey}`}
              data-semtag-role="collection"
            >
              {group.options.map((option) => (
                <Badge
                  key={option.value}
                  variant={group.selectedValue === option.value ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all hover:scale-105",
                    group.selectedValue === option.value && "ring-2 ring-primary/20"
                  )}
                  onClick={() =>
                    group.onSelect(group.selectedValue === option.value ? null : option.value)
                  }
                  data-semtag-id={`${semtagPrefix}.${group.semtagKey}.item.${option.value}`}
                  data-semtag-role="toggle"
                  data-semtag-action={`filter-by-${group.semtagKey}`}
                  data-semtag-state={
                    group.selectedValue === option.value ? "selected" : "unselected"
                  }
                  data-semtag-controls={semtagControls}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Clear Filters */}
      {(hasActiveFilters || searchValue) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-muted-foreground"
          data-semtag-id={`${semtagPrefix}.clearAll`}
          data-semtag-role="action"
          data-semtag-action="clear-filters"
          data-semtag-controls={semtagControls}
        >
          <X className="h-4 w-4 mr-1" />
          Clear all filters
        </Button>
      )}
    </div>
  );
}
