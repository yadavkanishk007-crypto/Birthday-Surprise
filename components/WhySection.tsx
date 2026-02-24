"use client";

import { motion } from "framer-motion";

export default function WhySection() {
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
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-6 py-20 overflow-hidden">
            {/* Soft Pink Glow background decoration */}
            <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-pinkGlow/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="z-10 flex flex-col items-center text-center space-y-12 max-w-2xl"
            >
                <motion.p variants={itemVariants} className="font-body text-xl md:text-2xl leading-relaxed">
                    I could have sent a normal birthday text.
                </motion.p>

                <motion.p variants={itemVariants} className="font-body text-xl md:text-2xl leading-relaxed">
                    But you’re not a normal person in my life.
                </motion.p>

                <motion.div variants={itemVariants} className="space-y-2">
                    <p className="font-body text-xl md:text-2xl leading-relaxed">
                        So I made something…
                    </p>
                    <p className="font-body text-xl md:text-2xl leading-relaxed text-gold">
                        that exists only for you.
                    </p>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        show: { opacity: 1, scale: 1, transition: { duration: 2, delay: 6 } },
                    }}
                    className="mt-16 pt-16"
                >
                    <h2 className="font-heading text-4xl md:text-6xl text-gold mb-12">
                        Happy Birthday ✨
                    </h2>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <p className="font-body text-sm text-white/50 uppercase tracking-[0.3em]">
                            Scroll down to Start
                        </p>
                        <div className="w-px h-16 bg-gradient-to-b from-gold/50 to-transparent mx-auto mt-4" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
