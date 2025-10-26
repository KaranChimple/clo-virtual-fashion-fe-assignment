import { filterContent, sortContent } from "./filters";
import { ContentItem, FilterState, SortOption, PricingOption } from "types";

describe("filterContent", () => {
    const items: ContentItem[] = [
        {
            id: "1",
            title: "Alpha",
            creator: "Alice",
            price: 100,
            pricingOption: PricingOption.PAID,
            imagePath: "img1",
        },
        {
            id: "2",
            title: "Beta",
            creator: "Bob",
            price: 50,
            pricingOption: PricingOption.FREE,
            imagePath: "img2",
        },
        {
            id: "3",
            title: "Gamma",
            creator: "Alice",
            price: 75,
            pricingOption: PricingOption.PAID,
            imagePath: "img3",
        },
    ];

    it("returns empty array if input is not array", () => {
        //@ts-ignore
        expect(filterContent(null, {})).toEqual([]);
    });

    it("filters by pricing option", () => {
        const filters: FilterState = { pricing: [PricingOption.PAID], keyword: "", priceRange: undefined, sortBy: SortOption.NAME };
        const result = filterContent(items, filters);
        expect(result.every(item => item.pricingOption === PricingOption.PAID)).toBe(true);
        expect(result.length).toBe(2);
    });

    it("filters by price range", () => {
        const filters: FilterState = { pricing: [], keyword: "", priceRange: { min: 60, max: 90 }, sortBy: SortOption.NAME };
        const result = filterContent(items, filters);
        expect(result.every(item => item.price >= 60 && item.price <= 90)).toBe(true);
        expect(result.length).toBe(1);
    });

    it("filters by keyword matching title or creator", () => {
        const filters: FilterState = { pricing: [], keyword: "alice", priceRange: undefined, sortBy: SortOption.NAME };
        const result = filterContent(items, filters);
        expect(result.length).toBe(2);
        expect(result[0].creator.toLowerCase()).toContain("alice");
    });

    it("returns all if no filters applied", () => {
        const filters: FilterState = { pricing: [], keyword: "", priceRange: undefined, sortBy: SortOption.NAME };
        const result = filterContent(items, filters);
        expect(result.length).toBe(items.length);
    });
});

describe("sortContent", () => {
    const items: ContentItem[] = [
        {
            id: "1",
            title: "Alpha",
            creator: "Alice",
            price: 100,
            pricingOption: PricingOption.PAID,
            imagePath: "img1",
        },
        {
            id: "2",
            title: "Beta",
            creator: "Bob",
            price: 50,
            pricingOption: PricingOption.FREE,
            imagePath: "img2",
        },
        {
            id: "3",
            title: "Gamma",
            creator: "Alice",
            price: 75,
            pricingOption: PricingOption.PAID,
            imagePath: "img3",
        },
    ];

    it("sorts by name ascending", () => {
        const result = sortContent(items, SortOption.NAME);
        expect(result[0].title).toBe("Alpha");
        expect(result[1].title).toBe("Beta");
        expect(result[2].title).toBe("Gamma");
    });

    it("sorts by price low to high", () => {
        const result = sortContent(items, SortOption.PRICE_LOW_HIGH);
        expect(result[0].price).toBe(50);
        expect(result[1].price).toBe(75);
        expect(result[2].price).toBe(100);
    });

    it("sorts by price high to low", () => {
        const result = sortContent(items, SortOption.PRICE_HIGH_LOW);
        expect(result[0].price).toBe(100);
        expect(result[1].price).toBe(75);
        expect(result[2].price).toBe(50);
    });

    it("returns unsorted if unknown sort option", () => {
        const result = sortContent(items, "unknown" as SortOption);
        expect(result.length).toBe(items.length);
    });
});
