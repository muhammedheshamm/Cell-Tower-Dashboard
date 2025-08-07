import React from "react";
import Shimmer from "../Shimmer/Shimmer";
import "./Card.scss";

interface CardShimmerProps {
  delay?: number;
}

const CardShimmer: React.FC<CardShimmerProps> = ({ delay = 0 }) => {
  return (
    <div
      className="card card--shimmer"
      style={{ animationDelay: `${delay}s`, backgroundColor: "transparent" }}
    >
      <div className="card__icon">
        <Shimmer height={24} width={24} borderRadius="50%" />
      </div>
      <div className="card__content">
        <Shimmer height={16} width={80} className="mb-2" />
        <Shimmer height={24} width={60} />
      </div>
    </div>
  );
};

export default CardShimmer;
