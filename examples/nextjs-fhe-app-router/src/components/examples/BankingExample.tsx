/**
 * Banking Example Component
 * Demonstrates FHE for confidential banking operations
 */

'use client';

import React, { useState } from 'react';
import { useEncryption } from '@/hooks/useEncryption';
import { useComputation } from '@/hooks/useComputation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function BankingExample() {
  const [balance, setBalance] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [encryptedBalance, setEncryptedBalance] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const { encryptWithSDK, isEncrypting } = useEncryption();
  const { compute, isComputing } = useComputation();

  const handleEncryptBalance = async () => {
    const encrypted = await encryptWithSDK(Number(balance), 'uint32');
    if (encrypted) setEncryptedBalance(encrypted);
  };

  const handleDeposit = async () => {
    const encryptedAmount = await encryptWithSDK(Number(amount), 'uint32');
    if (!encryptedAmount || !encryptedBalance) return;

    const computeResult = await compute({
      operation: 'add',
      operands: [encryptedBalance, encryptedAmount],
    });

    if (computeResult) setResult(computeResult.result);
  };

  return (
    <Card title="🏦 Banking Example" subtitle="Confidential balance operations">
      <div className="space-y-4">
        <Input
          label="Initial Balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Enter balance"
        />

        <Button onClick={handleEncryptBalance} isLoading={isEncrypting} className="w-full">
          Encrypt Balance
        </Button>

        {encryptedBalance && (
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-400 mb-1">✅ Encrypted Balance</p>
            <p className="font-mono text-xs text-gray-300 break-all">{encryptedBalance}</p>
          </div>
        )}

        <Input
          label="Deposit Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to deposit"
        />

        <Button
          onClick={handleDeposit}
          isLoading={isComputing}
          disabled={!encryptedBalance}
          variant="success"
          className="w-full"
        >
          Deposit (Encrypted)
        </Button>

        {result && (
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-green-400 mb-1">✅ New Balance (Encrypted)</p>
            <p className="font-mono text-xs text-gray-300 break-all">{result}</p>
            <p className="text-xs text-gray-400 mt-2">
              Balance updated without revealing amounts!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
