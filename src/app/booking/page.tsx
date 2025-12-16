import { BookingRecommendations } from "@/app/components/booking/booking-recommendations";
import { Header } from "@/app/components/header";

export default function BookingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header
        title="Service Booking"
        description="Let our AI find the best service center and time for you."
      />
      <BookingRecommendations />
    </div>
  );
}
