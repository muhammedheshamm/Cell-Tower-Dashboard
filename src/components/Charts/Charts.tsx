import React from "react";
import type { CellTower } from "../../types";
import CityBarChart from "./CityBarChart";
import StatusPieChart from "./StatusPieChart";
import { isMobile } from "../../utils/responsive";
import "./Charts.scss";

interface ChartsProps {
  towers: CellTower[];
}

const Charts: React.FC<ChartsProps> = ({ towers }) => {
  return (
    <div className="charts main-padding">
      <div className="charts__section">
        <h3 className="charts__section-title">Tower Distribution by City</h3>
        <p className="charts__section-description">
          This chart shows the distribution of cell towers across different
          cities.
        </p>
        <CityBarChart
          towers={towers}
          width={isMobile() ? 320 : 450}
          height={isMobile() ? 300 : 400}
        />
      </div>

      <div className="charts__section">
        <h3 className="charts__section-title">Status Distribution</h3>
        <p className="charts__section-description">
          This pie chart illustrates the distribution of cell tower statuses.
        </p>
        <StatusPieChart
          towers={towers}
          width={isMobile() ? 320 : 400}
          height={isMobile() ? 430 : 500}
        />
      </div>
    </div>
  );
};

export default Charts;
