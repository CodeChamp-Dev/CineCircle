import "../app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "CineCircle – Trusted Movie Recommendations",
  description: "Personal recommendations & curated Cineboards among friends.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
