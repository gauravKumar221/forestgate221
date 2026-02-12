
import { Card, CardContent } from "@/components/ui/card"
import { testimonials } from "@/app/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { PlayCircle } from "lucide-react"

export function Testimonials() {
    return (
        <section id="testimonials">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
                        Real People, Unforgettable Stays
                    </h2>
                    <p className="text-lg text-foreground/80">
                        Hear from the guests who've made lasting memories at Himachal Haven.
                    </p>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="break-inside-avoid">
                            <Card className="h-full flex flex-col overflow-hidden">
                                {testimonial.image && (
                                    <div className="relative">
                                        <Image
                                            src={testimonial.image}
                                            alt={`Testimonial from ${testimonial.name}`}
                                            width={500}
                                            height={testimonial.imageHeight || 400}
                                            className="w-full h-auto object-cover"
                                            data-ai-hint="portrait outdoor"
                                            placeholder="blur"
                                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                                        />
                                        {testimonial.video && (
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <button aria-label="Play video" className="text-white/80 hover:text-white transition-colors">
                                                    <PlayCircle className="w-16 h-16" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <CardContent className="flex-1 flex flex-col justify-between p-6">
                                <p className="text-foreground/80 mb-6 italic">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <Avatar>
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${testimonial.name}`} />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>

                                        <p className="text-sm text-foreground/60">{testimonial.location}</p>
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
      </section>
    )
}
