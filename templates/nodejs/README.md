# Node.js Template - FHEVM SDK Integration

This template demonstrates how to use the FHEVM SDK in Node.js applications, including backend services, CLI tools, and serverless functions.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install fhevm-sdk ethers
```

### 2. Basic Usage

**`index.js` (CommonJS):**

```javascript
const { initFHEVM, encrypt, decrypt } = require('fhevm-sdk');
const { ethers } = require('ethers');

async function main() {
  // Setup provider
  const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_KEY');
  const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  // Initialize SDK
  await initFHEVM({
    network: 'sepolia',
    provider: provider
  });

  console.log('✅ FHEVM SDK initialized');

  // Encrypt data
  const encrypted = await encrypt.uint32(1000);
  console.log('🔐 Encrypted:', encrypted);

  // Decrypt data
  const decrypted = await decrypt.user(encrypted, { signer: wallet });
  console.log('🔓 Decrypted:', decrypted);
}

main().catch(console.error);
```

**`index.mjs` (ES Modules):**

```javascript
import { initFHEVM, encrypt, decrypt } from 'fhevm-sdk';
import { ethers } from 'ethers';

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  await initFHEVM({
    network: 'sepolia',
    provider: provider
  });

  const encrypted = await encrypt.uint32(1000);
  console.log('Encrypted:', encrypted);

  const decrypted = await decrypt.user(encrypted, { signer: wallet });
  console.log('Decrypted:', decrypted);
}

main();
```

## 📦 Backend Service Example

### Express.js API

```javascript
import express from 'express';
import { initFHEVM, encrypt, decrypt, createFHEContract } from 'fhevm-sdk';
import { ethers } from 'ethers';

const app = express();
app.use(express.json());

let fheInitialized = false;
let provider;
let wallet;

// Initialize on startup
async function initializeFHE() {
  provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  await initFHEVM({
    network: 'sepolia',
    provider: provider
  });

  fheInitialized = true;
  console.log('✅ FHE initialized');
}

// Encrypt endpoint
app.post('/api/encrypt', async (req, res) => {
  if (!fheInitialized) {
    return res.status(503).json({ error: 'FHE not initialized' });
  }

  try {
    const { value, type } = req.body;

    let encrypted;
    switch (type) {
      case 'uint32':
        encrypted = await encrypt.uint32(value);
        break;
      case 'uint64':
        encrypted = await encrypt.uint64(value);
        break;
      case 'bool':
        encrypted = await encrypt.bool(value);
        break;
      default:
        return res.status(400).json({ error: 'Invalid type' });
    }

    res.json({ encrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Decrypt endpoint
app.post('/api/decrypt', async (req, res) => {
  if (!fheInitialized) {
    return res.status(503).json({ error: 'FHE not initialized' });
  }

  try {
    const { ciphertext } = req.body;

    const decrypted = await decrypt.user(ciphertext, { signer: wallet });

    res.json({ decrypted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Contract interaction endpoint
app.post('/api/contract/call', async (req, res) => {
  try {
    const { contractAddress, abi, method, args } = req.body;

    const contract = await createFHEContract({
      address: contractAddress,
      abi: abi,
      provider: wallet
    });

    const result = await contract[method](...args);
    await result.wait();

    res.json({ success: true, txHash: result.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

initializeFHE().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
```

## 🛠️ CLI Tool Example

**`cli.js`:**

```javascript
#!/usr/bin/env node

import { Command } from 'commander';
import { initFHEVM, encrypt, decrypt } from 'fhevm-sdk';
import { ethers } from 'ethers';

const program = new Command();

program
  .name('fhevm-cli')
  .description('FHEVM SDK Command Line Tool')
  .version('1.0.0');

program
  .command('encrypt')
  .description('Encrypt a value')
  .argument('<value>', 'Value to encrypt')
  .option('-t, --type <type>', 'Data type (uint32, uint64, bool)', 'uint32')
  .action(async (value, options) => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    await initFHEVM({
      network: 'sepolia',
      provider: provider
    });

    let encrypted;
    switch (options.type) {
      case 'uint32':
        encrypted = await encrypt.uint32(parseInt(value));
        break;
      case 'uint64':
        encrypted = await encrypt.uint64(parseInt(value));
        break;
      case 'bool':
        encrypted = await encrypt.bool(value === 'true');
        break;
    }

    console.log('🔐 Encrypted:', encrypted);
  });

program
  .command('decrypt')
  .description('Decrypt a ciphertext')
  .argument('<ciphertext>', 'Ciphertext to decrypt')
  .action(async (ciphertext) => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    await initFHEVM({
      network: 'sepolia',
      provider: provider
    });

    const decrypted = await decrypt.user(ciphertext, { signer: wallet });

    console.log('🔓 Decrypted:', decrypted);
  });

program.parse();
```

**Usage:**

```bash
# Encrypt
node cli.js encrypt 1000 --type uint32

# Decrypt
node cli.js decrypt 0x123456...
```

## ☁️ Serverless Function Example

### AWS Lambda

```javascript
import { initFHEVM, encrypt } from 'fhevm-sdk';
import { ethers } from 'ethers';

let fheInitialized = false;

async function ensureFHEInitialized() {
  if (!fheInitialized) {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    await initFHEVM({
      network: 'sepolia',
      provider: provider
    });

    fheInitialized = true;
  }
}

export const handler = async (event) => {
  try {
    await ensureFHEInitialized();

    const { value, type } = JSON.parse(event.body);

    let encrypted;
    switch (type) {
      case 'uint32':
        encrypted = await encrypt.uint32(value);
        break;
      case 'uint64':
        encrypted = await encrypt.uint64(value);
        break;
      default:
        throw new Error('Invalid type');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ encrypted })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

## 🔧 Environment Configuration

**`.env`:**

```env
RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key_here
FHEVM_NETWORK=sepolia
CONTRACT_ADDRESS=0x...
```

**Load environment variables:**

```javascript
import dotenv from 'dotenv';
dotenv.config();
```

## 📚 Common Patterns

### Singleton Pattern

```javascript
class FHEVMService {
  static instance;

  constructor() {
    this.initialized = false;
  }

  static getInstance() {
    if (!FHEVMService.instance) {
      FHEVMService.instance = new FHEVMService();
    }
    return FHEVMService.instance;
  }

  async initialize(config) {
    if (this.initialized) return;

    await initFHEVM(config);
    this.initialized = true;
  }

  async encryptValue(value, type) {
    if (!this.initialized) throw new Error('Not initialized');

    switch (type) {
      case 'uint32':
        return await encrypt.uint32(value);
      case 'uint64':
        return await encrypt.uint64(value);
      default:
        throw new Error('Invalid type');
    }
  }
}

export default FHEVMService;
```

### Batch Processing

```javascript
async function batchEncrypt(values) {
  await initFHEVM({ network: 'sepolia', provider: provider });

  const results = await Promise.all(
    values.map(async (value) => {
      return await encrypt.uint32(value);
    })
  );

  return results;
}

const encrypted = await batchEncrypt([100, 200, 300, 400]);
```

## 🔗 Learn More

- **SDK Documentation**: `../../docs/`
- **Main README**: `../../README.md`
- **Examples**: `../../examples/`
- **Zama FHEVM**: https://docs.zama.ai/fhevm

## 📞 Support

- GitHub: https://github.com/OsbaldoSchmeler/fhevm-react-template
- Issues: https://github.com/OsbaldoSchmeler/fhevm-react-template/issues
