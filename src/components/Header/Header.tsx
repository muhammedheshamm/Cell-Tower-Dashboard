import "./Header.scss";
import Card from "../Card/Card";
import { FaBroadcastTower, FaCheckCircle, FaSignal } from "react-icons/fa";
import type { CellTower } from "../../types";

interface HeaderProps {
  towers: CellTower[];
  error?: string | null;
}

function Header({ towers, error }: HeaderProps) {
  const totalTowers = towers.length;
  const activeTowers = towers.filter(
    (tower) => tower.status === "active"
  ).length;
  const averageSignal =
    totalTowers > 0
      ? (
          towers.reduce((sum, tower) => sum + tower.signalStrength, 0) /
          totalTowers
        ).toFixed(1)
      : "0.0";

  return (
    <header className="header">
      <div className="container header__content main-padding">
        <section className="header__text">
          <h1 className="header__title">Cell Tower Dashboard</h1>
          <p className="header__subtitle">
            Monitor cell tower operations across all cities
          </p>
        </section>
        {!error && (
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
        )}
      </div>
    </header>
  );
}

export default Header;
