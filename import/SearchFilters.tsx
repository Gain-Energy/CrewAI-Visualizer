import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FilterOptions } from "@/types/marketplace";

interface SearchFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Input
        placeholder="Search agents..."
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        className="sm:max-w-xs"
      />
      <Select
        value={filters.category}
        onValueChange={(category) => onFilterChange({ ...filters, category })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="drilling">Drilling</SelectItem>
          <SelectItem value="analytics">Analytics</SelectItem>
          <SelectItem value="monitoring">Monitoring</SelectItem>
          <SelectItem value="optimization">Optimization</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={filters.sortBy}
        onValueChange={(sortBy) => onFilterChange({ ...filters, sortBy })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="rating">Highest Rated</SelectItem>
          <SelectItem value="downloads">Most Downloads</SelectItem>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="name">Name A-Z</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
