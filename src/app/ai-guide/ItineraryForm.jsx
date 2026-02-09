"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getItinerary } from "./actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";

const initialState = {
  itinerary: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Itinerary"}
    </Button>
  );
}

export function ItineraryForm() {
  const [state, formAction] = useFormState(getItinerary, initialState);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Plan Your Perfect Trip</CardTitle>
          <CardDescription>
            Tell us your interests and length of stay, and our AI will craft a personalized itinerary for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <Input
              id="interests"
              name="interests"
              placeholder="e.g., trekking, nature, relaxation, bird watching"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (in days)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              placeholder="e.g., 3"
              min="1"
              max="14"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <SubmitButton />
          {state?.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>

      {state?.itinerary && (
        <CardContent>
          <div className="mt-6 border-t pt-6">
            <h3 className="font-headline text-2xl mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary"/>
                Your Personalized Itinerary
            </h3>
            <div className="prose prose-stone dark:prose-invert max-w-none whitespace-pre-wrap">
              {state.itinerary}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
