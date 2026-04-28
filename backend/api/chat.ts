import type { VercelRequest, VercelResponse } from '@vercel/node';
import { detectIntent } from '../src/chat/intentRouter';
import { getReply } from '../src/chat/replies';
import { applyCorsHeaders } from '../src/config/cors';
import type { ChatErrorResponse, ChatRequest, ChatResponse } from '../src/types/chat';

function sendError(res: VercelResponse, statusCode: number, message: string): void {
  const payload: ChatErrorResponse = { error: message };
  res.status(statusCode).json(payload);
}

function parseBody(req: VercelRequest): Partial<ChatRequest> {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as Partial<ChatRequest>;
    } catch {
      return {};
    }
  }

  return req.body as Partial<ChatRequest>;
}

export default function handler(req: VercelRequest, res: VercelResponse): void {
  const origin = req.headers.origin;
  applyCorsHeaders(res, origin);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    sendError(res, 405, 'Method not allowed. Use POST.');
    return;
  }

  const body = parseBody(req);
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : undefined;

  if (!message) {
    sendError(res, 400, 'Message is required.');
    return;
  }

  const intent = detectIntent(message);
  const reply = getReply(intent, sessionId);

  const response: ChatResponse = {
    reply,
    intent,
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(response);
}
