/**
 * useEncryption Hook
 * Custom hook for encryption operations
 */

'use client';

import { useState, useCallback } from 'react';
import { useEncrypt } from 'fhevm-sdk/react';
import type { EncryptRequest, EncryptResponse, ApiResponse } from '@/types/api';

export function useEncryption() {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use SDK's encryption hook
  const { encryptUint32, encryptUint64, encryptBool, isEncrypting: sdkEncrypting } = useEncrypt();

  /**
   * Encrypt data using SDK
   */
  const encryptWithSDK = useCallback(async (
    value: number | string | boolean,
    dataType: string
  ): Promise<string | null> => {
    try {
      setIsEncrypting(true);
      setError(null);

      let encrypted: string | null = null;

      switch (dataType) {
        case 'uint32':
          encrypted = await encryptUint32(value as number);
          break;
        case 'uint64':
          encrypted = await encryptUint64(value as number);
          break;
        case 'bool':
          encrypted = await encryptBool(value as boolean);
          break;
        default:
          throw new Error(`Unsupported data type: ${dataType}`);
      }

      setIsEncrypting(false);
      return encrypted;
    } catch (err: any) {
      setError(err.message);
      setIsEncrypting(false);
      return null;
    }
  }, [encryptUint32, encryptUint64, encryptBool]);

  /**
   * Encrypt data using API
   */
  const encryptWithAPI = useCallback(async (request: EncryptRequest): Promise<EncryptResponse | null> => {
    try {
      setIsEncrypting(true);
      setError(null);

      const response = await fetch('/api/fhe/encrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      const result: ApiResponse<EncryptResponse> = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Encryption failed');
      }

      setIsEncrypting(false);
      return result.data;
    } catch (err: any) {
      setError(err.message);
      setIsEncrypting(false);
      return null;
    }
  }, []);

  return {
    isEncrypting: isEncrypting || sdkEncrypting,
    error,
    encryptWithSDK,
    encryptWithAPI,
  };
}
