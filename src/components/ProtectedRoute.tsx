"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

export default function ProtectedRoute({ children, requireAdmin }: Props) {
  const { customer } = useAuth();
  const router = useRouter();

  const SKIP_AUTH = true; // TODO: Set to false to re-enable auth

  useEffect(() => {
    if (!SKIP_AUTH && !customer) {
      router.push("/login");
    } else if (!SKIP_AUTH && requireAdmin && customer && customer.role !== "admin") {
      router.push("/");
    }
  }, [customer, requireAdmin, router]);

  return <>{children}</>;
}