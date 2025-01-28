"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All", icon: "heroicons:squares-2x2" },
    { id: "agents", name: "AI Agents", icon: "streamline-emojis:robot-face-1" },
    { id: "tools", name: "Tools", icon: "heroicons:wrench-screwdriver" },
    { id: "workflows", name: "Workflows", icon: "heroicons:command-line" },
    { id: "datasets", name: "Datasets", icon: "heroicons:database" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-500/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-zinc-100 mb-4">
              Upstrima AI Marketplace
            </h1>
            <p className="text-zinc-400">
              Discover and deploy pre-built AI agents, tools, workflows, and
              datasets to accelerate your development
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search the marketplace..."
                className="w-full px-4 py-3 pl-12 bg-zinc-900/50 border border-zinc-800 rounded-xl
                  focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Icon
                icon="heroicons:magnifying-glass"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-lg z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                  ${
                    selectedCategory === category.id
                      ? "bg-green-500/10 text-green-500"
                      : "hover:bg-zinc-800 text-zinc-400"
                  }`}
              >
                <Icon icon={category.icon} className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Marketplace Items - Replace with actual data */}
          {[1, 2, 3, 4, 5, 6].map(item => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item * 0.1 }}
              className="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-green-500/30"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg">
                    <Icon
                      icon="streamline-emojis:robot-face-1"
                      className="w-6 h-6 text-green-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-zinc-100">
                      Research Assistant
                    </h3>
                    <p className="text-sm text-zinc-500">by Upstrima</p>
                  </div>
                </div>

                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                  Intelligent agent for research and data analysis tasks
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full">
                    Python
                  </span>
                  <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full">
                    Research
                  </span>
                  <span className="px-2 py-1 text-xs bg-zinc-800 text-zinc-400 rounded-full">
                    Analysis
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Icon
                        icon="heroicons:star"
                        className="w-4 h-4 text-yellow-500"
                      />
                      <span>4.8</span>
                    </div>
                    <span className="text-zinc-600">|</span>
                    <div className="flex items-center gap-1 text-zinc-400">
                      <Icon
                        icon="heroicons:arrow-down-circle"
                        className="w-4 h-4"
                      />
                      <span>2.4k</span>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-sm hover:bg-green-500/20">
                    Deploy
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
