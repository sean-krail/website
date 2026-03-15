import { FireworksBackground } from "@/organisms/fireworks";
import { ThemeProvider } from "@/theme-provider";
import { DigitalBusinessCard } from "@/organisms/digital-business-card";

function App() {
  return (
    <>
      <div className="relative h-screen w-screen">
        <FireworksBackground
          className={"absolute inset-0 h-full w-full"}
          population={0.2}
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <DigitalBusinessCard />
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export { App };
