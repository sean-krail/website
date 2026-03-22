"use client";
import React, { ComponentProps, useImperativeHandle } from "react";
import { cn } from "~/lib/utils";
import { useFireworksCanvas } from "~/hooks/use-fireworks-canvas";

interface FireworksBackgroundHandle {
  launchOne: () => void;
}

type FireworksBackgroundProps = Omit<ComponentProps<"div">, "color" | "ref"> & {
  ref?: React.Ref<FireworksBackgroundHandle>;
  canvasProps?: ComponentProps<"canvas">;
  active?: boolean;
  population?: number;
  fireworkSpeed?: { min: number; max: number } | number;
  fireworkSize?: { min: number; max: number } | number;
  particleSpeed?: { min: number; max: number } | number;
  particleSize?: { min: number; max: number } | number;
};

function FireworksBackground({
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
}: FireworksBackgroundProps) {
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
      className={cn("relative size-full overflow-hidden", className)}
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
  FireworksBackground,
  type FireworksBackgroundHandle,
  type FireworksBackgroundProps,
};
