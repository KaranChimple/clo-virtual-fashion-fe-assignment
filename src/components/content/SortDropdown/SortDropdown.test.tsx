import { render, screen } from "@testing-library/react";
import { SortDropdown } from "./SortDropdown";
import { SortOption } from "types";

describe("SortDropdown", () => {
  const defaultProps = {
    value: SortOption.NAME,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all options correctly", () => {
    render(<SortDropdown {...defaultProps} />);
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(3);
    expect(
      screen.getByRole("option", { name: /item name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /higher price/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: /lower price/i })
    ).toBeInTheDocument();
  });
});
