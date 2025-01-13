import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';

interface CatalogItem {
  id: string;
  type: string;
  name: string;
  description: string;
  author: string;
  tags: string[];
  stars: number;
  downloads: number;
  price: number | 'free';
}

const CatalogComponent = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filters = {
    type: ['Agents', 'Tools', 'Workflows', 'Datasets'],
    features: ['Memory', 'Delegation', 'API Integration', 'Custom Tools'],
    price: ['Free', 'Paid'],
    rating: ['4+ Stars', '3+ Stars']
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-medium text-zinc-100 mb-4">Filters</h3>
            
            {Object.entries(filters).map(([category, options]) => (
              <div key={category} className="mb-6 last:mb-0">
                <h4 className="text-sm font-medium text-zinc-400 mb-3 capitalize">{category}</h4>
                <div className="space-y-2">
                  {options.map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedFilters.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFilters([...selectedFilters, option]);
                          } else {
                            setSelectedFilters(selectedFilters.filter(f => f !== option));
                          }
                        }}
                        className="rounded border-zinc-700 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-zinc-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-300"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Recently Added</option>
                <option value="downloads">Most Downloaded</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <Icon icon="heroicons:squares-2x2" className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                <Icon icon="heroicons:bars-3" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Catalog Grid */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-4'}>
            {/* Sample Items */}
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item * 0.1 }}
                className={`group bg-zinc-900 rounded-xl border border-zinc-800 
                  hover:border-green-500/30 overflow-hidden transition-colors
                  ${viewMode === 'list' ? 'flex' : ''}`}
              >
                {/* Preview Image */}
                <div className={`aspect-video relative bg-zinc-800 
                  ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon icon="streamline-emojis:robot-face-1" className="w-12 h-12 text-zinc-700" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full">Agent</span>
                    <span className="px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded-full">Free</span>
                  </div>

                  <h3 className="text-lg font-medium text-zinc-100 mb-2">Research Assistant Pro</h3>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                    Advanced AI agent for research tasks with memory and delegation capabilities
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Icon icon="heroicons:star" className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-zinc-400">4.8</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon icon="heroicons:arrow-down-circle" className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm text-zinc-400">2.4k</span>
                      </div>
                    </div>

                    <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 
                      text-white rounded-lg hover:opacity-90 transition-opacity text-sm">
                      Deploy
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogComponent;