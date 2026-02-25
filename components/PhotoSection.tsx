"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

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

function TextBlock({ block, scrollYProgress, index }: { block: { lines: string[] }, scrollYProgress: MotionValue<number>, index: number }) {
    const start = index * 0.33;
    const end = start + 0.33;
    const mid = start + 0.165;

    const opacity = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]);
    const y = useTransform(scrollYProgress, [start, mid, end], [50, 0, -50]);

    return (
        <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-6 px-4"
            style={{ opacity, y }}
        >
            {block.lines.map((line, j) => (
                <p
                    key={j}
                    className={`font-heading text-2xl md:text-3xl lg:text-5xl ${j === block.lines.length - 1 ? 'text-gold text-glow' : 'text-white/90'} tracking-wide`}
                >
                    {line}
                </p>
            ))}
        </motion.div>
    );
}

interface CinematicPhotoProps {
    yParallax: MotionValue<number>;
    top: string;
    left?: string;
    right?: string;
    w: string;
    h: string;
    rounded: string;
    text: string;
}

const CinematicPhoto = ({ yParallax, top, left, right, w, h, rounded, text }: CinematicPhotoProps) => {
    return (
        <motion.div
            className={`absolute ${top} ${left ? left : ""} ${right ? right : ""} ${w} ${h} ${rounded} overflow-hidden border border-white/10 shadow-2xl`}
            style={{ y: yParallax }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 1, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1.12, filter: "blur(0px)" }}
                transition={{
                    opacity: { duration: 1.5, ease: "easeOut" },
                    y: { duration: 1.5, ease: "easeOut" },
                    filter: { duration: 1.5, ease: "easeOut" },
                    scale: { duration: 6, ease: "linear" } // Ken Burns continuous slow zoom
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="w-full h-full bg-[#1a1a1a] flex items-center justify-center font-body text-xs text-white/30 film-grain"
            >
                {text}
            </motion.div>
        </motion.div>
    );
};

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
        <div ref={containerRef} className="relative bg-transparent text-foreground min-h-[300vh] py-24 film-grain">
            {/* Sticky Text Container */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center p-6 z-20 pointer-events-none">
                {textBlocks.map((block, i) => (
                    <TextBlock key={i} block={block} scrollYProgress={scrollYProgress} index={i} />
                ))}
            </div>

            {/* Floating Cinematic Parallax Photos */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <CinematicPhoto yParallax={y1} top="top-[10%]" left="left-[5%]" w="w-48 md:w-64" h="h-64 md:h-80" rounded="rounded-lg" text="Photo 1" />
                <CinematicPhoto yParallax={y2} top="top-[30%]" right="right-[5%]" w="w-56 md:w-72" h="h-72 md:h-96" rounded="rounded-lg" text="Photo 2" />
                <CinematicPhoto yParallax={y3} top="top-[60%]" left="left-[10%]" w="w-64 md:w-80" h="h-64 md:h-80" rounded="rounded-full" text="Photo 3" />
                <CinematicPhoto yParallax={y1} top="top-[80%]" right="right-[15%]" w="w-48 md:w-64" h="h-64 md:h-80" rounded="rounded-lg" text="Photo 4" />
            </div>
        </div>
    );
}
