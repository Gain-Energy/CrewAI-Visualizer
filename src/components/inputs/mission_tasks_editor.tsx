import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import { Mission } from "@/types/mission";
import { Agent } from "@/types/agent";
import { Task } from "@/types/task";

interface MissionTaskEditorProps {
  mission: Mission;
  agents: Array<Agent>;
  onMissionChange: (updatedMission: Mission) => void;
}

const MissionTaskEditor: React.FC<MissionTaskEditorProps> = ({
  mission,
  agents = [],
  onMissionChange,
}) => {
  const [newTask, setNewTask] = useState<Task>({
    name: "",
    description: "",
    expected_output: "",
    agent: null
  });

  const handleAddTask = () => {
    const updatedTasks = [...(mission?.tasks ?? []), newTask];
    onMissionChange({ ...mission, tasks: updatedTasks });
    setNewTask({
      name: "",
      description: "",
      expected_output: "",
      agent: null
    });
  };

  const handleRemoveTask = (index: number) => {
    const updatedTasks = [...(mission?.tasks ?? [])];
    updatedTasks.splice(index, 1);
    onMissionChange({ ...mission, tasks: updatedTasks });
  };

  return (
    <div className="space-y-6">
      {/* Existing Tasks */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-zinc-400">Current Tasks</h3>
        <div className="space-y-3">
          {mission?.tasks?.map((task, index) => (
            <div
              key={index}
              className="group relative bg-zinc-800/50 rounded-lg border border-zinc-700 p-4 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-zinc-200">
                    {index + 1}. {task.name}
                  </h4>
                  <p className="text-sm text-zinc-400">{task.description}</p>
                </div>
                <button
                  onClick={() => handleRemoveTask(index)}
                  className="p-1 text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <Icon icon="heroicons:trash" className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-2 px-2.5 py-1 bg-zinc-900 rounded-full text-sm">
                  <Icon icon="streamline-emojis:robot-face-1" className="w-4 h-4" />
                  <span className="text-zinc-300">
                    {task.agent?.role ?? "No Agent"}
                  </span>
                </div>
                {task.expected_output && (
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-zinc-900 rounded-full text-sm">
                    <Icon icon="heroicons:document-text" className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-300">Has Expected Output</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {mission?.tasks?.length === 0 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800/50 mb-4">
                <Icon icon="heroicons:clipboard-document-list" className="w-6 h-6 text-zinc-400" />
              </div>
              <p className="text-sm text-zinc-400">No tasks added yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add New Task Form */}
      <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-lg border border-zinc-800 p-4">
        <h3 className="text-sm font-medium text-zinc-200 mb-4">Add New Task</h3>
        
        <div className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Task Name
            </label>
            <input
              type="text"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              placeholder="e.g., Research Market Trends"
              className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              placeholder="Describe what needs to be done..."
              rows={3}
              className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Expected Output */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Expected Output
            </label>
            <textarea
              value={newTask.expected_output}
              onChange={(e) => setNewTask({ ...newTask, expected_output: e.target.value })}
              placeholder="Describe the expected outcome..."
              rows={2}
              className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg 
                focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Agent Selection */}
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">
              Assign Agent
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: -1, role: "None" }, ...mission.crew].map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setNewTask({ ...newTask, agent: agent.id === -1 ? null : agent })}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-sm transition-colors ${
                    (newTask.agent?.id || -1) === agent.id
                      ? 'border-green-500 bg-green-500/10 text-green-500'
                      : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800'
                  }`}
                >
                  <Icon 
                    icon={agent.id === -1 ? "heroicons:user-slash" : "streamline-emojis:robot-face-1"} 
                    className="w-4 h-4" 
                  />
                  <span>{agent.role}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddTask}
            disabled={!newTask.name || !newTask.description}
            className="w-full px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg 
              hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center justify-center gap-2"
          >
            <Icon icon="heroicons:plus" className="w-5 h-5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionTaskEditor;