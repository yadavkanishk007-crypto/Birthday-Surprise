"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EntryGateProps {
    onEnter: () => void;
}

export default function EntryGate({ onEnter }: EntryGateProps) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStep(1), 2000), // "Hey Sohniye…"
            setTimeout(() => setStep(2), 4000), // "28 March."
            setTimeout(() => setStep(3), 6000), // "Important day."
            setTimeout(() => setStep(4), 8500), // "Because my good luck charm..."
            setTimeout(() => setStep(5), 12500), // Show Button
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const textVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground overflow-hidden">
            {/* Slow Stars Background Idea - Can expand with Three.js later */}
            <div className="absolute inset-0 bg-black z-0" />

            <div className="z-10 flex flex-col items-center justify-center space-y-6 text-center px-6">
                <AnimatePresence>
                    {step >= 1 && (
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="font-heading text-2xl md:text-3xl text-gold"
                        >
                            Hey Sohniye…
                        </motion.p>
                    )}

                    {step >= 2 && (
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="font-body text-xl md:text-2xl mt-4"
                        >
                            28 March.
                        </motion.p>
                    )}

                    {step >= 3 && (
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="font-body text-xl md:text-2xl"
                        >
                            Important day.
                        </motion.p>
                    )}

                    {step >= 4 && (
                        <motion.p
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="font-body text-lg md:text-xl text-pinkGlow mt-6"
                        >
                            Because my good luck charm was born today.
                        </motion.p>
                    )}

                    {step >= 5 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            onClick={onEnter}
                            className="mt-12 px-8 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-black transition-colors duration-500 font-body text-lg tracking-widest"
                        >
                            Enter
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
