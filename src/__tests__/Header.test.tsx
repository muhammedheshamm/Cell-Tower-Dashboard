import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Header from "../components/Header/Header";
import { mockTowers } from "../data/mockData";

describe("Header Component", () => {
  it("renders header with title and subtitle", () => {
    render(<Header towers={mockTowers} />);

    expect(screen.getByText("Cell Tower Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Monitor cell tower operations across all cities")
    ).toBeInTheDocument();
  });

  it("displays info cards when there is no error", () => {
    render(<Header towers={mockTowers} />);

    // Check that info cards are displayed
    expect(screen.getByText("Total Towers")).toBeInTheDocument();
    expect(screen.getByText("Active Towers")).toBeInTheDocument();
    expect(screen.getByText("Average Signal")).toBeInTheDocument();

    // Check that the cards section exists
    expect(document.querySelector(".header__cards")).toBeInTheDocument();
  });

  it("hides info cards when there is an error", () => {
    render(<Header towers={mockTowers} error="Failed to load data" />);

    // Check that title and subtitle are still displayed
    expect(screen.getByText("Cell Tower Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Monitor cell tower operations across all cities")
    ).toBeInTheDocument();

    // Check that info cards are NOT displayed
    expect(screen.queryByText("Total Towers")).not.toBeInTheDocument();
    expect(screen.queryByText("Active Towers")).not.toBeInTheDocument();
    expect(screen.queryByText("Average Signal")).not.toBeInTheDocument();

    // Check that the cards section does not exist
    expect(document.querySelector(".header__cards")).not.toBeInTheDocument();
  });

  it("displays correct tower statistics when no error", () => {
    render(<Header towers={mockTowers} />);

    // Check total towers count
    expect(screen.getByText("12")).toBeInTheDocument(); // Total towers

    // Check active towers count (should be 7 based on mock data)
    expect(screen.getByText("7")).toBeInTheDocument(); // Active towers

    // Check average signal (should be calculated from mock data)
    const averageSignalElement = screen.getByText(/\d+\.\d+\/5/);
    expect(averageSignalElement).toBeInTheDocument();
  });

  it("handles empty towers array without error", () => {
    render(<Header towers={[]} />);

    // Should still show the header
    expect(screen.getByText("Cell Tower Dashboard")).toBeInTheDocument();

    // Should show 0 for all stats
    expect(screen.getAllByText("0")).toHaveLength(2); // Total towers and Active towers
    expect(screen.getByText("0.0/5")).toBeInTheDocument(); // Average signal
  });

  it("handles empty towers array with error", () => {
    render(<Header towers={[]} error="No data available" />);

    // Should still show the header
    expect(screen.getByText("Cell Tower Dashboard")).toBeInTheDocument();

    // Should NOT show any stats cards
    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.queryByText("0.0/5")).not.toBeInTheDocument();
  });

  it("handles null error prop", () => {
    render(<Header towers={mockTowers} error={null} />);

    // Should display info cards when error is null
    expect(screen.getByText("Total Towers")).toBeInTheDocument();
    expect(screen.getByText("Active Towers")).toBeInTheDocument();
    expect(screen.getByText("Average Signal")).toBeInTheDocument();
  });

  it("handles undefined error prop", () => {
    render(<Header towers={mockTowers} error={undefined} />);

    // Should display info cards when error is undefined
    expect(screen.getByText("Total Towers")).toBeInTheDocument();
    expect(screen.getByText("Active Towers")).toBeInTheDocument();
    expect(screen.getByText("Average Signal")).toBeInTheDocument();
  });
});
