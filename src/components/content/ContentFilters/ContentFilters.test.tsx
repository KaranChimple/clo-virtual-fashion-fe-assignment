import { render, screen, fireEvent } from "@testing-library/react";
import { ContentFilters } from "./ContentFilters";
import { PricingOption, SortOption } from "types";

jest.mock("hooks", () => ({
  useDebounce: (value: string) => value,
}));

const PRICE_RANGE = { min: 0, max: 999 };

describe("ContentFilters", () => {
  const defaultProps = {
    filters: {
      pricing: [],
      keyword: "",
      priceRange: undefined,
      sortBy: SortOption.NAME,
    },
    onFiltersChange: jest.fn(),
    onReset: jest.fn(),
    resultCount: 10,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders slider when Paid is selected and priceRange exists", () => {
    render(
      <ContentFilters
        {...defaultProps}
        filters={{
          ...defaultProps.filters,
          pricing: [PricingOption.PAID],
          priceRange: { min: 10, max: 100 },
        }}
      />
    );

    const minValues = screen.getAllByText(/\$10/);
    const maxValues = screen.getAllByText(/\$100/);

    expect(minValues.length).toBeGreaterThan(0);
    expect(maxValues.length).toBeGreaterThan(0);
  });

  it("auto sets priceRange when Paid is selected but priceRange undefined", () => {
    render(
      <ContentFilters
        {...defaultProps}
        filters={{
          ...defaultProps.filters,
          pricing: [PricingOption.PAID],
          priceRange: undefined,
        }}
      />
    );

    expect(defaultProps.onFiltersChange).toHaveBeenCalledWith({
      priceRange: {
        min: PRICE_RANGE.min,
        max: PRICE_RANGE.max,
      },
    });
  });

  it("calls onFiltersChange when slider changes priceRange", () => {
    const onFiltersChange = jest.fn();

    render(
      <ContentFilters
        {...defaultProps}
        filters={{
          ...defaultProps.filters,
          pricing: [PricingOption.PAID],
          priceRange: { min: 10, max: 100 },
        }}
        onFiltersChange={onFiltersChange}
      />
    );

    const sliderTrack = screen.getByTestId("slider-track");
    fireEvent.click(sliderTrack, { clientX: 50 });

    expect(onFiltersChange).toHaveBeenCalled();
  });
});
