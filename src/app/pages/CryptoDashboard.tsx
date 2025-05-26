import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaBitcoin,
  FaStar,
  FaRegStar,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { SiEthereum } from "react-icons/si";
import { useFavoritesStore, useThemeStore } from "../stores/CryptoStore";
import { StatCard } from "../components/ui/StatCard";
import Navbar from "../components/layout/Navbar";
import type { Coin } from "../../types/Coin.type";

const CryptoDashboard = () => {
  const { isDarkMode } = useThemeStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "market_cap",
    direction: "desc",
  });

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Фильтрация и сортировка
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    if (sortConfig.key === "name") {
      return sortConfig.direction === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortConfig.direction === "asc"
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    }
  });

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div
      className={`h-full min-h-screen w-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Основной контент */}
      <main className="container mx-auto p-4">
        {/* Статистика */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Общая капитализация"
            value="$1.24T"
            change="+2.4%"
            icon={<FaBitcoin />}
            darkMode={isDarkMode}
          />
          <StatCard
            title="Объем за 24ч"
            value="$48.5B"
            change="+5.2%"
            icon={<SiEthereum />}
            darkMode={isDarkMode}
          />
          <StatCard
            title="Доминирование BTC"
            value="42.8%"
            change="-0.7%"
            icon={<FaBitcoin />}
            darkMode={isDarkMode}
          />
          <StatCard
            title="Активные криптосистемы"
            value="12,345"
            change="+1.2%"
            icon={<FaBitcoin />}
            darkMode={isDarkMode}
          />
        </div>

        {/* Таблица монет */}
        <div
          className={`rounded-xl shadow-md overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        >
          <div
            className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
          >
            <h2 className="text-xl font-semibold">Топ криптовалют</h2>
          </div>

          {loading ? (
            <div className="p-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-16 mb-2 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} animate-pulse`}
                ></div>
              ))}
            </div>
          ) : (
            <>
              {/* Заголовки таблицы */}
              <div
                className={`grid grid-cols-12 p-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"} font-semibold`}
              >
                <div className="col-span-1">#</div>
                <div
                  className="col-span-3 cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Coin
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "asc" ? (
                      <FaArrowUp className="inline" />
                    ) : (
                      <FaArrowDown className="inline" />
                    ))}
                </div>
                <div
                  className="col-span-2 text-right cursor-pointer"
                  onClick={() => handleSort("current_price")}
                >
                  Price{" "}
                  {sortConfig.key === "current_price" &&
                    (sortConfig.direction === "asc" ? (
                      <FaArrowUp className="inline" />
                    ) : (
                      <FaArrowDown className="inline" />
                    ))}
                </div>
                <div
                  className="col-span-2 text-right cursor-pointer"
                  onClick={() => handleSort("price_change_percentage_24h")}
                >
                  24h %{" "}
                  {sortConfig.key === "price_change_percentage_24h" &&
                    (sortConfig.direction === "asc" ? (
                      <FaArrowUp className="inline" />
                    ) : (
                      <FaArrowDown className="inline" />
                    ))}
                </div>
                <div
                  className="col-span-3 text-right cursor-pointer"
                  onClick={() => handleSort("market_cap")}
                >
                  Market Cap{" "}
                  {sortConfig.key === "market_cap" &&
                    (sortConfig.direction === "asc" ? (
                      <FaArrowUp className="inline" />
                    ) : (
                      <FaArrowDown className="inline" />
                    ))}
                </div>
                <div className="col-span-1 text-right">★</div>
              </div>

              {/* Список монет */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedCoins.map((coin, index) => (
                  <motion.div
                    key={coin.id}
                    variants={itemVariants}
                    className={`grid grid-cols-12 items-center p-4 border-b ${isDarkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    <div className="col-span-1">{index + 1}</div>
                    <div className="col-span-3 flex items-center gap-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6"
                      />
                      <span>{coin.name}</span>
                      <span className="text-gray-500">
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                    <div className="col-span-2 text-right">
                      ${coin.current_price.toLocaleString()}
                    </div>
                    <div
                      className={`col-span-2 text-right ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className="col-span-3 text-right">
                      ${coin.market_cap.toLocaleString()}
                    </div>
                    <div className="col-span-1 text-right">
                      <button onClick={() => toggleFavorite(coin.id)}>
                        {isFavorite(coin.id) ? (
                          <FaStar className="text-yellow-500" />
                        ) : (
                          <FaRegStar className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CryptoDashboard;
