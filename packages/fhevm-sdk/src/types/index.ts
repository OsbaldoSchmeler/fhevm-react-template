/**
 * FHEVM SDK Type Definitions
 *
 * Complete TypeScript type definitions for the FHEVM SDK.
 * Provides type safety across all SDK functionality.
 */

import { ethers } from 'ethers';

// ============================================================================
// Core Types
// ============================================================================

/**
 * Supported networks for FHEVM
 */
export type FHEVMNetwork = 'sepolia' | 'localhost' | string;

/**
 * FHEVM configuration options
 */
export interface FHEVMConfig {
  network: FHEVMNetwork;
  provider: any; // ethers.Provider or window.ethereum
  contractAddress?: string;
  publicKey?: string;
  gatewayUrl?: string;
}

/**
 * FHEVM instance state
 */
export interface FHEVMInstance {
  initialized: boolean;
  network: string;
  provider: any;
  contractAddress?: string;
  publicKey?: string;
  gatewayUrl?: string;
}

// ============================================================================
// Encryption Types
// ============================================================================

/**
 * Supported encryption types in FHEVM
 */
export type EncryptionType =
  | 'uint8'
  | 'uint16'
  | 'uint32'
  | 'uint64'
  | 'uint128'
  | 'uint256'
  | 'bool'
  | 'address';

/**
 * Options for encryption operations
 */
export interface EncryptOptions {
  publicKey?: string;
  contractAddress?: string;
}

/**
 * Encrypted value (ciphertext)
 */
export type EncryptedValue = string;

/**
 * Encryption result with metadata
 */
export interface EncryptionResult {
  ciphertext: EncryptedValue;
  type: EncryptionType;
  timestamp?: number;
  signature?: string;
}

// ============================================================================
// Decryption Types
// ============================================================================

/**
 * Options for user-based decryption (with signature)
 */
export interface UserDecryptOptions {
  signer: ethers.Signer;
  contractAddress?: string;
  verifyPermissions?: boolean;
}

/**
 * Options for public decryption
 */
export interface PublicDecryptOptions {
  contractAddress?: string;
}

/**
 * Decrypted value (plaintext)
 */
export type DecryptedValue = number | boolean | string;

/**
 * Decryption result with metadata
 */
export interface DecryptionResult {
  value: DecryptedValue;
  type: EncryptionType;
  timestamp?: number;
}

// ============================================================================
// Contract Types
// ============================================================================

/**
 * Configuration for creating FHE-enabled contract
 */
export interface ContractConfig {
  address: string;
  abi: any[];
  provider?: ethers.Provider;
  signer?: ethers.Signer;
}

/**
 * FHE contract instance
 */
export interface FHEContract extends ethers.Contract {
  // Additional FHE-specific methods can be defined here
}

// ============================================================================
// Permission Types
// ============================================================================

/**
 * Permission grant options
 */
export interface PermissionGrantOptions {
  ciphertext: string;
  toAddress: string;
  contractAddress?: string;
  expiresAt?: number;
}

/**
 * Permission revoke options
 */
export interface PermissionRevokeOptions {
  ciphertext: string;
  fromAddress: string;
  contractAddress?: string;
}

/**
 * Permission check result
 */
export interface PermissionStatus {
  hasPermission: boolean;
  address: string;
  ciphertext: string;
  expiresAt?: number;
}

// ============================================================================
// React Hook Types
// ============================================================================

/**
 * Options for useFhevm hook
 */
export interface UseFhevmOptions {
  config?: FHEVMConfig;
  autoInit?: boolean;
}

/**
 * Result from useFhevm hook
 */
export interface UseFhevmResult {
  fhevm: any | null; // FHEVM instance
  isReady: boolean;
  isInitializing: boolean;
  error: Error | null;
  init: (config?: FHEVMConfig) => Promise<void>;
  reset: () => void;
}

/**
 * Result from useEncrypt hook
 */
export interface UseEncryptResult {
  encrypt: {
    uint8: (value: number, options?: EncryptOptions) => Promise<string>;
    uint16: (value: number, options?: EncryptOptions) => Promise<string>;
    uint32: (value: number, options?: EncryptOptions) => Promise<string>;
    uint64: (value: number, options?: EncryptOptions) => Promise<string>;
    bool: (value: boolean, options?: EncryptOptions) => Promise<string>;
    address: (value: string, options?: EncryptOptions) => Promise<string>;
  };
  isEncrypting: boolean;
  error: Error | null;
  encryptUint32: (value: number) => Promise<string | null>;
  encryptUint64: (value: number) => Promise<string | null>;
  encryptBool: (value: boolean) => Promise<string | null>;
}

/**
 * Result from useDecrypt hook
 */
export interface UseDecryptResult {
  decrypt: {
    user: (ciphertext: string, options: UserDecryptOptions) => Promise<number>;
    public: (ciphertext: string) => Promise<number>;
  };
  isDecrypting: boolean;
  error: Error | null;
  decryptUser: (ciphertext: string, options: UserDecryptOptions) => Promise<number | null>;
  decryptPublic: (ciphertext: string) => Promise<number | null>;
}

/**
 * Options for useContract hook
 */
export interface UseContractConfig {
  address: string;
  abi: any[];
  provider: any;
  signer?: ethers.Signer;
}

/**
 * Result from useContract hook
 */
export interface UseContractResult {
  contract: FHEContract | null;
  isLoading: boolean;
  error: Error | null;
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * FHEVM-specific error
 */
export class FHEVMError extends Error {
  code?: string;
  details?: any;

  constructor(message: string, code?: string, details?: any) {
    super(message);
    this.name = 'FHEVMError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Encryption error
 */
export class EncryptionError extends FHEVMError {
  constructor(message: string, details?: any) {
    super(message, 'ENCRYPTION_ERROR', details);
    this.name = 'EncryptionError';
  }
}

/**
 * Decryption error
 */
export class DecryptionError extends FHEVMError {
  constructor(message: string, details?: any) {
    super(message, 'DECRYPTION_ERROR', details);
    this.name = 'DecryptionError';
  }
}

/**
 * Permission error
 */
export class PermissionError extends FHEVMError {
  constructor(message: string, details?: any) {
    super(message, 'PERMISSION_ERROR', details);
    this.name = 'PermissionError';
  }
}

/**
 * Initialization error
 */
export class InitializationError extends FHEVMError {
  constructor(message: string, details?: any) {
    super(message, 'INITIALIZATION_ERROR', details);
    this.name = 'InitializationError';
  }
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Extract the value type from encrypted type
 */
export type PlaintextType<T extends EncryptionType> = T extends 'bool'
  ? boolean
  : T extends 'address'
  ? string
  : number;

/**
 * Async function type
 */
export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

/**
 * Callback type
 */
export type Callback<T = any> = (value: T) => void;

/**
 * Error callback type
 */
export type ErrorCallback = (error: Error) => void;

// ============================================================================
// Event Types
// ============================================================================

/**
 * FHEVM event types
 */
export type FHEVMEventType =
  | 'initialized'
  | 'encryption_start'
  | 'encryption_complete'
  | 'decryption_start'
  | 'decryption_complete'
  | 'permission_granted'
  | 'permission_revoked'
  | 'error';

/**
 * FHEVM event
 */
export interface FHEVMEvent {
  type: FHEVMEventType;
  timestamp: number;
  data?: any;
}

/**
 * Event listener type
 */
export type EventListener = (event: FHEVMEvent) => void;

// ============================================================================
// Export All
// ============================================================================

export default {
  // Re-export all types for default import
};
