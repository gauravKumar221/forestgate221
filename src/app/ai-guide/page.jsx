import { PageHeader } from "@/components/shared/PageHeader";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItineraryForm } from "./ItineraryForm";
import { RecommendationsForm } from "./RecommendationsForm";

export default function AiGuidePage() {
    const headerImage = PlaceHolderImages.find((img) => img.id === 'exp-stargazing');

    return (
        <div>
             {headerImage && (
                <PageHeader
                title="AI Powered Travel Guide"
                subtitle="Your personal concierge for exploring Himachal."
                imageUrl={headerImage.imageUrl}
                imageHint={headerImage.imageHint}
                />
            )}
            <section>
                <div className="container mx-auto px-4 max-w-4xl">
                     <Tabs defaultValue="itinerary" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="itinerary">Personalized Itinerary</TabsTrigger>
                            <TabsTrigger value="recommendations">Local Recommendations</TabsTrigger>
                        </TabsList>
                        <TabsContent value="itinerary" className="mt-6">
                            <ItineraryForm />
                        </TabsContent>
                        <TabsContent value="recommendations" className="mt-6">
                            <RecommendationsForm />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </div>
    );
}
