/**
 * useFHE Hook
 * Custom hook for FHE operations using FHEVM SDK
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useFHEVM as useSDKFHEVM } from 'fhevm-sdk/react';
import type { FHEConfig } from '@/types/fhe';

export function useFHE(config?: FHEConfig) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use SDK's FHEVM hook
  const { isReady, isInitializing, error: sdkError, init } = useSDKFHEVM(config);

  useEffect(() => {
    setIsInitialized(isReady);
    if (sdkError) {
      setError(sdkError.message);
    }
  }, [isReady, sdkError]);

  const initialize = useCallback(async () => {
    try {
      setError(null);
      await init();
      setIsInitialized(true);
    } catch (err: any) {
      setError(err.message);
      setIsInitialized(false);
    }
  }, [init]);

  return {
    isInitialized,
    isInitializing,
    error,
    initialize,
  };
}
