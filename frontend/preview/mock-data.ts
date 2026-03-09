/**
 * Mock data for UI preview environment
 * Simulates protocol activity without blockchain connection
 */

export const mockTokens = {
  WLD: {
    symbol: "WLD",
    name: "Worldcoin",
    decimals: 18,
    price: 2.45,
    balance: 1250.5,
    logo: "W",
  },
  WDX: {
    symbol: "WDX",
    name: "Worldex Token",
    decimals: 18,
    price: 0.85,
    balance: 5000,
    logo: "X",
  },
  LWLD: {
    symbol: "LWLD",
    name: "Leveraged WLD",
    decimals: 18,
    price: 2.42,
    balance: 500,
    logo: "L",
  },
  LETH: {
    symbol: "LETH",
    name: "Liquid ETH",
    decimals: 18,
    price: 1950,
    balance: 2.5,
    logo: "E",
  },
  SWLD: {
    symbol: "SWLD",
    name: "Stable Worldcoin",
    decimals: 18,
    price: 1.0,
    balance: 2500,
    logo: "S",
  },
  ETH: {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    price: 1950,
    balance: 5.2,
    logo: "Ξ",
  },
  USDC: {
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    price: 1.0,
    balance: 10000,
    logo: "U",
  },
};

export const mockPools = [
  {
    id: 1,
    token0: "WLD",
    token1: "SWLD",
    reserve0: 5000000,
    reserve1: 12250000,
    tvl: 24500000,
    volume24h: 1250000,
    fees24h: 3750,
    apy: 24.5,
    lpBalance: 25000,
    lpTotalSupply: 500000,
  },
  {
    id: 2,
    token0: "WLD",
    token1: "LWLD",
    reserve0: 3200000,
    reserve1: 3200000,
    tvl: 15680000,
    volume24h: 850000,
    fees24h: 2550,
    apy: 18.2,
    lpBalance: 15000,
    lpTotalSupply: 320000,
  },
  {
    id: 3,
    token0: "ETH",
    token1: "SWLD",
    reserve0: 1500,
    reserve1: 2925000,
    tvl: 5850000,
    volume24h: 520000,
    fees24h: 1560,
    apy: 15.8,
    lpBalance: 5000,
    lpTotalSupply: 150000,
  },
  {
    id: 4,
    token0: "ETH",
    token1: "LWLD",
    reserve0: 800,
    reserve1: 640000,
    tvl: 3120000,
    volume24h: 280000,
    fees24h: 840,
    apy: 12.4,
    lpBalance: 2500,
    lpTotalSupply: 80000,
  },
];

export const mockLendingMarkets = [
  {
    token: "WLD",
    totalSupply: 2500000,
    totalBorrow: 1200000,
    supplyAPY: 8.5,
    borrowAPY: 13.4,
    utilization: 48,
    collateralFactor: 75,
    userSupply: 5000,
    userBorrow: 0,
  },
  {
    token: "ETH",
    totalSupply: 4200000,
    totalBorrow: 1800000,
    supplyAPY: 3.2,
    borrowAPY: 5.8,
    utilization: 43,
    collateralFactor: 80,
    userSupply: 2.5,
    userBorrow: 0,
  },
  {
    token: "USDC",
    totalSupply: 1800000,
    totalBorrow: 950000,
    supplyAPY: 5.8,
    borrowAPY: 8.2,
    utilization: 53,
    collateralFactor: 85,
    userSupply: 5000,
    userBorrow: 2000,
  },
  {
    token: "WDX",
    totalSupply: 850000,
    totalBorrow: 320000,
    supplyAPY: 12.5,
    borrowAPY: 18.2,
    utilization: 38,
    collateralFactor: 65,
    userSupply: 1000,
    userBorrow: 0,
  },
];

export const mockStakingVaults = [
  {
    name: "LWLD Vault",
    symbol: "LWLD",
    tvl: 3200000,
    apy: 24.5,
    userDeposit: 500,
    userEarnings: 45.2,
    leverage: 2.5,
    risk: "High",
  },
  {
    name: "LETH Vault",
    symbol: "LETH",
    tvl: 4100000,
    apy: 8.2,
    userDeposit: 2.5,
    userEarnings: 0.18,
    leverage: 1,
    risk: "Low",
  },
];

export const mockStablecoinVaults = [
  {
    collateral: "WLD",
    collateralAmount: 5000,
    collateralValue: 12250,
    debt: 5000,
    collateralRatio: 245,
    liquidationPrice: 1.25,
    maxMintable: 3166,
  },
  {
    collateral: "ETH",
    collateralAmount: 2,
    collateralValue: 3900,
    debt: 2000,
    collateralRatio: 195,
    liquidationPrice: 1538,
    maxMintable: 600,
  },
];

export const mockInsurancePools = [
  {
    name: "WLD Insurance Pool",
    coverage: 95,
    premiumRate: 2.0,
    poolSize: 850000,
    maxPayout: 500000,
    userStake: 1000,
    userRewards: 25,
  },
  {
    name: "ETH Insurance Pool",
    coverage: 95,
    premiumRate: 1.5,
    poolSize: 1200000,
    maxPayout: 800000,
    userStake: 0.5,
    userRewards: 15,
  },
  {
    name: "Smart Contract Cover",
    coverage: 90,
    premiumRate: 5.0,
    poolSize: 2100000,
    maxPayout: 1500000,
    userStake: 0,
    userRewards: 0,
  },
];

export const mockGovernanceProposals = [
  {
    id: 1,
    title: "Increase WLD collateral factor to 80%",
    description: "Proposal to increase the collateral factor for WLD in the lending pool from 75% to 80%.",
    proposer: "0x1234...5678",
    forVotes: 2500000,
    againstVotes: 500000,
    abstainVotes: 100000,
    state: "Active",
    startTime: Date.now() - 86400000,
    endTime: Date.now() + 518400000,
    executed: false,
  },
  {
    id: 2,
    title: "Add USDT as collateral for SWLD",
    description: "Add USDT as a supported collateral asset for minting SWLD stablecoin.",
    proposer: "0xabcd...efgh",
    forVotes: 3200000,
    againstVotes: 200000,
    abstainVotes: 50000,
    state: "Succeeded",
    startTime: Date.now() - 604800000,
    endTime: Date.now() - 172800000,
    executed: false,
  },
  {
    id: 3,
    title: "Reduce trading fees to 0.25%",
    description: "Reduce DEX trading fees from 0.3% to 0.25% to increase competitiveness.",
    proposer: "0x9876...5432",
    forVotes: 1800000,
    againstVotes: 1500000,
    abstainVotes: 200000,
    state: "Defeated",
    startTime: Date.now() - 1209600000,
    endTime: Date.now() - 777600000,
    executed: false,
  },
];

export const mockAirdrop = {
  totalAllocation: 45000000,
  claimed: 12500000,
  remaining: 32500000,
  userEligible: 1250,
  userClaimed: 625,
  userVested: 625,
  vestingEnd: Date.now() + 15552000000, // 180 days
  worldIdVerified: true,
};

export const mockPortfolio = {
  totalValue: 15680.5,
  totalEarnings: 1250.75,
  positions: [
    { protocol: "LWLD Vault", asset: "LWLD", value: 1210, apy: 24.5, earnings: 45.2 },
    { protocol: "LETH Vault", asset: "LETH", value: 4875, apy: 8.2, earnings: 18.5 },
    { protocol: "Lending Pool", asset: "WLD", value: 12250, apy: 8.5, earnings: 85.2 },
    { protocol: "Insurance Pool", asset: "SWLD", value: 1000, apy: 5.0, earnings: 12.5 },
  ],
};

export const mockStats = {
  tvl: 125000000,
  volume24h: 8500000,
  fees24h: 25500,
  users: 15420,
  wdxPrice: 0.85,
  wdxMarketCap: 255000000,
  wdxStaked: 125000000,
  wdxBurned: 5000000,
};

export const mockTransactions = [
  { type: "Swap", from: "WLD", to: "SWLD", amount: 1000, time: "2 min ago", status: "success" },
  { type: "Supply", token: "WLD", amount: 5000, time: "15 min ago", status: "success" },
  { type: "Claim", token: "WDX", amount: 125, time: "1 hour ago", status: "success" },
  { type: "Borrow", token: "USDC", amount: 2000, time: "3 hours ago", status: "success" },
  { type: "Stake", token: "WDX", amount: 1000, time: "1 day ago", status: "success" },
];
