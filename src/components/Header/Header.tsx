import "./Header.scss";
import Card from "../Card/Card";
import { FaBroadcastTower, FaCheckCircle, FaSignal } from "react-icons/fa";
import { mockTowers } from "../../data/mockData";

const totalTowers = mockTowers.length;
const activeTowers = mockTowers.filter(
  (tower) => tower.status === "active"
).length;
const averageSignal = (
  mockTowers.reduce((sum, tower) => sum + tower.signalStrength, 0) / totalTowers
).toFixed(1);

function Header() {
  return (
    <header className="header">
      <div className="container header__content">
        <section className="header__text">
          <h1 className="header__title">Cell Tower Dashboard</h1>
          <p className="header__subtitle">
            Monitor cell tower operations across all cities
          </p>
        </section>
        <section className="header__cards">
          <Card
            title="Total Towers"
            content={totalTowers.toString()}
            icon={<FaBroadcastTower />}
            color="primary"
            delay={0.1}
          />
          <Card
            title="Active Towers"
            content={activeTowers.toString()}
            icon={<FaCheckCircle />}
            color="success"
            delay={0.2}
          />
          <Card
            title="Average Signal"
            content={`${averageSignal}/5`}
            icon={<FaSignal />}
            color="secondary"
            delay={0.3}
          />
        </section>
      </div>
    </header>
  );
}

export default Header;
