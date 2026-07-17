import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/login";

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
      {!hideNav && <Navbar />}
    </>
  );
}

export default App;
