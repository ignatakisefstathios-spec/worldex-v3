"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockStakingVaults, mockTokens } from "../mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export function StakingPreview() {
  const [activeTab, setActiveTab] = useState("vaults");
  const [selectedVault, setSelectedVault] = useState(mockStakingVaults[0]);
  const [depositAmount, setDepositAmount] = useState("");

  const handleDeposit = () => {
    alert(`Stake Preview:\n${depositAmount} ${selectedVault.symbol}\n\nThis is a preview - no real transaction will occur.`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vaults">Vaults</TabsTrigger>
          <TabsTrigger value="positions">My Positions</TabsTrigger>
        </TabsList>

        <TabsContent value="vaults" className="space-y-4">
          {/* Vault Cards */}
          <div className="grid gap-4">
            {mockStakingVaults.map((vault) => (
              <Card
                key={vault.symbol}
                className={`cursor-pointer transition-all ${
                  selectedVault.symbol === vault.symbol
                    ? "border-primary ring-1 ring-primary"
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedVault(vault)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                        vault.risk === "High"
                          ? "bg-red-500/20 text-red-500"
                          : "bg-green-500/20 text-green-500"
                      }`}>
                        {vault.symbol[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{vault.name}</div>
                        <div className="text-sm text-muted-foreground">
                          TVL: {formatCurrency(vault.tvl)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">
                        {formatPercent(vault.apy)}
                      </div>
                      <div className={`text-sm ${
                        vault.risk === "High" ? "text-red-500" : "text-green-500"
                      }`}>
                        {vault.risk} Risk
                      </div>
                    </div>
                  </div>

                  {selectedVault.symbol === vault.symbol && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Deposit Amount</span>
                          <span className="text-sm text-muted-foreground">
                            Balance: {formatNumber(mockTokens[vault.symbol as keyof typeof mockTokens]?.balance || 0)} {vault.symbol}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            placeholder="0.0"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            onClick={() => setDepositAmount(
                              (mockTokens[vault.symbol as keyof typeof mockTokens]?.balance || 0).toString()
                            )}
                          >
                            Max
                          </Button>
                        </div>
                      </div>

                      <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expected APY</span>
                          <span className="text-green-500">{formatPercent(vault.apy)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Daily Earnings</span>
                          <span>
                            {formatCurrency(parseFloat(depositAmount || "0") * vault.apy / 100 / 365)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Monthly Earnings</span>
                          <span>
                            {formatCurrency(parseFloat(depositAmount || "0") * vault.apy / 100 / 12)}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleDeposit}
                        disabled={!depositAmount}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Stake {vault.symbol}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Staking Positions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockStakingVaults.filter(v => v.userDeposit > 0).map((vault) => (
                <div key={vault.symbol} className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold">
                        {vault.symbol[0]}
                      </div>
                      <div>
                        <div className="font-medium">{vault.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatNumber(vault.userDeposit)} {vault.symbol} deposited
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatPercent(vault.apy)} APY</div>
                      <div className="text-sm text-green-500">
                        +{formatCurrency(vault.userEarnings)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="bg-card rounded-lg p-2">
                      <div className="text-muted-foreground">Deposited</div>
                      <div className="font-medium">{formatNumber(vault.userDeposit)}</div>
                    </div>
                    <div className="bg-card rounded-lg p-2">
                      <div className="text-muted-foreground">Earnings</div>
                      <div className="font-medium text-green-500">+{formatNumber(vault.userEarnings)}</div>
                    </div>
                    <div className="bg-card rounded-lg p-2">
                      <div className="text-muted-foreground">Leverage</div>
                      <div className="font-medium">{vault.leverage}x</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" className="flex-1">Claim</Button>
                    <Button variant="outline" className="flex-1">Withdraw</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
