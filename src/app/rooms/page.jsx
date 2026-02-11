import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { rooms, galleryImages } from '@/app/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function RoomsPage() {
  const headerImage = PlaceHolderImages.find((img) => img.id === 'room-suite-1');

  return (
    <div>
      {headerImage && (
        <PageHeader
          title="Our Accommodations"
          subtitle="Explore the luxurious rooms and suites included when you book the entire resort."
          imageUrl={headerImage.imageUrl}
          imageHint={headerImage.imageHint}
        />
      )}

      <section>
        <div className="container mx-auto px-4">
          <Tabs defaultValue="accommodations" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value="accommodations" className="mt-6">
              <div className="bg-card p-4 md:p-8 rounded-lg">
                <div className="text-center mb-16">
                  <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                    Book the Entire Resort Exclusively
                  </h2>
                  <p className="max-w-3xl mx-auto text-lg text-foreground/80 mb-6">
                    For ultimate privacy and a truly bespoke experience, book
                    the entire Himachal Haven. You'll get exclusive access to
                    all our accommodations and world-class amenities. Perfect
                    for large families, special events, or corporate retreats.
                  </p>
                  <Button asChild size="lg">
                    <Link href="/booking">Book Entire Resort</Link>
                  </Button>
                </div>
                <div className="flex flex-col gap-16">
                  {rooms.map((room) => (
                    <div
                      key={room.id}
                      id={room.id}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                    >
                      <div>
                        <Carousel className="w-full">
                          <CarouselContent>
                            {room.images.map((imgId) => {
                              const img = PlaceHolderImages.find(
                                (p) => p.id === imgId
                              );
                              return (
                                <CarouselItem key={imgId}>
                                  {img && (
                                    <Image
                                      src={img.imageUrl}
                                      alt={`${room.name} - ${img.description}`}
                                      width={800}
                                      height={600}
                                      className="rounded-lg shadow-lg object-cover w-full aspect-[4/3]"
                                      data-ai-hint={img.imageHint}
                                      placeholder="blur"
                                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                                    />
                                  )}
                                </CarouselItem>
                              );
                            })}
                          </CarouselContent>
                          <CarouselPrevious className="left-4" />
                          <CarouselNext className="right-4" />
                        </Carousel>
                      </div>
                      <div>
                        <Card>
                          <CardHeader>
                            <CardTitle className="font-headline text-3xl">
                              {room.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-foreground/80 mb-6">
                              {room.longDescription}
                            </p>
                            <h4 className="font-bold text-lg mb-3">
                              Amenities:
                            </h4>
                            <ul className="grid grid-cols-2 gap-2 mb-6">
                              {room.amenities.map((amenity) => (
                                <li
                                  key={amenity.name}
                                  className="flex items-center gap-2"
                                >
                                  <Check className="w-4 h-4 text-primary" />
                                  <span>{amenity.name}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/50 p-4 rounded-md">
                              <p className="text-2xl font-bold text-primary">
                                ₹{room.price.toLocaleString()}
                                <span className="text-sm font-normal text-foreground/70">
                                  /night
                                </span>
                              </p>
                              <Button asChild size="lg">
                                <Link href={`/booking?roomId=${room.id}`}>Book Now</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="gallery" className="mt-8">
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {galleryImages.map((image) => {
                  const imageData = PlaceHolderImages.find(
                    (p) => p.id === image.id
                  );
                  if (!imageData) return null;
                  return (
                    <div key={image.id} className="break-inside-avoid">
                      <Image
                        src={imageData.imageUrl}
                        alt={imageData.description}
                        width={500}
                        height={500}
                        className="w-full h-auto rounded-lg shadow-md"
                        data-ai-hint={imageData.imageHint}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                      />
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
