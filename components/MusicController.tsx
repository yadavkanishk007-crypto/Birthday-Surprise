"use client";

import { useEffect, useState } from "react";
import { Howl } from "howler";

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
            goodluckAudio.fade(goodluckAudio.volume(), 0.7, 2500);
            terebinAudio.fade(terebinAudio.volume(), 0, 2500);
        } else if (currentSection === "photo") {
            goodluckAudio.fade(goodluckAudio.volume(), 0, 2500);
            terebinAudio.fade(terebinAudio.volume(), 0.7, 2500);
        }
    }, [currentSection, goodluckAudio, terebinAudio]);

    useEffect(() => {
        if (!goodluckAudio || !terebinAudio) return;

        const handleVoicePlay = () => {
            // Lower whichever track is playing to 0.3
            const glVol = goodluckAudio.volume();
            const tbVol = terebinAudio.volume();
            if (glVol > 0.1) goodluckAudio.fade(glVol, 0.3, 1000);
            if (tbVol > 0.1) terebinAudio.fade(tbVol, 0.3, 1000);
        };

        const handleVoiceEnd = () => {
            // Restore based on section
            if (currentSection === "photo") {
                terebinAudio.fade(terebinAudio.volume(), 0.7, 1000);
            } else {
                goodluckAudio.fade(goodluckAudio.volume(), 0.7, 1000);
            }
        };

        window.addEventListener("playVoice", handleVoicePlay);
        window.addEventListener("endVoice", handleVoiceEnd);

        return () => {
            window.removeEventListener("playVoice", handleVoicePlay);
            window.removeEventListener("endVoice", handleVoiceEnd);
        };
    }, [goodluckAudio, terebinAudio, currentSection]);

    return null; // Hidden component
}
