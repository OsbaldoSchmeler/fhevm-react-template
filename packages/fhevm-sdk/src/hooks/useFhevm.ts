/**
 * FHEVM React Hooks - useFhevm
 *
 * React hooks for FHEVM integration, following wagmi-like patterns
 */

import { useState, useEffect, useCallback } from 'react';
import { FHEVM, FHEVMConfig } from '../core/fhevm';

// ============================================================================
// useFhevm Hook
// ============================================================================

export interface UseFhevmOptions {
  config?: FHEVMConfig;
  autoInit?: boolean;
}

export interface UseFhevmResult {
  fhevm: FHEVM | null;
  isReady: boolean;
  isInitializing: boolean;
  error: Error | null;
  init: (config?: FHEVMConfig) => Promise<void>;
  reset: () => void;
}

/**
 * Main FHEVM hook for React applications
 *
 * Manages FHEVM initialization and state in React components.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { isReady, init } = useFhevm({
 *     config: {
 *       network: 'sepolia',
 *       provider: window.ethereum
 *     }
 *   });
 *
 *   useEffect(() => {
 *     init();
 *   }, []);
 *
 *   return <div>{isReady ? 'Ready!' : 'Initializing...'}</div>;
 * }
 * ```
 */
export function useFhevm(options?: UseFhevmOptions): UseFhevmResult {
  const [fhevm] = useState<FHEVM>(() => new FHEVM());
  const [isReady, setIsReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const init = useCallback(
    async (providedConfig?: FHEVMConfig) => {
      const configToUse = providedConfig || options?.config;

      if (!configToUse) {
        const err = new Error('FHEVM config required');
        setError(err);
        throw err;
      }

      if (fhevm.isInitialized()) {
        setIsReady(true);
        return;
      }

      try {
        setIsInitializing(true);
        setError(null);

        await fhevm.init(configToUse);

        setIsReady(true);
        setIsInitializing(false);
      } catch (err) {
        const error = err as Error;
        setError(error);
        setIsInitializing(false);
        throw error;
      }
    },
    [fhevm, options?.config]
  );

  const reset = useCallback(() => {
    fhevm.reset();
    setIsReady(false);
    setError(null);
  }, [fhevm]);

  // Auto-initialize if config provided and autoInit is true (default)
  useEffect(() => {
    const shouldAutoInit = options?.autoInit !== false;

    if (options?.config && shouldAutoInit && !isReady && !isInitializing) {
      init().catch((err) => {
        console.error('Auto-initialization failed:', err);
      });
    }
  }, [options?.config, options?.autoInit, isReady, isInitializing, init]);

  return {
    fhevm: isReady ? fhevm : null,
    isReady,
    isInitializing,
    error,
    init,
    reset
  };
}

// ============================================================================
// Export
// ============================================================================

export default useFhevm;
