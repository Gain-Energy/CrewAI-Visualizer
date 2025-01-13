import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Icon } from "@iconify/react";
import { GET_MARKETPLACE_ITEMS } from "@/utils/graphql_queries";
import Link from 'next/link';

type SortByType = "rating" | "name" | "date" | "downloads" | "price";
type StatusType = "all" | "verified" | "experimental";
type CapabilityType = "all" | "drilling" | "safety" | "analytics" | "automation" | "monitoring" | "optimization" | "maintenance" | "reporting";

interface MarketplaceItem {
  id: string;
  type: 'AGENT' | 'TOOL' | 'WORKFLOW';
  name: string;
  description: string;
  author: string;
  version: string;
  downloads: number;
  rating: number;
  price: number;
  tags: string[];
  image?: string;
  createdAt: string;
  updatedAt: string;
  status: StatusType;
  capabilities: CapabilityType[];
  energyUnits: number;
}

interface Filters {
  type: Array<'AGENT' | 'TOOL' | 'WORKFLOW'>;
  price: Array<'free' | 'paid'>;
  rating: number | null;
  status: StatusType;
  capability: CapabilityType;
}

const ALL_CAPABILITIES: CapabilityType[] = [
  "all",
  "drilling",
  "safety",
  "analytics",
  "automation",
  "monitoring",
  "optimization",
  "maintenance",
  "reporting"
];

const getCapabilityDescription = (capability: string): string => {
  const descriptions: Record<string, string> = {
    "drilling": "Monitor and optimize drilling operations in real-time",
    "safety": "Ensure compliance with safety protocols and regulations",
    "analytics": "Analyze drilling data for insights and optimization",
    "automation": "Automate routine drilling operations and processes",
    "monitoring": "Real-time monitoring of drilling equipment and parameters",
    "optimization": "Optimize drilling parameters for maximum efficiency",
    "maintenance": "Predict and schedule equipment maintenance",
    "reporting": "Generate detailed operational reports and analytics",
    "planning": "Intelligent well planning and trajectory optimization",
  };
  return descriptions[capability.toLowerCase()] || capability;
};

const MarketplaceSearchPage = ({ searchParams }: { searchParams: { q: string } }) => {
  const [sortBy, setSortBy] = useState<SortByType>('rating');
  const [filters, setFilters] = useState<Filters>({
    type: [],
    price: [],
    rating: null,
    status: 'all',
    capability: 'all'
  });

  const { loading, error, data } = useQuery(GET_MARKETPLACE_ITEMS);

  const filterOptions = {
    type: [
      { label: 'AI Agents', value: 'AGENT' as const },
      { label: 'Tools', value: 'TOOL' as const },
      { label: 'Workflows', value: 'WORKFLOW' as const }
    ],
    price: [
      { label: 'Free', value: 'free' as const },
      { label: 'Paid', value: 'paid' as const }
    ],
    rating: [
      { label: '4+ Stars', value: 4 },
      { label: '3+ Stars', value: 3 }
    ],
    status: [
      { label: 'All', value: 'all' as const },
      { label: 'Verified', value: 'verified' as const },
      { label: 'Experimental', value: 'experimental' as const }
    ],
    capabilities: ALL_CAPABILITIES.map(cap => ({
      label: cap === 'all' ? 'All Capabilities' : cap.charAt(0).toUpperCase() + cap.slice(1),
      value: cap,
      description: cap === 'all' ? 'Show all capabilities' : getCapabilityDescription(cap)
    }))
  } as const;

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
            Search Results
          </h1>
          <p className="text-zinc-400">
            Showing results for &quot;{searchParams.q}&quot;
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 sticky top-8">
              <h2 className="text-lg font-medium text-zinc-100 mb-6">Filters</h2>
              
              {/* Type Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Type</h3>
                <div className="space-y-2">
                  {filterOptions.type.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.type.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              type: [...filters.type, option.value]
                            });
                          } else {
                            setFilters({
                              ...filters,
                              type: filters.type.filter(t => t !== option.value)
                            });
                          }
                        }}
                        className="rounded border-zinc-700 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-zinc-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Price</h3>
                <div className="space-y-2">
                  {filterOptions.price.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.price.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              price: [...filters.price, option.value]
                            });
                          } else {
                            setFilters({
                              ...filters,
                              price: filters.price.filter(p => p !== option.value)
                            });
                          }
                        }}
                        className="rounded border-zinc-700 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-zinc-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Rating</h3>
                <div className="space-y-2">
                  {filterOptions.rating.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === option.value}
                        onChange={() => setFilters({
                          ...filters,
                          rating: option.value
                        })}
                        className="border-zinc-700 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-zinc-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Status</h3>
                <div className="space-y-2">
                  {filterOptions.status.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        checked={filters.status === option.value}
                        onChange={() => setFilters({
                          ...filters,
                          status: option.value
                        })}
                        className="border-zinc-700 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-zinc-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capabilities Filter */}
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-3">Capabilities</h3>
                <div className="space-y-2">
                  {filterOptions.capabilities.map((option) => (
                    <label key={option.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="capability"
                        checked={filters.capability === option.value}
                        onChange={() => setFilters({
                          ...filters,
                          capability: option.value
                        })}
                        className="border-zinc-700 text-green-500 focus:ring-green-500"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm text-zinc-300">{option.label}</span>
                        {option.value !== 'all' && (
                          <span className="text-xs text-zinc-500">{option.description}</span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Sort Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-zinc-400">
                {data?.marketplace?.items.length || 0} results
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortByType)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300"
              >
                <option value="rating">Highest Rated</option>
                <option value="name">Name</option>
                <option value="date">Newest</option>
                <option value="downloads">Most Downloaded</option>
                <option value="price">Price</option>
              </select>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-900/20 border border-red-900 rounded-xl p-6 text-center">
                <p className="text-red-500">Error loading marketplace items</p>
              </div>
            )}

            {/* Results Grid */}
            {!loading && !error && data?.marketplace?.items && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.marketplace.items
                  .filter((item: MarketplaceItem) => {
                    // Apply type filter
                    if (filters.type.length > 0 && !filters.type.includes(item.type)) {
                      return false;
                    }
                    
                    // Apply price filter
                    if (filters.price.length > 0) {
                      const isPaid = item.price > 0;
                      const matchesPrice = filters.price.includes(isPaid ? 'paid' : 'free');
                      if (!matchesPrice) return false;
                    }
                    
                    // Apply rating filter
                    if (filters.rating && item.rating < filters.rating) {
                      return false;
                    }

                    // Apply status filter
                    if (filters.status !== 'all' && item.status !== filters.status) {
                      return false;
                    }

                    // Apply capability filter
                    if (filters.capability !== 'all' && !item.capabilities.includes(filters.capability)) {
                      return false;
                    }
                    
                    return true;
                  })
                  .sort((a: MarketplaceItem, b: MarketplaceItem) => {
                    switch (sortBy) {
                      case 'rating':
                        return b.rating - a.rating;
                      case 'name':
                        return a.name.localeCompare(b.name);
                      case 'date':
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                      case 'downloads':
                        return b.downloads - a.downloads;
                      case 'price':
                        return a.price - b.price;
                      default:
                        return 0;
                    }
                  })
                  .map((item: MarketplaceItem) => (
                    <Link 
                      href={`/marketplace/${item.id}`}
                      key={item.id}
                      className="block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
                    >
                      <div className="aspect-video relative mb-4 rounded-lg overflow-hidden bg-zinc-800">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Icon icon="solar:box-linear" className="w-12 h-12 text-zinc-700" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-medium text-zinc-100">{item.name}</h3>
                        <div className="text-right">
                          <div className="text-sm text-zinc-400">
                            {item.price > 0 ? `$${item.price}` : 'Free'}
                          </div>
                          <div className="text-xs text-zinc-500">
                            {item.energyUnits} energy units
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.capabilities.slice(0, 3).map((cap) => (
                          <span
                            key={cap}
                            className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400"
                          >
                            {cap}
                          </span>
                        ))}
                        {item.capabilities.length > 3 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
                            +{item.capabilities.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-zinc-300">
                          <Icon icon="solar:star-bold" className="w-4 h-4 text-yellow-500" />
                          {item.rating.toFixed(1)}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-400">{item.downloads} downloads</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.status === 'verified' 
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSearchPage;
