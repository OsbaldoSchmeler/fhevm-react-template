/**
 * FHE Provider Component
 * Context provider for FHE operations
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useFHEVM } from 'fhevm-sdk/react';

interface FHEContextValue {
  isReady: boolean;
  isInitializing: boolean;
  error: string | null;
  initialize: () => Promise<void>;
}

const FHEContext = createContext<FHEContextValue | undefined>(undefined);

export function useFHEContext() {
  const context = useContext(FHEContext);
  if (!context) {
    throw new Error('useFHEContext must be used within FHEProvider');
  }
  return context;
}

interface FHEProviderProps {
  children: React.ReactNode;
}

export function FHEProvider({ children }: FHEProviderProps) {
  const [error, setError] = useState<string | null>(null);

  const { isReady, isInitializing, error: sdkError, init } = useFHEVM({
    network: 'sepolia',
    provider: typeof window !== 'undefined' ? (window as any).ethereum : null,
  });

  useEffect(() => {
    if (sdkError) {
      setError(sdkError.message);
    }
  }, [sdkError]);

  const initialize = useCallback(async () => {
    try {
      setError(null);
      await init();
    } catch (err: any) {
      setError(err.message);
    }
  }, [init]);

  const value: FHEContextValue = {
    isReady,
    isInitializing,
    error,
    initialize,
  };

  return <FHEContext.Provider value={value}>{children}</FHEContext.Provider>;
}
