"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Wallet, TrendingUp, PieChart } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";

const positions = [
  {
    protocol: "LWLD Vault",
    asset: "LWLD",
    balance: 1250.5,
    value: 3126.25,
    apy: 24.5,
    pnl: 156.32,
  },
  {
    protocol: "LETH Vault",
    asset: "LETH",
    balance: 2.5,
    value: 6250.0,
    apy: 8.2,
    pnl: 85.5,
  },
  {
    protocol: "Lending Pool",
    asset: "WLD",
    balance: 5000,
    value: 5000,
    apy: 8.5,
    pnl: 42.5,
  },
  {
    protocol: "Insurance Pool",
    asset: "SWLD",
    balance: 2500,
    value: 2500,
    apy: 5.0,
    pnl: 10.42,
  },
];

export function Portfolio() {
  const totalValue = positions.reduce((acc, pos) => acc + pos.value, 0);
  const totalPnl = positions.reduce((acc, pos) => acc + pos.pnl, 0);
  const avgApy = positions.reduce((acc, pos) => acc + pos.apy, 0) / positions.length;

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <p className="text-muted-foreground">Track your positions across all protocols</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <Wallet className="h-5 w-5 mx-auto mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="text-lg font-bold">{formatCurrency(totalValue, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-2 text-success" />
            <p className="text-xs text-muted-foreground">Total P&L</p>
            <p className="text-lg font-bold text-success">+{formatCurrency(totalPnl, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4 text-center">
            <PieChart className="h-5 w-5 mx-auto mb-2 text-warning" />
            <p className="text-xs text-muted-foreground">Avg APY</p>
            <p className="text-lg font-bold text-warning">{formatPercent(avgApy)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Positions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Your Positions</h2>
        <div className="space-y-3">
          {positions.map((position) => (
            <Card key={position.protocol} className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{position.protocol}</h4>
                    <p className="text-xs text-muted-foreground">{position.asset}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(position.value)}</p>
                    <p className="text-xs text-muted-foreground">
                      {position.balance.toFixed(2)} {position.asset}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">APY</p>
                    <p className="text-sm font-medium text-success">{formatPercent(position.apy)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">P&L</p>
                    <p className="text-sm font-medium text-success">
                      +{formatCurrency(position.pnl)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Asset Allocation */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Asset Allocation</h3>
          <div className="space-y-3">
            {positions.map((position) => {
              const percentage = (position.value / totalValue) * 100;
              return (
                <div key={position.asset}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{position.asset}</span>
                    <span>{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
