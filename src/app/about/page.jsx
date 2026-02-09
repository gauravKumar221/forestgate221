import Image from 'next/image';
import { Leaf, Users, Heart, Briefcase } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
    const headerImage = PlaceHolderImages.find((img) => img.id === 'about-resort');

    const features = [
        {
            icon: Leaf,
            title: "Eco-Friendly Environment",
            description: "We are committed to sustainability, with green practices integrated into every aspect of our operations to preserve the pristine beauty of Himachal."
        },
        {
            icon: Users,
            title: "Ideal for Couples & Families",
            description: "Whether you're on a romantic getaway or a family vacation, our resort offers tailored experiences and spaces for unforgettable memories."
        },
        {
            icon: Heart,
            title: "Calm & Peaceful Location",
            description: "Our secluded location, away from the crowds, ensures a tranquil, pollution-free atmosphere for complete relaxation and rejuvenation."
        },
        {
            icon: Briefcase,
            title: "Corporate Events",
            description: "Inspire your team with our state-of-the-art facilities set against a backdrop of stunning natural landscapes, perfect for productive retreats."
        },
    ];

  return (
    <div>
        {headerImage && <PageHeader title="About Himachal Haven" subtitle="A Story of Passion and Nature" imageUrl={headerImage.imageUrl} imageHint={headerImage.imageHint} />}

        <section>
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
                        <p className="text-lg text-foreground/80 mb-4">
                        Himachal Haven was born from a dream to create a luxurious sanctuary that lives in harmony with nature. Our founders, with a deep love for the Himalayas, envisioned a place where guests could escape the chaos of city life and reconnect with themselves and the environment.
                        </p>
                        <p className="text-lg text-foreground/80">
                        Built on the principles of eco-consciousness and responsible tourism, every corner of our resort is designed to offer comfort while minimizing our ecological footprint. We invite you to be a part of our story and experience the unique blend of Himachali hospitality and sustainable luxury.
                        </p>
                    </div>
                    <div className="order-1 md:order-2">
                        <Image
                            src="https://picsum.photos/seed/founder/600/700"
                            alt="Resort Founders"
                            width={600}
                            height={700}
                            className="rounded-lg shadow-lg aspect-[3/4] object-cover"
                            data-ai-hint="portrait nature"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                     <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
                     <p className="text-lg text-foreground/80">
                        We offer more than just a stay; we offer an experience. A chance to unwind, explore, and create memories in a place that feels like a home away from home.
                     </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map(feature => (
                        <div key={feature.title} className="text-center p-6 border rounded-lg">
                            <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                            <p className="text-foreground/70">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

    </div>
  );
}
