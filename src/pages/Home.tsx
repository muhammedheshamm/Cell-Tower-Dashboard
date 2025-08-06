import Header from "../components/Header/Header"
import TowersTable from "../components/TowersTable/TowersTable"
import { mockTowers } from "../data/mockData"

function Home() {
  return (
    <>
      <Header />
      <TowersTable towers={mockTowers} />
    </>
  )
}

export default Home