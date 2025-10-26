/**
 * Decryption API Route
 * API endpoint for decrypting FHE data
 */

import { NextRequest, NextResponse } from 'next/server';
import { serverDecrypt } from '@/lib/fhe/server';
import { isValidEncryptedData } from '@/lib/utils/validation';
import type { ApiResponse, DecryptRequest, DecryptResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: DecryptRequest = await request.json();
    const { ciphertext, privateKey, signature } = body;

    // Validate request
    if (!ciphertext) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Ciphertext is required',
        timestamp: Date.now(),
      }, { status: 400 });
    }

    if (!isValidEncryptedData(ciphertext)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid ciphertext format',
        timestamp: Date.now(),
      }, { status: 400 });
    }

    // In production, validate authorization/signature here
    if (!privateKey && !signature) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Authorization required (private key or signature)',
        timestamp: Date.now(),
      }, { status: 401 });
    }

    // Perform decryption
    const decrypted = await serverDecrypt(ciphertext, privateKey);

    const response: DecryptResponse = {
      decrypted,
      timestamp: Date.now(),
    };

    return NextResponse.json<ApiResponse<DecryptResponse>>({
      success: true,
      data: response,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    console.error('Decryption error:', error);

    return NextResponse.json<ApiResponse>({
      success: false,
      error: error.message || 'Decryption failed',
      timestamp: Date.now(),
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json<ApiResponse>({
    success: false,
    error: 'POST method required for decryption',
    timestamp: Date.now(),
  }, { status: 405 });
}
