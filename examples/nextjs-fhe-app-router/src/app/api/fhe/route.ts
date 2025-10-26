/**
 * FHE Operations API
 * Main API route for FHE operations
 */

import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/api';

export async function GET(request: NextRequest) {
  const response: ApiResponse = {
    success: true,
    data: {
      message: 'FHE API is running',
      version: '1.0.0',
      endpoints: [
        '/api/fhe/encrypt',
        '/api/fhe/decrypt',
        '/api/fhe/compute',
        '/api/keys',
      ],
    },
    timestamp: Date.now(),
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const response: ApiResponse = {
    success: false,
    error: 'Use specific endpoints for FHE operations',
    timestamp: Date.now(),
  };

  return NextResponse.json(response, { status: 400 });
}
