import {
  JACKET_FINISHES,
  JACKET_MATERIALS,
  JACKET_STYLES,
  JacketSpecifications,
} from "@/types/jacket";

function findInText(text: string, options: readonly string[]): string[] {
  const lower = text.toLowerCase();
  return options.filter((opt) => lower.includes(opt.toLowerCase()));
}

function extractColor(name: string, description: string, features: string[]): string[] {
  const text = `${name} ${description} ${features.join(" ")}`.toLowerCase();
  const colors: string[] = [];
  const colorMap: Record<string, string> = {
    black: "Black",
    brown: "Brown",
    "dark brown": "Dark Brown",
    "camel brown": "Camel Brown",
    camel: "Camel",
    white: "White",
  };
  for (const [key, label] of Object.entries(colorMap)) {
    if (text.includes(key) && !colors.includes(label)) colors.push(label);
  }
  return colors;
}

function inferJacketType(name: string, description: string): string {
  const text = `${name} ${description}`.toLowerCase();
  for (const style of JACKET_STYLES) {
    if (text.includes(style.toLowerCase())) return style;
  }
  if (text.includes("biker")) return "Biker Jacket";
  if (text.includes("hoodie") || text.includes("hooded")) return "Hoodie";
  if (text.includes("denim")) return "Trucker Jacket";
  if (text.includes("brando")) return "Biker Jacket";
  if (text.includes("scooter")) return "Biker Jacket";
  if (text.includes("mandarin")) return "Biker Jacket";
  if (text.includes("1930")) return "Biker Jacket";
  if (text.includes("air born") || text.includes("aviation")) return "Flight Jacket";
  return "Motorcycle Jacket";
}

export function deriveSpecifications(
  name: string,
  description: string,
  features: string[],
  size: string
): {
  specifications: JacketSpecifications;
  style: string[];
  finish: string[];
  material: string[];
  colors: string[];
  jacketType: string;
} {
  const combined = `${name}. ${description}. ${features.join(". ")}`;
  const lower = combined.toLowerCase();

  const finishMatches = findInText(combined, JACKET_FINISHES);
  if (lower.includes("semi-aniline") && !finishMatches.includes("Semi-Aniline")) {
    finishMatches.push("Semi-Aniline");
  }
  if (lower.includes("semi-gloss") && !finishMatches.includes("Glossy")) {
    finishMatches.push("Glossy");
  }
  if (lower.includes("pigment") && !finishMatches.includes("Pigmented")) {
    finishMatches.push("Pigmented");
  }
  if (lower.includes("distressed matte") && !finishMatches.includes("Matte")) {
    finishMatches.push("Matte");
  }

  const materialMatches = findInText(combined, JACKET_MATERIALS);
  if (lower.includes("lambskin") && !materialMatches.includes("Lambskin Leather")) {
    materialMatches.push("Lambskin Leather");
  }
  if (lower.includes("genuine leather") && !materialMatches.includes("Genuine Leather")) {
    materialMatches.unshift("Genuine Leather");
  }
  if (lower.includes("full-grain") || lower.includes("full grain")) {
    if (!materialMatches.includes("Full Grain Leather")) {
      materialMatches.push("Full Grain Leather");
    }
  }
  if (materialMatches.length === 0) materialMatches.push("Genuine Leather");

  const styleMatches = findInText(combined, JACKET_STYLES);
  const jacketType = inferJacketType(name, description);
  if (!styleMatches.includes(jacketType)) styleMatches.push(jacketType);

  const zipperFeature = features.find((f) => f.toLowerCase().includes("zipper") || f.toLowerCase().includes("zip"));
  const collarFeature = features.find(
    (f) =>
      f.toLowerCase().includes("collar") ||
      f.toLowerCase().includes("lapel") ||
      f.toLowerCase().includes("hood")
  );
  const pocketFeatures = features.filter(
    (f) =>
      f.toLowerCase().includes("pocket") ||
      f.toLowerCase().includes("d-pocket")
  );
  const specialFeatures = features
    .filter(
      (f) =>
        !f.toLowerCase().includes("zipper") &&
        !f.toLowerCase().includes("pocket") &&
        !f.toLowerCase().includes("collar") &&
        !f.toLowerCase().includes("100% genuine")
    )
    .join("; ");

  const specifications: JacketSpecifications = {
    material: materialMatches[0] ?? "Genuine Leather",
    leatherType: materialMatches.join(", "),
    finishType: finishMatches.join(", ") || "—",
    zipperType: zipperFeature ?? (lower.includes("ykk") ? "Premium YKK zipper" : "—"),
    collarStyle: collarFeature ?? "—",
    pocketConfiguration: pocketFeatures.length > 0 ? pocketFeatures.join("; ") : "—",
    specialFeatures: specialFeatures || "—",
    size,
  };

  return {
    specifications,
    style: styleMatches,
    finish: finishMatches,
    material: materialMatches,
    colors: extractColor(name, description, features),
    jacketType,
  };
}
