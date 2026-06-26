"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Clock, Gem, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const VALUES = [
  {
    icon: Sparkles,
    title: "Premium Craftsmanship",
    description: "Carefully made with attention to detail and finishing.",
  },
  {
    icon: Clock,
    title: "Timeless Design",
    description: "Leather products designed to stay relevant beyond trends.",
  },
  {
    icon: Gem,
    title: "Quality Materials",
    description: "Made using premium leather and durable components.",
  },
  {
    icon: Briefcase,
    title: "Everyday Luxury",
    description: "Elegant pieces created for daily use and refined living.",
  },
] as const;

export function AboutUsSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #faf8f4 0%, #f3ede4 50%, #ebe4d8 100%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d2b1f]/15 to-transparent" />

      <div className="relative section-padding">
        <div className="container-luxury px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Left — editorial story */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="label-caps text-[#6b5344] mb-5">
                About Doya First Touch
              </p>

              <h2
                id="about-heading"
                className="editorial-heading text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-5xl text-[#1a1410] mb-7 leading-[1.1]"
              >
                Crafting Leather with Character, Purpose, and Timeless Style
              </h2>

              <p className="text-[#5c534a] leading-relaxed font-light text-[15px] sm:text-base mb-5 max-w-xl">
                At Doya First Touch, leather is more than material — it is a
                statement of character. We create pieces for those who appreciate
                refined quality, confident simplicity, and products made to endure
                far beyond a single season.
              </p>

              <p className="text-[#5c534a] leading-relaxed font-light text-[15px] sm:text-base mb-10 max-w-xl">
                From carefully selected hides to thoughtful finishing, every jacket
                and leather good reflects our belief in timeless design, skilled
                craftsmanship, and the quiet luxury of owning something truly
                well-made — elegant enough for the everyday, durable enough for a
                lifetime.
              </p>

              <ul className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-10">
                {VALUES.map((value, i) => (
                  <motion.li
                    key={value.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="group"
                  >
                    <div className="flex gap-3.5">
                      <div className="shrink-0 h-10 w-10 rounded-full border border-[#c4a88a]/50 bg-white/60 flex items-center justify-center group-hover:bg-[#3d2b1f] group-hover:border-[#3d2b1f] transition-colors duration-300">
                        <value.icon
                          className="h-4 w-4 text-[#6b5344] group-hover:text-[#f5f0e8] transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#1a1410] mb-0.5">
                          {value.title}
                        </h3>
                        <p className="text-[13px] text-[#6b635a] leading-relaxed font-light">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <Button
                size="lg"
                className="bg-[#3d2b1f] hover:bg-[#2a1e15] text-white border-0 group"
                asChild
              >
                <Link href="/collections/jackets">
                  Explore Our Collection
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </motion.div>

            {/* Right — premium visual */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="absolute -inset-3 sm:-inset-5 rounded-2xl bg-[#3d2b1f]/8 blur-md" />
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_28px_70px_-16px_rgba(26,20,16,0.28)]">
                <Image
                  src="/about-us.jpg"
                  alt="Doya First Touch premium leather jacket and craftsmanship"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/55 via-[#1a1410]/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <p className="label-caps text-[#f5f0e8]/75 mb-2">
                    The Doya First Touch Philosophy
                  </p>
                  <p className="font-serif text-xl sm:text-2xl text-white leading-snug">
                    Timeless leather.
                    <br />
                    Thoughtfully crafted.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-5 hidden sm:flex flex-col bg-white/90 backdrop-blur-md border border-[#d4c4a8]/40 rounded-xl px-5 py-4 shadow-lg max-w-[200px]">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#6b5344] font-medium mb-1">
                  Est. Craftsmanship
                </span>
                <span className="text-sm text-[#1a1410] font-medium leading-snug">
                  Handcrafted in Bhutan
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
