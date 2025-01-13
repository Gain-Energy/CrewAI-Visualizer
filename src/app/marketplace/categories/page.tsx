import React from 'react';
import { Icon } from "@iconify/react";
import Link from 'next/link';

const MarketplaceCategoriesPage = () => {
  const categories = [
    {
      id: 'ai-agents',
      name: 'AI Agents',
      description: 'Intelligent agents for research, analysis, and automation',
      icon: 'streamline-emojis:robot-face-1',
      items: 156,
      gradient: 'from-green-400 to-blue-500'
    },
    {
      id: 'tools',
      name: 'Tools & Utilities',
      description: 'Specialized tools for data processing and workflow enhancement',
      icon: 'heroicons:wrench-screwdriver',
      items: 89,
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      id: 'workflows',
      name: 'Workflows',
      description: 'Pre-built workflow templates and automation pipelines',
      icon: 'heroicons:command-line',
      items: 42,
      gradient: 'from-orange-400 to-red-500'
    },
    {
      id: 'datasets',
      name: 'Datasets',
      description: 'Curated datasets for training and testing',
      icon: 'heroicons:database',
      items: 73,
      gradient: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'templates',
      name: 'Templates',
      description: 'Ready-to-use templates for common use cases',
      icon: 'heroicons:document-duplicate',
      items: 28,
      gradient: 'from-teal-400 to-emerald-500'
    },
    {
      id: 'integrations',
      name: 'Integrations',
      description: 'Connect with popular platforms and services',
      icon: 'heroicons:squares-plus',
      items: 64,
      gradient: 'from-yellow-400 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold text-zinc-100 mb-4">
            Browse Categories
          </h1>
          <p className="text-zinc-400">
            Explore our curated collection of AI components, tools, and resources
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/marketplace/categories/${category.id}`}
              className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 p-6 hover:border-green-500/30"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10">
                    <Icon icon={category.icon} className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-zinc-100">{category.name}</h3>
                    <p className="text-sm text-zinc-500">{category.items} items</p>
                  </div>
                </div>
                
                <p className="text-sm text-zinc-400 mb-4">{category.description}</p>
                
                <div className="flex items-center text-green-500 text-sm">
                  <span>Browse {category.name}</span>
                  <Icon 
                    icon="heroicons:arrow-right" 
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" 
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Collections */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-zinc-100 mb-8">
            Featured Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Research & Analysis',
                description: 'Complete toolkit for research automation and data analysis',
                items: 12,
                image: '/api/placeholder/800/400'
              },
              {
                name: 'Content Creation',
                description: 'AI-powered tools for content generation and management',
                items: 8,
                image: '/api/placeholder/800/400'
              }
            ].map((collection) => (
              <Link
                key={collection.name}
                href={`/marketplace/collections/${collection.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800 hover:border-green-500/30"
              >
                <div className="aspect-[2/1] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                    <h3 className="text-xl font-medium text-zinc-100 mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-4">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">
                        {collection.items} items
                      </span>
                      <div className="flex items-center gap-2 text-green-500 text-sm">
                        <span>View Collection</span>
                        <Icon 
                          icon="heroicons:arrow-right" 
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceCategoriesPage;