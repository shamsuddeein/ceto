import { BookOpen, GraduationCap, Headphones, LayoutTemplate, Briefcase, Shirt, Sparkles, Star } from "lucide-react";

export type Product = {
  id: string;
  title: string;
  creator: string;
  creatorHandle: string;
  price: number;
  currency: string;
  category: string;
  type: "ebook" | "course" | "audio" | "template" | "service";
  cover: string;
  rating: number;
  sales: number;
  tint: "mint" | "lilac" | "peach" | "rose" | "cream";
  saved?: boolean;
};

const tints: Product["tint"][] = ["mint", "lilac", "peach", "rose", "cream"];

const titles = [
  "Mastering Digital Marketing in 2026",
  "The Complete Notion Productivity System",
  "Launch Your Freelance Business in 30 Days",
  "Brand Identity Toolkit for Creators",
  "Modern UI Design Handbook",
  "AI for Solo Founders — Course",
  "Newsletter Growth Blueprint",
  "Pricing Strategy Playbook",
  "Photography Lightroom Presets Vol. 3",
  "Social Media Templates Bundle",
  "Sales Funnel Masterclass",
  "Become a Profitable Creator",
];

const creators = [
  ["Amara Okafor", "@amara"],
  ["Kwame Boateng", "@kwame"],
  ["Zainab Yusuf", "@zainab"],
  ["Tunde Adekunle", "@tunde"],
  ["Lerato Mokoena", "@lerato"],
  ["Chinedu Eze", "@chinedu"],
];

const categories = ["eBooks", "Courses", "Templates", "Subscriptions", "Services"];

export const MOCK_PRODUCTS: Product[] = titles.map((t, i) => ({
  id: `p-${i + 1}`,
  title: t,
  creator: creators[i % creators.length][0],
  creatorHandle: creators[i % creators.length][1],
  price: [4500, 15000, 25000, 45000, 85000, 120000][i % 6],
  currency: "USD",
  category: categories[i % categories.length],
  type: (["ebook", "course", "template", "audio", "service"] as const)[i % 5],
  cover: "",
  rating: 4 + ((i * 7) % 10) / 10,
  sales: 50 + i * 37,
  tint: tints[i % tints.length],
  saved: false,
}));

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
  return {
    mint: "bg-tint-mint",
    lilac: "bg-tint-lilac",
    peach: "bg-tint-peach",
    rose: "bg-tint-rose",
    cream: "bg-tint-cream",
  }[t as Product["tint"]] || "bg-muted";
}

export function getProductIcon(type: string) {
  switch (type) {
    case "ebook": return BookOpen;
    case "course": return GraduationCap;
    case "audio": return Headphones;
    case "template": return LayoutTemplate;
    case "service": return Star;
    default: return BookOpen;
  }
}
