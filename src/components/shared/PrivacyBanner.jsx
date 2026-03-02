'use client';

import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function PrivacyBanner() {
  const bgImage = PlaceHolderImages.find(img => img.id === 'banner-privacy')?.imageUrl || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920";

  return (
    <section
      className="relative h-[75vh] flex items-center justify-center text-center text-white bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b2c3d]/90 via-[#0b2c3d]/80 to-[#0b2c3d]/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 px-4">
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-wide uppercase">
          PRIVACY POLICY
        </h1>

        <div className="mt-4 text-sm md:text-base font-medium">
          <Link href="/" className="text-[#fcb101] hover:underline">Home</Link>
          <span className="mx-2 text-white/70">|</span>
          <span className="text-white">Privacy Policy</span>
        </div>
      </div>

      {/* Torn Shape Layer */}
      <div className="absolute bottom-0 left-0 w-full z-20 h-[250px] pointer-events-none rotate-[180deg] ">
        <div className="relative w-full h-full">
            <Image
                src="/assets/images/shape8.png"
                alt="shape layer"
                fill
                className="object-cover object-top"
                priority
            />
        </div>
      </div>
    </section>
  );
}
