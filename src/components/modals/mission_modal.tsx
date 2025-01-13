import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from 'framer-motion';
import { Mission } from "@/types/mission";
import { Agent } from "@/types/agent";
import { Process } from "@/data/consts";
import { GET_AGENTS, UPDATE_MISSION, DELETE_MISSION, RUN_MISSION } from "@/utils/graphql_queries";
import MissionTaskEditor from "../inputs/mission_tasks_editor";
import { TasksAccordion } from "../ui/tasks_accordions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function MissionModal({
  mission,
  showModal,
  setShowModal,
  onUpdateMission = () => {},
  onRunMission = () => {},
  onDeleteMission = () => {},
}) {
  const [isEdit, setEdit] = useState(false);
  const [tempMission, setTempMission] = useState<Mission>(mission);
  const [missionResult, setMissionResult] = useState<string>(mission?.result ?? "");
  const ReactSwal = withReactContent(Swal);

  const { loading: agentsLoading, error: agentsError, data: agentsData } = useQuery(GET_AGENTS);
  const [updateMission, { loading: updateLoading }] = useMutation(UPDATE_MISSION);
  const [runMission, { loading: runLoading }] = useMutation(RUN_MISSION);
  const [deleteMission, { loading: deleteLoading }] = useMutation(DELETE_MISSION);

  useEffect(() => {
    setTempMission(mission);
    setMissionResult(mission?.result ?? "");
  }, [mission]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(false)} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-zinc-900 rounded-xl shadow-xl max-w-4xl w-full overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800">
            {isEdit ? (
              <input
                type="text"
                value={tempMission?.name}
                onChange={(e) => setTempMission({ ...tempMission, name: e.target.value })}
                className="text-xl font-semibold bg-transparent border-b border-zinc-700 focus:border-green-500 outline-none px-2 py-1"
                placeholder="Mission Name"
              />
            ) : (
              <h2 className="text-xl font-semibold text-zinc-100">{mission?.name}</h2>
            )}
            <button
              onClick={() => setShowModal(false)}
              className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Icon icon="ep:close-bold" className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Crew Section */}
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Crew Members</h3>
              {agentsError ? (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                  {agentsError.message}
                </div>
              ) : (
                <div className="space-y-2">
                  {isEdit ? (
                    <div className="grid grid-cols-2 gap-2">
                      {agentsData?.agents.map((agent: Agent) => (
                        <label 
                          key={agent.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 cursor-pointer"
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
                            className="w-4 h-4 rounded border-zinc-600 text-green-500 focus:ring-green-500"
                          />
                          <span className="text-sm text-zinc-300">{agent.role}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {mission?.crew.map((agent) => (
                        <span
                          key={agent.id}
                          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-full text-sm text-zinc-300"
                        >
                          <Icon icon="streamline-emojis:robot-face-1" className="w-4 h-4" />
                          {agent.role}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-400">Settings</h3>
                <div className="space-y-3">
                  {/* Process Selection */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-300">Process Type</span>
                    {isEdit ? (
                      <select
                        value={tempMission.process}
                        onChange={(e) => setTempMission({ ...tempMission, process: e.target.value as Process })}
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm"
                      >
                        <option value={Process.SEQUENTIAL}>Sequential</option>
                        <option value={Process.HIERARCHICAL}>Hierarchical</option>
                      </select>
                    ) : (
                      <span className="px-3 py-1 bg-zinc-800 rounded-full text-sm text-zinc-300">
                        {mission.process}
                      </span>
                    )}
                  </div>

                  {/* Verbose Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-300">Verbose Mode</span>
                    <button
                      onClick={() => isEdit && setTempMission({ ...tempMission, verbose: !tempMission.verbose })}
                      disabled={!isEdit}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${tempMission.verbose ? 'bg-green-500' : 'bg-zinc-700'}
                        ${!isEdit && 'opacity-50 cursor-not-allowed'}`}
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

            {/* Tasks Section */}
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Tasks</h3>
              {isEdit ? (
                <MissionTaskEditor
                  mission={tempMission}
                  agents={tempMission.crew}
                  onMissionChange={setTempMission}
                />
              ) : (
                <TasksAccordion tasks={mission.tasks} />
              )}
            </div>

            {/* Results Section */}
            {!isEdit && (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    runMission({ variables: { id: parseInt(mission.id as string) } })
                      .then(({ data }) => {
                        if (!data.runMission.error) {
                          setMissionResult(data.runMission.result);
                          onRunMission();
                          ReactSwal.fire({
                            title: "Success",
                            text: "Mission completed successfully",
                            icon: "success"
                          });
                        }
                      });
                  }}
                  disabled={runLoading || mission.tasks.length === 0}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {runLoading ? "Running..." : mission.result ? "Re-Run Mission" : "Run Mission"}
                </button>

                {missionResult && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-zinc-400">Results</h3>
                    <div className="p-4 bg-zinc-800/50 rounded-lg whitespace-pre-line text-zinc-300">
                      {missionResult}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-zinc-800 p-6">
            {!isEdit ? (
              <>
                <button
                  onClick={() => setEdit(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Edit Mission
                </button>
                <button
                  onClick={() => {
                    ReactSwal.fire({
                      title: "Delete Mission",
                      text: "Are you sure? This action cannot be undone.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#EF4444",
                      confirmButtonText: "Delete"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteMission({ variables: { id: parseInt(mission.id as string) } })
                          .then(() => {
                            setShowModal(false);
                            onDeleteMission();
                          });
                      }
                    });
                  }}
                  disabled={deleteLoading}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                    transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEdit(false)}
                  className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateMission({
                      variables: {
                        ...tempMission,
                        id: parseInt(tempMission.id as string),
                        crew: tempMission.crew.map(agent => parseInt(agent.id as string)),
                        tasks: tempMission.tasks.map(task => ({
                          name: task.name,
                          description: task.description,
                          expected_output: task.expected_output,
                          agent: parseInt(task.agent?.id as string)
                        }))
                      }
                    }).then(() => {
                      setShowModal(false);
                      setEdit(false);
                      onUpdateMission();
                    });
                  }}
                  disabled={updateLoading || !tempMission.name}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                    transition-colors disabled:opacity-50"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}