'use client';

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";
import { Waves, Sparkles, Sun, Bike, HeartHandshake } from 'lucide-react';

const icons = {
    waves: Waves,
    sparkles: Sparkles,
    sun: Sun,
    bike: Bike,
    'heart-handshake': HeartHandshake,
};

export function AmenityCard({ amenity }) {
    const amenityImage = PlaceHolderImages.find(
        (img) => img.id === amenity.image
    );
    const Icon = icons[amenity.iconName] || Sparkles;
    
    return (
        <Card className="group overflow-hidden border-none shadow-none bg-transparent hover:shadow-xl transition-all duration-500 rounded-3xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                {amenityImage && (
                    <Image
                        src={amenityImage.imageUrl}
                        alt={amenity.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint={amenityImage.imageHint}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                    />
                )}
                {/* Gradient Overlay - Using the requested green-to-white theme */}
                <div 
                    className="absolute inset-0 opacity-70 group-hover:opacity-80 transition-opacity duration-500"
                    style={{ background: 'linear-gradient(to top, #70ac43, #ffffff)' }}
                ></div>
                
                {/* Icon Badge */}
                <div className="absolute top-6 right-6 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary">
                    <Icon className="w-7 h-7" />
                </div>

                {/* Content Overlay - Text now always visible */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <h3 className="font-headline text-3xl font-bold mb-3 drop-shadow-md">
                        {amenity.title}
                    </h3>
                    <p className="text-white/95 leading-relaxed line-clamp-3 font-medium">
                        {amenity.description}
                    </p>
                    <div className="w-12 h-1 bg-white mt-4 rounded-full"></div>
                </div>
            </div>
        </Card>
    );
}
