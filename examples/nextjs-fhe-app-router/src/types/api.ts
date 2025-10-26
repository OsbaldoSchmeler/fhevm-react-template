/**
 * API Type Definitions
 * Type definitions for API requests and responses
 */

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

export interface EncryptRequest {
  value: number | string | boolean;
  dataType: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'uint128' | 'uint256' | 'bool' | 'address';
  publicKey?: string;
}

export interface EncryptResponse {
  encrypted: string;
  publicKey: string;
  timestamp: number;
}

export interface DecryptRequest {
  ciphertext: string;
  privateKey?: string;
  signature?: string;
}

export interface DecryptResponse {
  decrypted: number | string | boolean;
  timestamp: number;
}

export interface ComputeRequest {
  operation: 'add' | 'sub' | 'mul' | 'div' | 'gt' | 'lt' | 'eq' | 'and' | 'or' | 'not';
  operands: string[];
}

export interface ComputeResponse {
  result: string;
  operation: string;
  timestamp: number;
}

export interface KeysResponse {
  publicKey: string;
  keyId: string;
  timestamp: number;
}
