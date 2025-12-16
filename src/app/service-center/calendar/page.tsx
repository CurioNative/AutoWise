import { PredictiveCalendar } from "@/app/components/service-center/predictive-calendar";
import { Header } from "@/app/components/header";

export default function CalendarPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header
        title="Predictive Booking Calendar"
        description="An AI-powered forecast of service center workload."
      />
      <PredictiveCalendar />
    </div>
  );
}
