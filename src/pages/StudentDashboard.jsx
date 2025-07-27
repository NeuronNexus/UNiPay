import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./StudentDashboard.css";


function validateWalletLogin(userId, password) {
  // Accept any non-empty values for demo
  return userId && userId.length > 0 && password && password.length > 0; // Simple check for non-empty
}

const StudentDashboard = () => {
  const collegeName =
    localStorage.getItem("collegeName") || "IIT Tirupati"; // Default from previous context
  const sessionId = localStorage.getItem("sessionId") || "SESSION-87999";
  const permanentSID = localStorage.getItem("permanentSID") || "STU_PAY_112358";

  // Wallet balance state, initialized to 1 lakh (100,000)
  const [walletBalance, setWalletBalance] = useState(100000);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showWalletBalance, setShowWalletBalance] = useState(false);

  // For Universal Student ID & Wallet blur and login modal
  const [walletBoxClear, setWalletBoxClear] = useState(false); // Controls blur/login state of wallet section
  const [showWalletLoginModal, setShowWalletLoginModal] = useState(false);
  const [walletUserId, setWalletUserId] = useState("");
  const [walletPassword, setWalletPassword] = useState("");
  const [walletLoginError, setWalletLoginError] = useState("");
  // OTP modal state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccessAlert, setOtpSuccessAlert] = useState(false);
  // Reset MPIN modal states
  const [showResetMpinModal, setShowResetMpinModal] = useState(false);
  const [resetMpinStep, setResetMpinStep] = useState(1); // 1: details, 2: otp, 3: new mpin
  const [resetPassword, setResetPassword] = useState("");
  const [resetMobile, setResetMobile] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [resetNewMpin, setResetNewMpin] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccessAlert, setResetSuccessAlert] = useState(false);

  // Neura chat state
  const [showNeuraChat, setShowNeuraChat] = useState(false);
  const [neuraMessages, setNeuraMessages] = useState([
    { from: "bot", text: "Hi! I'm Neura. How can I help you today?" }
  ]);
  const [neuraInput, setNeuraInput] = useState("");
  const [neuraState, setNeuraState] = useState("initial"); // 'initial', 'awaiting_category', 'awaiting_subcategory', 'awaiting_solution_feedback', 'awaiting_complaint_registration', 'awaiting_rating'
  const [currentIssueCategory, setCurrentIssueCategory] = useState(null);
  const [currentIssueSubCategory, setCurrentIssueSubCategory] = useState(null);

  // New state for MPIN confirmation modal
  const [showMpinConfirmationModal, setShowMpinConfirmationModal] = useState(false);
  const [mpinInput, setMpinInput] = useState('');
  const [mpinError, setMpinError] = useState('');
  const [currentPaymentItem, setCurrentPaymentItem] = useState(null); // To store the item being paid for

  // Chatbot data structure for issues and solutions
  const chatbotIssues = {
    "Payments": {
      "Failed Transaction": "If your transaction failed but the amount was debited, please wait 15 minutes. The amount will usually be reversed automatically. If not, please proceed to raise a grievance.",
      "Refund Not Received": "Refunds typically take 3-5 business days to process. Please check your bank statement after this period. If still not received, you may raise a grievance.",
      "Unauthorized Transaction": "Immediately change your MPIN and report the transaction as a grievance. Contact support if you notice further suspicious activity.",
      "Other Payment Issue": "Please describe your payment issue in detail. If it's complex, consider raising a grievance."
    },
    "Wallet": {
      "MPIN Reset": "You can reset your MPIN by clicking on the 'Reset MPIN' button in the Wallet section of your dashboard. You will need your secure password and registered mobile number for verification.",
      "Balance Mismatch": "Please re-login to your wallet to refresh the balance. If the issue persists, provide transaction details for investigation.",
      "Wallet Not Accessible": "Ensure you are using the correct User ID and password. If you forgot your password, use the 'Forgot Password' option. If the issue continues, contact support.",
      "Other Wallet Issue": "Please describe your wallet issue in detail. If it's complex, consider considering raising a grievance."
    },
    "Account": {
      "Login Issues": "Verify your User ID and password. Ensure your internet connection is stable. If problems persist, try resetting your password.",
      "Profile Update": "You can update your profile details in the 'My Profile' section. Navigate there from the dashboard menu.",
      "Account Locked": "Your account might be temporarily locked due to multiple failed login attempts. Please wait 30 minutes or contact support for immediate unlock.",
      "Other Account Issue": "Please describe your account issue in detail. If it's complex, consider raising a grievance."
    },
    "Events & Opportunities": {
      "Event Registration": "To register for an event, click 'Get Details' on the event card and follow the registration instructions on the event page.",
      "Event Fee Payment": "Event fees are paid directly through the event registration process. Ensure your wallet has sufficient balance or use alternative payment methods if available.",
      "Event Details Missing": "If details are missing, please check the official college notice board or contact the event organizer directly.",
      "Other Event Issue": "Please describe your event issue in detail. If it's complex, consider raising a grievance."
    },
    "Other": "redirect_to_grievance"
  };

  // Add `paid` status to pending payments data
  const [pendingPayments, setPendingPayments] = useState([
    { id: 'P001', description: 'Tuition Fee (Fall Sem)', dueDate: '01-Aug-2025', amount: '85,000', paid: false },
    { id: 'P002', description: 'Hostel Fee', dueDate: '15-Aug-2025', amount: '40,000', paid: false },
    { id: 'P003', description: 'Mess Fee (Aug 2025)', dueDate: '05-Aug-2025', amount: '3,500', paid: false },
  ]);

  // Modified handlePayClick to open MPIN confirmation modal
  const handlePayClick = (payment) => {
    if (!walletBoxClear) {
      // Wallet not logged in, show login modal or a message
      setShowWalletLoginModal(true); // Or a custom alert: alert("Please login to your wallet first.");
      return;
    }
    setCurrentPaymentItem(payment);
    setShowMpinConfirmationModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowSuccess(true);
    // Mark the item as paid
    if (currentPaymentItem) {
      setPendingPayments(prevPayments =>
        prevPayments.map(p =>
          p.id === currentPaymentItem.id ? { ...p, paid: true } : p
        )
      );
    }
    setCurrentPaymentItem(null);
  };

  // Handle MPIN confirmation
  const handleMpinConfirmation = (e) => {
    e.preventDefault();
    setMpinError('');
    // Dummy MPIN validation: any 4-digit number is valid
    if (/^\d{4}$/.test(mpinInput)) {
      const paymentAmount = parseFloat(currentPaymentItem.amount.replace(/,/g, '')); // Convert amount to number
      if (walletBalance >= paymentAmount) {
        setWalletBalance(prevBalance => prevBalance - paymentAmount); // Deduct from balance
        setShowMpinConfirmationModal(false);
        setMpinInput('');
        handlePaymentSuccess(); // Directly trigger success flow
      } else {
        setMpinError('Insufficient wallet balance.');
      }
    } else {
      setMpinError('Please enter a valid 4-digit MPIN.');
    }
  };

  const handleCancelMpinConfirmation = () => {
    setShowMpinConfirmationModal(false);
    setMpinInput('');
    setMpinError('');
    setCurrentPaymentItem(null);
  };

  const handleWalletLogin = (e) => {
    e.preventDefault();
    if (validateWalletLogin(walletUserId, walletPassword)) {
      setWalletBoxClear(true); // Wallet is now "logged in"
      setShowWalletLoginModal(false);
      setWalletLoginError("");
      setWalletUserId("");
      setWalletPassword("");
      setShowOtpModal(true); // Show OTP modal after login
    } else {
      setWalletLoginError("Invalid credentials. Try again.");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Accept any non-empty OTP for demo
    if (otpValue.trim()) {
      setWalletBoxClear(true);
      setShowOtpModal(false);
      setOtpValue("");
      setOtpError("");
      setOtpSuccessAlert(true);
      setTimeout(() => setOtpSuccessAlert(false), 2000);
    } else {
      setOtpError("Please enter OTP.");
    }
  };

  // Reset MPIN handlers
  const handleResetMpinDetails = (e) => {
    e.preventDefault();
    if (resetPassword.trim() && resetMobile.trim()) {
      setResetError("");
      setResetMpinStep(2);
    } else {
      setResetError("Please enter all details.");
    }
  };
  const handleResetMpinOtp = (e) => {
    e.preventDefault();
    if (resetOtp.trim()) {
      setResetError("");
      setResetMpinStep(3);
    } else {
      setResetError("Please enter OTP.");
    }
  };
  const handleResetMpinNew = (e) => {
    e.preventDefault();
    if (resetNewMpin.trim()) {
      setShowResetMpinModal(false);
      setResetMpinStep(1);
      setResetPassword("");
      setResetMobile("");
      setResetOtp("");
      setResetNewMpin("");
      setResetError("");
      setResetSuccessAlert(true);
      setTimeout(() => setResetSuccessAlert(false), 2000);
    } else {
      setResetError("Please enter new MPIN.");
    }
  };

  const addBotMessage = (text, options = null) => {
    setNeuraMessages(prevMessages => [...prevMessages, { from: "bot", text, options }]);
  };

  const addUserMessage = (text) => {
    setNeuraMessages(prevMessages => [...prevMessages, { from: "user", text }]);
  };

  // New function to handle clicks on chatbot options
  const handleNeuraOptionClick = (value) => {
    // Add the selected option as a user message immediately
    addUserMessage(value);

    // Process the option based on the current Neura state
    if (neuraState === "awaiting_category") {
        const categoryKeys = Object.keys(chatbotIssues);
        const chosenIndex = parseInt(value) - 1;

        if (chosenIndex >= 0 && chosenIndex < categoryKeys.length) {
            const selectedCategory = categoryKeys[chosenIndex];
            setCurrentIssueCategory(selectedCategory);

            if (chatbotIssues[selectedCategory] === "redirect_to_grievance") {
                addBotMessage("You've selected 'Other'. Please go to the Grievance page to register your complaint.");
                setTimeout(() => { window.location.href = "#/grievance"; }, 1500);
                setNeuraState("initial"); // Reset state after redirect
            } else {
                const subCategories = Object.keys(chatbotIssues[selectedCategory]).map((key, index) => ({ label: `${index + 1}. ${key}`, value: `${index + 1}` }));
                addBotMessage(`You chose "${selectedCategory}". Now, please select a sub-category:`, subCategories);
                setNeuraState("awaiting_subcategory");
            }
        } else {
            addBotMessage("Invalid selection. Please choose a number from the list.");
        }
    } else if (neuraState === "awaiting_subcategory") {
        const subCategoryKeys = Object.keys(chatbotIssues[currentIssueCategory]);
        const chosenIndex = parseInt(value) - 1;

        if (chosenIndex >= 0 && chosenIndex < subCategoryKeys.length) {
            const selectedSubCategory = subCategoryKeys[chosenIndex];
            setCurrentIssueSubCategory(selectedSubCategory);
            const solution = chatbotIssues[currentIssueCategory][selectedSubCategory];

            addBotMessage(`Here's what you can do for "${selectedSubCategory}":\n${solution}`);
            addBotMessage("Was your problem solved? (Yes/No)", [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" }
            ]);
            setNeuraState("awaiting_solution_feedback");
        } else {
            addBotMessage("Invalid selection. Please choose a number from the list.");
        }
    } else if (neuraState === "awaiting_solution_feedback") {
        if (value.toLowerCase() === "yes") {
            addBotMessage("Great! I'm grateful that I could help in resolving your issue.");
            addBotMessage("Please rate my assistance from 1 (Bad) to 5 (Best).", [
                { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }
            ]);
            setNeuraState("awaiting_rating");
        } else if (value.toLowerCase() === "no") {
            addBotMessage("I'm sorry your problem wasn't solved. Would you like to register a complaint for this? (Yes/No)", [
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" }
            ]);
            setNeuraState("awaiting_complaint_registration");
        } else {
            addBotMessage("Please answer 'Yes' or 'No'.");
        }
    } else if (neuraState === "awaiting_complaint_registration") {
        if (value.toLowerCase() === "yes") {
            addBotMessage("Redirecting you to the Grievance page to register your complaint.");
            setTimeout(() => { window.location.href = "#/grievance"; }, 1500);
            setNeuraState("initial"); // Reset state after redirect
        } else if (value.toLowerCase() === "no") {
            addBotMessage("Okay, if you change your mind, you can always visit the Grievance page directly. Is there anything else I can help you with?");
            setNeuraState("initial"); // Back to initial state
        } else {
            addBotMessage("Please answer 'Yes' or 'No'.");
        }
    } else if (neuraState === "awaiting_rating") {
        const rating = parseInt(value);
        if (rating >= 1 && rating <= 5) {
            addBotMessage(`Thank you for your rating of ${rating}! Your feedback helps me improve.`);
            setNeuraState("initial"); // Reset state after rating
        } else {
            addBotMessage("Please enter a number between 1 and 5.");
        }
    }
  };

  const handleNeuraSend = async (e) => {
    e.preventDefault();
    const userMessageText = neuraInput.trim();
    if (!userMessageText && neuraState !== "initial") return; // Allow empty input only for initial greeting trigger

    if (userMessageText) { // Only add user message if there's actual text
      addUserMessage(userMessageText);
    }
    setNeuraInput(""); // Clear input immediately

    // This block now only handles text input, not option clicks
    if (neuraState === "initial") {
      addBotMessage("Hi! I'm Neura. How can I help you today?");
      const options = Object.keys(chatbotIssues).map((key, index) => ({ label: `${index + 1}. ${key}`, value: `${index + 1}` }));
      addBotMessage("Please choose a category:", options);
      setNeuraState("awaiting_category");
    } else if (neuraState === "awaiting_category") {
      // If user types a number, process it as an option click
      const chosenIndex = parseInt(userMessageText);
      if (!isNaN(chosenIndex) && chosenIndex > 0 && chosenIndex <= Object.keys(chatbotIssues).length) {
        handleNeuraOptionClick(userMessageText);
      } else {
        addBotMessage("Invalid selection. Please choose a number from the list.");
      }
    } else if (neuraState === "awaiting_subcategory") {
        const chosenIndex = parseInt(userMessageText);
        if (!isNaN(chosenIndex) && chosenIndex > 0 && chosenIndex <= Object.keys(chatbotIssues[currentIssueCategory]).length) {
            handleNeuraOptionClick(userMessageText);
        } else {
            addBotMessage("Invalid selection. Please choose a number from the list.");
        }
    } else if (neuraState === "awaiting_solution_feedback" || neuraState === "awaiting_complaint_registration" || neuraState === "awaiting_rating") {
        handleNeuraOptionClick(userMessageText); // Process text input as if it were an option click for these states
    } else {
        // Fallback for unexpected states or general text input
        addBotMessage("I'm not sure how to respond to that. Can you please choose from the options or clarify your query?");
        setNeuraState("initial"); // Reset to initial state
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Scroll to bottom of chat messages whenever messages update
  useEffect(() => {
    const chatMessagesContainer = document.querySelector('.neura-chat-messages');
    if (chatMessagesContainer) {
      chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }
  }, [neuraMessages]);


  return (
    <div className="dashboard-bg">
      {showSuccess && (
        <div className="payment-success-message">
          ✅ Payment Successful! Your transaction has been recorded.
        </div>
      )}
      {otpSuccessAlert && (
        <div
          style={{
            position: "fixed",
            top: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg,#4f46e5 0%,#10b981 100%)",
            color: "#fff",
            padding: "16px 32px",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            fontWeight: "600",
            fontSize: "18px",
            zIndex: 2000,
            textAlign: "center"
          }}
        >
          <span role="img" aria-label="success">🎉</span> Verification successful, enjoy your secure payment journey
        </div>
      )}
      {resetSuccessAlert && (
        <div
          style={{
            position: "fixed",
            top: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg,#4f46e5 0%,#10b981 100%)",
            color: "#fff",
            padding: "16px 32px",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            fontWeight: "600",
            fontSize: "18px",
            zIndex: 2000,
            textAlign: "center"
          }}
        >
          <span role="img" aria-label="success">🎉</span> MPIN changed successfully
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
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {pendingPayments.map(payment => (
                      <tr key={payment.id}>
                          <td>{payment.description}</td>
                          <td>{payment.dueDate}</td>
                          <td>₹ {payment.amount}</td>
                          <td>
                            {payment.paid ? (
                              <button className="pay-btn" disabled>
                                Paid
                              </button>
                            ) : (
                              <button
                                className="pay-btn"
                                onClick={() => handlePayClick(payment)}
                                disabled={!walletBoxClear}
                              >
                                Pay Now
                              </button>
                            )}
                          </td>
                      </tr>
                  ))}
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
          <div className="dashboard-col-right" style={{ position: "relative" }}>
            {/* Neura Chat Box */}
            {showNeuraChat && (
              <div className="neura-chat-box">
                <div className="neura-chat-header">
                  Ask Neura
                  <button
                    className="neura-close-btn"
                    onClick={() => setShowNeuraChat(false)}
                    title="Close"
                  >
                    ×
                  </button>
                </div>
                <div className="neura-chat-messages">
                  {neuraMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`neura-message ${msg.from === "user" ? "user-message" : "bot-message"}`}
                    >
                      <span className="message-text">
                        {msg.text}
                        {msg.options && (
                            <div className="neura-options">
                                {msg.options.map((option, optIdx) => (
                                    <button
                                        key={optIdx}
                                        className="neura-option-btn"
                                        onClick={() => handleNeuraOptionClick(option.value || option.label)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleNeuraSend}
                  className="neura-chat-input-form"
                >
                  <input
                    type="text"
                    value={neuraInput}
                    onChange={e => setNeuraInput(e.target.value)}
                    placeholder="Type your question..."
                    className="neura-input-field"
                    disabled={neuraState === "awaiting_solution_feedback" || neuraState === "awaiting_complaint_registration" || neuraState === "awaiting_rating"}
                  />
                  <button
                    type="submit"
                    className="neura-send-btn"
                    disabled={neuraState === "awaiting_solution_feedback" || neuraState === "awaiting_complaint_registration" || neuraState === "awaiting_rating"}
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
            {/* Universal Student ID + Wallet (merged, blurred) */}
            <section
              className="dashboard-card"
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: "220px"
              }}
            >
              <div
                style={{
                  filter: walletBoxClear ? "none" : "blur(12px)",
                  pointerEvents: walletBoxClear ? "auto" : "none",
                  transition: "filter 0.4s"
                }}
              >
                <h3 className="card-title-lg">Universal Student ID & Wallet</h3>
                <p className="card-description">
                  Use your Permanent SID for discounts and view your wallet balance.
                </p>
                <div className="sid-box" style={{ marginBottom: "16px" }}>
                  <span className="sid-label">Your Permanent SID</span>
                  <div className="sid-value">{permanentSID}</div>
                </div>
                {/* Wallet UI */}
                <div className="sid-box" style={{ background: "#fef9c3", borderLeft: "4px solid #f59e0b" }}>
                  <span className="sid-label" style={{ fontWeight: 600 }}>Your Wallet</span>
                  <div style={{ marginTop: "8px" }}>
                    <span style={{ color: "#b45309", fontWeight: "bold", fontSize: "18px" }}>
                      balance :{" "}
                      <span
                        style={{
                          filter: showWalletBalance ? "none" : "blur(8px)",
                          transition: "filter 0.3s",
                          cursor: "pointer",
                          userSelect: "none"
                        }}
                        onClick={() => setShowWalletBalance((v) => !v)}
                        title={showWalletBalance ? "" : "Click to reveal"}
                      >
                        {walletBalance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }).replace('INR', '')}
                      </span>
                    </span>
                  </div>
                  {/* Reset MPIN Option */}
                  <div style={{ marginTop: "18px", textAlign: "left" }}>
                    <button
                      type="button"
                      style={{
                        background: "#fff7ed",
                        color: "#ea580c",
                        border: "1px solid #fed7aa",
                        borderRadius: "6px",
                        padding: "8px 18px",
                        fontWeight: "600",
                        fontSize: "15px",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(234,88,12,0.06)",
                        transition: "background 0.2s"
                      }}
                      onClick={() => setShowResetMpinModal(true)}
                    >
                      🔒 Reset MPIN
                    </button>
                  </div>
                </div>
              </div>
              {!walletBoxClear && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    background: "rgba(255,255,255,0.7)"
                  }}
                >
                  <a
                      href="#/register"
                      className="btn btn-primary"
                      style={{
                          fontSize: "16px",
                          padding: "10px 28px",
                          borderRadius: "8px",
                          fontWeight: "600",
                          marginBottom: "15px",
                          textDecoration: "none",
                          color: "#1e293b",
                          backgroundColor: "#f1f5f9",
                          border: "1px solid #e2e8f0",
                          transition: "background-color 0.2s"
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#e2e8f0'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                  >
                      Register
                  </a>
                  <button
                    className="btn btn-primary"
                    style={{
                      fontSize: "20px",
                      padding: "12px 32px",
                      borderRadius: "8px",
                      fontWeight: "bold"
                    }}
                    onClick={() => setShowWalletLoginModal(true)}
                  >
                    Login
                  </button>
                </div>
              )}
            </section>

            {/* Quick Actions */}
            <section className="dashboard-card">
              <h3 className="card-title-lg">Quick Actions</h3>
              <ul className="quick-actions">
                <li>
                  <a href="#/transactions" className="action-link history">Transaction History</a>
                </li>
                <li>
                  <button
                    type="button"
                    className="action-link grievance"
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                      cursor: "pointer"
                    }}
                    onClick={() => setShowNeuraChat(true)}
                  >
                    Ask Neura
                  </button>
                </li>
                <li>
                  <a href="#/" className="action-link logout">Logout</a>
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>

      {/* Wallet Login Modal (portal, always outside main layout) */}
      {showWalletLoginModal &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.3)",
              zIndex: 1002,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                padding: "32px 24px",
                minWidth: "320px",
                maxWidth: "90vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <h4 style={{ marginBottom: "18px", fontWeight: 700 }}>Wallet Login</h4>
              <form onSubmit={handleWalletLogin} style={{ width: "100%" }}>
                <div className="mb-3">
                  <label className="form-label">User ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={walletUserId}
                    onChange={e => setWalletUserId(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Secure Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={walletPassword}
                    onChange={e => setWalletPassword(e.target.value)}
                  />
                </div>
                {walletLoginError && (
                  <div className="alert alert-danger py-2">{walletLoginError}</div>
                )}
                <div style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "12px",
                  justifyContent: "center"
                }}>
                  <button
                    type="submit"
                    style={{
                      background: "#4f46e5",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px 28px",
                      fontWeight: "600",
                      fontSize: "16px",
                      boxShadow: "0 2px 8px rgba(79,70,229,0.08)",
                      transition: "background 0.2s"
                    }}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px 28px",
                      fontWeight: "600",
                      fontSize: "16px",
                      boxShadow: "0 2px 8px rgba(71,85,105,0.06)",
                      transition: "background 0.2s"
                    }}
                    onClick={() => {
                      setShowWalletLoginModal(false);
                      setWalletLoginError("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )
      }

      {/* OTP Modal (portal, always outside main layout) */}
      {showOtpModal &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.3)",
              zIndex: 1003,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                padding: "32px 24px",
                minWidth: "320px",
                maxWidth: "90vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <h4 style={{ marginBottom: "18px", fontWeight: 700 }}>OTP Verification</h4>
              <form onSubmit={handleOtpSubmit} style={{ width: "100%" }}>
                <div className="mb-3">
                  <label className="form-label">Enter OTP sent to your registered number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={otpValue}
                    onChange={e => setOtpValue(e.target.value)}
                    autoFocus
                  />
                </div>
                {otpError && (
                  <div className="alert alert-danger py-2">{otpError}</div>
                )}
                <div style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "12px",
                  justifyContent: "center"
                }}>
                  <button
                    type="submit"
                    style={{
                      background: "#10b981",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px 28px",
                      fontWeight: "600",
                      fontSize: "16px",
                      boxShadow: "0 2px 8px rgba(16,185,129,0.08)",
                      transition: "background 0.2s"
                    }}
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    style={{
                      background: "#f1f5f9",
                      color: "#475569",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px 28px",
                      fontWeight: "600",
                      fontSize: "16px",
                      boxShadow: "0 2px 8px rgba(71,85,105,0.06)",
                      transition: "background 0.2s"
                    }}
                    onClick={() => {
                      setShowOtpModal(false);
                      setOtpError("");
                      setOtpValue("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )
      }

      {/* MPIN Confirmation Modal */}
      {showMpinConfirmationModal &&
        ReactDOM.createPortal(
          <div className="mpin-confirmation-modal-backdrop">
            <div className="mpin-confirmation-modal-content">
              <h4 className="mpin-modal-title">Confirm Payment</h4>
              <p className="mpin-modal-text">Enter your 4-digit MPIN to pay for {currentPaymentItem?.description}.</p>
              <form onSubmit={handleMpinConfirmation} className="mpin-modal-form">
                <input
                  type="password"
                  className="form-control mpin-input"
                  placeholder="••••"
                  maxLength="4"
                  value={mpinInput}
                  onChange={(e) => setMpinInput(e.target.value)}
                  autoFocus
                />
                {mpinError && <div className="mpin-error-message">{mpinError}</div>}
                <div className="mpin-modal-actions">
                  <button type="submit" className="mpin-confirm-button">Confirm</button>
                  <button type="button" className="mpin-cancel-button" onClick={handleCancelMpinConfirmation}>Cancel</button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )
      }

      {/* Reset MPIN Modal (portal, always outside main layout) */}
      {showResetMpinModal &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.3)",
              zIndex: 1004,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
                padding: "32px 24px",
                minWidth: "320px",
                maxWidth: "90vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <h4 style={{ marginBottom: "18px", fontWeight: 700 }}>Reset MPIN</h4>
              {resetMpinStep === 1 && (
                <form onSubmit={handleResetMpinDetails} style={{ width: "100%" }}>
                  <div className="mb-3">
                    <label className="form-label">Secure Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={resetPassword}
                      onChange={e => setResetPassword(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Registered Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={resetMobile}
                      onChange={e => setResetMobile(e.target.value)}
                    />
                  </div>
                  {resetError && (
                    <div className="alert alert-danger py-2">{resetError}</div>
                  )}
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "12px",
                    justifyContent: "center"
                  }}>
                    <button
                      type="submit"
                      style={{
                        background: "#4f46e5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 28px",
                        fontWeight: "600",
                        fontSize: "16px",
                        boxShadow: "0 2px 8px rgba(79,70,229,0.08)",
                        transition: "background 0.2s"
                      }}
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      style={{
                        background: "#f1f5f9",
                        color: "#475569",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 28px",
                        fontWeight: "600",
                        fontSize: "16px",
                        boxShadow: "0 2px 8px rgba(71,85,105,0.06)",
                        transition: "background 0.2s"
                      }}
                      onClick={() => {
                        setShowResetMpinModal(false);
                        setResetMpinStep(1);
                        setResetPassword("");
                        setResetMobile("");
                        setResetOtp("");
                        setResetNewMpin("");
                        setResetError("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              {resetMpinStep === 2 && (
                <form onSubmit={handleResetMpinOtp} style={{ width: "100%" }}>
                  <div className="mb-3">
                    <label className="form-label">Enter OTP sent to your registered mobile number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={resetOtp}
                      onChange={e => setResetOtp(e.target.value)}
                      autoFocus
                    />
                  </div>
                  {resetError && (
                    <div className="alert alert-danger py-2">{resetError}</div>
                  )}
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "12px",
                    justifyContent: "center"
                  }}>
                    <button
                      type="submit"
                      style={{
                        background: "#10b981",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 28px",
                        fontWeight: "600",
                        fontSize: "16px",
                        boxShadow: "0 2px 8px rgba(16,185,129,0.08)",
                        transition: "background 0.2s"
                      }}
                    >
                      Verify OTP
                    </button>
                    <button
                      type="button"
                      style={{
                        background: "#f1f5f9",
                        color: "#475569",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 28px",
                        fontWeight: "600",
                        fontSize: "16px",
                        boxShadow: "0 2px 8px rgba(71,85,105,0.06)",
                        transition: "background 0.2s"
                      }}
                      onClick={() => {
                        setShowOtpModal(false);
                        setOtpError("");
                        setOtpValue("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
              {resetMpinStep === 3 && (
                <form onSubmit={handleResetMpinNew} style={{ width: "100%" }}>
                  <div className="mb-3">
                    <label className="form-label">Enter New MPIN</label>
                    <input
                      type="password"
                      className="form-control"
                      value={resetNewMpin}
                      onChange={e => setResetNewMpin(e.target.value)}
                      autoFocus
                    />
                  </div>
                  {resetError && (
                    <div className="alert alert-danger py-2">{resetError}</div>
                  )}
                  <div style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "12px",
                    justifyContent: "center"
                  }}>
                    <button
                      type="submit"
                      style={{
                        background: "#4f46e5",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 28px",
                        fontWeight: "600",
                        fontSize: "16px",
                        boxShadow: "0 2px 8px rgba(79,70,229,0.08)",
                        transition: "background 0.2s"
                      }}
                    >
                      Change MPIN
                    </button>
                    <button
                      type="button"
                      style={{
                        background: "#f1f5f9",
                        color: "#475569",
                        border: "none",
                        borderRadius: "6px",
                        padding: "10px 28px",
                        fontWeight: "600",
                        fontSize: "16px",
                        boxShadow: "0 2px 8px rgba(71,85,105,0.06)",
                        transition: "background 0.2s"
                      }}
                      onClick={() => {
                        setShowResetMpinModal(false);
                        setResetMpinStep(1);
                        setResetPassword("");
                        setResetMobile("");
                        setResetOtp("");
                        setResetNewMpin("");
                        setResetError("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )
      }
    </div>
  );
};

export { StudentDashboard };
