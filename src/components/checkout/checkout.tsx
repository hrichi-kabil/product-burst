import React, { useState } from "react";
import "./checkout-modal.css";
import CongratulationsModal from "../congratulations/congratulations";

interface CheckoutModalProps {
  cartItems: any[]; // Adjust the type accordingly
  userInfo: any; // Adjust the type accordingly
  onClose: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  cartItems,
  userInfo,
  onClose,
  handleInputChange,
}) => {
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qts,
    0
  );

  const handleConfirmOrder = () => {
    if (name == "" || address == "" || phone == "") {
      setErrorMessage("Please fill in all required fields.");
    } else {
      setShowCongratulationsModal(true);
    }
  };

  return (
    <div className="checkout-modal">
      {showCongratulationsModal ? (
        <CongratulationsModal
          onClose={() => setShowCongratulationsModal(false)}
        />
      ) : (
        <div className="checkout-content">
          <h2>Checkout</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.title} className="checkout-item">
                <p className="title-cart-item">{item.name}</p>
                <p>Quantity: {item.qts}</p>
                <p>Price: {item.price} €</p>
                <p>Total: {item.qts * item.price} €</p>
              </div>
            ))}
          </div>

          <div className="total-price">Total: {totalPrice} €</div>
          <div className="custom-radio">
            <input type="radio" id="radio1" name="color" checked />
            <label className="payment-text">payment on delivery</label>
          </div>
          <div className="user-info">
            <input
              className="input"
              type="text"
              name="Full name"
              value={name}
              placeholder="Full name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input"
              type="text"
              name="addresse"
              value={address}
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className="input"
              type="text"
              name="phone"
              value={phone}
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="checkout-actions">
            <button className="close" onClick={onClose}>
              Close
            </button>
            <button className="confirm" onClick={handleConfirmOrder}>
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutModal;
