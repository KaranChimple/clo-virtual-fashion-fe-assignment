import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders input with placeholder", () => {
    render(<SearchInput value="" onChange={() => {}} placeholder="Find..." />);
    expect(screen.getByPlaceholderText("Find...")).toBeInTheDocument();
  });

  it("shows the current value and updates on change", () => {
    const handleChange = jest.fn();
    render(<SearchInput value="hello" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("hello");
    fireEvent.change(input, { target: { value: "new query" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows a clear button when value is non-empty", () => {
    render(
      <SearchInput value="data" onChange={() => {}} onClear={jest.fn()} />
    );
    expect(
      screen.getByRole("button", { name: /clear search/i })
    ).toBeInTheDocument();
  });

  it("does NOT show clear button when value is empty", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(
      screen.queryByRole("button", { name: /clear search/i })
    ).not.toBeInTheDocument();
  });

  it("calls onClear handler when clear button is clicked", () => {
    const handleClear = jest.fn();
    render(
      <SearchInput value="word" onChange={() => {}} onClear={handleClear} />
    );
    const clearBtn = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalled();
  });

  it("passes other props to the input", () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
        name="custom-input"
        data-testid="searchbox"
        maxLength={25}
      />
    );
    const input = screen.getByTestId("searchbox");
    expect(input).toHaveAttribute("name", "custom-input");
    expect(input).toHaveAttribute("maxlength", "25");
  });
});
