import React from "react";
import "./congratulations.css";
const CongratulationsModal = ({ onClose }) => {
  return (
    <div className="congratulations-modal">
      <div className="congratulations-content">
        <h2>Congratulations!</h2>
        <p>Your order has been successfully placed.</p>
        <button className="close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CongratulationsModal;
