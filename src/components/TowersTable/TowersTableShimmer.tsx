import React from "react";
import Shimmer from "../Shimmer/Shimmer";
import "../TowersTable/TowersTable.scss";

const TowersTableShimmer: React.FC = () => {
  const shimmerRows = Array(12).fill(null);

  return (
    <div className="towers-table">
      <div className="towers-table__header main-padding">
        <Shimmer height={32} width={200} className="mb-2" />
        <Shimmer height={20} width={250} />
      </div>

      {/* Filters shimmer */}
      <div className="filters main-padding">
        <Shimmer height={40} width="100%" />
      </div>

      {/* Table shimmer */}
      <div className="towers-table__container main-padding">
        <table className="towers-table__table">
          <thead>
            <tr>
              <th>
                <Shimmer height={24} />
              </th>
              <th>
                <Shimmer height={24} />
              </th>
              <th>
                <Shimmer height={24} />
              </th>
              <th>
                <Shimmer height={24} />
              </th>
              <th>
                <Shimmer height={24} />
              </th>
            </tr>
          </thead>
          <tbody>
            {shimmerRows.map((_, index) => (
              <tr key={index}>
                <td>
                  <Shimmer height={30} />
                </td>
                <td>
                  <Shimmer height={30} />
                </td>
                <td>
                  <Shimmer height={30} />
                </td>
                <td>
                  <Shimmer height={30} />
                </td>
                <td>
                  <Shimmer height={30} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TowersTableShimmer;
