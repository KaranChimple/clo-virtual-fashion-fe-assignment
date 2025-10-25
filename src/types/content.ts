export enum PricingOption {
  PAID = 'PAID',
  FREE = 'FREE',
  VIEW_ONLY = 'VIEW_ONLY'
}

export interface ContentItem {
  id: string;
  title: string;
  userName: string;
  userAvatar?: string;
  thumbnail: string;
  pricingOption: PricingOption;
  price?: string;
  currency?: string;
  likes?: number;
  views?: number;
  createdAt: string;
  tags?: string[];
  description?: string;
}

export interface ContentResponse {
  items: ContentItem[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface FetchContentParams {
  page: number;
  pageSize: number;
  pricing?: PricingOption[];
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}
