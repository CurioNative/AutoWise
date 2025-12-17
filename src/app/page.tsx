'use client';
import { VehicleHealth } from "@/app/components/dashboard/vehicle-health";
import { AiAlerts } from "@/app/components/dashboard/ai-alerts";
import { Header } from "@/app/components/header";
import { useAuth } from "./contexts/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'vehicle-owner') {
      const homePage = {
        'service-center': '/service-center/calendar',
        'oem': '/oem/failures',
      }[user.role];
      if (homePage) {
        router.replace(homePage);
      }
    }
  }, [user, router]);


  if (!user || user.role !== 'vehicle-owner') {
    return null; // or a loading spinner
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Header
        title="Dashboard"
        description="An overview of your vehicle's health and recent alerts."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <VehicleHealth />
      </div>
      <div className="grid gap-4">
        <AiAlerts />
      </div>
    </div>
  );
}
