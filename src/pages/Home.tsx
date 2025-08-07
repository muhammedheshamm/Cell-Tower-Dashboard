import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import TowersTable from "../components/TowersTable/TowersTable";
import TowersTableShimmer from "../components/TowersTable/TowersTableShimmer";
import Charts from "../components/Charts/Charts";
import ChartsShimmer from "../components/Charts/ChartsShimmer";
import { fetchTowerData } from "../data/mockDataService";
import type { CellTower } from "../types";
import "./Home.scss";

function Home() {
  const [towers, setTowers] = useState<CellTower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchTowerData();
        setTowers(data);
      } catch (err) {
        console.error("Failed to load tower data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchTowerData()
      .then((data) => {
        setTowers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <div className="home-content container">
        {error ? (
          <div className="error-container">
            <div className="error-message">
              <h3>Oops</h3>
              <p>{error}</p>
              <button className="retry-button" onClick={handleRetry}>
                Retry
              </button>
            </div>
          </div>
        ) : loading ? (
          <>
            <TowersTableShimmer />
            <ChartsShimmer />
          </>
        ) : (
          <>
            <TowersTable towers={towers} />
            <Charts towers={towers} />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
