import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button Component", () => {
  it("renders with primary variant by default", () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-[#10b981]");
  });

  it("renders with secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: /secondary/i });
    expect(button).toHaveClass("border");
    expect(button).toHaveClass("text-[#10b981]");
  });

  it("renders with ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button", { name: /ghost/i });
    expect(button).toHaveClass("text-[#a1a1aa]");
  });

  it("renders with destructive variant", () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByRole("button", { name: /destructive/i });
    expect(button).toHaveClass("bg-[#ef4444]");
  });

  it("renders small size", () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole("button", { name: /small/i });
    expect(button).toHaveClass("h-8");
  });

  it("renders medium size by default", () => {
    render(<Button>Medium</Button>);
    const button = screen.getByRole("button", { name: /medium/i });
    expect(button).toHaveClass("h-10");
  });

  it("renders large size", () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole("button", { name: /large/i });
    expect(button).toHaveClass("h-12");
  });

  it("renders icon button", () => {
    render(<Button size="icon">X</Button>);
    const button = screen.getByRole("button", { name: /x/i });
    expect(button).toHaveClass("w-10");
  });

  it("shows loading spinner when loading prop is true", () => {
    render(<Button loading>Gönder</Button>);
    const button = screen.getByRole("button", { name: /gönder/i });
    expect(button).toHaveAttribute("disabled");
    expect(button.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    expect(button).toBeDisabled();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    const button = screen.getByRole("button", { name: /disabled/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders with left icon", () => {
    render(<Button leftIcon={<span data-testid="icon">★</span>}>With Icon</Button>);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("renders with right icon", () => {
    render(<Button rightIcon={<span data-testid="icon">→</span>}>With Icon</Button>);
    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();
  });

  it("has correct focus styles", () => {
    render(<Button>Focus Test</Button>);
    const button = screen.getByRole("button", { name: /focus test/i });
    expect(button).toHaveClass("focus-visible:ring-2");
    expect(button).toHaveClass("focus-visible:ring-[#10b981]/50");
  });
});
