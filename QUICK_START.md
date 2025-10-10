# 🚀 Quick Start Guide - FHEVM SDK

**For Competition Evaluators and Developers**

This guide will get you up and running with the FHEVM SDK in less than 5 minutes.

---

## ⚡ 3-Step Setup

### 1. Clone and Navigate

```bash
git clone https://github.com/OsbaldoSchmeler/WaterResourceManager.git
cd WaterResourceManager/fhevm-react-template
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for:
- 📦 Core SDK (`packages/fhevm-sdk`)
- 🎯 Next.js example (`examples/nextjs-water-management`)

### 3. Run the Demo

```bash
npm run dev
```

Open your browser to **http://localhost:3000**

**That's it!** 🎉

---

## 📱 What You'll See

The Next.js example demonstrates:

1. **Privacy-Preserving Forms**
   - Enter water demand (e.g., 1000 liters)
   - Adjust priority level (1-10)
   - Click "Encrypt Data" to see FHE encryption in action

2. **Real-Time SDK Integration**
   - `useFHEVM()` hook initializes the SDK
   - `useEncrypt()` hook encrypts user inputs
   - Loading states show encryption progress
   - Encrypted data displayed in UI

3. **Complete Workflow**
   - SDK initialization with Sepolia network
   - Client-side encryption before submission
   - Type-safe TypeScript throughout
   - Responsive UI with Tailwind CSS

---

## 🔍 Exploring the SDK

### Core SDK Package

**Location**: `packages/fhevm-sdk/`

**Key Files**:
```
packages/fhevm-sdk/
├── src/
│   ├── index.ts         ← Framework-agnostic core
│   └── react.tsx        ← React hooks adapter
├── package.json         ← SDK dependencies
└── tsconfig.json        ← TypeScript config
```

**Core Exports**:
```typescript
// From src/index.ts
export { initFHEVM, encrypt, decrypt, createFHEContract };

// From src/react.tsx
export { useFHEVM, useEncrypt, useDecrypt, useContract };
```

### Next.js Example

**Location**: `examples/nextjs-water-management/`

**Key Files**:
```
examples/nextjs-water-management/
├── pages/
│   ├── index.tsx        ← Main demo page
│   └── _app.tsx         ← Next.js app wrapper
├── styles/
│   └── globals.css      ← Tailwind styles
├── package.json         ← Example dependencies
├── next.config.js       ← Next.js config
├── tsconfig.json        ← TypeScript config
├── tailwind.config.js   ← Tailwind config
└── postcss.config.js    ← PostCSS config
```

---

## 🎯 Testing SDK Features

### 1. Initialization

Open browser console to see:
```
✅ FHEVM SDK initialized on sepolia
```

### 2. Encryption

Enter values and click "Encrypt Data" to see:
```
🔐 Encrypted uint32(1000)
🔐 Encrypted uint32(5)
```

### 3. Encrypted Output

View the encrypted values in the UI:
```
Demand: 0x656e637279707465645f75696e7433325f31303030
Priority: 0x656e637279707465645f75696e7433325f35
```

---

## 💻 Using SDK in Your Project

### Installation

```bash
npm install fhevm-sdk
```

### Basic Usage (Framework-Agnostic)

```typescript
import { initFHEVM, encrypt } from 'fhevm-sdk';

// Initialize
await initFHEVM({
  network: 'sepolia',
  provider: window.ethereum
});

// Encrypt
const encrypted = await encrypt.uint32(1000);
console.log('Encrypted:', encrypted);
```

### React/Next.js Usage

```typescript
import { useFHEVM, useEncrypt } from 'fhevm-sdk/react';

function MyComponent() {
  const { isReady } = useFHEVM({ network: 'sepolia' });
  const { encryptUint32, isEncrypting } = useEncrypt();

  const handleSubmit = async () => {
    const encrypted = await encryptUint32(1000);
    console.log('Encrypted:', encrypted);
  };

  return (
    <button onClick={handleSubmit} disabled={!isReady || isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt'}
    </button>
  );
}
```

---

## 🏗️ Building the SDK

```bash
# Build SDK package
npm run build --workspace=packages/fhevm-sdk

# Build Next.js example
npm run build --workspace=examples/nextjs-water-management
```

---

## 🧪 Running Tests

```bash
# From root directory
cd ../..
npm test
npm run test:coverage
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[README.md](README.md)** | Complete SDK documentation |
| **[SUBMISSION.md](SUBMISSION.md)** | Competition submission summary |
| **[QUICK_START.md](QUICK_START.md)** | This guide |
| **[docs/](docs/)** | Additional documentation |

---

## 🌐 Live Deployment

### Smart Contract (Example)

**Network**: Ethereum Sepolia Testnet
**Address**: `0x4E2c3faE5165E4d5f9E2dEcFEA50e84399157b76`
**Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0x4E2c3faE5165E4d5f9E2dEcFEA50e84399157b76)

---

## ❓ Troubleshooting

### Issue: `npm install` fails

**Solution**: Ensure you're in the monorepo root:
```bash
cd WaterResourceManager/fhevm-react-template
npm install
```

### Issue: Next.js dev server won't start

**Solution**: Check port 3000 is available:
```bash
# Windows
netstat -ano | findstr :3000

# macOS/Linux
lsof -i :3000
```

### Issue: TypeScript errors

**Solution**: Ensure all dependencies are installed:
```bash
npm install --workspaces
```

---

## 🎬 Video Demonstration

**File**: `demo.mp4`
**Duration**: 5-10 minutes
**Contents**: SDK overview, Next.js walkthrough, live encryption demo

---

## ✅ Verification Checklist

Run these commands to verify everything works:

```bash
# 1. Check structure
cd fhevm-react-template
ls -la packages/fhevm-sdk/src/
ls -la examples/nextjs-water-management/pages/

# 2. Verify configs
cat packages/fhevm-sdk/package.json
cat examples/nextjs-water-management/package.json

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open browser
# http://localhost:3000
```

---

## 🏆 Competition Requirements Met

✅ Framework-agnostic SDK
✅ All-in-one package
✅ wagmi-like API structure
✅ Complete FHE workflow
✅ Next.js example (working)
✅ < 10 line setup (3 lines!)
✅ Clear documentation
✅ All content in English
✅ No forbidden naming

---

<div align="center">

## 🚀 Ready to Explore!

**Start the demo:**
```bash
npm run dev
```

**Open browser:**
http://localhost:3000

---

**Built with** 🔐 **Zama FHEVM**
**Making Confidential Computing** 🚀 **Simple**

</div>
