import React from "react";
import "./Wishlist.css";

const Wishlist = ({ wishlist, setWishlist, cart, setCart }) => {
  const removeFromWishlist = (itemToRemove) => {
    setWishlist(wishlist.filter((item) => item !== itemToRemove));
  };

  const moveToCart = (itemToMove) => {
    setCart((prevCart) => [...prevCart, itemToMove]);
    removeFromWishlist(itemToMove); // Remove from wishlist after moving to cart
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item, index) => (
            <div key={index} className="wishlist-item">
              <img src={item.imageUrl} alt={item.name} className="wishlist-item-image" />
              <div className="wishlist-item-details">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <div className="price">${item.price}</div>
                <div className="wishlist-actions">
                  <button
                    className="remove-button"
                    onClick={() => removeFromWishlist(item)}
                  >
                    Remove
                  </button>
                  <button
                    className="move-to-cart-button"
                    onClick={() => moveToCart(item)}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
