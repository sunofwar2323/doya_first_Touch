"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PHONE_DISPLAY = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+975 XXXXXXXX";
const PHONE_RAW = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "97500000000").replace(
  /\D/g,
  ""
);
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@doyafirsttouch.com";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  rows,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  rows?: number;
}) {
  const isTextarea = Boolean(rows);
  const sharedClass = cn(
    "peer w-full bg-white/60 border rounded-xl px-4 pt-6 pb-2 text-sm text-[#1a1410] outline-none transition-all duration-300",
    "border-[#e0d8cc] focus:border-[#C9A45C] focus:ring-2 focus:ring-[#C9A45C]/15",
    error && "border-red-400 focus:border-red-400 focus:ring-red-400/15"
  );

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(sharedClass, "resize-none min-h-[120px]")}
          placeholder=" "
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={sharedClass}
          placeholder=" "
        />
      )}
      <label
        htmlFor={id}
        className={cn(
          "absolute left-4 text-[#8a8078] text-sm transition-all duration-300 pointer-events-none",
          "peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm",
          "peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-[#C9A45C] peer-focus:tracking-wider peer-focus:uppercase",
          value ? "top-2 text-[10px] tracking-wider uppercase text-[#C9A45C]" : "top-4"
        )}
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!data.subject.trim()) errors.subject = "Subject is required";
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

export function ContactUsSection() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = (field: keyof FormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSending(true);
    await new Promise((r) => setTimeout(r, 800));

    const body = [
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Subject: ${form.subject}`,
      "",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`[DOYA] ${form.subject}`)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setSending(false);
    setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      value: PHONE_DISPLAY,
      href: `tel:+${PHONE_RAW}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bhutan",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Monday – Saturday",
      sub: "9:00 AM – 6:00 PM",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div
        className="absolute inset-0 bg-[#F8F6F2]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\"), linear-gradient(180deg, #faf8f4 0%, #f3efe8 100%)",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A45C]/40 to-transparent" />

      <div className="relative section-padding pb-8">
        <div className="container-luxury px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14 lg:mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A45C]/60" />
              <span className="label-caps text-[#C9A45C]">Contact</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A45C]/60" />
            </div>
            <h2
              id="contact-heading"
              className="editorial-heading text-3xl sm:text-4xl lg:text-5xl text-[#1a1410] mb-5"
            >
              Get In Touch
            </h2>
            <p className="text-[#5c534a] font-light text-[15px] sm:text-base leading-relaxed">
              We would love to hear from you. Whether you have questions about our
              products, custom orders, or partnerships, our team is ready to assist.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {contactItems.map((item) => (
                <div
                  key={item.label}
                  className="flex gap-5 p-5 rounded-2xl bg-white/50 border border-[#e8e2d8]/80 hover:border-[#C9A45C]/30 transition-colors duration-300"
                >
                  <div className="shrink-0 h-11 w-11 rounded-full border border-[#C9A45C]/35 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-[#C9A45C]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9A45C] font-medium mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#1a1410] font-medium hover:text-[#C9A45C] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#1a1410] font-medium">{item.value}</p>
                    )}
                    {item.sub && (
                      <p className="text-sm text-[#6b635a] font-light mt-0.5">{item.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="p-7 sm:p-9 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#e8e2d8] shadow-[0_12px_40px_-12px_rgba(26,20,16,0.1)]">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-12"
                    >
                      <CheckCircle2 className="h-14 w-14 text-[#C9A45C] mb-5" strokeWidth={1.5} />
                      <h3 className="text-xl font-semibold text-[#1a1410] mb-2">
                        Message Sent
                      </h3>
                      <p className="text-sm text-[#6b635a] font-light max-w-xs mb-6">
                        Thank you for reaching out. Our team will get back to you shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="text-sm text-[#C9A45C] underline underline-offset-4 hover:text-[#1a1410] transition-colors"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      noValidate
                    >
                      <FloatingInput
                        id="fullName"
                        label="Full Name"
                        value={form.fullName}
                        onChange={update("fullName")}
                        error={errors.fullName}
                      />
                      <FloatingInput
                        id="email"
                        label="Email Address"
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        error={errors.email}
                      />
                      <FloatingInput
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        error={errors.phone}
                      />
                      <FloatingInput
                        id="subject"
                        label="Subject"
                        value={form.subject}
                        onChange={update("subject")}
                        error={errors.subject}
                      />
                      <FloatingInput
                        id="message"
                        label="Message"
                        value={form.message}
                        onChange={update("message")}
                        error={errors.message}
                        rows={4}
                      />
                      <button
                        type="submit"
                        disabled={sending}
                        className={cn(
                          "w-full h-14 rounded-xl flex items-center justify-center gap-2.5",
                          "bg-[#1a1410] hover:bg-[#2d241c] text-white text-sm font-semibold tracking-wide",
                          "transition-all duration-300 shadow-md hover:shadow-lg",
                          "disabled:opacity-60 disabled:cursor-not-allowed"
                        )}
                      >
                        <Send className="h-4 w-4" />
                        {sending ? "Sending..." : "Send Message"}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[#C9A45C]/20 bg-[#f3efe8]/80 py-10">
        <p className="text-center font-serif text-lg sm:text-xl text-[#3d2b1f] tracking-wide italic px-6">
          Crafted with Passion. Inspired by Bhutan. Designed for Life.
        </p>
      </div>
    </section>
  );
}
