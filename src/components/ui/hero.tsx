import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const gradients = {
  grad1: {
    initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
    animate: {
      x1: ["0%", "0%", "200%"],
      x2: ["0%", "0%", "180%"],
      y1: ["80%", "0%", "0%"],
      y2: ["100%", "20%", "20%"],
    }
  },
  grad2: {
    initial: { x1: "0%", x2: "0%", y1: "80%", y2: "100%" },
    animate: {
      x1: ["20%", "100%", "100%"],
      x2: ["0%", "90%", "90%"],
      y1: ["80%", "80%", "-20%"],
      y2: ["100%", "100%", "0%"],
    }
  },
  grad3: {
    initial: { x1: "40%", x2: "50%", y1: "160%", y2: "180%" },
    animate: {
      x1: ["40%", "0%", "0%"],
      x2: ["50%", "0%", "0%"],
      y1: ["160%", "0%", "0%"],
      y2: ["180%", "20%", "20%"],
    }
  }
};

const MotionLink = motion(Link);

export const UpstrimaHero = () => {
  return (
    <div className="flex h-[40rem] relative items-center justify-center antialiased bg-zinc-950 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <MotionLink
        href="/agents"
        className="w-[320px] z-40 h-[120px] no-underline group cursor-pointer relative rounded-xl p-px text-xs font-semibold leading-6 text-white"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Gradient Border */}
        <motion.div 
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 opacity-20"
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Hover Effect */}
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(74,222,128,0.6)_0%,rgba(74,222,128,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>

        {/* Content Container */}
        <div className="relative w-[320px] text-center pt-5 space-y-2 h-[120px] items-center z-10 rounded-xl bg-zinc-950/90 backdrop-blur-sm py-0.5 px-4 ring-1 ring-white/10">
          <motion.span 
            className="md:text-2xl text-base block bg-gradient-to-r from-green-400 via-emerald-400 to-blue-500 bg-clip-text text-transparent font-semibold"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% 100%" }}
          >
            Upstrima Agent Stack
          </motion.span>
          <span className="text-base block text-zinc-300">
            Build and manage your agent workflows efficiently
          </span>
        </div>
      </MotionLink>
      
      {/* Animated SVG Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SVGs />
      </div>

      {/* Floating Particles */}
      <ParticleField />
    </div>
  );
};

const SVGs = () => {
  return (
    <svg
      width="858"
      height="434"
      viewBox="0 0 858 434"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex flex-shrink-0"
    >
      {/* Base Paths */}
      <motion.path
        d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
        stroke="var(--zinc-800)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M568 200H841C846.523 200 851 195.523 851 190V40"
        stroke="var(--zinc-800)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
      
      {/* Gradient Paths */}
      <motion.path
        d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
        stroke="url(#upstrima-grad1)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M568 200H841C846.523 200 851 195.523 851 190V40"
        stroke="url(#upstrima-grad2)"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />

      <defs>
        {/* Gradient Definitions */}
        {Object.entries(gradients).map(([id, gradient]) => (
          <motion.linearGradient
            key={id}
            id={`upstrima-${id}`}
            variants={gradient}
            animate="animate"
            initial="initial"
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              repeatDelay: Math.random() * 2,
            }}
          >
            <stop stopColor="#4ADE80" stopOpacity="0" />
            <stop offset="0.325" stopColor="#4ADE80" />
            <stop offset="0.675" stopColor="#22D3EE" />
            <stop offset="1" stopColor="#22D3EE" stopOpacity="0" />
          </motion.linearGradient>
        ))}
      </defs>

      {/* Animated End Points */}
      <motion.circle
        cx="851"
        cy="34"
        r="6.5"
        fill="#27272a"
        stroke="#4ADE80"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
      />
      <motion.circle
        cx="6.5"
        cy="398.5"
        r="6"
        fill="#27272a"
        stroke="#22D3EE"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
      />
    </svg>
  );
};

const ParticleField = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-green-400/20 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0,
          }}
          animate={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default UpstrimaHero;