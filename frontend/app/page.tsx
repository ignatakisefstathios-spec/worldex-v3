"use client";
import { useState } from "react";
import { Header } from "@/components/header";
import { Dashboard } from "@/components/dashboard";
import { Products } from "@/components/products";
import { Lending } from "@/components/lending";
import { Insurance } from "@/components/insurance";
import { Airdrop } from "@/components/airdrop";
import { Portfolio } from "@/components/portfolio";
import { Safety } from "@/components/safety";
import { BottomNav } from "@/components/bottom-nav";

type Tab = "dashboard" | "products" | "lending" | "insurance" | "airdrop" | "portfolio" | "safety";

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onNavigate={(tab: string) => setActiveTab(tab as Tab)} />;
      case "products":
        return <Products />;
      case "lending":
        return <Lending />;
      case "insurance":
        return <Insurance />;
      case "airdrop":
        return <Airdrop />;
      case "portfolio":
        return <Portfolio />;
      case "safety":
        return <Safety />;
      default:
        return <Dashboard onNavigate={(tab: string) => setActiveTab(tab as Tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
