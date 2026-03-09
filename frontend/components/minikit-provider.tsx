"use client";

import { MiniKit } from "@worldcoin/minikit-js";
import { ReactNode, useEffect, useState } from "react";

export function MiniKitProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize MiniKit
    if (typeof window !== "undefined") {
      MiniKit.install();
      setIsInitialized(true);
      console.log("MiniKit installed:", MiniKit.isInstalled());
    }
  }, []);

  return <>{children}</>;
}
