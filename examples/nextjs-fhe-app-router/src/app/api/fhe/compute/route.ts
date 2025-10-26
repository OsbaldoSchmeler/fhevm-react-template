/**
 * Computation API Route
 * API endpoint for homomorphic computation on encrypted data
 */

import { NextRequest, NextResponse } from 'next/server';
import { serverCompute, validateComputeRequest } from '@/lib/fhe/server';
import type { ApiResponse, ComputeRequest, ComputeResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: ComputeRequest = await request.json();

    // Validate request
    if (!validateComputeRequest(body)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid computation request',
        timestamp: Date.now(),
      }, { status: 400 });
    }

    const { operation, operands } = body;

    // Validate number of operands for operation
    if (operation === 'not' && operands.length !== 1) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'NOT operation requires exactly 1 operand',
        timestamp: Date.now(),
      }, { status: 400 });
    }

    if (['add', 'sub', 'mul', 'div', 'gt', 'lt', 'eq', 'and', 'or'].includes(operation) && operands.length < 2) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: `${operation.toUpperCase()} operation requires at least 2 operands`,
        timestamp: Date.now(),
      }, { status: 400 });
    }

    // Perform computation
    const result = await serverCompute(body);

    const response: ComputeResponse = {
      result,
      operation,
      timestamp: Date.now(),
    };

    return NextResponse.json<ApiResponse<ComputeResponse>>({
      success: true,
      data: response,
      timestamp: Date.now(),
    });
  } catch (error: any) {
    console.error('Computation error:', error);

    return NextResponse.json<ApiResponse>({
      success: false,
      error: error.message || 'Computation failed',
      timestamp: Date.now(),
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json<ApiResponse>({
    success: false,
    error: 'POST method required for computation',
    timestamp: Date.now(),
  }, { status: 405 });
}
