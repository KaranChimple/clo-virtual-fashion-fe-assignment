import React, { useState, useEffect } from "react";
import { FilterState, PricingOption, SortOption } from "types";
import { SearchInput } from "components/common/SearchInput";
import { Checkbox } from "components/common/Checkbox";
import { Slider } from "components/common/Slider";
import { Button } from "components/common/Button";
import { useDebounce } from "hooks";
import { PRICING_OPTIONS, PRICE_RANGE } from "utils/constants";
import styles from "./ContentFilters.module.css";
import { useContentStore } from "store";

export interface ContentFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  resultCount?: number;
  isLoading?: boolean;
}

export const ContentFilters: React.FC<ContentFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset,
  resultCount,
  isLoading = false,
}) => {
  const [localKeyword, setLocalKeyword] = useState(filters.keyword);
  const debouncedKeyword = useDebounce(localKeyword, 500);
  const maxPrice = useContentStore((state) => state.maxPrice);
  const paidSelected = filters?.pricing?.includes(PricingOption.PAID);

  useEffect(() => {
    setLocalKeyword(filters.keyword);
  }, [filters.keyword]);

  useEffect(() => {
    if (debouncedKeyword !== filters.keyword) {
      onFiltersChange({ keyword: debouncedKeyword });
    }
  }, [debouncedKeyword, filters.keyword, onFiltersChange]);

  useEffect(() => {
    if (paidSelected && !filters.priceRange) {
      onFiltersChange({
        priceRange: {
          min: PRICE_RANGE.min || 0,
          max: maxPrice || 999,
        },
      });
    }
    if (!paidSelected && filters.priceRange) {
      onFiltersChange({ priceRange: undefined });
    }
  }, [paidSelected, filters.priceRange, maxPrice, onFiltersChange]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalKeyword(e.target.value);
  };

  const handleKeywordClear = () => {
    setLocalKeyword("");
  };

  const handlePricingChange = (option: PricingOption, checked: boolean) => {
    const newPricing = checked
      ? [...filters.pricing, option]
      : filters.pricing.filter((p) => p !== option);
    onFiltersChange({ pricing: newPricing });
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    onFiltersChange({ priceRange: range });
  };

  const onResetClick = () => {
    handleKeywordClear();
    onReset();
  };

  const hasActiveFilters =
    filters.pricing.length > 0 ||
    filters.keyword !== "" ||
    filters.priceRange !== undefined ||
    filters.sortBy !== SortOption.NAME;

  return (
    <div className={styles.filters}>
      <div className={styles.filters__section}>
        <SearchInput
          value={localKeyword}
          onChange={handleKeywordChange}
          onClear={handleKeywordClear}
          placeholder="Search by title or designer..."
          disabled={isLoading}
        />
      </div>

      <div className={styles.inlineRow}>
        <span className={styles.inlineLabel}>Pricing Options</span>
        <div className={styles.options}>
          {PRICING_OPTIONS.map((option) => (
            <Checkbox
              key={String(option.value)}
              id={`pricing-${option.value}`}
              label={option.label}
              checked={filters.pricing.includes(option.value)}
              onChange={(e) =>
                handlePricingChange(option.value, e.target.checked)
              }
              disabled={isLoading}
            />
          ))}
        </div>

        {paidSelected && (
          <div className={styles.priceRangeToggle}>
            {filters.priceRange && (
              <Slider
                min={PRICE_RANGE.min || 0}
                max={maxPrice || 999}
                value={filters.priceRange}
                onChange={handlePriceRangeChange}
                step={10}
                formatValue={(val) => `$${val}`}
                disabled={!paidSelected || isLoading}
              />
            )}
          </div>
        )}

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetClick}
            disabled={isLoading}
            className={styles.resetButton}
          >
            Reset Filters
          </Button>
        )}
      </div>

      <div className={styles.filters__footer}>
        {resultCount !== undefined && (
          <p className={styles.filters__count}>
            {isLoading ? "Loading..." : `${resultCount} items found`}
          </p>
        )}
      </div>
    </div>
  );
};
