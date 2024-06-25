// Components
import Header from "../components/Header";
import CoinTable from "../components/CoinTable";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <section className="lg:w-auto py-8 px-10 bg-gray-200 dark:bg-gray-900 min-h-screen flex flex-col items-center">
        <CoinTable />
        <Footer />
      </section>
    </>
  );
}
