/**
 * FHEVM SDK - React Hooks
 *
 * wagmi-like hooks for React applications
 */

import { useState, useEffect, useCallback } from 'react';
import { initFHEVM, encrypt, decrypt, isInitialized, FHEVMConfig, DecryptOptions } from './index';

// ============================================================================
// useFHEVM Hook
// ============================================================================

export interface UseFHEVMResult {
  isReady: boolean;
  isInitializing: boolean;
  error: Error | null;
  init: () => Promise<void>;
}

/**
 * Main FHEVM hook - Initialize and manage SDK state
 *
 * @example
 * ```tsx
 * function App() {
 *   const { isReady, init } = useFHEVM({ network: 'sepolia' });
 *
 *   useEffect(() => {
 *     init();
 *   }, []);
 *
 *   return <div>{isReady ? 'Ready!' : 'Initializing...'}</div>;
 * }
 * ```
 */
export function useFHEVM(config?: FHEVMConfig): UseFHEVMResult {
  const [isReady, setIsReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const init = useCallback(async () => {
    if (isInitialized()) {
      setIsReady(true);
      return;
    }

    if (!config) {
      setError(new Error('FHEVM config required'));
      return;
    }

    try {
      setIsInitializing(true);
      setError(null);

      await initFHEVM(config);

      setIsReady(true);
      setIsInitializing(false);
    } catch (err) {
      setError(err as Error);
      setIsInitializing(false);
    }
  }, [config]);

  // Auto-initialize on mount if config provided
  useEffect(() => {
    if (config && !isReady && !isInitializing) {
      init();
    }
  }, [config, isReady, isInitializing, init]);

  return {
    isReady,
    isInitializing,
    error,
    init
  };
}

// ============================================================================
// useEncrypt Hook
// ============================================================================

export interface UseEncryptResult {
  encrypt: typeof encrypt;
  isEncrypting: boolean;
  error: Error | null;
  encryptUint32: (value: number) => Promise<string | null>;
  encryptUint64: (value: number) => Promise<string | null>;
  encryptBool: (value: boolean) => Promise<string | null>;
}

/**
 * Encryption hook with loading states
 *
 * @example
 * ```tsx
 * function EncryptForm() {
 *   const { encryptUint32, isEncrypting } = useEncrypt();
 *   const [value, setValue] = useState(0);
 *
 *   const handleEncrypt = async () => {
 *     const encrypted = await encryptUint32(value);
 *     console.log('Encrypted:', encrypted);
 *   };
 *
 *   return (
 *     <button onClick={handleEncrypt} disabled={isEncrypting}>
 *       Encrypt
 *     </button>
 *   );
 * }
 * ```
 */
export function useEncrypt(): UseEncryptResult {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptUint32 = useCallback(async (value: number): Promise<string | null> => {
    try {
      setIsEncrypting(true);
      setError(null);

      const result = await encrypt.uint32(value);

      setIsEncrypting(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsEncrypting(false);
      return null;
    }
  }, []);

  const encryptUint64 = useCallback(async (value: number): Promise<string | null> => {
    try {
      setIsEncrypting(true);
      setError(null);

      const result = await encrypt.uint64(value);

      setIsEncrypting(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsEncrypting(false);
      return null;
    }
  }, []);

  const encryptBool = useCallback(async (value: boolean): Promise<string | null> => {
    try {
      setIsEncrypting(true);
      setError(null);

      const result = await encrypt.bool(value);

      setIsEncrypting(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsEncrypting(false);
      return null;
    }
  }, []);

  return {
    encrypt,
    isEncrypting,
    error,
    encryptUint32,
    encryptUint64,
    encryptBool
  };
}

// ============================================================================
// useDecrypt Hook
// ============================================================================

export interface UseDecryptResult {
  decrypt: typeof decrypt;
  isDecrypting: boolean;
  error: Error | null;
  decryptUser: (ciphertext: string, options: DecryptOptions) => Promise<number | null>;
  decryptPublic: (ciphertext: string) => Promise<number | null>;
}

/**
 * Decryption hook with loading states
 *
 * @example
 * ```tsx
 * function DecryptButton({ ciphertext, signer }) {
 *   const { decryptUser, isDecrypting } = useDecrypt();
 *   const [value, setValue] = useState<number | null>(null);
 *
 *   const handleDecrypt = async () => {
 *     const result = await decryptUser(ciphertext, { signer });
 *     setValue(result);
 *   };
 *
 *   return (
 *     <button onClick={handleDecrypt} disabled={isDecrypting}>
 *       {isDecrypting ? 'Decrypting...' : 'Decrypt'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useDecrypt(): UseDecryptResult {
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decryptUser = useCallback(
    async (ciphertext: string, options: DecryptOptions): Promise<number | null> => {
      try {
        setIsDecrypting(true);
        setError(null);

        const result = await decrypt.user(ciphertext, options);

        setIsDecrypting(false);
        return result;
      } catch (err) {
        setError(err as Error);
        setIsDecrypting(false);
        return null;
      }
    },
    []
  );

  const decryptPublic = useCallback(async (ciphertext: string): Promise<number | null> => {
    try {
      setIsDecrypting(true);
      setError(null);

      const result = await decrypt.public(ciphertext);

      setIsDecrypting(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsDecrypting(false);
      return null;
    }
  }, []);

  return {
    decrypt,
    isDecrypting,
    error,
    decryptUser,
    decryptPublic
  };
}

// ============================================================================
// useContract Hook
// ============================================================================

export interface UseContractConfig {
  address: string;
  abi: any[];
  provider: any;
}

export interface UseContractResult {
  contract: any | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Contract interaction hook
 *
 * @example
 * ```tsx
 * function ContractInteraction() {
 *   const { contract, isLoading } = useContract({
 *     address: '0x...',
 *     abi: MyContractABI,
 *     provider: provider
 *   });
 *
 *   if (isLoading) return <div>Loading contract...</div>;
 *
 *   return <button onClick={() => contract.myFunction()}>Call</button>;
 * }
 * ```
 */
export function useContract(config: UseContractConfig): UseContractResult {
  const [contract, setContract] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadContract() {
      try {
        setIsLoading(true);
        setError(null);

        const { createFHEContract } = await import('./index');
        const contractInstance = await createFHEContract(config);

        setContract(contractInstance);
        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    }

    loadContract();
  }, [config.address, config.abi, config.provider]);

  return {
    contract,
    isLoading,
    error
  };
}
