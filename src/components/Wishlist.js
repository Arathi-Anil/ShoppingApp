import React from "react";

const Wishlist = ({ wishlist, setWishlist, cart, setCart }) => {
  const removeFromWishlist = (itemToRemove) => {
    setWishlist(wishlist.filter((item) => item !== itemToRemove));
  };

  const moveToCart = (itemToMove) => {
    setCart((prevCart) => [...prevCart, itemToMove]);
    removeFromWishlist(itemToMove);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Your Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          Your wishlist is empty.
        </div>
      ) : (
        <div className="space-y-6">
          {wishlist.map((item, index) => (
            <div 
              key={index} 
              className="flex gap-6 p-4 border rounded-lg shadow-sm bg-white"
            >
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-32 h-32 object-cover rounded-md"
              />
              
              <div className="flex-1">
                <h4 className="text-xl font-semibold">{item.name}</h4>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <div className="text-blue-600 font-medium mt-2">
                  ${item.price}
                </div>
                
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => removeFromWishlist(item)}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => moveToCart(item)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors"
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