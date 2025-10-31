/**
 * Node.js Adapter for FHEVM SDK
 *
 * Provides Node.js-specific utilities for FHEVM integration.
 * Useful for backend services, CLI tools, and serverless functions.
 */

import { ethers } from 'ethers';
import { FHEVM, FHEVMConfig } from '../core/fhevm';
import { encrypt } from '../utils/encryption';
import { decrypt } from '../utils/decryption';

// ============================================================================
// Node.js Helper Functions
// ============================================================================

/**
 * Initialize FHEVM for Node.js environment
 *
 * @example
 * ```typescript
 * import { initNodeFHEVM } from 'fhevm-sdk/nodejs';
 *
 * const fhevm = await initNodeFHEVM({
 *   network: 'sepolia',
 *   rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY'
 * });
 * ```
 */
export async function initNodeFHEVM(config: {
  network: string;
  rpcUrl: string;
  privateKey?: string;
  contractAddress?: string;
}): Promise<FHEVM> {
  const provider = new ethers.JsonRpcProvider(config.rpcUrl);

  const fhevmConfig: FHEVMConfig = {
    network: config.network,
    provider,
    contractAddress: config.contractAddress
  };

  const fhevm = new FHEVM();
  await fhevm.init(fhevmConfig);

  console.log(`Node.js FHEVM initialized on ${config.network}`);

  return fhevm;
}

/**
 * Create a signer from private key for Node.js
 *
 * @example
 * ```typescript
 * const signer = createNodeSigner(privateKey, provider);
 * ```
 */
export function createNodeSigner(
  privateKey: string,
  provider: ethers.Provider
): ethers.Wallet {
  return new ethers.Wallet(privateKey, provider);
}

/**
 * Encrypt data in Node.js environment
 *
 * @example
 * ```typescript
 * const encrypted = await encryptInNode(1000, 'uint32');
 * ```
 */
export async function encryptInNode(
  value: number | boolean | string,
  type: string
): Promise<string> {
  switch (type) {
    case 'uint8':
      return await encrypt.uint8(value as number);
    case 'uint16':
      return await encrypt.uint16(value as number);
    case 'uint32':
      return await encrypt.uint32(value as number);
    case 'uint64':
      return await encrypt.uint64(value as number);
    case 'bool':
      return await encrypt.bool(value as boolean);
    case 'address':
      return await encrypt.address(value as string);
    default:
      throw new Error(`Unsupported encryption type: ${type}`);
  }
}

/**
 * Decrypt data in Node.js environment
 *
 * @example
 * ```typescript
 * const decrypted = await decryptInNode(ciphertext, signer);
 * ```
 */
export async function decryptInNode(
  ciphertext: string,
  signer: ethers.Signer,
  contractAddress?: string
): Promise<number> {
  return await decrypt.user(ciphertext, { signer, contractAddress });
}

/**
 * Batch encrypt multiple values in Node.js
 *
 * @example
 * ```typescript
 * const encrypted = await batchEncryptInNode([100, 200, 300], 'uint32');
 * ```
 */
export async function batchEncryptInNode(
  values: (number | boolean | string)[],
  type: string
): Promise<string[]> {
  return await Promise.all(values.map((value) => encryptInNode(value, type)));
}

/**
 * Batch decrypt multiple ciphertexts in Node.js
 *
 * @example
 * ```typescript
 * const decrypted = await batchDecryptInNode(ciphertexts, signer);
 * ```
 */
export async function batchDecryptInNode(
  ciphertexts: string[],
  signer: ethers.Signer,
  contractAddress?: string
): Promise<number[]> {
  return await Promise.all(
    ciphertexts.map((ciphertext) => decryptInNode(ciphertext, signer, contractAddress))
  );
}

// ============================================================================
// CLI Utilities
// ============================================================================

/**
 * Parse command-line arguments for FHEVM configuration
 *
 * @example
 * ```typescript
 * const config = parseNodeConfig(process.argv);
 * ```
 */
export function parseNodeConfig(args: string[]): Partial<FHEVMConfig> {
  const config: Partial<FHEVMConfig> = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--network' && args[i + 1]) {
      config.network = args[i + 1];
    }
    if (args[i] === '--contract' && args[i + 1]) {
      config.contractAddress = args[i + 1];
    }
  }

  return config;
}

/**
 * Load FHEVM configuration from environment variables
 *
 * @example
 * ```typescript
 * const config = loadNodeConfigFromEnv();
 * ```
 */
export function loadNodeConfigFromEnv(): Partial<FHEVMConfig> {
  return {
    network: process.env.FHEVM_NETWORK || 'sepolia',
    contractAddress: process.env.FHEVM_CONTRACT_ADDRESS,
    publicKey: process.env.FHEVM_PUBLIC_KEY
  };
}

// ============================================================================
// Export
// ============================================================================

export default {
  initNodeFHEVM,
  createNodeSigner,
  encryptInNode,
  decryptInNode,
  batchEncryptInNode,
  batchDecryptInNode,
  parseNodeConfig,
  loadNodeConfigFromEnv
};
