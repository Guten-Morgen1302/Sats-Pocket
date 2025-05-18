import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSats(sats: number): string {
  return sats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatUSD(sats: number): string {
  const btcToUsd = 0.0004; // Mocked rate - 1 sat = $0.0004 USD
  const usdValue = sats * btcToUsd;
  return `$${usdValue.toFixed(2)}`;
}

export function shortenAddress(address: string, chars = 6): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let result = "bc1";
  
  for (let i = 0; i < 38; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

export const generateQRCode = async () => {
  // Create a data URL for the QR code directly in the app
  // This ensures it works without external dependencies
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="white" />
    <rect x="32" y="32" width="16" height="16" fill="black" />
    <rect x="48" y="32" width="16" height="16" fill="black" />
    <rect x="64" y="32" width="16" height="16" fill="black" />
    <rect x="80" y="32" width="16" height="16" fill="black" />
    <rect x="96" y="32" width="16" height="16" fill="black" />
    <rect x="112" y="32" width="16" height="16" fill="black" />
    <rect x="128" y="32" width="16" height="16" fill="black" />
    <rect x="176" y="32" width="16" height="16" fill="black" />
    <rect x="208" y="32" width="16" height="16" fill="black" />
    <rect x="32" y="48" width="16" height="16" fill="black" />
    <rect x="128" y="48" width="16" height="16" fill="black" />
    <rect x="160" y="48" width="16" height="16" fill="black" />
    <rect x="176" y="48" width="16" height="16" fill="black" />
    <rect x="208" y="48" width="16" height="16" fill="black" />
    <rect x="32" y="64" width="16" height="16" fill="black" />
    <rect x="64" y="64" width="16" height="16" fill="black" />
    <rect x="80" y="64" width="16" height="16" fill="black" />
    <rect x="96" y="64" width="16" height="16" fill="black" />
    <rect x="128" y="64" width="16" height="16" fill="black" />
    <rect x="176" y="64" width="16" height="16" fill="black" />
    <rect x="208" y="64" width="16" height="16" fill="black" />
    <rect x="32" y="80" width="16" height="16" fill="black" />
    <rect x="64" y="80" width="16" height="16" fill="black" />
    <rect x="80" y="80" width="16" height="16" fill="black" />
    <rect x="96" y="80" width="16" height="16" fill="black" />
    <rect x="128" y="80" width="16" height="16" fill="black" />
    <rect x="144" y="80" width="16" height="16" fill="black" />
    <rect x="160" y="80" width="16" height="16" fill="black" />
    <rect x="208" y="80" width="16" height="16" fill="black" />
    <rect x="32" y="96" width="16" height="16" fill="black" />
    <rect x="64" y="96" width="16" height="16" fill="black" />
    <rect x="80" y="96" width="16" height="16" fill="black" />
    <rect x="96" y="96" width="16" height="16" fill="black" />
    <rect x="144" y="96" width="16" height="16" fill="black" />
    <rect x="176" y="96" width="16" height="16" fill="black" />
    <rect x="32" y="112" width="16" height="16" fill="black" />
    <rect x="128" y="112" width="16" height="16" fill="black" />
    <rect x="144" y="112" width="16" height="16" fill="black" />
    <rect x="160" y="112" width="16" height="16" fill="black" />
    <rect x="176" y="112" width="16" height="16" fill="black" />
    <rect x="192" y="112" width="16" height="16" fill="black" />
    <rect x="208" y="112" width="16" height="16" fill="black" />
    <rect x="32" y="128" width="16" height="16" fill="black" />
    <rect x="48" y="128" width="16" height="16" fill="black" />
    <rect x="64" y="128" width="16" height="16" fill="black" />
    <rect x="80" y="128" width="16" height="16" fill="black" />
    <rect x="96" y="128" width="16" height="16" fill="black" />
    <rect x="112" y="128" width="16" height="16" fill="black" />
    <rect x="128" y="128" width="16" height="16" fill="black" />
    <rect x="160" y="128" width="16" height="16" fill="black" />
    <rect x="192" y="128" width="16" height="16" fill="black" />
    <rect x="48" y="144" width="16" height="16" fill="black" />
    <rect x="128" y="144" width="16" height="16" fill="black" />
    <rect x="144" y="144" width="16" height="16" fill="black" />
    <rect x="176" y="144" width="16" height="16" fill="black" />
    <rect x="192" y="144" width="16" height="16" fill="black" />
    <rect x="32" y="160" width="16" height="16" fill="black" />
    <rect x="48" y="160" width="16" height="16" fill="black" />
    <rect x="64" y="160" width="16" height="16" fill="black" />
    <rect x="96" y="160" width="16" height="16" fill="black" />
    <rect x="112" y="160" width="16" height="16" fill="black" />
    <rect x="128" y="160" width="16" height="16" fill="black" />
    <rect x="144" y="160" width="16" height="16" fill="black" />
    <rect x="160" y="160" width="16" height="16" fill="black" />
    <rect x="192" y="160" width="16" height="16" fill="black" />
    <rect x="208" y="160" width="16" height="16" fill="black" />
    <rect x="64" y="176" width="16" height="16" fill="black" />
    <rect x="112" y="176" width="16" height="16" fill="black" />
    <rect x="176" y="176" width="16" height="16" fill="black" />
    <rect x="32" y="192" width="16" height="16" fill="black" />
    <rect x="48" y="192" width="16" height="16" fill="black" />
    <rect x="64" y="192" width="16" height="16" fill="black" />
    <rect x="80" y="192" width="16" height="16" fill="black" />
    <rect x="96" y="192" width="16" height="16" fill="black" />
    <rect x="112" y="192" width="16" height="16" fill="black" />
    <rect x="128" y="192" width="16" height="16" fill="black" />
    <rect x="160" y="192" width="16" height="16" fill="black" />
    <rect x="32" y="208" width="16" height="16" fill="black" />
    <rect x="128" y="208" width="16" height="16" fill="black" />
    <rect x="144" y="208" width="16" height="16" fill="black" />
    <rect x="176" y="208" width="16" height="16" fill="black" />
    <rect x="192" y="208" width="16" height="16" fill="black" />
  </svg>`;
};

export const satsToFiatValue = (sats: number): number => {
  // Mock conversion rate
  return sats * 0.0004;
};

export const fiatToSatsValue = (fiat: number): number => {
  // Mock conversion rate
  return Math.round(fiat / 0.0004);
};
