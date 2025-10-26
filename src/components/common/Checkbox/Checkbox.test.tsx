import { render, screen, fireEvent } from "@testing-library/react";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  const testId = "test-checkbox";
  const label = "I agree";

  it("renders the checkbox and label", () => {
    render(<Checkbox id={testId} label={label} />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("label is linked to the checkbox", () => {
    render(<Checkbox id={testId} label={label} />);
    expect(screen.getByLabelText(label)).toHaveAttribute("id", testId);
  });

  it("is unchecked by default, can be checked by user", () => {
    render(<Checkbox id={testId} label={label} />);
    const input = screen.getByRole("checkbox");
    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });

  it("is checked if checked prop + onChange passed (controlled)", () => {
    render(
      <Checkbox id={testId} label={label} checked={true} onChange={() => {}} />
    );
    const input = screen.getByRole("checkbox");
    expect(input).toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    render(<Checkbox id={testId} label={label} onChange={handleChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Checkbox id={testId} label={label} disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("applies custom className to the outer wrapper", () => {
    render(<Checkbox id={testId} label={label} className="foo-bar" />);
    expect(screen.getByTestId("checkbox-wrapper")).toHaveClass("foo-bar");
  });
});
