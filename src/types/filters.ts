import { PricingOption } from './content';

export interface PriceRange {
  min: number;
  max: number;
}

export enum SortOption {
  NEWEST = 'newest',
  MOST_LIKED = 'most_liked',
  MOST_VIEWED = 'most_viewed',
  PRICE_LOW_HIGH = 'price_low_high',
  PRICE_HIGH_LOW = 'price_high_low'
}

export interface FilterState {
  pricing: PricingOption[];
  keyword: string;
  priceRange?: PriceRange;
  sortBy: SortOption;
}
