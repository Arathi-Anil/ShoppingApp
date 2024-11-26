import React, { useState } from "react";
import PaymentPage from "../pages/PaymentPage";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });
  const [showPayment, setShowPayment] = useState(false);

  const consolidateCart = (cart) => {
    const itemMap = new Map();
    
    cart.forEach(item => {
      if (itemMap.has(item.id)) {
        const existingItem = itemMap.get(item.id);
        existingItem.quantity += 1;
      } else {
        itemMap.set(item.id, { ...item, quantity: 1 });
      }
    });

    return Array.from(itemMap.values());
  };

  const consolidatedCart = consolidateCart(cart);

  const totalPrice = consolidatedCart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  if (showPayment) {
    return <PaymentPage totalAmount={totalPrice} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary Section */}
        <div className="bg-white rounded-lg shadow-sm h-fit lg:sticky lg:top-6">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
          </div>
          
          {consolidatedCart.length === 0 ? (
            <div className="p-6">
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-[calc(100vh-400px)] overflow-y-auto p-6">
                <div className="space-y-6">
                  {consolidatedCart.map((item) => (
                    <div 
                      key={item.id} 
                      className="border-b pb-6 last:border-b-0 hover:bg-gray-50 p-4 -mx-4 rounded-lg transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-sm font-medium text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-gray-600">
                        <span className="inline-flex items-center justify-center px-2 py-1 bg-gray-100 rounded-md">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold text-blue-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

       
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-8">Billing Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label 
                htmlFor="address" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button 
              type="submit" 
              disabled={consolidatedCart.length === 0}
              className="w-full mt-6 px-6 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;