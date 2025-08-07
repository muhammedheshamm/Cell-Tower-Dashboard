import React, { useState, useMemo } from "react";
import type { CellTower } from "../../types";
import {
  FaBroadcastTower,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Signal from "../Signal/Signal";
import Filters from "../Filters/Filters";
import type { FilterState } from "../../types";
import { highlightText } from "../../utils/highlightText";

import "./TowersTable.scss";

interface TowersTableProps {
  towers: CellTower[];
}

const TowersTable: React.FC<TowersTableProps> = ({ towers }) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    city: "",
    network: "",
    status: "",
  });

  // Filter towers based on current filters
  const filteredTowers = useMemo(() => {
    return towers.filter((tower) => {
      // Search filter
      if (
        filters.search &&
        !tower.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // City filter
      if (filters.city && tower.city !== filters.city) {
        return false;
      }

      // Network filter
      if (filters.network && tower.networkType !== filters.network) {
        return false;
      }

      // Status filter
      if (filters.status && tower.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [towers, filters]);

  const getStatusIcon = (status: "active" | "offline") => {
    return status === "active" ? (
      <FaCheckCircle className="active" />
    ) : (
      <FaTimesCircle className="offline" />
    );
  };

  const getNetworkTypeColor = (type: "4G" | "5G") => {
    return type === "5G" ? "network-5g" : "network-4g";
  };

  return (
    <div className="towers-table">
      <div className="towers-table__header main-padding">
        <h2 className="towers-table__title">Towers Information</h2>
        <p className="towers-table__subtitle">
          {filteredTowers.length} of {towers.length} towers across{" "}
          {new Set(towers.map((t) => t.city)).size} cities
        </p>
        <p className="towers-table__scroll-hint">
          ← Scroll horizontally to see all columns →
        </p>
      </div>

      <Filters towers={towers} filters={filters} setFilters={setFilters} />

      {/* Table View */}
      <div className="towers-table__container main-padding">
        <table className="towers-table__table">
          <thead>
            <tr>
              <th>Tower Name</th>
              <th>City</th>
              <th>Network</th>
              <th>Status</th>
              <th>Signal Strength</th>
            </tr>
          </thead>
          <tbody>
            {filteredTowers.length ? (
              filteredTowers.map((tower) => (
                <tr key={tower.id} className={`tower-row ${tower.status}`}>
                  <td className="tower-name">
                    <div className="tower-name__content">
                      <FaBroadcastTower />
                      <span>{highlightText(tower.name, filters.search)}</span>
                    </div>
                  </td>
                  <td className="tower-city">
                    <div className="tower-city__content">
                      <FaMapMarkerAlt />
                      <span>{tower.city}</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`network-badge ${getNetworkTypeColor(
                        tower.networkType
                      )}`}
                    >
                      {tower.networkType}
                    </span>
                  </td>
                  <td>
                    <div className="status-indicator">
                      {getStatusIcon(tower.status)}
                      <span className={`status-text ${tower.status}`}>
                        {tower.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="signal-display">
                      <Signal strength={tower.signalStrength} size="medium" />
                      <span className="signal-value">
                        {tower.signalStrength}/5
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data">
                  No towers match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TowersTable;
