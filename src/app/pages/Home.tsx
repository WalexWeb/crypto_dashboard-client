import { useState, useEffect } from "react";
import { useThemeStore } from "@/app/stores/CryptoStore";
import Navbar from "@/app/components/layout/Navbar";
import type { ICoin } from "@/types/ICoin.type";
import type { IMarketData } from "@/types/IMarketData.type";
import { instance } from "@/api/instance";
import { CoinTable } from "@/app/components/features/CoinTable";
import { MarketStats } from "@/app/components/features/MarketStats";
import { useDebounce } from "@/hooks/useDebounce";

const Home = () => {
  const { isDarkMode } = useThemeStore();
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [marketData, setMarketData] = useState<IMarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "market_cap",
    direction: "desc",
  });

  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coinsResponse, globalResponse] = await Promise.all([
          instance.get("/coins/markets", {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }),
          instance.get("/global"),
        ]);

        setCoins(coinsResponse.data);
        setMarketData(globalResponse.data.data);
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

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
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

  return (
    <div
      className={`h-full min-h-screen w-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="container mx-auto p-4">
        <MarketStats marketData={marketData} />

        <div
          className={`rounded-xl shadow-md overflow-hidden ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div
            className={`p-4 border-b ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h2 className="text-xl font-semibold">Топ криптовалют</h2>
          </div>
          <CoinTable
            coins={sortedCoins}
            sortConfig={sortConfig}
            handleSort={handleSort}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
