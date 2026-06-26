import fs from "fs";
import path from "path";
import { slugify } from "./utils";

export interface ParsedJacket {
  productNumber: string;
  name: string;
  slug: string;
  price: number;
  size: string;
  description: string;
  features: string[];
}

function parseHeading(line: string): { productNumber: string; name: string } {
  const content = line.replace(/^##\s+/, "").trim();
  const numberedMatch = content.match(/^(\d+)\.\s*(.+)$/);
  if (numberedMatch) {
    return { productNumber: numberedMatch[1], name: numberedMatch[2].trim() };
  }
  return { productNumber: "", name: content };
}

export function parseProductMarkdown(content: string): ParsedJacket[] {
  const sections = content.split(/\n---\n/).filter((s) => s.trim());
  const products: ParsedJacket[] = [];

  for (const section of sections) {
    const lines = section.trim().split("\n");
    const headingLine = lines.find((l) => l.startsWith("## "));
    if (!headingLine) continue;

    const { productNumber, name } = parseHeading(headingLine);
    const priceLine = lines.find((l) => l.startsWith("**Price:**"));
    const sizeLine = lines.find((l) => l.startsWith("**Size:**"));

    const price = priceLine ? parseInt(priceLine.replace("**Price:**", "").trim(), 10) : 0;
    const size = sizeLine ? sizeLine.replace("**Size:**", "").trim() : "";

    const featuresStart = lines.findIndex((l) => l.trim() === "**Features:**");
    const features: string[] = [];
    if (featuresStart !== -1) {
      for (let i = featuresStart + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line.startsWith("*")) break;
        features.push(line.replace(/^\*\s*/, "").trim());
      }
    }

    const descLines: string[] = [];
    for (const line of lines) {
      if (line.startsWith("## ") || line.startsWith("**Price:**") || line.startsWith("**Size:**")) continue;
      if (line.trim() === "**Features:**" || line.trim().startsWith("*")) continue;
      if (line.trim() === "# Leather Jacket Collection") continue;
      if (line.trim()) descLines.push(line.trim());
    }

    products.push({
      productNumber,
      name,
      slug: slugify(productNumber ? `${productNumber}-${name}` : name),
      price,
      size,
      description: descLines.join(" "),
      features,
    });
  }

  return products;
}

export function readProductMarkdown(): ParsedJacket[] {
  const mdPath = path.join(process.cwd(), "product.md");
  const content = fs.readFileSync(mdPath, "utf-8");
  return parseProductMarkdown(content);
}
