import { create } from 'zustand';
import { ContentItem, FilterState, SortOption } from 'types';
import { contentApi } from 'api';
import { filterContent, sortContent } from 'utils/filters';

interface ContentState {
  allItems: ContentItem[];
  filteredItems: ContentItem[];
  shownItems: ContentItem[];
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
  pageSize: number;
  displayCount: number;
  hasMore: boolean;
  maxPrice: number;

  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  fetchAllContent: () => Promise<void>;
  showMore: () => void;
  applyFiltersAndSort: () => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  allItems: [],
  filteredItems: [],
  shownItems: [],
  filters: {
    pricing: [],
    keyword: '',
    priceRange: undefined,
    sortBy: SortOption.NAME,
  },
  isLoading: false,
  error: null,
  pageSize: 20,
  displayCount: 20,
  hasMore: true,

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
      displayCount: state.pageSize
    }));
    get().applyFiltersAndSort();
  },

  maxPrice: 999,

  resetFilters: () => {
    set({
      filters: {
        pricing: [],
        keyword: '',
        priceRange: undefined,
        sortBy: SortOption.NAME,
      },
      displayCount: 20,
    });
    get().applyFiltersAndSort();
  },

  fetchAllContent: async () => {
    set({ isLoading: true, error: null });
    try {
      const items = await contentApi.fetchContent();
      const prices = items.map(item => item.price);
      const maxPrice = prices.length > 0 ? Math.max(...prices) : 999;
      set({
        allItems: items,
        isLoading: false,
        displayCount: 20,
        maxPrice,
        filters: {
          ...get().filters,
          priceRange: { min: 0, max: maxPrice },
        },
      });

      get().applyFiltersAndSort();
    } catch {
      set({ error: "Failed to fetch content", isLoading: false, allItems: [], filteredItems: [], shownItems: [] });
    }
  },

  showMore: () => {
    const { displayCount, pageSize, filteredItems } = get();
    const newDisplayCount = Math.min(displayCount + pageSize, filteredItems.length);
    set({
      displayCount: newDisplayCount,
      shownItems: filteredItems.slice(0, newDisplayCount),
      hasMore: newDisplayCount < filteredItems.length
    });
  },

  applyFiltersAndSort: () => {
    const { allItems, filters, displayCount } = get();
    let filtered = filterContent(allItems, filters);
    filtered = sortContent(filtered, filters.sortBy);
    set({
      filteredItems: filtered,
      shownItems: filtered.slice(0, displayCount),
      hasMore: displayCount < filtered.length,
    });
  },
}));
