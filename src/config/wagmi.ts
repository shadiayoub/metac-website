import { http, createConfig, fallback } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import { BSC_RPC_URLS, BSC_TESTNET_RPC_URLS } from "@/utils/rpc-providers";

export const config = createConfig({
  chains: [bsc, bscTestnet],
  connectors: [
    coinbaseWallet(),
    walletConnect({
      projectId: "62523192c5bab9221fb23f380c4eec38",
      metadata: {
        name: "Metacces",
        description: "Live to own 🌏",
        url: "https://metacces.com",
        icons: ["https://metacces.com/favicon.ico"],
      },
    }),
  ],
  transports: {
    [bsc.id]: fallback(BSC_RPC_URLS.map(url => http(url))),
    [bscTestnet.id]: fallback(BSC_TESTNET_RPC_URLS.map(url => http(url))),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
