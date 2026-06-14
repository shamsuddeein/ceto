import {
  BookOpen,
  GraduationCap,
  Headphones,
  LayoutTemplate,
  Briefcase,
  Shirt,
  Sparkles,
  Star,
} from "lucide-react";

import { Product as BaseProduct } from "@/types";

export type Product = BaseProduct & {
  creatorHandle?: string;
  type?: "ebook" | "course" | "audio" | "template" | "service";
  cover?: string;
  rating?: number;
  tint?: "mint" | "lilac" | "peach" | "rose" | "cream";
  saved?: boolean;
};

const tints: Product["tint"][] = ["mint", "lilac", "peach", "rose", "cream"];

export const CATEGORIES = [
  { slug: "ebooks", name: "eBooks", count: 1240, tint: "mint" },
  { slug: "courses", name: "Courses", count: 832, tint: "lilac" },
  { slug: "templates", name: "Templates", count: 654, tint: "peach" },
  { slug: "audio", name: "Audio", count: 198, tint: "rose" },
  { slug: "services", name: "Services", count: 421, tint: "cream" },
  { slug: "memberships", name: "Memberships", count: 87, tint: "mint" },
  { slug: "audio", name: "Audio & Music", count: 312, tint: "lilac" },
  { slug: "design", name: "Design Assets", count: 504, tint: "peach" },
] as const;

export function tintClass(t: Product["tint"] | string) {
  return (
    {
      mint: "bg-tint-mint",
      lilac: "bg-tint-lilac",
      peach: "bg-tint-peach",
      rose: "bg-tint-rose",
      cream: "bg-tint-cream",
    }[t as Product["tint"]] || "bg-muted"
  );
}

export function getProductIcon(type: string) {
  switch (type) {
    case "ebook":
      return BookOpen;
    case "course":
      return GraduationCap;
    case "audio":
      return Headphones;
    case "template":
      return LayoutTemplate;
    case "service":
      return Star;
    default:
      return BookOpen;
  }
}
