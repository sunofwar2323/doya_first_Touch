"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  PenLine,
  Palette,
  Layers,
  Gem,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER } from "@/lib/contact";

const FEATURES = [
  {
    icon: PenLine,
    title: "Custom Tailored",
    description:
      "Create leather pieces designed around your personal taste and preference.",
  },
  {
    icon: Palette,
    title: "Choose Your Design",
    description:
      "Select the silhouette, structure, and finish that matches your style.",
  },
  {
    icon: Layers,
    title: "Choose Your Material",
    description:
      "Pick from premium leather types, textures, colors, and finishes.",
  },
  {
    icon: Gem,
    title: "Crafted with Doya Quality",
    description:
      "Every custom piece is premium, durable, elegant, and timeless.",
  },
] as const;

function getWhatsAppLink(message: string): string {
  const phone = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? WHATSAPP_NUMBER).replace(
    /\D/g,
    ""
  );
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const customOrderUrl = getWhatsAppLink(
  "Hello, I'm interested in a custom tailored leather product from Doya First Touch. I'd like to discuss design, material, and finish options. Please share more details."
);

const outletUrl = getWhatsAppLink(
  "Hello, I'd like information about the nearest Doya First Touch factory outlet for warranty support and service assistance."
);

export function CustomServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden"
      aria-labelledby="custom-services-heading"
    >
      {/* Leather-toned editorial background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #faf6f0 0%, #f0e8dc 45%, #e8dfd2 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 80%, #8b6914 0%, transparent 50%), radial-gradient(ellipse at 90% 10%, #c4a574 0%, transparent 40%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c4a574]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8b6914]/25 to-transparent" />

      <div className="relative section-padding">
        <div className="container-luxury px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Left — editorial content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="order-2 lg:order-1"
            >
              <p className="label-caps text-[#8b6914] mb-5">
                Doya First Touch Services
              </p>

              <h2
                id="custom-services-heading"
                className="editorial-heading text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl text-[#1a1410] mb-6 leading-[1.08]"
              >
                Custom Tailored.
                <br />
                Crafted Your Way.
              </h2>

              <p className="text-[#5c534a] leading-relaxed font-light text-[15px] sm:text-base mb-10 max-w-xl">
                At Doya First Touch, we go beyond ready-made leather goods. Create a
                product that reflects your style with custom tailoring options, premium
                material choices, and personalized design details — crafted with the
                same commitment to quality, elegance, and timeless durability.
              </p>

              <ul className="grid sm:grid-cols-2 gap-5 sm:gap-6 mb-10">
                {FEATURES.map((feature, i) => (
                  <motion.li
                    key={feature.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group"
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0 h-11 w-11 rounded-full bg-white/70 border border-[#d4c4a8]/60 flex items-center justify-center shadow-sm group-hover:bg-[#1a1410] group-hover:border-[#1a1410] transition-colors duration-300">
                        <feature.icon
                          className="h-[18px] w-[18px] text-[#8b6914] group-hover:text-[#f5f0e8] transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[#1a1410] mb-1 tracking-wide">
                          {feature.title}
                        </h3>
                        <p className="text-[13px] text-[#6b635a] leading-relaxed font-light">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  size="lg"
                  className="bg-[#1a1410] hover:bg-[#2d241c] text-white border-0 shadow-md"
                  asChild
                >
                  <a href={customOrderUrl} target="_blank" rel="noopener noreferrer">
                    Request Custom Order
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#1a1410]/30 text-[#1a1410] hover:bg-[#1a1410] hover:text-white bg-white/50 backdrop-blur-sm"
                  asChild
                >
                  <a href={outletUrl} target="_blank" rel="noopener noreferrer">
                    Visit a Factory Outlet
                  </a>
                </Button>
              </div>

              <div
                className={cn(
                  "flex gap-4 p-5 rounded-xl",
                  "bg-white/55 backdrop-blur-sm border border-[#d4c4a8]/50",
                  "shadow-[0_4px_24px_-4px_rgba(139,105,20,0.12)]"
                )}
              >
                <ShieldCheck
                  className="h-5 w-5 shrink-0 text-[#8b6914] mt-0.5"
                  strokeWidth={1.5}
                />
                <p className="text-[13px] sm:text-sm text-[#5c534a] leading-relaxed font-light">
                  <span className="font-medium text-[#1a1410]">
                    Warranty &amp; service support
                  </span>{" "}
                  is available through Doya First Touch factory outlets. Customers are
                  requested to visit their nearest outlet for warranty claims, inspection,
                  and service assistance.
                </p>
              </div>
            </motion.div>

            {/* Right — lifestyle / craftsmanship visual */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute -inset-3 sm:-inset-4 rounded-2xl bg-gradient-to-br from-[#c4a574]/20 to-[#8b6914]/10 blur-sm" />
                <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_64px_-12px_rgba(26,20,16,0.25)]">
                  <Image
                    src="/service.jpg"
                    alt="Doya First Touch custom leather tailoring and material selection"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410]/50 via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="label-caps text-[#f5f0e8]/80 mb-2">
                      Crafted for You
                    </p>
                    <p className="font-serif text-xl sm:text-2xl text-white leading-snug">
                      Your leather. Your design.
                      <br />
                      Our craftsmanship.
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 hidden sm:block bg-white/90 backdrop-blur-md border border-[#d4c4a8]/40 rounded-xl px-5 py-4 shadow-lg">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#8b6914] font-medium mb-1">
                    Custom Leather Experience
                  </p>
                  <p className="text-sm text-[#1a1410] font-medium">
                    Design · Material · Finish
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
