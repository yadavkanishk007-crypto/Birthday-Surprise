"use client";

import { useState } from "react";
import EntryGate from "@/components/EntryGate";
import WhySection from "@/components/WhySection";
import StarGame from "@/components/StarGame";
import ChatSection from "@/components/ChatSection";
import PhotoSection from "@/components/PhotoSection";
import CoreMessage from "@/components/CoreMessage";
import FinalSection from "@/components/FinalSection";
import MusicController from "@/components/MusicController";

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentSection, setCurrentSection] = useState("entry");

  // In a real app we'd use ScrollTrigger or IntersectionObserver to update currentSection
  // For simplicity here, we'll map components.

  return (
    <main className="bg-background min-h-screen text-foreground font-body overflow-x-hidden">
      {!hasEntered ? (
        <EntryGate onEnter={() => setHasEntered(true)} />
      ) : (
        <>
          <MusicController currentSection={currentSection} />

          <div onMouseEnter={() => setCurrentSection("why")}>
            <WhySection />
          </div>

          <div onMouseEnter={() => setCurrentSection("star")}>
            <StarGame />
          </div>

          <div onMouseEnter={() => setCurrentSection("chat")}>
            <ChatSection />
          </div>

          <div onMouseEnter={() => setCurrentSection("photo")}>
            <PhotoSection />
          </div>

          <div onMouseEnter={() => setCurrentSection("core")}>
            <CoreMessage />
          </div>

          <div onMouseEnter={() => setCurrentSection("final")}>
            <FinalSection />
          </div>
        </>
      )}
    </main>
  );
}
