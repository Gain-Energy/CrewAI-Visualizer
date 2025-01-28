"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

const TopNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 sm:hidden">
      {/* Main Nav Bar */}
      <div className="relative">
        <div className="bg-zinc-100/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b dark:border-zinc-800 border-zinc-200">
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="relative group flex items-center">
                <Image
                  src="/crewai_logo.png"
                  alt="UpstrimaAgentStack Logo"
                  width={50}
                  height={50}
                  className="relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              {/* Navigation Controls */}
              <div className="flex items-center gap-4">
                {/* Theme Toggle - If you want to add it */}
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800"
                  onClick={() => {
                    /* Add theme toggle logic */
                  }}
                >
                  <Icon
                    icon="heroicons:sun-20-solid"
                    className="w-5 h-5 text-zinc-700 dark:text-zinc-300"
                  />
                </button>

                {/* Menu Button */}
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Icon
                    icon={
                      isMenuOpen
                        ? "heroicons:x-mark-20-solid"
                        : "heroicons:bars-3-20-solid"
                    }
                    className="w-5 h-5 text-zinc-700 dark:text-zinc-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-zinc-100/95 dark:bg-zinc-950/95 backdrop-blur-lg border-b dark:border-zinc-800 border-zinc-200">
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/missions"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon
                  icon="flat-color-icons:parallel-tasks"
                  className="w-6 h-6"
                />
                <span className="font-medium">Missions</span>
              </Link>
              <Link
                href="/agents"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon
                  icon="streamline-emojis:robot-face-1"
                  className="w-6 h-6"
                />
                <span className="font-medium">Crew</span>
              </Link>
            </div>

            {/* Additional Info */}
            <div className="px-8 py-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-xs text-zinc-500">UpstrimaAgentStack v1.0</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;
