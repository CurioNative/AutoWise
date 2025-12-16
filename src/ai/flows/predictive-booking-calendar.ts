'use server';
/**
 * @fileOverview Implements a Genkit flow for generating a predictive booking calendar for service centers.
 *
 * - generatePredictiveBookingCalendar - A function that generates a predictive booking calendar with workload visualization.
 * - PredictiveBookingCalendarInput - The input type for the generatePredictiveBookingCalendar function.
 * - PredictiveBookingCalendarOutput - The return type for the generatePredictiveBookingCalendar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveBookingCalendarInputSchema = z.object({
  serviceCenterId: z.string().describe('The ID of the service center.'),
  startDate: z.string().describe('The start date for the calendar (YYYY-MM-DD).'),
  daysAhead: z.number().describe('The number of days to predict into the future.'),
  historicalData: z.string().optional().describe('Historical booking data as JSON. If omitted, the AI will generate a booking calendar based on general trends.'),
});

export type PredictiveBookingCalendarInput = z.infer<typeof PredictiveBookingCalendarInputSchema>;

const PredictiveBookingCalendarOutputSchema = z.object({
  calendarData: z.string().describe('A JSON string representing the predictive booking calendar data, including workload heatmap.'),
  confidenceLevel: z.number().describe('A number between 0 and 1, indicating confidence level in the prediction accuracy.'),
});

export type PredictiveBookingCalendarOutput = z.infer<typeof PredictiveBookingCalendarOutputSchema>;

export async function generatePredictiveBookingCalendar(input: PredictiveBookingCalendarInput): Promise<PredictiveBookingCalendarOutput> {
  return predictiveBookingCalendarFlow(input);
}

const predictiveBookingCalendarPrompt = ai.definePrompt({
  name: 'predictiveBookingCalendarPrompt',
  input: {schema: PredictiveBookingCalendarInputSchema},
  output: {schema: PredictiveBookingCalendarOutputSchema},
  prompt: `You are an expert service center manager assistant.  You will generate a predictive booking calendar for a service center, including a workload heatmap.

The service center ID is: {{{serviceCenterId}}}
The start date is: {{{startDate}}}
You are predicting {{{daysAhead}}} days into the future.

{{#if historicalData}}
Here is historical booking data in JSON format:
{{{historicalData}}}
{{else}}
There is no historical booking data.  Base your prediction on general trends.
{{/if}}

Generate a JSON string representing the predictive booking calendar data, including workload heatmap for each day.
Also, generate a number between 0 and 1, indicating confidence level in the prediction accuracy.

Ensure that the JSON calendarData is parseable.
`,
});

const predictiveBookingCalendarFlow = ai.defineFlow(
  {
    name: 'predictiveBookingCalendarFlow',
    inputSchema: PredictiveBookingCalendarInputSchema,
    outputSchema: PredictiveBookingCalendarOutputSchema,
  },
  async input => {
    const {output} = await predictiveBookingCalendarPrompt(input);
    return output!;
  }
);
