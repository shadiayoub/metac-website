"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play, CheckCircle, XCircle, Shield } from 'lucide-react';
import { 
  testAllMainnetRPCs, 
  testAllTestnetRPCs, 
  printTestResults,
  RPCTestResult 
} from '@/utils/rpc-providers';

const statusIcons = {
  working: <CheckCircle className="w-4 h-4 text-green-500" />,
  failed: <XCircle className="w-4 h-4 text-red-500" />,
  'csp-blocked': <Shield className="w-4 h-4 text-orange-500" />,
};

const statusColors = {
  working: 'bg-green-100 text-green-800 border-green-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  'csp-blocked': 'bg-orange-100 text-orange-800 border-orange-200',
};

export default function RPCTester() {
  const [isTestingMainnet, setIsTestingMainnet] = useState(false);
  const [isTestingTestnet, setIsTestingTestnet] = useState(false);
  const [mainnetResults, setMainnetResults] = useState<RPCTestResult[]>([]);
  const [testnetResults, setTestnetResults] = useState<RPCTestResult[]>([]);

  const testMainnet = async () => {
    setIsTestingMainnet(true);
    setMainnetResults([]);
    
    try {
      const results = await testAllMainnetRPCs();
      setMainnetResults(results);
      printTestResults(results);
    } catch (error) {
      console.error('Error testing mainnet RPCs:', error);
    } finally {
      setIsTestingMainnet(false);
    }
  };

  const testTestnet = async () => {
    setIsTestingTestnet(true);
    setTestnetResults([]);
    
    try {
      const results = await testAllTestnetRPCs();
      setTestnetResults(results);
      printTestResults(results);
    } catch (error) {
      console.error('Error testing testnet RPCs:', error);
    } finally {
      setIsTestingTestnet(false);
    }
  };

  const renderResults = (results: RPCTestResult[]) => {
    if (results.length === 0) return null;

    const working = results.filter(r => r.status === 'working');
    const failed = results.filter(r => r.status === 'failed');
    const cspBlocked = results.filter(r => r.status === 'csp-blocked');

    return (
      <div className="space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{working.length}</div>
            <div className="text-sm text-muted-foreground">Working</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{failed.length}</div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{cspBlocked.length}</div>
            <div className="text-sm text-muted-foreground">CSP Blocked</div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-2">
          {results.map((result, index) => (
            <div
              key={result.url}
              className="flex items-center justify-between p-3 rounded-lg border bg-card"
            >
              <div className="flex items-center space-x-3">
                {statusIcons[result.status]}
                <div>
                  <div className="text-sm font-medium">{result.url}</div>
                  {result.error && (
                    <div className="text-xs text-muted-foreground">{result.error}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {result.responseTime && (
                  <Badge variant="outline" className="text-xs">
                    {result.responseTime}ms
                  </Badge>
                )}
                {result.blockNumber && (
                  <Badge variant="outline" className="text-xs">
                    Block #{result.blockNumber.toLocaleString()}
                  </Badge>
                )}
                <Badge className={statusColors[result.status]}>
                  {result.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">BSC RPC Endpoint Tester</h1>
        <p className="text-muted-foreground">
          Test all BSC RPC endpoints to see which ones are working and which are blocked by CSP
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mainnet Testing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              BSC Mainnet RPCs
              <Button
                onClick={testMainnet}
                disabled={isTestingMainnet}
                className="ml-4"
              >
                {isTestingMainnet ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                Test Mainnet
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isTestingMainnet && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mr-2" />
                <span>Testing mainnet RPCs...</span>
              </div>
            )}
            {renderResults(mainnetResults)}
          </CardContent>
        </Card>

        {/* Testnet Testing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              BSC Testnet RPCs
              <Button
                onClick={testTestnet}
                disabled={isTestingTestnet}
                variant="outline"
                className="ml-4"
              >
                {isTestingTestnet ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                Test Testnet
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isTestingTestnet && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin mr-2" />
                <span>Testing testnet RPCs...</span>
              </div>
            )}
            {renderResults(testnetResults)}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <p><strong>1.</strong> Click "Test Mainnet" to check all BSC mainnet RPC endpoints</p>
            <p><strong>2.</strong> Results will show which RPCs are working, failed, or blocked by CSP</p>
            <p><strong>3.</strong> Check the browser console for detailed logs</p>
            <p><strong>4.</strong> Working RPCs are sorted by response time (fastest first)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 