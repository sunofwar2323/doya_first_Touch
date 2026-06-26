import { Category, Product, Review, Testimonial } from "@/types";

export const categories: Category[] = [
  {
    slug: "wallets",
    name: "Leather Wallets",
    description: "Handcrafted wallets in premium full-grain leather",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
  },
  {
    slug: "bags",
    name: "Leather Bags",
    description: "Timeless bags for the discerning professional",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
  },
  {
    slug: "briefcases",
    name: "Executive Briefcases",
    description: "Command respect with every meeting",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
  {
    slug: "card-holders",
    name: "Card Holders",
    description: "Minimalist elegance for everyday carry",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
  },
  {
    slug: "travel",
    name: "Travel Accessories",
    description: "Journey in uncompromising style",
    image: "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=800&q=80",
  },
  {
    slug: "gift-sets",
    name: "Premium Gift Sets",
    description: "Curated collections for life's finest moments",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80",
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "heritage-bifold-wallet",
    name: "Heritage Bifold Wallet",
    description: "Full-grain leather bifold with RFID protection",
    longDescription:
      "The Heritage Bifold Wallet represents the pinnacle of leather craftsmanship. Hand-stitched from select full-grain leather that develops a rich patina over time, this wallet features RFID-blocking technology, six card slots, and two bill compartments. Each piece is individually numbered and comes with a lifetime craftsmanship guarantee.",
    price: 285,
    category: "wallets",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 127,
    leatherType: "Full-Grain Italian Leather",
    dimensions: "4.5\" x 3.5\" x 0.5\"",
    weight: "85g",
    colors: ["Cognac", "Black", "Navy"],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "2",
    slug: "executive-tote-bag",
    name: "Executive Tote Bag",
    description: "Handcrafted leather tote for the modern executive",
    longDescription:
      "Designed for professionals who refuse to compromise, the Executive Tote combines spacious functionality with refined aesthetics. Features a padded laptop compartment, interior organization pockets, and solid brass hardware. The vegetable-tanned leather ensures durability that spans decades.",
    price: 895,
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 89,
    leatherType: "Vegetable-Tanned Leather",
    dimensions: "16\" x 12\" x 6\"",
    weight: "1.2kg",
    colors: ["Tan", "Black", "Burgundy"],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "3",
    slug: "prestige-briefcase",
    name: "Prestige Briefcase",
    description: "The definitive executive briefcase",
    longDescription:
      "The Prestige Briefcase is our flagship piece, crafted for C-suite executives and discerning professionals. Hand-cut from premium bridle leather, it features a three-digit combination lock, suede-lined interior, and hand-polished brass fittings. A statement piece that commands respect in any boardroom.",
    price: 1450,
    originalPrice: 1650,
    category: "briefcases",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80",
      "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=1200&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80",
    ],
    rating: 5.0,
    reviewCount: 64,
    leatherType: "Bridle Leather",
    dimensions: "17\" x 13\" x 4.5\"",
    weight: "2.1kg",
    colors: ["Black", "Cognac"],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "4",
    slug: "minimalist-card-holder",
    name: "Minimalist Card Holder",
    description: "Slim profile, maximum elegance",
    longDescription:
      "Less is more with our Minimalist Card Holder. Designed for those who appreciate clean lines and functional beauty, this piece holds up to 8 cards in a profile so slim it disappears in your pocket. Hand-burnished edges and precision stitching define every detail.",
    price: 145,
    category: "card-holders",
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 203,
    leatherType: "Full-Grain Leather",
    dimensions: "4\" x 2.75\" x 0.25\"",
    weight: "35g",
    colors: ["Black", "Brown", "Green"],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "5",
    slug: "voyage-duffle-bag",
    name: "Voyage Duffle Bag",
    description: "Weekend travel in uncompromising luxury",
    longDescription:
      "The Voyage Duffle is your companion for weekend escapes and business travel alike. Water-resistant lining, reinforced handles, and a detachable shoulder strap make it as practical as it is beautiful. The leather develops character with every journey.",
    price: 675,
    category: "travel",
    images: [
      "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=1200&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
    ],
    rating: 4.8,
    reviewCount: 56,
    leatherType: "Waxed Canvas & Leather",
    dimensions: "22\" x 12\" x 12\"",
    weight: "1.8kg",
    colors: ["Tan", "Olive", "Navy"],
    inStock: true,
    isBestSeller: true,
  },
  {
    id: "6",
    slug: "signature-gift-set",
    name: "Signature Gift Set",
    description: "Wallet, card holder & key fob in luxury packaging",
    longDescription:
      "Our Signature Gift Set is the ultimate expression of thoughtful luxury. Includes the Heritage Bifold Wallet, Minimalist Card Holder, and a matching key fob, all presented in our signature walnut gift box with gold-embossed branding. Perfect for corporate gifts, anniversaries, and milestone celebrations.",
    price: 495,
    category: "gift-sets",
    images: [
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1200&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&q=80",
    ],
    rating: 4.9,
    reviewCount: 78,
    leatherType: "Full-Grain Italian Leather",
    dimensions: "Gift Box: 10\" x 8\" x 3\"",
    weight: "350g",
    colors: ["Cognac Set", "Black Set"],
    inStock: true,
    isBestSeller: true,
    isGift: true,
    giftType: "corporate",
  },
  {
    id: "7",
    slug: "slim-money-clip",
    name: "Slim Money Clip",
    description: "Precision-crafted leather money clip",
    longDescription:
      "A modern take on a classic accessory. Our Slim Money Clip combines premium leather with a brushed stainless steel clip, holding bills securely while maintaining an ultra-slim profile.",
    price: 195,
    category: "wallets",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=1200&q=80",
    ],
    rating: 4.6,
    reviewCount: 45,
    leatherType: "Calfskin Leather",
    dimensions: "2.5\" x 1.5\"",
    weight: "25g",
    colors: ["Black", "Brown"],
    inStock: true,
  },
  {
    id: "8",
    slug: "crossbody-satchel",
    name: "Crossbody Satchel",
    description: "Versatile leather satchel for everyday elegance",
    longDescription:
      "The Crossbody Satchel transitions seamlessly from office to evening. Adjustable strap, magnetic closure, and organized interior make it the perfect everyday companion.",
    price: 545,
    category: "bags",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
    ],
    rating: 4.7,
    reviewCount: 92,
    leatherType: "Pebbled Leather",
    dimensions: "11\" x 9\" x 4\"",
    weight: "680g",
    colors: ["Tan", "Black", "Cream"],
    inStock: true,
    isGift: true,
    giftType: "anniversary",
  },
];

export const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    author: "James Mitchell",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    comment: "Absolutely stunning craftsmanship. The leather quality is unmatched and it gets better with age.",
    date: "2025-11-15",
  },
  {
    id: "2",
    productId: "1",
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    comment: "Purchased as a gift for my husband. The packaging alone was worth the price. He loves it.",
    date: "2025-10-22",
  },
  {
    id: "3",
    productId: "3",
    author: "Robert Anderson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    comment: "This briefcase has transformed my professional image. Worth every penny.",
    date: "2025-09-08",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alexander Whitmore",
    role: "CEO, Whitmore Holdings",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    rating: 5,
    comment:
      "DOYA FIRST TOUCH represents everything I look for in luxury goods — impeccable craftsmanship, timeless design, and products that truly last a lifetime. My Prestige Briefcase is a conversation starter at every board meeting.",
  },
  {
    id: "2",
    name: "Elena Rodriguez",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    rating: 5,
    comment:
      "I've gifted DOYA products to my entire executive team. The quality is extraordinary, and the presentation makes every recipient feel truly valued. This is luxury done right.",
  },
  {
    id: "3",
    name: "David Park",
    role: "Leather Enthusiast & Collector",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    rating: 5,
    comment:
      "As someone who owns pieces from Hermès and Bellroy, I can confidently say DOYA FIRST TOUCH holds its own. The attention to stitching detail and leather selection is world-class.",
  },
];

export const instagramImages = [
  "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
  "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
  "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=600&q=80",
  "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&q=80",
  "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
];

export const giftCategories = [
  {
    title: "Corporate Gifts",
    description: "Elevate your business relationships with bespoke leather gifts",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80",
    slug: "corporate",
  },
  {
    title: "Anniversary Gifts",
    description: "Celebrate milestones with timeless leather craftsmanship",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
    slug: "anniversary",
  },
  {
    title: "Birthday Gifts",
    description: "Give the gift of lasting luxury and elegance",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    slug: "birthday",
  },
  {
    title: "Executive Gifts",
    description: "For leaders who appreciate the finest things in life",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    slug: "executive",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.isBestSeller);
}

export function getRelatedProducts(product: Product): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
