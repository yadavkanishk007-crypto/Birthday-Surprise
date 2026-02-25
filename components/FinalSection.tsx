"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { MessageCircle, Play, Pause } from "lucide-react";
import { Howl } from "howler";

export default function FinalSection() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isPlayingVoice, setIsPlayingVoice] = useState(false);
    const [voiceAudio, setVoiceAudio] = useState<Howl | null>(null);
    const [reachedFinal, setReachedFinal] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });

        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);

        // Prep Voice Note
        const voice = new Howl({
            src: ["/audio/voicenote.mp3", "/audio/voicenote.mp4"],
            html5: true,
            volume: 1,
            onend: () => setIsPlayingVoice(false)
        });
        setVoiceAudio(voice);

        return () => {
            window.removeEventListener("resize", handleResize);
            voice.unload();
        };
    }, []);

    const handleVoiceToggle = () => {
        if (!voiceAudio) return;

        if (isPlayingVoice) {
            voiceAudio.pause();
            setIsPlayingVoice(false);
        } else {
            voiceAudio.play();
            setIsPlayingVoice(true);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 1.5 } },
    };

    return (
        <div className="relative flex flex-col items-center min-h-screen pt-32 pb-24 text-foreground px-6 overflow-hidden bg-transparent">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pinkGlow/5 rounded-full blur-[120px] pointer-events-none" />

            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    colors={["#d4af37", "#f5f5f5", "#ff4d6d"]}
                    recycle={false}
                    numberOfPieces={300}
                    gravity={0.05} // Slower fall rate to linger
                    style={{ position: "absolute", zIndex: 10 }}
                />
            )}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                onViewportEnter={() => {
                    setReachedFinal(true);
                    setTimeout(() => setShowConfetti(true), 8000);
                    setTimeout(() => setShowButton(true), 11000);
                }}
                className="z-20 flex flex-col items-center text-center max-w-2xl"
            >
                <motion.div variants={itemVariants} className="space-y-6 mb-16">
                    <p className="font-body text-xl md:text-2xl leading-relaxed">
                        I won’t say much here.
                    </p>
                    <p className="font-body text-xl md:text-2xl leading-relaxed text-white/70">
                        Because some things<br />are better said in real conversations.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-6 mb-16">
                    <p className="font-body text-xl md:text-2xl leading-relaxed">
                        Just know this —
                    </p>
                    <p className="font-body text-xl md:text-2xl leading-relaxed text-gold text-glow">
                        meeting you<br />was really good timing in my life.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-24">
                    <p className="font-body text-xl md:text-2xl leading-relaxed text-white/90">
                        And I’m genuinely grateful for that.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-32">
                    <h2 className="font-heading text-4xl md:text-6xl text-gold mb-2 text-glow">
                        Happy Birthday, Sohniye ✨
                    </h2>
                    <p className="font-heading text-2xl text-white/50 mt-4">— K</p>
                </motion.div>

                {/* Delayed Button */}
                <AnimatePresence>
                    {showButton && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2 }}
                        >
                            <a
                                href="https://wa.me/?text=I%20honestly%20did%20smile%20%E2%9C%A8"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 px-8 py-4 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-black hover:scale-105 hover:shadow-[0_0_30px_#d4af37] transition-all duration-500 font-body text-lg group"
                            >
                                <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                                Tell me honestly… did you smile?
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Floating Voice Note Button */}
            <AnimatePresence>
                {reachedFinal && (
                    <motion.button
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
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
                                        transition={{ duration: 7, ease: "linear" }}
                                        className="absolute top-0 left-0 h-full bg-gold rounded-full"
                                    />
                                )}
                            </div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
