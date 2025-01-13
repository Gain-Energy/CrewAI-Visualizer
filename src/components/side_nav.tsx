import React from 'react';
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import useNavigation from "@/hook/use_navigation";

const SideNav = () => {
  const { isMissionsActive, isAgentsActive } = useNavigation();

  return (
    <nav className="hidden sm:flex flex-col fixed h-full w-[120px] md:w-[250px] bg-zinc-900/95 backdrop-blur-sm border-r border-zinc-800/40">
      {/* Logo Section */}
      <div className="flex flex-col items-center md:items-start p-6 border-b border-zinc-800/40">
        <Link
          href="/"
          className="relative group flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src="/crewai_logo.png"
            alt="UpstrimaAgentStack Logo"
            width={100}
            height={100}
            className="relative z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-2 p-4">
        <Link
          href="/missions"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
            ${isMissionsActive 
              ? 'bg-gradient-to-r from-green-400/10 to-blue-500/10 text-white' 
              : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-white'
            }`}
        >
          <div className="relative">
            <Icon 
              icon="flat-color-icons:parallel-tasks" 
              width="35" 
              height="35"
              className="relative z-10"
            />
            {isMissionsActive && (
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg" />
            )}
          </div>
          <span className={`text-lg hidden md:block transition-all
            ${isMissionsActive ? 'font-semibold' : 'font-medium'}
          `}>
            Missions
          </span>
          {isMissionsActive && (
            <div className="ml-auto hidden md:flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
            </div>
          )}
        </Link>

        <Link
          href="/agents"
          className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
            ${isAgentsActive 
              ? 'bg-gradient-to-r from-green-400/10 to-blue-500/10 text-white' 
              : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-white'
            }`}
        >
          <div className="relative">
            <Icon 
              icon="streamline-emojis:robot-face-1" 
              width="35" 
              height="35"
              className="relative z-10"
            />
            {isAgentsActive && (
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg" />
            )}
          </div>
          <span className={`text-lg hidden md:block transition-all
            ${isAgentsActive ? 'font-semibold' : 'font-medium'}
          `}>
            Crew
          </span>
          {isAgentsActive && (
            <div className="ml-auto hidden md:flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
            </div>
          )}
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-zinc-800/40">
        <div className="hidden md:block px-4 py-3">
          <div className="text-xs text-zinc-500">
            UpstrimaAgentStack v1.0
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;