"use client";

import React, { useState } from "react";
import { ArrowDown, Settings, Info, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockTokens, mockPools } from "../mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function SwapPreview() {
  const [fromToken, setFromToken] = useState("WLD");
  const [toToken, setToToken] = useState("SWLD");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);

  const fromTokenData = mockTokens[fromToken as keyof typeof mockTokens];
  const toTokenData = mockTokens[toToken as keyof typeof mockTokens];

  // Calculate output amount (simplified)
  const calculateOutput = (input: string) => {
    const inputNum = parseFloat(input);
    if (isNaN(inputNum)) return "";
    
    // Mock calculation with 0.3% fee
    const output = inputNum * (fromTokenData.price / toTokenData.price) * 0.997;
    return output.toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateOutput(value));
  };

  const handleSwap = () => {
    alert(`Swap Preview: ${fromAmount} ${fromToken} → ${toAmount} ${toToken}\n\nThis is a preview - no real transaction will occur.`);
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Swap</CardTitle>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <Settings className="h-4 w-4" />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* From Token */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">From</span>
              <span className="text-sm text-muted-foreground">
                Balance: {formatNumber(fromTokenData.balance)} {fromToken}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="flex-1 bg-transparent border-0 text-2xl font-medium focus-visible:ring-0"
              />
              <select
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                className="bg-card border rounded-lg px-3 py-2"
              >
                {Object.keys(mockTokens).map((token) => (
                  <option key={token} value={token}>
                    {token}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ≈ {formatCurrency(parseFloat(fromAmount || "0") * fromTokenData.price)}
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={switchTokens}
              className="bg-card border-2 border-background p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
          </div>

          {/* To Token */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">To</span>
              <span className="text-sm text-muted-foreground">
                Balance: {formatNumber(toTokenData.balance)} {toToken}
              </span>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="flex-1 bg-transparent border-0 text-2xl font-medium focus-visible:ring-0"
              />
              <select
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                className="bg-card border rounded-lg px-3 py-2"
              >
                {Object.keys(mockTokens).map((token) => (
                  <option key={token} value={token}>
                    {token}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ≈ {formatCurrency(parseFloat(toAmount || "0") * toTokenData.price)}
            </div>
          </div>

          {/* Settings */}
          {showSettings && (
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Slippage Tolerance</span>
                <div className="flex gap-2">
                  {[0.5, 1, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSlippage(s)}
                      className={`px-3 py-1 text-sm rounded-lg ${
                        slippage === s
                          ? "bg-primary text-primary-foreground"
                          : "bg-card"
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Swap Details */}
          {fromAmount && (
            <div className="bg-muted rounded-lg p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span>
                  1 {fromToken} ≈ {(fromTokenData.price / toTokenData.price).toFixed(6)} {toToken}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Impact</span>
                <span className="text-yellow-500">&lt; 0.01%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee (0.3%)</span>
                <span>{(parseFloat(fromAmount) * 0.003).toFixed(6)} {fromToken}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Minimum Received</span>
                <span>
                  {(parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)} {toToken}
                </span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleSwap}
            disabled={!fromAmount || parseFloat(fromAmount) <= 0}
          >
            {fromAmount ? "Swap" : "Enter Amount"}
          </Button>
        </CardContent>
      </Card>

      {/* Pool Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Pool Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Liquidity</span>
            <span>{formatCurrency(mockPools[0].tvl)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">24h Volume</span>
            <span>{formatCurrency(mockPools[0].volume24h)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">24h Fees</span>
            <span>{formatCurrency(mockPools[0].fees24h)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">LP APY</span>
            <span className="text-green-500">{mockPools[0].apy}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
