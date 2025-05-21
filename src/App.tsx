import { Route, Routes } from "react-router-dom";
import CryptoDashboard from "./app/pages/CryptoDashboard";
import CoinDetail from "./app/pages/CoinDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CryptoDashboard />} />
        <Route path="/detail" element={<CoinDetail />} />
      </Routes>
    </>
  );
}

export default App;
