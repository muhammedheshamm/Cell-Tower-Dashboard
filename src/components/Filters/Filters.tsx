import { useMemo } from "react";
import { FaSearch } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import type { CellTower, FilterState } from "../../types";
import "./Filters.scss";

interface FiltersProps {
  towers: CellTower[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Filters: React.FC<FiltersProps> = ({ towers, filters, setFilters }) => {
  // unique values for dropdowns
  const uniqueCities = useMemo(
    () => Array.from(new Set(towers.map((tower) => tower.city))).sort(),
    [towers]
  );

  const uniqueNetworks = useMemo(
    () => Array.from(new Set(towers.map((tower) => tower.networkType))).sort(),
    [towers]
  );

  const uniqueStatuses = useMemo(
    () => Array.from(new Set(towers.map((tower) => tower.status))).sort(),
    [towers]
  );

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters((old) => ({
      ...old,
      city: "",
      network: "",
      status: "",
    }));
  };

  const hasActiveFilters = filters.city || filters.network || filters.status;

  return (
    <div className="filters main-padding">
      {/* Search Input */}
      <div className="filters__search">
        <FaSearch className="search-icon" />
        <input
          type="search"
          placeholder="Search towers by name..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="search-field"
        />
        {filters.search && (
          <RxCross1
            className="clear-icon"
            onClick={() => handleFilterChange("search", "")}
          />
        )}
      </div>

      <div className="filters__dropdowns">
        {/* City Filter */}
        <select
          value={filters.city}
          onChange={(e) => handleFilterChange("city", e.target.value)}
          className={`filter-select-field ${filters.city ? "active" : ""}`}
        >
          <option value="">All Cities</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Network Filter */}
        <select
          value={filters.network}
          onChange={(e) => handleFilterChange("network", e.target.value)}
          className={`filter-select-field ${filters.network ? "active" : ""}`}
        >
          <option value="">All Networks</option>
          {uniqueNetworks.map((network) => (
            <option key={network} value={network}>
              {network}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className={`filter-select-field ${filters.status ? "active" : ""}`}
        >
          <option value="">All Status</option>
          {uniqueStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearAllFilters}
          className="clear-filters-btn"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};

export default Filters;
