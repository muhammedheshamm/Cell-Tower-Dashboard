import Header from "../components/Header/Header";
import TowersTable from "../components/TowersTable/TowersTable";
import Charts from "../components/Charts/Charts";
import { mockTowers } from "../data/mockData";

function Home() {
  return (
    <>
      <Header />
      <div className="home-content container">
        <TowersTable towers={mockTowers} />
        <Charts towers={mockTowers} />
      </div>
    </>
  );
}

export default Home;
