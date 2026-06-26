"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="section-padding bg-[#111111] text-white">
      <div className="container-luxury max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            Exclusive Access
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">
            Join the Circle of Craftsmanship
          </h2>
          <p className="text-white/60 mb-10 max-w-lg mx-auto">
            Receive exclusive access to new collections and special releases.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-gold/30 p-8"
            >
              <p className="text-gold font-serif text-xl mb-2">Welcome to the Circle</p>
              <p className="text-white/60 text-sm">
                Thank you for joining. Expect something extraordinary in your inbox.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-gold"
              />
              <Button variant="white" type="submit" className="shrink-0">
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
