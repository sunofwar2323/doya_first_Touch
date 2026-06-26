import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Jackets", href: "/collections/jackets" },
    { label: "Biker Jackets", href: "/collections/jackets?style=Biker%20Jacket" },
    { label: "Cafe Racers", href: "/collections/jackets?style=Cafe%20Racer" },
    { label: "Flight Jackets", href: "/collections/jackets?style=Flight%20Jacket" },
  ],
  support: [
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/#contact" },
  ],
  company: [
    { label: "Our Story", href: "/#about" },
    { label: "Craftsmanship", href: "/#why-choose-us" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-luxury px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-medium mb-2">
                Join the DOYA Circle
              </h3>
              <p className="text-white/50 text-sm">
                Exclusive access to new arrivals and leather care insights.
              </p>
            </div>
            <form className="flex w-full lg:w-auto gap-0">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 lg:w-72 bg-transparent border border-white/20 px-4 py-3 text-sm outline-none focus:border-white/50 placeholder:text-white/30"
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium hover:bg-warm-gray transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container-luxury px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-xl tracking-[0.2em] font-semibold block">
              DOYA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 block mt-1 mb-4">
              First Touch
            </span>
            <p className="text-white/50 text-xs leading-relaxed max-w-xs mb-6">
              Premium leather jackets crafted for riders who demand timeless style
              and uncompromising quality.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/20 hover:border-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/20 hover:border-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "97500000000").replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/20 hover:border-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="label-caps text-white/40 mb-5">Shop</h4>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-caps text-white/40 mb-5">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label-caps text-white/40 mb-5">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-[10px] text-white/30 tracking-wider uppercase">
            &copy; {new Date().getFullYear()} DOYA FIRST TOUCH
          </p>
          <p className="text-[10px] text-white/30 tracking-wider">
            Crafted for the Road
          </p>
        </div>
      </div>
    </footer>
  );
}
