import type { ChatIntent } from '../types/chat';

const intentKeywords: Array<{ intent: ChatIntent; keywords: string[] }> = [
  { intent: 'treats', keywords: ['treat', 'dental', 'snack', 'chew'] },
  { intent: 'walks', keywords: ['walk', 'outside', 'leash', 'park', 'run'] },
  { intent: 'couch', keywords: ['couch', 'sofa', 'nap', 'sleep'] },
  { intent: 'smoke_alarm', keywords: ['smoke', 'alarm', 'cooking', 'kitchen'] },
  { intent: 'toilet_drip', keywords: ['toilet', 'drip', 'water', 'flush', 'plushed'] },
  { intent: 'critters', keywords: ['critter', 'mouse', 'rat', 'bug', 'sneaked'] },
  { intent: 'roof_climb', keywords: ['roof', 'ladder', 'climb'] },
  { intent: 'cuddles', keywords: ['cuddle', 'pet', 'attention', 'love', 'loving'] },
];

export function detectIntent(message: string): ChatIntent {
  const normalized = message.toLowerCase();

  for (const entry of intentKeywords) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.intent;
    }
  }

  return 'default';
}
