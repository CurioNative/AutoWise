'use client';

import { generatePredictiveBookingCalendar } from "@/ai/flows/predictive-booking-calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { addDays, format, isSameDay } from "date-fns";
import { useEffect, useState, useMemo } from "react";
import { useBooking } from "@/app/contexts/booking-context";

interface CalendarDay {
    date: string;
    dayOfWeek: string;
    workload: number; // 0-100
    isNewBooking?: boolean;
}

export function PredictiveCalendar() {
    const [calendarData, setCalendarData] = useState<CalendarDay[]>([]);
    const [loading, setLoading] = useState(true);
    const [confidence, setConfidence] = useState(0);
    const { newBookings } = useBooking();

    const generateFallbackData = () => {
        const today = new Date();
        const dummyData = Array.from({ length: 14 }).map((_, i) => ({
            date: format(addDays(today, i), 'd'),
            dayOfWeek: format(addDays(today, i), 'EEE'),
            workload: Math.floor(Math.random() * 80) + 20, // Random workload 20-100
        }));
        setCalendarData(dummyData);
        setConfidence(0.5);
    }

    useEffect(() => {
        async function getCalendar() {
            try {
                setLoading(true);
                const result = await generatePredictiveBookingCalendar({
                    serviceCenterId: 'SC-123',
                    startDate: format(new Date(), 'yyyy-MM-dd'),
                    daysAhead: 14,
                });
                const parsedData = JSON.parse(result.calendarData);
                if(parsedData && parsedData.calendar) {
                    setCalendarData(parsedData.calendar);
                    setConfidence(result.confidenceLevel);
                } else {
                    generateFallbackData();
                }
            } catch (error) {
                console.error("Error fetching predictive calendar:", error);
                generateFallbackData();
            } finally {
                setLoading(false);
            }
        }
        getCalendar();
    }, []);

    const processedCalendarData = useMemo(() => {
        const today = new Date();
        return calendarData.map(day => {
            const dayDate = addDays(today, calendarData.indexOf(day));
            const isNew = newBookings.some(bookingDate => isSameDay(bookingDate, dayDate));
            return {
                ...day,
                workload: isNew ? Math.min(100, day.workload + 15) : day.workload,
                isNewBooking: isNew,
            };
        });
    }, [calendarData, newBookings]);


    const getWorkloadColor = (workload: number, isNewBooking?: boolean) => {
        if (isNewBooking) return 'bg-blue-500 hover:bg-blue-600 text-white border-transparent animate-pulse';
        if (workload > 85) return 'bg-red-500/80 hover:bg-red-500/90 text-white border-transparent';
        if (workload > 60) return 'bg-yellow-500/80 hover:bg-yellow-500/90 text-yellow-950 border-transparent';
        return 'bg-green-500/80 hover:bg-green-500/90 text-white border-transparent';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>14-Day Predictive Booking Calendar</CardTitle>
                <CardDescription>
                    AI-generated workload forecast. 
                    {confidence > 0 && ` Prediction Confidence: ${Math.round(confidence * 100)}%`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                        {Array.from({ length: 14 }).map((_, i) => <Skeleton key={i} className="h-32 w-full" />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center">
                        {processedCalendarData.map((day, index) => (
                            <div key={index} className="border rounded-lg p-2 flex flex-col items-center justify-between aspect-[4/5] animate-in fade-in-0" style={{animationDelay: `${index*50}ms`}}>
                                <div className="text-muted-foreground text-sm">{day.dayOfWeek}</div>
                                <div className="font-bold text-3xl my-2">{day.date}</div>
                                <Badge className={cn("text-xs transition-colors", getWorkloadColor(day.workload, day.isNewBooking))}>
                                    {day.isNewBooking && 'New! '}{day.workload}% Load
                                </Badge>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
