"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";

interface EntryGateProps {
    onEnter: () => void;
}

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
    const chars = text.split("");
    return (
        <motion.p
            className={`tracking-widest ${className}`}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 1 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: delay } // 80ms per character
                }
            }}
        >
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, filter: "blur(4px)" },
                        visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } }
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.p>
    );
};

export default function EntryGate({ onEnter }: EntryGateProps) {
    const [step, setStep] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);
    const [ambientAudio, setAmbientAudio] = useState<Howl | null>(null);

    useEffect(() => {
        // Preload and play extremely subtle ambient humming/stars noise (if user adds ambient.mp3)
        const ambient = new Howl({
            src: ["/audio/ambient.mp3"],
            loop: true,
            volume: 0.1,
            html5: true
        });
        ambient.play();
        setAmbientAudio(ambient);

        const timers = [
            setTimeout(() => setStep(1), 1000),  // "Hey Sohniye…"
            setTimeout(() => setStep(2), 3500),  // "28 March."
            setTimeout(() => setStep(3), 6000),  // "Important day."
            setTimeout(() => setStep(4), 9000),  // "Because my good luck charm..."
            setTimeout(() => setStep(5), 15000), // 2s pause before button
        ];

        return () => {
            timers.forEach(clearTimeout);
            ambient.fade(ambient.volume(), 0, 1000);
            setTimeout(() => ambient.unload(), 1000);
        };
    }, []);

    const handleEnter = () => {
        setIsLeaving(true);
        if (ambientAudio) {
            ambientAudio.fade(0.1, 0, 1000);
        }
        setTimeout(() => {
            onEnter();
        }, 1500); // 1.5s fade out before transitioning state
    };

    return (
        <AnimatePresence>
            {!isLeaving && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1.5 } }}
                    exit={{ opacity: 0, transition: { duration: 1.5 } }}
                    className="relative flex flex-col items-center justify-center min-h-screen bg-black text-foreground overflow-hidden"
                >
                    {/* Cinematic Slow Star Background */}
                    <motion.div
                        initial={{ scale: 1, rotate: 0 }}
                        animate={{ scale: 1.15, rotate: 2 }}
                        transition={{ duration: 40, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-black to-black" />
                    </motion.div>

                    <div className="z-10 flex flex-col items-center justify-center space-y-8 text-center px-6">
                        {step >= 1 && <TypewriterText text="Hey Sohniye…" className="font-heading text-2xl md:text-3xl text-gold text-glow" />}

                        {step >= 2 && <TypewriterText text="28 March." className="font-body text-xl md:text-2xl mt-4" />}

                        {step >= 3 && <TypewriterText text="Important day." className="font-body text-xl md:text-2xl" />}

                        {step >= 4 && <TypewriterText text="Because my good luck charm was born today." className="font-body text-lg md:text-xl text-pinkGlow mt-6 text-glow" />}

                        {step >= 5 && (
                            <motion.button
                                initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                onClick={handleEnter}
                                className="mt-16 px-10 py-4 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-700 font-body text-lg tracking-[0.3em] box-glow hover:scale-105"
                            >
                                Enter
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
