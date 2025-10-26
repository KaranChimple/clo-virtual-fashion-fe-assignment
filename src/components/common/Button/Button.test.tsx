import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies primary styles by default", () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("btn--primary");
  });

  it("applies secondary and outline variants", () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button").className).toContain("btn--secondary");

    render(<Button variant="outline">Outline</Button>);
    const btns = screen.getAllByRole("button");
    expect(btns[btns.length - 1].className).toContain("btn--outline");
  });

  it("applies the correct size", () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button").className).toContain("btn--sm");

    render(<Button size="lg">Large</Button>);
    const btns = screen.getAllByRole("button");
    expect(btns[btns.length - 1].className).toContain("btn--lg");
  });

  it("applies full width class when fullWidth is true", () => {
    render(<Button fullWidth>Full</Button>);
    expect(screen.getByRole("button").className).toContain("btn--full-width");
  });

  it("passes through additional className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button").className).toContain("custom-class");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick handler when clicked (if not disabled)", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Fire</Button>);
    fireEvent.click(screen.getByText("Fire"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("does not call onClick handler when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Fire
      </Button>
    );
    fireEvent.click(screen.getByText("Fire"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
