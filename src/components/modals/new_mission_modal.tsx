import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Icon } from "@iconify/react";
import { motion } from 'framer-motion';
import { Process } from "@/data/consts";
import { Mission } from "@/types/mission";
import { Agent } from "@/types/agent";
import { CREATE_MISSION, GET_AGENTS } from "@/utils/graphql_queries";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function NewMissionModal({ showModal, setShowModal, onAddNewMission = () => {} }) {
  const [tempMission, setTempMission] = useState<Mission>({
    name: "",
    crew: [],
    tasks: [],
    verbose: false,
    process: Process.SEQUENTIAL,
    result: "",
  });

  const { loading: agentsLoading, error: agentsError, data: agentsData } = useQuery(GET_AGENTS);
  const [createMission, { loading: createLoading }] = useMutation(CREATE_MISSION);
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
              <div className="p-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg">
                <Icon icon="material-symbols:deployed-code" className="w-6 h-6 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-zinc-100">Create New Mission</h2>
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
            {/* Mission Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Mission Name</label>
              <input
                type="text"
                value={tempMission.name}
                onChange={(e) => setTempMission({ ...tempMission, name: e.target.value })}
                placeholder="e.g., Research Project Analysis"
                className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                  focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Crew Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Select Crew Members</label>
              {agentsError ? (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-red-500">
                    <Icon icon="heroicons:exclamation-circle" className="w-5 h-5" />
                    <p className="text-sm">{agentsError.message || "Failed to load agents"}</p>
                  </div>
                </div>
              ) : agentsLoading ? (
                <div className="flex items-center gap-2 text-zinc-400">
                  <div className="animate-spin">
                    <Icon icon="heroicons:arrow-path" className="w-5 h-5" />
                  </div>
                  <span>Loading agents...</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {agentsData?.agents.map((agent: Agent) => (
                    <label
                      key={agent.id}
                      className="flex items-center gap-2 p-3 rounded-lg bg-zinc-800/50 cursor-pointer 
                        hover:bg-zinc-800 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={tempMission.crew.some(a => a.id === agent.id)}
                        onChange={(e) => {
                          const newCrew = e.target.checked
                            ? [...tempMission.crew, agent]
                            : tempMission.crew.filter(a => a.id !== agent.id);
                          setTempMission({ ...tempMission, crew: newCrew });
                        }}
                        className="rounded border-zinc-600 text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm text-zinc-300">{agent.role}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-4">Mission Settings</h3>
              <div className="space-y-4">
                {/* Process Selection */}
                <div className="space-y-2">
                  <label className="block text-sm text-zinc-400">Process Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(Process).map((process) => (
                      <button
                        key={process}
                        onClick={() => setTempMission({ ...tempMission, process })}
                        className={`p-3 rounded-lg border text-sm transition-colors ${
                          tempMission.process === process
                            ? 'border-green-500 bg-green-500/10 text-green-500'
                            : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800'
                        }`}
                      >
                        {process}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verbose Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-300">Verbose Mode</span>
                  <button
                    onClick={() => setTempMission({ ...tempMission, verbose: !tempMission.verbose })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                      ${tempMission.verbose ? 'bg-green-500' : 'bg-zinc-700'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                        ${tempMission.verbose ? 'translate-x-6' : 'translate-x-1'}`}
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
                createMission({
                  variables: {
                    ...tempMission,
                    crew: tempMission.crew.map(agent => parseInt(agent.id as string)),
                    tasks: tempMission.tasks.map(task => ({
                      ...task,
                      agent: parseInt(task.agent?.id as string)
                    }))
                  }
                }).then(() => {
                  setShowModal(false);
                  onAddNewMission();
                  ReactSwal.fire({
                    title: "Success",
                    text: "New mission has been created",
                    icon: "success"
                  });
                });
              }}
              disabled={createLoading || !tempMission.name || tempMission.crew.length === 0}
              className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg 
                hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center gap-2"
            >
              {createLoading ? (
                <>
                  <Icon icon="heroicons:arrow-path" className="w-5 h-5 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Icon icon="heroicons:plus" className="w-5 h-5" />
                  <span>Create Mission</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NewMissionModal;