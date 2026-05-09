export interface AgentDef {
  id: string;
  name: string;
  avatar: string;
  color: string;
  workStyle: string;
}

export const AGENTS: AgentDef[] = [
  { id: 'minion',   name: 'Minion',   avatar: '/avatars/minion.png',   color: '#f59e0b', workStyle: 'commanding' },
  { id: 'sage',     name: 'Sage',     avatar: '/avatars/sage.png',     color: '#8b5cf6', workStyle: 'methodical' },
  { id: 'scout',    name: 'Scout',    avatar: '/avatars/scout.png',    color: '#10b981', workStyle: 'rapid-fire' },
  { id: 'quill',    name: 'Quill',    avatar: '/avatars/quill.png',    color: '#0ea5e9', workStyle: 'artistic' },
  { id: 'xalt',     name: 'Xalt',     avatar: '/avatars/xalt.png',     color: '#f43f5e', workStyle: 'impulsive' },
  { id: 'observer', name: 'Observer', avatar: '/avatars/observer.png', color: '#14b8a6', workStyle: 'watchful' },
];

export const WORK_MSGS: Record<string, string[]> = {
  minion:   ['Coordinating...', 'Scheduling', 'Delegating', 'Checking all systems...'],
  sage:     ['Analyzing...', 'Deep research', 'Reviewing research...', 'Crunching data'],
  scout:    ['Finding leads', 'Scouting trends', 'Scanning signals...', 'Competitor check'],
  quill:    ['Writing copy...', 'Designing', 'Sketching ideas...', 'Editing draft'],
  xalt:     ['Posting...', 'Engaging fans', 'Doom scrolling...', 'Reply storm'],
  observer: ['Logging observations...', 'Watching ops...', 'Taking notes', 'Tracking patterns'],
};

export const PERSONALITY_BANTER: Record<string, string[]> = {
  minion:   ['Reviewing the roadmap...', 'Team sync soon', 'Checking priorities', 'Delegating tasks'],
  sage:     ['Cross-referencing data...', 'Running hypothesis', 'Peer review time', 'Validating findings'],
  scout:    ['Found something interesting', 'Tracking a new signal', 'Lead looks promising', 'Scanning competitors'],
  quill:    ['Polishing the draft', 'Brainstorming headlines', 'Layout adjustments', 'Creative block...'],
  xalt:     ['Hot take incoming', 'Engaging the community', 'Thread time', 'Ratio incoming'],
  observer: ['Noting a pattern...', 'Interesting dynamics', 'Recording observations', 'Compiling notes'],
};

export const COFFEE_MSGS: string[] = ['☕ Ahh...', 'Coffee time!', 'Need caffeine', 'Refueling...'];

export const CELEBRATE_MSGS: Record<string, string[]> = {
  minion:   ['Ship it!', 'Deployed!', 'All systems go!'],
  sage:     ['Data confirms it!', 'Hypothesis proven!', 'Eureka!'],
  scout:    ['Found a gem!', 'Lead secured!', 'Opportunity!'],
  quill:    ['Masterpiece!', 'Published!', 'Perfection!'],
  xalt:     ['Going viral!', 'Trending!', 'Engagement!'],
  observer: ['Story captured!', 'Logged!', 'Pattern found!'],
};

export const LOUNGE_MSGS: Record<string, string[]> = {
  minion:   ['Break time~', 'Quick rest', 'Recharging...'],
  sage:     ['Reading papers...', 'Contemplating...', 'In thought...'],
  scout:    ['Scanning trends', 'Passive recon', 'Monitoring...'],
  quill:    ['Getting inspired', 'Moodboarding', 'Creativity++'],
  xalt:     ['Doom scrolling...', 'Feed check', 'Lurking...'],
  observer: ['Just watching...', 'Quiet observe', 'Noting...'],
};
