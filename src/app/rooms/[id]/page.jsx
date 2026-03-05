
'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { rooms } from '@/app/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, ArrowLeft, Users, Maximize, Wind, Coffee, Wifi, Tv } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const amenityIcons = {
  'Private Balcony': Wind,
  'King Size Bed': Users,
  'Fireplace': Wind,
  'Wi-Fi': Wifi,
  'Room Service': Coffee,
  'Mountain View': Maximize,
  'River View': Wind,
  'Queen Size Bed': Users,
  'HD TV': Tv,
  'Mini Bar': Coffee,
  '2 Bedrooms': Users,
  'Living Area': Maximize,
  'Kitchenette': Coffee,
};

export default function RoomDetailPage() {
  const params = useParams();
  const room = rooms.find((r) => r.id === params.id);

  if (!room) {
    notFound();
  }

  const mainImage = PlaceHolderImages.find((img) => img.id === room.images[0]);
  
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="bg-[#fcfcfc] pb-24">
      {mainImage && (
        <PageHeader 
          title={room.name} 
          subtitle="Experience Himalayan Luxury" 
          imageUrl={mainImage.imageUrl} 
          breadcrumbLabel="Room Details"
        />
      )}

      <section className="pt-16">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="mb-12">
            <Button asChild variant="ghost" className="mb-8 hover:bg-muted group">
              <Link href="/rooms" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Accommodations
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Column: Gallery & Details */}
            <div className="lg:col-span-8 space-y-12">
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <Carousel className="w-full" opts={{ loop: true }}>
                  <CarouselContent>
                    {room.images.map((imgId, idx) => {
                      const img = PlaceHolderImages.find(p => p.id === imgId);
                      return (
                        <CarouselItem key={idx}>
                          <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
                            {img && (
                              <Image
                                src={img.imageUrl}
                                alt={`${room.name} view ${idx + 1}`}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                              />
                            )}
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                  <CarouselPrevious className="left-6 bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/40" />
                  <CarouselNext className="right-6 bg-white/20 backdrop-blur-md border-none text-white hover:bg-white/40" />
                </Carousel>
              </motion.div>

              <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="space-y-8">
                <div>
                  <h2 className="font-headline text-4xl font-bold mb-6">About the Room</h2>
                  <p className="text-xl text-foreground/70 font-light leading-relaxed">
                    {room.longDescription}
                  </p>
                </div>

                <Separator className="bg-slate-100" />

                <div>
                  <h3 className="font-headline text-3xl font-bold mb-8">Premium Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {room.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity.name] || Check;
                      return (
                        <div key={amenity.name} className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-50 shadow-sm transition-all hover:shadow-md hover:border-primary/20 group">
                          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="font-bold text-lg text-slate-700">{amenity.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sticky Booking Card */}
            <div className="lg:col-span-4">
              <motion.div 
                {...fadeInUp} 
                transition={{ delay: 0.6 }}
                className="sticky top-32"
              >
                <Card className="rounded-[3rem] overflow-hidden border-none shadow-2xl bg-white">
                  <CardHeader className="bg-[#0b2c3d] text-white p-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-2">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black">₹{room.price.toLocaleString()}</span>
                      <span className="text-white/60 font-medium">/ night</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-10 space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Max Guests</span>
                        <span className="font-bold">4 Adults</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-slate-50">
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Room Size</span>
                        <span className="font-bold">450 sq ft</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Views</span>
                        <span className="font-bold">{room.amenities[0]?.name || 'Himalayan'}</span>
                      </div>
                    </div>

                    <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                      <div className="flex items-center gap-3 text-green-700 font-bold text-sm mb-1">
                        <Check className="w-4 h-4" />
                        Free Cancellation
                      </div>
                      <p className="text-green-600/70 text-xs">Full refund if cancelled 10 days before check-in.</p>
                    </div>

                    <Button asChild size="lg" className="w-full h-16 rounded-full text-lg font-black uppercase tracking-widest">
                      <Link href={`/booking?roomId=${room.id}`}>Book This Room</Link>
                    </Button>
                    
                    <p className="text-center text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                      Secure payment processed via SSL
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
