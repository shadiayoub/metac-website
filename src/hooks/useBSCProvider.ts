import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { createBSCProvider } from '@/utils/rpc-providers';

export function useBSCProvider(isTestnet = false) {
  const [provider, setProvider] = useState<ethers.JsonRpcProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const bscProvider = await createBSCProvider(isTestnet);
        setProvider(bscProvider);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to BSC network');
        console.error('Failed to initialize BSC provider:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initProvider();
  }, [isTestnet]);

  return { provider, isLoading, error };
} 