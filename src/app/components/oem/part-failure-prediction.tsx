'use client';

import { predictPartFailures, type PartFailurePredictionOutput } from "@/ai/flows/part-failure-prediction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { z } from "zod";

const formSchema = z.object({
    vehicleMake: z.string().min(1, "Make is required"),
    vehicleModel: z.string().min(1, "Model is required"),
    vehicleYear: z.coerce.number().min(1980, "Invalid year").max(new Date().getFullYear() + 1, "Invalid year"),
});

type FormValues = z.infer<typeof formSchema>;

export function PartFailurePrediction() {
    const [prediction, setPrediction] = useState<PartFailurePredictionOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicleMake: 'Future Motors',
            vehicleModel: 'Explorer EV',
            vehicleYear: 2023,
        }
    });

    const onSubmit = async (values: FormValues) => {
        setLoading(true);
        setPrediction(null);
        try {
            const result = await predictPartFailures(values);
            setPrediction(result);
        } catch (error) {
            console.error("Error fetching failure prediction:", error);
            toast({
                title: "Prediction Failed",
                description: "Could not perform the failure prediction.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };
    
    const getBarColor = (value: number) => {
        if (value > 0.75) return "hsl(var(--destructive))";
        if (value > 0.4) return "hsl(var(--chart-4))";
        return "hsl(var(--chart-1))";
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Predict Part Failures</CardTitle>
                        <CardDescription>Enter a vehicle model to predict component failure probabilities.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="vehicleMake"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vehicle Make</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="vehicleModel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Vehicle Model</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="vehicleYear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Year</FormLabel>
                                            <FormControl><Input type="number" {...field} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={loading} className="w-full">
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Predict
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="min-h-[450px]">
                     <CardHeader>
                        <CardTitle>Failure Probability Analysis</CardTitle>
                         <CardDescription>
                            {prediction ? `Results for ${form.getValues('vehicleYear')} ${form.getValues('vehicleMake')} ${form.getValues('vehicleModel')}`: "Submit vehicle details to see prediction."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         {!prediction && loading && <Skeleton className="h-[300px] w-full" />}
                         {!prediction && !loading && (
                             <div className="flex flex-col items-center justify-center text-center h-[300px] border-dashed border-2 rounded-lg">
                                <p className="text-muted-foreground">Chart will be displayed here.</p>
                             </div>
                         )}
                        {prediction && (
                            <div className="space-y-4 animate-in fade-in-0">
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={prediction.predictions} layout="vertical" margin={{ left: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" domain={[0, 1]} tickFormatter={(tick) => `${tick * 100}%`} />
                                        <YAxis type="category" dataKey="partName" width={120} />
                                        <Tooltip 
                                            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Probability']}
                                            labelStyle={{ fontWeight: 'bold' }}
                                            contentStyle={{ 
                                                borderRadius: 'var(--radius)',
                                                border: '1px solid hsl(var(--border))',
                                                background: 'hsl(var(--background))',
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="failureProbability" name="Failure Probability">
                                            {prediction.predictions.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getBarColor(entry.failureProbability)} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="space-y-2">
                                    {prediction.predictions.map((p) => (
                                        <div key={p.partName} className="text-xs text-muted-foreground p-2 border rounded-md">
                                           <span className="font-bold text-foreground">{p.partName}:</span> {p.details}
                                        </div>
                                    ))}
                                </div>
                           </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
