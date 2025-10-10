/**
 * Next.js Water Resource Management Example
 * Demonstrates FHEVM SDK usage in a Next.js application
 */

import { useState, useEffect } from 'react';
import { useFHEVM, useEncrypt, useDecrypt } from 'fhevm-sdk/react';
import Head from 'next/head';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Initialize FHEVM SDK
  const { isReady, isInitializing, error: initError } = useFHEVM({
    network: 'sepolia',
    provider: typeof window !== 'undefined' ? window.ethereum : null
  });

  // Encryption hook
  const { encryptUint32, isEncrypting, error: encryptError } = useEncrypt();

  // Decryption hook (would be used when decrypting results)
  const { decryptUser, isDecrypting } = useDecrypt();

  // Form state
  const [waterDemand, setWaterDemand] = useState<number>(1000);
  const [priorityLevel, setPriorityLevel] = useState<number>(5);
  const [encryptedData, setEncryptedData] = useState<{
    demand: string | null;
    priority: string | null;
  }>({
    demand: null,
    priority: null
  });

  // Fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEncrypt = async () => {
    const encryptedDemand = await encryptUint32(waterDemand);
    const encryptedPriority = await encryptUint32(priorityLevel);

    setEncryptedData({
      demand: encryptedDemand,
      priority: encryptedPriority
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>FHEVM SDK - Next.js Example</title>
        <meta name="description" content="Privacy-preserving water resource management with FHEVM SDK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              💧 FHEVM SDK Demo
            </h1>
            <p className="text-xl text-gray-600">
              Next.js Example - Privacy-Preserving Water Resource Management
            </p>
          </div>

          {/* SDK Status */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🔐 SDK Status
            </h2>
            <div className="space-y-2">
              <StatusBadge
                label="Initialization"
                status={isInitializing ? 'loading' : isReady ? 'success' : 'idle'}
                message={
                  isInitializing
                    ? 'Initializing FHEVM...'
                    : isReady
                    ? '✅ SDK Ready'
                    : '⏸️ Not initialized'
                }
              />
              {initError && (
                <div className="text-red-600 text-sm mt-2">
                  Error: {initError.message}
                </div>
              )}
            </div>
          </div>

          {/* Main Demo */}
          {isReady && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                📝 Submit Water Request
              </h2>

              {/* Input Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Water Demand (liters)
                  </label>
                  <input
                    type="number"
                    value={waterDemand}
                    onChange={(e) => setWaterDemand(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter water demand"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This value will be encrypted and private
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={priorityLevel}
                    onChange={(e) => setPriorityLevel(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Low (1)</span>
                    <span className="font-bold text-blue-600">
                      Current: {priorityLevel}
                    </span>
                    <span>High (10)</span>
                  </div>
                </div>

                <button
                  onClick={handleEncrypt}
                  disabled={isEncrypting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  {isEncrypting ? '🔐 Encrypting...' : '🔒 Encrypt Data'}
                </button>

                {encryptError && (
                  <div className="text-red-600 text-sm">
                    Error: {encryptError.message}
                  </div>
                )}
              </div>

              {/* Encrypted Results */}
              {(encryptedData.demand || encryptedData.priority) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">
                    ✅ Encrypted Data (FHE Ciphertext)
                  </h3>
                  <div className="space-y-2 text-sm font-mono">
                    {encryptedData.demand && (
                      <div>
                        <span className="text-gray-600">Demand:</span>
                        <div className="text-xs text-blue-600 break-all">
                          {encryptedData.demand}
                        </div>
                      </div>
                    )}
                    {encryptedData.priority && (
                      <div>
                        <span className="text-gray-600">Priority:</span>
                        <div className="text-xs text-blue-600 break-all">
                          {encryptedData.priority}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    ℹ️ These encrypted values can be sent to the smart contract without
                    revealing the actual amounts
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon="🔐"
              title="Privacy-Preserving"
              description="Data encrypted on client-side using FHE"
            />
            <FeatureCard
              icon="⚡"
              title="React Hooks"
              description="wagmi-like hooks for easy integration"
            />
            <FeatureCard
              icon="🎯"
              title="Type-Safe"
              description="Full TypeScript support"
            />
          </div>

          {/* Code Example */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-xl font-bold text-white mb-4">
              💻 Code Example
            </h2>
            <pre className="text-sm text-green-400 overflow-x-auto">
              <code>{`import { useFHEVM, useEncrypt } from 'fhevm-sdk/react';

function WaterRequest() {
  const { isReady } = useFHEVM({ network: 'sepolia' });
  const { encryptUint32 } = useEncrypt();

  const handleSubmit = async () => {
    // Encrypt sensitive data
    const encrypted = await encryptUint32(1000);

    // Send to contract (encrypted!)
    await contract.submitRequest(encrypted);
  };

  return <button onClick={handleSubmit}>Submit</button>;
}`}</code>
            </pre>
          </div>
        </div>
      </main>
    </>
  );
}

// ============================================================================
// Components
// ============================================================================

function StatusBadge({
  label,
  status,
  message
}: {
  label: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}) {
  const colors = {
    idle: 'bg-gray-100 text-gray-800',
    loading: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800'
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}:</span>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[status]}`}>
        {message}
      </span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
