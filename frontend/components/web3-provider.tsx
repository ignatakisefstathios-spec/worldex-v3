"use client";

import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";

// World Chain configuration
const worldChain = {
  id: 480,
  name: "World Chain",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://worldchain-mainnet.g.alchemy.com/public"],
    },
    public: {
      http: ["https://worldchain-mainnet.g.alchemy.com/public"],
    },
  },
  blockExplorers: {
    default: {
      name: "Worldscan",
      url: "https://worldscan.org",
    },
  },
} as const;

const worldChainSepolia = {
  id: 4801,
  name: "World Chain Sepolia",
  nativeCurrency: {
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://worldchain-sepolia.g.alchemy.com/public"],
    },
    public: {
      http: ["https://worldchain-sepolia.g.alchemy.com/public"],
    },
  },
  blockExplorers: {
    default: {
      name: "Worldscan Sepolia",
      url: "https://worldchain-sepolia.explorer.alchemy.com",
    },
  },
  testnet: true,
} as const;

const config = createConfig({
  chains: [worldChain, worldChainSepolia],
  connectors: [injected()],
  transports: {
    [worldChain.id]: http(),
    [worldChainSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
