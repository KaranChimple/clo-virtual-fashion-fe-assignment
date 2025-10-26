import { PricingOption } from './content';

export interface PriceRange {
  min: number;
  max: number;
}

export enum SortOption {
  NAME = 'name',
  PRICE_LOW_HIGH = 'price_low_high',
  PRICE_HIGH_LOW = 'price_high_low',
}

export interface FilterState {
  pricing: PricingOption[];
  keyword: string;
  priceRange?: PriceRange;
  sortBy: SortOption;
}
