# 🔐 FHEVM SDK - Universal Privacy-Preserving Development Kit

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![FHEVM](https://img.shields.io/badge/FHEVM-Zama-purple.svg)](https://www.zama.ai/)
[![Framework](https://img.shields.io/badge/framework-agnostic-green.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)

A **universal SDK** for building privacy-preserving decentralized applications using **Fully Homomorphic Encryption (FHE)** with Zama's FHEVM. Framework-agnostic and developer-friendly, designed to make confidential smart contract development simple and intuitive.

🌐 **[Live Demo](https://fhe-water-resource-manager.vercel.app/)** | 📖 **[Documentation](docs/)** | 🎥 **[Download Demo Video](demo.mp4)**

**GitHub Repository**: [https://github.com/OsbaldoSchmeler/fhevm-react-template](https://github.com/OsbaldoSchmeler/fhevm-react-template)

**Example Application**: [https://github.com/OsbaldoSchmeler/FHEWaterResourceManager](https://github.com/OsbaldoSchmeler/FHEWaterResourceManager)

---

## 🔐 Core FHE Concepts

### What is Fully Homomorphic Encryption (FHE)?

**Fully Homomorphic Encryption (FHE)** is a revolutionary cryptographic technology that allows computations to be performed directly on encrypted data without decrypting it. This means:

- ✅ **Privacy-Preserving Computation** - Process sensitive data while keeping it encrypted
- ✅ **Zero-Knowledge Processing** - Perform calculations without revealing input values
- ✅ **Transparent Verification** - Results are verifiable without exposing private data
- ✅ **Trustless Operations** - No need to trust intermediaries with plaintext data

### Why FHEVM SDK?

Traditional blockchain applications expose all data on-chain, creating privacy concerns. **FHEVM SDK** leverages Zama's FHEVM to enable:

**🔒 Private Smart Contracts**
- Execute logic on encrypted data
- Keep sensitive inputs confidential
- Reveal results only to authorized parties
- Maintain privacy while ensuring verifiability

**🔒 Encrypted State Management**
- Store encrypted values on-chain
- Perform operations on ciphertext
- Control decryption with permissions
- EIP-712 signature-based access

**🔒 Confidential dApp Development**
- Build privacy-first applications
- No data exposure during computation
- Fair algorithms without revealing inputs
- Compliance with data protection regulations

### FHE Operations Supported

This SDK provides access to all FHEVM capabilities:

```typescript
// Encrypted data types
euint8, euint16, euint32, euint64, euint128, euint256
ebool, eaddress

// Arithmetic operations
FHE.add(), FHE.sub(), FHE.mul(), FHE.div()

// Comparison operations
FHE.eq(), FHE.ne(), FHE.gt(), FHE.gte(), FHE.lt(), FHE.lte()

// Logical operations
FHE.and(), FHE.or(), FHE.xor(), FHE.not()

// Selection and manipulation
FHE.select(), FHE.min(), FHE.max()

// Permission management
FHE.allow(), FHE.allowThis()

// Decryption
FHE.decrypt() // With EIP-712 signature
```

**Learn More About FHE**:
- **Zama FHEVM**: [https://github.com/zama-ai/fhevm](https://github.com/zama-ai/fhevm)
- **FHEVM Documentation**: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- **FHE Tutorial**: [Getting Started with FHEVM](https://docs.zama.ai/fhevm/getting-started)

---

## ✨ What is FHEVM SDK?

**FHEVM SDK** is a comprehensive toolkit that wraps all necessary packages and utilities for building confidential smart contracts with Zama's FHEVM. It provides:

- 🎯 **Framework-Agnostic Core** - Works with Node.js, Next.js, Vue, React, or any frontend
- 📦 **All-in-One Package** - No scattered dependencies, everything you need in one place
- 🔧 **wagmi-like Structure** - Intuitive API familiar to web3 developers
- ⚡ **Quick Setup** - Less than 10 lines of code to get started
- 🔐 **Complete FHE Flow** - Initialization, encryption, decryption, and contract interaction
- 🎨 **React Hooks** - Ready-to-use hooks for React/Next.js applications
- 📱 **Live Example** - Working Next.js application demonstrating all features

---

## 🚀 Quick Start (< 10 Lines!)

```bash
# 1. Clone repository
git clone https://github.com/OsbaldoSchmeler/fhevm-react-template.git
cd fhevm-react-template

# 2. Install all dependencies
npm install

# 3. Start Next.js example
npm run dev
```

**Open your browser** - Done! 🎉

---

## 📦 Repository Structure

This is a **monorepo** containing the SDK and example applications:

```
fhevm-react-template/
├── packages/
│   └── fhevm-sdk/              ← 📦 Core SDK Package
│       ├── src/
│       │   ├── index.ts        ← Main SDK (framework-agnostic)
│       │   └── react.tsx       ← React Hooks
│       └── package.json
│
├── examples/
│   └── nextjs-water-management/   ← 🎯 Next.js Example
│       ├── pages/
│       │   └── index.tsx       ← Demo application
│       ├── components/
│       └── package.json
│
├── contracts/
│   └── WaterResourceManager.sol   ← Example smart contract
│
├── docs/                       ← 📚 Complete documentation
├── demo.mp4                    ← Video demonstration (download to view)
└── README.md                   ← You are here
```

---

## 🎯 SDK Core Features

### 1. Framework-Agnostic Design

**Works Everywhere**:
```javascript
// Node.js / CommonJS
const { initFHEVM, encrypt } = require('fhevm-sdk');

// ES Modules
import { initFHEVM, encrypt } from 'fhevm-sdk';

// React / Next.js
import { useFHEVM, useEncrypt } from 'fhevm-sdk/react';

// Vue (future)
import { useFHEVM } from 'fhevm-sdk/vue';
```

### 2. wagmi-like API

**Familiar to Web3 Developers**:
```typescript
import { useFHEVM, useEncrypt, useDecrypt } from 'fhevm-sdk/react';

function MyComponent() {
  const { isReady } = useFHEVM({ network: 'sepolia' });
  const { encryptUint32, isEncrypting } = useEncrypt();
  const { decryptUser } = useDecrypt();

  const handleSubmit = async () => {
    const encrypted = await encryptUint32(1000);
    await contract.submitData(encrypted);
  };

  return (
    <button onClick={handleSubmit} disabled={!isReady || isEncrypting}>
      Submit Encrypted
    </button>
  );
}
```

### 3. Complete FHE Workflow

```typescript
// ✅ Step 1: Initialize
await initFHEVM({ network: 'sepolia', provider: window.ethereum });

// ✅ Step 2: Encrypt inputs
const encrypted = await encrypt.uint32(1000);

// ✅ Step 3: Send to contract
await contract.submitEncryptedData(encrypted);

// ✅ Step 4: Decrypt results (with EIP-712 signature)
const decrypted = await decrypt.user(result, { signer: wallet });
```

---

## 📱 Next.js Example - Water Resource Management

### Live Demo

**URL**: [https://fhe-water-resource-manager.vercel.app/](https://fhe-water-resource-manager.vercel.app/)
**Status**: ✅ Live and operational
**Features**: Full FHE integration with MetaMask support

### Video Demonstration

**File**: `demo.mp4` (Download to view)
**Note**: The video file must be downloaded to your local machine for viewing as direct streaming links are not supported.

**Download Instructions**:
1. Navigate to this repository
2. Locate `demo.mp4` in the root directory
3. Click "Download" to save locally
4. Open with your media player

### Run Locally

```bash
cd examples/nextjs-water-management
npm install
npm run dev
```

Visit your browser

### Features Demonstrated

- ✅ **Privacy-Preserving Forms** - Encrypt data before submission
- ✅ **React Hooks Integration** - `useFHEVM`, `useEncrypt`, `useDecrypt`
- ✅ **Real-time Status** - Loading states and error handling
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Responsive UI** - Tailwind CSS styling
- ✅ **Water Management Use Case** - Real-world privacy application

### Example Code

```tsx
// examples/nextjs-water-management/pages/index.tsx

import { useFHEVM, useEncrypt } from 'fhevm-sdk/react';

export default function WaterManagement() {
  const { isReady } = useFHEVM({ network: 'sepolia' });
  const { encryptUint32, isEncrypting } = useEncrypt();

  const [waterDemand, setWaterDemand] = useState(1000);

  const handleSubmit = async () => {
    // Encrypt sensitive data
    const encrypted = await encryptUint32(waterDemand);

    // Send to smart contract (encrypted!)
    await waterContract.submitRequest(encrypted);

    // Other users CANNOT see your demand!
  };

  return (
    <div>
      <input
        type="number"
        value={waterDemand}
        onChange={(e) => setWaterDemand(Number(e.target.value))}
      />
      <button onClick={handleSubmit} disabled={!isReady || isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Submit Request'}
      </button>
    </div>
  );
}
```

---

## 📚 SDK API Reference

### Initialization

```typescript
import { initFHEVM } from 'fhevm-sdk';

await initFHEVM({
  network: 'sepolia' | 'localhost',
  provider: window.ethereum,  // or ethers provider
  contractAddress?: string    // optional
});
```

### Encryption

```typescript
import { encrypt } from 'fhevm-sdk';

const encrypted32 = await encrypt.uint32(1000);
const encrypted64 = await encrypt.uint64(1000000);
const encryptedBool = await encrypt.bool(true);
const encryptedAddr = await encrypt.address('0x...');
```

### Decryption

```typescript
import { decrypt } from 'fhevm-sdk';

// User decryption (with EIP-712 signature)
const value = await decrypt.user(ciphertext, {
  signer: wallet,
  contract: contractAddress
});

// Public decryption (if permitted)
const publicValue = await decrypt.public(ciphertext);
```

### React Hooks

```typescript
import { useFHEVM, useEncrypt, useDecrypt } from 'fhevm-sdk/react';

// Initialize SDK
const { isReady, isInitializing, error, init } = useFHEVM(config);

// Encryption with loading states
const { encryptUint32, isEncrypting, error } = useEncrypt();

// Decryption with loading states
const { decryptUser, isDecrypting, error } = useDecrypt();

// Contract interaction
const { contract, isLoading, error } = useContract({
  address: '0x...',
  abi: contractABI,
  provider: provider
});
```

---

## 🏗️ Building Your Own dApp

### Step 1: Install SDK

```bash
npm install fhevm-sdk
```

### Step 2: Use in Your App

```typescript
// app.tsx or page.tsx
import { useFHEVM, useEncrypt } from 'fhevm-sdk/react';

export default function MyApp() {
  const { isReady } = useFHEVM({
    network: 'sepolia',
    provider: window.ethereum
  });

  const { encryptUint32 } = useEncrypt();

  const handleEncrypt = async () => {
    const encrypted = await encryptUint32(1000);
    console.log('Encrypted:', encrypted);
  };

  if (!isReady) return <div>Initializing FHEVM...</div>;

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

### Step 3: Deploy Smart Contract

```solidity
// MyContract.sol
import { FHE, euint32 } from "@fhevm/solidity/lib/FHE.sol";

contract MyConfidentialContract {
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

---

## 🎨 Use Cases

### 1. Confidential Voting
- Encrypted votes
- Public tallying without revealing individual choices
- Privacy-preserving governance

### 2. Secret Auctions
- Hidden bids until reveal
- Fair price discovery
- Trustless auction mechanisms

### 3. Private DeFi
- Confidential balances
- Hidden transaction amounts
- Privacy-preserving swaps
- Dark pools

### 4. Confidential Resource Allocation
- Hidden demands (like water management)
- Fair distribution algorithms
- Privacy in supply chains

### 5. Secure Identity & Credentials
- Private credentials
- Selective disclosure
- Zero-knowledge proofs
- Compliance without exposure

### 6. Healthcare Data
- Encrypted patient records
- Privacy-preserving research
- Confidential diagnostics

---

## 📊 Performance & Gas Costs

### FHE Operation Costs (Sepolia)

| Operation | Gas Cost | Notes |
|-----------|----------|-------|
| `encrypt.uint32()` | ~50,000 | Client-side + contract |
| `FHE.add()` | ~75,000 | On-chain computation |
| `FHE.gt()` | ~80,000 | Encrypted comparison |
| `decrypt.user()` | ~30,000 | With EIP-712 signature |

### Optimization Tips

✅ **Minimize FHE operations** - Cache encrypted values where possible
✅ **Batch operations** - Process multiple items together
✅ **Use smallest types** - euint32 vs euint64 vs euint128
✅ **Strategic encryption** - Only encrypt sensitive data

---

## 🧪 Testing & Development

### Run Tests

```bash
# From root
npm test

# From parent directory (smart contracts)
cd ../../
npm run test
npm run test:coverage
```

### Local Development

```bash
# Start Next.js dev server
npm run dev

# Build SDK
npm run build

# Compile contracts
npm run compile
```

---

## 🌐 Live Deployment

### Smart Contract (Example)

**Network**: Ethereum Sepolia Testnet
**Contract Address**: `0x4E2c3faE5165E4d5f9E2dEcFEA50e84399157b76`
**Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x4E2c3faE5165E4d5f9E2dEcFEA50e84399157b76)

### Next.js Demo

**URL**: [https://fhe-water-resource-manager.vercel.app/](https://fhe-water-resource-manager.vercel.app/)
**Status**: ✅ Live and operational

---

## 📚 Complete Documentation

| Document | Description |
|----------|-------------|
| **[README.md](README.md)** | This file - SDK overview |
| **[SUBMISSION.md](SUBMISSION.md)** | Competition submission summary |
| **[QUICK_START.md](QUICK_START.md)** | 5-minute quick start guide |
| **[FINAL_CHECKLIST.md](FINAL_CHECKLIST.md)** | Requirements verification |
| **[FILE_MANIFEST.md](FILE_MANIFEST.md)** | Complete file listing |
| **[docs/](docs/)** | Additional documentation |

---

## 💻 Tech Stack

### Core SDK
- **TypeScript** - Type-safe SDK development
- **Zama FHEVM** - FHE smart contract library
- **Ethers.js** v6 - Blockchain interaction
- **React** - Optional hooks adapter

### Example Application
- **Next.js** 14.x - React framework
- **React** 18.x - UI library
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
- **MetaMask** - Wallet integration

### Development Tools
- **Hardhat** - Smart contract framework
- **Mocha/Chai** - Testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 🔗 Related Projects & Resources

### Example Applications

**FHE Water Resource Management**
- GitHub: [https://github.com/OsbaldoSchmeler/FHEWaterResourceManager](https://github.com/OsbaldoSchmeler/FHEWaterResourceManager)
- Live Demo: [https://fhe-water-resource-manager.vercel.app/](https://fhe-water-resource-manager.vercel.app/)
- Description: Privacy-preserving water allocation platform built with this SDK

### FHE Resources

**Zama FHEVM Documentation**
- Official Docs: [https://docs.zama.ai/fhevm](https://docs.zama.ai/fhevm)
- GitHub: [https://github.com/zama-ai/fhevm](https://github.com/zama-ai/fhevm)
- Tutorial: [Getting Started with FHEVM](https://docs.zama.ai/fhevm/getting-started)

### Development Resources

- **📚 Hardhat Documentation**: [https://hardhat.org/](https://hardhat.org/)
- **🔐 OpenZeppelin Contracts**: [https://docs.openzeppelin.com/](https://docs.openzeppelin.com/)
- **⚡ Ethers.js Docs**: [https://docs.ethers.org/](https://docs.ethers.org/)
- **📖 Solidity Docs**: [https://docs.soliditylang.org/](https://docs.soliditylang.org/)

---

## 🤝 Contributing

We welcome contributions!

```bash
# Fork and clone
git clone https://github.com/your-fork/fhevm-react-template.git
cd fhevm-react-template

# Install dependencies
npm install

# Make changes and test
npm run dev

# Submit PR
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

## 🙏 Acknowledgments

- **Zama** - For pioneering FHE technology and FHEVM
- **Ethereum Community** - For blockchain infrastructure
- **wagmi** - For API design inspiration
- **Next.js** - For excellent React framework
- **All Contributors** - For improving this SDK

---

## 📞 Support & Links

**GitHub Repository**: [https://github.com/OsbaldoSchmeler/fhevm-react-template](https://github.com/OsbaldoSchmeler/fhevm-react-template)

**Example Application**: [https://github.com/OsbaldoSchmeler/FHEWaterResourceManager](https://github.com/OsbaldoSchmeler/FHEWaterResourceManager)

**Live Demo**: [https://fhe-water-resource-manager.vercel.app/](https://fhe-water-resource-manager.vercel.app/)

**Issues**: [GitHub Issues](https://github.com/OsbaldoSchmeler/fhevm-react-template/issues)

**Discussions**: [GitHub Discussions](https://github.com/OsbaldoSchmeler/fhevm-react-template/discussions)

**Video Demo**: Download `demo.mp4` from repository

---

<div align="center">

## 🚀 Ready to Build?

**Start with the Next.js example:**

```bash
npm install && npm run dev
```

**Or integrate SDK in your existing app:**

```bash
npm install fhevm-sdk
```

---

**🔐 Built for Privacy-Preserving Applications**

**Universal • Developer-Friendly • Production-Ready**

**Make Confidential Computing Simple with FHEVM SDK**

</div>
