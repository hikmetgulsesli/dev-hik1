import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input, Textarea } from "./input";

describe("Input Component", () => {
  it("renders with default styles", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("bg-[#111113]");
    expect(input).toHaveClass("border");
  });

  it("renders text type input", () => {
    render(<Input type="text" placeholder="Text input" />);
    const input = screen.getByPlaceholderText(/text input/i);
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders email type input", () => {
    render(<Input type="email" placeholder="Email" />);
    const input = screen.getByPlaceholderText(/email/i);
    expect(input).toHaveAttribute("type", "email");
  });

  it("renders password type input", () => {
    render(<Input type="password" placeholder="Password" />);
    const input = screen.getByPlaceholderText(/password/i);
    expect(input).toHaveAttribute("type", "password");
  });

  it("shows error state with error class", () => {
    render(<Input error errorMessage="Hata oluştu" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-[#ef4444]");
  });

  it("displays error message when error prop is true", () => {
    render(<Input error errorMessage="Bu alan zorunludur" />);
    expect(screen.getByText(/bu alan zorunludur/i)).toBeInTheDocument();
  });

  it("renders with left icon", () => {
    render(
      <Input leftIcon={<span data-testid="left-icon">🔍</span>} placeholder="Search" />
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renders with right icon", () => {
    render(
      <Input rightIcon={<span data-testid="right-icon">✓</span>} placeholder="Input" />
    );
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("renders different sizes", () => {
    const { rerender } = render(<Input inputSize="sm" placeholder="Small" />);
    expect(screen.getByPlaceholderText(/small/i)).toHaveClass("px-3");
    expect(screen.getByPlaceholderText(/small/i)).toHaveClass("py-2");

    rerender(<Input inputSize="md" placeholder="Medium" />);
    expect(screen.getByPlaceholderText(/medium/i)).toHaveClass("px-4");
    expect(screen.getByPlaceholderText(/medium/i)).toHaveClass("py-3");

    rerender(<Input inputSize="lg" placeholder="Large" />);
    expect(screen.getByPlaceholderText(/large/i)).toHaveClass("px-5");
    expect(screen.getByPlaceholderText(/large/i)).toHaveClass("py-4");
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Yeni değer" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("can be disabled", () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText(/disabled/i);
    expect(input).toBeDisabled();
  });

  it("has focus ring styles", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("focus:ring-2");
    expect(input).toHaveClass("focus:border-[#10b981]");
  });
});

describe("Textarea Component", () => {
  it("renders with default styles", () => {
    render(<Textarea placeholder="Enter message" />);
    const textarea = screen.getByPlaceholderText(/enter message/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass("bg-[#111113]");
  });

  it("renders with autoResize", () => {
    render(<Textarea autoResize placeholder="Auto resize" />);
    const textarea = screen.getByPlaceholderText(/auto resize/i);
    expect(textarea).toBeInTheDocument();
  });

  it("renders with maxLength and showCount", () => {
    render(
      <Textarea maxLength={100} showCount placeholder="With counter" />
    );
    const textarea = screen.getByPlaceholderText(/with counter/i);
    expect(textarea).toHaveAttribute("maxlength", "100");
    expect(screen.getByText(/0\/100/)).toBeInTheDocument();
  });

  it("updates character count when typing", () => {
    render(<Textarea maxLength={100} showCount placeholder="Counter" />);
    const textarea = screen.getByPlaceholderText(/counter/i);
    fireEvent.change(textarea, { target: { value: "Merhaba" } });
    expect(screen.getByText(/7\/100/)).toBeInTheDocument();
  });

  it("handles onChange event", () => {
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("has focus ring styles", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("focus:ring-2");
    expect(textarea).toHaveClass("focus:border-[#10b981]");
  });

  it("is resizable vertically only", () => {
    render(<Textarea />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveClass("resize-y");
  });
});
