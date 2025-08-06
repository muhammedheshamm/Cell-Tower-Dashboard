import React from "react";
import type { CellTower } from "../../types";
import {
  FaBroadcastTower,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { LuSignal } from "react-icons/lu";

import "./TowersTable.scss";

interface TowersTableProps {
  towers: CellTower[];
}

const TowersTable: React.FC<TowersTableProps> = ({ towers }) => {
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
      <div className="towers-table__header container">
        <h2 className="towers-table__title">Cell Towers Overview</h2>
        <p className="towers-table__subtitle">
          {towers.length} towers across{" "}
          {new Set(towers.map((t) => t.city)).size} cities
        </p>
        <p className="towers-table__scroll-hint">
          ← Scroll horizontally to see all columns →
        </p>
      </div>

      {/* Table View */}
      <div className="towers-table__container container">
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
            {towers.map((tower) => (
              <tr key={tower.id} className={`tower-row ${tower.status}`}>
                <td className="tower-name">
                  <div className="tower-name__content">
                    <FaBroadcastTower />
                    <span>{tower.name}</span>
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
                    <LuSignal />
                    {tower.signalStrength}/5
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TowersTable;
