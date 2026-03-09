import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number | string, decimals = 2): string {
  const n = typeof num === "string" ? parseFloat(num) : num
  if (isNaN(n)) return "0"
  
  if (n >= 1e9) {
    return (n / 1e9).toFixed(decimals) + "B"
  }
  if (n >= 1e6) {
    return (n / 1e6).toFixed(decimals) + "M"
  }
  if (n >= 1e3) {
    return (n / 1e3).toFixed(decimals) + "K"
  }
  return n.toFixed(decimals)
}

export function formatCurrency(num: number | string, decimals = 2): string {
  const n = typeof num === "string" ? parseFloat(num) : num
  if (isNaN(n)) return "$0"
  
  return "$" + formatNumber(n, decimals)
}

export function formatPercent(num: number | string, decimals = 2): string {
  const n = typeof num === "string" ? parseFloat(num) : num
  if (isNaN(n)) return "0%"
  return n.toFixed(decimals) + "%"
}

export function formatAddress(address: string): string {
  if (!address) return ""
  return address.slice(0, 6) + "..." + address.slice(-4)
}

export function shortenNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B"
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K"
  return num.toFixed(2)
}
