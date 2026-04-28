export type ChatIntent =
  | 'treats'
  | 'walks'
  | 'couch'
  | 'smoke_alarm'
  | 'toilet_drip'
  | 'critters'
  | 'roof_climb'
  | 'cuddles'
  | 'default';

export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  reply: string;
  intent: ChatIntent;
  timestamp: string;
}

export interface ChatErrorResponse {
  error: string;
}
