"use client";

import React from "react";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockStats, mockPools } from "../mock-data";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

export function DashboardPreview() {
  const featuredPools = mockPools.slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Welcome */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold">Welcome to Worldex</h1>
        <p className="text-muted-foreground">The premier DeFi protocol for the World ecosystem</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total Value Locked</span>
            </div>
            <div className="text-xl font-bold">{formatCurrency(mockStats.tvl)}</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-3 w-3" />
              +15.3%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">24h Volume</span>
            </div>
            <div className="text-xl font-bold">{formatCurrency(mockStats.volume24h)}</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-3 w-3" />
              +8.7%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Active Users</span>
            </div>
            <div className="text-xl font-bold">{formatNumber(mockStats.users)}</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-3 w-3" />
              +23.1%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">24h Fees</span>
            </div>
            <div className="text-xl font-bold">{formatCurrency(mockStats.fees24h)}</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-3 w-3" />
              +12.4%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Pools */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">Featured Pools</CardTitle>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {featuredPools.map((pool) => (
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
                  <div className="text-sm text-muted-foreground">{formatCurrency(pool.tvl)} TVL</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-500 font-medium">{pool.apy}% APY</div>
                <div className="text-sm text-muted-foreground">{formatCurrency(pool.volume24h)} vol</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* WDX Token */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">WDX Token</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold text-xl">
                W
              </div>
              <div>
                <div className="font-medium">Worldex Token</div>
                <div className="text-sm text-muted-foreground">WDX</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">${mockStats.wdxPrice}</div>
              <div className="text-sm text-green-500">+5.2%</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="bg-muted rounded-lg p-2 text-center">
              <div className="text-xs text-muted-foreground">Market Cap</div>
              <div className="font-medium">{formatNumber(mockStats.wdxMarketCap / 1000000)}M</div>
            </div>
            <div className="bg-muted rounded-lg p-2 text-center">
              <div className="text-xs text-muted-foreground">Staked</div>
              <div className="font-medium">{formatNumber(mockStats.wdxStaked / 1000000)}M</div>
            </div>
            <div className="bg-muted rounded-lg p-2 text-center">
              <div className="text-xs text-muted-foreground">Burned</div>
              <div className="font-medium">{formatNumber(mockStats.wdxBurned / 1000000)}M</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm">Start Earning</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
          <Activity className="h-5 w-5" />
          <span className="text-sm">Provide Liquidity</span>
        </Button>
      </div>
    </div>
  );
}
