'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating predictive failure alerts for vehicle owners.
 *
 * - predictFailureAlert - A function that generates a predictive failure alert with explainable reasons.
 * - PredictiveFailureAlertInput - The input type for the predictFailureAlert function.
 * - PredictiveFailureAlertOutput - The return type for the predictFailureAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveFailureAlertInputSchema = z.object({
  sensorData: z.string().describe('The sensor data from the vehicle.'),
  anomalyExplanation: z.string().describe('Explanation of anomalies detected in sensor data.'),
  vehicleType: z.string().describe('The type of the vehicle (e.g., sedan, SUV, truck).'),
  maintenanceHistory: z.string().describe('Vehicle maintenance history.'),
});
export type PredictiveFailureAlertInput = z.infer<typeof PredictiveFailureAlertInputSchema>;

const PredictiveFailureAlertOutputSchema = z.object({
  alertTitle: z.string().describe('A title for the failure alert.'),
  explanation: z.string().describe('A detailed explanation of the potential failure and its causes.'),
  confidenceLevel: z.number().describe('The confidence level (0-1) of the prediction.'),
  suggestedAction: z.string().describe('A suggested action for the vehicle owner to take.'),
});
export type PredictiveFailureAlertOutput = z.infer<typeof PredictiveFailureAlertOutputSchema>;

export async function predictFailureAlert(
  input: PredictiveFailureAlertInput
): Promise<PredictiveFailureAlertOutput> {
  return predictFailureAlertFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictFailureAlertPrompt',
  input: {schema: PredictiveFailureAlertInputSchema},
  output: {schema: PredictiveFailureAlertOutputSchema},
  prompt: `You are an AI assistant that generates alerts for potential vehicle failures based on sensor data anomalies.

  Given the following information, generate an alert with a clear explanation, confidence level, and suggested action for the vehicle owner.

  Vehicle Type: {{{vehicleType}}}
  Sensor Data: {{{sensorData}}}
  Anomaly Explanation: {{{anomalyExplanation}}}
  Maintenance History: {{{maintenanceHistory}}}

  The alert should include:
  - alertTitle: A concise title for the alert.
  - explanation: A detailed explanation of the potential failure, including the reasons based on sensor anomalies and vehicle history.
  - confidenceLevel: A numerical value (0-1) representing the confidence level of the prediction. Be realistic, and do not assume a high confidence level without sufficient evidence.
  - suggestedAction: A specific action that the vehicle owner should take to address the potential issue.
  Follow the schema descriptions closely to provide accurate response.
  `,
});

const predictFailureAlertFlow = ai.defineFlow(
  {
    name: 'predictFailureAlertFlow',
    inputSchema: PredictiveFailureAlertInputSchema,
    outputSchema: PredictiveFailureAlertOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
