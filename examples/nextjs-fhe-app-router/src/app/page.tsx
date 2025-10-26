/**
 * Main Page
 * Home page showcasing FHE capabilities with FHEVM SDK
 */

'use client';

import React from 'react';
import { useFHEContext } from '@/components/fhe/FHEProvider';
import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { KeyManager } from '@/components/fhe/KeyManager';
import { BankingExample } from '@/components/examples/BankingExample';
import { MedicalExample } from '@/components/examples/MedicalExample';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Home() {
  const { isReady, isInitializing, error, initialize } = useFHEContext();

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            FHEVM SDK
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Next.js App Router + Fully Homomorphic Encryption
          </p>
          <div className="inline-block">
            <div className={`px-6 py-3 rounded-full font-semibold ${
              isReady
                ? 'bg-green-500/20 text-green-400'
                : isInitializing
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-gray-500/20 text-gray-400'
            }`}>
              {isInitializing ? '🔄 Initializing SDK...' : isReady ? '✅ SDK Ready' : '⏸️ SDK Not Initialized'}
            </div>
          </div>
          {error && (
            <div className="mt-4 mx-auto max-w-md p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              Error: {error}
            </div>
          )}
          {!isReady && !isInitializing && (
            <div className="mt-4">
              <Button onClick={initialize} variant="primary" size="lg">
                Initialize FHE SDK
              </Button>
            </div>
          )}
        </header>

        {/* Features Overview */}
        <Card title="🚀 Features" className="mb-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureItem
              icon="🔐"
              title="Client-Side Encryption"
              description="Encrypt data using FHEVM SDK hooks"
            />
            <FeatureItem
              icon="⚡"
              title="Homomorphic Computation"
              description="Compute on encrypted data without decryption"
            />
            <FeatureItem
              icon="🔑"
              title="Key Management"
              description="Generate and manage FHE keys securely"
            />
            <FeatureItem
              icon="🌐"
              title="API Routes"
              description="Server-side FHE operations via Next.js API"
            />
            <FeatureItem
              icon="🏦"
              title="Real-World Examples"
              description="Banking and medical use cases"
            />
            <FeatureItem
              icon="📦"
              title="App Router"
              description="Built with Next.js 13+ App Router"
            />
          </div>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <EncryptionDemo />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <BankingExample />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
              <ComputationDemo />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.25s' }}>
              <MedicalExample />
            </div>
          </div>
        </div>

        {/* Key Management Section */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <KeyManager />
        </div>

        {/* API Information */}
        <Card title="🌐 API Endpoints" className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <APIEndpoint
              method="POST"
              path="/api/fhe/encrypt"
              description="Encrypt data using FHE"
            />
            <APIEndpoint
              method="POST"
              path="/api/fhe/decrypt"
              description="Decrypt FHE ciphertext"
            />
            <APIEndpoint
              method="POST"
              path="/api/fhe/compute"
              description="Perform homomorphic computation"
            />
            <APIEndpoint
              method="POST"
              path="/api/keys"
              description="Generate FHE key pairs"
            />
          </div>
        </Card>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400 text-sm">
          <p>Built with Next.js 14 App Router + FHEVM SDK</p>
          <p className="mt-2">
            🔐 Privacy-Preserving Computation Made Simple
          </p>
        </footer>
      </div>
    </main>
  );
}

// Helper Components

function FeatureItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-blue-500/50 transition-all">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function APIEndpoint({ method, path, description }: { method: string; path: string; description: string }) {
  return (
    <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded">
          {method}
        </span>
        <span className="font-mono text-sm text-gray-300">{path}</span>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
