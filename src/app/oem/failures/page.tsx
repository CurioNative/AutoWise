import { FailureAnalysis } from "@/app/components/oem/failure-analysis";
import { Header } from "@/app/components/header";
import { Separator } from "@/components/ui/separator";
import { PartFailurePrediction } from "@/app/components/oem/part-failure-prediction";

export default function OemFailuresPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header
        title="OEM Failure Analysis"
        description="Analyze and predict vehicle component failures."
      />
      <div className="space-y-8">
        <PartFailurePrediction />
        <Separator />
        <div>
          <h3 className="text-2xl font-semibold tracking-tight mb-4">Recurring Failure Analysis</h3>
          <FailureAnalysis />
        </div>
      </div>
    </div>
  );
}
