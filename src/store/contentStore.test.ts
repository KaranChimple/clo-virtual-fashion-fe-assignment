import { act } from "@testing-library/react";
import { useContentStore } from "./contentStore";
import { contentApi } from "api";
import { SortOption } from "types";

jest.mock("api", () => ({
    contentApi: {
        fetchContent: jest.fn(),
    },
}));

describe("contentStore", () => {
    const fetchContentMock = contentApi.fetchContent as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        act(() => {
            useContentStore.setState({
                allItems: [],
                filteredItems: [],
                shownItems: [],
                filters: {
                    pricing: [],
                    keyword: "",
                    priceRange: undefined,
                    sortBy: SortOption.NAME,
                },
                isLoading: false,
                error: null,
                pageSize: 20,
                displayCount: 20,
                hasMore: true,
                maxPrice: 999,
            });
        });
    });

    it("fetchAllContent handles fetch error", async () => {
        fetchContentMock.mockRejectedValueOnce(new Error("Network failure"));

        await act(async () => {
            await useContentStore.getState().fetchAllContent();
        });

        const state = useContentStore.getState();

        expect(state.error).toBe("Failed to fetch content");
        expect(state.isLoading).toBe(false);
        expect(state.allItems).toEqual([]);
        expect(state.filteredItems).toEqual([]);
        expect(state.shownItems).toEqual([]);
    });

    it("setFilters updates filters and resets displayCount", () => {
        act(() => {
            useContentStore.getState().setFilters({ keyword: "abc" });
        });

        const { filters, displayCount } = useContentStore.getState();
        expect(filters.keyword).toBe("abc");
        expect(displayCount).toBe(20);
    });

    it("resetFilters resets filters and displayCount", () => {
        act(() => {
            useContentStore.getState().resetFilters();
        });

        const { filters, displayCount } = useContentStore.getState();
        expect(filters.keyword).toBe("");
        expect(filters.pricing).toEqual([]);
        expect(displayCount).toBe(20);
    });

    it("showMore increases displayCount and properly slices shownItems", () => {
        const items = new Array(50).fill(null).map((_, i) => ({
            id: `${i}`,
            price: i,
            creator: `creator${i}`,
            title: `title${i}`,
            pricingOption: 0, // Adjust to appropriate PricingOption enum value
            imagePath: `image${i}.jpg`,
        }));

        act(() => {
            useContentStore.setState({
                filteredItems: items,
                displayCount: 20,
                pageSize: 20,
            });
        });

        act(() => {
            useContentStore.getState().showMore();
        });

        let state = useContentStore.getState();
        expect(state.displayCount).toBe(40);
        expect(state.shownItems.length).toBe(40);
        expect(state.hasMore).toBe(true);

        act(() => {
            useContentStore.getState().showMore();
        });
        state = useContentStore.getState();
        expect(state.displayCount).toBe(50);
        expect(state.hasMore).toBe(false);
    });

    it("applyFiltersAndSort applies filtering and sorting correctly", () => {
        const items = [
            {
                id: "a",
                price: 30,
                title: "C",
                creator: "creatorA",
                pricingOption: 0,
                imagePath: "imageA.jpg",
            },
            {
                id: "b",
                price: 10,
                title: "A",
                creator: "creatorB",
                pricingOption: 0,
                imagePath: "imageB.jpg",
            },
            {
                id: "c",
                price: 20,
                title: "B",
                creator: "creatorC",
                pricingOption: 0,
                imagePath: "imageC.jpg",
            },
        ];

        act(() => {
            useContentStore.setState({
                allItems: items,
                filters: {
                    pricing: [],
                    keyword: "",
                    priceRange: undefined,
                    sortBy: SortOption.NAME,
                },
                displayCount: 2,
            });
        });

        act(() => {
            useContentStore.getState().applyFiltersAndSort();
        });

        const state = useContentStore.getState();

        expect(state.filteredItems.length).toBe(3);
        expect(state.shownItems.length).toBe(2);
        expect(state.shownItems[0].title).toBe("A");
        expect(state.hasMore).toBe(true);
    });

});
