'use server';

/**
 * @fileOverview A flow to explain the factors contributing to a vehicle's health score.
 *
 * - vehicleHealthExplanation - A function that explains the factors contributing to a vehicle's health score.
 * - VehicleHealthExplanationInput - The input type for the vehicleHealthExplanation function.
 * - VehicleHealthExplanationOutput - The return type for the vehicleHealthExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VehicleHealthExplanationInputSchema = z.object({
  vehicleHealthScore: z.number().describe('The overall health score of the vehicle (0-100).'),
  sensorDataSummary: z.string().describe('A summary of recent sensor data readings and anomalies.'),
  predictedFailureRisk: z.string().describe('The predicted risk of vehicle failure in the near future.'),
  nextServiceRecommendation: z.string().describe('The next recommended service for the vehicle.'),
  confidenceLevel: z.number().describe('The confidence level of the ML model providing the data (0-100).'),
});
export type VehicleHealthExplanationInput = z.infer<typeof VehicleHealthExplanationInputSchema>;

const VehicleHealthExplanationOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the factors contributing to the vehicle health score.'),
});
export type VehicleHealthExplanationOutput = z.infer<typeof VehicleHealthExplanationOutputSchema>;

export async function vehicleHealthExplanation(input: VehicleHealthExplanationInput): Promise<VehicleHealthExplanationOutput> {
  return vehicleHealthExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vehicleHealthExplanationPrompt',
  input: {schema: VehicleHealthExplanationInputSchema},
  output: {schema: VehicleHealthExplanationOutputSchema},
  prompt: `You are an AI assistant that explains the factors contributing to a vehicle\'s health score.

  Provide a detailed explanation of the vehicle\'s health score based on the following information:

  Vehicle Health Score: {{vehicleHealthScore}}
  Sensor Data Summary: {{sensorDataSummary}}
  Predicted Failure Risk: {{predictedFailureRisk}}
  Next Service Recommendation: {{nextServiceRecommendation}}
  Confidence Level: {{confidenceLevel}}

  Explain the factors that are positively and negatively affecting the vehicle\'s health, and suggest proactive measures to improve it.
  Include the confidence level of the ML model and explain what that means for the user.
`,
});

const vehicleHealthExplanationFlow = ai.defineFlow(
  {
    name: 'vehicleHealthExplanationFlow',
    inputSchema: VehicleHealthExplanationInputSchema,
    outputSchema: VehicleHealthExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
