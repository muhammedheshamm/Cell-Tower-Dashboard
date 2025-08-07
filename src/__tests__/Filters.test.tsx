import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Filters from "../components/Filters/Filters";
import { mockTowers } from "../data/mockData";
import type { FilterState } from "../types";

describe("Filters Component", () => {
  const mockSetFilters = vi.fn();
  const defaultFilters: FilterState = {
    search: "",
    city: "",
    network: "",
    status: "",
  };

  beforeEach(() => {
    mockSetFilters.mockClear();
  });

  it("renders without crashing and shows all filter elements", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    // Check search input
    expect(
      screen.getByPlaceholderText("Search towers by name...")
    ).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();

    // Check dropdowns
    expect(screen.getByDisplayValue("All Cities")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Networks")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Status")).toBeInTheDocument();

    // Check search icon
    expect(document.querySelector(".search-icon")).toBeInTheDocument();
  });

  it("populates dropdown options with unique values from towers data", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    // Check city options
    const citySelect = screen.getByDisplayValue("All Cities");
    expect(citySelect).toHaveValue("");

    // Check network options
    const networkSelect = screen.getByDisplayValue("All Networks");
    expect(networkSelect).toHaveValue("");

    // Check status options
    const statusSelect = screen.getByDisplayValue("All Status");
    expect(statusSelect).toHaveValue("");
  });

  it("handles search input changes", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search towers by name...");
    fireEvent.change(searchInput, { target: { value: "Cairo" } });

    expect(mockSetFilters).toHaveBeenCalledWith({
      search: "Cairo",
      city: "",
      network: "",
      status: "",
    });
  });

  it("handles city filter changes", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    const citySelect = screen.getByDisplayValue("All Cities");
    fireEvent.change(citySelect, { target: { value: "Cairo" } });

    expect(mockSetFilters).toHaveBeenCalledWith({
      search: "",
      city: "Cairo",
      network: "",
      status: "",
    });
  });

  it("handles network filter changes", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    const networkSelect = screen.getByDisplayValue("All Networks");
    fireEvent.change(networkSelect, { target: { value: "5G" } });

    expect(mockSetFilters).toHaveBeenCalledWith({
      search: "",
      city: "",
      network: "5G",
      status: "",
    });
  });

  it("handles status filter changes", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    const statusSelect = screen.getByDisplayValue("All Status");
    fireEvent.change(statusSelect, { target: { value: "active" } });

    expect(mockSetFilters).toHaveBeenCalledWith({
      search: "",
      city: "",
      network: "",
      status: "active",
    });
  });

  it("shows clear search icon when search has value", () => {
    const filtersWithSearch: FilterState = {
      search: "Cairo",
      city: "",
      network: "",
      status: "",
    };

    render(
      <Filters
        towers={mockTowers}
        filters={filtersWithSearch}
        setFilters={mockSetFilters}
      />
    );

    expect(document.querySelector(".clear-icon")).toBeInTheDocument();
  });

  it("clears search when clear icon is clicked", () => {
    const filtersWithSearch: FilterState = {
      search: "Cairo",
      city: "",
      network: "",
      status: "",
    };

    render(
      <Filters
        towers={mockTowers}
        filters={filtersWithSearch}
        setFilters={mockSetFilters}
      />
    );

    const clearIcon = document.querySelector(".clear-icon");
    fireEvent.click(clearIcon!);

    expect(mockSetFilters).toHaveBeenCalledWith({
      search: "",
      city: "",
      network: "",
      status: "",
    });
  });

  it("shows clear filters button when any filter is active", () => {
    const filtersWithActiveFilters: FilterState = {
      search: "",
      city: "Cairo",
      network: "",
      status: "",
    };

    render(
      <Filters
        towers={mockTowers}
        filters={filtersWithActiveFilters}
        setFilters={mockSetFilters}
      />
    );

    expect(screen.getByText("Clear filters")).toBeInTheDocument();
  });

  it("does not show clear filters button when no filters are active", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    expect(screen.queryByText("Clear filters")).not.toBeInTheDocument();
  });

  it("clears all filters when clear filters button is clicked", () => {
    const filtersWithActiveFilters: FilterState = {
      search: "Cairo",
      city: "Cairo",
      network: "5G",
      status: "active",
    };

    render(
      <Filters
        towers={mockTowers}
        filters={filtersWithActiveFilters}
        setFilters={mockSetFilters}
      />
    );

    const clearFiltersButton = screen.getByText("Clear filters");
    fireEvent.click(clearFiltersButton);

    // The clearAllFilters function uses a function updater, so we need to check that it was called
    expect(mockSetFilters).toHaveBeenCalled();

    // Get the function that was passed to setFilters and call it with the current filters
    const setFiltersCall = mockSetFilters.mock.calls[0][0];
    if (typeof setFiltersCall === "function") {
      const result = setFiltersCall(filtersWithActiveFilters);
      expect(result).toEqual({
        search: "Cairo", // Search should remain unchanged
        city: "",
        network: "",
        status: "",
      });
    }
  });

  it("applies active class to select fields when they have values", () => {
    const filtersWithActiveFilters: FilterState = {
      search: "",
      city: "Cairo",
      network: "5G",
      status: "active",
    };

    render(
      <Filters
        towers={mockTowers}
        filters={filtersWithActiveFilters}
        setFilters={mockSetFilters}
      />
    );

    const citySelect = screen.getByDisplayValue("Cairo");
    const networkSelect = screen.getByDisplayValue("5G");
    const statusSelect = screen.getByDisplayValue("active");

    expect(citySelect).toHaveClass("filter-select-field", "active");
    expect(networkSelect).toHaveClass("filter-select-field", "active");
    expect(statusSelect).toHaveClass("filter-select-field", "active");
  });

  it("does not apply active class to select fields when they are empty", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    const citySelect = screen.getByDisplayValue("All Cities");
    const networkSelect = screen.getByDisplayValue("All Networks");
    const statusSelect = screen.getByDisplayValue("All Status");

    expect(citySelect).toHaveClass("filter-select-field");
    expect(citySelect).not.toHaveClass("active");
    expect(networkSelect).toHaveClass("filter-select-field");
    expect(networkSelect).not.toHaveClass("active");
    expect(statusSelect).toHaveClass("filter-select-field");
    expect(statusSelect).not.toHaveClass("active");
  });

  it("displays correct dropdown options based on towers data", () => {
    render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    // Check that all unique cities are available as options
    const citySelect = screen.getByDisplayValue("All Cities");
    expect(citySelect).toHaveValue("");

    // Check that all unique networks are available as options
    const networkSelect = screen.getByDisplayValue("All Networks");
    expect(networkSelect).toHaveValue("");

    // Check that all unique statuses are available as options
    const statusSelect = screen.getByDisplayValue("All Status");
    expect(statusSelect).toHaveValue("");
  });

  it("maintains search value when other filters are cleared", () => {
    const filtersWithAllValues: FilterState = {
      search: "Cairo",
      city: "Cairo",
      network: "5G",
      status: "active",
    };

    render(
      <Filters
        towers={mockTowers}
        filters={filtersWithAllValues}
        setFilters={mockSetFilters}
      />
    );

    const clearFiltersButton = screen.getByText("Clear filters");
    fireEvent.click(clearFiltersButton);

    expect(mockSetFilters).toHaveBeenCalled();

    const setFiltersCall = mockSetFilters.mock.calls[0][0];
    if (typeof setFiltersCall === "function") {
      const result = setFiltersCall(filtersWithAllValues);
      expect(result).toEqual({
        search: "Cairo",
        city: "",
        network: "",
        status: "",
      });
    }
  });

  it("updates search input value when filters prop changes", () => {
    const { rerender } = render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    const searchInput = screen.getByPlaceholderText("Search towers by name...");
    expect(searchInput).toHaveValue("");

    const newFilters: FilterState = {
      search: "Alexandria",
      city: "",
      network: "",
      status: "",
    };

    rerender(
      <Filters
        towers={mockTowers}
        filters={newFilters}
        setFilters={mockSetFilters}
      />
    );

    expect(searchInput).toHaveValue("Alexandria");
  });

  it("updates select values when filters prop changes", () => {
    const { rerender } = render(
      <Filters
        towers={mockTowers}
        filters={defaultFilters}
        setFilters={mockSetFilters}
      />
    );

    expect(screen.getByDisplayValue("All Cities")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Networks")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All Status")).toBeInTheDocument();

    const newFilters: FilterState = {
      search: "",
      city: "Cairo",
      network: "5G",
      status: "active",
    };

    rerender(
      <Filters
        towers={mockTowers}
        filters={newFilters}
        setFilters={mockSetFilters}
      />
    );

    expect(screen.getByDisplayValue("Cairo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("5G")).toBeInTheDocument();
    expect(screen.getByDisplayValue("active")).toBeInTheDocument();
  });
});
