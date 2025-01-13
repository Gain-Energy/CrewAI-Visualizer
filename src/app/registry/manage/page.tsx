import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { useQuery } from '@apollo/client';
import Link from 'next/link';

const RegistryManagePage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - replace with actual query
  const { loading, error, data } = useQuery(/* GET_MY_MARKETPLACE_ITEMS */);

  const statusColors = {
    active: 'text-green-500 bg-green-500/10 border-green-500/20',
    pending: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    draft: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    deprecated: 'text-red-500 bg-red-500/10 border-red-500/20'
  };

  const mockItems = [
    {
      id: 1,
      name: 'Research Assistant Pro',
      type: 'AGENT',
      version: '1.0.0',
      status: 'active',
      downloads: 1234,
      rating: 4.8,
      lastUpdated: '2024-01-10'
    },
    {
      id: 2,
      name: 'Data Analysis Toolkit',
      type: 'TOOL',
      version: '2.1.0',
      status: 'pending',
      downloads: 856,
      rating: 4.5,
      lastUpdated: '2024-01-08'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
              Manage Components
            </h1>
            <p className="text-zinc-400">
              Monitor and update your published components
            </p>
          </div>

          <Link
            href="/registry/publish"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 
              text-white rounded-lg hover:opacity-90"
          >
            <Icon icon="heroicons:plus" className="w-5 h-5" />
            <span>New Component</span>
          </Link>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex items-center gap-2">
            {['all', 'active', 'pending', 'draft', 'deprecated'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 text-sm rounded-lg capitalize ${
                  filterStatus === status
                    ? 'bg-green-500/10 text-green-500'
                    : 'text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* View Toggle */}
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

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">Name</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">Type</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">Version</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">Downloads</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">Rating</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">Last Updated</th>
                  <th className="text-right py-4 px-6 text-xs font-medium text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {mockItems.map((item) => (
                  <tr key={item.id} className="group hover:bg-zinc-800/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10">
                          <Icon
                            icon={
                              item.type === 'AGENT'
                                ? "streamline-emojis:robot-face-1"
                                : "heroicons:wrench-screwdriver"
                            }
                            className="w-5 h-5 text-green-500"
                          />
                        </div>
                        <span className="text-zinc-100">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">{item.type}</td>
                    <td className="py-4 px-6 text-zinc-400">{item.version}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        statusColors[item.status as keyof typeof statusColors]
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">{item.downloads}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Icon icon="heroicons:star" className="w-4 h-4 text-yellow-500" />
                        <span className="text-zinc-400">{item.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">{item.lastUpdated}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded-lg">
                          <Icon icon="heroicons:pencil-square" className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded-lg">
                          <Icon icon="heroicons:chart-bar" className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg">
                          <Icon icon="heroicons:trash" className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockItems.map((item) => (
              <div
                key={item.id}
                className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 hover:border-green-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10">
                      <Icon
                        icon={
                          item.type === 'AGENT'
                            ? "streamline-emojis:robot-face-1"
                            : "heroicons:wrench-screwdriver"
                        }
                        className="w-5 h-5 text-green-500"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-zinc-100">{item.name}</h3>
                      <p className="text-sm text-zinc-500">{item.type}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                    statusColors[item.status as keyof typeof statusColors]
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
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
                  <div>
                    <p className="text-sm text-zinc-500">Last Updated</p>
                    <p className="text-zinc-300">{item.lastUpdated}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-zinc-800">
                  <button className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded-lg">
                    <Icon icon="heroicons:pencil-square" className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 rounded-lg">
                    <Icon icon="heroicons:chart-bar" className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg">
                    <Icon icon="heroicons:trash" className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistryManagePage;