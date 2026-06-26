"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const craftSteps = [
  {
    title: "Premium Leather Selection",
    description:
      "We source only the finest full-grain and vegetable-tanned leathers from renowned tanneries in Italy and France.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
  },
  {
    title: "Master Artisans",
    description:
      "Each piece is handcrafted by skilled artisans with decades of experience, ensuring perfection in every stitch.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "Attention to Detail",
    description:
      "From hand-burnished edges to precision stitching, every detail is meticulously crafted to exceed expectations.",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
  },
];

export function CraftsmanshipSection() {
  return (
    <section id="craftsmanship" className="section-padding bg-[#111111] text-white overflow-hidden">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            Our Process
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            Every Stitch Tells a Story
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            From the careful selection of premium hides to the final hand-stitched
            detail, our craftsmanship process honors centuries of leatherworking
            tradition while embracing modern precision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {craftSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-6">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-500 m-3" />
              </div>
              <span className="text-gold text-xs tracking-[0.2em] uppercase mb-3 block">
                0{i + 1}
              </span>
              <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
              <p className="text-white/60 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "25+", label: "Years of Craft" },
            { value: "100%", label: "Handcrafted" },
            { value: "50+", label: "Artisan Partners" },
            { value: "Lifetime", label: "Durability" },
          ].map((stat) => (
            <div key={stat.label} className="border-t border-gold/30 pt-6">
              <span className="font-serif text-3xl md:text-4xl text-gold block mb-2">
                {stat.value}
              </span>
              <span className="text-xs tracking-[0.2em] uppercase text-white/50">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
