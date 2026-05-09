import {
  TILE_SIZE, ROOM_COLS, ROOM_ROWS, ROOM_MAP, TileType,
  WORKSTATIONS, OFFICE_ZONE_COL, COMMON_AREAS, LAYOUT,
  getTimeOfDay, SKY_COLORS,
} from './roomData';
import { hexColorAlpha } from './spriteFactory';
import type { AgentEntity } from './types';

const OFFICE_FLOOR = '#1a1e28';
const LOUNGE_FLOOR = '#1e1828';
const OFFICE_GRID_LINE = 'rgba(0,200,255,0.04)';
const LOUNGE_GRID_LINE = 'rgba(180,100,255,0.06)';
const WALL_COLOR = '#141822';
const WALL_LOUNGE = '#1a1625';
const WALL_ACCENT_CYAN = 'rgba(0,200,255,0.03)';
const WALL_ACCENT_PURPLE = 'rgba(180,100,255,0.05)';
const BASEBOARD_BG = '#0a0e16';
const BASEBOARD_CYAN = 'rgba(0,200,255,0.25)';
const BASEBOARD_PURPLE = 'rgba(180,100,255,0.35)';
const DESK_COLOR = '#3a4558';
const DESK_TOP_GLOW = 'rgba(0,200,255,0.3)';
const DESK_LEG = '#2e3848';
const MONITOR_FRAME = '#3a3a3a';
const MONITOR_SCREEN = '#0e2838';
const CHAIR_BODY = '#303a48';
const CHAIR_BASE = '#283040';
const MEETING_COLOR = '#2e3848';
const MEETING_TOP = '#354050';
const MEETING_GLOW = 'rgba(0,200,255,0.15)';

export function renderRoom(
  ctx: CanvasRenderingContext2D,
  agents: AgentEntity[],
  hour: number,
  time: number,
): void {
  const W = ROOM_COLS * TILE_SIZE;
  const H = ROOM_ROWS * TILE_SIZE;

  ctx.fillStyle = '#060a14';
  ctx.fillRect(0, 0, W, H);

  drawFloor(ctx);
  drawWalls(ctx);
  drawBaseboard(ctx);
  drawZoneDivider(ctx, H);
  drawDesks(ctx, agents, time);
  drawWhiteboard(ctx);
  drawWindow(ctx, hour, time);
  drawClock(ctx, hour);
  drawMeetingTable(ctx);
  drawLoungeArea(ctx);
  drawPlants(ctx, time);
  drawCeilingLights(ctx, time);
  drawVignette(ctx, W, H, hour);
}

function drawFloor(ctx: CanvasRenderingContext2D): void {
  const ozPx = OFFICE_ZONE_COL * TILE_SIZE;

  for (let row = 0; row < ROOM_ROWS; row++) {
    for (let col = 0; col < ROOM_COLS; col++) {
      const tile = ROOM_MAP[row][col];
      if (tile === TileType.WALL || tile === TileType.BASEBOARD) continue;
      const x = col * TILE_SIZE;
      const y = row * TILE_SIZE;
      const isLounge = tile === TileType.LOUNGE_FLOOR || col >= OFFICE_ZONE_COL;
      ctx.fillStyle = isLounge ? LOUNGE_FLOOR : OFFICE_FLOOR;
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }

  ctx.lineWidth = 0.5;
  for (let row = 4; row <= ROOM_ROWS; row++) {
    const y = row * TILE_SIZE;
    ctx.strokeStyle = OFFICE_GRID_LINE;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ozPx, y);
    ctx.stroke();
    ctx.strokeStyle = LOUNGE_GRID_LINE;
    ctx.beginPath();
    ctx.moveTo(ozPx, y);
    ctx.lineTo(ROOM_COLS * TILE_SIZE, y);
    ctx.stroke();
  }
  for (let col = 0; col <= ROOM_COLS; col++) {
    const x = col * TILE_SIZE;
    ctx.strokeStyle = col < OFFICE_ZONE_COL ? OFFICE_GRID_LINE : LOUNGE_GRID_LINE;
    ctx.beginPath();
    ctx.moveTo(x, 4 * TILE_SIZE);
    ctx.lineTo(x, (ROOM_ROWS - 1) * TILE_SIZE);
    ctx.stroke();
  }

  const floorStartY = 4 * TILE_SIZE;
  ctx.fillStyle = 'rgba(0,0,0,0.08)';
  ctx.fillRect(0, floorStartY, ROOM_COLS * TILE_SIZE, 2);
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  ctx.fillRect(0, floorStartY + 2, ROOM_COLS * TILE_SIZE, 2);
}

function drawWalls(ctx: CanvasRenderingContext2D): void {
  const ozPx = OFFICE_ZONE_COL * TILE_SIZE;

  for (let row = 0; row < ROOM_ROWS; row++) {
    for (let col = 0; col < ROOM_COLS; col++) {
      const tile = ROOM_MAP[row][col];
      if (tile !== TileType.WALL) continue;
      const x = col * TILE_SIZE;
      const y = row * TILE_SIZE;
      ctx.fillStyle = col < OFFICE_ZONE_COL ? WALL_COLOR : WALL_LOUNGE;
      ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    }
  }

  ctx.fillStyle = WALL_ACCENT_CYAN;
  for (let y = 0; y < 3 * TILE_SIZE; y += 12) {
    ctx.fillRect(0, y, ozPx, 1);
  }
  ctx.fillStyle = WALL_ACCENT_PURPLE;
  for (let y = 0; y < 3 * TILE_SIZE; y += 12) {
    ctx.fillRect(ozPx, y, ROOM_COLS * TILE_SIZE - ozPx, 1);
  }
}

function drawBaseboard(ctx: CanvasRenderingContext2D): void {
  const ozPx = OFFICE_ZONE_COL * TILE_SIZE;
  const y = 3 * TILE_SIZE;
  const w = ROOM_COLS * TILE_SIZE;

  ctx.fillStyle = BASEBOARD_BG;
  ctx.fillRect(0, y, w, TILE_SIZE);
  ctx.fillStyle = BASEBOARD_CYAN;
  ctx.fillRect(0, y + TILE_SIZE / 2, ozPx, 1);
  ctx.fillStyle = BASEBOARD_PURPLE;
  ctx.fillRect(ozPx, y + TILE_SIZE / 2, w - ozPx, 1);
  ctx.fillStyle = 'rgba(0,200,255,0.10)';
  ctx.fillRect(0, y + TILE_SIZE / 2 + 2, ozPx, 1);
  ctx.fillStyle = 'rgba(180,100,255,0.15)';
  ctx.fillRect(ozPx, y + TILE_SIZE / 2 + 2, w - ozPx, 1);
}

function drawZoneDivider(ctx: CanvasRenderingContext2D, h: number): void {
  const x = OFFICE_ZONE_COL * TILE_SIZE;
  ctx.fillStyle = '#0a0e16';
  ctx.fillRect(x - 2, 0, 4, h);
  ctx.fillStyle = '#101620';
  ctx.fillRect(x - 1, 0, 2, h);
  ctx.fillStyle = 'rgba(0,200,255,0.18)';
  ctx.fillRect(x - 1, 0, 1, h);
  ctx.fillStyle = 'rgba(180,100,255,0.18)';
  ctx.fillRect(x, 0, 1, h);

  for (let ny = 4 * TILE_SIZE; ny < h - TILE_SIZE; ny += 3 * TILE_SIZE) {
    ctx.fillStyle = 'rgba(0,200,255,0.08)';
    ctx.fillRect(x - 2, ny, 1, 3);
    ctx.fillStyle = 'rgba(180,100,255,0.08)';
    ctx.fillRect(x + 1, ny, 1, 3);
  }
}

function drawDesks(ctx: CanvasRenderingContext2D, agents: AgentEntity[], time: number): void {
  for (const ws of WORKSTATIONS) {
    const agent = agents.find(a => a.id === ws.agentId);
    const isActive = agent && (agent.state === 'work' || agent.state === 'deepfocus');

    const deskX = ws.deskCols[0] * TILE_SIZE;
    const deskY = ws.deskRows[0] * TILE_SIZE;
    const deskW = ws.deskCols.length * TILE_SIZE;
    const deskH = ws.deskRows.length * TILE_SIZE;

    ctx.fillStyle = DESK_COLOR;
    ctx.fillRect(deskX, deskY, deskW, deskH);
    ctx.fillStyle = DESK_TOP_GLOW;
    ctx.fillRect(deskX, deskY, deskW, 1);

    ctx.fillStyle = DESK_LEG;
    ctx.fillRect(deskX + 3, deskY + deskH, 4, 8);
    ctx.fillRect(deskX + deskW - 7, deskY + deskH, 4, 8);

    const monX = ws.seatCol * TILE_SIZE - 2;
    const monY = (ws.deskRows[0] - 2) * TILE_SIZE;
    ctx.fillStyle = MONITOR_FRAME;
    ctx.fillRect(monX - 2, monY, TILE_SIZE + 4, TILE_SIZE * 2);
    ctx.fillStyle = MONITOR_SCREEN;
    ctx.fillRect(monX, monY + 2, TILE_SIZE, TILE_SIZE * 2 - 4);

    const glowAlpha = isActive ? 0.5 + Math.sin(time * 0.003) * 0.2 : 0.15;
    ctx.fillStyle = hexColorAlpha(ws.color, glowAlpha);
    ctx.fillRect(monX + 1, monY + 3, TILE_SIZE - 2, TILE_SIZE * 2 - 6);

    if (isActive) {
      const lineColors = ['#4ade80', '#fbbf24', ws.color];
      for (let j = 0; j < 3; j++) {
        ctx.fillStyle = lineColors[j];
        ctx.fillRect(monX + 3, monY + 5 + j * 6, 6 + (j % 2) * 4, 2);
      }
    }

    const chairX = ws.seatCol * TILE_SIZE;
    const chairY = ws.seatRow * TILE_SIZE;
    ctx.fillStyle = CHAIR_BODY;
    ctx.fillRect(chairX + 2, chairY + 2, TILE_SIZE - 4, 8);
    ctx.fillStyle = CHAIR_BASE;
    ctx.fillRect(chairX + 4, chairY + 8, TILE_SIZE - 8, 6);

    drawDeskItems(ctx, ws.agentId, deskX, deskY, ws.color);
  }
}

function drawDeskItems(ctx: CanvasRenderingContext2D, _agentId: string, dx: number, dy: number, color: string): void {
  ctx.fillStyle = color;
  ctx.fillRect(dx + 3, dy + 2, 3, 3);
}

function drawWhiteboard(ctx: CanvasRenderingContext2D): void {
  const x = 1 * TILE_SIZE;
  const y = 1 * TILE_SIZE;
  const w = 3 * TILE_SIZE;
  const h = 2 * TILE_SIZE;

  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
  ctx.fillStyle = '#0a1820';
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = 'rgba(0,200,255,0.15)';
  ctx.fillRect(x, y, w, 1);
  ctx.fillRect(x, y + h - 1, w, 1);
  ctx.fillRect(x, y, 1, h);
  ctx.fillRect(x + w - 1, y, 1, h);
}

function drawWindow(ctx: CanvasRenderingContext2D, hour: number, time: number): void {
  const tod = getTimeOfDay(hour);
  const skyColor = SKY_COLORS[tod].sky;
  const x = LAYOUT.furniture.window.col * TILE_SIZE;
  const y = LAYOUT.furniture.window.row * TILE_SIZE;
  const w = 4 * TILE_SIZE;
  const h = 2 * TILE_SIZE;

  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(x - 2, y - 2, w + 4, h + 4);
  ctx.fillStyle = skyColor;
  ctx.fillRect(x, y, w, h);

  if (tod !== 'night' && tod !== 'dusk') {
    const drift = time * 0.005;
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(x + ((4 + drift) % w), y + 5, 10, 5);
    ctx.fillRect(x + ((20 + drift * 0.7) % w), y + 7, 14, 4);
  }

  if (tod === 'night') {
    const stars = [[6, 5], [22, 10], [38, 7], [12, 18], [30, 4]];
    for (let i = 0; i < stars.length; i++) {
      const [sx, sy] = stars[i];
      const alpha = 0.5 + Math.sin(time * 0.002 + i) * 0.4;
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fillRect(x + sx, y + sy, 1, 1);
    }
  }

  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(x + w / 2 - 1, y, 2, h);
  ctx.fillRect(x, y + h / 2 - 1, w, 2);
  ctx.fillStyle = 'rgba(0,200,255,0.12)';
  ctx.fillRect(x, y, w, 1);
  ctx.fillRect(x, y + h - 1, w, 1);
}

function drawClock(ctx: CanvasRenderingContext2D, hour: number): void {
  const cx = 18 * TILE_SIZE + TILE_SIZE / 2;
  const cy = 1 * TILE_SIZE + TILE_SIZE / 2;
  const r = 6;

  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0a1218';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    const mr = i % 3 === 0 ? r - 2 : r - 1;
    ctx.fillStyle = i % 3 === 0 ? '#00c8ff' : 'rgba(0,200,255,0.3)';
    ctx.fillRect(Math.round(cx + Math.cos(a) * mr), Math.round(cy + Math.sin(a) * mr), 1, 1);
  }

  const hAngle = ((hour % 12) * 30 - 90) * Math.PI / 180;
  const mAngle = (new Date().getMinutes() * 6 - 90) * Math.PI / 180;
  ctx.strokeStyle = '#00c8ff';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(hAngle) * 3, cy + Math.sin(hAngle) * 3);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(0,200,255,0.6)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(mAngle) * 4.5, cy + Math.sin(mAngle) * 4.5);
  ctx.stroke();
  ctx.fillStyle = '#00c8ff';
  ctx.fillRect(cx, cy, 1, 1);
}

function drawMeetingTable(ctx: CanvasRenderingContext2D): void {
  const area = COMMON_AREAS.find(a => a.name === 'meeting')!;
  const x = (area.col - 1) * TILE_SIZE;
  const y = area.row * TILE_SIZE;
  const w = 3 * TILE_SIZE;
  const h = 2 * TILE_SIZE;

  ctx.fillStyle = '#1e2a35';
  ctx.fillRect(x - TILE_SIZE, y - TILE_SIZE / 2, w + 2 * TILE_SIZE, h + TILE_SIZE);
  ctx.fillStyle = 'rgba(0,200,255,0.06)';
  for (let ry = y - TILE_SIZE / 2; ry < y + h + TILE_SIZE / 2; ry += 6) {
    ctx.fillRect(x - TILE_SIZE, ry, w + 2 * TILE_SIZE, 1);
  }

  ctx.fillStyle = MEETING_COLOR;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = MEETING_TOP;
  ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
  ctx.fillStyle = MEETING_GLOW;
  ctx.fillRect(x, y, w, 1);

  ctx.fillStyle = DESK_LEG;
  ctx.fillRect(x + 4, y + h, 4, 6);
  ctx.fillRect(x + w - 8, y + h, 4, 6);
}

function drawLoungeArea(ctx: CanvasRenderingContext2D): void {
  const ozPx = OFFICE_ZONE_COL * TILE_SIZE;

  ctx.fillStyle = '#c08fff';
  ctx.fillRect(ozPx + 8, 1 * TILE_SIZE + 4, 40, 1);
  ctx.fillStyle = 'rgba(180,100,255,0.12)';
  ctx.fillRect(ozPx + 8, 1 * TILE_SIZE + 2, 40, 5);

  const sofaX = 31 * TILE_SIZE;
  const sofaY = 2 * TILE_SIZE;
  ctx.fillStyle = '#342850';
  ctx.fillRect(sofaX, sofaY, 3 * TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = '#2c2045';
  ctx.fillRect(sofaX, sofaY, 3 * TILE_SIZE, 3);
  ctx.fillStyle = '#3e3258';
  ctx.fillRect(sofaX, sofaY + TILE_SIZE, 3 * TILE_SIZE, TILE_SIZE);
  ctx.fillStyle = '#483c62';
  ctx.fillRect(sofaX + 3, sofaY + TILE_SIZE + 3, 3 * TILE_SIZE - 6, TILE_SIZE - 6);
  ctx.fillStyle = '#2c2045';
  ctx.fillRect(sofaX - 4, sofaY + 4, 4, TILE_SIZE * 2 - 8);
  ctx.fillRect(sofaX + 3 * TILE_SIZE, sofaY + 4, 4, TILE_SIZE * 2 - 8);
  ctx.fillStyle = 'rgba(180,100,255,0.2)';
  ctx.fillRect(sofaX, sofaY, 3 * TILE_SIZE, 1);

  const coffeeArea = COMMON_AREAS.find(a => a.name === 'coffee')!;
  const cmX = coffeeArea.col * TILE_SIZE - TILE_SIZE;
  const cmY = coffeeArea.row * TILE_SIZE - TILE_SIZE / 2;
  ctx.fillStyle = 'rgba(180,100,255,0.08)';
  ctx.fillRect(cmX, cmY + TILE_SIZE * 2, TILE_SIZE * 3, 4);
  ctx.fillStyle = '#303848';
  ctx.fillRect(cmX, cmY, TILE_SIZE * 3, TILE_SIZE * 2);
  ctx.fillStyle = '#283040';
  ctx.fillRect(cmX, cmY, TILE_SIZE * 3, 3);
  ctx.fillStyle = 'rgba(180,100,255,0.12)';
  ctx.fillRect(cmX, cmY, TILE_SIZE * 3, 1);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(cmX + 6, cmY - 10, 14, 12);
  ctx.fillStyle = '#101010';
  ctx.fillRect(cmX + 8, cmY - 8, 10, 8);
  ctx.fillStyle = '#e04000';
  ctx.fillRect(cmX + 10, cmY - 7, 2, 2);
  ctx.fillStyle = '#7a5530';
  ctx.fillRect(cmX + 11, cmY - 5, 6, 4);
  ctx.fillStyle = '#e0e0e0';
  ctx.fillRect(cmX + 24, cmY - 3, 8, 7);
  ctx.fillStyle = '#d4a574';
  ctx.fillRect(cmX + 25, cmY - 2, 6, 5);

  const fridgeX = 31 * TILE_SIZE;
  const fridgeY = 9 * TILE_SIZE;
  ctx.fillStyle = '#354050';
  ctx.fillRect(fridgeX, fridgeY, 2 * TILE_SIZE, 2 * TILE_SIZE);
  ctx.fillStyle = '#3e4858';
  ctx.fillRect(fridgeX + 2, fridgeY + 2, 2 * TILE_SIZE - 4, TILE_SIZE - 2);
  ctx.fillRect(fridgeX + 2, fridgeY + TILE_SIZE + 2, 2 * TILE_SIZE - 4, TILE_SIZE - 4);
  ctx.fillStyle = '#607080';
  ctx.fillRect(fridgeX + 2 * TILE_SIZE - 6, fridgeY + 6, 3, 6);
  ctx.fillRect(fridgeX + 2 * TILE_SIZE - 6, fridgeY + TILE_SIZE + 4, 3, 6);
  ctx.fillStyle = 'rgba(100,180,255,0.08)';
  ctx.fillRect(fridgeX + 2, fridgeY + 2 * TILE_SIZE, 2 * TILE_SIZE - 4, 3);

  const artX = 28 * TILE_SIZE;
  const artY = 1 * TILE_SIZE;
  ctx.fillStyle = '#2a2a2a';
  ctx.fillRect(artX - 2, artY - 2, 2 * TILE_SIZE + 4, 2 * TILE_SIZE + 4);
  ctx.fillStyle = '#0e1828';
  ctx.fillRect(artX, artY, 2 * TILE_SIZE, 2 * TILE_SIZE);
  ctx.fillStyle = 'rgba(180,100,255,0.25)';
  ctx.fillRect(artX, artY, 2 * TILE_SIZE, 1);
  ctx.fillRect(artX, artY + 2 * TILE_SIZE - 1, 2 * TILE_SIZE, 1);
  ctx.fillRect(artX, artY, 1, 2 * TILE_SIZE);
  ctx.fillRect(artX + 2 * TILE_SIZE - 1, artY, 1, 2 * TILE_SIZE);
  ctx.fillStyle = '#6366f1';
  ctx.fillRect(artX + 3, artY + 3, 8, 6);
  ctx.fillStyle = '#8b5cf6';
  ctx.fillRect(artX + 13, artY + 5, 6, 8);
  ctx.fillStyle = '#ec4899';
  ctx.fillRect(artX + 7, artY + 15, 10, 5);
  ctx.fillStyle = '#14b8a6';
  ctx.fillRect(artX + 21, artY + 3, 5, 5);
}

function drawCeilingLights(ctx: CanvasRenderingContext2D, time: number): void {
  const officeLamps = LAYOUT.lights.office;
  for (let i = 0; i < officeLamps.length; i++) {
    const col = officeLamps[i];
    const x = col * TILE_SIZE + TILE_SIZE / 2;
    ctx.fillStyle = '#2a3040';
    ctx.fillRect(x - 1, 0, 2, 5);
    ctx.fillStyle = '#3a4050';
    ctx.fillRect(x - 4, 5, 8, 3);
    ctx.fillStyle = '#80e0ff';
    ctx.fillRect(x - 2, 8, 4, 2);

    const breathAlpha = 0.10 + Math.sin(time * 0.001 + i) * 0.02;
    const lg = ctx.createRadialGradient(x, 60, 0, x, 60, 50);
    lg.addColorStop(0, `rgba(0,200,255,${breathAlpha})`);
    lg.addColorStop(1, 'rgba(0,200,255,0)');
    ctx.fillStyle = lg;
    ctx.fillRect(x - 50, 10, 100, 100);
  }

  const loungeLamps = LAYOUT.lights.lounge;
  for (let i = 0; i < loungeLamps.length; i++) {
    const col = loungeLamps[i];
    const x = col * TILE_SIZE + TILE_SIZE / 2;
    ctx.fillStyle = '#2a3040';
    ctx.fillRect(x - 1, 0, 2, 5);
    ctx.fillStyle = '#3a4050';
    ctx.fillRect(x - 4, 5, 8, 3);
    ctx.fillStyle = '#c08fff';
    ctx.fillRect(x - 2, 8, 4, 2);

    const breathAlpha = 0.10 + Math.sin(time * 0.001 + i + 2) * 0.02;
    const lg = ctx.createRadialGradient(x, 60, 0, x, 60, 50);
    lg.addColorStop(0, `rgba(180,100,255,${breathAlpha})`);
    lg.addColorStop(1, 'rgba(180,100,255,0)');
    ctx.fillStyle = lg;
    ctx.fillRect(x - 50, 10, 100, 100);
  }
}

function drawPlants(ctx: CanvasRenderingContext2D, time: number): void {
  for (const pos of LAYOUT.furniture.plants) {
    const bx = pos.col * TILE_SIZE + TILE_SIZE / 2;
    const by = pos.row * TILE_SIZE + TILE_SIZE;
    const sway = Math.sin(time * 0.001) * 0.5;

    ctx.fillStyle = '#5c3a1a';
    ctx.fillRect(bx - 3, by - 2, 6, 4);
    ctx.fillStyle = '#7a4d2a';
    ctx.fillRect(bx - 2, by - 3, 4, 2);

    ctx.fillStyle = '#1a5c2a';
    ctx.fillRect(bx - 1, by - 8, 2, 6);

    ctx.fillStyle = '#2d8a4e';
    ctx.fillRect(Math.round(bx - 4 + sway), by - 12, 3, 3);
    ctx.fillRect(Math.round(bx + 2 - sway), by - 14, 3, 3);
    ctx.fillRect(Math.round(bx - 2 + sway * 0.6), by - 16, 4, 3);
    ctx.fillStyle = '#3aad65';
    ctx.fillRect(Math.round(bx - 1 + sway * 0.8), by - 18, 3, 3);
  }
}

function drawVignette(ctx: CanvasRenderingContext2D, w: number, h: number, hour: number): void {
  const tod = getTimeOfDay(hour);
  const vignetteAlpha = tod === 'night' ? 0.20 : (tod === 'dawn' || tod === 'dusk' || tod === 'sunset') ? 0.12 : 0.08;
  const vg = ctx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, 350);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, `rgba(0,0,0,${vignetteAlpha})`);
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
}
