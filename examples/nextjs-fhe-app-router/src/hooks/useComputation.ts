/**
 * useComputation Hook
 * Custom hook for homomorphic computation operations
 */

'use client';

import { useState, useCallback } from 'react';
import type { ComputeRequest, ComputeResponse, ApiResponse } from '@/types/api';

export function useComputation() {
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  /**
   * Perform computation on encrypted data
   */
  const compute = useCallback(async (request: ComputeRequest): Promise<ComputeResponse | null> => {
    try {
      setIsComputing(true);
      setError(null);
      setResult(null);

      const response = await fetch('/api/fhe/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const apiResponse: ApiResponse<ComputeResponse> = await response.json();

      if (!apiResponse.success || !apiResponse.data) {
        throw new Error(apiResponse.error || 'Computation failed');
      }

      setResult(apiResponse.data.result);
      setIsComputing(false);
      return apiResponse.data;
    } catch (err: any) {
      setError(err.message);
      setIsComputing(false);
      return null;
    }
  }, []);

  /**
   * Compute addition on encrypted values
   */
  const add = useCallback(async (operands: string[]): Promise<string | null> => {
    const response = await compute({ operation: 'add', operands });
    return response?.result || null;
  }, [compute]);

  /**
   * Compute subtraction on encrypted values
   */
  const subtract = useCallback(async (operands: string[]): Promise<string | null> => {
    const response = await compute({ operation: 'sub', operands });
    return response?.result || null;
  }, [compute]);

  /**
   * Compute multiplication on encrypted values
   */
  const multiply = useCallback(async (operands: string[]): Promise<string | null> => {
    const response = await compute({ operation: 'mul', operands });
    return response?.result || null;
  }, [compute]);

  /**
   * Compare encrypted values
   */
  const compare = useCallback(async (operation: 'gt' | 'lt' | 'eq', operands: string[]): Promise<string | null> => {
    const response = await compute({ operation, operands });
    return response?.result || null;
  }, [compute]);

  /**
   * Clear computation result
   */
  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    isComputing,
    error,
    result,
    compute,
    add,
    subtract,
    multiply,
    compare,
    clear,
  };
}
