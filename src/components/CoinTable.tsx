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
      case "price":
        comparison = a.current_price - b.current_price;
        break;
      case "market-cap":
        comparison = a.market_cap - b.market_cap;
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
    <div>
      <table>
        <thead>
          <tr className="text-gray-300 text-left select-none">
            <th
              className="pr-8 underline underline-offset-4 decoration-2"
              onClick={() => handleSort("")}
            >
              Rank
            </th>
            <th
              className="pr-8 underline underline-offset-4 decoration-2"
              onClick={() => handleSort("")}
            >
              Coin
            </th>
            <th className="pr-8">
              <span
                onClick={() => handleSort("price")}
                className="cursor-pointer"
              >
                <span
                  className={
                    sortBy.filter === "price"
                      ? "underline underline-offset-4 decoration-2 text-gray-500"
                      : "underline underline-offset-4 decoration-2"
                  }
                >
                  Price (USD)
                </span>{" "}
                {renderArrow("price")}
              </span>
            </th>
            <th className="pr-8">
              <span
                onClick={() => handleSort("market-cap")}
                className="cursor-pointer"
              >
                <span
                  className={
                    sortBy.filter === "market-cap"
                      ? "underline underline-offset-4 decoration-2 text-gray-500"
                      : "underline underline-offset-4 decoration-2"
                  }
                >
                  Market Cap (USD)
                </span>{" "}
                {renderArrow("market-cap")}
              </span>
            </th>
            <th className="pr-8">
              <span
                onClick={() => handleSort("24h")}
                className="cursor-pointer"
              >
                <span
                  className={
                    sortBy.filter === "24h"
                      ? "underline underline-offset-4 decoration-2 text-gray-500"
                      : "underline underline-offset-4 decoration-2"
                  }
                >
                  24h
                </span>{" "}
                {renderArrow("24h")}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCoins.map((coin, index) => (
            <tr key={coin.id}>
              <td className="pr-8 pt-1 text-gray-400 select-none">
                {index + 1}
              </td>
              <td className="pr-8 pt-1 text-gray-400">
                <img
                  className="inline mr-3 select-none"
                  src={coin.image}
                  alt="coin-image"
                  width="20"
                  height="20"
                ></img>
                {coin.name}{" "}
                <span className="text-gray-600">
                  {coin.symbol.toUpperCase()}
                </span>
              </td>
              <td className="pr-8 pt-1 text-gray-400">
                ${coin.current_price.toFixed(2)}
              </td>
              <td className="pr-8 pt-1 text-gray-400">
                ${coin.market_cap.toLocaleString()}
              </td>
              <td
                className={
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
