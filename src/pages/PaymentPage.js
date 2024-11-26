import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = ({ totalAmount }) => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
      if (formattedValue.length > 19) return; 
    }

    
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      if (value.length > 5) return;
    }

    
    if (name === 'cvv' && value.length > 3) return;

    setPaymentData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1500);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/'); 
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-8">Payment Details</h2>
      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-medium">Total Amount:</p>
          <p className="text-2xl font-bold text-blue-600">${totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-2">
            Card Holder Name
          </label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={paymentData.cardHolder}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleChange}
              placeholder="123"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg"
        >
          Pay Now
        </button>
      </form>

      
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Successful!</h3>
              <p className="text-sm text-gray-500 mb-6">
                Thank you for your purchase. Your order has been confirmed.
              </p>
              <button
                onClick={handleCloseModal}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;