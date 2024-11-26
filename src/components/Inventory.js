// Inventory.js
import React from 'react';
import './Inventory.css';  // Custom styles for Inventory

const Inventory = ({ items, addToCart, cart, wishlist, setWishlist, setCart }) => {
  return (
    <div className="container">
      <h2 className="app-name">The new Products..!!</h2>
      <div className="products">
        {items.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <div className="price">${item.price}</div>
            <div className="buttons">
              <button onClick={() => addToCart(item)}>Add to Cart</button>
              <button className="wishlist-button" onClick={() => setWishlist([...wishlist, item])}>
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
