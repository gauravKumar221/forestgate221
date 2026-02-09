'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing local recommendations.
 *
 * The flow takes a user query as input and returns a list of recommendations for local restaurants, shops, or attractions near Himachal Haven.
 *
 * @fileOverview
 * - `getLocalRecommendations` - A function that takes a user query and returns local recommendations.
 * - `LocalRecommendationsInputSchema` - The input schema for the getLocalRecommendations function.
 * - `LocalRecommendationsOutputSchema` - The output schema for the getLocalRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocalRecommendationsInputSchema = z.object({
  query: z.string().describe('The user query for local recommendations.'),
});


const LocalRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommendations for local restaurants, shops, or attractions.'),
});


export async function getLocalRecommendations(input) {
  return localRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'localRecommendationsPrompt',
  input: {schema: LocalRecommendationsInputSchema},
  output: {schema: LocalRecommendationsOutputSchema},
  prompt: `You are a helpful AI assistant for Himachal Haven, a luxury resort in Naggar, Manali, Himachal Pradesh. You provide recommendations for local restaurants, shops, or attractions near the resort.

  The user will provide a query, and you should respond with a list of recommendations based on the query.

  For example, if the user asks "What are some good restaurants nearby?", you should respond with a list of restaurants near Himachal Haven.

  User Query: {{{query}}}
  `,
});

const localRecommendationsFlow = ai.defineFlow(
  {
    name: 'localRecommendationsFlow',
    inputSchema: LocalRecommendationsInputSchema,
    outputSchema: LocalRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
