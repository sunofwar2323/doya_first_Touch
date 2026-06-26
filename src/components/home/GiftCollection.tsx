"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { giftCategories } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

export function GiftCollection() {
  return (
    <section id="gifts" className="section-padding bg-white">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            Perfect Presents
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#111111] mb-4">
            Luxury Gift Collection
          </h2>
          <p className="text-muted max-w-lg mx-auto">
            Thoughtfully curated leather gifts presented in our signature luxury
            packaging.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {giftCategories.map((gift, i) => (
            <motion.div
              key={gift.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={`/shop?gift=${gift.slug}`}
                className="group relative flex items-center overflow-hidden border border-border hover:border-gold/30 transition-colors"
              >
                <div className="relative w-1/3 aspect-square overflow-hidden">
                  <Image
                    src={gift.image}
                    alt={gift.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="200px"
                  />
                </div>
                <div className="flex-1 p-8">
                  <h3 className="font-serif text-2xl text-[#111111] mb-2 group-hover:text-gold transition-colors">
                    {gift.title}
                  </h3>
                  <p className="text-muted text-sm mb-4">{gift.description}</p>
                  <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase">
                    Shop Gifts
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
