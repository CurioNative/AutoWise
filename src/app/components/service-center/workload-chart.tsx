'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const technicianData = [
    { name: 'John Doe', tasks: 12, id: 'avatar1' },
    { name: 'Jane Smith', tasks: 8, id: 'avatar2' },
    { name: 'Mike Johnson', tasks: 15, id: 'avatar3' },
    { name: 'Emily Davis', tasks: 10, id: 'avatar4' },
];

const chartConfig = {
  tasks: {
    label: "Tasks",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function WorkloadChart() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Technician Workload Distribution</CardTitle>
                    <CardDescription>Visualize task assignments to ensure balance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[400px] w-full">
                        <BarChart accessibilityLayer data={technicianData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                            />
                            <YAxis />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                            <Bar dataKey="tasks" fill="var(--color-tasks)" radius={8} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Technician Roster</CardTitle>
                    <CardDescription>Current task load per technician.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {technicianData.map((tech) => {
                            const avatar = PlaceHolderImages.find(img => img.id === tech.id);
                            return (
                                <li key={tech.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={avatar?.imageUrl} alt={tech.name} data-ai-hint="person portrait" />
                                            <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{tech.name}</span>
                                    </div>
                                    <div className="font-semibold text-muted-foreground">{tech.tasks} tasks</div>
                                </li>
                            );
                        })}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
