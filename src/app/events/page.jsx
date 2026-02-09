import Image from "next/image";
import Link from 'next/link';
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Heart, Briefcase, PartyPopper } from "lucide-react";

export default function EventsPage() {
    const headerImage = PlaceHolderImages.find((img) => img.id === 'gallery-events-1');
    const events = [
        {
            title: "Destination Weddings",
            description: "Exchange vows with a breathtaking mountain backdrop. Our team specializes in creating magical, bespoke weddings that reflect your love story. From intimate ceremonies to grand receptions, we handle every detail.",
            image: "https://picsum.photos/seed/eventwedding/800/600",
            imageHint: "destination wedding",
            icon: Heart
        },
        {
            title: "Corporate Retreats",
            description: "Inspire innovation and foster team spirit in a serene and stimulating environment. Our resort offers modern meeting facilities, customized team-building activities, and comfortable accommodations for a productive and refreshing corporate getaway.",
            image: "https://picsum.photos/seed/eventcorporate/800/600",
            imageHint: "corporate retreat",
            icon: Briefcase
        },
        {
            title: "Birthdays & Private Parties",
            description: "Celebrate your special moments with us. Whether it's a milestone birthday, an anniversary, or a private gathering, we provide the perfect setting, exquisite catering, and personalized service to make your celebration unforgettable.",
            image: "https://picsum.photos/seed/eventparty/800/600",
            imageHint: "private party",
            icon: PartyPopper
        },
    ];

    return(
        <div>
            {headerImage && (
                <PageHeader
                title="Events & Celebrations"
                subtitle="Create unforgettable memories in an extraordinary setting."
                imageUrl={headerImage.imageUrl}
                imageHint={headerImage.imageHint}
                />
            )}

            <section>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col gap-16">
                        {events.map((event, index) => (
                             <div
                             key={event.title}
                             className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                           >
                            <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                                <Card>
                                 <CardHeader>
                                     <div className="flex items-center gap-4">
                                        <event.icon className="w-10 h-10 text-primary shrink-0"/>
                                        <CardTitle className="font-headline text-3xl">{event.title}</CardTitle>
                                     </div>
                                 </CardHeader>
                                 <CardContent>
                                     <p className="text-foreground/80 mb-6 text-lg">{event.description}</p>
                                     <Button asChild>
                                        <Link href="/contact">Inquire Now</Link>
                                     </Button>
                                 </CardContent>
                                </Card>
                            </div>
                             <div className={`relative order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                               <Image
                                 src={event.image}
                                 alt={event.title}
                                 width={800}
                                 height={600}
                                 className="rounded-lg shadow-lg object-cover w-full aspect-w-4 aspect-h-3"
                                 data-ai-hint={event.imageHint}
                                 placeholder="blur"
                                 blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                               />
                             </div>
                           </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-card">
                <div className="container mx-auto px-4 text-center">
                     <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Our Venues</h2>
                     <p className="max-w-3xl mx-auto text-lg text-foreground/80 mb-8">We offer a variety of indoor and outdoor spaces that can be customized to suit your event's needs, from lush green lawns to elegant banquet halls.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="h-64 relative rounded-lg overflow-hidden shadow-lg">
                            <Image src="https://picsum.photos/seed/venue1/500/400" alt="Outdoor Lawn Venue" fill className="object-cover" data-ai-hint="outdoor venue" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="/>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white font-headline text-2xl font-bold">The Mountain Lawn</h3>
                            </div>
                        </div>
                        <div className="h-64 relative rounded-lg overflow-hidden shadow-lg">
                            <Image src="https://picsum.photos/seed/venue2/500/400" alt="Indoor Banquet Hall" fill className="object-cover" data-ai-hint="banquet hall" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="/>
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white font-headline text-2xl font-bold">The Riverside Hall</h3>
                            </div>
                        </div>
                        <div className="h-64 relative rounded-lg overflow-hidden shadow-lg">
                            <Image src="https://picsum.photos/seed/venue3/500/400" alt="Terrace Venue" fill className="object-cover" data-ai-hint="terrace party" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="/>
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <h3 className="text-white font-headline text-2xl font-bold">The Starlight Terrace</h3>
                            </div>
                        </div>
                    </div>
                     <Button asChild size="lg" className="mt-12">
                        <Link href="/contact">Plan Your Event</Link>
                    </Button>
                </div>
            </section>

        </div>
    )
}
