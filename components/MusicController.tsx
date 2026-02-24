"use client";

import { useEffect, useState } from "react";
import { Howl, Howler } from "howler";

interface MusicControllerProps {
    currentSection: string; // "entry", "why", "star", "chat", "photo", "core", "final"
}

export default function MusicController({ currentSection }: MusicControllerProps) {
    const [goodluckAudio, setGoodluckAudio] = useState<Howl | null>(null);
    const [terebinAudio, setTerebinAudio] = useState<Howl | null>(null);

    useEffect(() => {
        // Initialize audio files
        const goodluck = new Howl({
            src: ["/audio/goodluck.mp3"],
            loop: true,
            volume: 0,
            html5: true, // Force HTML5 Audio to allow playing before full load and save memory
        });

        const terebin = new Howl({
            src: ["/audio/terebin.mp3"],
            loop: true,
            volume: 0,
            html5: true,
        });

        setGoodluckAudio(goodluck);
        setTerebinAudio(terebin);

        // Initial play but muted (waiting for user interaction to unleash)
        goodluck.play();
        terebin.play();

        return () => {
            goodluck.unload();
            terebin.unload();
        };
    }, []);

    useEffect(() => {
        if (!goodluckAudio || !terebinAudio) return;

        // Crossfade Logic based on currentSection
        if (["entry", "why", "star", "chat", "core", "final"].includes(currentSection)) {
            goodluckAudio.fade(goodluckAudio.volume(), 1, 2000);
            terebinAudio.fade(terebinAudio.volume(), 0, 2000);
        } else if (currentSection === "photo") {
            goodluckAudio.fade(goodluckAudio.volume(), 0, 2000);
            terebinAudio.fade(terebinAudio.volume(), 1, 2000);
        }
    }, [currentSection, goodluckAudio, terebinAudio]);

    return null; // Hidden component
}
