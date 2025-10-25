import { SortOption } from 'types';

export const SORT_OPTIONS = [
  { value: SortOption.NEWEST, label: 'Newest' },
  { value: SortOption.MOST_LIKED, label: 'Most Liked' },
  { value: SortOption.MOST_VIEWED, label: 'Most Viewed' },
  { value: SortOption.PRICE_LOW_HIGH, label: 'Price: Low to High' },
  { value: SortOption.PRICE_HIGH_LOW, label: 'Price: High to Low' },
];

export const PRICING_OPTIONS = [
  { value: 'PAID', label: 'Paid' },
  { value: 'FREE', label: 'Free' },
  { value: 'VIEW_ONLY', label: 'View Only' },
];

export const DEFAULT_PAGE_SIZE = 20;
export const DEBOUNCE_DELAY = 500;
export const PRICE_RANGE = { min: 0, max: 1000 };
