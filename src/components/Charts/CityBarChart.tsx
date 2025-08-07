import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { CellTower } from "../../types";
import "./CityBarChart.scss";

interface CityBarChartProps {
  towers: CellTower[];
  width?: number;
  height?: number;
}

interface CityData {
  city: string;
  count: number;
}

const CityBarChart: React.FC<CityBarChartProps> = ({
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
    const cityData: CityData[] = Array.from(
      d3.group(towers, (d) => d.city),
      ([city, group]) => ({
        city,
        count: group.length,
      })
    ).sort((a, b) => b.count - a.count);

    // Set up dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(cityData.map((d) => d.city))
      .range([0, chartWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(cityData, (d) => d.count) || 0])
      .range([chartHeight, 0])
      .nice();

    // Add bars
    chart
      .selectAll(".bar")
      .data(cityData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.city) || 0)
      .attr("y", (d) => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => chartHeight - yScale(d.count))
      .attr("fill", "#2b5f80")
      .attr("rx", 4)
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
          <strong>${d.city}</strong><br/>
          Towers: ${d.count}
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

    // Add value labels on bars
    chart
      .selectAll(".bar-label")
      .data(cityData)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => (xScale(d.city) || 0) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.count) - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "500")
      .attr("fill", "#333")
      .text((d) => d.count);

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${chartHeight})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .attr("text-anchor", "end")
      .attr("font-size", "12px");

    chart
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .selectAll("text")
      .attr("font-size", "12px");

    // Add axis labels
    chart
      .append("text")
      .attr("class", "x-label")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight + margin.bottom - 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "500")
      .attr("fill", "#333")
      .text("City");

    chart
      .append("text")
      .attr("class", "y-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -chartHeight / 2)
      .attr("y", -margin.left + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "500")
      .attr("fill", "#333")
      .text("Number of Towers");
  }, [towers, width, height]);

  return (
    <div className="city-bar-chart">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default CityBarChart;
