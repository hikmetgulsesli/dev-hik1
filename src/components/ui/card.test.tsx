import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";

describe("Card Component", () => {
  it("renders with default variant", () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText(/card content/i);
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass("bg-[#111113]");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("rounded-xl");
  });

  it("renders with interactive variant", () => {
    render(<Card variant="interactive">Interactive Card</Card>);
    const card = screen.getByText(/interactive card/i);
    expect(card).toHaveClass("cursor-pointer");
  });

  it("renders with featured variant", () => {
    render(<Card variant="featured">Featured Card</Card>);
    const card = screen.getByText(/featured card/i);
    expect(card).toHaveClass("border-[#10b981]/30");
  });

  it("applies hover effects when interactive", () => {
    render(<Card variant="interactive" hover>Hoverable Card</Card>);
    const card = screen.getByText(/hoverable card/i);
    expect(card).toHaveClass("hover:border-[#10b981]");
    expect(card).toHaveClass("hover:-translate-y-1");
  });

  it("renders with different padding options", () => {
    const { rerender } = render(<Card padding="none">No Padding</Card>);
    expect(screen.getByText(/no padding/i)).toBeInTheDocument();

    rerender(<Card padding="sm">Small Padding</Card>);
    expect(screen.getByText(/small padding/i)).toHaveClass("p-4");

    rerender(<Card padding="md">Medium Padding</Card>);
    expect(screen.getByText(/medium padding/i)).toHaveClass("p-6");

    rerender(<Card padding="lg">Large Padding</Card>);
    expect(screen.getByText(/large padding/i)).toHaveClass("p-8");
  });

  it("renders CardHeader component", () => {
    render(
      <Card>
        <CardHeader>Header Content</CardHeader>
      </Card>
    );
    expect(screen.getByText(/header content/i)).toBeInTheDocument();
  });

  it("renders CardTitle component", () => {
    render(
      <Card>
        <CardTitle>Card Başlık</CardTitle>
      </Card>
    );
    expect(screen.getByText(/card başlık/i)).toBeInTheDocument();
    expect(screen.getByText(/card başlık/i)).toHaveClass("text-xl");
    expect(screen.getByText(/card başlık/i)).toHaveClass("font-semibold");
  });

  it("renders CardDescription component", () => {
    render(
      <Card>
        <CardDescription>Card Description</CardDescription>
      </Card>
    );
    expect(screen.getByText(/card description/i)).toBeInTheDocument();
    expect(screen.getByText(/card description/i)).toHaveClass("text-[#a1a1aa]");
  });

  it("renders CardContent component", () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    );
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it("renders CardFooter component", () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText(/footer/i)).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Card className="custom-class">Custom</Card>);
    expect(screen.getByText(/custom/i)).toHaveClass("custom-class");
  });

  it("renders all subcomponents together", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Vesta Dashboard</CardTitle>
          <CardDescription>
            Modern bir yönetim paneli uygulaması
          </CardDescription>
        </CardHeader>
        <CardContent>
          Proje açıklaması burada yer alır.
        </CardContent>
        <CardFooter>
          <button>Detaylar</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText(/vesta dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/modern bir yönetim paneli/i)).toBeInTheDocument();
    expect(screen.getByText(/proje açıklaması/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /detaylar/i })).toBeInTheDocument();
  });
});
