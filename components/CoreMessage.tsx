"use client";

import { motion } from "framer-motion";

export default function CoreMessage() {
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
                        className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-2xl overflow-hidden border border-gold/30 mb-8 box-glow z-20"
                    >
                        {/* Placeholder for center photo */}
                        <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center p-4">
                            <p className="font-body text-sm text-center text-white/40 mb-2">Her Best Photo</p>
                            <p className="font-heading text-gold text-2xl absolute bottom-6 text-glow">My Good Luck Charm ✨</p>
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
        </div>
    );
}
