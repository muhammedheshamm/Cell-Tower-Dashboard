import Header from "../components/Header/Header";
import HeaderShimmer from "../components/Header/HeaderShimmer";
import TowersTable from "../components/TowersTable/TowersTable";
import TowersTableShimmer from "../components/TowersTable/TowersTableShimmer";
import Charts from "../components/Charts/Charts";
import ChartsShimmer from "../components/Charts/ChartsShimmer";
import { useTowerData } from "../hooks/useTowerData";
import "./Home.scss";

function Home() {
  const { towers, loading, error, retry } = useTowerData();

  return (
    <>
      {loading ? <HeaderShimmer /> : <Header towers={towers} error={error} />}
      <div className="home-content container">
        {error ? (
          <div className="error-container">
            <div className="error-message">
              <h3>Oops</h3>
              <p>{error}</p>
              <button className="retry-button" onClick={retry}>
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
      <footer className="footer">
        <div className="container main-padding footer__content">
          <p>
            © {new Date().getFullYear()} Cell Tower Dashboard | Created by
            Muhammed Hesham
          </p>
        </div>
      </footer>
    </>
  );
}

export default Home;
