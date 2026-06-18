export interface UserProfile {
  id: string | number;
  username: string;
  avatar?: string;
  avatar_url?: string | null;
  bio?: string;
  // Personal details
  first_name?: string;
  last_name?: string;
  gender?: string;
  dob?: string;
  phone?: string;
  creator_type?: string;
  // Socials
  twitter?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  linkedin?: string;
  youtube?: string;
  // Bank / payouts
  bank_details?: {
    method?: string;
    account_name?: string;
    account_number?: string;
    bank_name?: string;
  };
  notification_preferences?: Record<string, boolean>;
}

export interface User {
  id: string | number;
  email: string;
  profile?: UserProfile;
}

export interface Category {
  id: string | number;
  name: string;
  slug: string;
  icon?: string;
}

export interface Product {
  id: string | number;
  title: string;
  slug: string;
  description?: string;
  price: number | string;
  currency?: string;
  cover_image?: string;
  file_url?: string;
  digital_file?: string;
  is_published?: boolean;
  creator?: UserProfile;
  creator_details?: UserProfile;
  category?: Category;
  created_at?: string;
  sales?: number;
  product_type?: string;
  type?: string;
  rating?: number;
  sales_count?: number;
  tint?: string;
  features?: string[];
}

export interface Order {
  id: string | number;
  product: Product | string | number;
  buyer: string | UserProfile;
  buyer_email?: string;
  amount: number | string;
  status: string;
  created_at: string;
  date?: string;
  product_details?: Product;
}

export interface Transaction {
  id: string | number;
  amount: number | string;
  status: string;
  created_at: string;
  requested_at?: string;
  reference?: string;
  method?: string;
}

export interface APIError {
  response?: {
    data?: {
      detail?: string;
      [key: string]: any; // Allow other specific field errors
    };
  };
  message?: string;
}
