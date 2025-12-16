'use server';

/**
 * @fileOverview Recurring failure analysis flow for identifying failure patterns and component defects.
 *
 * - analyzeRecurringFailures - Analyzes sensor data to identify recurring failure patterns.
 * - RecurringFailureAnalysisInput - The input type for the analyzeRecurringFailures function.
 * - RecurringFailureAnalysisOutput - The return type for the analyzeRecurringFailures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecurringFailureAnalysisInputSchema = z.object({
  sensorData: z
    .string()
    .describe(
      'Aggregated sensor data from multiple vehicles, including timestamps, component IDs, and sensor readings.'
    ),
  failureContext: z
    .string()
    .describe(
      'Contextual information about the failure, like environment, vehicle use case, vehicle maintenance history, etc.'
    ),
  componentType: z.string().describe('The type of component to analyze.'),
});
export type RecurringFailureAnalysisInput = z.infer<
  typeof RecurringFailureAnalysisInputSchema
>;

const RecurringFailureAnalysisOutputSchema = z.object({
  failurePatterns: z
    .string()
    .describe(
      'Description of recurring failure patterns identified in the sensor data, including frequency and conditions.'
    ),
  componentDefects: z
    .string()
    .describe(
      'Identification of potential component defects based on the analysis of failure patterns.'
    ),
  rootCauseAnalysis: z
    .string()
    .describe(
      'Root cause analysis of the identified failure patterns, including potential causes and contributing factors.'
    ),
  failureClusters: z
    .string()
    .describe(
      'Clustering of failures based on similarity of sensor data and contextual information.'
    ),
});
export type RecurringFailureAnalysisOutput = z.infer<
  typeof RecurringFailureAnalysisOutputSchema
>;

export async function analyzeRecurringFailures(
  input: RecurringFailureAnalysisInput
): Promise<RecurringFailureAnalysisOutput> {
  return recurringFailureAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recurringFailureAnalysisPrompt',
  input: {schema: RecurringFailureAnalysisInputSchema},
  output: {schema: RecurringFailureAnalysisOutputSchema},
  prompt: `You are an expert reliability engineer specializing in identifying recurring failure patterns in vehicles.

You will analyze sensor data, failure context, and component type to identify recurring failure patterns, potential component defects, perform root cause analysis, and cluster failures.

Use the following information to conduct the analysis:

Sensor Data: {{{sensorData}}}
Failure Context: {{{failureContext}}}
Component Type: {{{componentType}}}

Based on this information, identify recurring failure patterns, component defects, root causes, and failure clusters. Provide detailed explanations for each.

Output in JSON format with 'failurePatterns', 'componentDefects', 'rootCauseAnalysis', and 'failureClusters' fields:
`,
});

const recurringFailureAnalysisFlow = ai.defineFlow(
  {
    name: 'recurringFailureAnalysisFlow',
    inputSchema: RecurringFailureAnalysisInputSchema,
    outputSchema: RecurringFailureAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
