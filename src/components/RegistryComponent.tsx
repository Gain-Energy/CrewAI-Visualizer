import React, { useState } from 'react';
import { Icon } from "@iconify/react";

interface RegistryItem {
  id: string;
  type: string;
  name: string;
  version: string;
  description: string;
  author: string;
  dependencies: string[];
  status: 'active' | 'pending' | 'deprecated';
  lastUpdated: string;
}

const RegistryComponent = () => {
  const [activeTab, setActiveTab] = useState('publish');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100">AI Registry</h2>
          <p className="text-zinc-400 mt-1">Manage and publish your AI components</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center bg-zinc-900 rounded-lg p-1">
          {['publish', 'manage', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Publish Form */}
      {activeTab === 'publish' && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
          <h3 className="text-lg font-medium text-zinc-100 mb-6">Publish New Component</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Component Type
                </label>
                <select className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg">
                  <option value="agent">AI Agent</option>
                  <option value="tool">Tool</option>
                  <option value="workflow">Workflow</option>
                  <option value="dataset">Dataset</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg"
                  placeholder="e.g., Research Assistant"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg"
                placeholder="Describe your component..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Dependencies
              </label>
              <div className="flex flex-wrap gap-2">
                {['python3.8', 'tensorflow', 'numpy'].map((dep) => (
                  <span key={dep} className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-400">
                    {dep}
                  </span>
                ))}
                <button className="px-3 py-1 border border-zinc-700 rounded-full text-sm text-zinc-400 hover:bg-zinc-800">
                  + Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Upload Files
              </label>
              <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="heroicons:cloud-arrow-up" className="w-8 h-8 text-zinc-500" />
                  <p className="text-sm text-zinc-400">
                    Drag and drop files here, or click to select
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700">
                Cancel
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg">
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage View */}
      {activeTab === 'manage' && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-zinc-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400">Version</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400">Last Updated</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {/* Sample data rows */}
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="hover:bg-zinc-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Icon icon="streamline-emojis:robot-face-1" className="w-5 h-5 text-green-500" />
                        <span className="text-zinc-300">Research Assistant</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">Agent</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">1.0.2</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                      2024-01-12
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-200">
                          <Icon icon="heroicons:pencil-square" className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-zinc-200">
                          <Icon icon="heroicons:archive-box" className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-500">
                          <Icon icon="heroicons:trash" className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics View */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Components', value: '24', icon: 'heroicons:cube' },
              { label: 'Total Downloads', value: '2.4k', icon: 'heroicons:arrow-down-circle' },
              { label: 'Active Users', value: '856', icon: 'heroicons:users' },
              { label: 'Avg Rating', value: '4.8', icon: 'heroicons:star' }
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl">
                    <Icon icon={stat.icon} className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">{stat.label}</p>
                    <p className="text-2xl font-semibold text-zinc-100">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Usage Graph */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h3 className="text-lg font-medium text-zinc-100 mb-6">Usage Analytics</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                <div key={i} className="w-full">
                  <div 
                    style={{ height: `${height}%` }}
                    className="bg-gradient-to-t from-green-500/50 to-blue-500/50 rounded-t-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-zinc-400">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistryComponent;