import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { FilterState, PricingOption, SortOption } from 'types';

export const useURLSync = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const updateURL = useCallback((filters: FilterState) => {
    const query = queryString.stringify(
      {
        keyword: filters.keyword || undefined,
        pricing: filters.pricing.length > 0 ? filters.pricing.join(',') : undefined,
        sortBy: filters.sortBy !== SortOption.NAME ? filters.sortBy : undefined,
        minPrice: filters.priceRange?.min,
        maxPrice: filters.priceRange?.max,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    const newUrl = query ? `?${query}` : location.pathname;
    navigate(newUrl, { replace: true });
  }, [navigate, location.pathname]);

  const getFiltersFromURL = useCallback((): FilterState => {
    const parsed = queryString.parse(location.search);

    let pricing: PricingOption[] = [];
    if (parsed.pricing && typeof parsed.pricing === 'string') {
      pricing = parsed.pricing
        .split(',')
        .map(p => parseInt(p, 10))
        .filter(p => Object.values(PricingOption).includes(p as PricingOption));
    }

    let priceRange = undefined;
    if (parsed.minPrice && parsed.maxPrice) {
      const min = parseFloat(parsed.minPrice as string);
      const max = parseFloat(parsed.maxPrice as string);
      if (!isNaN(min) && !isNaN(max)) {
        priceRange = { min, max };
      }
    }

    let sortBy = SortOption.NAME;
    if (
      parsed.sortBy &&
      Object.values(SortOption).includes(parsed.sortBy as SortOption)
    ) {
      sortBy = parsed.sortBy as SortOption;
    }

    const keyword = (parsed.keyword as string) || '';

    return {
      pricing,
      keyword,
      priceRange,
      sortBy,
    };
  }, [location.search]);

  return { updateURL, getFiltersFromURL };
};
