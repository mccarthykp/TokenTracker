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
    filter: "",
    ascending: true,
  });
  const [selectedOption, setSelectedOption] = useState<string>("price");

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
        comparison =
          a.price_change_percentage_24h - b.price_change_percentage_24h;
        break;
      default:
        break;
    }
    return sortBy.ascending ? comparison : -comparison;
  });

  // Function to handle sorting when a filter is clicked
  const handleSort = (filter: string) => {
    if (["price", "market-cap", "24h"].includes(filter)) {
      setSortBy((prevState) => {
        if (prevState.filter === filter) {
          return { ...prevState, ascending: !prevState.ascending };
        } else {
          return { filter, ascending: true };
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

  return (
    <div className="text-xs md:text-base">
      <table className="w-full">
        <thead>
          <tr className="text-slate-300 text-left select-none">
            <th
              className="pr-8 underline underline-offset-4 decoration-2 flex md:table-cell"
              onClick={() => handleSort("")}
            >
              Coin
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
                    }`
                  }
                >
                  Price (USD)
                </span>{" "}
                {renderArrow("price")}
              </span>
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
                    }`
                  }
                >
                  Market Cap (USD)
                </span>{" "}
                {renderArrow("market-cap")}
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
                    }`
                  }
                >
                  24h
                </span>{" "}
                {renderArrow("24h")}
              </span>
            </th>
            <th>
              <div className="flex justify-between text-slate-900 md:hidden">
                <select
                  id="data-select"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="p-1 bg-slate-400 border-none outline-none rounded-md md:text-sm"
                >
                  <option className="text-slate-900 font-medium" value="price">Price (USD)</option>
                  <option className="text-slate-900 font-medium" value="market-cap">Market Cap (USD)</option>
                  <option className="text-slate-900 font-medium" value="24h">24h Change</option>
                </select>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin, index) => (
            <tr key={coin.id} className="border-b border-slate-800">
              <td className="pr-8 py-2 text-slate-400">
                <span className={index < 9 ? "mr-5" : "mr-3"}>
                  {index + 1}.
                </span>
                <img
                  className="inline mr-3 select-none"
                  src={coin.image}
                  alt="coin-image"
                  width="20"
                  height="20"
                ></img>
                {coin.name}{" "}
                <span className="text-slate-600">
                  {coin.symbol.toUpperCase()}
                </span>
              </td>
              <td className="pr-8 pt-1 text-slate-400 hidden md:table-cell">
                ${coin.current_price.toFixed(2)}
              </td>
              <td className="pr-8 pt-1 text-slate-400 hidden md:table-cell">
                ${coin.market_cap.toLocaleString()}
              </td>
              <td
                className={
                  `hidden md:table-cell
                  ${coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                  }`
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="md:pr-8 pt-1 text-slate-400 md:hidden text-right">
                {selectedOption === "price" && (
                  <>${coin.current_price.toFixed(2)}</>
                )}
                {selectedOption === "market-cap" && (
                  <>${coin.market_cap.toLocaleString()}</>
                )}
                {selectedOption === "24h" && (
                  <span
                    className={
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
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
    </div>
  );
};

export default CoinTable;
