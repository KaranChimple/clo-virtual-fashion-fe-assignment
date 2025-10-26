import { render, screen, fireEvent } from "@testing-library/react";
import { ContentCard } from "./ContentCard";
import { PricingOption } from "types";

const baseItem = {
  id: "123",
  title: "Test Product",
  creator: "Test Creator",
  imagePath: "/test.jpg",
  pricingOption: PricingOption.PAID,
  price: 200,
};

describe("ContentCard", () => {
  it("renders title, creator, image, and paid price correctly", () => {
    render(<ContentCard item={baseItem} />);

    expect(screen.getByText(baseItem.title)).toBeInTheDocument();
    expect(screen.getByText(baseItem.creator)).toBeInTheDocument();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", baseItem.imagePath);
    expect(img).toHaveAttribute("alt", baseItem.title);
    expect(
      screen.getByText(`$${baseItem.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("renders FREE if pricingOption is FREE", () => {
    render(
      <ContentCard item={{ ...baseItem, pricingOption: PricingOption.FREE }} />
    );
    expect(screen.getByText("FREE")).toBeInTheDocument();
  });

  it("renders VIEW ONLY if pricingOption is VIEW_ONLY", () => {
    render(
      <ContentCard
        item={{ ...baseItem, pricingOption: PricingOption.VIEW_ONLY }}
      />
    );
    expect(screen.getByText("VIEW ONLY")).toBeInTheDocument();
  });

  it("renders price as em dash if price is not a number", () => {
    render(<ContentCard item={{ ...baseItem, price: undefined as any }} />);
    expect(
      screen.getByText((content) => content.includes("—"))
    ).toBeInTheDocument();
  });

  it("triggers onClick callback with item when card is clicked", () => {
    const handleClick = jest.fn();
    render(<ContentCard item={baseItem} onClick={handleClick} />);
    const card = screen.getByRole("button");
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledWith(baseItem);
  });

  it("has role button and tabIndex when onClick is provided", () => {
    render(<ContentCard item={baseItem} onClick={() => {}} />);
    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("tabindex", "0");
  });

  it("does not have role button or tabIndex when onClick is not provided", () => {
    render(<ContentCard item={baseItem} />);
    const card = screen.getByRole("article");
    expect(card).not.toHaveAttribute("tabindex");
    expect(card).not.toHaveAttribute("role", "button");
  });
});
