import React from 'react';

const Inventory = ({ items, addToCart, cart, wishlist, setWishlist, setCart }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Latest collection..!!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                {item.description}
              </p>
              <div className="text-2xl font-bold text-blue-600 mb-4">
                ${item.price}
              </div>
              <div className="space-y-2">
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => setWishlist([...wishlist, item])}
                  className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;