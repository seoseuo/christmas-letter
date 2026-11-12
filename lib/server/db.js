import 'server-only';
import pg from 'pg';
import { readFileSync } from 'node:fs';

let pool;
export function db() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not configured');
  if (!pool) {
    const ca = process.env.DATABASE_CA_CERT_PATH ? readFileSync(process.env.DATABASE_CA_CERT_PATH, 'utf8') : undefined;
    pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5, ssl: { rejectUnauthorized: true, ...(ca ? { ca } : {}) } });
  }
  return pool;
}
