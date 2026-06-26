"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Hand,
  Clock,
  Award,
  Gift,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Genuine Premium Leather",
    description: "Only the finest full-grain and vegetable-tanned leathers",
  },
  {
    icon: Hand,
    title: "Handcrafted Excellence",
    description: "Every piece meticulously crafted by master artisans",
  },
  {
    icon: Clock,
    title: "Timeless Design",
    description: "Classic aesthetics that transcend trends and seasons",
  },
  {
    icon: Award,
    title: "Lifetime Durability",
    description: "Built to last generations with proper care",
  },
  {
    icon: Gift,
    title: "Luxury Packaging",
    description: "Presented in signature walnut boxes with gold embossing",
  },
  {
    icon: Truck,
    title: "Secure Worldwide Delivery",
    description: "Insured shipping to over 120 countries worldwide",
  },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            The DOYA Difference
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#111111]">
            Why Choose DOYA FIRST TOUCH
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group p-8 border border-border hover:border-gold/30 transition-all duration-500 hover:shadow-lg"
            >
              <div className="h-12 w-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:bg-gold/5 transition-colors">
                <feature.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-serif text-xl text-[#111111] mb-3">
                {feature.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
