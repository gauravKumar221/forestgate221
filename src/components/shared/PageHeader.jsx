import Image from "next/image";


export function PageHeader({ title, subtitle, imageUrl, imageHint }) {
  return (
    <section className="relative h-[50vh] min-h-[300px] w-full flex items-center justify-center text-center text-white p-4 pt-20">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        data-ai-hint={imageHint}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
      />
      <div className="relative z-20 flex flex-col items-center gap-4">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && <p className="max-w-2xl text-lg md:text-xl">{subtitle}</p>}
      </div>
    </section>
  );
}
