'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function HeroScroll() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.8], [0.6, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  // Animate from a 16px blur to no blur over the first 40% of the scroll
  const imageFilter = useTransform(scrollYProgress, [0, 0.4], ['blur(16px)', 'blur(0px)']);

  const leftTextX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-100%"]);
  const rightTextX = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <section
      ref={ref}
      className="h-[120vh] bg-white overflow-hidden"
    >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <div className="relative w-[80vw] max-w-5xl flex items-center justify-center">
                
                {/* Image is now first in the DOM, so it's in the background */}
                <motion.div
                style={{
                    scale: imageScale,
                    opacity: imageOpacity,
                    filter: imageFilter
                }}
                className="absolute w-[300px] h-[400px] md:w-[400px] md:h-[550px]"
                >
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description || "The Forest Gate"}
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint={heroImage.imageHint}
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                    />
                )}
                </motion.div>

                {/* Left Text */}
                <motion.div
                style={{ x: leftTextX }}
                className="w-1/2 flex justify-end pr-4 md:pr-8"
                >
                <h1 className="text-5xl md:text-7xl font-light text-black">
                    The Forest
                </h1>
                </motion.div>

                {/* Right Text */}
                <motion.div
                style={{ x: rightTextX }}
                className="w-1/2 flex justify-start pl-4 md:pl-8"
                >
                <h1 className="text-5xl md:text-7xl font-light text-black">
                    Gate
                </h1>
                </motion.div>

            </div>
      </div>
    </section>
  );
}
