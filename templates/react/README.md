# React Template - FHEVM SDK Integration

This template shows how to integrate the FHEVM SDK into a React application (Create React App, Vite, or similar).

## 📁 Working Examples

While we don't have a standalone React example yet, the Next.js examples use React and demonstrate all SDK features:

```bash
# See React components in action
cd ../../examples/nextjs-fhe-app-router/src/components
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install fhevm-sdk ethers react react-dom
```

### 2. Create FHE Provider

**`src/providers/FHEProvider.tsx`:**

```tsx
import React, { createContext, useContext } from 'react';
import { useFHEVM } from 'fhevm-sdk/react';

interface FHEContextType {
  isReady: boolean;
  isInitializing: boolean;
  error: Error | null;
}

const FHEContext = createContext<FHEContextType>({
  isReady: false,
  isInitializing: false,
  error: null,
});

export const useFHEContext = () => useContext(FHEContext);

export function FHEProvider({ children }: { children: React.ReactNode }) {
  const fhevm = useFHEVM({ network: 'sepolia' });

  return (
    <FHEContext.Provider value={fhevm}>
      {children}
    </FHEContext.Provider>
  );
}
```

### 3. Use in Components

**`src/components/EncryptionDemo.tsx`:**

```tsx
import { useState } from 'react';
import { useEncrypt } from 'fhevm-sdk/react';
import { useFHEContext } from '../providers/FHEProvider';

export function EncryptionDemo() {
  const { isReady } = useFHEContext();
  const { encryptUint32, isEncrypting } = useEncrypt();
  const [value, setValue] = useState(0);
  const [encrypted, setEncrypted] = useState('');

  const handleEncrypt = async () => {
    const result = await encryptUint32(value);
    if (result) setEncrypted(result);
  };

  return (
    <div className="encryption-demo">
      <h2>Encryption Demo</h2>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        placeholder="Enter value to encrypt"
      />
      <button
        onClick={handleEncrypt}
        disabled={!isReady || isEncrypting}
      >
        {isEncrypting ? 'Encrypting...' : 'Encrypt'}
      </button>
      {encrypted && (
        <div className="result">
          <strong>Encrypted:</strong> {encrypted}
        </div>
      )}
    </div>
  );
}
```

### 4. Wrap App with Provider

**`src/App.tsx`:**

```tsx
import { FHEProvider } from './providers/FHEProvider';
import { EncryptionDemo } from './components/EncryptionDemo';

function App() {
  return (
    <FHEProvider>
      <div className="App">
        <header>
          <h1>🔐 FHEVM SDK React App</h1>
        </header>
        <main>
          <EncryptionDemo />
        </main>
      </div>
    </FHEProvider>
  );
}

export default App;
```

## 🔧 Vite Configuration

If using Vite, add to `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    'process.env': {},
  },
});
```

## 🌐 Browser Compatibility

The SDK requires:
- Modern browser with Web Crypto API
- MetaMask or compatible wallet
- ES2020+ JavaScript support

## 📦 Available Hooks

```typescript
// Initialization
const { isReady, isInitializing, error, init } = useFHEVM(config);

// Encryption
const { encryptUint32, encryptUint64, encryptBool, isEncrypting } = useEncrypt();

// Decryption
const { decryptUser, decryptPublic, isDecrypting } = useDecrypt();

// Contract interaction
const { contract, isLoading, error } = useContract({
  address: '0x...',
  abi: contractABI,
  provider: provider
});
```

## 🎯 Example Use Cases

### Confidential Voting

```tsx
function VotingApp() {
  const { encryptUint32 } = useEncrypt();
  const [vote, setVote] = useState(0);

  const castVote = async () => {
    const encrypted = await encryptUint32(vote);
    await contract.submitVote(encrypted);
  };

  return (
    <div>
      <select onChange={(e) => setVote(parseInt(e.target.value))}>
        <option value="0">Option A</option>
        <option value="1">Option B</option>
      </select>
      <button onClick={castVote}>Cast Encrypted Vote</button>
    </div>
  );
}
```

### Private Auction

```tsx
function AuctionBid() {
  const { encryptUint32 } = useEncrypt();
  const [bidAmount, setBidAmount] = useState(0);

  const submitBid = async () => {
    const encrypted = await encryptUint32(bidAmount);
    await auctionContract.placeBid(encrypted);
  };

  return (
    <div>
      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(parseInt(e.target.value))}
        placeholder="Your bid (hidden)"
      />
      <button onClick={submitBid}>Submit Secret Bid</button>
    </div>
  );
}
```

## 🔗 Related Examples

- **Next.js App Router**: `../../examples/nextjs-fhe-app-router/`
- **Next.js Pages Router**: `../../examples/nextjs-water-resource-management/`
- **React Components**: See components in Next.js examples

## 📚 Documentation

- **SDK API Reference**: `../../docs/`
- **Main README**: `../../README.md`
- **Zama FHEVM**: https://docs.zama.ai/fhevm

## 📞 Support

- GitHub: https://github.com/OsbaldoSchmeler/fhevm-react-template
- Issues: https://github.com/OsbaldoSchmeler/fhevm-react-template/issues
