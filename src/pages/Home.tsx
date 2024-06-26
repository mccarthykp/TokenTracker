// Components
import Header from "../components/Header";
import CoinTable from "../components/CoinTable";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
    <div className="min-h-screen dark:bg-slate-800 bg-zinc-950 overflow-hidden">
      <Header />
      <CoinTable />
      <Footer />
    </div>
    </>
  );
}
