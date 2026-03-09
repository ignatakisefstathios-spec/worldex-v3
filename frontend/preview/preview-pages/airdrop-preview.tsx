"use client";

import React, { useState } from "react";
import { Gift, CheckCircle, Clock, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockAirdrop, mockStats } from "../mock-data";
import { formatNumber, formatCurrency } from "@/lib/utils";

export function AirdropPreview() {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    alert("Airdrop Claimed!\n\nThis is a preview - no real tokens were transferred.");
  };

  const tokenDistribution = [
    { name: "User Airdrop", amount: 45000000, percent: 15, color: "bg-blue-500" },
    { name: "Team", amount: 30000000, percent: 10, color: "bg-purple-500" },
    { name: "Ecosystem", amount: 60000000, percent: 20, color: "bg-cyan-500" },
    { name: "Treasury", amount: 75000000, percent: 25, color: "bg-green-500" },
    { name: "Staking Rewards", amount: 60000000, percent: 20, color: "bg-yellow-500" },
    { name: "Liquidity", amount: 30000000, percent: 10, color: "bg-orange-500" },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Hero */}
      <div className="text-center py-6">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
            <Gift className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">WDX Airdrop</h1>
        <p className="text-muted-foreground mt-2">
          Claim your share of 45M WDX tokens
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground">Total Allocation</div>
            <div className="text-xl font-bold">{formatNumber(mockAirdrop.totalAllocation / 1000000)}M</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground">Claimed</div>
            <div className="text-xl font-bold text-green-500">{formatNumber(mockAirdrop.claimed / 1000000)}M</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground">Remaining</div>
            <div className="text-xl font-bold">{formatNumber(mockAirdrop.remaining / 1000000)}M</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="claim" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="claim">Your Airdrop</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="claim" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Eligibility Check */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <div className="font-medium text-green-500">World ID Verified</div>
                    <div className="text-sm text-muted-foreground">
                      Your identity has been verified
                    </div>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center py-4">
                <div className="text-sm text-muted-foreground mb-1">Available to Claim</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  {formatNumber(mockAirdrop.userEligible)} WDX
                </div>
                <div className="text-muted-foreground mt-1">
                  ≈ {formatCurrency(mockAirdrop.userEligible * mockStats.wdxPrice)}
                </div>
              </div>

              {/* Vesting Info */}
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Instant (50%)</span>
                  <span className="font-medium">{formatNumber(mockAirdrop.userClaimed)} WDX</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vested (50%)</span>
                  <span className="font-medium">{formatNumber(mockAirdrop.userVested)} WDX</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vesting Ends</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(mockAirdrop.vestingEnd).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Claim Button */}
              <Button
                className="w-full"
                size="lg"
                onClick={handleClaim}
                disabled={claimed}
              >
                {claimed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Claimed
                  </>
                ) : (
                  <>
                    <Gift className="h-4 w-4 mr-2" />
                    Claim Airdrop
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Token Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Distribution Bar */}
              <div className="flex h-4 rounded-full overflow-hidden">
                {tokenDistribution.map((item) => (
                  <div
                    key={item.name}
                    className={item.color}
                    style={{ width: `${item.percent}%` }}
                    title={`${item.name}: ${item.percent}%`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {tokenDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">
                      {formatNumber(item.amount / 1000000)}M ({item.percent}%)
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="pt-4 border-t">
                <div className="flex justify-between font-medium">
                  <span>Total Supply</span>
                  <span>300M WDX</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-5 w-5 mx-auto mb-2 text-green-500" />
                <div className="text-sm text-muted-foreground">Burned</div>
                <div className="text-lg font-bold">{formatNumber(mockStats.wdxBurned / 1000000)}M</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                <div className="text-sm text-muted-foreground">Holders</div>
                <div className="text-lg font-bold">{formatNumber(15420)}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
