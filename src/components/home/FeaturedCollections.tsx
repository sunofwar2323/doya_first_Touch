import { StyleCollection } from "@/lib/jackets/collections";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeaturedCollectionsProps {
  collections: StyleCollection[];
}

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  return (
    <section className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/jackets?style=${encodeURIComponent(col.styleFilter)}`}
            className="group relative flex items-center gap-5 p-6 md:p-8 border-b border-white/10 md:border-r lg:border-b-0 hover:bg-white/5 transition-colors duration-500"
          >
            <div className="relative w-20 h-24 md:w-24 md:h-28 shrink-0 overflow-hidden bg-charcoal">
              <Image
                src={col.image}
                alt={col.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="96px"
                unoptimized={col.image.startsWith("/product/")}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg md:text-xl font-medium mb-1">{col.name}</h3>
              <p className="text-white/50 text-xs leading-relaxed mb-3">{col.description}</p>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase font-medium group-hover:gap-2.5 transition-all">
                Shop Now <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
