
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/app/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PageHeader } from '@/components/shared/PageHeader';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogDetailPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find((img) => img.id === post.image);
  const recentPosts = blogPosts.filter(p => p.slug !== params.slug).slice(0, 3);

  return (
    <article className="bg-[#fcfcfc]">
      {postImage && (
        <PageHeader
          title={post.title}
          imageUrl={postImage.imageUrl}
          breadcrumbLabel="Blog Post"
        />
      )}

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="bg-card rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-xl border border-border/50">
                {postImage && (
                  <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-[2rem] shadow-lg">
                    <Image
                      src={postImage.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      data-ai-hint={postImage.imageHint}
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-bold uppercase tracking-widest mb-10 pb-8 border-b border-dashed">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span>By {post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary" />
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20 rounded-full border-none px-3">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="prose prose-stone lg:prose-xl max-w-none prose-headings:font-headline prose-p:font-light prose-p:text-foreground/80 prose-p:leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>

                <Separator className="my-12" />

                <div className="flex justify-between items-center">
                  <Button asChild variant="outline" className="rounded-full h-12 px-8">
                    <Link href="/blog" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back to Blog
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-12">
              <div className="bg-card rounded-[2rem] p-8 shadow-lg border border-border/50">
                <h3 className="font-headline text-2xl font-bold mb-8">Recent Stories</h3>
                <div className="space-y-8">
                  {recentPosts.map((recent) => {
                    const recentImg = PlaceHolderImages.find(img => img.id === recent.image);
                    return (
                      <Link key={recent.slug} href={`/blog/${recent.slug}`} className="group flex items-center gap-4">
                        <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                          {recentImg && (
                            <Image
                              src={recentImg.imageUrl}
                              alt={recent.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{recent.category}</p>
                          <h4 className="font-bold text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                            {recent.title}
                          </h4>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="bg-primary rounded-[2rem] p-10 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
                <h3 className="font-headline text-3xl font-bold mb-4 relative z-10">Visit Our Sanctuary</h3>
                <p className="text-white/80 font-light mb-8 relative z-10">
                  Ready to experience the magic of the Himalayas for yourself?
                </p>
                <Button asChild variant="secondary" className="w-full h-12 rounded-full font-bold relative z-10 shadow-none">
                  <Link href="/booking">Book Your Stay</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </article>
  );
}
