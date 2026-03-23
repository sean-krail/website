import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { MonitorIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { ToggleGroup, ToggleGroupItem } from "@/molecules/toggle-group";
import { useTheme } from "@/theme-provider";

const ThemeToggleGroup = ({
  className,
  ...props
}: ToggleGroupPrimitive.Props) => {
  const { theme, setTheme } = useTheme();
  return (
    <ToggleGroup
      className={className}
      variant="outline"
      size="lg"
      defaultValue={[theme]}
      {...props}
    >
      <ToggleGroupItem
        value="system"
        aria-label="Toggle system default theme"
        onPressedChange={(pressed) => (pressed ? setTheme("system") : null)}
      >
        <MonitorIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="dark"
        aria-label="Toggle dark theme"
        onPressedChange={(pressed) => (pressed ? setTheme("dark") : null)}
      >
        <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="light"
        aria-label="Toggle light theme"
        onPressedChange={(pressed) => (pressed ? setTheme("light") : null)}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export { ThemeToggleGroup };
