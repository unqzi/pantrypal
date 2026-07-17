import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("fridge");
  const [product, setProduct] = useState("1");
  const [expdate, setExpdate] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/inventory", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setItems(response.data));
  }, []);

  function handleAdd(e) {
    e.preventDefault();
    api
      .post(
        "/inventory",
        {
          product_id: product,
          quantity,
          location,
          expiry_date: expdate,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then(() => {
        api
          .get("/inventory", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setItems(res.data);
            setShowAddForm(false);
          });
      });
  }

  function handleDelete(id) {
    api
      .delete(`/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        api
          .get("/inventory", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => setItems(res.data));
      });
  }

  function handleUpdate(e) {
    e.preventDefault();

    api
      .put(
        `/inventory/${editingItem.id}`,
        {
          product_id: editingItem.product_id,
          quantity: Number(editingItem.quantity),
          location: editingItem.location,
          expiry_date: editingItem.expiry_date?.slice(0, 10),
        },

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then(() => {
        api
          .get("/inventory", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setItems(res.data);
            console.log(res.data);
            setEditingItem(null);
          });
      });
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  if (showAddForm) {
    return (
      <div className="add-page">
        <div className="add-header">
          <button className="back-btn" onClick={() => setShowAddForm(false)}>
            ‹
          </button>
          <h2>Add item</h2>
        </div>
        <form onSubmit={handleAdd}>
          <div className="field-group">
            <label>PRODUCT ID</label>
            <input
              type="number"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="field-group">
            <label>LOCATION</label>
            <div className="location-pills">
              {["fridge", "pantry", "freezer"].map((loc) => (
                <button
                  key={loc}
                  type="button"
                  className={`pill ${location === loc ? "active" : ""}`}
                  onClick={() => setLocation(loc)}
                >
                  {loc.charAt(0).toUpperCase() + loc.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="field-group">
            <label>QUANTITY</label>
            <div className="stepper">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(0, Number(q) - 1))}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Number(q) + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="field-group">
            <label>EXPIRY DATE</label>
            <input
              type="date"
              value={expdate}
              onChange={(e) => setExpdate(e.target.value)}
            />
          </div>
          <button type="submit" className="save-btn">
            Save to inventory
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Inventory</h1>
      <button className="secondary" onClick={handleLogout}>
        logout
      </button>
      {items.map((item) => {
        const today = new Date();
        const expiry = item.expiry_date ? new Date(item.expiry_date) : null;
        const daysLeft = expiry
          ? Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
          : null;
        const dotColor =
          daysLeft === null
            ? "#aaa"
            : daysLeft <= 0
              ? "#c0392b"
              : daysLeft <= 3
                ? "#e67e22"
                : "#3f7d4e";

        return (
          <div key={item.id} className="item-card">
            <span className="item-dot" style={{ background: dotColor }} />
            <div className="item-info">
              <p className="item-name">Product {item.product_id}</p>
              <p className="item-sub" style={{ textTransform: "capitalize" }}>
                {item.location} · {item.quantity}
              </p>
            </div>
            <div className="item-right">
              {daysLeft !== null && (
                <span
                  className="expiry-badge"
                  style={{
                    color: dotColor,
                    background: dotColor + "18",
                  }}
                >
                  {daysLeft <= 0 ? "Expired" : `${daysLeft}d`}
                </span>
              )}
              <div className="item-actions">
                <button
                  className="danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <button
                  className="secondary"
                  onClick={() => setEditingItem(item)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
      {editingItem && (
        <form className="edit-section" onSubmit={handleUpdate}>
          <input
            type="number"
            value={editingItem.quantity}
            placeholder="quantity"
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                quantity: e.target.value,
              })
            }
          />
          <select
            value={editingItem.location}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                location: e.target.value,
              })
            }
          >
            <option value="fridge">Fridge</option>
            <option value="freezer">Freezer</option>
            <option value="pantry">Pantry</option>
          </select>
          <input
            type="date"
            value={editingItem.expiry_date?.slice(0, 10)}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                expiry_date: e.target.value,
              })
            }
          />
          <button type="submit">Save</button>
        </form>
      )}
      <button className="fab" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? "✕" : "+"}
      </button>
    </div>
  );
}

export default Inventory;
