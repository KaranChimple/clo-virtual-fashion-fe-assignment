export enum PricingOption {
  PAID = 'PAID',
  FREE = 'FREE',
  VIEW_ONLY = 'VIEW_ONLY'
}

export interface ContentItem {
  id: string;
  title: string;
  userName: string;
  thumbnail: string;
  pricingOption: PricingOption;
  price?: string;
  currency?: string;
  likes?: number;
  views?: number;
  createdAt: string;
}

export interface ContentResponse {
  items: ContentItem[];
  total: number;
  page: number;
  hasMore: boolean;
}
