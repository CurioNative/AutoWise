'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { vehicleHealthExplanation, type VehicleHealthExplanationOutput } from '@/ai/flows/vehicle-health-explanation';
import { Bot, Zap, Wrench } from 'lucide-react';

const mockInput = {
  vehicleHealthScore: 85,
  sensorDataSummary: 'Minor fluctuations in tire pressure sensor. Engine temperature stable.',
  predictedFailureRisk: 'Low. 5% chance of minor component failure in next 1000 miles.',
  nextServiceRecommendation: 'Oil change and tire rotation due in 500 miles.',
  confidenceLevel: 92,
};

export function VehicleHealth() {
  const [healthData, setHealthData] = useState<VehicleHealthExplanationOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getHealthData() {
      try {
        setLoading(true);
        const result = await vehicleHealthExplanation(mockInput);
        setHealthData(result);
      } catch (error) {
        console.error("Error fetching vehicle health:", error);
      } finally {
        setLoading(false);
      }
    }
    getHealthData();
  }, []);

  if (loading) {
    return (
      <>
        <Card><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-16 w-full" /></CardContent></Card>
        <Card><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-16 w-full" /></CardContent></Card>
        <Card><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-16 w-full" /></CardContent></Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-3"><CardHeader><Skeleton className="h-6 w-1/3" /></CardHeader><CardContent><Skeleton className="h-20 w-full" /></CardContent></Card>
      </>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Health Score</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">{mockInput.vehicleHealthScore}%</div>
          <p className="text-xs text-muted-foreground">Overall vehicle condition</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Predicted Failure Risk</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
             <Zap className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{mockInput.predictedFailureRisk}</p>
           <p className="text-xs text-muted-foreground">Based on sensor data</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Service</CardTitle>
           <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
             <Wrench className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">{mockInput.nextServiceRecommendation}</p>
          <p className="text-xs text-muted-foreground">Upcoming maintenance</p>
        </CardContent>
      </Card>
      {healthData && (
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="text-accent" />
              AI Health Explanation
            </CardTitle>
            <CardDescription>
              AI-generated summary of your vehicle's health. Model confidence: {mockInput.confidenceLevel}%.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {healthData.explanation}
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
