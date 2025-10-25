import { create } from 'zustand';
import { ContentItem, FilterState, PricingOption, SortOption } from '../types';
import { contentApi } from '../api';
import { filterContent, sortContent } from '../utils/filters';

interface ContentState {
  allItems: ContentItem[];
  filteredItems: ContentItem[];
  displayedItems: ContentItem[];
  
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
  total: number;
  
  filters: FilterState;
  
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  fetchInitialContent: () => Promise<void>;
  fetchMoreContent: () => Promise<void>;
  applyFiltersAndSort: () => void;
  setKeyword: (keyword: string) => void;
  setPricing: (pricing: PricingOption[]) => void;
  setSortBy: (sortBy: SortOption) => void;
  setPriceRange: (range?: { min: number; max: number }) => void;
}

const initialFilters: FilterState = {
  pricing: [],
  keyword: '',
  priceRange: undefined,
  sortBy: SortOption.NEWEST,
};

export const useContentStore = create<ContentState>((set, get) => ({
  allItems: [],
  filteredItems: [],
  displayedItems: [],
  currentPage: 1,
  pageSize: 20,
  hasMore: true,
  total: 0,
  filters: initialFilters,
  isLoading: false,
  isLoadingMore: false,
  error: null,

  setFilters: (partialFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...partialFilters },
    }));
    get().applyFiltersAndSort();
  },

  resetFilters: () => {
    set({ filters: initialFilters });
    get().applyFiltersAndSort();
  },

  fetchInitialContent: async () => {
    set({ isLoading: true, error: null, currentPage: 1 });

    try {
      const { pageSize, filters } = get();

      const params = {
        page: 1,
        pageSize,
        pricing: filters.pricing.length > 0 ? filters.pricing : undefined,
        keyword: filters.keyword || undefined,
        minPrice: filters.priceRange?.min,
        maxPrice: filters.priceRange?.max,
        sortBy: filters.sortBy !== SortOption.NEWEST ? filters.sortBy : undefined,
      };

      const response = await contentApi.fetchContent(params);

      set({
        allItems: response.items,
        hasMore: response.hasMore,
        total: response.total,
        currentPage: response.page,
        isLoading: false,
      });

      get().applyFiltersAndSort();
    } catch (error) {
      console.error('Error fetching initial content:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch content',
        isLoading: false,
      });
    }
  },

  fetchMoreContent: async () => {
    const { isLoadingMore, hasMore, currentPage, pageSize, filters } = get();

    if (isLoadingMore || !hasMore) return;

    set({ isLoadingMore: true, error: null });

    try {
      const nextPage = currentPage + 1;

      const params = {
        page: nextPage,
        pageSize,
        pricing: filters.pricing.length > 0 ? filters.pricing : undefined,
        keyword: filters.keyword || undefined,
        minPrice: filters.priceRange?.min,
        maxPrice: filters.priceRange?.max,
        sortBy: filters.sortBy !== SortOption.NEWEST ? filters.sortBy : undefined,
      };

      const response = await contentApi.fetchContent(params);

      set((state) => ({
        allItems: [...state.allItems, ...response.items],
        currentPage: response.page,
        hasMore: response.hasMore,
        isLoadingMore: false,
      }));

      get().applyFiltersAndSort();
    } catch (error) {
      console.error('Error loading more content:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to load more content',
        isLoadingMore: false,
      });
    }
  },

  applyFiltersAndSort: () => {
    const { allItems, filters } = get();

    let filtered = filterContent(allItems, filters);

    filtered = sortContent(filtered, filters.sortBy);

    set({
      filteredItems: filtered,
      displayedItems: filtered,
    });
  },

  setKeyword: (keyword) => {
    get().setFilters({ keyword });
  },

  setPricing: (pricing) => {
    get().setFilters({ pricing });
  },

  setSortBy: (sortBy) => {
    get().setFilters({ sortBy });
  },

  setPriceRange: (priceRange) => {
    get().setFilters({ priceRange });
  },
}));
