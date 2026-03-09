"use client";

import React, { useState } from "react";
import { 
  Home, 
  Repeat, 
  Droplets, 
  TrendingUp, 
  Shield, 
  Vote, 
  Gift,
  Wallet,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

// Preview Pages
import { SwapPreview } from "./preview-pages/swap-preview";
import { LiquidityPreview } from "./preview-pages/liquidity-preview";
import { StakingPreview } from "./preview-pages/staking-preview";
import { LendingPreview } from "./preview-pages/lending-preview";
import { GovernancePreview } from "./preview-pages/governance-preview";
import { AirdropPreview } from "./preview-pages/airdrop-preview";
import { PortfolioPreview } from "./preview-pages/portfolio-preview";
import { DashboardPreview } from "./preview-pages/dashboard-preview";

type Tab = "dashboard" | "swap" | "liquidity" | "staking" | "lending" | "governance" | "airdrop" | "portfolio";

const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "swap", label: "Swap", icon: Repeat },
  { id: "liquidity", label: "Liquidity", icon: Droplets },
  { id: "staking", label: "Staking", icon: TrendingUp },
  { id: "lending", label: "Lending", icon: Wallet },
  { id: "governance", label: "Governance", icon: Vote },
  { id: "airdrop", label: "Airdrop", icon: Gift },
  { id: "portfolio", label: "Portfolio", icon: Shield },
];

export function PreviewApp() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardPreview />;
      case "swap":
        return <SwapPreview />;
      case "liquidity":
        return <LiquidityPreview />;
      case "staking":
        return <StakingPreview />;
      case "lending":
        return <LendingPreview />;
      case "governance":
        return <GovernancePreview />;
      case "airdrop":
        return <AirdropPreview />;
      case "portfolio":
        return <PortfolioPreview />;
      default:
        return <DashboardPreview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-green-500 text-white font-bold">
              W
            </div>
            <span className="text-lg font-semibold">Worldex Preview</span>
            <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-500 rounded-full">
              Preview Mode
            </span>
          </div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-muted"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="border-t border-border/40 bg-background px-4 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMenuOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 w-full py-3 text-sm font-medium transition-colors",
                  activeTab === item.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-border/40 overflow-x-auto">
        <div className="flex gap-1 p-2 min-w-max">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 pb-24">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background/95 backdrop-blur p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Worldex Protocol Preview</span>
          <span>Mock Data • No Real Transactions</span>
        </div>
      </footer>
    </div>
  );
}
