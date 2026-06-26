"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f5f2eb] aspect-[3/4] md:aspect-auto md:h-[88svh] lg:h-[100svh] md:min-h-[480px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        {/* Mobile — 3:4 portrait hero */}
        <Image
          src="/hero-mobile.png"
          alt="DOYA — Handcrafted in Bhutan. Premium leather jackets."
          fill
          priority
          className="object-cover object-center md:hidden"
          sizes="100vw"
          quality={90}
        />

        {/* Desktop — 16:9 landscape hero */}
        <Image
          src="/ffhero.png"
          alt="DOYA — Handcrafted in Bhutan. Premium leather jackets."
          fill
          priority
          className="hidden md:block object-cover object-center"
          sizes="100vw"
          quality={90}
        />
      </motion.div>
    </section>
  );
}
