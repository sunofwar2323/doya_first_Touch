"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { instagramImages } from "@/data/products";
import { Instagram } from "lucide-react";

export function InstagramGallery() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            @doyafirsttouch
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#111111]">
            Follow Our Journey
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {instagramImages.map((image, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={image}
                alt={`DOYA lifestyle ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
