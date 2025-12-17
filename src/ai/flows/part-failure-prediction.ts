'use server';

/**
 * @fileOverview Predicts the failure probability of vehicle parts.
 *
 * - predictPartFailures - A function that predicts failure probabilities for parts of a given vehicle model.
 * - PartFailurePredictionInput - The input type for the predictPartFailures function.
 * - PartFailurePredictionOutput - The return type for the predictPartFailures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PartFailurePredictionInputSchema = z.object({
  vehicleModel: z.string().describe('The model of the vehicle (e.g., "Explorer EV").'),
  vehicleMake: z.string().describe('The make of the vehicle (e.g., "Future Motors").'),
  vehicleYear: z.number().describe('The manufacturing year of the vehicle.'),
});
export type PartFailurePredictionInput = z.infer<typeof PartFailurePredictionInputSchema>;

const PartFailurePredictionOutputSchema = z.object({
  predictions: z.array(z.object({
    partName: z.string().describe('The name of the vehicle part.'),
    failureProbability: z.number().describe('The probability of failure for the part (0 to 1).'),
    details: z.string().describe('Details and reasoning for the predicted failure probability.'),
  })).describe('An array of part failure predictions.'),
});
export type PartFailurePredictionOutput = z.infer<typeof PartFailurePredictionOutputSchema>;


export async function predictPartFailures(input: PartFailurePredictionInput): Promise<PartFailurePredictionOutput> {
  return partFailurePredictionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'partFailurePredictionPrompt',
  input: {schema: PartFailurePredictionInputSchema},
  output: {schema: PartFailurePredictionOutputSchema},
  prompt: `You are an expert automotive reliability engineer. Based on general industry data and the provided vehicle information, predict the failure probability of key components for the specified vehicle model within the next 20,000 miles.

  Vehicle: {{{vehicleYear}}} {{{vehicleMake}}} {{{vehicleModel}}}

  Provide predictions for at least 5-7 critical components (e.g., Battery Pack, Electric Motor, On-board Charger, Brake System, Suspension, Infotainment System).

  For each component, provide:
  - partName: The name of the component.
  - failureProbability: A numerical value from 0 (no chance of failure) to 1 (certain failure).
  - details: A brief explanation of the factors influencing this probability (e.g., typical lifespan, known issues for this model type, material degradation).
  `,
});


const partFailurePredictionFlow = ai.defineFlow(
  {
    name: 'partFailurePredictionFlow',
    inputSchema: PartFailurePredictionInputSchema,
    outputSchema: PartFailurePredictionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
