"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const markets = [
  {
    token: "WLD",
    icon: "W",
    collateralFactor: 75,
    supplyAPY: 8.5,
    borrowAPY: 13.4,
    totalSupply: 2500000,
    totalBorrow: 1200000,
    utilization: 48,
  },
  {
    token: "ETH",
    icon: "E",
    collateralFactor: 80,
    supplyAPY: 3.2,
    borrowAPY: 5.8,
    totalSupply: 4200000,
    totalBorrow: 1800000,
    utilization: 43,
  },
  {
    token: "USDC",
    icon: "U",
    collateralFactor: 85,
    supplyAPY: 5.8,
    borrowAPY: 8.2,
    totalSupply: 1800000,
    totalBorrow: 950000,
    utilization: 53,
  },
  {
    token: "WDX",
    icon: "W",
    collateralFactor: 65,
    supplyAPY: 12.5,
    borrowAPY: 18.2,
    totalSupply: 850000,
    totalBorrow: 320000,
    utilization: 38,
  },
];

export function Lending() {
  const [activeTab, setActiveTab] = useState("supply");
  const [selectedMarket, setSelectedMarket] = useState<typeof markets[0] | null>(null);
  const [amount, setAmount] = useState("");

  const totalSupplied = 9350000;
  const totalBorrowed = 4270000;
  const avgSupplyAPY = 7.5;
  const avgBorrowAPY = 11.4;

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Lending</h1>
        <p className="text-muted-foreground">Supply assets to earn interest or borrow against collateral</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Supplied</p>
            <p className="text-lg font-bold">{formatCurrency(totalSupplied, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total Borrowed</p>
            <p className="text-lg font-bold text-primary">{formatCurrency(totalBorrowed, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Supply APY</p>
            <p className="text-lg font-bold text-success">{formatPercent(avgSupplyAPY)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Avg Borrow APY</p>
            <p className="text-lg font-bold text-warning">{formatPercent(avgBorrowAPY)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Markets */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supply">Supply</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
        </TabsList>

        <TabsContent value="supply" className="space-y-3 mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">Supply Markets</h3>
          {markets.map((market) => (
            <Card key={market.token} className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold">
                      {market.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{market.token}</h4>
                      <p className="text-xs text-muted-foreground">CF: {market.collateralFactor}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-success">{formatPercent(market.supplyAPY)}</p>
                    <p className="text-xs text-muted-foreground">APY</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Supply</p>
                    <p className="text-sm font-medium">{formatCurrency(market.totalSupply, 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Borrow</p>
                    <p className="text-sm font-medium">{formatCurrency(market.totalBorrow, 0)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Utilization</p>
                    <p className="text-sm font-medium text-primary">{market.utilization}%</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => setSelectedMarket(market)}
                >
                  Supply
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="borrow" className="space-y-3 mt-4">
          <h3 className="text-sm font-medium text-muted-foreground">Borrow Markets</h3>
          {markets.map((market) => (
            <Card key={market.token} className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold">
                      {market.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{market.token}</h4>
                      <p className="text-xs text-muted-foreground">CF: {market.collateralFactor}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-warning">{formatPercent(market.borrowAPY)}</p>
                    <p className="text-xs text-muted-foreground">APY</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/50">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Supply</p>
                    <p className="text-sm font-medium">{formatCurrency(market.totalSupply, 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Borrow</p>
                    <p className="text-sm font-medium">{formatCurrency(market.totalBorrow, 0)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Utilization</p>
                    <p className="text-sm font-medium text-primary">{market.utilization}%</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => setSelectedMarket(market)}
                >
                  Borrow
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Action Dialog */}
      <Dialog open={!!selectedMarket} onOpenChange={() => setSelectedMarket(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>
              {activeTab === "supply" ? "Supply" : "Borrow"} {selectedMarket?.token}
            </DialogTitle>
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
                <span className="text-sm font-medium">{selectedMarket?.token}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">APY</span>
              <span className={activeTab === "supply" ? "text-success" : "text-warning"}>
                {formatPercent(
                  activeTab === "supply"
                    ? selectedMarket?.supplyAPY || 0
                    : selectedMarket?.borrowAPY || 0
                )}
              </span>
            </div>
            <Button className="w-full">
              Confirm {activeTab === "supply" ? "Supply" : "Borrow"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
