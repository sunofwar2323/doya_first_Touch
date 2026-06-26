"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { testimonials } from "@/data/products";
import { StarRating } from "@/components/ui/star-rating";

export function Testimonials() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            Client Stories
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#111111]">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white p-8 border border-gold/20 relative"
            >
              <div className="absolute top-0 left-8 w-12 h-px bg-gold" />
              <StarRating rating={testimonial.rating} size="md" className="mb-6" />
              <p className="text-muted leading-relaxed mb-8 italic">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-[#111111] font-medium text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-muted text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
