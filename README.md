# 🔐 FHEVM SDK - Universal Privacy-Preserving Development Kit

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![FHEVM](https://img.shields.io/badge/FHEVM-Zama-purple.svg)](https://www.zama.ai/)
[![Framework](https://img.shields.io/badge/framework-agnostic-green.svg)]()
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)

A **universal SDK** for building privacy-preserving decentralized applications using **Fully Homomorphic Encryption (FHE)** with Zama's FHEVM. Framework-agnostic and developer-friendly, designed to make confidential smart contract development simple and intuitive.

🌐 **[Live Demo](https://fhe-water-resource-manager.vercel.app/)** | 📖 **[Documentation](docs/)**

**📹 Demo Video**: `demo.mp4` - Download from repository to view (streaming not supported)

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
│   └── fhevm-sdk/                           ← 📦 Core SDK Package
│       ├── src/
│       │   ├── index.ts                     ← Main SDK (framework-agnostic)
│       │   └── react.tsx                    ← React Hooks
│       └── package.json
│
├── examples/
│   ├── nextjs-water-management/             ← 🎯 Simple Next.js Example (Pages Router)
│   │   ├── pages/
│   │   │   └── index.tsx                    ← Basic SDK demo
│   │   └── package.json
│   │
│   ├── nextjs-water-resource-management/    ← 🏆 Full Next.js Example (Pages Router)
│   │   ├── pages/
│   │   │   └── index.tsx                    ← Complete water management system
│   │   └── package.json
│   │
│   ├── nextjs-fhe-app-router/               ← ⭐ App Router Example (Next.js 13+)
│   │   ├── src/
│   │   │   ├── app/                         ← App Router pages and API routes
│   │   │   ├── components/                  ← React components
│   │   │   ├── lib/                         ← FHE utilities
│   │   │   └── hooks/                       ← Custom hooks
│   │   └── package.json
│   │
│   └── water-resource-management/           ← 🌐 Vanilla HTML/JS Example
│       ├── index.html                       ← Standalone web application
│       └── README.md
│
├── contracts/
│   └── WaterResourceManager.sol             ← Example smart contract
│
├── docs/                                    ← 📚 Complete documentation
├── demo.mp4                                 ← Video demonstration (download to view)
└── README.md                                ← You are here
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

## 📱 Example Applications

### 🎯 Example 1: Simple Next.js Demo

**Location**: `examples/nextjs-water-management/`

A minimal Next.js example demonstrating basic FHEVM SDK usage with React hooks.

**Features**:
- ✅ Basic SDK initialization
- ✅ Simple encryption demo
- ✅ React hooks integration
- ✅ Clean, educational code

**Run Locally**:
```bash
cd examples/nextjs-water-management
npm install
npm run dev
```

Visit `http://localhost:3000`

**Code Example**:
```tsx
import { useFHEVM, useEncrypt } from 'fhevm-sdk/react';

export default function WaterManagement() {
  const { isReady } = useFHEVM({ network: 'sepolia' });
  const { encryptUint32, isEncrypting } = useEncrypt();

  const handleEncrypt = async () => {
    const encrypted = await encryptUint32(1000);
    // Use encrypted data in contract calls
  };

  return (
    <button onClick={handleEncrypt} disabled={!isReady || isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt Data'}
    </button>
  );
}
```

---

### 🏆 Example 2: Full Next.js Water Resource Management

**Location**: `examples/nextjs-water-resource-management/`

A **comprehensive production-ready** water resource management system showcasing the complete capabilities of FHEVM SDK.

**Features**:
- ✅ **Full FHE Integration** - Complete encryption/decryption workflow
- ✅ **Multi-Role System** - Admin and region manager interfaces
- ✅ **Privacy-Preserving Operations** - Encrypted water requests and allocations
- ✅ **Real-time State Management** - Live blockchain monitoring
- ✅ **Comprehensive UI** - Production-grade interface with Tailwind CSS
- ✅ **Type-Safe** - Full TypeScript implementation
- ✅ **Error Handling** - Robust error messages and loading states

**Run Locally**:
```bash
cd examples/nextjs-water-resource-management
npm install
npm run dev
```

Visit `http://localhost:3001`

**Key Functionality**:

**Admin Functions**:
- Register water management regions
- Start allocation periods with time limits
- Process encrypted allocation requests
- Emergency water allocation
- Region management

**Manager Functions**:
- Submit encrypted water requests
- View region status
- Check allocation results

**Privacy Features**:
- Encrypted water demand amounts
- Confidential justification scores
- FHE-based fair allocation
- Selective result disclosure

**Code Example**:
```tsx
import { useFHEVM, useEncrypt } from 'fhevm-sdk/react';

export default function WaterResourceManagement() {
  const { isReady } = useFHEVM({ network: 'sepolia' });
  const { encryptUint32, isEncrypting } = useEncrypt();

  const submitWaterRequest = async () => {
    // Encrypt sensitive data using FHEVM SDK
    const encryptedAmount = await encryptUint32(requestAmount);
    const encryptedScore = await encryptUint32(justificationScore);

    // Submit to smart contract (data remains encrypted!)
    const tx = await contract.submitWaterRequest(
      requestAmount,
      justificationScore
    );
    await tx.wait();

    // Other regions CANNOT see your request details!
  };

  return (
    <button onClick={submitWaterRequest} disabled={!isReady || isEncrypting}>
      {isEncrypting ? '🔐 Encrypting & Submitting...' : '🔒 Submit Encrypted Request'}
    </button>
  );
}
```

---

### 🌐 Example 3: Vanilla HTML/JS Water Resource Management

**Location**: `examples/water-resource-management/`

A **standalone HTML/JavaScript** implementation of the water resource management system, demonstrating that the SDK concepts work without frameworks.

**Features**:
- ✅ No build tools required
- ✅ Pure HTML/CSS/JavaScript
- ✅ Same functionality as Next.js version
- ✅ Works with CDN-loaded libraries
- ✅ Easy to understand and modify

**Run Locally**:
Simply open `index.html` in a web browser or use a simple HTTP server:
```bash
cd examples/water-resource-management
python -m http.server 8000
# Or use any other HTTP server
```

Visit `http://localhost:8000`

**Live Demo**: [https://fhe-water-resource-manager.vercel.app/](https://fhe-water-resource-manager.vercel.app/)

---

### 📹 Video Demonstration

**Video File**: `demo.mp4` (located in repository root)

**Important**: The demo video **must be downloaded** to view. Streaming is not supported.

**How to Access**:
1. Navigate to the GitHub repository root directory
2. Locate the file named `demo.mp4`
3. Click "Download" or "Download raw file"
4. Open with your media player (VLC, Windows Media Player, etc.)

**Video Content**: Complete walkthrough of FHEVM SDK usage through the water resource management examples, including:
- SDK initialization
- Privacy-preserving water allocation
- React hooks integration
- Encrypted data processing
- Admin and manager workflows

---

### ⭐ Example 4: Next.js App Router with Full FHE Architecture

**Location**: `examples/nextjs-fhe-app-router/`

A **modern Next.js 13+ App Router** implementation showcasing a complete, scalable FHE architecture with API routes, custom hooks, and production-ready components.

**Features**:
- ✅ **Next.js 14 App Router** - Modern React Server Components
- ✅ **Complete Architecture** - Modular, scalable code structure
- ✅ **API Routes** - RESTful endpoints for FHE operations
- ✅ **Custom Hooks** - `useFHE`, `useEncryption`, `useComputation`
- ✅ **UI Component Library** - Reusable Button, Input, Card components
- ✅ **FHE Components** - Provider, demos, key manager
- ✅ **Real-World Examples** - Banking and medical use cases
- ✅ **Type-Safe** - Complete TypeScript implementation
- ✅ **Production Patterns** - Best practices for scalability

**Run Locally**:
```bash
cd examples/nextjs-fhe-app-router
npm install
npm run dev
```

Visit `http://localhost:3002`

**Architecture Highlights**:

**API Endpoints**:
- `POST /api/fhe/encrypt` - Encrypt data
- `POST /api/fhe/decrypt` - Decrypt ciphertext
- `POST /api/fhe/compute` - Homomorphic computation
- `POST /api/keys` - Key generation

**Custom Hooks**:
```tsx
// FHE initialization
const { isInitialized, initialize } = useFHE();

// Encryption with loading states
const { encryptWithSDK, encryptWithAPI, isEncrypting } = useEncryption();

// Homomorphic computation
const { compute, add, subtract, compare, result } = useComputation();
```

**Component Structure**:
- **UI Components**: `Button`, `Input`, `Card`
- **FHE Components**: `FHEProvider`, `EncryptionDemo`, `ComputationDemo`, `KeyManager`
- **Examples**: `BankingExample`, `MedicalExample`

**Code Example**:
```tsx
import { useEncryption } from '@/hooks/useEncryption';
import { Button } from '@/components/ui/Button';

function BankingApp() {
  const { encryptWithSDK, isEncrypting } = useEncryption();

  const handleDeposit = async (amount: number) => {
    // Encrypt sensitive data
    const encrypted = await encryptWithSDK(amount, 'uint32');

    // Send to contract (encrypted!)
    await contract.deposit(encrypted);
  };

  return (
    <Button onClick={() => handleDeposit(1000)} isLoading={isEncrypting}>
      Deposit Confidentially
    </Button>
  );
}
```

---

### 📊 Example Comparison

| Feature | Simple Next.js | Full Next.js | App Router | Vanilla HTML/JS |
|---------|---------------|--------------|------------|-----------------|
| **Framework** | Pages Router | Pages Router | App Router | None |
| **SDK Integration** | ✅ Basic | ✅ Complete | ✅ Complete | ✅ Conceptual |
| **Production Ready** | ❌ Demo only | ✅ Yes | ✅ Yes | ✅ Yes |
| **Architecture** | Simple | Water Management | Full FHE Stack | Standalone |
| **API Routes** | ❌ No | ❌ No | ✅ Yes | ❌ No |
| **Custom Hooks** | ❌ No | ❌ No | ✅ Yes | ❌ No |
| **UI Components** | Basic | Inline | ✅ Library | Inline |
| **Real-World Examples** | ❌ No | ✅ Water | ✅ Banking + Medical | ✅ Water |
| **TypeScript** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ JavaScript |
| **Build Required** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Best For** | Learning | Production App | Scalable Apps | Prototyping |

**Recommendation**:
- **Just learning FHE?** → Start with Simple Next.js Example
- **Building a specific app?** → Use Full Next.js Example
- **Need scalable architecture?** → Use App Router Example ⭐
- **No build tools?** → Use Vanilla HTML/JS Example

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

**FHE Confidential Water Resource Management - Privacy Water Allocation**
- GitHub: [https://github.com/OsbaldoSchmeler/FHEWaterResourceManager](https://github.com/OsbaldoSchmeler/FHEWaterResourceManager)
- Live Demo: [https://fhe-water-resource-manager.vercel.app/](https://fhe-water-resource-manager.vercel.app/)
- Description: Confidential water resource allocation platform demonstrating privacy-preserving water distribution using this SDK. Features encrypted demand submission, fair allocation algorithms on encrypted data, and role-based access control.

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
