'use client';

import { recommendService, type RecommendServiceOutput } from "@/ai/flows/ai-service-recommendation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";
import { format } from 'date-fns';
import { useBooking } from "@/app/contexts/booking-context";

const mockBookingInput = {
    vehicleType: 'SUV',
    vehicleMake: 'Future Motors',
    vehicleModel: 'Explorer EV',
    vehicleYear: 2023,
    sensorData: '{"battery_health": "95%", "motor_temp": "normal"}',
    userPreferences: 'Prefers morning appointments.',
};

export function BookingRecommendations() {
    const [recommendation, setRecommendation] = useState<RecommendServiceOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { addBooking } = useBooking();
    const [recommendationsFetched, setRecommendationsFetched] = useState(false);


    const getRecommendation = async () => {
        try {
            setLoading(true);
            setRecommendationsFetched(true);
            const result = await recommendService(mockBookingInput);
            setRecommendation(result);
        } catch (error) {
            console.error("Error fetching booking recommendation:", error);
            toast({
                title: "Error",
                description: "Could not fetch booking recommendations.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    }


    const handleAccept = (timeSlot: string) => {
        addBooking(new Date(timeSlot));
        toast({
            title: "Appointment Booked!",
            description: `Your service is confirmed for ${format(new Date(timeSlot), 'PPP p')}. The service center has been notified.`,
        });
    };
    
    const handleReschedule = () => {
        toast({
            title: "Let's find another time!",
            description: "Use the AI Assistant to find a different appointment slot.",
        });
    }

    if (!recommendationsFetched) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Ready to Book?</CardTitle>
                    <CardDescription>Click the button below to get AI-powered service recommendations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button onClick={getRecommendation} disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Find Recommendations
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (loading) {
        return <Card className="max-w-2xl mx-auto"><CardHeader><Skeleton className="h-8 w-3/4" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>;
    }

    if (!recommendation) {
        return <Card className="max-w-2xl mx-auto"><CardHeader><CardTitle>No Recommendations</CardTitle></CardHeader><CardContent><p>We couldn't find a suitable recommendation at this time.</p></CardContent></Card>;
    }

    return (
        <Card className="max-w-2xl mx-auto animate-in fade-in-0 zoom-in-95">
            <CardHeader>
                <CardTitle>AI-Powered Recommendation</CardTitle>
                <CardDescription>{recommendation.reasoning}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold">{recommendation.serviceCenterName}</h3>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <MapPin className="size-4" /> {recommendation.serviceCenterAddress}
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2"><CalendarDays className="size-4" /> Available Time Slots</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {recommendation.availableTimeSlots.map(slot => (
                            <Button key={slot} variant="outline" onClick={() => handleAccept(slot)}>
                                {format(new Date(slot), 'p')} on {format(new Date(slot), 'MMM d')}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                 <Button variant="ghost" onClick={handleReschedule}>Request other times</Button>
            </CardFooter>
        </Card>
    );
}
