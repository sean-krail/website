import React, { ComponentProps, useImperativeHandle } from "react";
import { cn } from "~/lib/utils";
import { useFireworksCanvas } from "~/hooks/use-fireworks-canvas";

interface FireworksBackgroundOverlayHandle {
  launchOne: () => void;
}

type FireworksBackgroundOverlayProps = Omit<
  ComponentProps<"div">,
  "color" | "ref"
> & {
  ref?: React.Ref<FireworksBackgroundOverlayHandle>;
  canvasProps?: ComponentProps<"canvas">;
  active?: boolean;
  population?: number;
  fireworkSpeed?: { min: number; max: number } | number;
  fireworkSize?: { min: number; max: number } | number;
  particleSpeed?: { min: number; max: number } | number;
  particleSize?: { min: number; max: number } | number;
};

function FireworksBackgroundOverlay({
  ref,
  className,
  canvasProps,
  active = true,
  population = 1,
  fireworkSpeed = { min: 4, max: 8 },
  fireworkSize = { min: 2, max: 5 },
  particleSpeed = { min: 2, max: 7 },
  particleSize = { min: 1, max: 5 },
  ...props
}: FireworksBackgroundOverlayProps) {
  const { canvasRef, containerRef, launchOneRef } = useFireworksCanvas({
    active,
    population,
    fireworkSpeed,
    fireworkSize,
    particleSpeed,
    particleSize,
  });

  useImperativeHandle(ref, () => ({
    launchOne: () => launchOneRef.current?.(),
  }));

  return (
    <div
      ref={containerRef}
      data-slot="fireworks-background"
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className,
      )}
      {...props}
    >
      <canvas
        {...canvasProps}
        ref={canvasRef}
        className={cn("absolute inset-0 size-full", canvasProps?.className)}
      />
    </div>
  );
}

export {
  FireworksBackgroundOverlay,
  type FireworksBackgroundOverlayHandle,
  type FireworksBackgroundOverlayProps,
};
