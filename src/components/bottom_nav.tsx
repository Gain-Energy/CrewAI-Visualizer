import React from 'react';
import Link from "next/link";
import { Icon } from "@iconify/react";
import useNavigation from "@/hook/use_navigation";

const BottomNav = () => {
  const { isMissionsActive, isAgentsActive } = useNavigation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 sm:hidden">
      {/* Gradient Border */}
      <div className="h-px w-full bg-gradient-to-r from-green-400/20 via-blue-500/20 to-green-400/20" />
      
      {/* Navigation Bar */}
      <div className="bg-zinc-100/80 dark:bg-zinc-950/80 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800/50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <Link
              href="/missions"
              className="relative group flex flex-col items-center"
            >
              {/* Background Glow */}
              {isMissionsActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-xl" />
              )}
              
              {/* Icon */}
              <div className={`relative transition-all duration-200 ${
                isMissionsActive ? 'transform scale-110' : 'opacity-60 hover:opacity-100'
              }`}>
                <Icon 
                  icon="flat-color-icons:parallel-tasks" 
                  width="32" 
                  height="32"
                  className="relative z-10"
                />
                
                {/* Active Indicator */}
                {isMissionsActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={`mt-1 text-xs font-medium transition-colors duration-200 ${
                isMissionsActive 
                  ? 'text-zinc-900 dark:text-zinc-100' 
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}>
                Missions
              </span>
            </Link>

            <Link
              href="/agents"
              className="relative group flex flex-col items-center"
            >
              {/* Background Glow */}
              {isAgentsActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-xl" />
              )}
              
              {/* Icon */}
              <div className={`relative transition-all duration-200 ${
                isAgentsActive ? 'transform scale-110' : 'opacity-60 hover:opacity-100'
              }`}>
                <Icon 
                  icon="streamline-emojis:robot-face-1" 
                  width="32" 
                  height="32"
                  className="relative z-10"
                />
                
                {/* Active Indicator */}
                {isAgentsActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                  </div>
                )}
              </div>
              
              {/* Label */}
              <span className={`mt-1 text-xs font-medium transition-colors duration-200 ${
                isAgentsActive 
                  ? 'text-zinc-900 dark:text-zinc-100' 
                  : 'text-zinc-600 dark:text-zinc-400'
              }`}>
                Crew
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;