"use client";

import React, { useState } from "react";
import { Vote, CheckCircle, XCircle, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockGovernanceProposals, mockStats } from "../mock-data";
import { formatNumber, formatPercent } from "@/lib/utils";

export function GovernancePreview() {
  const [activeTab, setActiveTab] = useState("active");

  const getStatusColor = (state: string) => {
    switch (state) {
      case "Active":
        return "text-blue-500 bg-blue-500/10";
      case "Succeeded":
        return "text-green-500 bg-green-500/10";
      case "Defeated":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getStatusIcon = (state: string) => {
    switch (state) {
      case "Active":
        return <Clock className="h-4 w-4" />;
      case "Succeeded":
        return <CheckCircle className="h-4 w-4" />;
      case "Defeated":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Governance Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground">WDX Price</div>
            <div className="text-xl font-bold">${mockStats.wdxPrice}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="text-xl font-bold">{formatNumber(mockStats.wdxMarketCap / 1000000)}M</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground">Staked</div>
            <div className="text-xl font-bold">{formatNumber(mockStats.wdxStaked / 1000000)}M</div>
          </CardContent>
        </Card>
      </div>

      {/* Voting Power */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Your Voting Power</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Vote className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">2,500 veWDX</div>
                <div className="text-sm text-muted-foreground">
                  2,500 WDX locked for 2 years
                </div>
              </div>
            </div>
            <Button variant="outline">Increase</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="passed">Passed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {mockGovernanceProposals
            .filter((p) => p.state === "Active")
            .map((proposal) => (
              <Card key={proposal.id}>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${getStatusColor(proposal.state)}`}>
                          {getStatusIcon(proposal.state)}
                          {proposal.state}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          #{proposal.id}
                        </span>
                      </div>
                      <h3 className="font-semibold">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {proposal.description.slice(0, 100)}...
                      </p>
                    </div>
                  </div>

                  {/* Vote Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-500">
                        For: {formatNumber(proposal.forVotes)}
                      </span>
                      <span className="text-red-500">
                        Against: {formatNumber(proposal.againstVotes)}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${(proposal.forVotes / (proposal.forVotes + proposal.againstVotes)) * 100}%`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {formatPercent((proposal.forVotes / (proposal.forVotes + proposal.againstVotes)) * 100)} For
                      </span>
                      <span>
                        Ends in {Math.ceil((proposal.endTime - Date.now()) / 86400000)} days
                      </span>
                    </div>
                  </div>

                  {/* Vote Buttons */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-green-500 hover:bg-green-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Vote For
                    </Button>
                    <Button variant="outline" className="flex-1 border-red-500 text-red-500 hover:bg-red-500/10">
                      <XCircle className="h-4 w-4 mr-2" />
                      Vote Against
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="passed" className="space-y-4">
          {mockGovernanceProposals
            .filter((p) => p.state === "Succeeded")
            .map((proposal) => (
              <Card key={proposal.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${getStatusColor(proposal.state)}`}>
                          {getStatusIcon(proposal.state)}
                          {proposal.state}
                        </span>
                      </div>
                      <h3 className="font-semibold">{proposal.title}</h3>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {formatPercent((proposal.forVotes / (proposal.forVotes + proposal.againstVotes)) * 100)} For
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {formatNumber(proposal.forVotes + proposal.againstVotes)} votes
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {mockGovernanceProposals.map((proposal) => (
            <Card key={proposal.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs rounded-full flex items-center gap-1 ${getStatusColor(proposal.state)}`}>
                        {getStatusIcon(proposal.state)}
                        {proposal.state}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        #{proposal.id}
                      </span>
                    </div>
                    <h3 className="font-semibold">{proposal.title}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Create Proposal */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Create Proposal</div>
              <div className="text-sm text-muted-foreground">
                Requires 100,000 veWDX
              </div>
            </div>
            <Button>New Proposal</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
