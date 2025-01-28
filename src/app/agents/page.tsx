"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Agent } from "@/types/agent";
import { GET_AGENTS } from "@/utils/graphql_queries";
import AgentModal from "@/components/modals/agent_modal";
import NewAgentModal from "@/components/modals/new_agent_modal";

const AgentsPage = () => {
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [showNewAgentModal, setShowNewAgentModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent>();

  const { loading, error, data, refetch } = useQuery(GET_AGENTS);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 px-4 py-2 bg-zinc-800 rounded-lg text-zinc-300">
          <div className="animate-spin">
            <Icon icon="heroicons:arrow-path" className="w-5 h-5" />
          </div>
          <span>Loading agents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100">Agent Crew</h1>
          <p className="text-zinc-400 mt-1">Manage your intelligent agents</p>
        </div>

        <button
          onClick={() => setShowNewAgentModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 
            text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Icon icon="heroicons:plus" className="w-5 h-5" />
          <span>Add Agent</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 text-red-500">
              <Icon icon="heroicons:exclamation-circle" className="w-5 h-5" />
              <p>{error?.message ?? "Failed to load agents"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data?.agents.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-800/50 mb-4">
            <Icon
              icon="streamline-emojis:robot-face-1"
              className="w-8 h-8 text-zinc-400"
            />
          </div>
          <h3 className="text-lg font-medium text-zinc-300 mb-2">
            No Agents Yet
          </h3>
          <p className="text-zinc-500 max-w-sm mx-auto mb-6">
            Start by adding your first agent to build your intelligent crew
          </p>
          <button
            onClick={() => setShowNewAgentModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 
              text-zinc-300 rounded-lg transition-colors"
          >
            <Icon icon="heroicons:plus" className="w-5 h-5" />
            <span>Add Your First Agent</span>
          </button>
        </div>
      )}

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.agents.map((agent: Agent, i: number) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 
              hover:border-green-500/30 transition-colors"
          >
            {/* Agent Image */}
            <div className="aspect-square relative">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10" />
              <img
                src={agent.image ?? "/agents_images/sailor.png"}
                alt={agent.role}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Agent Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">{agent.role}</h3>
                <p className="text-sm text-zinc-400 line-clamp-2">
                  {agent.goal}
                </p>
              </div>

              {/* Tools/Features */}
              <div className="flex flex-wrap gap-2 mt-4">
                {agent.allowDelegation && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-zinc-800/80 rounded-full text-xs text-zinc-400">
                    <Icon icon="heroicons:users" className="w-3 h-3" />
                    <span>Delegation</span>
                  </div>
                )}
                {agent.memory && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-zinc-800/80 rounded-full text-xs text-zinc-400">
                    <Icon icon="heroicons:cpu-chip" className="w-3 h-3" />
                    <span>Memory</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setSelectedAgent(agent);
                setShowAgentModal(true);
              }}
              className="absolute top-4 right-4 p-2 bg-zinc-900/80 rounded-lg opacity-0 
                group-hover:opacity-100 transition-opacity hover:bg-zinc-800"
            >
              <Icon
                icon="heroicons:pencil-square"
                className="w-5 h-5 text-zinc-400"
              />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Modals */}
      <AgentModal
        agent={selectedAgent!}
        showModal={showAgentModal}
        setShowModal={setShowAgentModal}
        onUpdateAgent={refetch}
        onUploadImage={refetch}
        onDeleteAgent={refetch}
      />
      <NewAgentModal
        showModal={showNewAgentModal}
        setShowModal={setShowNewAgentModal}
        onAddNewAgent={refetch}
      />
    </div>
  );
};

export default AgentsPage;
