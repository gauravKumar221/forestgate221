'use server';

import { generatePersonalizedItinerary } from "@/ai/flows/personalized-itinerary";
import { getLocalRecommendations } from "@/ai/flows/local-recommendations";
import { z } from "zod";

const ItinerarySchema = z.object({
  interests: z.string().min(3, "Please enter at least one interest."),
  duration: z.coerce.number().min(1, "Duration must be at least 1 day.").max(14, "Duration cannot exceed 14 days."),
});



export async function getItinerary(prevState, formData) {
  const validatedFields = ItinerarySchema.safeParse({
    interests: formData.get('interests'),
    duration: formData.get('duration'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.interests?.[0] || validatedFields.error.flatten().fieldErrors.duration?.[0]
    };
  }

  try {
    const result = await generatePersonalizedItinerary(validatedFields.data);
    return { itinerary: result.itinerary };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate itinerary. Please try again.' };
  }
}

const RecommendationSchema = z.object({
    query: z.string().min(3, "Please enter your query."),
});



export async function getRecommendations(prevState, formData) {
    const validatedFields = RecommendationSchema.safeParse({
        query: formData.get('query'),
    });

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors.query?.[0]
        };
    }

    try {
        const result = await getLocalRecommendations(validatedFields.data);
        return { recommendations: result.recommendations };
    } catch (e) {
        console.error(e);
        return { error: 'Failed to get recommendations. Please try again.' };
    }
}
