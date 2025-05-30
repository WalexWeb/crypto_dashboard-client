import { FaBitcoin, FaCoins, FaChartLine, FaFire } from "react-icons/fa";
import { StatCard } from "../ui/StatCard";
import type { IMarketData } from "../../../types/IMarketData.type";
import { useThemeStore } from "../../stores/CryptoStore";

interface StatsCardsProps {
  marketData: IMarketData | null;
}

export const MarketStats = ({ marketData }: StatsCardsProps) => {
  // Форматирование чисел
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const { isDarkMode } = useThemeStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Общая капитализация"
        value={
          marketData
            ? formatNumber(marketData.total_market_cap.usd)
            : "Loading..."
        }
        change={
          marketData
            ? `${marketData.market_cap_change_percentage_24h_usd.toFixed(2)}%`
            : "0%"
        }
        icon={<FaCoins className="text-yellow-500" />}
        darkMode={isDarkMode}
      />
      <StatCard
        title="Объем за 24ч"
        value={
          marketData ? formatNumber(marketData.total_volume.usd) : "Loading..."
        }
        change={
          marketData
            ? `${((marketData.total_volume.usd / marketData.total_market_cap.usd) * 100).toFixed(2)}%`
            : "0%"
        }
        icon={<FaChartLine className="text-blue-500" />}
        darkMode={isDarkMode}
      />
      <StatCard
        title="Доминирование BTC"
        value={
          marketData
            ? `${marketData.market_cap_percentage.btc.toFixed(1)}%`
            : "Loading..."
        }
        change={
          marketData
            ? `${(marketData.market_cap_percentage.btc - 42.8).toFixed(1)}%`
            : "0%"
        }
        icon={<FaBitcoin className="text-orange-500" />}
        darkMode={isDarkMode}
      />
      <StatCard
        title="Активные криптосистемы"
        value={
          marketData
            ? marketData.active_cryptocurrencies.toLocaleString()
            : "Loading..."
        }
        change="+1.2%"
        icon={<FaFire className="text-red-500" />}
        darkMode={isDarkMode}
      />
    </div>
  );
};
