"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Check, AlertTriangle, Lock } from "lucide-react";

const audits = [
  {
    name: "WDX Token",
    auditor: "CertiK",
    status: "Passed",
    date: "2024-01-15",
  },
  {
    name: "Staking Contract",
    auditor: "OpenZeppelin",
    status: "Passed",
    date: "2024-01-20",
  },
  {
    name: "CDP Vault",
    auditor: "Trail of Bits",
    status: "Passed",
    date: "2024-02-01",
  },
  {
    name: "Arbitrage Pool",
    auditor: "CertiK",
    status: "Passed",
    date: "2024-02-10",
  },
];

export function Safety() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold">Security Audits</h1>
        <p className="text-muted-foreground">Verified by leading security firms</p>
      </div>

      {/* Audit List */}
      <div className="space-y-3">
        {audits.map((audit) => (
          <Card key={audit.name} className="bg-card/50 border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <Lock className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{audit.name}</h4>
                    <p className="text-xs text-muted-foreground">Audited by {audit.auditor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success/20 text-success text-xs">
                    <Check className="h-3 w-3" /> {audit.status}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">{audit.date}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Risk Disclaimer */}
      <Card className="bg-warning/10 border-warning/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning mb-2">Risk Disclaimer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                DeFi protocols carry inherent risks including smart contract bugs, oracle
                failures, and market volatility. While we have been audited by leading security
                firms, please only deposit what you can afford to lose. Insurance coverage has
                limits and may not cover all types of losses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Security Features</h3>
          <div className="space-y-3">
            {[
              "Multi-signature admin controls",
              "Time-locked contract upgrades",
              "Emergency pause functionality",
              "Real-time monitoring and alerts",
              "Regular security audits",
              "Bug bounty program",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
