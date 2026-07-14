import api from "../api";
import { useState, useEffect } from "react";

function Inventory() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api
      .get("/inventory", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setItems(response.data));
  }, []);
  return (
    <div>
      <h1>Inventory</h1>
      {items.map((item) => {
        return (
          <p key={item.id}>
            {item.location} - {item.quantity}
          </p>
        );
      })}
    </div>
  );
}

export default Inventory;
