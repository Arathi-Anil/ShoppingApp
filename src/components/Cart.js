import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter((item) => item !== itemToRemove));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          Your cart is empty.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <p className="text-blue-600 font-medium mt-2">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="ml-4 px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link
              to="/checkout"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;