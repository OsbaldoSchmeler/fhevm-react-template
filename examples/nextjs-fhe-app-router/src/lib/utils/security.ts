/**
 * Security Utilities
 * Security-related helper functions
 */

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate numeric input
 */
export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Hash data (simple implementation for demo)
 */
export function hashData(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return `0x${Math.abs(hash).toString(16)}`;
}

/**
 * Generate random nonce
 */
export function generateNonce(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

/**
 * Validate API request
 */
export function validateApiRequest(request: any): boolean {
  if (!request || typeof request !== 'object') {
    return false;
  }

  // Add more validation as needed
  return true;
}
