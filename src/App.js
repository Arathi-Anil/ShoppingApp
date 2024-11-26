import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import * as XLSX from "xlsx";
import Inventory from "./components/Inventory";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import Checkout from "./components/Checkout";
import PaymentPage from "./pages/PaymentPage";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "./App.css";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-lg mb-6">
      <div
        className="absolute flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)`, width: `${slides.length * 100}%` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-64">
            <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = (item) => {
    console.log("Adding to cart:", item);
    if (item.stock > 0) {
      setCart((prevCart) => [...prevCart, item]);
    } else {
      console.warn("Item out of stock:", item.name);
    }
  };

  useEffect(() => {
    console.log("Initiating data fetch from spreadsheet...");
    fetch(
      "https://docs.google.com/spreadsheets/d/14UU5DSss2LHT9Rpm07k33_1jj7vfMxchnVnXRsqkOD0/export?format=xlsx"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Spreadsheet fetch successful");
        return response.blob();
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            console.log("Raw spreadsheet data:", jsonData);

            const itemsWithDetails = jsonData.map((item) => ({
              id: item.ID || 0,
              name: item.Name || "Unnamed Item",
              category: item.Category || "Uncategorized",
              price: parseFloat(item["Price ($)"]) || 0.0,
              description: item.Description || "No description available.",
              stock: parseInt(item.Stock) || 0,
              image: item.Image || "https://via.placeholder.com/150",
            }));

            console.log("Processed inventory items:", itemsWithDetails);
            setItems(itemsWithDetails);
            setDataLoading(false);
          } catch (error) {
            console.error("Error processing spreadsheet data:", error);
            setError("Failed to process spreadsheet data");
            setDataLoading(false);
          }
        };

        reader.onerror = (error) => {
          console.error("Error reading spreadsheet file:", error);
          setError("Failed to read spreadsheet file");
          setDataLoading(false);
        };

        reader.readAsArrayBuffer(blob);
      })
      .catch((error) => {
        console.error("Error fetching spreadsheet:", error);
        setError("Failed to fetch spreadsheet");
        setDataLoading(false);
      });
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="p-4 text-red-500 bg-white rounded-lg shadow-md">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
                MyChoice
              </Link>
              <div className="flex items-center space-x-6">
                <Link 
                  to="/cart" 
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span className="mr-1">Cart</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                    {cart.length}
                  </span>
                </Link>
                <Link 
                  to="/wishlist" 
                  className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span className="mr-1">Wishlist</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                    {wishlist.length}
                  </span>
                </Link>
                <Link 
                  to="/checkout" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            {!dataLoading && <Carousel />}
            {dataLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-gray-600">
                  <svg className="animate-spin h-8 w-8 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Loading inventory...
                </div>
              </div>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    <Inventory
                      items={items}
                      addToCart={addToCart}
                      cart={cart}
                      wishlist={wishlist}
                      setWishlist={setWishlist}
                      setCart={setCart}
                    />
                  }
                />
                <Route
                  path="/cart"
                  element={<Cart cart={cart} setCart={setCart} />}
                />
                <Route
                  path="/wishlist"
                  element={
                    <Wishlist
                      wishlist={wishlist}
                      setWishlist={setWishlist}
                      setCart={setCart}
                    />
                  }
                />
                <Route path="/checkout" element={<Checkout cart={cart} />} />
                <Route path="/payment" element={<PaymentPage />} />
              </Routes>
            )}
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;