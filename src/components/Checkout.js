import React, { useState } from "react";
import "./Checkout.css";

const Checkout = ({ cart }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Purchase successful! Thank you for shopping.");
    // Optionally reset the form and cart state here
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="checkout-item">
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Billing Details</h2>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
