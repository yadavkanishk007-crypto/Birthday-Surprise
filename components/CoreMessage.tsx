"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { Howl } from "howler";

export default function CoreMessage() {
    const [isPlayingVoice, setIsPlayingVoice] = useState(false);
    const [voiceAudio, setVoiceAudio] = useState<Howl | null>(null);
    const [voiceFinished, setVoiceFinished] = useState(false);

    useEffect(() => {
        const voice = new Howl({
            src: ["/audio/voicenote.mp3", "/audio/voicenote.mp4"],
            html5: true,
            volume: 1,
            onend: () => {
                setIsPlayingVoice(false);
                setVoiceFinished(true);
                window.dispatchEvent(new Event("endVoice"));
            }
        });
        setVoiceAudio(voice);

        return () => {
            voice.unload();
        };
    }, []);

    const handleVoiceToggle = () => {
        if (!voiceAudio) return;

        if (isPlayingVoice) {
            voiceAudio.pause();
            setIsPlayingVoice(false);
            window.dispatchEvent(new Event("endVoice"));
        } else {
            voiceAudio.play();
            setIsPlayingVoice(true);
            window.dispatchEvent(new Event("playVoice"));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 1.5,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 1.5 } },
    };

    return (
        <div className="relative min-h-[250vh] bg-transparent">
            {/* The sticky container creates a forced 3-second physical "pause" where the user just has to scroll empty space while the message sits on screen */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center text-foreground py-10 md:py-24 px-6">

                {/* Subtle slow breathing glow */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-gold/5 rounded-full blur-[120px] pointer-events-none"
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="z-10 flex flex-col items-center text-center max-w-2xl"
                >
                    <motion.div variants={itemVariants} className="space-y-4 md:space-y-6 mb-8 md:mb-16">
                        <p className="font-body text-xl md:text-2xl leading-relaxed">
                            Everyone has something lucky.
                        </p>
                        <p className="font-body text-xl md:text-2xl text-white/70 italic tracking-wide">A number.</p>
                        <p className="font-body text-xl md:text-2xl text-white/70 italic tracking-wide">A day.</p>
                        <p className="font-body text-xl md:text-2xl text-white/70 italic tracking-wide">A place.</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mb-10 md:mb-20">
                        <p className="font-heading text-3xl md:text-5xl leading-relaxed text-gold text-glow">
                            Mine turned out to be a person.
                        </p>
                    </motion.div>

                    {/* Center Photo - Her Best Photo */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
                            show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 2, delay: 2.5 } }
                        }}
                        className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-2xl overflow-hidden border border-gold/30 mb-8 box-glow z-20 group"
                    >
                        {/* The actual photo */}
                        <img
                            src="https://picsum.photos/seed/bestphoto/600/800"
                            alt="Her Best Photo"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                            <p className="font-heading text-gold text-2xl mb-2 text-glow">My Good Luck Charm ✨</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Slow ambient floating particles mimicking dust in light */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Voice Note Button */}
            <motion.button
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: 2, duration: 1 }}
                onClick={handleVoiceToggle}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-black/80 backdrop-blur-md border border-gold/30 rounded-full shadow-lg shadow-gold/5 group hover:border-gold transition-colors"
            >
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                    {isPlayingVoice ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </div>
                <div className="flex flex-col items-start pr-2">
                    <span className="font-body text-xs text-gold uppercase tracking-wider">Play this</span>
                    <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden relative">
                        {isPlayingVoice && (
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "linear" }}
                                className="absolute top-0 left-0 h-full bg-gold rounded-full"
                            />
                        )}
                    </div>
                </div>
            </motion.button>

            {/* Tiny Emoji Fade-in */}
            <AnimatePresence>
                {voiceFinished && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="fixed bottom-24 right-10 z-50 text-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    >
                        🙂
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
