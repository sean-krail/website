import { useTheme } from "@/theme-provider";
import { useState, useEffect } from "react";

interface ThemeVariables {
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
}

const getThemeVariable = (variable: string) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--${variable}`)
    .trim();

export const getThemeVariables = () => ({
  chart1: getThemeVariable("chart-1"),
  chart2: getThemeVariable("chart-2"),
  chart3: getThemeVariable("chart-3"),
  chart4: getThemeVariable("chart-4"),
  chart5: getThemeVariable("chart-5"),
});

export const useThemeVariables = (): ThemeVariables => {
  const [themeVariables, setThemeVariables] =
    useState<ThemeVariables>(getThemeVariables());
  const { theme } = useTheme();
  useEffect(() => setThemeVariables(getThemeVariables()), [theme]);
  return themeVariables;
};
