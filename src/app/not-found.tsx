import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="pt-24 min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <span className="font-serif text-8xl text-gold/30 block mb-4">404</span>
        <h1 className="font-serif text-3xl mb-4">Page Not Found</h1>
        <p className="text-muted mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-gold text-[#111111] px-8 py-3.5 text-xs tracking-wider uppercase font-semibold hover:bg-gold-light transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
