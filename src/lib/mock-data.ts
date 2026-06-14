import type { Category, Order, Product, Transaction, User } from "@/types";

type MockResponse<T> = { data: T };
type MockPayload = Record<string, unknown> | FormData | undefined;

type MockProduct = Product & {
  product_type?: string;
  digital_file?: string;
  features?: string[];
  rating?: number;
  sales_count?: number;
  tint?: string;
};

type MockOrder = Order & {
  buyer_email: string;
  date?: string;
};

type MockWithdrawal = Transaction & {
  requested_at: string;
  method?: string;
};

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const categories: Category[] = [
  { id: 1, name: "eBooks", slug: "ebooks" },
  { id: 2, name: "Courses", slug: "courses" },
  { id: 3, name: "Templates", slug: "templates" },
  { id: 4, name: "Audio", slug: "audio" },
  { id: 5, name: "Services", slug: "services" },
  { id: 6, name: "Design Assets", slug: "design" },
];

export let profile: User & {
  profile: NonNullable<User["profile"]> & {
    website?: string;
    avatar_url?: string | null;
    bank_details?: {
      method?: string;
      account_name?: string;
      account_number?: string;
      bank_name?: string;
    };
    notification_preferences?: Record<string, boolean>;
  };
} = {
  id: "user-1",
  email: "creator@cetoh.test",
  profile: {
    id: "profile-1",
    username: "janedoe",
    avatar: "",
    avatar_url: null,
    bio: "I create practical resources for digital creators, small businesses, and online educators.",
    website: "https://cetoh.test/janedoe",
    bank_details: {
      method: "Bank transfer",
      account_name: "Jane Doe",
      account_number: "0123456789",
      bank_name: "Kuda Bank",
    },
    notification_preferences: {
      new_sale: true,
      weekly_digest: true,
      product_reviews: true,
      news: false,
    },
  },
};

export let products: MockProduct[] = [
  {
    id: "1",
    slug: "milk-and-honey-ebook",
    title: "Milk and Honey by Rupi Kaur [eBook]",
    description:
      "A polished ebook package with reading notes, discussion prompts, and a simple launch checklist.",
    price: 4500,
    currency: "₦",
    product_type: "ebook",
    type: "ebook",
    category: categories[0],
    creator: profile.profile,
    creator_details: profile.profile,
    is_published: true,
    digital_file: "milk-and-honey-ebook.pdf",
    rating: 4.8,
    sales: 42,
    sales_count: 42,
    tint: "mint",
    features: ["Instant PDF download", "Lifetime access", "Creator notes included"],
    created_at: "2026-05-10T09:00:00.000Z",
  },
  {
    id: "2",
    slug: "creator-course",
    title: "Creator Launch Course",
    description: "A beginner-friendly course for turning your knowledge into a paid digital offer.",
    price: 30000,
    currency: "₦",
    product_type: "course",
    type: "course",
    category: categories[1],
    creator: profile.profile,
    creator_details: profile.profile,
    is_published: true,
    digital_file: "creator-launch-course.zip",
    rating: 4.9,
    sales: 31,
    sales_count: 31,
    tint: "peach",
    features: ["6 video lessons", "Launch workbook", "Private updates"],
    created_at: "2026-05-18T11:30:00.000Z",
  },
  {
    id: "3",
    slug: "notion-business-template",
    title: "Notion Business Template",
    description: "A clean operating system for creators tracking products, customers, and revenue.",
    price: 15000,
    currency: "₦",
    product_type: "template",
    type: "template",
    category: categories[2],
    creator: profile.profile,
    creator_details: profile.profile,
    is_published: true,
    digital_file: "notion-business-template.zip",
    rating: 4.7,
    sales: 26,
    sales_count: 26,
    tint: "lilac",
    features: ["Duplicate-ready Notion page", "Revenue dashboard", "Product roadmap"],
    created_at: "2026-05-22T14:20:00.000Z",
  },
  {
    id: "4",
    slug: "coaching-session",
    title: "1-on-1 Creator Coaching Session",
    description:
      "A focused strategy session for pricing, packaging, and launching your next offer.",
    price: 90000,
    currency: "₦",
    product_type: "service",
    type: "service",
    category: categories[4],
    creator: profile.profile,
    creator_details: profile.profile,
    is_published: false,
    rating: 5,
    sales: 8,
    sales_count: 8,
    tint: "cream",
    features: ["60-minute video call", "Offer teardown", "Action plan"],
    created_at: "2026-05-27T08:15:00.000Z",
  },
  {
    id: "5",
    slug: "social-content-pack",
    title: "Social Content Pack",
    description:
      "Caption prompts, carousel scripts, and launch email swipe copy for digital products.",
    price: 12000,
    currency: "₦",
    product_type: "template",
    type: "template",
    category: categories[2],
    creator: profile.profile,
    creator_details: profile.profile,
    is_published: true,
    digital_file: "social-content-pack.zip",
    rating: 4.6,
    sales: 19,
    sales_count: 19,
    tint: "rose",
    created_at: "2026-06-02T10:45:00.000Z",
  },
  {
    id: "6",
    slug: "event-ticket-masterclass",
    title: "Live Masterclass Ticket",
    description: "Access ticket for a live digital product launch masterclass.",
    price: 10000,
    currency: "₦",
    product_type: "ticket",
    category: categories[5],
    creator: profile.profile,
    creator_details: profile.profile,
    is_published: true,
    digital_file: "masterclass-ticket.pdf",
    rating: 4.8,
    sales: 54,
    sales_count: 54,
    tint: "mint",
    created_at: "2026-06-06T16:00:00.000Z",
  },
];

export const orders: MockOrder[] = [
  {
    id: "1004",
    product: products[1],
    product_details: products[1],
    buyer: "Ada Okafor",
    buyer_email: "ada@example.com",
    amount: 30000,
    status: "Completed",
    created_at: "2026-06-10T10:20:00.000Z",
    date: "Jun 10, 2026",
  },
  {
    id: "1003",
    product: products[0],
    product_details: products[0],
    buyer: "Tunde Bello",
    buyer_email: "tunde@example.com",
    amount: 4500,
    status: "Completed",
    created_at: "2026-06-09T13:45:00.000Z",
    date: "Jun 9, 2026",
  },
  {
    id: "1002",
    product: products[2],
    product_details: products[2],
    buyer: "Maryam Yusuf",
    buyer_email: "maryam@example.com",
    amount: 15000,
    status: "Completed",
    created_at: "2026-06-07T08:10:00.000Z",
    date: "Jun 7, 2026",
  },
];

export const wallet = {
  available_balance: 245000,
  pending_balance: 38000,
  currency: "NGN",
};

export const withdrawals: MockWithdrawal[] = [
  {
    id: "2041",
    amount: 120000,
    status: "paid",
    created_at: "2026-06-05T09:00:00.000Z",
    requested_at: "2026-06-05T09:00:00.000Z",
    reference: "WD-2041",
    method: "Bank Transfer",
  },
  {
    id: "2017",
    amount: 85000,
    status: "paid",
    created_at: "2026-05-20T09:00:00.000Z",
    requested_at: "2026-05-20T09:00:00.000Z",
    reference: "WD-2017",
    method: "Bank Transfer",
  },
];

function clone<T>(value: T): T {
  return structuredClone(value);
}

function normalizeUrl(url: string) {
  return url.replace(/^https?:\/\/[^/]+\/api/, "").replace(/^\/api/, "");
}

function getProductId(url: string) {
  const match = normalizeUrl(url).match(/^\/catalog\/products\/([^/]+)\/?$/);
  return match?.[1];
}

function formValue(payload: FormData, key: string) {
  const value = payload.get(key);
  return typeof value === "string" ? value : undefined;
}

function patchProfile(payload: MockPayload) {
  if (payload instanceof FormData) {
    const username = formValue(payload, "profile.username");
    const bio = formValue(payload, "profile.bio");
    const website = formValue(payload, "profile.website");

    profile = {
      ...profile,
      profile: {
        ...profile.profile,
        ...(username ? { username } : {}),
        ...(bio != null ? { bio } : {}),
        ...(website ? { website } : {}),
      },
    };
    syncProductCreators();
    return;
  }

  const data = (payload ?? {}) as Record<string, unknown>;
  if (typeof data.password === "string") return;

  profile = {
    ...profile,
    profile: {
      ...profile.profile,
      ...(data["profile.bank_details"]
        ? { bank_details: data["profile.bank_details"] as typeof profile.profile.bank_details }
        : {}),
      ...(data["profile.notification_preferences"]
        ? {
            notification_preferences: data[
              "profile.notification_preferences"
            ] as typeof profile.profile.notification_preferences,
          }
        : {}),
    },
  };
  syncProductCreators();
}

function syncProductCreators() {
  products = products.map((product) => ({
    ...product,
    creator: profile.profile,
    creator_details: profile.profile,
  }));
}

export function dashboardData() {
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.amount), 0);
  return {
    total_revenue: totalRevenue,
    total_sales: orders.length,
    recent_orders: clone(orders),
    chart_data: [
      { name: "Jan", date: "2026-01-01", sales: 18000 },
      { name: "Feb", date: "2026-02-01", sales: 32000 },
      { name: "Mar", date: "2026-03-01", sales: 44000 },
      { name: "Apr", date: "2026-04-01", sales: 61000 },
      { name: "May", date: "2026-05-01", sales: 82000 },
      { name: "Jun", date: "2026-06-01", sales: totalRevenue },
      { name: "Jul", date: "2026-07-01", sales: 56000 },
    ],
  };
}
