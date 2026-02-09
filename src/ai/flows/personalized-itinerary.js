'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized travel itineraries for guests of Himachal Haven based on user interests and duration of stay.
 *
 * - `generatePersonalizedItinerary` -  A function that takes user interests and stay duration as input and returns a personalized itinerary.
 * - `PersonalizedItineraryInputSchema` - The input schema for the `generatePersonalizedItinerary` function.
 * - `PersonalizedItineraryOutputSchema` - The return schema for the `generatePersonalizedItinerary` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedItineraryInputSchema = z.object({
  interests: z
    .string()
    .describe('A comma-separated list of the user\'s interests, e.g., trekking, nature, relaxation, bird watching.'),
  duration: z.number().describe('The duration of the stay in days.'),
});



const PersonalizedItineraryOutputSchema = z.object({
  itinerary: z
    .string()
    .describe(
      'A detailed itinerary of activities and sights, tailored to the user\'s interests and the duration of their stay.'
    ),
});



export async function generatePersonalizedItinerary(
  input
) {
  return personalizedItineraryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedItineraryPrompt',
  input: {schema: PersonalizedItineraryInputSchema},
  output: {schema: PersonalizedItineraryOutputSchema},
  prompt: `You are an expert travel guide for Himachal Haven, a luxury resort in Naggar, Manali. A user is staying at the resort and wants a personalized itinerary.

  The user is interested in the following activities and sights:
  {{interests}}

  The user will be staying for {{duration}} days.

  Create a detailed itinerary of activities and sights in and around Naggar and Manali, tailored to the user's interests and the duration of their stay.
  You can include activities available at the resort itself, as well as nearby attractions.
  Include specific locations, estimated time spent at each location, and any relevant details or tips.
`,
});

const personalizedItineraryFlow = ai.defineFlow(
  {
    name: 'personalizedItineraryFlow',
    inputSchema: PersonalizedItineraryInputSchema,
    outputSchema: PersonalizedItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
