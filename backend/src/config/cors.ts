import type { VercelResponse } from '@vercel/node';

const defaultOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
];

function parseConfiguredOrigins(): string[] {
  const configured = process.env.FRONTEND_ORIGIN || '';
  const normalized = configured
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return [...defaultOrigins, ...normalized];
}

export function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) {
    return false;
  }

  if (origin.endsWith('.github.io')) {
    return true;
  }

  return parseConfiguredOrigins().includes(origin);
}

export function applyCorsHeaders(res: VercelResponse, origin: string | undefined): void {
  if (isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin as string);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
