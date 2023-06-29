// 3rd party
import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/users
 */

export async function GET(request: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ ok: true });
}
