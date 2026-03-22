import {
  FireworksBackground,
  type FireworksBackgroundHandle,
} from "@/organisms/fireworks";
import { DigitalBusinessCard } from "@/organisms/digital-business-card";
import { useRef, useState } from "react";
import { ThemeToggleGroup } from "@/organisms/theme-toggle-group";

function App() {
  const [liked, setLiked] = useState(false);
  const fireworksRef = useRef<FireworksBackgroundHandle>(null);

  return (
    <>
      <ThemeToggleGroup className="z-2 fixed top-5 right-5" />
      <div className="relative h-screen w-screen">
        <FireworksBackground
          ref={fireworksRef}
          className={"z-0 absolute inset-0 h-full w-full"}
          population={0.2}
          active={liked}
        />
        <div className="z-1 absolute inset-0 flex items-center justify-center">
          <DigitalBusinessCard
            onLike={() => setLiked(true)}
            onHoverLike={() => fireworksRef.current?.launchOne()}
          />
        </div>
      </div>
    </>
  );
}

export { App };
