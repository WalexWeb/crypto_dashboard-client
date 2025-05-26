

export const StatCard = ({
    title,
    value,
    change,
    icon,
    darkMode,
  }: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    darkMode: boolean;
  }) => {
    const isPositive = change.startsWith("+");
  
    return (
      <div
        className={`p-4 rounded-xl shadow-sm ${darkMode ? "bg-gray-700" : "bg-white"}`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {title}
            </p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div
            className={`p-2 rounded-full ${darkMode ? "bg-gray-600" : "bg-gray-100"}`}
          >
            {icon}
          </div>
        </div>
        <p
          className={`mt-2 text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {change} {isPositive ? "↑" : "↓"}
        </p>
      </div>
    );
  };