'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function HeroScroll() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const leftTextX = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "-100%"]);
  const rightTextX = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');

  return (
    <section
      ref={ref}
      className="h-[200vh] bg-white overflow-hidden"
    >
        <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="relative w-[80vw] max-w-5xl flex items-center justify-center">
                
                {/* Left Text */}
                <motion.div
                style={{ x: leftTextX }}
                className="w-1/2 flex justify-end pr-4 md:pr-8"
                >
                <h1 className="text-5xl md:text-7xl font-light text-black">
                    for the
                </h1>
                </motion.div>

                {/* Right Text */}
                <motion.div
                style={{ x: rightTextX }}
                className="w-1/2 flex justify-start pl-4 md:pl-8"
                >
                <h1 className="text-5xl md:text-7xl font-light text-black">
                    planet
                </h1>
                </motion.div>

                {/* Image */}
                <motion.div
                style={{
                    scale: imageScale,
                    opacity: imageOpacity,
                }}
                className="absolute w-[300px] h-[400px] md:w-[400px] md:h-[550px] z-10"
                >
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description || "Planet"}
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint={heroImage.imageHint}
                    />
                )}
                </motion.div>
            </div>
      </div>
    </section>
  );
}
