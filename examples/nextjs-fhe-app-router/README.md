# 🔐 Next.js App Router FHE Example

A **comprehensive Next.js 13+ App Router example** demonstrating full integration of the FHEVM SDK with modern React Server Components, API Routes, and client-side FHE operations.

## 🌟 Overview

This example showcases the **complete architecture** for building privacy-preserving applications with:

- ✅ **Next.js 14 App Router** - Modern React Server Components
- ✅ **FHEVM SDK Integration** - Full client-side and server-side FHE
- ✅ **API Routes** - RESTful endpoints for FHE operations
- ✅ **TypeScript** - Complete type safety throughout
- ✅ **Custom Hooks** - Reusable FHE operation hooks
- ✅ **UI Components** - Production-ready component library
- ✅ **Real-World Examples** - Banking and medical use scenarios

## 📦 Architecture

This example follows a **modular, scalable architecture** based on the structure in the requirements:

```
src/
├── app/                           # App Router (Next.js 13+)
│   ├── layout.tsx                 # Root layout with FHE provider
│   ├── page.tsx                   # Main homepage
│   ├── globals.css                # Global styles
│   └── api/                       # API Routes
│       ├── fhe/
│       │   ├── route.ts           # Main FHE API
│       │   ├── encrypt/route.ts   # Encryption endpoint
│       │   ├── decrypt/route.ts   # Decryption endpoint
│       │   └── compute/route.ts   # Computation endpoint
│       └── keys/route.ts          # Key management API
│
├── components/                    # React Components
│   ├── ui/                        # Base UI Components
│   │   ├── Button.tsx             # Button component
│   │   ├── Input.tsx              # Input component
│   │   └── Card.tsx               # Card container
│   ├── fhe/                       # FHE Feature Components
│   │   ├── FHEProvider.tsx        # FHE context provider
│   │   ├── EncryptionDemo.tsx     # Encryption demonstration
│   │   ├── ComputationDemo.tsx    # Computation demonstration
│   │   └── KeyManager.tsx         # Key management UI
│   └── examples/                  # Use Case Examples
│       ├── BankingExample.tsx     # Banking use case
│       └── MedicalExample.tsx     # Medical use case
│
├── lib/                           # Utility Libraries
│   ├── fhe/                       # FHE Integration
│   │   ├── client.ts              # Client-side FHE operations
│   │   ├── server.ts              # Server-side FHE operations
│   │   ├── keys.ts                # Key management
│   │   └── types.ts               # FHE type definitions
│   └── utils/                     # Helper Utilities
│       ├── security.ts            # Security utilities
│       └── validation.ts          # Validation helpers
│
├── hooks/                         # Custom React Hooks
│   ├── useFHE.ts                  # Main FHE hook
│   ├── useEncryption.ts           # Encryption hook
│   └── useComputation.ts          # Computation hook
│
├── types/                         # TypeScript Types
│   ├── fhe.ts                     # FHE type definitions
│   └── api.ts                     # API type definitions
│
└── styles/                        # Style Files
    └── globals.css                # Global CSS with Tailwind
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MetaMask or compatible wallet
- Basic understanding of Next.js and React

### Installation

```bash
# Navigate to example directory
cd examples/nextjs-fhe-app-router

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3002` to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 📖 Features Demonstrated

### 1. **Client-Side Encryption** (`EncryptionDemo`)
- Encrypt data using FHEVM SDK hooks
- Multiple data types supported (uint32, uint64, bool)
- Choice between SDK encryption or API encryption

### 2. **Homomorphic Computation** (`ComputationDemo`)
- Perform operations on encrypted data
- Addition, subtraction, multiplication, division
- Comparison operations (>, <, =)
- Logical operations (AND, OR, NOT)

### 3. **Key Management** (`KeyManager`)
- Generate FHE key pairs
- Store and retrieve public keys
- Key lifecycle management

### 4. **Banking Example** (`BankingExample`)
- Confidential balance operations
- Encrypted deposits and withdrawals
- Privacy-preserving transactions

### 5. **Medical Example** (`MedicalExample`)
- Private patient data handling
- Encrypted risk score analysis
- HIPAA-compliant data processing

## 🔧 API Endpoints

### POST `/api/fhe/encrypt`
Encrypt data using FHE.

**Request:**
```json
{
  "value": 1000,
  "dataType": "uint32",
  "publicKey": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "encrypted": "0x...",
    "publicKey": "0x...",
    "timestamp": 1234567890
  }
}
```

### POST `/api/fhe/decrypt`
Decrypt FHE ciphertext (requires authorization).

**Request:**
```json
{
  "ciphertext": "0x...",
  "privateKey": "0x...",
  "signature": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "decrypted": 1000,
    "timestamp": 1234567890
  }
}
```

### POST `/api/fhe/compute`
Perform homomorphic computation.

**Request:**
```json
{
  "operation": "add",
  "operands": ["0x...", "0x..."]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "result": "0x...",
    "operation": "add",
    "timestamp": 1234567890
  }
}
```

### POST `/api/keys`
Generate new FHE key pair.

**Response:**
```json
{
  "success": true,
  "data": {
    "publicKey": "0x...",
    "keyId": "key_1234567890",
    "timestamp": 1234567890
  }
}
```

## 🎨 Custom Hooks Usage

### useFHE

Main hook for FHE SDK initialization:

```tsx
import { useFHE } from '@/hooks/useFHE';

function MyComponent() {
  const { isInitialized, initialize, error } = useFHE();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return <div>{isInitialized ? 'Ready!' : 'Initializing...'}</div>;
}
```

### useEncryption

Hook for encryption operations:

```tsx
import { useEncryption } from '@/hooks/useEncryption';

function EncryptComponent() {
  const { encryptWithSDK, encryptWithAPI, isEncrypting } = useEncryption();

  const handleEncrypt = async () => {
    // Using SDK
    const encrypted = await encryptWithSDK(1000, 'uint32');

    // Or using API
    const result = await encryptWithAPI({
      value: 1000,
      dataType: 'uint32'
    });
  };

  return <button onClick={handleEncrypt} disabled={isEncrypting}>Encrypt</button>;
}
```

### useComputation

Hook for homomorphic computation:

```tsx
import { useComputation } from '@/hooks/useComputation';

function ComputeComponent() {
  const { compute, add, subtract, compare, result, isComputing } = useComputation();

  const handleCompute = async () => {
    // Generic compute
    await compute({
      operation: 'add',
      operands: [encrypted1, encrypted2]
    });

    // Or use specific operations
    await add([encrypted1, encrypted2]);
    await subtract([encrypted1, encrypted2]);
    await compare('gt', [encrypted1, encrypted2]);
  };

  return (
    <div>
      <button onClick={handleCompute} disabled={isComputing}>
        Compute
      </button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}
```

## 🎯 Use Cases

### 1. Financial Applications
- Private balance tracking
- Confidential transactions
- Encrypted portfolio management
- Dark pool trading

### 2. Healthcare Systems
- Private patient records
- Encrypted diagnostic data
- Confidential research data
- HIPAA-compliant processing

### 3. Voting Systems
- Anonymous voting
- Private ballot counting
- Verifiable results

### 4. Supply Chain
- Confidential pricing
- Private inventory levels
- Encrypted logistics data

## 🔐 Security Considerations

**Important Notes:**

- ⚠️ This is a **demonstration example**
- 🔑 Never expose private keys client-side in production
- 🔒 Implement proper authorization for decryption
- 🛡️ Use secure key storage solutions
- 🔐 Validate all inputs server-side
- 📝 Audit all sensitive operations

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 📊 Performance Tips

1. **Minimize FHE Operations** - Cache encrypted values
2. **Batch Computations** - Group operations together
3. **Use Appropriate Data Types** - Smaller types = faster operations
4. **Implement Loading States** - Better UX during encryption
5. **Error Handling** - Graceful degradation

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

The application can be deployed to:
- **Netlify** - Full Next.js support
- **AWS Amplify** - Complete deployment
- **Railway** - Easy deployment
- **Self-hosted** - Using `npm build` and `npm start`

## 📚 Learning Resources

### FHEVM SDK Documentation
- Client Library: `src/lib/fhe/client.ts`
- Server Library: `src/lib/fhe/server.ts`
- Type Definitions: `src/types/fhe.ts`

### Next.js App Router
- Official Docs: [https://nextjs.org/docs/app](https://nextjs.org/docs/app)
- API Routes: [https://nextjs.org/docs/app/building-your-application/routing/route-handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Related Examples
- Simple Pages Router: `../nextjs-water-management`
- Full Pages Router: `../nextjs-water-resource-management`
- Vanilla HTML/JS: `../water-resource-management`

## 🔗 Links

- **Main Repository**: [fhevm-react-template](../../)
- **FHEVM SDK**: [packages/fhevm-sdk](../../packages/fhevm-sdk)
- **Zama FHEVM**: [https://github.com/zama-ai/fhevm](https://github.com/zama-ai/fhevm)

## 💡 Key Takeaways

This example demonstrates:

1. ✅ **Modern Architecture** - Next.js 13+ App Router best practices
2. ✅ **Full-Stack FHE** - Client and server-side encryption
3. ✅ **Production Patterns** - Scalable, maintainable code structure
4. ✅ **Type Safety** - Complete TypeScript coverage
5. ✅ **Real-World Use Cases** - Banking and medical examples
6. ✅ **Developer Experience** - Custom hooks and reusable components
7. ✅ **API Design** - RESTful FHE operations

## 📄 License

MIT License - Part of the FHEVM SDK repository

---

**Built with Next.js 14 App Router + FHEVM SDK**

**🔐 Privacy-Preserving Computation Made Simple**
