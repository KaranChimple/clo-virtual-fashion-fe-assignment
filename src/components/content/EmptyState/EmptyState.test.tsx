import { render, screen, fireEvent } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders default title and message when none provided", () => {
    render(<EmptyState />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your filters or search terms")
    ).toBeInTheDocument();
  });

  it("renders provided title and message", () => {
    render(<EmptyState title="Custom Title" message="Custom message here" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom message here")).toBeInTheDocument();
  });

  it("renders default SVG icon when no icon prop passed", () => {
    render(<EmptyState />);
    expect(screen.getByTestId("default-svg-icon")).toBeInTheDocument();
  });

  it("renders custom icon when icon prop is passed", () => {
    render(
      <EmptyState icon={<div data-testid="custom-icon">Custom Icon</div>} />
    );
    expect(screen.queryByRole("img", { hidden: true })).not.toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders action button and calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    render(<EmptyState action={{ label: "Retry", onClick: onClickMock }} />);
    const button = screen.getByRole("button", { name: "Retry" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("does not render action button if action prop not provided", () => {
    render(<EmptyState />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
