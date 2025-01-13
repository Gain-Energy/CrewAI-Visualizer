import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import useNavigation from "@/hook/use_navigation";

const SideNav = () => {
  const { isMissionsActive, isAgentsActive, isMarketplaceActive } = useNavigation();
  const [isRegistryOpen, setIsRegistryOpen] = useState(false);

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
        </Link>

        {/* Marketplace Section */}
        <div className="mt-4 pt-4 border-t border-zinc-800/40">
          <Link
            href="/marketplace"
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
              ${isMarketplaceActive 
                ? 'bg-gradient-to-r from-green-400/10 to-blue-500/10 text-white' 
                : 'hover:bg-zinc-800/50 text-zinc-400 hover:text-white'
              }`}
          >
            <div className="relative">
              <Icon 
                icon="heroicons:shopping-bag" 
                width="35" 
                height="35"
                className="relative z-10"
              />
              {isMarketplaceActive && (
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg" />
              )}
            </div>
            <span className={`text-lg hidden md:block transition-all
              ${isMarketplaceActive ? 'font-semibold' : 'font-medium'}
            `}>
              Marketplace
            </span>
          </Link>

          {/* Registry Dropdown */}
          <div className="mt-2">
            <button
              onClick={() => setIsRegistryOpen(!isRegistryOpen)}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                hover:bg-zinc-800/50 text-zinc-400 hover:text-white"
            >
              <Icon 
                icon="heroicons:cube-transparent" 
                width="35" 
                height="35"
              />
              <span className="text-lg hidden md:block font-medium">Registry</span>
              <Icon 
                icon="heroicons:chevron-down"
                className={`w-5 h-5 ml-auto hidden md:block transition-transform ${isRegistryOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isRegistryOpen && (
              <div className="pl-14 mt-1 space-y-1 hidden md:block">
                <Link
                  href="/registry/publish"
                  className="flex items-center gap-2 py-2 text-sm text-zinc-400 hover:text-white"
                >
                  Publish
                </Link>
                <Link
                  href="/registry/manage"
                  className="flex items-center gap-2 py-2 text-sm text-zinc-400 hover:text-white"
                >
                  Manage
                </Link>
                <Link
                  href="/registry/analytics"
                  className="flex items-center gap-2 py-2 text-sm text-zinc-400 hover:text-white"
                >
                  Analytics
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-zinc-800/40">
        <div className="hidden md:block px-4 py-3">
          <div className="text-xs text-zinc-500">
            UpstrimaAgentStack v1.0
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Link 
              href="/docs"
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              Docs
            </Link>
            <span className="text-zinc-700">•</span>
            <Link 
              href="/support"
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideNav;