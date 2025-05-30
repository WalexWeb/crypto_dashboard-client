import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useFavoritesStore, useThemeStore } from "../../stores/CryptoStore";
import type { ICoin } from "../../../types/ICoin.type";
import { containerVariants, itemVariants } from "../animations/animations";

interface ICoinTableProps {
  coins: ICoin[];
  sortConfig: {
    key: string;
    direction: "asc" | "desc";
  };
  handleSort: (key: string) => void;
  loading: boolean;
}

export const CoinTable = ({
  coins,
  sortConfig,
  handleSort,
  loading,
}: ICoinTableProps) => {
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  const { isDarkMode } = useThemeStore();

  if (loading) {
    return (
      <div className="p-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-16 mb-2 rounded-lg ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            } animate-pulse`}
          ></div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Заголовки таблицы */}
      <div
        className={`grid grid-cols-12 text-lg p-4 ${
          isDarkMode ? "bg-gray-700" : "bg-gray-100"
        } font-semibold`}
      >
        <div className="col-span-1">#</div>
        <div
          className="col-span-3 cursor-pointer"
          onClick={() => handleSort("name")}
        >
          Криптовалюта
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
          Цена
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
          24ч %
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
          Капитализация{" "}
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
        {coins.map((coin, index) => (
          <motion.div
            key={coin.id}
            variants={itemVariants}
            className={`grid grid-cols-12 items-center p-4 border-b ${
              isDarkMode
                ? "border-gray-700 hover:bg-gray-700"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <div className="col-span-1">{index + 1}</div>
            <div className="col-span-3 flex items-center gap-2">
              <img src={coin.image} alt={coin.name} className="w-6 h-6" />
              <span>{coin.name}</span>
              <span className="text-gray-500">{coin.symbol.toUpperCase()}</span>
            </div>
            <div className="col-span-2 text-right">
              ${coin.current_price.toLocaleString()}
            </div>
            <div
              className={`col-span-2 text-right ${
                coin.price_change_percentage_24h >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
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
  );
};
