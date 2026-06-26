import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getAllJacketSlugs,
  getJacketBySlug,
  getRelatedJackets,
} from "@/lib/jackets/catalog";
import { JacketDetail } from "@/components/jackets/JacketDetail";

export async function generateStaticParams() {
  return getAllJacketSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const jacket = getJacketBySlug(slug);
  if (!jacket) return { title: "Jacket Not Found" };

  const image = jacket.images[0];

  return {
    title: jacket.seoTitle,
    description: jacket.seoDescription,
    openGraph: {
      title: jacket.seoTitle,
      description: jacket.seoDescription,
      type: "website",
      images: image ? [{ url: image, alt: jacket.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: jacket.seoTitle,
      description: jacket.seoDescription,
      images: image ? [image] : undefined,
    },
  };
}

function ProductJsonLd({ slug }: { slug: string }) {
  const jacket = getJacketBySlug(slug);
  if (!jacket) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: jacket.name,
    description: jacket.description,
    sku: jacket.productNumber || jacket.slug,
    image: jacket.images,
    brand: {
      "@type": "Brand",
      name: "DOYA FIRST TOUCH",
    },
    offers: {
      "@type": "Offer",
      price: jacket.price,
      priceCurrency: "BTN",
      availability: jacket.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `/jackets/${jacket.slug}`,
    },
    material: jacket.specifications.material,
    color: jacket.colors.join(", "),
    size: jacket.size,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function JacketProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jacket = getJacketBySlug(slug);
  if (!jacket) notFound();

  const related = getRelatedJackets(jacket);

  return (
    <>
      <ProductJsonLd slug={slug} />
      <JacketDetail jacket={jacket} relatedJackets={related} />
    </>
  );
}
