import React from "react";
import CardShimmer from "../Card/CardShimmer";
import "./Header.scss";

const HeaderShimmer: React.FC = () => {
  return (
    <header className="header">
      <div className="container header__content main-padding">
        <section className="header__text">
          <h1 className="header__title">Cell Tower Dashboard</h1>
          <p className="header__subtitle">
            Monitor cell tower operations across all cities
          </p>
        </section>
        <section className="header__cards">
          <CardShimmer delay={0.1} />
          <CardShimmer delay={0.2} />
          <CardShimmer delay={0.3} />
        </section>
      </div>
    </header>
  );
};

export default HeaderShimmer;
