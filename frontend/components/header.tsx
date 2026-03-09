"use client";

import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { formatAddress } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const navItems = [
    { label: "Dashboard", href: "#dashboard" },
    { label: "Products", href: "#products" },
    { label: "Pools", href: "#pools" },
    { label: "Swap", href: "#swap" },
    { label: "Airdrop", href: "#airdrop" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Staking", href: "#staking" },
    { label: "CDP Vault", href: "#cdp" },
    { label: "Arbitrage", href: "#arbitrage" },
    { label: "Safety", href: "#safety" },
    { label: "Lending", href: "#lending" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            W
          </div>
          <span className="text-lg font-semibold">Worldex</span>
        </div>

        {/* Wallet Button */}
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => disconnect()}
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              {formatAddress(address || "")}
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => connect()}
              className="gap-2"
            >
              <Wallet className="h-4 w-4" />
              Connect
            </Button>
          )}

          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="border-t border-border/40 bg-background px-4 py-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center justify-between py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors border-b border-border/40 last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
              <span className="text-muted-foreground">→</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
