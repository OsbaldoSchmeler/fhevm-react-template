/**
 * Vue Adapter for FHEVM SDK
 *
 * Provides Vue 3 Composition API composables for FHEVM integration.
 * This is a bonus feature for Vue.js applications.
 */

import { ref, computed, onMounted, onUnmounted } from 'vue';
import { FHEVM, FHEVMConfig } from '../core/fhevm';
import { encrypt } from '../utils/encryption';
import { decrypt } from '../utils/decryption';

// ============================================================================
// Vue Composables
// ============================================================================

/**
 * Vue composable for FHEVM initialization
 *
 * @example
 * ```vue
 * <script setup>
 * import { useFhevm } from 'fhevm-sdk/vue';
 *
 * const { isReady, init } = useFhevm({
 *   network: 'sepolia',
 *   provider: window.ethereum
 * });
 *
 * onMounted(() => {
 *   init();
 * });
 * </script>
 * ```
 */
export function useFhevm(config?: FHEVMConfig) {
  const fhevm = new FHEVM();
  const isReady = ref(false);
  const isInitializing = ref(false);
  const error = ref<Error | null>(null);

  const init = async (providedConfig?: FHEVMConfig) => {
    const configToUse = providedConfig || config;

    if (!configToUse) {
      error.value = new Error('FHEVM config required');
      throw error.value;
    }

    try {
      isInitializing.value = true;
      error.value = null;

      await fhevm.init(configToUse);

      isReady.value = true;
      isInitializing.value = false;
    } catch (err) {
      error.value = err as Error;
      isInitializing.value = false;
      throw err;
    }
  };

  const reset = () => {
    fhevm.reset();
    isReady.value = false;
    error.value = null;
  };

  // Auto-init if config provided
  if (config) {
    onMounted(() => {
      init().catch(console.error);
    });
  }

  return {
    fhevm: computed(() => (isReady.value ? fhevm : null)),
    isReady,
    isInitializing,
    error,
    init,
    reset
  };
}

/**
 * Vue composable for encryption operations
 *
 * @example
 * ```vue
 * <script setup>
 * const { encryptUint32, isEncrypting } = useEncrypt();
 *
 * const handleEncrypt = async () => {
 *   const encrypted = await encryptUint32(1000);
 * };
 * </script>
 * ```
 */
export function useEncrypt() {
  const isEncrypting = ref(false);
  const error = ref<Error | null>(null);

  const encryptValue = async (value: any, type: string) => {
    try {
      isEncrypting.value = true;
      error.value = null;

      let result;
      switch (type) {
        case 'uint32':
          result = await encrypt.uint32(value);
          break;
        case 'uint64':
          result = await encrypt.uint64(value);
          break;
        case 'bool':
          result = await encrypt.bool(value);
          break;
        case 'address':
          result = await encrypt.address(value);
          break;
        default:
          throw new Error(`Unsupported encryption type: ${type}`);
      }

      isEncrypting.value = false;
      return result;
    } catch (err) {
      error.value = err as Error;
      isEncrypting.value = false;
      return null;
    }
  };

  return {
    encrypt,
    isEncrypting,
    error,
    encryptUint32: (value: number) => encryptValue(value, 'uint32'),
    encryptUint64: (value: number) => encryptValue(value, 'uint64'),
    encryptBool: (value: boolean) => encryptValue(value, 'bool'),
    encryptAddress: (value: string) => encryptValue(value, 'address')
  };
}

/**
 * Vue composable for decryption operations
 *
 * @example
 * ```vue
 * <script setup>
 * const { decryptUser, isDecrypting } = useDecrypt();
 *
 * const handleDecrypt = async () => {
 *   const decrypted = await decryptUser(ciphertext, { signer: wallet });
 * };
 * </script>
 * ```
 */
export function useDecrypt() {
  const isDecrypting = ref(false);
  const error = ref<Error | null>(null);

  const decryptUser = async (ciphertext: string, options: any) => {
    try {
      isDecrypting.value = true;
      error.value = null;

      const result = await decrypt.user(ciphertext, options);

      isDecrypting.value = false;
      return result;
    } catch (err) {
      error.value = err as Error;
      isDecrypting.value = false;
      return null;
    }
  };

  const decryptPublic = async (ciphertext: string) => {
    try {
      isDecrypting.value = true;
      error.value = null;

      const result = await decrypt.public(ciphertext);

      isDecrypting.value = false;
      return result;
    } catch (err) {
      error.value = err as Error;
      isDecrypting.value = false;
      return null;
    }
  };

  return {
    decrypt,
    isDecrypting,
    error,
    decryptUser,
    decryptPublic
  };
}

// ============================================================================
// Export
// ============================================================================

export default {
  useFhevm,
  useEncrypt,
  useDecrypt
};
