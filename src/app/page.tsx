import { VehicleHealth } from "@/app/components/dashboard/vehicle-health";
import { AiAlerts } from "@/app/components/dashboard/ai-alerts";
import { Header } from "@/app/components/header";

export default function DashboardPage() {
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
