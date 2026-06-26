import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import { getJacketCatalog } from "@/lib/jackets/catalog";
import { JacketCatalog } from "@/components/jackets/JacketCatalog";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const jackets = getJacketCatalog();

  return (
    <div className="pt-28 md:pt-36 bg-white min-h-screen">
      <div className="container-luxury px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-[10px] text-muted mb-8 tracking-[0.15em] uppercase">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">{category.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end mb-12 lg:mb-20">
          <div>
            <p className="label-caps text-muted mb-4">Collection</p>
            <h1 className="editorial-heading text-4xl md:text-5xl lg:text-6xl text-black mb-4">
              {category.name}
            </h1>
            <p className="text-muted font-light max-w-md">{category.description}</p>
          </div>
          <div className="relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden bg-warm-gray hidden sm:block">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
              priority
              sizes="50vw"
              unoptimized={category.image.startsWith("/product/")}
            />
          </div>
        </div>

        <JacketCatalog jackets={jackets} />
      </div>
    </div>
  );
}
