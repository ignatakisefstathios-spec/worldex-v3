"use client";

import React from "react";
import { Wallet, TrendingUp, TrendingDown, PieChart, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockPortfolio, mockTokens, mockTransactions } from "../mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function PortfolioPreview() {
  const totalChange = mockPortfolio.positions.reduce((acc, pos) => acc + pos.earnings, 0);
  const avgApy = mockPortfolio.positions.reduce((acc, pos) => acc + pos.apy, 0) / mockPortfolio.positions.length;

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Portfolio Value */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Total Portfolio Value</div>
            <div className="text-4xl font-bold">{formatCurrency(mockPortfolio.totalValue)}</div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{formatCurrency(totalChange)}
              </span>
              <span className="text-muted-foreground">({formatNumber(avgApy)}% APY)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <Wallet className="h-5 w-5 mx-auto mb-2 text-blue-500" />
            <div className="text-xs text-muted-foreground">Deposited</div>
            <div className="font-medium">{formatCurrency(mockPortfolio.totalValue - totalChange)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-5 w-5 mx-auto mb-2 text-green-500" />
            <div className="text-xs text-muted-foreground">Earnings</div>
            <div className="font-medium text-green-500">+{formatCurrency(totalChange)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PieChart className="h-5 w-5 mx-auto mb-2 text-purple-500" />
            <div className="text-xs text-muted-foreground">Positions</div>
            <div className="font-medium">{mockPortfolio.positions.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Positions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Your Positions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockPortfolio.positions.map((position, index) => (
            <div key={index} className="bg-muted rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold">
                    {position.asset[0]}
                  </div>
                  <div>
                    <div className="font-medium">{position.protocol}</div>
                    <div className="text-sm text-muted-foreground">{position.asset}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(position.value)}</div>
                  <div className="text-sm text-green-500">+{formatCurrency(position.earnings)}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="bg-card rounded-lg p-2">
                  <div className="text-muted-foreground">Value</div>
                  <div className="font-medium">{formatCurrency(position.value)}</div>
                </div>
                <div className="bg-card rounded-lg p-2">
                  <div className="text-muted-foreground">APY</div>
                  <div className="font-medium text-green-500">{position.apy}%</div>
                </div>
                <div className="bg-card rounded-lg p-2">
                  <div className="text-muted-foreground">Earnings</div>
                  <div className="font-medium text-green-500">+{formatCurrency(position.earnings)}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockPortfolio.positions.map((position, index) => {
              const percentage = (position.value / mockPortfolio.totalValue) * 100;
              return (
                <div key={index}>
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

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockTransactions.map((tx, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  tx.type === "Swap" ? "bg-blue-500/20 text-blue-500" :
                  tx.type === "Supply" ? "bg-green-500/20 text-green-500" :
                  tx.type === "Borrow" ? "bg-yellow-500/20 text-yellow-500" :
                  "bg-purple-500/20 text-purple-500"
                }`}>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium text-sm">{tx.type}</div>
                  <div className="text-xs text-muted-foreground">{tx.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">
                  {tx.amount} {tx.token || tx.to}
                </div>
                <div className="text-xs text-green-500">{tx.status}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
