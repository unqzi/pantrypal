import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <>
      <h1>PantryPal</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  );
}

export default App;
