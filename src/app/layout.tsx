import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import AdminPanel from './admin';

export const metadata = {
  title: "Art Marketplace",
  description: "Buy and sell original art",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}