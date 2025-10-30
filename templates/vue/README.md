# Vue Template - FHEVM SDK Integration

This template demonstrates how to integrate the FHEVM SDK into a Vue.js application.

## 🚧 Status

Vue adapter is planned for future releases. Currently, you can use the core SDK directly in Vue applications.

## 🚀 Quick Start (Core SDK)

### 1. Install Dependencies

```bash
npm install fhevm-sdk ethers vue
```

### 2. Create Composable

**`src/composables/useFHE.ts`:**

```typescript
import { ref, onMounted } from 'vue';
import { initFHEVM, encrypt, decrypt, isInitialized } from 'fhevm-sdk';

export function useFHE() {
  const isReady = ref(false);
  const isInitializing = ref(false);
  const error = ref<Error | null>(null);

  const initialize = async () => {
    if (isInitialized()) {
      isReady.value = true;
      return;
    }

    try {
      isInitializing.value = true;
      error.value = null;

      await initFHEVM({
        network: 'sepolia',
        provider: window.ethereum
      });

      isReady.value = true;
    } catch (err) {
      error.value = err as Error;
    } finally {
      isInitializing.value = false;
    }
  };

  onMounted(() => {
    initialize();
  });

  return {
    isReady,
    isInitializing,
    error,
    initialize
  };
}
```

### 3. Create Encryption Composable

**`src/composables/useEncrypt.ts`:**

```typescript
import { ref } from 'vue';
import { encrypt } from 'fhevm-sdk';

export function useEncrypt() {
  const isEncrypting = ref(false);
  const error = ref<Error | null>(null);

  const encryptUint32 = async (value: number): Promise<string | null> => {
    try {
      isEncrypting.value = true;
      error.value = null;

      const result = await encrypt.uint32(value);

      return result;
    } catch (err) {
      error.value = err as Error;
      return null;
    } finally {
      isEncrypting.value = false;
    }
  };

  const encryptUint64 = async (value: number): Promise<string | null> => {
    try {
      isEncrypting.value = true;
      error.value = null;

      const result = await encrypt.uint64(value);

      return result;
    } catch (err) {
      error.value = err as Error;
      return null;
    } finally {
      isEncrypting.value = false;
    }
  };

  return {
    encryptUint32,
    encryptUint64,
    isEncrypting,
    error
  };
}
```

### 4. Use in Component

**`src/components/EncryptionDemo.vue`:**

```vue
<template>
  <div class="encryption-demo">
    <h2>Encryption Demo</h2>

    <div v-if="isInitializing">
      <p>Initializing FHEVM SDK...</p>
    </div>

    <div v-else-if="!isReady">
      <p>SDK not ready</p>
      <button @click="initialize">Initialize</button>
    </div>

    <div v-else>
      <input
        v-model.number="value"
        type="number"
        placeholder="Enter value"
      />
      <button
        @click="handleEncrypt"
        :disabled="isEncrypting"
      >
        {{ isEncrypting ? 'Encrypting...' : 'Encrypt' }}
      </button>

      <div v-if="encrypted" class="result">
        <strong>Encrypted:</strong> {{ encrypted }}
      </div>
    </div>

    <div v-if="error" class="error">
      Error: {{ error.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFHE } from '../composables/useFHE';
import { useEncrypt } from '../composables/useEncrypt';

const { isReady, isInitializing, initialize } = useFHE();
const { encryptUint32, isEncrypting, error } = useEncrypt();

const value = ref(0);
const encrypted = ref('');

const handleEncrypt = async () => {
  const result = await encryptUint32(value.value);
  if (result) {
    encrypted.value = result;
  }
};
</script>

<style scoped>
.encryption-demo {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.result {
  margin-top: 10px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 4px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
```

### 5. App Setup

**`src/App.vue`:**

```vue
<template>
  <div id="app">
    <header>
      <h1>🔐 FHEVM SDK Vue App</h1>
    </header>
    <main>
      <EncryptionDemo />
    </main>
  </div>
</template>

<script setup lang="ts">
import EncryptionDemo from './components/EncryptionDemo.vue';
</script>
```

## 🔧 Vite Configuration

**`vite.config.ts`:**

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    'process.env': {},
  },
});
```

## 📦 Core SDK Functions

```typescript
import {
  initFHEVM,
  encrypt,
  decrypt,
  isInitialized,
  createFHEContract
} from 'fhevm-sdk';

// Initialize
await initFHEVM({ network: 'sepolia', provider: window.ethereum });

// Encrypt
const encrypted = await encrypt.uint32(1000);

// Decrypt
const value = await decrypt.user(encrypted, { signer: wallet });

// Contract
const contract = await createFHEContract({
  address: '0x...',
  abi: contractABI,
  provider: provider
});
```

## 🎯 Example: Provide/Inject Pattern

**`src/providers/fhevm.ts`:**

```typescript
import { InjectionKey, Ref } from 'vue';

export interface FHEVMState {
  isReady: Ref<boolean>;
  isInitializing: Ref<boolean>;
  error: Ref<Error | null>;
}

export const FHEVMKey: InjectionKey<FHEVMState> = Symbol('fhevm');
```

**`src/App.vue`:**

```vue
<script setup lang="ts">
import { provide } from 'vue';
import { useFHE } from './composables/useFHE';
import { FHEVMKey } from './providers/fhevm';

const fhevm = useFHE();
provide(FHEVMKey, fhevm);
</script>
```

**In child component:**

```vue
<script setup lang="ts">
import { inject } from 'vue';
import { FHEVMKey } from '../providers/fhevm';

const fhevm = inject(FHEVMKey);
</script>
```

## 🔮 Future: Native Vue Adapter

Planned features for `fhevm-sdk/vue`:

```typescript
// Future API (not yet available)
import { useFHEVM, useEncrypt, useDecrypt } from 'fhevm-sdk/vue';

// This will match the React hooks API
const { isReady } = useFHEVM({ network: 'sepolia' });
const { encryptUint32 } = useEncrypt();
```

## 🔗 Learn More

- **Core SDK Documentation**: `../../docs/`
- **Main README**: `../../README.md`
- **React Examples**: `../../examples/nextjs-fhe-app-router/` (for reference)
- **Zama FHEVM**: https://docs.zama.ai/fhevm

## 📞 Support

- GitHub: https://github.com/OsbaldoSchmeler/fhevm-react-template
- Issues: https://github.com/OsbaldoSchmeler/fhevm-react-template/issues
- Discussions: https://github.com/OsbaldoSchmeler/fhevm-react-template/discussions
