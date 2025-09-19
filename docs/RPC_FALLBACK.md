# BSC RPC Fallback System

## Overview

This project implements a robust fallback system for BSC (Binance Smart Chain) RPC providers to handle network connectivity issues and CSP (Content Security Policy) restrictions.

## Features

- **Multiple RPC Endpoints**: Uses a list of public BSC RPC providers for redundancy
- **Automatic Fallback**: Automatically tries alternative providers if one fails
- **CSP Compliance**: Works around Content Security Policy restrictions by having multiple fallback options
- **Health Checking**: Tests RPC endpoints before using them

## Implementation

### Files

- `src/utils/rpc-providers.ts`: Core utility functions and RPC URL lists
- `src/hooks/useBSCProvider.ts`: React hook for easy provider access
- `src/config/wagmi.ts`: Updated wagmi configuration with fallback transport

### Usage

#### Using the Provider Utility
```typescript
import { createBSCProvider } from '@/utils/rpc-providers';

// Create a BSC mainnet provider with fallback
const provider = await createBSCProvider(false);

// Create a BSC testnet provider with fallback  
const testnetProvider = await createBSCProvider(true);
```

#### Using the React Hook
```typescript
import { useBSCProvider } from '@/hooks/useBSCProvider';

function MyComponent() {
  const { provider, isLoading, error } = useBSCProvider(false);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!provider) return <div>No provider available</div>;
  
  // Use provider for contract interactions
}
```

## RPC Providers

### Mainnet Providers
- DeFibit data seeds
- Ninicoin data seeds  
- Binance official data seeds
- BloxRoute RPC
- NodeReal RPC

### Testnet Providers
- Multiple Binance testnet data seeds

## Benefits

1. **Reliability**: If one RPC provider is down, the system automatically tries others
2. **CSP Compatibility**: Multiple providers increase chances of finding one that works with CSP
3. **Performance**: Can select the fastest responding provider
4. **Maintenance**: Easy to add/remove RPC providers from the list

## Troubleshooting

If you encounter RPC connectivity issues:

1. Check the browser console for failed connection logs
2. Verify that at least one RPC provider is accessible
3. Consider adding additional RPC providers to the lists in `rpc-providers.ts`
4. Check Content Security Policy settings if using in a restricted environment 