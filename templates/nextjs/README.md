# Next.js Template - FHEVM SDK Integration

This template demonstrates how to integrate the FHEVM SDK into a Next.js application for building privacy-preserving decentralized applications.

## 📁 Complete Example

For a fully implemented Next.js example with FHEVM SDK integration, see:

**App Router (Next.js 13+)**:
```bash
cd ../../examples/nextjs-fhe-app-router
npm install
npm run dev
```

**Pages Router (Production-Ready)**:
```bash
cd ../../examples/nextjs-water-resource-management
npm install
npm run dev
```

**Pages Router (Simple Demo)**:
```bash
cd ../../examples/nextjs-water-management
npm install
npm run dev
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install fhevm-sdk ethers next react react-dom
```

### 2. Create a Page with SDK Integration

**Using Pages Router (`pages/index.tsx`):**

```tsx
import { useFHEVM, useEncrypt, useDecrypt } from 'fhevm-sdk/react';
import { useState } from 'react';

export default function Home() {
  const { isReady, isInitializing } = useFHEVM({
    network: 'sepolia',
    provider: typeof window !== 'undefined' ? window.ethereum : null
  });

  const { encryptUint32, isEncrypting } = useEncrypt();
  const [encrypted, setEncrypted] = useState<string>('');

  const handleEncrypt = async () => {
    const result = await encryptUint32(1000);
    if (result) setEncrypted(result);
  };

  if (isInitializing) return <div>Initializing FHEVM SDK...</div>;
  if (!isReady) return <div>SDK not ready</div>;

  return (
    <div>
      <h1>FHEVM SDK - Next.js Integration</h1>
      <button onClick={handleEncrypt} disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
      </button>
      {encrypted && <p>Encrypted: {encrypted}</p>}
    </div>
  );
}
```

**Using App Router (`app/page.tsx`):**

```tsx
'use client';

import { useFHEVM, useEncrypt } from 'fhevm-sdk/react';
import { useState } from 'react';

export default function Home() {
  const { isReady } = useFHEVM({ network: 'sepolia' });
  const { encryptUint32 } = useEncrypt();

  const [value, setValue] = useState('');

  const handleEncrypt = async () => {
    const encrypted = await encryptUint32(parseInt(value));
    console.log('Encrypted:', encrypted);
  };

  return (
    <main className="p-8">
      <h1>Privacy-Preserving App</h1>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value"
      />
      <button onClick={handleEncrypt} disabled={!isReady}>
        Encrypt
      </button>
    </main>
  );
}
```

### 3. Add Layout (App Router)

**`app/layout.tsx`:**

```tsx
import { FHEProvider } from 'fhevm-sdk/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <FHEProvider network="sepolia">
          {children}
        </FHEProvider>
      </body>
    </html>
  );
}
```

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_FHEVM_NETWORK=sepolia
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 📦 Features Demonstrated in Examples

All three Next.js examples in the `examples/` directory showcase:

- ✅ FHEVM SDK initialization
- ✅ React hooks (`useFHEVM`, `useEncrypt`, `useDecrypt`)
- ✅ Encrypted data submission
- ✅ Smart contract interaction
- ✅ Loading states and error handling
- ✅ TypeScript support
- ✅ Responsive UI

## 🔗 Learn More

- **FHEVM SDK Documentation**: `../../docs/`
- **Example Applications**: `../../examples/`
- **Main README**: `../../README.md`
- **Zama FHEVM**: https://docs.zama.ai/fhevm

## 📞 Support

For issues or questions:
- GitHub Issues: https://github.com/OsbaldoSchmeler/fhevm-react-template/issues
- Documentation: `../../docs/`
