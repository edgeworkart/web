import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import Head from 'next/head';

export const metadata = {
  title: "Art Marketplace",
  description: "Buy and sell original art",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>Edgework Admin Dashboard</title>
        <meta name="description" content="Admin CMS for Edgework Art Gallery" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}