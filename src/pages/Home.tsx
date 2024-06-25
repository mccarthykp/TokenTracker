// Components
import Header from "../components/Header";
import CoinTable from "../components/CoinTable";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <Header />
      <CoinTable />
      <Footer />
    </div>
    </>
  );
}
