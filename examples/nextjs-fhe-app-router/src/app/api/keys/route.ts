/**
 * Keys Management API Route
 * API endpoint for FHE key generation and management
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateKeys } from '@/lib/fhe/server';
import type { ApiResponse, KeysResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    // Generate new FHE keys
    const { publicKey, keyId } = await generateKeys();

    const response: KeysResponse = {
      publicKey,
      keyId,
      timestamp: Date.now(),
    };

    return NextResponse.json<ApiResponse<KeysResponse>>({
      success: true,
      data: response,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    console.error('Key generation error:', error);

    return NextResponse.json<ApiResponse>({
      success: false,
      error: error.message || 'Key generation failed',
      timestamp: Date.now(),
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // Return information about key management
  return NextResponse.json<ApiResponse>({
    success: true,
    data: {
      message: 'FHE Key Management API',
      description: 'Use POST to generate new key pairs',
      note: 'In production, implement proper key storage and retrieval',
    },
    timestamp: Date.now(),
  });
}
