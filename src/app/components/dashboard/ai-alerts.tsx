'use client';
import { useEffect, useState } from 'react';
import { predictFailureAlert, type PredictiveFailureAlertOutput } from '@/ai/flows/predictive-failure-alert';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const mockAlertInput = {
    sensorData: '{"brake_fluid_level": "low", "brake_pad_wear": "85%"}',
    anomalyExplanation: 'Brake fluid level sensor reports a value below the minimum threshold.',
    vehicleType: 'SUV',
    maintenanceHistory: 'Last brake service 25,000 miles ago.',
};

export function AiAlerts() {
  const [alert, setAlert] = useState<PredictiveFailureAlertOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAlerts() {
      try {
        setLoading(true);
        const result = await predictFailureAlert(mockAlertInput);
        setAlert(result);
      } catch (error) {
        // Silently fail for MVP, console log for debugging
        console.error("Error fetching AI alerts:", error);
      } finally {
        setLoading(false);
      }
    }
    // Add a delay for demonstration purposes
    const timer = setTimeout(getAlerts, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Predictive Alerts</CardTitle>
        <CardDescription>Proactive warnings based on vehicle sensor data analysis.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-24 w-full" />}
        {!loading && !alert && <p className="text-sm text-muted-foreground">No alerts at this time. Drive safely!</p>}
        {alert && (
          <Alert variant="destructive" className="animate-in fade-in-0">
            <ShieldAlert />
            <AlertTitle>{alert.alertTitle} (Confidence: {Math.round(alert.confidenceLevel * 100)}%)</AlertTitle>
            <AlertDescription className="mt-2 space-y-4">
                <p>{alert.explanation}</p>
                <div>
                  <p className="font-semibold mb-2">Suggested Action: {alert.suggestedAction}</p>
                  <Button asChild>
                    <Link href="/booking">
                      <Wrench className="mr-2" />
                      Book Service Now
                    </Link>
                  </Button>
                </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
