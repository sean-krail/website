import {
  FireworksBackground,
  type FireworksBackgroundHandle,
} from "@/organisms/fireworks";
import { ThemeProvider } from "@/theme-provider";
import { DigitalBusinessCard } from "@/organisms/digital-business-card";
import { useRef, useState } from "react";
import { ThemeToggleGroup } from "@/organisms/theme-toggle-group";

function App() {
  const [liked, setLiked] = useState(false);
  const fireworksRef = useRef<FireworksBackgroundHandle>(null);

  return (
    <>
      <div className="relative h-screen w-screen">
        <FireworksBackground
          ref={fireworksRef}
          className={"absolute inset-0 h-full w-full"}
          population={0.2}
          active={liked}
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <ThemeToggleGroup className="fixed top-5 right-5" />
            <DigitalBusinessCard
              onLike={() => setLiked(true)}
              onHoverLike={() => fireworksRef.current?.launchOne()}
            />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export { App };
