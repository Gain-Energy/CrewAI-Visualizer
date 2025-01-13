import React from 'react';
import { useQuery } from '@apollo/client';
import { Icon } from "@iconify/react";
import { GET_MARKETPLACE_ITEM } from "@/utils/graphql_queries";
import Link from 'next/link';

const MarketplaceItemPage = ({ params }: { params: { id: string } }) => {
  const { loading, error, data } = useQuery(GET_MARKETPLACE_ITEM, {
    variables: { id: params.id }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 px-4 py-2 bg-zinc-800 rounded-lg text-zinc-300">
          <div className="animate-spin">
            <Icon icon="heroicons:arrow-path" className="w-5 h-5" />
          </div>
          <span>Loading item details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-red-500">
            <Icon icon="heroicons:exclamation-circle" className="w-5 h-5" />
            <p>{error.message || "Failed to load item details"}</p>
          </div>
        </div>
      </div>
    );
  }

  const item = data.marketplaceItem;

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      {/* Navigation */}
      <div className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            href="/marketplace"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100"
          >
            <Icon icon="heroicons:arrow-left" className="w-5 h-5" />
            <span>Back to Marketplace</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl">
                  <Icon 
                    icon={
                      item.type === 'AGENT' 
                        ? "streamline-emojis:robot-face-1"
                        : item.type === 'TOOL'
                          ? "heroicons:wrench-screwdriver"
                          : "heroicons:command-line"
                    }
                    className="w-12 h-12 text-green-500"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
                    {item.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full">
                      {item.type}
                    </span>
                    {item.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-zinc-400">{item.description}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h2 className="text-lg font-medium text-zinc-100 mb-4">Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-zinc-500">Author</p>
                  <p className="text-zinc-300">{item.author}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Version</p>
                  <p className="text-zinc-300">{item.version}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Downloads</p>
                  <p className="text-zinc-300">{item.downloads}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-500">Rating</p>
                  <div className="flex items-center gap-1">
                    <Icon icon="heroicons:star" className="w-4 h-4 text-yellow-500" />
                    <span className="text-zinc-300">{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h2 className="text-lg font-medium text-zinc-100 mb-4">Reviews</h2>
              {/* Add reviews component here */}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <div className="text-center mb-6">
                <div className="text-2xl font-semibold text-zinc-100 mb-2">
                  {item.price ? `$${item.price}` : 'Free'}
                </div>
                <button className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg hover:opacity-90">
                  Deploy Now
                </button>
              </div>
              <div className="border-t border-zinc-800 pt-6">
                <h3 className="text-sm font-medium text-zinc-100 mb-4">Includes</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon icon="heroicons:check-circle" className="w-5 h-5 text-green-500" />
                    <span>Source code access</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon icon="heroicons:check-circle" className="w-5 h-5 text-green-500" />
                    <span>Documentation</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-zinc-400">
                    <Icon icon="heroicons:check-circle" className="w-5 h-5 text-green-500" />
                    <span>6 months support</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
              <h3 className="text-lg font-medium text-zinc-100 mb-4">About the Author</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                  <Icon icon="heroicons:user" className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <p className="text-zinc-300">{item.author}</p>
                  <p className="text-sm text-zinc-500">Verified Developer</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceItemPage;