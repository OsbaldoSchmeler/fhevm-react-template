/**
 * FHE Type Definitions
 * Type definitions for Fully Homomorphic Encryption operations
 */

export interface FHEConfig {
  network: 'sepolia' | 'localhost';
  provider?: any;
  contractAddress?: string;
}

export interface EncryptedData {
  ciphertext: string;
  publicKey: string;
  timestamp: number;
}

export interface DecryptedData {
  value: number | string | boolean;
  timestamp: number;
}

export interface FHEOperation {
  type: 'encrypt' | 'decrypt' | 'compute';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  data?: any;
  error?: string;
}

export interface ComputationRequest {
  operation: 'add' | 'sub' | 'mul' | 'div' | 'compare';
  operands: EncryptedData[];
}

export interface ComputationResult {
  result: EncryptedData;
  operation: string;
  timestamp: number;
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
  createdAt: number;
}

export type FHEDataType = 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'bool' | 'address';

export interface EncryptionOptions {
  dataType: FHEDataType;
  publicKey?: string;
}

export interface DecryptionOptions {
  privateKey?: string;
  signature?: string;
}
