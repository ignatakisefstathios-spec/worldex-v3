"use client";

import React, { useState } from "react";
import { Plus, Minus, TrendingUp, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockPools, mockTokens } from "../mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export function LiquidityPreview() {
  const [selectedPool, setSelectedPool] = useState(mockPools[0]);
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [activeTab, setActiveTab] = useState("add");

  const token0Data = mockTokens[selectedPool.token0 as keyof typeof mockTokens];
  const token1Data = mockTokens[selectedPool.token1 as keyof typeof mockTokens];

  const handleAddLiquidity = () => {
    alert(`Add Liquidity Preview:\n${amount0} ${selectedPool.token0} + ${amount1} ${selectedPool.token1}\n\nThis is a preview - no real transaction will occur.`);
  };

  const handleRemoveLiquidity = () => {
    alert(`Remove Liquidity Preview:\n${amount0}% of LP position\n\nThis is a preview - no real transaction will occur.`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="add">Add Liquidity</TabsTrigger>
          <TabsTrigger value="remove">Remove Liquidity</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Liquidity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pool Selection */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Select Pool</label>
                <div className="grid grid-cols-2 gap-2">
                  {mockPools.map((pool) => (
                    <button
                      key={pool.id}
                      onClick={() => setSelectedPool(pool)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        selectedPool.id === pool.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium">
                        {pool.token0}/{pool.token1}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        APY: {pool.apy}%
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Token 0 Input */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Input</span>
                  <span className="text-sm text-muted-foreground">
                    Balance: {formatNumber(token0Data.balance)} {selectedPool.token0}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount0}
                    onChange={(e) => setAmount0(e.target.value)}
                    className="flex-1 bg-transparent border-0 text-xl font-medium"
                  />
                  <span className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg">
                    <span className="font-medium">{selectedPool.token0}</span>
                  </span>
                </div>
              </div>

              {/* Token 1 Input */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Input</span>
                  <span className="text-sm text-muted-foreground">
                    Balance: {formatNumber(token1Data.balance)} {selectedPool.token1}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount1}
                    onChange={(e) => setAmount1(e.target.value)}
                    className="flex-1 bg-transparent border-0 text-xl font-medium"
                  />
                  <span className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg">
                    <span className="font-medium">{selectedPool.token1}</span>
                  </span>
                </div>
              </div>

              {/* Pool Info */}
              <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pool TVL</span>
                  <span>{formatCurrency(selectedPool.tvl)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Share</span>
                  <span>{formatPercent((selectedPool.lpBalance / selectedPool.lpTotalSupply) * 100)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LP APY</span>
                  <span className="text-green-500">{selectedPool.apy}%</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleAddLiquidity}
                disabled={!amount0 || !amount1}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Liquidity
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="remove" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Remove Liquidity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Amount to Remove</span>
                  <span className="text-sm text-muted-foreground">
                    LP Balance: {formatNumber(selectedPool.lpBalance)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="0"
                    value={amount0}
                    onChange={(e) => setAmount0(e.target.value)}
                    className="flex-1 bg-transparent border-0 text-xl font-medium"
                  />
                  <span className="flex items-center px-3 py-2 bg-card rounded-lg">
                    <span className="font-medium">%</span>
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setAmount0(pct.toString())}
                      className="flex-1 py-1 text-xs bg-card rounded hover:bg-primary/10"
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You'll Receive</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedPool.token0}</span>
                  <span>{formatNumber(selectedPool.reserve0 * 0.01)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{selectedPool.token1}</span>
                  <span>{formatNumber(selectedPool.reserve1 * 0.01)}</span>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                variant="destructive"
                onClick={handleRemoveLiquidity}
                disabled={!amount0}
              >
                <Minus className="h-4 w-4 mr-2" />
                Remove Liquidity
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Your Positions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Your Liquidity Positions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockPools.filter(p => p.lpBalance > 0).map((pool) => (
            <div key={pool.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs text-white font-bold">
                    {pool.token0[0]}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                    {pool.token1[0]}
                  </div>
                </div>
                <div>
                  <div className="font-medium">{pool.token0}/{pool.token1}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatNumber(pool.lpBalance)} LP
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(pool.tvl * (pool.lpBalance / pool.lpTotalSupply))}</div>
                <div className="text-sm text-green-500">{pool.apy}% APY</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
