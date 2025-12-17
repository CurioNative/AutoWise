'use client';

import { useAuth } from "@/app/contexts/auth-context";
import { usePathname } from "next/navigation";

const publicPaths = ['/login'];

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  if (!user && !publicPaths.includes(pathname)) {
    // Return null or a loading indicator while the AuthProvider's effect runs
    return null;
  }

  if (!user && publicPaths.includes(pathname)) {
    return <>{children}</>;
  }

  if (user && publicPaths.includes(pathname)) {
      return null;
  }
  
  return <>{children}</>;
}
