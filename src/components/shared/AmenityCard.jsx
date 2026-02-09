import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";


export function AmenityCard({ amenity }) {
    const amenityImage = PlaceHolderImages.find(
        (img) => img.id === amenity.image
    );
    
    return (
        <div className="block relative group overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
            {amenityImage && (
                <Image
                    src={amenityImage.imageUrl}
                    alt={amenity.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={amenityImage.imageHint}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 p-6 text-white flex flex-col justify-end">
                <div>
                    <amenity.icon className="w-10 h-10 mb-2 opacity-90" />
                    <h3 className="font-headline text-2xl font-bold">{amenity.title}</h3>
                    <p className="text-white/90 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">{amenity.description}</p>
                </div>
            </div>
        </div>
    );
}
