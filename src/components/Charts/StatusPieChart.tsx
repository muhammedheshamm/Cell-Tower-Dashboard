import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { CellTower } from "../../types";
import "./StatusPieChart.scss";

interface StatusPieChartProps {
  towers: CellTower[];
  width?: number;
  height?: number;
}

interface StatusData {
  status: string;
  count: number;
  percentage: number;
}

const StatusPieChart: React.FC<StatusPieChartProps> = ({
  towers,
  width = 600,
  height = 400,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!towers.length || !svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Process data
    const statusData: StatusData[] = Array.from(
      d3.group(towers, (d) => d.status),
      ([status, group]) => ({
        status,
        count: group.length,
        percentage: (group.length / towers.length) * 100,
      })
    ).sort((a, b) => b.count - a.count);

    // Set up dimensions
    const radius = width / 2;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2 - 50})`);

    // Color scale
    const colorScale = d3
      .scaleOrdinal()
      .domain(["active", "offline"])
      .range(["#10b981", "#ef4444"]);

    // Create pie generator
    const pie = d3
      .pie<StatusData>()
      .value((d) => d.count)
      .sort(null);

    // Create arc generator
    const arc = d3
      .arc<d3.PieArcDatum<StatusData>>()
      .innerRadius(0)
      .outerRadius(radius);

    // Add pie slices
    const slices = chart
      .selectAll(".slice")
      .data(pie(statusData))
      .enter()
      .append("g")
      .attr("class", "slice");

    slices
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.status) as string)
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1)
      .on("mouseover", function (_, d) {
        // Show tooltip
        const tooltip = d3
          .select("body")
          .append("div")
          .attr("class", "chart-tooltip")
          .style("position", "absolute")
          .style("background", "rgba(0, 0, 0, 0.8)")
          .style("color", "white")
          .style("padding", "8px 12px")
          .style("border-radius", "4px")
          .style("font-size", "12px")
          .style("pointer-events", "none")
          .style("z-index", "1000");

        tooltip.html(`
          <strong>${
            d.data.status.charAt(0).toUpperCase() + d.data.status.slice(1)
          }</strong>
          <br/>
          Count: ${d.data.count}<br/>
          Percentage: ${d.data.percentage.toFixed(1)}%
        `);
      })
      .on("mousemove", function (event) {
        const tooltip = d3.select(".chart-tooltip");
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 10 + "px");
      })
      .on("mouseout", function () {
        d3.select(".chart-tooltip").remove();
      });

    // Add percentage labels inside slices
    slices
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "600")
      .attr("fill", "white")
      .text((d) => `${d.data.percentage.toFixed(0)}%`);

    // Add legend
    const legend = chart
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${-radius / 2}, ${radius + 30})`);
    const legendItems = legend
      .selectAll(".legend-item")
      .data(statusData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (_, i) => `translate(${i * 90}, 0)`);

    legendItems
      .append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", (d) => colorScale(d.status) as string)
      .attr("rx", 2);

    legendItems
      .append("text")
      .attr("x", 20)
      .attr("y", 12)
      .attr("font-size", "14px")
      .attr("font-weight", "500")
      .attr("fill", "#181818")
      .text(
        (d) =>
          `${d.status.charAt(0).toUpperCase() + d.status.slice(1)}: ${d.count}`
      );
  }, [towers, width, height]);

  return (
    <div className="status-pie-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default StatusPieChart;
