import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ReferralContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const referralContractAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'Referrer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ReferralLink',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'bnbTestBuy',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'buyer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'referrer',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'buyAccess',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'Buyers',
    outputs: [
      { name: 'sales', internalType: 'uint256', type: 'uint256' },
      { name: 'amountUSDT', internalType: 'uint256', type: 'uint256' },
      { name: 'amountAcces', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'Referrers',
    outputs: [
      { name: 'salesCount', internalType: 'uint256', type: 'uint256' },
      { name: 'buyersCount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalBuyersAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRewards', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'bigDaddy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'referrer', internalType: 'address', type: 'address' }],
    name: 'buyWithBNB',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'referrer', internalType: 'address', type: 'address' },
      {
        name: 'paymentToken',
        internalType: 'contract IERC20',
        type: 'address',
      },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'buy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'buyersCount',
    outputs: [
      { name: 'BuyersCount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_newPercentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'changeNormalPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'changeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newPrice', internalType: 'uint256', type: 'uint256' }],
    name: 'changePrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'oldReferrer', internalType: 'address', type: 'address' },
      { name: 'newReferrer', internalType: 'address', type: 'address' },
    ],
    name: 'changeReferrer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_referrer', internalType: 'address', type: 'address' },
      { name: '_newPercentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'changeReferrerPercentage',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'developer',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'firstReferrerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'referrer', internalType: 'address', type: 'address' },
      { name: '_percentage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'generateReferralLinkSpecial',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'fromIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'toIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAllBuyers',
    outputs: [
      { name: 'BuyersAddress', internalType: 'address[]', type: 'address[]' },
      { name: 'BuyersSales', internalType: 'uint256[]', type: 'uint256[]' },
      {
        name: 'BuyersSpentAmounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
      {
        name: 'BuyersReceivedAcces',
        internalType: 'uint256[]',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'bnbAmount', internalType: 'uint256', type: 'uint256' }],
    name: 'getBNBPriceInUSDT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_buyer', internalType: 'address', type: 'address' }],
    name: 'getBuyerInfo',
    outputs: [
      { name: '_salesMade', internalType: 'uint256', type: 'uint256' },
      { name: '_usdtSpent', internalType: 'uint256', type: 'uint256' },
      { name: '_accesReceived', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_referrer', internalType: 'address', type: 'address' },
      { name: '_buyer', internalType: 'address', type: 'address' },
    ],
    name: 'getBuyerInfoForReferrer',
    outputs: [
      { name: 'buyerAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'reward', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_depth', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getReferralTree',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_referrer', internalType: 'address', type: 'address' }],
    name: 'getReferrerInfo',
    outputs: [
      { name: 'salesCount', internalType: 'uint256', type: 'uint256' },
      { name: '_buyersCount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalBuyersAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'totalRewards', internalType: 'uint256', type: 'uint256' },
      { name: 'buyersList', internalType: 'address[]', type: 'address[]' },
      { name: 'buyersAmounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'buyerRewards', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReferrersWithPercentage',
    outputs: [
      { name: '', internalType: 'address[]', type: 'address[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'endIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'importBuyersData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'startIndex', internalType: 'uint256', type: 'uint256' },
      { name: 'endIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'importReferrersData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    name: 'isAllowedToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'isReferrer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isReferrerForBuyer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'metacces',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'migratedBuyersCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'migratedReferrersCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'migrationCompleted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'normalPercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pancakeRouter',
    outputs: [
      {
        name: '',
        internalType: 'contract IUniswapV2Router02',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'priceUSD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'referrerPercentage',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'referrersCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_BUSD', internalType: 'address', type: 'address' }],
    name: 'setBUSD',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_isPaused', internalType: 'bool', type: 'bool' }],
    name: 'setPaused',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_saleReceiver', internalType: 'address', type: 'address' },
    ],
    name: 'setSaleReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_TUSD', internalType: 'address', type: 'address' }],
    name: 'setTUSD',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_paymentToken',
        internalType: 'contract IERC20',
        type: 'address',
      },
      { name: '_state', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTokenAllowDisallow',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_USDC', internalType: 'address', type: 'address' }],
    name: 'setUSDC',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_USDT', internalType: 'address', type: 'address' }],
    name: 'setUSDT',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_bigDaddy', internalType: 'address', type: 'address' }],
    name: 'setbigDaddy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'testBNB',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenAcces',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenBUSD',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenTUSD',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenUSDC',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenUSDT',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token', internalType: 'contract IERC20', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const referralContractAddress = {
  // 97: '0x74B2b997345C06D8C8e207DC763d509d7519e21e',
  // 97: '0x7b6D791A0E27f4d601D0667A50D6B8a61095e23C',
  56: '0x23EDd87C22adc749E66D0ACfe703A79B80ED2620',
} as const

/**
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const referralContractConfig = {
  address: referralContractAddress,
  abi: referralContractAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContract = /*#__PURE__*/ createUseReadContract({
  abi: referralContractAbi,
  address: referralContractAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"Buyers"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractBuyers =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'Buyers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"Referrers"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractReferrers =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'Referrers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"bigDaddy"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractBigDaddy =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'bigDaddy',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"buyersCount"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractBuyersCount =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'buyersCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"developer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractDeveloper =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'developer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"firstReferrerOf"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractFirstReferrerOf =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'firstReferrerOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"getAllBuyers"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractGetAllBuyers =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'getAllBuyers',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"getBNBPriceInUSDT"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractGetBnbPriceInUsdt =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'getBNBPriceInUSDT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"getBuyerInfo"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractGetBuyerInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'getBuyerInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"getBuyerInfoForReferrer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractGetBuyerInfoForReferrer =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'getBuyerInfoForReferrer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"getReferralTree"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractGetReferralTree =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'getReferralTree',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"getReferrerInfo"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractGetReferrerInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'getReferrerInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"getReferrersWithPercentage"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractGetReferrersWithPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'getReferrersWithPercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"isAllowedToken"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractIsAllowedToken =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'isAllowedToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"isReferrer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractIsReferrer =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'isReferrer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"isReferrerForBuyer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractIsReferrerForBuyer =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'isReferrerForBuyer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"metacces"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractMetacces =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'metacces',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"migratedBuyersCount"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractMigratedBuyersCount =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'migratedBuyersCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"migratedReferrersCount"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractMigratedReferrersCount =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'migratedReferrersCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"migrationCompleted"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractMigrationCompleted =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'migrationCompleted',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"normalPercentage"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractNormalPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'normalPercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"owner"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractOwner = /*#__PURE__*/ createUseReadContract(
  {
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'owner',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"pancakeRouter"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractPancakeRouter =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'pancakeRouter',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"priceUSD"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractPriceUsd =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'priceUSD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"referrerPercentage"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractReferrerPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'referrerPercentage',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"referrersCount"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractReferrersCount =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'referrersCount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"tokenAcces"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractTokenAcces =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'tokenAcces',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"tokenBUSD"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractTokenBusd =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'tokenBUSD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"tokenTUSD"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractTokenTusd =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'tokenTUSD',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"tokenUSDC"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractTokenUsdc =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'tokenUSDC',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"tokenUSDT"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useReadReferralContractTokenUsdt =
  /*#__PURE__*/ createUseReadContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'tokenUSDT',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContract = /*#__PURE__*/ createUseWriteContract({
  abi: referralContractAbi,
  address: referralContractAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"buyWithBNB"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractBuyWithBnb =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'buyWithBNB',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"buyWithReferral"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractBuyWithReferral =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'buy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changeNormalPercentage"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractChangeNormalPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changeNormalPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changeOwner"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractChangeOwner =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changeOwner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changePrice"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractChangePrice =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changePrice',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changeReferrer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractChangeReferrer =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changeReferrer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changeReferrerPercentage"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractChangeReferrerPercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changeReferrerPercentage',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"generateReferralLinkSpecial"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractGenerateReferralLinkSpecial =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'generateReferralLinkSpecial',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"importBuyersData"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractImportBuyersData =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'importBuyersData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"importReferrersData"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractImportReferrersData =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'importReferrersData',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setBUSD"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractSetBusd =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setBUSD',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractSetPaused =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setPaused',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setSaleReceiver"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractSetSaleReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setSaleReceiver',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setTUSD"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractSetTusd =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setTUSD',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setTokenAllowDisallow"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractSetTokenAllowDisallow =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setTokenAllowDisallow',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setUSDC"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractSetUsdc =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setUSDC',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setUSDT"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractSetUsdt =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setUSDT',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setbigDaddy"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractSetbigDaddy =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setbigDaddy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"testBNB"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractTestBnb =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'testBNB',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"withdrawTokens"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWriteReferralContractWithdrawTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'withdrawTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContract =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"buyWithBNB"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractBuyWithBnb =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'buyWithBNB',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"buyWithReferral"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractBuyWithReferral =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'buy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changeNormalPercentage"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractChangeNormalPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changeNormalPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changeOwner"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractChangeOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changeOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changePrice"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractChangePrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changePrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changeReferrer"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractChangeReferrer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changeReferrer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"changeReferrerPercentage"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractChangeReferrerPercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'changeReferrerPercentage',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"generateReferralLinkSpecial"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractGenerateReferralLinkSpecial =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'generateReferralLinkSpecial',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"importBuyersData"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractImportBuyersData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'importBuyersData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"importReferrersData"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractImportReferrersData =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'importReferrersData',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setBUSD"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractSetBusd =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setBUSD',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setPaused"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractSetPaused =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setPaused',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setSaleReceiver"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractSetSaleReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setSaleReceiver',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setTUSD"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractSetTusd =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setTUSD',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setTokenAllowDisallow"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractSetTokenAllowDisallow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setTokenAllowDisallow',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setUSDC"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractSetUsdc =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setUSDC',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setUSDT"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractSetUsdt =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setUSDT',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"setbigDaddy"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractSetbigDaddy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'setbigDaddy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"testBNB"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractTestBnb =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'testBNB',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link referralContractAbi}__ and `functionName` set to `"withdrawTokens"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useSimulateReferralContractWithdrawTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: referralContractAbi,
    address: referralContractAddress,
    functionName: 'withdrawTokens',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link referralContractAbi}__
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWatchReferralContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: referralContractAbi,
    address: referralContractAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link referralContractAbi}__ and `eventName` set to `"ReferralLink"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWatchReferralContractReferralLinkEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: referralContractAbi,
    address: referralContractAddress,
    eventName: 'ReferralLink',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link referralContractAbi}__ and `eventName` set to `"bnbTestBuy"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWatchReferralContractBnbTestBuyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: referralContractAbi,
    address: referralContractAddress,
    eventName: 'bnbTestBuy',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link referralContractAbi}__ and `eventName` set to `"buyAccess"`
 *
 * [__View Contract on Binance Smart Chain Testnet Bsc Scan__](https://testnet.bscscan.com/address/0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60)
 */
export const useWatchReferralContractBuyAccessEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: referralContractAbi,
    address: referralContractAddress,
    eventName: 'buyAccess',
  })
