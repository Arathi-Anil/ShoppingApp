import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = ({ cart, setCart }) => {
  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter((item) => item !== itemToRemove));
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <div className="price">${item.price}</div>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <Link to="/checkout" className="checkout-button">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
