// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as XLSX from "xlsx";
import Inventory from "./components/Inventory";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";
import "./App.css";  // Ensure App.css is imported here

const App = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]); // Update cart by adding the item
  };

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/14UU5DSss2LHT9Rpm07k33_1jj7vfMxchnVnXRsqkOD0/export?format=xlsx"
    )
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(sheet);

          const itemsWithDetails = jsonData.map((item, index) => ({
            id: index + 1,
            name: item.Name || "Unnamed Item",
            description: item.Description || "No description available.",
            price: item.Price || 0.0,
            image: item.Image || "https://via.placeholder.com/150", // Use actual images
          }));

          setItems(itemsWithDetails);
        };
        reader.readAsArrayBuffer(blob);
      });
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <nav className="navbar">
            <Link to="/" className="logo">
              <h2>Shopify</h2>
            </Link>
            <div className="nav-links">
              <Link to="/cart" className="nav-link">Cart ({cart.length})</Link>
              <Link to="/wishlist" className="nav-link">Wishlist ({wishlist.length})</Link>
              <Link to="/checkout" className="nav-link">Checkout</Link>
            </div>
          </nav>
        </header>

        <div className="main-content">
          <div className="products">
            <h3>Featured Products</h3>
            <Routes>
              <Route
                path="/"
                element={
                  <Inventory
                    items={items}
                    addToCart={addToCart}  // Pass addToCart as a prop
                    cart={cart}
                    wishlist={wishlist}
                    setWishlist={setWishlist}
                    setCart={setCart}  // Pass setCart as a prop
                  />
                }
              />
              <Route
                path="/cart"
                element={<Cart cart={cart} setCart={setCart} />}
              />
              <Route
                path="/wishlist"
                element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} setCart={setCart} />}
              />
              <Route path="/checkout" element={<Checkout cart={cart} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
