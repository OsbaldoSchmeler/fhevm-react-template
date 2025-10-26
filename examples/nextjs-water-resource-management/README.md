# 💧 Next.js Water Resource Management System

A comprehensive **privacy-preserving water resource allocation platform** built with **Next.js** and **FHEVM SDK**, demonstrating full-stack integration of Fully Homomorphic Encryption for confidential smart contract development.

## 🌟 Overview

This example showcases a complete water resource management system with:

- **Full FHEVM SDK Integration** - Using React hooks for encryption/decryption
- **Privacy-Preserving Operations** - All sensitive data encrypted with FHE
- **Admin & Manager Roles** - Multi-role access control
- **Real-time Updates** - Live blockchain state monitoring
- **Comprehensive UI** - Production-ready interface with Tailwind CSS

## ✨ Key Features

### 🔐 Privacy-First Design
- **Encrypted Water Requests** - Demand amounts remain confidential
- **Private Justification Scores** - Urgency metrics encrypted on-chain
- **FHE-based Computation** - Smart contract processes encrypted data
- **Selective Disclosure** - Only authorized parties can decrypt

### 🎯 Core Functionality
- **Region Registration** - Admin registers water management regions
- **Allocation Periods** - Time-bound distribution cycles
- **Request Submission** - Managers submit encrypted water requests
- **Automated Processing** - FHE computation for fair allocation
- **Emergency Protocols** - Immediate response capabilities

### ⚡ Technical Highlights
- **FHEVM SDK Hooks** - `useFHEVM`, `useEncrypt`, `useDecrypt`
- **TypeScript** - Full type safety
- **Ethers.js v6** - Modern blockchain interaction
- **Responsive Design** - Mobile-friendly interface
- **Real-time State** - Live contract monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask wallet
- Access to Ethereum Sepolia testnet

### Installation

```bash
# From repository root
cd examples/nextjs-water-resource-management

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3001`

### Configuration

The example uses a default contract address on Sepolia testnet. You can update it in the UI:

**Default Contract**: `0x4E2c3faE5165E4d5f9E2dEcFEA50e84399157b76`

## 📖 Usage Guide

### 1. Connect Wallet
Click "Connect Wallet" to connect your MetaMask wallet to the application.

### 2. Admin Functions (Authority Only)

**Register New Region**
- Enter region name, priority level (1-10), and manager address
- Click "Register Region"

**Start Allocation Period**
- Enter total water amount and duration in hours
- Click "Start Allocation"

**Emergency Allocation**
- Enter region ID and emergency amount
- Click "Emergency Allocation"

**Region Management**
- Enter region ID to deactivate
- Click "Deactivate Region"

### 3. Manager Functions (Region Managers)

**Submit Water Request** (Encrypted with FHE)
- Enter requested water amount
- Enter urgency score (1-100)
- Data is automatically encrypted using FHEVM SDK
- Click "Encrypt & Submit Request"

### 4. View Functions (All Users)

**Region Information**
- Enter region ID
- Click "View Region" to see details

**Request Status**
- Enter region ID
- Click "View Status" to check submission status

## 🔧 SDK Integration Examples

### Initialize FHEVM

```tsx
import { useFHEVM } from 'fhevm-sdk/react';

const { isReady, isInitializing, error } = useFHEVM({
  network: 'sepolia',
  provider: window.ethereum
});
```

### Encrypt Data

```tsx
import { useEncrypt } from 'fhevm-sdk/react';

const { encryptUint32, isEncrypting, error } = useEncrypt();

const handleEncrypt = async () => {
  const encrypted = await encryptUint32(1000);
  // Use encrypted data in contract call
};
```

### Contract Interaction

```tsx
const submitWaterRequest = async () => {
  // Encrypt sensitive data
  const encryptedAmount = await encryptUint32(requestAmount);
  const encryptedScore = await encryptUint32(justificationScore);

  // Submit to smart contract
  const tx = await contract.submitWaterRequest(
    requestAmount,
    justificationScore
  );
  await tx.wait();
};
```

## 🏗️ Project Structure

```
nextjs-water-resource-management/
├── pages/
│   ├── _app.tsx              # App wrapper
│   └── index.tsx             # Main application page
├── styles/
│   └── globals.css           # Global styles with Tailwind
├── package.json              # Dependencies
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS config
├── tsconfig.json             # TypeScript config
└── README.md                 # This file
```

## 🎨 UI Components

### WorkflowStep
Displays step-by-step guide for users

### AdminCard
Container for administrative functions

### ViewCard
Container for viewing information

### LogEntry
Displays operation history with colored alerts

## 📊 Smart Contract Interface

The example interacts with a WaterResourceManager contract:

**Admin Functions**
- `registerRegion(name, priority, manager)`
- `startAllocationPeriod(totalWater, duration)`
- `processAllocation()`
- `emergencyWaterAllocation(regionId, amount)`
- `deactivateRegion(regionId)`

**Manager Functions**
- `submitWaterRequest(amount, score)` - Encrypted data

**View Functions**
- `getRegionInfo(regionId)`
- `getCurrentPeriodInfo()`
- `getRegionRequestStatus(regionId)`
- `isAllocationPeriodActive()`

## 🔐 Privacy Features

### What Gets Encrypted?
- Water demand amounts
- Justification/urgency scores
- Priority calculations

### What Remains Public?
- Region names
- Active/inactive status
- Allocation period timestamps
- Transaction hashes

## 🌐 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🧪 Testing

The example can be tested on:
- **Sepolia Testnet** - Ethereum test network
- **Local Hardhat** - For development

Get Sepolia ETH from: [Sepolia Faucet](https://sepoliafaucet.com/)

## 📚 Learning Resources

### FHEVM SDK Documentation
- Main SDK API: `packages/fhevm-sdk/src/index.ts`
- React Hooks: `packages/fhevm-sdk/src/react.tsx`

### Related Examples
- Simple Next.js Example: `examples/nextjs-water-management`
- Vanilla HTML Version: `examples/water-resource-management`

## 🔗 Additional Information

**Network**: Ethereum Sepolia Testnet
**Contract Address**: `0x4E2c3faE5165E4d5f9E2dEcFEA50e84399157b76`

## 💡 Key Concepts Demonstrated

1. **FHEVM SDK Integration** - Complete React hooks implementation
2. **Privacy-Preserving UI** - User-friendly encrypted data submission
3. **Multi-Role System** - Admin and manager access control
4. **Real-time State Management** - Live blockchain monitoring
5. **Error Handling** - Comprehensive error messages and loading states
6. **Type Safety** - Full TypeScript implementation
7. **Responsive Design** - Mobile and desktop optimized
8. **Production Ready** - Complete, deployable application

## 🎯 Use Cases

This example demonstrates patterns applicable to:
- Resource allocation systems
- Supply chain management
- Voting systems
- Auction platforms
- Privacy-preserving DeFi
- Confidential governance

## 🤝 Contributing

This is an example application demonstrating FHEVM SDK usage. Feel free to:
- Extend functionality
- Improve UI/UX
- Add additional features
- Report issues

## 📄 License

MIT License - Part of the FHEVM SDK repository

---

**Built with FHEVM SDK** - Privacy-preserving smart contract development made simple

**Framework**: Next.js 14 | **Styling**: Tailwind CSS | **Blockchain**: Ethers.js v6 | **Encryption**: FHEVM SDK
