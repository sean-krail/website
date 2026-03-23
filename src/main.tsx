import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UAParser } from "ua-parser-js";
import { isBot } from "ua-parser-js/bot-detection";
import { Bots } from "ua-parser-js/extensions";
import { ThemeProvider } from "~/components/theme-provider";
import { App } from "~/App.tsx";
import "~/index.css";

(() => {
  // See: https://github.com/faisalman/ua-parser-js/commit/bbcf24e
  const url = isBot(UAParser(navigator.userAgent, Bots).ua)
    ? import.meta.env.VITE_BOTS_COUNT_ENDPOINT
    : import.meta.env.VITE_USERS_COUNT_ENDPOINT;
  if (!url || !(url.length > 0)) {
    return;
  }
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      navigator.sendBeacon(url);
    }
  });
})();

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("No #root element defined");
}
createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
