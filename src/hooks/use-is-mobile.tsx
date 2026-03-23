import { useEffect, useState } from "react";

const MOBILE_QUERY =
  "(max-width: 767px), (orientation: landscape) and (max-height: 500px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(
    () =>
      typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = () => {
      setIsMobile(mql.matches);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
