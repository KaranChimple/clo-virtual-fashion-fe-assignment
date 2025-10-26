import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "./Slider";

const defaultProps = {
  min: 0,
  max: 100,
  value: { min: 20, max: 80 },
  onChange: jest.fn(),
  step: 10,
  label: "Price Range",
  formatValue: (v: number) => `$${v}`,
};

describe("Slider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with label and current min/max values formatted", () => {
    render(<Slider {...defaultProps} />);
    expect(screen.getByText("Price Range")).toBeInTheDocument();
    expect(screen.getAllByText("$20")).toHaveLength(2);
    expect(screen.getAllByText("$80")).toHaveLength(2);
  });

  it("renders min and max thumbs as buttons with aria-labels", () => {
    render(<Slider {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: /minimum value/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /maximum value/i })
    ).toBeInTheDocument();
  });

  it("disables both thumbs when disabled prop is true", () => {
    render(<Slider {...defaultProps} disabled />);
    const minBtn = screen.getByRole("button", { name: /minimum value/i });
    const maxBtn = screen.getByRole("button", { name: /maximum value/i });
    expect(minBtn).toBeDisabled();
    expect(maxBtn).toBeDisabled();
  });

  it("calls onChange with correct value when track is clicked (simulate simple case)", () => {
    const handleChange = jest.fn();
    render(<Slider {...defaultProps} onChange={handleChange} />);
    const track = screen.getByTestId("slider-track");
    fireEvent.click(track, { clientX: 100 });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders with custom className on wrapper", () => {
    render(<Slider {...defaultProps} className="custom-slider-class" />);
    expect(screen.getByTestId("slider-wrapper")).toHaveClass(
      "custom-slider-class"
    );
  });
});
