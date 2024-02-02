import "./navbar.css";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartDialog from "../cart-dialog/cart-dialog"; // Import the CartDialog component
import { useDispatch, useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: any) => state.cartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCartDialog = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        {/* <img src="/path/to/your/logo.png" alt="Logo" className="logo" /> */}
      </div>
      <div className="cart-container">
        <div className="qts-cercle">
          <p>{cartItems?.length || 0}</p>
        </div>

        <FaShoppingCart className="cart-icon" onClick={handleCartClick} />
        {/* You can add a cart item count or any other cart-related content here */}
      </div>
      <CartDialog isOpen={isCartOpen} onClose={closeCartDialog} />
    </div>
  );
};

export default Navbar;
