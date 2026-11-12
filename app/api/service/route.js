import { serviceDates } from '../../../lib/service-config';

// Public service information only. Letter contents and purchase permissions
// must be handled by authenticated, server-validated endpoints.
export function GET() {
  return Response.json({
    name: '크리스마스 양말에 편지를 담아요',
    timezone: 'Asia/Seoul',
    dates: serviceDates,
    pricing: { status: 'undecided', currency: 'KRW' },
  });
}
