import { render, screen, fireEvent } from "@testing-library/react";
import { ContentGrid } from "./ContentGrid";
import { PricingOption } from "types";

jest.mock("components/content/ContentCard", () => {
  return {
    ContentCard: ({ item, onClick }: any) => (
      <div data-testid="content-card" onClick={() => onClick && onClick(item)}>
        {item.title}
      </div>
    ),
    ContentCardSkeleton: () => <div data-testid="content-card-skeleton" />,
  };
});

describe("ContentGrid", () => {
  const items = [
    {
      id: "1",
      title: "Item 1",
      creator: "Creator A",
      imagePath: "",
      pricingOption: PricingOption.PAID,
      price: 10,
    },
    {
      id: "2",
      title: "Item 2",
      creator: "Creator B",
      imagePath: "",
      pricingOption: PricingOption.FREE,
      price: 0,
    },
  ];

  it("renders skeletons when loading and no items", () => {
    render(<ContentGrid items={[]} isLoading skeletonCount={3} />);
    const skeletons = screen.getAllByTestId("content-card-skeleton");
    expect(skeletons).toHaveLength(3);
  });

  it("renders content cards when not loading", () => {
    render(<ContentGrid items={items} isLoading={false} />);
    const cards = screen.getAllByTestId("content-card");
    expect(cards).toHaveLength(items.length);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("calls onItemClick when a card is clicked", () => {
    const handleClick = jest.fn();
    render(<ContentGrid items={items} onItemClick={handleClick} />);
    const firstCard = screen.getByText("Item 1");
    fireEvent.click(firstCard);
    expect(handleClick).toHaveBeenCalledWith(items[0]);
  });
});
