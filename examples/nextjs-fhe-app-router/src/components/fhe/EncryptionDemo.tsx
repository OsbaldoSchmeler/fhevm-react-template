/**
 * Encryption Demo Component
 * Interactive demonstration of FHE encryption
 */

'use client';

import React, { useState } from 'react';
import { useEncryption } from '@/hooks/useEncryption';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function EncryptionDemo() {
  const [value, setValue] = useState<string>('1000');
  const [dataType, setDataType] = useState<string>('uint32');
  const [encrypted, setEncrypted] = useState<string>('');
  const [useAPI, setUseAPI] = useState(false);

  const { isEncrypting, error, encryptWithSDK, encryptWithAPI } = useEncryption();

  const handleEncrypt = async () => {
    setEncrypted('');

    if (useAPI) {
      const result = await encryptWithAPI({
        value: dataType === 'bool' ? value === 'true' : Number(value),
        dataType: dataType as any,
      });
      if (result) {
        setEncrypted(result.encrypted);
      }
    } else {
      const result = await encryptWithSDK(
        dataType === 'bool' ? value === 'true' : Number(value),
        dataType
      );
      if (result) {
        setEncrypted(result);
      }
    }
  };

  return (
    <Card title="🔐 Encryption Demo" subtitle="Encrypt data using FHE">
      <div className="space-y-4">
        <Input
          label="Value to Encrypt"
          type={dataType === 'bool' ? 'text' : 'number'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Data Type</label>
          <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="uint32">uint32</option>
            <option value="uint64">uint64</option>
            <option value="bool">bool</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="useAPI"
            checked={useAPI}
            onChange={(e) => setUseAPI(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="useAPI" className="text-sm text-gray-300">
            Use API Encryption (server-side)
          </label>
        </div>

        <Button
          onClick={handleEncrypt}
          isLoading={isEncrypting}
          variant="primary"
          className="w-full"
        >
          {isEncrypting ? 'Encrypting...' : 'Encrypt Data'}
        </Button>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            Error: {error}
          </div>
        )}

        {encrypted && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm font-semibold text-blue-400 mb-2">✅ Encrypted Result:</p>
            <p className="font-mono text-xs text-gray-300 break-all">{encrypted}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
