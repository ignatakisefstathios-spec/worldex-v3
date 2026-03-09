import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MiniKitProvider } from "@/components/minikit-provider";
import { Web3Provider } from "@/components/web3-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Worldex Protocol",
  description: "DeFi protocol for the World ecosystem - Leveraged staking, liquid staking, stablecoins, and insurance",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <MiniKitProvider>
          <Web3Provider>
            {children}
            <Toaster />
          </Web3Provider>
        </MiniKitProvider>
      </body>
    </html>
  );
}
