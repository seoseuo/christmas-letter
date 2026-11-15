import 'server-only';
import pg from 'pg';
import { readFileSync } from 'node:fs';

let pool;
export function db() {
  if (!process.env.DATABASE_URL) {
    console.error('[database] DATABASE_URL is not configured');
    throw new Error('DATABASE_URL is not configured');
  }
  if (!pool) {
    const caPath = process.env.DATABASE_CA_CERT_PATH;
    let ca;
    if (caPath) {
      try {
        ca = readFileSync(caPath, 'utf8');
      } catch (error) {
        const code = typeof error?.code === 'string' && /^[A-Z0-9_]{1,32}$/.test(error.code) ? error.code : 'unknown';
        console.error('[database] CA certificate file read failed:', {
          code,
          containsPemMarker: caPath.includes('-----BEGIN CERTIFICATE-----'),
          pathExceeds255Bytes: Buffer.byteLength(caPath) > 255,
        });
        throw error;
      }
    }
    pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5, ssl: { rejectUnauthorized: true, ...(ca ? { ca } : {}) } });
  }
  return pool;
}
