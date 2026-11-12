import 'server-only';
import { NextResponse } from 'next/server';
export const error = (message, status = 400) => NextResponse.json({ error: message }, { status });
export const sameOrigin = (request) => request.headers.get('origin') === new URL(request.url).origin;
export const uuid = (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
