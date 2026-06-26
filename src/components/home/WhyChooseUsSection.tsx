"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Hand, Shield, Mountain, Infinity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Hand,
    title: "Handcrafted Excellence",
    description:
      "Each leather product is carefully handcrafted by skilled artisans, ensuring exceptional attention to detail and superior quality.",
  },
  {
    icon: Shield,
    title: "Premium Genuine Leather",
    description:
      "We use only carefully selected genuine leather to deliver durability, comfort, and timeless style.",
  },
  {
    icon: Mountain,
    title: "Crafted in Bhutan",
    description:
      "Inspired by Bhutanese heritage and craftsmanship, every product reflects authenticity and cultural pride.",
  },
  {
    icon: Infinity,
    title: "Built to Last",
    description:
      "Designed for everyday luxury with materials and construction that age beautifully over time.",
  },
] as const;

export function WhyChooseUsSection() {
  return (
    <section
      id="why-choose-us"
      className="relative overflow-hidden bg-[#F8F6F2]"
      aria-labelledby="why-choose-heading"
    >
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 10% 20%, rgba(201,164,92,0.08) 0%, transparent 50%), radial-gradient(ellipse at 90% 80%, rgba(201,164,92,0.06) 0%, transparent 45%)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#C9A45C] to-transparent" />

      <div className="relative section-padding">
        <div className="container-luxury px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14 lg:mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A45C]/60" />
              <span className="label-caps text-[#C9A45C]">Our Promise</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A45C]/60" />
            </div>
            <h2
              id="why-choose-heading"
              className="editorial-heading text-3xl sm:text-4xl lg:text-5xl text-[#1a1410] mb-5"
            >
              Why Choose DOYA First Touch
            </h2>
            <p className="text-[#5c534a] font-light text-[15px] sm:text-base leading-relaxed italic">
              Every piece tells a story of craftsmanship, authenticity, and
              timeless elegance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {FEATURES.map((feature, i) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group"
              >
                <div
                  className={cn(
                    "h-full p-7 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-sm",
                    "border border-[#e8e2d8] shadow-[0_8px_32px_-8px_rgba(26,20,16,0.08)]",
                    "transition-all duration-400 hover:shadow-[0_16px_48px_-12px_rgba(201,164,92,0.18)]",
                    "hover:border-[#C9A45C]/30 hover:-translate-y-1"
                  )}
                >
                  <div className="h-12 w-12 rounded-full border border-[#C9A45C]/40 flex items-center justify-center mb-6 group-hover:bg-[#C9A45C] group-hover:border-[#C9A45C] transition-colors duration-300">
                    <feature.icon
                      className="h-5 w-5 text-[#C9A45C] group-hover:text-white transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1410] mb-3 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] sm:text-sm text-[#6b635a] leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-14 lg:mt-16"
          >
            <Button
              size="lg"
              className="bg-[#1a1410] hover:bg-[#2d241c] text-white border-0 group"
              asChild
            >
              <Link href="/collections/jackets">
                Discover Our Collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/50 to-transparent" />
    </section>
  );
}
