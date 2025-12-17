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

const bookAppointmentTool = ai.defineTool(
  {
    name: 'bookAppointment',
    description: 'Books a vehicle service appointment. Use this to schedule, reschedule, or cancel an appointment.',
    inputSchema: z.object({
      action: z.enum(['schedule', 'reschedule', 'cancel']).describe("The action to perform."),
      details: z.string().optional().describe("The details of the appointment, such as date, time, and service type."),
      confirmationCode: z.string().optional().describe("The confirmation code for existing appointments."),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async ({ action, details, confirmationCode }) => {
    // In a real app, this would interact with a booking system API.
    // For this demo, we'll simulate the outcome.
    console.log(`[Service Booking Tool] Action: ${action}, Details: ${details}, Code: ${confirmationCode}`);
    
    let message = '';
    if (action === 'schedule') {
      message = `OK, I've scheduled your service. Details: ${details}. You'll receive a confirmation shortly.`;
    } else if (action === 'reschedule') {
      message = `OK, your appointment with code ${confirmationCode} has been rescheduled to ${details}.`;
    } else if (action === 'cancel') {
      message = `Your appointment with code ${confirmationCode} has been successfully cancelled.`;
    }

    return {
      success: true,
      message,
    };
  }
);


const ManageServiceAppointmentInputSchema = z.object({
  userQuery: z.string().describe('The user query about managing service appointments.'),
});
export type ManageServiceAppointmentInput = z.infer<
  typeof ManageServiceAppointmentInputSchema
>;

const ManageServiceAppointmentOutputSchema = z.object({
  confirmationMessage: z
    .string()
    .describe('A confirmation message indicating the success or failure of the action, or a clarifying question.'),
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
  tools: [bookAppointmentTool],
  input: {schema: ManageServiceAppointmentInputSchema},
  output: {schema: ManageServiceAppointmentOutputSchema},
  prompt: `You are an AI assistant helping users manage their vehicle service appointments.
  The user's request is: {{{userQuery}}}
  
  - Use the bookAppointment tool to schedule, reschedule, or cancel appointments.
  - If details are missing, ask the user for the necessary information (e.g., "What date and time would you like to schedule for?").
  - Your final response should be a user-friendly confirmation message.
  `,
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
