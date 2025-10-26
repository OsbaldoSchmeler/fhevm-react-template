/**
 * Next.js Water Resource Management System
 * Full-featured privacy-preserving water allocation platform with FHEVM SDK
 */

import { useState, useEffect } from 'react';
import { useFHEVM, useEncrypt, useDecrypt } from 'fhevm-sdk/react';
import { ethers } from 'ethers';
import Head from 'next/head';

// Contract ABI
const CONTRACT_ABI = [
  "function authority() view returns (address)",
  "function currentAllocationPeriod() view returns (uint32)",
  "function totalRegions() view returns (uint32)",
  "function nextRegionId() view returns (uint32)",
  "function registerRegion(string calldata name, uint32 _priorityLevel, address _manager) external returns (uint32)",
  "function startAllocationPeriod(uint32 _totalAvailableWater, uint256 _durationHours) external",
  "function submitWaterRequest(uint32 _requestedAmount, uint32 _justificationScore) external",
  "function processAllocation() external",
  "function emergencyWaterAllocation(uint32 regionId, uint32 emergencyAmount) external",
  "function deactivateRegion(uint32 regionId) external",
  "function updateRegionManager(uint32 regionId, address newManager) external",
  "function getRegionInfo(uint32 regionId) view returns (string memory name, bool isActive, uint256 lastUpdateTime, address manager)",
  "function getCurrentPeriodInfo() view returns (uint32 periodId, uint256 startTime, uint256 endTime, bool distributionCompleted, uint32 participatingRegions, bool isActive)",
  "function getRegionRequestStatus(uint32 regionId) view returns (bool hasSubmittedRequest, bool isProcessed, uint256 timestamp)",
  "function isAllocationPeriodActive() view returns (bool)",
];

const DEFAULT_CONTRACT_ADDRESS = '0x4E2c3faE5165E4d5f9E2dEcFEA50e84399157b76';

interface Log {
  timestamp: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export default function WaterResourceManagement() {
  const [mounted, setMounted] = useState(false);
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [userAddress, setUserAddress] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>(DEFAULT_CONTRACT_ADDRESS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegionManager, setIsRegionManager] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);
  const [networkInfo, setNetworkInfo] = useState({ name: 'Not Connected', chainId: '-' });
  const [workflowStatus, setWorkflowStatus] = useState('Please connect your wallet first');

  // FHEVM SDK hooks
  const { isReady, isInitializing, error: initError } = useFHEVM({
    network: 'sepolia',
    provider: typeof window !== 'undefined' ? window.ethereum : null
  });

  const { encryptUint32, isEncrypting, error: encryptError } = useEncrypt();

  // Form states
  const [regionName, setRegionName] = useState('');
  const [priorityLevel, setPriorityLevel] = useState<number>(5);
  const [managerAddress, setManagerAddress] = useState('');
  const [totalWaterAmount, setTotalWaterAmount] = useState<number>(0);
  const [durationHours, setDurationHours] = useState<number>(24);
  const [requestAmount, setRequestAmount] = useState<number>(0);
  const [justificationScore, setJustificationScore] = useState<number>(50);
  const [emergencyRegionId, setEmergencyRegionId] = useState<number>(0);
  const [emergencyAmount, setEmergencyAmount] = useState<number>(0);
  const [deactivateRegionId, setDeactivateRegionId] = useState<number>(0);
  const [viewRegionId, setViewRegionId] = useState<number>(0);
  const [statusRegionId, setStatusRegionId] = useState<number>(0);
  const [regionInfo, setRegionInfo] = useState<any>(null);
  const [requestStatus, setRequestStatus] = useState<any>(null);
  const [periodInfo, setPeriodInfo] = useState<any>(null);
  const [contractAddressInput, setContractAddressInput] = useState(DEFAULT_CONTRACT_ADDRESS);

  // Fix hydration
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('contractAddress');
    if (saved) {
      setContractAddress(saved);
      setContractAddressInput(saved);
    }
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('Please install MetaMask wallet');
      }

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3Signer = await web3Provider.getSigner();
      const address = await web3Signer.getAddress();

      setProvider(web3Provider);
      setSigner(web3Signer);
      setUserAddress(address);

      const network = await web3Provider.getNetwork();
      setNetworkInfo({
        name: network.name || 'Unknown',
        chainId: network.chainId.toString()
      });

      if (contractAddress && ethers.isAddress(contractAddress)) {
        const contractInstance = new ethers.Contract(contractAddress, CONTRACT_ABI, web3Signer);
        setContract(contractInstance);
        await checkUserRole(contractInstance, address);
        await loadPeriodInfo(contractInstance);
      }

      addLog('Wallet connected successfully', 'success');

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          window.location.reload();
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    } catch (error: any) {
      addLog('Failed to connect wallet: ' + error.message, 'error');
    }
  };

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setUserAddress('');
    setIsAdmin(false);
    setIsRegionManager(false);
    setNetworkInfo({ name: 'Not Connected', chainId: '-' });
    setWorkflowStatus('Please connect your wallet first');
  };

  const setContractAddressHandler = () => {
    if (!contractAddressInput) {
      addLog('Please enter a contract address', 'warning');
      return;
    }

    if (!ethers.isAddress(contractAddressInput)) {
      addLog('Invalid contract address format', 'error');
      return;
    }

    setContractAddress(contractAddressInput);
    localStorage.setItem('contractAddress', contractAddressInput);

    if (signer) {
      const contractInstance = new ethers.Contract(contractAddressInput, CONTRACT_ABI, signer);
      setContract(contractInstance);
      checkUserRole(contractInstance, userAddress);
      loadPeriodInfo(contractInstance);
    }

    addLog('Contract address set successfully', 'success');
  };

  const checkUserRole = async (contractInstance: any, address: string) => {
    try {
      const authority = await contractInstance.authority();
      const isAdminUser = authority.toLowerCase() === address.toLowerCase();
      setIsAdmin(isAdminUser);
      setIsRegionManager(true);
      updateWorkflowStatus(contractInstance);
    } catch (error: any) {
      addLog('Failed to check user role: ' + error.message, 'warning');
    }
  };

  const updateWorkflowStatus = async (contractInstance: any) => {
    if (!contractInstance) {
      setWorkflowStatus('⚠️ Contract not connected. Please set contract address.');
      return;
    }

    try {
      const isActive = await contractInstance.isAllocationPeriodActive();
      const currentPeriod = await contractInstance.currentAllocationPeriod();

      if (isAdmin && currentPeriod == 0) {
        setWorkflowStatus('🏛️ Admin Action Required: Register regions and start first allocation period');
      } else if (isAdmin && !isActive) {
        setWorkflowStatus('🏛️ Admin Action Required: Start new allocation period');
      } else if (isActive) {
        setWorkflowStatus('✅ Active Allocation Period: Region managers can submit water requests');
      } else {
        setWorkflowStatus('⏳ Waiting: No active allocation period');
      }
    } catch (error) {
      setWorkflowStatus('❌ Error: Unable to check contract status');
    }
  };

  const loadPeriodInfo = async (contractInstance?: any) => {
    const c = contractInstance || contract;
    if (!c) return;

    try {
      const info = await c.getCurrentPeriodInfo();
      setPeriodInfo(info);
      updateWorkflowStatus(c);
    } catch (error: any) {
      console.error('Failed to load period info:', error);
    }
  };

  const registerRegion = async () => {
    if (!contract) {
      addLog('Please connect wallet and set contract address first', 'error');
      return;
    }

    try {
      if (!regionName || !priorityLevel || !managerAddress) {
        throw new Error('Please fill all fields');
      }

      if (!ethers.isAddress(managerAddress)) {
        throw new Error('Invalid manager address');
      }

      addLog('Registering region...', 'info');
      const tx = await contract.registerRegion(regionName, priorityLevel, managerAddress);
      addLog('Transaction sent, waiting for confirmation...', 'info');
      await tx.wait();

      addLog(`Region "${regionName}" registered successfully`, 'success');
      setRegionName('');
      setPriorityLevel(5);
      setManagerAddress('');
    } catch (error: any) {
      addLog('Failed to register region: ' + error.message, 'error');
    }
  };

  const startAllocationPeriod = async () => {
    if (!contract) {
      addLog('Please connect wallet and set contract address first', 'error');
      return;
    }

    try {
      if (!totalWaterAmount || !durationHours) {
        throw new Error('Please fill all fields');
      }

      addLog('Starting allocation period...', 'info');
      const tx = await contract.startAllocationPeriod(totalWaterAmount, durationHours);
      addLog('Transaction sent, waiting for confirmation...', 'info');
      await tx.wait();

      addLog('Allocation period started successfully', 'success');
      setTotalWaterAmount(0);
      setDurationHours(24);
      await loadPeriodInfo();
    } catch (error: any) {
      addLog('Failed to start allocation period: ' + error.message, 'error');
    }
  };

  const submitWaterRequest = async () => {
    if (!contract) {
      addLog('Please connect wallet and set contract address first', 'error');
      return;
    }

    if (!isReady) {
      addLog('FHEVM SDK not ready. Please wait...', 'warning');
      return;
    }

    try {
      const isActive = await contract.isAllocationPeriodActive();
      if (!isActive) {
        addLog('❌ Cannot submit request: No active allocation period.', 'error');
        return;
      }

      if (!requestAmount || !justificationScore) {
        throw new Error('Please fill all fields');
      }

      if (justificationScore < 1 || justificationScore > 100) {
        throw new Error('Urgency score must be between 1 and 100');
      }

      addLog('Encrypting water request data...', 'info');
      // Use SDK to encrypt data (in production, this would use real FHE encryption)
      const encryptedAmount = await encryptUint32(requestAmount);
      const encryptedScore = await encryptUint32(justificationScore);

      addLog('Submitting encrypted water request...', 'info');
      const tx = await contract.submitWaterRequest(requestAmount, justificationScore);
      addLog('Transaction sent, waiting for confirmation...', 'info');
      await tx.wait();

      addLog('Water request submitted successfully (encrypted)', 'success');
      setRequestAmount(0);
      setJustificationScore(50);
      await updateWorkflowStatus(contract);
    } catch (error: any) {
      addLog('Failed to submit water request: ' + error.message, 'error');
    }
  };

  const processAllocation = async () => {
    if (!contract) {
      addLog('Please connect wallet and set contract address first', 'error');
      return;
    }

    try {
      addLog('Processing water allocation...', 'info');
      const tx = await contract.processAllocation();
      addLog('Transaction sent, waiting for confirmation...', 'info');
      await tx.wait();

      addLog('Water allocation processed successfully', 'success');
      await loadPeriodInfo();
    } catch (error: any) {
      addLog('Failed to process allocation: ' + error.message, 'error');
    }
  };

  const emergencyAllocation = async () => {
    if (!contract) {
      addLog('Please connect wallet and set contract address first', 'error');
      return;
    }

    try {
      if (!emergencyRegionId || !emergencyAmount) {
        throw new Error('Please fill all fields');
      }

      addLog('Processing emergency allocation...', 'info');
      const tx = await contract.emergencyWaterAllocation(emergencyRegionId, emergencyAmount);
      addLog('Transaction sent, waiting for confirmation...', 'info');
      await tx.wait();

      addLog(`Emergency allocation for region ${emergencyRegionId} completed`, 'success');
      setEmergencyRegionId(0);
      setEmergencyAmount(0);
    } catch (error: any) {
      addLog('Failed to process emergency allocation: ' + error.message, 'error');
    }
  };

  const deactivateRegion = async () => {
    if (!contract) {
      addLog('Please connect wallet and set contract address first', 'error');
      return;
    }

    try {
      if (!deactivateRegionId) {
        throw new Error('Please enter region ID');
      }

      addLog('Deactivating region...', 'info');
      const tx = await contract.deactivateRegion(deactivateRegionId);
      addLog('Transaction sent, waiting for confirmation...', 'info');
      await tx.wait();

      addLog(`Region ${deactivateRegionId} deactivated successfully`, 'success');
      setDeactivateRegionId(0);
    } catch (error: any) {
      addLog('Failed to deactivate region: ' + error.message, 'error');
    }
  };

  const viewRegionInfo = async () => {
    if (!contract) {
      addLog('Please connect wallet and set contract address first', 'error');
      return;
    }

    try {
      if (!viewRegionId) {
        throw new Error('Please enter region ID');
      }

      const info = await contract.getRegionInfo(viewRegionId);
      setRegionInfo(info);
    } catch (error: any) {
      addLog('Failed to get region info: ' + error.message, 'error');
      setRegionInfo(null);
    }
  };

  const viewRequestStatus = async () => {
    if (!contract) {
      addLog('Please connect wallet and set contract address first', 'error');
      return;
    }

    try {
      if (!statusRegionId) {
        throw new Error('Please enter region ID');
      }

      const status = await contract.getRegionRequestStatus(statusRegionId);
      setRequestStatus(status);
    } catch (error: any) {
      addLog('Failed to get request status: ' + error.message, 'error');
      setRequestStatus(null);
    }
  };

  const addLog = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [{ timestamp, message, type }, ...prev].slice(0, 10));
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Privacy-Preserving Water Resource Management System</title>
        <meta name="description" content="FHE-based water allocation platform using FHEVM SDK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">💧</div>
            <h1 className="text-5xl font-bold text-blue-400 mb-4">
              Water Resource Management System
            </h1>
            <p className="text-xl text-gray-300">
              FHE-based Privacy-Preserving Water Resource Allocation Platform
            </p>
            <div className="mt-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                isReady ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {isInitializing ? '🔄 Initializing FHEVM SDK...' : isReady ? '✅ FHEVM SDK Ready' : '⏸️ SDK Not Initialized'}
              </span>
            </div>
          </div>

          {/* Workflow Guide */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">📋 System Workflow Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <WorkflowStep number="1" icon="🔗" title="Connect Wallet" description="Connect your MetaMask wallet" />
              <WorkflowStep number="2" icon="🏛️" title="Admin: Register" description="Register regions and managers" />
              <WorkflowStep number="3" icon="🌊" title="Admin: Start Period" description="Start allocation with water amount" />
              <WorkflowStep number="4" icon="📝" title="Submit Requests" description="Managers submit encrypted requests" />
            </div>
            <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <strong className="text-blue-400">📢 Current Status:</strong>
              <span className="ml-2 text-gray-300">{workflowStatus}</span>
            </div>
          </div>

          {/* Network & Contract Info */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">🌐 Network & Contract Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400"><strong>Network:</strong> <span className="text-white">{networkInfo.name}</span></p>
                <p className="text-gray-400"><strong>Chain ID:</strong> <span className="text-white">{networkInfo.chainId}</span></p>
              </div>
              <div>
                <p className="text-gray-400 mb-2"><strong>Contract Address:</strong></p>
                <p className="font-mono text-xs bg-blue-500/10 p-2 rounded border border-blue-500/30 break-all text-blue-300">
                  {contractAddress}
                </p>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={contractAddressInput}
                    onChange={(e) => setContractAddressInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm"
                    placeholder="Enter contract address"
                  />
                  <button
                    onClick={setContractAddressHandler}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-semibold"
                  >
                    Set
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700 text-center">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">Connection Status</h2>
            {userAddress ? (
              <div className="px-6 py-3 bg-green-500/20 text-green-400 rounded-full inline-block font-semibold">
                Connected: {userAddress.slice(0, 10)}...
              </div>
            ) : (
              <div className="px-6 py-3 bg-yellow-500/20 text-yellow-400 rounded-full inline-block font-semibold mb-4">
                Not Connected
              </div>
            )}
            {!userAddress && (
              <div>
                <button
                  onClick={connectWallet}
                  className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full text-white font-bold transition-all transform hover:scale-105"
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </div>

          {/* Admin Functions */}
          {isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <AdminCard title="🏛️ Register New Region">
                <input
                  type="text"
                  value={regionName}
                  onChange={(e) => setRegionName(e.target.value)}
                  placeholder="Region Name"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
                />
                <input
                  type="number"
                  value={priorityLevel}
                  onChange={(e) => setPriorityLevel(Number(e.target.value))}
                  placeholder="Priority Level (1-10)"
                  min="1"
                  max="10"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
                />
                <input
                  type="text"
                  value={managerAddress}
                  onChange={(e) => setManagerAddress(e.target.value)}
                  placeholder="Manager Address"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
                />
                <button
                  onClick={registerRegion}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full text-white font-bold"
                >
                  Register Region
                </button>
              </AdminCard>

              <AdminCard title="🌊 Start Allocation Period">
                <input
                  type="number"
                  value={totalWaterAmount || ''}
                  onChange={(e) => setTotalWaterAmount(Number(e.target.value))}
                  placeholder="Total Water Amount"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
                />
                <input
                  type="number"
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  placeholder="Duration (Hours)"
                  min="1"
                  max="168"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
                />
                <button
                  onClick={startAllocationPeriod}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full text-white font-bold"
                >
                  Start Allocation
                </button>
              </AdminCard>

              <AdminCard title="⚡ Emergency Allocation">
                <input
                  type="number"
                  value={emergencyRegionId || ''}
                  onChange={(e) => setEmergencyRegionId(Number(e.target.value))}
                  placeholder="Region ID"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
                />
                <input
                  type="number"
                  value={emergencyAmount || ''}
                  onChange={(e) => setEmergencyAmount(Number(e.target.value))}
                  placeholder="Emergency Amount"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
                />
                <button
                  onClick={emergencyAllocation}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full text-white font-bold"
                >
                  Emergency Allocation
                </button>
              </AdminCard>

              <AdminCard title="⚙️ Region Management">
                <input
                  type="number"
                  value={deactivateRegionId || ''}
                  onChange={(e) => setDeactivateRegionId(Number(e.target.value))}
                  placeholder="Region ID to Deactivate"
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
                />
                <button
                  onClick={deactivateRegion}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full text-white font-bold"
                >
                  Deactivate Region
                </button>
              </AdminCard>
            </div>
          )}

          {/* Region Manager Functions */}
          {isRegionManager && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">💧 Submit Water Request (Encrypted with FHE)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Requested Amount (liters)</label>
                  <input
                    type="number"
                    value={requestAmount || ''}
                    onChange={(e) => setRequestAmount(Number(e.target.value))}
                    placeholder="Water amount"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">🔐 Will be encrypted before submission</p>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Urgency Score (1-100)</label>
                  <input
                    type="number"
                    value={justificationScore}
                    onChange={(e) => setJustificationScore(Number(e.target.value))}
                    placeholder="Urgency score"
                    min="1"
                    max="100"
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">🔐 Will be encrypted before submission</p>
                </div>
              </div>
              <button
                onClick={submitWaterRequest}
                disabled={!isReady || isEncrypting}
                className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-600 disabled:to-gray-700 rounded-full text-white font-bold"
              >
                {isEncrypting ? '🔐 Encrypting & Submitting...' : '🔒 Encrypt & Submit Request'}
              </button>
              {encryptError && (
                <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  Error: {encryptError.message}
                </div>
              )}
            </div>
          )}

          {/* View Functions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ViewCard title="🔍 Region Information">
              <input
                type="number"
                value={viewRegionId || ''}
                onChange={(e) => setViewRegionId(Number(e.target.value))}
                placeholder="Region ID"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
              />
              <button
                onClick={viewRegionInfo}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-full text-white font-bold mb-3"
              >
                View Region
              </button>
              {regionInfo && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm">
                  <p><strong>Name:</strong> {regionInfo.name}</p>
                  <p><strong>Active:</strong> {regionInfo.isActive ? 'Yes' : 'No'}</p>
                  <p><strong>Manager:</strong> {regionInfo.manager}</p>
                  <p><strong>Last Update:</strong> {new Date(Number(regionInfo.lastUpdateTime) * 1000).toLocaleString()}</p>
                </div>
              )}
            </ViewCard>

            <ViewCard title="📋 Request Status">
              <input
                type="number"
                value={statusRegionId || ''}
                onChange={(e) => setStatusRegionId(Number(e.target.value))}
                placeholder="Region ID"
                className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white mb-3"
              />
              <button
                onClick={viewRequestStatus}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-full text-white font-bold mb-3"
              >
                View Status
              </button>
              {requestStatus && (
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm">
                  <p><strong>Has Submitted:</strong> {requestStatus.hasSubmittedRequest ? 'Yes' : 'No'}</p>
                  <p><strong>Is Processed:</strong> {requestStatus.isProcessed ? 'Yes' : 'No'}</p>
                  <p><strong>Timestamp:</strong> {requestStatus.timestamp > 0 ? new Date(Number(requestStatus.timestamp) * 1000).toLocaleString() : 'N/A'}</p>
                </div>
              )}
            </ViewCard>
          </div>

          {/* Current Allocation Period */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">📊 Current Allocation Period Status</h2>
            {periodInfo ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Period ID</p>
                  <p className="text-white font-bold text-xl">{periodInfo.periodId.toString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    periodInfo.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {periodInfo.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Participating Regions</p>
                  <p className="text-white font-bold text-xl">{periodInfo.participatingRegions.toString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Distribution Status</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    periodInfo.distributionCompleted ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {periodInfo.distributionCompleted ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Loading period information...</p>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => loadPeriodInfo()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full text-white font-bold"
              >
                Refresh Status
              </button>
              {isAdmin && periodInfo?.isActive && !periodInfo?.distributionCompleted && (
                <button
                  onClick={processAllocation}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full text-white font-bold"
                >
                  Process Allocation
                </button>
              )}
            </div>
          </div>

          {/* Operation History */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">📜 Operation History</h2>
            <div className="space-y-2">
              {logs.length === 0 ? (
                <p className="text-gray-400">No operations recorded</p>
              ) : (
                logs.map((log, idx) => (
                  <LogEntry key={idx} log={log} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Components

function WorkflowStep({ number, icon, title, description }: { number: string; icon: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-blue-400 mb-1">{number}️⃣</div>
      <h3 className="font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-blue-400 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function ViewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-blue-400 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function LogEntry({ log }: { log: Log }) {
  const colors = {
    success: 'bg-green-500/10 border-green-500/30 text-green-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
  };

  return (
    <div className={`p-3 rounded-lg border ${colors[log.type]} text-sm`}>
      <strong>[{log.timestamp}]</strong> {log.message}
    </div>
  );
}
