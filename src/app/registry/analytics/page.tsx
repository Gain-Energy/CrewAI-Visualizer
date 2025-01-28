"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RegistryAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Mock data - replace with actual API data
  const mockData = {
    downloads: [
      { date: "2024-01-07", count: 45 },
      { date: "2024-01-08", count: 52 },
      { date: "2024-01-09", count: 49 },
      { date: "2024-01-10", count: 63 },
      { date: "2024-01-11", count: 58 },
      { date: "2024-01-12", count: 48 },
      { date: "2024-01-13", count: 71 },
    ],
    topComponents: [
      { name: "Research Assistant Pro", downloads: 1234, rating: 4.8 },
      { name: "Data Analysis Tool", downloads: 856, rating: 4.5 },
      { name: "Workflow Automation", downloads: 643, rating: 4.6 },
    ],
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-zinc-100 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-zinc-400">
            Track performance and usage metrics for your components
          </p>
        </div>

        {/* Time Range Selection */}
        <div className="mb-8 flex items-center gap-2">
          {["24h", "7d", "30d", "90d"].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm rounded-lg ${
                timeRange === range
                  ? "bg-green-500/10 text-green-500"
                  : "text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Downloads",
              value: "2.4k",
              change: "+12%",
              icon: "heroicons:arrow-down-circle",
            },
            {
              label: "Active Users",
              value: "856",
              change: "+8%",
              icon: "heroicons:users",
            },
            {
              label: "Avg Rating",
              value: "4.7",
              change: "+0.2",
              icon: "heroicons:star",
            },
            {
              label: "Revenue",
              value: "$1.2k",
              change: "+15%",
              icon: "heroicons:currency-dollar",
            },
          ].map(stat => (
            <div
              key={stat.label}
              className="bg-zinc-900 rounded-xl border border-zinc-800 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10">
                  <Icon icon={stat.icon} className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-sm px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold text-zinc-100">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Downloads Trend */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-medium text-zinc-100 mb-6">
              Downloads Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData.downloads}>
                  <defs>
                    <linearGradient
                      id="downloadGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#22C55E" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis
                    dataKey="date"
                    stroke="#71717a"
                    tick={{ fill: "#71717a" }}
                  />
                  <YAxis stroke="#71717a" tick={{ fill: "#71717a" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#22C55E"
                    fill="url(#downloadGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Components */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-medium text-zinc-100 mb-6">
              Top Components
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.topComponents}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis
                    dataKey="name"
                    stroke="#71717a"
                    tick={{ fill: "#71717a" }}
                  />
                  <YAxis stroke="#71717a" tick={{ fill: "#71717a" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Bar
                    dataKey="downloads"
                    fill="#22C55E"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Component Performance */}
          <div className="lg:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-lg font-medium text-zinc-100">
                Component Performance
              </h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">
                    Component
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">
                    Downloads
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">
                    Rating
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-zinc-400">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {mockData.topComponents.map(component => (
                  <tr key={component.name} className="hover:bg-zinc-800/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10">
                          <Icon
                            icon="streamline-emojis:robot-face-1"
                            className="w-5 h-5 text-green-500"
                          />
                        </div>
                        <span className="text-zinc-100">{component.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      {component.downloads}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <Icon
                          icon="heroicons:star"
                          className="w-4 h-4 text-yellow-500"
                        />
                        <span className="text-zinc-400">
                          {component.rating}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">$599</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Activity */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
            <h2 className="text-lg font-medium text-zinc-100 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                {
                  action: "New Download",
                  component: "Research Assistant Pro",
                  time: "2 minutes ago",
                  icon: "heroicons:arrow-down-circle",
                },
                {
                  action: "New Rating",
                  component: "Data Analysis Tool",
                  time: "15 minutes ago",
                  icon: "heroicons:star",
                },
                {
                  action: "New Review",
                  component: "Workflow Automation",
                  time: "1 hour ago",
                  icon: "heroicons:chat-bubble-left-ellipsis",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10">
                    <Icon
                      icon={activity.icon}
                      className="w-5 h-5 text-green-500"
                    />
                  </div>
                  <div>
                    <p className="text-zinc-300">{activity.action}</p>
                    <p className="text-sm text-zinc-500">
                      {activity.component}
                    </p>
                    <p className="text-xs text-zinc-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryAnalyticsPage;
