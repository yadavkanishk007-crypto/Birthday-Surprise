"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const textBlocks = [
    {
        lines: [
            "Some people come and go.",
            "Some stay and change nothing.",
            "And some…",
            "just make life feel luckier."
        ]
    },
    {
        lines: [
            "Since you came,",
            "things just work better."
        ]
    },
    {
        lines: [
            "Coincidence? Maybe.",
            "But I’ll take this luck."
        ]
    }
];

export default function PhotoSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax transforms for photos
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);

    return (
        <div ref={containerRef} className="relative bg-[#050505] text-foreground min-h-[300vh] py-24">
            {/* Sticky Text Container */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center p-6 z-20 pointer-events-none">

                {/* We map over text blocks, fading them in based on scroll progress */}
                {textBlocks.map((block, i) => {
                    // Calculate when each block should appear and disappear
                    const start = i * 0.33;
                    const end = start + 0.33;
                    const mid = start + 0.165;

                    // Using any to avoid complex useTransform typings in this context
                    const opacity = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]) as any;
                    const y = useTransform(scrollYProgress, [start, mid, end], [50, 0, -50]) as any;

                    return (
                        <motion.div
                            key={i}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 px-4"
                            style={{ opacity, y }}
                        >
                            {block.lines.map((line, j) => (
                                <p
                                    key={j}
                                    className={`font-heading text-2xl md:text-4xl ${j === block.lines.length - 1 ? 'text-gold' : 'text-white/90'}`}
                                >
                                    {line}
                                </p>
                            ))}
                        </motion.div>
                    );
                })}
            </div>

            {/* Floating Parallax Photos */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none opacity-40">

                {/* Placeholder images - To be replaced by user */}
                <motion.div className="absolute top-[10%] left-[5%] w-48 h-64 md:w-64 md:h-80 rounded-lg overflow-hidden border border-white/10" style={{ y: y1 }}>
                    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center font-body text-xs text-white/30">Photo 1</div>
                </motion.div>

                <motion.div className="absolute top-[30%] right-[5%] w-56 h-72 md:w-72 md:h-96 rounded-lg overflow-hidden border border-white/10" style={{ y: y2 }}>
                    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center font-body text-xs text-white/30">Photo 2</div>
                </motion.div>

                <motion.div className="absolute top-[60%] left-[10%] w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/10" style={{ y: y3 }}>
                    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center font-body text-xs text-white/30">Photo 3</div>
                </motion.div>

                <motion.div className="absolute top-[80%] right-[15%] w-48 h-64 md:w-64 md:h-80 rounded-lg overflow-hidden border border-white/10" style={{ y: y1 }}>
                    <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center font-body text-xs text-white/30">Photo 4</div>
                </motion.div>

            </div>
        </div>
    );
}
