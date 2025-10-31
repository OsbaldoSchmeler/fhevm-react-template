# FHEVM SDK

**Universal Privacy-Preserving Development Kit for Zama's FHEVM**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![FHEVM](https://img.shields.io/badge/FHEVM-Zama-purple.svg)](https://www.zama.ai/)
[![Framework](https://img.shields.io/badge/framework-agnostic-green.svg)]()

A comprehensive SDK for building privacy-preserving decentralized applications using Fully Homomorphic Encryption (FHE) with Zama's FHEVM. Framework-agnostic and developer-friendly.

## Features

- **Framework-Agnostic Core** - Works with Node.js, React, Vue, Next.js, or any JavaScript environment
- **wagmi-like API** - Intuitive hooks and utilities familiar to web3 developers
- **Complete FHE Workflow** - Initialization, encryption, decryption, and contract interaction
- **TypeScript Support** - Full type definitions for type-safe development
- **React Hooks** - Ready-to-use hooks for React/Next.js applications
- **Vue Composables** - Composition API support for Vue 3 applications
- **Node.js Support** - Backend services, CLI tools, and serverless functions

## Installation

```bash
npm install fhevm-sdk
```

## Quick Start

### Node.js / Vanilla JavaScript

```javascript
import { initFHEVM, encrypt, decrypt } from 'fhevm-sdk';

// Initialize FHEVM
await initFHEVM({
  network: 'sepolia',
  provider: window.ethereum
});

// Encrypt data
const encrypted = await encrypt.uint32(1000);

// Send to contract
await contract.submitData(encrypted);

// Decrypt result (with EIP-712 signature)
const decrypted = await decrypt.user(result, { signer: wallet });
```

### React / Next.js

```tsx
import { useFHEVM, useEncrypt, useDecrypt } from 'fhevm-sdk/react';

function App() {
  const { isReady } = useFHEVM({
    config: { network: 'sepolia', provider: window.ethereum }
  });

  const { encryptUint32, isEncrypting } = useEncrypt();
  const { decryptUser } = useDecrypt();

  const handleEncrypt = async () => {
    const encrypted = await encryptUint32(1000);
    await contract.submitData(encrypted);
  };

  return (
    <button onClick={handleEncrypt} disabled={!isReady || isEncrypting}>
      Encrypt & Submit
    </button>
  );
}
```

### Vue 3

```vue
<script setup>
import { useFhevm, useEncrypt } from 'fhevm-sdk/vue';

const { isReady } = useFhevm({
  network: 'sepolia',
  provider: window.ethereum
});

const { encryptUint32, isEncrypting } = useEncrypt();

const handleEncrypt = async () => {
  const encrypted = await encryptUint32(1000);
  // Use encrypted data
};
</script>

<template>
  <button @click="handleEncrypt" :disabled="!isReady || isEncrypting">
    Encrypt Data
  </button>
</template>
```

## Package Structure

```
fhevm-sdk/
├── src/
│   ├── core/              # Core FHEVM implementation
│   │   └── fhevm.ts       # Main FHEVM class
│   ├── hooks/             # React hooks
│   │   └── useFhevm.ts    # Main React hook
│   ├── adapters/          # Framework adapters
│   │   ├── react.ts       # React adapter
│   │   ├── vue.ts         # Vue adapter
│   │   └── nodejs.ts      # Node.js adapter
│   ├── utils/             # Utility functions
│   │   ├── encryption.ts  # Encryption utilities
│   │   └── decryption.ts  # Decryption utilities
│   ├── types/             # TypeScript definitions
│   │   └── index.ts       # Type definitions
│   ├── index.ts           # Main entry (framework-agnostic)
│   └── react.tsx          # React exports
├── package.json
├── tsconfig.json
└── README.md
```

## API Reference

### Core Functions

#### `initFHEVM(config: FHEVMConfig): Promise<void>`

Initialize the FHEVM SDK with configuration.

```typescript
await initFHEVM({
  network: 'sepolia',           // or 'localhost'
  provider: window.ethereum,    // or ethers provider
  contractAddress?: string      // optional
});
```

#### `isInitialized(): boolean`

Check if FHEVM is initialized.

```typescript
if (isInitialized()) {
  // SDK is ready to use
}
```

### Encryption

#### `encrypt.uint32(value: number): Promise<string>`

Encrypt a 32-bit unsigned integer.

```typescript
const encrypted = await encrypt.uint32(1000);
```

#### `encrypt.uint64(value: number): Promise<string>`

Encrypt a 64-bit unsigned integer.

#### `encrypt.bool(value: boolean): Promise<string>`

Encrypt a boolean value.

#### `encrypt.address(value: string): Promise<string>`

Encrypt an Ethereum address.

### Decryption

#### `decrypt.user(ciphertext: string, options: UserDecryptOptions): Promise<number>`

Decrypt with user signature (EIP-712).

```typescript
const value = await decrypt.user(ciphertext, {
  signer: wallet,
  contractAddress: '0x...'
});
```

#### `decrypt.public(ciphertext: string): Promise<number>`

Public decryption (if permitted).

```typescript
const value = await decrypt.public(ciphertext);
```

### React Hooks

#### `useFHEVM(options?: UseFhevmOptions): UseFhevmResult`

Main FHEVM hook for React applications.

```typescript
const { fhevm, isReady, isInitializing, error, init, reset } = useFHEVM({
  config: {
    network: 'sepolia',
    provider: window.ethereum
  }
});
```

#### `useEncrypt(): UseEncryptResult`

Encryption hook with loading states.

```typescript
const { encryptUint32, isEncrypting, error } = useEncrypt();
```

#### `useDecrypt(): UseDecryptResult`

Decryption hook with loading states.

```typescript
const { decryptUser, isDecrypting, error } = useDecrypt();
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import type {
  FHEVMConfig,
  EncryptOptions,
  UserDecryptOptions,
  EncryptedValue,
  DecryptedValue
} from 'fhevm-sdk';
```

## Examples

See the parent repository for complete examples:

- **Next.js Example**: `examples/nextjs-water-resource-management/`
- **Next.js App Router**: `examples/nextjs-fhe-app-router/`
- **Vanilla HTML/JS**: `examples/water-resource-management/`

## Smart Contract Integration

```solidity
import { FHE, euint32 } from "@fhevm/solidity/lib/FHE.sol";

contract MyContract {
    mapping(address => euint32) private balances;

    function deposit(euint32 encryptedAmount) external {
        balances[msg.sender] = encryptedAmount;
        FHE.allowThis(encryptedAmount);
        FHE.allow(encryptedAmount, msg.sender);
    }

    function getBalance() external view returns (euint32) {
        return balances[msg.sender];
    }
}
```

## Node.js Usage

```typescript
import { initNodeFHEVM, encryptInNode, decryptInNode } from 'fhevm-sdk/nodejs';

// Initialize for Node.js
const fhevm = await initNodeFHEVM({
  network: 'sepolia',
  rpcUrl: 'https://sepolia.infura.io/v3/YOUR_KEY',
  privateKey: process.env.PRIVATE_KEY
});

// Encrypt
const encrypted = await encryptInNode(1000, 'uint32');

// Decrypt
const decrypted = await decryptInNode(encrypted, signer);
```

## License

MIT License - see LICENSE file for details.

## Resources

- **Main Repository**: [fhevm-react-template](https://github.com/OsbaldoSchmeler/fhevm-react-template)
- **Zama FHEVM**: [https://github.com/zama-ai/fhevm](https://github.com/zama-ai/fhevm)
- **Documentation**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- **Live Demo**: [https://fhe-water-resource-manager.vercel.app/](https://fhe-water-resource-manager.vercel.app/)

## Support

For issues and questions, please visit:
- GitHub Issues: [https://github.com/OsbaldoSchmeler/fhevm-react-template/issues](https://github.com/OsbaldoSchmeler/fhevm-react-template/issues)
