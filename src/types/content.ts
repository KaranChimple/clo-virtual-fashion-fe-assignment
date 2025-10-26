export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2
}

export interface ContentItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  imagePath: string;
  price: number;
}

export interface ContentResponse {
  items: ContentItem[];
  length: number;
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
