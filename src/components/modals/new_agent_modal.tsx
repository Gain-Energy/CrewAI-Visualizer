import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import { tools } from "@/data/data";
import { Agent } from "@/types/agent";
import { CREATE_AGENT } from "@/utils/graphql_queries";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function NewAgentModal({ showModal, setShowModal, onAddNewAgent = () => {} }) {
  const [tempAgent, setTempAgent] = useState<Agent>({
    role: "",
    goal: "",
    backstory: "",
    tools: [],
    allowDelegation: false,
    verbose: false,
    memory: false,
  });

  const [createAgent, { loading: createLoading }] = useMutation(CREATE_AGENT);
  const ReactSwal = withReactContent(Swal);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-zinc-900 rounded-xl shadow-xl max-w-2xl w-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Icon icon="streamline-emojis:robot-face-1" className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-100">Add New Agent</h2>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Icon icon="ep:close-bold" className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Role</label>
                <input
                  type="text"
                  value={tempAgent.role}
                  onChange={(e) => setTempAgent({ ...tempAgent, role: e.target.value })}
                  placeholder="e.g., Research Assistant"
                  className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                    focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Goal</label>
                <input
                  type="text"
                  value={tempAgent.goal}
                  onChange={(e) => setTempAgent({ ...tempAgent, goal: e.target.value })}
                  placeholder="e.g., Assist with research and data analysis"
                  className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                    focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Backstory</label>
                <textarea
                  value={tempAgent.backstory || ""}
                  onChange={(e) => setTempAgent({ ...tempAgent, backstory: e.target.value })}
                  rows={3}
                  placeholder="Optional background information about the agent..."
                  className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                    focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>
            </div>

            {/* Tools */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Tools</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {tools.map((tool) => (
                  <label
                    key={tool.value}
                    className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/50 cursor-pointer hover:bg-zinc-800"
                  >
                    <input
                      type="checkbox"
                      checked={tempAgent.tools.includes(tool.value)}
                      onChange={(e) => {
                        const newTools = e.target.checked
                          ? [...tempAgent.tools, tool.value]
                          : tempAgent.tools.filter(t => t !== tool.value);
                        setTempAgent({ ...tempAgent, tools: newTools });
                      }}
                      className="rounded border-zinc-600 text-green-500 focus:ring-green-500"
                    />
                    <span className="text-sm text-zinc-300">{tool.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-300">Allow Delegation</span>
                  <button
                    onClick={() => setTempAgent({ ...tempAgent, allowDelegation: !tempAgent.allowDelegation })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${tempAgent.allowDelegation ? 'bg-green-500' : 'bg-zinc-700'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${tempAgent.allowDelegation ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-300">Verbose Mode</span>
                  <button
                    onClick={() => setTempAgent({ ...tempAgent, verbose: !tempAgent.verbose })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${tempAgent.verbose ? 'bg-green-500' : 'bg-zinc-700'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${tempAgent.verbose ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-300">Memory Enabled</span>
                  <button
                    onClick={() => setTempAgent({ ...tempAgent, memory: !tempAgent.memory })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${tempAgent.memory ? 'bg-green-500' : 'bg-zinc-700'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${tempAgent.memory ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-800 p-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                createAgent({ variables: tempAgent })
                  .then(() => {
                    setShowModal(false);
                    onAddNewAgent();
                    ReactSwal.fire({
                      title: "Success",
                      text: "New agent has been added to your crew",
                      icon: "success"
                    });
                  });
              }}
              disabled={createLoading || !tempAgent.role || !tempAgent.goal}
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg 
                hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createLoading ? "Adding..." : "Add Agent"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NewAgentModal;