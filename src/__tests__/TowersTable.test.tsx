import { render, screen } from "@testing-library/react";
import TowersTable from "../components/TowersTable/TowersTable";
import { describe, expect, it } from "vitest";
import { mockTowers } from "../data/mockData";

describe("TowersTable Component", () => {
  it("renders without crashing and shows table structure", () => {
    render(<TowersTable towers={mockTowers} />);

    expect(screen.getByText("Towers Information")).toBeInTheDocument();
    expect(
      screen.getByText("12 of 12 towers across 4 cities")
    ).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText("Tower Name")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Network")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Signal Strength")).toBeInTheDocument();
  });

  it("displays all towers with correct information", () => {
    render(<TowersTable towers={mockTowers} />);

    // Check some specific tower names
    expect(screen.getByText("Cairo Central Tower")).toBeInTheDocument();
    expect(screen.getByText("Alexandria Beach Station")).toBeInTheDocument();
    expect(screen.getByText("Luxor Temple Tower")).toBeInTheDocument();

    // Check cities by looking specifically in the city column cells
    const cityCells = document.querySelectorAll(".tower-city__content span");
    const cityTexts = Array.from(cityCells).map((cell) => cell.textContent);

    expect(cityTexts.filter((text) => text === "Cairo")).toHaveLength(4);
    expect(cityTexts.filter((text) => text === "Alexandria")).toHaveLength(2);
    expect(cityTexts.filter((text) => text === "Hurghada")).toHaveLength(3);
    expect(cityTexts.filter((text) => text === "Luxor")).toHaveLength(3);

    // Check network types by looking specifically at network badges in the table
    const networkBadges = document.querySelectorAll(".network-badge");
    const networkTexts = Array.from(networkBadges).map(
      (badge) => badge.textContent
    );

    expect(networkTexts.filter((text) => text === "5G")).toHaveLength(6);
    expect(networkTexts.filter((text) => text === "4G")).toHaveLength(6);

    // Check status by looking specifically at status text in the table
    const statusTexts = document.querySelectorAll(".status-text");
    const statusValues = Array.from(statusTexts).map(
      (status) => status.textContent
    );

    expect(statusValues.filter((text) => text === "active")).toHaveLength(7);
    expect(statusValues.filter((text) => text === "offline")).toHaveLength(5);
  });

  it("displays correct signal strength with visual indicator", () => {
    render(<TowersTable towers={mockTowers} />);

    // Check signal strength values
    expect(screen.getByText("1/5")).toBeInTheDocument();
    expect(screen.getAllByText("4/5")).toHaveLength(4);
    expect(screen.getAllByText("5/5")).toHaveLength(2);

    // Signal component should be rendered for each tower
    const signalDisplays = document.querySelectorAll(".signal-display");
    expect(signalDisplays).toHaveLength(12);
  });

  it("shows network badges with correct styling", () => {
    render(<TowersTable towers={mockTowers} />);

    // Check for network badge elements using the span elements with network-badge class
    const networkBadges = document.querySelectorAll(".network-badge");
    expect(networkBadges).toHaveLength(12);

    networkBadges.forEach((badge) => {
      expect(badge).toHaveClass("network-badge");
      if (badge.textContent === "5G") {
        expect(badge).toHaveClass("network-5g");
      } else if (badge.textContent === "4G") {
        expect(badge).toHaveClass("network-4g");
      }
    });
  });

  it("shows status indicators with correct icons", () => {
    render(<TowersTable towers={mockTowers} />);

    const statusIndicators = document.querySelectorAll(".status-indicator");
    expect(statusIndicators).toHaveLength(12);

    // Check that status text has correct classes
    const activeStatuses = document.querySelectorAll(".status-text.active");
    expect(activeStatuses).toHaveLength(7);

    const offlineStatuses = document.querySelectorAll(".status-text.offline");
    expect(offlineStatuses).toHaveLength(5);
  });

  it("applies correct row classes based on tower status", () => {
    render(<TowersTable towers={mockTowers} />);

    const tableRows = screen.getAllByRole("row");
    // Skip header row, check data rows
    const dataRows = tableRows.slice(1);

    dataRows.forEach((row, index) => {
      const tower = mockTowers[index];
      if (tower) {
        expect(row).toHaveClass("tower-row", tower.status);
      }
    });
  });
});
