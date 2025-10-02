/**
 * Exchange listing data for countdown and trading information
 */

export interface ExchangeListing {
  id: string;
  name: string;
  logo: string;
  listingDate: string; // ISO date string
  depositDate?: string; // ISO date string
  withdrawalDate?: string; // ISO date string
  tradingPair: string;
  zone: string;
  announcementUrl: string;
  tradingUrl: string;
  description: string;
  features: string[];
  status: 'upcoming' | 'depositing' | 'trading' | 'listed';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const EXCHANGE_LISTINGS: ExchangeListing[] = [
  {
    id: 'lbank',
    name: 'LBank',
    logo: '/exchange/lbank.svg',
    listingDate: '2025-10-13T10:00:00Z',
    depositDate: '2025-10-10T10:00:00Z',
    withdrawalDate: '2025-10-13T10:00:00Z',
    tradingPair: 'ACCES/USDT',
    zone: 'Innovation Zone',
    announcementUrl: 'https://www.lbank.com/support/articles/1972888479868125184',
    tradingUrl: 'https://www.lbank.com/en-US/trade/acces%5Fusdt',
    description: 'ACCES will be listed on LBank, one of the leading global cryptocurrency exchanges.',
    features: [
      'Innovation Zone Listing',
      'ACCES/USDT Trading Pair',
      'Global Liquidity Access',
      'Advanced Trading Tools'
    ],
    status: 'upcoming',
    colors: {
      primary: '#1B4F9C',
      secondary: '#2E5DB8',
      accent: '#4A90E2'
    }
  },
  {
    id: 'bitmart',
    name: 'BitMart',
    logo: '/exchange/bitmart.svg',
    listingDate: '2025-10-20T14:00:00Z',
    depositDate: '2025-10-19T14:00:00Z',
    withdrawalDate: '2025-10-21T14:00:00Z',
    tradingPair: 'ACCES/USDT',
    zone: 'Primary Listing',
    announcementUrl: 'https://bitmart.zendesk.com/hc/en-us/articles/41618680994075--Primary-Listing-BitMart-Will-List-Metacces-ACCES-2025-10-20',
    tradingUrl: 'https://www.bitmart.com/trade/en?symbol=ACCES_USDT',
    description: 'ACCES receives primary listing status on BitMart exchange platform.',
    features: [
      'Primary Listing Status',
      'ACCES/USDT Trading Pair',
      'Enhanced Visibility',
      'Professional Trading Interface'
    ],
    status: 'upcoming',
    colors: {
      primary: '#00D4AA',
      secondary: '#00B89A',
      accent: '#1DE9B6'
    }
  },
  {
    id: 'bingx',
    name: 'BingX',
    logo: '/exchange/bingx.svg',
    listingDate: '', // To be announced
    tradingPair: 'ACCES/USDT',
    zone: 'Spot Trading',
    announcementUrl: '#',
    tradingUrl: '#',
    description: 'ACCES will be listed on BingX, a leading global cryptocurrency exchange with advanced trading features.',
    features: [
      'Spot Trading Available',
      'ACCES/USDT Trading Pair',
      'Advanced Trading Tools',
      'Global Market Access'
    ],
    status: 'upcoming',
    colors: {
      primary: '#2A54FE',
      secondary: '#2952F7',
      accent: '#4A90E2'
    }
  },
  {
    id: 'mexc',
    name: 'MEXC',
    logo: '/exchange/mexc.svg',
    listingDate: '', // To be announced
    tradingPair: 'ACCES/USDT',
    zone: 'Innovation Zone',
    announcementUrl: '#',
    tradingUrl: '#',
    description: 'ACCES will be listed on MEXC Global, providing users with access to innovative trading opportunities.',
    features: [
      'Innovation Zone Listing',
      'ACCES/USDT Trading Pair',
      'High Liquidity Trading',
      'User-Friendly Interface'
    ],
    status: 'upcoming',
    colors: {
      primary: '#3156AA',
      secondary: '#1972E2',
      accent: '#4A90E2'
    }
  }
  // Future listings can be added here with status: 'upcoming'
];

/**
 * Get the current status of a listing based on dates
 */
export function getListingStatus(listing: ExchangeListing): ExchangeListing['status'] {
  const now = new Date().getTime();
  const depositTime = listing.depositDate ? new Date(listing.depositDate).getTime() : 0;
  const listingTime = new Date(listing.listingDate).getTime();
  
  if (now >= listingTime) {
    return 'listed';
  } else if (depositTime && now >= depositTime) {
    return 'depositing';
  } else {
    return 'upcoming';
  }
}

/**
 * Get time remaining until listing
 */
export function getTimeUntilListing(listingDate: string) {
  const now = new Date().getTime();
  const target = new Date(listingDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isListed: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isListed: false };
}
