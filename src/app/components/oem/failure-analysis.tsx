'use client';
import { analyzeRecurringFailures, type RecurringFailureAnalysisOutput } from "@/ai/flows/recurring-failure-analysis";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function FailureAnalysis() {
    const [analysis, setAnalysis] = useState<RecurringFailureAnalysisOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    
    // Form state
    const [sensorData, setSensorData] = useState('{"vehicleId": "V1", "timestamp": "...", "component": "BrakePad", "reading": "5mm"}, {"vehicleId": "V2", "timestamp": "...", "component": "BrakePad", "reading": "4.5mm"}');
    const [failureContext, setFailureContext] = useState('Vehicles operating in hilly, urban environments. Mix of aggressive and normal driving styles.');
    const [componentType, setComponentType] = useState('BrakePad');

    const handleAnalysis = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setAnalysis(null);
        try {
            const result = await analyzeRecurringFailures({ sensorData, failureContext, componentType });
            setAnalysis(result);
        } catch (error) {
            console.error("Error fetching failure analysis:", error);
            toast({
                title: "Analysis Failed",
                description: "Could not perform the failure analysis. Please check your inputs.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Run New Analysis</CardTitle>
                        <CardDescription>Provide data to identify failure patterns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAnalysis} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="componentType">Component Type</Label>
                                <Input id="componentType" value={componentType} onChange={(e) => setComponentType(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sensorData">Aggregated Sensor Data (JSON)</Label>
                                <Textarea id="sensorData" value={sensorData} onChange={(e) => setSensorData(e.target.value)} rows={5} className="font-code text-xs" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="failureContext">Failure Context</Label>
                                <Textarea id="failureContext" value={failureContext} onChange={(e) => setFailureContext(e.target.value)} rows={3} />
                            </div>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Analyze
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <div className="space-y-6">
                    {!analysis && !loading && (
                         <Card className="flex flex-col items-center justify-center p-8 min-h-[400px] border-dashed">
                            <h3 className="text-xl font-semibold">Ready for Analysis</h3>
                            <p className="text-muted-foreground mt-2">Submit data to see the results.</p>
                        </Card>
                    )}
                    {loading && <div className="space-y-6"><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /></div>}
                    {analysis && (
                        <>
                            <Card className="animate-in fade-in-0">
                                <CardHeader><CardTitle>Failure Patterns</CardTitle></CardHeader>
                                <CardContent><p className="text-sm text-muted-foreground">{analysis.failurePatterns}</p></CardContent>
                            </Card>
                            <Card className="animate-in fade-in-0" style={{animationDelay: '100ms'}}><CardHeader><CardTitle>Potential Component Defects</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{analysis.componentDefects}</p></CardContent></Card>
                            <Card className="animate-in fade-in-0" style={{animationDelay: '200ms'}}><CardHeader><CardTitle>Root Cause Analysis</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{analysis.rootCauseAnalysis}</p></CardContent></Card>
                            <Card className="animate-in fade-in-0" style={{animationDelay: '300ms'}}><CardHeader><CardTitle>Failure Clusters</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{analysis.failureClusters}</p></CardContent></Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
