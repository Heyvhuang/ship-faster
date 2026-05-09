export type OfficeAgentState =
  | 'idle' | 'walk' | 'work' | 'talk' | 'coffee' | 'think'
  | 'wave' | 'celebrate' | 'lounge' | 'argue' | 'gossip'
  | 'deepfocus' | 'slack' | 'reflecting' | 'spawning';

export type Direction = 'down' | 'left' | 'right' | 'up';
export type CharPhase = 'idle' | 'walk' | 'sit' | 'stand';

export type MissionBadge =
  | 'proposing' | 'executing' | 'completed'
  | 'writing' | 'deploying' | 'reflecting'
  | null;

export interface AgentEntity {
  id: string;
  name: string;
  color: string;
  avatar: string;

  x: number;
  y: number;
  tileCol: number;
  tileRow: number;
  moveFromCol: number;
  moveFromRow: number;
  moveToCol: number;
  moveToRow: number;
  moveProgress: number;
  pathQueue: { col: number; row: number }[];
  cachedGoalCol: number;
  cachedGoalRow: number;

  seatCol: number;
  seatRow: number;
  seatPx: { x: number; y: number };

  walkFrame: number;
  walkFrameTimer: number;
  typeFrame: number;
  typeFrameTimer: number;

  state: OfficeAgentState;
  charPhase: CharPhase;
  direction: Direction;
  stateAge: number;

  message: string | null;
  talkingTo: string | null;
  replyFrom: string | null;
  emotion: 'happy' | 'thinking' | 'excited' | null;
  sentiment: string | null;
  arriveState: OfficeAgentState | null;
  dwellUntil: number;
  missionBadge: MissionBadge;

  workStyle: string;
  affect: string;

  wanderMovesLeft: number;
  wanderRestTimer: number;
  isInWanderCycle: boolean;

  conversationPhase: number;
  conversationTimer: number;

  sitOffsetY: number;
}

export interface GameState {
  time: number;
  dt: number;
  frame: number;
}
