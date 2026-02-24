"use client";

import { motion } from "framer-motion";

const messages = [
    "Sohniye",
    "Tu lucky hai mere liye",
    "Don’t argue",
    "Fact hai",
    "Good luck charm ho meri",
    "Aaj officially birthday hai lucky charm ka 🙂",
];

export default function ChatSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 1.5,
            },
        },
    };

    const bubbleVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] text-foreground py-24 px-4 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />

            <div className="w-full max-w-md mx-auto z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    className="flex flex-col space-y-4"
                >
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            variants={bubbleVariants}
                            className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-md ${index % 2 === 0
                                    ? "bg-[#1f1f1f] text-[#f5f5f5] self-start rounded-tl-sm border border-white/5" // Received style
                                    : "bg-gold text-black self-end rounded-tr-sm" // Sent style (Gold)
                                }`}
                        >
                            <p className="font-body text-base md:text-lg">{msg}</p>
                            <p className={`text-[10px] mt-1 text-right ${index % 2 === 0 ? "text-white/40" : "text-black/60"}`}>
                                Just now
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 10, duration: 2 }}
                    viewport={{ once: true }}
                    className="mt-20 flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center"
                    >
                        <p className="font-body text-sm text-gold/50 uppercase tracking-[0.2em]">
                            Keep scrolling
                        </p>
                        <div className="w-px h-12 bg-gradient-to-b from-gold/30 to-transparent mt-2" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
