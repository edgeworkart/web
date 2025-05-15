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

  useEffect(() => {
    if (!customer) {
      router.push("/login");
    } else if (requireAdmin && customer.role !== "admin") {
      router.push("/");
    }
  }, [customer, requireAdmin, router]);

  return <>{children}</>;
}