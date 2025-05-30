import { FaBitcoin, FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useThemeStore } from "../../stores/CryptoStore";

interface ISearch {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

function Navbar({ searchTerm, setSearchTerm }: ISearch) {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header
      className={`sticky top-0 z-10 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-md p-4`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <FaBitcoin className="text-orange-500 text-2xl" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
            CryptoScope
          </h1>
        </div>

        <div className="relative h-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Найти валюту..."
            className={`w-full px-10 py-2 text-md rounded-lg ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button
          onClick={toggleTheme}
          className={`cursor-pointer p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-200 text-gray-700"}`}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
