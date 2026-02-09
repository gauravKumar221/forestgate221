"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getRecommendations } from "./actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Compass, Sparkles } from "lucide-react";

const initialState = {
  recommendations: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Searching..." : "Get Recommendations"}
    </Button>
  );
}

export function RecommendationsForm() {
  const [state, formAction] = useFormState(getRecommendations, initialState);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Discover Local Gems</CardTitle>
          <CardDescription>
            Looking for a place to eat, shop, or explore? Ask our AI for recommendations near Himachal Haven.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">What are you looking for?</Label>
            <Input
              id="query"
              name="query"
              placeholder="e.g., 'best cafes for sunset views' or 'local handicraft shops'"
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

      {state?.recommendations && (
        <CardContent>
          <div className="mt-6 border-t pt-6">
            <h3 className="font-headline text-2xl mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary"/>
                Here are some recommendations
            </h3>
            <ul className="space-y-3 list-none">
              {state.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Compass className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
