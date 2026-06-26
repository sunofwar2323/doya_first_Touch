"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Category } from "@/types";
import { ArrowUpRight } from "lucide-react";

interface FeaturedCollectionProps {
  categories: Category[];
}

export function FeaturedCollection({ categories }: FeaturedCollectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            Curated Selection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#111111] mb-4">
            Featured Collection
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Discover our meticulously crafted leather goods, each piece a testament
            to timeless luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 max-w-md mx-auto gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/collections/${category.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized={category.image.startsWith("/product/")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-serif text-2xl text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase">
                      Explore
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
