import { FailureAnalysis } from "@/app/components/oem/failure-analysis";
import { Header } from "@/app/components/header";

export default function OemFailuresPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header
        title="Recurring Failure Analysis"
        description="Identify failure patterns and component defects for OEM review."
      />
      <FailureAnalysis />
    </div>
  );
}
