import React, { useState } from 'react';
import { Task } from "@/types/task";
import { Icon } from "@iconify/react";

export function TasksAccordion({ tasks }: { tasks: Array<Task> }) {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenId(openId === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-200 hover:border-green-400/50 dark:hover:border-green-400/30"
        >
          {/* Accordion Header */}
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex items-center justify-between p-4 text-left cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2 transition-colors
                ${openId === index 
                  ? 'bg-gradient-to-r from-green-400/10 to-blue-500/10' 
                  : 'bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
                }`}
              >
                <Icon 
                  icon="material-symbols:task-alt-rounded"
                  className={`w-5 h-5 transition-colors
                    ${openId === index
                      ? 'text-green-500'
                      : 'text-zinc-600 dark:text-zinc-400'
                    }`}
                />
              </div>
              <span className={`font-medium transition-colors
                ${openId === index
                  ? 'text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100'
                }`}
              >
                {task.name}
              </span>
            </div>
            <Icon 
              icon="material-symbols:keyboard-arrow-down-rounded"
              className={`w-6 h-6 transition-transform text-zinc-400
                ${openId === index ? 'rotate-180' : 'rotate-0'}
              `}
            />
          </button>

          {/* Accordion Content */}
          <div className={`overflow-hidden transition-all duration-200
            ${openId === index ? 'max-h-[500px]' : 'max-h-0'}
          `}>
            <div className="p-4 pt-0 space-y-4">
              {/* Agent Badge */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 w-fit">
                  <Icon 
                    icon="streamline-emojis:robot-face-1"
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {task.agent?.role ?? "No Agent Assigned"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Description
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {task.description}
                </p>
              </div>

              {/* Expected Output */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Expected Output
                </h3>
                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-3">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {task.expected_output}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TasksAccordion;