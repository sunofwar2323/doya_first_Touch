import { Shield, Truck, RotateCcw, CreditCard, Gem } from "lucide-react";

const trustItems = [
  {
    icon: Gem,
    title: "Premium Leather",
    description: "100% genuine leather",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Craftsmanship guaranteed",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Nationwide shipping",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free policy",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Safe transactions",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-warm-gray">
      <div className="container-luxury px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-6">
          {trustItems.map((item) => (
            <div key={item.title} className="text-center lg:text-left">
              <item.icon
                className="h-5 w-5 mx-auto lg:mx-0 mb-4 text-black stroke-[1.25]"
                strokeWidth={1.25}
              />
              <h3 className="text-xs tracking-[0.12em] uppercase font-semibold mb-1.5">
                {item.title}
              </h3>
              <p className="text-[11px] text-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
