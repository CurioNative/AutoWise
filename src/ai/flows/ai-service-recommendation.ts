'use server';

/**
 * @fileOverview An AI service recommendation flow.
 *
 * - recommendService - A function that suggests a service center and available time slots.
 * - RecommendServiceInput - The input type for the recommendService function.
 * - RecommendServiceOutput - The return type for the recommendService function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendServiceInputSchema = z.object({
  vehicleType: z.string().describe('The type of vehicle (e.g., sedan, SUV, truck).'),
  vehicleMake: z.string().describe('The make of the vehicle (e.g., Toyota, Ford, Honda).'),
  vehicleModel: z.string().describe('The model of the vehicle (e.g., Camry, F-150, Civic).'),
  vehicleYear: z.number().describe('The year the vehicle was manufactured.'),
  sensorData: z.string().describe('A JSON string containing recent sensor data from the vehicle.'),
  userPreferences: z.string().optional().describe('Any user preferences regarding service centers or appointment times.'),
});
export type RecommendServiceInput = z.infer<typeof RecommendServiceInputSchema>;

const RecommendServiceOutputSchema = z.object({
  serviceCenterName: z.string().describe('The name of the recommended service center.'),
  serviceCenterAddress: z.string().describe('The address of the recommended service center.'),
  availableTimeSlots: z.array(z.string()).describe('An array of available time slots for booking (e.g., "2024-07-15 10:00", "2024-07-15 14:00").'),
  reasoning: z.string().describe('The AI reasoning behind the service center and time slot recommendations.'),
});
export type RecommendServiceOutput = z.infer<typeof RecommendServiceOutputSchema>;

export async function recommendService(input: RecommendServiceInput): Promise<RecommendServiceOutput> {
  return recommendServiceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendServicePrompt',
  input: {schema: RecommendServiceInputSchema},
  output: {schema: RecommendServiceOutputSchema},
  prompt: `You are an AI assistant specializing in recommending vehicle service centers and available time slots.

  Based on the vehicle information, sensor data, and user preferences (if any), suggest a suitable service center and available time slots.

  Vehicle Type: {{{vehicleType}}}
  Vehicle Make: {{{vehicleMake}}}
  Vehicle Model: {{{vehicleModel}}}
  Vehicle Year: {{{vehicleYear}}}
  Sensor Data: {{{sensorData}}}
  User Preferences: {{{userPreferences}}}

  Consider factors such as service center reputation, distance to the user, service center specialization, and availability of time slots.

  Reasoning should be included to help the user understand the choice.
  Format availableTimeSlots with ISO 8601 timestamps.

  Respond with the following information:
  Service Center Name: (The name of the service center)
  Service Center Address: (The address of the service center)
  Available Time Slots: (An array of available time slots in ISO 8601 format, e.g., ["2024-07-15T10:00:00Z", "2024-07-15T14:00:00Z"])
  Reasoning: (The AI reasoning behind the service center and time slot recommendations)
  `,
});

const recommendServiceFlow = ai.defineFlow(
  {
    name: 'recommendServiceFlow',
    inputSchema: RecommendServiceInputSchema,
    outputSchema: RecommendServiceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
