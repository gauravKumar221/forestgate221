'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ManagedBySection() {

  const subTitleStyle = {
    color: '#ffae3e',
    fontFamily: '"Kaushan Script", cursive',
    fontSize: '32px',
    fontWeight: '400',
  };

  return (
    <section className="relative bg-[#70ac43] py-16 md:py-24 overflow-x-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl space-y-6">

          <div className="space-y-2">
            <p style={subTitleStyle}>Managed By</p>

            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              The Himalayan Forest Development Authority
            </h2>
          </div>

          <div className="space-y-6 pt-4">
            <p className="text-[#1a1a1a] text-base md:text-lg font-medium opacity-80">
              Authorized Eco-Tourism Partner
            </p>

            <Button
              asChild
              className="bg-white text-black hover:bg-white/90 rounded-2xl px-10 h-14 shadow-none font-bold text-base"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

        </div>
      </div>


      {/* Peacock Image */}
      <div className="
        pointer-events-none
        absolute
        bottom-0
        right-[-80px]
        w-[220px]
        h-[320px]
        sm:w-[260px] sm:h-[360px]
        md:w-[320px] md:h-[400px]
        lg:w-[420px] lg:h-[500px]
        xl:w-[480px] xl:h-[500px]
      ">

        <Image
          src="/assets/images/bannerpecock.png"
          alt="Peacock"
          fill
          priority
          className="object-contain object-bottom-right"
        />

      </div>

    </section>
  );
}