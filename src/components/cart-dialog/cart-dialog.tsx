import React, { useState } from "react";
import "./cart-dialog.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart, updateCartItem } from "../../store/actions";
import CheckoutModal from "../checkout/checkout"; // Import CheckoutModal component

interface CartDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDialog: React.FC<CartDialogProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    // Add more fields as needed
  });

  const cartItems = useSelector((state: any) => state.cartItems);

  const changeQuantity = (id: string, value: number) => {
    const filteredItem = cartItems.find((prod: any) => prod.title === id);

    filteredItem.qts + value > 0 &&
      dispatch(
        updateCartItem(id, { ...filteredItem, qts: filteredItem.qts + value })
      );
  };

  const handleDelete = (id: string) => {
    dispatch(deleteFromCart(id));
  };

  const checkout = () => {
    setShowCheckoutModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return showCheckoutModal ? (
    <CheckoutModal
      cartItems={cartItems}
      userInfo={userInfo}
      onClose={() => setShowCheckoutModal(false)}
      handleInputChange={handleInputChange}
    />
  ) : (
    <div className={`cart-dialog ${isOpen ? "open" : ""}`}>
      <div className="cart-content">
        <h2>Cart</h2>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.title} className="cart-item">
              <p className="title-cart-item">{item.name}</p>
              <p>
                Quantity:
                <button
                  onClick={() => changeQuantity(item.title, -1)}
                  className="qts-button"
                >
                  -
                </button>
                {item.qts}
                <button
                  onClick={() => changeQuantity(item.title, 1)}
                  className="qts-button"
                >
                  +
                </button>
              </p>
              <p>Price: ${item.price}</p>
              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="cart-actions">
          <button className="close" onClick={onClose}>
            Close
          </button>
          <button className="checkout" onClick={checkout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDialog;
