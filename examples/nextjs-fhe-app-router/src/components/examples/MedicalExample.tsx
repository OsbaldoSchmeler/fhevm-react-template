/**
 * Medical Example Component
 * Demonstrates FHE for confidential medical data
 */

'use client';

import React, { useState } from 'react';
import { useEncryption } from '@/hooks/useEncryption';
import { useComputation } from '@/hooks/useComputation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function MedicalExample() {
  const [patientAge, setPatientAge] = useState<string>('');
  const [riskScore, setRiskScore] = useState<string>('');
  const [encryptedAge, setEncryptedAge] = useState<string>('');
  const [encryptedRisk, setEncryptedRisk] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<string>('');

  const { encryptWithSDK, isEncrypting } = useEncryption();
  const { compute, isComputing } = useComputation();

  const handleEncryptData = async () => {
    const age = await encryptWithSDK(Number(patientAge), 'uint32');
    const risk = await encryptWithSDK(Number(riskScore), 'uint32');

    if (age) setEncryptedAge(age);
    if (risk) setEncryptedRisk(risk);
  };

  const handleCheckRisk = async () => {
    if (!encryptedAge || !encryptedRisk) return;

    const result = await compute({
      operation: 'gt',
      operands: [encryptedRisk, encryptedAge],
    });

    if (result) setComparisonResult(result.result);
  };

  return (
    <Card title="🏥 Medical Example" subtitle="Privacy-preserving health data">
      <div className="space-y-4">
        <Input
          label="Patient Age"
          type="number"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
          placeholder="Enter age"
          helperText="Remains confidential"
        />

        <Input
          label="Risk Score (0-100)"
          type="number"
          value={riskScore}
          onChange={(e) => setRiskScore(e.target.value)}
          placeholder="Enter risk score"
          helperText="Private health metric"
        />

        <Button onClick={handleEncryptData} isLoading={isEncrypting} className="w-full">
          Encrypt Patient Data
        </Button>

        {encryptedAge && encryptedRisk && (
          <div className="space-y-2">
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-blue-400">✅ Data Encrypted</p>
            </div>

            <Button
              onClick={handleCheckRisk}
              isLoading={isComputing}
              variant="warning"
              className="w-full"
            >
              Analyze Risk (Encrypted)
            </Button>
          </div>
        )}

        {comparisonResult && (
          <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-xs text-purple-400 mb-1">✅ Analysis Complete</p>
            <p className="font-mono text-xs text-gray-300 break-all">{comparisonResult}</p>
            <p className="text-xs text-gray-400 mt-2">
              Risk analysis performed without exposing patient data!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
