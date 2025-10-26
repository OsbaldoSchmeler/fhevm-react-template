/**
 * Key Manager Component
 * FHE key generation and management
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getStoredKeyPair, storeKeyPair, clearStoredKeys } from '@/lib/fhe/keys';
import type { ApiResponse, KeysResponse } from '@/types/api';

export function KeyManager() {
  const [publicKey, setPublicKey] = useState<string>('');
  const [keyId, setKeyId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const stored = getStoredKeyPair();
    if (stored?.publicKey) {
      setPublicKey(stored.publicKey);
    }
  }, []);

  const handleGenerateKeys = async () => {
    try {
      setIsGenerating(true);
      setError('');

      const response = await fetch('/api/keys', {
        method: 'POST',
      });

      const result: ApiResponse<KeysResponse> = await response.json();

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Key generation failed');
      }

      const { publicKey: newPublicKey, keyId: newKeyId } = result.data;

      setPublicKey(newPublicKey);
      setKeyId(newKeyId);

      // Store keys
      storeKeyPair({
        publicKey: newPublicKey,
        privateKey: '', // Not storing private key for security
        createdAt: Date.now(),
      });

      setIsGenerating(false);
    } catch (err: any) {
      setError(err.message);
      setIsGenerating(false);
    }
  };

  const handleClearKeys = () => {
    clearStoredKeys();
    setPublicKey('');
    setKeyId('');
  };

  return (
    <Card title="🔑 Key Management" subtitle="Generate and manage FHE keys">
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={handleGenerateKeys}
            isLoading={isGenerating}
            variant="primary"
            className="flex-1"
          >
            {isGenerating ? 'Generating...' : 'Generate New Keys'}
          </Button>
          {publicKey && (
            <Button onClick={handleClearKeys} variant="danger">
              Clear Keys
            </Button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            Error: {error}
          </div>
        )}

        {publicKey && (
          <div className="space-y-3">
            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm font-semibold text-blue-400 mb-2">Public Key:</p>
              <p className="font-mono text-xs text-gray-300 break-all">{publicKey}</p>
            </div>

            {keyId && (
              <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm font-semibold text-purple-400 mb-2">Key ID:</p>
                <p className="font-mono text-xs text-gray-300">{keyId}</p>
              </div>
            )}

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-xs text-yellow-400">
                ⚠️ Demo Only: In production, never expose or store private keys client-side!
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
