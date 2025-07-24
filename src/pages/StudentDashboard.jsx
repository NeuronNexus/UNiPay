import React, { useState, useEffect } from "react";
import { PaymentForm } from "./PaymentModal";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const collegeName =
    localStorage.getItem("collegeName") || "IIT Tirupati";
  const sessionId = localStorage.getItem("sessionId") || "SESSION-87999";
  const permanentSID = localStorage.getItem("permanentSID") || "STU_PAY_112358";

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ item: "", amount: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayClick = (item, amount) => {
    setPaymentDetails({ item, amount });
    setShowPaymentForm(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentForm(false);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    setShowSuccess(true);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="dashboard-bg">
      {showSuccess && (
        <div className="payment-success-message">
          ✅ Payment Successful! Your transaction has been recorded.
        </div>
      )}
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header-box">
          <div>
            <h3 className="header-title">{collegeName}</h3>
            <span className="header-subtitle">Welcome, Student!</span>
          </div>
          <div className="session-id-box">
            <span className="session-id-label">Session ID</span>
            <div className="session-id-content">
              <span className="session-id-value">{sessionId}</span>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${sessionId}&size=60x60`}
                alt="QR Code"
                className="qr-code"
              />
            </div>
          </div>
        </header>

        <main className="dashboard-main">
          {/* Left Column */}
          <div className="dashboard-col-left">
            {/* Pending Payments */}
            <section className="dashboard-card">
              <h3 className="card-title">Pending Payments</h3>
              <table className="dashboard-table">
                {/* ... table content ... */}
                <tbody>
                  <tr>
                    <td>Tuition Fee (Fall Sem)</td>
                    <td>01-Aug-2025</td>
                    <td>₹ 85,000</td>
                    <td>
                      <button
                        className="pay-btn"
                        onClick={() => handlePayClick("Tuition Fee (Fall Sem)", "85,000")}
                      >
                        Pay Now
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Hostel Fee</td>
                    <td>15-Aug-2025</td>
                    <td>₹ 40,000</td>
                    <td>
                      <button className="pay-btn" onClick={() => handlePayClick("Hostel Fee", "40,000")}>
                        Pay Now
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

              {/* Events & Opportunities */}
            <section className="dashboard-card">
              <h3 className="card-title">Events & Opportunities</h3>
              <div className="events-row">
                <div className="event-card">
                  <div className="event-title">AI/ML Workshop</div>
                  <div className="event-description">
                    Join us for a 3-day workshop on the future of AI.
                  </div>
                  <div className="event-footer">
                    <span className="event-price">₹ 500</span>
                    <button className="details-btn">✨ Get Details</button>
                  </div>
                </div>
                <div className="event-card">
                  <div className="event-title">
                    Annual Tech Fest 'Innovate 2025'
                  </div>
                  <div className="event-description">
                    The biggest tech fest of the year is here!
                  </div>
                  <div className="event-footer">
                    <span className="event-price">FREE</span>
                    <button className="details-btn">✨ Get Details</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="dashboard-col-right">
            {/* Universal Student ID */}
            <section className="dashboard-card">
              <h3 className="card-title-lg">Universal Student ID</h3>
              <p className="card-description">
                Use this ID on partner websites for instant student discounts.
              </p>
              <div className="sid-box">
                <span className="sid-label">Your Permanent SID</span>
                <div className="sid-value">{permanentSID}</div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="dashboard-card">
              <h3 className="card-title-lg">Quick Actions</h3>
              <ul className="quick-actions">
                <li>
                  <a href="#/transaction-history" className="action-link history">Transaction History</a>
                </li>
                <li>
                  <a href="#/submit-grievance" className="action-link grievance">✨ Submit a Grievance</a>
                </li>
                <li>
                  <a href="#/logout" className="action-link logout">Logout</a>
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>

        {/* Conditionally Rendered Payment Form */}
        {showPaymentForm && (
          <PaymentForm
            item={paymentDetails.item}
            amount={paymentDetails.amount}
            onSub={handlePaymentSuccess}
            onCancel={handleCancelPayment}
          />
        )}
      </div>
  );
};

export { StudentDashboard };