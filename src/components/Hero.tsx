import React, { useState } from "react";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { motion } from "framer-motion";
import WaveBackground from "./WaveBackground";

export default function Hero() {
  const [enhance, setEnhance] = useState(false);

  return (
    <section className="h-screen  relative flex flex-col">
      <div className="flex-grow flex items-center">
        <div className="max-w-6xl lg:max-w-7xl mx-auto flex flex-row w-full items-center relative justify-end">
          <div className="w-full md:w-1/2 text-left flex flex-col items-start px-6">
            <motion.h1
              className="text-5xl lg:text-6xl font-extrabold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              }}
            >
              
              <span className="bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                Wave
              </span>
              <span className="text-white"> Shader</span>
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-white/90 mb-10 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              }}
            >
              An interactive WebGL wave animation that responds to your hover. Built with Three.js and custom GLSL shaders.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-5 justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
              }}
            >
              <button
                onMouseEnter={() => setEnhance(true)}
                onMouseLeave={() => setEnhance(false)}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all border border-white/20 gap-2 cursor-pointer"
              >
                <HiOutlineLightningBolt className="w-6 h-6" />
                Hover Me!
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      <WaveBackground areLightsEnhanced={enhance} />
    </section>
  );
}
