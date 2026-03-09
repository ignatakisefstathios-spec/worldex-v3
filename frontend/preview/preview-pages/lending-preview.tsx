"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, Wallet, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockLendingMarkets, mockTokens } from "../mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export function LendingPreview() {
  const [activeTab, setActiveTab] = useState("supply");
  const [selectedMarket, setSelectedMarket] = useState(mockLendingMarkets[0]);
  const [amount, setAmount] = useState("");

  const handleSupply = () => {
    alert(`Supply Preview:\n${amount} ${selectedMarket.token}\n\nThis is a preview - no real transaction will occur.`);
  };

  const handleBorrow = () => {
    alert(`Borrow Preview:\n${amount} ${selectedMarket.token}\n\nThis is a preview - no real transaction will occur.`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Supplied</div>
            <div className="text-xl font-bold">{formatCurrency(9350000)}</div>
            <div className="text-sm text-green-500">{formatPercent(7.5)} avg APY</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Borrowed</div>
            <div className="text-xl font-bold">{formatCurrency(4270000)}</div>
            <div className="text-sm text-yellow-500">{formatPercent(11.4)} avg APY</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supply">Supply</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
        </TabsList>

        <TabsContent value="supply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supply Markets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLendingMarkets.map((market) => (
                <div
                  key={market.token}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMarket.token === market.token
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedMarket(market)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                        {market.token[0]}
                      </div>
                      <div>
                        <div className="font-medium">{market.token}</div>
                        <div className="text-sm text-muted-foreground">
                          CF: {market.collateralFactor}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-500 font-medium">{formatPercent(market.supplyAPY)}</div>
                      <div className="text-sm text-muted-foreground">Supply APY</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Total Supply</div>
                      <div className="font-medium">{formatCurrency(market.totalSupply)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Borrow</div>
                      <div className="font-medium">{formatCurrency(market.totalBorrow)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Utilization</div>
                      <div className="font-medium">{market.utilization}%</div>
                    </div>
                  </div>

                  {selectedMarket.token === market.token && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Amount to Supply</span>
                          <span className="text-sm text-muted-foreground">
                            Balance: {formatNumber(mockTokens[market.token as keyof typeof mockTokens]?.balance || 0)} {market.token}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            onClick={() => setAmount(
                              (mockTokens[market.token as keyof typeof mockTokens]?.balance || 0).toString()
                            )}
                          >
                            Max
                          </Button>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Supply APY</span>
                          <span className="text-green-500">{formatPercent(market.supplyAPY)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Daily Earnings</span>
                          <span>
                            {formatCurrency(parseFloat(amount || "0") * (mockTokens[market.token as keyof typeof mockTokens]?.price || 0) * market.supplyAPY / 100 / 365)}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleSupply}
                        disabled={!amount}
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Supply {market.token}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Borrow Markets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLendingMarkets.map((market) => (
                <div
                  key={market.token}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedMarket.token === market.token
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedMarket(market)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold">
                        {market.token[0]}
                      </div>
                      <div>
                        <div className="font-medium">{market.token}</div>
                        <div className="text-sm text-muted-foreground">
                          CF: {market.collateralFactor}%
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-500 font-medium">{formatPercent(market.borrowAPY)}</div>
                      <div className="text-sm text-muted-foreground">Borrow APY</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                    <div>
                      <div className="text-muted-foreground">Available</div>
                      <div className="font-medium">{formatCurrency(market.totalSupply - market.totalBorrow)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Total Borrow</div>
                      <div className="font-medium">{formatCurrency(market.totalBorrow)}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Utilization</div>
                      <div className="font-medium">{market.utilization}%</div>
                    </div>
                  </div>

                  {selectedMarket.token === market.token && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Amount to Borrow</span>
                        </div>
                        <Input
                          type="number"
                          placeholder="0.0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full"
                        />
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <div className="text-sm">
                          <div className="font-medium text-yellow-500">Borrow Risk</div>
                          <div className="text-muted-foreground">
                            Borrowing reduces your collateral ratio. Monitor your health factor to avoid liquidation.
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        variant="outline"
                        onClick={handleBorrow}
                        disabled={!amount}
                      >
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Borrow {market.token}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
