'use server';

/**
 * @fileOverview A vehicle question answering AI agent.
 *
 * - vehicleQuestionAnswering - A function that answers questions about a vehicle.
 * - VehicleQuestionAnsweringInput - The input type for the vehicleQuestionAnswering function.
 * - VehicleQuestionAnsweringOutput - The return type for the vehicleQuestionAnswering function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VehicleQuestionAnsweringInputSchema = z.object({
  question: z.string().describe('The question about the vehicle.'),
});
export type VehicleQuestionAnsweringInput = z.infer<typeof VehicleQuestionAnsweringInputSchema>;

const VehicleQuestionAnsweringOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type VehicleQuestionAnsweringOutput = z.infer<typeof VehicleQuestionAnsweringOutputSchema>;

export async function vehicleQuestionAnswering(input: VehicleQuestionAnsweringInput): Promise<VehicleQuestionAnsweringOutput> {
  return vehicleQuestionAnsweringFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vehicleQuestionAnsweringPrompt',
  input: {schema: VehicleQuestionAnsweringInputSchema},
  output: {schema: VehicleQuestionAnsweringOutputSchema},
  prompt: `You are a helpful AI assistant that answers questions about vehicles.

  Question: {{{question}}}
  `,  
});

const vehicleQuestionAnsweringFlow = ai.defineFlow(
  {
    name: 'vehicleQuestionAnsweringFlow',
    inputSchema: VehicleQuestionAnsweringInputSchema,
    outputSchema: VehicleQuestionAnsweringOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
