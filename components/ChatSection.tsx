"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { CheckCheck } from "lucide-react";

// The timeline for each message appearance
const messagesData = [
    { id: 1, text: "Sohniye", typingDuration: 500 },
    { id: 2, text: "Tu lucky hai mere liye", typingDuration: 1000 },
    { id: 3, text: "Don’t argue", typingDuration: 1300 },
    { id: 4, text: "Fact hai", typingDuration: 1000 },
    { id: 5, text: "Good luck charm ho meri", typingDuration: 1200 },
    { id: 6, text: "Aaj officially birthday hai lucky charm ka 🙂", typingDuration: 1500 },
];

export default function ChatSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.4 });
    const [visibleMessages, setVisibleMessages] = useState<typeof messagesData>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [currentMsgIndex, setCurrentMsgIndex] = useState(0);

    useEffect(() => {
        if (!isInView || currentMsgIndex >= messagesData.length) {
            setIsTyping(false);
            return;
        }

        // Show typing indicator
        setIsTyping(true);

        const currentMsg = messagesData[currentMsgIndex];

        // Wait for the simulated typing duration
        const typingTimer = setTimeout(() => {
            setIsTyping(false);
            setVisibleMessages((prev) => [...prev, currentMsg]);

            // Short pause before starting typing the next message
            setTimeout(() => {
                setCurrentMsgIndex((prev) => prev + 1);
            }, 300);

        }, currentMsg.typingDuration);

        return () => clearTimeout(typingTimer);
    }, [isInView, currentMsgIndex]);

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-foreground py-24 px-4 overflow-hidden"
        >
            {/* Ambient Background glow */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-pinkGlow/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-md mx-auto z-10 flex flex-col h-[60vh] justify-end pb-12">
                <div className="flex flex-col space-y-4 w-full">
                    <AnimatePresence>
                        {visibleMessages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1, x: [0, -5, 5, -2, 2, 0] }}
                                transition={{
                                    opacity: { duration: 0.3 },
                                    y: { duration: 0.3 },
                                    scale: { duration: 0.3 },
                                    x: { duration: 0.4, ease: "easeInOut" } // Subtle vibration
                                }}
                                className={`flex flex-col max-w-[80%] rounded-2xl px-4 py-2 shadow-md ${index % 2 === 0
                                        ? "bg-[#1f1f1f] text-[#f5f5f5] self-start rounded-tl-sm border border-white/5" // Received style
                                        : "bg-gold text-black self-end rounded-tr-sm" // Sent style (Gold)
                                    }`}
                            >
                                <p className="font-body text-base md:text-lg">{msg.text}</p>
                                <div className={`flex items-center justify-end gap-1 mt-1 ${index % 2 === 0 ? "text-white/40" : "text-black/60"}`}>
                                    <span className="text-[10px]">Just now</span>
                                    {/* Double tick animation */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.3, type: "spring" }}
                                    >
                                        <CheckCheck size={14} className={index % 2 === 0 ? "text-blue-400" : "text-black/70"} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}

                        {isTyping && (
                            <motion.div
                                key="typing-indicator"
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                className="bg-[#1f1f1f] self-start rounded-2xl rounded-tl-sm border border-white/5 px-4 py-3 shadow-md w-16"
                            >
                                <div className="flex gap-1 items-center justify-center h-4">
                                    <motion.div
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                        className="w-1.5 h-1.5 bg-white/50 rounded-full"
                                    />
                                    <motion.div
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                        className="w-1.5 h-1.5 bg-white/50 rounded-full"
                                    />
                                    <motion.div
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                        className="w-1.5 h-1.5 bg-white/50 rounded-full"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={currentMsgIndex >= messagesData.length ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute bottom-10 flex justify-center w-full pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                >
                    <p className="font-body text-sm text-gold/50 uppercase tracking-[0.2em] text-glow">
                        Keep scrolling
                    </p>
                    <div className="w-px h-12 bg-gradient-to-b from-gold/30 to-transparent mt-2" />
                </motion.div>
            </motion.div>
        </div>
    );
}
