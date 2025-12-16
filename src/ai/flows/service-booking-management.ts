'use server';

/**
 * @fileOverview This file defines the Genkit flow for managing service appointments using a voice/chat interface.
 *
 * - manageServiceAppointment - A function that handles the service appointment management process.
 * - ManageServiceAppointmentInput - The input type for the manageServiceAppointment function.
 * - ManageServiceAppointmentOutput - The return type for the manageServiceAppointment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ManageServiceAppointmentInputSchema = z.object({
  action: z
    .string()
    .describe(
      'The action to perform on the service appointment (e.g., schedule, reschedule, cancel)'
    ),
  appointmentDetails: z
    .string()
    .optional()
    .describe('Details of the appointment, such as date, time, and service type.'),
  confirmationCode: z.string().optional().describe('The confirmation code of the appointment.'),
  userQuery: z.string().describe('The user query about managing service appointments.'),
});
export type ManageServiceAppointmentInput = z.infer<
  typeof ManageServiceAppointmentInputSchema
>;

const ManageServiceAppointmentOutputSchema = z.object({
  confirmationMessage: z
    .string()
    .describe('A confirmation message indicating the success or failure of the action.'),
});
export type ManageServiceAppointmentOutput = z.infer<
  typeof ManageServiceAppointmentOutputSchema
>;

export async function manageServiceAppointment(
  input: ManageServiceAppointmentInput
): Promise<ManageServiceAppointmentOutput> {
  return manageServiceAppointmentFlow(input);
}

const manageServiceAppointmentPrompt = ai.definePrompt({
  name: 'manageServiceAppointmentPrompt',
  input: {schema: ManageServiceAppointmentInputSchema},
  output: {schema: ManageServiceAppointmentOutputSchema},
  prompt: `You are an AI assistant helping users manage their vehicle service appointments.

The user wants to perform the following action: {{{action}}}

Here are the details provided by the user: {{{appointmentDetails}}}

Confirmation Code: {{{confirmationCode}}}

User Query: {{{userQuery}}}

Based on the above information, generate a confirmation message to indicate the success or failure of the action. The message should be clear and concise.

Confirmation Message:`,
});

const manageServiceAppointmentFlow = ai.defineFlow(
  {
    name: 'manageServiceAppointmentFlow',
    inputSchema: ManageServiceAppointmentInputSchema,
    outputSchema: ManageServiceAppointmentOutputSchema,
  },
  async input => {
    const {output} = await manageServiceAppointmentPrompt(input);
    return output!;
  }
);
