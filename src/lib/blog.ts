import { Target, DollarSign, Megaphone, PenTool, Wrench, FileText } from "lucide-react";

export const POSTS = [
  {
    slug: "launching-your-first-digital-product",
    title: "How to launch your first digital product in 30 days",
    excerpt:
      "A practical, no-fluff guide to going from idea to first paying customer in one month.",
    author: "Amara Okafor",
    date: "June 5, 2026",
    readTime: "8 min",
    tag: "Strategy",
    tint: "mint" as const,
    body: [
      {
        heading: "Start with the smallest valuable thing",
        text: "Your first product doesn't need to be your magnum opus. Pick a single problem, solve it well, and ship a v1 your audience can hold in their hands within two weeks. You'll learn more from 50 early users than from 6 months of polish.",
      },
      {
        heading: "Sell before you build",
        text: "Pre-orders are validation with skin in the game. If 30 people pay ₦15,000 before your course exists, you've validated demand and funded the work. If nobody pays, you saved months of building the wrong thing.",
      },
      {
        heading: "Treat the first week like a launch",
        text: "Show up daily. Reply to every email. Share every milestone. The first week sets the algorithmic and social momentum that compounds for months.",
      },
    ],
  },
  {
    slug: "pricing-your-ebook",
    title: "The psychology of pricing your eBook (and not undercharging)",
    excerpt:
      "Why creators leave money on the table - and the 3-tier pricing framework that fixes it.",
    author: "Kwame Boateng",
    date: "May 28, 2026",
    readTime: "6 min",
    tag: "Pricing",
    tint: "lilac" as const,
    body: [
      {
        heading: "Stop anchoring to your time",
        text: "Most creators price based on hours spent rather than value delivered. A ₦3,000 ebook that saves someone 10 hours of research is worth far more than ₦3,000 — it's worth ₦10,000+.",
      },
      {
        heading: "The 3-tier framework",
        text: "Offer a basic tier (PDF only), a standard tier (PDF + bonus templates), and a premium tier (all of the above + 30-min call). Let customers self-segment. Most will choose the middle.",
      },
      {
        heading: "Test upward",
        text: "If your first 10 buyers bought without hesitation, your price is too low. Raise it by 20% and observe. The market will tell you the ceiling.",
      },
    ],
  },
  {
    slug: "building-an-audience",
    title: "Building an audience before you have a product",
    excerpt:
      "Pre-launch communities convert 10x better. Here's how the top Cetoh creators build theirs.",
    author: "Zainab Yusuf",
    date: "May 14, 2026",
    readTime: "10 min",
    tag: "Marketing",
    tint: "peach" as const,
    body: [
      {
        heading: "Choose one platform and go deep",
        text: "Trying to be everywhere is a recipe for mediocrity. Pick Instagram, X, or LinkedIn and show up consistently for 90 days before expanding. Depth beats breadth at the early stage.",
      },
      {
        heading: "Build in public",
        text: "Share your process — the wins, the stumbles, the lessons. An audience that watches you build a product is primed to buy it. Transparency is the cheapest form of marketing.",
      },
      {
        heading: "Create a free resource first",
        text: "A well-crafted free guide or template acts as a lead magnet and trust builder. The people who download it are your warmest potential customers.",
      },
    ],
  },
  {
    slug: "from-side-hustle-to-six-figures",
    title: "From side-hustle to six figures: a creator's story",
    excerpt:
      "Tunde went from selling Notion templates after work to a ₦18M/yr business in 18 months.",
    author: "Lerato Mokoena",
    date: "Apr 30, 2026",
    readTime: "12 min",
    tag: "Stories",
    tint: "rose" as const,
    body: [
      {
        heading: "The accidental start",
        text: "Tunde built his first Notion template to organise his own life. He posted it in a WhatsApp group and received 12 payment requests within a day. That was month one.",
      },
      {
        heading: "Scaling the system",
        text: "Once he saw demand, Tunde invested three weekends packaging his templates into a proper product with a landing page on Cetoh. Sales compounded as his Twitter following grew from 800 to 22,000.",
      },
      {
        heading: "The turning point",
        text: "Month 14: a single tweet went viral. 400 new customers in 72 hours. At that point, the business was paying his rent, and he handed in his notice. The side hustle was now the main hustle.",
      },
    ],
  },
  {
    slug: "best-tools-for-creators-2026",
    title: "The best tools for digital creators in 2026",
    excerpt: "Our hand-picked stack for writers, course creators, and designers shipping today.",
    author: "Chinedu Eze",
    date: "Apr 22, 2026",
    readTime: "7 min",
    tag: "Tools",
    tint: "cream" as const,
    body: [
      {
        heading: "For writing and ebooks",
        text: "Notion for drafting, Canva for covers, Cetoh for selling. That's the entire stack. Don't overthink tools — the best ones are the ones you actually use.",
      },
      {
        heading: "For course creators",
        text: "Record with Loom or OBS. Edit with CapCut or DaVinci Resolve. Host and sell directly on Cetoh. You don't need a dedicated course platform until you're making ₦2M/month.",
      },
      {
        heading: "For designers",
        text: "Figma for UI kits and templates. Framer for interactive demos. Cetoh for the storefront. Keep your delivery simple — a well-organised ZIP file beats a complicated delivery portal.",
      },
    ],
  },
  {
    slug: "writing-a-product-page-that-converts",
    title: "Writing a product page that converts (with examples)",
    excerpt: "Steal these copy patterns from the top-selling products on Cetoh.",
    author: "Amara Okafor",
    date: "Apr 10, 2026",
    readTime: "9 min",
    tag: "Copywriting",
    tint: "mint" as const,
    body: [
      {
        heading: "Lead with transformation, not features",
        text: "Don't say 'a 40-page PDF.' Say 'the exact system I used to go from 0 to ₦500k/month in 60 days.' Buyers purchase outcomes, not objects.",
      },
      {
        heading: "Use social proof early",
        text: "Put your best testimonial above the fold. One sentence from a real customer who got real results is worth more than three paragraphs of your own marketing copy.",
      },
      {
        heading: "Make the CTA unmissable",
        text: "One page. One button. No competing links. Every additional option on your page costs you conversions. If you only have one thing to sell, make sure it's the only thing to click.",
      },
    ],
  },
];

export function getBlogIcon(tag: string) {
  switch (tag) {
    case "Strategy":
      return Target;
    case "Pricing":
      return DollarSign;
    case "Marketing":
      return Megaphone;
    case "Copywriting":
      return PenTool;
    case "Tools":
      return Wrench;
    default:
      return FileText;
  }
}
