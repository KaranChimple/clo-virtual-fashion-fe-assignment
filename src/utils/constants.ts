import { PricingOption, SortOption } from 'types';

export const SORT_OPTIONS = [
  { value: SortOption.NAME, label: 'Item Name' },
  { value: SortOption.PRICE_HIGH_LOW, label: 'Higher Price' },
  { value: SortOption.PRICE_LOW_HIGH, label: 'Lower Price' }
];

export const PRICING_OPTIONS = [
  { value: PricingOption.PAID, label: "Paid" },
  { value: PricingOption.FREE, label: "Free" },
  { value: PricingOption.VIEW_ONLY, label: "View Only" }
];

export const DEFAULT_PAGE_SIZE = 20;
export const DEBOUNCE_DELAY = 500;
export const PRICE_RANGE = { min: 0, max: 999 };
