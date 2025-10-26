/**
 * Validation Utilities
 * Data validation helper functions
 */

import type { FHEDataType } from '../fhe/types';

/**
 * Validate data type
 */
export function isValidDataType(dataType: string): dataType is FHEDataType {
  const validTypes: FHEDataType[] = ['uint8', 'uint16', 'uint32', 'uint64', 'uint128', 'uint256', 'bool', 'address'];
  return validTypes.includes(dataType as FHEDataType);
}

/**
 * Validate value for data type
 */
export function isValidValueForType(value: any, dataType: FHEDataType): boolean {
  switch (dataType) {
    case 'uint8':
      return Number.isInteger(value) && value >= 0 && value <= 255;
    case 'uint16':
      return Number.isInteger(value) && value >= 0 && value <= 65535;
    case 'uint32':
      return Number.isInteger(value) && value >= 0 && value <= 4294967295;
    case 'uint64':
      return Number.isInteger(value) && value >= 0;
    case 'bool':
      return typeof value === 'boolean';
    case 'address':
      return typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value);
    default:
      return false;
  }
}

/**
 * Validate encrypted data format
 */
export function isValidEncryptedData(data: string): boolean {
  return typeof data === 'string' && data.startsWith('0x') && data.length > 10;
}

/**
 * Validate operation type
 */
export function isValidOperation(operation: string): boolean {
  const validOperations = ['add', 'sub', 'mul', 'div', 'gt', 'lt', 'eq', 'and', 'or', 'not'];
  return validOperations.includes(operation);
}

/**
 * Validate array of operands
 */
export function isValidOperands(operands: any[]): boolean {
  return Array.isArray(operands) && operands.length > 0 && operands.every(isValidEncryptedData);
}
