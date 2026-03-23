import {
  FireworksBackgroundOverlay,
  type FireworksBackgroundOverlayHandle,
} from "@/organisms/fireworks";
import { DigitalBusinessCard } from "@/organisms/digital-business-card";
import { useRef, useState } from "react";
import { ThemeToggleGroup } from "@/organisms/theme-toggle-group";
import { useIsMobile } from "~/hooks/use-is-mobile";
import { cn } from "./lib/utils";

function App() {
  const [liked, setLiked] = useState(false);
  const fireworksRef = useRef<FireworksBackgroundOverlayHandle>(null);
  const isMobile = useIsMobile();

  return (
    <>
      <ThemeToggleGroup
        className={cn("z-20 fixed right-5", isMobile ? "bottom-5" : "top-5")}
      />
      <div className="size-full">
        <FireworksBackgroundOverlay
          ref={fireworksRef}
          className="z-0"
          population={0.2}
          active={liked}
        />
        <div className="absolute inset-0 z-10 overflow-y-auto touch-pan-y overscroll-y-contain flex flex-col">
          <div className="m-auto py-8">
            <DigitalBusinessCard
              onLike={() => setLiked(true)}
              onHoverLike={() => fireworksRef.current?.launchOne()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export { App };
