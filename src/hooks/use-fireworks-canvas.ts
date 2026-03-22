import { useEffect, useMemo, useRef } from "react";
import { useThemeVariables } from "~/hooks/use-theme-variables";

const rand = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

const randInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min);

const randColor = (): string => `hsl(${randInt(0, 360)}, 100%, 50%)`;

function getValueByRange(range: { min: number; max: number } | number): number {
  if (typeof range === "number") return range;
  return rand(range.min, range.max);
}

function getColor(color: string | string[] | undefined): string {
  if (Array.isArray(color)) {
    return color[randInt(0, color.length)] ?? randColor();
  }
  return color ?? randColor();
}

interface ParticleType {
  x: number;
  y: number;
  color: string;
  speed: number;
  direction: number;
  vx: number;
  vy: number;
  gravity: number;
  friction: number;
  alpha: number;
  decay: number;
  size: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  isAlive: () => boolean;
}

function createParticle(
  x: number,
  y: number,
  color: string,
  speed: number,
  direction: number,
  gravity: number,
  friction: number,
  size: number,
): ParticleType {
  const vx = Math.cos(direction) * speed;
  const vy = Math.sin(direction) * speed;
  const alpha = 1;
  const decay = rand(0.005, 0.02);

  return {
    x,
    y,
    color,
    speed,
    direction,
    vx,
    vy,
    gravity,
    friction,
    alpha,
    decay,
    size,
    update() {
      this.vx *= this.friction;
      this.vy *= this.friction;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    },
    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    },
    isAlive() {
      return this.alpha > 0;
    },
  };
}

interface FireworkType {
  x: number;
  y: number;
  targetY: number;
  color: string;
  speed: number;
  size: number;
  angle: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
  trailLength: number;
  exploded: boolean;
  update: () => boolean;
  explode: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

function createFirework(
  x: number,
  y: number,
  targetY: number,
  color: string,
  speed: number,
  size: number,
  particleSpeed: { min: number; max: number } | number,
  particleSize: { min: number; max: number } | number,
  onExplode: (particles: ParticleType[]) => void,
): FireworkType {
  const angle = -Math.PI / 2 + rand(-0.3, 0.3);
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  const trail: { x: number; y: number }[] = [];
  const trailLength = randInt(10, 25);

  return {
    x,
    y,
    targetY,
    color,
    speed,
    size,
    angle,
    vx,
    vy,
    trail,
    trailLength,
    exploded: false,
    update() {
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLength) {
        this.trail.shift();
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.02;
      if (this.vy >= 0 || this.y <= this.targetY) {
        this.explode();
        return false;
      }
      return true;
    },
    explode() {
      const numParticles = randInt(50, 150);
      const particles: ParticleType[] = [];
      for (let i = 0; i < numParticles; i++) {
        const particleAngle = rand(0, Math.PI * 2);
        particles.push(
          createParticle(
            this.x,
            this.y,
            this.color,
            getValueByRange(particleSpeed),
            particleAngle,
            0.05,
            0.98,
            getValueByRange(particleSize),
          ),
        );
      }
      onExplode(particles);
    },
    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.beginPath();
      if (this.trail.length > 1) {
        ctx.moveTo(this.trail[0]?.x ?? this.x, this.trail[0]?.y ?? this.y);
        for (const point of this.trail) {
          ctx.lineTo(point.x, point.y);
        }
      } else {
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y);
      }
      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.size;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.restore();
    },
  };
}

interface UseFireworksCanvasOptions {
  active: boolean;
  population: number;
  fireworkSpeed: { min: number; max: number } | number;
  fireworkSize: { min: number; max: number } | number;
  particleSpeed: { min: number; max: number } | number;
  particleSize: { min: number; max: number } | number;
}

function useFireworksCanvas({
  active,
  population,
  fireworkSpeed,
  fireworkSize,
  particleSpeed,
  particleSize,
}: UseFireworksCanvasOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const launchOneRef = useRef<(() => void) | null>(null);

  const themeVariables = useThemeVariables();
  const color = useMemo(
    () => [
      themeVariables.chart1,
      themeVariables.chart2,
      themeVariables.chart3,
      themeVariables.chart4,
      themeVariables.chart5,
    ],
    [
      themeVariables.chart1,
      themeVariables.chart2,
      themeVariables.chart3,
      themeVariables.chart4,
      themeVariables.chart5,
    ],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let maxX = window.innerWidth;
    let ratio = container.offsetHeight / container.offsetWidth;
    let maxY = maxX * ratio;
    canvas.width = maxX;
    canvas.height = maxY;

    const setCanvasSize = () => {
      maxX = window.innerWidth;
      ratio = container.offsetHeight / container.offsetWidth;
      maxY = maxX * ratio;
      canvas.width = maxX;
      canvas.height = maxY;
    };
    window.addEventListener("resize", setCanvasSize);

    const explosions: ParticleType[] = [];
    const fireworks: FireworkType[] = [];

    const handleExplosion = (particles: ParticleType[]) => {
      explosions.push(...particles);
    };

    const spawnFirework = (x: number, targetY: number) => {
      fireworks.push(
        createFirework(
          x,
          maxY,
          targetY,
          getColor(color),
          getValueByRange(fireworkSpeed),
          getValueByRange(fireworkSize),
          particleSpeed,
          particleSize,
          handleExplosion,
        ),
      );
    };

    let launchTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const launchFirework = () => {
      if (document.hidden) return;
      spawnFirework(rand(maxX * 0.1, maxX * 0.9), rand(maxY * 0.1, maxY * 0.4));
      launchTimeoutId = setTimeout(launchFirework, rand(300, 800) / population);
    };

    launchOneRef.current = () => {
      spawnFirework(rand(maxX * 0.1, maxX * 0.9), rand(maxY * 0.1, maxY * 0.4));
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && active) {
        launchFirework();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (active) {
      launchFirework();
    }

    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, maxX, maxY);

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];
        if (!firework?.update()) {
          fireworks.splice(i, 1);
        } else {
          firework.draw(ctx);
        }
      }

      for (let i = explosions.length - 1; i >= 0; i--) {
        const particle = explosions[i];
        particle?.update();
        if (particle?.isAlive()) {
          particle.draw(ctx);
        } else {
          explosions.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleClick = (event: MouseEvent) => {
      spawnFirework(event.clientX, event.clientY);
    };
    container.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      container.removeEventListener("click", handleClick);
      if (launchTimeoutId !== null) clearTimeout(launchTimeoutId);
      cancelAnimationFrame(animationFrameId);
      launchOneRef.current = null;
    };
  }, [
    active,
    population,
    color,
    fireworkSpeed,
    fireworkSize,
    particleSpeed,
    particleSize,
  ]);

  return { canvasRef, containerRef, launchOneRef };
}

export { useFireworksCanvas, type UseFireworksCanvasOptions };
