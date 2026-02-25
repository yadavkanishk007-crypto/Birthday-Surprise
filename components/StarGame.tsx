"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { Howl } from "howler";

const compliments = [
    "Lucky vibes ✨",
    "Calm energy 🌙",
    "Rare person 💎",
    "Sohniye ❤️",
    "Main character energy 🎬",
    "Good aura 🌟",
    "My absolute favorite 💫"
];

export default function StarGame() {
    const [taps, setTaps] = useState(0);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);
    const [clickedStars, setClickedStars] = useState<number[]>([]);
    const [flash, setFlash] = useState(false);

    // Generate random positions for stars exactly once
    const starsArray = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
            delay: Math.random() * 2,
            duration: Math.random() * 3 + 2,
            size: Math.random() > 0.5 ? 24 : 16
        }));
    }, []);

    const handleStarClick = (id: number) => {
        if (clickedStars.includes(id)) return;
        if (taps >= compliments.length) return;

        setClickedStars((prev) => [...prev, id]);

        // Small magical sound
        const chime = new Howl({
            src: ["/audio/chime.mp3"],
            volume: 0.3,
            html5: true
        });
        chime.play();

        setActiveMessage(compliments[taps]);
        setTaps((prev) => prev + 1);
    };

    useEffect(() => {
        if (taps === compliments.length) {
            setFlash(true);
            setTimeout(() => setFlash(false), 300);
        }
    }, [taps]);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-transparent text-foreground overflow-hidden py-24">
            {/* Screen Glow Flash */}
            <AnimatePresence>
                {flash && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 z-50 bg-gold/30 pointer-events-none mix-blend-overlay"
                    />
                )}
            </AnimatePresence>

            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gold/10 rounded-full blur-[100px]" />
            </div>

            <div className="z-10 text-center mb-10 w-full px-6">
                <h2 className="font-heading text-3xl md:text-5xl text-gold mb-4 text-glow">Tap the Stars</h2>
                <p className="font-body text-white/50">Look what you bring into my life</p>
            </div>

            <div className="relative w-full max-w-4xl h-[50vh] flex items-center justify-center border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-sm overflow-hidden mb-12 box-glow">
                {starsArray.map((star) => {
                    const isClicked = clickedStars.includes(star.id);

                    return (
                        <motion.div
                            key={star.id}
                            className="absolute cursor-pointer text-gold/60 hover:text-gold transition-colors"
                            style={{ top: star.top, left: star.left }}
                            animate={isClicked ? {
                                scale: [1, 1.6, 0],
                                opacity: [1, 1, 0],
                                rotate: [0, 90, 180]
                            } : {
                                y: [0, -10, 0],
                                opacity: [0.4, 1, 0.4],
                                scale: 1,
                                rotate: 0
                            }}
                            transition={isClicked ? {
                                duration: 0.6, ease: "easeOut"
                            } : {
                                duration: star.duration,
                                delay: star.delay,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            onClick={() => handleStarClick(star.id)}
                            whileHover={!isClicked ? { scale: 1.2 } : {}}
                            whileTap={!isClicked ? { scale: 0.8 } : {}}
                        >
                            <Star size={star.size} fill="currentColor" className={isClicked ? "drop-shadow-lg" : ""} />
                        </motion.div>
                    );
                })}

                <AnimatePresence mode="wait">
                    {activeMessage && taps <= compliments.length && (
                        <motion.div
                            key={activeMessage}
                            initial={{ opacity: 0, scale: 0.5, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20 }}
                            className="absolute z-20 pointer-events-none"
                        >
                            <div className="px-6 py-3 bg-black/80 border border-gold/30 rounded-full backdrop-blur-md box-glow">
                                <p className="font-heading text-xl md:text-2xl text-gold font-medium text-glow">
                                    {activeMessage}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {taps >= compliments.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="z-10 flex flex-col items-center"
                    >
                        <div className="px-8 py-4 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 border border-gold/50 rounded-2xl mb-8 box-glow">
                            <p className="font-body text-sm text-gold/70 uppercase tracking-widest mb-1">
                                Achievement unlocked
                            </p>
                            <p className="font-heading text-2xl md:text-3xl text-gold text-glow">
                                My Good Luck Charm
                            </p>
                        </div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <p className="font-body text-sm text-white/50 uppercase tracking-[0.2em]">
                                Continue
                            </p>
                            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto mt-2" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
