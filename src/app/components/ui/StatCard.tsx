import { motion } from "framer-motion";

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
  const isPositive = !change.startsWith("-");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className={`p-5 rounded-xl shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"} border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p
            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} mb-1`}
          >
            {title}
          </p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
        >
          {icon}
        </div>
      </div>
      <p
        className={`mt-3 text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}
      >
        {change} {isPositive ? "↑" : "↓"}
      </p>
    </motion.div>
  );
};
