import React, { useState, useEffect } from "react";
import axios from "axios";

interface Coin {
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

interface SortState {
  filter: string;
  ascending: boolean;
}

const CoinTable: React.FunctionComponent = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [sortBy, setSortBy] = useState<SortState>({
    filter: "market-cap",  // Default to sorting by market cap
    ascending: false,  // Default to descending order
  });
  const [selectedOption, setSelectedOption] = useState<string>("market-cap");  // Default to market cap

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Coin[]>(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              per_page: 25,
              page: 1,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Sort coins based on selected filter and sort order
  const sortedCoins = coins.slice().sort((a, b) => {
    let comparison = 0;
    switch (sortBy.filter) {
      case "market-cap":
        comparison = a.market_cap - b.market_cap;
        break;
      case "price":
        comparison = a.current_price - b.current_price;
        break;
      case "24h":
        comparison = a.price_change_percentage_24h - b.price_change_percentage_24h;
        break;
      default:
        break;
    }
    return sortBy.ascending ? comparison : -comparison;
  });

  // Function to handle sorting when a filter is clicked
  const handleSort = (filter: string) => {
    if (["market-cap", "price", "24h"].includes(filter)) {
      setSortBy((prevState) => {
        if (prevState.filter === filter) {
          return { ...prevState, ascending: !prevState.ascending };
        } else {
          return { filter, ascending: false };  // Default to descending when changing filter
        }
      });
    }
  };

  // Function to render the arrow indicating the active filter
  const renderArrow = (filter: string) => {
    if (sortBy.filter === filter) {
      return sortBy.ascending ? <span>&uarr;</span> : <span>&darr;</span>;
    }
    return null;
  };

  // Function to handle sorting order change from the mobile buttons
  const handleSortOrderChange = () => {
    setSortBy((prevState) => ({
      ...prevState,
      ascending: !prevState.ascending,
    }));
  };

  return (
    <section className="lg:w-auto py-10 px-10 bg-gray-200 dark:bg-gray-900 flex flex-col items-center text-xs md:text-base min-h-screen">
      <table className="min-w-[355px]">
        <thead>
          <tr className="text-slate-800 dark:text-slate-300 text-left select-none">
            <th
              className="pl-8 underline underline-offset-4 decoration-2 md:table-cell"
              onClick={() => handleSort("")}
            >
              Coin
            </th>
            <th className="pr-8 hidden md:table-cell">
              <span
                onClick={() => handleSort("market-cap")}
                className="cursor-pointer"
              >
                <span
                  className={`
                    underline underline-offset-4 decoration-2
                    ${sortBy.filter === "market-cap" ? "text-slate-500" : ""
                  }`}
                >
                  Market Cap (USD)
                </span>{" "}
                {renderArrow("market-cap")}
              </span>
            </th>
            <th className="pr-8 hidden md:table-cell">
              <span
                onClick={() => handleSort("price")}
                className="cursor-pointer"
              >
                <span
                  className={`
                    underline underline-offset-4 decoration-2
                    ${sortBy.filter === "price" ? "text-slate-500" : ""
                  }`}
                >
                  Price (USD)
                </span>{" "}
                {renderArrow("price")}
              </span>
            </th>
            <th className="pr-8 hidden md:table-cell">
              <span
                onClick={() => handleSort("24h")}
                className="cursor-pointer"
              >
                <span
                  className={`
                    underline underline-offset-4 decoration-2
                    ${sortBy.filter === "24h" ? "text-slate-500" : ""
                  }`}
                >
                  24h
                </span>{" "}
                {renderArrow("24h")}
              </span>
            </th>
            <th>
              <div className="flex text-slate-400 dark:text-slate-900 md:hidden justify-end items-center">
                <button
                  onClick={handleSortOrderChange}
                  className="mr-2 py-1 h-8 px-2 bg-zinc-900 dark:bg-slate-400 border-none outline-none rounded-md items-center font-bold"
                >
                  {sortBy.ascending ? <span>&uarr;</span> : <span>&darr;</span>}
                </button>
                <select
                  id="data-select"
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    handleSort(e.target.value);
                  }}
                  className="flex py-1 px-2 h-8 bg-zinc-900 dark:bg-slate-400 border-none outline-none rounded-md md:text-sm"
                >
                  <option value="market-cap">Market Cap</option>
                  <option value="price">Price (USD)</option>
                  <option value="24h">24h Change</option>
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin, index) => (
            <tr key={coin.id} className="border-b border-slate-300 dark:border-slate-800">
              <td className="pr-4 py-2 text-slate-800 dark:text-slate-400">
                <span className={`hidden md:inline-flex ${index < 9 ? "mr-4" : "mr-2"}`}>
                  {index + 1}.
                </span>
                <img
                  className="inline mr-3 select-none"
                  src={coin.image}
                  alt="coin-image"
                  width="20"
                  height="20"
                ></img>
                <span className="text-slate-800 dark:text-slate-400">
                  {coin.name}{" "}
                </span>
                <span className="text-slate-400 dark:text-slate-600">
                  {coin.symbol.toUpperCase()}
                </span>
              </td>
              <td className="pr-8 pt-1 hidden md:table-cell">
                <span className="text-slate-800 dark:text-slate-400">
                  ${coin.market_cap.toLocaleString()}
                </span>
              </td>
              <td className="pr-8 pt-1 hidden md:table-cell">
                <span className="text-slate-800 dark:text-slate-400">
                  ${coin.current_price.toFixed(2)}
                </span>
              </td>
              <td
                className={
                  `hidden md:table-cell
                  ${coin.price_change_percentage_24h > 0
                    ? "text-green-700 dark:text-green-500"
                    : "text-red-700 dark:text-red-500"
                  }`
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="md:pr-8 pt-1 text-slate-800 dark:text-slate-400 md:hidden text-right">
                {selectedOption === "market-cap" && (
                  <>${coin.market_cap.toLocaleString()}</>
                )}
                {selectedOption === "price" && (
                  <>${coin.current_price.toFixed(2)}</>
                )}
                {selectedOption === "24h" && (
                  <span
                    className={
                      coin.price_change_percentage_24h > 0
                        ? "text-green-700 dark:text-green-500"
                        : "text-red-700 dark:text-red-500"
                    }
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CoinTable;
