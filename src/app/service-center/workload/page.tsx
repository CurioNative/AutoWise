import { Header } from "@/app/components/header";
import { WorkloadChart } from "@/app/components/service-center/workload-chart";

export default function WorkloadPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header
        title="Technician Workload"
        description="Visualize workload distribution to ensure balanced assignments."
      />
      <WorkloadChart />
    </div>
  );
}
