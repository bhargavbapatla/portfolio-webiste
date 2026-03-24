"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. Lock scrolling while the preloader is active
        document.body.style.overflow = "hidden";

        // 2. Force scroll to top so the reveal looks perfect
        window.scrollTo(0, 0);

        // 3. Unmount preloader after sequence finishes (2.6 seconds)
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto"; // Unlock scrolling
        }, 2600);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    // The cubic-bezier here is the secret sauce for that "Awwwards" slide-up feel
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                >
                    <div className="relative flex items-center justify-center">

                        {/* Step 1: The Spinning "Cube" / Element */}
                        <motion.div
                            className="absolute h-8 w-8 bg-white"
                            initial={{ scale: 0, rotate: 0 }}
                            animate={{
                                scale: [0, 1, 1, 0],
                                rotate: [0, 90, 180, 270]
                            }}
                            transition={{
                                duration: 1.4,
                                times: [0, 0.4, 0.7, 1], // Controls pacing of the array values above
                                ease: "easeInOut"
                            }}
                        />

                        {/* Step 2: The Name Reveal */}
                        <motion.div
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                            animate={{
                                opacity: [0, 0, 1],
                                filter: ["blur(10px)", "blur(10px)", "blur(0px)"],
                                y: [10, 10, 0]
                            }}
                            transition={{
                                duration: 2.2,
                                times: [0, 0.65, 1], // Waits for the cube to finish before appearing
                                ease: "easeOut"
                            }}
                        >
                            <div className="font-mono text-sm font-bold text-blue sm:text-base">
                                &lt;KB/&gt;
                            </div>
                            <div className="font-display text-xl font-black tracking-[0.2em] text-white sm:text-3xl">
                                Hey there!
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}