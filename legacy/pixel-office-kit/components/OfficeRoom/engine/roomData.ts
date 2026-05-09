export const TILE_SIZE = 16;
export const ROOM_COLS = 35;
export const ROOM_ROWS = 14;
export const NATIVE_W = ROOM_COLS * TILE_SIZE;
export const NATIVE_H = ROOM_ROWS * TILE_SIZE;
export const SCALE = 2;
export const DISPLAY_W = NATIVE_W * SCALE;
export const DISPLAY_H = NATIVE_H * SCALE;
export const OFFICE_ZONE_COL = 24;

export enum TileType {
  FLOOR = 0,
  WALL = 1,
  DESK = 2,
  SEAT = 3,
  WHITEBOARD = 4,
  WINDOW = 5,
  CLOCK = 6,
  SOFA = 7,
  COFFEE_M = 8,
  MEETING = 9,
  FRIDGE = 10,
  BASEBOARD = 11,
  LOUNGE_FLOOR = 12,
  ART_FRAME = 13,
}

const W = TileType.WALL;
const F = TileType.FLOOR;
const D = TileType.DESK;
const S = TileType.SEAT;
const B = TileType.BASEBOARD;
const L = TileType.LOUNGE_FLOOR;
const WB = TileType.WHITEBOARD;
const WN = TileType.WINDOW;
const CK = TileType.CLOCK;
const SO = TileType.SOFA;
const CM = TileType.COFFEE_M;
const MT = TileType.MEETING;
const FR = TileType.FRIDGE;
const AF = TileType.ART_FRAME;

export const ROOM_MAP: TileType[][] = [
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
  [W, WB, WB, WB, W, W, W, W, W, W, W, W, W, W, WN, WN, WN, WN, CK, W, W, W, W, W, W, W, W, W, AF, AF, W, W, W, W, W],
  [W, WB, WB, WB, W, W, W, W, W, W, W, W, W, W, WN, WN, WN, WN, W, W, W, W, W, W, W, W, W, W, AF, AF, W, SO, SO, SO, W],
  [B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, SO, SO, SO, B],
  [F, F, F, D, D, D, F, D, D, D, F, D, D, D, F, F, F, D, D, D, F, D, D, D, F, L, L, L, L, L, L, SO, SO, SO, L],
  [F, F, F, D, D, D, F, D, D, D, F, D, D, D, F, F, F, D, D, D, F, D, D, D, F, L, L, L, L, L, L, D, D, D, L],
  [F, F, F, F, S, F, F, F, S, F, F, F, S, F, F, F, F, F, S, F, F, F, S, F, L, L, L, L, L, L, L, L, S, L, L],
  [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, L, L, L, CM, L, L, L, L, L, L, L],
  [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, L, L, L, CM, L, L, L, L, L, L, L],
  [F, F, F, F, F, F, F, F, F, MT, MT, MT, F, F, F, F, F, F, F, F, F, F, F, F, L, L, L, L, L, L, L, FR, FR, L, L],
  [F, F, F, F, F, F, F, F, F, MT, MT, MT, F, F, F, F, F, F, F, F, F, F, F, F, L, L, L, L, L, L, L, FR, FR, L, L],
  [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, L, L, L, L, L, L, L, L, L, L, L],
  [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, L, L, L, L, L, L, L, L, L, L, L],
  [W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W, W],
];

export interface Workstation {
  agentId: string;
  seatCol: number;
  seatRow: number;
  seatPx: { x: number; y: number };
  deskCols: number[];
  deskRows: number[];
  facingDir: 'up' | 'down' | 'left' | 'right';
  color: string;
}

export const WORKSTATIONS: Workstation[] = [
  {
    agentId: 'minion', color: '#f59e0b',
    seatCol: 4, seatRow: 6,
    seatPx: { x: 4 * TILE_SIZE + TILE_SIZE / 2, y: 6 * TILE_SIZE + TILE_SIZE / 2 },
    deskCols: [3, 4, 5], deskRows: [4, 5], facingDir: 'up',
  },
  {
    agentId: 'sage', color: '#8b5cf6',
    seatCol: 8, seatRow: 6,
    seatPx: { x: 8 * TILE_SIZE + TILE_SIZE / 2, y: 6 * TILE_SIZE + TILE_SIZE / 2 },
    deskCols: [7, 8, 9], deskRows: [4, 5], facingDir: 'up',
  },
  {
    agentId: 'scout', color: '#10b981',
    seatCol: 12, seatRow: 6,
    seatPx: { x: 12 * TILE_SIZE + TILE_SIZE / 2, y: 6 * TILE_SIZE + TILE_SIZE / 2 },
    deskCols: [11, 12, 13], deskRows: [4, 5], facingDir: 'up',
  },
  {
    agentId: 'quill', color: '#0ea5e9',
    seatCol: 18, seatRow: 6,
    seatPx: { x: 18 * TILE_SIZE + TILE_SIZE / 2, y: 6 * TILE_SIZE + TILE_SIZE / 2 },
    deskCols: [17, 18, 19], deskRows: [4, 5], facingDir: 'up',
  },
  {
    agentId: 'xalt', color: '#f43f5e',
    seatCol: 22, seatRow: 6,
    seatPx: { x: 22 * TILE_SIZE + TILE_SIZE / 2, y: 6 * TILE_SIZE + TILE_SIZE / 2 },
    deskCols: [21, 22, 23], deskRows: [4, 5], facingDir: 'up',
  },
  {
    agentId: 'observer', color: '#14b8a6',
    seatCol: 32, seatRow: 6,
    seatPx: { x: 32 * TILE_SIZE + TILE_SIZE / 2, y: 6 * TILE_SIZE + TILE_SIZE / 2 },
    deskCols: [31, 32, 33], deskRows: [4, 5], facingDir: 'up',
  },
];

export interface CommonArea {
  col: number;
  row: number;
  name: string;
}

export const COMMON_AREAS: CommonArea[] = [
  { col: 10, row: 9, name: 'meeting' },
  { col: 27, row: 8, name: 'coffee' },
  { col: 28, row: 4, name: 'lounge' },
  { col: 2, row: 4, name: 'whiteboard' },
];

export function buildWalkableGrid(): boolean[][] {
  const grid: boolean[][] = [];
  for (let row = 0; row < ROOM_ROWS; row++) {
    grid[row] = [];
    for (let col = 0; col < ROOM_COLS; col++) {
      const tile = ROOM_MAP[row][col];
      grid[row][col] =
        tile === TileType.FLOOR ||
        tile === TileType.SEAT ||
        tile === TileType.LOUNGE_FLOOR;
    }
  }
  return grid;
}

export const LAYOUT = {
  tile: { size: TILE_SIZE, cols: ROOM_COLS, rows: ROOM_ROWS },
  scale: SCALE,
  canvas: { nativeW: NATIVE_W, nativeH: NATIVE_H, displayW: DISPLAY_W, displayH: DISPLAY_H },
  furniture: {
    whiteboard: { col: 1, row: 1 },
    window: { col: 14, row: 1 },
    clock: { col: 18, row: 1 },
    sofa: { col: 31, row: 2 },
    artFrame: { col: 28, row: 1 },
    fridge: { col: 31, row: 9 },
    coffeeMachine: { col: 27, row: 8 },
    meetingTable: { col: 9, row: 9 },
    plants: [{ col: 7, row: 8 }, { col: 25, row: 7 }],
  },
  lights: { office: [6, 18], lounge: [27, 33] },
} as const;

export function getTimeOfDay(hour: number): 'night' | 'dawn' | 'morning' | 'day' | 'sunset' | 'dusk' {
  if (hour >= 21 || hour < 5) return 'night';
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 10) return 'morning';
  if (hour >= 10 && hour < 16) return 'day';
  if (hour >= 16 && hour < 19) return 'sunset';
  return 'dusk';
}

export const SKY_COLORS: Record<string, { sky: string }> = {
  night:   { sky: '#1a1a3e' },
  dawn:    { sky: '#e8a87c' },
  morning: { sky: '#87ceeb' },
  day:     { sky: '#5dade2' },
  sunset:  { sky: '#f39c6b' },
  dusk:    { sky: '#4a3f6b' },
};
