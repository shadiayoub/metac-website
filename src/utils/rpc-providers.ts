import { ethers } from "ethers";

// List of public BSC RPC endpoints for fallback
export const BSC_RPC_URLS = [
  "https://bsc-dataseed1.defibit.io/",
  "https://bsc-dataseed1.ninicoin.io/",
  "https://bsc-dataseed2.defibit.io/",
  "https://bsc-dataseed3.defibit.io/",
  "https://bsc-dataseed4.defibit.io/",
  "https://bsc-dataseed2.ninicoin.io/",
  "https://bsc-dataseed3.ninicoin.io/",
  "https://bsc-dataseed4.ninicoin.io/",
  "https://bsc-dataseed1.binance.org/",
  "https://bsc-dataseed2.binance.org/",
  "https://bsc-dataseed3.binance.org/",
  "https://bsc-dataseed4.binance.org/",
  "https://bsc.rpc.blxrbdn.com/",
  "https://bsc-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
];

export const BSC_TESTNET_RPC_URLS = [
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  "https://data-seed-prebsc-2-s1.binance.org:8545/",
  "https://data-seed-prebsc-1-s2.binance.org:8545/",
  "https://data-seed-prebsc-2-s2.binance.org:8545/",
  "https://data-seed-prebsc-1-s3.binance.org:8545/",
  "https://data-seed-prebsc-2-s3.binance.org:8545/",
];

export interface RPCTestResult {
  url: string;
  status: 'working' | 'failed' | 'csp-blocked';
  responseTime?: number;
  blockNumber?: number;
  error?: string;
}

/**
 * Test a single RPC endpoint
 */
export async function testSingleRPC(url: string, timeout = 10000): Promise<RPCTestResult> {
  const startTime = Date.now();
  
  try {
    // Test with fetch first (faster for CSP detection)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return {
        url,
        status: 'failed',
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
    
    const data = await response.json();
    const responseTime = Date.now() - startTime;
    
    if (data.error) {
      return {
        url,
        status: 'failed',
        responseTime,
        error: data.error.message || JSON.stringify(data.error),
      };
    }
    
    const blockNumber = parseInt(data.result, 16);
    
    return {
      url,
      status: 'working',
      responseTime,
      blockNumber,
    };
    
  } catch (error: any) {
    const responseTime = Date.now() - startTime;
    
    // Check if it's a CSP error
    if (error.message?.includes('Content Security Policy') || 
        error.message?.includes('Refused to connect') ||
        error.name === 'TypeError' && error.message?.includes('Failed to fetch')) {
      return {
        url,
        status: 'csp-blocked',
        responseTime,
        error: 'Blocked by Content Security Policy',
      };
    }
    
    return {
      url,
      status: 'failed',
      responseTime,
      error: error.message || 'Unknown error',
    };
  }
}

/**
 * Test all BSC mainnet RPC endpoints
 */
export async function testAllMainnetRPCs(): Promise<RPCTestResult[]> {
  console.log('🧪 Testing all BSC mainnet RPC endpoints...');
  
  const results = await Promise.all(
    BSC_RPC_URLS.map(url => testSingleRPC(url))
  );
  
  // Sort results by status (working first, then failed, then CSP blocked)
  results.sort((a, b) => {
    const statusOrder = { working: 0, failed: 1, 'csp-blocked': 2 };
    return statusOrder[a.status] - statusOrder[b.status] || 
           (a.responseTime || 0) - (b.responseTime || 0);
  });
  
  return results;
}

/**
 * Test all BSC testnet RPC endpoints
 */
export async function testAllTestnetRPCs(): Promise<RPCTestResult[]> {
  console.log('🧪 Testing all BSC testnet RPC endpoints...');
  
  const results = await Promise.all(
    BSC_TESTNET_RPC_URLS.map(url => testSingleRPC(url))
  );
  
  results.sort((a, b) => {
    const statusOrder = { working: 0, failed: 1, 'csp-blocked': 2 };
    return statusOrder[a.status] - statusOrder[b.status] || 
           (a.responseTime || 0) - (b.responseTime || 0);
  });
  
  return results;
}

/**
 * Print test results in a formatted way
 */
export function printTestResults(results: RPCTestResult[]) {
  console.log('\n📊 RPC Test Results:');
  console.log('='.repeat(80));
  
  const working = results.filter(r => r.status === 'working');
  const failed = results.filter(r => r.status === 'failed');
  const cspBlocked = results.filter(r => r.status === 'csp-blocked');
  
  console.log(`✅ Working: ${working.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`🚫 CSP Blocked: ${cspBlocked.length}`);
  console.log('');
  
  if (working.length > 0) {
    console.log('✅ Working RPCs (sorted by response time):');
    working.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.url}`);
      console.log(`     Response: ${result.responseTime}ms | Block: #${result.blockNumber}`);
    });
    console.log('');
  }
  
  if (failed.length > 0) {
    console.log('❌ Failed RPCs:');
    failed.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.url}`);
      console.log(`     Error: ${result.error}`);
    });
    console.log('');
  }
  
  if (cspBlocked.length > 0) {
    console.log('🚫 CSP Blocked RPCs:');
    cspBlocked.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.url}`);
      console.log(`     Error: ${result.error}`);
    });
    console.log('');
  }
}

/**
 * Creates a BSC provider with fallback support
 * Tries multiple RPC endpoints until one works
 */
export async function createBSCProvider(isTestnet = false): Promise<ethers.JsonRpcProvider> {
  const rpcUrls = isTestnet ? BSC_TESTNET_RPC_URLS : BSC_RPC_URLS;
  
  for (const rpcUrl of rpcUrls) {
    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      // Test the connection by getting the latest block number
      await provider.getBlockNumber();
      console.log(`Successfully connected to BSC RPC: ${rpcUrl}`);
      return provider;
    } catch (error) {
      console.warn(`Failed to connect to ${rpcUrl}:`, error);
      continue;
    }
  }
  
  throw new Error('All BSC RPC providers failed to connect');
}

/**
 * Gets the first working RPC URL for wagmi http transport
 */
export async function getWorkingBSCUrl(isTestnet = false): Promise<string> {
  const rpcUrls = isTestnet ? BSC_TESTNET_RPC_URLS : BSC_RPC_URLS;
  
  for (const rpcUrl of rpcUrls) {
    try {
      const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_blockNumber',
          params: [],
          id: 1,
        }),
      });
      
      if (response.ok) {
        console.log(`BSC RPC URL working: ${rpcUrl}`);
        return rpcUrl;
      }
    } catch (error) {
      console.warn(`RPC URL failed: ${rpcUrl}`, error);
      continue;
    }
  }
  
  // Fallback to first URL if none work during initial check
  return rpcUrls[0];
} 