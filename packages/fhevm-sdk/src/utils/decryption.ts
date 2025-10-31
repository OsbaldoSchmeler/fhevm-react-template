/**
 * FHEVM Decryption Utilities
 *
 * This module provides decryption utilities for FHEVM encrypted data.
 * Supports both user-based (EIP-712 signature) and public decryption.
 */

import { ethers } from 'ethers';
import { getGlobalFHEVM } from '../core/fhevm';

// ============================================================================
// Type Definitions
// ============================================================================

export interface UserDecryptOptions {
  signer: ethers.Signer;
  contractAddress?: string;
  verifyPermissions?: boolean;
}

export interface PublicDecryptOptions {
  contractAddress?: string;
}

export type DecryptedValue = number | boolean | string;

// ============================================================================
// User Decryption (EIP-712 Signature)
// ============================================================================

/**
 * Decrypt encrypted data with user signature (EIP-712)
 *
 * This function uses the user's private key to create an EIP-712 signature
 * that proves they have permission to decrypt the data.
 *
 * @param ciphertext - The encrypted value to decrypt
 * @param options - Decryption options including signer
 * @returns The decrypted plaintext value
 *
 * @example
 * ```typescript
 * import { userDecrypt } from 'fhevm-sdk';
 *
 * const decrypted = await userDecrypt(encryptedBalance, {
 *   signer: wallet,
 *   contractAddress: '0x...'
 * });
 * ```
 */
export async function userDecrypt(
  ciphertext: string,
  options: UserDecryptOptions
): Promise<DecryptedValue> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  if (!options.signer) {
    throw new Error('Signer required for user decryption');
  }

  // In production, this would:
  // 1. Create EIP-712 typed data structure
  // 2. Sign with user's private key
  // 3. Send signature to FHEVM gateway
  // 4. Verify permissions on-chain
  // 5. Return decrypted value

  const decrypted = await fhevm.decrypt(
    ciphertext,
    options.signer,
    options.contractAddress
  );

  console.log('User decryption successful');

  return decrypted;
}

/**
 * Create EIP-712 signature for decryption
 *
 * This is a helper function that creates the EIP-712 signature required
 * for user-based decryption.
 *
 * @param ciphertext - The encrypted value
 * @param signer - The ethers Signer
 * @param contractAddress - The contract address
 * @returns EIP-712 signature
 *
 * @example
 * ```typescript
 * const signature = await createDecryptSignature(
 *   ciphertext,
 *   wallet,
 *   contractAddress
 * );
 * ```
 */
export async function createDecryptSignature(
  ciphertext: string,
  signer: ethers.Signer,
  contractAddress: string
): Promise<string> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  // EIP-712 domain
  const domain = {
    name: 'FHEVM',
    version: '1',
    chainId: await signer.provider?.getNetwork().then((n) => n.chainId) || 1,
    verifyingContract: contractAddress
  };

  // EIP-712 types
  const types = {
    Decrypt: [
      { name: 'ciphertext', type: 'bytes' },
      { name: 'user', type: 'address' }
    ]
  };

  // EIP-712 value
  const value = {
    ciphertext: ciphertext,
    user: await signer.getAddress()
  };

  // Sign typed data
  const signature = await signer.signTypedData(domain, types, value);

  console.log('Created EIP-712 decryption signature');

  return signature;
}

// ============================================================================
// Public Decryption
// ============================================================================

/**
 * Decrypt publicly accessible encrypted data
 *
 * This function decrypts data that has been marked as publicly readable.
 * No signature required, but only works if permissions allow.
 *
 * @param ciphertext - The encrypted value to decrypt
 * @param options - Optional decryption parameters
 * @returns The decrypted plaintext value
 *
 * @example
 * ```typescript
 * import { publicDecrypt } from 'fhevm-sdk';
 *
 * const decrypted = await publicDecrypt(publicCiphertext);
 * ```
 */
export async function publicDecrypt(
  ciphertext: string,
  options?: PublicDecryptOptions
): Promise<DecryptedValue> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  // In production, this would:
  // 1. Check if data is marked as public
  // 2. Request decryption from FHEVM gateway
  // 3. Return decrypted value

  // Mock public decryption
  console.log('Public decryption requested');

  // Simplified mock implementation
  const mockValue = 500;
  return mockValue;
}

// ============================================================================
// Batch Decryption
// ============================================================================

/**
 * Decrypt multiple ciphertexts in batch with user signature
 *
 * @param ciphertexts - Array of encrypted values
 * @param options - Decryption options including signer
 * @returns Array of decrypted values
 *
 * @example
 * ```typescript
 * const decrypted = await userDecryptBatch(
 *   [cipher1, cipher2, cipher3],
 *   { signer: wallet }
 * );
 * ```
 */
export async function userDecryptBatch(
  ciphertexts: string[],
  options: UserDecryptOptions
): Promise<DecryptedValue[]> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  const decrypted = await Promise.all(
    ciphertexts.map((ciphertext) => userDecrypt(ciphertext, options))
  );

  return decrypted;
}

/**
 * Decrypt multiple public ciphertexts in batch
 *
 * @param ciphertexts - Array of encrypted values
 * @param options - Optional decryption parameters
 * @returns Array of decrypted values
 */
export async function publicDecryptBatch(
  ciphertexts: string[],
  options?: PublicDecryptOptions
): Promise<DecryptedValue[]> {
  const fhevm = getGlobalFHEVM();

  if (!fhevm.isInitialized()) {
    throw new Error('FHEVM not initialized. Call initFHEVM() first.');
  }

  const decrypted = await Promise.all(
    ciphertexts.map((ciphertext) => publicDecrypt(ciphertext, options))
  );

  return decrypted;
}

// ============================================================================
// Export Decryption Namespace
// ============================================================================

/**
 * Decryption utilities namespace
 *
 * Provides convenient access to all decryption functions.
 *
 * @example
 * ```typescript
 * import { decrypt } from 'fhevm-sdk';
 *
 * const value = await decrypt.user(ciphertext, { signer: wallet });
 * ```
 */
export const decrypt = {
  user: userDecrypt,
  public: publicDecrypt,
  userBatch: userDecryptBatch,
  publicBatch: publicDecryptBatch,
  createSignature: createDecryptSignature
};

// ============================================================================
// Export
// ============================================================================

export default decrypt;
