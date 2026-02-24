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
        show: { opacity: 1, y: 0, transition: { duration: 1 } },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground py-24 px-6 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="z-10 flex flex-col items-center text-center max-w-2xl"
            >
                <motion.div variants={itemVariants} className="space-y-4 mb-16">
                    <p className="font-body text-xl md:text-2xl leading-relaxed">
                        Everyone has something lucky.
                    </p>
                    <p className="font-body text-xl md:text-2xl text-white/70">A number.</p>
                    <p className="font-body text-xl md:text-2xl text-white/70">A day.</p>
                    <p className="font-body text-xl md:text-2xl text-white/70">A place.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-20">
                    <p className="font-heading text-3xl md:text-5xl leading-relaxed text-gold">
                        Mine turned out to be a person.
                    </p>
                </motion.div>

                {/* Center Photo - Her Best Photo */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        show: { opacity: 1, scale: 1, transition: { duration: 1.5, delay: 2 } }
                    }}
                    className="relative w-64 h-80 md:w-80 md:h-[400px] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.2)] border border-gold/30 mb-8"
                >
                    {/* Placeholder for center photo */}
                    <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center p-4">
                        <p className="font-body text-sm text-center text-white/40 mb-2">Her Best Photo</p>
                        <p className="font-heading text-gold text-2xl absolute bottom-6">My Good Luck Charm ✨</p>
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-12"
                >
                    <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent mx-auto" />
                </motion.div>
            </motion.div>
        </div>
    );
}
