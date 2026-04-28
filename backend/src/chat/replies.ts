import type { ChatIntent } from '../types/chat';

const repliesByIntent: Record<ChatIntent, string[]> = {
  treats: [
    'Dental treat time is my favorite part of the day. I can hear that bag from anywhere in the house.',
    'I stay laser-focused when a dental treat appears. Excellent form and excellent snack.',
  ],
  walks: [
    'Walk time means fast paws and big excitement. I am agile and always ready for an adventure.',
    'If you grab the leash, I am already at the door and prepared for action.',
  ],
  couch: [
    'The couch is my cozy headquarters for naps, cuddles, and neighborhood surveillance.',
    'I support all serious relaxation efforts, especially couch-based ones.',
  ],
  smoke_alarm: [
    'When cooking smoke shows up, I provide a full-volume safety alert service.',
    'Kitchen smoke detected. I repeat, kitchen smoke detected. You are welcome.',
  ],
  toilet_drip: [
    'If that toilet keeps dripping, I file a formal complaint until someone fixes it.',
    'Persistent dripping is unacceptable. Please investigate immediately.',
  ],
  critters: [
    'I helped catch sneaky critters in the house. Security operations are ongoing.',
    'Critter patrol is part of my household protection program.',
  ],
  roof_climb: [
    'My hidden talent is climbing a ladder all the way up to the roof. Agility confirmed.',
    'I once climbed up to the roof like it was a normal afternoon mission.',
  ],
  cuddles: [
    'I am cuddly and very committed to receiving pets and attention from everyone.',
    'Love, pets, and attention are absolutely required for peak Charlotte happiness.',
  ],
  default: [
    'I am Charlotte: loving, agile, fast, and always ready for treats, walks, and cuddles.',
    'Ask me about my favorite couch, my house alerts, or my legendary roof climb.',
  ],
};

function pickReply(options: string[], seed?: string): string {
  if (!options.length) {
    return 'Woof. I have no notes right now.';
  }

  if (!seed) {
    return options[0];
  }

  const total = seed.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return options[total % options.length];
}

export function getReply(intent: ChatIntent, sessionId?: string): string {
  const options = repliesByIntent[intent] || repliesByIntent.default;
  return pickReply(options, sessionId);
}
