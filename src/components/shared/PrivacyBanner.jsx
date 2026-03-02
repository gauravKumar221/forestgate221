'use client';

import Image from "next/image";
import Link from "next/link";

export function PrivacyBanner() {
  return (
    <section
      className="relative h-[75vh] flex items-center justify-center text-center text-white bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: "url('/assets/images/banner-bg.jpg')",
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
      <div className="absolute bottom-0 left-0 w-full z-20 h-32 pointer-events-none">
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
