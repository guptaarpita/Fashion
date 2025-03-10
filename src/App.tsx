import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { FaHeart, FaShoppingCart, FaTrash, FaUser, FaSearch } from 'react-icons/fa';
import { products } from './data/products';
import type { Product, CartItem } from './types';
import './App.css';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const categories = [
    'MEN', 'WOMEN', 'KIDS', 'HOME & LIVING', 'BEAUTY', 'STUDIO'
  ];

  const heroBackgrounds = [
    'https://images.pexels.com/photos/5868722/pexels-photo-5868722.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1600'
  ];

  const categoryImages = {
    Men: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600',
    Women: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1600',
    Kids: 'https://images.pexels.com/photos/5559986/pexels-photo-5559986.jpeg?auto=compress&cs=tinysrgb&w=1600',
    Accessories: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === heroBackgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success('Added to cart!');
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.success('Removed from cart!');
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const placeOrder = () => {
    setCart([]);
    toast.success('Order placed successfully!');
    setShowCart(false);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pink-500">FASHION</h1>
            </div>
            
            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <a
                  key={category}
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-md border border-gray-200 focus:outline-none focus:border-pink-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-6">
              <button className="flex flex-col items-center text-gray-700 hover:text-pink-500">
                <FaUser className="text-xl" />
                <span className="text-xs mt-1">Profile</span>
              </button>
              <button className="flex flex-col items-center text-gray-700 hover:text-pink-500">
                <FaHeart className="text-xl" />
                <span className="text-xs mt-1">Wishlist</span>
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="flex flex-col items-center text-gray-700 hover:text-pink-500 relative"
              >
                <FaShoppingCart className="text-xl" />
                <span className="text-xs mt-1">Bag</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Carousel */}
      <div 
        className="relative bg-cover bg-center py-32 transition-all duration-1000 ease-in-out" 
        style={{
          backgroundImage: `url("${heroBackgrounds[currentBgIndex]}")`,
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.85)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center relative z-10">
            <h2 className="text-6xl font-bold text-white mb-4 shadow-text">End of Season Sale</h2>
            <p className="text-3xl text-white mb-8 shadow-text">Up to 70% OFF on Premium Brands</p>
            <button className="bg-pink-500 text-white px-8 py-3 rounded-md hover:bg-pink-600 transition-colors text-lg transform hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>
        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroBackgrounds.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBgIndex ? 'bg-white w-4' : 'bg-white/50'
              }`}
              onClick={() => setCurrentBgIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Featured Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(categoryImages).map(([category, imageUrl]) => (
            <div key={category} className="relative group overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt={category}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <FaShoppingCart className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 mb-4 p-4 border rounded hover:shadow-md transition-shadow">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price} × {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg">Total:</span>
                    <span className="font-bold text-lg text-pink-500">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="relative group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" 
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md ${
                    wishlist.some(item => item.id === product.id)
                      ? 'text-pink-500'
                      : 'text-gray-400'
                  } hover:text-pink-500 transition-colors`}
                >
                  <FaHeart />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscribe to our Newsletter</h2>
          <p className="text-gray-600 mb-8">Get the latest updates on new products and upcoming sales</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-pink-500"
            />
            <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold mb-4">ONLINE SHOPPING</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-500">Men</a></li>
              <li><a href="#" className="hover:text-pink-500">Women</a></li>
              <li><a href="#" className="hover:text-pink-500">Kids</a></li>
              <li><a href="#" className="hover:text-pink-500">Home & Living</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">CUSTOMER POLICIES</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-pink-500">FAQ</a></li>
              <li><a href="#" className="hover:text-pink-500">T&C</a></li>
              <li><a href="#" className="hover:text-pink-500">Terms Of Use</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">EXPERIENCE APP</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-500">Android</a></li>
              <li><a href="#" className="hover:text-pink-500">iOS</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-pink-500">Facebook</a>
              <a href="#" className="hover:text-pink-500">Twitter</a>
              <a href="#" className="hover:text-pink-500">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;