const spriteCache = new Map<string, string>();

export function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function makeBodySprite(color: string): string {
  const key = `body-${color}`;
  const cached = spriteCache.get(key);
  if (cached) return cached;

  const c = document.createElement('canvas');
  const CHAR = 32;
  c.width = CHAR * 4;
  c.height = CHAR * 4;
  const g = c.getContext('2d');
  if (!g) return '';

  const darker = adjustColor(color, -30);
  const lighter = adjustColor(color, 20);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const ox = col * CHAR;
      const oy = row * CHAR;
      const frame = col % 2;

      g.fillStyle = 'rgba(0,0,0,0.15)';
      g.fillRect(ox + 12, oy + 28, 8, 2);

      g.fillStyle = color;
      g.fillRect(ox + 10, oy + 14, 12, 10);

      g.fillStyle = lighter;
      g.fillRect(ox + 10, oy + 14, 12, 2);

      g.fillStyle = darker;
      g.fillRect(ox + 10, oy + 22, 12, 2);

      g.fillStyle = '#f5d6ba';
      if (row === 0 || row === 2) {
        g.fillRect(ox + 6, oy + 16 + frame * 2, 4, 6);
        g.fillRect(ox + 22, oy + 16 + (1 - frame) * 2, 4, 6);
      } else {
        g.fillRect(ox + 8, oy + 16, 4, 6);
      }

      g.fillStyle = '#3d4a5c';
      const legOff = frame * 2;
      g.fillRect(ox + 10 + legOff, oy + 24, 5, 5);
      g.fillRect(ox + 17 - legOff, oy + 24, 5, 5);

      g.fillStyle = '#2a2a2a';
      g.fillRect(ox + 10 + legOff, oy + 28, 5, 2);
      g.fillRect(ox + 17 - legOff, oy + 28, 5, 2);
    }
  }

  const url = c.toDataURL();
  spriteCache.set(key, url);
  return url;
}

export function hexColorAlpha(hex: string, alpha: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  return `rgba(${r},${g},${b},${alpha})`;
}
