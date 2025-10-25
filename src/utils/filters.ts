import { ContentItem, FilterState, PricingOption, SortOption } from 'types';

export const filterContent = (
  items: ContentItem[],
  filters: FilterState
): ContentItem[] => {
  return items.filter(item => {
    if (filters.pricing.length > 0 && 
        !filters.pricing.includes(item.pricingOption)) {
      return false;
    }

    if (filters.priceRange && item.pricingOption === PricingOption.PAID) {
      if (!item.price) {
        return false; 
      }
      
      const price = parseFloat(item.price);
      
      if (isNaN(price)) {
        return false;
      }
      
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false;
      }
    }

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      return (
        item.title.toLowerCase().includes(keyword) ||
        item.userName.toLowerCase().includes(keyword)
      );
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
    case SortOption.NEWEST:
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
    case SortOption.MOST_LIKED:
      return sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      
    case SortOption.MOST_VIEWED:
      return sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
      
    case SortOption.PRICE_LOW_HIGH:
      return sorted.sort((a, b) => {
        const priceA = a.price ? parseFloat(a.price) : Infinity;
        const priceB = b.price ? parseFloat(b.price) : Infinity;
        return priceA - priceB;
      });
      
    case SortOption.PRICE_HIGH_LOW:
      return sorted.sort((a, b) => {
        const priceA = a.price ? parseFloat(a.price) : -Infinity;
        const priceB = b.price ? parseFloat(b.price) : -Infinity;
        return priceB - priceA;
      });
      
    default:
      return sorted;
  }
};
