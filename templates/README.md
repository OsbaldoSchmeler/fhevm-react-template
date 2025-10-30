# FHEVM SDK Templates

This directory contains integration templates and examples for using the FHEVM SDK across different frameworks and platforms.

## 📁 Available Templates

### 🌐 [Next.js](./nextjs/)
Complete Next.js integration examples with both App Router and Pages Router patterns.

**Features:**
- ✅ App Router (Next.js 13+)
- ✅ Pages Router (Classic)
- ✅ React hooks integration
- ✅ TypeScript support
- ✅ Working examples in `../examples/`

**Get Started:**
```bash
cd nextjs/
cat README.md
```

### ⚛️ [React](./react/)
React integration guide for Create React App, Vite, and other React setups.

**Features:**
- ✅ React hooks (`useFHEVM`, `useEncrypt`, `useDecrypt`)
- ✅ Provider pattern
- ✅ Component examples
- ✅ Vite configuration

**Get Started:**
```bash
cd react/
cat README.md
```

### 🟢 [Vue](./vue/)
Vue.js integration using composables (Vue 3 Composition API).

**Features:**
- ✅ Composable patterns
- ✅ Provide/Inject support
- ✅ Core SDK integration
- 🚧 Native adapter coming soon

**Get Started:**
```bash
cd vue/
cat README.md
```

### 🟦 [Node.js](./nodejs/)
Backend and server-side integration examples.

**Features:**
- ✅ Express.js API server
- ✅ CLI tool examples
- ✅ Serverless functions
- ✅ CommonJS and ES Modules

**Get Started:**
```bash
cd nodejs/
cat README.md
```

## 🚀 Quick Comparison

| Template | Framework | SDK Integration | Examples | Status |
|----------|-----------|-----------------|----------|--------|
| **Next.js** | Next.js 13+ | React Hooks | ✅ 3 complete apps | ✅ Production Ready |
| **React** | React 18+ | React Hooks | ✅ Components | ✅ Production Ready |
| **Vue** | Vue 3+ | Core SDK | 📝 Code samples | 🚧 Composables only |
| **Node.js** | Node.js 18+ | Core SDK | 📝 Code samples | ✅ Ready to use |

## 📦 Installation

All templates use the same core SDK:

```bash
npm install fhevm-sdk ethers
```

### Framework-Specific Dependencies

**Next.js / React:**
```bash
npm install fhevm-sdk ethers react react-dom
```

**Vue:**
```bash
npm install fhevm-sdk ethers vue
```

**Node.js:**
```bash
npm install fhevm-sdk ethers
```

## 🎯 Choose Your Template

### Building a Frontend Application?

- **Using Next.js?** → Use [Next.js template](./nextjs/)
  - See working examples in `../examples/nextjs-fhe-app-router/`
  - See working examples in `../examples/nextjs-water-resource-management/`

- **Using React (CRA/Vite)?** → Use [React template](./react/)

- **Using Vue?** → Use [Vue template](./vue/)

### Building a Backend Service?

- **API Server / CLI / Serverless?** → Use [Node.js template](./nodejs/)

## 🔧 Core SDK Features

All templates provide access to these core features:

### Initialization
```javascript
import { initFHEVM } from 'fhevm-sdk';

await initFHEVM({
  network: 'sepolia',
  provider: window.ethereum
});
```

### Encryption
```javascript
import { encrypt } from 'fhevm-sdk';

const encrypted32 = await encrypt.uint32(1000);
const encrypted64 = await encrypt.uint64(1000000);
const encryptedBool = await encrypt.bool(true);
```

### Decryption
```javascript
import { decrypt } from 'fhevm-sdk';

const value = await decrypt.user(ciphertext, { signer: wallet });
const publicValue = await decrypt.public(ciphertext);
```

### Contract Interaction
```javascript
import { createFHEContract } from 'fhevm-sdk';

const contract = await createFHEContract({
  address: '0x...',
  abi: contractABI,
  provider: provider
});
```

## 📚 Working Examples

### Next.js Examples

**1. App Router Example** (`../examples/nextjs-fhe-app-router/`)
- Complete Next.js 13+ App Router implementation
- API routes for FHE operations
- Custom hooks and components
- Banking and medical use case demos

**2. Full Water Resource Management** (`../examples/nextjs-water-resource-management/`)
- Production-ready application
- Multi-role system (admin, managers)
- Privacy-preserving resource allocation
- Complete TypeScript implementation

**3. Simple Demo** (`../examples/nextjs-water-management/`)
- Minimal Next.js example
- Basic SDK usage
- Educational code

### Vanilla JavaScript

**Water Resource Management** (`../examples/water-resource-management/`)
- No build tools required
- Pure HTML/CSS/JavaScript
- Same functionality as Next.js version
- Live demo: https://fhe-water-resource-manager.vercel.app/

## 🔗 Additional Resources

- **Main README**: `../README.md`
- **SDK Package**: `../packages/fhevm-sdk/`
- **Documentation**: `../docs/`
- **Smart Contracts**: `../contracts/`

## 🎓 Learning Path

1. **Start Here**: Read the [main README](../README.md)
2. **Choose Template**: Pick the template for your framework
3. **Study Examples**: Review working examples in `../examples/`
4. **Build Your App**: Use the template as a starting point
5. **Read Docs**: Check `../docs/` for advanced features

## 💡 Example Use Cases

### Confidential Voting
```typescript
const encryptedVote = await encrypt.uint32(candidateId);
await votingContract.castVote(encryptedVote);
```

### Private Auctions
```typescript
const encryptedBid = await encrypt.uint32(bidAmount);
await auctionContract.placeBid(encryptedBid);
```

### Secret Resource Allocation
```typescript
const encryptedDemand = await encrypt.uint32(waterDemand);
await resourceContract.submitRequest(encryptedDemand);
```

### Privacy-Preserving DeFi
```typescript
const encryptedAmount = await encrypt.uint64(depositAmount);
await defiContract.deposit(encryptedAmount);
```

## 🤝 Contributing

Found an issue with a template? Have a suggestion?

- **Issues**: https://github.com/OsbaldoSchmeler/fhevm-react-template/issues
- **Discussions**: https://github.com/OsbaldoSchmeler/fhevm-react-template/discussions

## 📞 Support

- **GitHub**: https://github.com/OsbaldoSchmeler/fhevm-react-template
- **Documentation**: `../docs/`
- **Zama FHEVM**: https://docs.zama.ai/fhevm

---

**🔐 Built for Privacy-Preserving Applications**

Start building confidential dApps with FHEVM SDK today!
