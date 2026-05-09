import { ROOM_COLS, ROOM_ROWS } from './roomData';

interface TilePos {
  col: number;
  row: number;
}

export function pixelToTile(x: number, y: number, tileSize: number): TilePos {
  return {
    col: Math.max(0, Math.min(ROOM_COLS - 1, Math.floor(x / tileSize))),
    row: Math.max(0, Math.min(ROOM_ROWS - 1, Math.floor(y / tileSize))),
  };
}

export function tileToPixel(col: number, row: number, tileSize: number): { x: number; y: number } {
  return {
    x: col * tileSize + tileSize / 2,
    y: row * tileSize + tileSize / 2,
  };
}

const DIRS: [number, number][] = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

export function bfs(
  walkable: boolean[][],
  start: TilePos,
  goal: TilePos,
): TilePos[] {
  if (start.col === goal.col && start.row === goal.row) return [];
  if (!inBounds(goal) || !walkable[goal.row]?.[goal.col]) return [];
  if (!inBounds(start) || !walkable[start.row]?.[start.col]) return [];

  const visited = new Set<number>();
  const parent = new Map<number, number>();
  const queue: TilePos[] = [start];
  const startKey = posKey(start);
  visited.add(startKey);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const currentKey = posKey(current);

    if (current.col === goal.col && current.row === goal.row) {
      return reconstructPath(parent, startKey, currentKey);
    }

    for (const [dc, dr] of DIRS) {
      const nc = current.col + dc;
      const nr = current.row + dr;
      const nKey = nr * ROOM_COLS + nc;

      if (nc < 0 || nc >= ROOM_COLS || nr < 0 || nr >= ROOM_ROWS) continue;
      if (visited.has(nKey)) continue;
      if (!walkable[nr][nc]) continue;

      visited.add(nKey);
      parent.set(nKey, currentKey);
      queue.push({ col: nc, row: nr });
    }
  }

  return [];
}

function posKey(p: TilePos): number {
  return p.row * ROOM_COLS + p.col;
}

function inBounds(p: TilePos): boolean {
  return p.col >= 0 && p.col < ROOM_COLS && p.row >= 0 && p.row < ROOM_ROWS;
}

function reconstructPath(parent: Map<number, number>, startKey: number, goalKey: number): TilePos[] {
  const path: TilePos[] = [];
  let key = goalKey;
  while (key !== startKey) {
    const row = Math.floor(key / ROOM_COLS);
    const col = key % ROOM_COLS;
    path.push({ col, row });
    const p = parent.get(key);
    if (p === undefined) break;
    key = p;
  }
  path.reverse();
  return path;
}

export function findRandomWalkable(walkable: boolean[][], nearCol: number, nearRow: number, radius: number): TilePos | null {
  const candidates: TilePos[] = [];
  const minCol = Math.max(0, nearCol - radius);
  const maxCol = Math.min(ROOM_COLS - 1, nearCol + radius);
  const minRow = Math.max(0, nearRow - radius);
  const maxRow = Math.min(ROOM_ROWS - 1, nearRow + radius);

  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      if (walkable[r][c]) {
        candidates.push({ col: c, row: r });
      }
    }
  }

  if (candidates.length === 0) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}
