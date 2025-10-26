/**
 * Encryption API Route
 * API endpoint for encrypting data with FHE
 */

import { NextRequest, NextResponse } from 'next/server';
import { serverEncrypt } from '@/lib/fhe/server';
import { isValidDataType, isValidValueForType } from '@/lib/utils/validation';
import type { ApiResponse, EncryptRequest, EncryptResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: EncryptRequest = await request.json();
    const { value, dataType, publicKey } = body;

    // Validate request
    if (value === undefined || value === null) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Value is required',
        timestamp: Date.now(),
      }, { status: 400 });
    }

    if (!isValidDataType(dataType)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: `Invalid data type: ${dataType}`,
        timestamp: Date.now(),
      }, { status: 400 });
    }

    if (!isValidValueForType(value, dataType)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: `Invalid value for data type ${dataType}`,
        timestamp: Date.now(),
      }, { status: 400 });
    }

    // Perform encryption
    const encrypted = await serverEncrypt(value, dataType);

    const response: EncryptResponse = {
      encrypted,
      publicKey: publicKey || '0xdefault_public_key',
      timestamp: Date.now(),
    };

    return NextResponse.json<ApiResponse<EncryptResponse>>({
      success: true,
      data: response,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    console.error('Encryption error:', error);

    return NextResponse.json<ApiResponse>({
      success: false,
      error: error.message || 'Encryption failed',
      timestamp: Date.now(),
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json<ApiResponse>({
    success: false,
    error: 'POST method required for encryption',
    timestamp: Date.now(),
  }, { status: 405 });
}
