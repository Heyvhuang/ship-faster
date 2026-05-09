export enum AppState {
    LANDING = 'LANDING',
    EDITOR = 'EDITOR',
    SUCCESS = 'SUCCESS'
  }
  
  export enum Audience {
    CLIENT = 'CLIENT',
    INTERNAL = 'INTERNAL'
  }
  
  export interface GeneratedStep {
    action: string;
    details: string;
    codeSnippet?: string;
  }
  
  export interface GeneratedArticle {
    title: string;
    summary: string;
    audience: Audience;
    steps: GeneratedStep[];
    cautions: string[];
    redactedItems: string[];
    tags: string[];
  }
  
  export interface TicketData {
    id: string;
    rawText: string;
    timestamp: number;
  }
  
  export interface GenerationConfig {
    audience: Audience;
    redactionEnabled: boolean;
    tone: 'professional' | 'casual' | 'technical';
  }
  