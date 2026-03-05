
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { PageHeader } from '@/components/shared/PageHeader';
import { blogPosts } from '@/app/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogListingPage() {
  const headerImage = PlaceHolderImages.find((img) => img.id === 'gallery-nature-1');

  return (
    <div className="bg-[#fcfcfc]">
      {headerImage && (
        <PageHeader
          title="Our Blog"
          subtitle="Insights, Guides, and Stories from the Heart of the Himalayas."
          imageUrl={headerImage.imageUrl}
          breadcrumbLabel="Blog"
        />
      )}

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => {
              const postImage = PlaceHolderImages.find((img) => img.id === post.image);
              return (
                <Card key={post.id} className="group overflow-hidden border-none shadow-lg rounded-[2rem] bg-card hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {postImage && (
                      <Image
                        src={postImage.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint={postImage.imageHint}
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-secondary text-secondary-foreground font-bold px-4 py-1 rounded-full border-none shadow-md">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pt-8 px-8 pb-4">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-primary" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="px-8 pb-8 flex-1">
                    <p className="text-foreground/60 text-sm leading-relaxed line-clamp-3 font-light">
                      {post.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                    <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent text-primary hover:text-primary/80 font-bold text-sm group/btn">
                      <Link href={`/blog/${post.slug}`} className="flex items-center gap-2">
                        Read Full Story
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
