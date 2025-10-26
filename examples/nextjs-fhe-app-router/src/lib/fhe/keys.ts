/**
 * FHE Key Management
 * Utilities for managing FHE encryption keys
 */

import type { KeyPair } from './types';

/**
 * Generate a new FHE key pair
 */
export async function generateKeyPair(): Promise<KeyPair> {
  // In production, this would use actual FHE key generation
  const timestamp = Date.now();
  const publicKey = `0x${Buffer.from(`public_${timestamp}`).toString('hex')}`;
  const privateKey = `0x${Buffer.from(`private_${timestamp}`).toString('hex')}`;

  return {
    publicKey,
    privateKey,
    createdAt: timestamp,
  };
}

/**
 * Store key pair securely
 * Note: In production, use secure key storage
 */
export function storeKeyPair(keyPair: KeyPair): void {
  if (typeof window === 'undefined') {
    // Server-side: should use secure storage
    console.warn('⚠️ Server-side key storage not implemented');
    return;
  }

  // Client-side: store in sessionStorage (not recommended for production)
  try {
    sessionStorage.setItem('fhe_public_key', keyPair.publicKey);
    // Never store private keys in browser storage in production!
    console.log('🔑 Key pair stored (demo only)');
  } catch (error) {
    console.error('Failed to store key pair:', error);
  }
}

/**
 * Retrieve stored key pair
 */
export function getStoredKeyPair(): Partial<KeyPair> | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const publicKey = sessionStorage.getItem('fhe_public_key');
    if (!publicKey) {
      return null;
    }

    return { publicKey };
  } catch (error) {
    console.error('Failed to retrieve key pair:', error);
    return null;
  }
}

/**
 * Clear stored keys
 */
export function clearStoredKeys(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    sessionStorage.removeItem('fhe_public_key');
    console.log('🗑️ Stored keys cleared');
  } catch (error) {
    console.error('Failed to clear keys:', error);
  }
}

/**
 * Validate public key format
 */
export function isValidPublicKey(publicKey: string): boolean {
  return typeof publicKey === 'string' && publicKey.startsWith('0x') && publicKey.length > 10;
}
