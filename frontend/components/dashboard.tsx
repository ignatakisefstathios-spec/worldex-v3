"use client";

import { TrendingUp, TrendingDown, Users, DollarSign, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const stats = [
  {
    label: "Total Value Locked",
    value: 12500000,
    change: 15.3,
    prefix: "$",
    format: "compact",
  },
  {
    label: "24h Volume",
    value: 2100000,
    change: 8.7,
    prefix: "$",
    format: "compact",
  },
  {
    label: "Active Users",
    value: 8432,
    change: 23.1,
    prefix: "",
    format: "number",
  },
  {
    label: "Fees Generated",
    value: 145000,
    change: 12.4,
    prefix: "$",
    format: "compact",
  },
];

const featuredProducts = [
  {
    name: "LWLD",
    description: "Leveraged WLD staking for amplified yields",
    apy: 24.5,
    tvl: 3200000,
    risk: "High",
    icon: "⚡",
  },
  {
    name: "LETH",
    description: "Stake your ETH and receive liquid staking tokens",
    apy: 8.2,
    tvl: 4100000,
    risk: "Low",
    icon: "📈",
  },
  {
    name: "SWLD",
    description: "Over-collateralized stablecoin backed by WLD and ETH",
    apy: 12.8,
    tvl: 2800000,
    risk: "Medium",
    icon: "🛡️",
  },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6 p-4">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to Worldex Protocol</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-xl font-bold mt-1">
                {stat.prefix}
                {stat.format === "compact"
                  ? formatCurrency(stat.value, 1).replace("$", "")
                  : formatNumber(stat.value)}
              </p>
              <div
                className={`flex items-center gap-1 text-xs mt-1 ${
                  stat.change >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                {stat.change >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change >= 0 ? "+" : ""}
                {stat.change}%
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Featured Products</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={() => onNavigate("products")}
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {featuredProducts.map((product) => (
            <Card
              key={product.name}
              className="bg-card/50 border-border/50 cursor-pointer hover:bg-card/80 transition-colors"
              onClick={() => onNavigate("products")}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg">
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.risk === "High"
                        ? "bg-destructive/20 text-destructive"
                        : product.risk === "Medium"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/20 text-success"
                    }`}
                  >
                    {product.risk} Risk
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">APY</p>
                    <p className="text-lg font-bold text-success">{formatPercent(product.apy)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">TVL</p>
                    <p className="text-sm font-medium">
                      {formatCurrency(product.tvl, 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
          onClick={() => onNavigate("lending")}
        >
          <DollarSign className="h-5 w-5" />
          <span className="text-sm">Supply Assets</span>
        </Button>
        <Button
          variant="outline"
          className="h-auto py-4 flex flex-col items-center gap-2"
          onClick={() => onNavigate("insurance")}
        >
          <Activity className="h-5 w-5" />
          <span className="text-sm">Get Coverage</span>
        </Button>
      </div>
    </div>
  );
}
