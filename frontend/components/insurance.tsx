"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const pools = [
  {
    name: "WLD Insurance Pool",
    coverage: 95,
    premiumRate: 2.0,
    poolSize: 850000,
    maxPayout: 500000,
  },
  {
    name: "ETH Insurance Pool",
    coverage: 95,
    premiumRate: 1.5,
    poolSize: 1200000,
    maxPayout: 800000,
  },
  {
    name: "Smart Contract Cover",
    coverage: 90,
    premiumRate: 5.0,
    poolSize: 2100000,
    maxPayout: 1500000,
  },
];

const howItWorks = [
  {
    title: "Purchase Coverage",
    description: "Select pool and coverage amount",
    icon: Shield,
  },
  {
    title: "Pay Premium",
    description: "Annual fee based on coverage",
    icon: CheckCircle,
  },
  {
    title: "File Claims",
    description: "Submit proof for valid claims",
    icon: CheckCircle,
  },
];

export function Insurance() {
  const [selectedPool, setSelectedPool] = useState<typeof pools[0] | null>(null);
  const [coverageAmount, setCoverageAmount] = useState("");

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Safety</h1>
        <p className="text-muted-foreground">Insurance and security for your deposits</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Coverage</p>
            <p className="text-sm font-bold">{formatCurrency(4150000, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Active Policies</p>
            <p className="text-sm font-bold text-primary">1,245</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Claims Paid</p>
            <p className="text-sm font-bold text-success">{formatCurrency(125000, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-3 text-center">
            <p className="text-xs text-muted-foreground">Security Score</p>
            <p className="text-sm font-bold text-success">98/100</p>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Pools */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Insurance Pools</h2>
        <div className="space-y-3">
          {pools.map((pool) => (
            <Card key={pool.name} className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{pool.name}</h3>
                    <p className="text-xs text-muted-foreground">Up to {pool.coverage}% coverage</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Premium</p>
                    <p className="text-lg font-bold text-warning">{formatPercent(pool.premiumRate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pool Size</p>
                    <p className="text-sm font-medium">{formatCurrency(pool.poolSize, 0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Max Payout</p>
                    <p className="text-sm font-medium">{formatCurrency(pool.maxPayout, 0)}</p>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setSelectedPool(pool)}
                >
                  Get Coverage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span className="text-primary">ⓘ</span> How Insurance Works
          </h3>
          <div className="space-y-4">
            {howItWorks.map((step, index) => (
              <div key={step.title} className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success">
                  <step.icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Coverage Dialog */}
      <Dialog open={!!selectedPool} onOpenChange={() => setSelectedPool(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Get {selectedPool?.name} Coverage</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-muted-foreground">Coverage Amount</label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={coverageAmount}
                  onChange={(e) => setCoverageAmount(e.target.value)}
                  className="bg-background"
                />
                <span className="text-sm font-medium">USD</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Annual Premium</span>
              <span className="text-warning font-medium">
                {formatPercent(selectedPool?.premiumRate || 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Max Coverage</span>
              <span className="font-medium">{selectedPool?.coverage}%</span>
            </div>
            <Button className="w-full">Purchase Coverage</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
