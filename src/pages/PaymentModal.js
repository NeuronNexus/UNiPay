import React, { useState } from "react";
import "./PaymentModal.css";

const PaymentForm = ({ item, amount, onSub, onCancel }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !cardDetails.cardNumber ||
      !cardDetails.cardName ||
      !cardDetails.expiry ||
      !cardDetails.cvv
    ) {
      alert("Please fill out all fields.");
      return;
    }
    // Dummy submission
    onSub();
  };

  return (
    <section className="payment-form-container">
      <h3 className="payment-form-title">College Hub Secure Payment</h3>
      <p className="payment-form-subtitle">
        Paying for: {item} (₹ {amount})
      </p>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardName">Name on Card</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              placeholder="e.g., Test Student"
              value={cardDetails.cardName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiry">Expiry (MM/YY)</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            Pay Securely
          </button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel Payment
          </button>
        </div>
      </form>
    </section>
  );
};

export { PaymentForm };