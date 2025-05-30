import { Route, Routes } from "react-router-dom";
import Home from "./app/pages/Home";
import CoinDetail from "./app/pages/CoinDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<CoinDetail />} />
      </Routes>
    </>
  );
}

export default App;
