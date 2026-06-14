export interface UserProfile {
  id: string | number;
  username: string;
  avatar?: string;
  bio?: string;
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
  is_published?: boolean;
  creator?: UserProfile;
  creator_details?: UserProfile; // Some API responses might return this
  category?: Category;
  created_at?: string;
  sales?: number;
}

export interface Order {
  id: string | number;
  product: Product | string | number;
  buyer: string | UserProfile;
  amount: number | string;
  status: string;
  created_at: string;
  product_details?: Product;
}

export interface Transaction {
  id: string | number;
  amount: number | string;
  status: string;
  created_at: string;
  reference?: string;
}

export interface APIError {
  response?: {
    data?: {
      detail?: string;
      [key: string]: unknown; // Allow other specific field errors
    };
  };
  message?: string;
}
