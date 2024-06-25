// Components
import Header from "../components/Header";
import CoinTable from "../components/CoinTable";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <section className="lg:w-auto py-10 px-14 bg-gray-200 dark:bg-gray-900 min-h-screen flex flex-col items-center">
        <Header />
        <CoinTable />
        <Footer />
      </section>
    </>
  );
}
