import type { GameState } from './types';

const MAX_DT = 100;

export function createGameLoop(
  update: (gs: GameState) => void,
  render: (gs: GameState) => void,
): { start: () => void; stop: () => void; resume: () => void } {
  let rafId = 0;
  let prevTime = 0;
  let frame = 0;
  let running = false;

  function tick(now: number) {
    if (!running) return;

    const rawDt = prevTime ? now - prevTime : 16;
    const dt = Math.min(rawDt, MAX_DT);
    prevTime = now;
    frame++;

    const gs: GameState = { time: now, dt, frame };

    try {
      update(gs);
      render(gs);
    } catch {
      // Swallow to keep the loop alive
    }

    rafId = requestAnimationFrame(tick);
  }

  return {
    start() {
      if (running) return;
      running = true;
      prevTime = 0;
      frame = 0;
      rafId = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    },
    resume() {
      if (!running) return;
      prevTime = 0;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    },
  };
}
