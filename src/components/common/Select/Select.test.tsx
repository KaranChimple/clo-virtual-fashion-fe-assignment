import { render, screen, fireEvent } from "@testing-library/react";
import { Select, SelectOption } from "./Select";

const options: SelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" },
  { value: "banana", label: "Banana" },
];

describe("Select", () => {
  it("renders the select and options", () => {
    render(<Select options={options} value="orange" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Orange" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
  });

  it("renders with provided label text", () => {
    render(
      <Select
        options={options}
        value="banana"
        onChange={() => {}}
        label="Select fruit"
      />
    );
    expect(screen.getByText("Select fruit")).toBeInTheDocument();
  });

  it("sets the selected value", () => {
    render(<Select options={options} value="banana" onChange={() => {}} />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("banana");
  });

  it("calls onChange with the new value when changed", () => {
    const handleChange = jest.fn();
    render(<Select options={options} value="banana" onChange={handleChange} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "apple" } });
    expect(handleChange).toHaveBeenCalledWith("apple");
  });

  it("applies the custom className to the outer div", () => {
    render(
      <Select
        options={options}
        value="apple"
        onChange={() => {}}
        className="custom-select"
      />
    );
    expect(screen.getByTestId("select-wrapper")).toHaveClass("custom-select");
  });
});
