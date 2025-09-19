import { defineConfig } from "@wagmi/cli";
import { react } from "@wagmi/cli/plugins";
import { bscTestnet } from "wagmi/chains";
import { Abi } from "viem";

// Import your contract ABI
import contractABI from "./src/json/contractABI.json";

export default defineConfig({
  out: "src/config/generated.ts",
  contracts: [
    {
      name: "ReferralContract", // Ensure this name is unique and relevant
      abi: contractABI as Abi,
      address: {
        [bscTestnet.id]: "0x73B88D2Af94BCA8df2357B111Bc672557EdD3A60", // BSC Testnet contract address
      },
      // Avoid using getHookName; let Wagmi handle naming by default
    },
  ],
  plugins: [
    react(), // Generates React hooks for your contract
  ],
});
