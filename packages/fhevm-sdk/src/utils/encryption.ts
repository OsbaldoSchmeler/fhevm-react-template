/**
 * FHEVM Encryption Utilities
 *
 * This module provides encryption utilities for FHEVM data types.
 * Framework-agnostic and can be used in any JavaScript/TypeScript environment.
 */

import { getGlobalFHEVM } from '../core/fhevm';

// ============================================================================
// Type Definitions
// ============================================================================

export interface EncryptOptions {
  publicKey?: string;
  contractAddress?: string;
}

export type EncryptedValue = string;

// ============================================================================
// Encryption Functions
// ============================================================================

/**
 * Encrypt a 8-bit unsigned integer
 *
 * @param value - The value to encrypt (0-255)
 * @param options - Optional encryption parameters
 * @returns Encrypted ciphertext as hex string
 *
 * @example
 * ```typescript
 * const encrypted = await encryptUint8(42);
 * await contract.submitData(encrypted);
 * ```
 */
export async function encryptUint8(
  value: number,
  options?: EncryptOptions
): Promise<EncryptedValue> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  if (value < 0 || value > 255) {
    throw new Error('Value must be between 0 and 255 for uint8');
  }

  return await fhevm.encrypt(value, 'uint8');
}

/**
 * Encrypt a 16-bit unsigned integer
 *
 * @param value - The value to encrypt (0-65535)
 * @param options - Optional encryption parameters
 * @returns Encrypted ciphertext as hex string
 */
export async function encryptUint16(
  value: number,
  options?: EncryptOptions
): Promise<EncryptedValue> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  if (value < 0 || value > 65535) {
    throw new Error('Value must be between 0 and 65535 for uint16');
  }

  return await fhevm.encrypt(value, 'uint16');
}

/**
 * Encrypt a 32-bit unsigned integer
 *
 * @param value - The value to encrypt (0-4294967295)
 * @param options - Optional encryption parameters
 * @returns Encrypted ciphertext as hex string
 *
 * @example
 * ```typescript
 * const encrypted = await encryptUint32(1000);
 * await contract.deposit(encrypted);
 * ```
 */
export async function encryptUint32(
  value: number,
  options?: EncryptOptions
): Promise<EncryptedValue> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  if (value < 0 || value > 4294967295) {
    throw new Error('Value must be between 0 and 4294967295 for uint32');
  }

  return await fhevm.encrypt(value, 'uint32');
}

/**
 * Encrypt a 64-bit unsigned integer
 *
 * @param value - The value to encrypt
 * @param options - Optional encryption parameters
 * @returns Encrypted ciphertext as hex string
 */
export async function encryptUint64(
  value: number,
  options?: EncryptOptions
): Promise<EncryptedValue> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  return await fhevm.encrypt(value, 'uint64');
}

/**
 * Encrypt a boolean value
 *
 * @param value - The boolean value to encrypt
 * @param options - Optional encryption parameters
 * @returns Encrypted ciphertext as hex string
 *
 * @example
 * ```typescript
 * const encrypted = await encryptBool(true);
 * await contract.setFlag(encrypted);
 * ```
 */
export async function encryptBool(
  value: boolean,
  options?: EncryptOptions
): Promise<EncryptedValue> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  return await fhevm.encrypt(value, 'bool');
}

/**
 * Encrypt an Ethereum address
 *
 * @param value - The address to encrypt (0x...)
 * @param options - Optional encryption parameters
 * @returns Encrypted ciphertext as hex string
 *
 * @example
 * ```typescript
 * const encrypted = await encryptAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
 * await contract.setRecipient(encrypted);
 * ```
 */
export async function encryptAddress(
  value: string,
  options?: EncryptOptions
): Promise<EncryptedValue> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new Error('Invalid Ethereum address format');
  }

  return await fhevm.encrypt(value, 'address');
}

// ============================================================================
// Batch Encryption
// ============================================================================

/**
 * Encrypt multiple values in batch
 *
 * @param values - Array of values to encrypt
 * @param type - The encryption type for all values
 * @param options - Optional encryption parameters
 * @returns Array of encrypted ciphertexts
 *
 * @example
 * ```typescript
 * const encrypted = await encryptBatch([100, 200, 300], 'uint32');
 * ```
 */
export async function encryptBatch(
  values: (number | boolean | string)[],
  type: 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'bool' | 'address',
  options?: EncryptOptions
): Promise<EncryptedValue[]> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  const encryptedValues = await Promise.all(
    values.map((value) => fhevm.encrypt(value, type))
  );

  return encryptedValues;
}

// ============================================================================
// Export Encryption Namespace
// ============================================================================

/**
 * Encryption utilities namespace
 *
 * Provides convenient access to all encryption functions.
 *
 * @example
 * ```typescript
 * import { encrypt } from 'fhevm-sdk';
 *
 * const encrypted = await encrypt.uint32(1000);
 * ```
 */
export const encrypt = {
  uint8: encryptUint8,
  uint16: encryptUint16,
  uint32: encryptUint32,
  uint64: encryptUint64,
  bool: encryptBool,
  address: encryptAddress,
  batch: encryptBatch
};

// ============================================================================
// Export
// ============================================================================

export default encrypt;
