"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const products = [
  {
    id: "lwld",
    name: "LWLD",
    fullName: "Leveraged WLD",
    description: "Amplify your WLD exposure with up to 3x leverage while earning staking rewards.",
    apy: 24.5,
    tvl: 3200000,
    risk: "High",
    icon: "⚡",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    id: "leth",
    name: "LETH",
    fullName: "Liquid ETH",
    description: "Stake your ETH and receive liquid staking tokens that earn rewards while staying liquid.",
    apy: 8.2,
    tvl: 4100000,
    risk: "Low",
    icon: "📈",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "swld",
    name: "SWLD",
    fullName: "Stable Worldcoin",
    description: "Over-collateralized stablecoin backed by WLD and ETH with 150% minimum collateral ratio.",
    apy: 12.8,
    tvl: 2800000,
    risk: "Medium",
    icon: "🛡️",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "arbitrage",
    name: "Arbitrage Pool",
    fullName: "Arbitrage Pool",
    description: "Deposit SWLD to earn from liquidation penalties and arbitrage opportunities across protocols.",
    apy: 28.3,
    tvl: 1400000,
    risk: "Medium",
    icon: "🔄",
    color: "from-purple-500/20 to-pink-500/20",
  },
];

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground">Explore our suite of DeFi products</p>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="bg-card/50 border-border/50 overflow-hidden"
          >
            <div className={`h-1 bg-gradient-to-r ${product.color}`} />
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                    {product.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.fullName}</p>
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

              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground">APY</p>
                  <p className="text-xl font-bold text-success">{formatPercent(product.apy)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">TVL</p>
                  <p className="text-sm font-medium">{formatCurrency(product.tvl, 0)}</p>
                </div>
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => setSelectedProduct(product)}
              >
                Deposit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deposit Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Deposit {selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-muted-foreground">Amount</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-background"
                />
                <span className="text-sm font-medium">{selectedProduct?.name}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expected APY</span>
              <span className="text-success font-medium">
                {formatPercent(selectedProduct?.apy || 0)}
              </span>
            </div>
            <Button className="w-full">Confirm Deposit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
