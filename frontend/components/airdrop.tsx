"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Check, Users, Building, Leaf, Wallet, Coins } from "lucide-react";
import { formatNumber } from "@/lib/utils";

const tokenDistribution = [
  { name: "User Airdrop", amount: 45000000, percent: 15, color: "bg-blue-500", icon: Users },
  { name: "Team", amount: 30000000, percent: 10, color: "bg-purple-500", icon: Building },
  { name: "Ecosystem", amount: 60000000, percent: 20, color: "bg-cyan-500", icon: Leaf },
  { name: "Treasury", amount: 75000000, percent: 25, color: "bg-green-500", icon: Wallet },
  { name: "Staking Rewards", amount: 60000000, percent: 20, color: "bg-yellow-500", icon: Coins },
  { name: "Liquidity", amount: 30000000, percent: 10, color: "bg-orange-500", icon: Gift },
];

const teamAllocation = {
  total: 30000000,
  instant: 15000000,
  vested: 15000000,
};

export function Airdrop() {
  const [activeTab, setActiveTab] = useState("overview");
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Gift className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold">WDX Airdrop</h1>
        <p className="text-muted-foreground">
          Claim your vested WDX tokens with real-time staking rewards.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="user">User</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Token Distribution</h3>
              <div className="space-y-3">
                {tokenDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${item.color}`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-sm font-medium">
                          {formatNumber(item.amount / 1000000)}M WDX ({item.percent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Visual bar */}
              <div className="flex h-4 rounded-full overflow-hidden mt-4">
                {tokenDistribution.map((item) => (
                  <div
                    key={item.name}
                    className={item.color}
                    style={{ width: `${item.percent}%` }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4 mt-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Team Allocation</h3>
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-3xl font-bold">{formatNumber(teamAllocation.total / 1000000)}M WDX</p>
              </div>

              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-success/10">
                  <div>
                    <p className="text-sm text-muted-foreground">Instant (50%)</p>
                    <p className="text-lg font-bold text-success">
                      {formatNumber(teamAllocation.instant / 1000000)}M WDX
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-success" />
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-warning/10">
                  <div>
                    <p className="text-sm text-muted-foreground">Vested (50%)</p>
                    <p className="text-lg font-bold text-warning">
                      {formatNumber(teamAllocation.vested / 1000000)}M WDX
                    </p>
                  </div>
                  <span className="text-xs text-warning">4 year vesting</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-4 mt-4">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Your Airdrop</h3>

              <div className="text-center py-6">
                <p className="text-sm text-muted-foreground">Available to Claim</p>
                <p className="text-4xl font-bold gradient-text mt-2">1,250 WDX</p>
                <p className="text-sm text-muted-foreground mt-1">≈ $625.00</p>
              </div>

              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">World ID Status</span>
                  <span className="text-success flex items-center gap-1">
                    <Check className="h-3 w-3" /> Verified
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vesting</span>
                  <span>50% instant, 50% in 180 days</span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleClaim}
                disabled={claimed}
              >
                {claimed ? (
                  <>
                    <Check className="h-4 w-4 mr-2" /> Claimed
                  </>
                ) : (
                  "Claim Airdrop"
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
