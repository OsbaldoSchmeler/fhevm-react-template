/**
 * Computation Demo Component
 * Interactive demonstration of homomorphic computation
 */

'use client';

import React, { useState } from 'react';
import { useComputation } from '@/hooks/useComputation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ComputationDemo() {
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operation, setOperation] = useState<'add' | 'sub' | 'mul' | 'div' | 'gt' | 'lt' | 'eq'>('add');

  const { isComputing, error, result, compute, clear } = useComputation();

  const handleCompute = async () => {
    if (!operand1 || !operand2) {
      return;
    }

    await compute({
      operation,
      operands: [operand1, operand2],
    });
  };

  const handleClear = () => {
    setOperand1('');
    setOperand2('');
    clear();
  };

  return (
    <Card title="⚡ Homomorphic Computation" subtitle="Compute on encrypted data">
      <div className="space-y-4">
        <Input
          label="Encrypted Operand 1"
          value={operand1}
          onChange={(e) => setOperand1(e.target.value)}
          placeholder="0x..."
          helperText="Paste encrypted value"
        />

        <Input
          label="Encrypted Operand 2"
          value={operand2}
          onChange={(e) => setOperand2(e.target.value)}
          placeholder="0x..."
          helperText="Paste encrypted value"
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="add">Addition (+)</option>
            <option value="sub">Subtraction (-)</option>
            <option value="mul">Multiplication (×)</option>
            <option value="div">Division (÷)</option>
            <option value="gt">Greater Than (>)</option>
            <option value="lt">Less Than (<)</option>
            <option value="eq">Equal (=)</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCompute}
            isLoading={isComputing}
            variant="success"
            className="flex-1"
            disabled={!operand1 || !operand2}
          >
            {isComputing ? 'Computing...' : 'Compute'}
          </Button>
          <Button onClick={handleClear} variant="secondary">
            Clear
          </Button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-sm font-semibold text-green-400 mb-2">✅ Computation Result:</p>
            <p className="font-mono text-xs text-gray-300 break-all">{result}</p>
            <p className="text-xs text-gray-400 mt-2">
              The result is still encrypted and can be used in further computations
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
