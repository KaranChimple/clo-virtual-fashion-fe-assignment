import { ContentItem, FilterState, SortOption } from 'types';

export const filterContent = (
  items: ContentItem[],
  filters: FilterState
): ContentItem[] => {
  if (!Array.isArray(items)) return [];
  return items.filter(item => {
    if (filters.pricing.length > 0 && !filters.pricing.includes(item.pricingOption)) {
      return false;
    }
    if (filters.priceRange) {
      if (typeof item.price !== "number") return false;
      if (item.price < filters.priceRange.min || item.price > filters.priceRange.max) {
        return false;
      }
    }
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      return item.title.toLowerCase().includes(keyword) ||
        item.creator.toLowerCase().includes(keyword);
    }
    return true;
  });
};

export const sortContent = (
  items: ContentItem[],
  sortBy: SortOption
): ContentItem[] => {
  const sorted = [...items];
  switch (sortBy) {
    case SortOption.NAME:
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case SortOption.PRICE_LOW_HIGH:
      return sorted.sort((a, b) => a.price - b.price);
    case SortOption.PRICE_HIGH_LOW:
      return sorted.sort((a, b) => b.price - a.price);
    default:
      return sorted;
  }
};
