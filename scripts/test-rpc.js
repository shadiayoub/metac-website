// Simple RPC tester that can be run in browser console or as a standalone script

const BSC_RPC_URLS = [
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

async function testRPC(url, timeout = 10000) {
  const startTime = Date.now();
  
  try {
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
    
  } catch (error) {
    const responseTime = Date.now() - startTime;
    
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

async function testAllRPCs() {
  console.log('🧪 Testing all BSC mainnet RPC endpoints...');
  console.log('='.repeat(50));
  
  const results = await Promise.all(
    BSC_RPC_URLS.map(url => testRPC(url))
  );
  
  // Sort results by status (working first, then failed, then CSP blocked)
  results.sort((a, b) => {
    const statusOrder = { working: 0, failed: 1, 'csp-blocked': 2 };
    return statusOrder[a.status] - statusOrder[b.status] || 
           (a.responseTime || 0) - (b.responseTime || 0);
  });
  
  const working = results.filter(r => r.status === 'working');
  const failed = results.filter(r => r.status === 'failed');
  const cspBlocked = results.filter(r => r.status === 'csp-blocked');
  
  console.log(`\n📊 Results Summary:`);
  console.log(`✅ Working: ${working.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  console.log(`🚫 CSP Blocked: ${cspBlocked.length}`);
  
  if (working.length > 0) {
    console.log('\n✅ Working RPCs (sorted by response time):');
    working.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.url}`);
      console.log(`     ⏱️  ${result.responseTime}ms | 🏗️  Block #${result.blockNumber?.toLocaleString()}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n❌ Failed RPCs:');
    failed.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.url}`);
      console.log(`     ❌ ${result.error}`);
    });
  }
  
  if (cspBlocked.length > 0) {
    console.log('\n🚫 CSP Blocked RPCs:');
    cspBlocked.forEach((result, index) => {
      console.log(`  ${index + 1}. ${result.url}`);
      console.log(`     🚫 ${result.error}`);
    });
  }
  
  console.log('\n' + '='.repeat(50));
  
  return results;
}

// Export for use in other scripts or console
if (typeof window !== 'undefined') {
  window.testBSCRPCs = testAllRPCs;
  window.testSingleRPC = testRPC;
  console.log('💡 RPC testing functions available:');
  console.log('   - testBSCRPCs() - Test all BSC mainnet RPCs');
  console.log('   - testSingleRPC(url) - Test a single RPC endpoint');
}

// Auto-run if this script is executed directly
if (typeof module === 'undefined' && typeof window !== 'undefined') {
  console.log('🚀 Starting RPC tests automatically...');
  testAllRPCs();
} 